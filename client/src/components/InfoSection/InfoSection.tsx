import { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

import classes from './InfoSection.module.css';

function InfoSection() {
  const { store } = useContext(Context);

  return (
    <div className={classes.section}>
      Total Words: {store.totalWords === 0 ? '' : store.totalWords}
    </div>
  );
}

export default observer(InfoSection);
