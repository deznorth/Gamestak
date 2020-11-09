using Gamestak.DataAccess.Contracts;
using Microsoft.Extensions.Configuration;

namespace Gamestak.DataAccess.Modules
{
    internal class ConfigurationConnectionStrings : IConnectionStringSection
    {
        internal readonly IConfiguration configuration;

        public ConfigurationConnectionStrings(IConfiguration configuration) =>
            this.configuration = configuration;

        public string this[string name] => configuration.GetConnectionString(name);
    }
}
