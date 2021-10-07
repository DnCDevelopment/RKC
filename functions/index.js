/* eslint-disable */
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const functions = require('firebase-functions');
const telegraf = require('telegraf');

admin.initializeApp();

const relamsBots = {
  Frankovsk: '1472646652:AAGXfOR9XaJRPWkodAPfWLNHery4z0byVNU',
  Lvov: '1460773689:AAE917X-9GYW3QARys5hHO7SDKoSMXerDg0',
  Dnepr: '1410614345:AAGmYD4uE4U4YzcjdLXYvPS4J0fT27-vSeU',
  Kiev: '1413352424:AAF-i27SrE3ZxV2De9pHcMLWb8Ru15O56dQ',
  Odessa: '1466049338:AAEe0rh2qbBRW_RJfEi-piM1y_HWo1YUn_E',
  Khemlnitckiy: '1417774091:AAGDJ1XQ56crUU907U5uPlNRgy6AVnH9zSU',
  Zaporizhzhia: '1261865184:AAFGyo_W9V_Lnx4nCCyeqftzbsD2p0Vg1O4',
  Kharkiv: '1412526330:AAFVlVfiLC-GfoV-TXlN5eAokdqtDA1laxA',
  Poltava: '1493478650:AAE6ARSlSYplADorvIHFQwOp8jI45jtH1CE'
};

exports.build = functions.https.onRequest((req, res) => {
  fetch('https://circleci.com/api/v1.1/project/github/DnCDevelopment/RKC/tree/main', {
    body: 'build_parameters[CIRCLE_JOB]=build',
    headers: {
      Authorization: 'Basic OTQ0OGIxMTMzODI4N2YyMmQ5NDUzZDc2NWQ2NmNlZDk5YjIzZTMyNDo=',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
    .then(() => console.log('build'))
    .catch(err => console.error(err));
});

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
          realm,
        })
        .then(() => {
          return res.status(200).send({
            method: 'sendMessage',
            chat_id,
            text: 'Вы успешно авторизованы',
          });
        })
        .catch(() => {
          return res.status(200).send({
            method: 'sendMessage',
            chat_id,
            text: `Что то пошло не так при добавлении этого чата ${chat_id}`,
          });
        });
    }
  }
};

const formatUserData = (userData) => {
  const deliveryOptions = {
    novaPoshta: 'Нова Пошта',
    ukrPoshta: 'Укр Пошта',
    pickup: 'Самовывоз',
    сourier: 'Курьером',
  }
  const template = {
    'Имя': userData.name,
    'Фамилия':userData.surname,
    'E-mail':userData.email,
    'Телефон':userData.phone,
    'Страна': userData.country,
    'Город': userData.city,
    'Метод оплаты': userData.payMethod,
    'Доставка': deliveryOptions[userData.deliveryMethod],
    'Адрес офиса':userData.officeAddress,
    'Отделение новой почты':userData.novaPoshtaDepartment,
    'Отделение укр почты':userData.ukrPoshtaDepartment,
    'Адрес':userData.address,
    'Этаж':userData.flat
  }
  return Object.keys(template).filter(k=>!!template[k]).map((k)=>`${k}: ${template[k]}`).join('\n')
}

const formatProduct = (product) => {
  const template = {
    'Название': product.name,
    'Код':product.code,
    'Количество': `${product.amount} ${product.measure}`,
    'Цена': product.price,
    'Сумма': product.total
  }
  return Object.keys(template).filter(k=>!!template[k]).map((k)=>`${k}: ${template[k]}`).join('\n')
}

exports.sendOrder = functions.https.onRequest(async (req,res)=> {
  if (!req.query && !req.query.realm && !req.body ) {
    return res.status(400).end();
  }
  const bot = new telegraf.Telegram(relamsBots[req.query.realm]);
  const separtator = '\n------------\n'
  const { userData, products, total } = JSON.parse(req.body); 

  try {
    const userInfo = formatUserData(userData)
    const productsInfo = products.map((product) => formatProduct(product)).join(separtator)
    const totalInfo = `Сумма: ${total}`
    const message = [userInfo,productsInfo,totalInfo].join(separtator)
    const users = await admin
      .firestore()
      .collection('users')
      .where('realm', '==', req.query.realm)
      .get();
    if (users.size) {
      users.forEach(doc => {
         bot.sendMessage(doc.data().id, message);
       });
       return res.status(200).send('OK');
    } else {
      return res
        .status(400).end();
    }
  } catch(err) {
    return res.status(400).end()
  }
  
})

exports.sendMessage = functions.https.onRequest(async (req, res) => {
  if (!req.query && !req.query.realm && !req.body) {
    return res.status(400).end();
  }

  const bot = new telegraf.Telegram(relamsBots[req.query.realm]);
  const body = JSON.parse(req.body);

  try {
    const users = await admin
      .firestore()
      .collection('users')
      .where('realm', '==', req.query.realm)
      .get();

    if (users.size) {
      users.forEach(doc => {
        const message = Object.keys(body).reduce((acc, key) => {
          acc += `${key}: ${body[key]}\n`;
          return acc;
        }, '');
        bot.sendMessage(doc.data().id, message);
      });
      return res.status(200).end();
    } else {
      return res
        .status(400).end();
    }
  } catch (err) {
    return res
      .status(500)
      .send(err)
      .end();
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

exports.newUserKhemlnitckiy = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Khemlnitckiy');
});

exports.newUserZaporizhzhia = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Zaporizhzhia');
});

exports.newUserKharkiv = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Kharkiv');
});

exports.newUserPoltava = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Poltava');
});

exports.newUserOdessa = functions.https.onRequest((req, res) => {
  return addNewUser(req, res, 'Odessa');
});


