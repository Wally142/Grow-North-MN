myApp.service('FormService', function($http){
    console.log('in FormService');
    var self = this;

    self.addContact = function (list) {
        console.log('Post contact');
        $http({
            method: 'POST',
            url: '/form/form',
            data: list
        }).then(function (response) {
            console.log('in service POST with', response);
        })
    }
});// end service