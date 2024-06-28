import { TWords } from '../dictionaryController';

interface Document {
  _id: string;
  word: string;
  translation: string;
  example?: string;
  _doc?: Document;
}

export const simplifiedAndTransformData = (words: Document[]): TWords[] => {
  return words.map((doc: Document) => {
    const wordDoc = doc._doc || doc;
    return {
      _id: wordDoc._id,
      word: wordDoc.word.toLowerCase(),
      translation: wordDoc.translation.toLowerCase(),
      example: wordDoc.example ? wordDoc.example.toLowerCase() : '',
    };
  });
};
