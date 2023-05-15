import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '..'

import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import AddWordForm from '../components/AddWordForm/AddWordForm'
import { Card } from '../components/Card/Card'
import classes from './English.module.css'

const EnglishPage: React.FC = () => {
  const { store } = useContext(Context)
  const [isShowAddForm, setIsShowAddForm] = useState(false)
  const [swapCards, setSwapCards] = useState(true)
  const navigate = useNavigate()

  const location = useLocation()
  const currentLanguage = location.pathname.slice(1)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  useEffect(() => {
    if (!store.isAuth) {
      navigate('/')
    }
  }, [store.isAuth, navigate])

  if (store.isLoading) {
    return (
      <div>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='96'
          visible={true}
        />
      </div>
    )
  }

  return (
    <div className={classes.app}>
      {!isShowAddForm && (
        <div className={classes.actions_upper}>
          <button
            className={classes.button}
            onClick={() => setSwapCards(!swapCards)}
          >
            Swap Language
          </button>
        </div>
      )}
      {!isShowAddForm && <Card lang={currentLanguage} swap={swapCards} />}
      <div className={classes.header}>
        <div className={classes.actions}>
          <button
            className={classes.button}
            onClick={() => {
              setIsShowAddForm(!isShowAddForm)
            }}
          >
            {isShowAddForm ? `Hide Form` : `Add New Words`}
          </button>
        </div>
      </div>
      {isShowAddForm && <AddWordForm lng={currentLanguage} />}
    </div>
  )
}

export default observer(EnglishPage)
