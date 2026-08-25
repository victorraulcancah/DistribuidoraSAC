'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Server, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Checkbox } from '@/Components/ui/Checkbox';
import { Card, CardContent, CardFooter } from '@/Components/ui/Card';
import { Label } from '@/Components/ui/Label';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  
  const formRef = useRef(null);
  const toastRef = useRef(null);

  const demoCredentials = {
    email: 'admin@distribuidora.com',
    password: 'password123',
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fillDemo = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setErrors({});
    setDemoMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setAuthState(null);
    
    try {
      const response = await axios.post('/login', {
        email,
        password,
        remember,
      });
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('auth_token', token);
        if (remember) {
          localStorage.setItem('remember_credentials', JSON.stringify({ email }));
        } else {
          localStorage.removeItem('remember_credentials');
        }
        setAuthState({ type: 'success', message: '¡Bienvenido!', user });
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else if (error.response?.status === 401) {
        setAuthState({ type: 'error', message: 'Credenciales inválidas' });
      } else {
        setAuthState({ type: 'error', message: 'Error de conexión. Intente nuevamente.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('remember_credentials');
    setAuthState(null);
    setEmail('');
    setPassword('');
    setRemember(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('remember_credentials');
    if (saved) {
      try {
        const { email: savedEmail } = JSON.parse(saved);
        setEmail(savedEmail);
        setRemember(true);
      } catch (e) {
        localStorage.removeItem('remember_credentials');
      }
    }
  }, []);

  if (authState?.type === 'success') {
    return (
      <Card className="w-full max-w-sm animate-in fade-in slide-in-from-top-1">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-100">¡Bienvenido de vuelta!</h3>
              <p className="text-zinc-500 mt-1">{authState.user?.name || authState.user?.email}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{authState.user?.email}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout} className="w-full">
              Cerrar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm animate-in fade-in slide-in-from-top-1">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
        {authState?.type === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{authState.message}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            placeholder="usuario@empresa.com"
            autoComplete="email"
            icon={Mail}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
              icon={Lock}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            label="Mantener sesión"
          />
          <a href="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ¿Olvidó su contraseña?
          </a>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full group" size="lg">
          Iniciar sesión
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Button>

        <Button 
          type="button" 
          variant="secondary" 
          onClick={fillDemo}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          <Loader2 className="w-5 h-5" />
          Usar credenciales demo
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Server className="w-3 h-3 text-emerald-400" />
            <span className="relative">
              Servidor operativo
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </span>
          </div>
          <span>v2.4.1</span>
        </div>
      </form>
    </Card>
  );
}