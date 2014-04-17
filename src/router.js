(function() {
	'use strict';

	var Router = function(routes, options) {
		var _option;

		this.routes = routes;

		if (typeof options === 'object') {
			for (_option in options) {
				if (options.hasOwnProperty(_option)) {
					this[_option] = options[_option];
				}
			}
		}
	};

	Router.prototype = (function() {
		var configure, addRoute, start, route;

		configure = function() {

		};

		addRoute = function(route) {
			var r;
			if (typeof route === 'object') {
				for (r in route) {
					if (route.hasOwnProperty(r)) {
						this.routes[r] = route[r];
					}
				}
			}
		};

		start = function() {

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

}());