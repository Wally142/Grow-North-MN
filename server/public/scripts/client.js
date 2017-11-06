var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/form', {
      templateUrl: '/views/templates/form.html',
      controller: 'FormController as FC'
    })
    .when('/test', {
      templateUrl: '/views/templates/formTest.html',
      controller: 'FormController as FC'
    })
    .when('/dashboard', {
      templateUrl: '/views/templates/dashboard.html',
      controller: 'MetricsController as MC'
    })
    .otherwise({
      redirectTo: 'home'
    });

  $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('green', {
    'default': '400'
  });
});
