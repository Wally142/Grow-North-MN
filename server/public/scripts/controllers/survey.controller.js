myApp.controller('SurveyController', function (FormService, $scope) {
  console.log('SurveyController created');
  var vm = this;

  vm.page = 0;
  $scope.currencyVal;

  vm.formInput = {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    company: null,
    title: null,
    website: null,
    linkedin: null,
    referral: null,
    permission: false,
    mentor: false,
    mentee: false,
    // involvement: null,
    // howhelp: null,
    experience: null,
    struggle: null,
    ecosystem: null,
    // employees: null,
    // revenue: null,
    distribution: null,
    story: null,
    legal: false,
    // new:
    involvement: [],
    revenue: [],
    employees: [],
    howhelp: [],
    ecosystem: []
  };

  // form checkbox values
  vm.mentorValues = ['Via email', 'Meeting for coffee', 'Formalized mentorship'];
  vm.eventsValues = ['Volunteering the day of event', 'Event planning', 'Teaching'];
  vm.revenueValues = ['$ 0 - 10,000', '$ 10,000 - 50,000', '$ 50,000 +'];
  vm.employeesValues = ['0 - 10', '10 - 20', '20 +'];
  vm.distributionValues = [];
  vm.howhelpValues = ['Food safety information', 'Manufacturing help', 'Financial resources', 'A mentor or advisor', 'General information'];
  vm.ecosystemValues = ['Packaged goods', 'Restaurant', 'Beverage (alcohol/non-alcohol)', 'Value added farming', 'Agtech'];

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

  vm.form4Nav = function (page) {
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
    vm.form4Nav(4);
  };



});

myApp.directive('phoneInput', function ($filter, $browser) {
  return {
    require: 'ngModel',
    link: function ($scope, $element, $attrs, ngModelCtrl) {
      var listener = function () {
        var value = $element.val().replace(/[^0-9]/g, '');
        $element.val($filter('tel')(value, false));
      };

      // This runs when we update the text field
      ngModelCtrl.$parsers.push(function (viewValue) {
        return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
      });

      // This runs when the model gets updated on the scope directly and keeps our view in sync
      ngModelCtrl.$render = function () {
        $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
      };

      $element.bind('change', listener);
      $element.bind('keydown', function (event) {
        var key = event.keyCode;
        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
        // This lets us support copy and paste too
        if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          return;
        }
        $browser.defer(listener); // Have to do this or changes don't get picked up properly
      });

      $element.bind('paste cut', function () {
        $browser.defer(listener);
      });
    }

  };
});

myApp.filter('tel', function () {
  return function (tel) {
    console.log(tel);
    if (!tel) { return ''; }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    var country, city, number;

    switch (value.length) {
      case 1:
      case 2:
      case 3:
        city = value;
        break;

      default:
        city = value.slice(0, 3);
        number = value.slice(3);
    }

    if (number) {
      if (number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3, 7);
      }
      else {
        number = number;
      }

      return ("(" + city + ") " + number).trim();
    }
    else {
      return "(" + city;
    }

  };
});