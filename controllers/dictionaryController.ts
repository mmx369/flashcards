import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
import dictionaryService from '../service/dictionary-service'

class DictionaryController {
  async newEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        //@ts-ignore
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { newWord, translation, type, user } = req.body
      const newEntry = await dictionaryService.addNewEntry(
        newWord,
        translation,
        type,
        user
      )
      res.json(newEntry)
    } catch (error) {
      next(error)
    }
  }

  async getWord(req: Request, res: Response, next: NextFunction) {
    try {
      const word = await dictionaryService.getWord()
      res.json(word)
    } catch (error) {
      next(error)
    }
  }
}

export default new DictionaryController()
