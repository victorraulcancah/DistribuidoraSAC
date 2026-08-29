import { getSystem } from '@/data/systems';

/**
 * Enrutado mínimo sobre la History API. No hace falta una librería: la suite
 * solo tiene tres vistas y el mapeo con la URL es directo.
 *
 *   /login                          → formulario de acceso
 *   /inicio                         → selector de sistemas
 *   /erp/ventas/facturacion         → módulo `ventas.facturacion` de ERP
 */

/** Lee la ruta actual del navegador. */
export function readRoute() {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (!parts.length || parts[0] === 'login') return { view: 'login' };
  if (parts[0] === 'inicio') return { view: 'home' };

  const system = getSystem(parts[0].toUpperCase());
  if (system) {
    // Los ids de módulo son `grupo.modulo`; en la URL viajan como dos segmentos.
    const moduleId = parts.slice(1).join('.') || null;
    return { view: 'panel', systemId: system.id, moduleId };
  }

  return { view: 'home' };
}

/** Construye la URL de una vista. */
export function routeUrl(route) {
  if (route.view === 'login') return '/login';
  if (route.view === 'home') return '/inicio';

  const base = `/${route.systemId.toLowerCase()}`;
  return route.moduleId ? `${base}/${route.moduleId.split('.').join('/')}` : base;
}

/** Navega sin recargar y deja entrada en el historial. */
export function pushRoute(route) {
  const url = routeUrl(route);
  if (url !== window.location.pathname) window.history.pushState({}, '', url);
}

/** Cambia la URL sin crear una entrada nueva (para correcciones de ruta). */
export function replaceRoute(route) {
  const url = routeUrl(route);
  if (url !== window.location.pathname) window.history.replaceState({}, '', url);
}
