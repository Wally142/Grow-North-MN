myApp.factory('UserService', function($http, $location){
  console.log('UserService Loaded');

  var userObject = {};

  return {
    userObject : userObject,

    getuser : function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('UserService -- getuser -- User Data: ', userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    },

    updateEmail : function(email){
      var data = {email: email}

      $http.put('/user/email', data).then(function(response){
        console.log(response);
        if (response.status === 201){
          userObject.message = 'Email changed successfully.'
        }else{
          userObject.message = 'There was an error changing your email.'
        }
      })
    },

    updatePassword : function(newPassword){
      var data = {newPassword: newPassword}

      $http.put('/user/password', data).then(function(response){
        console.log(response);
        if (response.status === 201){
          userObject.message = 'Password changed successfully.'
        }else{
          userObject.message = 'There was an error changing your password.'
        }
      })
    }
  };
});
