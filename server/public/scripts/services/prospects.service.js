myApp.service('ProspectsService', function ($http, $location) {
    console.log('ProspectsService Loaded');

    var self = this;
    self.mentorNum = { list: []};
    self.menteeNum = { list: []};
    self.connectionsNum = {list: []};
    self.directory = {list:[]};
    self.approval = {list:[]};
    self.profile = {list: []};

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

    self.getProfile = function (id) {
        var thisId = id;
        console.log('In getProfile with id: ', thisId);
        $http.get('/profiles/' + thisId).then(function (response) {
            console.log(response);
            self.profile.list = response.data;
        });
    };

    self.deleteProfile = function(id) {
        var thisId = id;
        console.log('in Delete Profile function');
        return $http({
            method: 'DELETE',
            url: '/directory/unapproved/' + thisId
        }).then(function(response) {
            console.log('deleteApproval response:', response);
        });
    }; // end deleteApproval
    
    
    self.updateComments = function (id, comment) {
        var thisId = id;
        var newComment = {
            comments: comment
        };
        console.log('in UPDATE APPROVAL', comment);
        $http({
            method: 'PUT',
            url: '/profiles/' + thisId,
            data: newComment
        }).then(function (response) {
            console.log('Approval Update response:', response);
            self.getProfile();
        });
    };
}); // end service