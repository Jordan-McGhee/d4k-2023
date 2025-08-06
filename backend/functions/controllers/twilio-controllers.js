const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (req, res, next) => {
    const { message } = req.body
    const { phone_number } = req.body

client.messages
    .create({
        to: phone_number
    })
    .then(message => console.log(message.sid))
}

exports.sendMessage = sendMessage
