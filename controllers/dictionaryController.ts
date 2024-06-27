import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import dictionaryService from '../service/dictionary-service';
import { transformWordsDataObject } from './utils/transform';

export type TWords = {
  _id: string;
  word: string;
  translation: string;
  example: string;
};

export interface IGetUserInfoRequest extends Request {
  user?: {
    email: string;
    id: string;
    isActivated: boolean;
  };
}

class DictionaryController {
  async newEntry(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorArray: ValidationError[] = errors.array();
        //@ts-ignore
        return next(ApiError.BadRequest('Validation error', errorArray));
      }
      const { newWord, translation, user, lng, example } = req.body;
      const newEntry = await dictionaryService.addNewEntry(
        newWord,
        translation,
        user,
        lng,
        example
      );
      res.json(newEntry);
    } catch (error) {
      next(error);
    }
  }

  async getWords(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const currentLanguage = req.params.lng || 'eng';
    const username = req.user?.email || '';
    try {
      const { words, totalWords } = await dictionaryService.getWords(
        currentLanguage,
        username
      );
      const wordsTransformed = transformWordsDataObject(words);

      res.json({ words: wordsTransformed, totalWords });
    } catch (error) {
      next(error);
    }
  }

  async deleteWord(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const wordId = req.params.id || '';
    try {
      const word = await dictionaryService.deleteWord(wordId);
      if (word) {
        res.json({ message: 'Word has been deleted!' });
      } else {
        next(new Error('There is no such word in database!'));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new DictionaryController();
