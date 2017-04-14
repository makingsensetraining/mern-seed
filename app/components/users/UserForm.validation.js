import validator from 'validator';

export default function validateInput(data) {
  let errors = {};

  if (!validator.isEmail(data.username))
    errors.username = 'Please enter a valid email address.';

  if (validator.isEmpty(data.username))
    errors.username = 'Please enter your email address.';

  if (validator.isEmpty(data.password))
    errors.password = 'Please enter your password.';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
