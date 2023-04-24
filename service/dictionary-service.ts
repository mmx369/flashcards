import { DictDto } from '../dtos/dict-dto'
import Dictionary from '../models/Dictionary'

class DictionaryService {
  async addNewEntry(
    newWord: string,
    translation: string,
    type: string,
    user: string
  ) {
    const newEntry = await Dictionary.create({
      word: newWord,
      translation,
      type,
      user,
    })
    return newEntry
  }

  async getWord() {
    const word = await Dictionary.find({}).sort({ counter: 'asc' }).findOne({})
    const dictDto = new DictDto(word)
    return dictDto
  }
}

export default new DictionaryService()
