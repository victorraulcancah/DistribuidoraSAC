import { useState, useEffect } from 'react';
import axios from 'axios';
import LeftColumn from '@/Components/auth/LeftColumn';
import RightColumn from '@/Components/carousel/RightColumn';
import SystemsHome from '@/Components/systems/SystemsHome';
import SystemPanel from '@/Components/systems/SystemPanel';

const SYSTEM_KEY = 'active_system';

export default function Login() {
  const [user, setUser] = useState(null);
  const [systemId, setSystemId] = useState(() => localStorage.getItem(SYSTEM_KEY));
  // Mientras validamos el token guardado no sabemos si hay sesión: sin esto,
  // al recargar se vería un parpadeo del login antes de restaurarla.
  const [restoring, setRestoring] = useState(() => Boolean(localStorage.getItem('auth_token')));

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    let cancelled = false;

    axios
      .get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (cancelled) return;
        setUser((data.data ?? data).user ?? null);
      })
      .catch(() => {
        // Token vencido o inválido: se descarta y vuelve al login.
        if (cancelled) return;
        localStorage.removeItem('auth_token');
        localStorage.removeItem(SYSTEM_KEY);
        setSystemId(null);
      })
      .finally(() => {
        if (!cancelled) setRestoring(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const enterSystem = (id) => {
    localStorage.setItem(SYSTEM_KEY, id);
    setSystemId(id);
  };

  const exitSystem = () => {
    localStorage.removeItem(SYSTEM_KEY);
    setSystemId(null);
  };

  const logout = () => {
    localStorage.removeItem(SYSTEM_KEY);
    setSystemId(null);
    setUser(null);
  };

  if (restoring) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-white">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600" />
      </div>
    );
  }

  if (user && systemId) {
    return (
      <SystemPanel
        key={systemId}
        systemId={systemId}
        user={user}
        onExit={exitSystem}
        onLogout={logout}
        onSwitchSystem={enterSystem}
      />
    );
  }

  if (user) {
    return <SystemsHome user={user} onEnter={enterSystem} onLogout={logout} />;
  }

  return (
    <div className="flex min-h-dvh w-full bg-white font-sans antialiased">
      <LeftColumn onLogin={setUser} />
      <RightColumn />
    </div>
  );
}
