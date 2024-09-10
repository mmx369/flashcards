import { NavLink, Outlet } from 'react-router-dom';

import classes from './index.module.css';

function EnglishRoot() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.header_title}>English Language</div>

        <NavLink
          to='cards'
          className={({ isActive }) =>
            isActive ? classes.active : classes.navlink
          }
          end
        >
          Flashcards
        </NavLink>
        <NavLink
          to='words'
          className={({ isActive }) =>
            isActive ? classes.active : classes.navlink
          }
          end
        >
          Your Dictionary
        </NavLink>
      </header>
      <Outlet />;
    </>
  );
}

export default EnglishRoot;
