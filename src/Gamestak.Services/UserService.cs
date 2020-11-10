using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamestak.Services.Contracts;
using Gamestak.Repositories.Contracts;
using Gamestak.Entities;

namespace Gamestak.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        #region CREATE
        public async Task<int> RegisterUser(User user)
        {
            var result = await userRepository.SaveUser(user);
            return result;
        }
        #endregion

        #region READ
        public async Task<List<UserResponse>> GetAllUsers()
        {
            var result = await userRepository.GetAllUsers();

            var sanitizedResponse = result.Select(r => r.ToResponse()).ToList();

            return sanitizedResponse;
        }

        public async Task<UserResponse> FindUser(UserSearchRequest searchRequest)
        {
            User result;

            switch (searchRequest.Type)
            {
                case UserSearchType.Id:
                    result = await userRepository.GetByID(Convert.ToInt32(searchRequest.Query));
                    break;
                case UserSearchType.Username:
                    result = await userRepository.GetByUsername(searchRequest.Query);
                    break;
                default:
                    result = new User { }; // Figure out error handling later
                    break;
            }

            return result.ToResponse();
        }
        #endregion

        #region DELETE
        public async Task DeleteUserByID(int id)
        {
            await userRepository.DeleteUserByID(id);
        }
        #endregion
    }
}
