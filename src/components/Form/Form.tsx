/* eslint-disable consistent-return */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import Button from '../Button/Button';
import ThanksModal from '../ThanksModal/ThanksModal';

import Person from '../../assets/icons/person.svg';
import Phone from '../../assets/icons/phone.svg';
import Mail from '../../assets/icons/mail.svg';
import Case from '../../assets/icons/case.svg';
import ExclamationMark from '../../assets/icons/exclMark.svg';

import { IFormProps } from './Types';

import { sendMessage } from '../../utils/sendMessage';

import { TRANSLATE } from '../../constants/languages';
import { OFFICES_BOT_ID } from '../../constants/realmsOffices';

import context from '../../context/context';

import './Form.scss';

const Form: React.FC<IFormProps> = ({
  title = undefined,
  subTitle = undefined,
  positionField = false,
  positionFieldValue = undefined,
  type = '',
  modal = false,
  dataLayerEvent,
}): JSX.Element => {
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [tel, setTel] = useState('');
  const [validName, setValidName] = useState(-1);
  const [validPhone, setValidPhone] = useState(-1);
  const [validMail, setValidMail] = useState(-1);
  const [validForm, setValidForm] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(true);

  const nameRef = useRef(null);
  const mailRef = useRef(null);

  const checkName = () => setValidName(nameRef.current.value.match(/^[A-zА-я]{2,}$/) ? 1 : 0);
  const checkPhone = () => setValidPhone(tel.length === 13 ? 1 : 0);
  const checkMail = () =>
    setValidMail(() => {
      if (modal || mailRef.current.value.match(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/)) return 1;
      return 0;
    });

  useEffect(() => {
    if (validName === 1 && validPhone && validMail && checkBoxChecked) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [validName, validPhone, validMail, checkBoxChecked]);

  const checkBoxRef = useRef(null);
  const checkBoxClick = () => checkBoxRef.current.click();

  const { language, office } = useContext(context);

  const handleShowModal = (success: boolean = false) => {
    setModalOpen(!openModal);
    setSuccess(success);
    document.body.classList.toggle('fixed');
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (validForm) {
        const baseForm = {
          Заявка: positionFieldValue ? 'Отзыв на вакансию' : 'Обратная связь',
          Имя: nameRef.current.value,
          Телефон: tel,
        };
        const realm = OFFICES_BOT_ID[office.id.slice(0, -3)];
        if (dataLayerEvent && typeof window !== 'undefined') {
          (window as any).dataLayer.push({ event: dataLayerEvent });
        }
        if (mailRef.current) {
          if (positionFieldValue) {
            return sendMessage({ ...baseForm, Почта: mailRef.current.value, Вакансия: positionFieldValue }, realm, handleShowModal);
          }

          return sendMessage({ ...baseForm, Почта: mailRef.current.value }, realm, handleShowModal);
        }
        return sendMessage(baseForm, realm, handleShowModal);
      }
    },
    [validForm, nameRef, mailRef, office, positionFieldValue, tel]
  );

  // eslint-disable-next-line no-nested-ternary
  const buttonType = type === 'yellow-form' ? 'yellow-form' : type === 'modal-window' ? 'modal-window' : 'primary';

  return (
    <>
      <form className={buttonType} onSubmit={handleSubmit}>
        <div className="form-info">
          {title ? <h3>{title}</h3> : <></>}
          {subTitle ? <p>{subTitle}</p> : <></>}
        </div>
        <div className="input-container">
          <Person />
          <input
            ref={nameRef}
            type="name"
            name="name"
            placeholder={TRANSLATE[language as 'ru' | 'ua'].formPlaceholderName}
            onBlur={checkName}
          />
          <div className="error" style={{ display: validName === 0 ? 'block' : 'none' }}>
            <ExclamationMark />
          </div>
        </div>
        <div className="input-container">
          <Phone />
          <PhoneInput
            value={tel}
            placeholder={TRANSLATE[language as 'ru' | 'ua'].formPlaceholderPhone}
            onFocus={() => {
              if (tel === '') {
                setTel('+380');
              }
            }}
            onBlur={() => {
              if (tel.length <= 4) {
                setTel('');
              }
              checkPhone();
            }}
            onChange={phone => {
              setTel(`+${phone}`);
            }}
          />
          <div className="error" style={{ display: validPhone === 0 ? 'block' : 'none' }}>
            <ExclamationMark />
          </div>
        </div>
        {modal ? (
          <></>
        ) : (
          <div className="input-container">
            <Mail />
            <input
              ref={mailRef}
              type="email"
              name="email"
              placeholder={TRANSLATE[language as 'ru' | 'ua'].formPlaceholderEmail}
              onBlur={checkMail}
            />
            <div className="error" style={{ display: validMail === 0 ? 'block' : 'none' }}>
              <ExclamationMark />
            </div>
          </div>
        )}
        {positionField ? (
          <div className="input-container">
            <Case />
            <input
              type="position"
              placeholder={TRANSLATE[language as 'ru' | 'ua'].formPlaceholderPosition}
              defaultValue={positionFieldValue}
            />
          </div>
        ) : (
          <></>
        )}
        <Button
          click={undefined}
          height={50}
          htmlType="submit"
          text={TRANSLATE[language as 'ru' | 'ua'].sendRequest}
          type={buttonType}
          width="100%"
        />
        <div onClick={checkBoxClick} className="agreement-container">
          <input ref={checkBoxRef} type="checkbox" checked={checkBoxChecked} onChange={() => setCheckBoxChecked(!checkBoxChecked)} />
          <span className="checkmark" />
          <p>{TRANSLATE[language as 'ru' | 'ua'].formAgreement}</p>
        </div>
      </form>
      <ThanksModal isSuccess={isSuccess} showModal={openModal} handleShowModal={handleShowModal} />
    </>
  );
};

export default Form;
