import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Subheader from '../components/Subheader/Subheader';
import ProductBar from '../components/Product/ProductBar';
import ProductInfo from '../components/Product/ProductInfo';
import ProductCommons from '../components/Product/ProductCommons';
import ProductGallery from '../components/Product/ProductGallery';
import ProductScope from '../components/Product/ProductScope';
import ProductPairs from '../components/Product/ProductPairs';
import ProductSpecifications from '../components/Product/ProductSpecifications';

import { IProductProps } from './Types';

import { LANGUAGES, TRANSLATE } from '../constants/languages';

import context from '../context/context';

export const productQuery = graphql`
  query($path: String!) {
    cockpitProduct(link: { value: { eq: $path } }) {
      link {
        value
      }
      name {
        value
      }
      description {
        value
      }
      price {
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
          subCategory {
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
    }
  }
`;

const product: React.FC<IProductProps> = ({ data: { cockpitProduct } }): JSX.Element => {
  const {
    name: { value: name },
    link: { value: productLink },
    description: { value: description },
    price: { value: price },
    images: { value: images },
    galleryTitle: { value: galleryTitle },
    galleryText: { value: galleryText },
    galleryBackground: { value: galleryBackground },
    galleryImages: { value: galleryImages },
    productScopeText: { value: productScopeText },
    productScopes: { value: productScopes },
    commonProducts,
    productPairs,
    specifications: {
      value: { data: specifications },
    },
    code: { value: code },
    subcategory: {
      value: {
        title: { value: subSubCategoryTitle },
        link: { value: subSubCategoryLink },
        subCategory: {
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
      },
    },
  } = cockpitProduct;

  const { language } = useContext(context);

  const productCrumbs = [
    {
      title: TRANSLATE[language as 'ru' | 'ua'].primaryPage,
      link: LANGUAGES[language as 'ru' | 'ua'],
    },
    {
      title: 'Каталог',
      link: `${LANGUAGES[language as 'ru' | 'ua']}catalog`,
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
      title: subSubCategoryTitle,
      link: subSubCategoryLink,
    },
    {
      title: name,
      link: productLink,
    },
  ];

  return (
    <div className="page">
      <Subheader crumbs={productCrumbs} />
      <ProductBar />
      <ProductInfo name={name} description={description} price={price} images={images} />
      {commonProducts && !!commonProducts.value.length && <ProductCommons products={commonProducts.value} />}
      <ProductSpecifications data={specifications} title={name} />
      <ProductGallery title={galleryTitle} description={galleryText} background={galleryBackground} images={galleryImages} />
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

export default product;
