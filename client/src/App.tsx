import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Context } from '.';
import LoginForm from './components/LoginForm/LoginForm';

import { RotatingLines } from 'react-loader-spinner';
import classes from './App.module.css';
import { Nav } from './components/Navigation/Nav';
import { GA_MEASUREMENT_ID } from './constants';

const App = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return (
      <RotatingLines
        strokeColor='grey'
        strokeWidth='5'
        animationDuration='0.75'
        width='96'
        visible={true}
      />
    );
  }

  if (!store.isAuth) {
    return (
      <div className='App-header'>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className={classes.app}>
      <div>
        <Nav />
      </div>
    </div>
  );
};

export default observer(App);
