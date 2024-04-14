import { useContext } from 'react';
import { Context } from '../..';
import { ReactComponent as VolumeSvg } from '../../assets/volume.svg';

import { observer } from 'mobx-react-lite';
import { LANGUAGE_MAP } from '../../constants';
import useSpeech from '../../hooks/useSpeech';
import { IWord } from '../../models/IWord';
import { TLanguages } from '../../models/TLanguages';
import classes from './WordCard.module.css';

type TProps = {
  isFrontSide: boolean;
  lang: TLanguages;
  word: IWord;
  speakerWord: string;
  buttonClickHandler: () => void;
};

const WordCard = ({
  isFrontSide,
  lang,
  word,
  speakerWord,
  buttonClickHandler,
}: TProps) => {
  const { store } = useContext(Context);

  const { speak } = useSpeech({
    langCode: LANGUAGE_MAP[lang],
  });

  const handleSpeech = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    speak(speakerWord);
  };

  return (
    <div className={classes.control_group}>
      <div
        className={
          isFrontSide ? classes.card : `${classes.card} ${classes.card_reverse}`
        }
        onClick={buttonClickHandler}
      >
        {isFrontSide && store.isFrontLng && lang !== 'tr' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}
        {!isFrontSide && !store.isFrontLng && lang !== 'tr' && (
          <div className={classes.card_speaker} onClick={handleSpeech}>
            <VolumeSvg />
          </div>
        )}

        {store.isFrontLng && (
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

        {!store.isFrontLng && (
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
  );
};

export default observer(WordCard);
