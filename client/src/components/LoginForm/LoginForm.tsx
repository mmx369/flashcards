import { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { Context } from '../..';
import { useInput } from '../../hooks/use-unput';
import { emailValidation, passwordValidation } from './validate';
import { notify } from '../../utils/notify';
import Backdrop from '../UI/Backdrop';

import classes from './LoginForm.module.css';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailValidation(value));

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => passwordValidation(value));

  const { store } = useContext(Context);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      return;
    }
    setIsLoaderOpen(true);
    store
      .login(email, password)
      .then((res) => {
        resetEmailInput();
        resetPasswordInput();
      })
      .catch((error) => {
        notify(error, 'error');
      })
      .finally(() => {
        setIsLoaderOpen(false);
      });
  };

  const registrationHandler = () => {
    setIsLoaderOpen(true);
    store
      .registration(email, password)
      .then((res) => {
        resetEmailInput();
        resetPasswordInput();
      })
      .catch((error) => {
        notify(error, 'error');
      })
      .finally(() => {
        setIsLoaderOpen(false);
      });
  };

  const emailInputClasses = emailHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control;

  const passwordInputClasses = passwordHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control;

  return (
    <>
      <div className={classes.header}>
        <h3>Flashcards App - The best, simple app for studying.</h3>
        Create your own flashcards. Improve your language learning, memorize
        study material and prepare for exams with Flashcards App.
      </div>
      <form onSubmit={formSubmissionHandler}>
        <div className={classes.control_group}>
          <div className={emailInputClasses}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Email'
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={email}
            />
            {emailHasError && (
              <p className={classes.error_text}>
                You should provide a valid email.
              </p>
            )}
          </div>
          <div className={passwordInputClasses}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={password}
            />
            {passwordHasError && (
              <p className={classes.error_text}>
                Password must contain at least 1 lowercase, 1 uppercase, 1
                numeric character and min 8 symbol.
              </p>
            )}
          </div>
          <div className={classes.form_actions}>
            <button
              className={classes.button}
              type='submit'
              disabled={!formIsValid}
            >
              Sign In
            </button>
            <button
              className={classes.button}
              type='button'
              disabled={!formIsValid}
              onClick={registrationHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <Backdrop open={isLoaderOpen} setOpen={setIsLoaderOpen} />
      <ToastContainer />
    </>
  );
}

export default observer(LoginForm);
