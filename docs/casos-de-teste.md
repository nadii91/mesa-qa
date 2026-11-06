# Casos de teste — Mesa

**Responsável:** Nadine Amaral (@nadii91).

## Escopo e ambiente

Validação do catálogo, carrinho, cupons e pedidos simulados. Aplicação local em http://127.0.0.1:3000; automação em http://127.0.0.1:3001. Dados pessoais fictícios.

Cada caso de interface começa em uma nova sessão com carrinho vazio e sem cupom, salvo pré-condição diferente. Na automação, o Cypress isola o armazenamento entre testes. Para execução manual, utilizar uma nova sessão ou remover os dados locais da loja.

**Cobertura:** CT01 a CT12 automatizados em `cypress/e2e/loja.cy.js`; API01 a API06 em `cypress/e2e/api.cy.js`. CT13 e CT14 têm execução manual prevista. Os resultados efetivamente registrados estão em [resultados.md](resultados.md).

## Casos de interface

### CT01 — Exibição do catálogo

**Cenário:** Exibir todos os produtos ao acessar a loja.

**Prioridade:** Média

**Pré-condições:** Loja disponível; nenhum filtro aplicado.

**Dados de teste:** Não se aplica.

**Passo a passo:**

1. Acessar a página inicial.
2. Localizar a seção de produtos.

**Resultado esperado:** Exibir seis produtos com nome, preço e botão de compra.

**Automação:** `mostra os seis produtos do catálogo`.

**Resultado obtido na execução manual:** não registrado.

### CT02 — Filtro por categoria

**Cenário:** Consultar apenas produtos de papelaria.

**Prioridade:** Média

**Pré-condições:** Catálogo aberto; busca vazia.

**Dados de teste:** Categoria: Papelaria.

**Passo a passo:**

1. Clicar em Papelaria.
2. Conferir os produtos exibidos.

**Resultado esperado:** Exibir somente Caderno Horizonte e Kit Traço.

**Automação:** `filtra os produtos de papelaria`.

**Resultado obtido na execução manual:** não registrado.

### CT03 — Busca de produto existente

**Cenário:** Localizar um produto pelo nome.

**Prioridade:** Média

**Pré-condições:** Catálogo aberto; categoria Todos selecionada.

**Dados de teste:** Busca: Caneca.

**Passo a passo:**

1. Digitar Caneca no campo de busca.
2. Conferir os resultados.

**Resultado esperado:** Exibir somente Caneca Pausa.

**Automação:** `busca uma caneca pelo nome`.

**Resultado obtido na execução manual:** não registrado.

### CT04 — Busca sem resultados

**Cenário:** Buscar um termo que não corresponde a produtos.

**Prioridade:** Média

**Pré-condições:** Catálogo aberto; categoria Todos selecionada.

**Dados de teste:** Busca: produto inexistente.

**Passo a passo:**

1. Digitar produto inexistente na busca.
2. Observar a lista e a mensagem.

**Resultado esperado:** Não exibir produtos e informar Nenhum produto encontrado.

**Automação:** `avisa quando a busca não encontra produtos`.

**Resultado obtido na execução manual:** não registrado.

### CT05 — Ordenação por preço

**Cenário:** Consultar os produtos do menor para o maior preço.

**Prioridade:** Média

**Pré-condições:** Catálogo completo aberto.

**Dados de teste:** Ordenação: Menor preço.

**Passo a passo:**

1. Selecionar Menor preço no campo Ordenar.
2. Conferir o primeiro produto.

**Resultado esperado:** Kit Traço, de R$ 29,90, aparece primeiro.

**Automação:** `ordena os produtos pelo menor preço`.

**Resultado obtido na execução manual:** não registrado.

### CT06 — Produto sem estoque

**Cenário:** Impedir inclusão de um produto esgotado.

**Prioridade:** Alta

**Pré-condições:** Catálogo aberto; Relógio Tempo com estoque zero.

**Dados de teste:** Produto: Relógio Tempo.

**Passo a passo:**

1. Localizar Relógio Tempo.
2. Verificar a situação do botão de inclusão.

**Resultado esperado:** Exibir indicação de esgotado e botão desabilitado.

**Automação:** `não permite adicionar produto esgotado`.

**Resultado obtido na execução manual:** não registrado.

### CT07 — Persistência do carrinho

**Cenário:** Manter um item após recarregar a página.

