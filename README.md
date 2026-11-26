# SS Clean Service & More: página de muestra

Página de una sola sección con anclas para **SS Clean Service & More LLC** (Morovis, Puerto Rico): limpieza comercial, servicio janitorial y catering.

Está hecha en HTML, CSS y JavaScript, sin frameworks ni paso de compilación. Abre con doble clic y se sube tal cual a Netlify, GitHub Pages o Vercel.

```
index.html      la página
styles.css      estilos (colores en :root, con modo oscuro)
main.js         menú móvil, botones Copiar, formulario a WhatsApp, aplica content.js
content.js      TODOS los datos de ejemplo, en un solo lugar
assets/         logo.svg (también favicon), favicon-32.png, apple-touch-icon.png,
                og.jpg (1200 × 630), galeria-1…6.webp (fotos de ejemplo)
robots.txt
sitemap.xml
```

---

## 1. Cómo abrirla

- **En su computadora:** doble clic en `index.html`. Todo funciona sin servidor.
- **Con servidor local (opcional):** en esta carpeta, `python3 -m http.server 8000` y abra `http://localhost:8000`.

> Para que funcione el botón **Copiar** hace falta `https://` o `localhost`. Al abrirla con doble clic, el botón usa un método alterno que también funciona en casi todos los navegadores.

---

## 2. Cómo cambiar los datos de ejemplo (`content.js`)

Todo lo que aparece **resaltado en amarillo** sale de `content.js`. Cada dato tiene esta forma:

```js
telefono: { valor: "(787) 000-0000", pendiente: true },
```

1. Escriba el dato real en `valor`.
2. Cambie `pendiente: true` por `pendiente: false`.

Al guardar y recargar, el resaltado desaparece, y también las notas que lo acompañan ("Foto de ejemplo", "Confirmar si lo ofrecen", "Pueblos de ejemplo").

| Clave | Qué cambia |
|---|---|
| `modoMuestra` | `false` esconde la franja de arriba y la nota "Página de muestra hecha por Diego" del footer |
| `telefono` | El número que se ve y todos los botones **Llamar** (el enlace `tel:` se arma solo) |
| `whatsapp` | Solo números, con el 1 delante: `17875551234`. Cambia todos los botones de WhatsApp y el formulario |
| `correo` | El correo de contacto y su enlace |
| `horario` | El horario de contacto |
| `pueblos` | La lista de pueblos. El primero (Morovis) se resalta en verde |
| `limpiezaProfunda` | `pendiente: false` si lo ofrecen. `mostrar: false` esconde la tarjeta si no lo ofrecen |
| `cateringPersonas` | Completa la frase "Preparamos catering para grupos ___." Ej.: `"de 10 a 150 personas"` |
| `certificaciones` | Aparece en "Por qué elegirnos" y en la ficha para agencias |
| `productosPropios` | `pendiente: false` cuando confirmen que traen productos y equipo |
| `fotos` | `src`, `alt` y `titulo` de las 6 fotos de la galería |

### Fotos reales

