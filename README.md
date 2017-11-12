# Grow-North-MN
Group Project

# Known issues:

Directory page:
- After deleting profile, sometimes page will refresh before profile deleted and still show up in directory until manually.

#Clean up:
- Do we actually need $http injected into DirectoryController?
- vm.approve and vm.getApproval functions needed in DirectoryController?

#SQL syntax for updating array values:
--INSERT INTO tag_test VALUES (3, '{thing2}');

--replace existing array:
UPDATE tag_test SET tags = '{thing4, thing5, thing6}' WHERE id = 3;

--update array position [3] value:
UPDATE tag_test SET tags[3] = 'thing4' WHERE id = 3;