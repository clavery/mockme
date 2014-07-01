/**
 * Main App
 */

(function() {
  var module = angular.module("MyApp", []);

  module.controller('MyController', ['Something', function(Something) {
    var This = this;

    var updateSomethings = function() {
      Something.all().then(function(somethings) {
        This.somethings = somethings;
      });
    };

    updateSomethings();

    this.addSomething = function() {
      var something = new Something({name: This.name});
      something.create();

      This.name = "";
      updateSomethings();

      return true;
    };

    this.deleteSomething = function(something) {
      something.delete();
      updateSomethings();
    };

    return this;
  }]);


  module.factory('Something', function($http) {
    var Something = function(data) {
      angular.extend(this, data);
    };

    /** Get Something by id */
    Something.get = function(id) {
      return $http.get('/something/' + id).then(function(response) {
        return new Something(response.data);
      });
    };

    Something.all = function() {
      return $http.get('/something').then(function(response) {
        return $.map(response.data, function(r) {
          return new Something(r);
        });
      });
    };


    Something.prototype.create = function() {
      var something = this;
      return $http.post('/something', something).then(function(response) {
        something.id = response.data.id;
        return something;
      });
    };

    Something.prototype.delete = function() {
      var something = this;
      return $http.delete('/something/' + something.id).then(function(response) {
        return true;
      });
    };

    Something.prototype.update = function() {
      var something = this;
      return $http.put('/something/' + something.id, something).then(function(response) {
        return something;
      });
    };

    return Something;
  });


})();
