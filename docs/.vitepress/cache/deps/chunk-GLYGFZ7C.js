import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter3.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter3.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter3;
    }
  }
});

// node_modules/delegate/src/closest.js
var require_closest = __commonJS({
  "node_modules/delegate/src/closest.js"(exports, module) {
    var DOCUMENT_NODE_TYPE = 9;
    if (typeof Element !== "undefined" && !Element.prototype.matches) {
      proto = Element.prototype;
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
    }
    var proto;
    function closest(element, selector) {
      while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === "function" && element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
      }
    }
    module.exports = closest;
  }
});

// node_modules/delegate/src/delegate.js
var require_delegate = __commonJS({
  "node_modules/delegate/src/delegate.js"(exports, module) {
    var closest = require_closest();
    function _delegate2(element, selector, type, callback, useCapture) {
      var listenerFn = listener.apply(this, arguments);
      element.addEventListener(type, listenerFn, useCapture);
      return {
        destroy: function() {
          element.removeEventListener(type, listenerFn, useCapture);
        }
      };
    }
    function delegate(elements, selector, type, callback, useCapture) {
      if (typeof elements.addEventListener === "function") {
        return _delegate2.apply(null, arguments);
      }
      if (typeof type === "function") {
        return _delegate2.bind(null, document).apply(null, arguments);
      }
      if (typeof elements === "string") {
        elements = document.querySelectorAll(elements);
      }
      return Array.prototype.map.call(elements, function(element) {
        return _delegate2(element, selector, type, callback, useCapture);
      });
    }
    function listener(element, selector, type, callback) {
      return function(e) {
        e.delegateTarget = closest(e.target, selector);
        if (e.delegateTarget) {
          callback.call(element, e);
        }
      };
    }
    module.exports = delegate;
  }
});

// node_modules/xgplayer/es/_virtual/_rollupPluginBabelHelpers.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance2, Constructor) {
  if (!(instance2 instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// node_modules/xgplayer/es/mediaProxy.js
var import_eventemitter3 = __toESM(require_eventemitter3());

// node_modules/xgplayer/es/utils/debug.js
var XG_DEBUG_OPEN = typeof window !== "undefined" && window.location && window.location.href.indexOf("xgplayerdebugger=1") > -1;
var STYLE = {
  info: "color: #525252; background-color: #90ee90;",
  error: "color: #525252; background-color: red;",
  warn: "color: #525252; background-color: yellow; "
};
var XGTAG = "%c[xgplayer]";
var XG_DEBUG = {
  config: {
    debug: XG_DEBUG_OPEN ? 3 : 0
  },
  logInfo: function logInfo(message) {
    var _console;
    for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      optionalParams[_key - 1] = arguments[_key];
    }
    this.config.debug >= 3 && (_console = console).log.apply(_console, [XGTAG, STYLE.info, message].concat(optionalParams));
  },
  logWarn: function logWarn(message) {
    var _console2;
    for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      optionalParams[_key2 - 1] = arguments[_key2];
    }
    this.config.debug >= 1 && (_console2 = console).warn.apply(_console2, [XGTAG, STYLE.warn, message].concat(optionalParams));
  },
  logError: function logError(message) {
    var _console3;
    if (this.config.debug < 1) {
      return;
    }
    var _fun = this.config.debug >= 2 ? "trace" : "error";
    for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      optionalParams[_key3 - 1] = arguments[_key3];
    }
    (_console3 = console)[_fun].apply(_console3, [XGTAG, STYLE.error, message].concat(optionalParams));
  }
};
function bindDebug(player) {
  player.logInfo = XG_DEBUG.logInfo.bind(player);
  player.logWarn = XG_DEBUG.logWarn.bind(player);
  player.logError = XG_DEBUG.logError.bind(player);
}

// node_modules/xgplayer/es/utils/xgplayerTimeRange.js
var XgplayerTimeRange = function() {
  function XgplayerTimeRange2(bufferedList) {
    _classCallCheck(this, XgplayerTimeRange2);
    this.bufferedList = bufferedList;
  }
  _createClass(XgplayerTimeRange2, [{
    key: "start",
    value: function start(index) {
      return this.bufferedList[index].start;
    }
  }, {
    key: "end",
    value: function end(index) {
      return this.bufferedList[index].end;
    }
  }, {
    key: "length",
    get: function get() {
      return this.bufferedList.length;
    }
  }]);
  return XgplayerTimeRange2;
}();

