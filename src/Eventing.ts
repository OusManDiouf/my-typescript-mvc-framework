export type Callback = () => void;

import {Callback} from "./User";

export class Eventing {

    private events: Map<string, Callback[]> = new Map<string, Callback[]>();
    // public events: { [key: string]: Callback[] } = {};

    on = (eventName: string, cb: Callback):void =>  {
        const handlers = this.events.get(eventName) || [];
        handlers.push(cb);
        this.events.set(eventName, handlers);
    };
    trigger = (eventName: string): void => {
        // altrenative
        // const handlers = this.events.get(eventName) || [];
        // handlers.forEach((cb: Callback) => cb());

        const handlers = this.events.get(eventName);
        if (!handlers || handlers.length === 0) return;
        handlers.forEach(cb => cb());
    };

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
}