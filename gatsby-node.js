/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const categoryPage = path.resolve('src/templates/category.tsx');
const subCategoryPage = path.resolve('src/templates/subCategory.tsx');
const subSubCategoryPage = path.resolve('src/templates/subSubCategory.tsx');
const singleStockPage = path.resolve('src/templates/stock.tsx');
const productPage = path.resolve('src/templates/product.tsx');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await graphql(`
    {
      allCockpitSubCategories(filter: { lang: { ne: "any" } }) {
        nodes {
          link {
            value
          }
        }
      }
      allCockpitSubSubCategories(filter: { lang: { ne: "any" } }) {
        nodes {
          link {
            value
          }
        }
      }
      allCockpitStocks(filter: { lang: { ne: "any" } }) {
        nodes {
          link {
            value
          }
        }
      }
      allCockpitCategories {
        nodes {
          link {
            value
          }
        }
      }
      allCockpitProduct(filter: { link: { value: { ne: "any" } } }) {
        nodes {
          link {
            value
          }
        }
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const {
      allCockpitCategories: { nodes: categoriesNodes },
      allCockpitSubCategories: { nodes: subCategoriesNodes },
      allCockpitSubSubCategories: { nodes: subSubCategoriesNodes },
      allCockpitStocks: { nodes: stocksNodes },
      allCockpitProduct: { nodes: productsNodes },
    } = data;

    categoriesNodes.forEach(({ link: { value } }) => {
      createPage({
        path: value,
        component: categoryPage,
      });
    });
    productsNodes.forEach(({ link: { value } }) => {
      createPage({
        path: value,
        component: productPage,
      });
    });

    subCategoriesNodes.forEach(({ link: { value } }) => {
      createPage({
        path: value,
        component: subCategoryPage,
      });
    });
    subSubCategoriesNodes.forEach(({ link: { value } }) => {
      createPage({
        path: value,
        component: subSubCategoryPage,
      });
    });

    stocksNodes.forEach(({ link: { value } }) => {
      createPage({
        path: value,
        component: singleStockPage,
      });
    });
  });
};
