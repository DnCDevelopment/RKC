import React, { useState } from 'react';

import { IGeolocationModalProps } from './Types';

import './GeolocationModal.scss';

const GeolocationModal: React.FC<IGeolocationModalProps> = ({
  office: {
    city: { value: city },
  },
  offices,
  changeOffice,
  close,
}): JSX.Element => {
  const [isCityCorrect, setCityCorrect] = useState(true);
  const [isOfficeSelectOpen, setOfficeSelect] = useState(false);
  return (
    <div className="geolocation">
      {isCityCorrect ? (
        <>
          <h2>Вы находитесть в г.{city}?</h2>
          <div className="geolocation-buttons">
            <button className="button button-primary" type="button" onClick={close}>
              Да
            </button>
            <button className="button button-primary" type="button" onClick={() => setCityCorrect(false)}>
              Нет
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Выбирите город в котором вы находитесь</h2>
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
            Подтвердить
          </button>
        </>
      )}
    </div>
  );
};

export default GeolocationModal;
