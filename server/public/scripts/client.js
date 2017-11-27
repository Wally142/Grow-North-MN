var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'mdCollectionPagination', 'angularUtils.directives.dirPagination']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
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
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/form', {
      templateUrl: '/views/templates/form.html',
      controller: 'SurveyController as SC'
    })
    .when('/test', {
      templateUrl: '/views/templates/formTest.html',
      controller: 'SurveyController as SC'
    })
    .when('/dashboard', {
      templateUrl: '/views/templates/dashboard.html',
      controller: 'MetricsController as MC'
    })
    .when('/autocomplete', {
      templateUrl: '/views/templates/autocomplete.html',
      controller: 'DirectoryController as DC'
    })
    .when('/logout', {
      controller: 'LoginController',
      resolve: {
        logout: function(UserService){
          UserService.logout();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

  $locationProvider.html5Mode(true);

  $mdThemingProvider.definePalette('growNorth', {
    '50': 'e7ebea',
    '100': 'c3cdca',
    '200': '9baca7',
    '300': '728b84',
    '400': '547269',
    '500': '36594f',
    '600': '305148',
    '700': '29483f',
    '800': '223e36',
    '900': '162e26',
    'A100': '427063',
    'A200': '427063', // 3dffbb
    'A400': '427063', // 0affa9
    'A700': '427063', // 00f09c
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': [
      '400',
      '500',
      '600',
      '700',
      '800',
      '900'
    ]
  });

  $mdThemingProvider.theme('default').primaryPalette('growNorth').accentPalette('growNorth' ,{
    'default': '400'
  });

  $mdThemingProvider.theme('alt').primaryPalette('grey').accentPalette('grey');
});
