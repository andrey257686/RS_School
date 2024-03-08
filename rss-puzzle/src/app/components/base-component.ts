import { ComponentOptionsInterface, ComponentInterface } from '../types.ts';

export default class Component implements ComponentInterface {
  protected node: HTMLElement;

  protected children: Component[] = [];

  constructor(options: ComponentOptionsInterface, ...children: Component[]) {
    const node = document.createElement(options.tag || 'div');
    Object.assign(node, options);
    this.node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  getNode() {
    return this.node;
  }

  getChildren() {
    return this.children;
  }

  appendChildren(children: Component[]) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  append(child: Component) {
    this.children.push(child);
    this.node.append(child.getNode());
  }

  setTextContent(content: string) {
    this.node.textContent = content;
  }

  setAttribute(attribute: string, value: string) {
    this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string) {
    this.node.removeAttribute(attribute);
  }

  toggleClass(className: string) {
    this.node.classList.toggle(className);
  }

  addListener(event: string, listener: EventListener, options: boolean) {
    this.node.addEventListener(event, listener, options);
  }

  removeListener(event: string, listener: EventListener, options: boolean) {
    this.node.removeEventListener(event, listener, options);
  }

  destroyChildren() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  destroy() {
    this.destroyChildren();
    this.node.remove();
  }
}
