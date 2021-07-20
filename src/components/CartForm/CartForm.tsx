import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import './CartForm.scss';
import Fuse from 'fuse.js';
import { navigate } from 'gatsby';
import ArrowSVG from '../../assets/icons/arrow.svg';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import { OFFICES_BOT_ID } from '../../constants/realmsOffices';
import CartProductsList from './CartProductsList';
import EmptyCart from './EmptyCart';

import npWarehouses from '../../../npWarehouses.json';
import Modal from '../Modal/Modal';
import CartModal from './CartModal';

const phoneRegex = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const formSchema = Yup.object().shape({
  name: Yup.string().min(2),
  surname: Yup.string().min(2),
  email: Yup.string().matches(emailRegex),
  country: Yup.string().min(2),
  city: Yup.string().min(2),
  phone: Yup.string()
    .matches(phoneRegex)
    .not(['0000000000']),
  ukrPoshtaDepartment: Yup.number().when('deliveryMethod', {
    is: 'ukrPoshta',
    then: Yup.number().required(),
  }),
  novaPoshtaDepartment: Yup.string().when('deliveryMethod', {
    is: 'novaPoshta',
    then: Yup.string().required(),
  }),
  address: Yup.string().when('deliveryMethod', {
    is: 'сourier',
    then: Yup.string().required(),
  }),
  deliveryMethod: Yup.string(),
  officeAddress: Yup.string().required(),
  flat: Yup.number().when('deliveryMethod', {
    is: 'сourier',
    then: Yup.number().required(),
  }),
});

const CartForm: React.FC = () => {
  const {
    office: {
      id: officeId,
      address: { value: office },
    },
    offices,
    products,
    setProducts,
  } = useContext(context);

  const [isPaymethodOpen, setPayMethodOpen] = useState<boolean>(false);
  const [isDeliveryOpen, setDeliveryOpen] = useState<boolean>(false);
  const [isOfficesOpen, setOfficesOpen] = useState<boolean>(false);
  const [isNovaPoshtaOpen, setNovaPoshtaOpen] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<'hidden' | 'success' | 'failure'>('hidden');

  const handleNovaPoshtaOpen = () => {
    setNovaPoshtaOpen(prev => !prev);
  };

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
      novaPoshtaDepartment: '',
      address: '',
      officeAddress: office,
      flat: '',
    },
    onSubmit: async values => {
      const realm = OFFICES_BOT_ID[officeId.slice(0, -3)];

      const formattedProducts = products.map(({ code, name, currentMeasure, amount, ...data }) => {
        const measurePrice = new Map();
        measurePrice.set(data.measurment, data.price.replace(',', '.'));
        measurePrice.set(data.measurment2, data.price2.replace(',', '.'));
        measurePrice.set(data.measurment3, data.price3.replace(',', '.'));
        measurePrice.set(data.measurment4, data.price4.replace(',', '.'));
        const currentPrice = measurePrice.get(currentMeasure);
        return {
          name,
          code,
          measure: currentMeasure,
          amount,
          price: currentPrice,
          total: currentPrice * amount,
        };
      });
      const body = {
        userData: {
          ...values,
        },
        products: formattedProducts,
        total: formattedProducts.reduce((acc, current) => acc + current.total, 0),
      };
      const response = await fetch(`/sendOrder?realm=${realm}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(body),
      });
      console.log(response.ok);

      setModalStatus(response.status === 200 ? 'success' : 'failure');
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    formik.setFieldValue('officeAddress', office);
  }, [office]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
  }, []);

  const options = {
    includeScore: false,
    keys: ['settlement'],
  };

  const handleModalClose = () => {
    if (modalStatus === 'success') {
      localStorage.removeItem('products');
      setProducts([]);
      navigate('/');
    }
    setModalStatus('hidden');
  };

  const handleSearchWarehouses = () => {
    const fuse = new Fuse(npWarehouses, options);

    return (
      <div className={`cart-form-row ${isNovaPoshtaOpen ? 'cart-form-row--open' : ''}`} onClick={handleNovaPoshtaOpen}>
        <p className="cart-form-row-placeholder">
          {formik.values.novaPoshtaDepartment ? formik.values.novaPoshtaDepartment : CART[language as 'ru' | 'ua'].poshtaPlaceholder}
        </p>
        <div className={`cart-form-input ${formik.errors.deliveryMethod ? 'cart-form-input--error' : ''}`} />
        <ArrowSVG />
        <div className={`cart-form-row-select ${isNovaPoshtaOpen ? 'cart-form-row-select--open' : ''}`}>
          {isNovaPoshtaOpen &&
            fuse.search(formik.values.city || '').map(({ address }) => (
              <p
                key={address}
                className="cart-form-row-select-value"
                onClick={() => {
                  formik.setFieldValue('novaPoshtaDepartment', address);
                }}
              >
                {address}
              </p>
            ))}
        </div>
      </div>
    );
  };

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
          <InputMask
            className={`cart-form-input ${formik.errors.phone ? 'cart-form-input--error' : ''}`}
            name="phone"
            alwaysShowMask
            mask="+38(099)-999-99-99"
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
          <p className="cart-form-row-placeholder">
            {formik.values.payMethod ? formik.values.payMethod : CART[language as 'ru' | 'ua'].form.payMethodPlaceholder}
          </p>
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
            {formik.values.deliveryMethod
              ? CART[language as 'ua' | 'ru'].deliveryOptions[
                  formik.values.deliveryMethod as 'novaPoshta' | 'ukrPoshta' | 'pickup' | 'сourier'
                ]
              : 'Доставка'}
          </p>
          <div className={`cart-form-input ${formik.errors.deliveryMethod ? 'cart-form-input--error' : ''}`} />
          <ArrowSVG />
          <div className={`cart-form-row-select ${isDeliveryOpen ? 'cart-form-row-select--open' : ''}`}>
            {Object.keys(CART[language as 'ru' | 'ua'].deliveryOptions).map(key => (
              <p
                key={key}
                className="cart-form-row-select-value"
                onClick={() => {
                  formik.setFieldValue('deliveryMethod', key);
                }}
              >
                {CART[language as 'ru' | 'ua'].deliveryOptions[key as 'novaPoshta' | 'ukrPoshta' | 'pickup' | 'сourier']}
              </p>
            ))}
          </div>
        </div>
        {formik.values.deliveryMethod === 'ukrPoshta' && (
          <div className="cart-form-row">
            <input
              placeholder={CART[language as 'ru' | 'ua'].poshtaPlaceholder}
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
                  placeholder={CART[language as 'ru' | 'ua'].address}
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
                  name="flat"
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
        {formik.values.deliveryMethod === 'novaPoshta' &&
          (!formik.values.city.length ? (
            <div className="cart-form-row">
              <input
                placeholder={CART[language as 'ru' | 'ua'].poshtaPlaceholder}
                onChange={formik.handleChange}
                value={formik.values.novaPoshtaDepartment}
                name="novaPoshtaDepartment"
                className={`cart-form-input ${formik.errors.ukrPoshtaDepartment ? 'cart-form-input--error' : ''}`}
              />
            </div>
          ) : (
            handleSearchWarehouses()
          ))}
      </form>
      {products?.length > 0 ? <CartProductsList callback={() => formik.handleSubmit()} /> : <EmptyCart />}
      {modalStatus !== 'hidden' && (
        <Modal close={handleModalClose}>
          <CartModal status={modalStatus} />
        </Modal>
      )}
    </div>
  );
};

export default CartForm;
