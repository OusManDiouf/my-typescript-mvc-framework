import { User } from "./User";
import axios from "axios";

const URL: string = "http://localhost:3000/users";

const user = new User({ name: "oussoulessou", age: 30 });
user.on("event1", () => {
  console.log("event1");
});
user.on("event1", () => {
  console.log("event2");
});
user.on("event1", () => {
  console.log("event3");
});
user.on("e", () => {
  console.log("event3");
});

console.log(user.events);

user.trigger("even1");

// axios.post(URL,{name : "oussou", age:25}).then((response) => {
//   console.log(response);
// });

axios.get(URL).then(data => {
  console.log(data);
});

axios.get(URL+"/"+"1").then(data => {
  console.log(data);
});



// user.set({ name: "zepek", age: 25 });
// console.log(user.toString());
//
// console.log(user.get("name"));
// console.log(user.get("age"));
// console.log(user.get("ag"));
// user.trigger("event1");

//saving user
// user.save();
