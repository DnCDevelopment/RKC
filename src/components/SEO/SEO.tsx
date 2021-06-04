import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import favicon from '../../assets/images/gm-favicon.png';

import { ISeoProps, ISiteQueryProps } from './Types';

const SITE_QUERY = graphql`
  {
    allCockpitOffices(filter: { lang: { ne: "any" }, id: { regex: "/Cockpit__Offices__5fda9651a105c9188179dbe1_/" } }) {
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

const SEO: React.FC<ISeoProps> = ({ article, breadcrumbs, description, lang, path, product, title }): JSX.Element => {
  const {
    allCockpitOffices: { nodes },
    site: {
      siteMetadata: { author, siteUrl },
    },
  } = useStaticQuery<ISiteQueryProps>(SITE_QUERY);

  const seoDescription = description.replace(/<[^>]*>?/gm, '');

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
      // sameAs: ['https://www.facebook.com/globalmoney.ua', 'https://t.me/MyGM24', 'https://twitter.com/global24_ua'],
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
      description: seoDescription,
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

  if (article) {
    schemaOrgJSONLD.push({
      '@context': shemaContext,
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url,
      },
      headline: title,
      image: article.seoImages,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        '@type': 'Person',
        name: 'РКЦ',
      },
      publisher: {
        '@type': 'Organization',
        name: 'РКЦ',
        logo: {
          '@type': 'ImageObject',
          url: favicon,
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
          content: seoDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: seoDescription,
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
          content: seoDescription,
        },
      ]}
    >
      <link rel="canonical" href={path} />
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-368235489" />
      <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-368235489');
      `}</script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-WRCRVNLS9M" />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WRCRVNLS9M');
      `}
      </script>
      <script>
        {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2436918,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </script>
      <script>
        {`
        window.smartlook||(function(d) {
          var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
          })(document);
          smartlook('init', '9a0b24afbc93737b5eac99fcb7bec95446370661');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
