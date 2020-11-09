using System;
using System.Collections.Generic;
using Autofac;
using Gamestak.DataAccess.Contracts;
using Gamestak.DataAccess.Modules;
using Microsoft.Extensions.Configuration;

namespace Gamestak.DataAccess
{
    /// <summary>
    /// All of the ModuleBuilder methods register to autofac
    /// </summary>
    public sealed class ModuleBuilder
    {
        private readonly IList<Action<ContainerBuilder>> actions = new List<Action<ContainerBuilder>>();

        public ModuleBuilder UseDefaultConfigManagerCore()
        {
            actions.Add(builder =>
                builder.Register<IConnectionStringSection>(ctx =>
                    new ConfigurationConnectionStrings(ctx.Resolve<IConfiguration>())
                    ).SingleInstance()
                    .PreserveExistingDefaults());

            return this;
        }
        
        /// <summary>
        /// Setup a database to be able to be resolved.
        /// </summary>
        /// <typeparam name="TDatabase"></typeparam>
        /// <returns></returns>
        public ModuleBuilder UseConnectionOwner<TDatabase>()
            where TDatabase : IDatabase
        {
            actions.Add(builder =>
                builder.RegisterType<TDatabase>()
                    .AsSelf()
                    .SingleInstance()
                    .PreserveExistingDefaults());

            actions.Add(builder =>
                builder.RegisterType<ConnectionOwner<TDatabase>>()
                    .As<IConnectionOwner<TDatabase>>()
                    .SingleInstance()
                    .PreserveExistingDefaults());

            return this;
        }

        // Construct the module based on the configuration methods.
        public Module Build()
        {
            return new DynamicModule(actions);
        }
    }
}
