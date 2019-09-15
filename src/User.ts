import { UserProps } from "./UserProps";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./models/Attributes";
import { AxiosPromise, AxiosResponse } from "axios";
import { Model } from "./models/Model";

export type Callback = () => void;
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>("http://localhost:3000/users")
    );
  }
}
