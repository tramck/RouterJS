(function(window) {
  'use strict';

  var Router = function(routes, options) {
    if (typeof routes === 'object') {
      this.addRoute(routes);
    }
    if (typeof options === 'object') {
      this.configure(options);
    }
  };

  Router.prototype = (function() {
    // naming this `b` fixes issue in minified version
    // where isNotRouteAdd wasn't working
    // because its name gets minified to b
    // and isNotRouteAdd tests the function name
    function b(data) {
      for (var d in data) {
        if (data.hasOwnProperty(d)) {
          this[d] = data[d];
        }
      }
    }

    function removeRootFromPath(pathname, root) {
      return pathname.replace(root, '');
    }

    function parseLocation(location) {
      if (location.substr(location.length - 1) === '/' && location.length !== 1) {
        location = location.slice(0, -1);
      }
      location = location.split('/');
      return location;
    }
    
    function testRoute(routeSegments, locationSegments) {
      // console.log(1, routeSegments, 2, locationSegments);
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

    // tests an input to see if it is _routes.add
    function isNotRouteAdd(a) {
      return a !== b;
    }

    function doRoute(routesObj, pathname) {
      var r,
          routeSegments,
          test,
          locationSegments = parseLocation(pathname);

      // loop through _routes object
      for (r in routesObj) {
        if (routesObj.hasOwnProperty(r) && isNotRouteAdd(routesObj[r])) {
          // create arrays of the target url    
          routeSegments = r.split('/');
          test = testRoute(routeSegments, locationSegments);
          if (test && locationSegments.length === routeSegments.length) {
            // console.log(typeof test.wildcards, test.wildcards);
            if (typeof routesObj[r] === 'function') {
              routesObj[r].apply(routesObj[r], test.wildcards);
            }
            else {
              _config.scope[routesObj[r]].apply(_config.scope, test.wildcards);
            }
          }
        }
      }
    }

    // will run every 50ms
    // look for changes in window.location
    function poll() {

    }

    var _routes = {
          add: b
        },
        _config = {
          add: b,
          root: '',
          scope: window
        },
        polling,

    configure = function() {
      if (typeof arguments[0] === 'object') {
        return _config.add(arguments[0]);
      }
      if (typeof arguments[0] === 'string') {
        _config[arguments[0]] = arguments[1];
      }
    },

    addRoute = function(route) {
      var routeObj = {};
      if (typeof route === 'object') {
        routeObj = route;
      }
      else if (typeof route === 'string' && arguments[1]) {
        routeObj[arguments[0]] = arguments[1];
      }
      _routes.add(routeObj);
    },

    start = function(trigger) {
      // start polling for changes in window location pathname
      polling = window.setInterval(poll, 50);
      var pathname,
          _trigger = (trigger !== undefined) ? trigger : true;
      if (_trigger) {
        pathname = removeRootFromPath(window.location.pathname, _config.root);
        doRoute(_routes, pathname);
      }
    },

    stop = function() {
      // clear poll interaval
      window.clearInterval(polling);
    },

    route = function(pathname, options) {
      // trigger defaults to true
      // replace defaults to false
      var trigger = (options.trigger !== undefined) ? options.trigger : true,
          replace = (options.replace !== undefined) ? options.replace : false,
          _pathname = removeRootFromPath(pathname);

      stop();

      if (replace) {
        window.location.pathname = pathname;
      }
      else {
        // create history event
      }

      if (trigger) {
        doRoute(_routes, _pathname);
      }

      start(false);
    };

    return {
      configure: configure,
      addRoute: addRoute,
      start: start,
      stop: stop,
      route: route,
    };

  }());

  window.Router = Router;

}(window));