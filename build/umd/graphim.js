(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Graphim = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
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
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var createVBO = function createVBO(gl, data) {
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  };

  var createIBO = function createIBO(gl, index) {
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  };

  var VERTEX_ARRAY = [-1.0, 1.0, 0.5, -1.0, -1.0, 0.5, 1.0, 1.0, 0.5, 1.0, -1.0, 0.5];
  var INDEX_ARRAY = [0, 1, 2, 1, 3, 2];
  var UV_ARRAY = [0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0];

  var FullScreenQuad = /*#__PURE__*/function () {
    function FullScreenQuad() {
      _classCallCheck(this, FullScreenQuad);

      _defineProperty(this, "positionLocation", -1);

      _defineProperty(this, "positionVBO", null);

      _defineProperty(this, "uvLocation", -1);

      _defineProperty(this, "uvVBO", null);

      _defineProperty(this, "indexIBO", null);
    }

    _createClass(FullScreenQuad, [{
      key: "init",
      value: function init(gl, program) {
        // position location
        this.positionLocation = gl.getAttribLocation(program, 'position');
        this.positionVBO = createVBO(gl, VERTEX_ARRAY); // uv location

        this.uvLocation = gl.getAttribLocation(program, 'uv');
        this.uvVBO = createVBO(gl, UV_ARRAY); // index

        this.indexIBO = createIBO(gl, INDEX_ARRAY);
      }
    }, {
      key: "release",
      value: function release(gl) {
        gl.deleteBuffer(this.positionVBO);
        gl.deleteBuffer(this.uvVBO);
        gl.deleteBuffer(this.indexIBO);
      }
    }, {
      key: "render",
      value: function render(gl) {
        // position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVBO);
        gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLocation); // uv

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvVBO);
        gl.enableVertexAttribArray(this.uvLocation);
        gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 0, 0); // index

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIBO);
      }
    }]);

    return FullScreenQuad;
  }();

  var quadVertex = "#define GLSLIFY 1\nattribute vec3 position;attribute vec2 uv;varying mediump vec4 vPosition;varying mediump vec2 vUv;uniform float flipY;void main(void){vPosition=vec4(position*vec3(1.0,flipY,1.0),1.0);vUv=uv;gl_Position=vPosition;}"; // eslint-disable-line

  var headVector = "precision mediump float;\n#define GLSLIFY 1\nvarying vec4 vPosition;varying vec2 vUv;uniform sampler2D renderTexture;uniform float time;uniform vec2 resolution;uniform vec2 mouse;uniform int isHover;"; // eslint-disable-line

  var Color = /*#__PURE__*/function () {
    function Color() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      _classCallCheck(this, Color);

      _defineProperty(this, "r", void 0);

      _defineProperty(this, "g", void 0);

      _defineProperty(this, "b", void 0);

      _defineProperty(this, "a", void 0);

      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }

    _createClass(Color, [{
      key: "toString",
      value: function toString() {
        return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniform4fv(location, new Float32Array([this.r, this.g, this.b, this.a]));
      }
    }, {
      key: "set",
      value: function set(r, g, b) {
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.a;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    }]);

    return Color;
  }();

  var Vector4 = /*#__PURE__*/function () {
    function Vector4() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      _classCallCheck(this, Vector4);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      _defineProperty(this, "z", void 0);

      _defineProperty(this, "w", void 0);

      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }

    _createClass(Vector4, [{
      key: "set",
      value: function set(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        if (x instanceof Vector4) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          this.w = x.w;
        } else {
          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;
        }
      }
    }, {
      key: "length2",
      value: function length2() {
        return Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0) + Math.pow(this.z, 2.0) + Math.pow(this.w, 2.0);
      }
    }, {
      key: "length",
      value: function length() {
        return Math.sqrt(this.length2());
      }
    }, {
      key: "distance",
      value: function distance(a) {
        return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2) + Math.pow(this.z - a.z, 2) + Math.pow(this.w - a.w, 2));
      }
    }, {
      key: "add",
      value: function add(a) {
        if (a instanceof Vector4) {
          this.x += a.x;
          this.y += a.y;
          this.z += a.z;
          this.w += a.w;
        } else {
          this.x += a;
          this.y += a;
          this.z += a;
          this.w += a;
        }
      }
    }, {
      key: "subtract",
      value: function subtract(a) {
        if (a instanceof Vector4) {
          this.x -= a.x;
          this.y -= a.y;
          this.z -= a.z;
          this.w -= a.w;
        } else {
          this.x -= a;
          this.y -= a;
          this.z -= a;
          this.w -= a;
        }
      }
    }, {
      key: "multiply",
      value: function multiply(a) {
        if (a instanceof Vector4) {
          this.x *= a.x;
          this.y *= a.y;
          this.z *= a.z;
          this.w *= a.w;
        } else {
          this.x *= a;
          this.y *= a;
          this.z *= a;
          this.w *= a;
        }
      }
    }, {
      key: "divide",
      value: function divide(a) {
        if (a instanceof Vector4) {
          console.assert(a.x !== 0 && a.y !== 0 && a.z !== 0 && a.w !== 0);
          this.x /= a.x;
          this.y /= a.y;
          this.z /= a.z;
          this.w /= a.w;
        } else {
          console.assert(a !== 0);
          this.x /= a;
          this.y /= a;
          this.z /= a;
          this.w /= a;
        }
      }
    }, {
      key: "normalize",
      value: function normalize() {
        this.divide(this.length());
      }
    }, {
      key: "dot",
      value: function dot(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
      }
    }, {
      key: "equal",
      value: function equal(a) {
        return this.x === a.x && this.y === a.y && this.z === a.z && this.w === a.w;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
      }
    }, {
      key: "getArray",
      value: function getArray() {
        return new Float32Array([this.x, this.y, this.z, this.w]);
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniform4fv(location, this.getArray());
      }
    }]);

    return Vector4;
  }();

  var Vector3 = /*#__PURE__*/function () {
    function Vector3() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      _classCallCheck(this, Vector3);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      _defineProperty(this, "z", void 0);

      this.x = x;
      this.y = y;
      this.z = z;
    }

    _createClass(Vector3, [{
      key: "set",
      value: function set(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (x instanceof Vector3) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
        } else {
          this.x = x;
          this.y = y;
          this.z = z;
        }
      }
    }, {
      key: "length2",
      value: function length2() {
        return Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0) + Math.pow(this.z, 2.0);
      }
    }, {
      key: "length",
      value: function length() {
        return Math.sqrt(this.length2());
      }
    }, {
      key: "distance",
      value: function distance(a) {
        return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2) + Math.pow(this.z - a.z, 2));
      }
    }, {
      key: "add",
      value: function add(a) {
        if (a instanceof Vector3) {
          this.x += a.x;
          this.y += a.y;
          this.z += a.z;
        } else {
          this.x += a;
          this.y += a;
          this.z += a;
        }
      }
    }, {
      key: "subtract",
      value: function subtract(a) {
        if (a instanceof Vector3) {
          this.x -= a.x;
          this.y -= a.y;
          this.z -= a.z;
        } else {
          this.x -= a;
          this.y -= a;
          this.z -= a;
        }
      }
    }, {
      key: "multiply",
      value: function multiply(a) {
        if (a instanceof Vector3) {
          this.x *= a.x;
          this.y *= a.y;
          this.z *= a.z;
        } else {
          this.x *= a;
          this.y *= a;
          this.z *= a;
        }
      }
    }, {
      key: "divide",
      value: function divide(a) {
        if (a instanceof Vector3) {
          console.assert(a.x !== 0 && a.y !== 0 && a.z !== 0);
          this.x /= a.x;
          this.y /= a.y;
          this.z /= a.z;
        } else {
          console.assert(a !== 0);
          this.x /= a;
          this.y /= a;
          this.z /= a;
        }
      }
    }, {
      key: "normalize",
      value: function normalize() {
        this.divide(this.length());
      }
    }, {
      key: "dot",
      value: function dot(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
      }
    }, {
      key: "cross",
      value: function cross(a) {
        return new Vector3(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
      }
    }, {
      key: "equal",
      value: function equal(a) {
        return this.x === a.x && this.y === a.y && this.z === a.z;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Vector3(this.x, this.y, this.z);
      }
    }, {
      key: "getArray",
      value: function getArray() {
        return new Float32Array([this.x, this.y, this.z]);
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniform3fv(location, this.getArray());
      }
    }]);

    return Vector3;
  }();

  var Matrix4 = /*#__PURE__*/function () {
    function Matrix4(numArray) {
      _classCallCheck(this, Matrix4);

      _defineProperty(this, "matrix", [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      if (numArray) this.set(numArray);
    } // generate


    _createClass(Matrix4, [{
      key: "eye",
      value: function eye() {
        this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        return this;
      }
    }, {
      key: "set",
      value: function set(numArray) {
        this.matrix = numArray;
        return this;
      }
    }, {
      key: "empty",
      value: function empty() {
        this.matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return this;
      }
    }, {
      key: "fill",
      value: function fill(a) {
        this.matrix = [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a];
        return this;
      } // culcurate

    }, {
      key: "add",
      value: function add(_add) {
        var m = this.matrix;

        if (_add instanceof Matrix4) {
          var n = _add.matrix;
          return new Matrix4([m[0] + n[0], m[1] + n[1], m[2] + n[2], m[3] + n[3], m[4] + n[4], m[5] + n[5], m[6] + n[6], m[7] + n[7], m[8] + n[8], m[9] + n[9], m[10] + n[10], m[11] + n[11], m[12] + n[12], m[13] + n[13], m[14] + n[14], m[15] + n[15]]);
        }

        return new Matrix4([m[0] + _add, m[1] + _add, m[2] + _add, m[3] + _add, m[4] + _add, m[5] + _add, m[6] + _add, m[7] + _add, m[8] + _add, m[9] + _add, m[10] + _add, m[11] + _add, m[12] + _add, m[13] + _add, m[14] + _add, m[15] + _add]);
      }
    }, {
      key: "subtract",
      value: function subtract(sub) {
        var m = this.matrix;

        if (sub instanceof Matrix4) {
          var n = sub.matrix;
          return new Matrix4([m[0] - n[0], m[1] - n[1], m[2] - n[2], m[3] - n[3], m[4] - n[4], m[5] - n[5], m[6] - n[6], m[7] - n[7], m[8] - n[8], m[9] - n[9], m[10] - n[10], m[11] - n[11], m[12] - n[12], m[13] - n[13], m[14] - n[14], m[15] - n[15]]);
        }

        return new Matrix4([m[0] + sub, m[1] + sub, m[2] + sub, m[3] + sub, m[4] + sub, m[5] + sub, m[6] + sub, m[7] + sub, m[8] + sub, m[9] + sub, m[10] + sub, m[11] + sub, m[12] + sub, m[13] + sub, m[14] + sub, m[15] + sub]);
      }
    }, {
      key: "multiply",
      value: function multiply(mul) {
        var m = this.matrix;

        if (mul instanceof Matrix4) {
          var n = mul.matrix;
          return new Matrix4([m[0] * n[0] + m[4] * n[1] + m[8] * n[2] + m[12] * n[3], m[1] * n[0] + m[5] * n[1] + m[9] * n[2] + m[13] * n[3], m[2] * n[0] + m[6] * n[1] + m[10] * n[2] + m[14] * n[3], m[3] * n[0] + m[7] * n[1] + m[11] * n[2] + m[15] * n[3], m[0] * n[4] + m[4] * n[5] + m[8] * n[6] + m[12] * n[7], m[1] * n[4] + m[5] * n[5] + m[9] * n[6] + m[13] * n[7], m[2] * n[4] + m[6] * n[5] + m[10] * n[6] + m[14] * n[7], m[3] * n[4] + m[7] * n[5] + m[11] * n[6] + m[15] * n[7], m[0] * n[8] + m[4] * n[9] + m[8] * n[10] + m[12] * n[11], m[1] * n[8] + m[5] * n[9] + m[9] * n[10] + m[13] * n[11], m[2] * n[8] + m[6] * n[9] + m[10] * n[10] + m[14] * n[11], m[3] * n[8] + m[7] * n[9] + m[11] * n[10] + m[15] * n[11], m[0] * n[12] + m[4] * n[13] + m[8] * n[14] + m[12] * n[15], m[1] * n[12] + m[5] * n[13] + m[9] * n[14] + m[13] * n[15], m[2] * n[12] + m[6] * n[13] + m[10] * n[14] + m[14] * n[15], m[3] * n[12] + m[7] * n[13] + m[11] * n[14] + m[15] * n[15]]);
        }

        if (mul instanceof Vector4) {
          return new Vector4(m[0] * mul.x + m[4] * mul.y + m[8] * mul.z + m[12] * mul.w, m[1] * mul.x + m[5] * mul.y + m[9] * mul.z + m[13] * mul.w, m[2] * mul.x + m[6] * mul.y + m[10] * mul.z + m[14] * mul.w, m[3] * mul.x + m[7] * mul.y + m[11] * mul.z + m[15] * mul.w);
        }

        return new Matrix4([m[0] * mul, m[1] * mul, m[2] * mul, m[3] * mul, m[4] * mul, m[5] * mul, m[6] * mul, m[7] * mul, m[8] * mul, m[9] * mul, m[10] * mul, m[11] * mul, m[12] * mul, m[13] * mul, m[14] * mul, m[15] * mul]);
      }
    }, {
      key: "transpose",
      value: function transpose() {
        var m = this.matrix;
        return new Matrix4([m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]]);
      }
    }, {
      key: "inverse",
      value: function inverse() {
        var mat = this.matrix;
        var a = mat[0];
        var b = mat[1];
        var c = mat[2];
        var d = mat[3];
        var e = mat[4];
        var f = mat[5];
        var g = mat[6];
        var h = mat[7];
        var i = mat[8];
        var j = mat[9];
        var k = mat[10];
        var l = mat[11];
        var m = mat[12];
        var n = mat[13];
        var o = mat[14];
        var p = mat[15];
        var q = a * f - b * e;
        var r = a * g - c * e;
        var s = a * h - d * e;
        var t = b * g - c * f;
        var u = b * h - d * f;
        var v = c * h - d * g;
        var w = i * n - j * m;
        var x = i * o - k * m;
        var y = i * p - l * m;
        var z = j * o - k * n;
        var A = j * p - l * n;
        var B = k * p - l * o;
        var ivd = q * B - r * A + s * z + t * y - u * x + v * w;
        if (ivd === 0) throw new Error('detA == 0');
        ivd = 1 / ivd;
        var dest = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        dest[0] = (f * B - g * A + h * z) * ivd;
        dest[1] = (-b * B + c * A - d * z) * ivd;
        dest[2] = (n * v - o * u + p * t) * ivd;
        dest[3] = (-j * v + k * u - l * t) * ivd;
        dest[4] = (-e * B + g * y - h * x) * ivd;
        dest[5] = (a * B - c * y + d * x) * ivd;
        dest[6] = (-m * v + o * s - p * r) * ivd;
        dest[7] = (i * v - k * s + l * r) * ivd;
        dest[8] = (e * A - f * y + h * w) * ivd;
        dest[9] = (-a * A + b * y - d * w) * ivd;
        dest[10] = (m * u - n * s + p * q) * ivd;
        dest[11] = (-i * u + j * s - l * q) * ivd;
        dest[12] = (-e * z + f * x - g * w) * ivd;
        dest[13] = (a * z - b * x + c * w) * ivd;
        dest[14] = (-m * t + n * r - o * q) * ivd;
        dest[15] = (i * t - j * r + k * q) * ivd;
        return new Matrix4(dest);
      }
    }, {
      key: "getArray",
      value: function getArray() {
        return new Float32Array(this.matrix);
      }
    }, {
      key: "getScaleRotationMatrix",
      value: function getScaleRotationMatrix() {
        var m = this.matrix;
        return new Matrix4([m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, 0, 0, 0, 1]);
      }
    }, {
      key: "getTranslateVector",
      value: function getTranslateVector() {
        return new Vector3(this.matrix[12], this.matrix[13], this.matrix[14]);
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniformMatrix4fv(location, false, this.getArray());
      }
    }]);

    return Matrix4;
  }();

  var Float = /*#__PURE__*/function () {
    function Float() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _classCallCheck(this, Float);

      _defineProperty(this, "x", void 0);

      this.x = x;
    }

    _createClass(Float, [{
      key: "set",
      value: function set(x) {
        this.x = x;
      }
    }, {
      key: "equal",
      value: function equal(a) {
        return this.x === a.x;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Float(this.x);
      }
    }, {
      key: "copy",
      value: function copy(a) {
        this.x = a.x;
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniform1f(location, this.x);
      }
    }]);

    return Float;
  }();

  var Vector2 = /*#__PURE__*/function () {
    function Vector2() {
      var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      _classCallCheck(this, Vector2);

      _defineProperty(this, "x", void 0);

      _defineProperty(this, "y", void 0);

      this.x = _x;
      this.y = _y;
    }

    _createClass(Vector2, [{
      key: "set",
      value: function set(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (x instanceof Vector2) {
          this.x = x.x;
          this.y = x.y;
        } else {
          this.x = x;
          this.y = y;
        }
      }
    }, {
      key: "length2",
      value: function length2() {
        return Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0);
      }
    }, {
      key: "length",
      value: function length() {
        return Math.sqrt(this.length2());
      }
    }, {
      key: "distance",
      value: function distance(a) {
        return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2));
      }
    }, {
      key: "add",
      value: function add(a) {
        if (a instanceof Vector2) {
          this.x += a.x;
          this.y += a.y;
        } else {
          this.x += a;
          this.y += a;
        }
      }
    }, {
      key: "subtract",
      value: function subtract(a) {
        if (a instanceof Vector2) {
          this.x -= a.x;
          this.y -= a.y;
        } else {
          this.x -= a;
          this.y -= a;
        }
      }
    }, {
      key: "multiply",
      value: function multiply(a) {
        if (a instanceof Vector2) {
          this.x *= a.x;
          this.y *= a.y;
        } else {
          this.x *= a;
          this.y *= a;
        }
      }
    }, {
      key: "divide",
      value: function divide(a) {
        if (a instanceof Vector2) {
          console.assert(a.x !== 0 && a.y !== 0);
          this.x /= a.x;
          this.y /= a.y;
        } else {
          console.assert(a !== 0);
          this.x /= a;
          this.y /= a;
        }
      }
    }, {
      key: "normalize",
      value: function normalize() {
        this.divide(this.length());
      }
    }, {
      key: "dot",
      value: function dot(a) {
        return this.x * a.x + this.y * a.y;
      }
    }, {
      key: "equal",
      value: function equal(a) {
        return this.x === a.x && this.y === a.y;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Vector2(this.x, this.y);
      }
    }, {
      key: "copy",
      value: function copy(a) {
        this.x = a.x;
        this.y = a.y;
      }
    }, {
      key: "getArray",
      value: function getArray() {
        return new Float32Array([this.x, this.y]);
      }
    }, {
      key: "setUniform",
      value: function setUniform(gl, location) {
        gl.uniform2fv(location, this.getArray());
      }
    }]);

    return Vector2;
  }();

  var UniformSetter = /*#__PURE__*/function () {
    function UniformSetter() {
      var valueMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, UniformSetter);

      _defineProperty(this, "valueMap", {});

      _defineProperty(this, "locationMap", {});

      _defineProperty(this, "flipYLocation", -1);

      _defineProperty(this, "timeLocation", -1);

      _defineProperty(this, "aspectLocation", -1);

      _defineProperty(this, "mouseLocation", -1);

      _defineProperty(this, "isHoverLocation", -1);

      this.valueMap = valueMap;
    }

    _createClass(UniformSetter, [{
      key: "init",
      value: function init(gl, program) {
        var _this = this;

        this.flipYLocation = gl.getUniformLocation(program, 'flipY');
        this.timeLocation = gl.getUniformLocation(program, 'time');
        this.aspectLocation = gl.getUniformLocation(program, 'resolution');
        this.mouseLocation = gl.getUniformLocation(program, 'mouse');
        this.isHoverLocation = gl.getUniformLocation(program, 'isHover');
        Object.entries(this.valueMap).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              label = _ref2[0];

          _this.locationMap[label] = gl.getUniformLocation(program, label);
        });
      }
    }, {
      key: "render",
      value: function render(gl, renderToCanvas, time, mouse, isHover) {
        var _this2 = this;

        gl.uniform1f(this.flipYLocation, renderToCanvas ? -1 : 1);
        gl.uniform1f(this.timeLocation, time || 0);
        gl.uniform2fv(this.aspectLocation, new Vector2(gl.canvas.width, gl.canvas.height).getArray());
        gl.uniform2fv(this.mouseLocation, new Float32Array(mouse || [0, 0]));
        gl.uniform1i(this.isHoverLocation, isHover ? 1 : 0);
        Object.entries(this.valueMap).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              label = _ref4[0],
              value = _ref4[1];

          value.setUniform(gl, _this2.locationMap[label]);
        });
      }
    }, {
      key: "set",
      value: function set(label, value) {
        this.valueMap[label] = value;
      }
    }]);

    return UniformSetter;
  }();

  var compileShader = function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(source);
      throw new Error(gl.getShaderInfoLog(shader));
    }
  };

  var linkProgram = function linkProgram(gl, program, vertex, fragment) {
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
  };

  var setupRenderTexture = function setupRenderTexture(gl, frameBuffer, texture, width, height) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  var Filter = /*#__PURE__*/function () {
    function Filter(fragmentSource, uniforms) {
      _classCallCheck(this, Filter);

      _defineProperty(this, "fragmentSource", void 0);

      _defineProperty(this, "gl", null);

      _defineProperty(this, "width", 0);

      _defineProperty(this, "height", 0);

      _defineProperty(this, "framebuffer", null);

      _defineProperty(this, "targetTexture", null);

      _defineProperty(this, "vertexShader", null);

      _defineProperty(this, "fragmentShader", null);

      _defineProperty(this, "program", null);

      _defineProperty(this, "quad", null);

      _defineProperty(this, "uniforms", void 0);

      this.fragmentSource = fragmentSource;
      this.uniforms = uniforms || new UniformSetter({});
    }

    _createClass(Filter, [{
      key: "init",
      value: function init(gl, width, height) {
        this.gl = gl;
        this.framebuffer = gl.createFramebuffer();
        this.targetTexture = gl.createTexture();
        this.width = width;
        this.height = height;
        setupRenderTexture(gl, this.framebuffer, this.targetTexture, this.width, this.height);
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        compileShader(gl, this.vertexShader, quadVertex);
        compileShader(gl, this.fragmentShader, "".concat(headVector, "\n").concat(this.fragmentSource));
        this.program = gl.createProgram();
        linkProgram(gl, this.program, this.vertexShader, this.fragmentShader);
        this.quad = new FullScreenQuad();
        this.quad.init(gl, this.program);
        this.uniforms.init(this.gl, this.program);
      }
    }, {
      key: "release",
      value: function release() {
        if (!this.gl || !this.quad) return;
        this.gl.deleteFramebuffer(this.framebuffer);
        this.gl.deleteTexture(this.targetTexture);
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program);
        this.quad.release(this.gl);
      }
    }, {
      key: "render",
      value: function render(_ref) {
        var _this$quad;

        var targetTexture = _ref.targetTexture,
            renderToCanvas = _ref.renderToCanvas,
            time = _ref.time,
            _ref$mouse = _ref.mouse,
            mouse = _ref$mouse === void 0 ? [0, 0] : _ref$mouse,
            _ref$isHover = _ref.isHover,
            isHover = _ref$isHover === void 0 ? false : _ref$isHover;
        var gl = this.gl;

        if (renderToCanvas) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          // frame buffer rendering
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        } // set variables


        gl.useProgram(this.program);
        (_this$quad = this.quad) === null || _this$quad === void 0 ? void 0 : _this$quad.render(gl);
        this.uniforms.render(gl, !!renderToCanvas, time, mouse, isHover); // set render texture

        gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        var prevTextureLocation = gl.getUniformLocation(this.program, 'targetTexture');
        gl.uniform1i(prevTextureLocation, 0); // render

        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearDepth(0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.width, this.height);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.flush();
      }
    }, {
      key: "getRenderTexture",
      value: function getRenderTexture() {
        return this.targetTexture;
      }
    }]);

    return Filter;
  }();

  var negFs = "#define GLSLIFY 1\nvoid main(){vec4 col=texture2D(renderTexture,vUv);gl_FragColor=vec4(vec3(1.0)-col.rgb,col.a);}"; // eslint-disable-line

  var Neg = /*#__PURE__*/function (_Filter) {
    _inherits(Neg, _Filter);

    var _super = _createSuper(Neg);

    function Neg() {
      _classCallCheck(this, Neg);

      return _super.call(this, negFs);
    }

    return Neg;
  }(Filter);

  var sepiaFs = "#define GLSLIFY 1\nvoid main(){vec4 col=texture2D(renderTexture,vUv);gl_FragColor=vec4(col.r*0.393+col.g*0.769+col.b*0.189,col.r*0.349+col.g*0.686+col.b*0.168,col.r*0.272+col.g*0.534+col.b*0.131,col.a);}"; // eslint-disable-line

  var Sepia = /*#__PURE__*/function (_Filter) {
    _inherits(Sepia, _Filter);

    var _super = _createSuper(Sepia);

    function Sepia() {
      _classCallCheck(this, Sepia);

      return _super.call(this, sepiaFs);
    }

    return Sepia;
  }(Filter);

  var grayFs = "#define GLSLIFY 1\nvoid main(){vec4 col=texture2D(renderTexture,vUv);float gray=col.r*0.3+col.g*0.59+col.b*0.11;gl_FragColor=vec4(gray,gray,gray,col.a);}"; // eslint-disable-line

  var Gray = /*#__PURE__*/function (_Filter) {
    _inherits(Gray, _Filter);

    var _super = _createSuper(Gray);

    function Gray() {
      _classCallCheck(this, Gray);

      return _super.call(this, grayFs);
    }

    return Gray;
  }(Filter);

  var bloomFs = "#define GLSLIFY 1\nuniform float threshold;uniform float strength;uniform float blur;float getBrightness(vec3 col){return max(col.r,max(col.g,col.b));}vec4 getOriginalTex(vec2 uv){return texture2D(renderTexture,uv/resolution);}vec3 getTex(vec2 uv){vec4 col=texture2D(renderTexture,uv/resolution);return getBrightness(col.rgb)>threshold ? col.rgb : vec3(0.0);}float gauss(vec2 pos){return-exp(-length(pos)*2.0);}vec3 sampleBox(vec2 center){float acc=0.0;vec3 col=vec3(0.0);for(float x=-1.0;x<1.0;x+=0.2){for(float y=-1.0;y<1.0;y+=0.2){vec2 pos=center+vec2(x,y)*blur;float g=gauss(vec2(x,y));col+=getTex(pos).rgb*g;acc+=g;}}return col/acc;}void main(){vec2 pos=vUv*resolution;vec4 baseCol=getOriginalTex(pos);gl_FragColor=baseCol+vec4(sampleBox(pos),0.0)*strength;}"; // eslint-disable-line

  var Bloom = /*#__PURE__*/function (_Filter) {
    _inherits(Bloom, _Filter);

    var _super = _createSuper(Bloom);

    function Bloom(threshold, strength, blur) {
      var _this;

      _classCallCheck(this, Bloom);

      var uniforms = {
        'threshold': new Float(threshold),
        'strength': new Float(strength),
        'blur': new Float(blur)
      };
      _this = _super.call(this, bloomFs, new UniformSetter(uniforms));

      _defineProperty(_assertThisInitialized(_this), "threshold", void 0);

      _defineProperty(_assertThisInitialized(_this), "strength", void 0);

      _defineProperty(_assertThisInitialized(_this), "blur", void 0);

      _this.threshold = uniforms.threshold;
      _this.strength = uniforms.strength;
      _this.blur = uniforms.blur;
      return _this;
    }

    return Bloom;
  }(Filter);

  var blurFs = "#define GLSLIFY 1\nuniform float strength;float getBrightness(vec3 col){return max(col.r,max(col.g,col.b));}vec4 getTex(vec2 uv){return texture2D(renderTexture,uv/resolution);}float gauss(vec2 pos){return-exp(-length(pos)*2.0);}vec4 sampleBox(vec2 center){float acc=0.0;vec4 col=vec4(0);for(float x=-1.0;x<1.0;x+=0.2){for(float y=-1.0;y<1.0;y+=0.2){vec2 pos=center+vec2(x,y)*strength;float g=gauss(vec2(x,y));col+=getTex(pos)*g;acc+=g;}}return col/acc;}void main(){vec2 pos=vUv*resolution;gl_FragColor=sampleBox(pos);}"; // eslint-disable-line

  var Blur = /*#__PURE__*/function (_Filter) {
    _inherits(Blur, _Filter);

    var _super = _createSuper(Blur);

    function Blur(strength) {
      var _this;

      _classCallCheck(this, Blur);

      var uniforms = {
        'strength': new Float(strength)
      };
      _this = _super.call(this, blurFs, new UniformSetter(uniforms));

      _defineProperty(_assertThisInitialized(_this), "strength", void 0);

      _this.strength = uniforms.strength;
      return _this;
    }

    return Blur;
  }(Filter);

  var pixelFs = "#define GLSLIFY 1\nuniform float blockSize;vec4 getTex(vec2 uv){return texture2D(renderTexture,uv/resolution);}vec4 getPixel(vec2 uv){vec2 base=floor(uv/blockSize)*blockSize;return(getTex(base)+getTex(base+vec2(blockSize,0.0))+getTex(base+vec2(0.0,blockSize))+getTex(base+vec2(blockSize,blockSize)))*0.25;}void main(){vec2 pos=vUv*resolution;gl_FragColor=getPixel(pos);}"; // eslint-disable-line

  var Pixel = /*#__PURE__*/function (_Filter) {
    _inherits(Pixel, _Filter);

    var _super = _createSuper(Pixel);

    function Pixel(blockSize) {
      var _this;

      _classCallCheck(this, Pixel);

      var uniforms = {
        'blockSize': new Float(blockSize)
      };
      _this = _super.call(this, pixelFs, new UniformSetter(uniforms));

      _defineProperty(_assertThisInitialized(_this), "blockSize", void 0);

      _this.blockSize = uniforms.blockSize;
      return _this;
    }

    return Pixel;
  }(Filter);

  var frostedFs = "#define GLSLIFY 1\nfloat random(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}uniform float randomSize;vec4 getTex(vec2 uv){return texture2D(renderTexture,uv/resolution);}void main(){vec2 pos=vUv*resolution;gl_FragColor=getTex(pos+(vec2(random(vUv),random(vUv+vec2(1.0)))*2.0-vec2(1.0))*randomSize);}"; // eslint-disable-line

  var FrostedGlass = /*#__PURE__*/function (_Filter) {
    _inherits(FrostedGlass, _Filter);

    var _super = _createSuper(FrostedGlass);

    function FrostedGlass(randomSize) {
      var _this;

      _classCallCheck(this, FrostedGlass);

      var uniforms = {
        'randomSize': new Float(randomSize)
      };
      _this = _super.call(this, frostedFs, new UniformSetter(uniforms));

      _defineProperty(_assertThisInitialized(_this), "randomSize", void 0);

      _this.randomSize = uniforms.randomSize;
      return _this;
    }

    return FrostedGlass;
  }(Filter);

  // export { Edge } from './Edge';

  var Primitives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Neg: Neg,
    Sepia: Sepia,
    Gray: Gray,
    Bloom: Bloom,
    Blur: Blur,
    Pixel: Pixel,
    FrostedGlass: FrostedGlass
  });

  var bindTexture = function bindTexture(gl, texture, image) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  var copyElementAttributes = function copyElementAttributes(a, b) {
    a.width = b.width;
    a.height = b.height;
    b.classList.forEach(function (className) {
      a.classList.add(className);
    });
    a.id = b.id;
    Object.entries(b.style).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      a.style.setProperty(key, value);
    });
    Object.entries(b.dataset).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      a.setAttribute("data-".concat(key), value);
    });
  };

  var Renderer = /*#__PURE__*/function () {
    function Renderer(_ref5) {
      var _image$parentElement,
          _image$parentElement2,
          _this = this;

      var image = _ref5.image;

      _classCallCheck(this, Renderer);

      _defineProperty(this, "image", void 0);

      _defineProperty(this, "canvas", void 0);

      _defineProperty(this, "gl", void 0);

      _defineProperty(this, "filters", void 0);

      _defineProperty(this, "imageTexture", null);

      _defineProperty(this, "isAnimation", false);

      _defineProperty(this, "accTime", 0);

      _defineProperty(this, "mouse", [0, 0]);

      _defineProperty(this, "isHover", false);

      this.image = image;
      this.canvas = document.createElement('canvas');
      copyElementAttributes(this.canvas, this.image);
      (_image$parentElement = image.parentElement) === null || _image$parentElement === void 0 ? void 0 : _image$parentElement.appendChild(this.canvas);
      (_image$parentElement2 = image.parentElement) === null || _image$parentElement2 === void 0 ? void 0 : _image$parentElement2.removeChild(image); // mouse event

      this.canvas.addEventListener('mouseenter', function (e) {
        _this.isHover = true;

        _this.handlePointer(e);
      });
      this.canvas.addEventListener('mousemove', function (e) {
        _this.handlePointer(e);
      });
      this.canvas.addEventListener('mouseleave', function (e) {
        _this.isHover = false;

        _this.handlePointer(e);
      }); // touch event

      this.canvas.addEventListener('touchstart', function (e) {
        _this.isHover = true;

        _this.handlePointer(e);
      });
      this.canvas.addEventListener('touchmove', function (e) {
        _this.handlePointer(e);
      });
      this.canvas.addEventListener('touchend', function (e) {
        _this.isHover = false;

        _this.handlePointer(e);
      });
      this.gl = this.canvas.getContext('webgl');
      this.filters = [];
      this.isAnimation = false;
    }

    _createClass(Renderer, [{
      key: "handlePointer",
      value: function handlePointer(e) {
        if (e instanceof TouchEvent) {
          var rect = e.target.getBoundingClientRect();
          this.mouse = [(e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.width, (e.touches[0].clientX - window.pageXOffset - rect.left) / this.canvas.height];
        } else {
          this.mouse = [e.offsetX / this.canvas.width, e.offsetY / this.canvas.height];
        }
      }
    }, {
      key: "init",
      value: function init(filters) {
        var _this2 = this;

        var gl = this.gl;
        this.imageTexture = gl.createTexture();
        bindTexture(gl, this.imageTexture, this.image);
        this.filters = filters;
        this.filters.forEach(function (filter) {
          filter.init(_this2.gl, _this2.canvas.width, _this2.canvas.height);
        });
      }
    }, {
      key: "resetFilter",
      value: function resetFilter(filters) {
        var _this3 = this;

        this.filters.forEach(function (filter) {
          filter.release();
        });
        this.filters = filters;
        this.filters.forEach(function (filter) {
          filter.init(_this3.gl, _this3.canvas.width, _this3.canvas.height);
        });
      }
    }, {
      key: "resetImage",
      value: function resetImage(image) {
        var _this$canvas$parentEl, _image$parentElement3, _image$parentElement4;

        copyElementAttributes(this.canvas, this.image);
        (_this$canvas$parentEl = this.canvas.parentElement) === null || _this$canvas$parentEl === void 0 ? void 0 : _this$canvas$parentEl.appendChild(this.image);
        (_image$parentElement3 = image.parentElement) === null || _image$parentElement3 === void 0 ? void 0 : _image$parentElement3.appendChild(this.canvas);
        (_image$parentElement4 = image.parentElement) === null || _image$parentElement4 === void 0 ? void 0 : _image$parentElement4.removeChild(image);
        this.image = image;
        if (this.imageTexture) bindTexture(this.gl, this.imageTexture, this.image);
      }
    }, {
      key: "release",
      value: function release() {
        var _this$canvas$parentEl2;

        this.gl.deleteTexture(this.imageTexture);
        this.filters.forEach(function (filter) {
          filter.release();
        });
        (_this$canvas$parentEl2 = this.canvas.parentElement) === null || _this$canvas$parentEl2 === void 0 ? void 0 : _this$canvas$parentEl2.appendChild(this.image);
        this.canvas.remove();
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var texture = this.imageTexture;
        this.filters.forEach(function (filter, index) {
          filter.render({
            targetTexture: texture,
            renderToCanvas: index === _this4.filters.length - 1,
            time: time,
            mouse: _this4.mouse,
            isHover: _this4.isHover
          });
          texture = filter.getRenderTexture();
        });
      }
    }, {
      key: "animate",
      value: function animate() {
        var _this5 = this;

        var start = new Date().getTime() / 1000;
        this.isAnimation = true;

        var tick = function tick() {
          var now = new Date().getTime() / 1000;
          _this5.accTime += now - start;
          start = now;

          _this5.render(_this5.accTime);

          if (_this5.isAnimation) requestAnimationFrame(tick);
        };

        tick();
      }
    }, {
      key: "stopAnimate",
      value: function stopAnimate() {
        this.isAnimation = false;
      }
    }]);

    return Renderer;
  }();

  exports.Color = Color;
  exports.Filter = Filter;
  exports.Float = Float;
  exports.Matrix4 = Matrix4;
  exports.Primitives = Primitives;
  exports.Renderer = Renderer;
  exports.UniformSetter = UniformSetter;
  exports.Vector2 = Vector2;
  exports.Vector3 = Vector3;
  exports.Vector4 = Vector4;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=graphim.js.map
