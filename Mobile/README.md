# Testes Mobile — TCC EBAC Quality Engineering

Automação de testes funcionais do aplicativo Android **EBAC Store**, como parte do TCC de Quality Engineering da EBAC.

## Tecnologias

- **WebdriverIO**, **TypeScript** e **Mocha**
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

**Última execução registrada:** 19/10/2026 — **4 passing, 1 skipped, 0 failing**; duração total de aproximadamente **2min20s**. O status `skipped` do WebdriverIO corresponde a um cenário **bloqueado**, não aprovado, na documentação de QA.

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
└── evidencias/
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

## Evidências e limitações

O resumo de execução está documentado como **4 aprovados e 1 ignorado**. As capturas da execução e do catálogo devem ser mantidas em `evidencias/` quando incluídas na entrega.

**CT-025 — Bloqueio de ambiente:** o seletor de categorias contém milhares de registros, diversas entradas duplicadas, categorias sem produtos retornados e dificuldades de rolagem até manualmente. Foi encontrada uma categoria com produtos por interação manual, mas não foi possível reproduzir de maneira estável a seleção automatizada. O caso foi preservado como `it.skip` para não representar uma aprovação indevida.

**Massa compartilhada:** produtos e categorias podem mudar no ambiente EBAC. A execução informada comprova apenas o comportamento observado na data do registro.

Não versionar `node_modules/`, APKs, XMLs de inspeção ou logs temporários.
