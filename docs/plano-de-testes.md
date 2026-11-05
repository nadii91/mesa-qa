# Plano de testes

## Objetivo e abordagem

Validar a jornada catálogo → carrinho → desconto → pedido simulado. Priorizar cálculos monetários e validação de entradas na API; verificar integração da jornada na interface. O estoque é fixo por pedido, sem concorrência ou persistência de pedidos.

Ambiente: Node.js 22+, navegador Chromium desktop (1440×1000) e móvel (390×844). Dados fictícios: Maria Teste, maria@example.com. Reinicie o estado removendo `mesa-cart` do armazenamento local do navegador.

## Cenários manuais

| ID | Prioridade | Ação | Resultado esperado |
|---|---|---|---|
| CT01 | Alta | Abrir catálogo | Seis produtos; relógio esgotado |
| CT02 | Média | Selecionar Papelaria | Caderno e kit de canetas |
| CT03 | Média | Buscar texto inexistente | Mensagem sem resultados |
| CT04 | Média | Ordenar por menor preço | Kit Traço aparece primeiro |
| CT05 | Alta | Adicionar caneca e recarregar | Uma unidade permanece na sacola |
| CT06 | Alta | Tentar adicionar sete canecas | Limite de seis; mensagem no catálogo |
| CT07 | Alta | Remover todos os itens | Carrinho vazio; checkout desabilitado |
| CT08 | Alta | Uma caneca com MESA10 | Subtotal 59,90; desconto 5,99; frete 15,90; total 69,81 |
| CT09 | Alta | Aplicar cupom inválido | Erro e nenhum desconto |
| CT10 | Alta | Suporte + caneca, com MESA10 | Frete 15,90, pois valor após desconto é 197,82 |
| CT11 | Alta | Duas luminárias | Frete grátis |
| CT12 | Alta | Enviar formulário vazio ou e-mail inválido | Navegador impede envio |
| CT13 | Alta | Finalizar com dados válidos | Confirmação, código e sacola vazia |
| CT14 | Média | Abrir sacola por teclado e pressionar Escape | Modal fecha; foco retorna ao acionador |
| CT15 | Média | Navegar em largura de 390 px | Conteúdo sem rolagem horizontal |
| CT16 | Alta | Desligar servidor antes de confirmar | Erro visível, itens preservados, permite tentar novamente |

## Critérios de conclusão

Suítes unitária/API e E2E aprovadas; defeitos críticos resolvidos. Cenários manuais devem receber evidência antes de serem marcados como executados. Ter testes automatizados não comprova uma auditoria completa de acessibilidade, segurança ou desempenho.

## Sessão exploratória proposta (30 minutos)

Investigar mudanças rápidas de quantidade, busca e filtros combinados, desconto antes/depois de esvaziar sacola, restauração de armazenamento corrompido, navegação por teclado e falha de rede. Registrar ambiente, passos, observado, esperado e evidências. A sessão está proposta, não registrada como executada.
