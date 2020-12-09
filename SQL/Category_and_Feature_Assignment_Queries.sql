USE gamestak
GO

DECLARE @GameID int = 9;
DECLARE @CategoryID int = 2;

DECLARE @FeatureID int = 4;

-- CREATE Category Assignment
IF NOT EXISTS (SELECT * FROM CategoryAssignments WHERE GameID = @GameID AND CategoryID = @CategoryID)
BEGIN
	INSERT INTO CategoryAssignments (GameID, CategoryID)
	VALUES (@GameID, @CategoryID)
END

-- READ Category Assignments
--SELECT AssignmentID, GameID, ca.CategoryID, CategoryName
--FROM CategoryAssignments ca
--JOIN Categories c
--ON c.CategoryID = ca.CategoryID

-- READ Category Assignments by GameID
SELECT AssignmentID, ca.GameID, ca.CategoryID, c.CategoryName, g.Title
FROM CategoryAssignments ca
JOIN Categories c
ON c.CategoryID = ca.CategoryID
JOIN Games g
ON ca.GameID = g.GameID
WHERE ca.GameID = @GameID

-- CREATE Feature Assignment
--IF NOT EXISTS (SELECT * FROM FeatureAssignments WHERE GameID = @GameID AND FeatureID = @FeatureID)
--BEGIN
--	INSERT INTO FeatureAssignments(GameID, FeatureID)
--	VALUES (@GameID, @FeatureID)
--END

-- READ Feature Assignments
--SELECT AssignmentID, GameID, fa.FeatureID, FeatureName
--FROM FeatureAssignments fa
--JOIN Features f
--ON f.FeatureID = fa.FeatureID

-- READ Feature Assignments by GameID
SELECT AssignmentID, fa.GameID, fa.FeatureID, f.FeatureName, g.Title
FROM FeatureAssignments fa
JOIN Features f
ON f.FeatureID = fa.FeatureID
JOIN Games g
ON fa.GameID = g.GameID
WHERE fa.GameID = @GameID