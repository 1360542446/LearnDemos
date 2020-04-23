const moduleA = require("./moduleA");

console.log(moduleA.name);
moduleA.setName("Luke");
console.log(moduleA.name);

const moduleB = require("./moduleB");

console.log(moduleB.info.name);
moduleB.setName("Luke");
console.log(moduleB.info.name);
