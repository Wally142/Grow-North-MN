myApp.controller('FormController', function (FormService) {
  console.log('FormController created');
  var vm = this;

  vm.page = 0;

  vm.radioSelect = 'mentor';

  vm.formInput = {
    name: null,
    email: null,
    phone: null,
    company: null,
    title: null,
    referral: null,
    permission: false,
    mentor: true,
    mentee: false,
    involvement: null,
    howhelp: null,
    experience: null,
    struggle: null,
    ecosystem: null,
    employees: null,
    revenue: null,
    distribution: null,
    story: null,
    legal: false
  };

  vm.detectRadio = function () {
    switch (vm.radioSelect) {
      case 'mentor':
        vm.formInput.mentor = true;
        vm.formInput.mentee = false;
        break;
      case 'mentee':
        vm.formInput.mentor = false;
        vm.formInput.mentee = true;
        break;
      case 'both':
        vm.formInput.mentor = true;
        vm.formInput.mentee = true;
        break;
    }
  }

  vm.grabInputs = function () {
    console.log('vm.formInput', vm.formInput);
    FormService.addContact(vm.formInput);
  };



});