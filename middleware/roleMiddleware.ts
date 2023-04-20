import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export default function (roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'User not authorized' })
      }
      //@ts-ignore
      const { roles: userRoles } = jwt.verify(token, secret.secret)
      let hasRole
      userRoles.forEach((role: string) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: `Access denied` })
      }

      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}
