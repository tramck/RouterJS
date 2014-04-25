// # RouterJS
// RouterJS is a small, stand-alone javascript router that works very much like the Backbone router, but with a couple of advantages, mainly it's lightweight and doesn't rely on any frameworks or libraries such as Underscore.
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
router.addRoute('/profile/:id', 'profilePage');

// ## start

// Once the router has been configured and routes have been added, `start` needs to be called in order to for the router to run it's main functions. 
// 
// `start` takes a single boolean argument (default: `true`) that will determine if the router calls the route function for the current url, if one exists.
router.start();
// If `false` is passed into `start` the current url's route function, if one exists, will not be triggered.
router.start(false);
// 
// The `start` method does a few things: it starts polling for changes in the url, unless HistoryJS is loaded in which case it will bind the 'statechange' event; 

// ## stop

// The `stop` method causes the router to cease polling for changes in the url, or if using HistoryJS unbinds the 'statechange' event.
router.stop();

// ## route

// The `route` method is used to update the browser url. It takes a required pathname string as it's first argument and also takes an optional options object as the second argument.
router.route('/profile/27');
// The options object can be used to set `replace` and `trigger` both of which default to false.
// 
// When `replace` is set to true, the url will be updated using `replaceState` and will not create a new entry in the browser's history object.
// 
// When `trigger` is set to true, it will trigger the new url's route function, if one exists.
router.route('/profile/27', {
  replace: true,
  trigger: true
});

// <a href="https://github.com/braznaavtrav/RouterJS"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>