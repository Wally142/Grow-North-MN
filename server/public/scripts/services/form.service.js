myApp.service('FormService', function($http){
    console.log('in FormService');
    var self = this;

    self.addContact = function (contact) {
        $http({
            method: 'POST',
            url: '/formRoute/form',
            data: contact
        }).then(function (response) {
            console.log('form posted');
        })
    }
});// end service