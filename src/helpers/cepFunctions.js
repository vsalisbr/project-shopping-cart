function formatAddress(street, neighborhood, city, state) {
  return `${street} - ${neighborhood} - ${city} - ${state}`;
}

async function getCepBrasilApi(cep) {
  return fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    .then((response) => response.json())
    .then((data) => {
      const { street, neighborhood, city, state } = data;
      if (street && neighborhood && city && state) {
        const formatedAddress = formatAddress(street, neighborhood, city, state);
        return formatedAddress;
      }
      throw new Error('Endereço retornado pela API é inválido');
    });
}

async function getCepAwesomeApi(cep) {
  return fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
    .then((response) => response.json())
    .then((data) => {
      const { address, district, city, state } = data;
      if (address && district && city && state) {
        const formatedAddress = formatAddress(address, district, city, state);
        return formatedAddress;
      }
      throw new Error('Endereço retornado pela API é inválido');
    });
}

export const getAddress = async (cep) => {
  const promises = [
    getCepBrasilApi(cep),
    getCepAwesomeApi(cep),
  ];
  return Promise.any(promises)
    .then((response) => response);
};

export const searchCep = async () => {
  const cartAddress = document.querySelector('.cart__address');
  const cepInput = document.querySelector('.cep-input').value;
  getAddress(cepInput)
    .then((response) => {
      cartAddress.innerText = response;
    })
    .catch(() => {
      cartAddress.innerText = 'CEP não encontrado';
    });
};
