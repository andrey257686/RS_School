import Component from '../../components/base-component.ts';
import { p, button, h1 } from '../../components/tags.ts';
import './start.scss';

class StartPageComponent extends Component {
  private readonly description: Component;

  private readonly submitButton: Component;

  constructor() {
    super({ className: 'start-page' });
    this.description = p({
      className: 'start-page__description',
      innerHTML:
        'Click, drag & drop your way to English mastery!<br/>Build sentences by grabbing words and using handy tooltips like a pro.<br/>No textbooks, no memorization - just pure puzzle fun!',
    });
    this.submitButton = button({
      className: 'button start-page__button',
      innerHTML: 'Start',
    });
    this.appendChildren([
      h1({ className: 'start-page__title', textContent: 'English Puzzle' }),
      this.description,
      this.submitButton,
    ]);
  }
}

const StartPage = () => new StartPageComponent();
export default StartPage;
