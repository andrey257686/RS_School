export function validateErrorsName(name: string): string[] {
  const errors = [];
  if (name.length < 3) {
    errors.push("Name should be at least 3 characters long");
  }
  if (name.length === 0) {
    errors.push("Name should not be empty");
  } else if (name[0] !== name[0].toUpperCase()) {
    errors.push("Name should start with a capital letter");
  }
  return errors;
}

export function validateErrorsPassword(password: string): string[] {
  const regexPassword = /^(?=.*[а-яa-z])(?=.*[А-ЯA-Z]).*$/;
  const errors = [];
  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }
  if (password.length === 0) {
    errors.push("Password should not be empty");
  }
  if (!regexPassword.test(password)) {
    errors.push("Password must contain uppercase and lowercase letters");
  }
  return errors;
}