**Prioridade:** Alta

**Pré-condições:** Carrinho vazio; estoque disponível.

**Dados de teste:** Uma Caneca Pausa.

**Passo a passo:**

1. Adicionar Caneca Pausa.
2. Recarregar a página.
3. Abrir a sacola.

**Resultado esperado:** Manter uma Caneca Pausa e o contador com valor 1.

**Automação:** `mantém o produto no carrinho depois de recarregar`.

**Resultado obtido na execução manual:** não registrado.

### CT08 — Remoção de item

**Cenário:** Impedir compra após remover o último item.

**Prioridade:** Alta

**Pré-condições:** Carrinho vazio; estoque disponível.

**Dados de teste:** Uma Caneca Pausa.

**Passo a passo:**

1. Adicionar Caneca Pausa.
2. Abrir a sacola.
3. Remover a caneca.

**Resultado esperado:** Exibir carrinho vazio, contador zero e botão de confirmação desabilitado.

**Automação:** `remove o produto e impede compra com carrinho vazio`.

**Resultado obtido na execução manual:** não registrado.

### CT09 — Cupom válido

**Cenário:** Aplicar desconto de 10% no subtotal.

**Prioridade:** Alta

**Pré-condições:** Carrinho vazio; nenhum cupom aplicado.

**Dados de teste:** Uma Caneca Pausa; cupom MESA10.

**Passo a passo:**

1. Adicionar Caneca Pausa e abrir a sacola.
2. Digitar MESA10 no campo de cupom.
3. Clicar em Aplicar.
4. Conferir a confirmação e o total.

**Resultado esperado:** Informar cupom aplicado. Subtotal R$ 59,90; desconto R$ 5,99; frete R$ 15,90; total R$ 69,81.

**Automação:** `aplica o cupom MESA10 e mostra o total correto`.

**Resultado obtido na execução manual:** não registrado.

### CT10 — Cupom inválido

**Cenário:** Rejeitar um código de desconto inexistente.

**Prioridade:** Alta

**Pré-condições:** Sacola disponível; nenhum cupom aplicado.

**Dados de teste:** Cupom FALSO.

**Passo a passo:**

1. Abrir a sacola.
2. Digitar FALSO no campo de cupom.
3. Clicar em Aplicar.

**Resultado esperado:** Informar Cupom inválido e não aplicar desconto.

**Automação:** `mostra erro para cupom inválido`.

**Resultado obtido na execução manual:** não registrado.

### CT11 — Compra com dados válidos

**Cenário:** Concluir um pedido simulado.

**Prioridade:** Alta

**Pré-condições:** Carrinho vazio; nenhum cupom aplicado.

**Dados de teste:** Uma Caneca Pausa; Maria Teste; maria@example.com.

**Passo a passo:**

1. Adicionar Caneca Pausa e abrir a sacola.
2. Preencher nome e e-mail com os dados do caso.
3. Clicar em Confirmar pedido simulado.

**Resultado esperado:** Exibir confirmação com código do pedido e total R$ 75,80. Esvaziar a sacola. Nenhuma cobrança real é realizada.

**Automação:** `finaliza uma compra simulada`.

**Resultado obtido na execução manual:** não registrado.

### CT12 — Carrinho em tela pequena

**Cenário:** Abrir e fechar a sacola em resolução móvel.

**Prioridade:** Média

**Pré-condições:** Loja aberta com resolução de 390 × 844.

**Dados de teste:** Não se aplica.

**Passo a passo:**

1. Clicar em Sacola.
2. Verificar a abertura da janela.
3. Clicar no botão Fechar sacola.

**Resultado esperado:** A sacola fica visível ao abrir e deixa de ser exibida ao fechar.

**Automação:** `abre e fecha o carrinho em uma tela pequena`.

**Resultado obtido na execução manual:** não registrado.

### CT13 — Campos obrigatórios

**Cenário:** Impedir pedido sem nome e e-mail.

**Prioridade:** Alta

**Pré-condições:** Carrinho com uma caneca; formulário vazio.

**Dados de teste:** Nome e e-mail em branco.

**Passo a passo:**

1. Abrir a sacola.
2. Manter nome e e-mail vazios.
3. Clicar em Confirmar pedido simulado.

**Resultado esperado:** O navegador impede o envio e indica campo obrigatório; o pedido não é confirmado. Esvaziamento do carrinho não ocorre.

