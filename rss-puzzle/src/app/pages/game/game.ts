import Component from '../../components/base-component.ts';
import { div, button } from '../../components/tags.ts';
// import { GamePage, GameService } from '../../types.ts';
// import data from '../../../gamedata/data/wordCollectionLevel1.json';
import GameService from '../../services/game.service.ts';
import './game.scss';

class GamePageComponent extends Component {
  public playFieldContainer: Component;

  public wordsField: Component;

  public game: GameService;

  public buttonContinue: Component;

  public buttonCheck: Component;

  public buttonAutoComplete: Component;

  constructor() {
    super({ className: 'game' });
    this.game = new GameService();
    this.playFieldContainer = div({
      id: 'playField',
      className: 'game__play-field',
      ondrop: (event: MouseEvent) => {
        this.game.handleDropPlayField(event);
      },
      ondragover: (event) => {
        event.preventDefault();
      },
    });
    this.playFieldContainer.setAttribute('data-width', '700');
    this.wordsField = div({
      id: 'wordsField',
      className: 'game__words-field',
      ondrop: () => {
        this.game.handleDropWordsField();
      },
      ondragover: (event) => {
        event.preventDefault();
      },
    });
    this.buttonContinue = button({
      className: 'button game__button game__button_continue',
      textContent: 'Continue',
      onclick: () => {
        this.game.nextSentence();
      },
    });
    this.buttonCheck = button({
      className: 'button game__button game__button_check',
      textContent: 'Check',
      onclick: () => {
        this.game.checkButton();
      },
    });
    this.buttonAutoComplete = button({
      className: 'button game__button game__button_auto-complete',
      textContent: 'Auto Complete',
      onclick: () => {
        this.game.autoComplete();
      },
    });
    this.buttonContinue.setAttribute('disabled', 'true');
    this.buttonCheck.setAttribute('disabled', 'true');
    this.appendChildren([this.playFieldContainer, this.wordsField, this.buttonCheck, this.buttonAutoComplete]);
    this.game.start(this);
  }
}

const GamePage = () => new GamePageComponent();
export default GamePage;
