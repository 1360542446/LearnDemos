import { color } from "./moduleB";
console.log("init moduleA");
try {
  console.log("moduleA", color);
} catch (err) {
  console.log(err);
}
export const name = "Luke";
console.log("Done moduleA");
