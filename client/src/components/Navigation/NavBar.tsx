import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NavBar.module.css'

export const NavBar: React.FC = () => {
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
