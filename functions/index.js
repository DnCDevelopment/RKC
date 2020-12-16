/* eslint-disable */
const functions = require('firebase-functions');
const telegraf = require('telegraf');
const admin = require('firebase-admin');
admin.initializeApp();

const relamsBots = {
  'Frankovsk': '',
  'Lvov': '',
  'Dnepr': '',
  'Kiev': '',
  'Odessa': '',
};

const addNewUser = (req, res, realm) => {
  const isTelegramMessage = req.body && req.body.message && req.body.message.chat && req.body.message.chat.id;
  if (isTelegramMessage) {
    const chat_id = req.body.message.chat.id;
    const message = req.body.message.text;
    if (message === '/start') {
      return res.status(200).send({
        method: 'sendMessage',
        chat_id,
        text: 'Добро пожаловать! Введите команду-пароль',
      });
    }
    if (message === '/rkc_orders') {
      return admin
        .firestore()
        .collection('/users')
        .add({
          id: chat_id,
          realm
        })
        .then(() => {
          return res.status(200).send({
            method: 'sendMessage',
            chat_id,
            text: 'Вы успешно авторизованы'
          });
        })
        .catch(() => {
          return res.status(200).send({
            method: 'sendMessage',
            chat_id,
            text: `Что то пошло не так при добавлении этого чата ${chat_id}`
          });
        });
    }
  }
}

exports.sendMessage = functions.https.onRequest(async (req, res) => {
  if (!req.query && !req.query.realm && !req.body) {
    return res.status(400).end();
  }

  const bot = new telegraf.Telegram(relamsBots[req.query.realm]);

  try {
    const users = await admin.firestore().collection('users').where('realm', '==', req.query.realm).get();
    users.forEach((doc) => {
      const message = Object.keys(req.body).reduce((acc, key) => {
        acc += `${key}: ${req.body[key]}\n`;
        return acc;
      }, '');
      bot.sendMessage(doc.data().id, message);
      return res.status(200).end();
    })
  } catch (err) {
    return res.status(500).send(err).end()
  }
});

exports.newUserFrankovsk = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Frankovsk');
});

exports.newUserLvov = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Lvov');
});

exports.newUserDnepr = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Dnepr');
});

exports.newUserKiev = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Kiev');
});

exports.newUserOdessa = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Odessa');
});

