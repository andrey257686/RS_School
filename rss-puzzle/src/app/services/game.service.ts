import data from '../../gamedata/data/wordCollectionLevel1.json';
import { RoundData, GamePage } from '../types.ts';
import Component from '../components/base-component.ts';
import { canvas, div } from '../components/tags.ts';
import randomize from '../utils/utils.ts';
import Card from '../components/card.ts';

export default class GameService {
  public data: RoundData[];

  public page: GamePage | undefined;

  public lineContainers: Component<HTMLElement>[] = [];

  public wordContainers: Component<HTMLElement>[] = [];

  public correctWords: string[][] = [];

  public correctCards: Card[][] = [];

  public activeLine: number = 0;

  public arrCards: Card[][] = [];

  public currentLevel: number = 0;

  public currentState: (Card | null)[][] = [];

  constructor() {
    this.data = data.rounds;
  }

  public start(page: GamePage) {
    this.page = page;
    const level = this.currentLevel;
    this.renderData(page, level);
  }

  public renderData(gamePage: GamePage, level: number) {
    const { words } = this.data[level];
    for (let j = 0; j < words.length; j += 1) {
      const wordsData = words[j];
      const sentence = wordsData.textExample;
      const wordsInSentence = sentence.split(' ');
      this.correctWords[j] = [...wordsInSentence];
      const lineContainer = div({ className: 'game__line_container', id: `line${j}` });
      lineContainer.getNode().style.width = `700px`;
      this.lineContainers.push(lineContainer);
      this.page?.playFieldContainer.append(lineContainer);
      const arr = this.wordWidth(wordsInSentence);
      this.arrCards[j] = [];
      this.correctCards[j] = [];
      this.currentState[j] = [];
      for (let i = 0; i < wordsInSentence.length; i += 1) {
        this.currentState[j][i] = null;
        const word = wordsInSentence[i];
        const widthCardWord = arr[i];
        const wordCanvas = canvas({
          className: 'game__word',
          height: 50,
          width: widthCardWord,
          id: `word${j}_${i}`,
        });
        const card = new Card(wordCanvas, j, i, word);
        card.clickListener = this.handleClickCard.bind(this, card);
        wordCanvas.getNode().addEventListener('click', card.clickListener);
        const ctx = wordCanvas.getNode().getContext('2d');
        if (ctx) {
          ctx.font = '18px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(word, wordCanvas.getNode().width / 2, wordCanvas.getNode().height / 2 + 5);
        }
        if (j !== 0) {
          wordCanvas.getNode().style.display = 'none';
        }
        this.correctCards[j].push(card);
        this.arrCards[j].push(card);
      }
      this.arrCards[j] = randomize(this.arrCards[j]);
    }
    for (let i = 0; i < this.arrCards.length; i += 1) {
      for (let j = 0; j < this.arrCards[i].length; j += 1) {
        gamePage.wordsField.append(this.arrCards[i][j].canvas);
      }
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

  public handleClickCard(card: Card) {
    const { line } = card;
    const { wordNumber } = card;
    if (card.canvas.getNode().parentElement?.id === 'wordsField') {
      for (let i = 0; i < this.currentState[line].length; i += 1) {
        if (this.currentState[line][i] === null) {
          this.currentState[line][i] = card;
          if (i === wordNumber || this.correctWords[line][i] === card.word) {
            card.setCorrect(true);
          }
          break;
        }
      }
      this.renderCurrentState();
    } else {
      this.currentState[line][this.currentState[line].indexOf(card)] = null;
      card.setCorrect(false);
      card.setOutline('blue');
      this.page!.wordsField.prepend(card.canvas);
    }
    this.checkSentence();
  }

  public renderCurrentState() {
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      const currentLine = this.lineContainers[this.activeLine];
      if (this.currentState[this.activeLine][i] !== null) {
        currentLine.append(this.currentState[this.activeLine][i]!.canvas);
      }
    }
  }

  public checkSentence(checkButton = false) {
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      if (this.currentState[this.activeLine][i] === null) {
        this.page!.buttonContinue.getNode().style.opacity = '0.5';
        this.page!.buttonContinue.getNode().setAttribute('disabled', 'true');
        this.page!.buttonCheck.getNode().style.opacity = '0.5';
        this.page!.buttonCheck.getNode().setAttribute('disabled', 'true');
        return;
      }
      if (i === this.currentState[this.activeLine].length - 1) {
        this.page!.buttonCheck.getNode().style.opacity = '1';
        this.page!.buttonCheck.getNode().removeAttribute('disabled');
        let flag = true;
        const currentStateLine = this.currentState[this.activeLine];
        for (let j = 0; j < currentStateLine.length; j += 1) {
          if (!currentStateLine[j]!.isCorrect) {
            flag = false;
            if (checkButton) {
              currentStateLine[j]!.setOutline('red');
            }
          } else if (checkButton) {
            currentStateLine[j]!.setOutline('green');
          }
        }
        if (flag) {
          this.transformCheckToContinue();
        } else {
          this.transformContinueToCheck();
        }
      }
    }
  }

