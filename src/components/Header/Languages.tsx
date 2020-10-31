import React, { useCallback, useContext } from 'react';
import { navigate } from 'gatsby';

import context from '../../context/context';

import { LANGUAGES } from '../../constants/languages';

import './Languages.scss';

const Languages: React.FC = (): JSX.Element => {
  const { language, pathname } = useContext(context);

  const languagesItems = Object.keys(LANGUAGES);

  const languageIndex = languagesItems.findIndex(lang => language === lang);

  const handleLanguageChange = useCallback(() => {
    const lang = languagesItems.length - 1 === languageIndex ? languagesItems[0] : languagesItems[languageIndex + 1];
    navigate(pathname.replace(LANGUAGES[language as 'ru' | 'ua'], LANGUAGES[lang as 'ru' | 'ua']));
  }, [pathname, language, languageIndex]);

  return (
    <div className="language" onClick={handleLanguageChange}>
      {language}
    </div>
  );
};

export default Languages;
