# Voldemort Chat

Aplicación SPA responsive de chat con una versión ficticia de Lord Voldemort. Incluye las secciones Home, Chat y About, navegación con History API y una función serverless en Vercel que conecta el chat con Gemini.

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

Para probar la aplicación completa, incluido el chat y la función serverless `/api/chat`, configura `.env` y ejecuta:

```bash
npx vercel dev
```

Esto inicia el entorno local de Vercel para el frontend y la función `/api/chat`. Abre la URL que indique la terminal; normalmente es `http://localhost:3000`.

Para probar solo la interfaz, sin ejecutar la función `/api/chat`, puedes correr Vite:

```bash
npm run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173`. En este modo la interfaz funciona, pero las solicitudes del chat necesitan que también esté iniciado el servidor de Vercel.

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

## Proms IA 

- Aca dejo algunas 2 de las preguntas que le hice a la AI para este proyecto 

* Prom 1 
- Dame al menos 4 tests unitarios con vitest para que los pueda probar en mi api se calra y en pocos pasos

* AI respuesta 
- Aquí tienes 4 tests unitarios listos para copiar y usar con Vitest. Están diseñados simulando los endpoints típicos de una API (Controladores/Servicios) utilizando mocks para no tocar la base de datos real.

Preparación rápida (2 pasos)

1. Instala Vitest (si no lo has hecho):
bash
npm install -D vitest
Usa el código con precaución.
2. Ejecuta los tests:
bash
npx vitest
Usa el código con precaución.

Código de los Tests

Crea un archivo llamado api.test.js (o .ts si usas TypeScript) y pega el siguiente código:
javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- 1. SIMULACIÓN DE TU API (Funciones a testear) ---
// Imagina que estas funciones interactúan con tu base de datos o modelos
const userService = {
  getAllUsers: async () => ['Ana', 'Carlos'],
  getUserById: async (id) => {
    if (id === 999) return null;
    return { id, name: 'Ana' };
  },
  createUser: async (data) => {
    if (!data.name) throw new Error('El nombre es obligatorio');
    return { id: 1, ...data };
  }
};


// --- 2. BATERÍA DE TESTS UNITARIOS ---
describe('Tests Unitarios para API de Usuarios', () => {
  
  // Limpiar mocks antes de cada test por buena práctica
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // TEST 1: Verificar respuesta exitosa (GET lista)
  it('GET /users - Debería retornar una lista de usuarios', async () => {
    // Spy/Mock del método por si quieres controlar lo que devuelve
    const spy = vi.spyOn(userService, 'getAllUsers').mockResolvedValue(['Ana', 'Carlos']);

    const users = await userService.getAllUsers();

    expect(users).toBeInstanceOf(Array);
    expect(users).toContain('Ana');
    expect(spy).toHaveBeenCalledTimes(1); // Valida que se llamó a la DB interna
  });

  // TEST 2: Verificar obtención de un elemento específico (GET id)
  it('GET /users/:id - Debería retornar el usuario si existe', async () => {
    const user = await userService.getUserById(1);

    expect(user).toHaveProperty('id', 1);
    expect(user.name).toBe('Ana');
  });

  // TEST 3: Manejo de errores / Casos no encontrados (404)
  it('GET /users/:id - Debería retornar null si el usuario no existe', async () => {
    const user = await userService.getUserById(999);

    expect(user).toBeNull();
  });

  // TEST 4: Validación de datos de entrada y errores lanzados (POST)
  it('POST /users - Debería lanzar un error si falta el nombre en el payload', async () => {
    // Validamos que la función explote con el error correcto al enviar un objeto vacío
    await expect(userService.createUser({})).rejects.toThrow('El nombre es obligatorio');
  });

});
Usa el código con precaución.

¿Qué está pasando aquí?

• describe e it: Organizan tus pruebas y definen cada caso de uso.
• expect(...).toBe...: Son las aserciones que verifican que el código haga lo que promete.
• vi.spyOn / mockResolvedValue: Simulan el comportamiento de tus funciones para que el test sea rápido y no dependa de factores externos.
¿Quieres que adaptemos estos ejemplos a algún framework específico como Express, NestJS o Fastify?

# PROM 2 
- Dame tips para tener un css vistoso para una api con chat, about y home con un styles de lord voldemort, en cortos pasos y que lo pueda implementar en mi api

* Respuesta AI:
- Para lograr una estética oscura, mágica y amenazante inspirada en Lord Voldemort para tu interfaz de Chat, About y Home, necesitas contrastar la oscuridad absoluta con destellos de magia oscura (el verde de Avada Kedavra).
Aquí tienes la paleta de colores clave y los pasos CSS para implementarlo rápidamente.

🎨 La Paleta de Voldemort (Variables CSS)

