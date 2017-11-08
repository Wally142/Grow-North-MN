myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.userObject.message = '';

  vm.updateEmail = function(email){
    UserService.updateEmail(email);
    vm.email = '';
  }

  vm.updatePassword = function(password){
    if (vm.password === vm.passwordConfirm){
      UserService.updatePassword(password);
      vm.password = '';
      vm.passwordConfirm = '';
    }else{
      vm.userObject.message = 'Password and password confirmation didn\'t match';
      vm.password = '';
      vm.passwordConfirm = '';
    }
  }
});
