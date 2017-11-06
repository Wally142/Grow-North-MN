myApp.service('ProspectsService', function ($http, $location) {
    console.log('ProspectsService Loaded');

    var self = this;
    self.mentorNum = { list: []};
    self.menteeNum = { list: []};
    self.connectionsNum = {list: []};
    self.directory = {list:[]};

    self.getMentorNumbers = function () {
        console.log('In getMentorNumbers');
        $http.get('/metrics/mentors').then(function (response) {
            console.log(response);
            self.mentorNum.list = response.data;
        });
    };

    self.getMenteeNumbers = function () {
        console.log('In getMenteeNumbers');
        $http.get('/metrics/mentees').then(function (response) {
            console.log(response);
            self.menteeNum.list = response.data;
        });
    };

    self.getConnectionNumbers = function () {
        console.log('In getConnections');
        $http.get('/metrics/connections').then(function (response) {
            console.log(response);
            self.connectionsNum.list = response.data;
        });
    };

    self.getDirectory = function () {
        console.log('In getDirectory');
        $http.get('/directory').then(function (response) {
            console.log(response);
            self.directory.list = response.data;
        });
    };






















});
