import { AxiosPromise, AxiosResponse } from "axios";


interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}
interface Events {
  on(eventName: string, cb: () => void): void;
  trigger(eventName: string): void;
}

interface HasID {
  id?: number;
}
export class Model<T extends HasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  //Eventing delegates
  get on() {
    // return this.events.on.bind(this.events);
    return this.events.on; // NOW RETURN AN ARROW FUNCTION
  }
  get trigger() {
    return this.events.trigger.bind(this.events);
    // return this.events.trigger;  // NOW RETURN AN ARROW FUNCTION
  }
  //ApiSync delegates
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
    this.sync
      .save(this.attributes.getAll())
      .then((responce: AxiosResponse) => {
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
  //Attributes delegates
  get<K extends keyof T>(key: K): T[K] {
    return this.attributes.get(key);
  }
  set(update: T): void {
    // debugger
    this.attributes.set(update);
    this.events.trigger("change");
  }
}
