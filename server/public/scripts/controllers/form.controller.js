myApp.controller('FormController', function(FormService) {
  console.log('FormController created');
  var vm = this;

  vm.page = 0;

  vm.formInput = {
    name: '',
    email: '',
    phone: '',
    company: '',
    referral: ''
  };

  vm.grabInputs = function(){
    console.log('vm.formInput', vm.formInput);
  };

});