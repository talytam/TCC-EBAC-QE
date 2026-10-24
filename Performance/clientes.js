
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const PASSWORD = __ENV.TEST_PASSWORD;

const USERS = [
  'user1_ebac',
  'user2_ebac',
  'user3_ebac',
  'user4_ebac',
  'user5_ebac',
];

let token = null;

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '1m40s', target: 20 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  if (!PASSWORD) {
    throw new Error('Informe TEST_PASSWORD para executar o teste.');
  }

  const username = USERS[(__VU - 1) % USERS.length];

  if (!token) {
    const login = http.post(
      `${BASE_URL}/api/login`,
      JSON.stringify({
        username,
        password: PASSWORD,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const loginOk = check(login, {
      'login realizado com sucesso': (r) => r.status === 200 || r.status === 201,
    });

    if (!loginOk) {
      sleep(1);
      return;
    }

    token = login.json('accessToken');

    if (!token) {
      throw new Error(`Token nÃ£o recebido para ${username}`);
    }
  }

  const response = http.get(`${BASE_URL}/api/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(response, {
    'status deve ser 200': (r) => r.status === 200,
    'resposta em menos de 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}


