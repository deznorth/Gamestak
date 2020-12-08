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
                var query = @$"
                    IF NOT EXISTS (SELECT GameID FROM {DbTables.GameImages} WHERE GameID = @GameId and [Url] = @GameImageUrl)
                    BEGIN
	                    INSERT INTO {DbTables.GameImages}(GameID, [Url])
	                    VALUES (@GameId, @GameImageUrl)
                    END
                ";

                var parameters = images.Select(i => new
                {
                    GameId = gameId,
                    GameImageUrl = i
                }).ToArray();

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
        #endregion

        #region READ
        // Get all games and populate their "ImageCollection" field
        public Task<List<Game>> GetGames()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @$"
                    SELECT * FROM {DbTables.Games}
                ";

                var games = (await conn.QueryAsync<Game>(query)).ToList();

                return await PopulateGamesImages(games);
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

                return await PopulateGameImages(game);
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
        #endregion
    }
}
