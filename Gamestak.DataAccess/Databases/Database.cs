using Gamestak.DataAccess.Contracts;

namespace Gamestak.DataAccess.Databases
{
    public abstract class Database : IDatabase
    {
        private readonly IConnectionStringSection configSection;
        private readonly string configurationName;

        protected Database(IConnectionStringSection configSection, string configurationName)
        {
            this.configSection = configSection;
            this.configurationName = configurationName;
        }

        public string ConnectionString => configSection[configurationName];
    }
}
