const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export const inputValidation = {
  email: {
    required: { value: true, message: 'Email is required.' },
    pattern: {
      value: EMAIL_REGEX,
      message: 'Email must be a valid email.',
    },
  },
  password: {
    required: { value: true, message: 'Password is required.' },
    pattern: {
      value: PASSWORD_REGEX,
      message:
        'Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.',
    },
  },
  other: {
    required: { value: true, message: 'This field is required.' },
    minLength: {
      value: 2,
      message: 'This field must be at least 2 characters. ',
    },
  },
};

export const BASIC_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://offers-backend.herokuapp.com/api'
    : 'http://localhost:5000/api';
