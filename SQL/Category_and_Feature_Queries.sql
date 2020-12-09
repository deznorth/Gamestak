USE gamestak
GO

DECLARE @CategoryID int = 6;
DECLARE @CategoryName varchar(80) = 'Survival';

DECLARE @FeatureID int = 4;
DECLARE @FeatureName varchar(80) = 'VR';

-- CREATE Category
IF NOT EXISTS (SELECT CategoryName FROM Categories WHERE CategoryName = @CategoryName)
BEGIN
	INSERT INTO Categories (CategoryName)
	VALUES (@CategoryName)
END

-- READ Categories
SELECT * FROM Categories

-- DELETE Category by ID
--IF EXISTS (SELECT CategoryID FROM Categories WHERE CategoryID = @CategoryID)
--BEGIN
--	DELETE FROM Categories WHERE CategoryID = @CategoryID
--END

-- CREATE Feature
IF NOT EXISTS (SELECT FeatureName FROM Features WHERE FeatureName = @FeatureName)
BEGIN
	INSERT INTO Features (FeatureName)
	VALUES (@FeatureName)
END

-- READ Features
SELECT * FROM Features

-- DELETE Feature by ID
--IF EXISTS (SELECT FeatureID FROM Features WHERE FeatureID = @FeatureID)
--BEGIN
--	DELETE FROM Features WHERE FeatureID = @FeatureID
--END