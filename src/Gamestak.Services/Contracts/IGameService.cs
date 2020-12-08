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
        public Task<int> FeatureGame(int gameId);
        #endregion

        #region READ
        public Task<IEnumerable<Game>> GetGames(GameSearch searchParams);
        public Task<IEnumerable<Game>> GetFeaturedGames();
        public Task<Game> GetGameByID(int id);
        public Task<IEnumerable<Game>> GetGamesByID(IEnumerable<int> ids);
        public Task<IEnumerable<GameImage>> GetImagesByGameID(int id);
        public Task<GameImage> GetImageByID(int id);
        public Task<IEnumerable<Category>> GetCategories();
        public Task<IEnumerable<Feature>> GetFeatures();
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        public Task<int> UnfeatureGame(int gameId);
        #endregion
    }
}
