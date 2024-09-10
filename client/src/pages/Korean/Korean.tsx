import { useContext, useState } from 'react';
import ReactGA from 'react-ga4';
import { Context } from '../..';
import { RotatingLines } from 'react-loader-spinner';
import { AddWordForm } from '../../components/AddWordForm/AddWordForm';
import Card from '../../components/Card/CardContainer';
import { Button } from '../../components/UI';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { useGetCurrentLanguage } from '../../hooks/useGetCurrentLanguage';
import InfoSection from '../../components/InfoSection/InfoSection';

import classes from './Korean.module.css';
import { observer } from 'mobx-react-lite';

function KoreanPage() {
  ReactGA.send({ hitType: 'pageview', page: '/kr', title: 'Korean' });
  const { store } = useContext(Context);
  const { isLoading } = useCheckAuth();
  const { currentLanguage } = useGetCurrentLanguage();
  const [isShowAddForm, setIsShowAddForm] = useState(false);

  if (isLoading) {
    return (
      <div>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='96'
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      {!isShowAddForm && (
        <div>
          <InfoSection />
        </div>
      )}

      {!isShowAddForm && (
        <div className={classes.actions_upper}>
          <Button
            className={classes.button}
            onClick={() => store.setLanguage(!store.isFrontLng)}
          >
            Swap &nbsp;
            {store.isFrontLng
              ? `(${currentLanguage} =>)`
              : `(=> ${currentLanguage})`}
          </Button>
        </div>
      )}

      {!isShowAddForm && <Card lang={currentLanguage} />}

      <div className={classes.actions_lower}>
        <Button
          className={classes.button}
          onClick={() => setIsShowAddForm(!isShowAddForm)}
        >
          {isShowAddForm ? `Hide Form` : `Add New Word`}
        </Button>
      </div>

      {isShowAddForm && <AddWordForm lng={currentLanguage} />}
    </div>
  );
}

export default observer(KoreanPage);
