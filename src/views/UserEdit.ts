import { View } from "./View";
import { User } from "../User";
import { UserProps } from "../UserProps";

export class UserEdit extends View<User, UserProps> {
  regionMap(): { [key: string]: string } {
    return {
        userShow: ".user-show",
        userForm: ".user-form",
    };
  }
  template(): string {
    return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `;
  }
}
