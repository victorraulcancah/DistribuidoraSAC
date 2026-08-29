import { cn } from '@/lib/utils';

/**
 * Tabla básica. Las columnas se declaran como
 * `[{ key, label, align, render }]` y las filas son objetos planos.
 */
export default function SysTable({ columns = [], rows = [], rowKey = 'id', empty, className }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/60">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500',
                  col.align === 'right' ? 'text-right' : 'text-left'
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-zinc-500">
                {empty ?? 'No hay registros para mostrar.'}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row[rowKey]}
                className="border-b border-zinc-100 transition-colors last:border-b-0 hover:bg-[rgb(var(--sys-rgb)/0.05)]"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-2.5 text-zinc-700',
                      col.align === 'right' && 'text-right tabular-nums'
                    )}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
