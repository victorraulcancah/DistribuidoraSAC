// Bootstrap file for Laravel + React
import '../css/app.css';

/**
 * Laravel Echo + Pusher JS client para escuchar eventos en tiempo real
 * desde el servidor Reverb (WebSockets).
 *
 *   window.Echo?.channel('catalogo').listen('ProductCreated', (e) => {...})
 *
 * Si Reverb no corre, Echo no se inicializa y la app funciona igual;
 * simplemente deja de recibir eventos en vivo.
 */
const authToken = localStorage.getItem('auth_token');

if (authToken) {
  import('laravel-echo').then(({ default: Echo }) => {
    // eslint-disable-next-line no-undef
    window.Pusher = window.Pusher || undefined;

    Promise.resolve(import('pusher-js')).then(({ default: Pusher }) => {
      window.Pusher = Pusher;

      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        // cambiar por VITE_REVERB_SCHEME=https y 443 para producción
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        auth: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    });
  }).catch((e) => console.warn('Echo no disponible:', e));
}
