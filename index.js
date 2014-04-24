// # Router.JS
// Router.JS is a stand-alone javascript router that works very much like the Backbone router, but with a couple of advantages: mainly it's small in weight and doesn't rely on any frameworks or libraries such as Underscore.
// 
// As an added bonus if HistoryJS is found to be present, RouterJS will use the HistoryJS listeners and triggers.

// ---
// ## Basic Usage

// Say, for instance, we have some functions `foo` and `bar` that we want to run only at certain URLs. 
function foo() { ... }
function bar(id) { ... }
// The router is instantiated with a routes object that is structured exactly like the routes object in Backbone. The keys in this object act as matchers for the url path. The values are the functions that will run with that path is reached. 
// 
// Any path segment prefixed with a colon, like `/:id` will get treated as a wildcard and it's value will be passed as an argument into the function that gets run by the route.
var router = new Router({
  '/foo': 'foo',
  '/bar/:id': 'bar'
});
// Once the router has been configured the `start` method is run to trigger the current page's route function and start polling for changes in `window.location.pathname`.
router.start();

// ## The Constructor

// A router can be instantiated without requiring any arguments.
var router = new Router();
// An optional routes object can be passed into the constructor
var router = new Router({
  '/foo': 'foo',
  '/bar/:id': 'bar'
});
// In addition to the routes object, the constructor can take an optial configuration object as a second argument.
var router = new Router(routesObj, {
  scope: app,
  root: '/profile'
});

// ## configure

// The `configure` method configures settings that affect the functionality of your router. Options can be passed in singularly as two arguments.
router.configure('scope', myObj);
// Or plurally with a configuration object, like the one that can get passed into the second argument of the constructor.
router.configure({
  scope: myObj, 
  root: '/example/test'
});
// #### Options

// - `scope`: (type: 'object', default: `this`) The object that the router will look for methods within. Default scope is the function / object that Router is instantiated within.
var app = { ... };
router.configure({ scope: app });

// - `root`: (type: 'string', default: `'/'`) The root path you app is running on.
router.configure({ root: '/my/app/' });

// ## addRoute

// Routes can also be added with the `addRoute` method. Routes can be passed into `addRoute` two ways. It can take a single routes object as an argument.
router.addRoute({'/profile/:id': 'profilePage'});
// Or the route object's key and value can be passed into `addRoute` as two separate arguments.
router.addRoute({'/profile/:id': 'profilePage'});

// ## start

// ## stop

// ## route

// <script>
// console.log('hello');
// </script>

