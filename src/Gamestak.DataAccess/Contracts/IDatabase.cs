
namespace Gamestak.DataAccess.Contracts
{
    /// <summary>
    /// Represents a typed connectionString
    /// </summary>
    public interface IDatabase
    {
        string ConnectionString { get; }
    }
}
