# Testes automatizados de API — EBAC Shop

Automação da **US-0003 — API de Cupons**, desenvolvida para o TCC de Quality Engineering da EBAC.

## Tecnologias

- **Jest** — execução e asserções dos testes
- **Supertest** — requisições HTTP e validações de respostas
- **Node.js** e **dotenv** — execução e variáveis de ambiente
- **jest-html-reporter** — geração de relatório HTML

## Resultado da execução

Em **19/10/2026**, a suíte registrou **6 testes: 5 aprovados e 1 reprovado**, em **16,141 segundos** (tempo total informado pelo Jest). A reprovação corresponde ao **CT-020 / BUG-004**, que permanece como evidência de comportamento divergente, e não deve ser ocultada.

| ID | Cenário | Resultado |
|---|---|---|
| CT-015 | Consultar lista de cupons e validar contrato | Aprovado |
| CT-016 | Consultar cupom existente por ID | Aprovado |
| CT-017 | Consultar cupom inexistente | Aprovado |
| CT-018 | Cadastrar cupom válido | Aprovado |
| CT-019 | Impedir cadastro de código duplicado | Aprovado |
| CT-020 | Validar campos obrigatórios do cupom | **Reprovado (BUG-004)** |

### Evidência — Relatório HTML do Jest

![Relatório de testes da API com 5 casos aprovados e 1 reprovado](evidencias/relatorio-jest-api.png)

[Visualizar a evidência no repositório](evidencias/relatorio-jest-api.png)

## Defeito identificado — BUG-004

**Descrição:** segundo a especificação adotada no TCC, os campos `code`, `amount`, `discount_type` e `description` são obrigatórios. A API, porém, permite o cadastro sem três deles.

| Campo ausente | HTTP observado |
|---|---|
| `code` | 400 |
| `amount` | 201 |
| `discount_type` | 201 |
| `description` | 201 |

O CT-020 permanece reprovado porque valida o requisito definido para o projeto. Valores padrão do WooCommerce podem explicar parte do comportamento, mas não eliminam a divergência em relação à especificação testada.

## Preparação e execução

Na pasta `API`, instale as dependências:

```powershell
npm ci
```

Copie `.env.example` para `.env` e configure os dados de acesso de teste. **Não publique o arquivo `.env`.**

Para executar a suíte completa e gerar o relatório HTML:

```powershell
npm test
```

Para abrir o relatório produzido:

```powershell
Start-Process .\test-report.html
```

Para executar apenas um cenário:

```powershell
npx jest tests/cupons.test.js --runInBand -t "CT-015"
```

O Jest mantém a saída padrão no terminal e gera o arquivo `test-report.html` por meio do `jest-html-reporter`. O HTML gerado é ignorado no Git; a captura de tela fica versionada em `evidencias/`.

**Atenção:** CT-018, CT-019 e CT-020 criam cupons no ambiente remoto. A automação utiliza códigos exclusivos e tenta remover os registros criados ao concluir os testes, em condições normais de execução.

## Organização e segurança

- `tests/cupons.test.js` — testes automatizados da US-0003
- `package.json` — comandos e configuração dos reporters
- `evidencias/relatorio-jest-api.png` — captura do relatório
- `.env.example` — modelo de variáveis de ambiente, sem credenciais reais
- `.gitignore` — exclusão de credenciais, dependências e relatórios temporários

**Projeto principal:** [TCC-EBAC-QE](https://github.com/talytam/TCC-EBAC-QE)
