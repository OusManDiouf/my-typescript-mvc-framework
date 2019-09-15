// interface ModelForView {
//   on(eventName: string, cb: () => void): void;
//  ajout de chaque méthode du model requis par View  !!
// }
// export abstract class View<T extends ModelForView> {
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  constructor(protected parent: Element, protected model: T) {
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
