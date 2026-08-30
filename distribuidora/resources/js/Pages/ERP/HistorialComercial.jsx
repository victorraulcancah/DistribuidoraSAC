import { History } from 'lucide-react';
import CrudList from '@/Components/erp/CrudList';
import EstadoTag from '@/Components/erp/EstadoTag';
import { tercero, soles } from '@/Components/erp/helpers';

const TIPOS_MOVIMIENTO = [
  'Compra',
  'Venta',
  'Cobro',
  'Pago',
  'Devolucion',
  'NotaCredito',
  'NotaDebito',
  'Otro',
];

const columns = [
  { key: 'fecha', label: 'Fecha' },
  { key: 'tipo_movimiento', label: 'Movimiento' },
  { key: 'documento', label: 'Documento' },
  { key: 'tercero', label: 'Pertenece a', render: tercero },
  { key: 'monto', label: 'Monto', align: 'right', render: (row) => soles(row.monto) },
  { key: 'estado', label: 'Estado', render: (row) => <EstadoTag value={row.estado} /> },
];

const fields = [
  { name: 'cliente_id', label: 'Cliente', type: 'cliente' },
  { name: 'proveedor_id', label: 'Proveedor', type: 'proveedor' },
  { name: 'tipo_movimiento', label: 'Tipo de movimiento', type: 'select', options: TIPOS_MOVIMIENTO },
  { name: 'documento', label: 'Documento', placeholder: 'F001-000123' },
  { name: 'fecha', label: 'Fecha', type: 'date' },
  {
    name: 'monto',
    label: 'Monto',
    type: 'number',
    step: '0.01',
    required: true,
    placeholder: '1250.00',
  },
  {
    name: 'estado',
    label: 'Estado',
    type: 'select',
    options: ['Registrado', 'Procesado', 'Anulado'],
  },
  { name: 'notas', label: 'Notas', type: 'textarea', span: 2 },
];

export default function HistorialComercial() {
  return (
    <CrudList
      endpoint="historial-comercial"
      singular="movimiento"
      plural="movimientos"
      icon={History}
      columns={columns}
      fields={fields}
      defaults={{ estado: 'Registrado', tipo_movimiento: 'Venta' }}
      titleField="documento"
    />
  );
}
