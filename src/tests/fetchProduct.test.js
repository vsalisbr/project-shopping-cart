import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';


// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('É uma função?', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Ao ser chamada sem parâmetro deve retornar erro', async () => {
    await expect(fetchProduct()).rejects.toThrow()
  });

  it('Ao ser chamado passando argumento fetch deve chamado', async () => {
    const produto = await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao ser chamada com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561"', async () => {
    const produto = await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Ao ser chamada com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto', async () => {
    const produto = await fetchProduct('MLB1405519561');
    expect(produto).toEqual(product);
  });

  it('Ao ser chamada sem argumento, retorna erro "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});


