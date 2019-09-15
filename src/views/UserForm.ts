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
      "click:button": this.onButonClick
    };
  }

  onButonClick(): void {
    console.log("click");
  }

  render(): void {
    const templateElement: HTMLTemplateElement = document.createElement(
      "template"
    );
    templateElement.innerHTML = this.template();

    this.parent.append(templateElement.content);
  }
}
