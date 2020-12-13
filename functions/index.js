/* eslint-disable */
const functions = require('firebase-functions');
const telegraf = require('telegraf');
const admin = require('firebase-admin');
admin.initializeApp();

const bot = new telegraf.Telegram('1212546047:AAH5_g1EBNNB1DMXfRQlCLQaYfmwBGFKOJw');

exports.newUser = functions.https.onRequest((req, res) => {
  const isTelegramMessage = req.body && req.body.message && req.body.message.chat && req.body.message.chat.id;
  if (isTelegramMessage) {
    const chat_id = req.body.message.chat.id;
    const message = req.body.message.text;
    console.log('message:', message);
    console.log('id:', chat_id);
    return res.status(200).send({
      method: 'sendMessage',
      chat_id,
      text: chat_id,
    });
  }
});