Añade esto al inicio de tu archivo CSS global para definir los colores de la magia oscura:
css
:root {
  --fondo-oscuro: #0a0e0d;      /* Negro abisal, casi verdoso */
  --gris-tumba: #1b2220;        /* Gris piedra de cementerio */
  --verde-maldecido: #2ecc71;   /* Verde Avada Kedavra brillante */
  --verde-humo: #1e3d33;        /* Verde oscuro para transparencias */
  --blanco-hueso: #e5ede9;      /* Blanco pálido como la piel de Voldemort */
  --sangre-sucia: #78281f;      /* Rojo oscuro sutil para errores */
}
Usa el código con precaución.

🔮 Pasos para Implementar el Estilo en tu Estructura


1. Estilo General (Fondo Base y Tipografía)

Aplica una atmósfera opresiva y limpia. Usa fuentes serif para darle un toque antiguo/gótico o sans-serif muy minimalista.
css
body {
  background-color: var(--fondo-oscuro);
  color: var(--blanco-hueso);
  font-family: 'Cinzel', 'Georgia', serif; /* Si no tienes Cinzel, usará Georgia */
  margin: 0;
  background-image: radial-gradient(circle at 50% 50%, #11251d 0%, #0a0e0d 80%);
}

/* El "Brillo de las Artes Oscuras" en textos importantes */
h1, h2, .titulo-magico {
  color: #fff;
  text-shadow: 0 0 10px var(--verde-maldecido), 0 0 20px var(--verde-humo);
  letter-spacing: 2px;
}
Usa el código con precaución.

2. Sección HOME (La Entrada a las Sombras)

Usa tarjetas con bordes afilados y efectos de brillo que reaccionen al pasar el cursor (hover), simulando magia que reacciona.
css
.card-home {
  background: var(--gris-tumba);
  border: 1px solid var(--verde-humo);
  border-radius: 4px; /* Bordes rectos y afilados, nada muy redondeado */
  padding: 20px;
  transition: all 0.4s ease;
}

.card-home:hover {
  border-color: var(--verde-maldecido);
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  transform: translateY(-3px);
}
Usa el código con precaución.

3. Sección CHAT (Mensajes como Susurros de Serpiente)

El chat debe simular un pergamino oscuro o una conversación con el diario de Tom Riddle. El input debe brillar con magia.
css
.contenedor-chat {
  background: rgba(27, 34, 32, 0.7);
  backdrop-filter: blur(5px); /* Efecto humo neblinoso */
  border: 1px solid var(--verde-humo);
}

/* Mensajes del usuario (Tú) */
.mensaje-usuario {
  background: var(--verde-humo);
  border-left: 3px solid var(--verde-maldecido);
  color: #fff;
}

/* Mensajes de la API (Voldemort) */
.mensaje-api {
  background: #151918;
  border-right: 3px solid #7f8c8d; /* Gris espectral */
  font-style: italic;
}

/* El input donde escribes el "hechizo" */
.input-chat {
  background: #050706;
  border: 1px solid var(--verde-humo);
  color: var(--verde-maldecido);
  caret-color: var(--verde-maldecido); /* Cursor parpadeante verde */
}

.input-chat:focus {
  outline: none;
  border-color: var(--verde-maldecido);
  box-shadow: inset 0 0 5px var(--verde-maldecido);
}
Usa el código con precaución.

4. Sección ABOUT (Los Horrocruxes / Detalles de la API)

Para mostrar la información de tu API, usa un diseño de lista o bloques que imite un registro oscuro.
css
.about-seccion {
  border-left: 2px solid var(--verde-humo);
  padding-left: 20px;
}

/* Botones de acción */
.btn-oscuro {
  background: transparent;
  color: var(--verde-maldecido);
  border: 1px solid var(--verde-maldecido);
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s;
}

.btn-oscuro:hover {
  background: var(--verde-maldecido);
  color: var(--fondo-oscuro);
  box-shadow: 0 0 20px var(--verde-maldecido);
}
Usa el código con precaución.

⚡ Tip extra "Voldemort" para producción

Si quieres que tu API se sienta realmente viva (y letal), añade una animación de parpadeo suave al brillo verde en tus títulos para simular una llama o la Marca Tenebrosa:
css
@keyframes pulsoMalvado {
  0% { text-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
  50% { text-shadow: 0 0 25px rgba(46, 204, 113, 0.9); }
  100% { text-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
}

.titulo-magico {
  animation: pulsoMalvado 3s infinite ease-in-out;
}
Usa el código con precaución.
¿Qué framework o librería estás usando para renderizar estas secciones en tu frontend (por ejemplo, React, HTML puro, EJS o un dashboard de API como Swagger/Scalar)? Puedo darte las clases exactas adaptadas a tu estructura.
