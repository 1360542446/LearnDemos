define("moduleA" /*模块id*/, [
  "require",
  "exports",
  "moduleB",
] /*依赖模块id*/, function (require, exports, moduleB /*加载的模块对象*/) {
  // 导出模块
  exports.getName = function () {
    return moduleB.getName();
    //或
    return require("moduleB").getName();
  };
});

define(["module" /*依赖模块id*/], function (moduleB /*加载的模块对象*/) {
  return {
    getName: function () {
      return moduleB.getName();
    },
  };
});

define({
  add: function (x, y) {
    return x + y;
  },
});
