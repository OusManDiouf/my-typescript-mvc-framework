import { User } from "../User";
import {View} from "./View";

export class UserForm  extends View{


  template(): string {
    return `
        <div>
          <h1>User Form</h1>
          <input/>
          <button class="set-name">Change Name</button>
          <button class="set-age">Set random Age</button>
          <hr>
          <h2>Nom: ${this.model.get("name")}</h2>
          <h2>Nom: ${this.model.get("age")}</h2>
          <hr>
        </div>
        `;
  }

  eventMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }



  private onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  private onSetNameClick = () => {
    const input = this.parent.querySelector("input");

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }
}
