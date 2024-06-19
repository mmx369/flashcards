import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MainNavigation from '../components/MainNavigation/MainNavigation';

import classes from './Root.module.css';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default observer(RootLayout);
