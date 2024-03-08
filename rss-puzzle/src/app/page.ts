import Form from './components/form/form.ts';
import Component from './components/base-component.ts';

class ContainerComponent extends Component {
  constructor() {
    super(
      {
        className: 'container',
      },
      Form.bind(null)(),
    );
  }
}
const Container = () => new ContainerComponent();

export default Container;
