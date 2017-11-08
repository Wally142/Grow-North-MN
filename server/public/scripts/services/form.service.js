myApp.service('FormService', function($http){
    console.log('in FormService');
    var self = this;

    self.addContact = function (contact) {
        console.log('Post contact');
        $http({
            method: 'POST',
            url: '/formRoute/form',
            data: contact
        }).then(function (response) {
            console.log('in service POST with', response);
        })
    }
});// end service