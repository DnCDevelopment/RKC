/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config();

module.exports = {
  siteMetadata: {
    author: {
      name: 'РКЦ',
    },
    siteUrl: process.env.VIRTUAL_HOST || 'https://rck.ua/',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#323232',
        theme_color: '#323232',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png',
      },
    },

    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              allSitePage(filter: {path: {ne: "/404.html"}}) {
                nodes {
                  path
                }
              }
              site {
                siteMetadata {
                  siteUrl
                }
              }
            }
          `,
        serialize: ({
          site: {
            siteMetadata: { siteUrl },
          },
          allSitePage,
        }) => {
          const langRE = /^(\/ua)?\//;
          return allSitePage.nodes.map(({ path }) => {
            const res = {
              url: siteUrl + path,
              changefreq: 'daily',
              priority: 0.7,
            };
            if (langRE.test(path)) {
              res.links = [
                {
                  lang: 'ru',
                  url: siteUrl + path.replace(langRE, '/'),
                },
                {
                  lang: 'ua',
                  url: siteUrl + path.replace(langRE, '/ua/'),
                },
                {
                  lang: 'x-default',
                  url: siteUrl + path.replace(langRE, '/'),
                },
              ];
            }
            return res;
          });
        },
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout.tsx'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: '@fika/gatsby-source-cockpit',
      options: {
        token: process.env.COCKPIT_TOKEN,
        baseUrl: process.env.COCKPIT_URL,
        locales: ['ru', 'ua'],
        collections: [],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public|)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Montserrat:300,400,500,600,700,800,900'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\/assets\/.*.svg/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.VIRTUAL_HOST || 'https://rkc.ua',
        sitemap: `${process.env.VIRTUAL_HOST || 'https://rkc.ua'}/sitemap.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-MWDQPCJ',
        includeInDevelopment: false,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
