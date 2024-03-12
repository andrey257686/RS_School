import data from '../../gamedata/data/wordCollectionLevel1.json';
import { RoundData, GamePage } from '../types.ts';
import Component from '../components/base-component.ts';
import { canvas } from '../components/tags.ts';
import randomize from '../utils/utils.ts';

export default class GameService {
  public data: RoundData[];

  public page: GamePage | undefined;

  constructor() {
    this.data = data.rounds;
  }

  public start(page: GamePage) {
    this.page = page;
    const level = 0;
    const sentenceNumber = 6;
    this.renderData(page, level, sentenceNumber);
  }

  public renderData(gamePage: GamePage, level: number, sentenceNumber: number) {
    const { words } = this.data[level];
    const wordsData = words[sentenceNumber];
    const sentence = wordsData.textExample;
    const wordsInSentence = sentence.split(' ');
    let arrCards: Component<HTMLCanvasElement>[] = [];
    const arr = this.wordWidth(wordsInSentence);
    for (let i = 0; i < wordsInSentence.length; i += 1) {
      const word = wordsInSentence[i];
      const widthCardWord = arr[i];
      const wordCanvas = canvas({
        className: 'game__words-field_word',
        height: 50,
        width: widthCardWord,
        id: `word${i}`,
      });
      wordCanvas.addListener('click', () => {
        this.handleClickCard(wordCanvas);
      });
      const ctx = wordCanvas.getNode().getContext('2d');
      if (ctx) {
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(word, wordCanvas.getNode().width / 2, wordCanvas.getNode().height / 2 + 5);
      }
      arrCards.push(wordCanvas);
    }
    arrCards = randomize(arrCards);
    for (let i = 0; i < arrCards.length; i += 1) {
      gamePage.wordsField.append(arrCards[i]);
    }
  }

  public wordWidth(words: string[]): number[] {
    const widths = new Array(words.length).fill(0);
    const maxWidth = Number(this.page!.playFieldContainer.getNode().getAttribute('data-width')!);
    const charWidth = 9;
    let totalWordWidth = 0;
    for (let i = 0; i < words.length; i += 1) {
      totalWordWidth += words[i].length;
      widths[i] = words[i].length * charWidth;
    }
    const scaleFactor = totalWordWidth > maxWidth ? maxWidth / totalWordWidth : 1;
    for (let i = 0; i < widths.length; i += 1) {
      widths[i] = Math.round(widths[i] * scaleFactor);
    }
    let totalWidth = widths.reduce((sum, width) => sum + width, 0);
    if (totalWidth !== maxWidth) {
      const difference = maxWidth - totalWidth;
      const ratio = difference / totalWidth;
      for (let i = 0; i < widths.length; i += 1) {
        widths[i] += Math.round(widths[i] * ratio);
      }
      totalWidth = widths.reduce((sum, width) => sum + width, 0);
      if (totalWidth !== maxWidth) {
        widths[widths.length - 1] += maxWidth - totalWidth;
      }
    }
    return widths;
  }

  public handleClickCard(card: Component<HTMLCanvasElement>) {
    if (card.getNode().parentElement?.id === 'wordsField') {
      this.page!.playFieldContainer.append(card);
    } else {
      this.page!.wordsField.prepend(card);
    }
  }
}
