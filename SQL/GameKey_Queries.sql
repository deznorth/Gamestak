
DECLARE @UserId int = 3;
DECLARE @GameId int = 24;

-- CREATE new game key
--IF NOT EXISTS (SELECT GameID FROM GameKeys WHERE UserID = @UserId and GameID = @GameId)
--BEGIN
--	INSERT INTO GameKeys (GameID, UserID)
--	VALUES (@GameId, @UserId)
--END

-- READ check if a user is the owner of a game by checking game key
--SELECT g.GameID FROM Games g
--JOIN GameKeys gk ON g.GameID = gk.GameID
--WHERE g.GameID = @GameId and gk.UserID = @UserId

-- READ get game keys by userid and gameid
SELECT * FROM GameKeys
WHERE GameID = @GameId and UserID = @UserId

-- READ get game keys by userid and gameid
SELECT * FROM GameKeys
WHERE UserID = @UserId

-- READ get list of games owned by userid
SELECT GameID FROM GameKeys
WHERE UserID = @UserId