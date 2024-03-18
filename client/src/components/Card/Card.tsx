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
  const [isFrontSide, setIsFrontSide] = useState(true)
  const [words, setWords] = useState<IWord[]>([])
  const [word, setWord] = useState<IWord>({} as IWord)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [speaker, setSpeaker] = useState<IWord>({} as IWord)
  const { speak, supported, voices } = useSpeechSynthesis()

  const voice = lang === 'kr' ? voices[16] : voices[2]

  useEffect(() => {
    DictionaryService.fetchWord(lang).then(({ data }) => {
      setWords(data)
      setWord(data[0])
      setSpeaker(data[0])
      setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>Loading...</div>
      </div>
    )
  }

  if (!isLoading && words.length === 0) {
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
        {isFrontSide && !store.isRussianLng && lang !== 'tr' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}
        {!isFrontSide && store.isRussianLng && lang !== 'tr' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}

        {!store.isRussianLng && (
          <>
            <div className={classes.example}>
              {!isFrontSide ? word.translation : word.word}
            </div>
            <div className={classes.example}>
              {!isFrontSide && (
                <div style={{ fontSize: '1rem' }}>{word.example}</div>
              )}
            </div>
          </>
        )}
        {store.isRussianLng && (
          <>
            <div className={classes.example}>
              {!isFrontSide ? word.word : word.translation}
            </div>
            <div className={classes.example}>
              {!isFrontSide && (
                <div style={{ fontSize: '1rem' }}>{word.example}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default observer(Card)
