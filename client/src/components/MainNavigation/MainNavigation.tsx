import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../..'
import classes from './MainNavigation.module.css'

function MainNavigation() {
  const { store } = useContext(Context)

  return (
    <>
      <header className={classes.header}>
        <h3>Flashcards App</h3>
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
          <button className={classes.button} onClick={() => store.logout()}>
            Log out
          </button>
        )}
      </header>
    </>
  )
}

export default observer(MainNavigation)
