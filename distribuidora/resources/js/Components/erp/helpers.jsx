/** Nombre del cliente o proveedor al que pertenece un registro. */
export function tercero(row) {
  return row.cliente?.razon_social ?? row.proveedor?.razon_social ?? '—';
}

/** Importe en soles con dos decimales. */
export function soles(value) {
  const n = Number(value ?? 0);
  return `S/ ${n.toFixed(2)}`;
}
