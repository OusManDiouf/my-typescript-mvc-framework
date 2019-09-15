import { User } from "../User";

export class UserForm {
  constructor(private parent: Element, private model: User) {
    this.bindModel();
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

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
    this.parent.innerHTML = "";
    const templateElement: HTMLTemplateElement = document.createElement(
      "template"
    );

    templateElement.innerHTML = this.template();
    this.bindEvent(templateElement.content);

    this.parent.append(templateElement.content);
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