// node_modules/xgplayer/es/utils/util.js
var util = {};
util.createDom = function() {
  var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "div";
  var tpl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var cname = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
  var dom = document.createElement(el);
  dom.className = cname;
  dom.innerHTML = tpl;
  Object.keys(attrs).forEach(function(item) {
    var key = item;
    var value = attrs[item];
    if (el === "video" || el === "audio" || el === "live-video") {
      if (value) {
        dom.setAttribute(key, value);
      }
    } else {
      dom.setAttribute(key, value);
    }
  });
  return dom;
};
util.createDomFromHtml = function(html) {
  var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var classname = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  try {
    var doc = document.createElement("div");
    doc.innerHTML = html;
    var dom = doc.children;
    doc = null;
    if (dom.length > 0) {
      dom = dom[0];
      classname && util.addClass(dom, classname);
      if (attrs) {
        Object.keys(attrs).forEach(function(key) {
          dom.setAttribute(key, attrs[key]);
        });
      }
      return dom;
    }
    return null;
  } catch (err) {
    XG_DEBUG.logError("util.createDomFromHtml", err);
    return null;
  }
};
util.hasClass = function(el, className) {
  if (!el || !className) {
    return false;
  }
  try {
    return Array.prototype.some.call(el.classList, function(item) {
      return item === className;
    });
  } catch (e) {
    var orgClassName = el.className && _typeof(el.className) === "object" ? el.getAttribute("class") : el.className;
    return orgClassName && !!orgClassName.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
};
util.addClass = function(el, className) {
  if (!el || !className) {
    return;
  }
  try {
    className.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach(function(item) {
      item && el.classList.add(item);
    });
  } catch (e) {
    if (!util.hasClass(el, className)) {
      if (el.className && _typeof(el.className) === "object") {
        el.setAttribute("class", el.getAttribute("class") + " " + className);
      } else {
        el.className += " " + className;
      }
    }
  }
};
util.removeClass = function(el, className) {
  if (!el || !className) {
    return;
  }
  try {
    className.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach(function(item) {
      item && el.classList.remove(item);
    });
  } catch (e) {
    if (util.hasClass(el, className)) {
      className.split(/\s+/g).forEach(function(item) {
        var reg = new RegExp("(\\s|^)" + item + "(\\s|$)");
        if (el.className && _typeof(el.className) === "object") {
          el.setAttribute("class", el.getAttribute("class").replace(reg, " "));
        } else {
          el.className = el.className.replace(reg, " ");
        }
      });
    }
  }
};
util.toggleClass = function(el, className) {
  if (!el) {
    return;
  }
  className.split(/\s+/g).forEach(function(item) {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item);
    } else {
      util.addClass(el, item);
    }
  });
};
util.classNames = function() {
  var _arguments = arguments;
  var classname = [];
  var _loop = function _loop2(i2) {
    if (util.typeOf(_arguments[i2]) === "String") {
      classname.push(_arguments[i2]);
    } else if (util.typeOf(_arguments[i2]) === "Object") {
      Object.keys(_arguments[i2]).map(function(key) {
        if (_arguments[i2][key]) {
          classname.push(key);
        }
      });
    }
  };
  for (var i = 0; i < arguments.length; i++) {
    _loop(i);
  }
  return classname.join(" ");
};
util.findDom = function() {
  var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  var sel = arguments.length > 1 ? arguments[1] : void 0;
  var dom;
  try {
    dom = el.querySelector(sel);
  } catch (e) {
    XG_DEBUG.logError("util.findDom", e);
    if (sel.indexOf("#") === 0) {
      dom = el.getElementById(sel.slice(1));
    }
  }
  return dom;
};
util.getCss = function(dom, key) {
  return dom.currentStyle ? dom.currentStyle[key] : document.defaultView.getComputedStyle(dom, false)[key];
};
util.padStart = function(str, length, pad) {
  var charstr = String(pad);
  var len = length >> 0;
  var maxlen = Math.ceil(len / charstr.length);
  var chars = [];
  var r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join("").substring(0, len - r.length) + r;
};
util.format = function(time) {
  if (window.isNaN(time)) {
    return "";
  }
  time = Math.round(time);
  var hour = util.padStart(Math.floor(time / 3600), 2, 0);
  var minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
  var second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
  return (hour === "00" ? [minute, second] : [hour, minute, second]).join(":");
};
util.event = function(e) {
  if (e.touches) {
    var touch = e.touches[0] || e.changedTouches[0];
    e.clientX = touch.clientX || 0;
    e.clientY = touch.clientY || 0;
    e.offsetX = touch.pageX - touch.target.offsetLeft;
    e.offsetY = touch.pageY - touch.target.offsetTop;
  }
  e._target = e.target || e.srcElement;
};
util.typeOf = function(obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
};
util.deepCopy = function(dst, src) {
  if (util.typeOf(src) === "Object" && util.typeOf(dst) === "Object") {
    Object.keys(src).forEach(function(key) {
      if (util.typeOf(src[key]) === "Object" && !(src[key] instanceof Node)) {
        if (dst[key] === void 0 || dst[key] === void 0) {
          dst[key] = src[key];
        } else {
          util.deepCopy(dst[key], src[key]);
        }
      } else if (util.typeOf(src[key]) === "Array") {
        dst[key] = util.typeOf(dst[key]) === "Array" ? dst[key].concat(src[key]) : src[key];
      } else {
        dst[key] = src[key];
      }
    });
    return dst;
  }
};
util.deepMerge = function(dst, src) {
  Object.keys(src).map(function(key) {
    if (util.typeOf(src[key]) === "Array" && util.typeOf(dst[key]) === "Array") {
      if (util.typeOf(dst[key]) === "Array") {
        var _dst$key;
        (_dst$key = dst[key]).push.apply(_dst$key, _toConsumableArray(src[key]));
      }
    } else if (util.typeOf(dst[key]) === util.typeOf(src[key]) && dst[key] !== null && util.typeOf(dst[key]) === "Object" && !(src[key] instanceof window.Node)) {
      util.deepMerge(dst[key], src[key]);
    } else {
      src[key] !== null && (dst[key] = src[key]);
    }
  });
  return dst;
};
util.getBgImage = function(el) {
  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
  if (!url || url === "none") {
    return "";
  }
  var a = document.createElement("a");
  a.href = url.replace(/url\("|"\)/g, "");
  return a.href;
};
util.copyDom = function(dom) {
  if (dom && dom.nodeType === 1) {
    var back = document.createElement(dom.tagName);
    Array.prototype.forEach.call(dom.attributes, function(node) {
      back.setAttribute(node.name, node.value);
    });
    if (dom.innerHTML) {
      back.innerHTML = dom.innerHTML;
    }
    return back;
  } else {
    return "";
  }
};
util.setInterval = function(context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = window.setInterval(intervalFunc.bind(context), frequency);
  }
};
util.clearInterval = function(context, eventName) {
  clearInterval(context._interval[eventName]);
  context._interval[eventName] = null;
};
util.setTimeout = function(context, fun, time) {
  if (!context._timers) {
    context._timers = [];
  }
  var id = setTimeout(function() {
    fun();
    util.clearTimeout(context, id);
  }, time);
  context._timers.push(id);
  return id;
};
util.clearTimeout = function(context, id) {
  var _timers = context._timers;
  if (util.typeOf(_timers) === "Array") {
    for (var i = 0; i < _timers.length; i++) {
      if (_timers[i] === id) {
        _timers.splice(i, 1);
        clearTimeout(id);
        break;
      }
    }
  } else {
    clearTimeout(id);
  }
};
util.clearAllTimers = function(context) {
  var _timers = context._timers;
  if (util.typeOf(_timers) === "Array") {
    _timers.map(function(item) {
      clearTimeout(item);
    });
    context._timerIds = [];
  }
};
util.createImgBtn = function(name, imgUrl, width, height) {
  var btn = util.createDom("xg-".concat(name), "", {}, "xgplayer-".concat(name, "-img"));
  btn.style.backgroundImage = 'url("'.concat(imgUrl, '")');
  if (width && height) {
    var w, h, unit;
    ["px", "rem", "em", "pt", "dp", "vw", "vh", "vm", "%"].every(function(item) {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = parseFloat(width.slice(0, width.indexOf(item)).trim());
        h = parseFloat(height.slice(0, height.indexOf(item)).trim());
        unit = item;
        return false;
      } else {
        return true;
      }
    });
    btn.style.width = "".concat(w).concat(unit);
    btn.style.height = "".concat(h).concat(unit);
    btn.style.backgroundSize = "".concat(w).concat(unit, " ").concat(h).concat(unit);
    if (name === "start") {
      btn.style.margin = "-".concat(h / 2).concat(unit, " auto auto -").concat(w / 2).concat(unit);
    } else {
      btn.style.margin = "auto 5px auto 5px";
    }
  }
  return btn;
};
util.Hex2RGBA = function(hex, alpha) {
  var rgb = [];
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    var sixHex = "#";
    hex.replace(/[0-9A-F]/ig, function(kw) {
      sixHex += kw + kw;
    });
    hex = sixHex;
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function(kw) {
      rgb.push(parseInt(kw, 16));
    });
    return "rgba(".concat(rgb.join(","), ", ").concat(alpha, ")");
  } else {
    return "rgba(255, 255, 255, 0.1)";
  }
};
util.getFullScreenEl = function() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
};
util.checkIsFunction = function(fun) {
  return fun && typeof fun === "function";
};
util.checkIsObject = function(obj) {
  return obj !== null && _typeof(obj) === "object";
};
util.hide = function(dom) {
  dom.style.display = "none";
};
util.show = function(dom, display) {
  dom.style.display = display || "block";
};
util.isUndefined = function(val) {
  if (typeof val === "undefined" || val === null) {
    return true;
  }
};
util.isNotNull = function(val) {
  return !(val === void 0 || val === null);
};
util.setStyleFromCsstext = function(dom, text) {
  if (!text) {
    return;
  }
  if (util.typeOf(text) === "String") {
    var styleArr = text.replace(/\s+/g, "").split(";");
    styleArr.map(function(item) {
      if (item) {
        var arr = item.split(":");
        if (arr.length > 1) {
          dom.style[arr[0]] = arr[1];
        }
      }
    });
  } else {
    Object.keys(text).map(function(key) {
      dom.style[key] = text[key];
    });
  }
};
function checkIsIn(key, list) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (key.indexOf(list[i]) > -1) {
      return true;
    }
  }
  return false;
}
util.filterStyleFromText = function(dom) {
  var list = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["width", "height", "top", "left", "bottom", "right", "position", "z-index", "padding", "margin", "transform"];
  var _cssText = dom.style.cssText;
  if (!_cssText) {
    return {};
  }
  var styleArr = _cssText.replace(/\s+/g, "").split(";");
  var ret = {};
  var remain = {};
  styleArr.map(function(item) {
    if (item) {
      var arr = item.split(":");
      if (arr.length > 1) {
        if (checkIsIn(arr[0], list)) {
          ret[arr[0]] = arr[1];
        } else {
          remain[arr[0]] = arr[1];
        }
      }
    }
  });
  dom.setAttribute("style", "");
  Object.keys(remain).map(function(key) {
    dom.style[key] = remain[key];
  });
  return ret;
};
util.getStyleFromCsstext = function(dom) {
  var _cssText = dom.style.cssText;
  if (!_cssText) {
    return {};
  }
  var styleArr = _cssText.replace(/\s+/g, "").split(";");
  var ret = {};
  styleArr.map(function(item) {
    if (item) {
      var arr = item.split(":");
      if (arr.length > 1) {
        ret[arr[0]] = arr[1];
      }
    }
  });
  return ret;
};
util.preloadImg = function(url) {
  var onload = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
  };
  var onerror = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
  };
  if (!url) {
    return;
  }
  var img = new window.Image();
  img.onload = function(e) {
    img = null;
    onload && onload(e);
  };
  img.onerror = function(e) {
    img = null;
    onerror && onerror(e);
  };
  img.src = url;
};
util.stopPropagation = function(e) {
  if (e) {
    e.stopPropagation();
  }
};
util.scrollTop = function() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
util.scrollLeft = function() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};
util.checkTouchSupport = function() {
  return "ontouchstart" in window;
};
util.getBuffered2 = function(vbuffered) {
  var maxHoleDuration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
  var buffered = [];
  for (var i = 0; i < vbuffered.length; i++) {
    buffered.push({
      start: vbuffered.start(i) < 0.5 ? 0 : vbuffered.start(i),
      end: vbuffered.end(i)
    });
  }
  buffered.sort(function(a, b) {
    var diff = a.start - b.start;
    if (diff) {
      return diff;
    } else {
      return b.end - a.end;
    }
  });
  var buffered2 = [];
  if (maxHoleDuration) {
    for (var _i = 0; _i < buffered.length; _i++) {
      var buf2len = buffered2.length;
      if (buf2len) {
        var buf2end = buffered2[buf2len - 1].end;
        if (buffered[_i].start - buf2end < maxHoleDuration) {
          if (buffered[_i].end > buf2end) {
            buffered2[buf2len - 1].end = buffered[_i].end;
          }
        } else {
          buffered2.push(buffered[_i]);
        }
      } else {
        buffered2.push(buffered[_i]);
      }
    }
  } else {
    buffered2 = buffered;
  }
  return new XgplayerTimeRange(buffered2);
};
util.getEventPos = function(e) {
  var zoom = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if (e.touches && e.touches.length > 0) {
    e = e.touches[0];
  }
  return {
    x: e.x / zoom,
    y: e.y / zoom,
    clientX: e.clientX / zoom,
    clientY: e.clientY / zoom,
    offsetX: e.offsetX / zoom,
    offsetY: e.offsetY / zoom,
    pageX: e.pageX / zoom,
    pageY: e.pageY / zoom
  };
};
util.requestAnimationFrame = function(callback) {
  var _fun = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  if (_fun) {
    return _fun(callback);
  }
};
util.getHostFromUrl = function(url) {
  if (util.typeOf(url) !== "String") {
    return "";
  }
  var results = url.split("/");
  var domain = "";
  if (results.length > 3 && results[2]) {
    domain = results[2];
  }
  return domain;
};
util.cancelAnimationFrame = function(frameId) {
  var _fun = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.cancelRequestAnimationFrame;
  _fun && _fun(frameId);
};
util.isMSE = function(video) {
  if (video.media) {
    video = video.media;
  }
  if (!video || !(video instanceof HTMLMediaElement)) {
    return false;
  }
  return /^blob/.test(video.currentSrc) || /^blob/.test(video.src);
};
util.isBlob = function(url) {
  return typeof url === "string" && /^blob/.test(url);
};
util.generateSessionId = function() {
  var did = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  var d = (/* @__PURE__ */ new Date()).getTime();
  try {
    did = parseInt(did);
  } catch (e) {
    did = 0;
  }
  d += did;
  if (window.performance && typeof window.performance.now === "function") {
    d += parseInt(window.performance.now());
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
  return uuid;
};
util.createEvent = function(eventName) {
  var event;
  if (typeof window.Event === "function") {
    event = new Event(eventName);
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
  }
  return event;
};
util.adjustTimeByDuration = function(time, duration, isEnded) {
  if (!duration || !time) {
    return time;
  }
  if (time > duration || isEnded && time < duration) {
    return duration;
  }
  return time;
};
util.createPositionBar = function(className, root) {
  var dom = util.createDom("xg-bar", "", {
    "data-index": -1
  }, className);
  root.appendChild(dom);
  return dom;
};
util.getTransformStyle = function() {
  var pos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0
  };
  var transformValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var styles = {
    scale: "".concat(pos.scale || 1),
    translate: "".concat(pos.x || 0, "%, ").concat(pos.y || 0, "%"),
    rotate: "".concat(pos.rotate || 0, "deg")
  };
  var stylesKeys = Object.keys(styles);
  stylesKeys.forEach(function(key) {
    var reg = new RegExp("".concat(key, "\\([^\\(]+\\)"), "g");
    var fn = "".concat(key, "(").concat(styles[key], ")");
    if (reg.test(transformValue)) {
      reg.lastIndex = -1;
      transformValue = transformValue.replace(reg, fn);
    } else {
      transformValue += "".concat(fn, " ");
    }
  });
  return transformValue;
};
util.convertDeg = function(val) {
  if (Math.abs(val) <= 1) {
    return val * 360;
  }
  return val % 360;
};
util.getIndexByTime = function(time, segments) {
  var _len = segments.length;
  var _index = -1;
  if (_len < 1) {
    return _index;
  }
  if (time <= segments[0].end || _len < 2) {
    _index = 0;
  } else if (time > segments[_len - 1].end) {
    _index = _len - 1;
  } else {
    for (var i = 1; i < _len; i++) {
      if (time > segments[i - 1].end && time <= segments[i].end) {
        _index = i;
        break;
      }
    }
  }
  return _index;
};
util.getOffsetCurrentTime = function(currentTime, segments) {
  var index = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1;
  var _index = -1;
  if (index >= 0 && index < segments.length) {
    _index = index;
  } else {
    _index = util.getIndexByTime(currentTime, segments);
  }
  if (_index < 0) {
    return -1;
  }
  var _len = segments.length;
  var _segments$_index = segments[_index], start = _segments$_index.start, end = _segments$_index.end, cTime = _segments$_index.cTime, offset = _segments$_index.offset;
  if (currentTime < start) {
    return cTime;
  } else if (currentTime >= start && currentTime <= end) {
    return currentTime - offset;
  } else if (currentTime > end && _index >= _len - 1) {
    return end;
  }
  return -1;
};
util.getCurrentTimeByOffset = function(offsetTime, segments) {
  var _index = -1;
  if (!segments || segments.length < 0) {
    return offsetTime;
  }
  for (var i = 0; i < segments.length; i++) {
    if (offsetTime <= segments[i].duration) {
      _index = i;
      break;
    }
  }
  if (_index !== -1) {
    var start = segments[_index].start;
    if (_index - 1 < 0) {
      return start + offsetTime;
    } else {
      return start + (offsetTime - segments[_index - 1].duration);
    }
  }
  return offsetTime;
};
function isObject(value) {
  var type = _typeof(value);
  return value !== null && (type === "object" || type === "function");
}
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
  var lastInvokeTime = 0;
  var leading = false;
  var maxing = false;
  var trailing = true;
  var useRAF = !wait && wait !== 0 && typeof window.requestAnimationFrame === "function";
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function startTimer(pendingFunc, wait2) {
    if (useRAF) {
      window.cancelAnimationFrame(timerId);
      return window.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRAF) {
      return window.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);
    for (var _len2 = arguments.length, args = new Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
function throttle(func, wait, options) {
  var leading = true;
  var trailing = true;
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}
function getLang() {
  var lang = (document.documentElement.getAttribute("lang") || navigator.language || "zh-cn").toLocaleLowerCase();
  if (lang === "zh-cn") {
    lang = "zh";
  }
  return lang;
}
function checkIsCurrentVideo(element, playerId, key) {
  if (!element) {
    return;
  }
  var pid = element.getAttribute(key);
  if (pid && pid === playerId && (element.tagName === "VIDEO" || element.tagName === "AUDIO")) {
    return true;
  }
  return false;
}

// node_modules/xgplayer/es/utils/sniffer.js
var VERSION_REG = {
  android: /(Android)\s([\d.]+)/,
  ios: /(Version)\/([\d.]+)/
};
var H264_MIMETYPES = ["avc1.42E01E, mp4a.40.2", "avc1.58A01E, mp4a.40.2", "avc1.4D401E, mp4a.40.2", "avc1.64001E, mp4a.40.2", "avc1.42E01E", "mp4v.20.8", "mp4v.20.8, mp4a.40.2", "mp4v.20.240, mp4a.40.2"];
var sniffer = {
  get device() {
    var r = sniffer.os;
    return r.isPc ? "pc" : "mobile";
  },
  get browser() {
    if (typeof navigator === "undefined") {
      return "";
    }
    var ua = navigator.userAgent.toLowerCase();
    var reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return [].concat(Object.keys(reg).filter(function(key) {
      return reg[key].test(ua);
    }))[0];
  },
  get os() {
    if (typeof navigator === "undefined") {
      return {};
    }
    var ua = navigator.userAgent;
    var isWindowsPhone = /(?:Windows Phone)/.test(ua);
    var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    var isAndroid = /(?:Android)/.test(ua);
    var isFireFox = /(?:Firefox)/.test(ua);
    var isIpad = /(?:iPad|PlayBook)/.test(ua) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    var isTablet = isIpad || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
    var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    var isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
    return {
      isTablet,
      isPhone,
      isIpad,
      isIos: isPhone || isIpad,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    };
  },
  get osVersion() {
    if (typeof navigator === "undefined") {
      return 0;
    }
    var ua = navigator.userAgent;
    var reg = "";
    if (/(?:iPhone)|(?:iPad|PlayBook)/.test(ua)) {
      reg = VERSION_REG.ios;
    } else {
      reg = VERSION_REG.android;
    }
    var _match = reg ? reg.exec(ua) : [];
    if (_match && _match.length >= 3) {
      var version2 = _match[2].split(".");
      return version2.length > 0 ? parseInt(version2[0]) : 0;
    }
    return 0;
  },
  get isWeixin() {
    if (typeof navigator === "undefined") {
      return false;
    }
    var reg = /(micromessenger)\/([\d.]+)/;
    var match = reg.exec(navigator.userAgent.toLocaleLowerCase());
    if (match) {
      return true;
    }
    return false;
  },
  isSupportMP4: function isSupportMP4() {
    var result = {
      isSupport: false,
      mime: ""
    };
    if (typeof document === "undefined") {
      return result;
    }
    if (this.supportResult) {
      return this.supportResult;
    }
    var a = document.createElement("video");
    if (typeof a.canPlayType === "function") {
      H264_MIMETYPES.map(function(key) {
        if (a.canPlayType('video/mp4; codecs="'.concat(key, '"')) === "probably") {
          result.isSupport = true;
          result.mime += "||".concat(key);
        }
      });
    }
    this.supportResult = result;
    a = null;
    return result;
  },
  isMSESupport: function isMSESupport() {
    var mime = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"';
    if (typeof MediaSource === "undefined" || !MediaSource)
      return false;
    try {
      return MediaSource.isTypeSupported(mime);
    } catch (error) {
      this._logger.error(mime, error);
      return false;
    }
  },
  isHevcSupported: function isHevcSupported() {
    if (typeof MediaSource === "undefined" || !MediaSource.isTypeSupported) {
      return false;
    }
    return MediaSource.isTypeSupported('video/mp4;codecs="hev1.1.6.L120.90"') || MediaSource.isTypeSupported('video/mp4;codecs="hev1.2.4.L120.90"') || MediaSource.isTypeSupported('video/mp4;codecs="hev1.3.E.L120.90"') || MediaSource.isTypeSupported('video/mp4;codecs="hev1.4.10.L120.90"');
  },
  probeConfigSupported: function probeConfigSupported(info) {
    var defaults = {
      supported: false,
      smooth: false,
      powerEfficient: false
    };
    if (!info || typeof navigator === "undefined") {
      return Promise.resolve(defaults);
    }
    if (navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo) {
      return navigator.mediaCapabilities.decodingInfo(info);
    } else {
      var videoConfig = info.video || {};
      var audioConfig = info.audio || {};
      try {
        var videoSupported = MediaSource.isTypeSupported(videoConfig.contentType);
        var audioSupported = MediaSource.isTypeSupported(audioConfig.contentType);
        return Promise.resolve({
          supported: videoSupported && audioSupported,
          smooth: false,
          powerEfficient: false
        });
      } catch (e) {
        return Promise.resolve(defaults);
      }
    }
  }
};

// node_modules/xgplayer/es/version.js
var version = "3.0.20";

// node_modules/xgplayer/es/error.js
var ERROR_TYPE_MAP = {
  1: "media",
  2: "media",
  3: "media",
  4: "media",
  5: "media",
  6: "media"
};
var ERROR_MAP = {
  1: 5101,
  2: 5102,
  3: 5103,
  4: 5104,
  5: 5105,
  6: 5106
};
var Errors = _createClass(
  function Errors2(player) {
    var errorInfo = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      errorType: "",
      errorCode: 0,
      errorMessage: "",
      originError: "",
      ext: {},
      mediaError: null
    };
    _classCallCheck(this, Errors2);
    var ERROR_TYPES = player && player.i18n ? player.i18n.ERROR_TYPES : null;
    if (player.media) {
      var mediaError = errorInfo.mediaError ? errorInfo.mediaError : player.media.error || {};
      var duration = player.duration, currentTime = player.currentTime, ended = player.ended, src = player.src, currentSrc = player.currentSrc;
      var _player$media = player.media, readyState = _player$media.readyState, networkState = _player$media.networkState;
      var _errc = errorInfo.errorCode || mediaError.code;
      if (ERROR_MAP[_errc]) {
        _errc = ERROR_MAP[_errc];
      }
      var r = {
        playerVersion: version,
        currentTime,
        duration,
        ended,
        readyState,
        networkState,
        src: src || currentSrc,
        errorType: errorInfo.errorType,
        errorCode: _errc,
        message: errorInfo.errorMessage || mediaError.message,
        mediaError,
        originError: errorInfo.originError ? errorInfo.originError.stack : "",
        host: util.getHostFromUrl(src || currentSrc)
      };
      errorInfo.ext && Object.keys(errorInfo.ext).map(function(key) {
        r[key] = errorInfo.ext[key];
      });
      return r;
    } else {
      if (arguments.length > 1) {
        var _r = {
          playerVersion: version,
          domain: document.domain
        };
        var arr = ["errorType", "currentTime", "duration", "networkState", "readyState", "src", "currentSrc", "ended", "errd", "errorCode", "mediaError"];
        for (var i = 0; i < arguments.length; i++) {
          _r[arr[i]] = arguments[i];
        }
        _r.ex = ERROR_TYPES ? (ERROR_TYPES[arguments[0]] || {}).msg : "";
        return _r;
      }
    }
  }
);

// node_modules/xgplayer/es/events.js
var events_exports = {};
__export(events_exports, {
  ABORT: () => ABORT,
  AFTER_DEFINITION_CHANGE: () => AFTER_DEFINITION_CHANGE,
  AUTOPLAY_PREVENTED: () => AUTOPLAY_PREVENTED,
  AUTOPLAY_STARTED: () => AUTOPLAY_STARTED,
  BEFORE_DEFINITION_CHANGE: () => BEFORE_DEFINITION_CHANGE,
  BUFFER_CHANGE: () => BUFFER_CHANGE,
  CANPLAY: () => CANPLAY,
  CANPLAY_THROUGH: () => CANPLAY_THROUGH,
  COMPLETE: () => COMPLETE,
  CSS_FULLSCREEN_CHANGE: () => CSS_FULLSCREEN_CHANGE,
  DEFINITION_CHANGE: () => DEFINITION_CHANGE,
  DESTROY: () => DESTROY,
  DOWNLOAD_SPEED_CHANGE: () => DOWNLOAD_SPEED_CHANGE,
  DURATION_CHANGE: () => DURATION_CHANGE,
  EMPTIED: () => EMPTIED,
  ENDED: () => ENDED,
  ENTER_PLAYER: () => ENTER_PLAYER,
  ERROR: () => ERROR,
  FPS_STUCK: () => FPS_STUCK,
  FULLSCREEN_CHANGE: () => FULLSCREEN_CHANGE,
  LEAVE_PLAYER: () => LEAVE_PLAYER,
  LOADED_DATA: () => LOADED_DATA,
  LOADED_METADATA: () => LOADED_METADATA,
  LOADING: () => LOADING,
  LOAD_START: () => LOAD_START,
  MINI_STATE_CHANGE: () => MINI_STATE_CHANGE,
  PAUSE: () => PAUSE,
  PIP_CHANGE: () => PIP_CHANGE,
  PLAY: () => PLAY,
  PLAYER_BLUR: () => PLAYER_BLUR,
  PLAYER_FOCUS: () => PLAYER_FOCUS,
  PLAYING: () => PLAYING,
  PLAYNEXT: () => PLAYNEXT,
  PROGRESS: () => PROGRESS,
  RATE_CHANGE: () => RATE_CHANGE,
  READY: () => READY,
  REPLAY: () => REPLAY,
  RESET: () => RESET,
  RETRY: () => RETRY,
  ROTATE: () => ROTATE,
  SCREEN_SHOT: () => SCREEN_SHOT,
  SEEKED: () => SEEKED,
  SEEKING: () => SEEKING,
  SEI_PARSED: () => SEI_PARSED,
  SHORTCUT: () => SHORTCUT,
  SOURCE_ERROR: () => SOURCE_ERROR,
  SOURCE_SUCCESS: () => SOURCE_SUCCESS,
  STALLED: () => STALLED,
  STATS_EVENTS: () => STATS_EVENTS,
  SUSPEND: () => SUSPEND,
  SWITCH_SUBTITLE: () => SWITCH_SUBTITLE,
  TIME_UPDATE: () => TIME_UPDATE,
  URL_CHANGE: () => URL_CHANGE,
  URL_NULL: () => URL_NULL,
  USER_ACTION: () => USER_ACTION,
  VIDEO_EVENTS: () => VIDEO_EVENTS,
  VIDEO_RESIZE: () => VIDEO_RESIZE,
  VOLUME_CHANGE: () => VOLUME_CHANGE,
  WAITING: () => WAITING,
  XGLOG: () => XGLOG
});
var PLAY = "play";
var PLAYING = "playing";
var ENDED = "ended";
var PAUSE = "pause";
var ERROR = "error";
var SEEKING = "seeking";
var SEEKED = "seeked";
var TIME_UPDATE = "timeupdate";
var WAITING = "waiting";
var CANPLAY = "canplay";
var CANPLAY_THROUGH = "canplaythrough";
var DURATION_CHANGE = "durationchange";
var VOLUME_CHANGE = "volumechange";
var LOADED_DATA = "loadeddata";
var LOADED_METADATA = "loadedmetadata";
var RATE_CHANGE = "ratechange";
var PROGRESS = "progress";
var LOAD_START = "loadstart";
var EMPTIED = "emptied";
var STALLED = "stalled";
var SUSPEND = "suspend";
var ABORT = "abort";
var BUFFER_CHANGE = "bufferedChange";
var PLAYER_FOCUS = "focus";
var PLAYER_BLUR = "blur";
var READY = "ready";
var URL_NULL = "urlNull";
var AUTOPLAY_STARTED = "autoplay_started";
var AUTOPLAY_PREVENTED = "autoplay_was_prevented";
var COMPLETE = "complete";
var REPLAY = "replay";
var DESTROY = "destroy";
var URL_CHANGE = "urlchange";
var DOWNLOAD_SPEED_CHANGE = "download_speed_change";
var LEAVE_PLAYER = "leaveplayer";
var ENTER_PLAYER = "enterplayer";
var LOADING = "loading";
var FULLSCREEN_CHANGE = "fullscreen_change";
var CSS_FULLSCREEN_CHANGE = "cssFullscreen_change";
var MINI_STATE_CHANGE = "mini_state_change";
var DEFINITION_CHANGE = "definition_change";
var BEFORE_DEFINITION_CHANGE = "before_definition_change";
var AFTER_DEFINITION_CHANGE = "after_definition_change";
var SEI_PARSED = "SEI_PARSED";
var RETRY = "retry";
var VIDEO_RESIZE = "video_resize";
var PIP_CHANGE = "pip_change";
var ROTATE = "rotate";
var SCREEN_SHOT = "screenShot";
var PLAYNEXT = "playnext";
var SHORTCUT = "shortcut";
var XGLOG = "xglog";
var USER_ACTION = "user_action";
var RESET = "reset";
var SOURCE_ERROR = "source_error";
var SOURCE_SUCCESS = "source_success";
var SWITCH_SUBTITLE = "switch_subtitle";
var VIDEO_EVENTS = ["play", "playing", "ended", "pause", "error", "seeking", "seeked", "timeupdate", "waiting", "canplay", "canplaythrough", "durationchange", "volumechange", "loadeddata", "loadedmetadata", "ratechange", "progress", "loadstart", "emptied", "stalled", "suspend", "abort", "lowdecode"];
var STATS_EVENTS = {
  STATS_INFO: "stats_info",
  STATS_DOWNLOAD: "stats_download",
  STATS_RESET: "stats_reset"
};
var FPS_STUCK = "fps_stuck";

// node_modules/xgplayer/es/mediaProxy.js
function emitVideoEvent(eventKey, e) {
  if (!this || !this.emit) {
    return;
  }
  if (eventKey === "error") {
    this.errorHandler(eventKey, e.error);
  } else {
    this.emit(eventKey, e);
  }
}
function getVideoEventHandler(eventKey, player) {
  return function(e, _err) {
    var eData = {
      player,
      eventName: eventKey,
      originalEvent: e,
      detail: e.detail || {},
      timeStamp: e.timeStamp,
      currentTime: player.currentTime,
      duration: player.duration,
      paused: player.paused,
      ended: player.ended,
      isInternalOp: !!player._internalOp[e.type],
      muted: player.muted,
      volume: player.volume,
      host: util.getHostFromUrl(player.currentSrc),
      vtype: player.vtype
    };
    player.removeInnerOP(e.type);
    if (eventKey === "timeupdate") {
      player._currentTime = player.media && player.media.currentTime;
    }
    if (eventKey === "ratechange") {
      var _rate = player.media ? player.media.playbackRate : 0;
      if (_rate && player._rate === _rate) {
        return;
      }
      player._rate = player.media && player.media.playbackRate;
    }
    if (eventKey === "durationchange") {
      player._duration = player.media.duration;
    }
    if (eventKey === "volumechange") {
      eData.isMutedChange = player._lastMuted !== player.muted;
      player._lastMuted = player.muted;
    }
    if (eventKey === "error") {
      eData.error = _err || player.video.error;
    }
    if (player.mediaEventMiddleware[eventKey]) {
      var callback = emitVideoEvent.bind(player, eventKey, eData);
      try {
        player.mediaEventMiddleware[eventKey].call(player, eData, callback);
      } catch (err) {
        emitVideoEvent.call(player, eventKey, eData);
        throw err;
      }
    } else {
      emitVideoEvent.call(player, eventKey, eData);
    }
  };
}
var MediaProxy = function(_EventEmitter) {
  _inherits(MediaProxy2, _EventEmitter);
  var _super = _createSuper(MediaProxy2);
  function MediaProxy2(options) {
    var _this;
    _classCallCheck(this, MediaProxy2);
    _this = _super.call(this, options);
    _this._hasStart = false;
    _this._currentTime = 0;
    _this._duration = 0;
    _this._internalOp = {};
    _this._lastMuted = false;
    _this.vtype = "MP4";
    _this._rate = -1;
    _this.mediaConfig = Object.assign({}, {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      "x5-playsinline": options.playsinline,
      "webkit-playsinline": options.playsinline,
      "x5-video-player-fullscreen": options["x5-video-player-fullscreen"] || options.x5VideoPlayerFullscreen,
      "x5-video-orientation": options["x5-video-orientation"] || options.x5VideoOrientation,
      airplay: options.airplay,
      "webkit-airplay": options.airplay,
      tabindex: options.tabindex | 0,
      mediaType: options.mediaType || "video",
      "data-index": -1
    }, options.videoConfig, options.videoAttributes);
    var playerType = options["x5-video-player-type"] || options.x5VideoPlayerType;
    if (sniffer.isWeixin && sniffer.os.isAndroid && playerType) {
      _this.mediaConfig["x5-video-player-type"] = playerType;
      delete _this.mediaConfig.playsinline;
      delete _this.mediaConfig["webkit-playsinline"];
      delete _this.mediaConfig["x5-playsinline"];
    }
    if (options.loop) {
      _this.mediaConfig.loop = "loop";
    }
    if (options.autoplayMuted && !Object.prototype.hasOwnProperty.call(_this.mediaConfig, "muted")) {
      _this.mediaConfig.muted = true;
    }
    _this.media = util.createDom(_this.mediaConfig.mediaType, "", _this.mediaConfig, "");
    if (options.defaultPlaybackRate) {
      _this.media.defaultPlaybackRate = _this.media.playbackRate = options.defaultPlaybackRate;
    }
    if (util.typeOf(options.volume) === "Number") {
      _this.volume = options.volume;
    }
    if (options.autoplayMuted) {
      _this.media.muted = true;
      _this._lastMuted = true;
    }
    if (options.autoplay) {
      _this.media.autoplay = true;
    }
    _this._interval = {};
    _this.mediaEventMiddleware = {};
    _this.attachVideoEvents();
    return _this;
  }
  _createClass(MediaProxy2, [{
    key: "setEventsMiddleware",
    value: function setEventsMiddleware(middlewares) {
      var _this2 = this;
      Object.keys(middlewares).map(function(key) {
        _this2.mediaEventMiddleware[key] = middlewares[key];
      });
    }
  }, {
    key: "removeEventsMiddleware",
    value: function removeEventsMiddleware(middlewares) {
      var _this3 = this;
      Object.keys(middlewares).map(function(key) {
        delete _this3.mediaEventMiddleware[key];
      });
    }
  }, {
    key: "attachVideoEvents",
    value: function attachVideoEvents() {
      var _this4 = this;
      var media = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.media;
      if (!this._evHandlers) {
        this._evHandlers = VIDEO_EVENTS.map(function(eventKey) {
          var funName = "on".concat(eventKey.charAt(0).toUpperCase()).concat(eventKey.slice(1));
          if (typeof _this4[funName] === "function") {
            _this4.on(eventKey, _this4[funName]);
          }
          return _defineProperty({}, eventKey, getVideoEventHandler(eventKey, _this4));
        });
      }
      this._evHandlers.forEach(function(item) {
        var eventKey = Object.keys(item)[0];
        media.addEventListener(eventKey, item[eventKey], false);
      });
    }
  }, {
    key: "detachVideoEvents",
    value: function detachVideoEvents() {
      var _this5 = this;
      var media = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.media;
      this._evHandlers.forEach(function(item) {
        var eventKey = Object.keys(item)[0];
        media.removeEventListener(eventKey, item[eventKey], false);
      });
      this._evHandlers.forEach(function(item) {
        var eventKey = Object.keys(item)[0];
        var funName = "on".concat(eventKey.charAt(0).toUpperCase()).concat(eventKey.slice(1));
        if (typeof _this5[funName] === "function") {
          _this5.off(eventKey, _this5[funName]);
        }
      });
      this._evHandlers = null;
    }
  }, {
    key: "_attachSourceEvents",
    value: function _attachSourceEvents(video, urls) {
      var _this6 = this;
      video.removeAttribute("src");
      video.load();
      urls.forEach(function(item, index) {
        _this6.media.appendChild(util.createDom("source", "", {
          src: "".concat(item.src),
          type: "".concat(item.type || ""),
          "data-index": index + 1
        }));
      });
      var _c = video.children;
      if (!_c) {
        return;
      }
      this._videoSourceCount = _c.length;
      this._videoSourceIndex = _c.length;
      this._vLoadeddata = function(e) {
        _this6.emit(SOURCE_SUCCESS, {
          src: e.target.currentSrc,
          host: util.getHostFromUrl(e.target.currentSrc)
        });
      };
      var _eHandler = null;
      for (var i = 0; i < this._evHandlers.length; i++) {
        if (Object.keys(this._evHandlers[i])[0] === "error") {
          _eHandler = this._evHandlers[i];
          break;
        }
      }
      !this._sourceError && (this._sourceError = function(e) {
        var _dIndex = parseInt(e.target.getAttribute("data-index"), 10);
        _this6._videoSourceIndex--;
        if (_this6._videoSourceIndex === 0 || _dIndex >= _this6._videoSourceCount) {
          var _err = {
            code: 4,
            message: "sources_load_error"
          };
          _eHandler ? _eHandler.error(e, _err) : _this6.errorHandler("error", _err);
        }
        var type = ERROR_TYPE_MAP[4];
        _this6.emit(SOURCE_ERROR, new Errors(_this6, {
          errorType: type,
          errorCode: 4,
          errorMessage: "sources_load_error",
          mediaError: {
            code: 4,
            message: "sources_load_error"
          },
          src: e.target.src
        }));
      });
      for (var _i = 0; _i < _c.length; _i++) {
        _c[_i].addEventListener("error", this._sourceError);
      }
      video.addEventListener("loadeddata", this._vLoadeddata);
    }
  }, {
    key: "_detachSourceEvents",
    value: function _detachSourceEvents(video) {
      var _c = video.children;
      if (!_c || _c.length === 0 || !this._sourceError) {
        return;
      }
      for (var i = 0; i < _c.length; i++) {
        _c[i].removeEventListener("error", this._sourceError);
      }
      while (_c.length > 0) {
        video.removeChild(_c[0]);
      }
      this._vLoadeddata && video.removeEventListener("loadeddata", this._vLoadeddata);
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(name) {
      var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (this.media && (this.media.error || error)) {
        var _e = this.media.error || error;
        var type = _e.code ? ERROR_TYPE_MAP[_e.code] : "other";
        var message = _e.message;
        if (!this.media.currentSrc) {
          message = "empty_src";
          _e = {
            code: 6,
            message
          };
        }
        this.emit(name, new Errors(this, {
          errorType: type,
          errorCode: _e.code,
          errorMessage: _e.message || "",
          mediaError: _e
        }));
      }
    }
  }, {
    key: "destroy",
    value: function destroy2() {
      if (this.media) {
        if (this.media.pause) {
          this.media.pause();
          this.media.muted = true;
        }
        this.media.removeAttribute("src");
        this.media.load();
      }
      this._currentTime = 0;
      this._duration = 0;
      this.mediaConfig = null;
      for (var k in this._interval) {
        if (Object.prototype.hasOwnProperty.call(this._interval, k)) {
          clearInterval(this._interval[k]);
          this._interval[k] = null;
        }
      }
      this.detachVideoEvents();
      this.media = null;
      this.mediaEventMiddleware = {};
      this.removeAllListeners();
    }
  }, {
    key: "video",
    get: function get() {
      return this.media;
    },
    set: function set(media) {
      this.media = media;
    }
  }, {
    key: "play",
    value: function play() {
      var ret = this.media ? this.media.play() : null;
      return ret;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.media && this.media.pause();
    }
  }, {
    key: "load",
    value: function load() {
      this.media && this.media.load();
    }
  }, {
    key: "canPlayType",
    value: function canPlayType(type) {
      return this.media ? this.media.canPlayType(type) : false;
    }
  }, {
    key: "getBufferedRange",
    value: function getBufferedRange(buffered) {
      var range = [0, 0];
      if (!this.media) {
        return range;
      }
      if (!buffered) {
        buffered = this.media.buffered;
      }
      var currentTime = this.media.currentTime;
      if (buffered) {
        for (var i = 0, len = buffered.length; i < len; i++) {
          range[0] = buffered.start(i);
          range[1] = buffered.end(i);
          if (range[0] <= currentTime && currentTime <= range[1]) {
            break;
          }
        }
      }
      if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
        return range;
      } else {
        return [0, 0];
      }
    }
  }, {
    key: "autoplay",
    get: function get() {
      return this.media ? this.media.autoplay : false;
    },
    set: function set(isTrue) {
      this.media && (this.media.autoplay = isTrue);
    }
  }, {
    key: "buffered",
    get: function get() {
      return this.media ? this.media.buffered : null;
    }
  }, {
    key: "buffered2",
    get: function get() {
      return this.media && this.media.buffered ? util.getBuffered2(this.media.buffered) : null;
    }
  }, {
    key: "bufferedPoint",
    get: function get() {
      var ret = {
        start: 0,
        end: 0
      };
      if (!this.media) {
        return ret;
      }
      var _buffered = this.media.buffered;
      if (!_buffered || _buffered.length === 0) {
        return ret;
      }
      for (var i = 0; i < _buffered.length; i++) {
        if ((_buffered.start(i) <= this.currentTime || _buffered.start(i) < 0.1) && _buffered.end(i) >= this.currentTime) {
          return {
            start: _buffered.start(i),
            end: _buffered.end(i)
          };
        }
      }
      return ret;
    }
  }, {
    key: "crossOrigin",
    get: function get() {
      return this.media ? this.media.crossOrigin : "";
    },
    set: function set(isTrue) {
      this.media && (this.media.crossOrigin = isTrue);
    }
  }, {
    key: "currentSrc",
    get: function get() {
      return this.media ? this.media.currentSrc : "";
    },
    set: function set(src) {
      this.media && (this.media.currentSrc = src);
    }
  }, {
    key: "currentTime",
    get: function get() {
      if (!this.media) {
        return 0;
      }
      return this.media.currentTime !== void 0 ? this.media.currentTime : this._currentTime;
    },
    set: function set(time) {
      this.media && (this.media.currentTime = time);
    }
  }, {
    key: "defaultMuted",
    get: function get() {
      return this.media ? this.media.defaultMuted : false;
    },
    set: function set(isTrue) {
      this.media && (this.media.defaultMuted = isTrue);
    }
  }, {
    key: "duration",
    get: function get() {
      return this._duration;
    }
  }, {
    key: "ended",
    get: function get() {
      return this.media ? this.media.ended : false;
    }
  }, {
    key: "error",
    get: function get() {
      return this.media.error;
    }
  }, {
    key: "errorNote",
    get: function get() {
      var err = this.media.error;
      if (!err) {
        return "";
      }
      var status = ["MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED"];
      return status[this.media.error.code - 1];
    }
  }, {
    key: "loop",
    get: function get() {
      return this.media ? this.media.loop : false;
    },
    set: function set(isTrue) {
      this.media && (this.media.loop = isTrue);
    }
  }, {
    key: "muted",
    get: function get() {
      return this.media ? this.media.muted : false;
    },
    set: function set(isTrue) {
      if (!this.media || this.media.muted === isTrue) {
        return;
      }
      this._lastMuted = this.media.muted;
      this.media.muted = isTrue;
    }
  }, {
    key: "networkState",
    get: function get() {
      return this.media.networkState;
    }
  }, {
    key: "paused",
    get: function get() {
      return this.media ? this.media.paused : true;
    }
  }, {
    key: "playbackRate",
    get: function get() {
      return this.media ? this.media.playbackRate : 0;
    },
    set: function set(rate) {
      if (!this.media || rate === Infinity) {
        return;
      }
      this.media.defaultPlaybackRate = rate;
      this.media.playbackRate = rate;
    }
  }, {
    key: "played",
    get: function get() {
      return this.media ? this.media.played : null;
    }
  }, {
    key: "preload",
    get: function get() {
      return this.media ? this.media.preload : false;
    },
    set: function set(isTrue) {
      this.media && (this.media.preload = isTrue);
    }
  }, {
    key: "readyState",
    get: function get() {
      return this.media.readyState;
    }
  }, {
    key: "seekable",
    get: function get() {
      return this.media ? this.media.seekable : false;
    }
  }, {
    key: "seeking",
    get: function get() {
      return this.media ? this.media.seeking : false;
    }
  }, {
    key: "src",
    get: function get() {
      return this.media ? this.media.src : "";
    },
    set: function set(url) {
      if (!this.media) {
        return;
      }
      this.emit(URL_CHANGE, url);
      this.emit(WAITING);
      this._currentTime = 0;
      this._duration = 0;
      if (util.isMSE(this.media)) {
        this.onWaiting();
        return;
      }
      this._detachSourceEvents(this.media);
      if (util.typeOf(url) === "Array") {
        this._attachSourceEvents(this.media, url);
      } else if (url) {
        this.media.src = url;
      } else {
        this.media.removeAttribute("src");
      }
      this.load();
    }
  }, {
    key: "volume",
    get: function get() {
      return this.media ? this.media.volume : 0;
    },
    set: function set(vol) {
      if (vol === Infinity || !this.media) {
        return;
      }
      this.media.volume = vol;
    }
  }, {
    key: "aspectRatio",
    get: function get() {
      return this.media ? this.media.videoWidth / this.media.videoHeight : 0;
    }
  }, {
    key: "addInnerOP",
    value: function addInnerOP(event) {
      this._internalOp[event] = true;
    }
  }, {
    key: "removeInnerOP",
    value: function removeInnerOP(event) {
      delete this._internalOp[event];
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      var _get2;
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      (_get2 = _get(_getPrototypeOf(MediaProxy2.prototype), "emit", this)).call.apply(_get2, [this, event, data].concat(args));
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      var _get3;
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      (_get3 = _get(_getPrototypeOf(MediaProxy2.prototype), "on", this)).call.apply(_get3, [this, event, callback].concat(args));
    }
  }, {
    key: "once",
    value: function once(event, callback) {
      var _get4;
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }
      (_get4 = _get(_getPrototypeOf(MediaProxy2.prototype), "once", this)).call.apply(_get4, [this, event, callback].concat(args));
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var _get5;
      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }
      (_get5 = _get(_getPrototypeOf(MediaProxy2.prototype), "off", this)).call.apply(_get5, [this, event, callback].concat(args));
    }
  }, {
    key: "offAll",
    value: function offAll() {
      _get(_getPrototypeOf(MediaProxy2.prototype), "removeAllListeners", this).call(this);
    }
  }]);
  return MediaProxy2;
}(import_eventemitter3.default);

