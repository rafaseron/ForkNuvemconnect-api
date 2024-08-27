export class ErrorHandle extends Error {
  private readonly _code: number
  constructor (code: number, message: string) {
    super(message)
    this._code = code
  }

  getCode (): number {
    return this._code
  }
}


export class BadRequestError extends ErrorHandle {
  constructor (message: string) {
    super(400, message)
  }
}
export class NotFoundError extends ErrorHandle {
  constructor (message: string) {
    super(404, message)
  }
}
export class InternalServerError extends ErrorHandle {
  constructor (message: string) {
    super(500, message)
  }}