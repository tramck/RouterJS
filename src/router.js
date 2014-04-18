(function(window) {
  'use strict';

  var Router = function(routes, options) {
    var _option;

    if (typeof routes === 'object') {
      this.addRoute(routes);
    }

    if (typeof options === 'object') {
      this.configure(options)
    }
  };

  Router.prototype = (function() {
    
    function addToObject(data) {
      for (var d in data) {
        if (data.hasOwnProperty(d)) {
          this[d] = data[d];
        }
      }
    }

    var configure,
        addRoute,
        start,
        route,
        _routes = {
          add: addToObject
        },
        _config = {
          add: addToObject,
          root: '/',
          scope: window
        };

    configure = function() {
      if (typeof arguments[0] === 'object') {
        return _config.add(arguments[0]);
      }
      if (typeof arguments[0] === 'string') {
        _config[arguments[0]] = arguments[1];
      }
    };

    addRoute = function(route) {
      if (typeof route === 'object') {
        _routes.add(route);
      }
    };

    start = function() {
      
      function parseLocation(location) {
        if (location.substr(location.length - 1) === '/' && location.length !== 1) {
          location = location.slice(0, -1);
        }
        location = location.split('/');
        return location;
      }
      
      function testRoute(routeSegments, locationSegments) {
        var wildcards = [],
            _i;

        for (_i = routeSegments.length - 1; _i >= 0; _i -= 1) {
          if (locationSegments[_i] !== routeSegments[_i] && routeSegments[_i].charAt(0) !== ':') {
            return false;
          }
          if (routeSegments[_i].charAt(0) === ':') {
            wildcards.push(locationSegments[_i]);
          }
        }

        return {
          wildcards: wildcards
        };
      }

      var r,
          routeSegments,
          test,
          locationSegments = parseLocation(window.location.pathname);

      // loop through _routes object    
      for (r in _routes) {
        if (_routes.hasOwnProperty(r)) {
          // create arrays of the target url    
          routeSegments = r.split('/');
          test = testRoute(routeSegments, locationSegments);
          if (test && locationSegments.length === routeSegments.length) {
            test.wildcards.shift();
            _config.scope[_routes[r]].apply(_config.scope, test.wildcards);
          }
        }
      }
    };

    route = function() {

    };

    return {
      configure: configure,
      addRoute: addRoute,
      start: start,
      route: route
    };

  }());

  window.Router = Router;

}(window));