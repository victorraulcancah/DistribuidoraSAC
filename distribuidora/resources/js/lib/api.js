import axios from 'axios';

/**
 * Cliente HTTP centralizado. Inyecta el JWT guardado en localStorage y
 * normaliza la respuesta de la API en `{ data, pagination }` o lanza
 * `{ message, errors }`.
 */

const client = axios.create({
  baseURL: '/api',
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Token vencido o inválido: se limpia y se vuelve al login.
      localStorage.removeItem('auth_token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/** Devuelve `{ message, errors }` legibles desde un error de Axios. */
export function unwrapError(error) {
  const body = error?.response?.data ?? {};
  return {
    message: body.message || 'Ocurrió un error al procesar la solicitud',
    errors: body.errors ?? {},
  };
}

/** Extrae el payload `data` de una respuesta de la API. */
async function unwrapResponse(promise) {
  const { data } = await promise;
  return {
    data: data.data,
    pagination: data.pagination,
  };
}

export const api = {
  get: (url, params) => unwrapResponse(client.get(url, { params })),
  post: (url, body) => unwrapResponse(client.post(url, body)),
  put: (url, body) => unwrapResponse(client.put(url, body)),
  patch: (url, body) => unwrapResponse(client.patch(url, body)),
  delete: (url) => unwrapResponse(client.delete(url)),
};
