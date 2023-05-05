import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

function MainNavigation() {
  return (
    <>
      <header className={classes.header}>
        <h3>Flashcards App</h3>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Home
        </NavLink>
      </header>
    </>
  )
}

export default MainNavigation
