require('source-map-support/register')
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_puppeteer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_puppeteer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_puppeteer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_commander__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_commander___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_commander__);



__WEBPACK_IMPORTED_MODULE_1_commander___default.a.version("1.0.0").option("-u, --user [value]", "username for login").option("-p, --pass [value]", "passwd for login");

__WEBPACK_IMPORTED_MODULE_1_commander___default.a.command("login").description("login to campus network").action(async () => {
  const { user, pass } = __WEBPACK_IMPORTED_MODULE_1_commander___default.a;
  if (user && pass) {
    await login(user, pass);
  } else {
    console.log("must input user & pass");
  }
});

__WEBPACK_IMPORTED_MODULE_1_commander___default.a.parse(process.argv);

if (!__WEBPACK_IMPORTED_MODULE_1_commander___default.a.args.length) __WEBPACK_IMPORTED_MODULE_1_commander___default.a.help();

async function login(user, pass) {
  const browser = await __WEBPACK_IMPORTED_MODULE_0_puppeteer___default.a.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto("http://10.36.254.11/");

  page.waitForSelector("[name='PageTips']", { timeout: 3000 }).then(async () => {
    const pageTips = await page.evaluate(() => document.getElementsByName("PageTips")[0].textContent);
    // 已经登录
    console.log(pageTips);
    process.exit();
  }).catch(async () => {
    // 去登陆
    // 执行登录操作
    await page.evaluate(new Function("u", "p", `
        document.getElementsByName("DDDDD")[1].value = u;
        document.getElementsByName("upass")[1].value = p; 
        document.getElementsByName("0MKKey")[1].click();
        `), user, pass);

    page.waitForSelector("[name='PageTips']", { timeout: 5000 }).then(async () => {
      const pageTips = await page.evaluate(() => document.getElementsByName("PageTips")[0].textContent);
      // 已经登录
      console.log(pageTips);
      process.exit();
    }).catch(async () => {
      const errorMsg = await page.evaluate(() => document.getElementById("message").textContent);
      console.log(errorMsg);
      process.exit();
    });
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map