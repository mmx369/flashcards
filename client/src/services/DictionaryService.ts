import { AxiosResponse } from 'axios'
import $api from '../http'
import { IDictionaryEntry } from '../models/IDictionaryEntry'
import { IWord } from '../models/IWord'

export default class DictionaryService {
  static async addNewEntry(newEntry: IDictionaryEntry): Promise<AxiosResponse> {
    return $api.post('/newentry', newEntry)
  }

  static async fetchWord(): Promise<AxiosResponse<IWord>> {
    return $api.get<IWord>('/word')
  }
}
