import { View } from "./View";
import { User } from "../User";
import { UserProps } from "../UserProps";
import {UserShow} from "./UserShow";
import {UserForm} from "./UserForm";

export class UserEdit extends View<User, UserProps> {
  regionMap(): { [key: string]: string } {
    return {
        userShow: ".user-show",
        userForm: ".user-form",
    };
  }

    onRender():void {
        new UserShow(this.regions.userShow,this.model).render();
        new UserForm(this.regions.userForm,this.model).render();
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
