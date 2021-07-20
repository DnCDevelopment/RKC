import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import { ILayoutProps, IOffice, IOfficeQuery } from './Types';
import { IProductTypes } from './CartForm/Types';

import { LANGUAGES } from '../constants/languages';
import { REALMS_OFFICES, OFFICES_ID } from '../constants/realmsOffices';

import context from '../context/context';

import './styles/layout.scss';
import Modal from './Modal/Modal';
import GeolocationModal from './GeolocationModal/GeolocationModal';

const OFFICES_QUERY = graphql`
  {
    allCockpitOffices(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        id
        address {
          value
        }
        city {
          value
        }
        email {
          value
        }
        phone {
          value
        }
      }
    }
  }
`;

const Layout: React.FC<ILayoutProps> = ({ children, location: { pathname } }): JSX.Element => {
  const {
    allCockpitOffices: { nodes },
  }: IOfficeQuery = useStaticQuery(OFFICES_QUERY);

  const [language, setLanguage] = useState<string>('ru');

  const offices = nodes.filter(({ lang }) => lang === language);

  const [office, setOffice] = useState<IOffice>(offices[0]);
  const [products, setProducts] = useState<IProductTypes[]>([]);
  const [isGeolocationModalOpen, changeGeolocationModalOpen] = useState(false);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')) || []);
  }, []);

  const closeGeolocationModal = () => {
    changeGeolocationModalOpen(false);
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          coords: { latitude, longitude },
        } = position;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(res => res.json())
          .then(result => {
            if (Object.keys(REALMS_OFFICES).includes(result.principalSubdivision)) {
              setOffice(offices.find(val => val.id === `${OFFICES_ID[result.principalSubdivision]}_${language}`));
            }

            Object.keys(REALMS_OFFICES).forEach(realmOffice => {
              if (REALMS_OFFICES[realmOffice].includes(result.principalSubdivision)) {
                setOffice(offices.find(val => val.id === `${OFFICES_ID[realmOffice]}_${language}`));
              }
            });
            if (!localStorage.getItem('geolocationModalShown')) {
              changeGeolocationModalOpen(true);
              localStorage.setItem('geolocationModalShown', '1');
            }
          })
          .catch(err => console.error(err));
      });
    }
  }, []);

  useEffect(() => {
    const lang = pathname.split('/')[1];
    setLanguage(Object.keys(LANGUAGES).includes(lang) ? lang : 'ru');
  }, [pathname]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('office_id', office.id.slice(0, -3));
    }
  }, [office]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const officeId = localStorage.getItem('office_id');
      if (officeId !== null) {
        setOffice(offices.find(val => val.id === `${officeId}_${language}`));
      }
    } else {
      setOffice(offices[0]);
    }
  }, [language]);

  return (
    <context.Provider value={{ language, office, offices, pathname, setLanguage, setOffice, products, setProducts }}>
      <Header />
      <main>{children}</main>
      <Footer />
      {isGeolocationModalOpen && (
        <Modal close={closeGeolocationModal}>
          <GeolocationModal office={office} offices={offices} changeOffice={setOffice} close={closeGeolocationModal} />
        </Modal>
      )}
    </context.Provider>
  );
};
export default Layout;
