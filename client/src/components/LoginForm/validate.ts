import { normilizeString } from '../../utils/normilize-string';

export const emailValidation = (email: string) => {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const normilizedEmail = normilizeString(email);
  if (normilizedEmail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidation = (password: string) => {
  //1 lowercase, 1 uppercase, 1 numeric, min 8 chars
  const strongPasswordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
  );
  if (password.trim().match(strongPasswordRegex)) {
    return true;
  } else {
    return false;
  }
};
