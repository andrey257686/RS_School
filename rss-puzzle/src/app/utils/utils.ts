import Card from '../components/card.ts';

function randomize(arr: Card[]) {
  return arr.sort(() => Math.random() - 0.5);
}

function resizeImage(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, width, height);

  return canvas;
}

export { randomize, resizeImage };
