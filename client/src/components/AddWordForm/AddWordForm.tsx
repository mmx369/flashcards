import { FormEvent, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Context } from '../..';
import DictionaryService from '../../services/DictionaryService';
import { useInput } from '../../hooks/use-unput';
import { normilizeString } from '../../utils/normilize-string';
import { TLanguages } from '../../models/TLanguages';
import { notify } from '../../utils/notify';

import classes from './AddWordForm.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../UI/Backdrop';

export function AddWordForm({ lng }: { lng: TLanguages }) {
  const { store } = useContext(Context);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const {
    value: newWord,
    isValid: enteredNewWordIsValid,
    hasError: newWordHasError,
    valueChangeHandler: newWordChangeHandler,
    inputBlurHandler: newWordlBlurHandler,
    reset: resetNewWordInput,
  } = useInput((value: string) => value.trim() !== '');

  const {
    value: translation,
    isValid: enteredTranslationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    inputBlurHandler: translationBlurHandler,
    reset: resetTranslationInput,
  } = useInput((value: string) => value.trim() !== '');

  const {
    value: example,
    valueChangeHandler: exampleChangeHandler,
    inputBlurHandler: exampleBlurHandler,
    reset: resetExampleInput,
  } = useInput((value: string) => true);

  let formIsValid = false;

  if (enteredNewWordIsValid && enteredTranslationIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!enteredNewWordIsValid && !enteredTranslationIsValid) {
      return;
    }
    setIsLoaderOpen(true);
    try {
      await DictionaryService.addNewEntry({
        newWord: normilizeString(newWord),
        translation: normilizeString(translation),
        example,
        user: store.user.email,
        lng,
      });
      notify('Word added succefully!', 'success');
      resetNewWordInput();
      resetTranslationInput();
      resetExampleInput();
    } catch (error) {
      notify(error.response.data.message, 'error');
    } finally {
      setIsLoaderOpen(false);
    }
  };

  const newWordInputClasses = newWordHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control;

  const translationInputClasses = translationHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control;

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control_group}>
          <div className={newWordInputClasses}>
            <input
              type='text'
              placeholder='Word'
              onChange={newWordChangeHandler}
              onBlur={newWordlBlurHandler}
              value={newWord}
            />
            {newWordHasError && (
              <p className={classes.error_text}>Field must not be empty.</p>
            )}
          </div>
          <div className={translationInputClasses}>
            <input
              type='text'
              placeholder='Translation'
              onChange={translationChangeHandler}
              onBlur={translationBlurHandler}
              value={translation}
            />
            {translationHasError && (
              <p className={classes.error_text}>Field must not be empty.</p>
            )}
            <div className={classes.form_control}>
              <textarea
                rows={3}
                maxLength={256}
                placeholder='Examples'
                onChange={exampleChangeHandler}
                onBlur={exampleBlurHandler}
                value={example}
              />
            </div>
          </div>
          <button
            className={classes.button}
            type='submit'
            disabled={!formIsValid}
          >
            Add New Word
          </button>
        </div>
      </form>
      <ToastContainer />
      <Backdrop open={isLoaderOpen} setOpen={setIsLoaderOpen} />
    </div>
  );
}
