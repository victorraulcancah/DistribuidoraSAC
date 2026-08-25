import LoginForm from './LoginForm';

export default function LeftColumn() {
  return (
    <div className="relative w-full lg:w-[46%] min-h-screen bg-white flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgb(255,255,255)_0%,_rgb(248,250,252)_100%)]" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <header className="p-8 lg:p-12 flex items-center gap-4">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-400 flex items-center justify-center shadow-lg shadow-zinc-400/20">
            <svg className="w-8 h-8 lg:w-9 lg:h-9 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-wider uppercase">Distribuidora SAC</h1>
            <p className="text-zinc-500 mt-1 text-sm lg:text-base tracking-wide uppercase">Sistema de Gestión Integral</p>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-8">
          <LoginForm />
        </main>

        <footer className="px-8 lg:px-12 pb-8 text-center">
          <p className="text-zinc-500 text-sm">
            © 2024 Distribuidora SAC. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}