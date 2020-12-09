
-- CREATE roles
IF NOT EXISTS (SELECT RoleID FROM UserRoles WHERE Title = 'Admin' or Title = 'Client')
BEGIN
	INSERT INTO UserRoles (Title, ManagementAccess)
	VALUES ('Admin', 1), ('Client', 0)
END

-- UPDATE user to adming
--UPDATE Users
--SET RoleID = 1
--WHERE UserID = 3

-- READ user role
SELECT ur.RoleID, ur.Title, ur.ManagementAccess
FROM UserRoles ur
JOIN Users u ON u.RoleID = ur.RoleID
WHERE u.UserID = 3