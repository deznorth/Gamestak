using Dapper;
using Gamestak.Repositories.Contracts;
using Gamestak.DataAccess.Contracts;
using Gamestak.DataAccess.Databases;
using Gamestak.Entities;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gamestak.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ILogger<UserRepository> logger;
        private readonly IConnectionOwner<GamestakDb> gamestakDb;

        public UserRepository(
            ILogger<UserRepository> logger,
            IConnectionOwner<GamestakDb> gamestakDb
        )
        {
            this.logger = logger;
            this.gamestakDb = gamestakDb;
        }

        #region CREATE
        public Task<int> SaveUser(User user)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @"
                    IF NOT EXISTS (SELECT UserId FROM users WHERE Username = @Username)
                    BEGIN
	                    INSERT INTO users (Username, Password)
	                    VALUES (@Username, @Password)
                    END
                ";

                var rowsAffected = await conn.ExecuteAsync(query, new { 
                    Username = user.Username,
                    Password = user.Password,
                });

                return rowsAffected;
            });
        }

        #endregion

        #region READ
        public Task<List<User>> GetAllUsers()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = "select * from users";

                var response = await conn.QueryAsync<User>(query);

                return response.ToList();
            });
        }

        public Task<User> GetByID(int id)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = "SELECT * FROM users WHERE UserId = @UserId";

                var response = await conn.QueryAsync<User>(query, new { UserId = id });

                return response.FirstOrDefault();
            });
        }

        public Task<User> GetByUsername(string username)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = "SELECT * FROM users WHERE Username = @Username";

                var response = await conn.QueryAsync<User>(query, new { Username = username });

                return response.FirstOrDefault();
            });
        }

        #endregion

        #region DELETE
        public Task DeleteUserByID(int id)
        {
            return gamestakDb.Use(async conn =>
            {
                var query = @"
                    IF EXISTS (SELECT UserId FROM users WHERE UserID = @UserId)
                    BEGIN
	                    DELETE FROM users
	                    WHERE UserID = @UserId
                    END
                ";

                var rowsAffected = await conn.ExecuteAsync(query, new
                {
                    UserId = id
                });

                return rowsAffected;
            });
        }

        #endregion
    }
}
