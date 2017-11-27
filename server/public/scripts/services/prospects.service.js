myApp.service('ProspectsService', function ($http, $location) {
    
    var self = this;
    self.mentorNum = { list: []};
    self.menteeNum = { list: []};
    self.connectionsNum = {list: []};
    self.directory = {list:[]};
    self.approval = {list:[]};
    self.profile = {list: []};
    self.connections = {list: []};
    self.comments = {list: []};


    // metrics display functions 
    self.getMentorNumbers = function () {
        $http.get('/metricsRoute/mentors').then(function (response) {
            self.mentorNum.list = response.data;
        });
    };

    self.getMenteeNumbers = function () {
        $http.get('/metricsRoute/mentees').then(function (response) {
            self.menteeNum.list = response.data;
        });
    };

    self.getConnectionNumbers = function () {
        $http.get('/metricsRoute/connections').then(function (response) {
            self.connectionsNum.list = response.data;
        });
    };

    // directory display and edit functions
    self.getDirectory = function () {
        $http.get('/directoryRoute').then(function (response) {
            self.directory.list = response.data;
        });
    };

    self.getApproval = function () {
        $http.get('/directoryRoute/unapproved').then(function (response) {
            self.approval.list = response.data;
        });
    };

    self.deleteApproval = function(id) {
        var thisId = id;
        return $http({
            method: 'DELETE',
            url: '/directoryRoute/unapproved/' + thisId
        }).then(function(response) {
            self.getApproval();
        });
    }; // end deleteApproval

    self.updateApproval = function(id, status) {
        var thisId = id;
        var listingStatus = {
            approved: status
        };
        
        $http({
            method: 'PUT',
            url: '/directoryRoute/unapproved/' + thisId,
            data: listingStatus
        }).then(function (response) {
            self.getApproval();
        });
    };

    self.getProfile = function (id) {
        var thisId = id;
        return $http.get('/profilesRoute/' + thisId).then(function (response) {
            self.profile.list = response.data;
            self.getConnections(thisId);
        });
    };

    self.deleteProfile = function(id) {
        var thisId = id;
        return $http({
            method: 'DELETE',
            url: '/directoryRoute/unapproved/' + thisId
        }).then(function(response) {
            console.log('Profile Deleted');
        });
    }; // end deleteApproval
    
    
    self.updateComments = function (id, comment) {
        var thisId = id;
        var newComment = {
            comments: comment
        };
        
        $http({
            method: 'PUT',
            url: '/profilesRoute/' + thisId,
            data: newComment
        }).then(function (response) {
            self.getProfile(thisId);
        });
    };

    self.updateDetails = function (id, details, column) {
        var thisId = id;
        var info = {
            item: details,
            update: column
        };
        
        $http({
            method: 'PUT',
            url: '/profilesRoute/info/' + thisId,
            data: info
        }).then(function (response) {
            self.getProfile(thisId);
        });
    };

    self.getConnections = function(id) {
        var thisId = id;
        return $http.get('/profilesRoute/connections/' + thisId).then(function (response) {
            self.connections.list = response.data;
        });
    };

    self.addConnection = function (id1, id2) {
        $http({
            method: 'POST',
            url: '/profilesRoute/connections',
            data: {
                person1: id1,
                person2: id2
            }
        }).then(function (response) {
            self.getConnections(id1);
        });
    };

    self.deleteConnection = function(id1, id2) {
        var connectionId = id1;
        var profileId =id2;
        return $http({
            method: 'DELETE',
            url: '/profilesRoute/connections/' + connectionId
            }).then(function(response) {
            self.getConnections(id2);
        });
    }; // end deleteConnection

    self.changeTag = function(id){
        $http({
            method: 'PUT',
            url: '/profilesRoute/tags/' + id,
            data: {
                tags: self.profile.list[0].tags
            }
        }).then(function(response){
            console.log('service changeTag'); 
        });
    };

    self.connectionComment = function(id, comment) {
        var thisId = id;
        var newComment = {
            comments: comment
        };
        return $http({
            method: 'PUT',
            url: '/profilesRoute/connections/' + thisId,
            data: newComment
        }).then(function (response) {
            console.log('Approval Updated');
        });
    };
}); // end service