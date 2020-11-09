using Dapper;
using Gamestak.Contracts.Repositories;
using Gamestak.DataAccess.Contracts;
using Gamestak.DataAccess.Databases;
using Gamestak.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Gamestak.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConnectionOwner<GamestakDb> gamestakDb;

        public UserRepository(IConnectionOwner<GamestakDb> gamestakDb)
        {
            this.gamestakDb = gamestakDb;
        }

        public Task<List<User>> GetAllUsers()
        {
            return gamestakDb.Use(async conn =>
            {
                var query = "select * from dbo.users";
                return (await conn.QueryAsync<User>(query)).ToList();
            });
        }
    }
}
