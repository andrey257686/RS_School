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
    console.log(this.data);
  }

  public start(page: GamePage) {
    this.page = page;
    const level = 0;
    const sentenceNumber = 1;
    this.renderData(page, level, sentenceNumber);
  }

  public renderData(gamePage: GamePage, level: number, sentenceNumber: number) {
    const { words } = this.data[level];
    const wordsData = words[sentenceNumber];
    const sentence = wordsData.textExample;
    const wordsInSentence = sentence.split(' ');
    const widthCardWord =
      Number(gamePage.playFieldContainer.getNode().getAttribute('data-width')) / wordsInSentence.length;
    let arrCards: Component<HTMLCanvasElement>[] = [];
    for (let i = 0; i < wordsInSentence.length; i += 1) {
      const word = wordsInSentence[i];
      const wordCanvas = canvas({
        className: 'game__words-field_word',
        height: 70,
        width: widthCardWord,
        id: `word${i}`,
      });
      wordCanvas.addListener('click', () => {
        this.handleClickCard(wordCanvas);
      });
      const ctx = wordCanvas.getNode().getContext('2d');
      if (ctx) {
        ctx.font = 'bold 20px Arial';
        ctx.fillText(word, 0, 40);
      }
      arrCards.push(wordCanvas);
    }
    arrCards = randomize(arrCards);
    for (let i = 0; i < arrCards.length; i += 1) {
      gamePage.wordsField.append(arrCards[i]);
    }
  }

  public handleClickCard(card: Component<HTMLCanvasElement>) {
    this.page!.playFieldContainer.append(card);
  }
}
