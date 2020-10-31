import React, { Fragment, useContext, useState } from 'react';

import context from '../../context/context';

import Marker from '../../assets/icons/marker.svg';

import './Offices.scss';

const Offices: React.FC = (): JSX.Element => {
  const {
    office: {
      city: { value: currentCity },
    },
    offices,
    setOffice,
  } = useContext(context);

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div onClick={() => setOpen(!isOpen)} className="offices-container">
      <div className="current-office">
        <Marker />
        {currentCity}
      </div>
      <div className={`offices ${isOpen ? 'offices-open' : ''}`}>
        {offices.map(office => {
          const {
            city: { value: cityValue },
          } = office;
          return (
            <Fragment key={cityValue}>
              {currentCity !== cityValue && (
                <div
                  className="office"
                  onClick={() => {
                    setOffice(office);
                  }}
                >
                  {cityValue}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Offices;
