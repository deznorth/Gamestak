using System;
using System.Diagnostics;
using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Gamestak.Repositories;
using Gamestak.Services;
using Gamestak.DataAccess.Databases;
using Gamestak.DataAccess;

namespace Gamestak
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment hostingEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            this.configuration = configuration;
            this.hostingEnvironment = hostingEnvironment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            LogStartup();

            services.AddMvc();

            services
                .AddHttpContextAccessor()
                .AddControllersWithViews();

            // Http Clients
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Serilog Logging
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .Enrich.WithProperty("App Name", "Gamestak")
                .WriteTo.Console()
                .CreateLogger();
            
            void LogStartup()
            {
                var pid = Process.GetCurrentProcess().Id;
                var name = GetType().Namespace;
                Console.WriteLine("[{0}] service started as pid [{1}]", name, pid);
            }
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Modules
            builder.RegisterModule(new ModuleBuilder()
                .UseDefaultConfigManagerCore()
                .UseConnectionOwner<GamestakDb>()
                .Build());

            // Repositories
            builder.RegisterType<UserRepository>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<GameRepository>().AsImplementedInterfaces().SingleInstance();

            // Services
            builder.RegisterType<UserService>().AsImplementedInterfaces().SingleInstance();
            builder.RegisterType<GameService>().AsImplementedInterfaces().SingleInstance();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            var forwardedHeadersOptions = new ForwardedHeadersOptions
            {
                RequireHeaderSymmetry = false,
                ForwardedHeaders = ForwardedHeaders.All
            };
            forwardedHeadersOptions.KnownNetworks.Clear();
            forwardedHeadersOptions.KnownProxies.Clear();

            if (env.EnvironmentName != "Unf")
            {
                app.UseHttpsRedirection();
            }

            app
                .UseStaticFiles()
                .UseRouting();

            app
                .UseAuthentication()
                .UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseCors(policy =>
            {
                var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? new string[] { };
                policy.WithOrigins(allowedOrigins);
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
            });
        }
    }
}
