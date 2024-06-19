import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IWord } from '../../models/IWord';
import DictionaryService from '../../services/DictionaryService';
import { useFetchDictionary } from '../../hooks/useFetchDictionary';
import { TLanguages } from '../../models/TLanguages';
import { Button } from '../UI';
import WordCard from './WordCard';

import classes from './CardContainer.module.css';

function CardContainer({ lang }: { lang: TLanguages }) {
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [words, setWords] = useState<IWord[]>([]);
  const [word, setWord] = useState<IWord>({} as IWord);
  const [speaker, setSpeaker] = useState<IWord>({} as IWord);
  const [fetch, setFetch] = useState<boolean>(false);
  const { error, data, loading } = useFetchDictionary(lang, fetch);

  useEffect(() => {
    setWords(data);
    setWord(data[0]);
    setSpeaker(data[0]);
  }, [data]);

  const buttonClickHandler = async () => {
    if (isFrontSide) {
      setIsFrontSide(!isFrontSide);
    } else {
      if (words.length === 1) {
        try {
          setFetch(!fetch);
          setIsFrontSide(true);
        } catch (error) {
          console.log(error);
        }
      }
      const newWords = [...words.slice(1, words.length)];
      setWords(newWords);
      setWord(newWords[0]);
      setSpeaker(newWords[0]);
      setIsFrontSide(true);
    }
  };

  const deleteHander = async () => {
    const res = await DictionaryService.deleteWord(lang, words[0]._id);
    if (res) {
      try {
        const { data } = await DictionaryService.fetchWord(lang);
        setWords(data);
        setWord(data[0]);
        setSpeaker(data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (error) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>Something went wrong try later...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>Loading...</div>
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>Your dictionary is empty.</div>
      </div>
    );
  }

  if (!loading && words.length === 0) {
    return (
      <div className={classes.control_group}>
        <div className={classes.card}>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <WordCard
        isFrontSide={isFrontSide}
        lang={lang}
        word={word}
        speakerWord={speaker.word}
        buttonClickHandler={buttonClickHandler}
      />

      <Button className={classes.button} onClick={deleteHander}>
        Delete Word
      </Button>
    </>
  );
}

export default observer(CardContainer);
