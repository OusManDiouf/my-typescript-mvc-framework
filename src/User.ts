import { UserProps } from "./UserProps";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./models/Attributes";
import { Model } from "./models/Model";
import {Collection} from "./models/Collection";

const rootUrl = "http://localhost:3000/users";

export type Callback = () => void;
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
  static buildUserCollection(): Collection<User,UserProps> {
    return new Collection<User, UserProps>(
        rootUrl,
        (json: UserProps) => User.buildUser(json)
    )
  }

  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({age});
  }
}
