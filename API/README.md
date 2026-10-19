\# Testes Automatizados de API — EBAC Shop



\## Objetivo



Automatizar os testes da \*\*US-0003 — API de Cupons\*\*, utilizando \*\*Supertest\*\* e \*\*Jest\*\*, para validar consultas, cadastro, unicidade dos códigos e obrigatoriedade dos campos.



\## Tecnologias



\- Node.js

\- Jest

\- Supertest

\- dotenv



\## Configuração do ambiente



Na pasta `API`, instale as dependências:



```bash

npm install

```



Copie o arquivo `.env.example` para `.env` e preencha as variáveis de configuração e autenticação com os valores fornecidos no material da atividade.



O arquivo `.env` contém informações sensíveis e não deve ser publicado no repositório.



\## Execução



Para executar todos os testes:



```bash

npm test

```



Para executar um caso específico:



```bash

npx jest tests/cupons.test.js --runInBand -t "CT-015"

```



\*\*Atenção:\*\* os testes CT-018, CT-019 e CT-020 realizam requisições de criação de cupons em um ambiente remoto. Os registros identificados são removidos automaticamente após as validações, em condições normais de execução.



\## Casos de teste



| ID | Cenário | Resultado observado |

|---|---|---|

| CT-015 | Consultar lista de cupons e validar contrato | Aprovado |

| CT-016 | Consultar cupom existente por ID | Aprovado |

| CT-017 | Consultar cupom inexistente | Aprovado |

| CT-018 | Cadastrar cupom válido | Aprovado |

| CT-019 | Impedir código duplicado | Aprovado |

| CT-020 | Validar campos obrigatórios | Reprovado |



\## Defeito identificado — BUG-004



\*\*Descrição:\*\* a API permite cadastrar cupons sem determinados campos definidos como obrigatórios na US-0003.



\*\*Resultado esperado:\*\* requisições sem `code`, `amount`, `discount\_type` ou `description` devem ser rejeitadas.



\*\*Resultado observado:\*\*



\- Ausência de `code`: HTTP 400.

\- Ausência de `amount`: HTTP 201.

\- Ausência de `discount\_type`: HTTP 201.

\- Ausência de `description`: HTTP 201.



A divergência foi reproduzida durante a execução automatizada.



\*\*Observação:\*\* o CT-020 permanece reprovado intencionalmente, pois a automação preserva a validação do requisito. O comportamento pode estar relacionado aos valores padrão do WooCommerce, mas não atende integralmente à especificação utilizada no TCC.



\## Estratégia de testes



Foram utilizados cenários positivos, negativos e validações de contrato da resposta JSON.



Os testes de criação utilizam códigos exclusivos e implementam limpeza automática dos registros criados, reduzindo interferências entre execuções.



\## Segurança



As credenciais são carregadas por variáveis de ambiente. O arquivo `.env` e as dependências locais são excluídos do versionamento por meio do `.gitignore`.

