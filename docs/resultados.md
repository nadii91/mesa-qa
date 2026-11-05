# Resultados de validação — 05/11/2026

Ambiente: Windows, Node.js 24.18.0, Playwright 1.56.1, Chromium 141.

| Suíte | Resultado |
|---|---|
| Regras de negócio e API — `npm test` | 17 aprovados; 0 falhas |
| Navegação — `npm run test:e2e` | 12 aprovados; 0 falhas |

Os seis cenários E2E foram executados em dois tamanhos de viewport: desktop 1440×1000 e celular 390×844. Isso não equivale a testes em aparelhos físicos nem em Safari/Firefox.

Captura de página completa: [preview.png](preview.png). Inspeção visual da captura desktop realizada. Plano manual e sessão exploratória permanecem como roteiro para execução; não foram declarados concluídos.

Houve bloqueio inicial da conexão local pelo ambiente de execução e conflito com o servidor de prévia; os testes foram repetidos com acesso local autorizado e servidor gerenciado pelo Playwright, resultando nas aprovações acima. Nenhuma execução no GitHub Actions foi confirmada; ela ocorrerá após a publicação no GitHub.
