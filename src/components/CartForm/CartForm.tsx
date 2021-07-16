import React, { useContext, useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import './CartForm.scss';
import ArrowSVG from '../../assets/icons/arrow.svg';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProductsList from './CartProductsList';
import { IProductTypes } from './Types';
import { DELIVERY_OPTIONS } from '../../constants/deliveryOptions';

const phoneRegex = /^\+?3?8?(0\d{9})$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required(),
  surname: Yup.string()
    .min(2)
    .required(),
  email: Yup.string()
    .matches(emailRegex)
    .required(),
  country: Yup.string()
    .min(2)
    .required(),
  city: Yup.string()
    .min(2)
    .required(),
  phone: Yup.string()
    .matches(phoneRegex)
    .not(['0000000000'])
    .required(),
  ukrPoshtaDepartment: Yup.number().required(),
  address: Yup.string().required(),
  officeAddress: Yup.string().required(),
  flat: Yup.number().required(),
  deliveryMethod: Yup.string().required(),
  payMethod: Yup.string().required(),
});

const CartForm: React.FC = () => {
  const {
    office: {
      address: { value: office },
    },
    offices,
  } = useContext(context);

  const [products, setProducts] = useState<IProductTypes[]>([]);
  const [isPaymethodOpen, setPayMethodOpen] = useState<boolean>(false);
  const [isDeliveryOpen, setDeliveryOpen] = useState<boolean>(false);
  const [isOfficesOpen, setOfficesOpen] = useState<boolean>(false);

  const handleOfficesOpen = () => {
    setOfficesOpen(prev => !prev);
  };

  const handleDeliveryOpen = () => {
    setPayMethodOpen(false);
    setDeliveryOpen(prev => !prev);
  };

  const handlePayMethod = () => {
    setDeliveryOpen(false);
    setPayMethodOpen(prev => !prev);
  };

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
      deliveryMethod: '',
      ukrPoshtaDepartment: '',
      address: '',
      officeAddress: office,
      flat: '',
    },
    onSubmit: values => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    formik.setFieldValue('officeAddress', office);
  }, [office]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
  }, []);

  return (
    <div className="cart-form-wrapper">
      <h2 className="cart-form-title">{CART[language as 'ru' | 'ua'].title}</h2>
      <form className="cart-form" onSubmit={formik.handleSubmit}>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.name ? 'cart-form-input--error' : ''}`}
            name="name"
            placeholder={CART[language as 'ru' | 'ua'].form.namePlaceholder}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.surname ? 'cart-form-input--error' : ''}`}
            name="surname"
            placeholder={CART[language as 'ru' | 'ua'].form.surnamePlaceholder}
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
        </div>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.email ? 'cart-form-input--error' : ''}`}
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.phone ? 'cart-form-input--error' : ''}`}
            name="phone"
            placeholder="+ 380"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.country ? 'cart-form-input--error' : ''}`}
            name="country"
            placeholder={CART[language as 'ru' | 'ua'].form.countryPlaceholder}
            value={formik.values.country}
            onChange={formik.handleChange}
          />
        </div>
        <div className="cart-form-row">
          <input
            className={`cart-form-input ${formik.errors.city ? 'cart-form-input--error' : ''}`}
            name="city"
            placeholder={CART[language as 'ru' | 'ua'].form.cityPlaceholder}
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </div>
        <div className={`cart-form-row ${isPaymethodOpen ? 'cart-form-row--open' : ''}`} onClick={handlePayMethod}>
          <p className="cart-form-row-placeholder">{formik.values.payMethod ? formik.values.payMethod : 'Способ оплаты'}</p>
          <div className={`cart-form-input ${formik.errors.payMethod ? 'cart-form-input--error' : ''}`} />
          <ArrowSVG />
          <div className={`cart-form-row-select ${isPaymethodOpen ? 'cart-form-row-select--open' : ''}`}>
            <p className="cart-form-row-select-value" onClick={() => formik.setFieldValue('payMethod', 'Оплата через менеджера')}>
              Оплата через менеджера
            </p>
          </div>
        </div>
        <div className={`cart-form-row ${isDeliveryOpen ? 'cart-form-row--open' : ''}`} onClick={handleDeliveryOpen}>
          <p className="cart-form-row-placeholder">
            {formik.values.deliveryMethod ? DELIVERY_OPTIONS[formik.values.deliveryMethod] : 'Доставка'}
          </p>
          <div className={`cart-form-input ${formik.errors.deliveryMethod ? 'cart-form-input--error' : ''}`} />
          <ArrowSVG />
          <div className={`cart-form-row-select ${isDeliveryOpen ? 'cart-form-row-select--open' : ''}`}>
            {Object.keys(DELIVERY_OPTIONS).map(key => (
              <p
                key={key}
                className="cart-form-row-select-value"
                onClick={() => {
                  formik.setFieldValue('deliveryMethod', key);
                }}
              >
                {DELIVERY_OPTIONS[key]}
              </p>
            ))}
          </div>
        </div>
        {formik.values.deliveryMethod === 'ukrPoshta' && (
          <div className="cart-form-row">
            <input
              placeholder="Отделение"
              onChange={formik.handleChange}
              value={formik.values.ukrPoshtaDepartment}
              name="ukrPoshtaDepartment"
              className={`cart-form-input ${formik.errors.ukrPoshtaDepartment ? 'cart-form-input--error' : ''}`}
            />
          </div>
        )}
        {formik.values.deliveryMethod === 'сourier' && (
          <>
            <div className="cart-form-row">
              <div className="cart-form-row">
                <input
                  placeholder="Адрес"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  name="address"
                  className={`cart-form-input ${formik.errors.address ? 'cart-form-input--error' : ''}`}
                />
              </div>
            </div>
            <div className="cart-form-row">
              <div className="cart-form-row">
                <input
                  placeholder="Квартира"
                  onChange={formik.handleChange}
                  value={formik.values.flat}
                  name="address"
                  className={`cart-form-input ${formik.errors.flat ? 'cart-form-input--error' : ''}`}
                />
              </div>
            </div>
          </>
        )}
        {formik.values.deliveryMethod === 'pickup' && (
          <div className={`cart-form-row ${isOfficesOpen ? 'cart-form-row--open' : ''}`} onClick={handleOfficesOpen}>
            <p className="cart-form-row-placeholder">{formik.values.officeAddress}</p>
            <div className={`cart-form-input ${formik.errors.payMethod ? 'cart-form-input--error' : ''}`} />
            <ArrowSVG />
            <div className={`cart-form-row-select ${isOfficesOpen ? 'cart-form-row-select--open' : ''}`}>
              {offices.map(({ address: { value } }) => (
                <p className="cart-form-row-select-value" onClick={() => formik.setFieldValue('officeAddress', value)}>
                  {value}
                </p>
              ))}
            </div>
          </div>
        )}
      </form>
      {products?.length > 0 && <CartProductsList products={products} setProducts={setProducts} />}
    </div>
  );
};

export default CartForm;
