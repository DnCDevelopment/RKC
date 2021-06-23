import React from 'react';
import { graphql } from 'gatsby';

import Subheader from '../components/Subheader/Subheader';
import ProductBar from '../components/Product/ProductBar';
import ProductInfo from '../components/Product/ProductInfo';
import ProductCommons from '../components/Product/ProductCommons';
import ProductGallery from '../components/Product/ProductGallery';
import ProductScope from '../components/Product/ProductScope';
import ProductPairs from '../components/Product/ProductPairs';
import ProductSpecifications from '../components/Product/ProductSpecifications';
import Seo from '../components/SEO/SEO';

import { IProductProps } from './Types';

import { LANGUAGES, TRANSLATE } from '../constants/languages';

const Product: React.FC<IProductProps> = ({ data: { cockpitProduct } }): JSX.Element => {
  const {
    name: { value: name },
    lang,
    link: { value: productLink },
    description: { value: description },
    price: { value: price },
    price2,
    price3,
    price4,
    measurment,
    measurment2,
    measurment3,
    measurment4,
    isAvailable,
    images: { value: images },
    galleryTitle,
    galleryText,
    galleryBackground,
    galleryImages,
    productScopeText: { value: productScopeText },
    productScopes: { value: productScopes },
    commonProducts,
    productPairs,
    specifications,
    code: { value: code },
    subcategory: {
      value: {
        title: { value: subCategoryTitle },
        link: { value: subCategoryLink },
        category: {
          value: {
            title: { value: categoryTitle },
            link: { value: categoryLink },
          },
        },
      },
    },
  } = cockpitProduct;

  const productCrumbs = [
    {
      title: TRANSLATE[lang as 'ru' | 'ua'].primaryPage,
      link: LANGUAGES[lang as 'ru' | 'ua'],
    },
    {
      title: 'Каталог',
      link: `${LANGUAGES[lang as 'ru' | 'ua']}catalog`,
    },
    {
      title: categoryTitle,
      link: categoryLink,
    },
    {
      title: subCategoryTitle,
      link: subCategoryLink,
    },
    {
      title: name,
      link: productLink,
    },
  ];

  const seoImages = images.map(
    ({
      childImageSharp: {
        fluid: { src },
      },
    }) => src
  );

  const product = {
    price,
    seoImages,
    url: productLink,
  };

  return (
    <div className="page">
      <Seo
        breadcrumbs={productCrumbs}
        description={description}
        lang={lang as 'ru' | 'ua'}
        path={productLink}
        product={product}
        title={name}
      />
      <Subheader crumbs={productCrumbs} />
      <ProductBar />
      <ProductInfo
        name={name}
        description={description}
        price={price}
        price2={price2?.value || ''}
        price3={price3?.value || ''}
        price4={price4?.value || ''}
        measurment={measurment?.value || ''}
        measurment2={measurment2?.value || ''}
        measurment3={measurment3?.value || ''}
        measurment4={measurment4?.value || ''}
        images={images}
        isAvailable={isAvailable?.value || null}
      />
      {!!commonProducts?.value?.length && <ProductCommons products={commonProducts?.value} />}
      {specifications?.value?.data && <ProductSpecifications data={specifications.value.data} title={name} />}
      {galleryImages && galleryBackground && galleryBackground && galleryTitle && (
        <ProductGallery
          title={galleryTitle?.value}
          description={galleryText?.value}
          background={galleryBackground?.value}
          images={galleryImages.value}
        />
      )}
      <ProductScope desciption={productScopeText} scopes={productScopes} />
      {productPairs && !!productPairs.value.length && (
        <ProductPairs
          currentProductName={name}
          currentProductDesciption={description}
          currentProductCode={code}
          currentProductPhoto={images[0].childImageSharp.fluid}
          productPairs={productPairs.value}
        />
      )}
    </div>
  );
};

export default Product;

export const productQuery = graphql`
  query($path: String!) {
    cockpitProduct(link: { value: { eq: $path } }, lang: { ne: "any" }) {
      lang
      link {
        value
      }
      name {
        value
      }
      description {
        value
      }
      isAvailable {
        value
      }
      measurment {
        value
      }
      measurment2 {
        value
      }
      measurment3 {
        value
      }
      measurment4 {
        value
      }
      price {
        value
      }
      price2 {
        value
      }
      price3 {
        value
      }
      price4 {
        value
      }
      specifications {
        value {
          data
        }
      }
      code {
        value
      }
      images {
        value {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      galleryTitle {
        value
      }
      galleryText {
        value
      }
      galleryImages {
        value {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      galleryBackground {
        value {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      productScopeText {
        value
      }
      productScopes {
        value {
          id
          title {
            type
            value
          }
          svg {
            type
            value
          }
        }
      }
      commonProducts {
        value {
          id
          name {
            value
          }
          link {
            value
          }
          images {
            value {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      productPairs {
        value {
          id
          name {
            value
          }
          description {
            value
          }
          link {
            value
          }
          images {
            value {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          code {
            value
          }
        }
      }
      subcategory {
        value {
          title {
            value
          }
          link {
            value
          }
          category {
            value {
              title {
                value
              }
              link {
                value
              }
            }
          }
        }
      }
    }
  }
`;
