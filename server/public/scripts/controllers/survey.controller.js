myApp.controller('SurveyController', function (FormService, $scope) {
  console.log('SurveyController created');
  var vm = this;

  vm.page = 0;

  vm.radioSelect = 'mentor';

  vm.formInput = {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    company: null,
    title: null,
    referral: null,
    permission: false,
    mentor: false,
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

  vm.form0Nav = function (page) {
    console.log('$scope.surveyForm0.$valid ->', $scope.surveyForm0.$valid);
    
    if ($scope.surveyForm0.$valid) {
      vm.page=page;
    }
  }

  vm.form1Nav = function (page) {
    console.log('$scope.surveyForm1.$valid ->', $scope.surveyForm1.$valid);

    if ($scope.surveyForm1.$valid || page === 0) {
      vm.page = page;
    }
  }

  vm.form2Nav = function (page) {
    console.log('$scope.surveyForm2.$valid ->', $scope.surveyForm2.$valid);

    if ($scope.surveyForm2.$valid || page === 0 || page === 1) {
      vm.page = page;
    }
  }

  vm.form3Nav = function (page) {
    console.log('$scope.surveyForm3.$valid ->', $scope.surveyForm3.$valid);

    if ($scope.surveyForm3.$valid || page === 0 || page === 1 || page === 2) {
      vm.page = page;
    }
  }

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