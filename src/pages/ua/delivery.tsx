import React from 'react';

import Seo from '../../components/SEO/SEO';

import { SEO_ITEMS } from '../../constants/SEOItems';

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
        <li>Безготівковий розрахунок (для Юридичних/ Фізічних осіб шляхом перерахування грошових коштів на розрахунковий рахунок)</li>
        <li>Грошовий переказ на карту &quot;Приват Банка&quot;.</li>
        <li>Накладений платіж (за умови здійснення доставки &quot;Нова Пошта&quot;)</li>
      </ul>
      <p>Доставка:</p>
      <ul className="delivery-list">
        <li>
          Самовивіз (при здійсненні самовивозу важливо попередньо зв&apos;язатися з менеджером для отримання підтвердження наявності
          продукції, що Вас цікавить в необхідному обсязі)
        </li>
        <li>Доставка за вказаною Вами адресою</li>
        <li>Доставка &quot;Нова пошта&quot;</li>
      </ul>
    </div>
  );
};

export default About;
