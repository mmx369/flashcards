import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

export function Nav() {
  return (
    <nav className={classes.nav}>
      <Link to={`eng/cards`} className={classes.btn}>
        English
      </Link>

      <Link to={`kr/cards`} className={classes.btn}>
        Korean
      </Link>
    </nav>
  );
}
