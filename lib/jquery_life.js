/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(1);


function $l(selector) {
  let queue = [];
  if (selector instanceof Function) {
    queue.push(selector);
    document.addEventListener("DOMContentLoaded", () => {
      return queue.forEach(fn => {
        fn();
      });
    });
  } else {
    let selected = document.querySelectorAll(selector);
    if (selected[0] instanceof HTMLElement) {
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](selected);
    }

    const converted = [];
    $.each(selected, (idx, val) => {
      converted.push(val);
    });

    return converted;
  }


}

$l.extend = (...args) => {
  const merged = {};
  let key;
  let value;
  args.forEach(obj => {
    key = Object.keys(obj)[0];
    value = Object.values(obj)[0];
    if (!Object.keys(merged).includes(key)) {
      merged[key] = value;
    }
  });

  return merged;
};

$l.ajax = (options) => {
  const request = new XMLHttpRequest();

  const defaultOptions = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: 'window.location.href',
    data: {},
    success(data) { console.log(data); },
    error() { console.error("An error occurred."); },
  };

  if (options) {
    options = $l.extend(options, defaultOptions);
  } else {
    options = defaultOptions;
  }

  request.open(options.method, options.url);

  request.onload = () => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.errors);
    }
  };

  request.send(JSON.stringify(options.data));
};

window.$l  = $l;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor($els) {
    this.$els = $els;
  }

  html(arg = "") {
    if (arg.length > 0) {
      this.$els.forEach(el => {
        el.innerHTML = arg;
      });
    } else {
      return this.$els[0].innerHTML;
    }
  }

  empty() {
    this.$els.forEach(el => {
      el.innerHTML = "";
    });
  }

  append(children) {
    for (let i = 0; i < this.$els.length; i++) {
      if (typeof children === 'string') {
        this.$els[i].innerHTML += children;
      } else if (children instanceof HTMLElement) {
        this.$els[i].innerHTML += children[i].outerHTML;
      } else {
        children.$els.forEach(child => {
          this.$els[i].innerHTML += child.outerHTML;
        });
      }
    }
  }

  attr(attribute, value) {
    if (typeof attribute === 'string') {
      if (value === undefined) {
        return this.$els[0].getAttribute(attribute);
      } else {
        for (let j = 0; j < this.$els.length; j++) {
          this.$els[j].setAttribute(attribute, value);
        }
      }
    } else {
      const attributes = Object.keys(attribute);
      const values = Object.values(attribute);
      for (let i = 0; i < attributes.length; i++) {
        for (let j = 0; j < this.$els.length; j++) {
          this.$els[j].setAttribute(attributes[i], values[i]);
        }
      }
    }
  }

  addClass(className) {
    this.$els.forEach(el => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.$els.forEach(el => {
      el.classList.remove(className);
    });
  }

  children() {
    const childNodes = [];
    this.$els.forEach(el => {
      childNodes.push(el.children);
    });

    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.$els.forEach(el => {
      parentNodes.push(el.parentNode);
    });

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let result = [];
    this.$els.forEach(el => {
      result = result.concat(el.querySelectorAll(selector));
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    const parent = this.parent();
    this.empty();
    this.$els.forEach(el => {
      parent.$els[0].removeChild(el);
    });
  }

  on(type, listener) {
    this.$els.forEach(el => {
      el.addEventListener(type, listener);
      if (el.eventListeners) {
        el.eventListeners[type] = listener;
      } else {
        el.eventListeners = {[type]: listener};
      }
    });

  }

  off(type) {
    let listener;
    this.$els.forEach(el => {
      listener = el.eventListeners[type];
      el.removeEventListener(type, listener);
      delete el.eventListeners[type];
    });
  }
}



/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);