import { cn } from '@/lib/utils';

/**
 * Etiqueta de estado. Los colores son semánticos a propósito (verde = bien,
 * ámbar = atención, rojo = bloqueado), así que no toman el color del sistema.
 */
const TONES = {
  Activo: 'bg-emerald-50 text-emerald-700',
  Registrado: 'bg-emerald-50 text-emerald-700',
  Procesado: 'bg-sky-50 text-sky-700',
  Moroso: 'bg-amber-50 text-amber-700',
  Inactivo: 'bg-zinc-100 text-zinc-600',
  Anulado: 'bg-red-50 text-red-700',
  Suspendido: 'bg-red-50 text-red-700',
};

export default function EstadoTag({ value, className }) {
  if (!value) return <span className="text-zinc-300">—</span>;

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium',
        TONES[value] ?? 'bg-zinc-100 text-zinc-600',
        className
      )}
    >
      {value}
    </span>
  );
}
