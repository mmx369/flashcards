import { NextFunction, Request, Response } from 'express'

class DictionaryController {
  async newEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const { newWord, translation, type, user } = req.body
      console.log('BODY!!', newWord, translation, type, user)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DictionaryController()
