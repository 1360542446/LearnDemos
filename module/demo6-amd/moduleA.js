define("moduleA", ["moduleB"], function () {
  console.log("init moduleA");
  return {
    name: "Luke",
    getName: function () {
      return this.name;
    },
  };
});
