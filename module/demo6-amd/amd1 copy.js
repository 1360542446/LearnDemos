// define(id?, dependencies?, factory);

((global) => {
  //define(id?, dependencies?, factory);
  global.define = function (...args) {
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

    if (_mods[id]) {
      throw `${id}, : 已被注册`;
    }

    new Module(
      id,
      Array.isArray(dependencies) ? dependencies : [],
      factory
    ).load();
  };
  const _mods = Object.create(null); // 不存在原型链
  const sbuMap = Object.create(null);
  const fetchingModule = Object.create(null); // 记录模块已经被网络加载完毕
  const fetchedModule = Object.create(null); // 记录模块已经被网络加载完毕

  global._mods = _mods;
  const isObject = (obj) =>
    Object.prototype.toString.call(obj) === "[object Object]";

  const isFunction = (fn) => typeof fn === "function";

  const del = (arr = [], item) => {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  const Module = function (id, deps = [], factory = {}) {
    Object.assign(this, {
      id,
      factory,
      deps, // string []
      copyDeps: deps,
      subscriber: [],
      isReady: false,
      exports: {}, // 存放导出的变量
    });

    if (id && !_mods[id]) {
      // 放置缓存中
      _mods[id] = this;
    }

    deps.forEach((dep) => {
      if (sbuMap[dep]) {
        sbuMap[dep].push(this);
      } else {
        sbuMap[dep] = [this];
      }
    });
  };
  Module.prototype.exec = function () {
    if (isObject(this.factory)) {
      this.exports = this.factory;
    }

    if (isFunction(this.factory)) {
      const result = this.factory.apply(
        this,
        this.deps.map((key) => {
          return _mods[key].exports || {};
        })
      );
      if (this.id) {
        this.exports = result;
      }
    }

    this.isReady = true;
  };
  Module.prototype.load = function () {
    let count = 0;
    this.deps.forEach((dep) => {
      if (_mods[dep] && _mods[dep].isReady) {
        count++;
      }
      if (!fetchedModule[dep]) {
        this.fetch(dep);
      }
      //   if(!fetchedModule[dep]){

      //   }
      //   const module = _mods[dep];
      //   if (!module) return;
      //   if (module.isReady) {
      //     count++;
      //   } else if (!fetchedModule[dep]) {
      //     module.fetch();
      //   }
    });

    if (count === this.deps.length) this.exec();
  };
  Module.prototype.fetch = function (id) {
    const scriptEle = document.createElement("script");
    scriptEle.src = id + ".js";
    scriptEle.onload = () => {
      fetchedModule[id] = true;
    };

    scriptEle.onerror = () => {
      // 暂不考虑
    };

    document.body.appendChild(scriptEle);
  };
})(window);
