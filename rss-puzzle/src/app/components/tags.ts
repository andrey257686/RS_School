import Component from './base-component.ts';
import { ComponentOptionsInterface } from '../types.ts';

export const label = (options: ComponentOptionsInterface & Partial<HTMLLabelElement>, ...children: Component[]) =>
  new Component({ ...options, tag: 'label' }, ...children);

export const input = (options: ComponentOptionsInterface & Partial<HTMLInputElement>, ...children: Component[]) =>
  new Component({ ...options, tag: 'input' }, ...children);

export const button = (options: ComponentOptionsInterface & Partial<HTMLButtonElement>, ...children: Component[]) =>
  new Component({ ...options, tag: 'button' }, ...children);
