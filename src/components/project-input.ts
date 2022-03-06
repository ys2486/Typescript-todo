import Cmp from './base-component';
import * as validation from '../util/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  //プロパティ
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  //コンストラクター
  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      '#manday'
    ) as HTMLInputElement;

    this.configure();
  }

  //メソッド

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      this.clearInput();
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    const titleValidatable: validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: validation.Validatable = {
      value: enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      !validation.validate(titleValidatable) ||
      !validation.validate(descriptionValidatable) ||
      !validation.validate(mandayValidatable)
      // enteredTitle.trim().length === 0 ||
      // enteredDescription.trim().length === 0 ||
      // enteredManday.trim().length === 0
    ) {
      alert('入力値が正しくありません。再度お試しください。');
      this.clearInput();
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value = '';
  }
}
