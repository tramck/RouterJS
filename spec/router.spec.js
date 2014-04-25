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

    it('it should work with two strings', function() {
      var test = false,
          myFun = function() {
            test = true;
          };
      
      jasmine.fakeWindow.location.pathname = '/something/hello';
      // print(jasmine.fakeWindow);

      var router = new Router({'/hello': myFun});
      router.configure({window: jasmine.fakeWindow});
      router.configure('root', '/something');
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

    it('should work without an object, with scope', function() {
      var test = false,
          app = {};
      
      app.myFun = function() {
        test = true;
      };

      var router = new Router();
      router.addRoute('/_SpecRunner.html', 'myFun');
      router.configure({scope: app});
      router.start();
      expect(test).toBe(true);
    });
  });

  describe( 'Router.start', function() {
    var router,
    _window = jasmine.fakeWindow,
    test,
    app = { hello: function() { test = true; } };


    beforeEach( function() {
      test = false;
      _window.location.pathname = '/foo';
      router = new Router({ '/foo': 'hello'}, {window: _window, scope: app});
    });

    afterEach( function() {
      router = {};
    });
    
    it('should start polling', function() {
      var pollSpy = sinon.spy(_window, 'setInterval');
      router.start();
      expect(pollSpy.called).toBe(true);
    });

    it('should trigger route by default', function() {
      router.start();
      expect(test).toBe(true);
    });

    it('should have the option to not trigger route', function() {
      router.start(false);
      expect(test).toBe(false);
    });

  });

  describe( 'Router.route', function() {
    var _window;

    beforeEach(function() {
      _window = jasmine.fakeWindow;
      _window.location.pathname = '/foo/bar';
    });

    it('should not trigger route by default', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      var router = new Router({'/home': myFun}, {window: _window});
      router.start();
      router.route('/home');
      expect(test).toBe(false);
    });

    it('should be able to trigger a route', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      var router = new Router({'/home': myFun}, {window: _window});
      router.start();
      router.route('/home', { trigger: true });
      expect(test).toBe(true);
    });

    it('should change pathname', function() {
      var test = false,
      myFun = function() {
        test = true;
      };

      var router = new Router({'/home': myFun}, {window: _window});
      router.start();
      router.route('/home');
      expect(jasmine.fakeWindow.location.pathname).toBe('/home');
    });

  });

});