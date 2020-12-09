using System;
using System.Collections.Generic;
using System.Text;

namespace Gamestak.Entities
{
    public class UserRole
    {
        public int RoleID { get; set; }
        public string Title { get; set; }
        public bool ManagementAccess { get; set; }
    }
}
