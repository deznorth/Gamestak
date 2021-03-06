﻿using Gamestak.Entities;
using Gamestak.Repositories.Contracts;
using Gamestak.Services.Contracts;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamestak.Services
{
    public class GameService : IGameService
    {
        private readonly ILogger<GameService> logger;
        private readonly IGameRepository gameRepository;

        public GameService(
            ILogger<GameService> logger,
            IGameRepository gameRepository
        )
        {
            this.logger = logger;
            this.gameRepository = gameRepository;
        }

        #region CREATE
        public async Task<Game> SaveGame(GameCreationRequest game)
        {
            try
            {
                var savedGame = await gameRepository.SaveGame(game);
                var savedImages = await gameRepository.SaveGameImages(savedGame.GameID, game.ImageCollection);
                var savedCategories = await gameRepository.AssignGameCategories(savedGame.GameID, game.Categories);
                var savedFeatures = await gameRepository.AssignGameFeatures(savedGame.GameID, game.Features);

                savedGame.ImageCollection = savedImages;
                savedGame.Categories = savedCategories;
                savedGame.Features = savedFeatures;

                return savedGame;
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error Saving a Game to the DB");
                throw e;
            }
        }

        public async Task<IEnumerable<Game>> BulkSaveGames(List<GameCreationRequest> games)
        {
            try
            {

                List<Game> gamesResult = new List<Game>();
                
                games.ForEach(async game =>
                {
                    try
                    {
                        var savedGame = await SaveGame(game);

                        gamesResult.Add(savedGame);
                    } catch (Exception e)
                    {
                    }
                });

                return gamesResult;
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error bulk saving games to the DB");
                throw e;
            }
        }

        public async Task<int> FeatureGame(int gameId)
        {
            try
            {
                return await gameRepository.FeatureGame(gameId);
            } catch (Exception e)
            {
                logger.LogError(e, "Error adding game to featured games");
                throw e;
            }
        }

        public async Task<int> SaveGameKeys(int userId, List<int> gameIds)
        {
            try
            {
                return await gameRepository.SaveGameKeys(userId, gameIds);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error saving game keys");
                throw e;
            }
        }
        #endregion

        #region READ
        public async Task<IEnumerable<Game>> GetGames(GameSearch searchParams)
        {
            try
            {
                return await gameRepository.GetGames(searchParams);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving all games");
                throw e;
            }
        }

        public async Task<IEnumerable<Game>> GetFeaturedGames()
        {
            try
            {
                return await gameRepository.GetFeaturedGames();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving featured games");
                throw e;
            }
        }

        public async Task<Game> GetGameByID(int id)
        {
            try
            {
                return await gameRepository.GetGameByID(id);
            }
            catch (Exception e)
            {
                logger.LogError(e, $"Error retrieving a game with id: {id}");
                throw e;
            }
        }

        public async Task<IEnumerable<Game>> GetGamesByID(IEnumerable<int> ids)
        {
            try
            {
                return await gameRepository.GetGamesByID(ids);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving games by a list of ids");
                throw e;
            }
        }

        public async Task<IEnumerable<GameImage>> GetImagesByGameID(int id)
        {
            try
            {
                return await gameRepository.GetImagesByGameID(id);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving game images by game id");
                throw e;
            }
        }

        public async Task<GameImage> GetImageByID(int id)
        {
            try
            {
                return await gameRepository.GetImageByID(id);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving a game image by id");
                throw e;
            }
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            try
            {
                return await gameRepository.GetCategories();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving categories list");
                throw e;
            }
        }

        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            try
            {
                return await gameRepository.GetFeatures();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving features list");
                throw e;
            }
        }

        public async Task<bool> GetIsOwner(int userId, int gameId)
        {
            try
            {
                return await gameRepository.GetIsOwner(userId, gameId);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting isOwner");
                throw e;
            }
        }

        public async Task<IEnumerable<int>> GetOwnedGames(int userId)
        {
            try
            {
                return await gameRepository.GetOwnedGames(userId);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting owned games");
                throw e;
            }
        }

        public async Task<GameKey> GetGameKey(int userId, int gameId)
        {
            try
            {
                return await gameRepository.GetGameKey(userId, gameId);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error getting game key");
                throw e;
            }
        }
        #endregion

        #region DELETE
        public async Task<int> UnfeatureGame(int gameId)
        {
            try
            {
                return await gameRepository.UnfeatureGame(gameId);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error unfeaturing game");
                throw e;
            }
        }
        #endregion
    }
}
