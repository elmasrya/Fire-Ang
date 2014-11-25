(function () {

  angular.module('Items', ['ngRoute', 'firebase']) // Setup our Angular Module
    .constant('FIREBASE_URI', 'https://tiy-andrew.firebaseio.com/');
}());

(function () {

  angular.module('Items') // way to get our main module
    .controller('ItemsListController', ['$scope', 'FIREBASE_URI', '$firebase',
      function ($scope, FIREBASE_URI, $firebase) {

        var itemsRef = new Firebase(FIREBASE_URI + 'items');

        $scope.items = $firebase(itemsRef).$asArray();

        $scope.title = 'List of Items';

        $scope.addItem = function (item) {
          $scope.items.$add(item); // Add this Item to my Array
          $('#addForm')[0].reset(); // Reset my Form
        };

        $scope.deleteItem = function (item) {
          $scope.items.$remove(item);
        };



    }]);

}());

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
