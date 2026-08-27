import { Home } from 'lucide-react';
import { systems } from '@/data/systems';

export default function SystemPanel({ systemId, onExit }) {
  const sys = systems.find((s) => s.id === systemId);
  const Icon = sys?.icon;

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-white p-8 font-sans antialiased">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
          <Icon size={30} className="text-zinc-700" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{sys?.id}</h1>
        <p className="mt-1.5 text-sm text-zinc-500">{sys?.full}</p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
          Este sistema está en construcción. Pronto encontrarás aquí sus{' '}
          {sys?.modules} módulos operativos.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50"
        >
          <Home size={16} />
          Inicio
        </button>
      </div>
    </div>
  );
}
