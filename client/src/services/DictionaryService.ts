import { AxiosResponse } from 'axios';
import $api from '../http';
import { IDictionaryEntry } from '../models/IDictionaryEntry';
import { IWord, IWordsResponse } from '../models/IWord';

export default class DictionaryService {
  static async addNewEntry(newEntry: IDictionaryEntry): Promise<AxiosResponse> {
    return $api.post('/newentry', newEntry);
  }

  static async fetchWords(
    lang: string
  ): Promise<AxiosResponse<IWordsResponse>> {
    return $api.get<IWordsResponse>(`/word/${lang}`);
  }

  static async fetchAllWords(lang: string): Promise<AxiosResponse<IWord[]>> {
    return $api.get<IWord[]>(`/words/${lang}`);
  }

  static async fetchWordsPagination(
    lang: string,
    page: string
  ): Promise<AxiosResponse<{ words: IWord[]; totalWords: number }>> {
    return $api.get<{ words: IWord[]; totalWords: number }>(
      `/words/${lang}?page=${page}`
    );
  }

  static async deleteWord(lang: string, id: string): Promise<AxiosResponse> {
    return $api.delete(`/word/${lang}/${id}`);
  }

  static async fetchSingleWord(
    lang: string,
    id: string
  ): Promise<AxiosResponse> {
    return $api.get<any>(`/word/${lang}/${id}`);
  }
}
