import Component from '../../components/base-component.ts';
import GamePage from '../game/game.ts';
import { p, button, h1 } from '../../components/tags.ts';
import { controller } from '../../app.ts';
import './start.scss';

class StartPageComponent extends Component {
  private readonly description: Component;

  private readonly greeting: Component;

  private readonly submitButton: Component;

  private readonly logOutButton: Component;

  constructor(name: string, surname: string) {
    super({ className: 'start-page' });
    this.greeting = p({
      className: 'start-page__greeting',
      innerHTML: `Hello, ${name} ${surname}!`,
    });
    this.description = p({
      className: 'start-page__description',
      innerHTML:
        'Click, drag & drop your way to English mastery!<br/>Build sentences by grabbing words and using handy tooltips like a pro.<br/>No textbooks, no memorization - just pure puzzle fun!',
    });
    this.submitButton = button({
      className: 'button start-page__button',
      innerHTML: 'Start',
      onclick: () => {
        controller.changePage(GamePage());
      },
    });
    this.logOutButton = button({
      className: 'button start-page__button start-page__logout',
      innerHTML: 'Log out',
      onclick: () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('hintsState');
        controller.isAuthorized();
      },
    });
    this.appendChildren([
      h1({ className: 'start-page__title', textContent: 'English Puzzle' }),
      this.greeting,
      this.description,
      this.submitButton,
      this.logOutButton,
    ]);
  }
}

const StartPage = (name: string, surname: string) => new StartPageComponent(name, surname);
export default StartPage;
