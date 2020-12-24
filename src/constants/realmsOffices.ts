/* eslint-disable @typescript-eslint/camelcase */
export const REALMS_OFFICES: { [key: string]: string[] } = {
  'Odessa Oblast': ['Mykolaiv Oblast'],
  Kyiv: ['Kyiv Oblast', 'Zhytomyr Oblast', 'Chernihiv Oblast', 'Cherkasy Oblast'],
  'Dnipropetrovsk Oblast': ['Kirovohrad Oblast'],
  'Lviv Oblast': ['Volyn Oblast'],
  'Ivano-Frankivsk Oblast': ['Zakarpattia Oblast', 'Chernivtsi Oblast'],
  'Khmelnytskyi Oblast': ['Ternopil Oblast', 'Vinnytsia Oblast', 'Rivne Oblast'],
  'Zaporizhzhya Oblast': ['Kherson Oblast', 'Donetsk Oblast', 'Autonomous Republic of Crimea'],
  'Kharkiv Oblast': ['Luhansk Oblast'],
  'Poltava Oblast': ['Sumy Oblast'],
};

export const OFFICES_BOT_ID: { [key: string]: string } = {
  Cockpit__Offices__5fddf785c575172b485ec8e1: 'Frankovsk',
  Cockpit__Offices__5fddf6f186fe6a26da6190d1: 'Lvov',
  Cockpit__Offices__5fddf63753aa811f35392481: 'Dnepr',
  Cockpit__Offices__5fda96e2a358bb47bc00df41: 'Kiev',
  Cockpit__Offices__5fda9651a105c9188179dbe1: 'Odessa',
  Cockpit__Offices__5fddf80c53b0fe38ad4e92c4: 'Khemlnitckiy',
  Cockpit__Offices__5fddf9027969de1d4d5276b1: 'Zaporizhzhia',
  Cockpit__Offices__5fddf9ef1a35562c98258501: 'Kharkiv',
  Cockpit__Offices__5fddfa85761c2723b5314051: 'Poltava',
};

export const OFFICES_ID: { [key: string]: string } = {
  'Odessa Oblast': 'Cockpit__Offices__5fda9651a105c9188179dbe1',
  Kyiv: 'Cockpit__Offices__5fda96e2a358bb47bc00df41',
  'Dnipropetrovsk Oblast': 'Cockpit__Offices__5fddf63753aa811f35392481',
  'Lviv Oblast': 'Cockpit__Offices__5fddf6f186fe6a26da6190d1',
  'Ivano-Frankivsk Oblast': 'Cockpit__Offices__5fddf785c575172b485ec8e1',
  'Khmelnytskyi Oblast': 'Cockpit__Offices__5fddf80c53b0fe38ad4e92c4',
  'Zaporizhzhya Oblast': 'Cockpit__Offices__5fddf9027969de1d4d5276b1',
  'Kharkiv Oblast': 'Cockpit__Offices__5fddf9ef1a35562c98258501',
  'Poltava Oblast': 'Cockpit__Offices__5fddfa85761c2723b5314051',
};
