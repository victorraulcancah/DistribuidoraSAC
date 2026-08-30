import { AlertCircle, TriangleAlert } from 'lucide-react';
import SysModal from './SysModal';
import SysButton from './SysButton';
import { cn } from '@/lib/utils';

/**
 * Confirmación con una sola pregunta: desactivar, activar, eliminar…
 *
 * `tone`: 'danger' (eliminar) | 'warning' (desactivar)
 * `confirmLabel`: texto del botón de acción (por defecto 'Confirmar')
 * `loading`: deshabilita ambos botones mientras se procesa.
 */
export default function SysConfirm({
  show = false,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  tone = 'danger',
  loading = false,
}) {
  const tones = {
    danger: { icon: AlertCircle, class: 'bg-red-50 text-red-600' },
    warning: { icon: TriangleAlert, class: 'bg-amber-50 text-amber-600' },
  };
  const { icon: Icon, class: toneClass } = tones[tone] ?? tones.danger;

  return (
    <SysModal show={show} onClose={loading ? () => {} : onClose} title={title} size="sm">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            toneClass
          )}
        >
          <Icon size={19} />
        </span>
        <div className="min-w-0 pt-1 text-sm leading-relaxed text-zinc-600">{message}</div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <SysButton variant="ghost" type="button" onClick={onClose} disabled={loading}>
          Cancelar
        </SysButton>
        <SysButton
          variant="solid"
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={tone === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : undefined}
        >
          {loading ? 'Procesando…' : confirmLabel}
        </SysButton>
      </div>
    </SysModal>
  );
}
