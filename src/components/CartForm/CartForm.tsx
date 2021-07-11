import React, { useContext } from 'react';

import { useFormik } from 'formik';

import './CartForm.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';

const CartForm: React.FC = () => {
  const { language } = useContext(context);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      payMethod: '',
      delivery: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div className="cart__form-wrapper">
      <h2 className="cart__form-title">{CART[language as 'ru' | 'ua'].title}</h2>
      <form className="cart__form" onSubmit={formik.handleSubmit}>
        <input
          className="cart__form-input"
          name="name"
          placeholder={CART[language as 'ru' | 'ua'].form.namePlaceholder}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <input
          className="cart__form-input"
          name="surname"
          placeholder={CART[language as 'ru' | 'ua'].form.surnamePlaceholder}
          value={formik.values.surname}
          onChange={formik.handleChange}
        />
        <input className="cart__form-input" name="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} />
        <input className="cart__form-input" name="phone" placeholder="+ 380" value={formik.values.phone} onChange={formik.handleChange} />
        <input
          className="cart__form-input"
          name="country"
          placeholder={CART[language as 'ru' | 'ua'].form.countryPlaceholder}
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        <input
          className="cart__form-input"
          name="city"
          placeholder={CART[language as 'ru' | 'ua'].form.cityPlaceholder}
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <input
          className="cart__form-input"
          name="payMethod"
          placeholder={CART[language as 'ru' | 'ua'].form.payMethodPlaceholder}
          value={formik.values.payMethod}
          onChange={formik.handleChange}
        />
        <input
          className="cart__form-input"
          name="delivery"
          placeholder="Доставка"
          value={formik.values.delivery}
          onChange={formik.handleChange}
        />
      </form>
    </div>
  );
};

export default CartForm;
