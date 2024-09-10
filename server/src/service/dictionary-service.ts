import { TWords } from '../controllers/dictionaryController';
import ApiError from '../exceptions/api-error';
import Dictionary from '../models/Dictionary';

class DictionaryService {
  async addNewEntry(
    newWord: string,
    translation: string,
    user: string,
    lng: string,
    example?: string
  ) {
    const isDocumentExists = await Dictionary.findOne({
      user,
      word: newWord,
    }).exec();

    if (!isDocumentExists) {
      const newEntry = await Dictionary.create({
        word: newWord,
        translation,
        user,
        lng,
        example,
      });
      return newEntry;
    } else {
      throw new ApiError(400, 'Already exists. Try another word.');
    }
  }

  async getWords(lng: string, username: string) {
    const result = await Promise.all([
      Dictionary.find(
        { lng, user: username },
        { word: 1, translation: 1, example: 1 },
        { limit: 10 }
      ).sort({ counter: 'asc' }),
      Dictionary.aggregate()
        .match({ lng, user: username })
        .project({ word: 1, translation: 1, example: 1 })
        .sample(10),
      Dictionary.find({ lng, user: username }).count(),
    ]);

    const [newWords, randomWords, totalWords] = result;
    const words = [...newWords, ...randomWords];

    const wordsIds = [] as TWords[];
    words.map((word) => wordsIds.push(word._id));
    await Dictionary.updateMany(
      { _id: { $in: wordsIds } },
      { $inc: { counter: 1 } }
    );
    return { words, totalWords };
  }

  async getAllWords(lng: string, username: string) {
    const words = await Dictionary.find({ lng, user: username }).sort({
      counter: 'asc',
    });
    return words;
  }

  async getWordsPagination(lng: string, username: string, page: string) {
    const LIMIT = 10;
    const offset = (Number(page) - 1) * LIMIT;
    const result = await Promise.all([
      Dictionary.find(
        { lng, user: username },
        { word: 1, translation: 1, example: 1 }
      )
        .sort({
          translation: 'asc',
        })
        .skip(offset)
        .limit(LIMIT),
      Dictionary.find({ lng, user: username }).count(),
    ]);

    const [words, totalWords] = result;

    return { words, totalWords };
  }

  async deleteWord(id: string) {
    const word = await Dictionary.findByIdAndDelete(id);
    return word;
  }
}

export default new DictionaryService();
