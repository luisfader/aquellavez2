# Aquella vez 2 · Manual de español (versión web)

Sitio interactivo del manual *Aquella vez 2* de Luis Fader.

- `index.html` — portada, prólogo y lista de unidades.
- `unidad1.html` — Unidad 1 (A. Me gusta · B. ¿Dónde estuviste ayer? · C. Un día de mi vida · D. Gramática · E. Cultura · F. Historieta).
- `js/manual.js` — motor común: glosario ruso al pasar el cursor o tocar, lectura en voz alta, ejercicios con corrección automática, progreso guardado en el navegador.
- `js/unidad1.js` — textos y ejercicios de la Unidad 1.
- `css/estilos.css` — estilos.
- `img/` — ilustraciones (exportadas desde Figma).

## Cómo añadir una unidad

1. Copiar `unidad1.html` como `unidadN.html` y cambiar el script `js/unidad1.js` por `js/unidadN.js`.
2. Crear `js/unidadN.js` con el mismo formato. Marcas dentro de los textos:
   - `[[palabra|перевод]]` → palabra con traducción.
   - `{{respuesta|otra respuesta}}` → hueco para completar.
   - `**texto**` → negrita.
3. Añadir la tarjeta de la unidad en `index.html`.

Tipos de bloque disponibles: `dialogo`, `texto`, `figura`, `vf`, `elegir`, `huecos` (escribir o con fichas), `unir`, `ordenar`, `abierta`, `teoria`, `escala`, `pista`, `sabias`, `historieta`.
