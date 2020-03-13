(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*----------------------------------------*\
  256^3 - Animator.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-05 17:45:38
  @Last Modified time: 2020-02-06 21:36:10
\*----------------------------------------*/
const RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class Animator {
  constructor(_ref) {
    let {
      duration = Infinity,
      delay = 0,
      atStarting = () => {},
      atRunning = () => {},
      atStoping = () => {},
      fps = Infinity
    } = _ref,
        data = _objectWithoutProperties(_ref, ["duration", "delay", "atStarting", "atRunning", "atStoping", "fps"]);

    this.nextFrameDelay = 1000 / fps;
    this.nextFrameAt = Infinity;
    this.lastFrameAt = Infinity;
    this.stopAt = Infinity;
    this.data = data;
    this.duration = duration;
    this.ratio = 1.0 / duration;
    this.delay = 0;
    this.atStarting = atStarting;
    this.atRunning = atRunning;
    this.atStoping = atStoping;
  }

  start() {
    this.startAt = Animator.now + this.delay;
    this.nextFrameAt = this.startAt + this.nextFrameDelay;
    this.stopAt = this.startAt + this.duration;
    this.atStarting();
    this.lastFrameAt = Animator.now;
    Animator.animations.push(this);
  }

  update() {
    this.nextFrameAt = Animator.now + this.nextFrameDelay;
    this.atRunning(_objectSpread({
      now: Animator.now,
      deltaTime: (Animator.now - this.lastFrameAt) * 0.001,
      cursor: Math.min(1, Math.max(0, (Animator.now - this.startAt) * this.ratio))
    }, this.data));
    this.lastFrameAt = Animator.now;
  }

  hasToRun() {
    return this.nextFrameAt < Animator.now;
  }

  hasToStop() {
    return this.stopAt < Animator.now;
  }

  static run(time) {
    Animator.now = time;

    for (let i = Animator.animations.length - 1; i >= 0; i--) {
      const animation = Animator.animations[i];

      if (animation.hasToRun()) {
        animation.update();
      }

      if (animation.hasToStop()) {
        animation.atStoping();
        Animator.animations.splice(i, 1);
      }
    }

    RAF(Animator.run);
  }

}

RAF(Animator.run);
Animator.animations = [];
Animator.now = 0;
var _default = Animator;
exports.default = _default;
},{"core-js/modules/es6.symbol":80,"core-js/modules/web.dom.iterable":82}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _InteractionHelper = _interopRequireDefault(require("./InteractionHelper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*----------------------------------------*\
  256^3 - AppManager.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:01:04
  @Last Modified time: 2020-02-21 15:25:23
\*----------------------------------------*/
class AppManager {
  static levelComplete() {
    top.postMessage('SUCCESS', '*');
    console.log('SUCCESS');
  }

  static ready() {
    let action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    AppManager.listeners.DOMContentLoaded.push(action);
  }

  static trigDOMContentLoaded() {
    document.addEventListener("mousemove", _InteractionHelper.default.handleMouseMove);

    for (let action of AppManager.listeners.DOMContentLoaded) {
      action();
    }
  }

}

AppManager.listeners = {
  DOMContentLoaded: []
};
document.addEventListener("DOMContentLoaded", AppManager.trigDOMContentLoaded);
var _default = AppManager;
exports.default = _default;
},{"./InteractionHelper.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _interact134Min = _interopRequireDefault(require("./libs/interact/interact.1.3.4.min.js"));

var _hammer208Min = _interopRequireDefault(require("./libs/hammer/hammer.2.0.8.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let mousePos;
let hidden, visibilityChange;
const AudioContext = window.AudioContext || window.webkitAudioContext;

class InteractionHelper {
  static onTap(target, action) {
    (0, _interact134Min.default)(target).on("tap", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)));
  }

  static onDoubleTap(target, action) {
    (0, _interact134Min.default)(target).on("doubletap", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)));
  }

  static onLongTap(target, action) {
    (0, _interact134Min.default)(target).on("hold", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)));
  }

  static onDrag(target, action) {
    (0, _interact134Min.default)(target).draggable({
      onmove: event => action(_objectSpread({
        target: event.target,
        type: event.type
      }, mousePos))
    });
  }

  static onDropFile(target, action) {
    target = document.querySelector(target);
    target.addEventListener("dragover", event => {
      event.preventDefault();
      action(_objectSpread({
        target: event.target,
        type: event.type
      }, mousePos));
    });
    target.addEventListener("drop", event => {
      event.preventDefault();
      action(_objectSpread({
        target: event.target,
        type: event.type,
        files: event.dataTransfer.files
      }, mousePos));
    });
  }

  static onMouseEnter(target, action) {
    target = document.querySelector(target);
    target.addEventListener("mouseenter", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)), false);
  }

  static onMouseLeave(target, action) {
    target = document.querySelector(target);
    target.addEventListener("mouseleave", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)), false);
  }

  static onKeyUp(action) {
    document.addEventListener("keyup", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos, {
      key: event.key,
      keyCode: event.keyCode
    })), false);
  }

  static onKeyDown(action) {
    document.addEventListener("keydown", event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos, {
      key: event.key,
      keyCode: event.keyCode
    })), false);
  }

  static onHide(action) {
    document.addEventListener(visibilityChange, event => {
      if (document[hidden]) {
        action(_objectSpread({
          type: "hide"
        }, mousePos));
      }
    }, false);
  }

  static onShow(action) {
    document.addEventListener(visibilityChange, event => {
      if (!document[hidden]) {
        action(_objectSpread({
          type: "show"
        }, mousePos));
      }
    }, false);
  }

  static onWindowResize(action) {
    top.addEventListener('resize', event => action(_objectSpread({
      type: event.type
    }, mousePos, {
      width: top.innerWidth,
      height: top.innerHeight
    })), false);
  }

  static onBeforePrint(action) {
    top.addEventListener('beforeprint', event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos)), false);
  }

  static onScroll(target, action) {
    target = document.querySelector(target);
    target.addEventListener('wheel', event => action(_objectSpread({
      target: event.target,
      type: event.type
    }, mousePos, {
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      deltaZ: event.deltaZ
    })), false);
  }

  static onTimeout(time, action) {
    setTimeout(event => action(_objectSpread({
      type: "timeout"
    }, mousePos)), time);
  }

  static onSound(action) {
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = function () {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;
        var length = array.length;

        for (var i = 0; i < length; i++) {
          values += array[i];
        }

        var average = values / length;

        if (average >= 1) {
          action(_objectSpread({
            type: "sound"
          }, mousePos, {
            intensity: average
          }));
        }
      };
    }).catch(function (err) {
      /* handle the error */
      console.log(err);
    });
  }

  static handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;
    event = event || top.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)

    if (event.pageX == null && event.clientX != null) {
      eventDoc = event.target && event.target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    mousePos = {
      mouseX: event.pageX - (window.innerWidth * 0.5 - document.body.clientWidth * 0.5),
      mouseY: event.pageY - (window.innerHeight * 0.5 - document.body.clientHeight * 0.5)
    };
  }

}

if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var _default = InteractionHelper;
exports.default = _default;
},{"./libs/hammer/hammer.2.0.8.min.js":4,"./libs/interact/interact.1.3.4.min.js":5,"core-js/modules/es6.symbol":80,"core-js/modules/web.dom.iterable":82}],4:[function(require,module,exports){
"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) {
  "use strict";

  function e(a, b, c) {
    return setTimeout(j(a, c), b);
  }

  function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }

  function g(a, b, c) {
    var e;
    if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
  }

  function h(b, c, d) {
    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
    return function () {
      var c = new Error("get-stack-trace"),
          d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          f = a.console && (a.console.warn || a.console.log);
      return f && f.call(a.console, e, d), b.apply(this, arguments);
    };
  }

  function i(a, b, c) {
    var d,
        e = b.prototype;
    d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
  }

  function j(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }

  function k(a, b) {
    return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a;
  }

  function l(a, b) {
    return a === d ? b : a;
  }

  function m(a, b, c) {
    g(q(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }

  function n(a, b, c) {
    g(q(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }

  function o(a, b) {
    for (; a;) {
      if (a == b) return !0;
      a = a.parentNode;
    }

    return !1;
  }

  function p(a, b) {
    return a.indexOf(b) > -1;
  }

  function q(a) {
    return a.trim().split(/\s+/g);
  }

  function r(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);

    for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;
      d++;
    }

    return -1;
  }

  function s(a) {
    return Array.prototype.slice.call(a, 0);
  }

  function t(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];
      r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }

    return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }

  function u(a, b) {
    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
      if (c = ma[g], e = c ? c + f : b, e in a) return e;
      g++;
    }

    return d;
  }

  function v() {
    return ua++;
  }

  function w(b) {
    var c = b.ownerDocument || b;
    return c.defaultView || c.parentWindow || a;
  }

  function x(a, b) {
    var c = this;
    this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      k(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }

  function y(a) {
    var b,
        c = a.options.inputClass;
    return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
  }

  function z(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & Ea && d - e === 0,
        g = b & (Ga | Ha) && d - e === 0;
    c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }

  function A(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;
    c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
    var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = E(d);
    b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
    var j = F(b.deltaTime, b.deltaX, b.deltaY);
    b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
    var k = a.element;
    o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }

  function B(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};
    b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
      x: f.deltaX || 0,
      y: f.deltaY || 0
    }, d = a.offsetDelta = {
      x: c.x,
      y: c.y
    }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }

  function C(a, b) {
    var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;

    if (b.eventType != Ha && (i > Da || h.velocity === d)) {
      var j = b.deltaX - h.deltaX,
          k = b.deltaY - h.deltaY,
          l = F(i, j, k);
      e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
    } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;

    b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
  }

  function D(a) {
    for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
      clientX: pa(a.pointers[c].clientX),
      clientY: pa(a.pointers[c].clientY)
    }, c++;

    return {
      timeStamp: ra(),
      pointers: b,
      center: E(b),
      deltaX: a.deltaX,
      deltaY: a.deltaY
    };
  }

  function E(a) {
    var b = a.length;
    if (1 === b) return {
      x: pa(a[0].clientX),
      y: pa(a[0].clientY)
    };

    for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;

    return {
      x: pa(c / b),
      y: pa(d / b)
    };
  }

  function F(a, b, c) {
    return {
      x: b / a || 0,
      y: c / a || 0
    };
  }

  function G(a, b) {
    return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
  }

  function H(a, b, c) {
    c || (c = Qa);
    var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
    return Math.sqrt(d * d + e * e);
  }

  function I(a, b, c) {
    c || (c = Qa);
    var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
    return 180 * Math.atan2(e, d) / Math.PI;
  }

  function J(a, b) {
    return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
  }

  function K(a, b) {
    return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
  }

  function L() {
    this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
  }

  function M() {
    this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }

  function N() {
    this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
  }

  function O(a, b) {
    var c = s(a.touches),
        d = s(a.changedTouches);
    return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
  }

  function P() {
    this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
  }

  function Q(a, b) {
    var c = s(a.touches),
        d = this.targetIds;
    if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
    var e,
        f,
        g = s(a.changedTouches),
        h = [],
        i = this.target;
    if (f = c.filter(function (a) {
      return o(a.target, i);
    }), b === Ea) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;

    for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;

    return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
  }

  function R() {
    x.apply(this, arguments);
    var a = j(this.handler, this);
    this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
  }

  function S(a, b) {
    a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
  }

  function T(a) {
    var b = a.changedPointers[0];

    if (b.identifier === this.primaryTouch) {
      var c = {
        x: b.clientX,
        y: b.clientY
      };
      this.lastTouches.push(c);

      var d = this.lastTouches,
          e = function e() {
        var a = d.indexOf(c);
        a > -1 && d.splice(a, 1);
      };

      setTimeout(e, cb);
    }
  }

  function U(a) {
    for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
      var e = this.lastTouches[d],
          f = Math.abs(b - e.x),
          g = Math.abs(c - e.y);
      if (db >= f && db >= g) return !0;
    }

    return !1;
  }

  function V(a, b) {
    this.manager = a, this.set(b);
  }

  function W(a) {
    if (p(a, jb)) return jb;
    var b = p(a, kb),
        c = p(a, lb);
    return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
  }

  function X() {
    if (!fb) return !1;
    var b = {},
        c = a.CSS && a.CSS.supports;
    return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
      b[d] = c ? a.CSS.supports("touch-action", d) : !0;
    }), b;
  }

  function Y(a) {
    this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [];
  }

  function Z(a) {
    return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
  }

  function $(a) {
    return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
  }

  function _(a, b) {
    var c = b.manager;
    return c ? c.get(a) : a;
  }

  function aa() {
    Y.apply(this, arguments);
  }

  function ba() {
    aa.apply(this, arguments), this.pX = null, this.pY = null;
  }

  function ca() {
    aa.apply(this, arguments);
  }

  function da() {
    Y.apply(this, arguments), this._timer = null, this._input = null;
  }

  function ea() {
    aa.apply(this, arguments);
  }

  function fa() {
    aa.apply(this, arguments);
  }

  function ga() {
    Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }

  function ha(a, b) {
    return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b);
  }

  function ia(a, b) {
    this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));
      a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }

  function ja(a, b) {
    var c = a.element;

    if (c.style) {
      var d;
      g(a.options.cssProps, function (e, f) {
        d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
      }), b || (a.oldCssProps = {});
    }
  }

  function ka(a, c) {
    var d = b.createEvent("Event");
    d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }

  var la,
      ma = ["", "webkit", "Moz", "MS", "ms", "o"],
      na = b.createElement("div"),
      oa = "function",
      pa = Math.round,
      qa = Math.abs,
      ra = Date.now;
  la = "function" != typeof Object.assign ? function (a) {
    if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");

    for (var b = Object(a), c = 1; c < arguments.length; c++) {
      var e = arguments[c];
      if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]);
    }

    return b;
  } : Object.assign;
  var sa = h(function (a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;

    return a;
  }, "extend", "Use `assign`."),
      ta = h(function (a, b) {
    return sa(a, b, !0);
  }, "merge", "Use `assign`."),
      ua = 1,
      va = /mobile|tablet|ip(ad|hone|od)|android/i,
      wa = "ontouchstart" in a,
      xa = u(a, "PointerEvent") !== d,
      ya = wa && va.test(navigator.userAgent),
      za = "touch",
      Aa = "pen",
      Ba = "mouse",
      Ca = "kinect",
      Da = 25,
      Ea = 1,
      Fa = 2,
      Ga = 4,
      Ha = 8,
      Ia = 1,
      Ja = 2,
      Ka = 4,
      La = 8,
      Ma = 16,
      Na = Ja | Ka,
      Oa = La | Ma,
      Pa = Na | Oa,
      Qa = ["x", "y"],
      Ra = ["clientX", "clientY"];
  x.prototype = {
    handler: function handler() {},
    init: function init() {
      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
    },
    destroy: function destroy() {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
    }
  };
  var Sa = {
    mousedown: Ea,
    mousemove: Fa,
    mouseup: Ga
  },
      Ta = "mousedown",
      Ua = "mousemove mouseup";
  i(L, x, {
    handler: function handler(a) {
      var b = Sa[a.type];
      b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
        pointers: [a],
        changedPointers: [a],
        pointerType: Ba,
        srcEvent: a
      }));
    }
  });
  var Va = {
    pointerdown: Ea,
    pointermove: Fa,
    pointerup: Ga,
    pointercancel: Ha,
    pointerout: Ha
  },
      Wa = {
    2: za,
    3: Aa,
    4: Ba,
    5: Ca
  },
      Xa = "pointerdown",
      Ya = "pointermove pointerup pointercancel";
  a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
    handler: function handler(a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Va[d],
          f = Wa[a.pointerType] || a.pointerType,
          g = f == za,
          h = r(b, a.pointerId, "pointerId");
      e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
        pointers: b,
        changedPointers: [a],
        pointerType: f,
        srcEvent: a
      }), c && b.splice(h, 1));
    }
  });
  var Za = {
    touchstart: Ea,
    touchmove: Fa,
    touchend: Ga,
    touchcancel: Ha
  },
      $a = "touchstart",
      _a = "touchstart touchmove touchend touchcancel";
  i(N, x, {
    handler: function handler(a) {
      var b = Za[a.type];

      if (b === Ea && (this.started = !0), this.started) {
        var c = O.call(this, a, b);
        b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
          pointers: c[0],
          changedPointers: c[1],
          pointerType: za,
          srcEvent: a
        });
      }
    }
  });
  var ab = {
    touchstart: Ea,
    touchmove: Fa,
    touchend: Ga,
    touchcancel: Ha
  },
      bb = "touchstart touchmove touchend touchcancel";
  i(P, x, {
    handler: function handler(a) {
      var b = ab[a.type],
          c = Q.call(this, a, b);
      c && this.callback(this.manager, b, {
        pointers: c[0],
        changedPointers: c[1],
        pointerType: za,
        srcEvent: a
      });
    }
  });
  var cb = 2500,
      db = 25;
  i(R, x, {
    handler: function handler(a, b, c) {
      var d = c.pointerType == za,
          e = c.pointerType == Ba;

      if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
        if (d) S.call(this, b, c);else if (e && U.call(this, c)) return;
        this.callback(a, b, c);
      }
    },
    destroy: function destroy() {
      this.touch.destroy(), this.mouse.destroy();
    }
  });
  var eb = u(na.style, "touchAction"),
      fb = eb !== d,
      gb = "compute",
      hb = "auto",
      ib = "manipulation",
      jb = "none",
      kb = "pan-x",
      lb = "pan-y",
      mb = X();
  V.prototype = {
    set: function set(a) {
      a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim();
    },
    update: function update() {
      this.set(this.manager.options.touchAction);
    },
    compute: function compute() {
      var a = [];
      return g(this.manager.recognizers, function (b) {
        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), W(a.join(" "));
    },
    preventDefaults: function preventDefaults(a) {
      var b = a.srcEvent,
          c = a.offsetDirection;
      if (this.manager.session.prevented) return void b.preventDefault();
      var d = this.actions,
          e = p(d, jb) && !mb[jb],
          f = p(d, lb) && !mb[lb],
          g = p(d, kb) && !mb[kb];

      if (e) {
        var h = 1 === a.pointers.length,
            i = a.distance < 2,
            j = a.deltaTime < 250;
        if (h && i && j) return;
      }

      return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
    },
    preventSrc: function preventSrc(a) {
      this.manager.session.prevented = !0, a.preventDefault();
    }
  };
  var nb = 1,
      ob = 2,
      pb = 4,
      qb = 8,
      rb = qb,
      sb = 16,
      tb = 32;
  Y.prototype = {
    defaults: {},
    set: function set(a) {
      return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
    },
    recognizeWith: function recognizeWith(a) {
      if (f(a, "recognizeWith", this)) return this;
      var b = this.simultaneous;
      return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    },
    dropRecognizeWith: function dropRecognizeWith(a) {
      return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this);
    },
    requireFailure: function requireFailure(a) {
      if (f(a, "requireFailure", this)) return this;
      var b = this.requireFail;
      return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
    },
    dropRequireFailure: function dropRequireFailure(a) {
      if (f(a, "dropRequireFailure", this)) return this;
      a = _(a, this);
      var b = r(this.requireFail, a);
      return b > -1 && this.requireFail.splice(b, 1), this;
    },
    hasRequireFailures: function hasRequireFailures() {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function canRecognizeWith(a) {
      return !!this.simultaneous[a.id];
    },
    emit: function emit(a) {
      function b(b) {
        c.manager.emit(b, a);
      }

      var c = this,
          d = this.state;
      qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
    },
    tryEmit: function tryEmit(a) {
      return this.canEmit() ? this.emit(a) : void (this.state = tb);
    },
    canEmit: function canEmit() {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (tb | nb))) return !1;
        a++;
      }

      return !0;
    },
    recognize: function recognize(a) {
      var b = la({}, a);
      return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb));
    },
    process: function process(a) {},
    getTouchAction: function getTouchAction() {},
    reset: function reset() {}
  }, i(aa, Y, {
    defaults: {
      pointers: 1
    },
    attrTest: function attrTest(a) {
      var b = this.options.pointers;
      return 0 === b || a.pointers.length === b;
    },
    process: function process(a) {
      var b = this.state,
          c = a.eventType,
          d = b & (ob | pb),
          e = this.attrTest(a);
      return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
    }
  }), i(ba, aa, {
    defaults: {
      event: "pan",
      threshold: 10,
      pointers: 1,
      direction: Pa
    },
    getTouchAction: function getTouchAction() {
      var a = this.options.direction,
          b = [];
      return a & Na && b.push(lb), a & Oa && b.push(kb), b;
    },
    directionTest: function directionTest(a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;
      return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    },
    attrTest: function attrTest(a) {
      return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
    },
    emit: function emit(a) {
      this.pX = a.deltaX, this.pY = a.deltaY;
      var b = $(a.direction);
      b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
    }
  }), i(ca, aa, {
    defaults: {
      event: "pinch",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [jb];
    },
    attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
    },
    emit: function emit(a) {
      if (1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";
        a.additionalEvent = this.options.event + b;
      }

      this._super.emit.call(this, a);
    }
  }), i(da, Y, {
    defaults: {
      event: "press",
      pointers: 1,
      time: 251,
      threshold: 9
    },
    getTouchAction: function getTouchAction() {
      return [hb];
    },
    process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;
      if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
        this.state = rb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Ga) return rb;
      return tb;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit(a) {
      this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)));
    }
  }), i(ea, aa, {
    defaults: {
      event: "rotate",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [jb];
    },
    attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
    }
  }), i(fa, aa, {
    defaults: {
      event: "swipe",
      threshold: 10,
      velocity: .3,
      direction: Na | Oa,
      pointers: 1
    },
    getTouchAction: function getTouchAction() {
      return ba.prototype.getTouchAction.call(this);
    },
    attrTest: function attrTest(a) {
      var b,
          c = this.options.direction;
      return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
    },
    emit: function emit(a) {
      var b = $(a.offsetDirection);
      b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    }
  }), i(ga, Y, {
    defaults: {
      event: "tap",
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 9,
      posThreshold: 10
    },
    getTouchAction: function getTouchAction() {
      return [ib];
    },
    process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;
      if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();

      if (d && f && c) {
        if (a.eventType != Ga) return this.failTimeout();
        var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
        this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
        var i = this.count % b.taps;
        if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
          this.state = rb, this.tryEmit();
        }, b.interval, this), ob) : rb;
      }

      return tb;
    },
    failTimeout: function failTimeout() {
      return this._timer = e(function () {
        this.state = tb;
      }, this.options.interval, this), tb;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit() {
      this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    }
  }), ha.VERSION = "2.0.8", ha.defaults = {
    domEvents: !1,
    touchAction: gb,
    enable: !0,
    inputTarget: null,
    inputClass: null,
    preset: [[ea, {
      enable: !1
    }], [ca, {
      enable: !1
    }, ["rotate"]], [fa, {
      direction: Na
    }], [ba, {
      direction: Na
    }, ["swipe"]], [ga], [ga, {
      event: "doubletap",
      taps: 2
    }, ["tap"]], [da]],
    cssProps: {
      userSelect: "none",
      touchSelect: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  var ub = 1,
      vb = 2;
  ia.prototype = {
    set: function set(a) {
      return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    },
    stop: function stop(a) {
      this.session.stopped = a ? vb : ub;
    },
    recognize: function recognize(a) {
      var b = this.session;

      if (!b.stopped) {
        this.touchAction.preventDefaults(a);
        var c,
            d = this.recognizers,
            e = b.curRecognizer;
        (!e || e && e.state & rb) && (e = b.curRecognizer = null);

        for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
      }
    },
    get: function get(a) {
      if (a instanceof Y) return a;

      for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];

      return null;
    },
    add: function add(a) {
      if (f(a, "add", this)) return this;
      var b = this.get(a.options.event);
      return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    },
    remove: function remove(a) {
      if (f(a, "remove", this)) return this;

      if (a = this.get(a)) {
        var b = this.recognizers,
            c = r(b, a);
        -1 !== c && (b.splice(c, 1), this.touchAction.update());
      }

      return this;
    },
    on: function on(a, b) {
      if (a !== d && b !== d) {
        var c = this.handlers;
        return g(q(a), function (a) {
          c[a] = c[a] || [], c[a].push(b);
        }), this;
      }
    },
    off: function off(a, b) {
      if (a !== d) {
        var c = this.handlers;
        return g(q(a), function (a) {
          b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
        }), this;
      }
    },
    emit: function emit(a, b) {
      this.options.domEvents && ka(a, b);
      var c = this.handlers[a] && this.handlers[a].slice();

      if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };

        for (var d = 0; d < c.length;) c[d](b), d++;
      }
    },
    destroy: function destroy() {
      this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    }
  }, la(ha, {
    INPUT_START: Ea,
    INPUT_MOVE: Fa,
    INPUT_END: Ga,
    INPUT_CANCEL: Ha,
    STATE_POSSIBLE: nb,
    STATE_BEGAN: ob,
    STATE_CHANGED: pb,
    STATE_ENDED: qb,
    STATE_RECOGNIZED: rb,
    STATE_CANCELLED: sb,
    STATE_FAILED: tb,
    DIRECTION_NONE: Ia,
    DIRECTION_LEFT: Ja,
    DIRECTION_RIGHT: Ka,
    DIRECTION_UP: La,
    DIRECTION_DOWN: Ma,
    DIRECTION_HORIZONTAL: Na,
    DIRECTION_VERTICAL: Oa,
    DIRECTION_ALL: Pa,
    Manager: ia,
    Input: x,
    TouchAction: V,
    TouchInput: P,
    MouseInput: L,
    PointerEventInput: M,
    TouchMouseInput: R,
    SingleTouchInput: N,
    Recognizer: Y,
    AttrRecognizer: aa,
    Tap: ga,
    Pan: ba,
    Swipe: fa,
    Pinch: ca,
    Rotate: ea,
    Press: da,
    on: m,
    off: n,
    each: g,
    merge: ta,
    extend: sa,
    assign: la,
    inherit: i,
    bindFn: j,
    prefixed: u
  });
  var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
  wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () {
    return ha;
  }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
}(window, document, "Hammer");
},{"core-js/modules/es6.array.sort":74,"core-js/modules/es6.regexp.replace":77,"core-js/modules/es6.regexp.split":79,"core-js/modules/web.dom.iterable":82}],5:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

