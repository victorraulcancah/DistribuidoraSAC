import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import SysDataTable from '@/Components/sys/SysDataTable';
import SysButton from '@/Components/sys/SysButton';
import SysModal from '@/Components/sys/SysModal';
import SysConfirm from '@/Components/sys/SysConfirm';
import { SysAlert } from '@/Components/sys/SysFeedback';
import { SysInput, SysSelect, SysTextarea, SysField } from '@/Components/sys/SysInput';
import { api, unwrapError } from '@/lib/api';
import { cn } from '@/lib/utils';

/**
 * Listado CRUD genérico para los submódulos de Clientes y Proveedores.
 *
 * Cada submódulo solo declara su configuración (endpoint, columnas y campos);
 * la mecánica —cargar, filtrar, crear, editar, ver y eliminar— vive aquí una
 * sola vez. Los campos se describen con:
 *
 *   { name, label, type, options, required, optional, span, hint }
 *   type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'tercero'
 */
export default function CrudList({
  endpoint,
  singular,
  plural,
  icon: CardIcon,
  columns,
  fields,
  defaults = {},
  detailFields,
  titleField = 'nombre',
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // catálogos para los selectores de tercero
  const [terceros, setTerceros] = useState({ clientes: [], proveedores: [] });

  const [modal, setModal] = useState(null); // 'crear' | 'editar' | 'detalle' | null
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const needsTerceros = useMemo(
    () => fields.some((f) => f.type === 'cliente' || f.type === 'proveedor'),
    [fields]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(endpoint, { per_page: 500 });
      setRows(data ?? []);
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!needsTerceros) return;
    Promise.all([
      api.get('clientes', { per_page: 500 }).catch(() => ({ data: [] })),
      api.get('proveedores', { per_page: 500 }).catch(() => ({ data: [] })),
    ]).then(([c, p]) => setTerceros({ clientes: c.data ?? [], proveedores: p.data ?? [] }));
  }, [needsTerceros]);

  const setField = (name) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const openCreate = () => {
    setSelected(null);
    setForm({ ...defaults });
    setFormErrors({});
    setFormError(null);
    setModal('crear');
  };

  const openEdit = (row) => {
    setSelected(row);
    setForm({ ...row });
    setFormErrors({});
    setFormError(null);
    setModal('editar');
  };

  const openDetail = (row) => {
    setSelected(row);
    setModal('detalle');
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFormErrors({});

    // Los vacíos viajan como null: la API los valida como `nullable`.
    const payload = Object.fromEntries(
      fields.map((f) => [f.name, form[f.name] === '' || form[f.name] === undefined ? null : form[f.name]])
    );

    try {
      if (modal === 'editar') await api.put(`${endpoint}/${selected.id}`, payload);
      else await api.post(endpoint, payload);
      closeModal();
      load();
    } catch (err) {
      const { message, errors } = unwrapError(err);
      setFormError(message);
      setFormErrors(
        Object.fromEntries(
          Object.entries(errors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
        )
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await api.delete(`${endpoint}/${confirm.id}`);
      setConfirm(null);
      load();
    } catch (err) {
      setError(unwrapError(err).message);
      setConfirm(null);
    } finally {
      setDeleting(false);
    }
  };

  const actions = (row) => (
    <>
      <ActionIcon title="Ver detalle" onClick={() => openDetail(row)}>
        <Eye size={15} />
      </ActionIcon>
      <ActionIcon title="Editar" onClick={() => openEdit(row)}>
        <Pencil size={15} />
      </ActionIcon>
      <ActionIcon
        title="Eliminar"
        onClick={() => setConfirm(row)}
        className="text-red-500 hover:bg-red-50"
      >
        <Trash2 size={15} />
      </ActionIcon>
    </>
  );

  const renderField = (field) => {
    const value = form[field.name] ?? '';
    const common = {
      value,
      onChange: setField(field.name),
      error: formErrors[field.name],
    };

    // Un registro puede colgar de un cliente o de un proveedor; la API acepta
    // ambos campos como nullable, así que cada uno tiene su propio selector.
    if (field.type === 'cliente' || field.type === 'proveedor') {
      const lista = field.type === 'cliente' ? terceros.clientes : terceros.proveedores;
      return (
        <SysSelect {...common}>
          <option value="">— Sin asignar —</option>
          {lista.map((t) => (
            <option key={t.id} value={t.id}>
              {t.razon_social}
            </option>
          ))}
        </SysSelect>
      );
    }

    if (field.type === 'select') {
      return (
        <SysSelect {...common}>
          <option value="">— Seleccionar —</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </SysSelect>
      );
    }

    if (field.type === 'textarea') {
      return <SysTextarea rows={3} placeholder={field.placeholder} {...common} />;
    }

    return (
      <SysInput
        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
        step={field.step}
        placeholder={field.placeholder}
        {...common}
      />
    );
  };

  return (
    <div className="space-y-4">
      {error && <SysAlert tone="error">{error}</SysAlert>}

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-zinc-500">
          {rows.length} {rows.length === 1 ? singular : plural}
        </p>
        <SysButton size="sm" onClick={openCreate}>
          <Plus size={15} />
          Nuevo {singular}
        </SysButton>
      </div>

      <SysDataTable
        columns={columns}
        rows={rows}
        rowKey="id"
        searchPlaceholder={`Buscar ${singular}...`}
        empty={loading ? 'Cargando...' : `Ningún ${singular} coincide.`}
        cardIcon={CardIcon}
        actions={actions}
      />

      {/* crear / editar */}
      <SysModal
        show={modal === 'crear' || modal === 'editar'}
        onClose={saving ? () => {} : closeModal}
        title={modal === 'crear' ? `Nuevo ${singular}` : `Editar ${singular}`}
        subtitle={modal === 'editar' ? selected?.[titleField] : undefined}
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <SysButton variant="ghost" onClick={closeModal} disabled={saving}>
              Cancelar
            </SysButton>
            <SysButton onClick={submit} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </SysButton>
          </div>
        }
      >
        <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formError && (
            <div className="sm:col-span-2">
              <SysAlert tone="error">{formError}</SysAlert>
            </div>
          )}

          {fields.map((field) => (
            <SysField
              key={field.name}
              label={field.label}
              required={field.required}
              optional={!field.required}
              error={formErrors[field.name]}
              hint={field.hint}
              className={field.span === 2 ? 'sm:col-span-2' : undefined}
            >
              {renderField(field)}
            </SysField>
          ))}
        </form>
      </SysModal>

      {/* detalle */}
      <SysModal
        show={modal === 'detalle'}
        onClose={closeModal}
        title={selected?.[titleField] ?? `Detalle del ${singular}`}
        size="md"
        footer={
          <div className="flex justify-end">
            <SysButton variant="ghost" onClick={closeModal}>
              Cerrar
            </SysButton>
          </div>
        }
      >
        {selected && (
          <dl className="divide-y divide-zinc-100">
            {(detailFields ?? fields.map((f) => ({ label: f.label, name: f.name }))).map((f) => {
              const raw = f.render ? f.render(selected) : selected[f.name];
              const empty = raw === null || raw === undefined || raw === '';
              return (
                <div key={f.name} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="shrink-0 text-[12px] text-zinc-500">{f.label}</dt>
                  <dd className="min-w-0 text-right text-[13px] text-zinc-800">
                    {empty ? <span className="text-zinc-300">—</span> : String(raw)}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </SysModal>

      <SysConfirm
        show={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={remove}
        loading={deleting}
        title={`Eliminar ${singular}`}
        message={`Se eliminará "${confirm?.[titleField] ?? ''}". Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}

function ActionIcon({ title, onClick, className, children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={cn(
        'rounded-md p-1.5 text-[rgb(var(--sys-rgb))] transition-colors hover:bg-[rgb(var(--sys-rgb)/0.12)]',
        className
      )}
    >
      {children}
    </button>
  );
}