// node_modules/xgplayer/es/utils/database.js
var INDEXDB = function() {
  function INDEXDB2() {
    var mydb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      name: "xgplayer",
      version: 1,
      db: null,
      ojstore: {
        name: "xg-m4a",
        keypath: "vid"
      }
    };
    _classCallCheck(this, INDEXDB2);
    this.indexedDB = window.indexedDB || window.webkitindexedDB;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    this.myDB = mydb;
  }
  _createClass(INDEXDB2, [{
    key: "openDB",
    value: function openDB(callback) {
      var _this = this;
      var self = this;
      var version2 = this.myDB.version || 1;
      var request = self.indexedDB.open(self.myDB.name, version2);
      request.onerror = function(e) {
      };
      request.onsuccess = function(e) {
        _this.myDB.db = e.target.result;
        callback.call(self);
      };
      request.onupgradeneeded = function(e) {
        var db = e.target.result;
        e.target.transaction;
        if (!db.objectStoreNames.contains(self.myDB.ojstore.name)) {
          db.createObjectStore(self.myDB.ojstore.name, {
            keyPath: self.myDB.ojstore.keypath
          });
        }
      };
    }
  }, {
    key: "deletedb",
    value: function deletedb() {
      var self = this;
      self.indexedDB.deleteDatabase(this.myDB.name);
    }
  }, {
    key: "closeDB",
    value: function closeDB() {
      this.myDB.db.close();
    }
  }, {
    key: "addData",
    value: function addData(storename, data) {
      var store2 = this.myDB.db.transaction(storename, "readwrite").objectStore(storename);
      var request;
      for (var i = 0; i < data.length; i++) {
        request = store2.add(data[i]);
        request.onerror = function() {
        };
        request.onsuccess = function() {
        };
      }
    }
  }, {
    key: "putData",
    value: function putData(storename, data) {
      var store2 = this.myDB.db.transaction(storename, "readwrite").objectStore(storename);
      var request;
      for (var i = 0; i < data.length; i++) {
        request = store2.put(data[i]);
        request.onerror = function() {
        };
        request.onsuccess = function() {
        };
      }
    }
  }, {
    key: "getDataByKey",
    value: function getDataByKey(storename, key, callback) {
      var self = this;
      var store2 = this.myDB.db.transaction(storename, "readwrite").objectStore(storename);
      var request = store2.get(key);
      request.onerror = function() {
        callback.call(self, null);
      };
      request.onsuccess = function(e) {
        var result = e.target.result;
        callback.call(self, result);
      };
    }
  }, {
    key: "deleteData",
    value: function deleteData(storename, key) {
      var store2 = this.myDB.db.transaction(storename, "readwrite").objectStore(storename);
      store2.delete(key);
    }
  }, {
    key: "clearData",
    value: function clearData(storename) {
      var store2 = this.myDB.db.transaction(storename, "readwrite").objectStore(storename);
      store2.clear();
    }
  }]);
  return INDEXDB2;
}();

// node_modules/xgplayer/es/constant.js
var FULLSCREEN_EVENTS = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
var GET_FULLSCREEN_API = ["requestFullscreen", "webkitRequestFullscreen", "mozRequestFullScreen", "msRequestFullscreen"];
var EXIT_FULLSCREEN_API = ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"];
var PLATER_ID = "data-xgplayerid";

// node_modules/xgplayer/es/plugin/hooksDescriptor.js
function callHandler(obj, handler, next) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }
  var ret = handler.call.apply(handler, [obj].concat(args));
  if (!next || typeof next !== "function") {
    return;
  }
  if (ret && ret.then) {
    ret.then(function() {
      for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }
      next.call.apply(next, [obj].concat(args2));
    });
  } else {
    next.call.apply(next, [obj].concat(args));
  }
}
function hook(hookName, handler) {
  var preset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    pre: null,
    next: null
  };
  if (!this.__hooks) {
    this.__hooks = {};
  }
  !this.__hooks[hookName] && (this.__hooks[hookName] = null);
  return (function() {
    var _arguments = arguments, _this = this;
    if (preset.pre) {
      try {
        var _preset$pre;
        (_preset$pre = preset.pre).call.apply(_preset$pre, [this].concat(Array.prototype.slice.call(arguments)));
      } catch (e) {
        e.message = "[pluginName: ".concat(this.pluginName, ":").concat(hookName, ":pre error] >> ").concat(e.message);
        throw e;
      }
    }
    if (this.__hooks && this.__hooks[hookName]) {
      try {
        var preRet = runHooks(this, hookName, handler);
        if (preRet) {
          if (preRet.then) {
            preRet.then(function(isContinue) {
              if (isContinue !== false) {
                callHandler.apply(void 0, [_this, handler, preset.next].concat(_toConsumableArray(_arguments)));
              }
            }).catch(function(e) {
              throw e;
            });
          } else {
            callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments)));
          }
        } else if (preRet === void 0) {
          callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments)));
        }
      } catch (e) {
        e.message = "[pluginName: ".concat(this.pluginName, ":").concat(hookName, "] >> ").concat(e.message);
        throw e;
      }
    } else {
      callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments)));
    }
  }).bind(this);
}
function findHookIndex(hookName, handler) {
  var __hooks = this.__hooks;
  if (!__hooks || !Array.isArray(__hooks[hookName])) {
    return -1;
  }
  var hookHandlers = __hooks[hookName];
  for (var i = 0; i < hookHandlers.length; i++) {
    if (hookHandlers[i] === handler) {
      return i;
    }
  }
  return -1;
}
function useHooks(hookName, handler) {
  var __hooks = this.__hooks;
  if (!__hooks) {
    return;
  }
  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn("has no supported hook which name [".concat(hookName, "]"));
    return false;
  }
  if (!Array.isArray(__hooks[hookName])) {
    __hooks[hookName] = [];
  }
  if (findHookIndex.call(this, hookName, handler) === -1) {
    __hooks[hookName].push(handler);
  }
  return true;
}
function removeHooks(hookName, handler) {
  var __hooks = this.__hooks;
  if (!__hooks) {
    return;
  }
  if (Array.isArray(__hooks[hookName])) {
    var hooks = __hooks[hookName];
    var index = findHookIndex.call(this, hookName, handler);
    if (index !== -1) {
      hooks.splice(index, 1);
    }
  }
  delete __hooks[hookName];
}
function usePluginHooks(pluginName) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return;
  }
  var plugin = this.plugins[pluginName.toLowerCase()];
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return plugin.useHooks && plugin.useHooks.apply(plugin, args);
}
function removePluginHooks(pluginName) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return;
  }
  var plugin = this.plugins[pluginName.toLowerCase()];
  if (plugin) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    return plugin.removeHooks && plugin.removeHooks.apply(plugin, args);
  }
}
function hooksDescriptor(instance2) {
  var presetHooks = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  instance2.__hooks = {};
  presetHooks && presetHooks.map(function(item) {
    instance2.__hooks[item] = null;
  });
  Object.defineProperty(instance2, "hooks", {
    get: function get() {
      return instance2.__hooks && Object.keys(instance2.__hooks).map(function(key) {
        if (instance2.__hooks[key]) {
          return key;
        }
      });
    }
  });
}
function delHooksDescriptor(instance2) {
  instance2.__hooks = null;
}
function runHooks(obj, hookName, handler) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }
  if (obj.__hooks && Array.isArray(obj.__hooks[hookName])) {
    var hooks = obj.__hooks[hookName];
    var index = -1;
    var runHooksRecursive = function runHooksRecursive2(obj2, hookName2, handler2) {
      for (var _len6 = arguments.length, args2 = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
        args2[_key6 - 3] = arguments[_key6];
      }
      index++;
      if (hooks.length === 0 || index === hooks.length) {
        return handler2.call.apply(handler2, [obj2, obj2].concat(args2));
      }
      var hook2 = hooks[index];
      var ret = hook2.call.apply(hook2, [obj2, obj2].concat(args2));
      if (ret && ret.then) {
        return ret.then(function(data) {
          return data === false ? null : runHooksRecursive2.apply(void 0, [obj2, hookName2, handler2].concat(args2));
        }).catch(function(e) {
          console.warn("[runHooks]".concat(hookName2, " reject"), e.message);
        });
      } else if (ret !== false) {
        return runHooksRecursive2.apply(void 0, [obj2, hookName2, handler2].concat(args2));
      }
    };
    return runHooksRecursive.apply(void 0, [obj, hookName, handler].concat(args));
  } else {
    return handler.call.apply(handler, [obj, obj].concat(args));
  }
}

// node_modules/xgplayer/es/plugin/basePlugin.js
function showErrorMsg(pluginName, msg) {
  XG_DEBUG.logError("[".concat(pluginName, "] event or callback cant be undefined or null when call ").concat(msg));
}
var BasePlugin = function() {
  function BasePlugin2(args) {
    _classCallCheck(this, BasePlugin2);
    if (util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args);
    }
    hooksDescriptor(this);
    this.__args = args;
    this.__events = {};
    this.__onceEvents = {};
    this.config = args.config || {};
    this.player = null;
    this.playerConfig = {};
    this.pluginName = "";
    this.__init(args);
  }
  _createClass(BasePlugin2, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
    }
  }, {
    key: "beforePlayerInit",
    value: function beforePlayerInit() {
    }
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady2() {
    }
  }, {
    key: "afterPlayerInit",
    value: function afterPlayerInit() {
    }
  }, {
    key: "destroy",
    value: function destroy2() {
    }
  }, {
    key: "__init",
    value: function __init(args) {
      this.player = args.player;
      this.playerConfig = args.player && args.player.config;
      this.pluginName = args.pluginName ? args.pluginName.toLowerCase() : this.constructor.pluginName.toLowerCase();
      this.logger = args.player && args.player.logger;
    }
  }, {
    key: "updateLang",
    value: function updateLang(lang) {
      if (!lang) {
        lang = this.lang;
      }
    }
  }, {
    key: "lang",
    get: function get() {
      return this.player.lang;
    }
  }, {
    key: "i18n",
    get: function get() {
      return this.player.i18n;
    }
  }, {
    key: "i18nKeys",
    get: function get() {
      return this.player.i18nKeys;
    }
  }, {
    key: "domEventType",
    get: function get() {
      var _e = util.checkTouchSupport() ? "touch" : "mouse";
      if (this.playerConfig && (this.playerConfig.domEventType === "touch" || this.playerConfig.domEventType === "mouse")) {
        _e = this.playerConfig.domEventType;
      }
      return _e;
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      var _this = this;
      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, "plugin.on(event, callback)");
        return;
      }
      if (typeof event === "string") {
        this.__events[event] = callback;
        this.player.on(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function(item) {
          _this.__events[item] = callback;
          _this.player.on(item, callback);
        });
      }
    }
  }, {
    key: "once",
    value: function once(event, callback) {
      var _this2 = this;
      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, "plugin.once(event, callback)");
        return;
      }
      if (typeof event === "string") {
        this.__onceEvents[event] = callback;
        this.player.once(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function(item) {
          _this2.__onceEvents[item] = callback;
          _this2.player.once(event, callback);
        });
      }
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var _this3 = this;
      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, "plugin.off(event, callback)");
        return;
      }
      if (typeof event === "string") {
        delete this.__events[event];
        this.player.off(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function(item) {
          delete _this3.__events[event];
          _this3.player.off(item, callback);
        });
      }
    }
  }, {
    key: "offAll",
    value: function offAll() {
      var _this4 = this;
      ["__events", "__onceEvents"].forEach(function(key) {
        Object.keys(_this4[key]).forEach(function(item) {
          _this4[key][item] && _this4.off(item, _this4[key][item]);
          item && delete _this4[key][item];
        });
      });
      this.__events = {};
      this.__onceEvents = {};
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this$player;
      if (!this.player) {
        return;
      }
      for (var _len = arguments.length, res = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        res[_key - 1] = arguments[_key];
      }
      (_this$player = this.player).emit.apply(_this$player, [event].concat(res));
    }
  }, {
    key: "emitUserAction",
    value: function emitUserAction(event, action) {
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (!this.player) {
        return;
      }
      var nParams = _objectSpread2(_objectSpread2({}, params), {}, {
        pluginName: this.pluginName
      });
      this.player.emitUserAction(event, action, nParams);
    }
  }, {
    key: "hook",
    value: function hook$1(hookName, handler) {
      return hook.call.apply(hook, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "useHooks",
    value: function useHooks$1(hookName, handler) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      return useHooks.call.apply(useHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "removeHooks",
    value: function removeHooks$1(hookName, handler) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }
      return removeHooks.call.apply(removeHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var name = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      if (!this.player) {
        return;
      }
      name && (options.pluginName = name);
      return this.player.registerPlugin({
        plugin,
        options
      });
    }
  }, {
    key: "getPlugin",
    value: function getPlugin(name) {
      return this.player ? this.player.getPlugin(name) : null;
    }
  }, {
    key: "__destroy",
    value: function __destroy() {
      var _this5 = this;
      var player = this.player;
      var pluginName = this.pluginName;
      this.offAll();
      util.clearAllTimers(this);
      if (util.checkIsFunction(this.destroy)) {
        this.destroy();
      }
      ["player", "playerConfig", "pluginName", "logger", "__args", "__hooks"].map(function(item) {
        _this5[item] = null;
      });
      player.unRegisterPlugin(pluginName);
      delHooksDescriptor(this);
    }
  }], [{
    key: "defineGetterOrSetter",
    value: function defineGetterOrSetter(Obj, map) {
      for (var key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(Obj, key, map[key]);
        }
      }
    }
  }, {
    key: "defineMethod",
    value: function defineMethod(Obj, map) {
      for (var key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key) && typeof map[key] === "function") {
          Object.defineProperty(Obj, key, {
            configurable: true,
            value: map[key]
          });
        }
      }
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
  }, {
    key: "pluginName",
    get: function get() {
      return "pluginName";
    }
  }]);
  return BasePlugin2;
}();

