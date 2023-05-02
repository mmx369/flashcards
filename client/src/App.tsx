import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import AddWordForm from './components/AddWordForm/AddWordForm'
import LoginForm from './components/LoginForm/LoginForm'

import classes from './App.module.css'
import { Card } from './components/Card/Card'

const App = () => {
  const { store } = useContext(Context)
  const [isShowAddForm, setIsShowAddForm] = useState(false)

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
      <div className={classes.header}>
        <div>
          <h5>
            {store.isAuth ? `Welcome ${store.user.email}!` : `Not authorized.`}
          </h5>
        </div>
        <div className={classes.actions}>
          <button
            className={classes.button}
            onClick={() => {
              setIsShowAddForm(!isShowAddForm)
            }}
          >
            {isShowAddForm ? `Hide Form` : `Add Words`}
          </button>
          <button className={classes.button} onClick={() => store.logout()}>
            Log out
          </button>
        </div>
      </div>
      <Card />
      {isShowAddForm && <AddWordForm />}
    </div>
  )
}

export default observer(App)
