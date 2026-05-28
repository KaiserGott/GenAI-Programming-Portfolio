Hero SPA — Innovate Without Limits (Demo)

Descripción
- SPA demo que replica la pantalla Hero del diseño proporcionado en Figma.
- Implementada en un único archivo `hero-spa.html` usando Tailwind CDN y JavaScript mínimo para interacciones (contadores animados, modal, botón play, radial SVG).

Archivos
- `hero-spa.html` — archivo principal, responsivo y autónomo.

Cómo correr localmente

Opción A — Python (rápido, sin instalar Node):

```powershell
# desde la carpeta hero-spa
python -m http.server 8001 --bind 127.0.0.1
# luego abrir en el navegador:
# http://127.0.0.1:8001/hero-spa.html
```

Opción B — Node/npm (usar si querés un script npm):

```powershell
# instalar dependencias (opcional):
npm install -g serve   # o instalar localmente con 'npm install serve --save-dev'
npm start
# abre en http://127.0.0.1:8001/hero-spa.html (según script en package.json)
```

Notas
- El archivo es autónomo y funciona sin build.
- Si querés que genere una `dist/` optimizada o que incluya bundler (Vite/Webpack), lo preparo.

Contacto
- Puedo añadir accesibilidad, animaciones extra o exportar variantes.