1. Exporte las fotos en **WebP, 800 × 600 px** (4:3). Con [squoosh.app](https://squoosh.app) se hace gratis.
2. Póngalas en `assets/` (puede usar los mismos nombres `galeria-1.webp` … `galeria-6.webp` o nombres nuevos).
3. Actualice `src`, `alt` (una descripción corta de la foto) y `titulo` en `content.js`, y ponga `fotos.pendiente: false`.

### Antes de publicar la versión final

El JavaScript aplica `content.js` al cargar. Los textos de ejemplo también están escritos dentro de `index.html` para que la página se vea completa aunque el JavaScript falle. Para la versión final, busque `PLACEHOLDER` en `index.html` (cada dato de ejemplo tiene un comentario al lado) y ponga ahí también el dato real. Así Google y los navegadores sin JavaScript ven la información correcta.

Además, cambie `https://www.ejemplo.com/` por el dominio real en:

- `index.html`: bloque `application/ld+json` (`url`, `logo`, `image`) y, mejor con la dirección completa, `og:image`
- `sitemap.xml` y `robots.txt`

En el bloque `application/ld+json`, ponga también `telephone` (formato `+17875551234`) y `email`.

---

## 3. Cómo subirla

### Netlify (lo más fácil)

1. Entre a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastre **la carpeta completa** del proyecto.
3. Listo: Netlify le da un enlace `https://algo.netlify.app`. Puede cambiar el nombre o conectar un dominio en *Site configuration → Domain management*.

### GitHub Pages

1. Suba estos archivos a un repositorio de GitHub (rama `main`, en la raíz).
2. En el repositorio: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. En uno o dos minutos queda en `https://<usuario>.github.io/<repositorio>/`.

### Vercel

Importe el repositorio en [vercel.com/new](https://vercel.com/new). Escoja *Framework preset: Other*, sin comando de build. Se publica tal cual.

---

## 4. Placeholders pendientes

Todo esto está de ejemplo y hay que confirmarlo con la dueña:

- [ ] **Teléfono**: `(787) 000-0000`
- [ ] **WhatsApp**: mismo número (`https://wa.me/17870000000`)
- [ ] **Correo**: `correo@ejemplo.com`
- [ ] **Horario**: `Lunes a viernes, 8:00 a.m. a 5:00 p.m.`
- [ ] **Pueblos que sirven**: Morovis + Ciales, Orocovis, Corozal, Vega Baja, Manatí, Vega Alta (pueblos de ejemplo)
- [ ] **Limpieza profunda y desinfección**: confirmar si lo ofrecen
- [ ] **Catering**: mínimo y máximo de personas
- [ ] **Certificaciones vigentes** (mujer empresaria, registros de suplidor, etc.)
- [ ] **Productos y equipo propios**: confirmar
- [ ] **Fotos**: las 6 de la galería son ilustraciones de ejemplo
- [ ] **Dominio** del sitio (`https://www.ejemplo.com/` en JSON-LD, `sitemap.xml` y `robots.txt`)
- [ ] **Capability statement**: el botón lleva a Contacto. Si tienen el PDF, se puede enlazar directo

**Datos confirmados que ya usa la página:** nombre legal, Morovis como ubicación, presidenta Luz V. Rivera Rivera, servicios de limpieza/janitorial y catering, clientes comerciales, gubernamentales e institucionales, y códigos NAICS 561720 y 722320.

---

## 5. Imágenes y créditos

- **Fotos de la galería**: ilustraciones planas propias, hechas en SVG para esta muestra y exportadas a WebP. No son fotos de otros negocios ni de bancos de imágenes.
- **Logo**: monograma "SS" hecho para esta muestra con el contorno de la letra de Bricolage Grotesque, convertido a trazo vectorial.
- **Fuentes**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) y [Figtree](https://fonts.google.com/specimen/Figtree), de Google Fonts (licencia SIL Open Font License).
- **Íconos**: SVG inline. Varios se basan en el estilo de Feather Icons (licencia MIT).

---

## 6. Detalles técnicos

- Mobile-first (diseñada a 375 px). Sin scroll horizontal y con margen lateral de 16 px como mínimo.
- Modo oscuro automático (`prefers-color-scheme`). Todos los colores son tokens en `:root`.
- Contraste AA, foco visible, `lang="es"`, menú y acordeón usables con teclado, respeta `prefers-reduced-motion`.
- Sin JavaScript, el menú se muestra abierto, todo el contenido sigue visible y el formulario abre WhatsApp con el mensaje.
- El formulario no usa servidor: arma el texto y abre `https://wa.me/<número>?text=...`. La página no guarda datos.
- Peso: unos 85 KB de código e íconos, más unos 42 KB de imágenes de ejemplo (sin contar las fuentes de Google).
