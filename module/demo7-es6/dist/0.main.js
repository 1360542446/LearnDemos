(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./moduleA.js":
/*!********************!*\
  !*** ./moduleA.js ***!
  \********************/
/*! exports provided: name */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony import */ var _moduleB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleB */ "./moduleB.js");

console.log("init moduleA");
try {
  console.log("moduleA", _moduleB__WEBPACK_IMPORTED_MODULE_0__["color"]);
} catch (err) {
  console.log(err);
}
const name = "Luke";
console.log("Done moduleA");


/***/ }),

/***/ "./moduleB.js":
/*!********************!*\
  !*** ./moduleB.js ***!
  \********************/
/*! exports provided: color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony import */ var _moduleA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleA */ "./moduleA.js");

console.log("init moduleB");
try {
  console.log("moduleB", _moduleA__WEBPACK_IMPORTED_MODULE_0__["name"]);
} catch (err) {
  console.log(err);
}
const color = "red";
console.log("Done moduleB");


/***/ })

}]);
//# sourceMappingURL=0.main.js.map