import { useLocation } from 'react-router-dom';

export const useGetCurrentLanguage = (): { currentLanguage: string } => {
  const location = useLocation();
  const currentLanguage = location.pathname.slice(1);
  return { currentLanguage };
};
