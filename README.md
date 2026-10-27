# Voldemort Chat

SPA responsive de chat con un personaje ficticio inspirado en Harry Potter. La app tiene rutas para Home, Chat y About, usa History API y se conecta a Gemini mediante una API segura en Vercel.

## Requisitos

- Node.js 18+
- npm
- Una clave de Gemini en Google AI Studio

## Instalación

1. Clona o descarga este proyecto.
2. Entra en la carpeta del proyecto.
3. Instala dependencias:

```bash
npm install
```

## Variables de entorno

Copia el archivo `.env.example` a `.env` y agrega tu clave:

```bash
copy .env.example .env
```

Luego edita `.env`:

```env
GEMINI_API_KEY=tu_clave_aqui
```

## Ejecutar localmente

Para probar la app completa con la API serverless y la SPA, usa:

```bash
npx vercel dev
```

Esto levanta el entorno local de Vercel para el frontend y la función `/api/chat`.

Si solo querés probar la interfaz sin llamar a la API, podés correr:

```bash
npm run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

## Tests

```bash
npm test
```

## Build de producción

```bash
npm run build
```

## Deploy en Vercel

1. Conecta tu repositorio a Vercel.
2. Usa la rama principal para deployment.
3. Agrega la variable `GEMINI_API_KEY` en el panel de Settings > Environment Variables.
4. Haz deploy del proyecto.
5. Verifica la ruta `/api/chat` y la SPA en la URL pública.

## Estructura principal

- `src/` — frontend de la aplicación
- `api/chat.js` — función serverless proxy para Gemini
- `tests/` — pruebas unitarias con Vitest
- `README.md` — documentación del proyecto
