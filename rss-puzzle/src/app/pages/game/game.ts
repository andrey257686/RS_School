import Component from '../../components/base-component.ts';
import { div } from '../../components/tags.ts';
// import { GamePage, GameService } from '../../types.ts';
// import data from '../../../gamedata/data/wordCollectionLevel1.json';
import GameService from '../../services/game.service.ts';
import './game.scss';

class GamePageComponent extends Component {
  public playFieldContainer: Component;

  public wordsField: Component;

  public game: GameService;

  constructor() {
    super({ className: 'game' });
    this.playFieldContainer = div({ className: 'game__play-field-container' });
    this.playFieldContainer.setAttribute('data-width', '700');
    this.wordsField = div({
      className: 'game__words-field',
    });
    this.appendChildren([this.playFieldContainer, this.wordsField]);
    this.game = new GameService();
    this.game.start(this);
  }
}

const GamePage = () => new GamePageComponent();
export default GamePage;
