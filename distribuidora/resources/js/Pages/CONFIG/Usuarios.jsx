import { useCallback, useEffect, useState } from 'react';
import {
  BadgeCheck,
  CalendarClock,
  Eye,
  KeyRound,
  Mail,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react';
import SysDataTable from '@/Components/sys/SysDataTable';
import SysButton from '@/Components/sys/SysButton';
import SysModal from '@/Components/sys/SysModal';
import SysConfirm from '@/Components/sys/SysConfirm';
import { SysAlert } from '@/Components/sys/SysFeedback';
import { SysInput, SysField } from '@/Components/sys/SysInput';
import { api, unwrapError } from '@/lib/api';
import { cn } from '@/lib/utils';

/** Estado derivado del correo verificado; la API no tiene columna `estado`. */
const estadoDe = (user) => (user?.email_verified_at ? 'Verificado' : 'Pendiente');

function EstadoBadge({ estado }) {
  const tones = {
    Verificado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pendiente: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        tones[estado] ?? tones.Pendiente
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {estado}
    </span>
  );
}

function RoleBadge({ role }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-[rgb(var(--sys-rgb)/0.3)] bg-[rgb(var(--sys-rgb)/0.1)] px-2 py-0.5 text-[11px] font-medium text-[rgb(var(--sys-ink-rgb))]">
      <ShieldCheck size={11} />
      {role?.display_name ?? role?.name}
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

export default function Usuarios() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [roles, setRoles] = useState([]);

  // Modal: null | 'crear' | 'editar' | 'detalle'
  const [modal, setModal] = useState(null);
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
      const [{ data }, rolesRes] = await Promise.all([
        api.get('users'),
        api.get('roles', { per_page: 500 }).catch(() => ({ data: [] })),
      ]);
      setRows(data ?? []);
      setRoles(rolesRes?.data ?? []);
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
    setForm({ role_ids: [] });
    setFormErrors({});
    setFormError(null);
    setModal('crear');
  };

  const openEdit = (row) => {
    setForm({
      name: row.name,
      email: row.email,
      password: '',
      role_ids: (row.roles ?? []).map((r) => r.id),
    });
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

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleRole = (roleId) =>
    setForm((prev) => ({
      ...prev,
      role_ids: prev.role_ids?.includes(roleId)
        ? prev.role_ids.filter((id) => id !== roleId)
        : [...(prev.role_ids ?? []), roleId],
    }));

  const submit = async () => {
    setSaving(true);
    setFormErrors({});
    setFormError(null);
    try {
      const body = {
        name: form.name?.trim(),
        email: form.email?.trim(),
        role_ids: form.role_ids ?? [],
      };
      // En edición la contraseña es opcional: vacía significa "no cambiar".
      if (modal === 'crear' || form.password) body.password = form.password;

      if (modal === 'crear') {
        await api.post('users', body);
      } else {
        await api.put(`users/${selected.id}`, body);
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
      await api.delete(`users/${confirm.id}`);
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
      key: 'name',
      label: 'Usuario',
      render: (row) => (
        <span className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--sys-rgb)/0.15)] text-[10px] font-bold uppercase text-[rgb(var(--sys-ink-rgb))]">
            {initials(row.name)}
          </span>
          <span className="font-medium text-zinc-900">{row.name}</span>
        </span>
      ),
    },
    {
      key: 'email',
      label: 'Correo electrónico',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5">
          <Mail size={13} className="text-[rgb(var(--sys-rgb))]" />
          {row.email}
        </span>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (row) =>
        row.roles?.length ? (
          <span className="flex flex-wrap items-center gap-1">
            {row.roles.map((r) => (
              <RoleBadge key={r.id} role={r} />
            ))}
          </span>
        ) : (
          <span className="text-zinc-300">—</span>
        ),
    },
    {
      key: 'email_verified_at',
      label: 'Estado',
      render: (row) => <EstadoBadge estado={estadoDe(row)} />,
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
      {error && <SysAlert tone="error">{error}</SysAlert>}

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-zinc-500">
          {rows.length} {rows.length === 1 ? 'usuario' : 'usuarios'} con acceso a la suite
        </p>
        <SysButton size="sm" onClick={openCreate}>
          <Plus size={15} />
          Nuevo usuario
        </SysButton>
      </div>

      <SysDataTable
        columns={columns}
        rows={rows}
        rowKey="id"
        searchPlaceholder="Buscar nombre o correo..."
        empty={loading ? 'Cargando...' : 'Ningún usuario coincide.'}
        cardIcon={Users}
        actions={actions}
      />

      {/* ------------------------------ crear / editar ------------------------------ */}
      <SysModal
        show={modal === 'crear' || modal === 'editar'}
        onClose={saving ? () => {} : closeModal}
        title={modal === 'crear' ? 'Nuevo usuario' : 'Editar usuario'}
        subtitle={modal === 'editar' ? selected?.email : undefined}
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

          <SysField label="Nombre completo" required error={formErrors.name}>
            <SysInput
              icon={UserRound}
              value={form.name ?? ''}
              onChange={setField('name')}
              placeholder="Nombre de la persona"
              error={formErrors.name}
            />
          </SysField>

          <SysField label="Correo electrónico" required error={formErrors.email}>
            <SysInput
              type="email"
              icon={Mail}
              value={form.email ?? ''}
              onChange={setField('email')}
              placeholder="usuario@empresa.com"
              error={formErrors.email}
            />
          </SysField>

          <SysField
            label="Contraseña"
            required={modal === 'crear'}
            optional={modal === 'editar'}
            error={formErrors.password}
            hint={modal === 'editar' ? 'Déjala en blanco para mantener la actual.' : undefined}
          >
            <SysInput
              type="password"
              icon={KeyRound}
              value={form.password ?? ''}
              onChange={setField('password')}
              placeholder={modal === 'crear' ? 'Mínimo 8 caracteres' : '••••••••'}
              autoComplete={modal === 'crear' ? 'new-password' : 'off'}
              error={formErrors.password}
            />
          </SysField>
          <SysField
            label="Roles"
            optional
            error={formErrors.role_ids}
            hint={roles.length === 0 ? 'Aún no hay roles definidos. Créalos en Accesos → Roles.' : undefined}
          >
            {roles.length ? (
              <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-zinc-200 p-2">
                {roles.map((role) => {
                  const checked = (form.role_ids ?? []).includes(role.id);
                  return (
                    <label
                      key={role.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRole(role.id)}
                        className="h-3.5 w-3.5 rounded border-zinc-300 text-[rgb(var(--sys-rgb))] focus:ring-[rgb(var(--sys-rgb)/0.3)]"
                      />
                      <ShieldCheck
                        size={14}
                        className={checked ? 'text-[rgb(var(--sys-rgb))]' : 'text-zinc-300'}
                      />
                      <span className="flex-1 truncate font-medium">{role.display_name}</span>
                      <code className="text-[11px] text-zinc-400">{role.name}</code>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-zinc-200 px-3 py-2.5 text-[13px] text-zinc-500">
                No hay roles disponibles.
              </p>
            )}
          </SysField>
        </div>
      </SysModal>

      {/* --------------------------------- detalle --------------------------------- */}
      <SysModal
        show={modal === 'detalle'}
        onClose={closeModal}
        title="Detalle del usuario"
        subtitle={selected?.email}
        size="md"
        footer={
          <SysButton variant="ghost" type="button" onClick={closeModal}>
            Cerrar
          </SysButton>
        }
      >
        <DetailGrid
          items={[
            { icon: UserRound, label: 'Nombre', value: selected?.name },
            { icon: Mail, label: 'Correo', value: selected?.email },
            { icon: BadgeCheck, label: 'Estado', value: null, estado: estadoDe(selected) },
            { icon: ShieldCheck, label: 'Roles', badges: selected?.roles },
            { icon: CalendarClock, label: 'Creado', value: formatFecha(selected?.created_at) },
            { icon: Users, label: 'ID', value: selected?.id },
          ]}
        />
      </SysModal>

      {/* -------------------------------- confirmación -------------------------------- */}
      <SysConfirm
        show={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={eliminar}
        loading={confirming}
        title="Eliminar usuario"
        message={`Se eliminará el acceso de "${confirm?.name ?? ''}". Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        tone="danger"
      />
    </div>
  );
}

/* ------------------------------ piezas pequeñas ------------------------------ */

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
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
            {item.estado ? (
              <EstadoBadge estado={item.estado} />
            ) : item.badges ? (
              item.badges.length ? (
                <span className="flex items-center justify-end gap-1">
                  {item.badges.map((r) => (
                    <RoleBadge key={r.id} role={r} />
                  ))}
                </span>
              ) : (
                <span className="text-zinc-300">—</span>
              )
            ) : (
              item.value ?? <span className="text-zinc-300">—</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
