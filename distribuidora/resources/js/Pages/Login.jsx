import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LeftColumn from '@/Components/auth/LeftColumn';
import RightColumn from '@/Components/carousel/RightColumn';
import SystemsHome from '@/Components/systems/SystemsHome';
import SystemPanel from '@/Components/systems/SystemPanel';
import { firstModule } from '@/data/modules';
import { readRoute, pushRoute, replaceRoute } from '@/lib/router';

export default function Login() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(readRoute);
  // Mientras validamos el token guardado no sabemos si hay sesión: sin esto,
  // al recargar se vería un parpadeo del login antes de restaurarla.
  const [restoring, setRestoring] = useState(() => Boolean(localStorage.getItem('auth_token')));

  // El botón atrás del navegador cambia la vista en vez de salir del sitio.
  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = useCallback((next) => {
    pushRoute(next);
    setRoute(next);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    let cancelled = false;

    axios
      .get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (!cancelled) setUser((data.data ?? data).user ?? null);
      })
      .catch(() => {
        // Token vencido o inválido: se descarta y vuelve al login.
        if (cancelled) return;
        localStorage.removeItem('auth_token');
        setRoute({ view: 'login' });
        replaceRoute({ view: 'login' });
      })
      .finally(() => {
        if (!cancelled) setRestoring(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = (nextUser) => {
    setUser(nextUser);
    go({ view: 'home' });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    go({ view: 'login' });
  };

  const enterSystem = (systemId) =>
    go({ view: 'panel', systemId, moduleId: firstModule(systemId) });

  const selectModule = (moduleId) =>
    go({ view: 'panel', systemId: route.systemId, moduleId });

  if (restoring) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-white">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600" />
      </div>
    );
  }

  // Sin sesión no se puede estar en ninguna vista interna.
  if (!user) {
    if (route.view !== 'login') replaceRoute({ view: 'login' });
    return (
      <div className="flex min-h-dvh w-full bg-white font-sans antialiased">
        <LeftColumn onLogin={handleLogin} />
        <RightColumn />
      </div>
    );
  }

  if (route.view === 'panel') {
    const moduleId = route.moduleId ?? firstModule(route.systemId);
    return (
      <SystemPanel
        systemId={route.systemId}
        activeModule={moduleId}
        onSelectModule={selectModule}
        user={user}
        onExit={() => go({ view: 'home' })}
        onLogout={logout}
        onSwitchSystem={enterSystem}
      />
    );
  }

  // Con sesión iniciada, /login no tiene sentido: se corrige a /inicio.
  if (route.view === 'login') replaceRoute({ view: 'home' });

  return <SystemsHome user={user} onEnter={enterSystem} onLogout={logout} />;
}
