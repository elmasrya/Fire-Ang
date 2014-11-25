(function () {

  angular.module('Items')
    .controller('UserController', ['$scope', '$firebaseAuth', 'FIREBASE_URI',
      function ($scope, $firebaseAuth, FIREBASE_URI) {

        var usersRef = new Firebase(FIREBASE_URI);
        $scope.authObj = $firebaseAuth(usersRef);

        $scope.register = function (newUser) {
          $scope.authObj.$createUser(newUser.email, newUser.password)
            .then( function () {
              $scope.login(newUser);
            }).catch( function (error) {
              console.log('Error ', error);
            });
        };

        $scope.login = function (user) {
          $scope.authObj.$authWithPassword({
            email: user.email,
            password: user.password
          }).then ( function () {
            $scope.checkUser();
          }).catch( function (error) {
            alert(error.message);
          });
        };

        $scope.checkUser = function () {
          var authData = $scope.authObj.$getAuth();
          $('#userForm')[0].reset();
          if(authData) {
            console.log('User Logged in as ', authData.password.email);
          } else {
            console.log('No One is Logged in');
          }
        };

      }
    ]);


}());
