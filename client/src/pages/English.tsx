import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '..'

import { useLocation, useNavigate } from 'react-router-dom'
import AddWordForm from '../components/AddWordForm/AddWordForm'
import { Card } from '../components/Card/Card'
import classes from './English.module.css'

const EnglishPage: React.FC = () => {
  const { store } = useContext(Context)
  const [isShowAddForm, setIsShowAddForm] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const currentLanguage = location.pathname.slice(1)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  //   useEffect(() => {
  //     if (!store.isAuth) {
  //       navigate('/')
  //     }
  //   }, [store.isAuth, navigate])

  if (store.isLoading) {
    return <div className='App-header'>Loading...</div>
  }

  if (!store.isAuth) {
    // navigate('/')
    return <div className='App-header'>Not authorized!</div>
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
      <Card lang={currentLanguage} />
      {isShowAddForm && <AddWordForm lng={currentLanguage} />}
    </div>
  )
}

export default observer(EnglishPage)
