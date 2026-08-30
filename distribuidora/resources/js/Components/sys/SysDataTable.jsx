import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Eye,
  Filter,
  GripVertical,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Tabla de listado con columnas movibles y ocultables, orden e búsqueda por
 * columna, buscador general y filtros acumulables.
 *
 * `columns`: [{ key, label, align, sortable, searchable, filterable, render }]
 * Todo el trabajo (filtrar, ordenar) se hace en cliente sobre `rows`.
 */

const OPERATORS = [
  { id: 'contains', label: 'contiene' },
  { id: 'equals', label: 'es igual a' },
  { id: 'starts', label: 'empieza con' },
  { id: 'gt', label: 'mayor que' },
  { id: 'lt', label: 'menor que' },
];

const asText = (value) => (value == null ? '' : String(value)).toLowerCase();

function matchesFilter(row, filter) {
  const raw = row[filter.column];
  const value = asText(raw);
  const term = asText(filter.value);

  switch (filter.operator) {
    case 'equals':
      return value === term;
    case 'starts':
      return value.startsWith(term);
    case 'gt':
      return Number(raw) > Number(filter.value);
    case 'lt':
      return Number(raw) < Number(filter.value);
    default:
      return value.includes(term);
  }
}

/** Cierra el popover al pulsar fuera o con Escape. */
function useDismiss(onDismiss) {
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) onDismiss();
    };
    const onKey = (e) => e.key === 'Escape' && onDismiss();

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [onDismiss]);

  return ref;
}

