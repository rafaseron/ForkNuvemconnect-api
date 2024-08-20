class ErrorHandle extends Error {
  private readonly code: number
  constructor (code: number, message: string) {
    super(message)
    this.code = code
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