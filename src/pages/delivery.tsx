import React from 'react';

import Seo from '../components/SEO/SEO';

import { SEO_ITEMS } from '../constants/SEOItems';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Оплата и доставка',
    link: '/delivery',
  },
];

const About: React.FC = (): JSX.Element => {
  return (
    <div className="medium-container">
      <Seo
        breadcrumbs={crumbs}
        description={SEO_ITEMS.ru.deliveryPage.description}
        lang="ru"
        path="/delivery"
        title={SEO_ITEMS.ru.deliveryPage.title}
      />
      <p>Оплата:</p>
      <ul className="delivery-list">
        <li>Безналичный расчет (для Юридических/ Физических лиц путем перечисления денежных средств на расчетный счет)</li>
        <li>Денежный перевод на карту &quot;Приват Банка&quot;.</li>
        <li>Наложенный платеж (при условии осуществлении доставки &quot;Нова Пошта&quot;)</li>
      </ul>
      <p>Доставка:</p>
      <ul className="delivery-list">
        <li>
          Самовывоз (При осуществлении самовывоза важно предварительно связаться с менеджером для получения подтверждения наличия
          интересующей Вас продукции в необходимом объеме)
        </li>
        <li>Доставка по указанному Вами адресу</li>
        <li>Доставка &quot;Нова пошта&quot;</li>
      </ul>
    </div>
  );
};

export default About;
