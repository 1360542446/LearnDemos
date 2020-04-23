define("moduleB", ["moduleA"], function () {
  console.log("init moduleB");

  return {
    name: "Luke",
    getName: function () {
      return this.name;
    },
  };
});
