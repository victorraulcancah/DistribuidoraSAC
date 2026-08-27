import { Home } from 'lucide-react';
import { getSystem } from '@/data/systems';
import SystemThemeProvider from './SystemThemeProvider';
import SysBadge from '@/Components/sys/SysBadge';
import SysButton from '@/Components/sys/SysButton';
import { SysIconTile } from '@/Components/sys/SysSurface';

export default function SystemPanel({ systemId, onExit }) {
  const sys = getSystem(systemId);
  const Icon = sys?.icon;

  return (
    <SystemThemeProvider
      system={sys}
      className="flex min-h-dvh w-full flex-col items-center justify-center bg-white p-8 font-sans antialiased"
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <SysIconTile className="mb-5 h-16 w-16 rounded-2xl">
          {Icon && <Icon size={30} />}
        </SysIconTile>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{sys?.id}</h1>
        <p className="mt-1.5 text-sm text-zinc-500">{sys?.full}</p>

        <SysBadge className="mt-4">{sys?.modules} módulos</SysBadge>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
          Este sistema está en construcción. Pronto encontrarás aquí sus módulos operativos.
        </p>

        <SysButton variant="solid" size="lg" onClick={onExit} className="mt-8">
          <Home size={16} />
          Inicio
        </SysButton>
      </div>
    </SystemThemeProvider>
  );
}
