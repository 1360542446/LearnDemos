console.log("init moduleB");
console.log("在moduleB中:", require("./moduleA").name);
module.exports = { name: "Tom" };
console.log("Done moduleB");


console.log(module.parent)