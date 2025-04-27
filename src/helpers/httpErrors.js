class HttpError extends Error {
  constructor(message, status) {
    super(typeof message === "string" ? message : "Http Error");
    this.status = status;
    this.message = message; // Có thể là string hoặc array
  }
}

export default HttpError;
