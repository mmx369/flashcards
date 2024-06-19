import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Context } from '../..';
import { LANGUAGE_MAP } from '../../constants';
import useSpeech from '../../hooks/useSpeech';
import { IWord } from '../../models/IWord';
import { TLanguages } from '../../models/TLanguages';
import { ReactComponent as VertMenuSvg } from '../../assets/more_vert.svg';
import { ReactComponent as VolumeSvg } from '../../assets/volume.svg';

import classes from './WordCard.module.css';

type TProps = {
  isFrontSide: boolean;
  lang: TLanguages;
  word: IWord;
  speakerWord: string;
  buttonClickHandler: () => void;
};

function WordCard({
  isFrontSide,
  lang,
  word,
  speakerWord,
  buttonClickHandler,
}: TProps) {
  const { store } = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { speak } = useSpeech({
    langCode: LANGUAGE_MAP[lang],
  });

  const handleSpeech = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    speak(speakerWord);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        {/* <div className={classes.dropdown}>
          <div className={classes.vert_menu} onClick={handleClick}>
            <VertMenuSvg />
          </div>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div> */}
      </div>
    </div>
  );
}

export default observer(WordCard);
