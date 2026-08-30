import { useCallback, useEffect, useState } from 'react';
import { Eye, KeyRound, Mail, Pencil, Plus, Trash2, UserRound, Users } from 'lucide-react';
import SysDataTable from '@/Components/sys/SysDataTable';
import SysButton from '@/Components/sys/SysButton';
import SysModal from '@/Components/sys/SysModal';
import SysConfirm from '@/Components/sys/SysConfirm';
import { SysAlert } from '@/Components/sys/SysFeedback';
import { SysInput, SysField } from '@/Components/sys/SysInput';
import { api, unwrapError } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function Usuarios() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const { data } = await api.get('users');
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
    setForm({});
    setFormErrors({});
    setFormError(null);
    setModal('crear');
  };

  const openEdit = (row) => {
    setForm({ name: row.name, email: row.email, password: '' });
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

  const submit = async () => {
    setSaving(true);
    setFormErrors({});
    setFormError(null);
    try {
      const body = { name: form.name?.trim(), email: form.email?.trim() };
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
          <Mail size={13} className="text-zinc-400" />
          {row.email}
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
            {item.icon && <item.icon size={14} className="text-zinc-400" />}
            {item.label}
          </dt>
          <dd className="min-w-0 truncate text-right text-[13px] font-medium text-zinc-800">
            {item.value ?? <span className="text-zinc-300">—</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
