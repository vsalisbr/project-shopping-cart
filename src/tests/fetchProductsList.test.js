import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function')
  });
  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Ao chamar com argumento "computador" o retorno deve ser igual ao "computadorSearch"', async () => {
    const query = await fetchProductsList('computador');
    expect(query).toEqual(computadorSearch);
  })
  it('Ao chamar sem argumentos, deve retornar mensagem de erro "Termo de busca não informado"', async () => {
    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  })
  it('Caso a busca não seja bem sucedida, um erro é disparado', async () => {
    const filtroInexistente = "ksjdflksjdfsdfsdfsfsd sdas asd as dasd asd asd asd asd asd a dsfdf";
    await expect(fetchProductsList(filtroInexistente)).rejects.toThrow('Algum erro ocorreu, recarregue a página e tente novamente');
  })
});
