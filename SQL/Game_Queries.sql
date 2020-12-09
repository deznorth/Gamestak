USE gamestak
GO

DECLARE @GameId int = 14;
DECLARE @Price float = 14.99;
DECLARE @Title varchar(50) = 'Crash Bandicoot: Insane Trilogy';
DECLARE @Description varchar(255) = 'This is the description for some game';
DECLARE @HeroImageUrl varchar(128) = 'https://assets1.ignimgs.com/2018/03/09/crash-bandicoot-n-sane-trilogy---button-f-1520563395501.jpg';
DECLARE @ReleaseDate Date = '2020-11-11';

DECLARE @ImageId int = 3;
DECLARE @GameImageUrl varchar(128) = 'https://cdn.images.express.co.uk/img/dynamic/143/590x/Crash-Bandicoot-PS4-Xbox-One-N-Sane-Trilogy-823477.jpg';
--DECLARE @GameImageUrl varchar(128) = 'https://images.pushsquare.com/screenshots/83423/large.jpg';

-- CREATE Game
--IF NOT EXISTS (SELECT GameID FROM Games WHERE Title = @Title)
--BEGIN
--	INSERT INTO Games (Title, Price, ReleaseDate, HeroImageUrl, [Description])
--	VALUES (@Title, @Price, @ReleaseDate, @HeroImageUrl, @Description)
--END
--SELECT * FROM Games WHERE Title = @Title

-- CREATE GameImage
--IF NOT EXISTS (SELECT GameID FROM GameImages WHERE GameID = @GameId and [Url] = @GameImageUrl)
--BEGIN
--	INSERT INTO GameImages(GameID, [Url])
--	VALUES (@GameId, @GameImageUrl)
--END
--SELECT * FROM GameImages WHERE GameID = @GameId

-- DELETE game by id
--IF EXISTS (SELECT GameID FROM Games WHERE GameID = @GameId)
--BEGIN
--	DELETE FROM Games
--	WHERE GameID = @GameId
--END

-- DELETE game image by id
--IF EXISTS (SELECT [ImageID] FROM GameImages WHERE [ImageID] = @ImageId)
--BEGIN
--	DELETE FROM GameImages
--	WHERE [ImageID] = @ImageId
--END

-- UPDATE increase purchase count by 1
--IF EXISTS (SELECT GameID FROM Games WHERE GameID = @GameId)
--BEGIN
--	UPDATE Games
--	SET Purchases = ISNULL(Purchases, 0) + 1
--	WHERE GameID = @GameId
--END

-- UPDATE a game's price and description
--IF EXISTS (SELECT GameID FROM Games WHERE GameID = @GameId)
--BEGIN
--	UPDATE Games
--	SET Price = @Price, [Description] = @Description
--	WHERE GameID = @GameId
--END

-- READ get image by id
--SELECT * FROM GameImages WHERE [ImageID] = @ImageId

-- READ get by id
--SELECT * FROM Games WHERE GameID = @GameId

-- READ get GameImages by GameID
--SELECT * FROM GameImages WHERE GameID = @GameId

-- CREATE Feature a game
--IF NOT EXISTS (SELECT GameID FROM FeaturedGames WHERE GameID = @GameId)
--BEGIN
--	INSERT INTO FeaturedGames (GameID)
--	VALUES (@GameId)
--END

-- DELETE Unfeature a game
--IF EXISTS (SELECT GameID FROM FeaturedGames WHERE GameID = @GameId)
--BEGIN
--	DELETE FROM FeaturedGames
--	WHERE GameID = @GameId
--END

-- READ get all featured games
--SELECT * FROM Games g JOIN FeaturedGames fg ON g.GameID = fg.GameID 

-- READ get all games
--SELECT * FROM Games

-- READ search all games
SELECT * FROM Games
WHERE Title LIKE '%f%'
ORDER BY Title ASC