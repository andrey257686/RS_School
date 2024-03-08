import Component from './components/base-component.ts';

export interface ComponentOptionsInterface {
  tag?: string;
  className: string;
}

export interface ComponentInterface {
  append(child: Component | HTMLElement): void;
  appendChildren(children: (Component | HTMLElement | null)[]): void;
  setTextContent(text: string): void;
  getNode(): HTMLElement;
  toggleClass(className: string): void;
  destroyChildren(): void;
  destroy(): void;
}
