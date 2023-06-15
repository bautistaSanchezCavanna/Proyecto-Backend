<<<<<<< HEAD
export class HttpError {
    constructor(description = "Server error", status = 500, details = null) {
      this.description = description,
      this.status = status,
      this.details = details
    }
=======
export class HttpError {
    constructor(description, status = 500, details = null) {
      this.description = description,
      this.status = status,
      this.details = details
    }
>>>>>>> origin/main
  }