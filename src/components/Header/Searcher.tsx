import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Fuse from 'fuse.js';
import Img from 'gatsby-image';

import SearchButton from '../../assets/icons/search.svg';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './Searcher.scss';

const ALL_GOODS_QUERY = graphql`
  {
    allCockpitProduct(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        name {
          value
        }
        price {
          value
        }
        link {
          value
        }
      }
    }
  }
`;

const Searcher: React.FC = (): JSX.Element => {
  const {
    allCockpitProduct: { nodes },
  } = useStaticQuery(ALL_GOODS_QUERY);

  const [searchValue, setSearchValue] = useState('');
  const [foundProducts, setFoundProducts] = useState([]);
  const [openInput, setOpenInput] = useState(false);

  const inputRef = useRef(null);

  const { language } = useContext(context);

  const options = {
    includeScore: true,
    keys: ['name.value'],
  };
  const fuse = new Fuse(nodes, options);

  useEffect(() => setFoundProducts(fuse.search(searchValue)), [searchValue]);

  const handleClickOutside = useCallback(e => {
    if (inputRef && !inputRef.current.contains(e.target)) {
      setOpenInput(false);
      setSearchValue('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`searcher-container ${openInput ? 'open' : ''}`}>
      <div ref={inputRef} className="input-field">
        <input
          type="text"
          name="search"
          className={`search-input ${openInput ? 'open' : ''}`}
          placeholder={TRANSLATE[language as 'ru' | 'ua'].searchPlaceholder}
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />
        <div
          className="search-button"
          onClick={() => {
            setOpenInput(true);
            inputRef.current.getElementsByTagName('input')[0].focus();
          }}
        >
          <SearchButton />
        </div>
      </div>
      <div className="drop-list">
        {foundProducts.slice(0, 5).map(({ item: { name, image, price, link } }, idx) => (
          <Link key={`item${idx}`} to={link.value} className="drop-list-item">
            <Img className="drop-list-item-image" fluid={image.value.childImageSharp.fluid} />
            <p className="drop-list-item-name">{name.value}</p>
            <p className="drop-list-item-price">{`${price.value} грн`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searcher;
