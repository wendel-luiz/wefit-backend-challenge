import { type NextFunction, type Request, type Response } from "express"
import { Logger } from "../lib/logger"

export function logRequest(req: Request, res: Response, next: NextFunction) {
  Logger.info(`Request: ${req.path}`)
  next()
}
