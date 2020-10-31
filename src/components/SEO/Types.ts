export interface ISeoProps {
  description: string;
  lang: 'ru' | 'ua';
  path: string;
  title: string;
}

export interface ISiteQueryProps {
  site: {
    siteMetadata: {
      author: {
        name: string;
      };
      siteUrl: string;
    };
  };
}
