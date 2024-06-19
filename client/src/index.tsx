import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import EnglishPage from './pages/English';
import KoreanPage from './pages/Korean';
import RootLayout from './pages/Root';
import Store from './store/store';

import './index.css';

interface State {
  store: Store;
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'eng',
        element: <EnglishPage />,
      },
      // {
      //   path: 'tr',
      //   element: <TurkishPage />,
      // },
      {
        path: 'kr',
        element: <KoreanPage />,
      },
    ],
  },
]);

const store = new Store();

export const Context = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ store }}>
    <RouterProvider router={router} />
  </Context.Provider>
);
