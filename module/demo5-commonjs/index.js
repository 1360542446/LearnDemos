const CommonJS = {
  _modules: {},
  require(moduleId) {
    if (CommonJS._modules[moduleId]) {
      const module = CommonJS._modules[moduleId];
      if (!module.isLoad) {
        module.callback(module.exports, module.require, module);
        module.isLoad = true;
      }
      return module.exports;
    } else {
      throw `没有找到${moduleId}模块`;
    }
  },
  register(moduleId, callback) {
    if (typeof callback !== "function") {
      throw "模块类型需要是function";
    }
    if (!CommonJS._modules[moduleId]) {
      CommonJS._modules[moduleId] = {
        callback,
        require: CommonJS.require,
        exports: {},
        isLoad: false,
      };
    } else {
      throw "此模块id已被注册";
    }
  },
};

// 使用方式
CommonJS.register("ModuleA", function (exports, require, module) {
  // 模块代码
  console.log("ModuleA, init");
  let name = "Luke";
  const setName = (newName) => (name = newName);
  const getName = () => name;
  // 导出变量
  module.exports = {
    setName,
    getName,
  };
});
// 导入变量
const moduleA = CommonJS.require("ModuleA"); // 执行ModuleA代码，输出"ModuleA, init"
console.log(moduleA.getName()); // Luke
moduleA.setName("Tom");
console.log(moduleA.getName()); // Tom
