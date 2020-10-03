(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\91965\Codestore\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "html, body {\n  min-height: 100%;\n  }\n  body, div, form, input, select, p { \n  padding: 0;\n  margin: 0;\n  outline: none;\n  font-family: Roboto, Arial, sans-serif;\n  font-size: 16px;\n  }\n  body {\n  background: url(\"https://cms-img.coverfox.com/comprehensive-insurance-vs-zero-depreciation-for-cars.jpg\") no-repeat center;\n  background-size: cover;\n  }\n  h1, h2 {\n  text-transform: uppercase;\n  font-weight: 400;\n  }\n  h2 {\n  margin: 0 0 0 8px;\n  }\n  .main-block {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 25px;\n  background: rgba(0, 0, 0, 0.5); \n  }\n  .second-block{\n    display: flex;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 93%;\n    padding: 25px;\n    background: rgba(0, 0, 0, 0.5); \n  }\n  .result{\n    width:60%;\n    background: white;\n    opacity: 0.8;\n    margin:20px;\n    padding:20px;\n    color: rgb(15, 15, 15);\n  }\n  .left-part, form {\n  padding: 25px;\n  }\n  .left-part {\n  text-align: center;\n  color:#eee;\n  }\n  .fa-graduation-cap {\n  font-size: 72px;\n  }\n  form {\n  background: rgba(0, 0, 0, 0.7); \n  color: #eee;\n  }\n  .title {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  }\n  .info {\n  display: flex;\n  flex-direction: column;\n  }\n  input, select {\n  padding: 5px;\n  margin-bottom: 30px;\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid #eee;\n  color: #eee;\n  }\n  input::placeholder {\n  color: #eee;\n  }\n  option:focus {\n  border: none;\n  }\n  option {\n  background: black; \n  border: none;\n  }\n  .checkbox input {\n  margin: 0 10px 0 0;\n  vertical-align: middle;\n  }\n  .checkbox a {\n  color: #26a9e0;\n  }\n  .checkbox a:hover {\n  color: #85d6de;\n  }\n  .btn-item, button {\n  padding: 10px 5px;\n  margin-top: 20px;\n  border-radius: 5px; \n  border: none;\n  background: #26a9e0; \n  text-decoration: none;\n  font-size: 15px;\n  font-weight: 400;\n  color: #fff;\n  }\n  .btn-item {\n  display: inline-block;\n  margin: 20px 5px 0;\n  }\n  button {\n  width: 100%;\n  }\n  button:hover, .btn-item:hover, button:disabled, .btn-item:disabled {\n  background: #85d6de;\n  }\n  @media (min-width: 568px) {\n  html, body {\n  height: 100%;\n  }\n  .main-block {\n  flex-direction: row;\n  height: calc(100% - 50px);\n  }\n  .left-part, form {\n  flex: 1;\n  height: auto;\n  }\n  }\n  .textCentre{\n    text-align: center;\n  }\n  .infoFieldsGroup{\n    display: block;\n  }\n  .infoFields{\n    /* max-width: 40%; */padding: 30px;\n    display: inline-block;\n  }", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB;EACA;EACA,UAAU;EACV,SAAS;EACT,aAAa;EACb,sCAAsC;EACtC,eAAe;EACf;EACA;EACA,0HAA0H;EAC1H,sBAAsB;EACtB;EACA;EACA,yBAAyB;EACzB,gBAAgB;EAChB;EACA;EACA,iBAAiB;EACjB;EACA;EACA,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B;EAEA;IACE,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,aAAa;IACb,8BAA8B;EAChC;EACA;IACE,SAAS;IACT,iBAAiB;IACjB,YAAY;IACZ,WAAW;IACX,YAAY;IACZ,sBAAsB;EACxB;EAEA;EACA,aAAa;EACb;EACA;EACA,kBAAkB;EAClB,UAAU;EACV;EACA;EACA,eAAe;EACf;EACA;EACA,8BAA8B;EAC9B,WAAW;EACX;EACA;EACA,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB;EACA;EACA,aAAa;EACb,sBAAsB;EACtB;EACA;EACA,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,6BAA6B;EAC7B,WAAW;EACX;EACA;EACA,WAAW;EACX;EACA;EACA,YAAY;EACZ;EACA;EACA,iBAAiB;EACjB,YAAY;EACZ;EACA;EACA,kBAAkB;EAClB,sBAAsB;EACtB;EACA;EACA,cAAc;EACd;EACA;EACA,cAAc;EACd;EACA;EACA,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,YAAY;EACZ,mBAAmB;EACnB,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX;EACA;EACA,qBAAqB;EACrB,kBAAkB;EAClB;EACA;EACA,WAAW;EACX;EACA;EACA,mBAAmB;EACnB;EACA;EACA;EACA,YAAY;EACZ;EACA;EACA,mBAAmB;EACnB,yBAAyB;EACzB;EACA;EACA,OAAO;EACP,YAAY;EACZ;EACA;EACA;IACE,kBAAkB;EACpB;EAEA;IACE,cAAc;EAChB;EAEA;IACE,oBAAoB,CAAC,aAAa;IAClC,qBAAqB;EACvB","sourcesContent":["html, body {\n  min-height: 100%;\n  }\n  body, div, form, input, select, p { \n  padding: 0;\n  margin: 0;\n  outline: none;\n  font-family: Roboto, Arial, sans-serif;\n  font-size: 16px;\n  }\n  body {\n  background: url(\"https://cms-img.coverfox.com/comprehensive-insurance-vs-zero-depreciation-for-cars.jpg\") no-repeat center;\n  background-size: cover;\n  }\n  h1, h2 {\n  text-transform: uppercase;\n  font-weight: 400;\n  }\n  h2 {\n  margin: 0 0 0 8px;\n  }\n  .main-block {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 25px;\n  background: rgba(0, 0, 0, 0.5); \n  }\n\n  .second-block{\n    display: flex;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 93%;\n    padding: 25px;\n    background: rgba(0, 0, 0, 0.5); \n  }\n  .result{\n    width:60%;\n    background: white;\n    opacity: 0.8;\n    margin:20px;\n    padding:20px;\n    color: rgb(15, 15, 15);\n  }\n\n  .left-part, form {\n  padding: 25px;\n  }\n  .left-part {\n  text-align: center;\n  color:#eee;\n  }\n  .fa-graduation-cap {\n  font-size: 72px;\n  }\n  form {\n  background: rgba(0, 0, 0, 0.7); \n  color: #eee;\n  }\n  .title {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  }\n  .info {\n  display: flex;\n  flex-direction: column;\n  }\n  input, select {\n  padding: 5px;\n  margin-bottom: 30px;\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid #eee;\n  color: #eee;\n  }\n  input::placeholder {\n  color: #eee;\n  }\n  option:focus {\n  border: none;\n  }\n  option {\n  background: black; \n  border: none;\n  }\n  .checkbox input {\n  margin: 0 10px 0 0;\n  vertical-align: middle;\n  }\n  .checkbox a {\n  color: #26a9e0;\n  }\n  .checkbox a:hover {\n  color: #85d6de;\n  }\n  .btn-item, button {\n  padding: 10px 5px;\n  margin-top: 20px;\n  border-radius: 5px; \n  border: none;\n  background: #26a9e0; \n  text-decoration: none;\n  font-size: 15px;\n  font-weight: 400;\n  color: #fff;\n  }\n  .btn-item {\n  display: inline-block;\n  margin: 20px 5px 0;\n  }\n  button {\n  width: 100%;\n  }\n  button:hover, .btn-item:hover, button:disabled, .btn-item:disabled {\n  background: #85d6de;\n  }\n  @media (min-width: 568px) {\n  html, body {\n  height: 100%;\n  }\n  .main-block {\n  flex-direction: row;\n  height: calc(100% - 50px);\n  }\n  .left-part, form {\n  flex: 1;\n  height: auto;\n  }\n  }\n  .textCentre{\n    text-align: center;\n  }\n\n  .infoFieldsGroup{\n    display: block;\n  }\n\n  .infoFields{\n    /* max-width: 40%; */padding: 30px;\n    display: inline-block;\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map