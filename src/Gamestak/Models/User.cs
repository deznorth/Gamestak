using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gamestak.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
