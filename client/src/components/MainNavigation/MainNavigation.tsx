import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { Button } from '../UI';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { store } = useContext(Context);

  return (
    <>
      <header className={classes.header}>
        <NavLink
          to='/'
          style={{
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'Arial',
            letterSpacing: '2px',
          }}
        >
          <h3>Flashcards App</h3>
        </NavLink>
        <div style={{ flexGrow: 1 }}></div>
        <div className={classes.header_title}>
          {store.isAuth ? `Welcome ${store.user.email}!` : null}
        </div>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? classes.active : classes.navlink
          }
          end
        >
          Home
        </NavLink>
        {store.isAuth && (
          <Button onClick={() => store.logout()}>Log out</Button>
        )}
      </header>
    </>
  );
}

export default observer(MainNavigation);
