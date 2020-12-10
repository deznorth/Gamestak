# Gamestak - Web Systems Development - Final Project

## [View Trello Board](https://trello.com/b/4Zmzav4T/fall20-websys-project)
The Trello board shows how I planned and managed the project. There's items that were left incomplete and I might or might not continue with them. It also shows images of the design I created in AdobeXD. If you don't want to have to build the project and execute it yourself, this is a good way to see what it looks like without the hassle.

See more information about the project on the [wiki's homepage](https://github.com/deznorth/Gamestak/wiki)

## Running the project
In order to run this project on your local environment, you'll need to have `Visual Studio 2019`, `node v^14.5.0`, `yarn v^1.22.4`.
Steps:
 1. Pull this repository (preferrably the `master` branch)
 2. Go into `/src/Gamestak.Client/`
 3. Open a terminal window there and run `yarn` to install front-end dependencies
 4. After it has finished, run `yarn run build:dev`. this will build the front-end and output the files to the solution's `/wwwroot/dist` folder
 5. Go back to the root of the repo and open `Gamestak.sln`
 6. Expand the `appsettings.json` file to reveal the `.Development.json` and `.Unf.json` variants of the file. You can ignore the one named `.Unf.json`
 7. Open the `appsettings.Development.json` file and replace the "DB" connection string with one for your own database instance.
 8. After this is done, look in the wiki for instructions on [how to setup the Database tables.](https://github.com/deznorth/Gamestak/wiki/Setting-up-DB-Tables-for-testing)

## Development

While developing this application, I worked on my personal desktop, using a SQL Server Express database that I setup at my home. However, I created a separate profile called UNF that contains the appropriate connection string so that the app utilizes the SQL Server instance provided by UNF along with the Windows Authentication.

### Known Issues

- When trying to access the application over HTTPS using Google Chrome within UNF's remote desktop app, the page responds with an error. This is a problem with IIS and Google Chrome. My work around was to disable HTTPS Redirection when the UNF profile is selected and going to `http://localhost:5000/`
