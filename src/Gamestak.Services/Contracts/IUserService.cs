using Gamestak.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gamestak.Services.Contracts
{
    public interface IUserService
    {
        #region CREATE
        public Task<int> RegisterUser(User user);
        #endregion

        #region READ
        public Task<UserResponse> Login(User user);
        public Task<List<UserResponse>> GetAllUsers();
        public Task<UserResponse> FindUser(UserSearchRequest searchRequest);
        #endregion

        #region DELETE
        public Task DeleteUserByID(int id);
        #endregion
    }
}
