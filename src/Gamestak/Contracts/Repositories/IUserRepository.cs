using Gamestak.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gamestak.Contracts.Repositories
{
    public interface IUserRepository
    {
        public Task<List<User>> GetAllUsers();
    }
}
