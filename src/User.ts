export interface UserProps {
  name?: string;
  age?: number;
}
export type Callback = () => void;
export class User {
  public events: Map<string, Callback[]> = new Map<string, Callback[]>();
  // public events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  // TODO: REFACTORISABLE!
  get(propName: string): string | number | undefined {
    if (propName == "name") {
      return this.data.name;
    } else if (propName == "age") {
      return this.data.age;
    } else {
      return new Error(`${propName} n'est pas un prop valide de User!`).message;
    }
  }
  set(update: UserProps): void {
    this.data = Object.assign(this.data, update);
  }

  // on(eventName: string, cb: Callback): void {
  //   const handlers = this.events[eventName] || [];
  //   handlers.push(cb);
  //   this.events[eventName] = handlers;
  // }
  // trigger(eventName: string): void {
  //   const handlers = this.events[eventName] || [];
  //   handlers.forEach((cb: Callback) => {
  //     cb();
  //   });
  // }

  on(eventName: string, cb: Callback): void {

    const handlers = this.events.get(eventName) || [];
    handlers.push(cb);
    this.events.set(eventName, handlers);
  }
  trigger(eventName: string): void {
    // altrenative
    // const handlers = this.events.get(eventName) || [];
    // handlers.forEach((cb: Callback) => cb());

    const handlers = this.events.get(eventName);
    if (!handlers || handlers.length === 0) return;
    handlers.forEach(cb => cb());
  }
  toString(): void {
    console.log(`User >> name : ${this.data.name}, age: ${this.data.age}`);
  }

  //   fetch(): Promise<UserProps> {}
  //   save(): Promise<UserProps> {}
}
