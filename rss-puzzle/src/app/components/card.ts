import Component from './base-component.ts';

export default class Card {
  public canvas: Component<HTMLCanvasElement>;

  public line: number;

  public wordNumber: number;

  public word: string;

  public wordContainer: Component<HTMLElement> | undefined;

  public clickListener: ((this: HTMLCanvasElement, ev: MouseEvent) => void) | undefined;

  public clickListenerDragStart: ((this: HTMLCanvasElement, ev: MouseEvent) => void) | undefined;

  public clickListenerDragEnd: ((this: HTMLCanvasElement, ev: MouseEvent) => void) | undefined;

  public clickListenerDragOver: ((this: HTMLCanvasElement, ev: MouseEvent) => void) | undefined;

  public isCorrect: boolean = false;

  constructor(
    canvas: Component<HTMLCanvasElement>,
    line: number,
    wordNumber: number,
    word: string,
    listener?: () => void,
  ) {
    this.canvas = canvas;
    this.line = line;
    this.wordNumber = wordNumber;
    this.word = word;
    this.clickListener = listener;
  }

  public setWordContainer(wordContainer: Component<HTMLElement>) {
    this.wordContainer = wordContainer;
  }

  public deleteWordContainer() {
    this.wordContainer = undefined;
  }

  public setCorrect(is: boolean) {
    this.isCorrect = is;
  }

  setOutline(color: string) {
    this.canvas.getNode().style.outlineColor = color;
  }
}
