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

  it('should route to method within scope', function() {
    var test = false,
        app = {};

    app.myFun = function() {
      test = true;
    };

    var router = new Router({'/_SpecRunner.html': 'myFun'}, {scope: app});
    router.start();
    expect(test).toBe(true);
  });

  it('should be able to take wildcard params', function() {
    var test = 'false',
    myFun = function(a) {
      test = a;
    };

    var router = new Router({'/:name': myFun});
    router.start();
    expect(test).toBe('_SpecRunner.html');
  });

  describe( 'Router.configure', function() {
    it('it should be able to configure scope', function() {
      var test = false,
          app = {};

      app.myFun = function() {
        test = true;
      };

      var router = new Router({'/_SpecRunner.html': 'myFun'});
      router.configure({scope: app});
      router.start();
      expect(test).toBe(true);
    });

    it('it should be able to configure root', function() {
      // var test = false,
      //     app = {};

      // app.myFun = function() {
      //   test = true;
      // };

      // var router = new Router({'/_SpecRunner.html': 'myFun'});
      // router.configure({root: '/something'});
      // router.start();
      // expect(test).toBe(true);
    });
  });

  describe( 'Router.addRoute', function() {
    it('should work with a scoped method', function() {
      var test = false,
          app = {};

      app.myFun = function() {
        test = true;
      };

      var router = new Router({}, {scope: app});
      router.addRoute({'/_SpecRunner.html': 'myFun'});
      router.start();
      expect(test).toBe(true);
    });

    it('should work with function from current scope', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      var router = new Router();
      router.addRoute({'/_SpecRunner.html': myFun});
      router.start();
      expect(test).toBe(true);
    });

    it('should work with constructor-defined scope', function() {
      var test = false,
          app = {};
      
      app.myFun = function() {
        test = true;
      };

      var router = new Router({}, {scope: app});
      router.addRoute({'/_SpecRunner.html': 'myFun'});
      router.start();
      expect(test).toBe(true);
    });

    it('should work with configure:scope', function() {
      var test = false,
          app = {};
      
      app.myFun = function() {
        test = true;
      };

      var router = new Router();
      router.addRoute({'/_SpecRunner.html': 'myFun'});
      router.configure({scope: app});
      router.start();
      expect(test).toBe(true);
    });

    it('should work without an object', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      var router = new Router();
      router.addRoute('/_SpecRunner.html', myFun);
      router.start();
      expect(test).toBe(true);
    });
  });

  describe( 'Router.route', function() {
    it('placeholder', function() {
      expect(true).toBe(true);
    });
  });

});