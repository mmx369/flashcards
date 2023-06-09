import Dictionary from '../models/Dictionary'

class DictionaryService {
  async addNewEntry(
    newWord: string,
    translation: string,
    user: string,
    lng: string,
    example?: string
  ) {
    const newEntry = await Dictionary.create({
      word: newWord,
      translation,
      user,
      lng,
      example,
    })
    return newEntry
  }

  async getWord(lng: string, username: string) {
    const words = await Dictionary.find(
      { lng, user: username },
      { word: 1, translation: 1, example: 1 },
      { limit: 15 }
    ).sort({ counter: 'asc' })
    const wordsIds = [] as any
    words.map((word) => wordsIds.push(word._id))
    await Dictionary.updateMany(
      { _id: { $in: wordsIds } },
      { $inc: { counter: 1 } }
    )
    return words
  }
}

export default new DictionaryService()
