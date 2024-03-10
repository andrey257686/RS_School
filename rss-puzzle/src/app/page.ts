import Component from './components/base-component.ts';
import LoginPage from './pages/login/login.ts';
// import StartPage from './pages/start/start.ts';

class ContainerComponent extends Component {
  constructor() {
    super(
      {
        className: 'container',
      },
      LoginPage.bind(null)(),
      // StartPage.bind(null)(),
    );
  }
}
const Container = () => new ContainerComponent();

export default Container;
