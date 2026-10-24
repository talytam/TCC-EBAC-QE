# Estratégia de testes: EBAC Shop

**Projeto:** TCC do curso Profissão Engenheiro de Qualidade de Software, EBAC  
**Sistemas avaliados:** EBAC Shop (Web e API WooCommerce), EBAC Store (Android) e EBAC Demo Store API (carga local)  
**Período das execuções documentadas:** outubro de 2026  
**Responsável:** autora do TCC

## 1. Objetivo

Aplicar uma estratégia de Quality Engineering baseada em riscos para avaliar requisitos de negócio, identificar desvios observáveis, automatizar fluxos relevantes e registrar resultados reproduzíveis. A estratégia combina análise antecipada, técnicas de teste, investigação exploratória, automação e integração contínua.

## 2. Escopo e critérios de cobertura

O exercício contempla oito histórias: **US-0001** (carrinho), **US-0002** (login), **US-0003** (API de cupons) e cinco histórias elaboradas para o projeto, **US-0004 a US-0008** (catálogo, Minha Conta, pedidos, endereços e detalhes da conta).

Foram modelados **45 casos de teste**, incluindo fluxos principais, alternativos e negativos. O documento principal do TCC apresenta as pré-condições, os procedimentos, os resultados esperados, as classificações da execução manual e os candidatos à automação.

A **automação Web** cobre CT-021 a CT-025 do catálogo; a **automação Android** executou CT-021 a CT-024 e registrou CT-025 como bloqueado; a **API WooCommerce** cobre CT-015 a CT-020; a **performance** cobre duas consultas autenticadas da EBAC Demo Store API.

A execução exploratória não equivale à execução integral dos 45 casos. As distinções entre aprovado, reprovado, bloqueado e não executado permanecem registradas no documento acadêmico.

## 3. Abordagem e fases

1. **Análise de requisitos:** interpretação das regras das histórias fornecidas, levantamento de premissas e especificação de comportamentos observáveis.
2. **Critérios de aceitação:** cenários em Gherkin para US-0001, US-0002 e US-0003, com cobertura de condições normais e negativas.
3. **Modelagem:** definição de identificadores CT, pré-condições, passos, resultados esperados, técnicas e indicação de automação.
4. **Investigação exploratória:** observação da EBAC Shop, uso de contas e produtos de teste, registro de comportamento e evidências.
5. **Automação:** Playwright/TypeScript para Web, Supertest/Jest para API e WebdriverIO/Appium para Android, utilizando Page Object Model quando aplicável.
6. **Desempenho:** k6 com 20 VUs, ramp-up de 20 segundos e duração programada de dois minutos em dois cenários.
7. **Integração contínua:** GitHub Actions para execução automatizada dos cinco casos Web, com relatório HTML como artefato.
8. **Consolidação:** comparação dos resultados com os critérios, documentação das restrições de ambiente e rastreabilidade no Word e no repositório.

## 4. Níveis, tipos e técnicas

- **Níveis:** sistema para os fluxos Web e Android; testes de serviço/contrato em API; teste de carga sobre API local.
- **Tipos:** funcional, exploratório, regressão, contrato de API e desempenho.
- **Técnicas:** partição de equivalência, valor-limite, tabela de decisão, transição de estados, suposição de erros e testes baseados em riscos.
- **Padrões e organização:** Page Object Model nos testes de interface, centralização de configurações, variáveis de ambiente para credenciais, identificadores CT/US e registros de execução.

## 5. Ambientes, ferramentas e evidências

| Frente | Ambiente e tecnologia | Registro |
| :--- | :--- | :--- |
| Web | EBAC Shop pública; Playwright, TypeScript e Chromium | [UI](../UI/README.md), 5/5 aprovados |
| API | WooCommerce da EBAC Shop; Jest e Supertest | [API](../API/README.md), 5 aprovados e 1 reprovado na suíte registrada |
| Android | EBAC Store, emulador Android, Appium e WebdriverIO | [Mobile](../Mobile/README.md), 4 aprovados e 1 bloqueado |
| Performance | EBAC Demo Store API local, NestJS/PostgreSQL/Docker e k6 | [Performance](../Performance/README.md), 2 cenários aprovados |
| Integração contínua | GitHub Actions, Linux, Node.js e Playwright | [CI](ci-github-actions.md), 5 testes Web aprovados |

A estratégia usa **ambientes diferentes para finalidades diferentes**. Os números obtidos em performance local não representam o desempenho do site público nem do aplicativo Android.

## 6. Critérios de entrada e de conclusão

**Entrada:** acesso ao ambiente correspondente, condição inicial reproduzível, dados de teste, regra ou comportamento esperado documentado e ferramenta disponível.

**Conclusão do exercício:** cenários automatizados executados e relatados com evidências; resultados manuais documentados com sua situação real; limitações de massa e ambiente identificadas; achados distinguindo defeito confirmado de divergência de hipótese; código e relatório acadêmico versionados.

Um resultado reprovado ou bloqueado não é convertido em aprovado apenas para melhorar a apresentação do projeto.

## 7. Riscos, controles e delimitações

| Risco | Controle adotado |
| :--- | :--- |
| Dados e elementos da loja compartilhada mudarem | Utilizar massas de teste identificáveis e registrar data/ambiente |
| Requisito de cupom ambíguo | Registrar a divergência entre descrição textual, expectativa do CT-020 e resposta real, sem atribuir causa técnica não comprovada |
| Conta de teste ser bloqueada ou alterada | Isolar credenciais, controlar tentativas, não publicar segredos |
| Bloqueio de categoria no Android | Conservar CT-025 como `skipped` e documentar limitação de massa/interface |
| Falso positivo de automação | Asserções de status, estrutura e conteúdo, testes independentes e logs |
| Resultado de carga não generalizável | Relatar VUs, duração, percentis, taxa de falhas e ambiente local |
| Dependências externas no CI | Restringir workflow à suíte Web executável no runner; disponibilizar HTML de evidência |

## 8. Resultados consolidados

- **Web:** cinco testes Playwright aprovados localmente e na primeira execução do GitHub Actions.
- **API:** cinco testes aprovados; CT-020 reprovado devido à expectativa de rejeição para campos que a descrição da história trata como opcionais. Esse resultado revela uma **inconsistência a ser interpretada na especificação/teste**, não comprova isoladamente um defeito da API.
- **Android:** quatro testes aprovados; CT-025 bloqueado por limitações na seleção estável de categoria.
- **Performance:** Produtos com p95 de 16,96 ms e Clientes com p95 de 17,47 ms nos JSONs versionados, 0% de falhas HTTP em ambos, 20 VUs e dois minutos de carga programada.
- **Investigação manual:** identificados os achados BUG-001 e BUG-002 (regras do carrinho) e BUG-003 (bloqueio de login) frente às regras adotadas no TCC.

A apresentação detalhada de critérios Gherkin, 45 casos modelados e suas classificações de execução consta no **documento principal do TCC**. Este arquivo sintetiza a estratégia efetivamente aplicada; não substitui o relatório acadêmico.
