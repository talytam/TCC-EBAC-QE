# Testes Mobile — TCC EBAC Quality Engineering

Automação de testes funcionais do aplicativo Android **EBAC Store**, como parte do TCC de Quality Engineering da EBAC.

## Tecnologias

- **WebdriverIO**, **TypeScript** e **Mocha**
- **Allure Reporter** e **Allure Commandline** para relatórios de execução
- **Appium 2** e driver **UiAutomator2**
- **Android Emulator** e **ADB**
- Padrão **Page Object Model (POM)**

## Escopo — US-0004: Catálogo de Produtos

| Caso de teste | Validação | Resultado |
|---|---|---|
| CT-021 | Exibir catálogo com produtos disponíveis | Aprovado |
| CT-022 | Apresentar detalhes do produto selecionado | Aprovado |
| CT-023 | Pesquisar produto existente | Aprovado |
| CT-024 | Retornar lista vazia e mensagem para produto inexistente | Aprovado |
| CT-025 | Filtrar produtos por categoria | **Bloqueado** (`it.skip`) |

**Execução histórica da suíte completa:** 19/10/2026 — **4 passing, 1 skipped, 0 failing**; execução com Allure em aproximadamente **2min57s**. **Reteste posterior do CT-022:** aprovado em 27/10/2026 (horário de Brasília), detalhado a seguir. O status `skipped` do WebdriverIO corresponde a um cenário **bloqueado**, não aprovado, na documentação de QA.

## Melhoria pós-avaliação (27/10/2026)

O **CT-022** foi atualizado para **pesquisar `Camiseta EBAC` e selecionar explicitamente o card cujo `content-desc` contém esse nome**. A seleção está centralizada no Page Object `CatalogoPage.selecionarProdutoPorNome()`.

A mudança elimina a dependência da ordem dos produtos: a tela de detalhes continua validando os valores conhecidos da Camiseta EBAC, mas agora o teste garante que esse foi o produto aberto.

As evidências e contagens de **19/10/2026** continuam preservadas como histórico da suíte anterior à melhoria.

### Reteste do CT-022 — 27/10/2026 (horário de Brasília)

O CT-022 corrigido foi reexecutado no emulador Android com Appium e WebdriverIO, selecionando apenas esse cenário via `--mochaOpts.grep="CT-022"`.

**Resultado: PASS — 1 passing (29,3 s); 1 spec aprovada, 0 falhas.** O processamento completo informado pelo runner foi de aproximadamente **55 segundos**. Foi confirmada a aprovação do cenário que agora seleciona a Camiseta EBAC explicitamente.

[**Registro e transcrição da evidência do reteste CT-022**](evidencias/CT-022-reteste-2026-10-28.md).

**Importante:** somente o CT-022 foi reexecutado nessa ocasião. Os demais casos mantêm os resultados documentados em 19/10/2026, incluindo o **CT-025 bloqueado**.

**Executar apenas CT-022:**

```powershell
npx wdio run ./wdio.conf.ts --mochaOpts.grep="CT-022"
```

## Estrutura

```text
Mobile/
├── test/
│   ├── pageobjects/
│   │   ├── CatalogoPage.ts
│   │   └── DetalhesProdutoPage.ts
│   └── specs/
│       └── catalogo.spec.ts
├── wdio.conf.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── evidencias/
    ├── execucao-catalogo-android.png
    └── relatorio-allure-android.png
```

## Pré-requisitos

1. Node.js e npm; instalar as dependências conforme `package.json`.
2. Android SDK com ADB e um emulador Android.
3. Appium em execução na porta `4723` com driver `uiautomator2` instalado.
4. Aplicativo EBAC Store instalado (`br.com.lojaebac`).
5. Conferir `appium:deviceName` e `appium:udid` em `wdio.conf.ts`. Nos testes registrados foi utilizado `emulator-5554`.

## Executar

Na pasta `Mobile`, com o emulador ativo:

```powershell
npm install
adb devices
appium
```

Em outro terminal:

```powershell
npx wdio run ./wdio.conf.ts
```

Para um cenário específico:

```powershell
npx wdio run ./wdio.conf.ts --mochaOpts.grep="CT-024"
```

A configuração utiliza `appium:noReset: true`, então o estado do app pode persistir entre sessões. Cada cenário encerra e reativa o aplicativo antes da navegação ao catálogo.

## Relatório automatizado — Allure

A execução do WebdriverIO gera os arquivos de resultado em `allure-results/`. Para gerar o relatório HTML e visualizá-lo localmente, execute na pasta `Mobile`:

```powershell
npx wdio run ./wdio.conf.ts
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

**Resultado observado em 19/10/2026:** 5 cenários cadastrados, sendo **4 aprovados e 1 ignorado**. O indicador de **100%** no painel Allure é relativo aos cenários executados; não significa que o CT-025 foi validado.

Os diretórios `allure-results/` e `allure-report/` são gerados localmente e estão no `.gitignore`. O projeto versiona a configuração e as capturas do resultado, não os artefatos temporários.

**Evidências publicadas:** [Execução histórica WebdriverIO](evidencias/execucao-catalogo-android.png) · [Painel Allure histórico](evidencias/relatorio-allure-android.png) · [Registro do reteste aprovado do CT-022](evidencias/CT-022-reteste-2026-10-28.md)

## Evidências e limitações

O resumo de execução está documentado como **4 aprovados e 1 ignorado**. As capturas da execução e do catálogo devem ser mantidas em `evidencias/` quando incluídas na entrega.

**CT-025 — Bloqueio de ambiente:** o seletor de categorias contém milhares de registros, diversas entradas duplicadas, categorias sem produtos retornados e dificuldades de rolagem até manualmente. Foi encontrada uma categoria com produtos por interação manual, mas não foi possível reproduzir de maneira estável a seleção automatizada. O caso foi preservado como `it.skip` para não representar uma aprovação indevida.

**Massa compartilhada:** produtos e categorias podem mudar no ambiente EBAC. A execução informada comprova apenas o comportamento observado na data do registro.

Não versionar `node_modules/`, APKs, XMLs de inspeção ou logs temporários.
