import Card from '../components/card.ts';

export default function randomize(arr: Card[]) {
  return arr.sort(() => Math.random() - 0.5);
}
