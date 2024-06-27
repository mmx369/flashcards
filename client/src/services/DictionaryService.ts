import { AxiosResponse } from 'axios';
import $api from '../http';
import { IDictionaryEntry } from '../models/IDictionaryEntry';
import { IWordsResponse } from '../models/IWord';

export default class DictionaryService {
  static async addNewEntry(newEntry: IDictionaryEntry): Promise<AxiosResponse> {
    return $api.post('/newentry', newEntry);
  }

  static async fetchWords(
    lang: string
  ): Promise<AxiosResponse<IWordsResponse>> {
    return $api.get<IWordsResponse>(`/word/${lang}`);
  }

  static async deleteWord(lang: string, id: string): Promise<AxiosResponse> {
    return $api.delete(`/word/${lang}/${id}`);
  }
}
