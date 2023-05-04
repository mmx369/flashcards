import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import './index.css'
import EnglishPage from './pages/English'
import TurkishPage from './pages/Turkish'
import Store from './store/store'

interface State {
  store: Store
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'eng',
    element: <EnglishPage />,
  },
  {
    path: 'tr',
    element: <TurkishPage />,
  },
])

const store = new Store()

export const Context = createContext<State>({
  store,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={{ store }}>
    <RouterProvider router={router} />
  </Context.Provider>
)
