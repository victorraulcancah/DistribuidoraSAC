import { UserRound } from 'lucide-react';
import CrudList from '@/Components/erp/CrudList';
import SysBadge from '@/Components/sys/SysBadge';
import EstadoTag from '@/Components/erp/EstadoTag';
import { tercero } from '@/Components/erp/helpers';

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Correo' },
  { key: 'tercero', label: 'Pertenece a', render: tercero },
  {
    key: 'es_principal',
    label: 'Principal',
    render: (row) => (row.es_principal ? <SysBadge>Principal</SysBadge> : '—'),
  },
  { key: 'estado', label: 'Estado', render: (row) => <EstadoTag value={row.estado} /> },
];

const fields = [
  { name: 'nombre', label: 'Nombre', required: true, placeholder: 'Nombre y apellidos' },
  { name: 'cargo', label: 'Cargo', placeholder: 'Gerente, comprador...' },
  { name: 'telefono', label: 'Teléfono', placeholder: '987654321' },
  { name: 'email', label: 'Correo', placeholder: 'nombre@empresa.com' },
  { name: 'cliente_id', label: 'Cliente', type: 'cliente' },
  { name: 'proveedor_id', label: 'Proveedor', type: 'proveedor' },
  {
    name: 'es_principal',
    label: 'Contacto principal',
    type: 'select',
    options: ['Sí', 'No'],
    hint: 'El contacto por defecto del tercero',
  },
  { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'] },
  { name: 'notas', label: 'Notas', type: 'textarea', span: 2 },
];

export default function Contactos() {
  return (
    <CrudList
      endpoint="contactos"
      singular="contacto"
      plural="contactos"
      icon={UserRound}
      columns={columns}
      fields={fields}
      defaults={{ estado: 'Activo', es_principal: 'No' }}
      titleField="nombre"
    />
  );
}
