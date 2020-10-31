import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import { ISeoProps, ISiteQueryProps } from './Types';

const SITE_QUERY = graphql`
  {
    site {
      siteMetadata {
        author {
          name
        }
        siteUrl
      }
    }
  }
`;

const SEO: React.FC<ISeoProps> = ({ description, lang, path, title }): JSX.Element => {
  const {
    site: {
      siteMetadata: { author },
    },
  } = useStaticQuery<ISiteQueryProps>(SITE_QUERY);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:creator',
          content: author.name,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ]}
    >
      <link rel="canonical" href={path} />
    </Helmet>
  );
};

export default SEO;
