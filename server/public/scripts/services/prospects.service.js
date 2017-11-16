myApp.service('ProspectsService', function ($http, $location) {
    console.log('ProspectsService Loaded');

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
        console.log('In getMentorNumbers');
        $http.get('/metricsRoute/mentors').then(function (response) {
            console.log(response);
            self.mentorNum.list = response.data;
        });
    };

    self.getMenteeNumbers = function () {
        console.log('In getMenteeNumbers');
        $http.get('/metricsRoute/mentees').then(function (response) {
            console.log(response);
            self.menteeNum.list = response.data;
        });
    };

    self.getConnectionNumbers = function () {
        console.log('In getConnections');
        $http.get('/metricsRoute/connections').then(function (response) {
            console.log(response);
            self.connectionsNum.list = response.data;
        });
    };

    // directory display and edit functions
    self.getDirectory = function () {
        console.log('In getDirectory');
        $http.get('/directoryRoute').then(function (response) {
            console.log(response);
            self.directory.list = response.data;
        });
    };

    self.getApproval = function () {
        console.log('In getApproval');
        $http.get('/directoryRoute/unapproved').then(function (response) {
            console.log(response);
            self.approval.list = response.data;
        });
    };

    self.deleteApproval = function(id) {
        var thisId = id;
        console.log('in Delete Approval function');
        return $http({
            method: 'DELETE',
            url: '/directoryRoute/unapproved/' + thisId
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
            url: '/directoryRoute/unapproved/' + thisId,
            data: listingStatus
        }).then(function (response) {
            console.log('Approval Update response:', response); 
            self.getApproval();
        });
    };

    self.getProfile = function (id) {
        var thisId = id;
        console.log('In getProfile with id: ', thisId);
        return $http.get('/profilesRoute/' + thisId).then(function (response) {
            console.log(response);
            self.profile.list = response.data;
            self.getConnections(thisId);
        });
    };

    self.deleteProfile = function(id) {
        var thisId = id;
        console.log('in Delete Profile function');
        return $http({
            method: 'DELETE',
            url: '/directoryRoute/unapproved/' + thisId
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
            url: '/profilesRoute/' + thisId,
            data: newComment
        }).then(function (response) {
            console.log('Approval Update response:', response);
            self.getProfile(thisId);
        });
    };

    self.updateDetails = function (id, details, column) {
        var thisId = id;
        var info = {
            item: details,
            update: column
        };
        console.log('in UPDATE Details',id, info);
        $http({
            method: 'PUT',
            url: '/profilesRoute/info/' + thisId,
            data: info
        }).then(function (response) {
            console.log('Approval Update response:', response);
            self.getProfile(thisId);
        });
    };

    self.getConnections = function(id) {
        var thisId = id;
        console.log('In getConnections with id: ', thisId);
        return $http.get('/profilesRoute/connections/' + thisId).then(function (response) {
            console.log(response);
            self.connections.list = response.data;
        });
    };

    self.addConnection = function (id1, id2) {
        console.log('Post contact');
        $http({
            method: 'POST',
            url: '/profilesRoute/connections',
            data: {
                person1: id1,
                person2: id2
            }
        }).then(function (response) {
            console.log('in service connection POST with', response);
            self.getConnections(id1);
        });
    };

    self.deleteConnection = function(id1, id2) {
        var connectionId = id1;
        var profileId =id2;
        console.log('profileID:', id2, "connectionsId", id1);
        return $http({
            method: 'DELETE',
            url: '/profilesRoute/connections/' + connectionId
            }).then(function(response) {
            console.log('deleteApproval response:', response);
            self.getConnections(id2);
        });
    }; // end deleteConnection

    self.changeTag = function(id){
        console.log('id, tag array: ', id, self.profile.list[0].tags);
        $http({
            method: 'PUT',
            url: '/profilesRoute/tags/' + id,
            data: {
                tags: self.profile.list[0].tags
            }
        }).then(function(response){
            console.log('service changeTag response: ', response); 
        });
    };

    self.connectionComment = function(id, comment) {
        console.log('comment on connections with ID:', id);
        var thisId = id;
        var newComment = {
            comments: comment
        };
        return $http({
            method: 'PUT',
            url: '/profilesRoute/connections/' + thisId,
            data: newComment
        }).then(function (response) {
            console.log('Approval Update response:', response);
        });
    };

    // self.getConnectionComments = function(id){
    //     var thisId = id;
    //     $http.get('/profilesRoute/commentsConnections/' + thisId).then(function (response) {
    //         console.log('response');
    //         self.comments.list = response.data;
    //         console.log(self.comments.list);
    //     });
    // };

}); // end service