# Entendendo os testes

Comece pelo arquivo `cypress/e2e/loja.cy.js`. Cada teste tem um nome que explica o comportamento esperado.

```js
it('busca uma caneca pelo nome', () => {
  cy.get('#search').type('Caneca');
  cy.get('.product').should('have.length', 1);
  cy.get('#products').should('contain', 'Caneca Pausa');
});
```

1. `cy.get('#search')` encontra o campo de busca pelo seu ID no HTML.
2. `.type('Caneca')` digita no campo.
3. `.should('have.length', 1)` verifica que existe um produto no resultado.
4. `.should('contain', 'Caneca Pausa')` verifica o nome encontrado.

Outros comandos usados: `cy.visit()` abre a página, `.click()` clica e `cy.contains()` encontra um texto. `beforeEach()` prepara cada teste. O Cypress limpa o armazenamento entre os testes para que um não dependa do outro.

No arquivo `api.cy.js`, `cy.request()` envia uma chamada diretamente à API. O código 200 indica uma consulta bem-sucedida, 201 indica pedido criado e 400 indica dados inválidos. A API usa centavos: 6981 significa R$ 69,81.

## Exercício

Copie o teste de busca e altere o produto para Caderno. Execute e confira o resultado. Depois tente criar um teste para aumentar a quantidade no carrinho.

## Quando um teste falha

Leia o nome do teste e a mensagem de erro. Tente reproduzir na loja. Em execução automática, o Cypress salva uma captura em `cypress/screenshots/` quando um teste de tela falha. No GitHub, abra a execução na aba Actions para ver o erro e baixar as capturas disponíveis.

Referência: [testes de API com cy.request](https://docs.cypress.io/api/commands/request).
