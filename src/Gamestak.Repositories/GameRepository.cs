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
	                    INSERT INTO {DbTables.Games} (Title, Price, ReleaseDate, HeroImageUrl, [Description])
	                    VALUES (@Title, @Price, @ReleaseDate, @HeroImageUrl, @Description)
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
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
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
