import { User } from "../User";

export class UserForm {
  constructor(private parent: Element, private model: User) {}

  template(): string {
    return `
        <div>
          <h1>User Form</h1>
          <input/>
          <button class="set-age">Set random Age</button>
          <button>clickMe</button>
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
    };
  }


  bindEvent(fragment: DocumentFragment): void {
    const eventMap = this.eventMap();

    for (let eventKey in this.eventMap()) {
      const [eventName, selector] = eventKey.split(":");

      fragment
        .querySelectorAll(selector)
        .forEach(el => el.addEventListener(eventName, eventMap[eventKey]));
    }
  }

  render(): void {
    const templateElement: HTMLTemplateElement = document.createElement(
      "template"
    );

    templateElement.innerHTML = this.template();
    this.bindEvent(templateElement.content);

    this.parent.append(templateElement.content);
  }

  onSetAgeClick = ():void  =>  {
    this.model.setRandomAge();
  }
}
