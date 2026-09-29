class MyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class MovieNotFoundError extends MyError {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Movie not found");
    }
  }
}
export class TooManyRequestsError extends MyError {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Too many requests");
    }
  }
}
export class NetworkError extends MyError {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("TMDB server error, please try again later");
    }
  }
}
