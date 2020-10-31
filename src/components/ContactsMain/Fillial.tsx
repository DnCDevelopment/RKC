import React, { useContext } from 'react';
import context from '../../context/context';
import PhoneSVG from '../../assets/icons/phone.svg';
import MailSVG from '../../assets/icons/mail.svg';
import MarkerSVG from '../../assets/icons/marker.svg';
import { TRANSLATE } from '../../constants/languages';

const Fillial: React.FC = (): JSX.Element => {
  const {
    office: {
      address: { value: displayAddress },
      city: { value: displayCity },
      phone: { value: displayPhone },
      email: { value: displayEmail },
    },
    language,
  } = useContext(context);
  return (
    <div className="fillial">
      <h3 className="fillial-title">
        {TRANSLATE[language as 'ru' | 'ua'].fillialInCity} {displayCity}
      </h3>
      <ul className="fillial-list">
        <li className="fillial-list-item">
          <a href={`tel:${displayPhone}`} className="fillial-list-item-link">
            <PhoneSVG />
            {displayPhone}
          </a>
        </li>
        <li className="fillial-list-item">
          <a href={`mailto:${displayEmail}`} className="fillial-list-item-link">
            <MailSVG />
            {displayEmail}
          </a>
        </li>
        <li className="fillial-list-item">
          <MarkerSVG />
          {displayAddress}
        </li>
      </ul>
    </div>
  );
};

export default Fillial;
