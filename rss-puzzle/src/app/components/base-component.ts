import { ComponentOptionsInterface, ComponentInterface } from '../types.ts';

export default class Component<T extends HTMLElement = HTMLElement> implements ComponentInterface<T> {
  protected node: T;

  protected children: Component<T>[] = [];

  constructor(options: ComponentOptionsInterface, ...children: Component<T>[]) {
    const node = document.createElement(options.tag || 'div');
    Object.assign(node, options);
    this.node = node as unknown as T;

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

  appendChildren(children: Component<T>[]) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  append(child: Component<T>) {
    this.children.push(child);
    if (this.node instanceof HTMLElement) {
      this.node.append(child.getNode());
    }
  }

  setTextContent(content: string) {
    this.node.textContent = content;
  }

  setInnerHTML(content: string) {
    this.node.innerHTML = content;
  }

  setAttribute(attribute: string, value: string) {
    if (this.node instanceof HTMLElement) {
      this.node.setAttribute(attribute, value);
    }
    // this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string) {
    if (this.node instanceof HTMLElement) {
      this.node.removeAttribute(attribute);
    }
  }

  toggleClass(className: string) {
    if (this.node instanceof HTMLElement) {
      this.node.classList.toggle(className);
    }
  }

  addClass(className: string) {
    if (this.node instanceof HTMLElement) {
      this.node.classList.add(className);
    }
  }

  removeClass(className: string) {
    if (this.node instanceof HTMLElement) {
      this.node.classList.remove(className);
    }
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
    if (this.node instanceof HTMLElement) {
      this.node.remove();
    }
  }
}
