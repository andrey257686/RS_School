import Component from './components/base-component.ts';

export interface ComponentOptionsInterface {
  tag?: keyof HTMLElementTagNameMap;
  className: string;
}

export interface ComponentInterface<T extends HTMLElement> {
  append(child: Component<T>): void;
  appendChildren(children: Component<T>[]): void;
  setTextContent(text: string): void;
  getNode(): T;
  toggleClass(className: string): void;
  destroyChildren(): void;
  destroy(): void;
}

export enum errorMessages {
  invalidCharacters = 'Use only latin letters',
  firstLetterNotCapital = 'First letter should be capital',
  minLength = 'Min length should be 3',
}

export interface WordsData {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface RoundData {
  levelData: LevelData;
  words: WordsData[];
}

export interface GameService {
  start(gamePage: Component): void;
}

export interface GamePage extends Component {
  buttonHintTranslation: Component;

  buttonHintPronunciation: Component;

  buttonHintBackground: Component;

  selectLevelElement: Component;

  selectRoundElement: Component;

  hintTranslationSentence: Component;

  playFieldContainer: Component;

  wordsField: Component;

  game: GameService;

  buttonContinue: Component;

  buttonCheck: Component;
}
