import { stores } from '@/_data/stores';
import { products } from '@/_data/products';
import { shopProducts } from '@/_data/storeProducts';

export const milkTeaServices = {
  getListStores,
  getStore,
  getListProductsId,
  getProduct
}

function getListStores() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('getProduct api');
      const listStores = [...stores];
      if (listStores) {
        resolve(listStores)
      } else {
        reject('backend fail')
      }
    }, 200)
  })
}

function getStore(storeId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('getProduct api');
      // console.log('stores: ' + stores);
      const store = stores.filter(e => e.id == storeId);
      // console.log("store: " + store[0]);
      if (store[0]) {
        resolve(store[0])
      } else {
        reject('backend fail')
      }
    }, 200)
  })
}

function getListProductsId(storeId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(shopProducts);
      const listShopProducts = shopProducts.filter( e => e.shop == storeId );
      // console.log('listShopProducts: ' + listShopProducts);
      const listProductsId = listShopProducts.map( e => e.product);
      if (listProductsId) {
        resolve(listProductsId)
      } else {
        reject('backend fail')
      }
    }, 200)
  })
}

function getProduct(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log("products: " + products);
      const product = products.filter(e => e.id == productId);
      // console.log( product[0]);
      if (product[0]) {
        resolve(product[0])
      } else {
        reject('backend fail')
      }
    }, 200)
  })
}