import { observer } from 'mobx-react-lite'
import { FC, useContext, useState } from 'react'
import { Context } from '..'

const LoginForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)

  return (
    <div>
      <input
        type='email'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => store.login(email, password)}>Sign In</button>
      <button onClick={() => store.registration(email, password)}>
        Sign Up
      </button>
    </div>
  )
}

export default observer(LoginForm)
