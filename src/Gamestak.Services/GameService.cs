using Gamestak.Entities;
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

                savedGame.ImageCollection = savedImages;

                return savedGame;
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error Saving a Game to the DB");
                throw e;
            }
        }
        #endregion

        #region READ
        public async Task<IEnumerable<Game>> GetGames()
        {
            try
            {
                return await gameRepository.GetGames();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error retrieving all games");
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
        #endregion

        #region DELETE
        #endregion
    }
}
