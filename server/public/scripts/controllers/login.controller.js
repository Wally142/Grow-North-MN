myApp.controller('LoginController', function($http, $location, UserService) {
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    UserService.getuser('/home');

    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "You left a field blank";
      } else {
        console.log('LoginController -- login -- sending to server...');
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ');
            // location works with SPA (ng-route)
            UserService.userObject.loggedIn = true;
            $location.path('/dashboard'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ');
            vm.message = "Access denied";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ');
          vm.message = "Access denied";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/registerRoute', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }
    vm.passwordReset = function(email) {
      console.log('Send reset email');
      //Make request to server with user-entered email as parameter
      $http.get('/resetRoute/' + email).then(function(response){
        console.log('reset');
      });
      //Empty reset field
      vm.email = '';
      //Update message to user
      vm.message = 'Check your email. You should receive instructions on how to reset your password.'
    }
});
