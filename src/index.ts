import { User } from "./User";
import { Collection } from "./models/Collection";
import { Eventing } from "./Eventing";
import { Events } from "./models/Model";
import { UserProps } from "./UserProps";
import { UserForm } from "./views/UserForm";

// ------------------------------------------------
// TESTING FETCH METHOD
// ------------------------------------------------
// const user1 = new User({ id: 14});

// user1.on("change", () => {
//   console.log("User was change !");
//   console.log(user1);
// });
// user1.fetch();

// ------------------------------------------------
// TESTING SAVE METHOD
// ------------------------------------------------
// const user99 = new User({name:"anowhther", age:455});
// user99.on("save", () => {
//   console.log("User saved !");
// });
// user99.on("error", () => {
//   console.log("Error while saving user !");
// });
// user99.save();

// ------------------------------------------------

// const u = new User({ name: "alicia", age: 45 });
// // u.sync.save();
//
// //recupére un user dans la bd via son id et enregistre les données retrouvées dans l'objet user courrant
// const u2 = new User({ id: 6 });
// // u2.sync.fetch(6).then(response => {
// //   let { id, name, age } = response.data;
// //   console.log("Fetched user: " + id + " " + name + " " + age);
// // });
// //
// // setTimeout(() => {
// //   console.log(u2);
// // }, 4000);
//

// -------------------------------------------------------------
// const u3 = new User({ id: 9, name: "lynda", age: 24 });
// u3.on("change", () => {
//   console.log("User was change !");
//   console.log(u3);
// });
// // u3.sync.save(u3.data).then(response => {
// //   console.log("DAta SAved: " + response.data);
// // });
// u3.save({ id: 14, name: "KILOWAT", age: 11111111}).then(response => {
//   u3.set(response.data);
// });
//
//
// u3.fetch();
//
// setTimeout(() => {
//   console.log("DAta SAved Async \n" + u3);
// },5000);
//

// ----------------------------------------------------------------------------------------------

// const user = User.buildUser({id:1});
// user.on("change", () => {
//  console.log("User props get updated !");
// });
// user.fetch();
// setTimeout(() => {
//   console.log(user);
// },3000);

// ----------------------------------------------------------------------------------------------
// // Collection
// let uCol =User.buildUserCollection();
// uCol.on("change", () => {
//   console.log(uCol);
// });
// uCol.fetch();
// ----------------------------------------------------------------------------------------------
// Template element Test

const rootElement = document.querySelector("#root");
const user = User.buildUser({ name: "zooulou", age: 444 });
if (rootElement) {
  const userForm = new UserForm(rootElement, user);
  userForm.render();
} else {
  throw new Error("Root Element not found !")
}
