# Guía para Arreglar el Despliegue en Render

El error persiste porque Render está configurado manualmente para ejecutar un comando que no existe (`node server.js`) en lugar de usar el archivo `package.json`.

## Instrucciones para el Dashboard de Render

Sigue estos pasos en tu cuenta de **Render.com**:

1.  Entra a tu servicio **BDEC**.
2.  Ve a la pestaña **"Settings"** (Configuración) en el menú de la izquierda.
3.  Busca la sección **"Build & Deploy"**.
4.  Verifica y cambia los siguientes campos:

| Campo | Valor Correcto |
| :--- | :--- |
| **Root Directory** | *Dejar vacío* (o poner `.`) |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

5.  Haz clic en **"Save Changes"**.
6.  Ve a la pestaña **"Events"** y verás que se inicia un nuevo despliegue automáticamente.

---

### ¿Por qué falla actualmente?
Según la captura, Render está intentando ejecutar:
`node /opt/render/project/src/server.js`

Esto significa que:
- O el **Root Directory** está apuntando a `src/`.
- O el **Start Command** está fijado en `node server.js`.

Al cambiarlo a `npm start`, Render usará la configuración que ya preparé en el código para iniciar el servidor correctamente desde `server/index.ts`.
