import Component from './components/base-component.ts';

export interface ComponentOptionsInterface {
  tag?: keyof HTMLElementTagNameMap;
  className: string;
}

export interface ComponentInterface<T extends HTMLElement> {
  append(child: Component<T>): void;
  appendChildren(children: Component<T>[]): void;
  setTextContent(text: string): void;
  getNode(): T;
  toggleClass(className: string): void;
  destroyChildren(): void;
  destroy(): void;
}

export enum errorMessages {
  invalidCharacters = 'Use only latin letters',
  firstLetterNotCapital = 'First letter should be capital',
  minLength = 'Min length should be 3',
}
