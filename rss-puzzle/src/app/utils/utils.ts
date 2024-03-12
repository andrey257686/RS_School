import Component from '../components/base-component.ts';

export default function randomize(arr: Component<HTMLCanvasElement>[]) {
  return arr.sort(() => Math.random() - 0.5);
}
