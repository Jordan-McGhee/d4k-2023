// extends Error meaning it builds on the built in Error object
class HttpError extends Error {

    constructor(message, errorCode) {
        // super calls methods of the base class (Error) and forward the message to it
        super(message);
        // add a property with "this" keyword
        this.code = errorCode
    }
}

module.exports = HttpError