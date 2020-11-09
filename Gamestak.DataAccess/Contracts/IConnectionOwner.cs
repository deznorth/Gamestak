using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Gamestak.DataAccess.Contracts
{
    /// <summary>
    /// Responsible for creating, opening and disposing of instances
    /// of <see cref="System.Data.SqlClient.SqlConnection">SqlConnection</see>.
    /// </summary>
    public interface IConnectionOwner
    {
        // Create and open a connection, then execute the specified function within the scope of that connection.
        Task<TResult> Use<TResult>(Func<SqlConnection, Task<TResult>> func);

        Task Use(Func<SqlConnection, Task> func);

        TResult UseSync<TResult>(Func<SqlConnection, TResult> func);

        IAsyncEnumerable<TResult> Use<TResult>(Func<SqlConnection, IAsyncEnumerable<TResult>> func);
    }

    public interface IConnectionOwner<TDatabase> : IConnectionOwner where TDatabase : IDatabase
    {
    }
}
