import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';

interface UseCheckAuthReturn {
  isLoading: boolean;
}

export const useCheckAuth = (): UseCheckAuthReturn => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  useEffect(() => {
    if (!store.isAuth && !store.isLoading) {
      navigate('/');
    }
  }, [store.isAuth, store.isLoading, navigate]);
  return { isLoading: store.isLoading };
};
