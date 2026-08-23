/* ============================================================
   FISIOLOGIA INTERATIVA — app principal (SPA por hash) v4
   ============================================================ */

(function () {
  'use strict';

  const app = document.getElementById('app');
  let interativoAtivo = null;

  /* ---------- progresso de estudo ---------- */
  const PROG_KEY = 'fisio-progresso';
  const SCORE_KEY = 'fisio-scores';
  function progLer() {
    try { return JSON.parse(localStorage.getItem(PROG_KEY) || '{}'); } catch (e) { return {}; }
  }
  function progMarcar(sid, tid) {
    const p = progLer();
    p[sid] = p[sid] || {};
    p[sid][tid] = 1;
    try { localStorage.setItem(PROG_KEY, JSON.stringify(p)); } catch (e) { /* ignora */ }
  }
  function progSistema(sid) {
    const s = window.FISIO.sistemas.find(x => x.id === sid);
    if (!s) return 0;
    const p = progLer()[sid] || {};
    return s.topicos.filter(t => p[t.id]).length;
  }
  function progTotal() {
    const total = window.FISIO.sistemas.reduce((a, s) => a + s.topicos.length, 0);
    const feitos = window.FISIO.sistemas.reduce((a, s) => a + progSistema(s.id), 0);
    return { feitos, total, pct: total ? Math.round(feitos / total * 100) : 0 };
  }
  /* ---------- notas dos quizzes ---------- */
  function scoresLer() {
    try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function scoreSalvar(sid, pct) {
    const sc = scoresLer();
    const atual = sc[sid];
    if (!atual || pct > atual.melhor) sc[sid] = { melhor: pct, data: new Date().toISOString().slice(0, 10) };
    try { localStorage.setItem(SCORE_KEY, JSON.stringify(sc)); } catch (e) { /* ignora */ }
  }
  function conceito(pct) {
    if (pct >= 90) return { letra: 'A', cls: 'a' };
    if (pct >= 70) return { letra: 'B', cls: 'b' };
    if (pct >= 50) return { letra: 'C', cls: 'c' };
    return { letra: 'D', cls: '' };
  }
  function modulosCertificados() {
    const sc = scoresLer();
    return window.FISIO.sistemas.filter(s => sc[s.id] && sc[s.id].melhor >= 70).length;
  }
  function sistemasOrdenados() {
    const ordem = window.FISIO.ordem || window.FISIO.sistemas.map(s => s.id);
    const map = {};
    window.FISIO.sistemas.forEach(s => map[s.id] = s);
    const lista = ordem.map(id => map[id]).filter(Boolean);
    window.FISIO.sistemas.forEach(s => { if (!lista.includes(s)) lista.push(s); });
    return lista;
  }

  /* ---------- barra de leitura ---------- */
  let barra = null;
  function atualizarBarra() {
    if (!barra) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    barra.style.width = (max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0) + '%';
  }
  window.addEventListener('scroll', atualizarBarra, { passive: true });

  /* ---------- utilidades ---------- */
  function md2html(txt) {
    const lines = txt.split('\n');
    let html = '', inList = false, tableMode = false;
    const inline = s => s
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
    for (let raw of lines) {
      const line = raw.trim();
      if (line.startsWith('|')) {
        if (!tableMode) { html += '<table class="md-table">'; tableMode = true; }
        if (/^\|[\s:|-]+\|$/.test(line)) continue;
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        html += '<tr>' + cells.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>';
        continue;
      } else if (tableMode) { html += '</table>'; tableMode = false; }
      if (line.startsWith('## ')) { if (inList) { html += '</ul>'; inList = false; } html += '<h3>' + inline(line.slice(3)) + '</h3>'; }
      else if (line.startsWith('- ') || line.startsWith('• ')) { if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + inline(line.slice(2)) + '</li>'; }
      else if (/^\d+\.\s/.test(line)) { if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + inline(line.replace(/^\d+\.\s/, '')) + '</li>'; }
      else if (!line) { if (inList) { html += '</ul>'; inList = false; } }
      else { if (inList) { html += '</ul>'; inList = false; } html += '<p>' + inline(line) + '</p>'; }
    }
    if (inList) html += '</ul>';
    if (tableMode) html += '</table>';
    return html;
  }
  function destruirInterativo() {
    if (interativoAtivo && interativoAtivo.destroy) interativoAtivo.destroy();
    interativoAtivo = null;
  }

  /* ---------- busca global ---------- */
  let buscaEl = null;
  function indiceBusca() {
    return window.FISIO.sistemas.flatMap(s => s.topicos.map(t => ({
      sid: s.id, tid: t.id,
      sistema: s.nome,
      titulo: t.titulo,
      hay: (s.nome + ' ' + t.titulo + ' ' + t.texto + ' ' + (t.avancado || '')).toLowerCase()
    })));
  }
  function abrirBusca() {
    if (!buscaEl) {
      buscaEl = document.createElement('div');
      buscaEl.id = 'busca-overlay';
      buscaEl.innerHTML = `
        <div class="busca-caixa">
          <div class="busca-linha">🔍
            <input id="busca-input" type="text" placeholder="Buscar tópico, conceito ou termo… (ex.: feedback, Nernst, TFG, Bohr)">
            <button class="btn" id="busca-close">esc</button>
          </div>
          <div id="busca-results" class="busca-results"></div>
          <div class="busca-dica">Digite pelo menos 2 caracteres · Enter abre o primeiro resultado · tecla / abre a busca em qualquer página</div>
        </div>`;
      document.body.appendChild(buscaEl);
      buscaEl.addEventListener('click', e => { if (e.target === buscaEl) fecharBusca(); });
      document.getElementById('busca-close').addEventListener('click', fecharBusca);
      const inp = document.getElementById('busca-input');
      inp.addEventListener('input', () => renderResultados(inp.value));
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const primeiro = document.querySelector('#busca-results .busca-item');
          if (primeiro) { location.hash = primeiro.getAttribute('href'); fecharBusca(); }
        }
      });
    }
    buscaEl.classList.add('aberto');
    const inp = document.getElementById('busca-input');
    inp.value = ''; renderResultados('');
    setTimeout(() => inp.focus(), 60);
  }
  function fecharBusca() { if (buscaEl) buscaEl.classList.remove('aberto'); }
  function renderResultados(q) {
    const box = document.getElementById('busca-results');
    if (!box) return;
    q = q.trim().toLowerCase();
    if (q.length < 2) {
      box.innerHTML = `<div class="busca-vazio">${q ? 'Digite mais um caractere…' : '🔎 75 tópicos indexados — tente "feedback negativo", "aquaporina", "sarcômero", "Wiggers", "acidose"…'}</div>`;
      return;
    }
    const res = indiceBusca()
      .map(it => {
        const pos = it.hay.indexOf(q);
        return pos < 0 ? null : { ...it, pos, rank: (it.titulo.toLowerCase().includes(q) ? 0 : 1) + pos / 10000 };
      })
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 12);
    if (!res.length) {
      box.innerHTML = '<div class="busca-vazio">Nada encontrado — tente outro termo (ou pergunte ao Tutor IA).</div>';
      return;
    }
    box.innerHTML = res.map(r => `
      <a class="busca-item" href="#/sistema/${r.sid}/${r.tid}">
        <div class="busca-item-sis">${r.sistema}</div>
        <div class="busca-item-titulo">${r.titulo}</div>
      </a>`).join('');
  }
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName) && !document.getElementById('chat-drawer').classList.contains('aberto')) {
      e.preventDefault(); abrirBusca();
    }
    if (e.key === 'Escape') fecharBusca();
  });

  /* ---------- páginas ---------- */
  function proximoTopico() {
    for (const sid of (window.FISIO.ordem || [])) {
      const s = window.FISIO.sistemas.find(x => x.id === sid);
      if (!s) continue;
      const prog = progLer()[sid] || {};
      const t = s.topicos.find(tp => !prog[tp.id]);
      if (t) return { s, t };
    }
    return null;
  }

  function renderHome() {
    destruirInterativo();
    document.documentElement.style.setProperty('--accent', '#0d9488');
    const sistemas = sistemasOrdenados();
    const totalTopicos = window.FISIO.sistemas.reduce((a, s) => a + s.topicos.length, 0);
    const totalQuiz = window.FISIO.sistemas.reduce((a, s) => a + s.quiz.length, 0);
    const nInter = window.FISIO.sistemas.reduce((a, s) => a + s.topicos.filter(t => t.interativo).length, 0);
    const nAprof = window.FISIO.sistemas.reduce((a, s) => a + s.topicos.filter(t => t.avancado).length, 0);
    const prog = progTotal();
    const prox = proximoTopico();
    const sc = scoresLer();
    const cert = modulosCertificados();

    /* guia de estudo */
    const guiaItens = sistemas.map((s, i) => {
      const feitos = progSistema(s.id);
      const nota = sc[s.id] ? sc[s.id].melhor : null;
      const concluido = nota !== null && nota >= 70 && feitos === s.topicos.length;
      const atual = prox && prox.s.id === s.id;
      const c = nota !== null ? conceito(nota) : null;
      return `
      <a class="guia-item ${atual ? 'atual' : ''}" href="#/sistema/${s.id}" style="color:${window.SYS_COLORS[s.id]}">
        <span class="guia-ic">${window.SysIcon(s.id, 22)}${concluido ? '<span class="guia-badge">✓</span>' : ''}</span>
        <span class="guia-txt">
          <span class="guia-nome">${s.nome}</span>
          <span class="guia-meta">${i + 1}ª etapa · ${feitos}/${s.topicos.length} tópicos${nota !== null ? ' · quiz ' + nota + '%' : ''}</span>
        </span>
        ${c ? `<span class="guia-nota ${c.cls}">${c.letra}</span>` : ''}
        <span class="guia-seta">›</span>
      </a>`;
    }).join('');

    /* chips dos módulos fundamentais (fora do mapa anatômico) */
    const chips = ['introducao', 'celular', 'imunologico', 'fluidos'].map(id => {
      const s = window.FISIO.sistemas.find(x => x.id === id);
      return `<a class="chip" href="#/sistema/${id}" style="color:${window.SYS_COLORS[id]}">${window.SysIcon(id, 18)} ${s ? s.nome.replace('Sistema ', '').replace(' à Fisiologia', '') : id}</a>`;
    }).join('');

    /* desempenho */
    const comScores = sistemas.filter(s => sc[s.id]);
    const desempenho = comScores.length ? `
      <section class="painel" style="margin-top:18px">
        <h2>📊 Seu desempenho</h2>
        <p class="painel-sub">Melhor nota por quiz — aprovação com ≥ 70% (conceito B). Módulos certificados: <b>${cert}/11</b>.</p>
        <table class="desempenho-tab">
          <tr><th>Módulo</th><th>Quiz</th><th>Conceito</th><th></th></tr>
          ${comScores.map(s => {
            const nota = sc[s.id].melhor;
            const c = conceito(nota);
            return `<tr>
              <td><b>${s.nome}</b></td>
              <td>${nota}%</td>
              <td><span class="guia-nota ${c.cls}">${c.letra}</span></td>
              <td><div class="barra-nota"><span style="width:${nota}%; background:${nota >= 70 ? '#059669' : nota >= 50 ? '#d97706' : '#dc2626'}"></span></div></td>
            </tr>`;
          }).join('')}
        </table>
      </section>` : '';

    app.innerHTML = `
      <section class="hero">
        <div class="hero-tag">Fisiologia Humana · nível universitário · em português</div>
        <h1><span>Fisiologia Interativa</span></h1>
        <p class="hero-sub">Um curso completo de fisiologia na ordem da ementa — animações passo a passo, aprofundamento em nível de livro, casos clínicos e um Tutor IA que explica o que está na tela.</p>
        <div class="hero-cta">
          ${prox
            ? `<a class="btn btn-primary" href="#/sistema/${prox.s.id}/${prox.t.id}">▶ Continuar: ${prox.t.titulo}</a>`
            : `<a class="btn btn-primary" href="#/sistema/introducao">▶ Começar do início</a>`}
          <a class="btn" href="#guia">Guia de estudo ↓</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><b>${sistemas.length}</b><span>módulos</span></div>
          <div class="stat"><b>${totalTopicos}</b><span>tópicos</span></div>
          <div class="stat"><b>${nInter}</b><span>animações</span></div>
          <div class="stat"><b>${nAprof}</b><span>aprofundamentos</span></div>
          <div class="stat"><b>${totalQuiz}</b><span>questões</span></div>
          <div class="stat stat-prog"><b>${prog.pct}%</b><span>concluído</span><div class="stat-bar"><span style="width:${prog.pct}%"></span></div></div>
        </div>
      </section>

      <section class="painel-grid" id="guia">
        <div class="painel">
          <h2>🧍 Mapa do corpo</h2>
          <p class="painel-sub">Clique num marcador para abrir o sistema.</p>
          <div id="bodymap">${window.BodyMapSVG()}</div>
          <div class="mapa-chips">${chips}</div>
          <div class="mapa-nota">Módulos fundamentais (base para todos os demais)</div>
        </div>
        <div class="painel">
          <h2>🧭 Guia de estudo — por onde começar e onde terminar</h2>
          <p class="painel-sub">Siga as etapas 1 → 11 na ordem. Um módulo fica <b>certificado</b> (✓) quando todos os tópicos são lidos <i>e</i> o quiz atinge ≥ 70%.</p>
          <div class="guia">
            <div class="guia-inicio">comece aqui ▼</div>
            ${guiaItens}
            <div class="guia-fim">▲ fim da trilha — domínio completo</div>
          </div>
        </div>
      </section>
      ${desempenho}

      <section class="painel" style="margin-top:18px">
        <h2>📖 Como estudar por aqui</h2>
        <div class="metodo-grid" style="margin-top:12px">
          <div class="metodo-passo"><div class="passo-n">1</div><b>Leia o tópico</b><span>texto direto, com os termos que caem em prova</span></div>
          <div class="metodo-passo"><div class="passo-n">2</div><b>Interaja com a animação</b><span>use "Próxima etapa ▸" e leia a explicação de cada fase</span></div>
          <div class="metodo-passo"><div class="passo-n">3</div><b>Aprofunde</b><span>"Nível de livro": equações, números e referências</span></div>
          <div class="metodo-passo"><div class="passo-n">4</div><b>Teste-se</b><span>quiz com casos clínicos — sua nota fica registrada no guia</span></div>
        </div>
        <div class="biblio">
          <div class="biblio-card"><b>Vander</b><span>Luciano · Fisiologia Humana</span><i>O mais didático para começar</i></div>
          <div class="biblio-card"><b>Guyton &amp; Hall</b><span>Tratado de Fisiologia Médica</span><i>Completo e integrado</i></div>
          <div class="biblio-card"><b>Ganong</b><span>Fisiologia Médica</span><i>Denso e conciso</i></div>
          <div class="biblio-card"><b>Berne &amp; Levy</b><span>Fisiologia</span><i>Rigoroso, forte em cardiovascular</i></div>
          <div class="biblio-card"><b>Furtado</b><span>Fisiologia Humana</span><i>Em português</i></div>
        </div>
        <p class="aviso">⚠️ Conteúdo educacional original, nível graduação — não substitui livros-texto nem orientação médica. <button class="btn" id="limpar-progresso">Zerar progresso e notas</button></p>
      </section>`;

    /* mapa corporal: clique/hotspot */
    const bm = document.getElementById('bodymap');
    if (bm) bm.addEventListener('click', e => {
      const g = e.target.closest('.hotspot');
      if (g) location.hash = '#/sistema/' + g.dataset.sid;
    });
    const btnLimpar = document.getElementById('limpar-progresso');
    if (btnLimpar) btnLimpar.addEventListener('click', () => {
      localStorage.removeItem(PROG_KEY);
      localStorage.removeItem(SCORE_KEY);
      renderHome();
    });
    window.scrollTo(0, 0);
  }

  function renderSistema(sid, tid) {
    const s = window.FISIO.sistemas.find(x => x.id === sid);
    if (!s) { location.hash = '#/'; return; }
    document.documentElement.style.setProperty('--accent', window.SYS_COLORS[s.id] || s.cor);
    if (tid && tid !== 'quiz') progMarcar(sid, tid);

    const prog = progLer()[sid] || {};
    const feitos = Object.keys(prog).filter(k => s.topicos.some(t => t.id === k)).length;
    const pctS = Math.round(feitos / s.topicos.length * 100);
    const notaQuiz = scoresLer()[sid];

    const navItens = s.topicos.map((t, i) =>
      `<a class="nav-topico ${t.id === tid ? 'ativo' : ''}" href="#/sistema/${s.id}/${t.id}"><span class="num ${prog[t.id] ? 'lido' : ''}">${prog[t.id] ? '✓' : i + 1}</span> ${t.titulo}${t.interativo ? ' <span class="mini">●</span>' : ''}</a>`
    ).join('') + `<a class="nav-topico quiz ${tid === 'quiz' ? 'ativo' : ''}" href="#/sistema/${s.id}/quiz">Quiz — ${s.quiz.length} questões${notaQuiz ? ' (' + notaQuiz.melhor + '%)' : ''}</a>`;

    let conteudo;
    if (tid === 'quiz') {
      conteudo = renderQuiz(s);
    } else {
      const topico = s.topicos.find(t => t.id === tid) || s.topicos[0];
      conteudo = `
        <article class="topico">
          <div class="topico-cabeca">
            <h2>${topico.titulo}</h2>
            <button class="btn btn-ia" data-ia="explicar">🤖 Explicar com IA</button>
          </div>
          <div class="topico-corpo">${md2html(topico.texto)}</div>
          ${(() => {
            const img = (window.FISIO_IMAGENS || {})[s.id + '/' + topico.id];
            if (!img || topico.interativo) return '';
            return `<figure class="topico-figura">
              <img src="${img.url}" alt="${img.titulo}" loading="lazy" onerror="this.closest('figure').style.display='none'">
              <figcaption>${img.titulo} <a href="${img.pagina}" target="_blank" rel="noopener">Wikimedia Commons</a> · licença livre</figcaption>
            </figure>`;
          })()}
          ${topico.interativo ? `
            <div class="interativo-wrap">
              <div class="interativo-titulo">Animação interativa</div>
              <div class="interativo" data-tipo="${topico.interativo}"></div>
            </div>` : ''}
          ${topico.avancado ? `
            <details class="aprof">
              <summary>📚 Aprofundamento — nível de livro</summary>
              <div class="topico-corpo aprof-corpo">${md2html(topico.avancado)}</div>
            </details>` : ''}
          <div class="topico-rodape">
            <button class="btn btn-ia btn-perguntar" data-ia="perguntar">💬 Perguntar à IA sobre este tópico</button>
          </div>
        </article>`;
      conteudo += botoesNav(s, topico);
      setTimeout(() => {
        const box = app.querySelector('.interativo');
        if (box && window.Interactives[box.dataset.tipo]) {
          interativoAtivo = window.Interactives[box.dataset.tipo](box);
        }
        const btnExp = app.querySelector('[data-ia="explicar"]');
        if (btnExp) btnExp.addEventListener('click', () => window.TutorIA.explicarTopico(s.nome + ' — ' + topico.titulo, topico.texto));
        const btnPerg = app.querySelector('[data-ia="perguntar"]');
        if (btnPerg) btnPerg.addEventListener('click', () => window.TutorIA.perguntarSobre(s.nome + ' — ' + topico.titulo, topico.texto));
      }, 0);
    }

    app.innerHTML = `
      <div class="sistema-layout">
        <aside class="sidebar">
          <a class="voltar" href="#/">← Início</a>
          <div class="sidebar-titulo" style="color:${window.SYS_COLORS[s.id]}">${window.SysIcon(s.id, 26)} <span style="color:var(--tinta)">${s.nome}</span></div>
          <div class="sidebar-prog">
            <div class="sidebar-prog-txt">${feitos}/${s.topicos.length} tópicos lidos (${pctS}%)</div>
            <div class="sidebar-prog-bar"><span style="width:${pctS}%"></span></div>
          </div>
          <nav>${navItens}</nav>
          <button class="btn btn-ia sidebar-ia" data-ia="sistema">🤖 Tutor IA deste sistema</button>
        </aside>
        <main class="conteudo">${conteudo}</main>
      </div>`;

    const btnSysIA = app.querySelector('.sidebar-ia');
    if (btnSysIA) btnSysIA.addEventListener('click', () => {
      window.TutorIA.perguntarSobre(s.nome, 'Sistema: ' + s.nome + '. Tópicos: ' + s.topicos.map(t => t.titulo).join('; '));
      window.TutorIA.abrir();
    });

    if (tid === 'quiz') ligarQuiz(s);
    window.scrollTo(0, 0);
  }

  function botoesNav(s, topico) {
    const i = s.topicos.indexOf(topico);
    const prev = i > 0 ? `<a class="btn nav-prev" href="#/sistema/${s.id}/${s.topicos[i - 1].id}">← ${s.topicos[i - 1].titulo}</a>` : '<span></span>';
    const next = i < s.topicos.length - 1
      ? `<a class="btn nav-next" href="#/sistema/${s.id}/${s.topicos[i + 1].id}">${s.topicos[i + 1].titulo} →</a>`
      : `<a class="btn nav-next" href="#/sistema/${s.id}/quiz">Fazer o quiz 🏁</a>`;
    return `<div class="nav-entre-topicos">${prev}${next}</div>`;
  }

  function renderQuiz(s) {
    const qs = s.quiz.map((q, i) => `
      <div class="questao" data-i="${i}">
        ${q.caso ? '<div class="caso-badge">Caso clínico</div>' : q.livro ? '<div class="livro-badge">Nível de livro</div>' : ''}
        ${q.caso ? `<div class="questao-caso">${q.caso}</div>` : ''}
        <div class="questao-p">${i + 1}. ${q.p}</div>
        <div class="questao-alt">${q.alternativas.map((a, j) => `
          <button class="alt" data-j="${j}"><span class="letra">${'ABCDE'[j]}</span> ${a}</button>`).join('')}
        </div>
        <div class="questao-exp"></div>
      </div>`).join('');
    return `
      <article class="topico quiz-topico">
        <div class="topico-cabeca"><h2>Quiz — ${s.nome}</h2></div>
        <div class="quiz-placar">Incluindo <b>casos clínicos</b> e questões em <b>nível de livro</b>. Aprovação ≥ 70% · melhor nota registrada no guia · <b id="quiz-acertos">0</b> acertos</div>
        ${qs}
        <div class="quiz-final" id="quiz-final"></div>
      </article>`;
  }

  function ligarQuiz(s) {
    const acertosEl = document.getElementById('quiz-acertos');
    let acertos = 0, respondidas = 0;
    app.querySelectorAll('.questao').forEach(qEl => {
      const i = +qEl.dataset.i;
      const q = s.quiz[i];
      const exp = qEl.querySelector('.questao-exp');
      qEl.querySelectorAll('.alt').forEach(btn => {
        btn.addEventListener('click', () => {
          if (qEl.dataset.done) return;
          qEl.dataset.done = '1';
          respondidas++;
          const j = +btn.dataset.j;
          if (j === q.correta) { btn.classList.add('certa'); acertos++; acertosEl.textContent = acertos; }
          else {
            btn.classList.add('errada');
            qEl.querySelectorAll('.alt')[q.correta].classList.add('certa');
          }
          exp.innerHTML = (j === q.correta ? '✅ <b>Correto.</b> ' : '❌ <b>Não é essa.</b> ') + q.explicacao;
          exp.style.display = 'block';
          if (respondidas === s.quiz.length) {
            const pct = Math.round(acertos / s.quiz.length * 100);
            scoreSalvar(s.id, pct);
            const c = conceito(pct);
            const msg = pct >= 90 ? 'Excelente — domínio do módulo! 🏆'
              : pct >= 70 ? 'Aprovado! Módulo certificado no guia de estudo. 📘'
              : pct >= 50 ? 'Quase — revise os erros e repita. 📘'
              : 'Hora de reler os tópicos — comece pelo primeiro erro. 🤖';
            const fin = document.getElementById('quiz-final');
            fin.innerHTML = `<b>${acertos}/${s.quiz.length} (${pct}%) — conceito ${c.letra}</b> · ${msg}
              <button class="btn btn-ia" onclick="TutorIA.explicarTopico('Revisão do quiz de ${s.nome}', 'Acertei ${acertos} de ${s.quiz.length}. Revise os pontos do sistema que costumam ser erros comuns e explique os que eu provavelmente errei.')">🤖 Revisar com a IA</button>`;
            fin.style.display = 'block';
          }
        });
      });
    });
  }

  /* ---------- roteador ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    destruirInterativo();
    if (parts[0] === 'sistema' && parts[1]) renderSistema(parts[1], parts[2] || null);
    else renderHome();
  }

  window.addEventListener('hashchange', route);
  window.TutorIA.init();
  const btnBuscaTopo = document.getElementById('topo-busca');
  if (btnBuscaTopo) btnBuscaTopo.addEventListener('click', abrirBusca);
  route();

  // logo do header com ícone anatômico
  const logo = document.querySelector('.topo .logo');
  if (logo && !logo.querySelector('svg')) {
    logo.insertAdjacentHTML('afterbegin', window.SysIcon('cardiovascular', 22));
  }

  // barra de progresso de leitura
  barra = document.createElement('div');
  barra.id = 'barra-leitura';
  document.body.appendChild(barra);
  atualizarBarra();
})();
