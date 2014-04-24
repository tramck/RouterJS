(function() {
  function parseUri(str) {
  var o = parseUri.options,
    m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
}

parseUri.options = {
  strictMode: false,
  key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
  q: {
    name: "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

  (function (jasmine) {
  "use strict";

  if (typeof parseUri === 'undefined') {
    throw "Missing dependency parseUri";
  }

  var fakeWindow = {};

  /**
   * init location object
   */
  var location = {};

  /**
   * location.href
   */
  Object.defineProperty(location, 'href', {
    value: "",
    enumerable: true,
    writable: true
  });

  /**
   * location.pathname
   */
  Object.defineProperty(location, 'pathname', {
    value: "",
    enumerable: true,
    writable: true
  });

  /**
   * location.port
   */
  Object.defineProperty(location, "port", {
    get: function() {
      return parseUri(this.href).port;
    },
    set: function(port) {
      var old = this.port;
      this.href = this.href.replace(old, port);
    },
    enumerable: true
  });

  /**
   * location.host
   */
  Object.defineProperty(location, "host", {
    get: function() {
      return this.hostname + ":" + this.port;
    },
    set: function(host) {
      var old = this.host;
      this.href = this.href.replace(old, host);
    },
    enumerable: true
  });

  /**
   * location.hostname
   * @returns {String} host + port
   */
  Object.defineProperty(location, 'hostname', {
    get: function() {
      return parseUri(this.href).host;
    },
    set: function(hostname) {
      var old = this.hostname;
      this.href = this.href.replace(old, hostname);
    }
  });

  /**
   * location.hash
   */
  Object.defineProperty(location, 'hash', {
    get: function() {
      var hash = parseUri(this.href).anchor;
      return hash ? "#" + hash : "";
    },
    set: function(hash) {
      var old = this.hash;
      this.href = this.href.replace(old, hash);
    }
  });

  /**
   * location.origin
   */
  Object.defineProperty(location, 'origin', {
    get: function() {
      return this.protocol + "//" + this.host;
    },
    set: function(origin) {
      var old = this.origin;
      this.href = this.href.replace(old, origin);
    }
  });

  /**
   * location.origin
   */
  Object.defineProperty(location, 'search', {
    get: function() {
      var q = parseUri(this.href).query;
      return q ? "?" + q : "";
    },
    set: function(search) {
      var old = this.search;
      this.href = this.href.replace(old, search);
    }
  });

  /**
   * location.protocol
   */
  Object.defineProperty(location, "protocol", {
    get: function() {
      return parseUri(this.href).protocol + ":";
    },
    set: function(protocol) {
      var old = this.protocol;
      this.href = this.href.replace(old, protocol);
    }
  });
  location.reload = function() {};
  location.replace = function() {};

  // fakeWindow.addEventListener = function(name, callback) {
  //   var evt = new window.CustomEvent(name, callback);
  //   fakeWindow.dispatchEvent(evt);
  // };

  fakeWindow.addEventListener = function() {};

  /**
   * set location object
   */
  Object.defineProperty(fakeWindow, "location", {
    value: location,
    writable: false,
    enumerable: true
  });

  jasmine.fakeWindow = fakeWindow;
}(jasmine));

}());