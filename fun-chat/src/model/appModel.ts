import { validateErrorsName, validateErrorsPassword } from "../service/login.service";

export default class AppModel {
  public validateName(name: string, fn: (errors: string[], field: string) => void): string[] {
    const errors = validateErrorsName(name);
    fn(errors, "name");
    return errors;
  }

  public validatePassword(password: string, fn: (errors: string[], field: string) => void): string[] {
    const errors = validateErrorsPassword(password);
    fn(errors, "password");
    return errors;
  }
}