export default function SysDataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  searchPlaceholder = 'Buscar...',
  empty = 'No hay registros para mostrar.',
  pageSize = 30,
  // `cardIcon` es solo de la vista móvil; `actions` pinta la columna de acciones
  // en la tabla y los botones de cada tarjeta en móvil
  cardIcon: CardIcon,
  actions,
  className,
}) {
  const [order, setOrder] = useState(() => columns.map((c) => c.key));
  const [hidden, setHidden] = useState([]);
  const [sort, setSort] = useState({ key: null, dir: null });
  const [search, setSearch] = useState('');
  const [columnSearch, setColumnSearch] = useState({});
  const [openSearch, setOpenSearch] = useState(null);
  const [filters, setFilters] = useState([]);
  const [panel, setPanel] = useState(null); // 'columns' | 'filters' | null
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  // anchos fijados por el usuario al arrastrar el borde de una cabecera
  const [widths, setWidths] = useState({});
  const [resizingKey, setResizingKey] = useState(null);
  // Se muestran `shown` filas; al llegar al final del scroll se piden más.
  const [shown, setShown] = useState(pageSize);

  const byKey = useMemo(() => Object.fromEntries(columns.map((c) => [c.key, c])), [columns]);

  // Columnas en el orden elegido y sin las ocultas.
  const visible = useMemo(
    () => order.map((k) => byKey[k]).filter((c) => c && !hidden.includes(c.key)),
    [order, byKey, hidden]
  );

  const toggleSort = (key) =>
    setSort((prev) =>
      prev.key !== key
        ? { key, dir: 'asc' }
        : prev.dir === 'asc'
          ? { key, dir: 'desc' }
          : { key: null, dir: null }
    );

  const toggleColumn = (key) =>
    setHidden((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const handleDrop = (targetKey) => {
    if (!dragging || dragging === targetKey) return;
    setOrder((prev) => {
      const next = prev.filter((k) => k !== dragging);
      next.splice(next.indexOf(targetKey), 0, dragging);
      return next;
    });
    setDragging(null);
    setDragOver(null);
  };

  const startResize = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    const th = e.currentTarget.closest('th');
    const startX = e.clientX;
    const startWidth = th.getBoundingClientRect().width;
    setResizingKey(key);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    const onMove = (ev) =>
      setWidths((prev) => ({ ...prev, [key]: Math.max(90, startWidth + ev.clientX - startX) }));

    const onUp = () => {
      setResizingKey(null);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  /** Doble clic en el borde: la columna vuelve a su ancho automático. */
  const resetWidth = (key) =>
    setWidths((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const data = useMemo(() => {
    let result = rows;

    // buscador general
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((row) =>
        visible.some((col) => asText(row[col.key]).includes(term))
      );
    }

    // búsqueda por columna
    for (const [key, term] of Object.entries(columnSearch)) {
      if (!term?.trim()) continue;
      result = result.filter((row) => asText(row[key]).includes(term.toLowerCase()));
    }

    // filtros acumulados
    for (const filter of filters) {
      result = result.filter((row) => matchesFilter(row, filter));
    }

    // orden
    if (sort.key) {
      const factor = sort.dir === 'desc' ? -1 : 1;
      result = [...result].sort((a, b) => {
        const x = a[sort.key];
        const y = b[sort.key];
        if (typeof x === 'number' && typeof y === 'number') return (x - y) * factor;
        return String(x ?? '').localeCompare(String(y ?? ''), 'es', { numeric: true }) * factor;
      });
    }

    return result;
  }, [rows, search, columnSearch, filters, sort, visible]);

  // Cualquier cambio en el filtrado devuelve el listado a la primera tanda.
  useEffect(() => {
    setShown(pageSize);
  }, [pageSize, search, columnSearch, filters, sort, rows]);

  const pageRows = useMemo(() => data.slice(0, shown), [data, shown]);

  /** Carga la siguiente tanda cuando el scroll se acerca al final. */
  const onScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 120) {
      setShown((prev) => (prev < data.length ? prev + pageSize : prev));
    }
  };

  const activeColumnSearches = Object.values(columnSearch).filter((v) => v?.trim()).length;

  return (
    <div className={className}>
      {/* barra de herramientas: suelta, sin tarjeta que la envuelva */}
      <div className="mb-2 flex items-center justify-end gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs sm:flex-none sm:basis-80">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-8 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* iconos junto al buscador, en el extremo derecho */}
        <div className="flex items-center gap-1">
          <FiltersButton
            columns={columns}
            filters={filters}
            setFilters={setFilters}
            open={panel === 'filters'}
            onToggle={() => setPanel((p) => (p === 'filters' ? null : 'filters'))}
            onClose={() => setPanel(null)}
          />

          <ColumnsButton
            order={order}
            byKey={byKey}
            hidden={hidden}
            onToggle={toggleColumn}
            onShowAll={() => setHidden([])}
            open={panel === 'columns'}
            onOpen={() => setPanel((p) => (p === 'columns' ? null : 'columns'))}
            onClose={() => setPanel(null)}
          />
        </div>
      </div>

      {/* chips de filtros activos */}
      {(filters.length > 0 || activeColumnSearches > 0) && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <span
              key={f.id}
              className="inline-flex animate-[fadeIn_150ms_ease-out] items-center gap-1.5 rounded-full border border-[rgb(var(--sys-rgb)/0.3)] bg-[rgb(var(--sys-rgb)/0.1)] py-1 pl-2.5 pr-1.5 text-[11px] text-[rgb(var(--sys-ink-rgb))]"
            >
              <span className="font-medium">{byKey[f.column]?.label}</span>
              <span className="opacity-70">{OPERATORS.find((o) => o.id === f.operator)?.label}</span>
              <span className="font-medium">{f.value}</span>
              <button
                type="button"
                onClick={() => setFilters((prev) => prev.filter((x) => x.id !== f.id))}
                aria-label="Quitar filtro"
                className="rounded-full p-0.5 transition-colors hover:bg-[rgb(var(--sys-rgb)/0.2)]"
              >
                <X size={11} />
              </button>
            </span>
          ))}

          {Object.entries(columnSearch)
            .filter(([, v]) => v?.trim())
            .map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white py-1 pl-2.5 pr-1.5 text-[11px] text-zinc-600"
              >
                <Search size={10} />
                <span className="font-medium">{byKey[key]?.label}</span>
                <span>{value}</span>
                <button
                  type="button"
                  onClick={() => setColumnSearch((prev) => ({ ...prev, [key]: '' }))}
                  aria-label="Quitar búsqueda de columna"
                  className="rounded-full p-0.5 transition-colors hover:bg-zinc-100"
                >
                  <X size={11} />
                </button>
              </span>
            ))}

          <button
            type="button"
            onClick={() => {
              setFilters([]);
              setColumnSearch({});
            }}
            className="ml-auto text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-800"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* tabla */}
      <div
        onScroll={onScroll}
        className="hidden max-h-[65vh] overflow-auto rounded-lg shadow-sm ring-1 ring-zinc-200 sm:block"
      >
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="sticky top-0 z-20 bg-gradient-to-br from-[rgb(var(--sys-rgb))] to-[rgb(var(--sys-dark-rgb))] text-[var(--sys-on)]">
              {visible.map((col) => {
                const isSorted = sort.key === col.key;
                const isDragged = dragging === col.key;
                const isTarget = dragOver === col.key && dragging !== col.key;

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={widths[col.key] ? { width: widths[col.key] } : undefined}
                    draggable={resizingKey === null}
                    onDragStart={() => setDragging(col.key)}
                    onDragEnd={() => {
                      setDragging(null);
                      setDragOver(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(col.key);
                    }}
                    onDrop={() => handleDrop(col.key)}
                    className={cn(
                      'group relative whitespace-nowrap px-3 py-1.5',
                      // sin transición mientras se arrastra el borde: debe seguir al cursor
                      resizingKey === col.key
                        ? 'select-none'
                        : 'transition-[width,background-color,opacity] duration-200',
                      isDragged && 'opacity-40',
                      isTarget && 'bg-[rgb(var(--sys-on-rgb)/0.15)]'
                    )}
                  >
                    {isTarget && (
                      <span className="absolute inset-y-0 left-0 w-0.5 bg-[var(--sys-on)]" />
                    )}

                    <div
                      className={cn(
                        'flex items-center gap-1',
                        col.align === 'right' && 'justify-end'
                      )}
                    >
                      <GripVertical
                        size={13}
                        className="cursor-grab text-[var(--sys-on)] opacity-40 transition-opacity hover:opacity-100 active:cursor-grabbing"
                        aria-hidden="true"
                      />

                      <span className="text-[11px] font-semibold uppercase tracking-wider">
                        {col.label}
                      </span>

                      {col.sortable !== false && (
                        <button
                          type="button"
                          onClick={() => toggleSort(col.key)}
                          aria-label={`Ordenar por ${col.label}`}
                          className={cn(
                            'rounded p-0.5 text-[var(--sys-on)] transition-opacity hover:opacity-100',
                            isSorted ? 'opacity-100' : 'opacity-50'
                          )}
                        >
                          {isSorted && sort.dir === 'asc' ? (
                            <ArrowUp size={13} />
                          ) : isSorted ? (
                            <ArrowDown size={13} />
                          ) : (
                            <ChevronsUpDown size={13} />
                          )}
                        </button>
                      )}

                      {col.searchable !== false && (
                        <button
                          type="button"
                          onClick={() => setOpenSearch((k) => (k === col.key ? null : col.key))}
                          aria-label={`Buscar en ${col.label}`}
                          className={cn(
                            'rounded p-0.5 text-[var(--sys-on)] transition-opacity hover:opacity-100',
                            columnSearch[col.key]?.trim() ? 'opacity-100' : 'opacity-50'
                          )}
                        >
                          <Search size={13} />
                        </button>
                      )}
                    </div>

                    {/* tirador para agrandar o reducir la columna */}
                    <span
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Redimensionar ${col.label}`}
                      onMouseDown={(e) => startResize(e, col.key)}
                      onDoubleClick={() => resetWidth(col.key)}
                      onDragStart={(e) => e.preventDefault()}
                      className={cn(
                        'absolute right-0 top-0 z-10 flex h-full w-2 cursor-col-resize items-center justify-center',
                        'after:h-1/2 after:w-0.5 after:rounded-full after:bg-[var(--sys-on)] after:transition-opacity',
                        resizingKey === col.key
                          ? 'after:opacity-100'
                          : 'after:opacity-40 hover:after:opacity-100'
                      )}
                    />

                    {/* ventana flotante: no empuja la cabecera */}
                    {openSearch === col.key && (
                      <ColumnSearchPopover
                        column={col}
                        value={columnSearch[col.key] ?? ''}
                        onChange={(v) => setColumnSearch((prev) => ({ ...prev, [col.key]: v }))}
                        onClose={() => setOpenSearch(null)}
                      />
                    )}
                  </th>
                );
              })}

              {/* columna fija: no se mueve, no se oculta ni se ordena */}
              {actions && (
                <th
                  scope="col"
                  className="w-px whitespace-nowrap px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wider"
                >
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={(visible.length || 1) + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-zinc-500"
                >
                  {empty}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row[rowKey]}
                  className="border-b border-zinc-100 transition-colors last:border-b-0 hover:bg-[rgb(var(--sys-rgb)/0.05)]"
                >
                  {visible.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'px-3 py-1.5 text-zinc-700 transition-all duration-200',
                        col.align === 'right' && 'text-right tabular-nums'
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}

                  {actions && (
                    <td className="w-px whitespace-nowrap px-3 py-1.5">
                      <div className="flex items-center justify-end gap-1">{actions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* móvil: cada fila se convierte en una tarjeta */}
      <div onScroll={onScroll} className="max-h-[70vh] space-y-2 overflow-y-auto sm:hidden">
        {pageRows.length === 0 ? (
          <p className="rounded-xl bg-white px-4 py-10 text-center text-sm text-zinc-500 ring-1 ring-zinc-200">
            {empty}
          </p>
        ) : (
          pageRows.map((row) => {
            const [head, ...rest] = visible;
            return (
              <div
                key={row[rowKey]}
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-zinc-200"
              >
                {head && (
                  <div className="mb-2.5 flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {CardIcon && (
                        <CardIcon
                          size={16}
                          className="shrink-0 text-[rgb(var(--sys-rgb))]"
                          aria-hidden="true"
                        />
                      )}
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {head.render ? head.render(row) : row[head.key]}
                      </p>
                    </div>
                    {actions && <div className="flex shrink-0 items-center gap-1">{actions(row)}</div>}
                  </div>
                )}

                <dl className="space-y-1.5">
                  {rest.map((col) => {
                    const value = col.render ? col.render(row) : row[col.key];
                    const isEmpty = value === null || value === undefined || value === '';
                    return (
                      <div key={col.key} className="flex items-center justify-between gap-3">
                        <dt className="shrink-0 text-[12px] text-zinc-500">{col.label}</dt>
                        <dd className="min-w-0 truncate text-right text-[12px] text-zinc-800">
                          {isEmpty ? <span className="text-zinc-300">—</span> : value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
        <span>
          {data.length === pageRows.length
            ? `${data.length} de ${rows.length} registros`
            : `Mostrando ${pageRows.length} de ${data.length} · ${rows.length} en total`}
        </span>
        {hidden.length > 0 && <span>{hidden.length} columna(s) oculta(s)</span>}
      </div>
    </div>
  );
}

/* ------------------------ buscador flotante de columna --------------------- */

function ColumnSearchPopover({ column, value, onChange, onClose }) {
  const ref = useDismiss(onClose);
  const inputRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
    // Un frame de retraso para que la transición tenga desde dónde animar.
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'absolute left-0 top-full z-40 mt-1 w-[min(14rem,calc(100vw-2rem))] origin-top rounded-lg bg-white p-2 shadow-xl shadow-zinc-900/20 ring-1 ring-zinc-200 transition-all duration-150',
        shown ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-1 scale-95 opacity-0'
      )}
    >
      <div className="relative">
        <Search
          size={13}
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
          placeholder={`Buscar ${column.label.toLowerCase()}`}
          className="w-full rounded-md border border-zinc-200 py-1.5 pl-7 pr-6 text-[12px] font-normal normal-case tracking-normal text-zinc-900 outline-none focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Limpiar"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- menú de columnas ---------------------------- */

function ColumnsButton({ order, byKey, hidden, onToggle, onShowAll, open, onOpen, onClose }) {
  const ref = useDismiss(() => open && onClose());

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        aria-label="Mostrar u ocultar columnas"
        title="Columnas"
        className={cn(
          'relative flex h-[38px] w-[38px] items-center justify-center rounded-lg transition-colors',
          'text-[rgb(var(--sys-ink-rgb))] hover:bg-[rgb(var(--sys-rgb)/0.12)]',
          open && 'bg-[rgb(var(--sys-rgb)/0.12)]'
        )}
      >
        <Eye size={17} />
        {hidden.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgb(var(--sys-rgb))] px-1 text-[10px] font-semibold leading-none text-[var(--sys-on)] ring-2 ring-white">
            {hidden.length}
          </span>
        )}
      </button>

      <div
        className={cn(
          'absolute right-0 z-30 mt-2 w-[min(15rem,calc(100vw-2rem))] origin-top-right rounded-xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200 transition-all duration-150',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
          <p className="text-[12px] font-semibold text-zinc-900">Mostrar columnas</p>
          <button
            type="button"
            onClick={onShowAll}
            className="text-[11px] font-medium text-[rgb(var(--sys-ink-rgb))] hover:underline"
          >
            Todas
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-1">
          {order.map((key) => {
            const col = byKey[key];
            if (!col) return null;
            const isVisible = !hidden.includes(key);
            return (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => onToggle(key)}
                  className="h-3.5 w-3.5 rounded border-zinc-300 text-[rgb(var(--sys-rgb))] focus:ring-[rgb(var(--sys-rgb)/0.3)]"
                />
                <span className="truncate">{col.label}</span>
              </label>
            );
          })}
        </div>
        <p className="border-t border-zinc-100 px-3 py-2 text-[10px] leading-relaxed text-zinc-400">
          Arrastra las cabeceras de la tabla para cambiar su orden.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ panel de filtros --------------------------- */

function FiltersButton({ columns, filters, setFilters, open, onToggle, onClose }) {
  const filterable = columns.filter((c) => c.filterable !== false);
  const [draft, setDraft] = useState({
    column: filterable[0]?.key ?? '',
    operator: 'contains',
    value: '',
  });

  const ref = useDismiss(() => open && onClose());

  const add = () => {
    if (!draft.value.trim() || !draft.column) return;
    setFilters((prev) => [...prev, { ...draft, id: `${draft.column}-${prev.length}-${draft.value}` }]);
    setDraft((d) => ({ ...d, value: '' }));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label="Filtros"
        title="Filtros"
        className={cn(
          'relative flex h-[38px] w-[38px] items-center justify-center rounded-lg transition-colors',
          'text-[rgb(var(--sys-ink-rgb))] hover:bg-[rgb(var(--sys-rgb)/0.12)]',
          open && 'bg-[rgb(var(--sys-rgb)/0.12)]'
        )}
      >
        <Filter size={17} />
        {filters.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgb(var(--sys-rgb))] px-1 text-[10px] font-semibold leading-none text-[var(--sys-on)] ring-2 ring-white">
            {filters.length}
          </span>
        )}
      </button>

      <div
        className={cn(
          'absolute right-0 z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] origin-top-right rounded-xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200 transition-all duration-150',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        )}
      >
        <p className="border-b border-zinc-100 px-3 py-2 text-[12px] font-semibold text-zinc-900">
          Agregar filtro
        </p>

        <div className="space-y-2 p-3">
          <select
            value={draft.column}
            onChange={(e) => setDraft((d) => ({ ...d, column: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-[13px] outline-none focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]"
          >
            {filterable.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={draft.operator}
            onChange={(e) => setDraft((d) => ({ ...d, operator: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-[13px] outline-none focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]"
          >
            {OPERATORS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>

          <input
            value={draft.value}
            onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Valor"
            className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-[13px] outline-none focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]"
          />

          <button
            type="button"
            onClick={add}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--sys-rgb))] py-2 text-[13px] font-semibold text-[var(--sys-on)] transition-colors hover:bg-[rgb(var(--sys-dark-rgb))]"
          >
            <Plus size={14} />
            Agregar filtro
          </button>
        </div>

        {filters.length > 0 && (
          <div className="border-t border-zinc-100 p-2">
            <p className="px-1 pb-1 text-[10px] uppercase tracking-wider text-zinc-400">
              Filtros aplicados
            </p>
            <ul className="space-y-1">
              {filters.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-2 rounded-lg bg-zinc-50 px-2 py-1.5 text-[12px] text-zinc-700"
                >
                  <span className="truncate">
                    <b className="font-medium">
                      {columns.find((c) => c.key === f.column)?.label}
                    </b>{' '}
                    {OPERATORS.find((o) => o.id === f.operator)?.label} <b>{f.value}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => prev.filter((x) => x.id !== f.id))}
                    aria-label="Quitar filtro"
                    className="shrink-0 rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
                  >
                    <X size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
