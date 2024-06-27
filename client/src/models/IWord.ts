export interface IWord {
  word: string;
  translation: boolean;
  _id: string;
  example: string;
}

export interface IWordsResponse {
  words: IWord[];
  totalWords: number;
}