// node_modules/xgplayer/es/plugin/plugin.js
var import_delegate = __toESM(require_delegate());
var ROOT_TYPES = {
  CONTROLS: "controls",
  ROOT: "root"
};
var POSITIONS = {
  ROOT: "root",
  ROOT_LEFT: "rootLeft",
  ROOT_RIGHT: "rootRight",
  ROOT_TOP: "rootTop",
  CONTROLS_LEFT: "controlsLeft",
  CONTROLS_RIGTH: "controlsRight",
  CONTROLS_RIGHT: "controlsRight",
  CONTROLS_CENTER: "controlsCenter",
  CONTROLS: "controls"
};
var PLUGIN_STATE_CLASS = {
  ICON_DISABLE: "xg-icon-disable",
  ICON_HIDE: "xg-icon-hide"
};
function isUrl(str) {
  if (!str) {
    return false;
  }
  return str.indexOf && /^(?:http|data:|\/)/.test(str);
}
function mergeIconClass(icon, classname) {
  if (_typeof(icon) === "object" && icon.class && typeof icon.class === "string") {
    return "".concat(classname, " ").concat(icon.class);
  }
  return classname;
}
function mergeIconAttr(icon, attr) {
  if (_typeof(icon) === "object" && icon.attr && _typeof(icon.attr) === "object") {
    Object.keys(icon.attr).map(function(key) {
      attr[key] = icon.attr[key];
    });
  }
  return attr;
}
function createIcon(icon, key) {
  var classname = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  var attr = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var pluginName = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "";
  var newIcon = null;
  if (icon instanceof window.Element) {
    util.addClass(icon, classname);
    Object.keys(attr).map(function(key2) {
      icon.setAttribute(key2, attr[key2]);
    });
    return icon;
  }
  if (isUrl(icon) || isUrl(icon.url)) {
    attr.src = isUrl(icon) ? icon : icon.url || "";
    newIcon = util.createDom(icon.tag || "img", "", attr, "xg-img ".concat(classname));
    return newIcon;
  }
  if (typeof icon === "function") {
    try {
      newIcon = icon();
      if (newIcon instanceof window.Element) {
        util.addClass(newIcon, classname);
        Object.keys(attr).map(function(key2) {
          newIcon.setAttribute(key2, attr[key2]);
        });
        return newIcon;
      } else {
        XG_DEBUG.logWarn("warn>>icons.".concat(key, " in config of plugin named [").concat(pluginName, "] is a function mast return an Element Object"));
      }
      return null;
    } catch (e) {
      XG_DEBUG.logError("Plugin named [".concat(pluginName, "]:createIcon"), e);
      return null;
    }
  }
  if (typeof icon === "string") {
    return util.createDomFromHtml(icon, attr, classname);
  }
  XG_DEBUG.logWarn("warn>>icons.".concat(key, " in config of plugin named [").concat(pluginName, "] is invalid"));
  return null;
}
function registerIconsObj(iconsConfig, plugin) {
  var _icons = plugin.config.icons || plugin.playerConfig.icons;
  Object.keys(iconsConfig).map(function(key) {
    var orgIcon = iconsConfig[key];
    var classname = orgIcon && orgIcon.class ? orgIcon.class : "";
    var attr = orgIcon && orgIcon.attr ? orgIcon.attr : {};
    var newIcon = null;
    if (_icons && _icons[key]) {
      classname = mergeIconClass(_icons[key], classname);
      attr = mergeIconAttr(_icons[key], attr);
      newIcon = createIcon(_icons[key], key, classname, attr, plugin.pluginName);
    }
    if (!newIcon && orgIcon) {
      newIcon = createIcon(orgIcon.icon ? orgIcon.icon : orgIcon, attr, classname, {}, plugin.pluginName);
    }
    plugin.icons[key] = newIcon;
  });
}
function registerTextObj(textConfig, plugin) {
  Object.keys(textConfig).map(function(key) {
    Object.defineProperty(plugin.langText, key, {
      get: function get() {
        var lang = plugin.lang, i18n = plugin.i18n;
        if (i18n[key]) {
          return i18n[key];
        } else {
          return textConfig[key] ? textConfig[key][lang] || "" : "";
        }
      }
    });
  });
}
var Plugin = function(_BasePlugin) {
  _inherits(Plugin2, _BasePlugin);
  var _super = _createSuper(Plugin2);
  function Plugin2() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, Plugin2);
    _this = _super.call(this, args);
    _this.__delegates = [];
    return _this;
  }
  _createClass(Plugin2, [{
    key: "__init",
    value: function __init(args) {
      _get(_getPrototypeOf(Plugin2.prototype), "__init", this).call(this, args);
      if (!args.root) {
        return;
      }
      var _parent = args.root;
      var _el = null;
      this.icons = {};
      this.root = null;
      this.parent = null;
      var _orgicons = this.registerIcons() || {};
      registerIconsObj(_orgicons, this);
      this.langText = {};
      var defaultTexConfig = this.registerLanguageTexts() || {};
      registerTextObj(defaultTexConfig, this);
      var renderStr = "";
      try {
        renderStr = this.render();
      } catch (e) {
        XG_DEBUG.logError("Plugin:".concat(this.pluginName, ":render"), e);
        throw new Error("Plugin:".concat(this.pluginName, ":render:").concat(e.message));
      }
      if (renderStr) {
        _el = Plugin2.insert(renderStr, _parent, args.index);
        _el.setAttribute("data-index", args.index);
      } else if (args.tag) {
        _el = util.createDom(args.tag, "", args.attr, args.name);
        _el.setAttribute("data-index", args.index);
        _parent.appendChild(_el);
      } else {
        return;
      }
      this.root = _el;
      this.parent = _parent;
      var attr = this.config.attr || {};
      var style = this.config.style || {};
      this.setAttr(attr);
      this.setStyle(style);
      if (this.config.index) {
        this.root.setAttribute("data-index", this.config.index);
      }
      this.__registerChildren();
    }
  }, {
    key: "__registerChildren",
    value: function __registerChildren() {
      var _this2 = this;
      if (!this.root) {
        return;
      }
      this._children = [];
      var children = this.children();
      if (children && _typeof(children) === "object") {
        if (Object.keys(children).length > 0) {
          Object.keys(children).map(function(item) {
            var name = item;
            var _plugin = children[name];
            var options = {
              root: _this2.root
            };
            var config, _Plugin;
            if (typeof _plugin === "function") {
              config = _this2.config[name] || {};
              _Plugin = _plugin;
            } else if (_typeof(_plugin) === "object" && typeof _plugin.plugin === "function") {
              config = _plugin.options ? util.deepCopy(_this2.config[name] || {}, _plugin.options) : _this2.config[name] || {};
              _Plugin = _plugin.plugin;
            }
            options.config = config;
            config.index !== void 0 && (options.index = config.index);
            config.root && (options.root = config.root);
            _this2.registerPlugin(_Plugin, options, name);
          });
        }
      }
    }
  }, {
    key: "updateLang",
    value: function updateLang(lang) {
      if (!lang) {
        lang = this.lang;
      }
      function checkChildren(node, callback) {
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].children.length > 0) {
            checkChildren(node.children[i], callback);
          } else {
            callback(node.children[i]);
          }
        }
      }
      var root = this.root, i18n = this.i18n, langText = this.langText;
      if (root) {
        checkChildren(root, function(node) {
          var langKey = node.getAttribute && node.getAttribute("lang-key");
          if (!langKey) {
            return;
          }
          var langTextShow = i18n[langKey.toUpperCase()] || langText[langKey];
          if (langTextShow) {
            node.innerHTML = typeof langTextShow === "function" ? langTextShow(lang) : langTextShow;
          }
        });
      }
    }
  }, {
    key: "lang",
    get: function get() {
      return this.player.lang;
    }
  }, {
    key: "changeLangTextKey",
    value: function changeLangTextKey(dom) {
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var i18n = this.i18n || {};
      var langText = this.langText;
      dom.setAttribute && dom.setAttribute("lang-key", key);
      var text = i18n[key] || langText[key] || "";
      if (text) {
        dom.innerHTML = text;
      }
    }
  }, {
    key: "plugins",
    value: function plugins() {
      return this._children;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.config.disable = true;
      util.addClass(this.find(".xgplayer-icon"), PLUGIN_STATE_CLASS.ICON_DISABLE);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.config.disable = false;
      util.removeClass(this.find(".xgplayer-icon"), PLUGIN_STATE_CLASS.ICON_DISABLE);
    }
  }, {
    key: "children",
    value: function children() {
      return {};
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var name = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      options.root = options.root || this.root;
      var _c = _get(_getPrototypeOf(Plugin2.prototype), "registerPlugin", this).call(this, plugin, options, name);
      this._children.push(_c);
      return _c;
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {};
    }
  }, {
    key: "registerLanguageTexts",
    value: function registerLanguageTexts() {
      return {};
    }
  }, {
    key: "find",
    value: function find(qs) {
      if (!this.root) {
        return;
      }
      return this.root.querySelector(qs);
    }
  }, {
    key: "bind",
    value: function bind(querySelector, eventType, callback) {
      var _this3 = this;
      if (arguments.length < 3 && typeof eventType === "function") {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function(item) {
            _this3.bindEL(item, eventType);
          });
        } else {
          this.bindEL(querySelector, eventType);
        }
      } else {
        var ret = Plugin2.delegate.call(this, this.root, querySelector, eventType, callback);
        this.__delegates = this.__delegates.concat(ret);
      }
    }
  }, {
    key: "unbind",
    value: function unbind(querySelector, eventType) {
      var _this4 = this;
      if (arguments.length < 3 && typeof eventType === "function") {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function(item) {
            _this4.unbindEL(item, eventType);
          });
        } else {
          this.unbindEL(querySelector, eventType);
        }
      } else {
        var key = "".concat(querySelector, "_").concat(eventType);
        for (var i = 0; i < this.__delegates.length; i++) {
          if (this.__delegates[i].key === key) {
            this.__delegates[i].destroy();
            this.__delegates.splice(i, 1);
            break;
          }
        }
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle(name, value) {
      var _this5 = this;
      if (!this.root) {
        return;
      }
      if (util.typeOf(name) === "String") {
        return this.root.style[name] = value;
      } else if (util.typeOf(name) === "Object") {
        Object.keys(name).map(function(key) {
          _this5.root.style[key] = name[key];
        });
      }
    }
  }, {
    key: "setAttr",
    value: function setAttr(name, value) {
      var _this6 = this;
      if (!this.root) {
        return;
      }
      if (util.typeOf(name) === "String") {
        return this.root.setAttribute(name, value);
      } else if (util.typeOf(name) === "Object") {
        Object.keys(name).map(function(key) {
          _this6.root.setAttribute(key, name[key]);
        });
      }
    }
  }, {
    key: "setHtml",
    value: function setHtml(htmlStr, callback) {
      if (!this.root) {
        return;
      }
      this.root.innerHTML = htmlStr;
      if (typeof callback === "function") {
        callback();
      }
    }
  }, {
    key: "bindEL",
    value: function bindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (!this.root) {
        return;
      }
      if ("on".concat(event) in this.root && typeof eventHandle === "function") {
        this.root.addEventListener(event, eventHandle, isBubble);
      }
    }
  }, {
    key: "unbindEL",
    value: function unbindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (!this.root) {
        return;
      }
      if ("on".concat(event) in this.root && typeof eventHandle === "function") {
        this.root.removeEventListener(event, eventHandle, isBubble);
      }
    }
  }, {
    key: "show",
    value: function show(value) {
      if (!this.root) {
        return;
      }
      this.root.style.display = value !== void 0 ? value : "block";
      var cs = window.getComputedStyle(this.root, null);
      var cssDisplayValue = cs.getPropertyValue("display");
      if (cssDisplayValue === "none") {
        return this.root.style.display = "block";
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.root && (this.root.style.display = "none");
    }
  }, {
    key: "appendChild",
    value: function appendChild(pdom, child) {
      if (!this.root) {
        return null;
      }
      if (arguments.length < 2 && arguments[0] instanceof window.Element) {
        return this.root.appendChild(arguments[0]);
      }
      if (!child || !(child instanceof window.Element)) {
        return null;
      }
      try {
        if (typeof pdom === "string") {
          return this.find(pdom).appendChild(child);
        } else {
          return pdom.appendChild(child);
        }
      } catch (err) {
        XG_DEBUG.logError("Plugin:appendChild", err);
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return "";
    }
  }, {
    key: "destroy",
    value: function destroy2() {
    }
  }, {
    key: "__destroy",
    value: function __destroy() {
      var _this7 = this;
      var player = this.player;
      this.__delegates.map(function(item) {
        item.destroy();
      });
      this.__delegates = [];
      if (this._children instanceof Array) {
        this._children.map(function(item) {
          player.unRegisterPlugin(item.pluginName);
        });
        this._children = null;
      }
      if (this.root) {
        if (this.root.hasOwnProperty("remove")) {
          this.root.remove();
        } else if (this.root.parentNode) {
          this.root.parentNode.removeChild(this.root);
        }
      }
      _get(_getPrototypeOf(Plugin2.prototype), "__destroy", this).call(this);
      this.icons = {};
      ["root", "parent"].map(function(item) {
        _this7[item] = null;
      });
    }
  }], [{
    key: "insert",
    value: function insert(html, parent) {
      var index = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      var len = parent.children.length;
      var insertIdx = Number(index);
      var isDomElement = html instanceof window.Node;
      if (len) {
        var i = 0;
        var coordinate = null;
        var mode = "";
        for (; i < len; i++) {
          coordinate = parent.children[i];
          var curIdx = Number(coordinate.getAttribute("data-index"));
          if (curIdx >= insertIdx) {
            mode = "beforebegin";
            break;
          } else if (curIdx < insertIdx) {
            mode = "afterend";
          }
        }
        if (isDomElement) {
          if (mode === "afterend") {
            parent.appendChild(html);
          } else {
            parent.insertBefore(html, coordinate);
          }
        } else {
          coordinate.insertAdjacentHTML(mode, html);
        }
        return mode === "afterend" ? parent.children[parent.children.length - 1] : parent.children[i];
      } else {
        isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML("beforeend", html);
        return parent.children[parent.children.length - 1];
      }
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
  }, {
    key: "delegate",
    value: function delegate(root, querySelector, eventType, callback) {
      var capture = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
      var dels = [];
      if (root instanceof window.Node && typeof callback === "function") {
        if (Array.isArray(eventType)) {
          eventType.forEach(function(item) {
            var ret2 = (0, import_delegate.default)(root, querySelector, item, callback, capture);
            ret2.key = "".concat(querySelector, "_").concat(item);
            dels.push(ret2);
          });
        } else {
          var ret = (0, import_delegate.default)(root, querySelector, eventType, callback, capture);
          ret.key = "".concat(querySelector, "_").concat(eventType);
          dels.push(ret);
        }
      }
      return dels;
    }
  }, {
    key: "ROOT_TYPES",
    get: function get() {
      return ROOT_TYPES;
    }
  }, {
    key: "POSITIONS",
    get: function get() {
      return POSITIONS;
    }
  }]);
  return Plugin2;
}(BasePlugin);

// node_modules/xgplayer/es/plugin/resizeObserver.js
var ResizeObserver = function() {
  function ResizeObserver2() {
    var _this = this;
    _classCallCheck(this, ResizeObserver2);
    _defineProperty(this, "__trigger", function(entries) {
      var t = (/* @__PURE__ */ new Date()).getTime();
      _this.timeStamp = t;
      for (var i = 0; i < entries.length; i++) {
        _this.__runHandler(entries[i].target);
      }
    });
    this.__handlers = [];
    this.timeStamp = 0;
    this.observer = null;
    if (!window.ResizeObserver) {
      return;
    }
    try {
      this.observer = new window.ResizeObserver(throttle(this.__trigger, 100, {
        trailing: true
      }));
      this.timeStamp = (/* @__PURE__ */ new Date()).getTime();
    } catch (e) {
      console.error(e);
    }
  }
  _createClass(ResizeObserver2, [{
    key: "addObserver",
    value: function addObserver2(target, handler) {
      if (!this.observer) {
        return;
      }
      this.observer.observe(target);
      var _pid = target.getAttribute(PLATER_ID);
      var __handlers = this.__handlers;
      var index = -1;
      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          index = i;
        }
      }
      if (index > -1) {
        this.__handlers[index].handler = handler;
      } else {
        this.__handlers.push({
          target,
          handler,
          playerId: _pid
        });
      }
    }
  }, {
    key: "unObserver",
    value: function unObserver2(target) {
      var i = -1;
      this.__handlers.map(function(item, index) {
        if (target === item.target) {
          i = index;
        }
      });
      try {
        var _this$observer;
        (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.unobserve(target);
      } catch (e) {
      }
      i > -1 && this.__handlers.splice(i, 1);
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      var _this$observer2;
      (_this$observer2 = this.observer) === null || _this$observer2 === void 0 ? void 0 : _this$observer2.disconnect();
      this.observer = null;
      this.__handlers = null;
    }
  }, {
    key: "__runHandler",
    value: function __runHandler(target) {
      var __handlers = this.__handlers;
      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          try {
            __handlers[i].handler(target);
          } catch (error) {
            console.error(error);
          }
          return true;
        }
      }
      return false;
    }
  }]);
  return ResizeObserver2;
}();
var resizeObserver = null;
function addObserver(target, handler) {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver();
  }
  resizeObserver.addObserver(target, handler);
  return resizeObserver;
}
function unObserver(target, handler) {
  var _resizeObserver;
  (_resizeObserver = resizeObserver) === null || _resizeObserver === void 0 ? void 0 : _resizeObserver.unObserver(target, handler);
}

// node_modules/xgplayer/es/plugin/pluginsManager.js
var pluginsManager = {
  pluginGroup: {},
  init: function init(player) {
    var cgid = player._pluginInfoId;
    if (!cgid) {
      cgid = (/* @__PURE__ */ new Date()).getTime();
      player._pluginInfoId = cgid;
    }
    !player.config.closeResizeObserver && addObserver(player.root, function() {
      player.resize();
    });
    this.pluginGroup[cgid] = {
      _originalOptions: player.config || {},
      _plugins: {}
    };
  },
  formatPluginInfo: function formatPluginInfo(plugin, config) {
    var PLUFGIN = null;
    var options = null;
    if (plugin.plugin && typeof plugin.plugin === "function") {
      PLUFGIN = plugin.plugin;
      options = plugin.options;
    } else {
      PLUFGIN = plugin;
      options = {};
    }
    if (config) {
      options.config = config || {};
    }
    return {
      PLUFGIN,
      options
    };
  },
  checkPluginIfExits: function checkPluginIfExits(pluginName, plugins) {
    for (var i = 0; i < plugins.length; i++) {
      if (pluginName.toLowerCase() === plugins[i].pluginName.toLowerCase()) {
        return true;
      }
    }
    return false;
  },
  getRootByConfig: function getRootByConfig(pluginName, playerConfig) {
    var keys = Object.keys(playerConfig);
    var _pConfig = null;
    for (var i = 0; i < keys.length; i++) {
      if (pluginName.toLowerCase() === keys[i].toLowerCase()) {
        _pConfig = playerConfig[keys[i]];
        break;
      }
    }
    if (util.typeOf(_pConfig) === "Object") {
      return {
        root: _pConfig.root,
        position: _pConfig.position
      };
    }
    return {};
  },
  lazyRegister: function lazyRegister(player, lazyPlugin) {
    var _this = this;
    var timeout = lazyPlugin.timeout || 1500;
    return Promise.race([lazyPlugin.loader().then(function(plugin) {
      var result;
      if (plugin && plugin.__esModule) {
        result = plugin.default;
      } else {
        result = plugin;
      }
      _this.register(player, result, plugin.options);
    }), new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"));
      }, timeout);
    })]);
  },
  register: function register(player, plugin) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!player || !plugin || typeof plugin !== "function" || plugin.prototype === void 0) {
      return;
    }
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return;
    }
    if (!this.pluginGroup[cgid]._plugins) {
      this.pluginGroup[cgid]._plugins = {};
    }
    var plugins = this.pluginGroup[cgid]._plugins;
    var originalOptions = this.pluginGroup[cgid]._originalOptions;
    options.player = player;
    var pluginName = options.pluginName || plugin.pluginName;
    if (!pluginName) {
      throw new Error("The property pluginName is necessary");
    }
    if (plugin.isSupported && !plugin.isSupported(player.config.mediaType, player.config.codecType)) {
      console.warn("not supported plugin [".concat(pluginName, "]"));
      return;
    }
    if (!options.config) {
      options.config = {};
    }
    var keys = Object.keys(originalOptions);
    for (var i = 0; i < keys.length; i++) {
      if (pluginName.toLowerCase() === keys[i].toLowerCase()) {
        var config = originalOptions[keys[i]];
        if (util.typeOf(config) === "Object") {
          options.config = Object.assign({}, options.config, originalOptions[keys[i]]);
        } else if (util.typeOf(config) === "Boolean") {
          options.config.disable = !config;
        }
        break;
      }
    }
    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).forEach(function(key) {
        if (typeof options.config[key] === "undefined") {
          options.config[key] = plugin.defaultConfig[key];
        }
      });
    }
    if (!options.root) {
      options.root = player.root;
    } else if (typeof options.root === "string") {
      options.root = player[options.root];
    }
    options.index = options.config.index || 0;
    try {
      if (plugins[pluginName.toLowerCase()]) {
        this.unRegister(cgid, pluginName.toLowerCase());
        console.warn("the is one plugin with same pluginName [".concat(pluginName, "] exist, destroy the old instance"));
      }
      var _instance = new plugin(options);
      plugins[pluginName.toLowerCase()] = _instance;
      plugins[pluginName.toLowerCase()].func = plugin;
      if (_instance && typeof _instance.afterCreate === "function") {
        _instance.afterCreate();
      }
      return _instance;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  unRegister: function unRegister(cgid, name) {
    if (cgid._pluginInfoId) {
      cgid = cgid._pluginInfoId;
    }
    name = name.toLowerCase();
    try {
      var plugin = this.pluginGroup[cgid]._plugins[name];
      if (plugin) {
        plugin.pluginName && plugin.__destroy();
        delete this.pluginGroup[cgid]._plugins[name];
      }
    } catch (e) {
      console.error("[unRegister:".concat(name, "] cgid:[").concat(cgid, "] error"), e);
    }
  },
  deletePlugin: function deletePlugin(player, name) {
    var cgid = player._pluginInfoId;
    if (cgid && this.pluginGroup[cgid] && this.pluginGroup[cgid]._plugins) {
      delete this.pluginGroup[cgid]._plugins[name];
    }
  },
  getPlugins: function getPlugins(player) {
    var cgid = player._pluginInfoId;
    return cgid && this.pluginGroup[cgid] ? this.pluginGroup[cgid]._plugins : {};
  },
  findPlugin: function findPlugin(player, name) {
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return null;
    }
    var cName = name.toLowerCase();
    return this.pluginGroup[cgid]._plugins[cName];
  },
  beforeInit: function beforeInit(player) {
    var _this2 = this;
    function retPromise(fun) {
      if (!fun || !fun.then) {
        return new Promise(function(resolve) {
          resolve();
        });
      } else {
        return fun;
      }
    }
    return new Promise(function(resolve) {
      if (!_this2.pluginGroup) {
        return;
      }
      var prevTask;
      if (player._loadingPlugins && player._loadingPlugins.length) {
        prevTask = Promise.all(player._loadingPlugins);
      } else {
        prevTask = Promise.resolve();
      }
      return prevTask.then(function() {
        var cgid = player._pluginInfoId;
        if (!_this2.pluginGroup[cgid]) {
          resolve();
          return;
        }
        var plugins = _this2.pluginGroup[cgid]._plugins;
        var pluginsRet = [];
        Object.keys(plugins).forEach(function(pName) {
          if (plugins[pName] && plugins[pName].beforePlayerInit) {
            try {
              var ret = plugins[pName].beforePlayerInit();
              pluginsRet.push(retPromise(ret));
            } catch (e) {
              pluginsRet.push(retPromise(null));
              throw e;
            }
          }
        });
        Promise.all([].concat(pluginsRet)).then(function() {
          resolve();
        }).catch(function(e) {
          console.error(e);
          resolve();
        });
      });
    });
  },
  afterInit: function afterInit(player) {
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return;
    }
    var plugins = this.pluginGroup[cgid]._plugins;
    Object.keys(plugins).forEach(function(pName) {
      if (plugins[pName] && plugins[pName].afterPlayerInit) {
        plugins[pName].afterPlayerInit();
      }
    });
  },
  setLang: function setLang(lang, player) {
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return;
    }
    var plugins = this.pluginGroup[cgid]._plugins;
    Object.keys(plugins).forEach(function(item) {
      if (plugins[item].updateLang) {
        plugins[item].updateLang(lang);
      } else {
        try {
          plugins[item].lang = lang;
        } catch (error) {
          console.warn("".concat(item, " setLang"));
        }
      }
    });
  },
  reRender: function reRender(player) {
    var _this3 = this;
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return;
    }
    var _pList = [];
    var plugins = this.pluginGroup[cgid]._plugins;
    Object.keys(plugins).forEach(function(pName) {
      if (pName !== "controls" && plugins[pName]) {
        _pList.push({
          plugin: plugins[pName].func,
          options: plugins[pName].__args
        });
        _this3.unRegister(cgid, pName);
      }
    });
    _pList.forEach(function(item) {
      _this3.register(player, item.plugin, item.options);
    });
  },
  onPluginsReady: function onPluginsReady(player) {
    var cgid = player._pluginInfoId;
    if (!cgid || !this.pluginGroup[cgid]) {
      return;
    }
    var plugins = this.pluginGroup[cgid]._plugins || {};
    Object.keys(plugins).forEach(function(key) {
      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === "function") {
        plugins[key].onPluginsReady();
      }
    });
  },
  destroy: function destroy(player) {
    var cgid = player._pluginInfoId;
    if (!this.pluginGroup[cgid]) {
      return;
    }
    unObserver(player.root);
    var plugins = this.pluginGroup[cgid]._plugins;
    for (var _i = 0, _Object$keys = Object.keys(plugins); _i < _Object$keys.length; _i++) {
      var item = _Object$keys[_i];
      this.unRegister(cgid, item);
    }
    delete this.pluginGroup[cgid];
    delete player._pluginInfoId;
  }
};

