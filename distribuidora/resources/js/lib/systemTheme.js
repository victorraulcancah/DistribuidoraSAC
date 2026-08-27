/**
 * Deriva la paleta completa de un sistema a partir de un único color.
 *
 * Tailwind purga las clases construidas en tiempo de ejecución (`bg-${x}-500`
 * nunca se genera), así que el color no puede viajar como nombre de clase.
 * Viaja como variables CSS: los componentes usan clases estáticas del tipo
 * `bg-[rgb(var(--sys-rgb))]` y el valor lo pone el contenedor.
 *
 * Los canales se guardan sueltos ("44 212 49") porque es la única forma de
 * poder aplicarles opacidad después: `rgb(var(--sys-rgb)/0.1)`.
 */

/** '#2CD431' | '2CD431' -> { r, g, b } */
export function hexToRgb(hex) {
  const clean = String(hex).replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** Mezcla lineal hacia negro. amount 0 = color original, 1 = negro. */
function darken({ r, g, b }, amount) {
  const k = 1 - amount;
  return {
    r: Math.round(r * k),
    g: Math.round(g * k),
    b: Math.round(b * k),
  };
}

/** Luminancia relativa WCAG. */
function luminance({ r, g, b }) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contraste WCAG entre dos luminancias. */
function contrast(l1, l2) {
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const channels = ({ r, g, b }) => `${r} ${g} ${b}`;

/**
 * Devuelve el objeto `style` con las variables del sistema.
 * Se aplica a un contenedor y todo el subárbol lo hereda por cascada.
 */
export function systemTheme(color) {
  const base = hexToRgb(color);
  const lum = luminance(base);

  // Texto que va ENCIMA del color sólido: el que mejor contraste dé.
  // Esto evita tener que decidir a mano si una tarjeta lleva tinta clara u oscura.
  const onLight = contrast(lum, luminance({ r: 24, g: 24, b: 27 }));
  const onDark = contrast(lum, luminance({ r: 255, g: 255, b: 255 }));
  const useDarkInk = onLight >= onDark;
  const on = useDarkInk ? '#18181b' : '#ffffff';
  // Los canales sueltos hacen falta aparte: `bg-[var(--x)]/15` no funciona en
  // Tailwind si la variable trae un hex; con `rgb(var(--x-rgb)/0.15)` sí.
  const onRgb = useDarkInk ? '24 24 27' : '255 255 255';

  // Texto del color PERO sobre fondo blanco: hay que oscurecerlo o no se lee.
  // Cuanto más claro es el color original, más se oscurece.
  const inkAmount = lum > 0.4 ? 0.55 : lum > 0.2 ? 0.35 : 0.15;

  return {
    '--sys-rgb': channels(base),
    '--sys-dark-rgb': channels(darken(base, 0.2)),
    '--sys-ink-rgb': channels(darken(base, inkAmount)),
    '--sys-on': on,
    '--sys-on-rgb': onRgb,
  };
}
