import { UserProps } from "./UserProps";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./models/Attributes";
import { AxiosPromise, AxiosResponse } from "axios";

const URL: string = "http://localhost:3000/users";

export type Callback = () => void;
export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync(URL);
  private attributes: Attributes<UserProps>;
  constructor(private userProps: UserProps) {
    this.attributes = new Attributes<UserProps>(this.userProps);
  }

  //Eventing delegates
  get on() {
    // return this.events.on.bind(this.events);
    return this.events.on; // NOW RETURN AN ARROW FUNCTION
  }
  get trigger() {
    return this.events.trigger.bind(this.events);
    // return this.events.trigger;  // NOW RETURN AN ARROW FUNCTION
  }
  //Sync delegates
  fetch(): void {
    // debugger
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without and id");
    }

    this.sync
      .fetch(id)
      .then((response: AxiosResponse) => {
        this.set(response.data);
      })
      .catch(err => {
        throw err;
      });
  }
  save(): void {
    this.sync.save(this.attributes.getAll()).then((responce: AxiosResponse) => {
      this.events.trigger("save");
    }).catch(() => {
      this.events.trigger('error');
    });
  }
  //Attributes delegates
  get<K extends keyof UserProps>(key: K): UserProps[K] {
    return this.attributes.get(key);
  }
  set(update: UserProps): void {
    // debugger
    this.attributes.set(update);
    this.events.trigger("change");
  }

  toString(): string {
    return `User >>
     id: ${this.attributes.get("id")},
     name: ${this.attributes.get("name")},
     age: ${this.attributes.get("age")}`;
  }
}
