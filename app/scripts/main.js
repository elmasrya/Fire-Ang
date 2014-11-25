(function () {

  angular.module('Items', ['ngRoute', 'firebase']) // Setup our Angular Module
    .constant('FIREBASE_URI', 'https://tiy-andrew.firebaseio.com/');
}());
