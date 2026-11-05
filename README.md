# Mesa — loja virtual para portfólio de QA

![Visão da loja Mesa](docs/preview.png)

Loja fictícia de acessórios para escritório, construída para demonstrar testes manuais, automação de interface, testes de API e integração contínua. Interface em português, responsiva e sem serviços externos necessários para navegar.

## Executar

Requisito: Node.js 22 ou superior.

```sh
npm ci
npm start
```

Abra http://127.0.0.1:3000. Para parar, pressione Ctrl+C.

## Testar

```sh
npm test
npx playwright install chromium
npm run test:e2e
npx playwright show-report
```

Os testes de regras de negócio e API usam o executor nativo do Node. A interface é testada com Playwright em Chromium, em tamanhos de desktop e celular. O GitHub Actions executa ambos e disponibiliza o relatório como artefato a cada push ou pull request.

## Funcionalidades e regras

- Catálogo com seis produtos, categorias, busca por nome e ordenação por preço.
- Carrinho persistido no navegador; quantidade limitada ao estoque e remoção de produtos.
- Cupom `MESA10`: 10% sobre o subtotal, arredondado ao centavo; não acumula.
- Frete de R$ 15,90; grátis quando o subtotal após desconto é pelo menos R$ 200,00.
- Checkout exige nome de pelo menos três caracteres e e-mail em formato válido.
- API recalcula valores e rejeita produtos, quantidades e cupons inválidos.
- Modal com fechamento por Escape, rótulos de campos e mensagens de estado.

## API

`GET /api/products` retorna o catálogo. `POST /api/orders` recebe:

```json
{"cart":{"cup":1},"coupon":"MESA10","customer":{"name":"Maria Teste","email":"maria@example.com"}}
```

Resposta 201: identificador, `simulated: true`, subtotal, desconto, frete e total em centavos. Erros de entrada retornam 400 com `error`; conteúdo acima do limite retorna 413.

## Documentação de QA

- [Plano e cenários de teste](docs/plano-de-testes.md)
- [Modelo de relatório de bug](docs/bug-template.md)
- [Resultados da execução](docs/resultados.md)

## Estrutura

`public/`: interface e cálculo do carrinho. `server.js`: servidor e API. `tests/`: testes unitários, integração e E2E. `.github/workflows/qa.yml`: integração contínua.

## Limitações intencionais

Projeto educacional: não processa pagamentos, não envia produtos, não possui login ou banco de dados. Pedidos não são armazenados; o estoque é fixo e não é consumido entre compras. Use somente dados fictícios. Dados do formulário são enviados ao servidor local apenas para validação e não são gravados. O GitHub Pages sozinho não executa a API Node; o projeto deve ser executado com `npm start` ou hospedado em ambiente que execute Node.js.

## Evolução sugerida

Adicionar persistência e testes de concorrência de estoque, autenticação, auditoria de acessibilidade com leitores de tela e cenários de carga. Ao apresentar o portfólio, explique as regras testadas, execute a suíte e acrescente suas próprias investigações e evidências.
