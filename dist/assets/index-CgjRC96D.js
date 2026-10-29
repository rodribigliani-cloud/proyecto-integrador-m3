(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();const d="Lord Voldemort",A=`Eres ${d}, el mago oscuro de Harry Potter. Hablas con un tono frío, arrogante, dominante y muy seguro de ti mismo. A veces eres cruel, sarcástico y teatral, pero no insultas a la gente sin sentido. Responde de forma breve, intensa y con un estilo elegante, como si fueras un villano de gran presencia. No reveles que eres una IA. Mantén la conversación en el tono de un personaje de ficción.`;function E(e=new Date){return new Intl.DateTimeFormat("es-AR",{hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function l(e,t){return{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,role:e,text:t,timestamp:new Date().toISOString()}}const i="voldemort-chat-history";function y(){try{const e=sessionStorage.getItem(i)??localStorage.getItem(i),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function m(e){try{const t=JSON.stringify(e||[]);sessionStorage.setItem(i,t),localStorage.setItem(i,t)}catch(t){console.warn("No se pudo guardar el historial del chat.",t)}}function I(){sessionStorage.removeItem(i),localStorage.removeItem(i)}const L=[l("model","Ah, por fin alguien se atreve a hablar conmigo. ¿Qué deseas saber, mortal?")],s={messages:y().length?y():L},h=()=>document.querySelector("#app");function H(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(e){h().innerHTML=`
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark">V</span>
          <div>
            <p class="eyebrow">Personaje</p>
            <h1>Voldemort</h1>
          </div>
        </div>
        <nav class="nav" aria-label="Navegación principal">
          <a href="/home" class="nav-link" data-route="/home">Home</a>
          <a href="/chat" class="nav-link" data-route="/chat">Chat</a>
          <a href="/about" class="nav-link" data-route="/about">About</a>
        </nav>
      </header>
      <main class="page">${e}</main>
    </div>
  `,h().querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const n=t.dataset.route;S(n)})})}function S(e){const t=e.startsWith("/")?e:`/${e}`,o=t==="/"?"/home":t;window.history.pushState({},"",o),g()}function P(){var e;f(`
    <section class="panel hero">
      <div class="hero-copy">
        <p class="eyebrow">Bienvenido a la experiencia</p>
        <h2>Habla con el Señor Oscuro</h2>
        <p>
          Esta SPA te permite charlar con una versión ficcionada de Lord Voldemort,
          con una personalidad agresiva, ambiciosa y fascinante.
        </p>
        <button class="primary-button" data-route="/chat">Empezar a chatear</button>
      </div>
      <div class="hero-card">
        <div class="portrait">V</div>
        <p>"La verdadera fuerza no se mide por el miedo, sino por la voluntad."</p>
      </div>
    </section>
  `),(e=h().querySelector('[data-route="/chat"]'))==null||e.addEventListener("click",t=>{t.preventDefault(),S("/chat")})}function T(){f(`
    <section class="panel about">
      <h2>Sobre el proyecto</h2>
      <p>
        Esta aplicación es una SPA responsive creada para chatear con un personaje ficticio
        utilizando una estructura de rutas basada en History API.
      </p>
      <p>
        El personaje elegido es <strong>${d}</strong>, con una personalidad calculadora,
        arrogante y dominante, ideal para un sistema de prompt bien definido.
      </p>
      <ul class="feature-list">
        <li>Routing con History API</li>
        <li>Diseño mobile-first</li>
        <li>Integración segura con Gemini</li>
        <li>Pruebas con Vitest</li>
      </ul>
    </section>
  `)}function b(e){const t=document.querySelector("#typingIndicator");t&&t.classList.toggle("visible",e)}function O(){const e=s.messages;return`
    <section class="panel chat-panel">
      <div class="chat-header">
        <div>
          <p class="eyebrow">Conversación activa</p>
          <h2>${d}</h2>
        </div>
        <button id="clearHistory" class="ghost-button" type="button">Borrar historial</button>
      </div>

      <div id="chatMessages" class="chat-messages" aria-live="polite">
        ${e.map(t=>`
              <article class="message ${t.role==="user"?"user-message":"bot-message"}">
                <div class="message-header">
                  <span>${t.role==="user"?"Tú":d}</span>
                  <time>${E(new Date(t.timestamp))}</time>
                </div>
                <p>${H(t.text)}</p>
              </article>
            `).join("")}
      </div>

      <div id="typingIndicator" class="typing-indicator" aria-live="polite">
        <span></span><span></span><span></span>
        <small>${d} está escribiendo...</small>
      </div>

      <form id="chatForm" class="chat-form">
        <label class="sr-only" for="chatInput">Tu mensaje</label>
        <textarea id="chatInput" rows="1" placeholder="Escribe tu mensaje..."></textarea>
        <button type="submit" class="primary-button">Enviar</button>
      </form>
    </section>
  `}function p(){f(O());const e=document.querySelector("#chatForm"),t=document.querySelector("#chatInput"),o=document.querySelector("#clearHistory");t==null||t.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),e==null||e.requestSubmit())}),o==null||o.addEventListener("click",()=>{s.messages=[l("model","El historial ha sido borrado. ¿Qué más quieres saber, mortal?")],I(),m(s.messages),p()}),e==null||e.addEventListener("submit",async a=>{a.preventDefault();const r=t.value.trim();if(!r)return;const c=l("user",r);s.messages=[...s.messages,c],m(s.messages),p(),t.focus(),b(!0);try{const u=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:s.messages,characterPrompt:A})}),v=await u.json();if(!u.ok)throw new Error(v.error||"La petición falló.");const w=v.reply||"No pude preparar una respuesta adecuada.";s.messages=[...s.messages,l("model",w)]}catch(u){s.messages=[...s.messages,l("model",u.message||"No se pudo conectar con Gemini. Revisa la configuración del servidor e inténtalo otra vez.")]}finally{b(!1),m(s.messages),p()}});const n=document.querySelector("#chatMessages");n&&(n.scrollTop=n.scrollHeight)}function g(){const e=window.location.pathname||"/home";if(e==="/chat"){p();return}if(e==="/about"){T();return}P()}function q(){window.__voldemortAppInitialized||(window.__voldemortAppInitialized=!0,window.addEventListener("popstate",g),g())}q();
