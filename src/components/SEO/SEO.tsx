import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import favicon from '../../assets/images/gm-favicon.png';

import { ISeoProps, ISiteQueryProps } from './Types';

const SITE_QUERY = graphql`
  {
    allCockpitOffices(filter: { lang: { ne: "any" }, id: { regex: "/Cockpit__Offices__5f554bf58b03fa1fb446a651_/" } }) {
      nodes {
        lang
        address {
          value
        }
        phone {
          value
        }
      }
    }
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

const SEO: React.FC<ISeoProps> = ({ breadcrumbs, description, lang, path, title }): JSX.Element => {
  const {
    allCockpitOffices: { nodes },
    site: {
      siteMetadata: { author, siteUrl },
    },
  } = useStaticQuery<ISiteQueryProps>(SITE_QUERY);

  const shemaContext = 'http://schema.org';
  const odessaOffice = nodes.find(({ lang: language }) => language === lang);

  const schemaOrgJSONLD = [
    {
      '@context': shemaContext,
      '@type': 'Organization',
      address: odessaOffice.address.value,
      url: siteUrl,
      name: 'РКЦ',
      sameAs: ['https://www.facebook.com/globalmoney.ua', 'https://t.me/MyGM24', 'https://twitter.com/global24_ua'],
      telephone: odessaOffice.phone.value,
    },
    {
      '@context': shemaContext,
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(({ title: name, link }, idx) => ({
        '@type': 'ListItem',
        position: idx,
        item: {
          '@id': link,
          url: link,
          image: favicon,
          name,
        },
      })),
    },
  ];

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
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
    </Helmet>
  );
};

export default SEO;
