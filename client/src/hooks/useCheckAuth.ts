import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';

export const useCheckAuth = (): { isLoading: boolean } => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
  });
  return { isLoading: store.isLoading };
};
