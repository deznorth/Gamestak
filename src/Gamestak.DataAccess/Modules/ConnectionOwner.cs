using Gamestak.DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;


namespace Gamestak.DataAccess.Modules
{
    public class ConnectionOwner : IConnectionOwner
    {
        private readonly Func<string> connectionStringResolver;

        public ConnectionOwner(Func<string> connectionStringResolver) =>
            this.connectionStringResolver = connectionStringResolver;

        public async Task<TResult> Use<TResult>(Func<SqlConnection, Task<TResult>> func)
        {
            using (var cnxn = new SqlConnection(connectionStringResolver()))
            {
                await cnxn.OpenAsync().ConfigureAwait(false);
                return await func(cnxn).ConfigureAwait(false);
            }
        }

        public async Task Use(Func<SqlConnection, Task> func)
        {
            using (var cnxn = new SqlConnection(connectionStringResolver()))
            {
                await cnxn.OpenAsync().ConfigureAwait(false);
                await func(cnxn).ConfigureAwait(false);
            }
        }

        public TResult UseSync<TResult>(Func<SqlConnection, TResult> func)
        {
            using (var cnxn = new SqlConnection(connectionStringResolver()))
            {
                cnxn.Open();
                return func(cnxn);
            }
        }

        public async IAsyncEnumerable<TResult> Use<TResult>(Func<SqlConnection, IAsyncEnumerable<TResult>> func)
        {
            using var conn = new SqlConnection(connectionStringResolver());
            await conn.OpenAsync();
            await foreach (var result in func(conn))
            {
                yield return result;
            }
        }
    }

    internal class ConnectionOwner<TDatabase> : ConnectionOwner, IConnectionOwner<TDatabase>
        where TDatabase : IDatabase
    {
        public ConnectionOwner(TDatabase database)
            : base(() => database.ConnectionString)
        {
        }
    }
}