// node_modules/xgplayer/es/stateClassMap.js
var STATE_CLASS = {
  DEFAULT: "xgplayer",
  DEFAULT_SKIN: "xgplayer-skin-default",
  ENTER: "xgplayer-is-enter",
  PAUSED: "xgplayer-pause",
  PLAYING: "xgplayer-playing",
  ENDED: "xgplayer-ended",
  CANPLAY: "xgplayer-canplay",
  LOADING: "xgplayer-isloading",
  ERROR: "xgplayer-is-error",
  REPLAY: "xgplayer-replay",
  NO_START: "xgplayer-nostart",
  ACTIVE: "xgplayer-active",
  INACTIVE: "xgplayer-inactive",
  FULLSCREEN: "xgplayer-is-fullscreen",
  CSS_FULLSCREEN: "xgplayer-is-cssfullscreen",
  ROTATE_FULLSCREEN: "xgplayer-rotate-fullscreen",
  PARENT_ROTATE_FULLSCREEN: "xgplayer-rotate-parent",
  PARENT_FULLSCREEN: "xgplayer-fullscreen-parent",
  INNER_FULLSCREEN: "xgplayer-fullscreen-inner",
  NO_CONTROLS: "no-controls",
  FLEX_CONTROLS: "flex-controls",
  CONTROLS_FOLLOW: "controls-follow",
  CONTROLS_AUTOHIDE: "controls-autohide",
  TOP_BAR_AUTOHIDE: "top-bar-autohide",
  NOT_ALLOW_AUTOPLAY: "not-allow-autoplay",
  SEEKING: "seeking",
  PC: "xgplayer-pc",
  MOBILE: "xgplayer-mobile",
  MINI: "xgplayer-mini"
};

// node_modules/xgplayer/es/defaultConfig.js
function getDefaultConfig() {
  return {
    id: "",
    el: null,
    url: "",
    domEventType: "default",
    nullUrlStart: false,
    width: 600,
    height: 337.5,
    fluid: false,
    fitVideoSize: "fixed",
    videoFillMode: "auto",
    volume: 0.6,
    autoplay: false,
    autoplayMuted: false,
    loop: false,
    isLive: false,
    zoom: 1,
    videoInit: true,
    poster: "",
    isMobileSimulateMode: false,
    defaultPlaybackRate: 1,
    execBeforePluginsCall: null,
    allowSeekAfterEnded: true,
    enableContextmenu: true,
    closeVideoClick: false,
    closeVideoDblclick: false,
    closePlayerBlur: false,
    closeDelayBlur: false,
    leavePlayerTime: 3e3,
    closePlayVideoFocus: false,
    closePauseVideoFocus: false,
    closeFocusVideoFocus: true,
    closeControlsBlur: true,
    topBarAutoHide: true,
    videoAttributes: {},
    startTime: 0,
    seekedStatus: "play",
    miniprogress: false,
    disableSwipeHandler: function disableSwipeHandler() {
    },
    enableSwipeHandler: function enableSwipeHandler() {
    },
    preProcessUrl: null,
    ignores: [],
    whitelist: [],
    inactive: 3e3,
    lang: getLang(),
    controls: true,
    marginControls: false,
    fullscreenTarget: null,
    screenShot: false,
    rotate: false,
    pip: false,
    download: false,
    mini: false,
    cssFullscreen: true,
    keyShortcut: true,
    presets: [],
    plugins: [],
    playbackRate: 1,
    definition: {
      list: []
    },
    playsinline: true,
    customDuration: 0,
    timeOffset: 0,
    icons: {},
    i18n: [],
    tabindex: 0,
    thumbnail: null,
    videoConfig: {},
    isHideTips: false,
    minWaitDelay: 200,
    commonStyle: {
      progressColor: "",
      playedColor: "",
      cachedColor: "",
      sliderBtnStyle: {},
      volumeColor: ""
    }
  };
}

// node_modules/xgplayer/es/plugin/preset.js
var usePreset = function usePreset2(player, Preset) {
  var _player$config$plugin, _player$config$ignore;
  var presetInst;
  if (Preset.preset && Preset.options) {
    presetInst = new Preset.preset(Preset.options, player.config);
  } else {
    presetInst = new Preset({}, player.config);
  }
  var _presetInst = presetInst, _presetInst$plugins = _presetInst.plugins, plugins = _presetInst$plugins === void 0 ? [] : _presetInst$plugins, _presetInst$ignores = _presetInst.ignores, ignores = _presetInst$ignores === void 0 ? [] : _presetInst$ignores, _presetInst$icons = _presetInst.icons, icons = _presetInst$icons === void 0 ? {} : _presetInst$icons, _presetInst$i18n = _presetInst.i18n, i18n = _presetInst$i18n === void 0 ? [] : _presetInst$i18n;
  if (!player.config.plugins) {
    player.config.plugins = [];
  }
  if (!player.config.ignores) {
    player.config.ignores = [];
  }
  (_player$config$plugin = player.config.plugins).push.apply(_player$config$plugin, _toConsumableArray(plugins));
  (_player$config$ignore = player.config.ignores).push.apply(_player$config$ignore, _toConsumableArray(ignores));
  Object.keys(icons).map(function(key) {
    if (!player.config.icons[key]) {
      player.config.icons[key] = icons[key];
    }
  });
  var _ci18n = player.config.i18n || [];
  i18n.push.apply(i18n, _toConsumableArray(_ci18n));
  player.config.i18n = i18n;
};

// node_modules/xgplayer/es/plugins/controls/index.js
var Controls = function(_Plugin) {
  _inherits(Controls2, _Plugin);
  var _super = _createSuper(Controls2);
  function Controls2() {
    var _this;
    _classCallCheck(this, Controls2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function(e) {
      var _assertThisInitialize = _assertThisInitialized(_this), player = _assertThisInitialize.player, playerConfig = _assertThisInitialize.playerConfig;
      playerConfig.closeControlsBlur && player.focus({
        autoHide: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function(e) {
      var _assertThisInitialize2 = _assertThisInitialized(_this), player = _assertThisInitialize2.player;
      player.focus();
    });
    return _this;
  }
  _createClass(Controls2, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (!args.config.mode && sniffer.device === "mobile") {
        args.config.mode = "flex";
      }
      if (args.player.config.marginControls) {
        args.config.autoHide = false;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;
      var _this$config = this.config, disable = _this$config.disable, height = _this$config.height, mode = _this$config.mode;
      if (disable) {
        return;
      }
      mode === "flex" && this.player.addClass(STATE_CLASS.FLEX_CONTROLS);
      var style = {
        height: "".concat(height, "px")
      };
      Object.keys(style).map(function(key) {
        _this2.root.style[key] = style[key];
      });
      this.left = this.find("xg-left-grid");
      this.center = this.find("xg-center-grid");
      this.right = this.find("xg-right-grid");
      this.innerRoot = this.find("xg-inner-controls");
      this.on(MINI_STATE_CHANGE, function(isMini) {
        isMini ? util.addClass(_this2.root, "mini-controls") : util.removeClass(_this2.root, "mini-controls");
      });
      var isMobileSimulateMode = this.playerConfig.isMobileSimulateMode;
      if (sniffer.device !== "mobile" && isMobileSimulateMode !== "mobile") {
        this.bind("mouseenter", this.onMouseEnter);
        this.bind("mouseleave", this.onMouseLeave);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.player.focus({
        autoHide: false
      });
    }
  }, {
    key: "focusAwhile",
    value: function focusAwhile() {
      this.player.focus({
        autoHide: true
      });
    }
  }, {
    key: "blur",
    value: function blur() {
      this.player.blur({
        ignorePaused: true
      });
    }
  }, {
    key: "recoverAutoHide",
    value: function recoverAutoHide() {
      this.config.autoHide && util.addClass(this.root, STATE_CLASS.CONTROLS_AUTOHIDE);
    }
  }, {
    key: "pauseAutoHide",
    value: function pauseAutoHide() {
      util.removeClass(this.root, STATE_CLASS.CONTROLS_AUTOHIDE);
    }
  }, {
    key: "show",
    value: function show(value) {
      this.root.style.display = "";
      this.player.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.root.style.display = "none";
    }
  }, {
    key: "mode",
    get: function get() {
      return this.config.mode;
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var name = arguments.length > 2 ? arguments[2] : void 0;
      if (!this.root) {
        return;
      }
      var defaultConfig = plugin.defaultConfig || {};
      if (!options.root) {
        var position = options.position ? options.position : options.config && options.config.position ? options.config.position : defaultConfig.position;
        switch (position) {
          case POSITIONS.CONTROLS_LEFT:
            options.root = this.left;
            break;
          case POSITIONS.CONTROLS_RIGHT:
            options.root = this.right;
            break;
          case POSITIONS.CONTROLS_CENTER:
            options.root = this.center;
            break;
          case POSITIONS.CONTROLS:
            options.root = this.root;
            break;
          default:
            options.root = this.left;
        }
        return _get(_getPrototypeOf(Controls2.prototype), "registerPlugin", this).call(this, plugin, options, name);
      }
    }
  }, {
    key: "destroy",
    value: function destroy2() {
      if (sniffer.device !== "mobile") {
        this.unbind("mouseenter", this.onMouseEnter);
        this.unbind("mouseleave", this.onMouseLeave);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$config2 = this.config, mode = _this$config2.mode, autoHide = _this$config2.autoHide, initShow = _this$config2.initShow, disable = _this$config2.disable;
      if (disable) {
        return;
      }
      var className = util.classNames({
        "xgplayer-controls": true
      }, {
        "flex-controls": mode === "flex"
      }, {
        "bottom-controls": mode === "bottom"
      }, _defineProperty({}, STATE_CLASS.CONTROLS_AUTOHIDE, autoHide), {
        "xgplayer-controls-initshow": initShow || !autoHide
      });
      return '<xg-controls class="'.concat(className, '" unselectable="on">\n    <xg-inner-controls class="xg-inner-controls xg-pos">\n      <xg-left-grid class="xg-left-grid">\n      </xg-left-grid>\n      <xg-center-grid class="xg-center-grid"></xg-center-grid>\n      <xg-right-grid class="xg-right-grid">\n      </xg-right-grid>\n    </xg-inner-controls>\n    </xg-controls>');
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "controls";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        disable: false,
        autoHide: true,
        mode: "",
        initShow: false
      };
    }
  }]);
  return Controls2;
}(Plugin);

// node_modules/xgplayer/es/lang/en.js
var EN = {
  LANG: "en",
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: "video download error"
      },
      mse: {
        code: 2,
        msg: "stream append error"
      },
      parse: {
        code: 3,
        msg: "parsing error"
      },
      format: {
        code: 4,
        msg: "wrong format"
      },
      decoder: {
        code: 5,
        msg: "decoding error"
      },
      runtime: {
        code: 6,
        msg: "grammatical errors"
      },
      timeout: {
        code: 7,
        msg: "play timeout"
      },
      other: {
        code: 8,
        msg: "other errors"
      }
    },
    HAVE_NOTHING: "There is no information on whether audio/video is ready",
    HAVE_METADATA: "Audio/video metadata is ready ",
    HAVE_CURRENT_DATA: "Data about the current play location is available, but there is not enough data to play the next frame/millisecond",
    HAVE_FUTURE_DATA: "Current and at least one frame of data is available",
    HAVE_ENOUGH_DATA: "The available data is sufficient to start playing",
    NETWORK_EMPTY: "Audio/video has not been initialized",
    NETWORK_IDLE: "Audio/video is active and has been selected for resources, but no network is used",
    NETWORK_LOADING: "The browser is downloading the data",
    NETWORK_NO_SOURCE: "No audio/video source was found",
    MEDIA_ERR_ABORTED: "The fetch process is aborted by the user",
    MEDIA_ERR_NETWORK: "An error occurred while downloading",
    MEDIA_ERR_DECODE: "An error occurred while decoding",
    MEDIA_ERR_SRC_NOT_SUPPORTED: "Audio/video is not supported",
    REPLAY: "Replay",
    ERROR: "Network is offline",
    PLAY_TIPS: "Play",
    PAUSE_TIPS: "Pause",
    PLAYNEXT_TIPS: "Play next",
    DOWNLOAD_TIPS: "Download",
    ROTATE_TIPS: "Rotate",
    RELOAD_TIPS: "Reload",
    FULLSCREEN_TIPS: "Fullscreen",
    EXITFULLSCREEN_TIPS: "Exit fullscreen",
    CSSFULLSCREEN_TIPS: "Cssfullscreen",
    EXITCSSFULLSCREEN_TIPS: "Exit cssfullscreen",
    TEXTTRACK: "Caption",
    PIP: "PIP",
    SCREENSHOT: "Screenshot",
    LIVE: "LIVE",
    OFF: "Off",
    OPEN: "Open",
    MINI_DRAG: "Click and hold to drag",
    MINISCREEN: "Miniscreen",
    REFRESH_TIPS: "Please Try",
    REFRESH: "Refresh",
    FORWARD: "forward",
    LIVE_TIP: "Live"
  }
};

