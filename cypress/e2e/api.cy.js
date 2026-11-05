// cy.request testa a API diretamente, sem clicar na tela.
describe('API da loja', () => {
  it('retorna o catálogo com sucesso', () => {
    cy.request('/api/products').then((resposta) => {
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.length(6);
    });
  });

  it('cria um pedido com desconto e calcula o total no servidor', () => {
    cy.request('POST', '/api/orders', {
      cart: { cup: 1 },
      coupon: 'MESA10',
      total: 1, // O cliente não pode mudar o preço real.
      customer: { name: 'Maria Teste', email: 'maria@example.com' },
    }).then((resposta) => {
      expect(resposta.status).to.equal(201);
      expect(resposta.body.total).to.equal(6981); // Valor em centavos.
      expect(resposta.body.simulated).to.equal(true);
    });
  });

  it('rejeita pedido com carrinho vazio', () => {
    cy.request({
      method: 'POST',
      url: '/api/orders',
      failOnStatusCode: false, // Neste teste, esperamos uma resposta de erro.
      body: {
        cart: {},
        customer: { name: 'Maria Teste', email: 'maria@example.com' },
      },
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Adicione um produto ao carrinho.');
    });
  });

  it('rejeita e-mail inválido', () => {
    cy.request({
      method: 'POST',
      url: '/api/orders',
      failOnStatusCode: false,
      body: {
        cart: { cup: 1 },
        customer: { name: 'Maria Teste', email: 'email-invalido' },
      },
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Informe um e-mail válido.');
    });
  });

  it('rejeita quantidade maior que o estoque', () => {
    cy.request({
      method: 'POST',
      url: '/api/orders',
      failOnStatusCode: false,
      body: {
        cart: { cup: 7 }, // Há apenas seis canecas disponíveis.
        customer: { name: 'Maria Teste', email: 'maria@example.com' },
      },
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Produto ou quantidade inválida.');
    });
  });

  it('rejeita cupom inválido', () => {
    cy.request({
      method: 'POST',
      url: '/api/orders',
      failOnStatusCode: false,
      body: {
        cart: { cup: 1 },
        coupon: 'FALSO',
        customer: { name: 'Maria Teste', email: 'maria@example.com' },
      },
    }).then((resposta) => {
      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Cupom inválido.');
    });
  });
});
