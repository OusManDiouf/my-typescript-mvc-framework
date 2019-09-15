import { View } from "./View";
import { User } from "../User";
import { UserProps } from "../UserProps";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
<div>
  <h1>Details Utilisateur</h1>
  <div>Nom Utilisateur: ${this.model.get("name")}</div>
  <div>Nom age: ${this.model.get("age")}</div>
</div>
        `;
  }
}
