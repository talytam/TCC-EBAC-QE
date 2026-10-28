# TCC — Engenharia de Qualidade de Software | EBAC

Repositório do **Trabalho de Conclusão de Curso (TCC)** da formação em Engenharia de Qualidade de Software da EBAC, com atividades de **estratégia de testes, automação Web, testes de API, automação Mobile, testes de performance e integração contínua**.

O objetivo é aplicar práticas de qualidade de software à **EBAC Shop / EBAC Store**, documentando cenários, ferramentas, resultados, evidências e limitações encontradas durante a execução.

**Documento acadêmico de entrega:** [Trabalho de conclusão: Engenheiro de Qualidade de Software (Word)](Documentacao/Trabalho%20de%20conclusao%20-%20Engenheiro%20de%20Qualidade%20de%20software.docx).

## Visão geral dos resultados

| Frente | Tecnologias | Resultado registrado | Documentação |
| :--- | :--- | :--- | :--- |
| **Web** | Playwright · TypeScript · POM | **5 aprovados / 5** | [UI/README.md](UI/README.md) |
| **API** | Supertest · Jest · JavaScript | Histórico: **5/6 aprovados**; reteste isolado **CT-020 aprovado em 28/10** | [API/README.md](API/README.md) |
| **Mobile (Android)** | WebdriverIO · Appium · TypeScript · Allure | Histórico: **4/5 aprovados, 1 bloqueado**; **CT-022 aprovado em reteste isolado** | [Mobile/README.md](Mobile/README.md) |
| **Performance** | Grafana k6 · JavaScript | **2 cenários aprovados** | [Performance/README.md](Performance/README.md) |
| **Integração contínua** | GitHub Actions · Playwright | **5 testes Web aprovados**, inclusive na reexecução pós-avaliação | [Documentação do CI](Documentacao/ci-github-actions.md) |

> **Importante:** “reprovado” e “bloqueado” são resultados distintos. A falha histórica do CT-020 foi preservada; sua implementação foi corrigida e o cenário passou em reteste isolado em 28/10/2026. Os cinco outros testes de API não foram reexecutados nesse reteste. O cenário Mobile bloqueado não foi considerado aprovado. Os números identificam execuções específicas, não uma execução simultânea de todas as frentes.

## Organização do repositório

```text
TCC-EBAC-QE/
├── .github/
│   └── workflows/
│       └── testes-web.yml
├── API/
│   ├── tests/
│   ├── evidencias/
│   └── README.md
├── UI/
│   ├── pages/
│   ├── tests/
│   └── README.md
├── Mobile/
│   ├── test/
│   ├── evidencias/
│   └── README.md
├── Performance/
│   ├── produtos.js
│   ├── clientes.js
│   ├── evidencias/
│   └── README.md
├── Documentacao/
│   ├── Trabalho de conclusao - Engenheiro de Qualidade de software.docx
│   ├── estrategia-de-testes.md
│   ├── mapa-mental-estrategia.svg
│   └── ci-github-actions.md
├── Evidencias/
│   ├── UI/
│   └── CI/
└── README.md
```

Cada frente mantém seus arquivos de execução e, quando aplicável, evidências e instruções específicas em seu próprio README.

## Atividades desenvolvidas

### 1. Planejamento e estratégia

A documentação reúne a abordagem de testes, escopo, riscos, técnicas, critérios de entrada e saída e a proposta de rastreabilidade entre requisitos, cenários, execução e evidências.

- [Estratégia de testes](Documentacao/estrategia-de-testes.md)
- [Mapa mental da estratégia](Documentacao/mapa-mental-estrategia.svg)

A estratégia e o mapa mental estão alinhados às técnicas, ferramentas e ambientes utilizados nas execuções documentadas.

### 2. Automação Web — Playwright

Automação da **US-0004 — Catálogo de Produtos**, cobrindo listagem, detalhes, busca por produto existente e inexistente e filtro por categoria.

- **Resultado local documentado:** 5 cenários aprovados, sem reprovações.
- **Estrutura:** TypeScript e Page Object Model (POM).
- **Evidência:** [execução Playwright](Evidencias/UI/US-0004/evidencia-ui-001-playwright.png).

[Ver implementação e instruções Web](UI/README.md)

### 3. Testes de API — Supertest e Jest

Automação da **US-0003 — API de Cupons**, incluindo consulta, validação de contrato, cadastro, duplicidade e análise de campos opcionais/obrigatórios.

- **Resultado histórico (19/10/2026):** 5 testes aprovados e 1 reprovado.
- **Melhoria pós-avaliação:** CT-020 foi corrigido para diferenciar o campo obrigatório dos opcionais; **reteste isolado em 28/10/2026: aprovado** (1 passed, 5 skipped por filtragem).
- **CT-020:** o teste exigia rejeição de campos cuja descrição funcional os tratava como opcionais; a reprovação indica divergência de expectativa, não defeito confirmado da API.
- **Evidências:** [relatório histórico Jest](API/evidencias/relatorio-jest-api.png) e [registro do reteste aprovado](API/evidencias/CT-020-reexecucao-2026-10-28.md).

