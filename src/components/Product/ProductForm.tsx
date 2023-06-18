import React, { useReducer, FormEventHandler, useContext } from 'react';
import { navigate } from 'gatsby';

import { IAction } from '../Types';
import { IInitialProductFormState, IProductFormProps } from './Types';

import { deleteKeyCodes, skipKeyCodes } from '../../constants/phoneMaskKeyCodes';

import { sendMessage } from '../../utils/sendMessage';

import { TRANSLATE } from '../../constants/languages';
import { OFFICES_BOT_ID } from '../../constants/realmsOffices';

import context from '../../context/context';

import PersonSVG from '../../assets/icons/person.svg';
import PhoneSVG from '../../assets/icons/phone.svg';
import CheckBoxSVG from '../../assets/icons/checkbox.svg';

const initialState: IInitialProductFormState = {
  name: {
    value: '',
    isTouched: false,
    regexp: /^(?=.*[a-zA-ZА-Яа-яіІїЇЄє'ʼ\s-])[a-zA-ZА-Яа-яіІїЇЄє'ʼ\s-]{2,150}$/,
    valid: false,
  },
  phone: {
    value: '',
    isTouched: false,
    regexp: /^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    valid: false,
  },
  agree: {
    value: false,
  },
};

const formReducer = (state: IInitialProductFormState, { type = 'change', name, value, checked }: IAction): IInitialProductFormState => {
  switch (type) {
    case 'blur': {
      const { value: defaultValue = '', regexp } = state[name];
      const valid = regexp.test(`${defaultValue}`);
      return { ...state, [name]: { isTouched: true, value: defaultValue, valid, regexp } };
    }
    default: {
      if (name === 'agree') return { ...state, [name]: { value: checked } };
      return { ...state, [name]: { ...state[name as 'name' | 'phone'], value, isTouched: false } };
    }
  }
};

const ProductForm: React.FC<IProductFormProps> = ({ title, amount, measurment, price }): JSX.Element => {
  const [{ name, phone, agree }, dispatch] = useReducer(formReducer, initialState);
  const { language, office } = useContext(context);

  const handleShowModal = (success: boolean = false) => {
    navigate(success ? '/success-order' : '/error');
  };

  const sendRequest: FormEventHandler = e => {
    e.preventDefault();
    if (name.valid && phone.valid && agree.value) {
      if (typeof window !== 'undefined') {
        (window as any).dataLayer.push({ event: 'buy1click' });
      }
      const realm = OFFICES_BOT_ID[office.id.slice(0, -3)];
      const body = {
        Заявка: 'Заказ',
        Название: title,
        Имя: name.value,
        Телефон: phone.value,
        Количество: `${amount} ${measurment}`,
        Цена: `${price.toFixed(2)} грн`,
        Сумма: `${(price * amount).toFixed(2)} грн`,
      };
      sendMessage(body, realm, handleShowModal);
    }
  };

  const handlePhoneMaskedInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!skipKeyCodes.includes(e.keyCode)) {
      e.preventDefault();
      const mask = '+38(111)-111-11-11';
      if (/[0-9+ \-()]/.test(e.key)) {
        let currentString = (e.target as HTMLInputElement).value;
        const currentLength = currentString.length;
        if (/[0-9]/.test(e.key)) {
          if (mask[currentLength] === '1') {
            dispatch({ name: 'phone', value: currentString + e.key });
          } else {
            for (let i = currentLength; i < mask.length; i += 1) {
              if (mask[i] === '1') {
                dispatch({ name: 'phone', value: currentString + e.key });
                break;
              }
              currentString += mask[i];
            }
          }
        }
      }
    } else if (deleteKeyCodes.includes(e.keyCode)) {
      dispatch({ name: 'phone', value: phone.value.slice(0, -1) });
    }
  };

  return (
    <>
      <form className="contact-steps-form">
        <label htmlFor="name" className="contact-steps-form-label">
          <input
            type="text"
            name="name"
            className={`contact-steps-form-label-input ${name.isTouched && !name.valid ? 'unvalid' : ''}`}
            placeholder={TRANSLATE[language as 'ua' | 'ru'].formPlaceholderName}
            value={name.value}
            onBlur={({ target }) => {
              dispatch({ type: 'blur', name: target.name });
            }}
            onChange={({ target }) => dispatch(target)}
          />
          <PersonSVG />
        </label>
        <label htmlFor="phone" className="contact-steps-form-label">
          <input
            type="phone"
            name="phone"
            className={`contact-steps-form-label-input ${phone.isTouched && !phone.valid ? 'unvalid' : ''}`}
            placeholder={TRANSLATE[language as 'ua' | 'ru'].formPlaceholderPhone}
            value={phone.value}
            onKeyDown={handlePhoneMaskedInput}
            onBlur={({ target }) => {
              dispatch({ type: 'blur', name: target.name });
            }}
            onChange={({ target }) => dispatch(target)}
          />
          <PhoneSVG />
        </label>
        <input
          type="submit"
          className="contact-steps-form-submit"
          value={TRANSLATE[language as 'ru' | 'ua'].sendRequest}
          disabled={!(name.valid && phone.valid && agree.value)}
          onClick={sendRequest}
        />
        <label htmlFor="agree" className="contact-steps-form-checkbox">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            className="contact-steps-form-checkbox-input"
            checked={agree.value}
            onBlur={({ target }) => {
              dispatch({ type: 'blur', name: target.name });
            }}
            onChange={({ target }) => dispatch(target)}
          />

          <p className="contact-steps-form-checkbox-text">
            <CheckBoxSVG /> {TRANSLATE[language as 'ua' | 'ru'].contactFormAgreement}
          </p>
        </label>
      </form>
    </>
  );
};

export default ProductForm;
