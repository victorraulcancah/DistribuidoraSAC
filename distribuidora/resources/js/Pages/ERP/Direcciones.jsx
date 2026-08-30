import { MapPin } from 'lucide-react';
import CrudList from '@/Components/erp/CrudList';
import SysBadge from '@/Components/sys/SysBadge';
import EstadoTag from '@/Components/erp/EstadoTag';
import { tercero } from '@/Components/erp/helpers';

const TIPOS = ['Principal', 'Envio', 'Facturacion', 'Almacen', 'Otro'];

const columns = [
  { key: 'tipo', label: 'Tipo' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'distrito', label: 'Distrito' },
  { key: 'provincia', label: 'Provincia' },
  { key: 'departamento', label: 'Departamento' },
  { key: 'tercero', label: 'Pertenece a', render: tercero },
  {
    key: 'es_principal',
    label: 'Principal',
    render: (row) => (row.es_principal ? <SysBadge>Principal</SysBadge> : '—'),
  },
  { key: 'estado', label: 'Estado', render: (row) => <EstadoTag value={row.estado} /> },
];

const fields = [
  { name: 'direccion', label: 'Dirección', required: true, span: 2, placeholder: 'Av. / Jr. / Calle, número' },
  { name: 'tipo', label: 'Tipo', type: 'select', options: TIPOS },
  { name: 'referencia', label: 'Referencia', placeholder: 'Frente al parque...' },
  { name: 'departamento', label: 'Departamento', placeholder: 'Lima' },
  { name: 'provincia', label: 'Provincia', placeholder: 'Lima' },
  { name: 'distrito', label: 'Distrito', placeholder: 'San Isidro' },
  { name: 'telefono', label: 'Teléfono', placeholder: '987654321' },
  { name: 'cliente_id', label: 'Cliente', type: 'cliente' },
  { name: 'proveedor_id', label: 'Proveedor', type: 'proveedor' },
  { name: 'es_principal', label: 'Dirección principal', type: 'select', options: ['Sí', 'No'] },
  { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'] },
];

export default function Direcciones() {
  return (
    <CrudList
      endpoint="direcciones"
      singular="dirección"
      plural="direcciones"
      icon={MapPin}
      columns={columns}
      fields={fields}
      defaults={{ estado: 'Activo', tipo: 'Principal', es_principal: 'No' }}
      titleField="direccion"
    />
  );
}
