\# Testes Automatizados de UI — EBAC Shop



\## Objetivo



Automatizar os cenários funcionais da \*\*US-0004 — Catálogo de produtos\*\* da EBAC Shop, validando a navegação, consulta de produtos, pesquisas e filtros por categoria.



\## Tecnologias utilizadas



\- \*\*Playwright 1.64.1\*\*

\- TypeScript

\- Node.js

\- Chromium

\- Page Object Model (POM)



\## Comparação de frameworks



Para a automação de interface, foram considerados três frameworks:



| Critério | Playwright | Cypress | WebdriverIO |

|---|---|---|---|

| Linguagens | JavaScript e TypeScript | JavaScript e TypeScript | JavaScript e TypeScript |

| Navegadores | Chromium, Firefox e WebKit | Chrome, Edge, Firefox e Electron | Navegadores compatíveis com WebDriver |

| Esperas automáticas | Sim | Sim | Sim |

| Execução paralela | Nativa | Disponível conforme configuração e infraestrutura | Disponível |

| Testes de API | Suporte integrado | Suporte integrado | Possível com bibliotecas complementares |

| Evidências | Screenshots, vídeos e traces | Screenshots e vídeos | Screenshots e relatórios configuráveis |



\*\*Framework escolhido: Playwright.\*\*



A escolha considera o suporte a múltiplos navegadores, as esperas automáticas, o uso de TypeScript, os relatórios de execução e a possibilidade de integração com GitHub Actions.



\## Padrão de automação



Foi utilizado o \*\*Page Object Model (POM)\*\*, separando as responsabilidades:



\- `pages/CatalogoPage.ts`: elementos e ações da interface.

\- `tests/catalogo.spec.ts`: casos de teste e validações.

\- `playwright.config.ts`: configurações de execução.



Essa organização reduz a duplicação de código e facilita a manutenção dos testes.



\## Casos automatizados



| ID | Cenário | Resultado |

|---|---|---|

| CT-021 | Consultar catálogo de produtos | Aprovado |

| CT-022 | Abrir detalhes de um produto | Aprovado |

| CT-023 | Pesquisar produto existente | Aprovado |

| CT-024 | Pesquisar produto inexistente | Aprovado |

| CT-025 | Pesquisar produtos por categoria | Aprovado |



\*\*Última execução registrada:\*\* 5 testes aprovados, em 15,1 segundos, utilizando Chromium.



\## Instalação e execução



Na pasta `UI`, instale as dependências:



```bash

npm ci

```



Instale o navegador:



```bash

npx playwright install chromium

```



Execute os testes:



```bash

npm test

```



Para visualizar a execução no navegador:



```bash

npx playwright test --headed

```



Para executar um caso específico:



```bash

npx playwright test -g "CT-023"

```



\## Evidências



O Playwright está configurado para gerar screenshots e traces em caso de falha.



Os resultados temporários são armazenados em `test-results/`, que não é versionado no GitHub.



\## Observações



Os testes utilizam a EBAC Shop como ambiente remoto de execução. Alterações nos produtos, na estrutura da interface ou na disponibilidade da plataforma podem impactar os resultados.



A automação cobre os cinco cenários da US-0004. Os demais fluxos do TCC serão tratados nas respectivas etapas do projeto.

