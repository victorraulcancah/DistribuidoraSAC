import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, LogOut } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Checkbox } from '@/Components/ui/Checkbox';
import { Label } from '@/Components/ui/Label';

const DEMO = { email: 'admin@distribuidora.com', password: 'password123' };

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('remember_credentials');
    if (!saved) return;
    try {
      setEmail(JSON.parse(saved).email ?? '');
    } catch {
      localStorage.removeItem('remember_credentials');
    }
  }, []);

  const validate = () => {
    const next = {};
    if (!email) next.email = 'Ingresa tu correo.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Ese correo no parece válido.';
    if (!password) next.password = 'Ingresa tu contraseña.';
    else if (password.length < 8) next.password = 'Debe tener al menos 8 caracteres.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password, remember });
      if (data.token) localStorage.setItem('auth_token', data.token);
      if (remember) localStorage.setItem('remember_credentials', JSON.stringify({ email }));
      else localStorage.removeItem('remember_credentials');
      setUser(data.user ?? null);
      setStatus({ type: 'success', message: 'Bienvenido de vuelta. Redirigiendo al panel...' });
    } catch (err) {
      if (err.response?.status === 422 && err.response.data?.errors) {
        const raw = err.response.data.errors;
        setErrors(
          Object.fromEntries(
            Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
          )
        );
      } else {
        setStatus({
          type: 'error',
          message: err.response?.data?.message ?? 'No se pudo conectar con el servidor.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setStatus(null);
    setPassword('');
  };

  const fillDemo = () => {
    setEmail(DEMO.email);
    setPassword(DEMO.password);
    setErrors({});
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Inicia sesión</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
          Un solo acceso para ventas, almacén, despacho y RR. HH.
        </p>
      </div>

      {status && (
        <div
          role="status"
          className={`mb-5 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${
            status.type === 'error'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {status.type === 'error' ? (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950">
              <span className="text-sm font-semibold text-white">
                {(user.name ?? user.email ?? '?').charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>
          <Button variant="secondary" size="lg" onClick={handleLogout} className="w-full">
            <LogOut size={16} />
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              icon={Mail}
              value={email}
              error={errors.email}
              disabled={loading}
              placeholder="nombre@empresa.com"
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <a
                href="/forgot-password"
                className="text-xs text-zinc-400 transition-colors hover:text-blue-600"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                icon={Lock}
                value={password}
                error={errors.password}
                disabled={loading}
                placeholder="••••••••"
                className="pr-10"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 transition-colors hover:text-blue-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
          </div>

          <Checkbox
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            label="Mantener sesión iniciada en este equipo"
          />

          <Button type="submit" size="lg" isLoading={loading} className="w-full">
            Ingresar al panel
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Button>

          <p className="border-t border-zinc-100 pt-4 text-center text-[11px] text-zinc-400">
            ¿Solo quieres echar un vistazo?{' '}
            <button
              type="button"
              onClick={fillDemo}
              className="font-medium text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 hover:underline"
            >
              Usar credenciales de prueba
            </button>
          </p>
        </form>
      )}

      {/* módulos, visibles solo donde la columna derecha no se muestra */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-5 lg:hidden">
        {['ERP', 'WMS', 'TMS', 'RRHH'].map((m) => (
          <span
            key={m}
            className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] font-semibold tracking-wide text-zinc-500"
          >
            {m}
          </span>
        ))}
      </div>
    </>
  );
}
