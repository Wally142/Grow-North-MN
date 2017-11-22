# Grow-North-MN
Full stack web application built for Grow North MN. This app facilitates connection building between food and agriculture businesses. Admin and guest are the users. Guests can access the survey form to enter their information about their business, which adds this data to a database that can be acccessed by the admin side. The admin can create an account, change password, and log in. Once logged in, admin can view the directory of all persons in the database, read their information, update any line, and delete the person's profile. Admin can also create connections between profiles and add comments about profile or connection.
    LINK TO HEROKU APP

## Built With
JavaScript, AngularJS, Node.js, Express.js, PostgreSql, Angular Material, HTML5, CSS, Material Design icons, Passport, Md Pagination.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).
- [Node.js](https://nodejs.org/en/)
- [Postico] (https://eggerapps.at/postico/)

### Installing
NPM install.
Copy and paste entry in database.sql file in home directory to create necessary tables in Postico.

 +Steps to get the development environment running.
 +
## Screen Shot
Dashboard screenshot:
<img src="readme_images/dashboard.png" height="300px">
Profile view screenshot:
<img src="readme_images/profile.png" height="300px">

 +## Documentation
 +
 +Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.
 +
 +### Completed Features
 +
 +High level list of items completed.
 +
 +- [x] Feature a
 +- [x] Feature b
 +
 +### Next Steps
 +
 +Features that you would like to add at some point in the future.
 +
 +- [ ] Feature c
 +
 +## Deployment
 +
 +Add additional notes about how to deploy this on a live system
 +
 +## Authors
 +
 +* Name of author(s)
 +
 +
 +## Acknowledgments
 +
 +* Hat tip to anyone who's code was used


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

#icon sourcing links:

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

<div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

<div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

class='md-icon-btn' something like this 