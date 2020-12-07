using Gamestak.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gamestak.Services.Contracts
{
    public interface IGameService
    {
        #region CREATE
        public Task<Game> SaveGame(GameCreationRequest game);
        public Task<IEnumerable<Game>> BulkSaveGames(List<GameCreationRequest> games);
        #endregion

        #region READ
        public Task<IEnumerable<Game>> GetGames();
        public Task<Game> GetGameByID(int id);
        public Task<IEnumerable<Game>> GetGamesByID(IEnumerable<int> ids);
        public Task<IEnumerable<GameImage>> GetImagesByGameID(int id);
        public Task<GameImage> GetImageByID(int id);
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        #endregion
    }
}
