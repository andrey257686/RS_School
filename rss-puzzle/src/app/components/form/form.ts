import Component from '../base-component.ts';
import { label, input, button } from '../tags.ts';
import './form.scss';

const Form = () =>
  new Component(
    { tag: 'form', className: 'login' },
    new Component(
      { className: 'login__name' },
      label({ className: 'login__label', textContent: 'First Name:', htmlFor: 'firstName' }),
      input({
        className: 'login__input',
        placeholder: 'First Name',
        id: 'firstName',
        type: 'text',
        required: true,
      }),
    ),
    new Component(
      { className: 'login__surname' },
      label({ className: 'login__label', textContent: 'Surname:', htmlFor: 'surname' }),
      input({
        className: 'login__input',
        placeholder: 'Surname',
        id: 'surname',
        type: 'text',
        required: true,
      }),
    ),

    button({ className: 'button login__button', textContent: 'Login', type: 'submit' }),
  );

export default Form;
