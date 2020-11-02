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

const SEO: React.FC<ISeoProps> = ({ breadcrumbs, description, lang, path, product, title }): JSX.Element => {
  const {
    allCockpitOffices: { nodes },
    site: {
      siteMetadata: { author, siteUrl },
    },
  } = useStaticQuery<ISiteQueryProps>(SITE_QUERY);

  const shemaContext = 'http://schema.org';
  const odessaOffice = nodes.find(({ lang: language }) => language === lang);
  const reviewCount = (Math.floor(Math.random() * 8) + 1) * (+new Date() % 10);

  const schemaOrgJSONLD: { [key: string]: any }[] = [
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

  if (product) {
    schemaOrgJSONLD.push({
      '@context': shemaContext,
      '@type': 'Product',
      name: title,
      image: product.seoImages,
      description,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.9,
        reviewCount: reviewCount || 14,
      },
      brand: {
        '@type': 'Brand',
        name: 'РКЦ',
      },
      offers: {
        '@type': 'Offer',
        url: product.url,
        priceCurrency: 'UAH',
        price: product.price.replace(' ', ''),
        priceValidUntil: new Date().toISOString().slice(0, 10),
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'РКЦ',
        },
      },
    });
  }

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
