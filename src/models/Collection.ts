import { Eventing } from "../Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, K> {
  private models: T[] = [];
  private events: Eventing = new Eventing();

  constructor(private rootUrl: string, private deserialize: (json: K) => T) {}
  //delegate for Eventing
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });

      this.events.trigger("change");
    });
  }
}
