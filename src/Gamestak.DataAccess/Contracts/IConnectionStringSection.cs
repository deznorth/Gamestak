
namespace Gamestak.DataAccess.Contracts
{
    /// <summary>
    /// Abstracts getting connection strings from ConfigurationManager.
    /// </summary>
    public interface IConnectionStringSection
    {
        // Get the connection string associated with this name.
        string this[string name] { get; }
    }
}
