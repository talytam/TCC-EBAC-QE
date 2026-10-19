# Estratégia de Testes — EBAC Shop

**Projeto:** TCC — Profissão Engenheiro de Qualidade de Software (EBAC)  
**Sistema sob teste:** EBAC Shop (e-commerce)  
**Versão:** 0.1 — planejamento inicial  
**Status:** Em elaboração; ferramentas e ambiente de execução sujeitos à confirmação

## 1. Objetivo

Planejar e orientar a validação funcional e não funcional do e-commerce EBAC Shop, identificando riscos de qualidade, verificando regras de negócio e documentando resultados e defeitos com rastreabilidade entre histórias, critérios de aceitação, casos e evidências.

## 2. Escopo

**Histórias fornecidas:** US-0001 (adicionar item ao carrinho), US-0002 (login na plataforma) e US-0003 (API de cupons).

**Histórias a elaborar:** Catálogo de Produtos, Painel Minha Conta, Meus Pedidos, Endereços e Detalhes da Conta.

**Plataformas exigidas pelo TCC:** interface web, API e mobile. Os fluxos específicos a automatizar serão definidos após análise dos requisitos e viabilidade dos ambientes.

**Fora de escopo neste momento:** testes de produção, pagamentos reais e funcionalidades sem requisitos ou acesso confirmado.

## 3. Abordagem

- **Shift-left:** analisar histórias e regras antes de executar; registrar dúvidas e premissas separadamente de defeitos.
- **Testes manuais/exploratórios:** observar fluxos, mensagens, limites e inconsistências.
- **Testes automatizados:** selecionar fluxos repetitivos, relevantes e estáveis, contemplando ao menos um cenário principal e um alternativo conforme o enunciado.
- **Testes não funcionais:** elaborar e executar testes de performance conforme etapa específica do TCC; registrar ambiente, carga e resultados.
- **Rastreabilidade:** história → critério de aceitação → caso de teste → execução → evidência/defeito.

## 4. Níveis, tipos e técnicas

**Nível principal:** sistema; verificações de API em nível de serviço e integração quando aplicáveis.

**Tipos:** funcional, regressão, exploratório, contrato de API, desempenho e verificações básicas de usabilidade e responsividade conforme escopo.

**Técnicas:** partição de equivalência, análise de valor-limite, tabela de decisão, transição de estados (quando aplicável), testes baseados em riscos e suposição de erros.

**Cobertura esperada:** fluxo principal, fluxos alternativos e negativos, limites e combinações relevantes.

## 5. Etapas de execução

1. Analisar o enunciado, as histórias e eventuais ambiguidades.
2. Consolidar a estratégia e produzir mapa mental.
3. Definir critérios de aceitação em Gherkin para US-0001, US-0002 e US-0003 (mínimo quatro por história).
4. Criar as cinco novas histórias solicitadas.
5. Modelar ao menos quatro casos de teste por história, identificando candidatos à automação.
6. Preparar ambiente e massas de teste.
7. Executar testes manuais/exploratórios e registrar evidências/defeitos.
8. Implementar automação web, API e mobile conforme o enunciado; em API utilizar Supertest e validar contratos.
9. Executar testes de performance com k6 e configurar pipeline de CI conforme exigências.
10. Consolidar resultados, limitações e documentação final no formato solicitado pela EBAC.

## 6. Ferramentas e ambientes

| Uso | Ferramenta/ambiente | Situação |
| --- | --- | --- |
| Gestão de versões e evidências | GitHub — `talytam/TCC-EBAC-QE` | Disponível |
| E-commerce | `http://lojaebac.ebaconline.art.br/` | Acesso utilizado em investigação inicial |
| Ambiente local alternativo | Imagens Docker da EBAC Shop e banco fornecidas no enunciado | Não validado |
| Automação web | Framework a escolher após comparar pelo menos três opções | Pendente |
| Automação de API | Supertest (obrigatório no enunciado) | Planejado |
| Automação mobile | Ferramenta e dispositivo/ambiente a definir | Pendente |
| Performance | k6 | Planejado |
| CI | GitHub Actions | Planejado |
| Mapa mental | Ferramenta a definir; exportar imagem para o documento | Pendente |

Não pressupor disponibilidade de dados, endpoints, dispositivos ou ambiente Docker antes de verificá-los.

## 7. Papéis e responsabilidades

**Responsável pela execução do TCC:** estudante autora do projeto — estratégia, modelagem, automação, execução, registro dos achados e entrega.

**Tutor(a) EBAC:** avaliação da entrega conforme requisitos do curso; não considerado executor dos testes.

## 8. Riscos e mitigação

| Risco | Tratamento |
| --- | --- |
| Requisitos ambíguos ou incompletos | Registrar dúvida, premissa e impacto; não inventar comportamento esperado |
| Instabilidade/indisponibilidade da loja pública | Registrar impedimento e avaliar execução com Docker |
| Massa inconsistente ou dependência entre cenários | Preparar dados e restaurar estado antes de cada teste |
| Falsos positivos em automação | Esperas por condições, asserções objetivas e isolamento |
| Dependência de serviços externos | Documentar limitações e diferenciar falha ambiental de defeito |
| Alterações não controladas no ambiente compartilhado | Usar produtos e contas de teste e evitar ações irreversíveis |

## 9. Critérios de entrada e saída

**Entrada:** histórias/regras acessíveis, ambiente operante, massas disponíveis e passos/resultado esperado definidos.

**Saída:** casos planejados executados ou marcados como bloqueados/não executados com justificativa; defeitos e evidências rastreáveis; relatórios das automações, performance e CI anexados; limitações explicitadas. Não exigir ausência total de defeitos para concluir um exercício cujo propósito também é identificá-los.

## 10. Achados preliminares — US-0001

Investigação manual inicial em 18/10/2026, a consolidar em registros próprios:

- Inclusão de uma unidade do produto `Torque Power Short – 32, Gray` por R$ 32,50: comportamento observado como esperado.
- Foi possível chegar a 53 unidades do mesmo produto, apesar da regra de máximo 10.
- A página do carrinho também aceitou a atualização de 10 para 11 unidades, recalculando o valor para R$ 357,50.
- Foi observado um subtotal de R$ 1.722,50, apesar da regra de limite de R$ 990,00.
- O carrinho oferece campo para código de cupom; ainda não foi esclarecido se os descontos previstos dependem de cupom ou são automáticos.

**Status:** evidências visuais recebidas na conversa; ainda pendente organizar e adicionar ao repositório. Não considerar a US-0001 integralmente validada.

## 11. Pendências e decisões

- Confirmar escopo e ferramentas de automação web/mobile, após consultar o restante do enunciado.
- Elaborar o mapa mental correspondente a esta estratégia e inseri-lo no documento de entrega.
- Esclarecer se R$ 990,00 é limite antes ou depois de desconto.
- Esclarecer geração/aplicação de cupons de 10% e 15%, inclusive faixas e limites.
- Elaborar e salvar os critérios Gherkin e os casos em arquivos dedicados.
- Definir massa de testes e registrar evidências com nomenclatura consistente.
