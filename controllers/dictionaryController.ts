import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import dictionaryService from '../service/dictionary-service';

export interface IGetUserInfoRequest extends Request {
  user?: {
    email: string;
    id: string;
    isActivated: boolean;
  };
}

class DictionaryController {
  async newEntry(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //@ts-ignore
        return next(ApiError.BadRequest('Validation error', errors.array()));
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

  async getWord(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    const currentLanguage = req.params.lng || 'eng';
    const username = req.user?.email || '';
    try {
      const word = await dictionaryService.getWord(currentLanguage, username);
      res.json(word);
    } catch (error) {
      next(error);
    }
  }

  async deleteWord(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction
  ) {
    const wordId = req.params.id || '';
    try {
      const word = await dictionaryService.deleteWord(wordId);
      if (word) {
        res.json({ message: 'Word has been deleted!' });
      } else {
        throw new Error('There is no such word in database!');
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new DictionaryController();
