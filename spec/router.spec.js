describe( 'Router', function() {
	'use strict';

	it('should export as a global', function() {
		var router = new Router({
			'/path/to/:id': 'functionName'
		}, {
			root: '/root/path',
			scope: 'myObj'
		});
		expect(typeof router).toBe('object');
	});
	
	describe( 'Constructor', function() {

		it('should set routes', function() {
			var routes = {
				'/path/to/:id': 'functionName'
			},
			router = new Router(routes);
			expect(router.routes).toBe(routes);
		});

		it('should set root', function() {
			var routes = {
				'/path/to/:id': 'functionName'
			},
			options = {
				root: '/root/path',
				scope: 'myObj'
			},
			router = new Router(routes, options);
			expect(router.root).toBe(options.root);
		});

		it('should set scope', function() {
			var routes = {
				'/path/to/:id': 'functionName'
			},
			options = {
				root: '/root/path',
				scope: 'myObj'
			},
			router = new Router(routes, options);
			expect(router.scope).toBe(options.scope);
		});
	});

	describe( 'Router.configure', function() {
		var router;
		
		beforeEach( function() {
			router = new Router();
		});

		it('should be able to set root with a string', function() {
			router.configure('root', '/my/path');
			expect(router.root).toBe('/my/path');
		});

		it('should be able to set scope with a string', function() {
			router.configure('scope', 'myObj');
			expect(router.scope).toBe('myObj');
		});

		it('should be able to set scope with a string', function() {
			router.configure('scope', 'myObj');
			expect(router.scope).toBe('myObj');
		});
	});

	describe( 'Router.addRoute', function() {
		it('placeholder', function() {
			expect(true).toBe(true);
		});
	});

	describe( 'Router.start', function() {
		it('placeholder', function() {
			expect(true).toBe(true);
		});
	});

	describe( 'Router.route', function() {
		it('placeholder', function() {
			expect(true).toBe(true);
		});
	});

});