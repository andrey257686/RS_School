import Component from './base-component.ts';
import { ComponentOptionsInterface } from '../types.ts';

export const label = (options: ComponentOptionsInterface & Partial<HTMLLabelElement>, ...children: Component[]) =>
  new Component({ ...options, tag: 'label' }, ...children);

export const input = (options: ComponentOptionsInterface & Partial<HTMLInputElement>) =>
  new Component<HTMLInputElement>({ ...options, tag: 'input' });

export const button = (options: ComponentOptionsInterface & Partial<HTMLButtonElement>, ...children: Component[]) =>
  new Component({ ...options, tag: 'button' }, ...children);

export const span = (props: ComponentOptionsInterface & Partial<HTMLSpanElement>, ...children: Component[]) =>
  new Component({ ...props, tag: 'span' }, ...children);

export const p = (props: ComponentOptionsInterface & Partial<HTMLParagraphElement>, ...children: Component[]) =>
  new Component({ ...props, tag: 'p' }, ...children);

export const h1 = (props: ComponentOptionsInterface & Partial<HTMLHeadingElement>, ...children: Component[]) =>
  new Component({ ...props, tag: 'h1' }, ...children);

export const div = (props: ComponentOptionsInterface & Partial<HTMLDivElement>, ...children: Component[]) =>
  new Component(props, ...children);

export const canvas = (
  props: ComponentOptionsInterface & Partial<HTMLCanvasElement>,
  ...children: Component<HTMLCanvasElement>[]
) => new Component<HTMLCanvasElement>({ ...props, tag: 'canvas' }, ...children);
