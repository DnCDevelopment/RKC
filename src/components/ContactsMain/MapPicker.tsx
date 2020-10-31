import React, { memo, useContext, useEffect, useState } from 'react';
import context from '../../context/context';
import MapSVG from '../../assets/images/map.svg';
import './MapPicker.scss';

const MapPicker: React.FC = memo(
  (): JSX.Element => {
    const [currentRegion, changeRegionState] = useState<string>('');
    const { offices, language, setOffice, office: currentOffice } = useContext(context);
    useEffect(() => {
      const regions = document.getElementById('svg-map').querySelectorAll('path[id]');
      const changeRegion: EventListener = ({ target }) => {
        const id = target.getAttribute('id');
        const filtredOffices = offices.filter(office => office.id === `${id}_${language}`);
        regions.forEach(el => {
          el.classList.remove('active');
        });
        if (filtredOffices.length) {
          changeRegionState('');
          setOffice(filtredOffices[0]);
          const city = target.getAttribute('data-city');
          if (city === 'kyiv') {
            const kyivObl = Array.prototype.find.call(regions, el => el.getAttribute('data-city') === 'kyiv-obl');
            kyivObl.classList.add('active');
          }
        } else {
          const refId = target.getAttribute('data-ref');
          const closestRegion = Array.prototype.find.call(regions, el => el.getAttribute('id') === refId);
          const closestOffice = offices.find(office => office.id === `${refId}_${language}`);
          closestRegion.classList.add('active');

          changeRegionState(target.getAttribute('id'));
          setOffice(closestOffice);
        }
        target.classList.add('active');
      };
      regions.forEach(el => {
        el.addEventListener('click', changeRegion);
      });
      return () => {
        regions.forEach(el => {
          el.removeEventListener('click', changeRegion);
        });
      };
    }, [offices]);

    useEffect(() => {
      const currentId = currentOffice.id.split(`_${language}`)[0];
      const regions = document.getElementById('svg-map').querySelectorAll('path[id]');
      regions.forEach(region => {
        const currentRegionId = region.getAttribute('id');
        if (currentRegionId === currentId) {
          region.classList.add('active');
          if (region.getAttribute('data-city') === 'kyiv') {
            const kyivObl = Array.prototype.find.call(regions, el => el.getAttribute('data-city') === 'kyiv-obl');
            kyivObl.classList.add('active');
          }
          if (currentRegion !== '') {
            const curReg = Array.prototype.find.call(regions, reg => reg.getAttribute('id') === currentRegion);
            if (curReg.getAttribute('data-ref') === currentRegionId) curReg.classList.add('active');
            else changeRegionState('');
          }
        } else {
          region.classList.remove('active');
        }
      });
    }, [currentOffice]);

    return (
      <div className="contacts-map">
        <MapSVG />
      </div>
    );
  }
);

export default MapPicker;
