# Cenários de teste manual

Objetivo: verificar se uma pessoa consegue encontrar um produto e fazer uma compra simulada.

Abra a loja e use dados fictícios: Maria Teste e maria@example.com. Comece cada cenário com o carrinho vazio.

| ID | O que fazer | Resultado esperado |
|---|---|---|
| CT01 | Abrir a loja | Mostrar seis produtos |
| CT02 | Clicar em Papelaria | Mostrar caderno e kit de canetas |
| CT03 | Buscar Caneca | Mostrar somente Caneca Pausa |
| CT04 | Buscar um nome inexistente | Mostrar mensagem de nenhum produto encontrado |
| CT05 | Adicionar uma caneca e abrir a sacola | Mostrar uma caneca no carrinho |
| CT06 | Remover a caneca | Mostrar carrinho vazio e impedir compra |
| CT07 | Adicionar uma caneca e aplicar MESA10 | Mostrar total de R$ 69,81, já com frete |
| CT08 | Aplicar o cupom FALSO | Mostrar mensagem de cupom inválido |
| CT09 | Tentar adicionar o relógio esgotado | Botão desabilitado |
| CT10 | Adicionar uma caneca e finalizar com os dados de teste | Confirmar pedido e esvaziar o carrinho |
| CT11 | Tentar comprar sem preencher nome e e-mail | Impedir envio do formulário |
| CT12 | Adicionar duas luminárias | Mostrar frete grátis |

Depois de executar, anote o ID, a data, o navegador e o resultado: **passou** ou **falhou**. Se falhar, use o modelo de bug e salve uma captura da tela. Esta tabela é um roteiro, não um registro de execução.
