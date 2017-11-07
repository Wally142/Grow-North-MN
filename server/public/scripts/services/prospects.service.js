myApp.service('ProspectsService', function ($http, $location) {
    console.log('ProspectsService Loaded');

    var self = this;
    self.mentorNum = { list: []};
    self.menteeNum = { list: []};
    self.connectionsNum = {list: []};
    self.directory = {list:[]};
    self.approval = {list:[]};


    // metrics display functions 
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

    // directory display and edit functions
    self.getDirectory = function () {
        console.log('In getDirectory');
        $http.get('/directory').then(function (response) {
            console.log(response);
            self.directory.list = response.data;
        });
    };

    self.getApproval = function () {
        console.log('In getApproval');
        $http.get('/directory/unapproved').then(function (response) {
            console.log(response);
            self.approval.list = response.data;
        });
    };

    self.deleteApproval = function(id) {
        var thisId = id;
        console.log('in Delete Approval function');
        return $http({
            method: 'DELETE',
            url: '/directory/unapproved/' + thisId
        }).then(function(response) {
            console.log('deleteApproval response:', response);
            self.getApproval();
        });
    }; // end deleteApproval

    self.updateApproval = function(id, status) {
        var thisId = id;
        var listingStatus = {
            approved: status
        };
        console.log('in UPDATE APPROVAL', listingStatus);
        $http({
            method: 'PUT',
            url: '/directory/unapproved/' + thisId,
            data: listingStatus
        }).then(function (response) {
            console.log('Approval Update response:', response); 
            self.getApproval();
        });
    };

}); // end service