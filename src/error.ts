export class ResponseError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ResponseError'
    this.status = status
  }
}
