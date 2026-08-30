import { CreditCard } from 'lucide-react';
import CrudList from '@/Components/erp/CrudList';
import EstadoTag from '@/Components/erp/EstadoTag';
import { tercero, soles } from '@/Components/erp/helpers';

const columns = [
  { key: 'tercero', label: 'Pertenece a', render: tercero },
  { key: 'monto_limite', label: 'Límite', align: 'right', render: (row) => soles(row.monto_limite) },
  { key: 'dias_maximo', label: 'Días máx.', align: 'right' },
  { key: 'vigencia_desde', label: 'Vigente desde' },
  { key: 'vigencia_hasta', label: 'Vigente hasta' },
  { key: 'estado', label: 'Estado', render: (row) => <EstadoTag value={row.estado} /> },
];

const fields = [
  { name: 'cliente_id', label: 'Cliente', type: 'cliente' },
  { name: 'proveedor_id', label: 'Proveedor', type: 'proveedor' },
  {
    name: 'monto_limite',
    label: 'Monto límite',
    type: 'number',
    step: '0.01',
    required: true,
    placeholder: '10000.00',
  },
  { name: 'dias_maximo', label: 'Días máximo', type: 'number', placeholder: '30' },
  { name: 'vigencia_desde', label: 'Vigente desde', type: 'date' },
  {
    name: 'vigencia_hasta',
    label: 'Vigente hasta',
    type: 'date',
    hint: 'No puede ser anterior a la fecha de inicio',
  },
  { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'] },
  { name: 'notas', label: 'Notas', type: 'textarea', span: 2 },
];

export default function LimitesCredito() {
  return (
    <CrudList
      endpoint="limites-credito"
      singular="límite de crédito"
      plural="límites de crédito"
      icon={CreditCard}
      columns={columns}
      fields={fields}
      defaults={{ estado: 'Activo' }}
      titleField="monto_limite"
    />
  );
}
