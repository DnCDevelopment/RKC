import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './CartForm.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProductsList from './CartProductsList';
import { IProductTypes } from './Types';

const phoneRegex = /^\+?3?8?(0\d{9})$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required(),
  surname: Yup.string()
    .min(2)
    .required(),
  email: Yup.string().matches(emailRegex),
  phone: Yup.string()
    .matches(phoneRegex)
    .not(['0000000000']),
});

const CartForm: React.FC = () => {
  const [products, setProducts] = useState<IProductTypes[]>([]);
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
    validationSchema: formSchema,
  });

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
  }, []);

  return (
    <div className="cart__form-wrapper">
      <h2 className="cart__form-title">{CART[language as 'ru' | 'ua'].title}</h2>
      <form className="cart__form" onSubmit={formik.handleSubmit}>
        <input
          className={`cart__form-input ${formik.errors.name ? 'cart__form-input--error' : ''}`}
          name="name"
          placeholder={CART[language as 'ru' | 'ua'].form.namePlaceholder}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.surname ? 'cart__form-input--error' : ''}`}
          name="surname"
          placeholder={CART[language as 'ru' | 'ua'].form.surnamePlaceholder}
          value={formik.values.surname}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.email ? 'cart__form-input--error' : ''}`}
          name="email"
          placeholder="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.phone ? 'cart__form-input--error' : ''}`}
          name="phone"
          placeholder="+ 380"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.country ? 'cart__form-input--error' : ''}`}
          name="country"
          placeholder={CART[language as 'ru' | 'ua'].form.countryPlaceholder}
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.city ? 'cart__form-input--error' : ''}`}
          name="city"
          placeholder={CART[language as 'ru' | 'ua'].form.cityPlaceholder}
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.payMethod ? 'cart__form-input--error' : ''}`}
          name="payMethod"
          placeholder={CART[language as 'ru' | 'ua'].form.payMethodPlaceholder}
          value={formik.values.payMethod}
          onChange={formik.handleChange}
        />
        <input
          className={`cart__form-input ${formik.errors.delivery ? 'cart__form-input--error' : ''}`}
          name="delivery"
          placeholder="Доставка"
          value={formik.values.delivery}
          onChange={formik.handleChange}
        />
      </form>
      {products && products.length > 0 && <CartProductsList products={products} setProducts={setProducts} />}
    </div>
  );
};

export default CartForm;
