describe( 'Router', function() {
  'use strict';

  function print(obj) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (typeof obj[k] === 'object') {
          console.log(k);
          return print(obj[k]);
        }
        console.log(k, obj[k]);
      }
    }
  }

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
      var test = false,
          myFun = function() {
            test = true;
          };
      
      jasmine.fakeWindow.location.pathname = '/something/hello';
      // print(jasmine.fakeWindow);

      var router = new Router({'/hello': myFun});
      router.configure({root: '/something', window: jasmine.fakeWindow});
      router.start();
      expect(test).toBe(true);
    });
  });

  describe( 'Router.addRoute', function() {
    it('should work with a scoped method', function() {
      var test = false,
          app = {};

      app.myFun = function() {
        test = true;
      };

      var router = new Router({}, {scope: app, window: window});
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
    it('should change pathname', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      jasmine.fakeWindow.location.pathname = '/foo/bar';

      var router = new Router({'/home': myFun}, {window: jasmine.fakeWindow});
      router.start();
      router.route('/home');
      expect(jasmine.fakeWindow.location.pathname).toBe('/home');
    });

    it('should not trigger route', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      jasmine.fakeWindow.location.pathname = '/foo/bar';

      var router = new Router({'/home': myFun}, {window: jasmine.fakeWindow});
      router.start();
      router.route('/home');
      expect(test).toBe(false);
    });
  });

});