import { TWords } from '../dictionaryController';

export const transformWordsDataObject = (words: TWords[]): TWords[] => {
  return words.map((el) => ({
    ...el,
    word: el.word.toLowerCase(),
    translation: el.translation.toLowerCase(),
  }));
};
