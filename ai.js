/* ============================================================
   FISIOLOGIA INTERATIVA — Tutor IA
   Padrão: Puter.js (https://js.puter.com) — IA gratuita no
   navegador, SEM chave de API (na 1ª use pede login gratuito).
   Opcional: configurar endpoint próprio compatível com OpenAI
   (Groq, OpenRouter, OpenAI...) em "⚙ Configurar".
   ============================================================ */

window.TutorIA = (function () {
  'use strict';

  const LS_KEY = 'fisio-ia-config';
  let config = { endpoint: '', model: '', apiKey: '' };
  try { const saved = localStorage.getItem(LS_KEY); if (saved) config = Object.assign(config, JSON.parse(saved)); } catch (e) { /* ignora */ }

  let history = [];           // [{role:'user'|'assistant', content}]
  let contextoAtual = null;   // texto do tópico sendo visto

  const drawer = document.getElementById('chat-drawer');
  const fab = document.getElementById('fab-ia');
  const msgs = document.getElementById('chat-msgs');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  /* ---------- UI ---------- */
  function abrir(contexto) {
    if (contexto !== undefined) contextoAtual = contexto;
    drawer.classList.add('aberto');
    fab.classList.add('escondido');
    if (!msgs.childElementCount) mensagemSistema('Olá! Sou o <b>Tutor IA</b>. Pergunte qualquer coisa sobre o tópico que você está vendo — ou peça: <i>"explique como se eu fosse calouro"</i>, <i>"qual a relevância clínica?"</i>, <i>"crie 3 questões"</i>.');
    setTimeout(() => input.focus(), 250);
  }
  function fechar() { drawer.classList.remove('aberto'); fab.classList.remove('escondido'); }
  function toggle() { drawer.classList.contains('aberto') ? fechar() : abrir(); }

  function mensagemSistema(html) {
    const div = document.createElement('div');
    div.className = 'msg sistema';
    div.innerHTML = html;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function addMsg(role, html) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + role;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = html;
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return bubble;
  }
  function renderMd(txt) {
    let h = txt
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.+?)\*/g, '<i>$1</i>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/#{1,3}\s*(.+)/g, '<b>$1</b>');
    h = h.split('\n').map(l => {
      const t = l.trim();
      if (/^[-•]\s+/.test(t)) return '<li>' + t.replace(/^[-•]\s+/, '') + '</li>';
      return t ? '<p>' + t + '</p>' : '';
    }).join('');
    h = h.replace(/(<li>[\s\S]*?<\/li>)(?![\s\S]*?<li>)/, m => m); // mantém
    h = h.replace(/(?:<li>.*<\/li>)+/g, m => '<ul>' + m + '</ul>');
    return h;
  }

  /* ---------- chamadas ---------- */
  const SYSTEM_BASE = 'Você é o Tutor IA do site "Fisiologia Interativa", um material de estudo de fisiologia em português (nível graduação em saúde). Explique com clareza, precisão científica e em português do Brasil. Use analogias e exemplos clínicos quando ajudar. Seja relativamente conciso (use listas quando fizer sentido).';

  async function chamarPuter(pergunta) {
    const msgsApi = [
      { role: 'system', content: SYSTEM_BASE + (contextoAtual ? '\n\nO estudante está vendo este tópico do site (use como contexto):\n' + contextoAtual : '') },
      ...history.slice(-8),
      { role: 'user', content: pergunta }
    ];
    const opts = {};
    const sel = document.getElementById('chat-modelo');
    if (sel && sel.value && sel.value !== 'auto') opts.model = sel.value;
    opts.stream = true;
    try {
      const stream = await puter.ai.chat(msgsApi, opts);
      let out = '';
      const bubble = addMsg('assistant', '');
      for await (const part of stream) {
        const piece = part && (part.text || (part.message && part.message.content));
        if (typeof piece === 'string') out += piece;
        bubble.innerHTML = renderMd(out || '…');
        msgs.scrollTop = msgs.scrollHeight;
      }
      if (!out) throw new Error('resposta vazia');
      history.push({ role: 'user', content: pergunta }, { role: 'assistant', content: out });
      return;
    } catch (e) {
      // fallback: sem streaming
      const resp = await puter.ai.chat(msgsApi, sel && sel.value && sel.value !== 'auto' ? { model: sel.value } : undefined);
      let txt = '';
      if (typeof resp === 'string') txt = resp;
      else if (resp && resp.message) txt = typeof resp.message.content === 'string' ? resp.message.content : JSON.stringify(resp.message.content);
      else if (resp && resp.text) txt = resp.text;
      if (!txt) throw new Error('Formato de resposta não reconhecido');
      addMsg('assistant', renderMd(txt));
      history.push({ role: 'user', content: pergunta }, { role: 'assistant', content: txt });
    }
  }

  async function chamarCustom(pergunta) {
    const msgsApi = [
      { role: 'system', content: SYSTEM_BASE + (contextoAtual ? '\n\nO estudante está vendo este tópico do site (use como contexto):\n' + contextoAtual : '') },
      ...history.slice(-8),
      { role: 'user', content: pergunta }
    ];
    const r = await fetch(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.apiKey },
      body: JSON.stringify({ model: config.model || 'gpt-4o-mini', messages: msgsApi })
    });
    if (!r.ok) throw new Error('HTTP ' + r.status + ' — verifique endpoint/chave');
    const data = await r.json();
    const txt = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
    if (!txt) throw new Error('Resposta vazia da API');
    addMsg('assistant', renderMd(txt));
    history.push({ role: 'user', content: pergunta }, { role: 'assistant', content: txt });
  }

  let busy = false;
  async function perguntar(texto) {
    if (busy || !texto.trim()) return;
    busy = true;
    sendBtn.disabled = true;
    addMsg('user', renderMd(texto));
    input.value = '';
    const pensando = addMsg('assistant', '<span class="pensando">⬤⬤⬤ pensando…</span>');
    try {
      if (config.endpoint && config.apiKey) await chamarCustom(texto);
      else {
        if (typeof puter === 'undefined') throw new Error('Puter.js não carregou (sem internet?). Configure sua própria chave em ⚙.');
        await chamarPuter(texto);
      }
      pensando.remove();
    } catch (e) {
      pensando.remove();
      addMsg('assistant', renderMd('⚠️ **Não consegui responder agora:** ' + (e && e.message ? e.message : e) + '\n\nDicas: verifique a internet; na primeira vez o Puter pode pedir um login gratuito (conta deles); ou clique em **⚙ Configurar** para usar sua própria chave de API (Groq/OpenAI/OpenRouter).'));
    } finally {
      busy = false;
      sendBtn.disabled = false;
    }
  }

  /* ---------- ações públicas ---------- */
  function explicarTopico(titulo, corpo) {
    abrir('Tópico: ' + titulo + '\n' + corpo.replace(/[#*`-]/g, '').slice(0, 4000));
    perguntar('Explique este tópico com suas palavras de forma didática, destaque os pontos que mais caem em prova e traga um exemplo clínico curto: "' + titulo + '".');
  }
  function perguntarSobre(titulo, corpo) {
    abrir('Tópico: ' + titulo + '\n' + corpo.replace(/[#*`-]/g, '').slice(0, 4000));
  }

  /* ---------- config ---------- */
  function abrirConfig() {
    const cfg = document.getElementById('chat-config');
    cfg.style.display = cfg.style.display === 'flex' ? 'none' : 'flex';
  }
  function salvarConfig() {
    config.endpoint = document.getElementById('cfg-endpoint').value.trim();
    config.model = document.getElementById('cfg-model').value.trim();
    config.apiKey = document.getElementById('cfg-key').value.trim();
    localStorage.setItem(LS_KEY, JSON.stringify(config));
    document.getElementById('chat-config').style.display = 'none';
    mensagemSistema(config.endpoint && config.apiKey
      ? '✅ Usando sua API própria (<b>' + (config.model || 'modelo padrão') + '</b>).'
      : '✅ Voltando para o modo gratuito (Puter.js).');
  }

  /* ---------- ligações ---------- */
  function init() {
    fab.addEventListener('click', toggle);
    const topoBtn = document.getElementById('topo-ia');
    if (topoBtn) topoBtn.addEventListener('click', toggle);
    document.getElementById('chat-close').addEventListener('click', fechar);
    sendBtn.addEventListener('click', () => perguntar(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') perguntar(input.value); });
    document.getElementById('chat-config-btn').addEventListener('click', abrirConfig);
    document.getElementById('cfg-save').addEventListener('click', salvarConfig);
    document.getElementById('cfg-cancel').addEventListener('click', () => { document.getElementById('chat-config').style.display = 'none'; });
    document.getElementById('chat-limpar').addEventListener('click', () => { history = []; msgs.innerHTML = ''; mensagemSistema('Conversa limpa. Pode perguntar!'); });
    // pré-preenche config
    document.getElementById('cfg-endpoint').value = config.endpoint || '';
    document.getElementById('cfg-model').value = config.model || '';
    document.getElementById('cfg-key').value = config.apiKey || '';
  }

  return { init, abrir, fechar, explicarTopico, perguntarSobre };
})();
