import { useLocation } from 'react-router-dom';
import { TLanguages } from '../models/TLanguages';

export const useGetCurrentLanguage = (): { currentLanguage: TLanguages } => {
  const location = useLocation();
  const currentLanguage = location.pathname.split('/')[1] as TLanguages;
  return { currentLanguage };
};