A reprovação foi mantida com interpretação técnica, preservando a rastreabilidade da execução e evitando um falso positivo de defeito.

[Ver implementação e análise do defeito](API/README.md)

### 4. Automação Mobile — Android

Testes funcionais do catálogo no aplicativo **EBAC Store**, usando Appium, WebdriverIO, TypeScript e relatórios Allure.

- **Resultado histórico (19/10/2026):** 4 testes aprovados e 1 cenário bloqueado.
- **Melhoria pós-avaliação:** CT-022 passou a selecionar a Camiseta EBAC explicitamente; **reteste isolado em 27/10/2026 (horário de Brasília): aprovado** (1 passing).
- **CT-025:** o filtro por categoria não pôde ser automatizado de maneira estável no ambiente testado; foi registrado como `skipped`, sem ser tratado como aprovação.
- **Evidências:** [execução histórica Android](Mobile/evidencias/execucao-catalogo-android.png), [relatório Allure](Mobile/evidencias/relatorio-allure-android.png) e [registro do reteste CT-022](Mobile/evidencias/CT-022-reteste-2026-10-28.md).

[Ver implementação e limitações Mobile](Mobile/README.md)

### 5. Performance — Grafana k6

Dois cenários de carga para endpoints autenticados da API local: **consulta de Produtos** e **consulta de Clientes**.

| Métrica | Produtos | Clientes |
| :--- | ---: | ---: |
| VUs máximos | 20 | 20 |
| Duração programada | 2 minutos | 2 minutos |
| Requisições HTTP | 2.209 | 2.210 |
| p95 HTTP | **16,96 ms** | **17,47 ms** |
| Falhas HTTP | 0% | 0% |
| Checks aprovados | 4.398 / 4.398 | 4.400 / 4.400 |
| Resultado | **Aprovado** | **Aprovado** |

**Critérios configurados:** p95 inferior a 1.000 ms e falhas HTTP abaixo de 1%. Os valores incluem autenticação e consulta, e foram obtidos **em ambiente local**, não em produção.

[Ver scripts, relatórios JSON e evidências k6](Performance/README.md)

### 6. Integração contínua — GitHub Actions

Um workflow executa a **suíte Web/Playwright** no GitHub, com instalação de dependências e Chromium, execução dos testes e disponibilização do relatório HTML como artefato.

- **Execução inicial (24/10/2026):** [Success — 5 passed](https://github.com/talytam/TCC-EBAC-QE/actions/runs/40125899136).
- **Reexecução após melhorias (27/10/2026):** [Success — 5 passed](https://github.com/talytam/TCC-EBAC-QE/actions/runs/40614328999), incluindo a validação reforçada do filtro CT-025.
- **Escopo do pipeline:** testes Web; as suítes API, Mobile e Performance não fazem parte desse workflow.
- **Evidências:** [resultado do pipeline](Evidencias/CI/CT-GitHub-Actions-Execucao.png) e [logs dos testes](Evidencias/CI/CT-GitHub-Actions-Testes.png).

[Consultar configuração e documentação do CI](Documentacao/ci-github-actions.md)

## Como reproduzir os testes

Os projetos possuem dependências e ambientes de execução diferentes. Consulte o README de cada pasta para preparação, comandos e massa de teste:

- **Web:** [Playwright](UI/README.md#como-executar)
- **API:** [Supertest/Jest](API/README.md#preparação-e-execução)
- **Mobile:** [WebdriverIO/Appium](Mobile/README.md#pré-requisitos)
- **Performance:** [k6](Performance/README.md#como-executar)
- **CI:** [GitHub Actions](Documentacao/ci-github-actions.md#como-consultar-uma-execução)

Credenciais e variáveis sensíveis devem ser configuradas localmente, conforme os exemplos existentes no projeto. **Não publique senhas, tokens ou arquivos `.env`.**

## Delimitações e critérios de interpretação

Os resultados refletem os ambientes e as datas das execuções registradas. A loja pública e os dados de teste podem mudar; os testes Mobile dependem de emulador e Appium; a suíte de API tem um histórico de divergência de critério corrigida, com reteste isolado aprovado; e a performance foi avaliada apenas com a carga e a duração definidas para o exercício.

As três histórias fornecidas foram detalhadas com critérios Gherkin, cinco histórias adicionais foram elaboradas e **45 casos** foram modelados no documento acadêmico, que reúne resultados, premissas, evidências e interpretação dos achados. O conjunto de testes executados corresponde aos cenários e ambientes apresentados acima; os demais casos foram documentados com sua situação própria, sem atribuição de aprovação indevida.

---

**Projeto acadêmico — EBAC | Engenharia de Qualidade de Software**
