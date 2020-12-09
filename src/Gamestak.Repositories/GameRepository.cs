using Dapper;
using Gamestak.DataAccess.Contracts;
using Gamestak.DataAccess.Databases;
using Gamestak.Entities;
using Gamestak.Entities.Constants;
using Gamestak.Repositories.Contracts;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Gamestak.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly ILogger<UserRepository> logger;
        private readonly IConnectionOwner<GamestakDb> gamestakDb;

        public GameRepository(
            ILogger<UserRepository> logger,
            IConnectionOwner<GamestakDb> gamestakDb
        )
        {
            this.logger = logger;
            this.gamestakDb = gamestakDb;
        }

        #region CREATE
        public Task<Game> SaveGame(GameCreationRequest game)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF NOT EXISTS (SELECT GameID FROM {DbTables.Games} WHERE Title = @Title)
                    BEGIN
	                    INSERT INTO {DbTables.Games} (Title, Publisher, [Description], Price, DiscountRate, ReleaseDate, ThumbnailUrl)
	                    VALUES (@Title, @Publisher, @Description, @Price, @DiscountRate, @ReleaseDate, @ThumbnailUrl)
                    END
                ";

                var selectQuery = $@"SELECT * FROM {DbTables.Games} WHERE Title = @Title";

                var rowsAffected = await conn.ExecuteAsync(query, game);

                if (rowsAffected < 0)
                {
                    throw new ArgumentException("Game object already exists or is invalid");
                }

                var result = (await conn.QueryAsync<Game>(selectQuery, game)).FirstOrDefault();

                return result;
            });
        }

        public Task<List<GameImage>> SaveGameImages(int gameId, List<string> images)
        {
            return gamestakDb.Use(async conn =>
            {
                var valueClauses = String.Join(" ", images.Select((url, idx) =>
                {
                    if (idx < images.Count - 1)
                        return $@"({gameId}, '{url}'),";
                    else
                        return $@"({gameId}, '{url}');";
                }));

                var query = @$"
                    IF NOT EXISTS (SELECT GameID FROM {DbTables.GameImages} WHERE GameID = @GameId and [Url] IN @Urls)
                    BEGIN
	                    INSERT INTO {DbTables.GameImages}(GameID, [Url])
	                    VALUES {valueClauses}
                    END
                ";

                var parameters = new
                {
                    GameId = gameId,
                    Urls = images,
                };

                await conn.ExecuteAsync(query, parameters);

                var result = await GetImagesByGameID(gameId);

                return result;
            });
        }

        public Task<int> FeatureGame(int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF NOT EXISTS (SELECT GameID FROM {DbTables.FeaturedGames} WHERE GameID = @GameId)
                    BEGIN
	                    INSERT INTO {DbTables.FeaturedGames} (GameID)
	                    VALUES (@GameId)
                    END
                ";

                var rowsAffected = await conn.ExecuteAsync(query, new { GameId = gameId });

                if (rowsAffected < 0)
                {
                    throw new ArgumentException("Game object already featured or is invalid");
                }

                return rowsAffected;
            });
        }

        public Task<List<Category>> AssignGameCategories(int gameId, List<int> categoryIds)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF NOT EXISTS (SELECT * FROM {DbTables.CategoryAssignments} WHERE GameID = @GameID AND CategoryID = @CategoryID)
                    BEGIN
	                    INSERT INTO {DbTables.CategoryAssignments} (GameID, CategoryID)
	                    VALUES (@GameID, @CategoryID)
                    END
                ";

                var parameters = categoryIds.Select(categoryID => new
                {
                    GameId = gameId,
                    CategoryID = categoryID
                }).ToArray();

                await conn.ExecuteAsync(query, parameters);

                var result = await GetCategoriesByGameID(gameId);

                return result;
            });
        }

        public Task<List<Feature>> AssignGameFeatures(int gameId, List<int> featureIds)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF NOT EXISTS (SELECT * FROM {DbTables.FeatureAssignments} WHERE GameID = @GameID AND FeatureID = @FeatureID)
                    BEGIN
	                    INSERT INTO {DbTables.FeatureAssignments} (GameID, FeatureID)
	                    VALUES (@GameID, @FeatureID)
                    END
                ";

                var parameters = featureIds.Select(featureID => new
                {
                    GameId = gameId,
                    FeatureID = featureID
                }).ToArray();

                await conn.ExecuteAsync(query, parameters);

                var result = await GetFeaturesByGameID(gameId);

                return result;
            });
        }

        public Task<int> SaveGameKeys(int userId, List<int> gameIds)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF NOT EXISTS (SELECT GameID FROM {DbTables.GameKeys} WHERE UserID = @UserId and GameID = @GameId)
                    BEGIN
	                    INSERT INTO {DbTables.GameKeys} (GameID, UserID)
	                    VALUES (@GameId, @UserId)
                    END
                ";

                var parameters = gameIds.Select(gameId => new
                {
                    GameId = gameId,
                    UserId = userId,
                }).ToArray();

                var rowsAffected = await conn.ExecuteAsync(query, parameters);

                if (rowsAffected < 0)
                {
                    throw new ArgumentException("GameKey already exists or ids are invalid");
                }

                return rowsAffected;
            });
        }
        #endregion

        #region READ
        // Get all games and populate their "ImageCollection" field
        public Task<List<Game>> GetGames(GameSearch searchParams)
        {
            return gamestakDb.Use(async conn =>
            {
                var searchTermPresent = searchParams.SearchTerm != "";
                var categoriesPresent = searchParams.Categories != null && searchParams.Categories.Count > 0;
                var featuresPresent = searchParams.Features != null && searchParams.Features.Count > 0;
                var ownerPresent = searchParams.OwnerID != null;

                var whereClause = "";
                var orderbyClause = "ORDER BY ";

                var listOfWhereFilters = new List<string>();

                if (searchTermPresent || categoriesPresent || featuresPresent || ownerPresent)
                {
                    whereClause = "WHERE ";
                }
                if (searchTermPresent)
                {
                    listOfWhereFilters.Add($@"Title LIKE '%{searchParams.SearchTerm}%'");
                }
                if (categoriesPresent)
                {
                    listOfWhereFilters.Add(@$"GameID IN (SELECT GameID FROM {DbTables.CategoryAssignments} ca WHERE ca.GameID = g.GameID and CategoryID IN @CategoryIds)");
                }
                if (featuresPresent)
                {
                    listOfWhereFilters.Add(@$"GameID IN (SELECT GameID FROM {DbTables.FeatureAssignments} fa WHERE fa.GameID = g.GameID and FeatureID IN @FeatureIds)");
                }
                if (ownerPresent)
                {
                    listOfWhereFilters.Add($@"GameID IN (SELECT GameID FROM {DbTables.GameKeys} gk WHERE gk.GameID = g.GameID and UserID = @OwnerId)");
                }
                if (whereClause != "")
                {
                    whereClause += String.Join(" AND ", listOfWhereFilters);
                }

                switch (searchParams.SortBy)
                {
                    case SortType.NewerFirst:
                        orderbyClause += "ReleaseDate DESC";
                        break;
                    case SortType.OlderFirst:
                        orderbyClause += "ReleaseDate ASC";
                        break;
                    case SortType.AZ:
                        orderbyClause += "Title ASC";
                        break;
                    case SortType.ZA:
                        orderbyClause += "Title DESC";
                        break;
                    case SortType.PriceLowToHigh:
                        orderbyClause += "Price ASC";
                        break;
                    case SortType.PriceHighToLow:
                        orderbyClause += "Price DESC";
                        break;
                }

                var query = @$"
                    SELECT * FROM {DbTables.Games} g
                    {whereClause}
                    {orderbyClause}
                ";

                var games = (await conn.QueryAsync<Game>(query, new {
                    OwnerId = searchParams.OwnerID,
                    CategoryIds = searchParams.Categories,
                    FeatureIds = searchParams.Features,
                })).ToList();

                var gamesWithImages = await PopulateGamesImages(games);
                
                return await PopulateGamesFilters(gamesWithImages);
            });
        }

        public Task<List<Game>> GetFeaturedGames()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Games} g
                    JOIN {DbTables.FeaturedGames} fg
                    ON g.GameID = fg.GameID 
                ";

                var games = (await conn.QueryAsync<Game>(query)).ToList();

                return await PopulateGamesImages(games);
            });
        }

        public Task<Game> GetGameByID(int id)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Games} WHERE GameID = @GameId
                ";

                var game = (await conn.QueryAsync<Game>(query, new { GameId = id })).FirstOrDefault();

                var gameWithImages = await PopulateGameImages(game);
                return await PopulateGameFilters(gameWithImages);
            });
        }

        public Task<List<Game>> GetGamesByID(IEnumerable<int> ids)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Games} WHERE GameID IN @GameId
                ";

                var games = (await conn.QueryAsync<Game>(query, new { GameId = ids })).ToList();

                return await PopulateGamesImages(games);
            });
        }

        public Task<List<GameImage>> GetImagesByGameID(int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.GameImages} WHERE GameID = @GameId
                ";

                var result = (await conn.QueryAsync<GameImage>(query, new { GameId = gameId })).ToList();

                return result;
            });
        }

        public Task<GameImage> GetImageByID(int id)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.GameImages} WHERE ImageID = @ImageId
                ";

                var result = (await conn.QueryAsync<GameImage>(query, new { ImageId = id })).FirstOrDefault();

                return result;
            });
        }

        public Task<List<Category>> GetCategories()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Categories}
                ";

                var result = (await conn.QueryAsync<Category>(query)).ToList();

                return result;
            });
        }

        public Task<List<Category>> GetCategoriesByGameID(int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT ca.CategoryID, c.CategoryName
                    FROM {DbTables.CategoryAssignments} ca
                    JOIN {DbTables.Categories} c
                    ON c.CategoryID = ca.CategoryID
                    WHERE ca.GameID = @GameID
                ";

                var result = (await conn.QueryAsync<Category>(query, new { GameId = gameId })).ToList();

                return result;
            });
        }

        public Task<List<Feature>> GetFeatures()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Features}
                ";

                var result = (await conn.QueryAsync<Feature>(query)).ToList();

                return result;
            });
        }

        public Task<List<Feature>> GetFeaturesByGameID(int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT fa.FeatureID, f.FeatureName
                    FROM {DbTables.FeatureAssignments} fa
                    JOIN {DbTables.Features} f
                    ON f.FeatureID = fa.FeatureID
                    WHERE fa.GameID = @GameID
                ";

                var result = (await conn.QueryAsync<Feature>(query, new { GameId = gameId })).ToList();

                return result;
            });
        }

        public Task<bool> GetIsOwner(int userId, int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var Query = @$"
                    SELECT g.GameID FROM {DbTables.Games} g
                    JOIN {DbTables.GameKeys} gk ON g.GameID = gk.GameID
                    WHERE g.GameID = @GameId and gk.UserID = @UserId
                ";

                var games = (await conn.QueryAsync<Game>(Query, new
                {
                    GameId = gameId,
                    UserId = userId,
                })).ToList();

                return games.Count > 0;
            });
        }

        public Task<GameKey> GetGameKey(int userId, int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var Query = @$"
                    SELECT * FROM {DbTables.GameKeys}
                    WHERE GameID = @GameId and UserID = @UserId
                ";

                var gameKey = (await conn.QueryAsync<GameKey>(Query, new
                {
                    GameId = gameId,
                    UserId = userId,
                })).FirstOrDefault();

                return gameKey;
            });
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        public Task<int> UnfeatureGame(int gameId)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    IF EXISTS (SELECT GameID FROM {DbTables.FeaturedGames} WHERE GameID = @GameId)
                    BEGIN
	                    DELETE FROM {DbTables.FeaturedGames}
	                    WHERE GameID = @GameId
                    END
                ";

                var rowsAffected = await conn.ExecuteAsync(query, new { GameId = gameId });

                if (rowsAffected < 0)
                {
                    throw new Exception("Game object does not exist");
                }

                return rowsAffected;
            });
        }
        #endregion

        #region UTILITY
        // Populate the "ImageCollection" field for every game on the passed list.
        private Task<List<Game>> PopulateGamesImages(List<Game> games)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = $@"SELECT * FROM {DbTables.GameImages}";

                var images = (await conn.QueryAsync<GameImage>(query)).ToList();

                return games.Select(game =>
                {
                    var filteredImages = images.FindAll(i => i.GameID == game.GameID);
                    game.ImageCollection = filteredImages;
                    return game;
                }).ToList();
            });
        }

        // Populate the "ImageCollection" field for the passed game.
        private Task<Game> PopulateGameImages(Game game)
        {
            return gamestakDb.Use(async conn =>
            {
                var images = await GetImagesByGameID(game.GameID);
                game.ImageCollection = images;
                return game;
            });
        }

        private Task<List<Game>> PopulateGamesFilters(List<Game> games)
        {
            return gamestakDb.Use(async conn =>
            {
                var gameIds = games.Select(g => g.GameID).ToList();

                var caQuery = $@"
                    SELECT ca.GameID, ca.CategoryID, c.CategoryName FROM {DbTables.CategoryAssignments} ca
                    JOIN [{DbTables.Categories}] c ON ca.CategoryID = c.CategoryID
                    WHERE ca.GameID IN @GameIds
                ";

                var faQuery = $@"
                    SELECT fa.GameID, fa.FeatureID, f.FeatureName FROM {DbTables.FeatureAssignments} fa
                    JOIN [{DbTables.Features}] f ON fa.FeatureID = f.FeatureID
                    WHERE fa.GameID IN @GameIds
                ";

                var categoryAssignments = (await conn.QueryAsync<Category>(caQuery, new
                {
                    GameIds = gameIds,
                })).ToList();

                var featureAssignments = (await conn.QueryAsync<Feature>(faQuery, new
                {
                    GameIds = gameIds,
                })).ToList();

                return games.Select(game =>
                {
                    var filteredCategories = categoryAssignments.FindAll(c => c.GameID == game.GameID);
                    game.Categories = filteredCategories;

                    var filteredFeatures = featureAssignments.FindAll(f => f.GameID == game.GameID);
                    game.Features = filteredFeatures;

                    return game;
                }).ToList();
            });
        }

        private Task<Game> PopulateGameFilters(Game game)
        {
            return gamestakDb.Use(async conn =>
            {
                var categories = await GetCategoriesByGameID(game.GameID);
                var features = await GetFeaturesByGameID(game.GameID);
                game.Categories = categories;
                game.Features = features;
                return game;
            });
        }
        #endregion
    }
}
