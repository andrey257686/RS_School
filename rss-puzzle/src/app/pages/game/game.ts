import Component from '../../components/base-component.ts';
import { div, button, label, select, option } from '../../components/tags.ts';
import GameService from '../../services/game.service.ts';
import './game.scss';

class GamePageComponent extends Component {
  public buttonHintTranslation: Component;

  public buttonHintPronunciation: Component;

  public switchAudioButton: Component;

  public buttonHintBackground: Component;

  public selectLevelElement: Component;

  public selectRoundElement: Component;

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
    this.selectLevelElement = select(
      {
        className: 'game__select-level',
        onchange: (event: Event) => {
          this.game.changeLevel(event);
        },
      },
      option({
        className: 'game_select-level_option',
        value: '1',
        innerHTML: 'Level 1',
        id: 'level_1',
        selected: true,
      }),
      option({
        className: 'game_select-level_option',
        value: '2',
        id: 'level_2',
        innerHTML: 'Level 2',
      }),
      option({
        className: 'game_select-level_option',
        value: '3',
        id: 'level_3',
        innerHTML: 'Level 3',
      }),
      option({
        className: 'game_select-level_option',
        value: '4',
        id: 'level_4',
        innerHTML: 'Level 4',
      }),
      option({
        className: 'game_select-level_option',
        value: '5',
        id: 'level_5',
        innerHTML: 'Level 5',
      }),
      option({
        className: 'game_select-level_option',
        value: '6',
        id: 'level_6',
        innerHTML: 'Level 6',
      }),
    );
    this.selectRoundElement = select({
      className: 'game__select-round',
      onchange: (event: Event) => {
        this.game.changeRound(event);
      },
    });
    this.buttonHintTranslation = button({
      className: 'button game__button game__button_hint-translation',
      innerHTML:
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368 368" style="enable-background:new 0 0 368 368;width: 15px;" xml:space="preserve"><g><g><path d="M344,128H176V80h72c13.232,0,24-10.776,24-24V24c0-13.232-10.768-24-24.032-24C246.312,0,24,0,24,0s0,0-0.008,0 C17.584,0,11.56,2.496,7.032,7.024C2.504,11.552,0,17.592,0,24v32c0,13.232,10.768,24,24,24h72v232c0,13.232,10.768,24,24,24h32 c13.232,0,24-10.768,24-24v-64c0-4.416-3.576-8-8-8s-8,3.584-8,8v64c0,4.416-3.584,8-8,8h-32c-4.416,0-8-3.592-8-8V72 c0-4.416-3.576-8-8-8H24c-4.416,0-8-3.592-8-8V24c0-2.136,0.832-4.144,2.344-5.656C19.848,16.832,21.856,16,24,16h189 c18.456,0,28.984,0,35-0.64V16c4.416,0,8,3.592,8,8v32c0,4.408-3.592,8-8,8h-80c-4.424,0-8,3.584-8,8v57.472 c-9.288,3.312-16,12.112-16,22.528v32c0,13.232,10.768,24,24,24h48v136c0,13.232,10.768,24,24,24h32c13.232,0,24-10.768,24-24V208 h48c13.232,0,24-10.768,24-24v-32C368,138.768,357.232,128,344,128z M352,184c0,4.408-3.584,8-8,8h-56c-4.424,0-8,3.584-8,8v144 c0,4.408-3.584,8-8,8h-32c-4.416,0-8-3.592-8-8V200c0-4.416-3.576-8-8-8h-56c-4.416,0-8-3.592-8-8v-32c0-4.408,3.584-8,8-8h176 c4.416,0,8,3.592,8,8V184z"/></g></g></svg>',
      onclick: () => {
        this.game.hintButtonTranslate();
      },
    });
    this.buttonHintPronunciation = button({
      className: 'button game__button game__button_hint-pronunciation',
      innerHTML:
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;width: 15px;" xml:space="preserve"><g><g><path d="M458.35,128.554l-20.988,21.558c28.729,27.969,44.552,65.374,44.552,105.323c0,39.798-15.72,77.102-44.265,105.041 l21.044,21.5c34.374-33.646,53.305-78.586,53.305-126.543C512,207.296,492.947,162.235,458.35,128.554z"/></g></g><g><g><path d="M412.066,165.399l-19.519,22.895c20.318,17.32,31.97,41.788,31.97,67.13c0,25.206-11.551,49.584-31.69,66.884 l19.605,22.821c26.801-23.023,42.171-55.719,42.171-89.706C454.604,221.258,439.1,188.445,412.066,165.399z"/></g></g><g><g><path d="M319.154,56.797l-190.325,93.874H0v209.216h128.784l190.537,95.315L319.154,56.797z M58.415,329.802H30.086V180.757 h28.329V329.802z M117.293,329.802H88.501V180.757h28.792V329.802z M147.379,335.55V175.068l141.708-69.895l0.127,301.328 L147.379,335.55z"/></g></g></svg>',
      onclick: () => {
        this.game.hintButtonPronunciation();
      },
    });
    this.switchAudioButton = label({
      className: 'game__switch-audio',
      innerHTML:
        '<input class="game__switch-audio_checkbox" type="checkbox"> \n <span class="game__switch-audio_span"></span> \n <p class="game__switch-audio_text">Audio</p>',
      onchange: (event: Event) => {
        this.game.switchAudio(event);
      },
    });
    this.buttonHintBackground = button({
      className: 'button game__button game__button_hint-background checked',
      innerHTML:
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 381.2 381.2" style="enable-background:new 0 0 381.2 381.2;width: 15px;" xml:space="preserve"><g><g><path d="M345.6,20.2h-310C16,20.2,0,36.2,0,55.8v194v75.6C0,345,16,361,35.6,361h310c19.6,0,35.6-16,35.6-35.6V55.8 C381.2,36.2,365.2,20.2,345.6,20.2z M363.2,325.4c0,9.6-8,17.6-18,17.6H35.6c-10,0-18-8-18-18v-72L118,150.6L208.8,255 c3.2,3.6,8,4,12,1.6l73.6-52l68.8,49.6V325.4z M363.6,232.6l-64-46c-3.2-2.4-7.2-2.4-10.4,0l-72,51.2l-92-105.6 c-1.6-2-4-2.8-6.4-3.2c-2.4,0-4.8,0.8-6.8,2.8l-94.4,96v-172c0-9.6,8-17.6,18-17.6h310c10,0,18,8,18,18V232.6z"/></g></g><g><g><path d="M244.8,73.4c-25.6,0-46,20.8-46,46c-0.4,25.2,20.4,46,46,46c25.6,0,46-20.8,46-46C290.8,93.8,270,73.4,244.8,73.4z M244.8,147.8c-15.6,0-28.4-12.8-28.4-28.4c0-16,12.8-28.4,28.4-28.4c15.6,0,28.4,12.8,28.4,28.4S260.4,147.8,244.8,147.8z"/></g></g></svg>',
      onclick: () => {
        this.game.hintButtonBackground(true);
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
      div(
        { className: 'game__header' },
        div({ className: 'game__selections' }, this.selectLevelElement, this.selectRoundElement),
        div(
          { className: 'game__hints' },
          this.buttonHintTranslation,
          this.buttonHintBackground,
          this.buttonHintPronunciation,
          this.switchAudioButton,
        ),
      ),
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
