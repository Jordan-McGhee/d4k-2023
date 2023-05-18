/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions")
const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const donationRoutes = require("./routes/donation-routes");
const orderRoutes = require("./routes/order-routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  
  next()
})

// want to parse the information we receive from the user before it reaches our other middlewares
// this converts all incoming json data into regular javascript
app.use(bodyParser.json());


// ROUTE VARIABLES
app.use("/donation", donationRoutes);
app.use("/order", orderRoutes);

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
      .json({message: error.message || "Something went wrong!"});
});

exports.api = functions.https.onRequest(
  { cors: true },
  app
);