async function reqApi(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
  }
  const results = await response.json();
  return results;
}

export const fetchProduct = async (query) => {
  if (!query) {
    throw new Error('ID não informado');
  }
  const apiUrl = `https://api.mercadolibre.com/items/${query}`;
  const product = await reqApi(apiUrl);
  return product;
};

export const fetchProductsList = async (query) => {
  if (!query) {
    throw new Error('Termo de busca não informado');
  }
  const apiUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  let products = await reqApi(apiUrl);
  products = products.results;
  return products;
};
