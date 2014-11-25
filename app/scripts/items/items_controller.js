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
