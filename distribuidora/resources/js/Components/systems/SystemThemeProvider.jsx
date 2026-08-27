import { createContext, useContext, useMemo } from 'react';
import { systemTheme } from '@/lib/systemTheme';

const SystemContext = createContext(null);

/** Devuelve el sistema activo (id, nombre, icono, color) sin pasar props. */
export function useSystem() {
  return useContext(SystemContext);
}

/**
 * Pinta las variables de color del sistema en un contenedor.
 * Todo lo que quede dentro las hereda: no hace falta pasar el color
 * componente por componente.
 */
export default function SystemThemeProvider({ system, as: Tag = 'div', className, children }) {
  const style = useMemo(
    () => systemTheme(system?.color ?? '#3f3f46', system?.ink),
    [system?.color, system?.ink]
  );

  return (
    <SystemContext.Provider value={system}>
      <Tag style={style} className={className}>
        {children}
      </Tag>
    </SystemContext.Provider>
  );
}
