import React, { useReducer, FormEventHandler, useContext } from 'react';
import PersonSVG from '../../assets/icons/person.svg';
import PhoneSVG from '../../assets/icons/phone.svg';
import MailSVG from '../../assets/icons/mail.svg';
import CheckBoxSVG from '../../assets/icons/checkbox.svg';

import './ContactStepsForm.scss';
import { IInitialState } from './Types';

import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';
import { deleteKeyCodes, skipKeyCodes } from '../../constants/phoneMaskKeyCodes';
import { IAction } from '../Types';

const initialState: IInitialState = {
  name: {
    value: '',
    isTouched: false,
    regexp: /^[A-Za-zа-яА-Я ]{2,255}$/,
    valid: false,
  },
  phone: {
    value: '',
    isTouched: false,
    regexp: /^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    valid: false,
  },
  email: {
    value: '',
    isTouched: false,
    regexp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    valid: false,
  },
  agree: {
    value: false,
  },
};

const formReducer = (state: IInitialState, { type = 'change', name, value, checked }: IAction): IInitialState => {
  switch (type) {
    case 'blur': {
      const { value: defaultValue = '', regexp } = state[name];
      const valid = regexp.test(defaultValue);
      return { ...state, [name]: { isTouched: true, value: defaultValue, valid, regexp } };
    }
    default: {
      if (name === 'agree') return { ...state, [name]: { value: checked } };
      return { ...state, [name]: { ...state[name], value, isTouched: false } };
    }
  }
};

const ContactStepsForm: React.FC = (): JSX.Element => {
  const [{ name, email, phone, agree }, dispatch] = useReducer(formReducer, initialState);
  const { language } = useContext(context);

  const sendRequest: FormEventHandler = e => {
    e.preventDefault();
    if (!(email.valid && name.valid && phone.valid && agree.value)) {
      const url = '';
      const body = {
        name: name.value,
        phone: phone.value,
        email: email.value,
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
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
    <div className="contact-steps-form-wrapper">
      <div className="contact-steps-form-inner">
        <h3 className="contact-steps-form-title">{TRANSLATE[language as 'ua' | 'ru'].contactFormTitle}</h3>
        <p className="contact-steps-form-text">{TRANSLATE[language as 'ua' | 'ru'].contactFormText}</p>
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
          <label htmlFor="email" className="contact-steps-form-label">
            <input
              type="email"
              name="email"
              className={`contact-steps-form-label-input ${email.isTouched && !email.valid ? 'unvalid' : ''}`}
              placeholder="Введите ваш e-mail"
              value={email.value}
              onBlur={({ target }) => {
                dispatch({ type: 'blur', name: target.name });
              }}
              onChange={({ target }) => dispatch(target)}
            />
            <MailSVG />
          </label>
          <input
            type="submit"
            className="contact-steps-form-submit"
            value={TRANSLATE[language as 'ru' | 'ua'].sendRequest}
            disabled={!(email.valid && name.valid && phone.valid && agree.value)}
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
      </div>
    </div>
  );
};

export default ContactStepsForm;