// node_modules/xgplayer/es/lang/i18n.js
var XGI18nLang = {
  lang: {},
  langKeys: [],
  textKeys: []
};
function deepMerge(dst, src) {
  Object.keys(src).forEach(function(key) {
    var _s = util.typeOf(src[key]);
    var _t = util.typeOf(dst[key]);
    if (_s === "Array") {
      var _dst$key;
      if (_t !== "Array") {
        dst[key] = [];
      }
      (_dst$key = dst[key]).push.apply(_dst$key, _toConsumableArray(src[key]));
    } else if (_s === "Object") {
      if (_t !== "Object") {
        dst[key] = {};
      }
      deepMerge(dst[key], src[key]);
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}
function updateKeys() {
  Object.keys(XGI18nLang.lang.en).map(function(key) {
    XGI18nLang.textKeys[key] = key;
  });
}
function extend(i18nTextList, i18nLangs) {
  var ext = [];
  if (!i18nLangs) {
    i18nLangs = XGI18nLang;
  }
  if (!i18nLangs.lang) {
    return;
  }
  if (util.typeOf(i18nTextList) !== "Array") {
    ext = Object.keys(i18nTextList).map(function(lang2) {
      var keyLang = lang2 === "zh" ? "zh-cn" : lang2;
      return {
        LANG: keyLang,
        TEXT: i18nTextList[lang2]
      };
    });
  } else {
    ext = i18nTextList;
  }
  var _i18nLangs = i18nLangs, lang = _i18nLangs.lang;
  ext.map(function(item) {
    if (item.LANG === "zh") {
      item.LANG = "zh-cn";
    }
    if (!lang[item.LANG]) {
      use(item, i18nLangs);
    } else {
      deepMerge(lang[item.LANG] || {}, item.TEXT || {});
    }
  });
  updateKeys();
}
function use(langData, i18nLangs) {
  var _clang = langData.LANG;
  if (!i18nLangs) {
    i18nLangs = XGI18nLang;
  }
  if (!i18nLangs.lang) {
    return;
  }
  var texts = langData.TEXT || {};
  if (_clang === "zh") {
    _clang = "zh-cn";
  }
  if (!i18nLangs.lang[_clang]) {
    i18nLangs.langKeys.push(_clang);
    i18nLangs.lang[_clang] = texts;
  } else {
    deepMerge(i18nLangs.lang[_clang], texts);
  }
  updateKeys();
}
function init2(id) {
  var _ret$langKeys;
  var ret = {
    lang: {},
    langKeys: [],
    textKeys: {},
    pId: id
  };
  deepMerge(ret.lang, XGI18nLang.lang);
  (_ret$langKeys = ret.langKeys).push.apply(_ret$langKeys, _toConsumableArray(XGI18nLang.langKeys));
  deepMerge(ret.textKeys, XGI18nLang.textKeys);
  return ret;
}
use(EN);
var I18N = {
  get textKeys() {
    return XGI18nLang.textKeys;
  },
  get langKeys() {
    return XGI18nLang.langKeys;
  },
  get lang() {
    var ret = {};
    XGI18nLang.langKeys.map(function(key) {
      ret[key] = XGI18nLang.lang[key];
    });
    if (XGI18nLang.lang["zh-cn"]) {
      ret.zh = XGI18nLang.lang["zh-cn"] || {};
    }
    return ret;
  },
  extend,
  use,
  init: init2
};

// node_modules/xgplayer/es/state.js
var STATES = {
  INITIAL: 1,
  READY: 2,
  ATTACHING: 3,
  ATTACHED: 4,
  NOTALLOW: 5,
  RUNNING: 6,
  ENDED: 7,
  DESTROYED: 8
};
var STATE_ARRAY = ["ERROR", "INITIAL", "READY", "ATTACHING", "ATTACHED", "NOTALLOW", "RUNNING", "ENDED", "DESTROYED"];

// node_modules/xgplayer/es/instManager.js
var import_eventemitter32 = __toESM(require_eventemitter3());
var store = {};
var instance = null;
var InstManager = function(_EventEmitter) {
  _inherits(InstManager2, _EventEmitter);
  var _super = _createSuper(InstManager2);
  function InstManager2() {
    _classCallCheck(this, InstManager2);
    return _super.apply(this, arguments);
  }
  _createClass(InstManager2, [{
    key: "add",
    value: function add(player) {
      if (!player) {
        return;
      }
      store[player.playerId] = player;
      if (Object.keys(store).length === 1) {
        this.setActive(player.playerId, true);
      }
    }
  }, {
    key: "remove",
    value: function remove(player) {
      if (!player) {
        return;
      }
      player.isUserActive;
      delete store[player.playerId];
    }
  }, {
    key: "_iterate",
    value: function _iterate(fn) {
      var endEarly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      for (var key in store) {
        if (Object.prototype.hasOwnProperty.call(store, key)) {
          var player = store[key];
          if (endEarly) {
            if (fn(player)) {
              break;
            }
          } else {
            fn(player);
          }
        }
      }
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      this._iterate(fn);
    }
  }, {
    key: "find",
    value: function find(fn) {
      var result = null;
      this._iterate(function(player) {
        var flag = fn(player);
        if (flag) {
          result = player;
        }
        return flag;
      }, true);
      return result;
    }
  }, {
    key: "findAll",
    value: function findAll(fn) {
      var results = [];
      this._iterate(function(player) {
        if (fn(player)) {
          results.push(player);
        }
      });
      return results;
    }
  }, {
    key: "setActive",
    value: function setActive(playerId) {
      var isActive = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!store[playerId]) {
        return;
      }
      if (isActive) {
        this.forEach(function(inst) {
          if (playerId === inst.playerId) {
            inst.isUserActive = true;
            inst.isInstNext = false;
          } else {
            inst.isUserActive = false;
          }
        });
      } else {
        store[playerId].isUserActive = isActive;
      }
      return playerId;
    }
  }, {
    key: "getActiveId",
    value: function getActiveId() {
      var keys = Object.keys(store);
      for (var i = 0; i < keys.length; i++) {
        var c = store[keys[i]];
        if (c && c.isUserActive) {
          return keys[i];
        }
      }
      return null;
    }
  }, {
    key: "setNext",
    value: function setNext(playerId) {
      var isNext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!store[playerId]) {
        return;
      }
      if (isNext) {
        this.forEach(function(inst) {
          if (playerId === inst.playerId) {
            inst.isUserActive = false;
            inst.isInstNext = true;
          } else {
            inst.isInstNext = false;
          }
        });
      } else {
        store[playerId].isInstNext = isNext;
      }
      return playerId;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      instance || (instance = new InstManager2());
      return instance;
    }
  }]);
  return InstManager2;
}(import_eventemitter32.EventEmitter);
function checkPlayerRoot(root) {
  var keys = Object.keys(store);
  for (var i = 0; i < keys.length; i++) {
    var p = store[keys[i]];
    if (p.root === root) {
      return p;
    }
  }
  return null;
}

// node_modules/xgplayer/es/player.js
var PlAYER_HOOKS = ["play", "pause", "replay", "retry"];
var REAL_TIME_SPEED = 0;
var AVG_SPEED = 0;
var instManager = null;
var Player = function(_MediaProxy) {
  _inherits(Player2, _MediaProxy);
  var _super = _createSuper(Player2);
  function Player2(options) {
    var _this;
    _classCallCheck(this, Player2);
    var _config = util.deepMerge(getDefaultConfig(), options);
    _this = _super.call(this, _config);
    _defineProperty(_assertThisInitialized(_this), "canPlayFunc", function() {
      if (!_this.config) {
        return;
      }
      var _this$config = _this.config, autoplay = _this$config.autoplay, defaultPlaybackRate = _this$config.defaultPlaybackRate;
      XG_DEBUG.logInfo("player", "canPlayFunc, startTime", _this.__startTime);
      _this._seekToStartTime();
      _this.playbackRate = defaultPlaybackRate;
      (autoplay || _this._useAutoplay) && _this.mediaPlay();
      _this.off(CANPLAY, _this.canPlayFunc);
      _this.removeClass(STATE_CLASS.ENTER);
    });
    _defineProperty(_assertThisInitialized(_this), "onFullscreenChange", function(event, isFullScreen) {
      var delayResize = function delayResize2() {
        util.setTimeout(_assertThisInitialized(_this), function() {
          _this.resize();
        }, 100);
      };
      var fullEl = util.getFullScreenEl();
      if (_this._fullActionFrom) {
        _this._fullActionFrom = "";
      } else {
        _this.emit(USER_ACTION, {
          eventType: "system",
          action: "switch_fullscreen",
          pluginName: "player",
          currentTime: _this.currentTime,
          duration: _this.duration,
          props: [{
            prop: "fullscreen",
            from: true,
            to: false
          }]
        });
      }
      var isVideo = checkIsCurrentVideo(fullEl, _this.playerId, PLATER_ID);
      if (isFullScreen || fullEl && (fullEl === _this._fullscreenEl || isVideo)) {
        delayResize();
        !_this.config.closeFocusVideoFocus && _this.media.focus();
        _this.fullscreen = true;
        _this.changeFullStyle(_this.root, fullEl, STATE_CLASS.FULLSCREEN);
        _this.emit(FULLSCREEN_CHANGE, true, _this._fullScreenOffset);
        if (_this.cssfullscreen) {
          _this.exitCssFullscreen();
        }
      } else if (_this.fullscreen) {
        delayResize();
        var _assertThisInitialize = _assertThisInitialized(_this), _fullScreenOffset = _assertThisInitialize._fullScreenOffset, config = _assertThisInitialize.config;
        if (config.needFullscreenScroll) {
          window.scrollTo(_fullScreenOffset.left, _fullScreenOffset.top);
          util.setTimeout(_assertThisInitialized(_this), function() {
            _this.fullscreen = false;
            _this._fullScreenOffset = null;
          }, 100);
        } else {
          !_this.config.closeFocusVideoFocus && _this.media.focus();
          _this.fullscreen = false;
          _this._fullScreenOffset = null;
        }
        if (!_this.cssfullscreen) {
          var el = _this._fullscreenEl;
          if (!el && (_this.root.contains(event.target) || event.target === _this.root)) {
            el = event.target;
          }
          _this.recoverFullStyle(_this.root, el, STATE_CLASS.FULLSCREEN);
        } else {
          _this.removeClass(STATE_CLASS.FULLSCREEN);
        }
        _this._fullscreenEl = null;
        _this.emit(FULLSCREEN_CHANGE, false);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_onWebkitbeginfullscreen", function(e) {
      _this._fullscreenEl = _this.media;
      _this.onFullscreenChange(e, true);
    });
    _defineProperty(_assertThisInitialized(_this), "_onWebkitendfullscreen", function(e) {
      _this.onFullscreenChange(e, false);
    });
    hooksDescriptor(_assertThisInitialized(_this), PlAYER_HOOKS);
    _this.config = _config;
    _this._pluginInfoId = util.generateSessionId();
    bindDebug(_assertThisInitialized(_this));
    var defaultPreset = _this.constructor.defaultPreset;
    if (_this.config.presets.length) {
      var defaultIdx = _this.config.presets.indexOf("default");
      if (defaultIdx >= 0 && defaultPreset) {
        _this.config.presets[defaultIdx] = defaultPreset;
      }
    } else if (defaultPreset) {
      _this.config.presets.push(defaultPreset);
    }
    _this.userTimer = null;
    _this.waitTimer = null;
    _this.handleSource = true;
    _this._state = STATES.INITIAL;
    _this.isAd = false;
    _this.isError = false;
    _this._hasStart = false;
    _this.isSeeking = false;
    _this.isCanplay = false;
    _this._useAutoplay = false;
    _this.__startTime = -1;
    _this.rotateDeg = 0;
    _this.isActive = false;
    _this.fullscreen = false;
    _this.cssfullscreen = false;
    _this.isRotateFullscreen = false;
    _this._fullscreenEl = null;
    _this.timeSegments = [];
    _this._cssfullscreenEl = null;
    _this.curDefinition = null;
    _this._orgCss = "";
    _this._fullScreenOffset = null;
    _this._videoHeight = 0;
    _this._videoWidth = 0;
    _this.videoPos = {
      pi: 1,
      scale: 0,
      rotate: -1,
      x: 0,
      y: 0,
      h: -1,
      w: -1,
      vy: 0,
      vx: 0
    };
    _this.sizeInfo = {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    _this._accPlayed = {
      t: 0,
      acc: 0,
      loopAcc: 0
    };
    _this._offsetInfo = {
      currentTime: -1,
      duration: 0
    };
    _this.innerContainer = null;
    _this.controls = null;
    _this.topBar = null;
    _this.root = null;
    _this.__i18n = I18N.init(_this._pluginInfoId);
    if (sniffer.os.isAndroid && sniffer.osVersion > 0 && sniffer.osVersion < 6) {
      _this.config.autoplay = false;
    }
    _this.database = new INDEXDB();
    _this.isUserActive = false;
    _this._onceSeekCanplay = null;
    _this._isPauseBeforeSeek = 0;
    _this.innerStates = {
      isActiveLocked: false
    };
    _this.instManager = instManager;
    var rootInit = _this._initDOM();
    if (!rootInit) {
      console.error(new Error("can't find the dom which id is ".concat(_this.config.id, " or this.config.el does not exist")));
      return _possibleConstructorReturn(_this);
    }
    var _this$config2 = _this.config, _this$config2$definit = _this$config2.definition, definition = _this$config2$definit === void 0 ? {} : _this$config2$definit, url = _this$config2.url;
    if (!url && definition.list && definition.list.length > 0) {
      var defaultDefinitionObj = definition.list.find(function(e) {
        return e.definition && e.definition === definition.defaultDefinition;
      });
      if (!defaultDefinitionObj) {
        definition.defaultDefinition = definition.list[0].definition;
        defaultDefinitionObj = definition.list[0];
      }
      _this.config.url = defaultDefinitionObj.url;
      _this.curDefinition = defaultDefinitionObj;
    }
    _this._bindEvents();
    _this._registerPresets();
    _this._registerPlugins();
    pluginsManager.onPluginsReady(_assertThisInitialized(_this));
    _this.getInitDefinition();
    _this.setState(STATES.READY);
    util.setTimeout(_assertThisInitialized(_this), function() {
      _this.emit(READY);
    }, 0);
    _this.onReady && _this.onReady();
    if (_this.config.videoInit || _this.config.autoplay) {
      if (!_this.hasStart || _this.state < STATES.ATTACHED) {
        _this.start();
      }
    }
    return _this;
  }
  _createClass(Player2, [{
    key: "_initDOM",
    value: function _initDOM() {
      var _instManager, _this2 = this;
      this.root = this.config.id ? document.getElementById(this.config.id) : null;
      if (!this.root) {
        var el = this.config.el;
        if (el && el.nodeType === 1) {
          this.root = el;
        } else {
          this.emit(ERROR, new Errors("use", this.config.vid, {
            line: 32,
            handle: "Constructor",
            msg: "container id can't be empty"
          }));
          console.error("this.confg.id or this.config.el can't be empty");
          return false;
        }
      }
      var ret = checkPlayerRoot(this.root);
      if (ret) {
        XG_DEBUG.logWarn("The is an Player instance already exists in this.root, destroy it and reinitialize");
        ret.destroy();
      }
      this.root.setAttribute(PLATER_ID, this.playerId);
      (_instManager = instManager) === null || _instManager === void 0 ? void 0 : _instManager.add(this);
      pluginsManager.init(this);
      this._initBaseDoms();
      var XgVideoProxy = this.constructor.XgVideoProxy;
      if (XgVideoProxy && this.mediaConfig.mediaType === XgVideoProxy.mediaType) {
        var _el = this.innerContainer || this.root;
        this.detachVideoEvents(this.media);
        var _nVideo = new XgVideoProxy(_el, this.config, this.mediaConfig);
        this.attachVideoEvents(_nVideo);
        this.media = _nVideo;
      }
      this.media.setAttribute(PLATER_ID, this.playerId);
      if (this.config.controls) {
        var _root = this.config.controls.root || null;
        var controls = pluginsManager.register(this, Controls, {
          root: _root
        });
        this.controls = controls;
      }
      var device = this.config.isMobileSimulateMode === "mobile" ? "mobile" : sniffer.device;
      this.addClass("".concat(STATE_CLASS.DEFAULT, " ").concat(STATE_CLASS.INACTIVE, " xgplayer-").concat(device, " ").concat(this.config.controls ? "" : STATE_CLASS.NO_CONTROLS));
      if (this.config.autoplay) {
        this.addClass(STATE_CLASS.ENTER);
      } else {
        this.addClass(STATE_CLASS.NO_START);
      }
      if (this.config.fluid) {
        var _this$config3 = this.config, _width = _this$config3.width, _height = _this$config3.height;
        if (typeof _width !== "number" || typeof _height !== "number") {
          _width = 600;
          _height = 337.5;
        }
        var style = {
          width: "100%",
          height: "0",
          "max-width": "100%",
          "padding-top": "".concat(_height * 100 / _width, "%")
        };
        Object.keys(style).forEach(function(key) {
          _this2.root.style[key] = style[key];
        });
      } else {
        ["width", "height"].forEach(function(key) {
          if (_this2.config[key]) {
            if (typeof _this2.config[key] !== "number") {
              _this2.root.style[key] = _this2.config[key];
            } else {
              _this2.root.style[key] = "".concat(_this2.config[key], "px");
            }
          }
        });
      }
      var _this$root$getBoundin = this.root.getBoundingClientRect(), width = _this$root$getBoundin.width, height = _this$root$getBoundin.height, left = _this$root$getBoundin.left, top = _this$root$getBoundin.top;
      this.sizeInfo.width = width;
      this.sizeInfo.height = height;
      this.sizeInfo.left = left;
      this.sizeInfo.top = top;
      return true;
    }
  }, {
    key: "_initBaseDoms",
    value: function _initBaseDoms() {
      this.topBar = null;
      this.leftBar = null;
      this.rightBar = null;
      if (this.config.marginControls) {
        this.innerContainer = util.createDom("xg-video-container", "", {
          "data-index": -1
        }, "xg-video-container");
        this.root.appendChild(this.innerContainer);
      }
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this3 = this;
      ["focus", "blur"].forEach(function(item) {
        _this3.on(item, _this3["on" + item.charAt(0).toUpperCase() + item.slice(1)]);
      });
      FULLSCREEN_EVENTS.forEach(function(item) {
        document && document.addEventListener(item, _this3.onFullscreenChange);
      });
      if (sniffer.os.isIos) {
        this.media.addEventListener("webkitbeginfullscreen", this._onWebkitbeginfullscreen);
        this.media.addEventListener("webkitendfullscreen", this._onWebkitendfullscreen);
      }
      this.once(LOADED_DATA, this.resize);
      this.playFunc = function() {
        if (!_this3.config.closeFocusVideoFocus) {
          _this3.media.focus();
        }
      };
      this.once(PLAY, this.playFunc);
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      var _this4 = this;
      this.root.removeEventListener("mousemove", this.mousemoveFunc);
      FULLSCREEN_EVENTS.forEach(function(item) {
        document.removeEventListener(item, _this4.onFullscreenChange);
      });
      this.playFunc && this.off(PLAY, this.playFunc);
      this.off(CANPLAY, this.canPlayFunc);
      this.media.removeEventListener("webkitbeginfullscreen", this._onWebkitbeginfullscreen);
      this.media.removeEventListener("webkitendfullscreen", this._onWebkitendfullscreen);
    }
  }, {
    key: "_clearUserTimer",
    value: function _clearUserTimer() {
      if (!this.userTimer) {
        return;
      }
      util.clearTimeout(this, this.userTimer);
      this.userTimer = null;
    }
  }, {
    key: "_startInit",
    value: function _startInit(url) {
      var _this5 = this;
      if (!this.media) {
        return;
      }
      if (!url || url === "" || util.typeOf(url) === "Array" && url.length === 0) {
        url = "";
        this.emit(URL_NULL);
        XG_DEBUG.logWarn("config.url is null, please get url and run player._startInit(url)");
        if (this.config.nullUrlStart) {
          return;
        }
      }
      if (this.handleSource) {
        this._detachSourceEvents(this.media);
        if (util.typeOf(url) === "Array" && url.length > 0) {
          this._attachSourceEvents(this.media, url);
        } else if (!this.media.src || this.media.src !== url) {
          this.media.src = url;
        } else if (!url) {
          this.media.removeAttribute("src");
        }
      }
      if (util.typeOf(this.config.volume) === "Number") {
        this.volume = this.config.volume;
      }
      var _root = this.innerContainer ? this.innerContainer : this.root;
      if (this.media instanceof window.Element && !_root.contains(this.media)) {
        _root.insertBefore(this.media, _root.firstChild);
      }
      var readyState = this.media.readyState;
      XG_DEBUG.logInfo("_startInit readyState", readyState);
      if (this.config.autoplay) {
        !util.isMSE(this.media) && this.load();
        (sniffer.os.isIpad || sniffer.os.isPhone) && this.mediaPlay();
      }
      var startTime = this.config.startTime;
      this.__startTime = startTime > 0 ? startTime : -1;
      this.config.startTime = 0;
      if (readyState >= 2 && this.duration > 0) {
        this.canPlayFunc();
      } else {
        this.on(CANPLAY, this.canPlayFunc);
      }
      if (!this.hasStart || this.state < STATES.ATTACHED) {
        pluginsManager.afterInit(this);
      }
      this.hasStart = true;
      this.setState(STATES.ATTACHED);
      util.setTimeout(this, function() {
        _this5.emit(COMPLETE);
      }, 0);
    }
  }, {
    key: "_registerPlugins",
    value: function _registerPlugins() {
      var _this6 = this;
      var isInit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      this._loadingPlugins = [];
      var ignores = this.config.ignores || [];
      var plugins = this.config.plugins || [];
      var i18n = this.config.i18n || [];
      isInit && I18N.extend(i18n, this.__i18n);
      var ignoresStr = ignores.join("||").toLowerCase().split("||");
      var cuPlugins = this.plugins;
      plugins.forEach(function(plugin) {
        try {
          var pluginName = plugin.plugin ? plugin.plugin.pluginName : plugin.pluginName;
          if (pluginName && ignoresStr.indexOf(pluginName.toLowerCase()) > -1) {
            return null;
          }
          if (!isInit && cuPlugins[pluginName.toLowerCase()]) {
            return;
          }
          if (plugin.lazy && plugin.loader) {
            var loadingPlugin = pluginsManager.lazyRegister(_this6, plugin);
            if (plugin.forceBeforeInit) {
              loadingPlugin.then(function() {
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              }).catch(function(e) {
                XG_DEBUG.logError("_registerPlugins:loadingPlugin", e);
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              });
              _this6._loadingPlugins.push(loadingPlugin);
            }
            return;
          }
          return _this6.registerPlugin(plugin);
        } catch (err) {
          XG_DEBUG.logError("_registerPlugins:", err);
        }
      });
    }
  }, {
    key: "_registerPresets",
    value: function _registerPresets() {
      var _this7 = this;
      this.config.presets.forEach(function(preset) {
        usePreset(_this7, preset);
      });
    }
  }, {
    key: "_getRootByPosition",
    value: function _getRootByPosition(position) {
      var _root = null;
      switch (position) {
        case POSITIONS.ROOT_RIGHT:
          if (!this.rightBar) {
            this.rightBar = util.createPositionBar("xg-right-bar", this.root);
          }
          _root = this.rightBar;
          break;
        case POSITIONS.ROOT_LEFT:
          if (!this.leftBar) {
            this.leftBar = util.createPositionBar("xg-left-bar", this.root);
          }
          _root = this.leftBar;
          break;
        case POSITIONS.ROOT_TOP:
          if (!this.topBar) {
            this.topBar = util.createPositionBar("xg-top-bar", this.root);
            if (this.config.topBarAutoHide) {
              util.addClass(this.topBar, STATE_CLASS.TOP_BAR_AUTOHIDE);
            }
          }
          _root = this.topBar;
          break;
        default:
          _root = this.innerContainer || this.root;
          break;
      }
      return _root;
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin, config) {
      var _retPlugin = pluginsManager.formatPluginInfo(plugin, config);
      var PLUFGIN = _retPlugin.PLUFGIN, options = _retPlugin.options;
      var plugins = this.config.plugins;
      var exits = pluginsManager.checkPluginIfExits(PLUFGIN.pluginName, plugins);
      !exits && plugins.push(PLUFGIN);
      var _pConfig = pluginsManager.getRootByConfig(PLUFGIN.pluginName, this.config);
      _pConfig.root && (options.root = _pConfig.root);
      _pConfig.position && (options.position = _pConfig.position);
      var position = options.position ? options.position : options.config && options.config.position || PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position;
      if (!options.root && typeof position === "string" && position.indexOf("controls") > -1) {
        var _this$controls;
        return (_this$controls = this.controls) === null || _this$controls === void 0 ? void 0 : _this$controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName);
      }
      if (!options.root) {
        options.root = this._getRootByPosition(position);
      }
      return pluginsManager.register(this, PLUFGIN, options);
    }
  }, {
    key: "deregister",
    value: function deregister(plugin) {
      if (typeof plugin === "string") {
        pluginsManager.unRegister(this, plugin);
      } else if (plugin instanceof BasePlugin) {
        pluginsManager.unRegister(this, plugin.pluginName);
      }
    }
  }, {
    key: "unRegisterPlugin",
    value: function unRegisterPlugin(plugin) {
      var removedFromConfig = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      this.deregister(plugin);
      if (removedFromConfig) {
        this.removePluginFromConfig(plugin);
      }
    }
  }, {
    key: "removePluginFromConfig",
    value: function removePluginFromConfig(plugin) {
      var pluginName;
      if (typeof plugin === "string") {
        pluginName = plugin;
      } else if (plugin instanceof BasePlugin) {
        pluginName = plugin.pluginName;
      }
      if (!pluginName) {
        return;
      }
      for (var i = this.config.plugins.length - 1; i > -1; i--) {
        var _plugin = this.config.plugins[i];
        if (_plugin.pluginName.toLowerCase() === pluginName.toLowerCase()) {
          this.config.plugins.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "plugins",
    get: function get() {
      return pluginsManager.getPlugins(this);
    }
  }, {
    key: "getPlugin",
    value: function getPlugin(pluginName) {
      var plugin = pluginsManager.findPlugin(this, pluginName);
      return plugin && plugin.pluginName ? plugin : null;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      if (!this.root) {
        return;
      }
      if (!util.hasClass(this.root, className)) {
        util.addClass(this.root, className);
      }
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      if (!this.root) {
        return;
      }
      util.removeClass(this.root, className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      if (!this.root) {
        return;
      }
      return util.hasClass(this.root, className);
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (!this.root) {
        return;
      }
      this.root.setAttribute(key, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(key, value) {
      if (!this.root) {
        return;
      }
      this.root.removeAttribute(key, value);
    }
  }, {
    key: "start",
    value: function start(url) {
      var _this8 = this;
      if (this.state > STATES.ATTACHING) {
        return;
      }
      if (!url && !this.config.url) {
        this.getInitDefinition();
      }
      this.hasStart = true;
      this.setState(STATES.ATTACHING);
      this._registerPlugins(false);
      return pluginsManager.beforeInit(this).then(function() {
        if (!_this8.config) {
          return;
        }
        if (!url) {
          url = _this8.url || _this8.config.url;
        }
        var _furl = _this8._preProcessUrl(url);
        var ret = _this8._startInit(_furl.url);
        return ret;
      }).catch(function(e) {
        e.fileName = "player";
        e.lineNumber = "236";
        XG_DEBUG.logError("start:beforeInit:", e);
        throw e;
      });
    }
  }, {
    key: "switchURL",
    value: function switchURL(url, options) {
      var _this9 = this;
      var _src = url;
      if (util.typeOf(url) === "Object") {
        _src = url.url;
      }
      _src = this._preProcessUrl(_src).url;
      var curTime = this.currentTime;
      this.__startTime = curTime;
      var isPaused = this.paused && !this.isError;
      this.src = _src;
      return new Promise(function(resolve, reject) {
        var _error = function _error2(e) {
          _this9.off("timeupdate", _canplay);
          _this9.off("canplay", _canplay);
          reject(e);
        };
        var _canplay = function _canplay2() {
          _this9._seekToStartTime();
          if (isPaused) {
            _this9.pause();
          }
          _this9.off("error", _error);
          resolve(true);
        };
        _this9.once("error", _error);
        if (!_src) {
          _this9.errorHandler("error", {
            code: 6,
            message: "empty_src"
          });
          return;
        }
        if (sniffer.os.isAndroid) {
          _this9.once("timeupdate", _canplay);
        } else {
          _this9.once("canplay", _canplay);
        }
        _this9.play();
      });
    }
  }, {
    key: "videoPlay",
    value: function videoPlay() {
      this.mediaPlay();
    }
  }, {
    key: "mediaPlay",
    value: function mediaPlay() {
      var _this10 = this;
      if (!this.hasStart && this.state < STATES.ATTACHED) {
        this.removeClass(STATE_CLASS.NO_START);
        this.addClass(STATE_CLASS.ENTER);
        this.start();
        this._useAutoplay = true;
        return;
      }
      if (this.state < STATES.RUNNING) {
        this.removeClass(STATE_CLASS.NO_START);
        !this.isCanplay && this.addClass(STATE_CLASS.ENTER);
      }
      var playPromise = _get(_getPrototypeOf(Player2.prototype), "play", this).call(this);
      if (playPromise !== void 0 && playPromise && playPromise.then) {
        playPromise.then(function() {
          _this10.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
          _this10.addClass(STATE_CLASS.PLAYING);
          if (_this10.state < STATES.RUNNING) {
            XG_DEBUG.logInfo(">>>>playPromise.then");
            _this10.setState(STATES.RUNNING);
            _this10.emit(AUTOPLAY_STARTED);
          }
        }).catch(function(e) {
          XG_DEBUG.logWarn(">>>>playPromise.catch", e.name);
          if (_this10.media && _this10.media.error) {
            _this10.onError();
            _this10.removeClass(STATE_CLASS.ENTER);
            return;
          }
          if (e.name === "NotAllowedError") {
            _this10._errorTimer = util.setTimeout(_this10, function() {
              _this10._errorTimer = null;
              _this10.emit(AUTOPLAY_PREVENTED);
              _this10.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
              _this10.removeClass(STATE_CLASS.ENTER);
              _this10.pause();
              _this10.setState(STATES.NOTALLOW);
            }, 0);
          }
        });
      } else {
        XG_DEBUG.logWarn("video.play not return promise");
        if (this.state < STATES.RUNNING) {
          this.setState(STATES.RUNNING);
          this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
          this.removeClass(STATE_CLASS.NO_START);
          this.removeClass(STATE_CLASS.ENTER);
          this.addClass(STATE_CLASS.PLAYING);
          this.emit(AUTOPLAY_STARTED);
        }
      }
      return playPromise;
    }
  }, {
    key: "mediaPause",
    value: function mediaPause() {
      _get(_getPrototypeOf(Player2.prototype), "pause", this).call(this);
    }
  }, {
    key: "videoPause",
    value: function videoPause() {
      _get(_getPrototypeOf(Player2.prototype), "pause", this).call(this);
    }
  }, {
    key: "play",
    value: function play() {
      var _this11 = this;
      this.removeClass(STATE_CLASS.PAUSED);
      return runHooks(this, "play", function() {
        return _this11.mediaPlay();
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this12 = this;
      runHooks(this, "pause", function() {
        _get(_getPrototypeOf(Player2.prototype), "pause", _this12).call(_this12);
      });
    }
  }, {
    key: "seek",
    value: function seek(time, status) {
      var _this13 = this;
      if (!this.media || Number.isNaN(Number(time)) || !this.hasStart) {
        return;
      }
      var _this$config4 = this.config, isSeekedPlay = _this$config4.isSeekedPlay, seekedStatus = _this$config4.seekedStatus;
      var _status = status || (isSeekedPlay ? "play" : seekedStatus);
      time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time;
      !this._isPauseBeforeSeek && (this._isPauseBeforeSeek = this.paused ? 2 : 1);
      this._onceSeekCanplay && this.off(SEEKED, this._onceSeekCanplay);
      this._onceSeekCanplay = function() {
        _this13.removeClass(STATE_CLASS.ENTER);
        _this13.isSeeking = false;
        switch (_status) {
          case "play":
            _this13.play();
            break;
          case "pause":
            _this13.pause();
            break;
          default:
            _this13._isPauseBeforeSeek > 1 || _this13.paused ? _this13.pause() : _this13.play();
        }
        _this13._isPauseBeforeSeek = 0;
        _this13._onceSeekCanplay = null;
      };
      this.once(SEEKED, this._onceSeekCanplay);
      if (this.state < STATES.RUNNING) {
        this.removeClass(STATE_CLASS.NO_START);
        this.currentTime = time;
        this.play();
      } else {
        this.currentTime = time;
      }
    }
  }, {
    key: "getInitDefinition",
    value: function getInitDefinition() {
      var _this14 = this;
      var _this$config5 = this.config, definition = _this$config5.definition, url = _this$config5.url;
      if (!url && definition && definition.list && definition.list.length > 0 && definition.defaultDefinition) {
        definition.list.map(function(item) {
          if (item.definition === definition.defaultDefinition) {
            _this14.config.url = item.url;
            _this14.curDefinition = item;
          }
        });
      }
    }
  }, {
    key: "changeDefinition",
    value: function changeDefinition(to, from) {
      var _this15 = this;
      var definition = this.config.definition;
      if (Array.isArray(definition === null || definition === void 0 ? void 0 : definition.list)) {
        definition.list.forEach(function(item) {
          if ((to === null || to === void 0 ? void 0 : to.definition) === item.definition) {
            _this15.curDefinition = item;
          }
        });
      }
      if (to !== null && to !== void 0 && to.bitrate && typeof to.bitrate !== "number") {
        to.bitrate = parseInt(to.bitrate, 10) || 0;
      }
      this.emit(DEFINITION_CHANGE, {
        from,
        to
      });
      if (!this.hasStart) {
        this.config.url = to.url;
        return;
      }
      var ret = this.switchURL(to.url, _objectSpread2({
        seamless: definition.seamless !== false && typeof MediaSource !== "undefined" && typeof MediaSource.isTypeSupported === "function"
      }, to));
      if (ret && ret.then) {
        ret.then(function() {
          _this15.emit(AFTER_DEFINITION_CHANGE, {
            from,
            to
          });
        });
      } else {
        this.emit(AFTER_DEFINITION_CHANGE, {
          from,
          to
        });
      }
    }
  }, {
    key: "reload",
    value: function reload() {
      this.load();
      this.reloadFunc = function() {
        this.play();
      };
      this.once(LOADED_DATA, this.reloadFunc);
    }
  }, {
    key: "resetState",
    value: function resetState() {
      var _this16 = this;
      var NOT_ALLOW_AUTOPLAY = STATE_CLASS.NOT_ALLOW_AUTOPLAY, PLAYING2 = STATE_CLASS.PLAYING, NO_START = STATE_CLASS.NO_START, PAUSED = STATE_CLASS.PAUSED, REPLAY2 = STATE_CLASS.REPLAY, ENTER = STATE_CLASS.ENTER, ENDED2 = STATE_CLASS.ENDED, ERROR2 = STATE_CLASS.ERROR, LOADING2 = STATE_CLASS.LOADING;
      var clsList = [NOT_ALLOW_AUTOPLAY, PLAYING2, NO_START, PAUSED, REPLAY2, ENTER, ENDED2, ERROR2, LOADING2];
      this.hasStart = false;
      this.isError = false;
      this._useAutoplay = false;
      this.mediaPause();
      this._accPlayed.acc = 0;
      this._accPlayed.t = 0;
      this._accPlayed.loopAcc = 0;
      clsList.forEach(function(cls) {
        _this16.removeClass(cls);
      });
      this.addClass(STATE_CLASS.NO_START);
      this.emit(RESET);
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this17 = this;
      var unregisterPlugins = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var isResetConfig = arguments.length > 1 ? arguments[1] : void 0;
      this.resetState();
      var plugins = this.plugins;
      if (!plugins) {
        return;
      }
      unregisterPlugins.map(function(pn) {
        _this17.deregister(pn);
      });
      if (isResetConfig) {
        var de = getDefaultConfig();
        Object.keys(this.config).keys(function(k) {
          if (_this17.config[k] !== "undefined" && (k === "plugins" || k === "presets" || k === "el" || k === "id")) {
            _this17.config[k] = de[k];
          }
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy2() {
      var _instManager2, _this18 = this;
      var innerContainer = this.innerContainer, root = this.root, media = this.media;
      if (!root || !media) {
        return;
      }
      this.hasStart = false;
      this._useAutoplay = false;
      root.removeAttribute(PLATER_ID);
      this.updateAcc("destroy");
      this._unbindEvents();
      this._detachSourceEvents(this.media);
      util.clearAllTimers(this);
      this.emit(DESTROY);
      (_instManager2 = instManager) === null || _instManager2 === void 0 ? void 0 : _instManager2.remove(this);
      pluginsManager.destroy(this);
      delHooksDescriptor(this);
      _get(_getPrototypeOf(Player2.prototype), "destroy", this).call(this);
      if (this.fullscreen && this._fullscreenEl === this.root) {
        this.exitFullscreen();
      }
      if (innerContainer) {
        var _c = innerContainer.children;
        for (var i = 0; i < _c.length; i++) {
          innerContainer.removeChild(_c[i]);
        }
      }
      !innerContainer && media instanceof window.Node && root.contains(media) && root.removeChild(media);
      ["topBar", "leftBar", "rightBar", "innerContainer"].map(function(item) {
        _this18[item] && root.removeChild(_this18[item]);
        _this18[item] = null;
      });
      var cList = root.className.split(" ");
      if (cList.length > 0) {
        root.className = cList.filter(function(name) {
          return name.indexOf("xgplayer") < 0;
        }).join(" ");
      } else {
        root.className = "";
      }
      this.removeAttribute("data-xgfill");
      ["isSeeking", "isCanplay", "isActive", "cssfullscreen", "fullscreen"].forEach(function(key) {
        _this18[key] = false;
      });
    }
  }, {
    key: "replay",
    value: function replay() {
      var _this19 = this;
      this.removeClass(STATE_CLASS.ENDED);
      this.currentTime = 0;
      this.isSeeking = false;
      runHooks(this, "replay", function() {
        _this19.once(SEEKED, function() {
          var playPromise = _this19.mediaPlay();
          if (playPromise && playPromise.catch) {
            playPromise.catch(function(err) {
              console.log(err);
            });
          }
        });
        _this19.emit(REPLAY);
        _this19.onPlay();
      });
    }
  }, {
    key: "retry",
    value: function retry() {
      var _this20 = this;
      this.removeClass(STATE_CLASS.ERROR);
      this.addClass(STATE_CLASS.LOADING);
      runHooks(this, "retry", function() {
        var cur = _this20.currentTime;
        var url = _this20.config.url;
        var _srcRet = !util.isMSE(_this20.media) ? _this20._preProcessUrl(url) : {
          url
        };
        _this20.src = _srcRet.url;
        !_this20.config.isLive && (_this20.currentTime = cur);
        _this20.once(CANPLAY, function() {
          _this20.mediaPlay();
        });
      });
    }
  }, {
    key: "changeFullStyle",
    value: function changeFullStyle(root, el, rootClass, pClassName) {
      if (!root) {
        return;
      }
      if (!pClassName) {
        pClassName = STATE_CLASS.PARENT_FULLSCREEN;
      }
      if (!this._orgCss) {
        this._orgCss = util.filterStyleFromText(root);
      }
      util.addClass(root, rootClass);
      if (el && el !== root && !this._orgPCss) {
        this._orgPCss = util.filterStyleFromText(el);
        util.addClass(el, pClassName);
        el.setAttribute(PLATER_ID, this.playerId);
      }
    }
  }, {
    key: "recoverFullStyle",
    value: function recoverFullStyle(root, el, rootClass, pClassName) {
      if (!pClassName) {
        pClassName = STATE_CLASS.PARENT_FULLSCREEN;
      }
      if (this._orgCss) {
        util.setStyleFromCsstext(root, this._orgCss);
        this._orgCss = "";
      }
      util.removeClass(root, rootClass);
      if (el && el !== root && this._orgPCss) {
        util.setStyleFromCsstext(el, this._orgPCss);
        this._orgPCss = "";
        util.removeClass(el, pClassName);
        el.removeAttribute(PLATER_ID);
      }
    }
  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.config.fullscreenTarget;
      var root = this.root, media = this.media;
      if (el === "video" || el === "media") {
        el = this[el];
      }
      if (!el) {
        el = root;
      }
      this._fullScreenOffset = {
        top: util.scrollTop(),
        left: util.scrollLeft()
      };
      this._fullscreenEl = el;
      this._fullActionFrom = "get";
      var fullEl = util.getFullScreenEl();
      if (fullEl === this._fullscreenEl) {
        this.onFullscreenChange();
        return Promise.resolve();
      }
      try {
        for (var i = 0; i < GET_FULLSCREEN_API.length; i++) {
          var key = GET_FULLSCREEN_API[i];
          if (el[key]) {
            var ret = key === "webkitRequestFullscreen" ? el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT) : el[key]();
            if (ret && ret.then) {
              return ret;
            } else {
              return Promise.resolve();
            }
          }
        }
        if (media.fullscreenEnabled || media.webkitSupportsFullscreen) {
          media.webkitEnterFullscreen();
          return Promise.resolve();
        }
        return Promise.reject(new Error("call getFullscreen fail"));
      } catch (err) {
        return Promise.reject(new Error("call getFullscreen fail"));
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen(el) {
      if (this.isRotateFullscreen) {
        this.exitRotateFullscreen();
      }
      if (!this._fullscreenEl && !util.getFullScreenEl()) {
        return;
      }
      this.root;
      var media = this.media;
      this._fullActionFrom = "exit";
      try {
        for (var i = 0; i < EXIT_FULLSCREEN_API.length; i++) {
          var key = EXIT_FULLSCREEN_API[i];
          if (document[key]) {
            var ret = document[key]();
            if (ret && ret.then) {
              return ret;
            } else {
              return Promise.resolve();
            }
          }
        }
        if (media && media.webkitSupportsFullscreen) {
          media.webkitExitFullScreen();
          return Promise.resolve();
        }
        return Promise.reject(new Error("call exitFullscreen fail"));
      } catch (err) {
        return Promise.reject(new Error("call exitFullscreen fail"));
      }
    }
  }, {
    key: "getCssFullscreen",
    value: function getCssFullscreen() {
      var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.config.fullscreenTarget;
      if (this.isRotateFullscreen) {
        this.exitRotateFullscreen();
      } else if (this.fullscreen) {
        this.exitFullscreen();
      }
      var _class = el ? "".concat(STATE_CLASS.INNER_FULLSCREEN, " ").concat(STATE_CLASS.CSS_FULLSCREEN) : STATE_CLASS.CSS_FULLSCREEN;
      this.changeFullStyle(this.root, el, _class);
      var _this$config$fullscre = this.config.fullscreen, fullscreen = _this$config$fullscre === void 0 ? {} : _this$config$fullscre;
      var useCssFullscreen = fullscreen.useCssFullscreen === true || typeof fullscreen.useCssFullscreen === "function" && fullscreen.useCssFullscreen();
      if (useCssFullscreen) {
        this.fullscreen = true;
        this.emit(FULLSCREEN_CHANGE, true);
      }
      this._cssfullscreenEl = el;
      this.cssfullscreen = true;
      this.emit(CSS_FULLSCREEN_CHANGE, true);
    }
  }, {
    key: "exitCssFullscreen",
    value: function exitCssFullscreen() {
      var _class = this._cssfullscreenEl ? "".concat(STATE_CLASS.INNER_FULLSCREEN, " ").concat(STATE_CLASS.CSS_FULLSCREEN) : STATE_CLASS.CSS_FULLSCREEN;
      if (!this.fullscreen) {
        this.recoverFullStyle(this.root, this._cssfullscreenEl, _class);
      } else {
        var _this$config$fullscre2 = this.config.fullscreen, fullscreen = _this$config$fullscre2 === void 0 ? {} : _this$config$fullscre2;
        var useCssFullscreen = fullscreen.useCssFullscreen === true || typeof fullscreen.useCssFullscreen === "function" && fullscreen.useCssFullscreen();
        if (useCssFullscreen) {
          this.recoverFullStyle(this.root, this._cssfullscreenEl, _class);
          this.fullscreen = false;
          this.emit(FULLSCREEN_CHANGE, false);
        } else {
          this.removeClass(_class);
        }
      }
      this._cssfullscreenEl = null;
      this.cssfullscreen = false;
      this.emit(CSS_FULLSCREEN_CHANGE, false);
    }
  }, {
    key: "getRotateFullscreen",
    value: function getRotateFullscreen() {
      var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.config.fullscreenTarget;
      if (this.cssfullscreen) {
        this.exitCssFullscreen(el);
      }
      var _class = el ? "".concat(STATE_CLASS.INNER_FULLSCREEN, " ").concat(STATE_CLASS.ROTATE_FULLSCREEN) : STATE_CLASS.ROTATE_FULLSCREEN;
      this._fullscreenEl = el || this.root;
      this.changeFullStyle(this.root, el, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN);
      this.isRotateFullscreen = true;
      this.fullscreen = true;
      this.setRotateDeg(90);
      this._rootStyle = this.root.getAttribute("style");
      this.root.style.width = "".concat(window.innerHeight, "px");
      this.emit(FULLSCREEN_CHANGE, true);
    }
  }, {
    key: "exitRotateFullscreen",
    value: function exitRotateFullscreen(el) {
      var _class = this._fullscreenEl !== this.root ? "".concat(STATE_CLASS.INNER_FULLSCREEN, " ").concat(STATE_CLASS.ROTATE_FULLSCREEN) : STATE_CLASS.ROTATE_FULLSCREEN;
      this.recoverFullStyle(this.root, this._fullscreenEl, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN);
      this.isRotateFullscreen = false;
      this.fullscreen = false;
      this.setRotateDeg(0);
      this.emit(FULLSCREEN_CHANGE, false);
      if (this._rootStyle) {
        this.root.style.style = this._rootStyle;
        this._rootStyle = false;
      }
    }
  }, {
    key: "setRotateDeg",
    value: function setRotateDeg(deg) {
      if (window.orientation === 90 || window.orientation === -90) {
        this.rotateDeg = 0;
      } else {
        this.rotateDeg = deg;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        autoHide: !this.config.closeDelayBlur,
        delay: this.config.inactive
      };
      if (this.isActive) {
        this.onFocus(data);
        return;
      }
      this.emit(PLAYER_FOCUS, _objectSpread2({
        paused: this.paused,
        ended: this.ended
      }, data));
    }
  }, {
    key: "blur",
    value: function blur() {
      var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        ignorePaused: false
      };
      if (!this.isActive) {
        this.onBlur(data);
        return;
      }
      this._clearUserTimer();
      this.emit(PLAYER_BLUR, _objectSpread2({
        paused: this.paused,
        ended: this.ended
      }, data));
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      var _this21 = this;
      var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        autoHide: true,
        delay: 3e3
      };
      var innerStates = this.innerStates;
      this.isActive = true;
      this.removeClass(STATE_CLASS.INACTIVE);
      this._clearUserTimer();
      if (data.isLock !== void 0) {
        innerStates.isActiveLocked = data.isLock;
      }
      if (data.autoHide === false || data.isLock === true || innerStates.isActiveLocked) {
        this._clearUserTimer();
        return;
      }
      var time = data && data.delay ? data.delay : this.config.inactive;
      this.userTimer = util.setTimeout(this, function() {
        _this21.userTimer = null;
        _this21.blur();
      }, time);
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$ignorePaused = _ref.ignorePaused, ignorePaused = _ref$ignorePaused === void 0 ? false : _ref$ignorePaused;
      if (this.innerStates.isActiveLocked) {
        return;
      }
      var closePauseVideoFocus = this.config.closePauseVideoFocus;
      this.isActive = false;
      if (ignorePaused || closePauseVideoFocus || !this.paused && !this.ended) {
        this.addClass(STATE_CLASS.INACTIVE);
      }
    }
  }, {
    key: "onEmptied",
    value: function onEmptied() {
      this.updateAcc("emptied");
    }
  }, {
    key: "onCanplay",
    value: function onCanplay() {
      this.removeClass(STATE_CLASS.ENTER);
      this.removeClass(STATE_CLASS.ERROR);
      this.removeClass(STATE_CLASS.LOADING);
      this.isCanplay = true;
      this.waitTimer && util.clearTimeout(this, this.waitTimer);
    }
  }, {
    key: "onLoadeddata",
    value: function onLoadeddata() {
      var _this22 = this;
      this.isError = false;
      this.isSeeking = false;
      if (this.__startTime > 0) {
        if (this.duration > 0) {
          this._seekToStartTime();
        } else {
          this.once(DURATION_CHANGE, function() {
            _this22._seekToStartTime();
          });
        }
      }
    }
  }, {
    key: "onLoadstart",
    value: function onLoadstart() {
      this.removeClass(STATE_CLASS.ERROR);
      this.isCanplay = false;
    }
  }, {
    key: "onPlay",
    value: function onPlay() {
      if (this.state === STATES.ENDED) {
        this.setState(STATES.RUNNING);
      }
      this.removeClass(STATE_CLASS.PAUSED);
      this.ended && this.removeClass(STATE_CLASS.ENDED);
      !this.config.closePlayVideoFocus && this.focus();
    }
  }, {
    key: "onPause",
    value: function onPause() {
      this.addClass(STATE_CLASS.PAUSED);
      this.updateAcc("pause");
      if (!this.config.closePauseVideoFocus) {
        this._clearUserTimer();
        this.focus();
      }
    }
  }, {
    key: "onEnded",
    value: function onEnded() {
      this.updateAcc("ended");
      this.addClass(STATE_CLASS.ENDED);
      this.setState(STATES.ENDED);
    }
  }, {
    key: "onError",
    value: function onError() {
      this.isError = true;
      this.updateAcc("error");
      this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
      this.removeClass(STATE_CLASS.NO_START);
      this.removeClass(STATE_CLASS.ENTER);
      this.removeClass(STATE_CLASS.LOADING);
      this.addClass(STATE_CLASS.ERROR);
    }
  }, {
    key: "onSeeking",
    value: function onSeeking() {
      if (!this.isSeeking) {
        this.updateAcc("seeking");
      }
      this.isSeeking = true;
      this.addClass(STATE_CLASS.SEEKING);
    }
  }, {
    key: "onSeeked",
    value: function onSeeked() {
      this.isSeeking = false;
      if (this.waitTimer) {
        util.clearTimeout(this, this.waitTimer);
      }
      this.removeClass(STATE_CLASS.LOADING);
      this.removeClass(STATE_CLASS.SEEKING);
    }
  }, {
    key: "onWaiting",
    value: function onWaiting() {
      var _this23 = this;
      if (this.waitTimer) {
        util.clearTimeout(this, this.waitTimer);
      }
      this.updateAcc("waiting");
      this.waitTimer = util.setTimeout(this, function() {
        _this23.addClass(STATE_CLASS.LOADING);
        _this23.emit(LOADING);
        util.clearTimeout(_this23, _this23.waitTimer);
        _this23.waitTimer = null;
      }, this.config.minWaitDelay);
    }
  }, {
    key: "onPlaying",
    value: function onPlaying() {
      var _this24 = this;
      this.isError = false;
      var NO_START = STATE_CLASS.NO_START, PAUSED = STATE_CLASS.PAUSED, ENDED2 = STATE_CLASS.ENDED, ERROR2 = STATE_CLASS.ERROR, REPLAY2 = STATE_CLASS.REPLAY, LOADING2 = STATE_CLASS.LOADING;
      var clsList = [NO_START, PAUSED, ENDED2, ERROR2, REPLAY2, LOADING2];
      clsList.forEach(function(cls) {
        _this24.removeClass(cls);
      });
      if (!this._accPlayed.t && !this.paused && !this.ended) {
        this._accPlayed.t = (/* @__PURE__ */ new Date()).getTime();
      }
    }
  }, {
    key: "onTimeupdate",
    value: function onTimeupdate() {
      !this._videoHeight && this.media.videoHeight && this.resize();
      if ((this.waitTimer || this.hasClass(STATE_CLASS.LOADING)) && this.media.readyState > 2) {
        this.removeClass(STATE_CLASS.LOADING);
        util.clearTimeout(this, this.waitTimer);
        this.waitTimer = null;
      }
      if (!this.paused && this.state === STATES.NOTALLOW && this.duration) {
        this.setState(STATES.RUNNING);
        this.emit(AUTOPLAY_STARTED);
      }
      if (!this._accPlayed.t && !this.paused && !this.ended) {
        this._accPlayed.t = (/* @__PURE__ */ new Date()).getTime();
      }
    }
  }, {
    key: "onVolumechange",
    value: function onVolumechange() {
      util.typeOf(this.config.volume) === "Number" && (this.config.volume = this.volume);
    }
  }, {
    key: "onRatechange",
    value: function onRatechange() {
      this.config.defaultPlaybackRate = this.playbackRate;
    }
  }, {
    key: "emitUserAction",
    value: function emitUserAction(event, action, params) {
      if (!this.media || !action || !event) {
        return;
      }
      var eventType = util.typeOf(event) === "String" ? event : event.type || "";
      if (params.props && util.typeOf(params.props) !== "Array") {
        params.props = [params.props];
      }
      this.emit(USER_ACTION, _objectSpread2({
        eventType,
        action,
        currentTime: this.currentTime,
        duration: this.duration,
        ended: this.ended,
        event
      }, params));
    }
  }, {
    key: "updateAcc",
    value: function updateAcc(endType) {
      if (this._accPlayed.t) {
        var _at = (/* @__PURE__ */ new Date()).getTime() - this._accPlayed.t;
        this._accPlayed.acc += _at;
        this._accPlayed.t = 0;
        if (endType === "ended" || this.ended) {
          this._accPlayed.loopAcc = this._accPlayed.acc;
        }
      }
    }
  }, {
    key: "checkBuffer",
    value: function checkBuffer(time) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        startDiff: 0,
        endDiff: 0
      };
      var _ref2 = options || {}, _ref2$startDiff = _ref2.startDiff, startDiff = _ref2$startDiff === void 0 ? 0 : _ref2$startDiff, _ref2$endDiff = _ref2.endDiff, endDiff = _ref2$endDiff === void 0 ? 0 : _ref2$endDiff;
      var buffered = this.media.buffered;
      if (!buffered || buffered.length === 0 || !this.duration) {
        return true;
      }
      var currentTime = time || this.media.currentTime || 0.2;
      var len = buffered.length;
      for (var i = 0; i < len; i++) {
        if (buffered.start(i) + startDiff <= currentTime && buffered.end(i) - endDiff > currentTime) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "resizePosition",
    value: function resizePosition() {
      var _this$videoPos = this.videoPos, vy = _this$videoPos.vy, vx = _this$videoPos.vx, h = _this$videoPos.h, w = _this$videoPos.w;
      var rotate = this.videoPos.rotate;
      if (rotate < 0 && h < 0 && w < 0) {
        return;
      }
      var _pi = this.videoPos._pi;
      if (!_pi && this.media.videoHeight) {
        _pi = this.media.videoWidth / this.media.videoHeight * 100;
      }
      if (!_pi) {
        return;
      }
      this.videoPos.pi = _pi;
      rotate = rotate < 0 ? 0 : rotate;
      var _pos = {
        rotate
      };
      var offsetY = 0;
      var offsetX = 0;
      var scale = 1;
      var _t = Math.abs(rotate / 90);
      var root = this.root, innerContainer = this.innerContainer;
      var width = root.offsetWidth;
      var height = innerContainer ? innerContainer.offsetHeight : root.offsetHeight;
      var rHeight = height;
      var rWidth = width;
      if (_t % 2 === 0) {
        scale = h > 0 ? 100 / h : w > 0 ? 100 / w : 1;
        _pos.scale = scale;
        offsetY = vy > 0 ? (100 - h) / 2 - vy : 0;
        _pos.y = _t === 2 ? 0 - offsetY : offsetY;
        offsetX = vx > 0 ? (100 - w) / 2 - vx : 0;
        _pos.x = _t === 2 ? 0 - offsetX : offsetX;
        this.media.style.width = "".concat(rWidth, "px");
        this.media.style.height = "".concat(rHeight, "px");
      } else if (_t % 2 === 1) {
        rWidth = height;
        rHeight = width;
        var offset = height - width;
        offsetX = -offset / 2 / rWidth * 100;
        _pos.x = _t === 3 ? offsetX + vy / 2 : offsetX - vy / 2;
        offsetY = offset / 2 / rHeight * 100;
        _pos.y = _t === 3 ? offsetY + vx / 2 : offsetY - vx / 2;
        _pos.scale = scale;
        this.media.style.width = "".concat(rWidth, "px");
        this.media.style.height = "".concat(rHeight, "px");
      }
      var formStyle = util.getTransformStyle(_pos, this.media.style.transform || this.media.style.webkitTransform);
      this.media.style.transform = formStyle;
      this.media.style.webkitTransform = formStyle;
    }
  }, {
    key: "position",
    value: function position() {
      var pos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        h: 0,
        y: 0,
        x: 0,
        w: 0
      };
      if (!this.media || !pos || !pos.h) {
        return;
      }
      var videoPos = this.videoPos;
      videoPos.h = pos.h * 100 || 0;
      videoPos.w = pos.w * 100 || 0;
      videoPos.vx = pos.x * 100 || 0;
      videoPos.vy = pos.y * 100 || 0;
      this.resizePosition();
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      var _this25 = this;
      if (!config) {
        return;
      }
      Object.keys(config).map(function(key) {
        if (key !== "plugins") {
          _this25.config[key] = config[key];
          var plugin = _this25.plugins[key.toLowerCase()];
          if (plugin && util.typeOf(plugin.setConfig) === "Function") {
            plugin.setConfig(config[key]);
          }
        }
      });
    }
  }, {
    key: "playNext",
    value: function playNext(config) {
      var _this26 = this;
      this.resetState();
      this.setConfig(config);
      this._currentTime = 0;
      this._duration = 0;
      runHooks(this, "playnext", function() {
        _this26.start();
        _this26.emit(PLAYNEXT, config);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this27 = this;
      if (!this.media) {
        return;
      }
      var containerSize = this.root.getBoundingClientRect();
      this.sizeInfo.width = containerSize.width;
      this.sizeInfo.height = containerSize.height;
      this.sizeInfo.left = containerSize.left;
      this.sizeInfo.top = containerSize.top;
      var _this$media = this.media, videoWidth = _this$media.videoWidth, videoHeight = _this$media.videoHeight;
      var _this$config6 = this.config, fitVideoSize = _this$config6.fitVideoSize, videoFillMode = _this$config6.videoFillMode;
      if (videoFillMode === "fill" || videoFillMode === "cover" || videoFillMode === "contain") {
        this.setAttribute("data-xgfill", videoFillMode);
      }
      if (!videoHeight || !videoWidth) {
        return;
      }
      this._videoHeight = videoHeight;
      this._videoWidth = videoWidth;
      var controlsHeight = this.controls && this.innerContainer ? this.controls.root.getBoundingClientRect().height : 0;
      var width = containerSize.width;
      var height = containerSize.height - controlsHeight;
      var videoFit = parseInt(videoWidth / videoHeight * 1e3, 10);
      var fit = parseInt(width / height * 1e3, 10);
      var rWidth = width;
      var rHeight = height;
      var _style = {};
      if (fitVideoSize === "auto" && fit > videoFit || fitVideoSize === "fixWidth") {
        rHeight = width / videoFit * 1e3;
        if (this.config.fluid) {
          _style.paddingTop = "".concat(rHeight * 100 / rWidth, "%");
        } else {
          _style.height = "".concat(rHeight + controlsHeight, "px");
        }
      } else if (fitVideoSize === "auto" && fit < videoFit || fitVideoSize === "fixHeight") {
        rWidth = videoFit * height / 1e3;
        _style.width = "".concat(rWidth, "px");
      }
      if (!this.fullscreen && !this.cssfullscreen) {
        Object.keys(_style).forEach(function(key) {
          _this27.root.style[key] = _style[key];
        });
      }
      if (videoFillMode === "fillHeight" && fit < videoFit || videoFillMode === "fillWidth" && fit > videoFit) {
        this.setAttribute("data-xgfill", "cover");
      }
      var data = {
        videoScale: videoFit,
        vWidth: rWidth,
        vHeight: rHeight,
        cWidth: rWidth,
        cHeight: rHeight + controlsHeight
      };
      this.resizePosition();
      this.emit(VIDEO_RESIZE, data);
    }
  }, {
    key: "updateObjectPosition",
    value: function updateObjectPosition() {
      var left = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (this.media.updateObjectPosition) {
        this.media.updateObjectPosition(left, top);
        return;
      }
      this.media.style.objectPosition = "".concat(left * 100, "% ").concat(top * 100, "%");
    }
  }, {
    key: "setState",
    value: function setState(newState) {
      XG_DEBUG.logInfo("setState", "state from:".concat(STATE_ARRAY[this.state], " to:").concat(STATE_ARRAY[newState]));
      this._state = newState;
    }
  }, {
    key: "_preProcessUrl",
    value: function _preProcessUrl(url, ext) {
      var _this$config7 = this.config, preProcessUrl = _this$config7.preProcessUrl, preProcessUrlOptions = _this$config7.preProcessUrlOptions;
      var processUrlOptions = Object.assign({}, preProcessUrlOptions, ext);
      return !util.isBlob(url) && typeof preProcessUrl === "function" ? preProcessUrl(url, processUrlOptions) : {
        url
      };
    }
  }, {
    key: "_seekToStartTime",
    value: function _seekToStartTime() {
      if (this.__startTime > 0 && this.duration > 0) {
        this.currentTime = this.__startTime > this.duration ? this.duration : this.__startTime;
        this.__startTime = -1;
      }
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "isFullscreen",
    get: function get() {
      return this.fullscreen;
    }
  }, {
    key: "isCssfullScreen",
    get: function get() {
      return this.cssfullscreen;
    }
  }, {
    key: "hasStart",
    get: function get() {
      return this._hasStart;
    },
    set: function set(bool) {
      if (typeof bool === "boolean") {
        this._hasStart = bool;
        if (bool === false) {
          this.setState(STATES.READY);
        }
        this.emit("hasstart");
      }
    }
  }, {
    key: "isPlaying",
    get: function get() {
      return this._state === STATES.RUNNING || this._state === STATES.ENDED;
    },
    set: function set(value) {
      if (value) {
        this.setState(STATES.RUNNING);
      } else {
        this._state >= STATES.RUNNING && this.setState(STATES.ATTACHED);
      }
    }
  }, {
    key: "definitionList",
    get: function get() {
      if (!this.config || !this.config.definition) {
        return [];
      }
      return this.config.definition.list || [];
    },
    set: function set(list) {
      var _this28 = this;
      var definition = this.config.definition;
      var curDef = null;
      var targetDef = null;
      definition.list = list;
      this.emit("resourceReady", list);
      list.forEach(function(item) {
        var _this28$curDefinition;
        if (((_this28$curDefinition = _this28.curDefinition) === null || _this28$curDefinition === void 0 ? void 0 : _this28$curDefinition.definition) === item.definition) {
          curDef = item;
        }
        if (definition.defaultDefinition === item.definition) {
          targetDef = item;
        }
      });
      if (!targetDef && list.length > 0) {
        targetDef = list[0];
      }
      curDef ? this.changeDefinition(curDef) : targetDef && this.changeDefinition(targetDef);
    }
  }, {
    key: "videoFrameInfo",
    get: function get() {
      var ret = {
        total: 0,
        dropped: 0,
        corrupted: 0,
        droppedRate: 0,
        droppedDuration: 0
      };
      if (!this.media || !this.media.getVideoPlaybackQuality) {
        return ret;
      }
      var _quality = this.media.getVideoPlaybackQuality();
      ret.dropped = _quality.droppedVideoFrames || 0;
      ret.total = _quality.totalVideoFrames || 0;
      ret.corrupted = _quality.corruptedVideoFrames || 0;
      if (ret.total > 0) {
        ret.droppedRate = ret.dropped / ret.total * 100;
        ret.droppedDuration = parseInt(this.cumulateTime / ret.total * ret.dropped, 0);
      }
      return ret;
    }
  }, {
    key: "lang",
    get: function get() {
      return this.config.lang;
    },
    set: function set(lang) {
      var result = I18N.langKeys.filter(function(key) {
        return key === lang;
      });
      if (result.length === 0 && lang !== "zh") {
        console.error("Sorry, set lang fail, because the language [".concat(lang, "] is not supported now, list of all supported languages is [").concat(I18N.langKeys.join(), "] "));
        return;
      }
      this.config.lang = lang;
      pluginsManager.setLang(lang, this);
    }
  }, {
    key: "i18n",
    get: function get() {
      var _l = this.config.lang;
      if (_l === "zh") {
        _l = "zh-cn";
      }
      return this.__i18n.lang[_l] || this.__i18n.lang.en;
    }
  }, {
    key: "i18nKeys",
    get: function get() {
      return this.__i18n.textKeys || {};
    }
  }, {
    key: "version",
    get: function get() {
      return version;
    }
  }, {
    key: "playerId",
    get: function get() {
      return this._pluginInfoId;
    }
  }, {
    key: "url",
    get: function get() {
      return this.__url || this.config.url;
    },
    set: function set(url) {
      this.__url = url;
    }
  }, {
    key: "poster",
    get: function get() {
      return this.plugins.poster ? this.plugins.poster.config.poster : this.config.poster;
    },
    set: function set(posterUrl) {
      this.plugins.poster && this.plugins.poster.update(posterUrl);
    }
  }, {
    key: "readyState",
    get: function get() {
      return _get(_getPrototypeOf(Player2.prototype), "readyState", this);
    }
  }, {
    key: "error",
    get: function get() {
      var key = _get(_getPrototypeOf(Player2.prototype), "error", this);
      return this.i18n[key] || key;
    }
  }, {
    key: "networkState",
    get: function get() {
      return _get(_getPrototypeOf(Player2.prototype), "networkState", this);
    }
  }, {
    key: "fullscreenChanging",
    get: function get() {
      return !(this._fullScreenOffset === null);
    }
  }, {
    key: "cumulateTime",
    get: function get() {
      var _this$_accPlayed = this._accPlayed, acc = _this$_accPlayed.acc, t = _this$_accPlayed.t;
      return t ? (/* @__PURE__ */ new Date()).getTime() - t + acc : acc;
    }
  }, {
    key: "zoom",
    get: function get() {
      return this.config.zoom;
    },
    set: function set(value) {
      this.config.zoom = value;
    }
  }, {
    key: "videoRotateDeg",
    get: function get() {
      return this.videoPos.rotate;
    },
    set: function set(val) {
      val = util.convertDeg(val);
      if (val % 90 !== 0 || val === this.videoPos.rotate) {
        return;
      }
      this.videoPos.rotate = val;
      this.resizePosition();
    }
  }, {
    key: "avgSpeed",
    get: function get() {
      return AVG_SPEED;
    },
    set: function set(val) {
      AVG_SPEED = val;
    }
  }, {
    key: "realTimeSpeed",
    get: function get() {
      return REAL_TIME_SPEED;
    },
    set: function set(val) {
      REAL_TIME_SPEED = val;
    }
  }, {
    key: "offsetCurrentTime",
    get: function get() {
      return this._offsetInfo.currentTime || 0;
    },
    set: function set(val) {
      this._offsetInfo.currentTime = val;
    }
  }, {
    key: "offsetDuration",
    get: function get() {
      return this._offsetInfo.duration || 0;
    },
    set: function set(val) {
      this._offsetInfo.duration = val || 0;
    }
  }, {
    key: "hook",
    value: function hook$1(hookName, handler) {
      return hook.call.apply(hook, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "useHooks",
    value: function useHooks$1(hookName, handler) {
      return useHooks.call.apply(useHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "removeHooks",
    value: function removeHooks$1(hookName, handler) {
      return removeHooks.call.apply(removeHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "usePluginHooks",
    value: function usePluginHooks$1(pluginName, hookName, handler) {
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }
      return usePluginHooks.call.apply(usePluginHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "removePluginHooks",
    value: function removePluginHooks$1(pluginName, hookName, handler) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        args[_key2 - 3] = arguments[_key2];
      }
      return removePluginHooks.call.apply(removePluginHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "setUserActive",
    value: function setUserActive(isActive, isMuted) {
      var _instManager3;
      if (typeof isMuted === "boolean" && isMuted !== this.muted) {
        this.addInnerOP("volumechange");
        if (util.typeOf(isMuted) === Boolean) {
          this.muted = isMuted;
        }
      }
      (_instManager3 = instManager) === null || _instManager3 === void 0 ? void 0 : _instManager3.setActive(this.playerId, isActive);
    }
  }], [{
    key: "debugger",
    get: function get() {
      return XG_DEBUG.config.debug;
    },
    set: function set(value) {
      XG_DEBUG.config.debug = value;
    }
  }, {
    key: "instManager",
    get: function get() {
      return instManager;
    },
    set: function set(value) {
      instManager = value;
    }
  }, {
    key: "getCurrentUserActivePlayerId",
    value: function getCurrentUserActivePlayerId() {
      var _instManager4;
      return (_instManager4 = instManager) === null || _instManager4 === void 0 ? void 0 : _instManager4.getActiveId();
    }
  }, {
    key: "setCurrentUserActive",
    value: function setCurrentUserActive(playerId, isActive) {
      var _instManager5;
      (_instManager5 = instManager) === null || _instManager5 === void 0 ? void 0 : _instManager5.setActive(playerId, isActive);
    }
  }, {
    key: "isHevcSupported",
    value: function isHevcSupported2() {
      return sniffer.isHevcSupported();
    }
  }, {
    key: "probeConfigSupported",
    value: function probeConfigSupported2(info) {
      return sniffer.probeConfigSupported(info);
    }
  }, {
    key: "install",
    value: function install(name, descriptor) {
      if (!Player2.plugins) {
        Player2.plugins = {};
      }
      if (!Player2.plugins[name]) {
        Player2.plugins[name] = descriptor;
      }
    }
  }, {
    key: "use",
    value: function use2(name, descriptor) {
      if (!Player2.plugins) {
        Player2.plugins = {};
      }
      Player2.plugins[name] = descriptor;
    }
  }]);
  return Player2;
}(MediaProxy);
_defineProperty(Player, "defaultPreset", null);
_defineProperty(Player, "XgVideoProxy", null);
Player.instManager = InstManager.getInstance();

export {
  _objectSpread2,
  _typeof,
  _classCallCheck,
  _createClass,
  _defineProperty,
  _inherits,
  _getPrototypeOf,
  _assertThisInitialized,
  _possibleConstructorReturn,
  _createSuper,
  _get,
  _toConsumableArray,
  require_eventemitter3,
  XG_DEBUG,
  util,
  sniffer,
  Errors,
  PLAY,
  PLAYING,
  ENDED,
  PAUSE,
  ERROR,
  SEEKING,
  SEEKED,
  TIME_UPDATE,
  WAITING,
  CANPLAY,
  DURATION_CHANGE,
  VOLUME_CHANGE,
  LOADED_DATA,
  RATE_CHANGE,
  PROGRESS,
  LOAD_START,
  EMPTIED,
  PLAYER_FOCUS,
  PLAYER_BLUR,
  READY,
  AUTOPLAY_STARTED,
  AUTOPLAY_PREVENTED,
  COMPLETE,
  REPLAY,
  DESTROY,
  URL_CHANGE,
  DOWNLOAD_SPEED_CHANGE,
  LEAVE_PLAYER,
  ENTER_PLAYER,
  FULLSCREEN_CHANGE,
  CSS_FULLSCREEN_CHANGE,
  MINI_STATE_CHANGE,
  DEFINITION_CHANGE,
  VIDEO_RESIZE,
  PIP_CHANGE,
  ROTATE,
  SCREEN_SHOT,
  PLAYNEXT,
  SHORTCUT,
  XGLOG,
  USER_ACTION,
  RESET,
  STATS_EVENTS,
  FPS_STUCK,
  events_exports,
  runHooks,
  BasePlugin,
  require_delegate,
  POSITIONS,
  Plugin,
  STATE_CLASS,
  I18N,
  STATES,
  InstManager,
  Player
};
//# sourceMappingURL=chunk-GLYGFZ7C.js.map
