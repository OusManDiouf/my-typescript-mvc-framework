// interface ModelForView {
//   on(eventName: string, cb: () => void): void;
//  ajout de chaque méthode du model requis par View  !!
// }
// export abstract class View<T extends ModelForView> {
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  // reference sur les elements où l'on veut imbriquer les vues
  regions: { [key: string]: Element } = {};

  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventMap(): { [key: string]: () => void } {
    return {};
  }

  regionMap(): { [key: string]: string } {
    return {};
  }

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
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }

  private mapRegions(fragment: DocumentFragment):void {
    const regionsMap = this.regionMap();
    for(let key in regionsMap){
          const selector = regionsMap[key];
          const element =  fragment.querySelector(selector);
          if (element) this.regions[key] = element;
    }
  }

   onRender():void {

  }
}
