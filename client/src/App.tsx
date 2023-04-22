import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import AddWordForm from './components/AddWordForm'
import LoginForm from './components/LoginForm/LoginForm'
import { IUser } from './models/IUser'
import UserService from './services/UserService'

import classes from './App.module.css'

const App = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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
      <h1>
        {store.isAuth
          ? `User ${store.user.email} authorized.`
          : `Not authorized.`}
      </h1>
      <AddWordForm />
      <button onClick={getUsers}>Get Users</button>
      <button onClick={() => store.logout()}>Log out</button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  )
}

export default observer(App)
