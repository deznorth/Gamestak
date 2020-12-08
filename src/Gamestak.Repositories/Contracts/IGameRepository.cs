using Gamestak.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gamestak.Repositories.Contracts
{
    public interface IGameRepository
    {
        #region CREATE
        public Task<Game> SaveGame(GameCreationRequest game);
        //public Task<GameImage> SaveGameImage(GameImage image);
        public Task<List<GameImage>> SaveGameImages(int gameId, List<string> images);
        public Task<int> FeatureGame(int gameId);
        public Task<List<Category>> AssignGameCategories(int gameId, List<int> categoryIds);
        public Task<List<Feature>> AssignGameFeatures(int gameId, List<int> featureIds);
        #endregion

        #region READ
        public Task<List<Game>> GetGames();
        public Task<List<Game>> GetFeaturedGames();
        public Task<Game> GetGameByID(int id);
        public Task<List<Game>> GetGamesByID(IEnumerable<int> ids);
        public Task<GameImage> GetImageByID(int id);
        public Task<List<GameImage>> GetImagesByGameID(int id);
        public Task<List<Category>> GetCategories();
        public Task<List<Category>> GetCategoriesByGameID(int gameId);
        public Task<List<Feature>> GetFeatures();
        public Task<List<Feature>> GetFeaturesByGameID(int gameId);
        #endregion

        #region UPDATE
        //public Task<Game> UpdateGameByID(int id, Game game); // Create GameUpdate entity.
        #endregion

        #region DELETE
        public Task<int> UnfeatureGame(int gameId);
        //public Task<int> DeleteGameByID(int id);
        //public Task<int> DeleteGamesByID(IEnumerable<int> ids);
        //public Task<int> DeleteGameImageByID(int id);
        //public Task<int> DeleteGameImagesByGameID(IEnumerable<int> ids);
        #endregion
    }
}
