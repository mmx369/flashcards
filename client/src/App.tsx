import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm/LoginForm'

import classes from './App.module.css'
import { NavBar } from './components/Navigation/NavBar'

const App = () => {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return <div className='App-header'>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div className='App-header'>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className={classes.app}>
      <div>
        <NavBar />
      </div>
    </div>
  )
}

export default observer(App)
