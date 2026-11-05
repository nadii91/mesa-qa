# Mesa — projeto de estudos em QA

Loja fictícia para praticar testes manuais e automação com **Cypress e JavaScript**. O foco é aprender a testar busca, carrinho, cupom e compra simulada.

![Loja Mesa](docs/preview.png)

## Como abrir a loja

Instale o Node.js 24 LTS. Na pasta do projeto, execute:

```sh
npm ci
npm start
```

Abra http://127.0.0.1:3000. Deixe o terminal aberto enquanto usa a loja. Para parar, pressione Ctrl+C.

## Como executar os testes

Para rodar todos os testes automaticamente:

```sh
npm test
```

Para abrir o Cypress e acompanhar os testes na tela:

```sh
npm run test:open
```

Escolha um navegador e abra `loja.cy.js` ou `api.cy.js`. Esses comandos iniciam uma loja separada para os testes na porta 3001 e a encerram ao terminar. Não é preciso criar conta no Cypress.

## O que é testado

- Catálogo, busca e filtro de produtos.
- Adição e remoção de itens do carrinho.
- Cupom válido e inválido.
- Compra simulada e mensagens de erro.
- API: consulta de produtos e validação de pedidos.

Os testes também rodam no GitHub Actions quando o projeto recebe uma alteração. O resultado aparece na aba **Actions**.

## Onde encontrar cada coisa

- `cypress/e2e/loja.cy.js`: testes da tela.
- `cypress/e2e/api.cy.js`: testes de API.
- `public/` e `server.js`: código da loja.
- [Cenários manuais](docs/plano-de-testes.md)
- [Modelo de bug](docs/bug-template.md)
- [Como entender os testes](docs/guia-cypress.md)
- [Resultado dos testes](docs/resultados.md)

## Dados para praticar

Use **Maria Teste**, **maria@example.com** e o cupom **MESA10** (10% de desconto). O frete custa R$ 15,90 e é grátis a partir de R$ 200 após o desconto.

Este é um projeto de estudo: não há pagamento real, entrega, login ou banco de dados. Os pedidos não ficam salvos. O GitHub guarda os arquivos; para usar a loja, execute os comandos acima no computador.
