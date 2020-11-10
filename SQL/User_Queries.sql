USE gamestak
GO

DECLARE @UserId int = 8;
DECLARE @Username varchar(50) = 'test';
DECLARE @Password varchar(50) = 'test';

-- CREATE user
--IF NOT EXISTS (SELECT UserId FROM users WHERE Username = @Username)
--BEGIN
--	INSERT INTO users (Username, Password)
--	VALUES (@Username, @Password)
--END

-- DELETE user by id
--IF EXISTS (SELECT UserId FROM users WHERE UserID = @UserId)
--BEGIN
--	DELETE FROM users
--	WHERE UserID = @UserId
--END

-- UPDATE entire user by id
--IF EXISTS (SELECT UserId FROM users WHERE UserID = @UserId)
--and NOT EXISTS (SELECT UserId FROM users WHERE Username = @Username)
--BEGIN
--	UPDATE users
--	SET Username = @Username, [Password] = @Password
--	WHERE UserID = @UserId
--END

-- READ user by id
--SELECT * FROM users WHERE UserID = @UserId

-- READ all users
SELECT * FROM users