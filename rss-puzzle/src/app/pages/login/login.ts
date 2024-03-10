import Component from '../../components/base-component.ts';
import { label, input, button, span, div } from '../../components/tags.ts';
import LoginService from '../../services/login.service.ts';
import StartPage from '../start/start.ts';
import app from '../../app.ts';
import './login.scss';

class LoginPageComponent extends Component {
  private readonly nameInput: Component<HTMLInputElement>;

  private readonly surnameInput: Component<HTMLInputElement>;

  private readonly nameError: Component;

  private readonly surnameError: Component;

  private readonly submitButton: Component;

  private readonly loginService = new LoginService();

  constructor() {
    super({ tag: 'form', className: 'login' });
    this.addListener('submit', this.onSubmit.bind(this));
    this.submitButton = button({
      className: 'button login__button login__button--disabled',
      textContent: 'Login',
      type: 'submit',
      disabled: true,
    });
    this.nameInput = input({
      className: 'login__input',
      placeholder: 'First Name',
      id: 'firstName',
      type: 'text',
      required: true,
      oninput: () => {
        const isNameValid = this.loginService.isNameValid(this.nameInput.getNode().value);
        const isValid = this.loginService.isNameValidAndSurnameValid(
          this.nameInput.getNode().value,
          this.surnameInput.getNode().value,
        );
        if (isNameValid) {
          this.nameInput.removeClass('login__input--invalid');
          this.nameError.addClass('invisible');
        } else {
          const errors = this.loginService.validateErrorsName(this.nameInput.getNode().value);
          this.nameError.setInnerHTML(errors.join('<br>'));
          this.nameInput.addClass('login__input--invalid');
          this.nameError.removeClass('invisible');
        }
        if (isValid) {
          this.submitButton.removeAttribute('disabled');
          this.submitButton.removeClass('login__button--disabled');
        } else {
          this.submitButton.setAttribute('disabled', 'true');
          this.submitButton.addClass('login__button--disabled');
        }
      },
    });
    this.surnameInput = input({
      className: 'login__input',
      placeholder: 'Surname',
      id: 'surname',
      type: 'text',
      required: true,
      oninput: () => {
        const isSurnameValid = this.loginService.isSurnameValid(this.surnameInput.getNode().value);
        const isValid = this.loginService.isNameValidAndSurnameValid(
          this.nameInput.getNode().value,
          this.surnameInput.getNode().value,
        );
        if (isSurnameValid) {
          this.surnameInput.removeClass('login__input--invalid');
          this.surnameError.addClass('invisible');
        } else {
          const errors = this.loginService.validateErrorsSurname(this.surnameInput.getNode().value);
          this.surnameError.setInnerHTML(errors.join('<br>'));
          this.surnameInput.addClass('login__input--invalid');
          this.surnameError.removeClass('invisible');
        }
        if (isValid) {
          this.submitButton.removeAttribute('disabled');
          this.submitButton.removeClass('login__button--disabled');
        } else {
          this.submitButton.setAttribute('disabled', 'true');
          this.submitButton.addClass('login__button--disabled');
        }
      },
    });
    this.nameError = span({ className: 'login__error login__error--name invisible', textContent: 'Incorect name' });
    this.surnameError = span({
      className: 'login__error login__error--surname invisible',
      textContent: 'Incorect surname',
    });
    this.appendChildren([
      div(
        { className: 'login__name' },
        label({ className: 'login__label', textContent: 'First Name:', htmlFor: 'firstName' }),
        this.nameInput,
        this.nameError,
      ),
      div(
        { className: 'login__surname' },
        label({ className: 'login__label', textContent: 'Surname:', htmlFor: 'surname' }),
        this.surnameInput,
        this.surnameError,
      ),
      this.submitButton,
    ]);
  }

  private onSubmit(event: Event): void {
    event.preventDefault();
    const name = this.nameInput.getNode().value;
    const surname = this.surnameInput.getNode().value;
    const data = JSON.stringify({
      name,
      surname,
    });
    localStorage.setItem('userData', data);
    app.changePage(StartPage());
  }
}

const LoginPage = () => new LoginPageComponent();
export default LoginPage;
