import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Context } from '../..'

import { useInput } from '../../hooks/use-unput'
import classes from './LoginForm.module.css'

const LoginForm: FC = () => {
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => value.trim().includes('@')) //add validate function

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => value.trim() !== '') //add validate function

  const { store } = useContext(Context)

  let formIsValid = false

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      return
    }
    console.log(email, password)
    store.login(email, password)
    resetEmailInput()
    resetPasswordInput()
  }

  const emailInputClasses = emailHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control

  const passwordInputClasses = passwordHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control

  return (
    <>
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
              <p className={classes.error_text}>Email must not be empty.</p>
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
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className={classes.form_actions}>
            <button type='submit' disabled={!formIsValid}>
              Sign In
            </button>
          </div>
        </div>
      </form>
      {/* <button onClick={() => store.registration(email, password)}>
        Sign Up
      </button> */}
    </>
  )
}

export default observer(LoginForm)
