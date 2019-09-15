import { User } from "../User";

export abstract class View {
  constructor(protected parent: Element, protected model: User) {
    this.bindModel();
  }

  abstract template(): string;
  abstract eventMap(): { [key: string]: () => void };

  bindModel() {

    this.model.on("change", () => {
      this.render();
    });
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
}
