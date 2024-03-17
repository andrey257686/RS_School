import data from '../../gamedata/data/wordCollectionLevel1.json';
import { RoundData, GamePage } from '../types.ts';
import Component from '../components/base-component.ts';
import { canvas, div } from '../components/tags.ts';
import { resizeImage, randomize } from '../utils/utils.ts';
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

  public clickedCard: Card;

  public draggedCard: Card;

  public resizedCanvas: HTMLCanvasElement | undefined;

  public isHintTranslation: boolean = false;

  constructor() {
    this.data = data.rounds;
    this.draggedCard = new Card(canvas({ className: 'empty' }), 0, 0, '');
    this.clickedCard = new Card(canvas({ className: 'empty' }), 0, 0, '');
  }

  public start(page: GamePage) {
    this.page = page;
    const level = this.currentLevel;
    this.updateHintTranslationSentence();
    this.loadImageAndRenderData(page, level);
  }

  public loadImageAndRenderData(page: GamePage, level: number) {
    const image = new Image();
    image.src = `/src/gamedata/images/${data.rounds[this.currentLevel].levelData.imageSrc}`;
    image.onload = () => {
      this.resizedCanvas = resizeImage(image, 700, 500);
      this.page!.playFieldContainer.getNode().style.backgroundImage = `url(${this.resizedCanvas.toDataURL()})`;
      this.page!.playFieldContainer.getNode().style.backgroundSize = 'cover';

      this.renderData(page, level);
    };
  }

  public hintButtonTranslate() {
    this.isHintTranslation = !this.isHintTranslation;
    this.page?.buttonHintTranslation.getNode().classList.toggle('checked');
    if (this.isHintTranslation) {
      this.page!.hintTranslationSentence.getNode().style.opacity = '1';
    } else {
      this.page!.hintTranslationSentence.getNode().style.opacity = '0';
    }
    this.updateHintTranslationSentence();
  }

  public hintButtonPronunciation() {
    const audio = new Audio(`/src/gamedata/${data.rounds[this.currentLevel].words[this.activeLine].audioExample}`);
    audio.addEventListener('play', () => {
      this.page!.buttonHintPronunciation.getNode().querySelector('svg')?.classList.add('pulsating');
      this.page!.buttonHintPronunciation.getNode().classList.add('checked');
    });
    audio.addEventListener('pause', () => {
      this.page!.buttonHintPronunciation.getNode().querySelector('svg')?.classList.remove('pulsating');
      this.page!.buttonHintPronunciation.getNode().classList.remove('checked');
    });
    audio.play();
  }

  public updateHintTranslationSentence() {
    this.page!.hintTranslationSentence.getNode().innerHTML =
      data.rounds[this.currentLevel].words[this.activeLine].textExampleTranslate;
    if (this.isHintTranslation) {
      this.page!.hintTranslationSentence.getNode().style.opacity = '1';
    } else {
      this.page!.hintTranslationSentence.getNode().style.opacity = '0';
    }
  }

  public handleDropPlayField(event: MouseEvent) {
    const { line } = this.draggedCard;
    const currentCard = this.draggedCard;
    currentCard.canvas.getNode().style.animation = 'fadeIn 0.5s ease-in-out forwards';
    setInterval(() => {
      currentCard.canvas.getNode().style.animation = '';
    }, 500);
    if (this.draggedCard.canvas.getNode().parentElement?.id === 'wordsField') {
      const underCard = this.getCardUnderCursor(event);
      if (underCard.resultCard !== null) {
        this.insertCard(this.draggedCard, underCard);
      } else {
        for (let i = 0; i < this.currentState[line].length; i += 1) {
          if (this.currentState[line][i] === null) {
            this.currentState[line][i] = this.draggedCard;
            break;
          }
        }
      }
    } else {
      const underCard = this.getCardUnderCursor(event);
      if (underCard.resultCard !== null) {
        this.insertCard(this.draggedCard, underCard);
      } else {
        const isOutLine = this.isOutLine(event);
        if (!isOutLine) {
          const firstNotNullIndex = this.currentState[this.activeLine].findIndex((element) => element === null);
          if (firstNotNullIndex !== -1) {
            const elementToMoveIndex = this.currentState[this.activeLine].indexOf(this.draggedCard);
            this.currentState[this.activeLine].splice(elementToMoveIndex, 1);
            this.currentState[this.activeLine].splice(firstNotNullIndex - 1, 0, this.draggedCard);
          }
        }
      }
    }
    this.renderCurrentState();
    this.checkSentence();
  }

  public insertCard(draggedCard: Card, underCard: { resultCard: Card | null; position: string }) {
    const { position } = underCard;
    const { resultCard } = underCard;
    if (position === 'left') {
      this.currentState[this.activeLine].splice(this.currentState[this.activeLine].indexOf(draggedCard), 1);
      this.currentState[this.activeLine].splice(this.currentState[this.activeLine].indexOf(resultCard), 0, draggedCard);
    } else if (position === 'right') {
      this.currentState[this.activeLine].splice(this.currentState[this.activeLine].indexOf(draggedCard), 1);
      this.currentState[this.activeLine].splice(
        this.currentState[this.activeLine].indexOf(resultCard) + 1,
        0,
        draggedCard,
      );
    }
  }

  public isOutLine(event: MouseEvent): boolean {
    const currentCardRect = this.draggedCard.canvas.getNode().getBoundingClientRect();
    if (event.clientY > currentCardRect.bottom) {
      return true;
    }
    return false;
  }

  public getCardUnderCursor(event: MouseEvent): { resultCard: Card | null; position: string } {
    let resultCard: Card | null = null;
    let position: string = '';
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      if (this.currentState[this.activeLine][i] !== null) {
        const tmpresultCard = this.currentState[this.activeLine][i];
        const resultCardRect = tmpresultCard!.canvas.getNode().getBoundingClientRect();
        const resultCardBegin = resultCardRect.x;
        const resultCardEnd = resultCardRect.x + resultCardRect.width;
        const resultCardMid = resultCardRect.x + resultCardRect.width / 2;
        if (
          event.clientX > resultCardBegin &&
          event.clientX < resultCardEnd &&
          event.clientY > resultCardRect.y &&
          event.clientY < resultCardRect.y + resultCardRect.height
        ) {
          resultCard = tmpresultCard;
          if (event.clientX > resultCardMid) {
            position = 'right';
          } else {
            position = 'left';
          }
          break;
        }
      }
    }
    return {
      resultCard,
      position,
    };
  }

  public defineCorrect() {
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      if (this.currentState[this.activeLine][i] !== null) {
        if (this.currentState[this.activeLine][i] === this.correctCards[this.activeLine][i]) {
          this.currentState[this.activeLine][i]!.setCorrect(true);
        } else {
          this.currentState[this.activeLine][i]!.setCorrect(false);
        }
      }
    }
  }

  public handleDropWordsField() {
    const { line } = this.draggedCard;
    const currentCard = this.draggedCard;
    currentCard.canvas.getNode().style.animation = 'fadeIn 0.5s ease-in-out forwards';
    setInterval(() => {
      currentCard.canvas.getNode().style.animation = '';
    }, 500);
    if (this.draggedCard.canvas.getNode().closest('#playField')) {
      const indexCard = this.currentState[line].indexOf(this.draggedCard);
      this.currentState[line].splice(indexCard, 1);
      this.currentState[line].push(null);
      this.page!.wordsField.prepend(this.draggedCard.canvas);
    }
    this.renderCurrentState();
    this.checkSentence();
  }

  public renderData(gamePage: GamePage, level: number) {
    const { words } = this.data[level];
    let offsetWidth = 0;
    for (let j = 0; j < words.length; j += 1) {
      offsetWidth = 0;
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
        const pieceWidth = widthCardWord;
        const pieceHeight = 50;
        const wordCanvas = canvas({
          className: 'game__word',
          height: 50,
          width: widthCardWord,
          id: `word${j}_${i}`,
        });
        const card = new Card(wordCanvas, j, i, word);
        card.clickListener = this.handleClickCard.bind(this, card);
        card.clickListenerDragStart = this.handleDragStart.bind(this, card);
        card.canvas.getNode().draggable = true;
        wordCanvas.getNode().addEventListener('click', card.clickListener);
        wordCanvas.getNode().addEventListener('dragstart', card.clickListenerDragStart);
        const ctx = wordCanvas.getNode().getContext('2d');
        wordCanvas.getNode().width = widthCardWord;
        wordCanvas.getNode().height = 50;
        if (this.resizedCanvas) {
          ctx?.drawImage(
            this.resizedCanvas,
            offsetWidth,
            j * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight,
          );
        }
        offsetWidth += widthCardWord;
        if (ctx) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 4;
          ctx.fillStyle = 'black';
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.font = '18px Arial';
          ctx.textAlign = 'center';
          ctx.strokeText(word, wordCanvas.getNode().width / 2, wordCanvas.getNode().height / 2 + 5); // Рисует контур текста
          ctx.fillText(word, wordCanvas.getNode().width / 2, wordCanvas.getNode().height / 2 + 5);
        }
        if (j !== 0) {
          wordCanvas.getNode().style.display = 'none';
        }
        this.page?.playFieldContainer.append(wordCanvas);
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

  public handleDragStart(card: Card) {
    this.draggedCard = card;
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
    const currentCard = card;
    currentCard.canvas.getNode().style.animation = 'fadeIn 0.5s ease-in-out forwards';
    setInterval(() => {
      currentCard.canvas.getNode().style.animation = '';
    }, 500);
    if (card.canvas.getNode().parentElement?.id === 'wordsField') {
      for (let i = 0; i < this.currentState[line].length; i += 1) {
        if (this.currentState[line][i] === null) {
          this.currentState[line][i] = card;
          break;
        }
      }
    } else {
      const indexCard = this.currentState[line].indexOf(card);
      this.currentState[line].splice(indexCard, 1);
      this.currentState[line].push(null);
      this.page!.wordsField.prepend(card.canvas);
    }
    this.renderCurrentState();
    this.checkSentence();
  }

  public renderCurrentState() {
    this.defineCorrect();
    for (let i = 0; i < this.currentState[this.activeLine].length; i += 1) {
      const currentLine = this.lineContainers[this.activeLine];
      if (this.currentState[this.activeLine][i] !== null) {
        currentLine.append(this.currentState[this.activeLine][i]!.canvas);
        this.currentState[this.activeLine][i]!.setOutline('white');
      }
    }
  }

  public checkButton() {
    for (let j = 0; j < this.currentState[this.activeLine].length; j += 1) {
      if (!this.currentState[this.activeLine][j]!.isCorrect) {
        this.currentState[this.activeLine][j]!.setOutline('red');
      } else {
        this.currentState[this.activeLine][j]!.setOutline('green');
      }
    }
  }

  public checkSentence() {
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
          }
        }
        if (flag) {
          this.page!.hintTranslationSentence.getNode().style.opacity = '1';
          this.transformCheckToContinue();
        } else {
          this.page!.hintTranslationSentence.getNode().style.opacity = '0';
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
    this.updateHintTranslationSentence();
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
      const currentCard = this.currentState[this.activeLine][i];
      if (currentCard) {
        currentCard.canvas.getNode().style.animation = 'fadeIn 1s ease-in-out forwards';
        setInterval(() => {
          currentCard.canvas.getNode().style.animation = '';
        }, 1000);
      }
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
    this.loadImageAndRenderData(this.page!, this.currentLevel);
    this.updateHintTranslationSentence();
    this.checkSentence();
  }
}
