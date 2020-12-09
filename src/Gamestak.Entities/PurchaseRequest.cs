using System;
using System.Collections.Generic;
using System.Text;

namespace Gamestak.Entities
{
    public class PurchaseRequest
    {
        public int UserID { get; set; }
        public List<int> GameIDs { get; set; }
    }
}
