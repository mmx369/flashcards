import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Nav.module.css'

export const Nav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <Link to={`eng`} className={classes.btn}>
        English
      </Link>

      <Link to={`tr`} className={classes.btn}>
        Turkish
      </Link>
    </nav>
  )
}
