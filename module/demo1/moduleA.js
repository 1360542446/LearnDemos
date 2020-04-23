console.log("init moduleA");
console.log("在moduleA中: ", require("./moduleB").name);
module.exports = { name: "Luke" };
console.log("Done moduleA");






// console.log(module.parent)









// init moduleA
// init moduleB
// 在moduleB中: undefined
// Done moduleB
// 在moduleA中:  Tom
// Done moduleA