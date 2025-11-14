const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, { logLevel: 'debug' });
const twilioPhone = '+18449703099'

const sendMessage = async (req, res, next) => {
    console.log(`REQUEST: ${req}:${res}:${next}`)
      // Remove non-digit characters
    var phoneStr = "" + req
    const cleanedNumber = phoneStr.replace(/\D/g, '');

    // Add '+' prefix if missing (assuming a valid international number)
    if (!cleanedNumber.startsWith('+')) {
        phoneNumber = `+1${cleanedNumber}`; // Adjust '1' to the appropriate country code
    }
    const msg = res
    try{
        const message = await client.messages.create({
            to: phoneNumber,
            from: twilioPhone,
            body: msg
        }).then(() => {
            // Access details about the last request
            console.log(client.lastRequest.method);
            console.log(client.lastRequest.url);
            console.log(client.lastRequest.auth);
            console.log(client.lastRequest.params);
            console.log(client.lastRequest.headers);
            console.log(client.lastRequest.data);
          });
          console.log(message)
          return '';
    }
    catch (error) {
        console.error(error)
        return error;
    }
}

exports.sendMessage = sendMessage
