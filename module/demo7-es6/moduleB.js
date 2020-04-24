import { name } from "./moduleA";
console.log("init moduleB");
try {
  console.log("moduleB", name);
} catch (err) {
  console.log(err);
}
export const color = "red";
console.log("Done moduleB");