  public nextSentence() {
    this.transformContinueToCheck();
    this.activeLine += 1;
    if (this.activeLine === this.arrCards.length) {
      this.nextRound();
      return;
    }
    for (let i = 0; i < this.arrCards[this.activeLine].length; i += 1) {
      this.arrCards[this.activeLine][i].canvas.getNode().style.display = 'block';
    }
    for (let i = 0; i < this.arrCards[this.activeLine - 1].length; i += 1) {
      this.arrCards[this.activeLine - 1][i].canvas
        .getNode()
        .removeEventListener(
          'click',
          this.arrCards[this.activeLine - 1][i].clickListener as EventListenerOrEventListenerObject,
        );
    }
    this.checkSentence();
  }

  public transformCheckToContinue() {
    if (this.page?.getChildren().indexOf(this.page?.buttonCheck) !== -1) {
      this.page?.remove(this.page.buttonCheck);
    }
    this.page!.buttonCheck.getNode().style.opacity = '0.5';
    this.page!.buttonCheck.getNode().setAttribute('disabled', 'true');
    if (this.page?.getChildren().indexOf(this.page?.buttonContinue) === -1) {
      this.page?.append(this.page!.buttonContinue);
    }
    this.page!.buttonContinue.getNode().style.opacity = '1';
    this.page!.buttonContinue.getNode().removeAttribute('disabled');
  }

  public transformContinueToCheck() {
    if (this.page?.getChildren().indexOf(this.page?.buttonContinue) !== -1) {
      this.page?.remove(this.page!.buttonContinue);
    }
    this.page!.buttonContinue.getNode().style.opacity = '0.5';
    this.page!.buttonContinue.getNode().setAttribute('disabled', 'true');
    if (this.page?.getChildren().indexOf(this.page?.buttonCheck) === -1) {
      this.page?.append(this.page!.buttonCheck);
    }
    this.page!.buttonCheck.getNode().style.opacity = '1';
    this.page!.buttonCheck.getNode().removeAttribute('disabled');
  }

  public autoComplete() {
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      this.currentState[this.activeLine][i] = this.correctCards[this.activeLine][i];
      this.currentState[this.activeLine][i]!.setCorrect(true);
      this.currentState[this.activeLine][i]!.setOutline('green');
    }
    this.renderCurrentState();
    this.checkSentence();
  }

  public nextRound() {
    this.page?.playFieldContainer.setInnerHTML('');
    this.page?.wordsField.setInnerHTML('');
    this.activeLine = 0;
    this.lineContainers = [];
    this.wordContainers = [];
    this.correctWords = [];
    this.activeLine = 0;
    this.arrCards = [];
    this.currentLevel += 1;
    this.renderData(this.page!, this.currentLevel);
    this.checkSentence();
  }
}
