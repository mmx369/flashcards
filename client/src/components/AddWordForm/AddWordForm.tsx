import { FC, FormEvent, useContext, useState } from 'react'
import { Context } from '../..'
import DictionaryService from '../../services/DictionaryService'

import { useInput } from '../../hooks/use-unput'
import { normilizeString } from '../../utils/normilize-string'
import classes from './AddWordForm.module.css'

const selectOptions = [
  'nouns',
  'adjectives',
  'verbs',
  'numerals',
  'pronouns',
  'prepositions',
]

const AddWordForm: FC = () => {
  const { store } = useContext(Context)

  const [type, setType] = useState('')

  const {
    value: newWord,
    isValid: enteredNewWordIsValid,
    hasError: newWordHasError,
    valueChangeHandler: newWordChangeHandler,
    inputBlurHandler: newWordlBlurHandler,
    reset: resetNewWordInput,
  } = useInput((value: string) => value.trim() !== '')

  const {
    value: translation,
    isValid: enteredTranslationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    inputBlurHandler: translationBlurHandler,
    reset: resetTranslationInput,
  } = useInput((value: string) => value.trim() !== '')

  let formIsValid = false

  if (
    enteredNewWordIsValid &&
    enteredTranslationIsValid &&
    type.trim() !== ''
  ) {
    formIsValid = true
  }

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!enteredNewWordIsValid && !enteredTranslationIsValid) {
      return
    }
    try {
      const response = await DictionaryService.addNewEntry({
        newWord: normilizeString(newWord),
        translation: normilizeString(translation),
        type: normilizeString(type),
        user: store.user.email,
      })
      console.log('RESPONSE', response)
      resetNewWordInput()
      resetTranslationInput()
    } catch (error) {
      console.log(error)
    }
  }

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value)
  }

  const newWordInputClasses = newWordHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control

  const translationInputClasses = translationHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control

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
          </div>
          <div className={classes.form_control}>
            <label htmlFor='type'>Type:</label>
            <select
              onChange={selectChangeHandler}
              id='type'
              defaultValue={'DEFAULT'}
            >
              <option value='DEFAULT' disabled>
                Choose a type ...
              </option>
              {selectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
    </div>
  )
}

export default AddWordForm
