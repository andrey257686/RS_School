// import Form from './components/form/form.ts';
import Component from './components/base-component.ts';
import LoginPage from './pages/login/login.ts';

class ContainerComponent extends Component {
  constructor() {
    super(
      {
        className: 'container',
      },
      LoginPage.bind(null)(),
    );
  }
}
const Container = () => new ContainerComponent();

export default Container;
