import { useCallback, useEffect, useState } from 'react';
import {
  CalendarClock,
  Eye,
  FileText,
  KeyRound,
  Pencil,
  Plus,
  Shield,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import SysDataTable from '@/Components/sys/SysDataTable';
import SysButton from '@/Components/sys/SysButton';
import SysModal from '@/Components/sys/SysModal';
import SysConfirm from '@/Components/sys/SysConfirm';
import { SysAlert } from '@/Components/sys/SysFeedback';
import { SysInput, SysSelect, SysTextarea, SysField } from '@/Components/sys/SysInput';
import { api, unwrapError } from '@/lib/api';
import { cn } from '@/lib/utils';

const ESTADOS = ['Activo', 'Inactivo'];

function EstadoBadge({ estado }) {
  const tones = {
    Activo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactivo: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        tones[estado] ?? tones.Inactivo
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {estado}
    </span>
  );
}

function formatFecha(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Convierte un texto en identificador de rol: "Almacén Principal" → "almacen-principal". */
function toSlug(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Roles() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(null); // 'crear' | 'editar' | 'detalle'
  const [selected, setSelected] = useState(null);

  const [confirm, setConfirm] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('roles', { per_page: 500 });
      setRows(data ?? []);
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ estado: 'Activo' });
    setFormErrors({});
    setFormError(null);
    setModal('crear');
  };

  const openEdit = (row) => {
    setForm({ name: row.name, display_name: row.display_name, description: row.description ?? '', estado: row.estado });
    setFormErrors({});
    setFormError(null);
    setSelected(row);
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

  const setField = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    setSaving(true);
    setFormErrors({});
    setFormError(null);
    try {
      const body = {
        name: form.name?.trim() || toSlug(form.display_name),
        display_name: form.display_name?.trim(),
        description: form.description?.trim() || null,
        estado: form.estado ?? 'Activo',
      };

      if (modal === 'crear') {
        await api.post('roles', body);
      } else {
        await api.put(`roles/${selected.id}`, body);
      }
      closeModal();
      await load();
    } catch (e) {
      const { message, errors } = unwrapError(e);
      if (errors && Object.keys(errors).length) {
        setFormErrors(errors);
        setFormError(null);
      } else {
        setFormError(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const eliminar = async () => {
    setConfirming(true);
    try {
      await api.delete(`roles/${confirm.id}`);
      setConfirm(null);
      await load();
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setConfirming(false);
    }
  };

  const columns = [
    {
      key: 'display_name',
      label: 'Rol',
      render: (row) => (
        <span className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--sys-rgb)/0.15)] text-[rgb(var(--sys-ink-rgb))]">
            <ShieldCheck size={13} />
          </span>
          <span className="font-medium text-zinc-900">{row.display_name}</span>
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Identificador',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5">
          <KeyRound size={13} className="text-[rgb(var(--sys-rgb))]" />
          <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-600">{row.name}</code>
        </span>
      ),
    },
    { key: 'description', label: 'Descripción', render: (row) => row.description ?? '—' },
    {
      key: 'users_count',
      label: 'Usuarios',
      align: 'right',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <Users size={13} className="text-[rgb(var(--sys-rgb))]" />
          {row.users_count ?? 0}
        </span>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (row) => <EstadoBadge estado={row.estado} />,
    },
    {
      key: 'created_at',
      label: 'Creado',
      align: 'right',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <CalendarClock size={13} className="text-[rgb(var(--sys-rgb))]" />
          {formatFecha(row.created_at)}
        </span>
      ),
    },
  ];

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

  return (
    <div className="space-y-4">
      {error && (
        <div className="min-w-0 flex-1">
          <SysAlert tone="error">{error}</SysAlert>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-zinc-500">
          {rows.length} {rows.length === 1 ? 'rol' : 'roles'} definidos
        </p>
        <SysButton size="sm" onClick={openCreate}>
          <Plus size={15} />
          Nuevo rol
        </SysButton>
      </div>

      <SysDataTable
        columns={columns}
        rows={rows}
        rowKey="id"
        searchPlaceholder="Buscar rol o descripción..."
        empty={loading ? 'Cargando...' : 'Ningún rol coincide.'}
        cardIcon={Shield}
        actions={actions}
      />

      {/* ------------------------------ crear / editar ------------------------------ */}
      <SysModal
        show={modal === 'crear' || modal === 'editar'}
        onClose={saving ? () => {} : closeModal}
        title={modal === 'crear' ? 'Nuevo rol' : 'Editar rol'}
        subtitle={modal === 'editar' ? selected?.display_name : undefined}
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <SysButton variant="ghost" type="button" onClick={closeModal}>
              Cancelar
            </SysButton>
            <SysButton onClick={submit} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </SysButton>
          </div>
        }
      >
        <div className="space-y-4">
          {formError && <SysAlert tone="error">{formError}</SysAlert>}

          <SysField label="Nombre del rol" required error={formErrors.display_name}>
            <SysInput
              icon={ShieldCheck}
              value={form.display_name ?? ''}
              onChange={setField('display_name')}
              placeholder="Ej. Vendedor, Almacén, Administrador"
              error={formErrors.display_name}
            />
          </SysField>

          <SysField
            label="Identificador"
            required
            error={formErrors.name}
            hint="Código único que usan los permisos. Si lo dejas vacío se genera desde el nombre."
          >
            <SysInput
              icon={KeyRound}
              value={form.name ?? ''}
              onChange={setField('name')}
              placeholder={form.display_name ? toSlug(form.display_name) : 'vendedor'}
              error={formErrors.name}
            />
          </SysField>

          <SysField label="Descripción" optional error={formErrors.description}>
            <SysTextarea
              rows={3}
              value={form.description ?? ''}
              onChange={setField('description')}
              placeholder="Qué módulos cubre este rol..."
              error={formErrors.description}
            />
          </SysField>

          <SysField label="Estado" error={formErrors.estado}>
            <SysSelect value={form.estado ?? 'Activo'} onChange={setField('estado')}>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </SysSelect>
          </SysField>
        </div>
      </SysModal>

      {/* --------------------------------- detalle --------------------------------- */}
      <SysModal
        show={modal === 'detalle'}
        onClose={closeModal}
        title="Detalle del rol"
        subtitle={selected?.display_name}
        size="md"
        footer={
          <SysButton variant="ghost" type="button" onClick={closeModal}>
            Cerrar
          </SysButton>
        }
      >
        <DetailGrid
          items={[
            { icon: ShieldCheck, label: 'Rol', value: selected?.display_name },
            { icon: KeyRound, label: 'Identificador', value: selected?.name },
            { icon: FileText, label: 'Descripción', value: selected?.description },
            { icon: Users, label: 'Usuarios', value: selected?.users_count },
            {
              icon: Shield,
              label: 'Estado',
              value: selected?.estado,
              badge: selected?.estado ? <EstadoBadge estado={selected.estado} /> : null,
            },
            { icon: CalendarClock, label: 'Creado', value: formatFecha(selected?.created_at) },
          ]}
        />
      </SysModal>

      {/* -------------------------------- confirmación -------------------------------- */}
      <SysConfirm
        show={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={eliminar}
        loading={confirming}
        title="Eliminar rol"
        message={`Se eliminará el rol "${confirm?.display_name ?? ''}". Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        tone="danger"
      />
    </div>
  );
}

/* ------------------------------ piezas pequeñas ------------------------------ */

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

function DetailGrid({ items }) {
  return (
    <dl className="divide-y divide-zinc-100">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-4 py-2.5">
          <dt className="flex shrink-0 items-center gap-2 text-[13px] text-zinc-500">
            {item.icon && <item.icon size={14} className="text-[rgb(var(--sys-rgb))]" />}
            {item.label}
          </dt>
          <dd className="min-w-0 truncate text-right text-[13px] font-medium text-zinc-800">
            {item.badge ?? item.value ?? <span className="text-zinc-300">—</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
