# Automação de Testes de UI | EBAC Shop

Testes automatizados da **US-0004 — Catálogo de produtos**, desenvolvidos como parte do Trabalho de Conclusão de Curso de Engenharia de Qualidade de Software da EBAC.

O projeto utiliza **Playwright + TypeScript** com o padrão **Page Object Model (POM)** para verificar navegação, pesquisa e consulta de produtos.

## Resultado da execução

| Indicador | Resultado |
| :--- | :--- |
| Cenários automatizados | **5** |
| Aprovados | **5** |
| Reprovados | **0** |
| Navegador | Chromium |
| Tempo total da última execução | **15,9 segundos** |

*Resultado obtido na execução de 18/10/2026. Os testes dependem da disponibilidade e dos dados do ambiente da EBAC Shop.*

### Cenários cobertos

| ID | Cenário | Resultado |
| :--- | :--- | :--- |
| CT-021 | Consultar catálogo de produtos | Aprovado |
| CT-022 | Abrir detalhes de um produto | Aprovado |
| CT-023 | Pesquisar produto existente | Aprovado |
| CT-024 | Pesquisar produto inexistente | Aprovado |
| CT-025 | Pesquisar produtos por categoria | Aprovado |

## Tecnologias e abordagem

- **Playwright 1.64.1** — automação de navegador e asserções.
- **TypeScript** — organização e manutenção do código.
- **Node.js** — ambiente de execução.
- **Page Object Model (POM)** — separação entre interações com a interface e validações.

### Estrutura do projeto

```text
UI/
├── pages/
│   └── CatalogoPage.ts
├── tests/
│   └── catalogo.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

O arquivo `pages/CatalogoPage.ts` centraliza seletores e ações do catálogo. Os cenários e suas asserções ficam em `tests/catalogo.spec.ts`, enquanto `playwright.config.ts` define a execução no Chromium, os tempos de espera e a geração de evidências em caso de falha.

## Análise dos frameworks

Antes da implementação, foram considerados três frameworks para automação de interface.

| Critério | Playwright | Cypress | WebdriverIO |
| :--- | :--- | :--- | :--- |
| Linguagens | JavaScript / TypeScript | JavaScript / TypeScript | JavaScript / TypeScript |
| Navegadores | Chromium, Firefox e WebKit | Chrome, Edge, Firefox e Electron | Navegadores suportados pelos drivers configurados |
| Sincronização | Esperas e asserções automáticas | Comandos com repetição automática | Comandos e esperas integradas |
| Paralelismo | Suporte nativo | Conforme configuração e infraestrutura | Suporte por workers |
| Diagnóstico | Traces, screenshots e relatórios | Screenshots, vídeos e relatórios | Logs, screenshots e reporters configuráveis |
| Organização | Integração com POM | Permite abstrações e comandos personalizados | Suporte a Page Objects |

**Escolha: Playwright.** Foi selecionado pelo suporte a TypeScript, pelos mecanismos de espera, pelos recursos de diagnóstico e pela integração com pipelines de CI. A comparação resume características relevantes para este projeto, sem representar uma avaliação exaustiva das ferramentas.

## Como executar

**Pré-requisitos:** Node.js e npm instalados.

1. Acesse a pasta `UI` do repositório.
2. Instale as dependências e o Chromium:

```bash
npm ci
npx playwright install chromium
```

Execute toda a suíte:

```bash
npm test
```

Para acompanhar o navegador durante os testes:

```bash
npx playwright test --headed
```

Para executar apenas um cenário:

```bash
npx playwright test -g "CT-023"
```

Para gerar e consultar o relatório HTML:

```bash
npx playwright test --reporter=html
npx playwright show-report
```

## Evidências e cuidados

A configuração registra **screenshots e traces em caso de falha**. Relatórios e resultados temporários são ignorados pelo Git por meio do `.gitignore`.

Os testes são executados contra a loja de demonstração da EBAC. Mudanças nos produtos, seletores ou disponibilidade do ambiente podem exigir revisão dos cenários.

---

**Projeto principal:** [TCC-EBAC-QE](https://github.com/talytam/TCC-EBAC-QE)
