
require('dotenv').config({ quiet: true });
const request = require('supertest');

const baseUrl = process.env.API_BASE_URL;

describe('US-0003 - API de Cupons', () => {
  test('CT-015 - Consultar cupons e validar contrato', async () => {
    const response = await request(baseUrl)
      .get('/wp-json/wc/v3/coupons')
      .auth(
        process.env.API_CONSUMER_KEY,
        process.env.API_CONSUMER_SECRET
      );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const cupom of response.body) {
      expect(cupom).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          code: expect.any(String),
          amount: expect.any(String),
          discount_type: expect.any(String),
          description: expect.any(String),
        })
      );
    }

    console.log(
      `CT-015 aprovado: ${response.body.length} cupons validados.`
    );
  });
});


test('CT-016 - Consultar cupom por ID', async () => {
  const api = request(baseUrl);
  const usuario = process.env.API_CONSUMER_KEY;
  const senha = process.env.API_CONSUMER_SECRET;

  const listagem = await api
    .get('/wp-json/wc/v3/coupons')
    .auth(usuario, senha);

  expect(listagem.status).toBe(200);
  expect(Array.isArray(listagem.body)).toBe(true);
  expect(listagem.body.length).toBeGreaterThan(0);

  const cupom = listagem.body[0];

  const response = await api
    .get(`/wp-json/wc/v3/coupons/${cupom.id}`)
    .auth(usuario, senha);

  expect(response.status).toBe(200);

  expect(response.body).toEqual(
    expect.objectContaining({
      id: cupom.id,
      code: cupom.code,
      amount: expect.any(String),
      discount_type: expect.any(String),
      description: expect.any(String)
    })
  );

  console.log(
    `CT-016 aprovado: cupom ${response.body.id} consultado.`
  );
});

test('CT-017 - Consultar cupom inexistente', async () => {
  const cupomId = 999999999;

  const response = await request(baseUrl)
    .get(`/wp-json/wc/v3/coupons/${cupomId}`)
    .auth(
      process.env.API_CONSUMER_KEY,
      process.env.API_CONSUMER_SECRET
    );

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('code');
  expect(response.body).toHaveProperty('message');

  console.log('CT-017 aprovado: cupom inexistente tratado corretamente.');
});


test('CT-018 - Cadastrar cupom com dados validos', async () => {
  const novoCupom = {
    code: `tcc-qa-${Date.now()}`,
    amount: '10.00',
    discount_type: 'fixed_product',
    description: 'Cupom criado pelo teste automatizado do TCC EBAC'
  };

  let cupomCriadoId = null;

  try {
    const response = await request(baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .auth(
        process.env.API_CONSUMER_KEY,
        process.env.API_CONSUMER_SECRET
      )
      .send(novoCupom);

    cupomCriadoId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        code: novoCupom.code,
        amount: novoCupom.amount,
        discount_type: novoCupom.discount_type,
        description: novoCupom.description
      })
    );
  } finally {
    if (cupomCriadoId) {
      const exclusao = await request(baseUrl)
        .delete(`/wp-json/wc/v3/coupons/${cupomCriadoId}`)
        .query({ force: true })
        .auth(
          process.env.API_CONSUMER_KEY,
          process.env.API_CONSUMER_SECRET
        );

      expect(exclusao.status).toBe(200);
      expect(exclusao.body.id).toBe(cupomCriadoId);

      console.log(`CT-018: cupom ${cupomCriadoId} removido.`);
    }
  }
});


test('CT-019 - Impedir cadastro de cupom duplicado', async () => {
  const novoCupom = {
    code: `tcc-duplicado-${Date.now()}`,
    amount: '10.00',
    discount_type: 'fixed_product',
    description: 'Teste de unicidade - TCC EBAC'
  };

  let cupomCriadoId = null;

  try {
    const primeiroCadastro = await request(baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .auth(
        process.env.API_CONSUMER_KEY,
        process.env.API_CONSUMER_SECRET
      )
      .send(novoCupom);

    cupomCriadoId = primeiroCadastro.body.id;

    expect(primeiroCadastro.status).toBe(201);

    const segundoCadastro = await request(baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .auth(
        process.env.API_CONSUMER_KEY,
        process.env.API_CONSUMER_SECRET
      )
      .send(novoCupom);

    expect(segundoCadastro.status).toBe(400);
    expect(segundoCadastro.body).toHaveProperty('code');
    expect(segundoCadastro.body).toHaveProperty('message');

    console.log('CT-019: código duplicado rejeitado corretamente.');
  } finally {
    if (cupomCriadoId) {
      const exclusao = await request(baseUrl)
        .delete(`/wp-json/wc/v3/coupons/${cupomCriadoId}`)
        .query({ force: true })
        .auth(
          process.env.API_CONSUMER_KEY,
          process.env.API_CONSUMER_SECRET
        );

      expect(exclusao.status).toBe(200);
      expect(exclusao.body.id).toBe(cupomCriadoId);

      console.log(`CT-019: cupom ${cupomCriadoId} removido.`);
    }
  }
});


test('CT-020 - Validar campo obrigatório e campos opcionais do cupom', async () => {
  const campos = [
    { nome: 'code', obrigatorio: true },
    { nome: 'amount', obrigatorio: false },
    { nome: 'discount_type', obrigatorio: false },
    { nome: 'description', obrigatorio: false }
  ];
  const resultados = [];

  for (const campo of campos) {
    const payload = {
      code: `tcc-campo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount: '10.00',
      discount_type: 'fixed_product',
      description: 'Validação de campos de cupom - TCC EBAC'
    };

    delete payload[campo.nome];
    let idCriado = null;
    let limpeza = 'Não necessária';

    try {
      const response = await request(baseUrl)
        .post('/wp-json/wc/v3/coupons')
        .auth(
          process.env.API_CONSUMER_KEY,
          process.env.API_CONSUMER_SECRET
        )
        .send(payload);

      idCriado = Number.isInteger(response.body?.id)
        ? response.body.id
        : null;

      // Somente code é obrigatório segundo a história US-0003.
      if (campo.obrigatorio) {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            code: expect.any(String),
            message: expect.any(String)
          })
        );
      } else {
        expect(response.status).toBe(201);
        expect(idCriado).not.toBeNull();
        expect(response.body).toEqual(
          expect.objectContaining({
            code: payload.code,
            amount: expect.any(String),
            discount_type: expect.any(String),
            description: expect.any(String)
          })
        );
      }

      resultados.push({
        campo_omitido: campo.nome,
        obrigatorio: campo.obrigatorio,
        http: response.status,
        id: idCriado
      });
    } finally {
      // A limpeza ocorre mesmo quando uma asserção falha.
      if (idCriado !== null) {
        const exclusao = await request(baseUrl)
          .delete(`/wp-json/wc/v3/coupons/${idCriado}`)
          .query({ force: true })
          .auth(
            process.env.API_CONSUMER_KEY,
            process.env.API_CONSUMER_SECRET
          );

        limpeza = exclusao.status === 200 && exclusao.body?.id === idCriado
          ? 'Removido'
          : `Falha HTTP ${exclusao.status}`;

        expect(exclusao.status).toBe(200);
        expect(exclusao.body.id).toBe(idCriado);
      }

      const ultimo = resultados[resultados.length - 1];
      if (ultimo?.campo_omitido === campo.nome) {
        ultimo.limpeza = limpeza;
      }
    }
  }

  console.table(resultados);}, 30000);