/* interact.js v1.3.4 | https://raw.github.com/taye/interact.js/master/LICENSE */
!function (t) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;
    e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.interact = t();
  }
}(function () {
  return function t(e, n, r) {
    function i(s, a) {
      if (!n[s]) {
        if (!e[s]) {
          var c = "function" == typeof require && require;
          if (!a && c) return c(s, !0);
          if (o) return o(s, !0);
          var l = new Error("Cannot find module '" + s + "'");
          throw l.code = "MODULE_NOT_FOUND", l;
        }

        var p = n[s] = {
          exports: {}
        };
        e[s][0].call(p.exports, function (t) {
          var n = e[s][1][t];
          return i(n || t);
        }, p, p.exports, t, e, n, r);
      }

      return n[s].exports;
    }

    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);

    return i;
  }({
    1: [function (t, e, n) {
      "use strict";

      "undefined" == typeof window ? e.exports = function (e) {
        return t("./src/utils/window").init(e), t("./src/index");
      } : e.exports = t("./src/index");
    }, {
      "./src/index": 19,
      "./src/utils/window": 52
    }],
    2: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r;
          r = e[n];
          var i = r;
          if (t.immediatePropagationStopped) break;
          i(t);
        }
      }

      var o = t("./utils/extend.js"),
          s = function () {
        function t(e) {
          r(this, t), this.options = o({}, e || {});
        }

        return t.prototype.fire = function (t) {
          var e = void 0,
              n = "on" + t.type,
              r = this.global;
          (e = this[t.type]) && i(t, e), this[n] && this[n](t), !t.propagationStopped && r && (e = r[t.type]) && i(t, e);
        }, t.prototype.on = function (t, e) {
          this[t] ? this[t].push(e) : this[t] = [e];
        }, t.prototype.off = function (t, e) {
          var n = this[t],
              r = n ? n.indexOf(e) : -1;
          -1 !== r && n.splice(r, 1), (n && 0 === n.length || !e) && (this[t] = void 0);
        }, t;
      }();

      e.exports = s;
    }, {
      "./utils/extend.js": 41
    }],
    3: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      var i = t("./utils/extend"),
          o = t("./utils/getOriginXY"),
          s = t("./defaultOptions"),
          a = t("./utils/Signals").new(),
          c = function () {
        function t(e, n, c, l, p, u) {
          var d = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
          r(this, t);
          var f = e.target,
              v = (f && f.options || s).deltaSource,
              g = o(f, p, c),
              h = "start" === l,
              m = "end" === l,
              y = h ? e.startCoords : e.curCoords,
              x = e.prevEvent;
          p = p || e.element;
          var b = i({}, y.page),
              w = i({}, y.client);
          b.x -= g.x, b.y -= g.y, w.x -= g.x, w.y -= g.y, this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = p, this.currentTarget = p, this.relatedTarget = u || null, this.preEnd = d, this.type = c + (l || ""), this.interaction = e, this.interactable = f, this.t0 = h ? e.downTimes[e.downTimes.length - 1] : x.t0;
          var E = {
            interaction: e,
            event: n,
            action: c,
            phase: l,
            element: p,
            related: u,
            page: b,
            client: w,
            coords: y,
            starting: h,
            ending: m,
            deltaSource: v,
            iEvent: this
          };
          a.fire("set-xy", E), m ? (this.pageX = x.pageX, this.pageY = x.pageY, this.clientX = x.clientX, this.clientY = x.clientY) : (this.pageX = b.x, this.pageY = b.y, this.clientX = w.x, this.clientY = w.y), this.x0 = e.startCoords.page.x - g.x, this.y0 = e.startCoords.page.y - g.y, this.clientX0 = e.startCoords.client.x - g.x, this.clientY0 = e.startCoords.client.y - g.y, a.fire("set-delta", E), this.timeStamp = y.timeStamp, this.dt = e.pointerDelta.timeStamp, this.duration = this.timeStamp - this.t0, this.speed = e.pointerDelta[v].speed, this.velocityX = e.pointerDelta[v].vx, this.velocityY = e.pointerDelta[v].vy, this.swipe = m || "inertiastart" === l ? this.getSwipe() : null, a.fire("new", E);
        }

        return t.prototype.getSwipe = function () {
          var t = this.interaction;
          if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150) return null;
          var e = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI;
          e < 0 && (e += 360);
          var n = 112.5 <= e && e < 247.5,
              r = 202.5 <= e && e < 337.5,
              i = !n && (292.5 <= e || e < 67.5);
          return {
            up: r,
            down: !r && 22.5 <= e && e < 157.5,
            left: n,
            right: i,
            angle: e,
            speed: t.prevEvent.speed,
            velocity: {
              x: t.prevEvent.velocityX,
              y: t.prevEvent.velocityY
            }
          };
        }, t.prototype.preventDefault = function () {}, t.prototype.stopImmediatePropagation = function () {
          this.immediatePropagationStopped = this.propagationStopped = !0;
        }, t.prototype.stopPropagation = function () {
          this.propagationStopped = !0;
        }, t;
      }();

      a.on("set-delta", function (t) {
        var e = t.iEvent,
            n = t.interaction,
            r = t.starting,
            i = t.deltaSource,
            o = r ? e : n.prevEvent;
        "client" === i ? (e.dx = e.clientX - o.clientX, e.dy = e.clientY - o.clientY) : (e.dx = e.pageX - o.pageX, e.dy = e.pageY - o.pageY);
      }), c.signals = a, e.exports = c;
    }, {
      "./defaultOptions": 18,
      "./utils/Signals": 34,
      "./utils/extend": 41,
      "./utils/getOriginXY": 42
    }],
    4: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      var i = t("./utils/clone"),
          o = t("./utils/is"),
          s = t("./utils/events"),
          a = t("./utils/extend"),
          c = t("./actions/base"),
          l = t("./scope"),
          p = t("./Eventable"),
          u = t("./defaultOptions"),
          d = t("./utils/Signals").new(),
          f = t("./utils/domUtils"),
          v = f.getElementRect,
          g = f.nodeContains,
          h = f.trySelector,
          m = f.matchesSelector,
          y = t("./utils/window"),
          x = y.getWindow,
          b = t("./utils/arr"),
          w = b.contains,
          E = t("./utils/browser"),
          T = E.wheelEvent;
      l.interactables = [];

      var S = function () {
        function t(e, n) {
          r(this, t), n = n || {}, this.target = e, this.events = new p(), this._context = n.context || l.document, this._win = x(h(e) ? this._context : e), this._doc = this._win.document, d.fire("new", {
            target: e,
            options: n,
            interactable: this,
            win: this._win
          }), l.addDocument(this._doc, this._win), l.interactables.push(this), this.set(n);
        }

        return t.prototype.setOnEvents = function (t, e) {
          var n = "on" + t;
          return o.function(e.onstart) && (this.events[n + "start"] = e.onstart), o.function(e.onmove) && (this.events[n + "move"] = e.onmove), o.function(e.onend) && (this.events[n + "end"] = e.onend), o.function(e.oninertiastart) && (this.events[n + "inertiastart"] = e.oninertiastart), this;
        }, t.prototype.setPerAction = function (t, e) {
          for (var n in e) n in u[t] && (o.object(e[n]) ? (this.options[t][n] = i(this.options[t][n] || {}), a(this.options[t][n], e[n]), o.object(u.perAction[n]) && "enabled" in u.perAction[n] && (this.options[t][n].enabled = !1 !== e[n].enabled)) : o.bool(e[n]) && o.object(u.perAction[n]) ? this.options[t][n].enabled = e[n] : void 0 !== e[n] && (this.options[t][n] = e[n]));
        }, t.prototype.getRect = function (t) {
          return t = t || this.target, o.string(this.target) && !o.element(t) && (t = this._context.querySelector(this.target)), v(t);
        }, t.prototype.rectChecker = function (t) {
          return o.function(t) ? (this.getRect = t, this) : null === t ? (delete this.options.getRect, this) : this.getRect;
        }, t.prototype._backCompatOption = function (t, e) {
          if (h(e) || o.object(e)) {
            this.options[t] = e;

            for (var n = 0; n < c.names.length; n++) {
              var r;
              r = c.names[n];
              var i = r;
              this.options[i][t] = e;
            }

            return this;
          }

          return this.options[t];
        }, t.prototype.origin = function (t) {
          return this._backCompatOption("origin", t);
        }, t.prototype.deltaSource = function (t) {
          return "page" === t || "client" === t ? (this.options.deltaSource = t, this) : this.options.deltaSource;
        }, t.prototype.context = function () {
          return this._context;
        }, t.prototype.inContext = function (t) {
          return this._context === t.ownerDocument || g(this._context, t);
        }, t.prototype.fire = function (t) {
          return this.events.fire(t), this;
        }, t.prototype._onOffMultiple = function (t, e, n, r) {
          if (o.string(e) && -1 !== e.search(" ") && (e = e.trim().split(/ +/)), o.array(e)) {
            for (var i = 0; i < e.length; i++) {
              var s;
              s = e[i];
              var a = s;
              this[t](a, n, r);
            }

            return !0;
          }

          if (o.object(e)) {
            for (var c in e) this[t](c, e[c], n);

            return !0;
          }
        }, t.prototype.on = function (e, n, r) {
          return this._onOffMultiple("on", e, n, r) ? this : ("wheel" === e && (e = T), w(t.eventTypes, e) ? this.events.on(e, n) : o.string(this.target) ? s.addDelegate(this.target, this._context, e, n, r) : s.add(this.target, e, n, r), this);
        }, t.prototype.off = function (e, n, r) {
          return this._onOffMultiple("off", e, n, r) ? this : ("wheel" === e && (e = T), w(t.eventTypes, e) ? this.events.off(e, n) : o.string(this.target) ? s.removeDelegate(this.target, this._context, e, n, r) : s.remove(this.target, e, n, r), this);
        }, t.prototype.set = function (e) {
          o.object(e) || (e = {}), this.options = i(u.base);
          var n = i(u.perAction);

          for (var r in c.methodDict) {
            var s = c.methodDict[r];
            this.options[r] = i(u[r]), this.setPerAction(r, n), this[s](e[r]);
          }

          for (var a = 0; a < t.settingsMethods.length; a++) {
            var l;
            l = t.settingsMethods[a];
            var p = l;
            this.options[p] = u.base[p], p in e && this[p](e[p]);
          }

          return d.fire("set", {
            options: e,
            interactable: this
          }), this;
        }, t.prototype.unset = function () {
          if (s.remove(this.target, "all"), o.string(this.target)) for (var t in s.delegatedEvents) {
            var e = s.delegatedEvents[t];
            e.selectors[0] === this.target && e.contexts[0] === this._context && (e.selectors.splice(0, 1), e.contexts.splice(0, 1), e.listeners.splice(0, 1), e.selectors.length || (e[t] = null)), s.remove(this._context, t, s.delegateListener), s.remove(this._context, t, s.delegateUseCapture, !0);
          } else s.remove(this, "all");
          d.fire("unset", {
            interactable: this
          }), l.interactables.splice(l.interactables.indexOf(this), 1);

          for (var n = 0; n < (l.interactions || []).length; n++) {
            var r;
            r = (l.interactions || [])[n];
            var i = r;
            i.target === this && i.interacting() && !i._ending && i.stop();
          }

          return l.interact;
        }, t;
      }();

      l.interactables.indexOfElement = function (t, e) {
        e = e || l.document;

        for (var n = 0; n < this.length; n++) {
          var r = this[n];
          if (r.target === t && r._context === e) return n;
        }

        return -1;
      }, l.interactables.get = function (t, e, n) {
        var r = this[this.indexOfElement(t, e && e.context)];
        return r && (o.string(t) || n || r.inContext(t)) ? r : null;
      }, l.interactables.forEachMatch = function (t, e) {
        for (var n = 0; n < this.length; n++) {
          var r;
          r = this[n];
          var i = r,
              s = void 0;
          if ((o.string(i.target) ? o.element(t) && m(t, i.target) : t === i.target) && i.inContext(t) && (s = e(i)), void 0 !== s) return s;
        }
      }, S.eventTypes = l.eventTypes = [], S.signals = d, S.settingsMethods = ["deltaSource", "origin", "preventDefault", "rectChecker"], e.exports = S;
    }, {
      "./Eventable": 2,
      "./actions/base": 6,
      "./defaultOptions": 18,
      "./scope": 33,
      "./utils/Signals": 34,
      "./utils/arr": 35,
      "./utils/browser": 36,
      "./utils/clone": 37,
      "./utils/domUtils": 39,
      "./utils/events": 40,
      "./utils/extend": 41,
      "./utils/is": 46,
      "./utils/window": 52
    }],
    5: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      function i(t) {
        return function (e) {
          var n = c.getPointerType(e),
              r = c.getEventTargets(e),
              i = r[0],
              o = r[1],
              s = [];

          if (p.supportsTouch && /touch/.test(e.type)) {
            h = new Date().getTime();

            for (var l = 0; l < e.changedTouches.length; l++) {
              var u;
              u = e.changedTouches[l];
              var f = u,
                  v = f,
                  g = d.search(v, e.type, i);
              s.push([v, g || new m({
                pointerType: n
              })]);
            }
          } else {
            var y = !1;

            if (!p.supportsPointerEvent && /mouse/.test(e.type)) {
              for (var x = 0; x < a.interactions.length && !y; x++) y = "mouse" !== a.interactions[x].pointerType && a.interactions[x].pointerIsDown;

              y = y || new Date().getTime() - h < 500 || 0 === e.timeStamp;
            }

            if (!y) {
              var b = d.search(e, e.type, i);
              b || (b = new m({
                pointerType: n
              })), s.push([e, b]);
            }
          }

          for (var w = 0; w < s.length; w++) {
            var E = s[w],
                T = E[0],
                S = E[1];
            S._updateEventTargets(i, o), S[t](T, e, i, o);
          }
        };
      }

      function o(t) {
        for (var e = 0; e < a.interactions.length; e++) {
          var n;
          n = a.interactions[e];
          var r = n;
          r.end(t), f.fire("endall", {
            event: t,
            interaction: r
          });
        }
      }

      function s(t, e) {
        var n = t.doc,
            r = 0 === e.indexOf("add") ? l.add : l.remove;

        for (var i in a.delegatedEvents) r(n, i, l.delegateListener), r(n, i, l.delegateUseCapture, !0);

        for (var o in b) r(n, o, b[o], p.isIOS ? {
          passive: !1
        } : void 0);
      }

      var a = t("./scope"),
          c = t("./utils"),
          l = t("./utils/events"),
          p = t("./utils/browser"),
          u = t("./utils/domObjects"),
          d = t("./utils/interactionFinder"),
          f = t("./utils/Signals").new(),
          v = {},
          g = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer"],
          h = 0;
      a.interactions = [];

      for (var m = function () {
        function t(e) {
          var n = e.pointerType;
          r(this, t), this.target = null, this.element = null, this.prepared = {
            name: null,
            axis: null,
            edges: null
          }, this.pointers = [], this.pointerIds = [], this.downTargets = [], this.downTimes = [], this.prevCoords = {
            page: {
              x: 0,
              y: 0
            },
            client: {
              x: 0,
              y: 0
            },
            timeStamp: 0
          }, this.curCoords = {
            page: {
              x: 0,
              y: 0
            },
            client: {
              x: 0,
              y: 0
            },
            timeStamp: 0
          }, this.startCoords = {
            page: {
              x: 0,
              y: 0
            },
            client: {
              x: 0,
              y: 0
            },
            timeStamp: 0
          }, this.pointerDelta = {
            page: {
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
              speed: 0
            },
            client: {
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
              speed: 0
            },
            timeStamp: 0
          }, this.downEvent = null, this.downPointer = {}, this._eventTarget = null, this._curEventTarget = null, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this.pointerType = n, f.fire("new", this), a.interactions.push(this);
        }

        return t.prototype.pointerDown = function (t, e, n) {
          var r = this.updatePointer(t, e, !0);
          f.fire("down", {
            pointer: t,
            event: e,
            eventTarget: n,
            pointerIndex: r,
            interaction: this
          });
        }, t.prototype.start = function (t, e, n) {
          this.interacting() || !this.pointerIsDown || this.pointerIds.length < ("gesture" === t.name ? 2 : 1) || (-1 === a.interactions.indexOf(this) && a.interactions.push(this), c.copyAction(this.prepared, t), this.target = e, this.element = n, f.fire("action-start", {
            interaction: this,
            event: this.downEvent
          }));
        }, t.prototype.pointerMove = function (e, n, r) {
          this.simulation || (this.updatePointer(e), c.setCoords(this.curCoords, this.pointers));
          var i = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y,
              o = void 0,
              s = void 0;
          this.pointerIsDown && !this.pointerWasMoved && (o = this.curCoords.client.x - this.startCoords.client.x, s = this.curCoords.client.y - this.startCoords.client.y, this.pointerWasMoved = c.hypot(o, s) > t.pointerMoveTolerance);
          var a = {
            pointer: e,
            pointerIndex: this.getPointerIndex(e),
            event: n,
            eventTarget: r,
            dx: o,
            dy: s,
            duplicate: i,
            interaction: this,
            interactingBeforeMove: this.interacting()
          };
          i || c.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords), f.fire("move", a), i || (this.interacting() && this.doMove(a), this.pointerWasMoved && c.copyCoords(this.prevCoords, this.curCoords));
        }, t.prototype.doMove = function (t) {
          t = c.extend({
            pointer: this.pointers[0],
            event: this.prevEvent,
            eventTarget: this._eventTarget,
            interaction: this
          }, t || {}), f.fire("before-action-move", t), this._dontFireMove || f.fire("action-move", t), this._dontFireMove = !1;
        }, t.prototype.pointerUp = function (t, e, n, r) {
          var i = this.getPointerIndex(t);
          f.fire(/cancel$/i.test(e.type) ? "cancel" : "up", {
            pointer: t,
            pointerIndex: i,
            event: e,
            eventTarget: n,
            curEventTarget: r,
            interaction: this
          }), this.simulation || this.end(e), this.pointerIsDown = !1, this.removePointer(t, e);
        }, t.prototype.end = function (t) {
          this._ending = !0, t = t || this.prevEvent, this.interacting() && f.fire("action-end", {
            event: t,
            interaction: this
          }), this.stop(), this._ending = !1;
        }, t.prototype.currentAction = function () {
          return this._interacting ? this.prepared.name : null;
        }, t.prototype.interacting = function () {
          return this._interacting;
        }, t.prototype.stop = function () {
          f.fire("stop", {
            interaction: this
          }), this._interacting && (f.fire("stop-active", {
            interaction: this
          }), f.fire("stop-" + this.prepared.name, {
            interaction: this
          })), this.target = this.element = null, this._interacting = !1, this.prepared.name = this.prevEvent = null;
        }, t.prototype.getPointerIndex = function (t) {
          return "mouse" === this.pointerType || "pen" === this.pointerType ? 0 : this.pointerIds.indexOf(c.getPointerId(t));
        }, t.prototype.updatePointer = function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e && /(down|start)$/i.test(e.type),
              r = c.getPointerId(t),
              i = this.getPointerIndex(t);
          return -1 === i && (i = this.pointerIds.length, this.pointerIds[i] = r), n && f.fire("update-pointer-down", {
            pointer: t,
            event: e,
            down: n,
            pointerId: r,
            pointerIndex: i,
            interaction: this
          }), this.pointers[i] = t, i;
        }, t.prototype.removePointer = function (t, e) {
          var n = this.getPointerIndex(t);
          -1 !== n && (f.fire("remove-pointer", {
            pointer: t,
            event: e,
            pointerIndex: n,
            interaction: this
          }), this.pointers.splice(n, 1), this.pointerIds.splice(n, 1), this.downTargets.splice(n, 1), this.downTimes.splice(n, 1));
        }, t.prototype._updateEventTargets = function (t, e) {
          this._eventTarget = t, this._curEventTarget = e;
        }, t;
      }(), y = 0; y < g.length; y++) {
        var x = g[y];
        v[x] = i(x);
      }

      var b = {},
          w = p.pEventTypes;
      u.PointerEvent ? (b[w.down] = v.pointerDown, b[w.move] = v.pointerMove, b[w.up] = v.pointerUp, b[w.cancel] = v.pointerUp) : (b.mousedown = v.pointerDown, b.mousemove = v.pointerMove, b.mouseup = v.pointerUp, b.touchstart = v.pointerDown, b.touchmove = v.pointerMove, b.touchend = v.pointerUp, b.touchcancel = v.pointerUp), b.blur = o, f.on("update-pointer-down", function (t) {
        var e = t.interaction,
            n = t.pointer,
            r = t.pointerId,
            i = t.pointerIndex,
            o = t.event,
            s = t.eventTarget,
            a = t.down;
        e.pointerIds[i] = r, e.pointers[i] = n, a && (e.pointerIsDown = !0), e.interacting() || (c.setCoords(e.startCoords, e.pointers), c.copyCoords(e.curCoords, e.startCoords), c.copyCoords(e.prevCoords, e.startCoords), e.downEvent = o, e.downTimes[i] = e.curCoords.timeStamp, e.downTargets[i] = s || o && c.getEventTargets(o)[0], e.pointerWasMoved = !1, c.pointerExtend(e.downPointer, n));
      }), a.signals.on("add-document", s), a.signals.on("remove-document", s), m.pointerMoveTolerance = 1, m.doOnInteractions = i, m.endAll = o, m.signals = f, m.docEvents = b, a.endAllInteractions = o, e.exports = m;
    }, {
      "./scope": 33,
      "./utils": 44,
      "./utils/Signals": 34,
      "./utils/browser": 36,
      "./utils/domObjects": 38,
      "./utils/events": 40,
      "./utils/interactionFinder": 45
    }],
    6: [function (t, e, n) {
      "use strict";

      function r(t, e, n, r) {
        var i = t.prepared.name,
            s = new o(t, e, i, n, t.element, null, r);
        t.target.fire(s), t.prevEvent = s;
      }

      var i = t("../Interaction"),
          o = t("../InteractEvent"),
          s = {
        firePrepared: r,
        names: [],
        methodDict: {}
      };
      i.signals.on("action-start", function (t) {
        var e = t.interaction,
            n = t.event;
        e._interacting = !0, r(e, n, "start");
      }), i.signals.on("action-move", function (t) {
        var e = t.interaction;
        if (r(e, t.event, "move", t.preEnd), !e.interacting()) return !1;
      }), i.signals.on("action-end", function (t) {
        r(t.interaction, t.event, "end");
      }), e.exports = s;
    }, {
      "../InteractEvent": 3,
      "../Interaction": 5
    }],
    7: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("../utils"),
          o = t("../InteractEvent"),
          s = t("../Interactable"),
          a = t("../Interaction"),
          c = t("../defaultOptions"),
          l = {
        defaults: {
          enabled: !1,
          mouseButtons: null,
          origin: null,
          snap: null,
          restrict: null,
          inertia: null,
          autoScroll: null,
          startAxis: "xy",
          lockAxis: "xy"
        },
        checker: function checker(t, e, n) {
          var r = n.options.drag;
          return r.enabled ? {
            name: "drag",
            axis: "start" === r.lockAxis ? r.startAxis : r.lockAxis
          } : null;
        },
        getCursor: function getCursor() {
          return "move";
        }
      };
      a.signals.on("before-action-move", function (t) {
        var e = t.interaction;

        if ("drag" === e.prepared.name) {
          var n = e.prepared.axis;
          "x" === n ? (e.curCoords.page.y = e.startCoords.page.y, e.curCoords.client.y = e.startCoords.client.y, e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vx), e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vx), e.pointerDelta.client.vy = 0, e.pointerDelta.page.vy = 0) : "y" === n && (e.curCoords.page.x = e.startCoords.page.x, e.curCoords.client.x = e.startCoords.client.x, e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vy), e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vy), e.pointerDelta.client.vx = 0, e.pointerDelta.page.vx = 0);
        }
      }), o.signals.on("new", function (t) {
        var e = t.iEvent,
            n = t.interaction;

        if ("dragmove" === e.type) {
          var r = n.prepared.axis;
          "x" === r ? (e.pageY = n.startCoords.page.y, e.clientY = n.startCoords.client.y, e.dy = 0) : "y" === r && (e.pageX = n.startCoords.page.x, e.clientX = n.startCoords.client.x, e.dx = 0);
        }
      }), s.prototype.draggable = function (t) {
        return i.is.object(t) ? (this.options.drag.enabled = !1 !== t.enabled, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis), /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis), this) : i.is.bool(t) ? (this.options.drag.enabled = t, t || (this.ondragstart = this.ondragstart = this.ondragend = null), this) : this.options.drag;
      }, r.drag = l, r.names.push("drag"), i.merge(s.eventTypes, ["dragstart", "dragmove", "draginertiastart", "draginertiaresume", "dragend"]), r.methodDict.drag = "draggable", c.drag = l.defaults, e.exports = l;
    }, {
      "../InteractEvent": 3,
      "../Interactable": 4,
      "../Interaction": 5,
      "../defaultOptions": 18,
      "../utils": 44,
      "./base": 6
    }],
    8: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        for (var n = [], r = [], i = 0; i < u.interactables.length; i++) {
          var o;
          o = u.interactables[i];
          var s = o;

          if (s.options.drop.enabled) {
            var a = s.options.drop.accept;
            if (!(p.is.element(a) && a !== e || p.is.string(a) && !p.matchesSelector(e, a))) for (var c = p.is.string(s.target) ? s._context.querySelectorAll(s.target) : [s.target], l = 0; l < c.length; l++) {
              var d;
              d = c[l];
              var f = d;
              f !== e && (n.push(s), r.push(f));
            }
          }
        }

        return {
          elements: r,
          dropzones: n
        };
      }

      function i(t, e) {
        for (var n = void 0, r = 0; r < t.dropzones.length; r++) {
          var i = t.dropzones[r],
              o = t.elements[r];
          o !== n && (e.target = o, i.fire(e)), n = o;
        }
      }

      function o(t, e) {
        var n = r(t, e);
        t.dropzones = n.dropzones, t.elements = n.elements, t.rects = [];

        for (var i = 0; i < t.dropzones.length; i++) t.rects[i] = t.dropzones[i].getRect(t.elements[i]);
      }

      function s(t, e, n) {
        var r = t.interaction,
            i = [];
        y && o(r.activeDrops, n);

        for (var s = 0; s < r.activeDrops.dropzones.length; s++) {
          var a = r.activeDrops.dropzones[s],
              c = r.activeDrops.elements[s],
              l = r.activeDrops.rects[s];
          i.push(a.dropCheck(t, e, r.target, n, c, l) ? c : null);
        }

        var u = p.indexOfDeepestElement(i);
        return {
          dropzone: r.activeDrops.dropzones[u] || null,
          element: r.activeDrops.elements[u] || null
        };
      }

      function a(t, e, n) {
        var r = {
          enter: null,
          leave: null,
          activate: null,
          deactivate: null,
          move: null,
          drop: null
        },
            i = {
          dragEvent: n,
          interaction: t,
          target: t.dropElement,
          dropzone: t.dropTarget,
          relatedTarget: n.target,
          draggable: n.interactable,
          timeStamp: n.timeStamp
        };
        return t.dropElement !== t.prevDropElement && (t.prevDropTarget && (r.leave = p.extend({
          type: "dragleave"
        }, i), n.dragLeave = r.leave.target = t.prevDropElement, n.prevDropzone = r.leave.dropzone = t.prevDropTarget), t.dropTarget && (r.enter = {
          dragEvent: n,
          interaction: t,
          target: t.dropElement,
          dropzone: t.dropTarget,
          relatedTarget: n.target,
          draggable: n.interactable,
          timeStamp: n.timeStamp,
          type: "dragenter"
        }, n.dragEnter = t.dropElement, n.dropzone = t.dropTarget)), "dragend" === n.type && t.dropTarget && (r.drop = p.extend({
          type: "drop"
        }, i), n.dropzone = t.dropTarget, n.relatedTarget = t.dropElement), "dragstart" === n.type && (r.activate = p.extend({
          type: "dropactivate"
        }, i), r.activate.target = null, r.activate.dropzone = null), "dragend" === n.type && (r.deactivate = p.extend({
          type: "dropdeactivate"
        }, i), r.deactivate.target = null, r.deactivate.dropzone = null), "dragmove" === n.type && t.dropTarget && (r.move = p.extend({
          dragmove: n,
          type: "dropmove"
        }, i), n.dropzone = t.dropTarget), r;
      }

      function c(t, e) {
        var n = t.activeDrops,
            r = t.prevDropTarget,
            o = t.dropTarget,
            s = t.dropElement;
        e.leave && r.fire(e.leave), e.move && o.fire(e.move), e.enter && o.fire(e.enter), e.drop && o.fire(e.drop), e.deactivate && i(n, e.deactivate), t.prevDropTarget = o, t.prevDropElement = s;
      }

      var l = t("./base"),
          p = t("../utils"),
          u = t("../scope"),
          d = t("../interact"),
          f = t("../InteractEvent"),
          v = t("../Interactable"),
          g = t("../Interaction"),
          h = t("../defaultOptions"),
          m = {
        defaults: {
          enabled: !1,
          accept: null,
          overlap: "pointer"
        }
      },
          y = !1;
      g.signals.on("action-start", function (t) {
        var e = t.interaction,
            n = t.event;

        if ("drag" === e.prepared.name) {
          e.activeDrops.dropzones = [], e.activeDrops.elements = [], e.activeDrops.rects = [], e.dropEvents = null, e.dynamicDrop || o(e.activeDrops, e.element);
          var r = e.prevEvent,
              s = a(e, n, r);
          s.activate && i(e.activeDrops, s.activate);
        }
      }), f.signals.on("new", function (t) {
        var e = t.interaction,
            n = t.iEvent,
            r = t.event;

        if ("dragmove" === n.type || "dragend" === n.type) {
          var i = e.element,
              o = n,
              c = s(o, r, i);
          e.dropTarget = c.dropzone, e.dropElement = c.element, e.dropEvents = a(e, r, o);
        }
      }), g.signals.on("action-move", function (t) {
        var e = t.interaction;
        "drag" === e.prepared.name && c(e, e.dropEvents);
      }), g.signals.on("action-end", function (t) {
        var e = t.interaction;
        "drag" === e.prepared.name && c(e, e.dropEvents);
      }), g.signals.on("stop-drag", function (t) {
        var e = t.interaction;
        e.activeDrops = {
          dropzones: null,
          elements: null,
          rects: null
        }, e.dropEvents = null;
      }), v.prototype.dropzone = function (t) {
        return p.is.object(t) ? (this.options.drop.enabled = !1 !== t.enabled, p.is.function(t.ondrop) && (this.events.ondrop = t.ondrop), p.is.function(t.ondropactivate) && (this.events.ondropactivate = t.ondropactivate), p.is.function(t.ondropdeactivate) && (this.events.ondropdeactivate = t.ondropdeactivate), p.is.function(t.ondragenter) && (this.events.ondragenter = t.ondragenter), p.is.function(t.ondragleave) && (this.events.ondragleave = t.ondragleave), p.is.function(t.ondropmove) && (this.events.ondropmove = t.ondropmove), /^(pointer|center)$/.test(t.overlap) ? this.options.drop.overlap = t.overlap : p.is.number(t.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)), "accept" in t && (this.options.drop.accept = t.accept), "checker" in t && (this.options.drop.checker = t.checker), this) : p.is.bool(t) ? (this.options.drop.enabled = t, t || (this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null), this) : this.options.drop;
      }, v.prototype.dropCheck = function (t, e, n, r, i, o) {
        var s = !1;
        if (!(o = o || this.getRect(i))) return !!this.options.drop.checker && this.options.drop.checker(t, e, s, this, i, n, r);
        var a = this.options.drop.overlap;

        if ("pointer" === a) {
          var c = p.getOriginXY(n, r, "drag"),
              l = p.getPageXY(t);
          l.x += c.x, l.y += c.y;
          var u = l.x > o.left && l.x < o.right,
              d = l.y > o.top && l.y < o.bottom;
          s = u && d;
        }

        var f = n.getRect(r);

        if (f && "center" === a) {
          var v = f.left + f.width / 2,
              g = f.top + f.height / 2;
          s = v >= o.left && v <= o.right && g >= o.top && g <= o.bottom;
        }

        if (f && p.is.number(a)) {
          s = Math.max(0, Math.min(o.right, f.right) - Math.max(o.left, f.left)) * Math.max(0, Math.min(o.bottom, f.bottom) - Math.max(o.top, f.top)) / (f.width * f.height) >= a;
        }

        return this.options.drop.checker && (s = this.options.drop.checker(t, e, s, this, i, n, r)), s;
      }, v.signals.on("unset", function (t) {
        t.interactable.dropzone(!1);
      }), v.settingsMethods.push("dropChecker"), g.signals.on("new", function (t) {
        t.dropTarget = null, t.dropElement = null, t.prevDropTarget = null, t.prevDropElement = null, t.dropEvents = null, t.activeDrops = {
          dropzones: [],
          elements: [],
          rects: []
        };
      }), g.signals.on("stop", function (t) {
        var e = t.interaction;
        e.dropTarget = e.dropElement = e.prevDropTarget = e.prevDropElement = null;
      }), d.dynamicDrop = function (t) {
        return p.is.bool(t) ? (y = t, d) : y;
      }, p.merge(v.eventTypes, ["dragenter", "dragleave", "dropactivate", "dropdeactivate", "dropmove", "drop"]), l.methodDict.drop = "dropzone", h.drop = m.defaults, e.exports = m;
    }, {
      "../InteractEvent": 3,
      "../Interactable": 4,
      "../Interaction": 5,
      "../defaultOptions": 18,
      "../interact": 21,
      "../scope": 33,
      "../utils": 44,
      "./base": 6
    }],
    9: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("../utils"),
          o = t("../InteractEvent"),
          s = t("../Interactable"),
          a = t("../Interaction"),
          c = t("../defaultOptions"),
          l = {
        defaults: {
          enabled: !1,
          origin: null,
          restrict: null
        },
        checker: function checker(t, e, n, r, i) {
          return i.pointerIds.length >= 2 ? {
            name: "gesture"
          } : null;
        },
        getCursor: function getCursor() {
          return "";
        }
      };
      o.signals.on("new", function (t) {
        var e = t.iEvent,
            n = t.interaction;
        "gesturestart" === e.type && (e.ds = 0, n.gesture.startDistance = n.gesture.prevDistance = e.distance, n.gesture.startAngle = n.gesture.prevAngle = e.angle, n.gesture.scale = 1);
      }), o.signals.on("new", function (t) {
        var e = t.iEvent,
            n = t.interaction;
        "gesturemove" === e.type && (e.ds = e.scale - n.gesture.scale, n.target.fire(e), n.gesture.prevAngle = e.angle, n.gesture.prevDistance = e.distance, e.scale === 1 / 0 || null === e.scale || void 0 === e.scale || isNaN(e.scale) || (n.gesture.scale = e.scale));
      }), s.prototype.gesturable = function (t) {
        return i.is.object(t) ? (this.options.gesture.enabled = !1 !== t.enabled, this.setPerAction("gesture", t), this.setOnEvents("gesture", t), this) : i.is.bool(t) ? (this.options.gesture.enabled = t, t || (this.ongesturestart = this.ongesturestart = this.ongestureend = null), this) : this.options.gesture;
      }, o.signals.on("set-delta", function (t) {
        var e = t.interaction,
            n = t.iEvent,
            r = t.action,
            s = t.event,
            a = t.starting,
            c = t.ending,
            l = t.deltaSource;

        if ("gesture" === r) {
          var p = e.pointers;
          n.touches = [p[0], p[1]], a ? (n.distance = i.touchDistance(p, l), n.box = i.touchBBox(p), n.scale = 1, n.ds = 0, n.angle = i.touchAngle(p, void 0, l), n.da = 0) : c || s instanceof o ? (n.distance = e.prevEvent.distance, n.box = e.prevEvent.box, n.scale = e.prevEvent.scale, n.ds = n.scale - 1, n.angle = e.prevEvent.angle, n.da = n.angle - e.gesture.startAngle) : (n.distance = i.touchDistance(p, l), n.box = i.touchBBox(p), n.scale = n.distance / e.gesture.startDistance, n.angle = i.touchAngle(p, e.gesture.prevAngle, l), n.ds = n.scale - e.gesture.prevScale, n.da = n.angle - e.gesture.prevAngle);
        }
      }), a.signals.on("new", function (t) {
        t.gesture = {
          start: {
            x: 0,
            y: 0
          },
          startDistance: 0,
          prevDistance: 0,
          distance: 0,
          scale: 1,
          startAngle: 0,
          prevAngle: 0
        };
      }), r.gesture = l, r.names.push("gesture"), i.merge(s.eventTypes, ["gesturestart", "gesturemove", "gestureend"]), r.methodDict.gesture = "gesturable", c.gesture = l.defaults, e.exports = l;
    }, {
      "../InteractEvent": 3,
      "../Interactable": 4,
      "../Interaction": 5,
      "../defaultOptions": 18,
      "../utils": 44,
      "./base": 6
    }],
    10: [function (t, e, n) {
      "use strict";

      function r(t, e, n, r, i, s, a) {
        if (!e) return !1;

        if (!0 === e) {
          var c = o.is.number(s.width) ? s.width : s.right - s.left,
              l = o.is.number(s.height) ? s.height : s.bottom - s.top;
          if (c < 0 && ("left" === t ? t = "right" : "right" === t && (t = "left")), l < 0 && ("top" === t ? t = "bottom" : "bottom" === t && (t = "top")), "left" === t) return n.x < (c >= 0 ? s.left : s.right) + a;
          if ("top" === t) return n.y < (l >= 0 ? s.top : s.bottom) + a;
          if ("right" === t) return n.x > (c >= 0 ? s.right : s.left) - a;
          if ("bottom" === t) return n.y > (l >= 0 ? s.bottom : s.top) - a;
        }

        return !!o.is.element(r) && (o.is.element(e) ? e === r : o.matchesUpTo(r, e, i));
      }

      var i = t("./base"),
          o = t("../utils"),
          s = t("../utils/browser"),
          a = t("../InteractEvent"),
          c = t("../Interactable"),
          l = t("../Interaction"),
          p = t("../defaultOptions"),
          u = s.supportsTouch || s.supportsPointerEvent ? 20 : 10,
          d = {
        defaults: {
          enabled: !1,
          mouseButtons: null,
          origin: null,
          snap: null,
          restrict: null,
          inertia: null,
          autoScroll: null,
          square: !1,
          preserveAspectRatio: !1,
          axis: "xy",
          margin: NaN,
          edges: null,
          invert: "none"
        },
        checker: function checker(t, e, n, i, s, a) {
          if (!a) return null;
          var c = o.extend({}, s.curCoords.page),
              l = n.options;

          if (l.resize.enabled) {
            var p = l.resize,
                d = {
              left: !1,
              right: !1,
              top: !1,
              bottom: !1
            };

            if (o.is.object(p.edges)) {
              for (var f in d) d[f] = r(f, p.edges[f], c, s._eventTarget, i, a, p.margin || u);

              if (d.left = d.left && !d.right, d.top = d.top && !d.bottom, d.left || d.right || d.top || d.bottom) return {
                name: "resize",
                edges: d
              };
            } else {
              var v = "y" !== l.resize.axis && c.x > a.right - u,
                  g = "x" !== l.resize.axis && c.y > a.bottom - u;
              if (v || g) return {
                name: "resize",
                axes: (v ? "x" : "") + (g ? "y" : "")
              };
            }
          }

          return null;
        },
        cursors: s.isIe9 ? {
          x: "e-resize",
          y: "s-resize",
          xy: "se-resize",
          top: "n-resize",
          left: "w-resize",
          bottom: "s-resize",
          right: "e-resize",
          topleft: "se-resize",
          bottomright: "se-resize",
          topright: "ne-resize",
          bottomleft: "ne-resize"
        } : {
          x: "ew-resize",
          y: "ns-resize",
          xy: "nwse-resize",
          top: "ns-resize",
          left: "ew-resize",
          bottom: "ns-resize",
          right: "ew-resize",
          topleft: "nwse-resize",
          bottomright: "nwse-resize",
          topright: "nesw-resize",
          bottomleft: "nesw-resize"
        },
        getCursor: function getCursor(t) {
          if (t.axis) return d.cursors[t.name + t.axis];

          if (t.edges) {
            for (var e = "", n = ["top", "bottom", "left", "right"], r = 0; r < 4; r++) t.edges[n[r]] && (e += n[r]);

            return d.cursors[e];
          }
        }
      };
      a.signals.on("new", function (t) {
        var e = t.iEvent,
            n = t.interaction;

        if ("resizestart" === e.type && n.prepared.edges) {
          var r = n.target.getRect(n.element),
              i = n.target.options.resize;

          if (i.square || i.preserveAspectRatio) {
            var s = o.extend({}, n.prepared.edges);
            s.top = s.top || s.left && !s.bottom, s.left = s.left || s.top && !s.right, s.bottom = s.bottom || s.right && !s.top, s.right = s.right || s.bottom && !s.left, n.prepared._linkedEdges = s;
          } else n.prepared._linkedEdges = null;

          i.preserveAspectRatio && (n.resizeStartAspectRatio = r.width / r.height), n.resizeRects = {
            start: r,
            current: o.extend({}, r),
            inverted: o.extend({}, r),
            previous: o.extend({}, r),
            delta: {
              left: 0,
              right: 0,
              width: 0,
              top: 0,
              bottom: 0,
              height: 0
            }
          }, e.rect = n.resizeRects.inverted, e.deltaRect = n.resizeRects.delta;
        }
      }), a.signals.on("new", function (t) {
        var e = t.iEvent,
            n = t.phase,
            r = t.interaction;

        if ("move" === n && r.prepared.edges) {
          var i = r.target.options.resize,
              s = i.invert,
              a = "reposition" === s || "negate" === s,
              c = r.prepared.edges,
              l = r.resizeRects.start,
              p = r.resizeRects.current,
              u = r.resizeRects.inverted,
              d = r.resizeRects.delta,
              f = o.extend(r.resizeRects.previous, u),
              v = c,
              g = e.dx,
              h = e.dy;

          if (i.preserveAspectRatio || i.square) {
            var m = i.preserveAspectRatio ? r.resizeStartAspectRatio : 1;
            c = r.prepared._linkedEdges, v.left && v.bottom || v.right && v.top ? h = -g / m : v.left || v.right ? h = g / m : (v.top || v.bottom) && (g = h * m);
          }

          if (c.top && (p.top += h), c.bottom && (p.bottom += h), c.left && (p.left += g), c.right && (p.right += g), a) {
            if (o.extend(u, p), "reposition" === s) {
              var y = void 0;
              u.top > u.bottom && (y = u.top, u.top = u.bottom, u.bottom = y), u.left > u.right && (y = u.left, u.left = u.right, u.right = y);
            }
          } else u.top = Math.min(p.top, l.bottom), u.bottom = Math.max(p.bottom, l.top), u.left = Math.min(p.left, l.right), u.right = Math.max(p.right, l.left);

          u.width = u.right - u.left, u.height = u.bottom - u.top;

          for (var x in u) d[x] = u[x] - f[x];

          e.edges = r.prepared.edges, e.rect = u, e.deltaRect = d;
        }
      }), c.prototype.resizable = function (t) {
        return o.is.object(t) ? (this.options.resize.enabled = !1 !== t.enabled, this.setPerAction("resize", t), this.setOnEvents("resize", t), /^x$|^y$|^xy$/.test(t.axis) ? this.options.resize.axis = t.axis : null === t.axis && (this.options.resize.axis = p.resize.axis), o.is.bool(t.preserveAspectRatio) ? this.options.resize.preserveAspectRatio = t.preserveAspectRatio : o.is.bool(t.square) && (this.options.resize.square = t.square), this) : o.is.bool(t) ? (this.options.resize.enabled = t, t || (this.onresizestart = this.onresizestart = this.onresizeend = null), this) : this.options.resize;
      }, l.signals.on("new", function (t) {
        t.resizeAxes = "xy";
      }), a.signals.on("set-delta", function (t) {
        var e = t.interaction,
            n = t.iEvent;
        "resize" === t.action && e.resizeAxes && (e.target.options.resize.square ? ("y" === e.resizeAxes ? n.dx = n.dy : n.dy = n.dx, n.axes = "xy") : (n.axes = e.resizeAxes, "x" === e.resizeAxes ? n.dy = 0 : "y" === e.resizeAxes && (n.dx = 0)));
      }), i.resize = d, i.names.push("resize"), o.merge(c.eventTypes, ["resizestart", "resizemove", "resizeinertiastart", "resizeinertiaresume", "resizeend"]), i.methodDict.resize = "resizable", p.resize = d.defaults, e.exports = d;
    }, {
      "../InteractEvent": 3,
      "../Interactable": 4,
      "../Interaction": 5,
      "../defaultOptions": 18,
      "../utils": 44,
      "../utils/browser": 36,
      "./base": 6
    }],
    11: [function (t, e, n) {
      "use strict";

      var r = t("./utils/raf"),
          i = t("./utils/window").getWindow,
          o = t("./utils/is"),
          s = t("./utils/domUtils"),
          a = t("./Interaction"),
          c = t("./defaultOptions"),
          l = {
        defaults: {
          enabled: !1,
          container: null,
          margin: 60,
          speed: 300
        },
        interaction: null,
        i: null,
        x: 0,
        y: 0,
        isScrolling: !1,
        prevTime: 0,
        start: function start(t) {
          l.isScrolling = !0, r.cancel(l.i), l.interaction = t, l.prevTime = new Date().getTime(), l.i = r.request(l.scroll);
        },
        stop: function stop() {
          l.isScrolling = !1, r.cancel(l.i);
        },
        scroll: function scroll() {
          var t = l.interaction.target.options[l.interaction.prepared.name].autoScroll,
              e = t.container || i(l.interaction.element),
              n = new Date().getTime(),
              s = (n - l.prevTime) / 1e3,
              a = t.speed * s;
          a >= 1 && (o.window(e) ? e.scrollBy(l.x * a, l.y * a) : e && (e.scrollLeft += l.x * a, e.scrollTop += l.y * a), l.prevTime = n), l.isScrolling && (r.cancel(l.i), l.i = r.request(l.scroll));
        },
        check: function check(t, e) {
          var n = t.options;
          return n[e].autoScroll && n[e].autoScroll.enabled;
        },
        onInteractionMove: function onInteractionMove(t) {
          var e = t.interaction,
              n = t.pointer;

          if (e.interacting() && l.check(e.target, e.prepared.name)) {
            if (e.simulation) return void (l.x = l.y = 0);
            var r = void 0,
                a = void 0,
                c = void 0,
                p = void 0,
                u = e.target.options[e.prepared.name].autoScroll,
                d = u.container || i(e.element);
            if (o.window(d)) p = n.clientX < l.margin, r = n.clientY < l.margin, a = n.clientX > d.innerWidth - l.margin, c = n.clientY > d.innerHeight - l.margin;else {
              var f = s.getElementClientRect(d);
              p = n.clientX < f.left + l.margin, r = n.clientY < f.top + l.margin, a = n.clientX > f.right - l.margin, c = n.clientY > f.bottom - l.margin;
            }
            l.x = a ? 1 : p ? -1 : 0, l.y = c ? 1 : r ? -1 : 0, l.isScrolling || (l.margin = u.margin, l.speed = u.speed, l.start(e));
          }
        }
      };
      a.signals.on("stop-active", function () {
        l.stop();
      }), a.signals.on("action-move", l.onInteractionMove), c.perAction.autoScroll = l.defaults, e.exports = l;
    }, {
      "./Interaction": 5,
      "./defaultOptions": 18,
      "./utils/domUtils": 39,
      "./utils/is": 46,
      "./utils/raf": 50,
      "./utils/window": 52
    }],
    12: [function (t, e, n) {
      "use strict";

      var r = t("../Interactable"),
          i = t("../actions/base"),
          o = t("../utils/is"),
          s = t("../utils/domUtils"),
          a = t("../utils"),
          c = a.warnOnce;
      r.prototype.getAction = function (t, e, n, r) {
        var i = this.defaultActionChecker(t, e, n, r);
        return this.options.actionChecker ? this.options.actionChecker(t, e, i, this, r, n) : i;
      }, r.prototype.ignoreFrom = c(function (t) {
        return this._backCompatOption("ignoreFrom", t);
      }, "Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), r.prototype.allowFrom = c(function (t) {
        return this._backCompatOption("allowFrom", t);
      }, "Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), r.prototype.testIgnore = function (t, e, n) {
        return !(!t || !o.element(n)) && (o.string(t) ? s.matchesUpTo(n, t, e) : !!o.element(t) && s.nodeContains(t, n));
      }, r.prototype.testAllow = function (t, e, n) {
        return !t || !!o.element(n) && (o.string(t) ? s.matchesUpTo(n, t, e) : !!o.element(t) && s.nodeContains(t, n));
      }, r.prototype.testIgnoreAllow = function (t, e, n) {
        return !this.testIgnore(t.ignoreFrom, e, n) && this.testAllow(t.allowFrom, e, n);
      }, r.prototype.actionChecker = function (t) {
        return o.function(t) ? (this.options.actionChecker = t, this) : null === t ? (delete this.options.actionChecker, this) : this.options.actionChecker;
      }, r.prototype.styleCursor = function (t) {
        return o.bool(t) ? (this.options.styleCursor = t, this) : null === t ? (delete this.options.styleCursor, this) : this.options.styleCursor;
      }, r.prototype.defaultActionChecker = function (t, e, n, r) {
        for (var o = this.getRect(r), s = e.buttons || {
          0: 1,
          1: 4,
          3: 8,
          4: 16
        }[e.button], a = null, c = 0; c < i.names.length; c++) {
          var l;
          l = i.names[c];
          var p = l;
          if ((!n.pointerIsDown || !/mouse|pointer/.test(n.pointerType) || 0 != (s & this.options[p].mouseButtons)) && (a = i[p].checker(t, e, this, r, n, o))) return a;
        }
      };
    }, {
      "../Interactable": 4,
      "../actions/base": 6,
      "../utils": 44,
      "../utils/domUtils": 39,
      "../utils/is": 46
    }],
    13: [function (t, e, n) {
      "use strict";

      function r(t, e, n, r) {
        return v.is.object(t) && e.testIgnoreAllow(e.options[t.name], n, r) && e.options[t.name].enabled && a(e, n, t) ? t : null;
      }

      function i(t, e, n, i, o, s) {
        for (var a = 0, c = i.length; a < c; a++) {
          var l = i[a],
              p = o[a],
              u = r(l.getAction(e, n, t, p), l, p, s);
          if (u) return {
            action: u,
            target: l,
            element: p
          };
        }

        return {};
      }

      function o(t, e, n, r) {
        function o(t) {
          s.push(t), a.push(c);
        }

        for (var s = [], a = [], c = r; v.is.element(c);) {
          s = [], a = [], f.interactables.forEachMatch(c, o);
          var l = i(t, e, n, s, a, r);
          if (l.action && !l.target.options[l.action.name].manualStart) return l;
          c = v.parentNode(c);
        }

        return {};
      }

      function s(t, e) {
        var n = e.action,
            r = e.target,
            i = e.element;

        if (n = n || {}, t.target && t.target.options.styleCursor && (t.target._doc.documentElement.style.cursor = ""), t.target = r, t.element = i, v.copyAction(t.prepared, n), r && r.options.styleCursor) {
          var o = n ? u[n.name].getCursor(n) : "";
          t.target._doc.documentElement.style.cursor = o;
        }

        g.fire("prepared", {
          interaction: t
        });
      }

      function a(t, e, n) {
        var r = t.options,
            i = r[n.name].max,
            o = r[n.name].maxPerElement,
            s = 0,
            a = 0,
            c = 0;

        if (i && o && h.maxInteractions) {
          for (var l = 0; l < f.interactions.length; l++) {
            var p;
            p = f.interactions[l];
            var u = p,
                d = u.prepared.name;

            if (u.interacting()) {
              if (++s >= h.maxInteractions) return !1;

              if (u.target === t) {
                if ((a += d === n.name | 0) >= i) return !1;
                if (u.element === e && (c++, d !== n.name || c >= o)) return !1;
              }
            }
          }

          return h.maxInteractions > 0;
        }
      }

      var c = t("../interact"),
          l = t("../Interactable"),
          p = t("../Interaction"),
          u = t("../actions/base"),
          d = t("../defaultOptions"),
          f = t("../scope"),
          v = t("../utils"),
          g = t("../utils/Signals").new();
      t("./InteractableMethods");
      var h = {
        signals: g,
        withinInteractionLimit: a,
        maxInteractions: 1 / 0,
        defaults: {
          perAction: {
            manualStart: !1,
            max: 1 / 0,
            maxPerElement: 1,
            allowFrom: null,
            ignoreFrom: null,
            mouseButtons: 1
          }
        },
        setActionDefaults: function setActionDefaults(t) {
          v.extend(t.defaults, h.defaults.perAction);
        },
        validateAction: r
      };
      p.signals.on("down", function (t) {
        var e = t.interaction,
            n = t.pointer,
            r = t.event,
            i = t.eventTarget;

        if (!e.interacting()) {
          s(e, o(e, n, r, i));
        }
      }), p.signals.on("move", function (t) {
        var e = t.interaction,
            n = t.pointer,
            r = t.event,
            i = t.eventTarget;

        if ("mouse" === e.pointerType && !e.pointerIsDown && !e.interacting()) {
          s(e, o(e, n, r, i));
        }
      }), p.signals.on("move", function (t) {
        var e = t.interaction,
            n = t.event;

        if (e.pointerIsDown && !e.interacting() && e.pointerWasMoved && e.prepared.name) {
          g.fire("before-start", t);
          var r = e.target;
          e.prepared.name && r && (r.options[e.prepared.name].manualStart || !a(r, e.element, e.prepared) ? e.stop(n) : e.start(e.prepared, r, e.element));
        }
      }), p.signals.on("stop", function (t) {
        var e = t.interaction,
            n = e.target;
        n && n.options.styleCursor && (n._doc.documentElement.style.cursor = "");
      }), c.maxInteractions = function (t) {
        return v.is.number(t) ? (h.maxInteractions = t, c) : h.maxInteractions;
      }, l.settingsMethods.push("styleCursor"), l.settingsMethods.push("actionChecker"), l.settingsMethods.push("ignoreFrom"), l.settingsMethods.push("allowFrom"), d.base.actionChecker = null, d.base.styleCursor = !0, v.extend(d.perAction, h.defaults.perAction), e.exports = h;
    }, {
      "../Interactable": 4,
      "../Interaction": 5,
      "../actions/base": 6,
      "../defaultOptions": 18,
      "../interact": 21,
      "../scope": 33,
      "../utils": 44,
      "../utils/Signals": 34,
      "./InteractableMethods": 12
    }],
    14: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!e) return !1;
        var n = e.options.drag.startAxis;
        return "xy" === t || "xy" === n || n === t;
      }

      var i = t("./base"),
          o = t("../scope"),
          s = t("../utils/is"),
          a = t("../utils/domUtils"),
          c = a.parentNode;
      i.setActionDefaults(t("../actions/drag")), i.signals.on("before-start", function (t) {
        var e = t.interaction,
            n = t.eventTarget,
            a = t.dx,
            l = t.dy;

        if ("drag" === e.prepared.name) {
          var p = Math.abs(a),
              u = Math.abs(l),
              d = e.target.options.drag,
              f = d.startAxis,
              v = p > u ? "x" : p < u ? "y" : "xy";

          if (e.prepared.axis = "start" === d.lockAxis ? v[0] : d.lockAxis, "xy" !== v && "xy" !== f && f !== v) {
            e.prepared.name = null;

            for (var g = n, h = function h(t) {
              if (t !== e.target) {
                var o = e.target.options.drag;

                if (!o.manualStart && t.testIgnoreAllow(o, g, n)) {
                  var s = t.getAction(e.downPointer, e.downEvent, e, g);
                  if (s && "drag" === s.name && r(v, t) && i.validateAction(s, t, g, n)) return t;
                }
              }
            }; s.element(g);) {
              var m = o.interactables.forEachMatch(g, h);

              if (m) {
                e.prepared.name = "drag", e.target = m, e.element = g;
                break;
              }

              g = c(g);
            }
          }
        }
      });
    }, {
      "../actions/drag": 7,
      "../scope": 33,
      "../utils/domUtils": 39,
      "../utils/is": 46,
      "./base": 13
    }],
    15: [function (t, e, n) {
      "use strict";

      t("./base").setActionDefaults(t("../actions/gesture"));
    }, {
      "../actions/gesture": 9,
      "./base": 13
    }],
    16: [function (t, e, n) {
      "use strict";

      function r(t) {
        var e = t.prepared && t.prepared.name;
        if (!e) return null;
        var n = t.target.options;
        return n[e].hold || n[e].delay;
      }

      var i = t("./base"),
          o = t("../Interaction");
      i.defaults.perAction.hold = 0, i.defaults.perAction.delay = 0, o.signals.on("new", function (t) {
        t.autoStartHoldTimer = null;
      }), i.signals.on("prepared", function (t) {
        var e = t.interaction,
            n = r(e);
        n > 0 && (e.autoStartHoldTimer = setTimeout(function () {
          e.start(e.prepared, e.target, e.element);
        }, n));
      }), o.signals.on("move", function (t) {
        var e = t.interaction,
            n = t.duplicate;
        e.pointerWasMoved && !n && clearTimeout(e.autoStartHoldTimer);
      }), i.signals.on("before-start", function (t) {
        var e = t.interaction;
        r(e) > 0 && (e.prepared.name = null);
      }), e.exports = {
        getHoldDuration: r
      };
    }, {
      "../Interaction": 5,
      "./base": 13
    }],
    17: [function (t, e, n) {
      "use strict";

      t("./base").setActionDefaults(t("../actions/resize"));
    }, {
      "../actions/resize": 10,
      "./base": 13
    }],
    18: [function (t, e, n) {
      "use strict";

      e.exports = {
        base: {
          accept: null,
          preventDefault: "auto",
          deltaSource: "page"
        },
        perAction: {
          origin: {
            x: 0,
            y: 0
          },
          inertia: {
            enabled: !1,
            resistance: 10,
            minSpeed: 100,
            endSpeed: 10,
            allowResume: !0,
            smoothEndDuration: 300
          }
        }
      };
    }, {}],
    19: [function (t, e, n) {
      "use strict";

      t("./inertia"), t("./modifiers/snap"), t("./modifiers/restrict"), t("./pointerEvents/base"), t("./pointerEvents/holdRepeat"), t("./pointerEvents/interactableTargets"), t("./autoStart/hold"), t("./actions/gesture"), t("./actions/resize"), t("./actions/drag"), t("./actions/drop"), t("./modifiers/snapSize"), t("./modifiers/restrictEdges"), t("./modifiers/restrictSize"), t("./autoStart/gesture"), t("./autoStart/resize"), t("./autoStart/drag"), t("./interactablePreventDefault.js"), t("./autoScroll"), e.exports = t("./interact");
    }, {
      "./actions/drag": 7,
      "./actions/drop": 8,
      "./actions/gesture": 9,
      "./actions/resize": 10,
      "./autoScroll": 11,
      "./autoStart/drag": 14,
      "./autoStart/gesture": 15,
      "./autoStart/hold": 16,
      "./autoStart/resize": 17,
      "./inertia": 20,
      "./interact": 21,
      "./interactablePreventDefault.js": 22,
      "./modifiers/restrict": 24,
      "./modifiers/restrictEdges": 25,
      "./modifiers/restrictSize": 26,
      "./modifiers/snap": 27,
      "./modifiers/snapSize": 28,
      "./pointerEvents/base": 30,
      "./pointerEvents/holdRepeat": 31,
      "./pointerEvents/interactableTargets": 32
    }],
    20: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        var n = t.target.options[t.prepared.name].inertia,
            r = n.resistance,
            i = -Math.log(n.endSpeed / e.v0) / r;
        e.x0 = t.prevEvent.pageX, e.y0 = t.prevEvent.pageY, e.t0 = e.startEvent.timeStamp / 1e3, e.sx = e.sy = 0, e.modifiedXe = e.xe = (e.vx0 - i) / r, e.modifiedYe = e.ye = (e.vy0 - i) / r, e.te = i, e.lambda_v0 = r / e.v0, e.one_ve_v0 = 1 - n.endSpeed / e.v0;
      }

      function i() {
        s(this), p.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
        var t = this.inertiaStatus,
            e = this.target.options[this.prepared.name].inertia,
            n = e.resistance,
            r = new Date().getTime() / 1e3 - t.t0;

        if (r < t.te) {
          var i = 1 - (Math.exp(-n * r) - t.lambda_v0) / t.one_ve_v0;
          if (t.modifiedXe === t.xe && t.modifiedYe === t.ye) t.sx = t.xe * i, t.sy = t.ye * i;else {
            var o = p.getQuadraticCurvePoint(0, 0, t.xe, t.ye, t.modifiedXe, t.modifiedYe, i);
            t.sx = o.x, t.sy = o.y;
          }
          this.doMove(), t.i = u.request(this.boundInertiaFrame);
        } else t.sx = t.modifiedXe, t.sy = t.modifiedYe, this.doMove(), this.end(t.startEvent), t.active = !1, this.simulation = null;

        p.copyCoords(this.prevCoords, this.curCoords);
      }

      function o() {
        s(this);
        var t = this.inertiaStatus,
            e = new Date().getTime() - t.t0,
            n = this.target.options[this.prepared.name].inertia.smoothEndDuration;
        e < n ? (t.sx = p.easeOutQuad(e, 0, t.xe, n), t.sy = p.easeOutQuad(e, 0, t.ye, n), this.pointerMove(t.startEvent, t.startEvent), t.i = u.request(this.boundSmoothEndFrame)) : (t.sx = t.xe, t.sy = t.ye, this.pointerMove(t.startEvent, t.startEvent), this.end(t.startEvent), t.smoothEnd = t.active = !1, this.simulation = null);
      }

      function s(t) {
        var e = t.inertiaStatus;

        if (e.active) {
          var n = e.upCoords.page,
              r = e.upCoords.client;
          p.setCoords(t.curCoords, [{
            pageX: n.x + e.sx,
            pageY: n.y + e.sy,
            clientX: r.x + e.sx,
            clientY: r.y + e.sy
          }]);
        }
      }

      var a = t("./InteractEvent"),
          c = t("./Interaction"),
          l = t("./modifiers/base"),
          p = t("./utils"),
          u = t("./utils/raf");
      c.signals.on("new", function (t) {
        t.inertiaStatus = {
          active: !1,
          smoothEnd: !1,
          allowResume: !1,
          startEvent: null,
          upCoords: {},
          xe: 0,
          ye: 0,
          sx: 0,
          sy: 0,
          t0: 0,
          vx0: 0,
          vys: 0,
          duration: 0,
          lambda_v0: 0,
          one_ve_v0: 0,
          i: null
        }, t.boundInertiaFrame = function () {
          return i.apply(t);
        }, t.boundSmoothEndFrame = function () {
          return o.apply(t);
        };
      }), c.signals.on("down", function (t) {
        var e = t.interaction,
            n = t.event,
            r = t.pointer,
            i = t.eventTarget,
            o = e.inertiaStatus;
        if (o.active) for (var s = i; p.is.element(s);) {
          if (s === e.element) {
            u.cancel(o.i), o.active = !1, e.simulation = null, e.updatePointer(r), p.setCoords(e.curCoords, e.pointers);
            var d = {
              interaction: e
            };
            c.signals.fire("before-action-move", d), c.signals.fire("action-resume", d);
            var f = new a(e, n, e.prepared.name, "inertiaresume", e.element);
            e.target.fire(f), e.prevEvent = f, l.resetStatuses(e.modifierStatuses), p.copyCoords(e.prevCoords, e.curCoords);
            break;
          }

          s = p.parentNode(s);
        }
      }), c.signals.on("up", function (t) {
        var e = t.interaction,
            n = t.event,
            i = e.inertiaStatus;

        if (e.interacting() && !i.active) {
          var o = e.target,
              s = o && o.options,
              c = s && e.prepared.name && s[e.prepared.name].inertia,
              d = new Date().getTime(),
              f = {},
              v = p.extend({}, e.curCoords.page),
              g = e.pointerDelta.client.speed,
              h = !1,
              m = void 0,
              y = c && c.enabled && "gesture" !== e.prepared.name && n !== i.startEvent,
              x = y && d - e.curCoords.timeStamp < 50 && g > c.minSpeed && g > c.endSpeed,
              b = {
            interaction: e,
            pageCoords: v,
            statuses: f,
            preEnd: !0,
            requireEndOnly: !0
          };
          y && !x && (l.resetStatuses(f), m = l.setAll(b), m.shouldMove && m.locked && (h = !0)), (x || h) && (p.copyCoords(i.upCoords, e.curCoords), e.pointers[0] = i.startEvent = new a(e, n, e.prepared.name, "inertiastart", e.element), i.t0 = d, i.active = !0, i.allowResume = c.allowResume, e.simulation = i, o.fire(i.startEvent), x ? (i.vx0 = e.pointerDelta.client.vx, i.vy0 = e.pointerDelta.client.vy, i.v0 = g, r(e, i), p.extend(v, e.curCoords.page), v.x += i.xe, v.y += i.ye, l.resetStatuses(f), m = l.setAll(b), i.modifiedXe += m.dx, i.modifiedYe += m.dy, i.i = u.request(e.boundInertiaFrame)) : (i.smoothEnd = !0, i.xe = m.dx, i.ye = m.dy, i.sx = i.sy = 0, i.i = u.request(e.boundSmoothEndFrame)));
        }
      }), c.signals.on("stop-active", function (t) {
        var e = t.interaction,
            n = e.inertiaStatus;
        n.active && (u.cancel(n.i), n.active = !1, e.simulation = null);
      });
    }, {
      "./InteractEvent": 3,
      "./Interaction": 5,
      "./modifiers/base": 23,
      "./utils": 44,
      "./utils/raf": 50
    }],
    21: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        var n = a.interactables.get(t, e);
        return n || (n = new c(t, e), n.events.global = p), n;
      }

      var i = t("./utils/browser"),
          o = t("./utils/events"),
          s = t("./utils"),
          a = t("./scope"),
          c = t("./Interactable"),
          l = t("./Interaction"),
          p = {};
      r.isSet = function (t, e) {
        return -1 !== a.interactables.indexOfElement(t, e && e.context);
      }, r.on = function (t, e, n) {
        if (s.is.string(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s.is.array(t)) {
          for (var i = 0; i < t.length; i++) {
            var l;
            l = t[i];
            var u = l;
            r.on(u, e, n);
          }

          return r;
        }

        if (s.is.object(t)) {
          for (var d in t) r.on(d, t[d], e);

          return r;
        }

        return s.contains(c.eventTypes, t) ? p[t] ? p[t].push(e) : p[t] = [e] : o.add(a.document, t, e, {
          options: n
        }), r;
      }, r.off = function (t, e, n) {
        if (s.is.string(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s.is.array(t)) {
          for (var i = 0; i < t.length; i++) {
            var l;
            l = t[i];
            var u = l;
            r.off(u, e, n);
          }

          return r;
        }

        if (s.is.object(t)) {
          for (var d in t) r.off(d, t[d], e);

          return r;
        }

        if (s.contains(c.eventTypes, t)) {
          var f = void 0;
          t in p && -1 !== (f = p[t].indexOf(e)) && p[t].splice(f, 1);
        } else o.remove(a.document, t, e, n);

        return r;
      }, r.debug = function () {
        return a;
      }, r.getPointerAverage = s.pointerAverage, r.getTouchBBox = s.touchBBox, r.getTouchDistance = s.touchDistance, r.getTouchAngle = s.touchAngle, r.getElementRect = s.getElementRect, r.getElementClientRect = s.getElementClientRect, r.matchesSelector = s.matchesSelector, r.closest = s.closest, r.supportsTouch = function () {
        return i.supportsTouch;
      }, r.supportsPointerEvent = function () {
        return i.supportsPointerEvent;
      }, r.stop = function (t) {
        for (var e = a.interactions.length - 1; e >= 0; e--) a.interactions[e].stop(t);

        return r;
      }, r.pointerMoveTolerance = function (t) {
        return s.is.number(t) ? (l.pointerMoveTolerance = t, r) : l.pointerMoveTolerance;
      }, r.addDocument = a.addDocument, r.removeDocument = a.removeDocument, a.interact = r, e.exports = r;
    }, {
      "./Interactable": 4,
      "./Interaction": 5,
      "./scope": 33,
      "./utils": 44,
      "./utils/browser": 36,
      "./utils/events": 40
    }],
    22: [function (t, e, n) {
      "use strict";

      function r(t) {
        var e = t.interaction,
            n = t.event;
        e.target && e.target.checkAndPreventDefault(n);
      }

      var i = t("./Interactable"),
          o = t("./Interaction"),
          s = t("./scope"),
          a = t("./utils/is"),
          c = t("./utils/events"),
          l = t("./utils/browser"),
          p = t("./utils/domUtils"),
          u = p.nodeContains,
          d = p.matchesSelector;
      i.prototype.preventDefault = function (t) {
        return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : a.bool(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault;
      }, i.prototype.checkAndPreventDefault = function (t) {
        var e = this.options.preventDefault;
        if ("never" !== e) return "always" === e ? void t.preventDefault() : void (c.supportsPassive && /^touch(start|move)$/.test(t.type) && !l.isIOS || /^(mouse|pointer|touch)*(down|start)/i.test(t.type) || a.element(t.target) && d(t.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || t.preventDefault());
      };

      for (var f = ["down", "move", "up", "cancel"], v = 0; v < f.length; v++) {
        var g = f[v];
        o.signals.on(g, r);
      }

      o.docEvents.dragstart = function (t) {
        for (var e = 0; e < s.interactions.length; e++) {
          var n;
          n = s.interactions[e];
          var r = n;
          if (r.element && (r.element === t.target || u(r.element, t.target))) return void r.target.checkAndPreventDefault(t);
        }
      };
    }, {
      "./Interactable": 4,
      "./Interaction": 5,
      "./scope": 33,
      "./utils/browser": 36,
      "./utils/domUtils": 39,
      "./utils/events": 40,
      "./utils/is": 46
    }],
    23: [function (t, e, n) {
      "use strict";

      function r(t, e, n) {
        return t && t.enabled && (e || !t.endOnly) && (!n || t.endOnly);
      }

      var i = t("../InteractEvent"),
          o = t("../Interaction"),
          s = t("../utils/extend"),
          a = {
        names: [],
        setOffsets: function setOffsets(t) {
          var e = t.interaction,
              n = t.pageCoords,
              r = e.target,
              i = e.element,
              o = e.startOffset,
              s = r.getRect(i);
          s ? (o.left = n.x - s.left, o.top = n.y - s.top, o.right = s.right - n.x, o.bottom = s.bottom - n.y, "width" in s || (s.width = s.right - s.left), "height" in s || (s.height = s.bottom - s.top)) : o.left = o.top = o.right = o.bottom = 0, t.rect = s, t.interactable = r, t.element = i;

          for (var c = 0; c < a.names.length; c++) {
            var l;
            l = a.names[c];
            var p = l;
            t.options = r.options[e.prepared.name][p], t.options && (e.modifierOffsets[p] = a[p].setOffset(t));
          }
        },
        setAll: function setAll(t) {
          var e = t.interaction,
              n = t.statuses,
              i = t.preEnd,
              o = t.requireEndOnly,
              c = {
            dx: 0,
            dy: 0,
            changed: !1,
            locked: !1,
            shouldMove: !0
          };
          t.modifiedCoords = s({}, t.pageCoords);

          for (var l = 0; l < a.names.length; l++) {
            var p;
            p = a.names[l];
            var u = p,
                d = a[u],
                f = e.target.options[e.prepared.name][u];
            r(f, i, o) && (t.status = t.status = n[u], t.options = f, t.offset = t.interaction.modifierOffsets[u], d.set(t), t.status.locked && (t.modifiedCoords.x += t.status.dx, t.modifiedCoords.y += t.status.dy, c.dx += t.status.dx, c.dy += t.status.dy, c.locked = !0));
          }

          return c.shouldMove = !t.status || !c.locked || t.status.changed, c;
        },
        resetStatuses: function resetStatuses(t) {
          for (var e = 0; e < a.names.length; e++) {
            var n;
            n = a.names[e];
            var r = n,
                i = t[r] || {};
            i.dx = i.dy = 0, i.modifiedX = i.modifiedY = NaN, i.locked = !1, i.changed = !0, t[r] = i;
          }

          return t;
        },
        start: function start(t, e) {
          var n = t.interaction,
              r = {
            interaction: n,
            pageCoords: ("action-resume" === e ? n.curCoords : n.startCoords).page,
            startOffset: n.startOffset,
            statuses: n.modifierStatuses,
            preEnd: !1,
            requireEndOnly: !1
          };
          a.setOffsets(r), a.resetStatuses(r.statuses), r.pageCoords = s({}, n.startCoords.page), n.modifierResult = a.setAll(r);
        },
        beforeMove: function beforeMove(t) {
          var e = t.interaction,
              n = t.preEnd,
              r = t.interactingBeforeMove,
              i = a.setAll({
            interaction: e,
            preEnd: n,
            pageCoords: e.curCoords.page,
            statuses: e.modifierStatuses,
            requireEndOnly: !1
          });
          !i.shouldMove && r && (e._dontFireMove = !0), e.modifierResult = i;
        },
        end: function end(t) {
          for (var e = t.interaction, n = t.event, i = 0; i < a.names.length; i++) {
            var o;
            o = a.names[i];
            var s = o;

            if (r(e.target.options[e.prepared.name][s], !0, !0)) {
              e.doMove({
                event: n,
                preEnd: !0
              });
              break;
            }
          }
        },
        setXY: function setXY(t) {
          for (var e = t.iEvent, n = t.interaction, r = s({}, t), i = 0; i < a.names.length; i++) {
            var o = a.names[i];

            if (r.options = n.target.options[n.prepared.name][o], r.options) {
              var c = a[o];
              r.status = n.modifierStatuses[o], e[o] = c.modifyCoords(r);
            }
          }
        }
      };
      o.signals.on("new", function (t) {
        t.startOffset = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, t.modifierOffsets = {}, t.modifierStatuses = a.resetStatuses({}), t.modifierResult = null;
      }), o.signals.on("action-start", a.start), o.signals.on("action-resume", a.start), o.signals.on("before-action-move", a.beforeMove), o.signals.on("action-end", a.end), i.signals.on("set-xy", a.setXY), e.exports = a;
    }, {
      "../InteractEvent": 3,
      "../Interaction": 5,
      "../utils/extend": 41
    }],
    24: [function (t, e, n) {
      "use strict";

      function r(t, e, n) {
        return o.is.function(t) ? o.resolveRectLike(t, e.target, e.element, [n.x, n.y, e]) : o.resolveRectLike(t, e.target, e.element);
      }

      var i = t("./base"),
          o = t("../utils"),
          s = t("../defaultOptions"),
          a = {
        defaults: {
          enabled: !1,
          endOnly: !1,
          restriction: null,
          elementRect: null
        },
        setOffset: function setOffset(t) {
          var e = t.rect,
              n = t.startOffset,
              r = t.options,
              i = r && r.elementRect,
              o = {};
          return e && i ? (o.left = n.left - e.width * i.left, o.top = n.top - e.height * i.top, o.right = n.right - e.width * (1 - i.right), o.bottom = n.bottom - e.height * (1 - i.bottom)) : o.left = o.top = o.right = o.bottom = 0, o;
        },
        set: function set(t) {
          var e = t.modifiedCoords,
              n = t.interaction,
              i = t.status,
              s = t.options;
          if (!s) return i;
          var a = i.useStatusXY ? {
            x: i.x,
            y: i.y
          } : o.extend({}, e),
              c = r(s.restriction, n, a);
          if (!c) return i;
          i.dx = 0, i.dy = 0, i.locked = !1;
          var l = c,
              p = a.x,
              u = a.y,
              d = n.modifierOffsets.restrict;
          "x" in c && "y" in c ? (p = Math.max(Math.min(l.x + l.width - d.right, a.x), l.x + d.left), u = Math.max(Math.min(l.y + l.height - d.bottom, a.y), l.y + d.top)) : (p = Math.max(Math.min(l.right - d.right, a.x), l.left + d.left), u = Math.max(Math.min(l.bottom - d.bottom, a.y), l.top + d.top)), i.dx = p - a.x, i.dy = u - a.y, i.changed = i.modifiedX !== p || i.modifiedY !== u, i.locked = !(!i.dx && !i.dy), i.modifiedX = p, i.modifiedY = u;
        },
        modifyCoords: function modifyCoords(t) {
          var e = t.page,
              n = t.client,
              r = t.status,
              i = t.phase,
              o = t.options,
              s = o && o.elementRect;
          if (o && o.enabled && ("start" !== i || !s || !r.locked) && r.locked) return e.x += r.dx, e.y += r.dy, n.x += r.dx, n.y += r.dy, {
            dx: r.dx,
            dy: r.dy
          };
        },
        getRestrictionRect: r
      };
      i.restrict = a, i.names.push("restrict"), s.perAction.restrict = a.defaults, e.exports = a;
    }, {
      "../defaultOptions": 18,
      "../utils": 44,
      "./base": 23
    }],
    25: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("../utils"),
          o = t("../utils/rect"),
          s = t("../defaultOptions"),
          a = t("../actions/resize"),
          c = t("./restrict"),
          l = c.getRestrictionRect,
          p = {
        top: 1 / 0,
        left: 1 / 0,
        bottom: -1 / 0,
        right: -1 / 0
      },
          u = {
        top: -1 / 0,
        left: -1 / 0,
        bottom: 1 / 0,
        right: 1 / 0
      },
          d = {
        defaults: {
          enabled: !1,
          endOnly: !1,
          min: null,
          max: null,
          offset: null
        },
        setOffset: function setOffset(t) {
          var e = t.interaction,
              n = t.startOffset,
              r = t.options;
          if (!r) return i.extend({}, n);
          var o = l(r.offset, e, e.startCoords.page);
          return o ? {
            top: n.top + o.y,
            left: n.left + o.x,
            bottom: n.bottom + o.y,
            right: n.right + o.x
          } : n;
        },
        set: function set(t) {
          var e = t.modifiedCoords,
              n = t.interaction,
              r = t.status,
              s = t.offset,
              a = t.options,
              c = n.prepared.linkedEdges || n.prepared.edges;

          if (n.interacting() && c) {
            var d = r.useStatusXY ? {
              x: r.x,
              y: r.y
            } : i.extend({}, e),
                f = o.xywhToTlbr(l(a.inner, n, d)) || p,
                v = o.xywhToTlbr(l(a.outer, n, d)) || u,
                g = d.x,
                h = d.y;
            r.dx = 0, r.dy = 0, r.locked = !1, c.top ? h = Math.min(Math.max(v.top + s.top, d.y), f.top + s.top) : c.bottom && (h = Math.max(Math.min(v.bottom - s.bottom, d.y), f.bottom - s.bottom)), c.left ? g = Math.min(Math.max(v.left + s.left, d.x), f.left + s.left) : c.right && (g = Math.max(Math.min(v.right - s.right, d.x), f.right - s.right)), r.dx = g - d.x, r.dy = h - d.y, r.changed = r.modifiedX !== g || r.modifiedY !== h, r.locked = !(!r.dx && !r.dy), r.modifiedX = g, r.modifiedY = h;
          }
        },
        modifyCoords: function modifyCoords(t) {
          var e = t.page,
              n = t.client,
              r = t.status,
              i = t.phase,
              o = t.options;
          if (o && o.enabled && ("start" !== i || !r.locked) && r.locked) return e.x += r.dx, e.y += r.dy, n.x += r.dx, n.y += r.dy, {
            dx: r.dx,
            dy: r.dy
          };
        },
        noInner: p,
        noOuter: u,
        getRestrictionRect: l
      };
      r.restrictEdges = d, r.names.push("restrictEdges"), s.perAction.restrictEdges = d.defaults, a.defaults.restrictEdges = d.defaults, e.exports = d;
    }, {
      "../actions/resize": 10,
      "../defaultOptions": 18,
      "../utils": 44,
      "../utils/rect": 51,
      "./base": 23,
      "./restrict": 24
    }],
    26: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("./restrictEdges"),
          o = t("../utils"),
          s = t("../utils/rect"),
          a = t("../defaultOptions"),
          c = t("../actions/resize"),
          l = {
        width: -1 / 0,
        height: -1 / 0
      },
          p = {
        width: 1 / 0,
        height: 1 / 0
      },
          u = {
        defaults: {
          enabled: !1,
          endOnly: !1,
          min: null,
          max: null
        },
        setOffset: function setOffset(t) {
          return t.interaction.startOffset;
        },
        set: function set(t) {
          var e = t.interaction,
              n = t.options,
              r = e.prepared.linkedEdges || e.prepared.edges;

          if (e.interacting() && r) {
            var a = s.xywhToTlbr(e.resizeRects.inverted),
                c = s.tlbrToXywh(i.getRestrictionRect(n.min, e)) || l,
                u = s.tlbrToXywh(i.getRestrictionRect(n.max, e)) || p;
            t.options = {
              enabled: n.enabled,
              endOnly: n.endOnly,
              inner: o.extend({}, i.noInner),
              outer: o.extend({}, i.noOuter)
            }, r.top ? (t.options.inner.top = a.bottom - c.height, t.options.outer.top = a.bottom - u.height) : r.bottom && (t.options.inner.bottom = a.top + c.height, t.options.outer.bottom = a.top + u.height), r.left ? (t.options.inner.left = a.right - c.width, t.options.outer.left = a.right - u.width) : r.right && (t.options.inner.right = a.left + c.width, t.options.outer.right = a.left + u.width), i.set(t);
          }
        },
        modifyCoords: i.modifyCoords
      };
      r.restrictSize = u, r.names.push("restrictSize"), a.perAction.restrictSize = u.defaults, c.defaults.restrictSize = u.defaults, e.exports = u;
    }, {
      "../actions/resize": 10,
      "../defaultOptions": 18,
      "../utils": 44,
      "../utils/rect": 51,
      "./base": 23,
      "./restrictEdges": 25
    }],
    27: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("../interact"),
          o = t("../utils"),
          s = t("../defaultOptions"),
          a = {
        defaults: {
          enabled: !1,
          endOnly: !1,
          range: 1 / 0,
          targets: null,
          offsets: null,
          relativePoints: null
        },
        setOffset: function setOffset(t) {
          var e = t.interaction,
              n = t.interactable,
              r = t.element,
              i = t.rect,
              s = t.startOffset,
              a = t.options,
              c = [],
              l = o.rectToXY(o.resolveRectLike(a.origin)),
              p = l || o.getOriginXY(n, r, e.prepared.name);
          a = a || n.options[e.prepared.name].snap || {};
          var u = void 0;
          if ("startCoords" === a.offset) u = {
            x: e.startCoords.page.x - p.x,
            y: e.startCoords.page.y - p.y
          };else {
            var d = o.resolveRectLike(a.offset, n, r, [e]);
            u = o.rectToXY(d) || {
              x: 0,
              y: 0
            };
          }
          if (i && a.relativePoints && a.relativePoints.length) for (var f = 0; f < a.relativePoints.length; f++) {
            var v;
            v = a.relativePoints[f];
            var g = v,
                h = g.x,
                m = g.y;
            c.push({
              x: s.left - i.width * h + u.x,
              y: s.top - i.height * m + u.y
            });
          } else c.push(u);
          return c;
        },
        set: function set(t) {
          var e = t.interaction,
              n = t.modifiedCoords,
              r = t.status,
              i = t.options,
              s = t.offset,
              a = [],
              c = void 0,
              l = void 0,
              p = void 0;
          if (r.useStatusXY) l = {
            x: r.x,
            y: r.y
          };else {
            var u = o.getOriginXY(e.target, e.element, e.prepared.name);
            l = o.extend({}, n), l.x -= u.x, l.y -= u.y;
          }
          r.realX = l.x, r.realY = l.y;

          for (var d = i.targets ? i.targets.length : 0, f = 0; f < s.length; f++) {
            var v;
            v = s[f];

            for (var g = v, h = g.x, m = g.y, y = l.x - h, x = l.y - m, b = 0; b < (i.targets || []).length; b++) {
              var w;
              w = (i.targets || [])[b];
              var E = w;
              c = o.is.function(E) ? E(y, x, e) : E, c && a.push({
                x: o.is.number(c.x) ? c.x + h : y,
                y: o.is.number(c.y) ? c.y + m : x,
                range: o.is.number(c.range) ? c.range : i.range
              });
            }
          }

          var T = {
            target: null,
            inRange: !1,
            distance: 0,
            range: 0,
            dx: 0,
            dy: 0
          };

          for (p = 0, d = a.length; p < d; p++) {
            c = a[p];
            var S = c.range,
                C = c.x - l.x,
                I = c.y - l.y,
                D = o.hypot(C, I),
                O = D <= S;
            S === 1 / 0 && T.inRange && T.range !== 1 / 0 && (O = !1), T.target && !(O ? T.inRange && S !== 1 / 0 ? D / S < T.distance / T.range : S === 1 / 0 && T.range !== 1 / 0 || D < T.distance : !T.inRange && D < T.distance) || (T.target = c, T.distance = D, T.range = S, T.inRange = O, T.dx = C, T.dy = I, r.range = S);
          }

          var M = void 0;
          T.target ? (M = r.modifiedX !== T.target.x || r.modifiedY !== T.target.y, r.modifiedX = T.target.x, r.modifiedY = T.target.y) : (M = !0, r.modifiedX = NaN, r.modifiedY = NaN), r.dx = T.dx, r.dy = T.dy, r.changed = M || T.inRange && !r.locked, r.locked = T.inRange;
        },
        modifyCoords: function modifyCoords(t) {
          var e = t.page,
              n = t.client,
              r = t.status,
              i = t.phase,
              o = t.options,
              s = o && o.relativePoints;
          if (o && o.enabled && ("start" !== i || !s || !s.length)) return r.locked && (e.x += r.dx, e.y += r.dy, n.x += r.dx, n.y += r.dy), {
            range: r.range,
            locked: r.locked,
            x: r.modifiedX,
            y: r.modifiedY,
            realX: r.realX,
            realY: r.realY,
            dx: r.dx,
            dy: r.dy
          };
        }
      };
      i.createSnapGrid = function (t) {
        return function (e, n) {
          var r = t.limits || {
            left: -1 / 0,
            right: 1 / 0,
            top: -1 / 0,
            bottom: 1 / 0
          },
              i = 0,
              s = 0;
          o.is.object(t.offset) && (i = t.offset.x, s = t.offset.y);
          var a = Math.round((e - i) / t.x),
              c = Math.round((n - s) / t.y);
          return {
            x: Math.max(r.left, Math.min(r.right, a * t.x + i)),
            y: Math.max(r.top, Math.min(r.bottom, c * t.y + s)),
            range: t.range
          };
        };
      }, r.snap = a, r.names.push("snap"), s.perAction.snap = a.defaults, e.exports = a;
    }, {
      "../defaultOptions": 18,
      "../interact": 21,
      "../utils": 44,
      "./base": 23
    }],
    28: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("./snap"),
          o = t("../defaultOptions"),
          s = t("../actions/resize"),
          a = t("../utils/"),
          c = {
        defaults: {
          enabled: !1,
          endOnly: !1,
          range: 1 / 0,
          targets: null,
          offsets: null
        },
        setOffset: function setOffset(t) {
          var e = t.interaction,
              n = t.options,
              r = e.prepared.edges;

          if (r) {
            t.options = {
              relativePoints: [{
                x: r.left ? 0 : 1,
                y: r.top ? 0 : 1
              }],
              origin: {
                x: 0,
                y: 0
              },
              offset: "self",
              range: n.range
            };
            var o = i.setOffset(t);
            return t.options = n, o;
          }
        },
        set: function set(t) {
          var e = t.interaction,
              n = t.options,
              r = t.offset,
              o = t.modifiedCoords,
              s = a.extend({}, o),
              c = s.x - r[0].x,
              l = s.y - r[0].y;
          t.options = a.extend({}, n), t.options.targets = [];

          for (var p = 0; p < (n.targets || []).length; p++) {
            var u;
            u = (n.targets || [])[p];
            var d = u,
                f = void 0;
            f = a.is.function(d) ? d(c, l, e) : d, f && ("width" in f && "height" in f && (f.x = f.width, f.y = f.height), t.options.targets.push(f));
          }

          i.set(t);
        },
        modifyCoords: function modifyCoords(t) {
          var e = t.options;
          t.options = a.extend({}, e), t.options.enabled = e.enabled, t.options.relativePoints = [null], i.modifyCoords(t);
        }
      };
      r.snapSize = c, r.names.push("snapSize"), o.perAction.snapSize = c.defaults, s.defaults.snapSize = c.defaults, e.exports = c;
    }, {
      "../actions/resize": 10,
      "../defaultOptions": 18,
      "../utils/": 44,
      "./base": 23,
      "./snap": 27
    }],
    29: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      var i = t("../utils/pointerUtils");

      e.exports = function () {
        function t(e, n, o, s, a) {
          if (r(this, t), i.pointerExtend(this, o), o !== n && i.pointerExtend(this, n), this.interaction = a, this.timeStamp = new Date().getTime(), this.originalEvent = o, this.type = e, this.pointerId = i.getPointerId(n), this.pointerType = i.getPointerType(n), this.target = s, this.currentTarget = null, "tap" === e) {
            var c = a.getPointerIndex(n);
            this.dt = this.timeStamp - a.downTimes[c];
            var l = this.timeStamp - a.tapTime;
            this.double = !!(a.prevTap && "doubletap" !== a.prevTap.type && a.prevTap.target === this.target && l < 500);
          } else "doubletap" === e && (this.dt = n.timeStamp - a.tapTime);
        }

        return t.prototype.subtractOrigin = function (t) {
          var e = t.x,
              n = t.y;
          return this.pageX -= e, this.pageY -= n, this.clientX -= e, this.clientY -= n, this;
        }, t.prototype.addOrigin = function (t) {
          var e = t.x,
              n = t.y;
          return this.pageX += e, this.pageY += n, this.clientX += e, this.clientY += n, this;
        }, t.prototype.preventDefault = function () {
          this.originalEvent.preventDefault();
        }, t.prototype.stopPropagation = function () {
          this.propagationStopped = !0;
        }, t.prototype.stopImmediatePropagation = function () {
          this.immediatePropagationStopped = this.propagationStopped = !0;
        }, t;
      }();
    }, {
      "../utils/pointerUtils": 49
    }],
    30: [function (t, e, n) {
      "use strict";

      function r(t) {
        for (var e = t.interaction, n = t.pointer, s = t.event, c = t.eventTarget, p = t.type, u = void 0 === p ? t.pointerEvent.type : p, d = t.targets, f = void 0 === d ? i(t) : d, v = t.pointerEvent, g = void 0 === v ? new o(u, n, s, c, e) : v, h = {
          interaction: e,
          pointer: n,
          event: s,
          eventTarget: c,
          targets: f,
          type: u,
          pointerEvent: g
        }, m = 0; m < f.length; m++) {
          var y = f[m];

          for (var x in y.props || {}) g[x] = y.props[x];

          var b = a.getOriginXY(y.eventable, y.element);
          if (g.subtractOrigin(b), g.eventable = y.eventable, g.currentTarget = y.element, y.eventable.fire(g), g.addOrigin(b), g.immediatePropagationStopped || g.propagationStopped && m + 1 < f.length && f[m + 1].element !== g.currentTarget) break;
        }

        if (l.fire("fired", h), "tap" === u) {
          var w = g.double ? r({
            interaction: e,
            pointer: n,
            event: s,
            eventTarget: c,
            type: "doubletap"
          }) : g;
          e.prevTap = w, e.tapTime = w.timeStamp;
        }

        return g;
      }

      function i(t) {
        var e = t.interaction,
            n = t.pointer,
            r = t.event,
            i = t.eventTarget,
            o = t.type,
            s = e.getPointerIndex(n);
        if ("tap" === o && (e.pointerWasMoved || !e.downTargets[s] || e.downTargets[s] !== i)) return [];

        for (var c = a.getPath(i), p = {
          interaction: e,
          pointer: n,
          event: r,
          eventTarget: i,
          type: o,
          path: c,
          targets: [],
          element: null
        }, u = 0; u < c.length; u++) {
          var d;
          d = c[u];
          var f = d;
          p.element = f, l.fire("collect-targets", p);
        }

        return "hold" === o && (p.targets = p.targets.filter(function (t) {
          return t.eventable.options.holdDuration === e.holdTimers[s].duration;
        })), p.targets;
      }

      var o = t("./PointerEvent"),
          s = t("../Interaction"),
          a = t("../utils"),
          c = t("../defaultOptions"),
          l = t("../utils/Signals").new(),
          p = ["down", "up", "cancel"],
          u = ["down", "up", "cancel"],
          d = {
        PointerEvent: o,
        fire: r,
        collectEventTargets: i,
        signals: l,
        defaults: {
          holdDuration: 600,
          ignoreFrom: null,
          allowFrom: null,
          origin: {
            x: 0,
            y: 0
          }
        },
        types: ["down", "move", "up", "cancel", "tap", "doubletap", "hold"]
      };
      s.signals.on("update-pointer-down", function (t) {
        var e = t.interaction,
            n = t.pointerIndex;
        e.holdTimers[n] = {
          duration: 1 / 0,
          timeout: null
        };
      }), s.signals.on("remove-pointer", function (t) {
        var e = t.interaction,
            n = t.pointerIndex;
        e.holdTimers.splice(n, 1);
      }), s.signals.on("move", function (t) {
        var e = t.interaction,
            n = t.pointer,
            i = t.event,
            o = t.eventTarget,
            s = t.duplicateMove,
            a = e.getPointerIndex(n);
        s || e.pointerIsDown && !e.pointerWasMoved || (e.pointerIsDown && clearTimeout(e.holdTimers[a].timeout), r({
          interaction: e,
          pointer: n,
          event: i,
          eventTarget: o,
          type: "move"
        }));
      }), s.signals.on("down", function (t) {
        for (var e = t.interaction, n = t.pointer, i = t.event, o = t.eventTarget, s = t.pointerIndex, c = e.holdTimers[s], p = a.getPath(o), u = {
          interaction: e,
          pointer: n,
          event: i,
          eventTarget: o,
          type: "hold",
          targets: [],
          path: p,
          element: null
        }, d = 0; d < p.length; d++) {
          var f;
          f = p[d];
          var v = f;
          u.element = v, l.fire("collect-targets", u);
        }

        if (u.targets.length) {
          for (var g = 1 / 0, h = 0; h < u.targets.length; h++) {
            var m;
            m = u.targets[h];
            var y = m,
                x = y.eventable.options.holdDuration;
            x < g && (g = x);
          }

          c.duration = g, c.timeout = setTimeout(function () {
            r({
              interaction: e,
              eventTarget: o,
              pointer: n,
              event: i,
              type: "hold"
            });
          }, g);
        }
      }), s.signals.on("up", function (t) {
        var e = t.interaction,
            n = t.pointer,
            i = t.event,
            o = t.eventTarget;
        e.pointerWasMoved || r({
          interaction: e,
          eventTarget: o,
          pointer: n,
          event: i,
          type: "tap"
        });
      });

      for (var f = ["up", "cancel"], v = 0; v < f.length; v++) {
        var g = f[v];
        s.signals.on(g, function (t) {
          var e = t.interaction,
              n = t.pointerIndex;
          e.holdTimers[n] && clearTimeout(e.holdTimers[n].timeout);
        });
      }

      for (var h = 0; h < p.length; h++) s.signals.on(p[h], function (t) {
        return function (e) {
          var n = e.interaction,
              i = e.pointer,
              o = e.event;
          r({
            interaction: n,
            eventTarget: e.eventTarget,
            pointer: i,
            event: o,
            type: t
          });
        };
      }(u[h]));

      s.signals.on("new", function (t) {
        t.prevTap = null, t.tapTime = 0, t.holdTimers = [];
      }), c.pointerEvents = d.defaults, e.exports = d;
    }, {
      "../Interaction": 5,
      "../defaultOptions": 18,
      "../utils": 44,
      "../utils/Signals": 34,
      "./PointerEvent": 29
    }],
    31: [function (t, e, n) {
      "use strict";

      function r(t) {
        var e = t.pointerEvent;
        "hold" === e.type && (e.count = (e.count || 0) + 1);
      }

      function i(t) {
        var e = t.interaction,
            n = t.pointerEvent,
            r = t.eventTarget,
            i = t.targets;

        if ("hold" === n.type && i.length) {
          var o = i[0].eventable.options.holdRepeatInterval;
          o <= 0 || (e.holdIntervalHandle = setTimeout(function () {
            s.fire({
              interaction: e,
              eventTarget: r,
              type: "hold",
              pointer: n,
              event: n
            });
          }, o));
        }
      }

      function o(t) {
        var e = t.interaction;
        e.holdIntervalHandle && (clearInterval(e.holdIntervalHandle), e.holdIntervalHandle = null);
      }

      var s = t("./base"),
          a = t("../Interaction");
      s.signals.on("new", r), s.signals.on("fired", i);

      for (var c = ["move", "up", "cancel", "endall"], l = 0; l < c.length; l++) {
        var p = c[l];
        a.signals.on(p, o);
      }

      s.defaults.holdRepeatInterval = 0, s.types.push("holdrepeat"), e.exports = {
        onNew: r,
        onFired: i,
        endHoldRepeat: o
      };
    }, {
      "../Interaction": 5,
      "./base": 30
    }],
    32: [function (t, e, n) {
      "use strict";

      var r = t("./base"),
          i = t("../Interactable"),
          o = t("../utils/is"),
          s = t("../scope"),
          a = t("../utils/extend"),
          c = t("../utils/arr"),
          l = c.merge;
      r.signals.on("collect-targets", function (t) {
        var e = t.targets,
            n = t.element,
            r = t.type,
            i = t.eventTarget;
        s.interactables.forEachMatch(n, function (t) {
          var s = t.events,
              a = s.options;
          s[r] && o.element(n) && t.testIgnoreAllow(a, n, i) && e.push({
            element: n,
            eventable: s,
            props: {
              interactable: t
            }
          });
        });
      }), i.signals.on("new", function (t) {
        var e = t.interactable;

        e.events.getRect = function (t) {
          return e.getRect(t);
        };
      }), i.signals.on("set", function (t) {
        var e = t.interactable,
            n = t.options;
        a(e.events.options, r.defaults), a(e.events.options, n);
      }), l(i.eventTypes, r.types), i.prototype.pointerEvents = function (t) {
        return a(this.events.options, t), this;
      };
      var p = i.prototype._backCompatOption;
      i.prototype._backCompatOption = function (t, e) {
        var n = p.call(this, t, e);
        return n === this && (this.events.options[t] = e), n;
      }, i.settingsMethods.push("pointerEvents");
    }, {
      "../Interactable": 4,
      "../scope": 33,
      "../utils/arr": 35,
      "../utils/extend": 41,
      "../utils/is": 46,
      "./base": 30
    }],
    33: [function (t, e, n) {
      "use strict";

      var r = t("./utils"),
          i = t("./utils/events"),
          o = t("./utils/Signals").new(),
          s = t("./utils/window"),
          a = s.getWindow,
          c = {
        signals: o,
        events: i,
        utils: r,
        document: t("./utils/domObjects").document,
        documents: [],
        addDocument: function addDocument(t, e) {
          if (r.contains(c.documents, t)) return !1;
          e = e || a(t), c.documents.push(t), i.documents.push(t), t !== c.document && i.add(e, "unload", c.onWindowUnload), o.fire("add-document", {
            doc: t,
            win: e
          });
        },
        removeDocument: function removeDocument(t, e) {
          var n = c.documents.indexOf(t);
          e = e || a(t), i.remove(e, "unload", c.onWindowUnload), c.documents.splice(n, 1), i.documents.splice(n, 1), o.fire("remove-document", {
            win: e,
            doc: t
          });
        },
        onWindowUnload: function onWindowUnload() {
          c.removeDocument(this.document, this);
        }
      };
      e.exports = c;
    }, {
      "./utils": 44,
      "./utils/Signals": 34,
      "./utils/domObjects": 38,
      "./utils/events": 40,
      "./utils/window": 52
    }],
    34: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      var i = function () {
        function t() {
          r(this, t), this.listeners = {};
        }

        return t.prototype.on = function (t, e) {
          if (!this.listeners[t]) return void (this.listeners[t] = [e]);
          this.listeners[t].push(e);
        }, t.prototype.off = function (t, e) {
          if (this.listeners[t]) {
            var n = this.listeners[t].indexOf(e);
            -1 !== n && this.listeners[t].splice(n, 1);
          }
        }, t.prototype.fire = function (t, e) {
          var n = this.listeners[t];
          if (n) for (var r = 0; r < n.length; r++) {
            var i;
            i = n[r];
            var o = i;
            if (!1 === o(e, t)) return;
          }
        }, t;
      }();

      i.new = function () {
        return new i();
      }, e.exports = i;
    }, {}],
    35: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        return -1 !== t.indexOf(e);
      }

      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r;
          r = e[n];
          var i = r;
          t.push(i);
        }

        return t;
      }

      e.exports = {
        contains: r,
        merge: i
      };
    }, {}],
    36: [function (t, e, n) {
      "use strict";

      var r = t("./window"),
          i = r.window,
          o = t("./is"),
          s = t("./domObjects"),
          a = s.Element,
          c = i.navigator,
          l = {
        supportsTouch: !!("ontouchstart" in i || o.function(i.DocumentTouch) && s.document instanceof i.DocumentTouch),
        supportsPointerEvent: !!s.PointerEvent,
        isIOS: /iP(hone|od|ad)/.test(c.platform),
        isIOS7: /iP(hone|od|ad)/.test(c.platform) && /OS 7[^\d]/.test(c.appVersion),
        isIe9: /MSIE 9/.test(c.userAgent),
        prefixedMatchesSelector: "matches" in a.prototype ? "matches" : "webkitMatchesSelector" in a.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in a.prototype ? "mozMatchesSelector" : "oMatchesSelector" in a.prototype ? "oMatchesSelector" : "msMatchesSelector",
        pEventTypes: s.PointerEvent ? s.PointerEvent === i.MSPointerEvent ? {
          up: "MSPointerUp",
          down: "MSPointerDown",
          over: "mouseover",
          out: "mouseout",
          move: "MSPointerMove",
          cancel: "MSPointerCancel"
        } : {
          up: "pointerup",
          down: "pointerdown",
          over: "pointerover",
          out: "pointerout",
          move: "pointermove",
          cancel: "pointercancel"
        } : null,
        wheelEvent: "onmousewheel" in s.document ? "mousewheel" : "wheel"
      };
      l.isOperaMobile = "Opera" === c.appName && l.supportsTouch && c.userAgent.match("Presto"), e.exports = l;
    }, {
      "./domObjects": 38,
      "./is": 46,
      "./window": 52
    }],
    37: [function (t, e, n) {
      "use strict";

      var r = t("./is");

      e.exports = function t(e) {
        var n = {};

        for (var i in e) r.plainObject(e[i]) ? n[i] = t(e[i]) : n[i] = e[i];

        return n;
      };
    }, {
      "./is": 46
    }],
    38: [function (t, e, n) {
      "use strict";

      function r() {}

      var i = {},
          o = t("./window").window;
      i.document = o.document, i.DocumentFragment = o.DocumentFragment || r, i.SVGElement = o.SVGElement || r, i.SVGSVGElement = o.SVGSVGElement || r, i.SVGElementInstance = o.SVGElementInstance || r, i.Element = o.Element || r, i.HTMLElement = o.HTMLElement || i.Element, i.Event = o.Event, i.Touch = o.Touch || r, i.PointerEvent = o.PointerEvent || o.MSPointerEvent, e.exports = i;
    }, {
      "./window": 52
    }],
    39: [function (t, e, n) {
      "use strict";

      var r = t("./window"),
          i = t("./browser"),
          o = t("./is"),
          s = t("./domObjects"),
          a = {
        nodeContains: function nodeContains(t, e) {
          for (; e;) {
            if (e === t) return !0;
            e = e.parentNode;
          }

          return !1;
        },
        closest: function closest(t, e) {
          for (; o.element(t);) {
            if (a.matchesSelector(t, e)) return t;
            t = a.parentNode(t);
          }

          return null;
        },
        parentNode: function parentNode(t) {
          var e = t.parentNode;

          if (o.docFrag(e)) {
            for (; (e = e.host) && o.docFrag(e););

            return e;
          }

          return e;
        },
        matchesSelector: function matchesSelector(t, e) {
          return r.window !== r.realWindow && (e = e.replace(/\/deep\//g, " ")), t[i.prefixedMatchesSelector](e);
        },
        indexOfDeepestElement: function indexOfDeepestElement(t) {
          var e = [],
              n = [],
              r = void 0,
              i = t[0],
              o = i ? 0 : -1,
              a = void 0,
              c = void 0,
              l = void 0,
              p = void 0;

          for (l = 1; l < t.length; l++) if ((r = t[l]) && r !== i) if (i) {
            if (r.parentNode !== r.ownerDocument) if (i.parentNode !== r.ownerDocument) {
              if (!e.length) for (a = i; a.parentNode && a.parentNode !== a.ownerDocument;) e.unshift(a), a = a.parentNode;

              if (i instanceof s.HTMLElement && r instanceof s.SVGElement && !(r instanceof s.SVGSVGElement)) {
                if (r === i.parentNode) continue;
                a = r.ownerSVGElement;
              } else a = r;

              for (n = []; a.parentNode !== a.ownerDocument;) n.unshift(a), a = a.parentNode;

              for (p = 0; n[p] && n[p] === e[p];) p++;

              var u = [n[p - 1], n[p], e[p]];

              for (c = u[0].lastChild; c;) {
                if (c === u[1]) {
                  i = r, o = l, e = [];
                  break;
                }

                if (c === u[2]) break;
                c = c.previousSibling;
              }
            } else i = r, o = l;
          } else i = r, o = l;

          return o;
        },
        matchesUpTo: function matchesUpTo(t, e, n) {
          for (; o.element(t);) {
            if (a.matchesSelector(t, e)) return !0;
            if ((t = a.parentNode(t)) === n) return a.matchesSelector(t, e);
          }

          return !1;
        },
        getActualElement: function getActualElement(t) {
          return t instanceof s.SVGElementInstance ? t.correspondingUseElement : t;
        },
        getScrollXY: function getScrollXY(t) {
          return t = t || r.window, {
            x: t.scrollX || t.document.documentElement.scrollLeft,
            y: t.scrollY || t.document.documentElement.scrollTop
          };
        },
        getElementClientRect: function getElementClientRect(t) {
          var e = t instanceof s.SVGElement ? t.getBoundingClientRect() : t.getClientRects()[0];
          return e && {
            left: e.left,
            right: e.right,
            top: e.top,
            bottom: e.bottom,
            width: e.width || e.right - e.left,
            height: e.height || e.bottom - e.top
          };
        },
        getElementRect: function getElementRect(t) {
          var e = a.getElementClientRect(t);

          if (!i.isIOS7 && e) {
            var n = a.getScrollXY(r.getWindow(t));
            e.left += n.x, e.right += n.x, e.top += n.y, e.bottom += n.y;
          }

          return e;
        },
        getPath: function getPath(t) {
          for (var e = []; t;) e.push(t), t = a.parentNode(t);

          return e;
        },
        trySelector: function trySelector(t) {
          return !!o.string(t) && (s.document.querySelector(t), !0);
        }
      };
      e.exports = a;
    }, {
      "./browser": 36,
      "./domObjects": 38,
      "./is": 46,
      "./window": 52
    }],
    40: [function (t, e, n) {
      "use strict";

      function r(t, e, n, r) {
        var i = p(r),
            o = x.indexOf(t),
            s = b[o];
        s || (s = {
          events: {},
          typeCount: 0
        }, o = x.push(t) - 1, b.push(s)), s.events[e] || (s.events[e] = [], s.typeCount++), y(s.events[e], n) || (t.addEventListener(e, n, T ? i : !!i.capture), s.events[e].push(n));
      }

      function i(t, e, n, r) {
        var o = p(r),
            s = x.indexOf(t),
            a = b[s];
        if (a && a.events) if ("all" !== e) {
          if (a.events[e]) {
            var c = a.events[e].length;

            if ("all" === n) {
              for (var l = 0; l < c; l++) i(t, e, a.events[e][l], o);

              return;
            }

            for (var u = 0; u < c; u++) if (a.events[e][u] === n) {
              t.removeEventListener("on" + e, n, T ? o : !!o.capture), a.events[e].splice(u, 1);
              break;
            }

            a.events[e] && 0 === a.events[e].length && (a.events[e] = null, a.typeCount--);
          }

          a.typeCount || (b.splice(s, 1), x.splice(s, 1));
        } else for (e in a.events) a.events.hasOwnProperty(e) && i(t, e, "all");
      }

      function o(t, e, n, i, o) {
        var s = p(o);

        if (!w[n]) {
          w[n] = {
            selectors: [],
            contexts: [],
            listeners: []
          };

          for (var l = 0; l < E.length; l++) {
            var u = E[l];
            r(u, n, a), r(u, n, c, !0);
          }
        }

        var d = w[n],
            f = void 0;

        for (f = d.selectors.length - 1; f >= 0 && (d.selectors[f] !== t || d.contexts[f] !== e); f--);

        -1 === f && (f = d.selectors.length, d.selectors.push(t), d.contexts.push(e), d.listeners.push([])), d.listeners[f].push([i, !!s.capture, s.passive]);
      }

      function s(t, e, n, r, o) {
        var s = p(o),
            l = w[n],
            u = !1,
            d = void 0;
        if (l) for (d = l.selectors.length - 1; d >= 0; d--) if (l.selectors[d] === t && l.contexts[d] === e) {
          for (var f = l.listeners[d], v = f.length - 1; v >= 0; v--) {
            var g = f[v],
                h = g[0],
                m = g[1],
                y = g[2];

            if (h === r && m === !!s.capture && y === s.passive) {
              f.splice(v, 1), f.length || (l.selectors.splice(d, 1), l.contexts.splice(d, 1), l.listeners.splice(d, 1), i(e, n, a), i(e, n, c, !0), l.selectors.length || (w[n] = null)), u = !0;
              break;
            }
          }

          if (u) break;
        }
      }

      function a(t, e) {
        var n = p(e),
            r = {},
            i = w[t.type],
            o = f.getEventTargets(t),
            s = o[0],
            a = s;

        for (v(r, t), r.originalEvent = t, r.preventDefault = l; u.element(a);) {
          for (var c = 0; c < i.selectors.length; c++) {
            var g = i.selectors[c],
                h = i.contexts[c];

            if (d.matchesSelector(a, g) && d.nodeContains(h, s) && d.nodeContains(h, a)) {
              var m = i.listeners[c];
              r.currentTarget = a;

              for (var y = 0; y < m.length; y++) {
                var x = m[y],
                    b = x[0],
                    E = x[1],
                    T = x[2];
                E === !!n.capture && T === n.passive && b(r);
              }
            }
          }

          a = d.parentNode(a);
        }
      }

      function c(t) {
        return a.call(this, t, !0);
      }

      function l() {
        this.originalEvent.preventDefault();
      }

      function p(t) {
        return u.object(t) ? t : {
          capture: t
        };
      }

      var u = t("./is"),
          d = t("./domUtils"),
          f = t("./pointerUtils"),
          v = t("./pointerExtend"),
          g = t("./window"),
          h = g.window,
          m = t("./arr"),
          y = m.contains,
          x = [],
          b = [],
          w = {},
          E = [],
          T = function () {
        var t = !1;
        return h.document.createElement("div").addEventListener("test", null, {
          get capture() {
            t = !0;
          }

        }), t;
      }();

      e.exports = {
        add: r,
        remove: i,
        addDelegate: o,
        removeDelegate: s,
        delegateListener: a,
        delegateUseCapture: c,
        delegatedEvents: w,
        documents: E,
        supportsOptions: T,
        _elements: x,
        _targets: b
      };
    }, {
      "./arr": 35,
      "./domUtils": 39,
      "./is": 46,
      "./pointerExtend": 48,
      "./pointerUtils": 49,
      "./window": 52
    }],
    41: [function (t, e, n) {
      "use strict";

      e.exports = function (t, e) {
        for (var n in e) t[n] = e[n];

        return t;
      };
    }, {}],
    42: [function (t, e, n) {
      "use strict";

      var r = t("./rect"),
          i = r.resolveRectLike,
          o = r.rectToXY;

      e.exports = function (t, e, n) {
        var r = t.options[n],
            s = r && r.origin,
            a = s || t.options.origin,
            c = i(a, t, e, [t && e]);
        return o(c) || {
          x: 0,
          y: 0
        };
      };
    }, {
      "./rect": 51
    }],
    43: [function (t, e, n) {
      "use strict";

      e.exports = function (t, e) {
        return Math.sqrt(t * t + e * e);
      };
    }, {}],
    44: [function (t, e, n) {
      "use strict";

      var r = t("./extend"),
          i = t("./window"),
          o = {
        warnOnce: function warnOnce(t, e) {
          var n = !1;
          return function () {
            return n || (i.window.console.warn(e), n = !0), t.apply(this, arguments);
          };
        },
        _getQBezierValue: function _getQBezierValue(t, e, n, r) {
          var i = 1 - t;
          return i * i * e + 2 * i * t * n + t * t * r;
        },
        getQuadraticCurvePoint: function getQuadraticCurvePoint(t, e, n, r, i, s, a) {
          return {
            x: o._getQBezierValue(a, t, n, i),
            y: o._getQBezierValue(a, e, r, s)
          };
        },
        easeOutQuad: function easeOutQuad(t, e, n, r) {
          return t /= r, -n * t * (t - 2) + e;
        },
        copyAction: function copyAction(t, e) {
          return t.name = e.name, t.axis = e.axis, t.edges = e.edges, t;
        },
        is: t("./is"),
        extend: r,
        hypot: t("./hypot"),
        getOriginXY: t("./getOriginXY")
      };
      r(o, t("./arr")), r(o, t("./domUtils")), r(o, t("./pointerUtils")), r(o, t("./rect")), e.exports = o;
    }, {
      "./arr": 35,
      "./domUtils": 39,
      "./extend": 41,
      "./getOriginXY": 42,
      "./hypot": 43,
      "./is": 46,
      "./pointerUtils": 49,
      "./rect": 51,
      "./window": 52
    }],
    45: [function (t, e, n) {
      "use strict";

      var r = t("../scope"),
          i = t("./index"),
          o = {
        methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
        search: function search(t, e, n) {
          for (var r = i.getPointerType(t), s = i.getPointerId(t), a = {
            pointer: t,
            pointerId: s,
            pointerType: r,
            eventType: e,
            eventTarget: n
          }, c = 0; c < o.methodOrder.length; c++) {
            var l;
            l = o.methodOrder[c];
            var p = l,
                u = o[p](a);
            if (u) return u;
          }
        },
        simulationResume: function simulationResume(t) {
          var e = t.pointerType,
              n = t.eventType,
              o = t.eventTarget;
          if (!/down|start/i.test(n)) return null;

          for (var s = 0; s < r.interactions.length; s++) {
            var a;
            a = r.interactions[s];
            var c = a,
                l = o;
            if (c.simulation && c.simulation.allowResume && c.pointerType === e) for (; l;) {
              if (l === c.element) return c;
              l = i.parentNode(l);
            }
          }

          return null;
        },
        mouseOrPen: function mouseOrPen(t) {
          var e = t.pointerId,
              n = t.pointerType,
              o = t.eventType;
          if ("mouse" !== n && "pen" !== n) return null;

          for (var s = void 0, a = 0; a < r.interactions.length; a++) {
            var c;
            c = r.interactions[a];
            var l = c;

            if (l.pointerType === n) {
              if (l.simulation && !i.contains(l.pointerIds, e)) continue;
              if (l.interacting()) return l;
              s || (s = l);
            }
          }

          if (s) return s;

          for (var p = 0; p < r.interactions.length; p++) {
            var u;
            u = r.interactions[p];
            var d = u;
            if (!(d.pointerType !== n || /down/i.test(o) && d.simulation)) return d;
          }

          return null;
        },
        hasPointer: function hasPointer(t) {
          for (var e = t.pointerId, n = 0; n < r.interactions.length; n++) {
            var o;
            o = r.interactions[n];
            var s = o;
            if (i.contains(s.pointerIds, e)) return s;
          }
        },
        idle: function idle(t) {
          for (var e = t.pointerType, n = 0; n < r.interactions.length; n++) {
            var i;
            i = r.interactions[n];
            var o = i;

            if (1 === o.pointerIds.length) {
              var s = o.target;
              if (s && !s.options.gesture.enabled) continue;
            } else if (o.pointerIds.length >= 2) continue;

            if (!o.interacting() && e === o.pointerType) return o;
          }

          return null;
        }
      };
      e.exports = o;
    }, {
      "../scope": 33,
      "./index": 44
    }],
    46: [function (t, e, n) {
      "use strict";

      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      },
          i = t("./window"),
          o = t("./isWindow"),
          s = {
        array: function array() {},
        window: function window(t) {
          return t === i.window || o(t);
        },
        docFrag: function docFrag(t) {
          return s.object(t) && 11 === t.nodeType;
        },
        object: function object(t) {
          return !!t && "object" === (void 0 === t ? "undefined" : r(t));
        },
        function: function _function(t) {
          return "function" == typeof t;
        },
        number: function number(t) {
          return "number" == typeof t;
        },
        bool: function bool(t) {
          return "boolean" == typeof t;
        },
        string: function string(t) {
          return "string" == typeof t;
        },
        element: function element(t) {
          if (!t || "object" !== (void 0 === t ? "undefined" : r(t))) return !1;
          var e = i.getWindow(t) || i.window;
          return /object|function/.test(r(e.Element)) ? t instanceof e.Element : 1 === t.nodeType && "string" == typeof t.nodeName;
        },
        plainObject: function plainObject(t) {
          return s.object(t) && "Object" === t.constructor.name;
        }
      };
      s.array = function (t) {
        return s.object(t) && void 0 !== t.length && s.function(t.splice);
      }, e.exports = s;
    }, {
      "./isWindow": 47,
      "./window": 52
    }],
    47: [function (t, e, n) {
      "use strict";

      e.exports = function (t) {
        return !(!t || !t.Window) && t instanceof t.Window;
      };
    }, {}],
    48: [function (t, e, n) {
      "use strict";

      function r(t, n) {
        for (var r in n) {
          var i = e.exports.prefixedPropREs,
              o = !1;

          for (var s in i) if (0 === r.indexOf(s) && i[s].test(r)) {
            o = !0;
            break;
          }

          o || "function" == typeof n[r] || (t[r] = n[r]);
        }

        return t;
      }

      r.prefixedPropREs = {
        webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
      }, e.exports = r;
    }, {}],
    49: [function (t, e, n) {
      "use strict";

      var r = t("./hypot"),
          i = t("./browser"),
          o = t("./domObjects"),
          s = t("./domUtils"),
          a = t("./domObjects"),
          c = t("./is"),
          l = t("./pointerExtend"),
          p = {
        copyCoords: function copyCoords(t, e) {
          t.page = t.page || {}, t.page.x = e.page.x, t.page.y = e.page.y, t.client = t.client || {}, t.client.x = e.client.x, t.client.y = e.client.y, t.timeStamp = e.timeStamp;
        },
        setCoordDeltas: function setCoordDeltas(t, e, n) {
          t.page.x = n.page.x - e.page.x, t.page.y = n.page.y - e.page.y, t.client.x = n.client.x - e.client.x, t.client.y = n.client.y - e.client.y, t.timeStamp = n.timeStamp - e.timeStamp;
          var i = Math.max(t.timeStamp / 1e3, .001);
          t.page.speed = r(t.page.x, t.page.y) / i, t.page.vx = t.page.x / i, t.page.vy = t.page.y / i, t.client.speed = r(t.client.x, t.page.y) / i, t.client.vx = t.client.x / i, t.client.vy = t.client.y / i;
        },
        isNativePointer: function isNativePointer(t) {
          return t instanceof o.Event || t instanceof o.Touch;
        },
        getXY: function getXY(t, e, n) {
          return n = n || {}, t = t || "page", n.x = e[t + "X"], n.y = e[t + "Y"], n;
        },
        getPageXY: function getPageXY(t, e) {
          return e = e || {}, i.isOperaMobile && p.isNativePointer(t) ? (p.getXY("screen", t, e), e.x += window.scrollX, e.y += window.scrollY) : p.getXY("page", t, e), e;
        },
        getClientXY: function getClientXY(t, e) {
          return e = e || {}, i.isOperaMobile && p.isNativePointer(t) ? p.getXY("screen", t, e) : p.getXY("client", t, e), e;
        },
        getPointerId: function getPointerId(t) {
          return c.number(t.pointerId) ? t.pointerId : t.identifier;
        },
        setCoords: function setCoords(t, e, n) {
          var r = e.length > 1 ? p.pointerAverage(e) : e[0],
              i = {};
          p.getPageXY(r, i), t.page.x = i.x, t.page.y = i.y, p.getClientXY(r, i), t.client.x = i.x, t.client.y = i.y, t.timeStamp = c.number(n) ? n : new Date().getTime();
        },
        pointerExtend: l,
        getTouchPair: function getTouchPair(t) {
          var e = [];
          return c.array(t) ? (e[0] = t[0], e[1] = t[1]) : "touchend" === t.type ? 1 === t.touches.length ? (e[0] = t.touches[0], e[1] = t.changedTouches[0]) : 0 === t.touches.length && (e[0] = t.changedTouches[0], e[1] = t.changedTouches[1]) : (e[0] = t.touches[0], e[1] = t.touches[1]), e;
        },
        pointerAverage: function pointerAverage(t) {
          for (var e = {
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0
          }, n = 0; n < t.length; n++) {
            var r;
            r = t[n];
            var i = r;

            for (var o in e) e[o] += i[o];
          }

          for (var s in e) e[s] /= t.length;

          return e;
        },
        touchBBox: function touchBBox(t) {
          if (t.length || t.touches && t.touches.length > 1) {
            var e = p.getTouchPair(t),
                n = Math.min(e[0].pageX, e[1].pageX),
                r = Math.min(e[0].pageY, e[1].pageY);
            return {
              x: n,
              y: r,
              left: n,
              top: r,
              width: Math.max(e[0].pageX, e[1].pageX) - n,
              height: Math.max(e[0].pageY, e[1].pageY) - r
            };
          }
        },
        touchDistance: function touchDistance(t, e) {
          var n = e + "X",
              i = e + "Y",
              o = p.getTouchPair(t),
              s = o[0][n] - o[1][n],
              a = o[0][i] - o[1][i];
          return r(s, a);
        },
        touchAngle: function touchAngle(t, e, n) {
          var r = n + "X",
              i = n + "Y",
              o = p.getTouchPair(t),
              s = o[1][r] - o[0][r],
              a = o[1][i] - o[0][i];
          return 180 * Math.atan2(a, s) / Math.PI;
        },
        getPointerType: function getPointerType(t) {
          return c.string(t.pointerType) ? t.pointerType : c.number(t.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][t.pointerType] : /touch/.test(t.type) || t instanceof a.Touch ? "touch" : "mouse";
        },
        getEventTargets: function getEventTargets(t) {
          var e = c.function(t.composedPath) ? t.composedPath() : t.path;
          return [s.getActualElement(e ? e[0] : t.target), s.getActualElement(t.currentTarget)];
        }
      };
      e.exports = p;
    }, {
      "./browser": 36,
      "./domObjects": 38,
      "./domUtils": 39,
      "./hypot": 43,
      "./is": 46,
      "./pointerExtend": 48
    }],
    50: [function (t, e, n) {
      "use strict";

      for (var r = t("./window"), i = r.window, o = ["ms", "moz", "webkit", "o"], s = 0, a = void 0, c = void 0, l = 0; l < o.length && !i.requestAnimationFrame; l++) a = i[o[l] + "RequestAnimationFrame"], c = i[o[l] + "CancelAnimationFrame"] || i[o[l] + "CancelRequestAnimationFrame"];

      a || (a = function a(t) {
        var e = new Date().getTime(),
            n = Math.max(0, 16 - (e - s)),
            r = setTimeout(function () {
          t(e + n);
        }, n);
        return s = e + n, r;
      }), c || (c = function c(t) {
        clearTimeout(t);
      }), e.exports = {
        request: a,
        cancel: c
      };
    }, {
      "./window": 52
    }],
    51: [function (t, e, n) {
      "use strict";

      var r = t("./extend"),
          i = t("./is"),
          o = t("./domUtils"),
          s = o.closest,
          a = o.parentNode,
          c = o.getElementRect,
          l = {
        getStringOptionResult: function getStringOptionResult(t, e, n) {
          return i.string(t) ? t = "parent" === t ? a(n) : "self" === t ? e.getRect(n) : s(n, t) : null;
        },
        resolveRectLike: function resolveRectLike(t, e, n, r) {
          return t = l.getStringOptionResult(t, e, n) || t, i.function(t) && (t = t.apply(null, r)), i.element(t) && (t = c(t)), t;
        },
        rectToXY: function rectToXY(t) {
          return t && {
            x: "x" in t ? t.x : t.left,
            y: "y" in t ? t.y : t.top
          };
        },
        xywhToTlbr: function xywhToTlbr(t) {
          return !t || "left" in t && "top" in t || (t = r({}, t), t.left = t.x || 0, t.top = t.y || 0, t.right = t.right || t.left + t.width, t.bottom = t.bottom || t.top + t.height), t;
        },
        tlbrToXywh: function tlbrToXywh(t) {
          return !t || "x" in t && "y" in t || (t = r({}, t), t.x = t.left || 0, t.top = t.top || 0, t.width = t.width || t.right - t.x, t.height = t.height || t.bottom - t.y), t;
        }
      };
      e.exports = l;
    }, {
      "./domUtils": 39,
      "./extend": 41,
      "./is": 46
    }],
    52: [function (t, e, n) {
      "use strict";

      function r(t) {
        i.realWindow = t;
        var e = t.document.createTextNode("");
        e.ownerDocument !== t.document && "function" == typeof t.wrap && t.wrap(e) === e && (t = t.wrap(t)), i.window = t;
      }

      var i = e.exports,
          o = t("./isWindow");
      "undefined" == typeof window ? (i.window = void 0, i.realWindow = void 0) : r(window), i.getWindow = function (t) {
        if (o(t)) return t;
        var e = t.ownerDocument || t;
        return e.defaultView || e.parentWindow || i.window;
      }, i.init = r;
    }, {
      "./isWindow": 47
    }]
  }, {}, [1])(1);
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/modules/es6.regexp.match":76,"core-js/modules/es6.regexp.replace":77,"core-js/modules/es6.regexp.search":78,"core-js/modules/es6.regexp.split":79,"core-js/modules/es6.symbol":80,"core-js/modules/es7.symbol.async-iterator":81}],6:[function(require,module,exports){
"use strict";

