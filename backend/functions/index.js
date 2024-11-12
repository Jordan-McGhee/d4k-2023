const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const HttpError = require('./models/http-error')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

// route imports
const orderRoutes = require("./routes/order-routes")
const bartenderRoutes = require("./routes/bartender-routes")
const userRoutes = require('./routes/user-routes')
const adminRoutes = require('./routes/admin-routes')
const analyticsRoutes = require('./routes/analytics-routes')
const drinkRoutes = require('./routes/drink-routes')

const app = express();


app.use(bodyParser.json());

// route variables
app.use("/order", orderRoutes)
app.use("/user", userRoutes)
app.use("/admin", adminRoutes)
app.use("/analytics", analyticsRoutes)
app.use("/bartenders", bartenderRoutes)
app.use("/drinks", drinkRoutes)

// ERROR ROUTE
// middleware with 4 parameters is treated as a special middleware by express and will only be executed on requests that have an error associated with it
app.use((error, req, res, next) => {
    // checks to see if we've already sent the error response with a header to the end user
    if (res.headerSent) {
        return next(error);
    }

    // if we reach this code, no error message has been sent, so we will send one now
    // Checks for a code/message attached to the error object, or sets it to 500 and a default error message
    // this is triggered by either throwing an error or passing an error to next() in our routes
    // HAS TO BE PASSED IN NEXT() IF ASYNC CODE
    res
        .status(error.code || 500)
        .json({ message: error.message || "Something went wrong!" });
});


exports.d4k = onRequest(
    { cors: true },
    app
);