**Automação:** não implementada; caso manual.

**Resultado obtido na execução manual:** não registrado.

### CT14 — Frete gratuito

**Cenário:** Não cobrar frete acima do limite.

**Prioridade:** Alta

**Pré-condições:** Carrinho vazio; nenhum cupom aplicado.

**Dados de teste:** Duas Luminárias Aurora.

**Passo a passo:**

1. Adicionar duas unidades de Luminária Aurora.
2. Abrir a sacola.
3. Conferir frete e total.

**Resultado esperado:** Subtotal e total de R$ 259,80; frete Grátis.

**Automação:** não implementada; caso manual.

**Resultado obtido na execução manual:** não registrado.

## Casos de API

Pré-condição comum: servidor da loja em execução. Para requisições POST, utilizar `Content-Type: application/json`. Valores monetários retornam em centavos. O estoque inicial de Caneca Pausa é seis unidades.

### API01 — Consulta de produtos

**Cenário:** Consultar o catálogo pela API.

**Prioridade:** Média.

**Requisição:** `GET /api/products`.

**Dados de teste:**

Sem corpo.

**Passo a passo:**

1. Preparar a requisição `GET /api/products` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 200 e lista com seis produtos.

**Automação:** `retorna o catálogo com sucesso`.

**Resultado obtido na execução manual:** não registrado.

### API02 — Criação de pedido

**Cenário:** Aplicar desconto e ignorar total informado pelo cliente.

**Prioridade:** Alta.

**Requisição:** `POST /api/orders`.

**Dados de teste:**

```json
{"cart":{"cup":1},"coupon":"MESA10","total":1,"customer":{"name":"Maria Teste","email":"maria@example.com"}}
```

**Passo a passo:**

1. Preparar a requisição `POST /api/orders` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 201, simulated igual a true e total 6981 (R$ 69,81), calculado pelo servidor.

**Automação:** `cria um pedido com desconto e calcula o total no servidor`.

**Resultado obtido na execução manual:** não registrado.

### API03 — Carrinho vazio

**Cenário:** Rejeitar pedido sem produtos.

**Prioridade:** Alta.

**Requisição:** `POST /api/orders`.

**Dados de teste:**

```json
{"cart":{},"customer":{"name":"Maria Teste","email":"maria@example.com"}}
```

**Passo a passo:**

1. Preparar a requisição `POST /api/orders` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 400 e mensagem Adicione um produto ao carrinho.

**Automação:** `rejeita pedido com carrinho vazio`.

**Resultado obtido na execução manual:** não registrado.

### API04 — E-mail inválido

**Cenário:** Rejeitar dados de contato inválidos.

**Prioridade:** Alta.

**Requisição:** `POST /api/orders`.

**Dados de teste:**

```json
{"cart":{"cup":1},"customer":{"name":"Maria Teste","email":"email-invalido"}}
```

**Passo a passo:**

1. Preparar a requisição `POST /api/orders` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 400 e mensagem Informe um e-mail válido.

**Automação:** `rejeita e-mail inválido`.

**Resultado obtido na execução manual:** não registrado.

### API05 — Estoque excedido

**Cenário:** Rejeitar quantidade superior à disponível.

**Prioridade:** Alta.

**Requisição:** `POST /api/orders`.

**Dados de teste:**

```json
{"cart":{"cup":7},"customer":{"name":"Maria Teste","email":"maria@example.com"}}
```

**Passo a passo:**

1. Preparar a requisição `POST /api/orders` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 400 e mensagem Produto ou quantidade inválida.

**Automação:** `rejeita quantidade maior que o estoque`.

**Resultado obtido na execução manual:** não registrado.

### API06 — Cupom inexistente

**Cenário:** Rejeitar pedido com cupom não cadastrado.

**Prioridade:** Alta.

**Requisição:** `POST /api/orders`.

**Dados de teste:**

```json
{"cart":{"cup":1},"coupon":"FALSO","customer":{"name":"Maria Teste","email":"maria@example.com"}}
```

**Passo a passo:**

1. Preparar a requisição `POST /api/orders` com os dados informados.
2. Enviar a requisição ao servidor.
3. Conferir o código HTTP e o conteúdo da resposta.

**Resultado esperado:** HTTP 400 e mensagem Cupom inválido.

**Automação:** `rejeita cupom inválido`.

**Resultado obtido na execução manual:** não registrado.
