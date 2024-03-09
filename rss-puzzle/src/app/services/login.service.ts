import { errorMessages } from '../types.ts';

export default class LoginService {
  private readonly nameRegex = /^([A-Z]{1})([a-z-]{2,})$/;

  private readonly englishRegex = /[A-Za-z-]$/;

  private readonly surnameRegex = /^([A-Z]{1})[a-z-]{3,}$/;

  public isNameValid(name: string): boolean {
    return this.nameRegex.test(name);
  }

  public isSurnameValid(surname: string): boolean {
    return this.surnameRegex.test(surname);
  }

  public validateErrorsName(name: string): string[] {
    const errors = [];
    if (!this.englishRegex.test(name)) {
      errors.push(errorMessages.invalidCharacters);
    }
    if (name[0] !== name[0].toUpperCase()) {
      errors.push(errorMessages.firstLetterNotCapital);
    }
    if (name.length < 3) {
      errors.push(errorMessages.minLength);
    }
    return errors;
  }

  public validateErrorsSurname(surname: string): string[] {
    const errors = [];
    if (!this.englishRegex.test(surname)) {
      errors.push(errorMessages.invalidCharacters);
    }
    if (surname[0] !== surname[0].toUpperCase()) {
      errors.push(errorMessages.firstLetterNotCapital);
    }
    if (surname.length < 4) {
      errors.push(errorMessages.minLength);
    }
    return errors;
  }

  public isNameValidAndSurnameValid(name: string, surname: string): boolean {
    return this.nameRegex.test(name) && this.surnameRegex.test(surname);
  }
}
