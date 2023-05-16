import { useContext, useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { ReactComponent as VolumeSvg } from '../../assets/volume.svg'
import { IWord } from '../../models/IWord'
import DictionaryService from '../../services/DictionaryService'

import { observer } from 'mobx-react-lite'

import { Context } from '../..'
import classes from './Card.module.css'

const Card = ({ lang }: { lang: string }) => {
  const { store } = useContext(Context)
  const [words, setWords] = useState<IWord[]>([] as IWord[])
  const [isFrontSide, setIsFrontSide] = useState(true)
  const [word, setWord] = useState<IWord>({} as IWord)
  const [speaker, setSpeaker] = useState<IWord>({} as IWord)

  const { speak, supported, voices } = useSpeechSynthesis()
  const voice = voices[2] //En_US

  useEffect(() => {
    DictionaryService.fetchWord(lang).then(({ data }) => {
      setWords(data)
      setWord(data[0])
      setSpeaker(data[0])
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
          setSpeaker(data[0])
          setIsFrontSide(true)
        })
        return
      }
      const newWords = [...words.slice(1, words.length)]
      setWords(newWords)
      setWord(newWords[0])
      setSpeaker(newWords[0])
      setIsFrontSide(true)
    }
  }

  const handleSpeech = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    speak({ text: speaker.word, voice })
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
        {!store.isRussianLng && supported && isFrontSide && lang === 'eng' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}
        {store.isRussianLng && supported && !isFrontSide && lang === 'eng' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}

        {!store.isRussianLng &&
          (isFrontSide ? `${word.word}` : `${word.translation}`)}
        {store.isRussianLng &&
          (isFrontSide ? `${word.translation}` : `${word.word}`)}
        <div className={classes.example}>{!isFrontSide && word.example}</div>
      </div>
    </div>
  )
}

export default observer(Card)