var _InteractionHelper = _interopRequireDefault(require("./InteractionHelper.js"));

var _AppManager = _interopRequireDefault(require("./AppManager.js"));

var _Animator = _interopRequireDefault(require("./Animator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*----------------------------------------*\
  256^3 - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:16:10
  @Last Modified time: 2020-02-28 14:43:45
\*----------------------------------------*/
window.Animator = _Animator.default;
window.AppManager = _AppManager.default;
window.InteractionHelper = _InteractionHelper.default;
},{"./Animator.js":1,"./AppManager.js":2,"./InteractionHelper.js":3}],7:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],8:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":28,"./_wks":72}],9:[function(require,module,exports){
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":62}],10:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":33}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":63,"./_to-iobject":65,"./_to-length":66}],12:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":13,"./_wks":72}],13:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],14:[function(require,module,exports){
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],15:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":7}],16:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],17:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":22}],18:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":26,"./_is-object":33}],19:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],20:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":47,"./_object-keys":50,"./_object-pie":51}],21:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":14,"./_ctx":15,"./_global":26,"./_hide":28,"./_redefine":53}],22:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],23:[function(require,module,exports){
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":16,"./_fails":22,"./_hide":28,"./_redefine":53,"./_regexp-exec":55,"./_wks":72,"./es6.regexp.exec":75}],24:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":10}],25:[function(require,module,exports){
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":59}],26:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],27:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],28:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":17,"./_object-dp":42,"./_property-desc":52}],29:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":26}],30:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":17,"./_dom-create":18,"./_fails":22}],31:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":13}],32:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":13}],33:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],34:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":13,"./_is-object":33,"./_wks":72}],35:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":28,"./_object-create":41,"./_property-desc":52,"./_set-to-string-tag":57,"./_wks":72}],36:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":21,"./_hide":28,"./_iter-create":35,"./_iterators":38,"./_library":39,"./_object-gpo":48,"./_redefine":53,"./_set-to-string-tag":57,"./_wks":72}],37:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],38:[function(require,module,exports){
module.exports = {};

},{}],39:[function(require,module,exports){
module.exports = false;

},{}],40:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":22,"./_has":27,"./_is-object":33,"./_object-dp":42,"./_uid":69}],41:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":10,"./_dom-create":18,"./_enum-bug-keys":19,"./_html":29,"./_object-dps":43,"./_shared-key":58}],42:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":10,"./_descriptors":17,"./_ie8-dom-define":30,"./_to-primitive":68}],43:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":10,"./_descriptors":17,"./_object-dp":42,"./_object-keys":50}],44:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":17,"./_has":27,"./_ie8-dom-define":30,"./_object-pie":51,"./_property-desc":52,"./_to-iobject":65,"./_to-primitive":68}],45:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":46,"./_to-iobject":65}],46:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":19,"./_object-keys-internal":49}],47:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],48:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":27,"./_shared-key":58,"./_to-object":67}],49:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":11,"./_has":27,"./_shared-key":58,"./_to-iobject":65}],50:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":19,"./_object-keys-internal":49}],51:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],52:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],53:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":14,"./_function-to-string":25,"./_global":26,"./_has":27,"./_hide":28,"./_uid":69}],54:[function(require,module,exports){
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":12}],55:[function(require,module,exports){
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":24}],56:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],57:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":27,"./_object-dp":42,"./_wks":72}],58:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":59,"./_uid":69}],59:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":14,"./_global":26,"./_library":39}],60:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":7,"./_an-object":10,"./_wks":72}],61:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":22}],62:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":16,"./_to-integer":64}],63:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":64}],64:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],65:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":16,"./_iobject":31}],66:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":64}],67:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":16}],68:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":33}],69:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],70:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":14,"./_global":26,"./_library":39,"./_object-dp":42,"./_wks-ext":71}],71:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":72}],72:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":26,"./_shared":59,"./_uid":69}],73:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":8,"./_iter-define":36,"./_iter-step":37,"./_iterators":38,"./_to-iobject":65}],74:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":7,"./_export":21,"./_fails":22,"./_strict-method":61,"./_to-object":67}],75:[function(require,module,exports){
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_export":21,"./_regexp-exec":55}],76:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_advance-string-index":9,"./_an-object":10,"./_fix-re-wks":23,"./_regexp-exec-abstract":54,"./_to-length":66}],77:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_advance-string-index":9,"./_an-object":10,"./_fix-re-wks":23,"./_regexp-exec-abstract":54,"./_to-integer":64,"./_to-length":66,"./_to-object":67}],78:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":10,"./_fix-re-wks":23,"./_regexp-exec-abstract":54,"./_same-value":56}],79:[function(require,module,exports){
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_advance-string-index":9,"./_an-object":10,"./_fails":22,"./_fix-re-wks":23,"./_is-regexp":34,"./_regexp-exec":55,"./_regexp-exec-abstract":54,"./_species-constructor":60,"./_to-length":66}],80:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":10,"./_descriptors":17,"./_enum-keys":20,"./_export":21,"./_fails":22,"./_global":26,"./_has":27,"./_hide":28,"./_is-array":32,"./_is-object":33,"./_library":39,"./_meta":40,"./_object-create":41,"./_object-dp":42,"./_object-gopd":44,"./_object-gopn":46,"./_object-gopn-ext":45,"./_object-gops":47,"./_object-keys":50,"./_object-pie":51,"./_property-desc":52,"./_redefine":53,"./_set-to-string-tag":57,"./_shared":59,"./_to-iobject":65,"./_to-object":67,"./_to-primitive":68,"./_uid":69,"./_wks":72,"./_wks-define":70,"./_wks-ext":71}],81:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":70}],82:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":26,"./_hide":28,"./_iterators":38,"./_object-keys":50,"./_redefine":53,"./_wks":72,"./es6.array.iterator":73}]},{},[6]);
