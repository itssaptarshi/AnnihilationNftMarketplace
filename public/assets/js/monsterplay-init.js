/*!-----------------------------------------------------------------
    Name: AnnihilationMobile - Annihilation Mobile game
    Version: 1.0.0
    Author: undefined
    Website: https://annihilationmobile.com/
    Purchase: undefined
    Support: undefined
    License: undefined
    Copyright 2021.
-------------------------------------------------------------------*/
    /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "options": () => (/* binding */ options)
/* harmony export */ });
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
// eslint-disable-next-line max-len
var instagramIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"/></svg>';
var options = {
  // enable cursor
  customCursor: false,
  // enable parallax
  parallax: true,
  // set small navbar on load
  navbarSmall: false,
  // set small navbar on scroll
  navbarSmallMaxTop: 100,
  // twitter and instagram php paths
  php: {
    twitter: './php/twitter/tweet.php',
    instagram: './php/instagram/instagram.php'
  },
  templates: {
    instagram: "<a class=\"mpl-instagram-item\" href=\"{{link}}\" target=\"_blank\">\n                <span class=\"mpl-instagram-overlay\">\n                    ".concat(instagramIcon, "\n                </span>\n                <img src=\"{{image}}\" alt=\"{{caption}}\">\n            </a>"),
    instagramLoadingText: 'Loading...',
    instagramFailText: 'Failed to fetch data',
    twitter: "<div>\n               <div class=\"mpl-twitter-head\">\n                   <div class=\"mpl-twitter-avatar\">\n                       {{avatar}}\n                   </div>\n                   <a href=\"{{url}}\" class=\"mpl-twitter-name\">\n                       {{user_name}}\n                   </a>\n                   <div class=\"mpl-twitter-date date\">\n                       <span>{{date}}</span>\n                   </div>\n               </div>\n               <div class=\"mpl-twitter-text\">\n                  {{tweet}}\n               </div>\n            </div>",
    twitterLoadingText: 'Loading...',
    twitterFailText: 'Failed to fetch data'
  }
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parts_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


if (typeof window.MonsterPlay !== 'undefined') {
  
  window.MonsterPlay.setOptions(_parts_options__WEBPACK_IMPORTED_MODULE_0__.options);
  window.MonsterPlay.init();
}
})();

/******/ })()
;
//# sourceMappingURL=monsterplay-init.js.map
