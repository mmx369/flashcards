import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IWord } from '../../models/IWord';
import DictionaryService from '../../services/DictionaryService';
import { useFetchDictionary } from '../../hooks/useFetchDictionary';
import { TLanguages } from '../../models/TLanguages';
import { Button } from '../UI';
import WordCard from './WordCard';
import Backdrop from '../UI/Backdrop';
import { Context } from '../..';

import classes from './CardContainer.module.css';

function CardContainer({ lang }: { lang: TLanguages }) {
  const { store } = useContext(Context);
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [words, setWords] = useState<IWord[]>([]);
  const [word, setWord] = useState<IWord>({} as IWord);
  const [speaker, setSpeaker] = useState<IWord>({} as IWord);
  const [fetch, setFetch] = useState<boolean>(false);
  const { error, data, loading } = useFetchDictionary(lang, fetch);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  useEffect(() => {
    store.setTotalWords(data.totalWords);
    setWords(data.words);
    setWord(data.words[0]);
    setSpeaker(data.words[0]);
  }, [data.words, data.totalWords, store]);

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

  console.log(8787, words);

  const deleteHander = async () => {
    setIsLoaderOpen(true);
    const res = await DictionaryService.deleteWord(lang, words[0]._id);
    if (res) {
      try {
        const { data } = await DictionaryService.fetchWords(lang);
        store.setTotalWords(data.totalWords);
        setWords(data.words);
        setWord(data.words[0]);
        setSpeaker(data.words[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaderOpen(false);
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

  if (!loading && data.words.length === 0) {
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
      <Backdrop open={isLoaderOpen} setOpen={setIsLoaderOpen} />
    </>
  );
}

export default observer(CardContainer);
