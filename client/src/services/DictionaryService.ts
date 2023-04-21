import { AxiosResponse } from 'axios'
import $api from '../http'
import { IDictionaryEntry } from '../models/IDictionaryEntry'

export default class DictionaryService {
  static async addNewEntry(newEntry: IDictionaryEntry): Promise<AxiosResponse> {
    return $api.post('/newentry', newEntry)
  }
}
