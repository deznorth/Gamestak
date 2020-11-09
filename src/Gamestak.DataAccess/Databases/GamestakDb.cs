using Gamestak.DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gamestak.DataAccess.Databases
{
    public sealed class GamestakDb : Database
    {
        public GamestakDb(IConnectionStringSection configSection)
            : base(configSection, "DB")
        {
        }
    }
}
