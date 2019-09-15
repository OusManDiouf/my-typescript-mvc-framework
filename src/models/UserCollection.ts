import { User } from "../User";
import { Eventing } from "../Eventing";
import axios, { AxiosResponse } from "axios";
import { UserProps } from "../UserProps";

export class UserCollection {
  private models: User[] = [];
  private events: Eventing = new Eventing();
  constructor(private rootUrl: string) {}
  //delegate for Eventing
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: UserProps) => {
        this.models.push(User.buildUser(value));
      });
      this.events.trigger("change");
    });
  }
}
