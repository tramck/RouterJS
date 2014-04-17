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
		it('placeholder', function() {
			expect(true).toBe(true);
		});
	});

	describe( 'Router.configure', function() {
		it('placeholder', function() {
			expect(true).toBe(true);
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