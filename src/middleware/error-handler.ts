/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextFunction, type Request, type Response } from "express"
import { z } from "zod"
import { fromZodError } from "zod-validation-error"
import { Exception } from "../lib/exceptions"

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): unknown {
  if (err instanceof Exception) {
    return res.status(err.code).json({
      message: err.message,
    })
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message:
        process.env.NODE_ENV !== "prod"
          ? fromZodError(err).toString()
          : "Validation error",
    })
  }

  console.error(
    `Internal Server Error: Message: ${(err as Error).message} Stack: ${
      (err as Error).stack
    }`
  )

  return res.status(500).json({
    message: "Internal Server Error.",
  })
}
