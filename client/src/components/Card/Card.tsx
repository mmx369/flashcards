import { useEffect, useState } from 'react'
import { IWord } from '../../models/IWord'
import DictionaryService from '../../services/DictionaryService'

import classes from './Card.module.css'

export const Card = ({ lang }: { lang: string }) => {
  const [words, setWords] = useState<IWord[]>([] as IWord[])
  const [isFrontSide, setIsFrontSide] = useState(true)
  const [word, setWord] = useState<IWord>({} as IWord)

  useEffect(() => {
    DictionaryService.fetchWord(lang).then(({ data }) => {
      setWords(data)
      setWord(data[0])
    })
  }, [lang])

  const buttonClickHandler = () => {
    if (isFrontSide) {
      setIsFrontSide(!isFrontSide)
    } else {
      if (words.length === 1) {
        DictionaryService.fetchWord(lang).then(({ data }) => {
          setWords(data)
          setWord(data[0])
          setIsFrontSide(true)
        })
        return
      }
      const newWords = [...words.slice(1, words.length)]
      setWords(newWords)
      setWord(newWords[0])
      setIsFrontSide(true)
    }
  }

  if (words.length === 0) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>
          Your dictionary is empty. Add your words!
        </div>
      </div>
    )
  }

  return (
    <div className={classes.control_group}>
      <div
        className={
          isFrontSide ? classes.card : `${classes.card} ${classes.card_reverse}`
        }
        onClick={buttonClickHandler}
      >
        {isFrontSide ? `${word.word}` : `${word.translation}`}
        <div className={classes.example}>{!isFrontSide && word.example}</div>
      </div>
    </div>
  )
}
