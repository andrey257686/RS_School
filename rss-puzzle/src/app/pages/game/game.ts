import Component from '../../components/base-component.ts';
import { div, button } from '../../components/tags.ts';
// import { GamePage, GameService } from '../../types.ts';
// import data from '../../../gamedata/data/wordCollectionLevel1.json';
import GameService from '../../services/game.service.ts';
import './game.scss';

class GamePageComponent extends Component {
  public buttonHintTranslation: Component;

  public hintTranslationSentence: Component;

  public playFieldContainer: Component;

  public wordsField: Component;

  public game: GameService;

  public buttonContinue: Component;

  public buttonCheck: Component;

  public buttonAutoComplete: Component;

  constructor() {
    super({ className: 'game' });
    this.game = new GameService();
    this.buttonHintTranslation = button({
      className: 'button game__button game__button_hint-translation',
      innerHTML:
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368 368" style="enable-background:new 0 0 368 368;width: 15px;" xml:space="preserve"><g><g><path d="M344,128H176V80h72c13.232,0,24-10.776,24-24V24c0-13.232-10.768-24-24.032-24C246.312,0,24,0,24,0s0,0-0.008,0 C17.584,0,11.56,2.496,7.032,7.024C2.504,11.552,0,17.592,0,24v32c0,13.232,10.768,24,24,24h72v232c0,13.232,10.768,24,24,24h32 c13.232,0,24-10.768,24-24v-64c0-4.416-3.576-8-8-8s-8,3.584-8,8v64c0,4.416-3.584,8-8,8h-32c-4.416,0-8-3.592-8-8V72 c0-4.416-3.576-8-8-8H24c-4.416,0-8-3.592-8-8V24c0-2.136,0.832-4.144,2.344-5.656C19.848,16.832,21.856,16,24,16h189 c18.456,0,28.984,0,35-0.64V16c4.416,0,8,3.592,8,8v32c0,4.408-3.592,8-8,8h-80c-4.424,0-8,3.584-8,8v57.472 c-9.288,3.312-16,12.112-16,22.528v32c0,13.232,10.768,24,24,24h48v136c0,13.232,10.768,24,24,24h32c13.232,0,24-10.768,24-24V208 h48c13.232,0,24-10.768,24-24v-32C368,138.768,357.232,128,344,128z M352,184c0,4.408-3.584,8-8,8h-56c-4.424,0-8,3.584-8,8v144 c0,4.408-3.584,8-8,8h-32c-4.416,0-8-3.592-8-8V200c0-4.416-3.576-8-8-8h-56c-4.416,0-8-3.592-8-8v-32c0-4.408,3.584-8,8-8h176 c4.416,0,8,3.592,8,8V184z"/></g></g></svg>',
      onclick: () => {
        this.game.hintButtonTranslate();
      },
    });
    this.hintTranslationSentence = div({ className: 'game__translation-sentence', innerHTML: '' });
    this.playFieldContainer = div({
      id: 'playField',
      className: 'game__play-field transparent-background',
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
    this.appendChildren([
      div({ className: 'game__hints' }, this.buttonHintTranslation),
      this.hintTranslationSentence,
      this.playFieldContainer,
      this.wordsField,
      this.buttonAutoComplete,
      this.buttonCheck,
    ]);
    this.game.start(this);
  }
}

const GamePage = () => new GamePageComponent();
export default GamePage;
