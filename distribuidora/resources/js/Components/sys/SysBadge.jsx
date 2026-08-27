import { cn } from '@/lib/utils';

/**
 * Etiqueta con el color del sistema activo.
 *
 * `tone`:
 *  - 'soft'  → fondo translúcido del color, texto oscurecido. Sobre blanco.
 *  - 'solid' → color pleno, texto contrastado automáticamente.
 *  - 'onColor' → para usar ENCIMA de una superficie ya coloreada.
 */
export default function SysBadge({ tone = 'soft', className, children, ...props }) {
  const tones = {
    soft: 'bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-ink-rgb))] border-[rgb(var(--sys-rgb)/0.35)]',
    solid: 'bg-[rgb(var(--sys-rgb))] text-[var(--sys-on)] border-transparent',
    onColor: 'bg-[rgb(var(--sys-on-rgb)/0.2)] text-[var(--sys-on)] border-[rgb(var(--sys-on-rgb)/0.3)]',
  };

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
