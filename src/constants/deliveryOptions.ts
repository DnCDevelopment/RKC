/* eslint-disable import/prefer-default-export */

export const DELIVERY_OPTIONS: {
  [k: string]: { novaPoshta: string; ukrPoshta: string; pickup: string; сourier: string };
} = {
  ru: {
    novaPoshta: 'Нова Пошта',
    ukrPoshta: 'Укр Пошта',
    pickup: 'Самовывоз',
    сourier: 'Курьером',
  },
  ua: {
    novaPoshta: 'Нова Пошта',
    ukrPoshta: 'Укр Пошта',
    pickup: 'Самовивіз',
    сourier: "Кур'єром",
  },
};
