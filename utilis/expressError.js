class expressError extends Error {
   constructor(statusCode, message) {
      super();
      this.statusCode;
      this.message;
   }
}
module.exports = expressError;