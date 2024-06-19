import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

export function Nav() {
  return (
    <nav className={classes.nav}>
      <Link to={`eng`} className={classes.btn}>
        English
      </Link>

      {/* <Link to={`tr`} className={classes.btn}>
        Turkish
      </Link> */}

      <Link to={`kr`} className={classes.btn}>
        Korean
      </Link>
    </nav>
  );
}
