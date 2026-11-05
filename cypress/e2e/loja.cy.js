// describe agrupa os testes. Cada it representa um cenário.
describe('Loja Mesa', () => {
  // Abre a loja antes de cada teste. O Cypress limpa o estado entre testes.
  beforeEach(() => {
    cy.visit('/');
  });

  it('mostra os seis produtos do catálogo', () => {
    cy.get('.product').should('have.length', 6);
  });

  it('filtra os produtos de papelaria', () => {
    cy.contains('button', 'Papelaria').click();
    cy.get('.product').should('have.length', 2);
    cy.get('#products').should('contain', 'Caderno Horizonte');
    cy.get('#products').should('contain', 'Kit Traço');
  });

  it('busca uma caneca pelo nome', () => {
    cy.get('#search').type('Caneca');
    cy.get('.product').should('have.length', 1);
    cy.get('#products').should('contain', 'Caneca Pausa');
  });

  it('avisa quando a busca não encontra produtos', () => {
    cy.get('#search').type('produto inexistente');
    cy.get('#results').should('contain', 'Nenhum produto encontrado');
  });

  it('ordena os produtos pelo menor preço', () => {
    cy.get('#sort').select('Menor preço');
    cy.get('.product').first().should('contain', 'Kit Traço');
  });

  it('não permite adicionar produto esgotado', () => {
    cy.get('[data-add="clock"]').should('be.disabled');
  });

  it('mantém o produto no carrinho depois de recarregar', () => {
    cy.get('[data-add="cup"]').click();
    cy.reload();
    cy.get('#open-cart').click();
    cy.get('#cart-items').should('contain', 'Caneca Pausa');
    cy.get('#count').should('have.text', '1');
  });

  it('remove o produto e impede compra com carrinho vazio', () => {
    cy.get('[data-add="cup"]').click();
    cy.get('#open-cart').click();
    cy.get('[data-remove="cup"]').click();
    cy.get('#cart-items').should('contain', 'Sua sacola está vazia');
    cy.get('#submit-order').should('be.disabled');
  });

  it('aplica o cupom MESA10 e mostra o total correto', () => {
    cy.get('[data-add="cup"]').click();
    cy.get('#open-cart').click();
    cy.get('#coupon').type('MESA10');
    cy.contains('button', 'Aplicar').click();
    cy.get('#coupon-status').should('contain', '10% de desconto');
    // Caneca 59,90 - desconto 5,99 + frete 15,90 = 69,81.
    cy.get('#totals strong').should('contain', '69,81');
  });

  it('mostra erro para cupom inválido', () => {
    cy.get('#open-cart').click();
    cy.get('#coupon').type('FALSO');
    cy.contains('button', 'Aplicar').click();
    cy.get('#coupon-status').should('contain', 'Cupom inválido');
  });

  it('finaliza uma compra simulada', () => {
    cy.get('[data-add="cup"]').click();
    cy.get('#open-cart').click();
    cy.get('#name').type('Maria Teste');
    cy.get('#email').type('maria@example.com');
    cy.get('#submit-order').click();
    cy.get('#order-status').should('contain', 'Pedido simulado confirmado');
    cy.get('#order-status').should('contain', '75,80');
    cy.get('#count').should('have.text', '0');
  });

  it('abre e fecha o carrinho em uma tela pequena', () => {
    cy.viewport(390, 844);
    cy.get('#open-cart').click();
    cy.get('#cart-dialog').should('be.visible');
    cy.get('#close-cart').click();
    cy.get('#cart-dialog').should('not.be.visible');
  });
});
