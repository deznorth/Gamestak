using Gamestak.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gamestak.Repositories.Contracts
{
    public interface IUserRepository
    {
        #region CREATE
        public Task<int> SaveUser(User user);
        #endregion

        #region READ
        public Task<User> Login(User user);
        public Task<List<User>> GetAllUsers();
        public Task<User> GetByID(int id);
        public Task<User> GetByUsername(string username);
        public Task<List<int>> GetGamesOwned(int userId);
        #endregion

        #region DELETE
        public Task DeleteUserByID(int id);
        #endregion
    }
}
