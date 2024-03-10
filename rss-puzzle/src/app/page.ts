import Component from './components/base-component.ts';

class ContainerComponent extends Component {
  constructor(page: Component) {
    super(
      {
        className: 'container',
      },
      page,
    );
  }
}
const Container = (page: Component) => new ContainerComponent(page);

export default Container;
