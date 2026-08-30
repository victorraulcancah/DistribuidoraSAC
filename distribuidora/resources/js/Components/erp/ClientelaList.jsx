import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Eye,
  Pencil,
  Plus,
  Power,
  Trash2,
  Truck,
  UserRound,
  Building2,
  CreditCard,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
} from 'lucide-react';
import SysDataTable from '@/Components/sys/SysDataTable';
import SysButton from '@/Components/sys/SysButton';
import SysBadge from '@/Components/sys/SysBadge';
import SysModal from '@/Components/sys/SysModal';
import SysConfirm from '@/Components/sys/SysConfirm';
import { SysAlert } from '@/Components/sys/SysFeedback';
import { SysInput, SysSelect, SysTextarea, SysField } from '@/Components/sys/SysInput';
import { api, unwrapError } from '@/lib/api';
import { cn } from '@/lib/utils';

const TIPOS_DOCUMENTO = ['RUC', 'DNI', 'CE', 'Carnet Extranjeria', 'Pasaporte', 'Otro'];

const ESTADOS_CLIENTE = ['Activo', 'Inactivo', 'Moroso'];
const ESTADOS_PROVEEDOR = ['Activo', 'Inactivo'];

function EstadoBadge({ estado }) {
  const tones = {
    Activo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactivo: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    Moroso: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        tones[estado] ?? tones.Inactivo
      )}
    >
      {estado}
    </span>
  );
}

