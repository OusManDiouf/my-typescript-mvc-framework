import {UserProps} from "../UserProps";

export class Attributes<T> {
  constructor(private data: T) {}
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set = (update: T): void => {
    Object.assign(this.data, update);
  };
  getAll(): UserProps {
      return this.data;
  }
}

//RAPPEL: AVANT TU ECRIVAIS DU CODE COMME ÇA :=) !!
// CONTINUNE A EVOLUER POTO ! CA FINIRA PAR PAYER UN DE CES QUATRES INCHALLAH !
// if (propName === "name") {
//   return this.data.name;
// } else if (propName === "age") {
//   return this.data.age;
// } else if (propName === "id") {
//   return this.data.id;
// } else {
//   return new Error(`${propName} n'est pas un prop valide de User!`).message;
// }
