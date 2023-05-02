import { useEffect, useState } from 'react'
import { IWord } from '../../models/IWord'
import DictionaryService from '../../services/DictionaryService'

import classes from './Card.module.css'

export const Card = () => {
  const [word, setWord] = useState<IWord>({} as IWord)
  const [isFrontSide, setIsFrontSide] = useState(true)

  console.log(111, word)
  console.log(222, isFrontSide)

  useEffect(() => {
    console.log('USE EFFECT')
    DictionaryService.fetchWord().then(({ data }) => {
      setWord(data)
    })
  }, [])

  const buttonClickHandler = () => {
    if (isFrontSide) {
      setIsFrontSide(!isFrontSide)
    } else {
      DictionaryService.fetchWord().then(({ data }) => {
        setWord(data)
      })
      setIsFrontSide(true)
    }
  }

  return (
    <div className={classes.control_group}>
      <div className={classes.card} onClick={buttonClickHandler}>
        {isFrontSide ? `${word.word}` : `${word.translation}`}
      </div>
    </div>
  )
}
