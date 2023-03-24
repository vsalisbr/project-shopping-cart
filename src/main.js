import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs, addAmountToCart } from './helpers/cartFunctions';

const sectionProducts = document.querySelector('.products');
const cart = document.querySelector('.cart__products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function clrSectionProdutcs() {
  sectionProducts.innerHTML = '';
}

function loading() {
  clrSectionProdutcs();
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerText = 'carregando...';
  sectionProducts.appendChild(span);
}

function error(message) {
  clrSectionProdutcs();
  const span = document.createElement('span');
  span.className = 'error';
  span.innerText = message;
  sectionProducts.appendChild(span);
}

async function getProduct(productId) {
  return fetchProduct(productId)
    .then((response) => {
      const product = createCartProductElement(response);
      return product;
    })
    .catch((err) => {
      error(err.message);
    });
}

function addProductToCart(product) {
  cart.appendChild(product);
  const productPrice = (product.querySelector('.product__price__value').innerText);
  addAmountToCart(productPrice);
}

function actionBtnAddCart(event) {
  const productSection = event.target.parentNode;
  const productId = productSection.querySelector('.product__id').innerText;
  getProduct(productId)
    .then((product) => {
      addProductToCart(product);
      saveCartID(productId);
    });
}

function btnsAddCart() {
  const btns = document.querySelectorAll('.product__add');
  btns.forEach((btn) => {
    btn.addEventListener('click', actionBtnAddCart);
  });
}

function consultProducts(query) {
  loading();
  fetchProductsList(query)
    .then((result) => {
      clrSectionProdutcs();
      result.forEach((product) => {
        const sectionProduct = createProductElement(product);
        sectionProducts.appendChild(sectionProduct);
      });
      btnsAddCart();
    })
    .catch((err) => {
      error(err.message);
    });
}

function loadProductsCart() {
  const idProductList = getSavedCartIDs();
  const promises = idProductList.map((productId) => getProduct(productId));
  Promise.all(promises)
    .then((products) => {
      products.forEach((product) => {
        addProductToCart(product);
      });
    });
}

window.onload = () => {
  consultProducts('computador');
  loadProductsCart();
};