export default function ClientelaList({ tipo }) {
  const esCliente = tipo === 'cliente';
  const path = esCliente ? 'clientes' : 'proveedores';
  const CardIcon = esCliente ? UserRound : Truck;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendedores, setVendedores] = useState([]);

  // Modal: nul | 'crear' | 'editar' | 'detalle'
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [confirm, setConfirm] = useState(null); // { type: 'estado' | 'eliminar', row }
  const [confirming, setConfirming] = useState(false);

  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(path, { per_page: 500 });
      setRows(data ?? []);
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  // Vendedores (solo clientes): para el select del formulario.
  useEffect(() => {
    if (!esCliente) return;
    api
      .get('users')
      .then(({ data }) => setVendedores(data ?? []))
      .catch(() => {});
  }, [esCliente]);

  const openCreate = () => {
    setForm({ tipo_documento: 'RUC', estado: 'Activo' });
    setFormErrors({});
    setFormError(null);
    setModal('crear');
  };

  const openEdit = (row) => {
    setForm({ ...row });
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
      const body = { ...form };
      Object.keys(body).forEach((k) => {
        if (body[k] === '' || body[k] === null) delete body[k];
      });
      delete body.id;
      delete body.created_at;
      delete body.updated_at;
      delete body.vendedor; // relación; el id vuela en vendedor_id

      if (modal === 'crear') {
        await api.post(path, body);
      } else if (modal === 'editar') {
        await api.put(`${path}/${selected.id}`, body);
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

  const toggleEstado = async () => {
    setConfirming(true);
    try {
      const estado = confirm.row.estado === 'Activo' ? 'Inactivo' : 'Activo';
      await api.patch(`${path}/${confirm.row.id}`, { estado });
      setConfirm(null);
      await load();
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setConfirming(false);
    }
  };

  const eliminar = async () => {
    setConfirming(true);
    try {
      await api.delete(`${path}/${confirm.row.id}`);
      setConfirm(null);
      await load();
    } catch (e) {
      setError(unwrapError(e).message);
    } finally {
      setConfirming(false);
    }
  };

  const columns = useMemo(() => {
    const base = [
      { key: 'codigo', label: 'Código' },
      {
        key: 'razon_social',
        label: esCliente ? 'Cliente' : 'Proveedor',
        render: (row) => (
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-900">{row.razon_social}</p>
            {row.nombre_comercial && (
              <p className="truncate text-[11px] text-zinc-400">{row.nombre_comercial}</p>
            )}
          </div>
        ),
      },
      { key: 'numero_documento', label: 'Documento' },
      { key: 'telefono', label: 'Teléfono', render: (row) => row.telefono ?? '—' },
      { key: 'distrito', label: 'Distrito', render: (row) => row.distrito ?? '—' },
      {
        key: 'vendedor',
        label: 'Vendedor',
        render: (row) => (row.vendedor ? row.vendedor.name : esCliente ? '—' : '—'),
      },
      {
        key: 'estado',
        label: 'Estado',
        render: (row) => <EstadoBadge estado={row.estado} />,
      },
    ];

    return base.filter((col) => {
      if (col.key === 'vendedor' && !esCliente) return false;
      return true;
    });
  }, [esCliente]);

  const actions = (row) => (
    <>
      <ActionIcon title="Ver detalle" onClick={() => openDetail(row)}>
        <Eye size={15} />
      </ActionIcon>
      <ActionIcon title="Editar" onClick={() => openEdit(row)}>
        <Pencil size={15} />
      </ActionIcon>
      <ActionIcon
        title={row.estado === 'Activo' ? 'Desactivar' : 'Activar'}
        onClick={() => setConfirm({ type: 'estado', row })}
        className="text-amber-500 hover:bg-amber-50"
      >
        <Power size={15} />
      </ActionIcon>
      <ActionIcon
        title="Eliminar"
        onClick={() => setConfirm({ type: 'eliminar', row })}
        className="text-red-500 hover:bg-red-50"
      >
        <Trash2 size={15} />
      </ActionIcon>
    </>
  );

  const confirmConfig =
    confirm?.type === 'estado'
      ? {
          tone: 'warning',
          title: confirm.row.estado === 'Activo' ? 'Desactivar' : 'Activar',
          message: `¿Deseas ${
            confirm.row.estado === 'Activo' ? 'desactivar' : 'activar'
          } a "${confirm.row.razon_social}"?`,
          confirmLabel: confirm.row.estado === 'Activo' ? 'Desactivar' : 'Activar',
          onConfirm: toggleEstado,
        }
      : confirm?.type === 'eliminar'
        ? {
            tone: 'danger',
            title: 'Eliminar registro',
            message: `Esta acción eliminará permanentemente a "${confirm.row.razon_social}". ¿Deseas continuar?`,
            confirmLabel: 'Eliminar',
            onConfirm: eliminar,
          }
        : null;

  const estadoOptions = esCliente ? ESTADOS_CLIENTE : ESTADOS_PROVEEDOR;

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <SysAlert tone="error">{error}</SysAlert>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-zinc-500">
          {rows.length} {esCliente ? 'clientes' : 'proveedores'} registrados
        </p>
        <SysButton size="sm" onClick={openCreate}>
          <Plus size={15} />
          Nuevo {esCliente ? 'cliente' : 'proveedor'}
        </SysButton>
      </div>

      <SysDataTable
        columns={columns}
        rows={rows}
        rowKey="id"
        searchPlaceholder={`Buscar ${
          esCliente ? 'cliente, RUC, teléfono...' : 'proveedor, RUC, teléfono...'
        }`}
        empty={loading ? 'Cargando...' : `Ningún ${esCliente ? 'cliente' : 'proveedor'} coincide.`}
        cardIcon={CardIcon}
        actions={actions}
      />

      {/* ---------------------------- crear / editar ---------------------------- */}
      <SysModal
        show={modal === 'crear' || modal === 'editar'}
        onClose={saving ? () => {} : closeModal}
        title={modal === 'crear' ? `Nuevo ${esCliente ? 'cliente' : 'proveedor'}` : 'Editar registro'}
        subtitle={modal === 'editar' ? selected?.razon_social : undefined}
        size="lg"
        footer={
          <>
            <SysButton variant="ghost" type="button" onClick={closeModal} disabled={saving}>
              Cancelar
            </SysButton>
            <SysButton type="button" onClick={submit} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </SysButton>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formError && (
            <div className="sm:col-span-2">
              <SysAlert tone="error">{formError}</SysAlert>
            </div>
          )}

          <SysField label="Tipo de documento" required error={formErrors.tipo_documento}>
            <SysSelect value={form.tipo_documento ?? 'RUC'} onChange={setField('tipo_documento')}>
              {TIPOS_DOCUMENTO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SysSelect>
          </SysField>

          <SysField label="Número de documento" required error={formErrors.numero_documento}>
            <SysInput
              value={form.numero_documento ?? ''}
              onChange={setField('numero_documento')}
              placeholder="20123456789"
              maxLength={20}
              error={formErrors.numero_documento}
            />
          </SysField>

          <SysField
            label={esCliente ? 'Cliente' : 'Razón social'}
            required
            error={formErrors.razon_social}
            className="sm:col-span-2"
          >
            <SysInput
              value={form.razon_social ?? ''}
              onChange={setField('razon_social')}
              placeholder="Razón social del negocio"
              error={formErrors.razon_social}
            />
          </SysField>

          <SysField label="Nombre comercial" error={formErrors.nombre_comercial} optional>
            <SysInput
              value={form.nombre_comercial ?? ''}
              onChange={setField('nombre_comercial')}
              placeholder="Nombre de fantasía"
              error={formErrors.nombre_comercial}
            />
          </SysField>

          <SysField label="Teléfono" error={formErrors.telefono} optional>
            <SysInput
              value={form.telefono ?? ''}
              onChange={setField('telefono')}
              placeholder="900 000 000"
              maxLength={20}
              error={formErrors.telefono}
            />
          </SysField>

          <SysField label="Correo" error={formErrors.email} optional className="sm:col-span-2">
            <SysInput
              type="email"
              value={form.email ?? ''}
              onChange={setField('email')}
              placeholder="contacto@empresa.com"
              error={formErrors.email}
            />
          </SysField>

          <SysField label="Distrito" error={formErrors.distrito} optional>
            <SysInput
              value={form.distrito ?? ''}
              onChange={setField('distrito')}
              error={formErrors.distrito}
            />
          </SysField>

          <SysField label="Provincia" error={formErrors.provincia} optional>
            <SysInput
              value={form.provincia ?? ''}
              onChange={setField('provincia')}
              error={formErrors.provincia}
            />
          </SysField>

          <SysField label="Departamento" error={formErrors.departamento} optional>
            <SysInput
              value={form.departamento ?? ''}
              onChange={setField('departamento')}
              error={formErrors.departamento}
            />
          </SysField>

          <SysField label="Dirección" error={formErrors.direccion} optional>
            <SysInput
              value={form.direccion ?? ''}
              onChange={setField('direccion')}
              placeholder="Av. / Jr. / Calle, número"
              error={formErrors.direccion}
            />
          </SysField>

          {esCliente && (
            <SysField label="Vendedor" error={formErrors.vendedor_id} optional>
              <SysSelect
                value={form.vendedor_id ?? ''}
                onChange={setField('vendedor_id')}
              >
                <option value="">Sin asignar</option>
                {vendedores.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </SysSelect>
            </SysField>
          )}

          <SysField label="Límite de crédito (S/)" error={formErrors.limite_credito} optional>
            <SysInput
              type="number"
              step="0.01"
              min="0"
              value={form.limite_credito ?? ''}
              onChange={setField('limite_credito')}
              placeholder="0.00"
              error={formErrors.limite_credito}
            />
          </SysField>

          <SysField label="Días de crédito" error={formErrors.dias_credito} optional>
            <SysInput
              type="number"
              min="0"
              value={form.dias_credito ?? ''}
              onChange={setField('dias_credito')}
              placeholder="30"
              error={formErrors.dias_credito}
            />
          </SysField>

          <SysField label="Estado" error={formErrors.estado}>
            <SysSelect value={form.estado ?? 'Activo'} onChange={setField('estado')}>
              {estadoOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </SysSelect>
          </SysField>

          <SysField label="Notas" error={formErrors.notas} optional className="sm:col-span-2">
            <SysTextarea
              rows={3}
              value={form.notas ?? ''}
              onChange={setField('notas')}
              placeholder="Observaciones internas del registro..."
              error={formErrors.notas}
            />
          </SysField>
        </div>
      </SysModal>

      {/* --------------------------------- detalle --------------------------------- */}
      <SysModal
        show={modal === 'detalle'}
        onClose={closeModal}
        title="Detalle del registro"
        subtitle={selected?.razon_social}
        size="md"
        footer={
          <SysButton variant="ghost" type="button" onClick={closeModal}>
            Cerrar
          </SysButton>
        }
      >
        <DetailGrid
          items={[
            {
              icon: BadgeCheck,
              label: 'Código',
              value: selected?.codigo,
            },
            {
              icon: ShieldCheck,
              label: 'Documento',
              value: selected?.numero_documento
                ? `${selected.tipo_documento} ${selected.numero_documento}`
                : undefined,
            },
            { icon: CardIcon, label: esCliente ? 'Cliente' : 'Proveedor', value: selected?.razon_social },
            { icon: Building2, label: 'Nombre comercial', value: selected?.nombre_comercial },
            { icon: Phone, label: 'Teléfono', value: selected?.telefono },
            { icon: Mail, label: 'Correo', value: selected?.email },
            {
              icon: MapPin,
              label: 'Ubicación',
              value: [selected?.direccion, selected?.distrito, selected?.provincia, selected?.departamento]
                .filter(Boolean)
                .join(', '),
            },
            { icon: UserRound, label: 'Estados', value: null },
          ].filter((i) => i.value || i.label === 'Estados')}
          estado={selected?.estado}
        />
        {selected?.notas && (
          <div className="mt-4 rounded-lg bg-zinc-50 px-3 py-2.5 text-[13px] leading-relaxed text-zinc-600 ring-1 ring-zinc-100">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Notas
            </p>
            {selected.notas}
          </div>
        )}
      </SysModal>

      {/* -------------------------------- confirmación -------------------------------- */}
      {confirmConfig && (
        <SysConfirm
          show
          onClose={() => setConfirm(null)}
          onConfirm={confirmConfig.onConfirm}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmLabel={confirmConfig.confirmLabel}
          tone={confirmConfig.tone}
          loading={confirming}
        />
      )}
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
        // Por defecto toman el color del sistema; las acciones de riesgo
        // (desactivar, eliminar) lo sobrescriben con ámbar y rojo.
        'rounded-md p-1.5 text-[rgb(var(--sys-rgb))] transition-colors hover:bg-[rgb(var(--sys-rgb)/0.12)]',
        className
      )}
    >
      {children}
    </button>
  );
}

function DetailGrid({ items, estado }) {
  return (
    <dl className="divide-y divide-zinc-100">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-4 py-2.5">
          <dt className="flex shrink-0 items-center gap-2 text-[13px] text-zinc-500">
            {item.icon && <item.icon size={14} className="text-zinc-400" />}
            {item.label}
          </dt>
          <dd className="min-w-0 truncate text-right text-[13px] font-medium text-zinc-800">
            {item.label === 'Estados' ? (
              <EstadoBadge estado={estado} />
            ) : (
              item.value ?? <span className="text-zinc-300">—</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
