import { Handshake } from 'lucide-react';
import CrudList from '@/Components/erp/CrudList';
import EstadoTag from '@/Components/erp/EstadoTag';
import { tercero } from '@/Components/erp/helpers';

const TIPOLOGIAS = ['Mascota', 'Venta', 'Compra', 'Ambos'];
const FORMAS_PAGO = ['Contado', 'Credito', 'Contado-Credito'];
const TIPO_CAMBIO = ['venta', 'compra'];

const columns = [
  { key: 'tercero', label: 'Pertenece a', render: tercero },
  { key: 'tipologia', label: 'Tipología' },
  { key: 'forma_pago', label: 'Forma de pago' },
  { key: 'dias_credito', label: 'Días crédito', align: 'right' },
  {
    key: 'tasa_descuento',
    label: 'Descuento',
    align: 'right',
    render: (row) => (row.tasa_descuento ? `${Number(row.tasa_descuento).toFixed(2)} %` : '—'),
  },
  { key: 'dias_descuento', label: 'Días desc.', align: 'right' },
  { key: 'tipo_cambio_factor', label: 'Tipo de cambio' },
  { key: 'estado', label: 'Estado', render: (row) => <EstadoTag value={row.estado} /> },
];

const fields = [
  { name: 'cliente_id', label: 'Cliente', type: 'cliente' },
  { name: 'proveedor_id', label: 'Proveedor', type: 'proveedor' },
  { name: 'tipologia', label: 'Tipología', type: 'select', options: TIPOLOGIAS },
  { name: 'forma_pago', label: 'Forma de pago', type: 'select', options: FORMAS_PAGO },
  { name: 'dias_credito', label: 'Días de crédito', type: 'number', placeholder: '30' },
  {
    name: 'tasa_descuento',
    label: 'Tasa de descuento (%)',
    type: 'number',
    step: '0.01',
    placeholder: '2.50',
  },
  { name: 'dias_descuento', label: 'Días de descuento', type: 'number', placeholder: '10' },
  {
    name: 'tipo_cambio_factor',
    label: 'Tipo de cambio',
    type: 'select',
    options: TIPO_CAMBIO,
    hint: 'Cotización a aplicar en moneda extranjera',
  },
  { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'] },
  { name: 'notas', label: 'Notas', type: 'textarea', span: 2 },
];

export default function CondicionesComerciales() {
  return (
    <CrudList
      endpoint="condiciones-comerciales"
      singular="condición comercial"
      plural="condiciones comerciales"
      icon={Handshake}
      columns={columns}
      fields={fields}
      defaults={{ estado: 'Activo', forma_pago: 'Contado' }}
      titleField="forma_pago"
    />
  );
}
