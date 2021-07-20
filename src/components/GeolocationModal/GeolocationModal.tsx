import React, { useState, useContext } from 'react';

import { IGeolocationModalProps } from './Types';

import './GeolocationModal.scss';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';

const GeolocationModal: React.FC<IGeolocationModalProps> = ({
  office: {
    city: { value: city },
  },
  offices,
  changeOffice,
  close,
}): JSX.Element => {
  const { language } = useContext(context);
  const [isCityCorrect, setCityCorrect] = useState(true);
  const [isOfficeSelectOpen, setOfficeSelect] = useState(false);

  const { yes, no, chooseCity, geolocationQuestion, confirm } = TRANSLATE[language as 'ru' | 'ua'];

  return (
    <div className="geolocation">
      {isCityCorrect ? (
        <>
          <h2>
            {geolocationQuestion}
            {city}?
          </h2>
          <div className="geolocation-buttons">
            <button className="button button-primary" type="button" onClick={close}>
              {yes}
            </button>
            <button className="button button-primary" type="button" onClick={() => setCityCorrect(false)}>
              {no}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{chooseCity}</h2>
          <div className="geolocation-select" tabIndex={-1} onBlur={() => setOfficeSelect(false)}>
            <div className="geolocation-select-input" onClick={() => setOfficeSelect(true)}>
              {city}
            </div>
            {isOfficeSelectOpen && (
              <div className="geolocation-select-options">
                {offices.map(office => (
                  <div
                    key={office.id}
                    onClick={() => {
                      changeOffice(office);
                      setOfficeSelect(false);
                    }}
                  >
                    {office.city.value}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="geolocation-button button button-primary" type="button" onClick={close}>
            {confirm}
          </button>
        </>
      )}
    </div>
  );
};

export default GeolocationModal;
