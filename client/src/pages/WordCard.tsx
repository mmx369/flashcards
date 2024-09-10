import { IWord } from '../models/IWord';

import classes from './WordCard.module.css';

export function WordCard(props: IWord) {
  return (
    <div className={classes.card}>
      <div>{props.word}</div>
      <div>{props.translation}</div>
      <div>{props.example}</div>
    </div>
  );
}
