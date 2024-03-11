import Component from '../../components/base-component.ts';
import { canvas } from '../../components/tags.ts';
import './game.scss';

class GamePageComponent extends Component {
  public playField: Component;

  public wordsField: Component;

  constructor() {
    super({ className: 'game' });
    this.playField = canvas({
      className: 'game__play-field',
      height: 500,
      width: 700,
    });
    this.wordsField = canvas({
      className: 'game__words-field',
      height: 100,
      width: 700,
    });
    this.appendChildren([this.playField, this.wordsField]);
  }
}

const GamePage = () => new GamePageComponent();
export default GamePage;
