import Dictionary from '../models/Dictionary'

class DictionaryService {
  async addNewEntry(
    newWord: string,
    translation: string,
    type: string,
    user: string,
    lng: string,
    example?: string
  ) {
    const newEntry = await Dictionary.create({
      word: newWord,
      translation,
      type,
      user,
      lng,
      example,
    })
    return newEntry
  }

  async getWord(lng: string) {
    const words = await Dictionary.find(
      { lng },
      { word: 1, translation: 1, example: 1 },
      { limit: 15 }
    ).sort({ counter: 'asc' })
    console.log(111, words.length)
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
