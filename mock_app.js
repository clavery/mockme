/**
 * Mock App
 */

(function() {
  var testModule = angular.module('MyAppTest', ['MyApp', 'MockMe']);

  testModule.config(function(MockMeProvider) {

    // Setup Mock http endpoints using test data
    MockMeProvider.mappings = [
      { url: '/something', json: window.somethingJson }
    ];

    // Passthrough
    MockMeProvider.passthrough = [
      /templates.*/
    ];

  });

})();
