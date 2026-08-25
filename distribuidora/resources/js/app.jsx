import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// La vista blade del login monta React por su cuenta y no expone el div de Inertia,
// así que solo arrancamos Inertia cuando la página realmente lo es.
if (document.getElementById('app')?.dataset.page) {
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
}

if (document.getElementById('login-page')) {
  import('./Pages/Login').then(({ default: Login }) => {
    const root = createRoot(document.getElementById('login-page'));
    root.render(<Login />);
  });
}
