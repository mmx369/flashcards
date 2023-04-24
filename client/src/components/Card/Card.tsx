import { useEffect, useState } from 'react'
import { IWord } from '../../models/IWord'
import DictionaryService from '../../services/DictionaryService'

import { useInput } from '../../hooks/use-unput'
import classes from './Card.module.css'

export const Card = () => {
  const [word, setWord] = useState<IWord>({} as IWord)
  useEffect(() => {
    DictionaryService.fetchWord().then(({ data }) => {
      console.log(6666, data)
      setWord(data)
    })
  }, [])

  const {
    value: translateWord,
    isValid: enteredTranslateWordIsValid,
    hasError: translateWordHasError,
    valueChangeHandler: translateWordChangeHandler,
    inputBlurHandler: translateWordBlurHandler,
    reset: resetTranslateWordInput,
  } = useInput((value: string) => value.trim() !== '')

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!enteredTranslateWordIsValid) {
      return
    }
    try {
    } catch (error) {
      console.log(error)
    }
    resetTranslateWordInput()
  }

  const translateWordInputClasses = translateWordHasError
    ? `${classes.form_control} ${classes.invalid}`
    : classes.form_control

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control_group}>
        <div className={classes.card}> {word.word}</div>
        <div className={translateWordInputClasses}>
          <input
            type='text'
            placeholder='Your translation'
            onChange={translateWordChangeHandler}
            onBlur={translateWordBlurHandler}
            value={translateWord}
          />
          {translateWordHasError && (
            <p className={classes.error_text}>Field must not be empty.</p>
          )}
        </div>

        <div className={classes.form_actions}>
          <button className={classes.button} type='submit' onClick={() => {}}>
            Send
          </button>
        </div>
      </div>
    </form>
  )
}
