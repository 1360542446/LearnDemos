((global) => {
  const _mods = {};
  global._mods = _mods;
  let count = 0;
  const Module = function (id, dependencies, factory) {
    const newDependencies = Array.isArray(dependencies) ? dependencies : [];

    Object.assign(this, {
      id,
      factory,
      dependencies: newDependencies,
      exports: {},
      length: newDependencies.length,
      dependencies2: newDependencies,
      isLoaded: false,
      subs: [],
      listeners: [],
      order: count++, // 处理循环加载  order最大的在最先被处理
    });
    this.load(newDependencies);

    if (id) {
      _mods[id] = this;
    }
  };

  const isObject = (obj) =>
    Object.prototype.toString.call(obj) === "[object Object]";

  const isFunction = (fn) => typeof fn === "function";

  const del = (arr = [], item) => {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  Module.prototype.exec = function () {
    if (isObject(this.factory)) {
      this.exports = factory;
    }

    if (isFunction(this.factory)) {
      const result = this.factory.apply(
        this,
        this.dependencies.map((key) => {
          return _mods[key].exports || {};
        })
      );
      if (this.id) {
        this.exports = result;
      }
    }
    this.isLoaded = true;
  };
  Module.prototype.checkLoaded = function () {
    this.length === 0 && this.exec();
    this.subs.forEach((item) => {
      del(item.dependencies2, this.id);
      item.checkLoaded()
    });
  };

  Module.prototype.fetch = function (moduleId) {
    const scriptEle = document.createElement("script");
    scriptEle.src = moduleId + ".js";
    scriptEle.onload = () => {
      this.checkLoaded();
    };

    scriptEle.onerror = () => {
      _mods[moduleId] = { isLoaded: true, exports: {}, order: count++ };
      this.checkLoaded();
    };

    document.body.appendChild(scriptEle);
  };

  Module.prototype.load = function () {
    if (this.dependencies.length === 0) {
      this.checkLoaded();
      return;
    }

    this.dependencies.forEach((moduleId) => {
      if (_mods[moduleId]) {
        this.length--;
        // if (_mods[moduleId].isLoaded) {
        this.checkLoaded();
        return;
        // }
      } else {
        this.fetch(moduleId);
      }
    });
  };

  const define = (...args) => {
    let [id, dependencies, factory] = ["", [], {}];
    if (args.length === 0 || args.length > 3) {
      return;
    }
    if (args.length === 1 && isFunction(args[0])) {
      factory = args[0];
    }
    if (
      args.length === 2 &&
      Array.isArray(args[0]) &&
      (isFunction(args[1]) || isObject(args[1]))
    ) {
      dependencies = args[0];
      factory = args[1];
    }

    if (args.length === 3) {
      [id, dependencies, factory] = args;
    }

    if (!(isFunction(factory) || isObject(factory))) {
      throw "factory 需要为函数类型或者对象类型";
    }
    const moduleId = id;
    if (_mods.hasOwnProperty(id)) {
      throw `${moduleId}, : 已被注册`;
    }

    new Module(moduleId, dependencies, factory);
  };
  global.define = define;
})(window, document);
