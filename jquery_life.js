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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass DOMNodeCollection {\n  constructor($els) {\n    this.$els = $els;\n  }\n\n  html(arg = \"\") {\n    if (arg.length > 0) {\n      this.$els.forEach(el => {\n        el.innerHTML = arg;\n      });\n    } else {\n      return this.$els[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.$els.forEach(el => {\n      el.innerHTML = \"\";\n    });\n  }\n\n  append(children) {\n    for (let i = 0; i < this.$els.length; i++) {\n      if (typeof children === 'string') {\n        this.$els[i].innerHTML += children;\n      } else if (children instanceof HTMLElement) {\n        this.$els[i].innerHTML += children[i].outerHTML;\n      } else {\n        children.$els.forEach(child => {\n          this.$els[i].innerHTML += child.outerHTML;\n        });\n      }\n    }\n  }\n\n  attr(attribute, value) {\n    if (typeof attribute === 'string') {\n      if (value === undefined) {\n        return this.$els.getAttribute(attribute);\n      } else {\n        for (let i = 0; i < this.$els.length; i++) {\n          this.$els[i].setAttribute(attribute, value);\n        }\n      }\n    } else {\n      const attributes = Object.keys(attribute);\n      const values = Object.values(attribute);\n      for (let i = 0; i < attributes.length; i++) {\n        for (let j = 0; j < this.$els.length; j++) {\n          this.$els[j].setAttribute(attributes[i], values[i]);\n        }\n      }\n    }\n  }\n\n  addClass(className) {\n    this.$els.forEach(el => {\n      // \n      el.classList.add(className);\n    });\n  }\n\n  removeClass(className) {\n    this.$els.forEach(el => {\n      el.classList.remove(className);\n    });\n  }\n\n  children() {\n    const childNodes = [];\n    this.$els.forEach(el => {\n      childNodes.push(el.children);\n    });\n\n    return new DOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    const parentNodes = [];\n    this.$els.forEach(el => {\n      parentNodes.push(el.parentNode);\n    });\n\n    return new DOMNodeCollection(parentNodes);\n  }\n\n  find(selector) {\n    let result = [];\n    this.$els.forEach(el => {\n      result = result.concat(el.querySelectorAll(selector));\n    });\n\n    return new DOMNodeCollection(result);\n  }\n\n  remove() {\n    const parent = this.parent();\n    this.empty();\n    this.$els.forEach(el => {\n      parent.$els[0].removeChild(el);\n    });\n  }\n\n  on(type, listener) {\n    this.$els.forEach(el => {\n      el.addEventListener(type, listener);\n      if (el.eventListeners) {\n        el.eventListeners[type] = listener;\n      } else {\n        el.eventListeners = { [type]: listener };\n      }\n    });\n  }\n\n  off(type) {\n    let listener;\n    this.$els.forEach(el => {\n      listener = el.eventListeners[type];\n      el.removeEventListener(type, listener);\n      delete el.eventListeners[type];\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DOMNodeCollection);\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n\nlet queue = [];\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  queue.forEach(fn => {\n    fn();\n  });\n});\n\nfunction $l(selector) {\n  if (selector instanceof Function) {\n    queue.push(selector);\n  } else {\n    let selected = document.querySelectorAll(selector);\n    if (selected[0] instanceof HTMLElement) {\n      return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](selected);\n    }\n    ;\n    const converted = [];\n    selected.forEach(selected, (idx, val) => {\n      converted.push(val);\n    });\n\n    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](converted);\n  }\n}\n\n$l.extend = (...args) => {\n  const merged = {};\n  let key;\n  let value;\n  args.forEach(obj => {\n    key = Object.keys(obj).map(key => {\n      merged[key] = obj[key];\n    });\n  });\n\n  return merged;\n};\n\n$l.ajax = options => {\n  const request = new XMLHttpRequest();\n\n  const defaultOptions = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: 'GET',\n    url: 'window.location.href',\n    data: {},\n    success(data) {\n      console.log(data);\n    },\n    error() {\n      console.error(\"An error occurred.\");\n    }\n  };\n\n  if (options) {\n    options = $l.extend(defaultOptions, options);\n  } else {\n    options = defaultOptions;\n  }\n\n  return new Promise((resolve, reject) => {\n    request.onload = () => {\n      if (request.status === 200) {\n        options.success(request.response);\n        resolve(request.response);\n      } else {\n        options.error(request.errors);\n        reject(reques.terrors);\n      }\n    };\n\n    request.open(options.method, options.url);\n    request.send(JSON.stringify(options.data));\n  });\n};\n\nwindow.$l = $l;\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });
