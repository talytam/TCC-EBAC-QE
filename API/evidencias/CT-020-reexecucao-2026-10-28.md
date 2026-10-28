# Evidência de reteste — CT-020 (28/10/2026)

**História:** US-0003 — API de cupons  
**Cenário:** CT-020 — Validar campo obrigatório e campos opcionais do cupom  
**Ambiente:** EBAC Shop, execução local com Jest + Supertest  
**Motivo do reteste:** correção de expectativa após feedback do tutor; ampliação do timeout do cenário para 30 segundos.

## Comando executado

```powershell
npx jest tests/cupons.test.js --runInBand -t "CT-020"
```

## Resultado observado

**PASS — 1 teste aprovado, 0 reprovados, 5 ignorados por filtragem da suíte.**  
Tempo total informado pelo Jest: **6,036 s**. Execução do CT-020: **5.340 ms**.

| Campo omitido | Obrigatório | Status HTTP | ID criado | Limpeza |
|---|---|---|---|---|
| `code` | Sim | 400 | Nenhum | Não necessária |
| `amount` | Não | 201 | 12513 | Removido |
| `discount_type` | Não | 201 | 12514 | Removido |
| `description` | Não | 201 | 12515 | Removido |

Os quatro resultados estão de acordo com o requisito modelado: apenas `code` é obrigatório. Os três cupons cadastrados durante o reteste foram excluídos.

**Fonte da evidência:** saída de terminal enviada pela responsável pelos testes em 28/10/2026. Esta página transcreve os resultados observados; não substitui o arquivo de captura de tela nem representa uma reexecução da suíte completa.

## Histórico e rastreabilidade

- **19/10/2026:** suíte completa com cinco aprovações e uma reprovação do CT-020, causada pela expectativa inadequada de rejeição de campos opcionais; relatório histórico preservado em [`relatorio-jest-api.png`](./relatorio-jest-api.png).
- **Primeira tentativa de reteste:** requisições responderam conforme esperado, mas o cenário ultrapassou o timeout original de 5 segundos do Jest.
- **28/10/2026:** após elevar o timeout do CT-020 para 30 segundos, o cenário foi reexecutado e **aprovado**.

**Limitação:** os CT-015 a CT-019 apareceram como `skipped` devido ao filtro `-t "CT-020"`. Não foram reexecutados nesta evidência.
