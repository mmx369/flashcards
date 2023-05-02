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
    const word = await Dictionary.find({}).sort({ counter: 'asc' }).findOne(
      {},
      {
        word: 1,
        translation: 1,
      }
    )
    await Dictionary.findByIdAndUpdate(word?._id, {
      $inc: { counter: 1 },
    })
    return word
  }
}

export default new DictionaryService()
