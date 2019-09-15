export class UserForm {
  constructor(private parent: Element) {}

  template(): string {
    return `
        <div>
          <h1>User Form</h1>
          <input/>
          <button>clickMe</button>
        </div>
        `;
  }

  eventMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButonClick,
      "mouseover:h1": this.onHeaderHover,
    };
  }

  onButonClick(): void {
    console.log("click");
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

  private onHeaderHover() {
    console.log("onHeaderHover on h1");
  }
}
