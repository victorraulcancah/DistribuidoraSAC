export default function POSPreview() {
  const items = [
    { name: 'Laptop Pro 15"', qty: 1, price: 3499.00, sku: 'LP-15-PRO' },
    { name: 'Mouse Inalámbrico', qty: 2, price: 89.90, sku: 'MS-WL-01' },
    { name: 'Teclado Mecánico', qty: 1, price: 249.00, sku: 'KB-MC-02' },
    { name: 'Monitor 27" 4K', qty: 1, price: 1299.00, sku: 'MN-27-4K' },
    { name: 'Hub USB-C 7en1', qty: 1, price: 159.00, sku: 'HB-7IN1' },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2v-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-100">POS Terminal #01</p>
            <p className="text-xs text-zinc-500">Caja: Principal • Operador: Juan P.</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">Abierto</span>
      </div>

      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 px-2 bg-zinc-900/40 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">{item.name}</p>
              <p className="text-xs text-zinc-500 font-mono">{item.sku}</p>
            </div>
            <div className="flex items-center gap-3 text-right ml-3">
              <span className="text-xs text-zinc-400">x{item.qty}</span>
              <span className="text-sm font-medium text-zinc-100 w-20 text-right">
                S/ {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-3 space-y-2">
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>IGV (18%)</span>
          <span>S/ {igv.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-zinc-100 border-t border-zinc-800 pt-2">
          <span>TOTAL</span>
          <span className="text-amber-400">S/ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
          Pagar Efectivo
        </button>
        <button className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-medium transition-colors">
          Pagar Tarjeta
        </button>
      </div>
    </div>
  );
}