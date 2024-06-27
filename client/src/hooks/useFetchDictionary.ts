import { useCallback, useEffect, useState } from 'react';
import { IWord, IWordsResponse } from '../models/IWord';
import DictionaryService from '../services/DictionaryService';

export type TFetchDictionaryResponse = {
  status: Number;
  statusText: String;
  data: IWordsResponse;
  error: any;
  loading: Boolean;
};

export const useFetchDictionary = (
  lang: string,
  fetch: boolean
): TFetchDictionaryResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>('');
  const [data, setData] = useState<IWordsResponse>({
    words: [],
    totalWords: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const getData = useCallback(async () => {
    try {
      const apiResponse = await DictionaryService.fetchWords(lang);
      setData(apiResponse.data);
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [lang]);

  useEffect(() => {
    getData();
  }, [fetch]);

  return { data, error, loading, status, statusText };
};
