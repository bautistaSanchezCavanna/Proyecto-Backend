export class HttpError {
    constructor(description = "Internal Server Error", status = 500, details = null) {
      this.description = description,
      this.status = status,
      this.details = details
    }
  }