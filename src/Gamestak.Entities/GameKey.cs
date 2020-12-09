
using System;

namespace Gamestak.Entities
{
    public class GameKey
    {
        public int KeyID { get; set; }
        public int GameID { get; set; }
        public int UserID { get; set; }
        public Guid KeyCode { get; set; }
    }
}
