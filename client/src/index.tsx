import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './store/store';
import RootLayout from './pages/Root';

import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Korean from './pages/Korean/Korean';
import App from './App';
import English from './pages/English/English';
import WordList from './pages/WordList';
import KoreanRoot from './pages/Korean';
import EnglishRoot from './pages/English';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'kr',
        element: <KoreanRoot />,
        children: [
          {
            path: 'cards',
            element: <Korean />,
          },
          {
            path: 'words',
            element: <WordList />,
          },
        ],
      },
      {
        path: 'eng',
        element: <EnglishRoot />,
        children: [
          {
            path: 'cards',
            element: <English />,
          },
          {
            path: 'words',
            element: <WordList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <RouterProvider router={router} />
    </Context.Provider>
  </React.StrictMode>
);
