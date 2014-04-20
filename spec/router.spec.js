describe( 'Router', function() {
  'use strict';

  it('should export as a global', function() {
    var router = new Router();
    expect(typeof router).toBe('object');
  });

  it('should default to current scope', function() {
    var test = false,
    myFun = function() {
      test = true;
    };

    var router = new Router({'/_SpecRunner.html': myFun});
    router.start();
    expect(test).toBe(true);
  });

  it('should use the correct function', function() {
    var test = 'hello',
    myFun = function() {
      test = 'foo';
    },
    another = function() {
      test = 'bar';
    };

    var router = new Router({
      '/_SpecRunner.html': myFun,
      '/hello': another
    });
    router.start();
    expect(test).toBe('foo');
  });

  it('should route to correct method', function() {
    var test = false,
        app = {};

    app.myFun = function() {
      test = true;
    };

    var router = new Router({'/_SpecRunner.html': 'myFun'}, {scope: app});
    router.start();
    expect(test).toBe(true);
  });

  describe( 'Router.route', function() {
    it('placeholder', function() {
      expect(true).toBe(true);
    });
  });

});