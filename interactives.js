/* ============================================================
   FISIOLOGIA INTERATIVA — Animações interativas (canvas) v3
   Padrão profissional: geometria calculada, guarda anti-erro
   em todos os loops e diagramas no estilo dos livros-texto.
   Cada interativo recebe o container e retorna {destroy}.
   ============================================================ */

window.Interactives = (function () {
  'use strict';

  /* ---------------- helpers compartilhados ---------------- */
  function makeCanvas(w, h) {
    const canvas = document.createElement('canvas');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.maxWidth = w + 'px';
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = w + ' / ' + h;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    canvas.style.borderRadius = '10px';
    canvas.style.background = '#0c1120';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { canvas, ctx, W: w, H: h };
  }
  function controls(container) {
    const div = document.createElement('div');
    div.className = 'interativo-controles';
    container.appendChild(div);
    return div;
  }
  function status(container) {
    const div = document.createElement('div');
    div.className = 'interativo-status';
    container.appendChild(div);
    return div;
  }
  function button(parent, label, onClick) {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    b.addEventListener('click', onClick);
    parent.appendChild(b);
    return b;
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  /* Loop protegido: qualquer exceção para o loop com mensagem visível — nunca quebra a página. */
  function iniciarLoop(stEl, frame) {
    let raf = 0, last = performance.now(), parado = false;
    function tick(now) {
      if (parado) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      try { frame(dt); }
      catch (e) {
        parado = true;
        try { stEl.innerHTML = '<b style="color:#f87171">Animacao pausada por erro interno:</b> ' + (e && e.message || e); } catch (_) {}
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return function destroy() { parado = true; cancelAnimationFrame(raf); };
  }
  /* Interpolação suave a partir de pontos-chave [x, y] monotônicos. */
  function curveFromPoints(pts) {
    return function (x) {
      if (x <= pts[0][0]) return pts[0][1];
      const last = pts[pts.length - 1];
      if (x >= last[0]) return last[1];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        if (x >= a[0] && x <= b[0]) {
          const p = (x - a[0]) / (b[0] - a[0]);
          const sp = p * p * (3 - 2 * p);
          return a[1] + (b[1] - a[1]) * sp;
        }
      }
      return last[1];
    };
  }
  function titulo(ctx, txt, W) {
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(226,232,240,.9)';
    ctx.font = '600 13.5px system-ui';
    ctx.fillText(txt, 18, 24);
  }
  function eixo(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(148,163,184,.35)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  }
  const AZUL = '#60a5fa', VERM = '#f87171', VERDE = '#4ade80', AMAR = '#facc15', ROXO = '#a78bfa';

  /* ============================================================== */
  /* 1. CORAÇÃO — anatomia + diagrama de Wiggers (pressões/ECG/FCG)  */
  /* ============================================================== */
  function coracao(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 560);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, playing = true, speed = 1;
    const CYCLE = 0.85;

    const pauseBtn = button(ctl, '⏸ Pausar', () => { playing = !playing; pauseBtn.textContent = playing ? '⏸ Pausar' : '▶ Continuar'; });
    const slowBtn = button(ctl, '🐢 Câmera lenta', () => { speed = speed === 1 ? 0.3 : 1; slowBtn.textContent = speed === 1 ? '🐢 Câmera lenta' : '🐇 Velocidade normal'; });
    /* tour guiado pelas 5 fases do ciclo (explicação de cada etapa) */
    const PARADAS = [
      [0.05, 'Contração atrial', 'As valvas AV estão ABERTAS e os átrios empurram os últimos ~20% do volume (EDV ≈ 125 mL). No ECG: onda P.'],
      [0.13, 'Contração isovolumétrica', 'Valvas AV fecham (B1). Ventrículo contrai com volume constante — a pressão sobe rápido até vencer a aorta (80 mmHg).'],
      [0.30, 'Ejeção', 'Semilunares ABERTAS: ~70 mL saem (VS = EDV − ESV). No Wiggers, a curva do VE cruza a da aorta e as acompanha.'],
      [0.47, 'Relaxamento isovolumétrico', 'Semilunares fecham (B2 — veja a incisura dícrota). Tudo fechado: pressão cai sem mudar o volume (ESV ≈ 55 mL).'],
      [0.65, 'Diástole (enchimento)', 'AV reabrem: 70–80% do enchimento é PASSIVO, direto dos átrios. É a fase mais longa do ciclo.']
    ];
    let guiIdx = -1;
    const guiBtn = button(ctl, '▸ Tour das fases', () => {
      playing = false; pauseBtn.textContent = '▶ Continuar';
      guiIdx = (guiIdx + 1) % PARADAS.length;
      t = PARADAS[guiIdx][0] + 0.001;
      guiBtn.textContent = guiIdx === PARADAS.length - 1 ? '↺ Recomeçar tour' : 'Próxima fase ▸';
    });

    /* curvas de Wiggers (mmHg / mV) */
    const pVE = curveFromPoints([[0,4],[0.06,5],[0.10,9],[0.17,80],[0.28,108],[0.42,120],[0.445,95],[0.47,30],[0.50,6],[0.62,2.5],[0.85,2.5]]);
    const pAo = curveFromPoints([[0,80],[0.10,82],[0.17,90],[0.30,116],[0.42,120],[0.44,119],[0.46,101],[0.475,96],[0.60,90],[0.85,81]]);
    const pAt = curveFromPoints([[0,3],[0.06,4],[0.10,10],[0.14,4],[0.17,7],[0.33,11],[0.44,13.5],[0.50,6.5],[0.62,3],[0.85,3]]);
    function ecg(x) {
      const g = (c, w, h) => h * Math.exp(-Math.pow((x - c) / w, 2));
      return g(0.05, 0.017, 0.14) - g(0.103, 0.008, 0.06) + g(0.113, 0.009, 1) - g(0.124, 0.009, 0.2) + g(0.36, 0.05, 0.26);
    }
    function fase(x) {
      if (x < 0.10) return { nome: 'Contração atrial', av: true, sl: false, cor: AMAR };
      if (x < 0.17) return { nome: 'Contração isovolumétrica', av: false, sl: false, cor: VERM };
      if (x < 0.42) return { nome: 'Ejeção ventricular', av: false, sl: true, cor: VERDE };
      if (x < 0.50) return { nome: 'Relaxamento isovolumétrico', av: false, sl: false, cor: ROXO };
      return { nome: 'Diástole (enchimento ventricular)', av: true, sl: false, cor: AZUL };
    }

    /* geometria do coração (painel esquerdo) */
    const AT_D = [138, 168], AT_E = [262, 168], VD = [140, 330], VE = [252, 335];
    const AV_D = [143, 232], AV_E = [258, 232];
    const SL_D = [98, 172], SL_E = [302, 172];
    function pathPts(lado) {
      return lado === 'D'
        ? [[52, 92], [86, 130], [112, 168], AT_D, AV_D, VD, [118, 282], SL_D, [80, 120], [58, 52]]
        : [[348, 92], [314, 130], [288, 168], AT_E, AV_E, VE, [272, 282], SL_E, [320, 120], [342, 52]];
    }
    const parts = [];
    for (let i = 0; i < 22; i++) {
      parts.push({ lado: i % 2 ? 'E' : 'D', s: Math.random(), hue: i % 2 });
    }
    function pathLength(pts) { let d = 0; for (let i = 1; i < pts.length; i++) d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return d; }
    const PLEN = { D: pathLength(pathPts('D')), E: pathLength(pathPts('E')) };
    function pointIn(pts, s) {
      const total = pathLength(pts); let alvo = s * total, acc = 0;
      for (let i = 1; i < pts.length; i++) {
        const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        if (alvo <= acc + d) { const p = (alvo - acc) / d; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * p, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * p]; }
        acc += d;
      }
      return pts[pts.length - 1];
    }

    function draw(dt) {
      t += dt * speed * (playing ? 1 : 0);
      const x = t % CYCLE, f = fase(x);
      /* escala das câmaras */
      const atrioS = x < 0.10 ? 1 - 0.16 * (x / 0.10) : x < 0.25 ? 0.84 + 0.16 * ((x - 0.10) / 0.15) : 1;
      let ventS = 1;
      if (x >= 0.10 && x < 0.17) ventS = 1 - 0.20 * ((x - 0.10) / 0.07);
      else if (x >= 0.17 && x < 0.42) ventS = 0.80 + 0.02 * Math.sin((x - 0.17) / 0.25 * Math.PI);
      else if (x >= 0.42 && x < 0.50) ventS = 0.80 + 0.20 * ((x - 0.42) / 0.08);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'CICLO CARDÍACO — à esquerda o coração, à direita o diagrama de Wiggers (pressões + ECG + fonocardiograma)', W);

      /* ---- coração ---- */
      const HX = 200, HY = 250;
      ctx.save(); ctx.translate(HX, HY); ctx.rotate(-0.06);
      function camara(cx, cy, rx, ry, corFill, corLine, s) {
        ctx.save(); ctx.translate(cx - HX, cy - HY); ctx.scale(1, s);
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = corFill; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = corLine; ctx.stroke();
        ctx.restore();
      }
      /* septo e contorno externo sutil */
      camara(AT_D[0], AT_D[1], 52, 34, 'rgba(96,165,250,.30)', 'rgba(96,165,250,.85)', atrioS);
      camara(AT_E[0], AT_E[1], 52, 34, 'rgba(248,113,113,.30)', 'rgba(248,113,113,.85)', atrioS);
      camara(VD[0], VD[1], 66, 84, 'rgba(59,130,246,.30)', 'rgba(96,165,250,.9)', ventS);
      camara(VE[0], VE[1], 72, 90, 'rgba(239,68,68,.28)', 'rgba(248,113,113,.9)', ventS);
      /* válvulas */
      function valvulaAV(px, py, aberta, nome) {
        ctx.save(); ctx.translate(px - HX, py - HY);
        ctx.strokeStyle = AMAR; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
        const ang = aberta ? 0.75 : 0.10;
        ctx.beginPath();
        ctx.moveTo(-16, 0); ctx.lineTo(-16 + 14 * Math.cos(ang * 1.6), -14 * Math.sin(ang * 1.6) * 0 + -14 * ang);
        ctx.moveTo(16, 0); ctx.lineTo(16 - 14 * Math.cos(ang * 1.6), -14 * ang);
        ctx.stroke();
        ctx.fillStyle = 'rgba(250,204,21,.9)'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(nome, 0, 16);
        ctx.restore();
      }
      function valvulaSL(px, py, aberta, nome) {
        ctx.save(); ctx.translate(px - HX, py - HY);
        ctx.strokeStyle = AMAR; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
        const gap = aberta ? 13 : 2;
        ctx.beginPath();
        ctx.moveTo(-14, -gap); ctx.lineTo(14, -gap);
        ctx.moveTo(-14, gap); ctx.lineTo(14, gap);
        ctx.stroke();
        ctx.fillStyle = 'rgba(250,204,21,.9)'; ctx.font = '10px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(nome, 0, 30);
        ctx.restore();
      }
      valvulaAV(AV_D[0], AV_D[1], f.av, 'tricúspide');
      valvulaAV(AV_E[0], AV_E[1], f.av, 'mitral');
      valvulaSL(SL_D[0], SL_D[1], f.sl, 'pulmonar');
      valvulaSL(SL_E[0], SL_E[1], f.sl, 'aórtica');
      /* rótulos */
      ctx.fillStyle = 'rgba(226,232,240,.85)'; ctx.font = '600 11px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('AD', AT_D[0] - HX, AT_D[1] - HY + 4);
      ctx.fillText('AE', AT_E[0] - HX, AT_E[1] - HY + 4);
      ctx.fillText('VD', VD[0] - HX, VD[1] - HY + 70 * ventS);
      ctx.fillText('VE', VE[0] - HX, VE[1] - HY + 72 * ventS);
      ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('V. cavas', -170, -160); ctx.fillText('A. pulmonar', -130, -190);
      ctx.textAlign = 'right';
      ctx.fillText('V. pulmonares', 170, -160); ctx.fillText('Aorta', 130, -190);
      /* partículas de sangue */
      for (const p of parts) {
        const pts = pathPts(p.lado);
        let v;
        if (x >= 0.10 && x < 0.45) v = p.s > 0.62 ? 150 : 22;        // ejeção
        else if (x < 0.10) v = p.s < 0.45 ? 170 : 20;               // contração atrial
        else v = p.s < 0.66 ? 120 : 8;                               // enchimento passivo
        p.s = (p.s + v * dt / PLEN[p.lado]) % 1;
        const [px, py] = pointIn(pts, p.s);
        ctx.fillStyle = p.lado === 'D' ? 'rgba(96,165,250,.95)' : 'rgba(248,113,113,.95)';
        ctx.beginPath(); ctx.arc(px - HX, py - HY, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      /* ---- diagrama de Wiggers ---- */
      const wx = 400, wy = 56, ww = 450, wh = 240;
      eixo(ctx, wx, wy, ww, wh);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '10px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('Pressões (mmHg)', wx + 6, wy - 8);
      ctx.fillText('120', wx - 26, wy + 14); ctx.fillText('80', wx - 26, wy + wh * (1 - 80 / 130) + 4); ctx.fillText('0', wx - 14, wy + wh);
      const X = v => wx + (v / CYCLE) * ww;
      const Y = v => wy + wh - (v / 130) * wh;
      function plot(fn, cor, lw) {
        ctx.strokeStyle = cor; ctx.lineWidth = lw || 1.8; ctx.beginPath();
        for (let i = 0; i <= ww; i += 2) {
          const xx = (i / ww) * CYCLE;
          const y = Y(fn(xx));
          if (i === 0) ctx.moveTo(wx + i, y); else ctx.lineTo(wx + i, y);
        }
        ctx.stroke();
      }
      plot(pAo, VERM); plot(pVE, VERDE, 2.2); plot(pAt, AZUL);
      ctx.font = '10.5px system-ui';
      ctx.fillStyle = VERM; ctx.fillText('— Aorta', wx + ww - 150, wy + 14);
      ctx.fillStyle = VERDE; ctx.fillText('— Ventrículo E', wx + ww - 150, wy + 28);
      ctx.fillStyle = AZUL; ctx.fillText('— Átrio E', wx + ww - 150, wy + 42);
      /* ECG */
      const ey = wy + wh + 28, eh = 84;
      eixo(ctx, wx, ey, ww, eh);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.fillText('ECG', wx + 6, ey - 6);
      ctx.strokeStyle = 'rgba(74,222,128,.85)'; ctx.lineWidth = 1.8; ctx.beginPath();
      for (let i = 0; i <= ww; i += 2) {
        const xx = (i / ww) * CYCLE;
        const y = ey + eh * 0.72 - ecg(xx) * eh * 0.6;
        if (i === 0) ctx.moveTo(wx + i, y); else ctx.lineTo(wx + i, y);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '9.5px system-ui';
      ctx.fillText('P', X(0.05), ey + 12); ctx.fillText('QRS', X(0.113) - 10, ey + 12); ctx.fillText('T', X(0.36), ey + 12);
      /* fonocardiograma */
      const fy = ey + eh + 26;
      ctx.strokeStyle = 'rgba(148,163,184,.3)';
      ctx.beginPath(); ctx.moveTo(wx, fy); ctx.lineTo(wx + ww, fy); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.fillText('B1', X(0.105) - 6, fy + 14); ctx.fillText('B2', X(0.45) - 6, fy + 14);
      [0.105, 0.45].forEach(b => {
        ctx.strokeStyle = b < 0.2 ? 'rgba(226,232,240,.55)' : 'rgba(226,232,240,.4)';
        ctx.beginPath();
        for (let k = 0; k < 14; k++) {
          const ax = X(b) + (k - 7) * 2.2;
          const ay = fy - (5 + 9 * Math.exp(-Math.pow((k - 7) / 2.6, 2))) * (k % 2 ? 1 : -1);
          if (k === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
        }
        ctx.stroke();
      });
      /* cursor */
      ctx.strokeStyle = 'rgba(250,204,21,.9)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(X(x), wy); ctx.lineTo(X(x), fy + 8); ctx.stroke(); ctx.setLineDash([]);

      const volVE = x < 0.10 ? '≈125 mL (EDV)' : x < 0.17 ? '125 mL (fechado)' : x < 0.42 ? Math.round(125 - 70 * ((x - 0.17) / 0.25)) + ' mL' : x < 0.50 ? '≈55 mL (ESV)' : Math.round(55 + 70 * ((x - 0.50) / 0.35)) + ' mL';
      if (guiIdx >= 0 && !playing) {
        const [, nome, det] = PARADAS[guiIdx];
        st.innerHTML = `<b style="color:${AMAR}">▸ Tour — ${nome}</b> · VE: <b>${volVE}</b> — ${det} <i>(clique "Próxima fase ▸" ou "▶ Continuar" para animar)</i>`;
        return;
      }
      st.innerHTML = `<b style="color:${f.cor}">■ ${f.nome}</b> · VE: <b>${volVE}</b> · válvulas: <b style="color:${f.av ? AMAR : '#64748b'}">AV ${f.av ? 'ABERTAS' : 'fechadas'}</b> / <b style="color:${f.sl ? AMAR : '#64748b'}">semilunares ${f.sl ? 'ABERTAS' : 'fechadas'}</b> · siga o cursor amarelo no Wiggers`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 2. RESPIRAÇÃO — mecânica + 3 traçados sincronizados            */
  /* ============================================================== */
  function respiracao(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 520);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, playing = true;
    const pauseBtn = button(ctl, '⏸ Pausar', () => { playing = !playing; pauseBtn.textContent = playing ? '⏸ Pausar' : '▶ Continuar'; });
    const PERIOD = 4;

    const volC = curveFromPoints([[0,0],[0.4,0.5],[0.5,0.5],[1,0]]);            // 0..1 (fração do VC)
    const palvC = curveFromPoints([[0,0],[0.06,-1],[0.34,-1],[0.42,0.9],[0.6,0.6],[0.72,0],[1,0]]); // cmH2O
    const pplC = curveFromPoints([[0,-5],[0.4,-7.5],[1,-5]]);

    function draw(dt) {
      t += dt * (playing ? 1 : 0);
      const ph = (t % PERIOD) / PERIOD;
      const faseInsp = ph < 0.42;
      const vol = volC(ph), palv = palvC(ph), ppl = pplC(ph);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'MECÂNICA VENTILATÓRIA — inspiração ativa (músculos) e expiração passiva (recolhimento elástico)', W);

      /* ---- tórax ---- */
      const cx = 180, top = 60;
      const esc = 0.78 + 0.22 * vol;
      /* traqueia */
      ctx.fillStyle = 'rgba(148,163,184,.55)';
      roundRect(ctx, cx - 13, top - 34, 26, 60, 7); ctx.fill();
      /* brônquios */
      ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.lineWidth = 9; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, top + 26); ctx.lineTo(cx - 55, top + 78); ctx.moveTo(cx, top + 26); ctx.lineTo(cx + 55, top + 78); ctx.stroke();
      /* pulmões */
      function pulmao(dir) {
        ctx.save();
        ctx.translate(cx + dir * 62, top + 92); ctx.scale(dir * esc, esc);
        ctx.beginPath();
        ctx.moveTo(0, -62);
        ctx.bezierCurveTo(46, -52, 62, 22, 42, 78);
        ctx.bezierCurveTo(26, 104, 4, 100, 0, 74);
        ctx.closePath();
        ctx.fillStyle = 'rgba(96,165,250,.22)'; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(96,165,250,.75)'; ctx.stroke();
        ctx.restore();
      }
      pulmao(-1); pulmao(1);
      /* costelas */
      ctx.strokeStyle = 'rgba(226,232,240,.22)'; ctx.lineWidth = 5;
      for (let i = 0; i < 4; i++) {
        const y = top + 30 + i * (34 + 7 * vol);
        const hw = 105 + 16 * vol + i * 6;
        ctx.beginPath(); ctx.moveTo(cx - hw, y + 16); ctx.quadraticCurveTo(cx, y - 20, cx + hw, y + 16); ctx.stroke();
      }
      /* diafragma */
      const dy = top + 210 + 40 * vol;
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 9; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - 150, dy + 8); ctx.quadraticCurveTo(cx, dy - (34 * vol + 6), cx + 150, dy + 8); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(faseInsp ? 'diafragma CONTRAÍDO (desce)' : 'diafragma relaxado (sobe)', cx, dy + 30);
      /* setas de fluxo */
      ctx.font = '700 13px system-ui';
      ctx.fillStyle = faseInsp ? VERDE : VERM;
      const off = (t * 2 % 1);
      ctx.fillText(faseInsp ? 'ar ▼ entrando' : 'ar ▲ saindo', cx + (faseInsp ? 60 : 66), top - 18 + off * 6);

      /* ---- traçados ---- */
      const gx = 400, gw = 450;
      const linhas = [
        { nome: 'Volume pulmonar', cor: AZUL, fn: volC, min: 0, max: 1, fmt: v => Math.round(v * 500) + ' mL acima da CRF' },
        { nome: 'Pressão alveolar', cor: VERDE, fn: palvC, min: -1.5, max: 1.5, fmt: v => v.toFixed(1) + ' cmH₂O' },
        { nome: 'Pressão intrapleural', cor: ROXO, fn: pplC, min: -8, max: -4, fmt: v => v.toFixed(1) + ' cmH₂O' }
      ];
      linhas.forEach((L, i) => {
        const gy = 60 + i * 118, gh = 88;
        eixo(ctx, gx, gy, gw, gh);
        ctx.fillStyle = 'rgba(148,163,184,.75)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(L.nome, gx + 6, gy - 6);
        ctx.strokeStyle = L.cor; ctx.lineWidth = 2; ctx.beginPath();
        for (let k = 0; k <= gw; k += 2) {
          const xx = ((k / gw) + 1 - ph) % 1;
          const v = L.fn(xx);
          const y = gy + gh - ((v - L.min) / (L.max - L.min)) * (gh - 10) - 5;
          if (k === 0) ctx.moveTo(gx + k, y); else ctx.lineTo(gx + k, y);
        }
        ctx.stroke();
        /* cursor + valor */
        ctx.strokeStyle = 'rgba(250,204,21,.8)'; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(gx + gw - ph * gw, gy); ctx.lineTo(gx + gw - ph * gw, gy + gh); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = '#fff'; ctx.font = '700 12.5px system-ui'; ctx.textAlign = 'right';
        ctx.fillText(L.fmt(L.fn(ph)), gx + gw - 4, gy + 16);
      });

      st.innerHTML = faseInsp
        ? `<b style="color:${VERDE}">■ INSPIRAÇÃO</b> — diafragma e intercostais contraem → volume ↑ → P<sub>alveolar</sub> negativa (−1 cmH₂O) → ar entra. Note a P<sub>pleural</sub> ficando mais negativa (−7,5).`
        : `<b style="color:${VERM}">■ EXPIRAÇÃO</b> — relaxamento muscular → recolhimento elástico → P<sub>alveolar</sub> positiva (+1) → ar sai (passiva!). P<sub>pleural</sub> volta a −5 cmH₂O.`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 3. POTENCIAL DE AÇÃO — gráfico + canais iônicos                */
  /* ============================================================== */
  function potencial(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 500);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, running = true;
    const T_MAX = 7;
    const vm = curveFromPoints([[0,-70],[1.4,-70],[1.95,-59],[2.12,-55],[2.45,15],[2.65,30],[2.95,18],[3.35,-48],[3.75,-72],[4.25,-80],[5.1,-74],[6.1,-70],[T_MAX,-70]]);
    function faseDo(x, v) {
      if (x < 1.9) return { nome: 'Repouso', cor: AZUL, det: 'Vm ≈ −70 mV. Canais de Na⁺ e K⁺ voltagem-dependentes fechados; bomba Na⁺/K⁺ e canais de vazamento de K⁺ sustentam o gradiente.' };
      if (v < -55 && x < 2.3) return { nome: 'Despolarização local', cor: AMAR, det: 'Estímulo abre alguns canais de Na⁺: entrada local de cargas positivas. Ainda reversível (sublimiar).' };
      if (v >= -55 && v < 25) return { nome: 'Upstroke (despolarização)', cor: VERM, det: 'Atingido o limiar (−55 mV), os canais de Na⁺ abrem maciçamente: influxo de Na⁺ despolariza até +30 mV em ~0,5 ms.' };
      if (v >= 25) return { nome: 'Pico', cor: '#fb923c', det: '+30 mV ≈ equilíbrio do Na⁺ (ENa). Os canais de Na⁺ inativam (tampa interna) e os de K⁺, mais lentos, começam a abrir.' };
      if (v < 25 && x < 3.8) return { nome: 'Repolarização', cor: ROXO, det: 'Saída de K⁺ pelos canais de K⁺ voltagem-dependentes traz o Vm de volta ao negativo.' };
      if (x < 5.6) return { nome: 'Hiperpolarização', cor: AZUL, det: 'Os canais de K⁺ demoram a fechar: Vm passa de −70 (≈ −80 mV). Período refratário relativo: exige estímulo mais forte.' };
      return { nome: 'Retorno ao repouso', cor: AZUL, det: 'Canais fecham e a bomba Na⁺/K⁺ restaura as concentrações (o PA consome pouco: ~1 milhão de íons por impulso).' };
    }
    const autoBtn = button(ctl, '🔁 Repetir: ON', () => { running = !running; if (running) t = 0; autoBtn.textContent = running ? '🔁 Repetir: ON' : '🔁 Repetir: OFF'; });
    button(ctl, '⚡ Estimular', () => { t = 0; running = false; autoBtn.textContent = '🔁 Repetir: OFF'; });
    /* tour guiado pelas fases do PA */
    const PARADAS_PA = [
      [0.8, 'Repouso', 'Vm ≈ −70 mV: só canais de vazamento de K⁺ abertos. A bomba Na⁺/K⁺ sustenta os gradientes.'],
      [2.05, 'Estímulo → limiar', 'A despolarização local abre canais de Na⁺; ao cruzar −55 mV, o ciclo disparado é irreversível (tudo-ou-nada).'],
      [2.62, 'Upstroke → pico', 'Canais de Na⁺ abertos maciçamente: influxo gigante leva o Vm a +30 mV em ~0,5 ms.'],
      [3.5, 'Repolarização', 'Canais de Na⁺ inativam (tampa interna) e os de K⁺ lentos abrem: K⁺ sai e o Vm volta ao negativo.'],
      [4.6, 'Hiperpolarização', 'Os canais de K⁺ demoram a fechar — o Vm passa de −70 (≈ −80 mV): período refratário relativo.'],
      [6.3, 'Retorno ao repouso', 'Tudo fecha; a bomba restaura as concentrações. Pronto para o próximo impulso.']
    ];
    let guiPA = -1;
    const guiBtnPA = button(ctl, '▸ Tour das fases', () => {
      running = false; autoBtn.textContent = '🔁 Repetir: OFF';
      guiPA = (guiPA + 1) % PARADAS_PA.length;
      t = PARADAS_PA[guiPA][0];
      guiBtnPA.textContent = guiPA === PARADAS_PA.length - 1 ? '↺ Recomeçar tour' : 'Próxima fase ▸';
    });

    function draw(dt) {
      if (running) { t += dt * 1.6; if (t >= T_MAX) t = 0; }
      if (guiPA >= 0 && !running) t = PARADAS_PA[guiPA][0];
      const v = vm(t), f = faseDo(t, v);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'POTENCIAL DE AÇÃO DO NEURÔNIO — milissegundos que codificam toda a informação nervosa', W);

      const gx = 70, gy = 44, gw = 500, gh = 330;
      const X = ms => gx + (ms / T_MAX) * gw;
      const Y = mv => gy + gh - ((mv + 95) / 140) * gh;
      eixo(ctx, gx, gy, gw, gh);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px system-ui'; ctx.textAlign = 'right';
      [[30, '+30'], [0, '0'], [-55, '−55 (limiar)'], [-70, '−70']].forEach(([mv, lab]) => {
        ctx.fillStyle = mv === -55 ? AMAR : 'rgba(148,163,184,.7)';
        ctx.fillText(lab, gx - 8, Y(mv) + 4);
        ctx.strokeStyle = mv === -55 ? 'rgba(250,204,21,.35)' : 'rgba(148,163,184,.12)';
        ctx.setLineDash(mv === -55 ? [5, 4] : [3, 4]);
        ctx.beginPath(); ctx.moveTo(gx, Y(mv)); ctx.lineTo(gx + gw, Y(mv)); ctx.stroke(); ctx.setLineDash([]);
      });
      ctx.textAlign = 'center';
      for (let ms = 0; ms <= T_MAX; ms++) { ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.fillText(ms + 'ms', X(ms), gy + gh + 18); }
      /* curva */
      ctx.strokeStyle = VERDE; ctx.lineWidth = 2.8; ctx.beginPath();
      for (let ms = 0; ms <= T_MAX; ms += 0.02) {
        const y = Y(vm(ms));
        if (ms === 0) ctx.moveTo(X(ms), y); else ctx.lineTo(X(ms), y);
      }
      ctx.stroke();
      /* cursor */
      ctx.fillStyle = AMAR; ctx.beginPath(); ctx.arc(X(t), Y(v), 6, 0, Math.PI * 2); ctx.fill();

      /* painel de canais */
      const px = 620, pw = 240;
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('Canais voltagem-dependentes', px, gy + 8);
      const naEstado = (v > -55 && v < 25) ? 'ABERTO' : (v >= 25 || (t > 2.9 && t < 4.2 && v < 0)) ? 'INATIVADO' : 'FECHADO';
      const kEstado = (v > -10 || (t > 3.2 && t < 5.4)) ? 'ABERTO' : 'FECHADO';
      function canal(y, nome, estado, cor) {
        const aberto = estado === 'ABERTO';
        const corBx = aberto ? cor : estado === 'INATIVADO' ? VERM : 'rgba(148,163,184,.4)';
        roundRect(ctx, px, y, 110, 30, 7);
        ctx.fillStyle = 'rgba(148,163,184,.1)'; ctx.fill();
        ctx.strokeStyle = corBx; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = corBx; ctx.font = '700 10.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(estado, px + 55, y + 19);
        ctx.fillStyle = 'rgba(226,232,240,.8)'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(nome, px, y - 8);
        if (aberto) {
          ctx.font = '700 13px system-ui'; ctx.fillStyle = cor;
          for (let k = 0; k < 2; k++) {
            const yy = y + 38 + ((t * 90 + k * 44) % 80);
            ctx.fillText(nome.includes('Na') ? 'Na⁺ ↓' : 'K⁺ ↑', px + 152 + k * 52, yy);
          }
        }
      }
      canal(gy + 40, 'Canal de Na⁺', naEstado, VERM);
      canal(gy + 120, 'Canal de K⁺', kEstado, ROXO);
      /* leitura */
      ctx.fillStyle = '#fff'; ctx.font = '700 22px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(v.toFixed(0) + ' mV', px, gy + 220);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '12px system-ui';
      ctx.fillText('t = ' + t.toFixed(1) + ' ms', px, gy + 242);
      ctx.fillStyle = f.cor; ctx.font = '600 13.5px system-ui';
      ctx.fillText(f.nome, gx, gy + gh + 44);
      ctx.fillStyle = 'rgba(203,213,225,.85)'; ctx.font = '12.5px system-ui';
      /* quebra a descrição em duas linhas */
      const palavras = f.det.split(' '); let linha = '', ly = gy + gh + 64;
      for (const p of palavras) {
        if ((linha + p).length > 78) { ctx.fillText(linha, gx, ly); linha = ''; ly += 17; }
        linha += p + ' ';
      }
      ctx.fillText(linha, gx, ly);

      if (guiPA >= 0 && !running) {
        const [, nomeG, detG] = PARADAS_PA[guiPA];
        st.innerHTML = `<b style="color:${AMAR}">▸ Tour — ${nomeG}</b> · Vm = <b>${v.toFixed(0)} mV</b> — ${detG} <i>(continue com "Próxima fase ▸")</i>`;
      } else {
        st.innerHTML = `<b style="color:${f.cor}">■ ${f.nome}</b> · Vm = <b>${v.toFixed(0)} mV</b> · t = <b>${t.toFixed(1)} ms</b> — tudo-ou-nada: ou passa de −55 mV e dispara, ou nada acontece.`;
      }
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 4. SARCÔMERO — filamentos deslizantes corretos                 */
  /* ============================================================== */
  function sarcomero(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 430);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, estimulo = 0.5, L = 3.6;
    const sl = document.createElement('div');
    sl.className = 'slider-wrap';
    sl.innerHTML = '<label>Intensidade do estímulo (Ca²⁺ liberado pelo RS): <b>50%</b></label>';
    const input = document.createElement('input');
    input.type = 'range'; input.min = 0; input.max = 100; input.value = 50;
    input.addEventListener('input', () => { estimulo = input.value / 100; sl.querySelector('b').textContent = input.value + '%'; });
    sl.appendChild(input); ctl.appendChild(sl);
    button(ctl, '↺ Relaxar', () => { input.value = 0; estimulo = 0; sl.querySelector('b').textContent = '0%'; });

    const S = 190; // px por µm
    const A_LEN = 1.0, M_LEN = 1.6, L_MIN = 1.9, L_MAX = 3.6;

    function draw(dt) {
      t += dt;
      const alvo = L_MAX - estimulo * (L_MAX - L_MIN);
      L += (alvo - L) * Math.min(1, dt * 4);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'SARCÔMERO EM CONTRAÇÃO — os filamentos NÃO encurtam; eles deslizam (linhas Z se aproximam)', W);

      const cy = 150, cx = W / 2;
      const half = (L * S) / 2;
      const zL = cx - half, zR = cx + half;
      const mHalf = (M_LEN * S) / 2;
      /* linhas Z */
      ctx.fillStyle = '#e879f9';
      roundRect(ctx, zL - 5, cy - 78, 10, 156, 4); ctx.fill();
      roundRect(ctx, zR - 5, cy - 78, 10, 156, 4); ctx.fill();
      /* actina: das linhas Z em direção ao centro, comprimento fixo */
      const actL = A_LEN * S;
      ctx.lineWidth = 4.5; ctx.lineCap = 'round';
      for (let k = 0; k < 5; k++) {
        const y = cy - 52 + k * 26;
        ctx.strokeStyle = 'rgba(96,165,250,.85)';
        ctx.beginPath(); ctx.moveTo(zL, y); ctx.lineTo(Math.min(zL + actL, zR), y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(zR, y); ctx.lineTo(Math.max(zR - actL, zL), y); ctx.stroke();
      }
      /* miosina central */
      for (let k = 0; k < 5; k++) {
        const y = cy - 52 + k * 26;
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(cx - mHalf, y); ctx.lineTo(cx + mHalf, y); ctx.stroke();
      }
      /* linha M */
      ctx.strokeStyle = 'rgba(226,232,240,.6)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx, cy - 70); ctx.lineTo(cx, cy + 70); ctx.stroke();
      /* zona de overlap (onde existem pontes cruzadas) */
      const ovL1 = Math.max(zL, cx - mHalf), ovL2 = Math.min(zL + actL, cx + mHalf);
      const overlap = Math.max(0, ovL2 - ovL1);
      if (overlap > 8 && estimulo > 0.04) {
        const n = Math.floor(overlap / 26);
        for (let k = 0; k < 5; k++) {
          const y = cy - 52 + k * 26;
          const dir = (y < cy) ? -1 : 1;
          for (let i = 0; i <= n; i++) {
            const bx = ovL1 + 13 + i * 26;
            const wig = Math.sin(t * 12 + bx * 0.08 + k) * (2.2 + estimulo * 3.2);
            ctx.strokeStyle = 'rgba(251,191,36,.9)'; ctx.lineWidth = 1.8;
            ctx.beginPath(); ctx.moveTo(bx, y);
            ctx.lineTo(bx - 6 - estimulo * 4, y + dir * (7 + wig));
            ctx.moveTo(bx + 13, y);
            ctx.lineTo(bx + 19 + estimulo * 4, y + dir * (7 - wig));
            ctx.stroke();
          }
        }
      }
      /* cotas embaixo: banda A, banda I e comprimento — 2 níveis */
      const y1 = cy + 108, y2 = cy + 140;
      function cota(xa, xb, y, cor, label) {
        ctx.strokeStyle = cor; ctx.fillStyle = cor; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(xa, y - 6); ctx.lineTo(xa, y + 6); ctx.moveTo(xb, y - 6); ctx.lineTo(xb, y + 6); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.stroke();
        ctx.font = '600 11.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(label, (xa + xb) / 2, y + 18);
      }
      cota(cx - mHalf, cx + mHalf, y1, '#f59e0b', 'banda A (miosina) — CONSTANTE = 1,6 µm');
      cota(zL, zL + actL, y2, '#60a5fa', 'banda I (só actina)');
      cota(zR - actL, zR, y2, '#60a5fa', 'banda I');
      /* comprimento total */
      ctx.fillStyle = 'rgba(226,232,240,.9)'; ctx.font = '700 14px system-ui'; ctx.textAlign = 'right';
      ctx.fillText('comprimento: ' + L.toFixed(2) + ' µm', W - 20, 46);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11.5px system-ui';
      ctx.fillText('ótimo de força: 2,0–2,2 µm', W - 20, 66);

      st.innerHTML = estimulo > 0.08
        ? `Estímulo <b>${Math.round(estimulo * 100)}%</b>: Ca²⁺ liga a troponina C → actina exposta → pontes cruzadas ciclam na <b>zona de overlap</b> (${(overlap / S).toFixed(2)} µm) → linhas Z aproximam-se (<b>${L.toFixed(2)} µm</b>). Banda A <b>constante</b>; bandas I e zona H encurtam. Cada ciclo das cabeças de miosina hidrolisa <b>1 ATP</b>.`
        : 'Em repouso: Ca²⁺ baixo → tropomiosina bloqueia os sítios de actina. Aumente o estímulo e observe o deslizamento.';
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 5. NÉFRON — fluxo com reabsorção visível (sem flicker)         */
  /* ============================================================== */
  function nefron(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 480);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, adh = false;
    const adhBtn = button(ctl, '💧 ADH: OFF', () => { adh = !adh; adhBtn.textContent = adh ? '💧 ADH: ON → urina concentrada' : '💧 ADH: OFF → urina diluída'; });

    /* caminho do néfron */
    const P = [
      [108, 108], [150, 96], [200, 78], [262, 84], [318, 112], [360, 152], [384, 198],
      [398, 252], [410, 310], [436, 362], [476, 388], [520, 384], [552, 352], [566, 300],
      [586, 248], [622, 218], [664, 206], [700, 224], [722, 262], [730, 316], [734, 420]
    ];
    const SEG = [[0, 0.16, 'Glomérulo'], [0.16, 0.46, 'Túbulo proximal'], [0.46, 0.58, 'Alça (descendo)'], [0.58, 0.72, 'Alça (subindo)'], [0.72, 0.86, 'Túbulo distal'], [0.86, 1, 'Ducto coletor']];
    let PLEN = 0;
    const ACUM = [0];
    for (let i = 1; i < P.length; i++) { PLEN += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); ACUM.push(PLEN); }
    function pointAt(s) {
      const d = s * PLEN; let acc = 0;
      for (let i = 1; i < P.length; i++) {
        const seg = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
        if (d <= acc + seg) { const p = (d - acc) / seg; return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * p, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * p]; }
        acc += seg;
      }
      return P[P.length - 1];
    }
    const parts = [];
    for (let i = 0; i < 40; i++) {
      const r = Math.random();
      parts.push({ s: Math.random() * 0.9, ty: r < 0.4 ? 'agua' : r < 0.65 ? 'na' : r < 0.85 ? 'glc' : 'ureia', dead: 0 });
    }
    const puffs = [];
    const COR = { agua: AZUL, na: AMAR, glc: VERDE, ureia: VERM };
    const ICON = { agua: '●', na: 'Na', glc: 'G', ureia: 'U' };

    function draw(dt) {
      t += dt;
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'NEFRON — 180 L/dia filtrados, 99% reabsorvidos: o que sobra vira urina', W);
      /* medula */
      const grad = ctx.createLinearGradient(0, 230, 0, 470);
      grad.addColorStop(0, 'rgba(251,146,60,.02)'); grad.addColorStop(1, 'rgba(251,146,60,.16)');
      ctx.fillStyle = grad; ctx.fillRect(0, 230, W, 250);
      ctx.fillStyle = 'rgba(251,146,60,.75)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('medula hipertônica (300 → 1.200 mOsm — multiplicação contracorrente)', 18, 466);
      /* túbulo */
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(148,163,184,.45)'; ctx.lineWidth = 20;
      ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke();
      ctx.strokeStyle = 'rgba(226,232,240,.85)'; ctx.lineWidth = 15;
      ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke();
      /* cor da urina no ducto coletor (ADH) */
      const ucor = adh ? 'rgba(245,158,11,.55)' : 'rgba(250,204,21,.25)';
      ctx.strokeStyle = ucor; ctx.lineWidth = 11;
      ctx.beginPath(); ctx.moveTo(700, 224); ctx.lineTo(722, 262); ctx.lineTo(730, 316); ctx.lineTo(734, 420); ctx.stroke();
      /* glomérulo */
      ctx.save(); ctx.translate(96, 104);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(248,113,113,.8)'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(Math.cos(a) * 20, Math.sin(a) * 20, 13, a, a + 2.6); ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = VERM; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(30, 40); ctx.lineTo(76, 84); ctx.stroke();
      /* labels com linhas-guia */
      const labels = [
        ['Glomérulo + cápsula de Bowman — FILTRAÇÃO', 30, 150, 96, 122],
        ['Túbulo proximal — 65% (Na⁺, água, 100% glicose)', 300, 40, 330, 100],
        ['Alça de Henle — gradiente medular', 560, 440, 505, 392],
        ['Distal — aldosterona (Na⁺ ↔ K⁺)', 560, 176, 640, 212],
        ['Ducto coletor — ADH → aquaporinas-2', 758, 300, 730, 320]
      ];
      ctx.font = '600 11.5px system-ui';
      labels.forEach(([txt, tx, ty, ax, ay]) => {
        ctx.strokeStyle = 'rgba(148,163,184,.35)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(tx, ty + 4); ctx.lineTo(ax, ay); ctx.stroke();
        ctx.fillStyle = 'rgba(226,232,240,.8)'; ctx.textAlign = tx < 400 ? 'left' : 'right';
        ctx.fillText(txt, tx, ty);
      });

      /* partículas + reabsorção com "puffs" */
      for (const p of parts) {
        p.s += dt * 0.035;
        if (p.s >= 1) { p.s = 0.02; }
        const frac = p.s;
        let reabsorve = false;
        if (p.ty === 'glc' && frac > 0.20 && frac < 0.44) reabsorve = true;
        if (p.ty === 'na' && ((frac > 0.22 && frac < 0.44) || (frac > 0.5 && frac < 0.68))) reabsorve = Math.random() < dt * 1.4;
        if (p.ty === 'agua') {
          if (frac > 0.22 && frac < 0.44) reabsorve = Math.random() < dt * 1.1;
          if (frac > 0.88) reabsorve = Math.random() < (adh ? dt * 2.4 : dt * 0.15);
        }
        if (reabsorve) {
          const [ax, ay] = pointAt(p.s);
          puffs.push({ x: ax, y: ay, a: 1, cor: COR[p.ty], icon: ICON[p.ty] });
          p.s = 0.02 + Math.random() * 0.1;
        }
        const [ax, ay] = pointAt(p.s);
        ctx.fillStyle = COR[p.ty]; ctx.font = 'bold 10.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(ICON[p.ty], ax, ay + 4);
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const q = puffs[i];
        q.y -= dt * 26; q.a -= dt * 1.1;
        if (q.a <= 0) { puffs.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, q.a);
        ctx.fillStyle = q.cor; ctx.font = 'bold 11px system-ui';
        ctx.fillText(q.icon + '↑', q.x, q.y);
        ctx.globalAlpha = 1;
      }
      /* legenda */
      const leg = [['●', AZUL, 'água'], ['Na', AMAR, 'Na⁺'], ['G', VERDE, 'glicose'], ['U', VERM, 'ureia']];
      leg.forEach((l, i) => {
        ctx.fillStyle = l[1]; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(l[0], 20 + i * 105, 500 - 22);
        ctx.fillStyle = 'rgba(226,232,240,.7)'; ctx.font = '11.5px system-ui';
        ctx.fillText(l[2], 34 + i * 105, 500 - 22);
      });

      st.innerHTML = `Acompanhe: <b style="color:${VERDE}">glicose (G)</b> some toda no túbulo proximal (SGLT2, 100%); <b style="color:${AMAR}">Na⁺</b> é reabsorvido ao longo do néfron; <b style="color:${AZUL}">água</b> segue o Na⁺ e, no ducto coletor, depende da <b>ADH</b> — ${adh ? '<b style="color:' + AMAR + '">ADH ON</b>: aquaporinas-2 abertas → água reabsorvida → urina concentrada (escura, ~500 mL/dia)' : '<b>ADH OFF</b>: ducto impermeável → urina diluída (clara)'}. <b style="color:${VERM}">Ureia (U)</b> chega ao fim: excreta-se.`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 6. GLICEMIA — insulina × glucagon                               */
  /* ============================================================== */
  function glicemia(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 470);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, g = 95;
    const parts = [];
    let flash = '';
    button(ctl, '🍔 Refeição', () => { g = Math.min(430, g + 95); flash = 'Refeição! Observe as células β…'; });
    button(ctl, '🏃 Exercício', () => { g = Math.max(45, g - 45); flash = 'Músculo consumindo glicose — células α…'; });
    button(ctl, '⏱ Jejum', () => { g = Math.max(45, g - 18); flash = 'Jejum: glucagon mobiliza o fígado.'; });

    function draw(dt) {
      t += dt;
      const ins = Math.max(0, (g - 100) / 70);
      const glu = Math.max(0, (85 - g) / 30);
      g = Math.min(430, Math.max(45, g + ((90 - g) * 0.10 - ins * 5.2 + glu * 4.6) * dt * 2));
      if (t > 4) flash = '';
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'HOMEOSTASE DA GLICEMIA (70–110 mg/dL em jejum) — dois hormônios em see-saw', W);

      /* barra */
      const bx = 70, bw = W - 140, by = 44, bh = 30;
      ctx.fillStyle = 'rgba(148,163,184,.12)'; roundRect(ctx, bx, by, bw, bh, 15); ctx.fill();
      const gg = Math.min(1, (g - 40) / 380);
      const cor = g < 70 ? VERM : g <= 140 ? VERDE : g <= 250 ? AMAR : VERM;
      ctx.fillStyle = cor; roundRect(ctx, bx, by, Math.max(24, gg * bw), bh, 15); ctx.fill();
      ctx.fillStyle = '#0b1020'; ctx.font = '700 14px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(Math.round(g) + ' mg/dL', bx + 16, by + 21);
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '10.5px system-ui';
      [70, 110, 140, 250].forEach(v => {
        const x = bx + ((v - 40) / 380) * bw;
        ctx.fillText(v + '', x - 8, by + bh + 16);
        ctx.strokeStyle = 'rgba(255,255,255,.3)';
        ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(x, by + bh); ctx.stroke();
      });

      /* pâncreas */
      const px = W / 2, py = 170;
      ctx.fillStyle = 'rgba(226,232,240,.1)';
      ctx.beginPath(); ctx.ellipse(px, py, 130, 50, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(226,232,240,.4)'; ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,.85)'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('PÂNCREAS (ilhotas de Langerhans)', px, py - 62);
      const bAtiva = ins > 0.06, aAtiva = glu > 0.06;
      ctx.fillStyle = bAtiva ? VERDE : 'rgba(74,222,128,.25)';
      ctx.beginPath(); ctx.arc(px - 58, py, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#052e16'; ctx.font = '700 13px system-ui'; ctx.fillText('β', px - 58, py + 5);
      ctx.fillStyle = aAtiva ? '#f472b6' : 'rgba(244,114,182,.25)';
      ctx.beginPath(); ctx.arc(px + 58, py, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#500724'; ctx.fillText('α', px + 58, py + 5);
      ctx.fillStyle = 'rgba(226,232,240,.7)'; ctx.font = '11px system-ui';
      ctx.fillText('β → insulina', px - 58, py + 40);
      ctx.fillText('α → glucagon', px + 58, py + 40);

      /* hormônios viajando */
      if (bAtiva && Math.random() < Math.min(1, ins) * 0.9) parts.push({ x: px - 58, y: py, ty: 'ins', vx: (Math.random() - 0.5) * 1.6, vy: 1.4 + Math.random() * 1.2 });
      if (aAtiva && Math.random() < Math.min(1, glu) * 0.9) parts.push({ x: px + 58, y: py, ty: 'glu', vx: (Math.random() - 0.5) * 1.6, vy: 1.4 + Math.random() * 1.2 });
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy;
        if (p.y > H - 66) { parts.splice(i, 1); continue; }
        ctx.fillStyle = p.ty === 'ins' ? VERDE : '#f472b6';
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill();
      }

      /* órgãos-alvo */
      const alvos = [
        [150, 340, 'FÍGADO', bAtiva ? 'glicogênese ↓glicemia' : aAtiva ? 'glicogenólise ↑glicose' : 'glicostático'],
        [W / 2, 356, 'MÚSCULO', 'GLUT4 → captação de glicose'],
        [W - 150, 340, 'TECIDO ADIPOSO', 'lipogênese (armazenar)']
      ];
      alvos.forEach(([ax, ay, nome, acao]) => {
        ctx.fillStyle = 'rgba(129,140,248,.15)';
        roundRect(ctx, ax - 88, ay - 34, 176, 74, 12); ctx.fill();
        ctx.strokeStyle = 'rgba(129,140,248,.55)'; ctx.stroke();
        ctx.fillStyle = 'rgba(226,232,240,.92)'; ctx.font = '600 12.5px system-ui';
        ctx.fillText(nome, ax, ay - 10);
        ctx.fillStyle = 'rgba(148,163,184,.85)'; ctx.font = '11px system-ui';
        ctx.fillText(acao, ax, ay + 10);
        ctx.strokeStyle = bAtiva || aAtiva ? 'rgba(148,163,184,.5)' : 'rgba(148,163,184,.15)';
        ctx.setLineDash([5, 5]); ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(px, py + 55); ctx.quadraticCurveTo((px + ax) / 2, 268, ax, ay - 38); ctx.stroke();
        ctx.setLineDash([]);
      });

      let estado, ecor;
      if (g < 70) { estado = 'HIPOGLICEMIA — glucagon e adrenalina mobilizam glicose hepática'; ecor = VERM; }
      else if (g > 140) { estado = 'HIPERGLICEMIA — insulina faz as células armazenarem'; ecor = AMAR; }
      else { estado = 'FAIXA NORMAL — equilíbrio dinâmico dos dois hormônios'; ecor = VERDE; }
      st.innerHTML = `<b style="color:${ecor}">■ ${estado}</b>${flash ? ' · <i>' + flash + '</i>' : ''} · clinica: glicemia de jejum ≥ 126 mg/dL (em 2 ocasiões) = diabetes; 100–125 = pré-diabetes.`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 7. PERISTALSE — esôfago                                         */
  /* ============================================================== */
  function peristalse(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 350);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let bolusX = -1, waveX = -1, on = false, count = 0, msg = '';
    button(ctl, '👅 Engolir', () => {
      if (on) return;
      on = true; bolusX = 96; waveX = 40; msg = 'Fase faringea: epiglote fecha a via aérea (~1 s), o bolo entra no esôfago.';
    });
    const y = 150, L = 80, R = W - 120;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'DEGLUTIÇÃO E PERISTALSE — onda de contração ATRÁS do bolo, relaxamento À FRENTE', W);
      /* boca e estômago */
      ctx.fillStyle = 'rgba(244,114,182,.4)';
      roundRect(ctx, 22, y - 36, 48, 72, 12); ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11.5px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('boca', 46, y - 48);
      ctx.strokeStyle = 'rgba(249,115,22,.7)'; ctx.fillStyle = 'rgba(249,115,22,.15)'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.ellipse(W - 60, y + 26, 42, 56, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(249,115,22,.8)'; ctx.fillText('estômago', W - 60, y + 104);
      /* tubo segmentado */
      const n = 30, sw = (R - L) / n;
      for (let i = 0; i < n; i++) {
        const c = L + i * sw + sw / 2;
        let rr = 33;
        if (waveX >= 0) {
          const d = c - waveX;
          if (d > -70 && d < 0) rr = 33 * (0.3 + 0.7 * Math.abs(d) / 70);
        }
        ctx.fillStyle = 'rgba(250,204,21,.10)';
        ctx.strokeStyle = 'rgba(250,204,21,.45)'; ctx.lineWidth = 1.6;
        roundRect(ctx, L + i * sw, y - rr, sw + 1, rr * 2, 3); ctx.fill(); ctx.stroke();
      }
      /* bolo */
      if (bolusX >= 0) {
        ctx.fillStyle = '#84cc16';
        ctx.beginPath(); ctx.ellipse(bolusX, y, 19, 14, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#365314'; ctx.font = '600 10px system-ui';
        ctx.fillText('bolo', bolusX, y + 4);
      }
      /* EEI */
      const eei = R - 12;
      const abre = on && bolusX > eei - 70 && bolusX < eei + 26;
      ctx.strokeStyle = VERM; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(eei, y - (abre ? 46 : 30)); ctx.lineTo(eei, y - (abre ? 46 : 12));
      ctx.moveTo(eei, y + (abre ? 46 : 30)); ctx.lineTo(eei, y + (abre ? 46 : 12));
      ctx.stroke();
      ctx.fillStyle = 'rgba(248,113,113,.85)'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('EEI', eei, y + 60);
      /* onda label */
      if (waveX >= 0) {
        ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('contração (músculo liso, plexo de Auerbach)', waveX, y - 58);
        ctx.strokeStyle = 'rgba(226,232,240,.35)';
        ctx.beginPath(); ctx.moveTo(waveX, y - 46); ctx.lineTo(waveX, y - 36); ctx.stroke();
      }
      /* anima */
      if (on) {
        bolusX += 2.1; waveX += 2.1;
        if (bolusX >= R + 8) {
          on = false; bolusX = -1; waveX = -1; count++;
          msg = 'Chegou ao estômago (~8 s). O EEI fecha atrás — impedir refluxo é função dele.';
        }
      }
      st.innerHTML = `<b style="color:#84cc16">■ Onda peristáltica primária:</b> controlada pelo <b>sistema nervoso entérico</b> (plexo mioentérico) sob comando do vago. ${msg || 'Clique em <b>👅 Engolir</b>. Gravidade não é necessária — dá-se de cabeça para baixo!'}${count ? ' · deglutições: <b>' + count + '</b>' : ''}`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 8. INFLAMAÇÃO — quimiotaxia e fagocitose                        */
  /* ============================================================== */
  function inflamacao(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 450);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, heat = 0;
    let bacterias = [], neutros = [], comidas = 0, msg = '';
    button(ctl, '🩸 Nova lesão', () => {
      for (let i = 0; i < 9; i++) bacterias.push({ x: W - 130 + Math.random() * 90, y: 240 + Math.random() * 130, vx: 0, vy: 0 });
      msg = 'Tecido lesado: mastócitos liberam HISTAMINA → vasodilatação (rubor/calor) e ↑ permeabilidade (tumor).';
    });
    button(ctl, '↺ Resolver', () => { bacterias = []; neutros = []; comidas = 0; msg = 'Cenário limpo.'; });

    function draw(dt) {
      t += dt;
      ctx.clearRect(0, 0, W, H);
      heat += ((bacterias.length > 0 ? 0.6 : 0) - heat) * dt * 0.5;
      ctx.fillStyle = `rgba(248,113,113,${0.03 + heat * 0.14})`;
      ctx.fillRect(0, 0, W, H);
      titulo(ctx, 'RESPOSTA INFLAMATÓRIA AGUDA — os 4 sinais em movimento: rubor, tumor, calor, dolor', W);
      /* vaso */
      const vy = 78;
      ctx.fillStyle = 'rgba(239,68,68,.22)';
      roundRect(ctx, 56, vy - 20, W - 112, 40, 20); ctx.fill();
      ctx.strokeStyle = 'rgba(248,113,113,.75)'; ctx.lineWidth = 3;
      roundRect(ctx, 56, vy - 20, W - 112, 40, 20); ctx.stroke();
      ctx.fillStyle = 'rgba(248,113,113,.65)';
      for (let i = 0; i < 9; i++) {
        const x = ((t * 120 + i * 95) % (W - 130)) + 66;
        ctx.beginPath(); ctx.arc(x, vy + Math.sin(i * 2.3) * 8, 5.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = 'rgba(226,232,240,.55)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('vaso (vasodilatação = CALOR e RUBOR)', 76, vy - 30);
      /* recrutamento */
      if (bacterias.length > 0 && neutros.length < 8 && Math.random() < dt * 1.5) {
        neutros.push({ x: 130 + Math.random() * 320, y: vy + 6, v: 0 });
        if (neutros.length === 1) msg = 'Neutrófilos fazem MARGINAÇÃO → rolamento (selectinas) → adesão (integrinas) → DIAPEDESE entre os endoteliócitos.';
      }
      /* bactérias */
      for (const b of bacterias) {
        b.vx += (Math.random() - 0.5) * 0.4; b.vy += (Math.random() - 0.5) * 0.4;
        b.vx = Math.max(-0.5, Math.min(0.5, b.vx)); b.vy = Math.max(-0.5, Math.min(0.5, b.vy));
        b.x += b.vx; b.y += b.vy;
        b.x = Math.max(80, Math.min(W - 40, b.x)); b.y = Math.max(150, Math.min(H - 30, b.y));
        ctx.fillStyle = VERDE;
        ctx.beginPath(); ctx.arc(b.x, b.y, 7.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#166534'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(b.x - 9, b.y); ctx.lineTo(b.x + 9, b.y); ctx.moveTo(b.x, b.y - 9); ctx.lineTo(b.x, b.y + 9); ctx.stroke();
      }
      /* neutrófilos */
      for (let i = neutros.length - 1; i >= 0; i--) {
        const n = neutros[i];
        let alvo = null, melhor = 1e9;
        for (const b of bacterias) {
          const d = Math.hypot(b.x - n.x, b.y - n.y);
          if (d < melhor) { melhor = d; alvo = b; }
        }
        if (alvo) {
          const a = Math.atan2(alvo.y - n.y, alvo.x - n.x);
          n.x += Math.cos(a) * 1.8; n.y += Math.sin(a) * 1.8;
          if (melhor < 15) {
            bacterias.splice(bacterias.indexOf(alvo), 1); comidas++;
            if (bacterias.length === 0) msg = 'Fagocitose concluída! Macrófagos fazem a limpeza (resolução) e apresentam antígenos ao sistema adaptativo.';
          }
        } else { n.x += (Math.random() - 0.5) * 0.8; n.y += (Math.random() - 0.5) * 0.8; }
        n.y = Math.max(140, Math.min(H - 30, n.y));
        ctx.fillStyle = '#e879f9';
        ctx.beginPath(); ctx.arc(n.x, n.y, 10.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(59,7,100,.9)';
        for (let k = 0; k < 3; k++) {
          ctx.beginPath(); ctx.arc(n.x + Math.cos(k * 2.1 + t * 2) * 3.6, n.y + Math.sin(k * 2.1 + t * 2) * 3.6, 2.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      /* placar */
      ctx.textAlign = 'left'; ctx.font = '600 12.5px system-ui';
      ctx.fillStyle = VERDE; ctx.fillText('bactérias: ' + bacterias.length, 22, H - 26);
      ctx.fillStyle = '#e879f9'; ctx.fillText('neutrófilos: ' + neutros.length + ' · fagocitadas: ' + comidas, 150, H - 26);
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '11.5px system-ui';
      ctx.fillText('🩹 ferimento', W - 140, 400);

      const etapa = bacterias.length > 0 ? `<b style="color:${VERM}">■ Inflamação ativa (DOLOR)</b>` : (comidas ? `<b style="color:${VERDE}">■ Resolução</b>` : 'Tecido em repouso');
      st.innerHTML = `${etapa} — ${msg || 'Clique em <b>🩸 Nova lesão</b> e observe: quimiotaxia (seguem sinais químicos como IL-8 e C5a) e FAGOCITOSE — oxidativa (ROS) dentro do fagolisossomo.'}`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 9. COMPARTIMENTOS LÍQUIDOS — osmose                             */
  /* ============================================================== */
  function compartimentos(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 440);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let naLEC = 1.0, aguaTotal = 1.0, nivelLEC = 50, nivelLIC = 72;

    const wrap = document.createElement('div'); wrap.className = 'slider-wrap';
    wrap.innerHTML = `
      <label>Concentração de <b>Na⁺ no LEC</b>: <span class="v1">142 mEq/L</span></label>
      <input type="range" min="100" max="200" value="142">
      <label>Ingestão de <b>água</b> (volume total): <span class="v2">100%</span></label>
      <input type="range" min="70" max="130" value="100">`;
    const [s1, s2] = wrap.querySelectorAll('input');
    s1.addEventListener('input', () => { naLEC = s1.value / 142; wrap.querySelector('.v1').textContent = s1.value + ' mEq/L'; });
    s2.addEventListener('input', () => { aguaTotal = s2.value / 100; wrap.querySelector('.v2').textContent = s2.value + '%'; });
    ctl.appendChild(wrap);

    function draw(dt) {
      const k = Math.min(1, dt * 3);
      /* água distribui-se proporcionalmente aos solutos efetivos: LIC fixo (1), LEC = naLEC */
      const fracLEC = naLEC / (1 + naLEC);
      const alvoLEC = Math.min(90, 76 * aguaTotal * fracLEC * 2);
      const alvoLIC = Math.min(92, 76 * aguaTotal * (1 - fracLEC) * 1.5);
      nivelLEC += (alvoLEC - nivelLEC) * k;
      nivelLIC += (alvoLIC - nivelLIC) * k;

      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'COMPARTIMENTOS LÍQUIDOS (regra 60-40-20) — a água segue os solutos efetivos (Na⁺)', W);

      const baseY = 330, boxH = 210;
      const licX = 70, licW = 380, lecX = 510, lecW = 260;
      /* LIC */
      ctx.strokeStyle = AZUL; ctx.lineWidth = 3;
      roundRect(ctx, licX, baseY - boxH, licW, boxH, 12); ctx.stroke();
      const hLIC = (boxH - 12) * (nivelLIC / 100);
      ctx.fillStyle = 'rgba(56,189,248,.25)';
      roundRect(ctx, licX + 6, baseY - 6 - hLIC, licW - 12, hLIC, 8); ctx.fill();
      ctx.fillStyle = ROXO; ctx.font = 'bold 13px system-ui'; ctx.textAlign = 'center';
      const nK = Math.round(nivelLIC / 12);
      for (let i = 0; i < nK; i++) {
        const yy = baseY - 24 - (i % 5) * 24;
        if (yy > baseY - hLIC + 12) ctx.fillText('K⁺', licX + 50 + (i % 6) * 56, yy);
      }
      ctx.fillStyle = 'rgba(226,232,240,.9)'; ctx.font = '600 12.5px system-ui';
      ctx.fillText('LÍQUIDO INTRACELULAR — 2/3 (~28 L) · K⁺ dominante', licX + licW / 2, baseY - boxH + 22);
      /* LEC */
      ctx.strokeStyle = AMAR; ctx.lineWidth = 3;
      roundRect(ctx, lecX, baseY - boxH, lecW, boxH, 12); ctx.stroke();
      const hLEC = (boxH - 12) * (nivelLEC / 100);
      ctx.fillStyle = 'rgba(250,204,21,.22)';
      roundRect(ctx, lecX + 6, baseY - 6 - hLEC, lecW - 12, hLEC, 8); ctx.fill();
      ctx.fillStyle = AMAR; ctx.font = 'bold 13px system-ui';
      const nNa = Math.round(nivelLEC / 11);
      for (let i = 0; i < nNa; i++) {
        const yy = baseY - 24 - (i % 5) * 24;
        if (yy > baseY - hLEC + 12) ctx.fillText('Na⁺', lecX + 42 + (i % 4) * 60, yy);
      }
      ctx.fillStyle = 'rgba(226,232,240,.9)'; ctx.font = '600 12.5px system-ui';
      ctx.fillText('LEC — 1/3 (~14 L) · Na⁺ dominante', lecX + lecW / 2, baseY - boxH + 22);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px system-ui';
      ctx.fillText('interstício (11 L) + plasma (3 L)', lecX + lecW / 2, baseY - boxH + 40);
      /* seta osmose */
      const dir = nivelLIC > nivelLEC * 1.35 ? '→' : nivelLIC < nivelLEC * 1.05 ? '←' : '↔';
      ctx.fillStyle = VERDE; ctx.font = '700 24px system-ui';
      ctx.fillText(dir, (licX + licW + lecX) / 2, baseY - 100);
      ctx.font = '11px system-ui';
      ctx.fillText('osmose', (licX + licW + lecX) / 2, baseY - 76);
      /* célula modelo */
      const escala = Math.max(0.72, Math.min(1.28, 1 / (naLEC * Math.sqrt(aguaTotal))));
      ctx.save(); ctx.translate(440, 96); ctx.scale(escala, escala);
      ctx.strokeStyle = 'rgba(96,165,250,.9)'; ctx.lineWidth = 2.5; ctx.fillStyle = 'rgba(96,165,250,.14)';
      ctx.beginPath(); ctx.ellipse(0, 0, 48, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,.8)'; ctx.font = '11px system-ui';
      ctx.fillText('célula', 0, 4);
      ctx.restore();

      const osm = Math.round(2 * 142 * naLEC + 5);
      const estado = naLEC > 1.12 ? { t: 'HIPERTONIA (Na⁺ alto): água SAI da célula → encolhe (crenação)', c: VERM }
        : naLEC < 0.92 ? { t: 'HIPOTONIA (Na⁺ baixo): água ENTRA na célula → incha (risco de edema cerebral!)', c: AZUL }
        : { t: 'ISOTONIA — equilíbrio dinâmico', c: VERDE };
      st.innerHTML = `<b style="color:${estado.c}">■ ${estado.t}</b> · Na⁺ LEC: <b>${Math.round(naLEC * 142)}</b> · osmolaridade LEC ≈ <b>${osm} mOsm</b> (2×Na + 5) · a célula-modelo acima mostra o efeito no volume celular em tempo real.`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 10. FEEDBACK NEGATIVO — circuito + gráfico                      */
  /* ============================================================== */
  function feedback(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 500);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, T = 37, est = 0, etapa = -1;
    const hist = [];
    const ETAPAS = [
      { nome: '1) Variável controlada', desc: 'Todo circuito começa com a <b>variável</b> que precisa ficar estável: aqui, a temperatura central (~37 °C).' },
      { nome: '2) Sensor', desc: '<b>Termorreceptores</b> periféricos (pele) e centrais (hipotálamo anterior) medem a temperatura e informam por vias aferentes.' },
      { nome: '3) Integrador (set point)', desc: 'O <b>hipotálamo</b> compara a medida com o set point (37 °C) e calcula o ERRO: quanto e para que lado corrigir.' },
      { nome: '4) Efetores', desc: 'Frio → <b>tremor</b>, vasoconstrição cutânea, ↑ tireoide. Calor → <b>sudorese</b>, vasodilatação, ↑ ventilação.' },
      { nome: '5) Feedback fecha o loop', desc: 'A resposta <b>reduz o próprio estímulo</b> (feedback NEGATIVO): a temperatura volta a 37 e os efetores desligam. Compare com o parto/coagulação, que AMPLIFICAM (positivo).' }
    ];
    const btnProx = button(ctl, '▸ Tour guiado passo a passo', () => {
      etapa = (etapa + 1) % ETAPAS.length;
      if (etapa === 0) { T = 37.7; hist.length = 0; est = 0; }
      if (etapa === 1) est = -1;
      if (etapa === 4) est = 0;
      btnProx.textContent = etapa === ETAPAS.length - 1 ? '↺ Recomeçar tour' : 'Próxima etapa ▸';
    });
    button(ctl, '❄️ Frio', () => { etapa = -1; est = -1; btnProx.textContent = '▸ Tour guiado passo a passo'; });
    button(ctl, '🔥 Calor', () => { etapa = -1; est = 1; btnProx.textContent = '▸ Tour guiado passo a passo'; });

    function draw(dt) {
      t += dt;
      const efetor = Math.abs(T - 37) > 0.22;
      T += ((37 + est * 1.7) - T) * (efetor ? 0.34 : 0.05) * dt;
      hist.push(T); if (hist.length > 300) hist.shift();

      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'FEEDBACK NEGATIVO — o circuito que sustenta a homeostase (termorregulação)', W);

      /* circuito: 5 caixas em linha + seta de retorno */
      const boxes = [
        ['VARIÁVEL', 'T° do corpo', AZUL],
        ['SENSOR', 'termorreceptores', '#38bdf8'],
        ['INTEGRADOR', 'hipotálamo', AMAR],
        ['EFETORES', 'músculo · pele · glândulas', '#fb923c'],
        ['RESPOSTA', 'tremor / sudorese', VERDE]
      ];
      const bw2 = 148, bh2 = 56, gap = 22, x0 = (W - (bw2 * 5 + gap * 4)) / 2, byy = 48;
      boxes.forEach(([tt, sub, cor], i) => {
        const bx = x0 + i * (bw2 + gap);
        const ativo = etapa === i;
        roundRect(ctx, bx, byy, bw2, bh2, 10);
        ctx.fillStyle = ativo ? 'rgba(250,204,21,.16)' : 'rgba(148,163,184,.08)';
        ctx.fill();
        ctx.strokeStyle = ativo ? AMAR : 'rgba(148,163,184,.35)'; ctx.lineWidth = ativo ? 2 : 1.2;
        ctx.stroke();
        ctx.fillStyle = ativo ? '#fde68a' : cor; ctx.font = '700 11.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(tt, bx + bw2 / 2, byy + 22);
        ctx.fillStyle = 'rgba(148,163,184,.85)'; ctx.font = '10.5px system-ui';
        ctx.fillText(sub, bx + bw2 / 2, byy + 39);
        if (i < 4) {
          ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(bx + bw2 + 3, byy + bh2 / 2); ctx.lineTo(bx + bw2 + gap - 3, byy + bh2 / 2); ctx.stroke();
          ctx.fillStyle = 'rgba(148,163,184,.6)';
          ctx.beginPath(); ctx.moveTo(bx + bw2 + gap - 3, byy + bh2 / 2); ctx.lineTo(bx + bw2 + gap - 9, byy + bh2 / 2 - 4); ctx.lineTo(bx + bw2 + gap - 9, byy + bh2 / 2 + 4); ctx.closePath(); ctx.fill();
        }
      });
      /* seta de retorno (feedback) */
      const ry = byy + bh2 + 26;
      ctx.strokeStyle = 'rgba(74,222,128,.75)'; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(x0 + 4 * (bw2 + gap) + bw2 / 2, byy + bh2);
      ctx.lineTo(x0 + 4 * (bw2 + gap) + bw2 / 2, ry);
      ctx.lineTo(x0 + bw2 / 2, ry);
      ctx.lineTo(x0 + bw2 / 2, byy + bh2 + 6);
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = VERDE; ctx.font = '600 11px system-ui';
      ctx.fillText('FEEDBACK NEGATIVO: a resposta reduz o estímulo', W / 2, ry - 8);

      /* gráfico */
      const gx = 90, gy = 190, gw = W - 190, gh = 230;
      eixo(ctx, gx, gy, gw, gh);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('Temperatura central (°C)', gx + 6, gy - 8);
      const Y = v => gy + gh - ((v - 35.6) / 3.4) * gh;
      ctx.fillStyle = 'rgba(74,222,128,.13)';
      ctx.fillRect(gx, Y(37.5), gw, Y(36.6) - Y(37.5));
      [37, 36.6, 37.5].forEach(v => {
        ctx.strokeStyle = 'rgba(74,222,128,.4)'; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(gx, Y(v)); ctx.lineTo(gx + gw, Y(v)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(74,222,128,.8)'; ctx.font = '10.5px system-ui'; ctx.textAlign = 'left';
        ctx.fillText(v.toFixed(1), gx - 32, Y(v) + 4);
      });
      ctx.fillStyle = 'rgba(74,222,128,.9)'; ctx.font = '10.5px system-ui';
      ctx.fillText('set point 37,0 · faixa normal', gx + gw - 170, Y(37) - 7);
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.4; ctx.beginPath();
      hist.forEach((v, i) => {
        const x = gx + (i / 300) * gw;
        if (i === 0) ctx.moveTo(x, Y(v)); else ctx.lineTo(x, Y(v));
      });
      ctx.stroke();
      /* leitura grande */
      ctx.fillStyle = T > 37.4 ? VERM : T < 36.7 ? AZUL : VERDE;
      ctx.font = '700 26px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(T.toFixed(2) + ' °C', gx + 12, gy + gh - 14);
      /* efetores ativos */
      ctx.font = '600 12px system-ui'; ctx.textAlign = 'left';
      const frio = T < 36.8, calor = T > 37.3;
      ctx.fillStyle = frio ? '#93c5fd' : 'rgba(148,163,184,.4)';
      ctx.fillText('❄ tremor musc. · ❄ vasoconstrição', gx + gw - 300, gy + gh - 44);
      ctx.fillStyle = calor ? '#fca5a5' : 'rgba(148,163,184,.4)';
      ctx.fillText('💧 sudorese · 🔥 vasodilatação', gx + gw - 300, gy + gh - 24);

      const info = etapa >= 0
        ? `<b style="color:${AMAR}">${ETAPAS[etapa].nome}</b> — ${ETAPAS[etapa].desc}`
        : (est < 0 ? `❄️ <b>Frio:</b> T cai → sensores → hipotálamo → tremor + vasoconstrição → T <b>volta aos 37</b>.`
          : est > 0 ? `🔥 <b>Calor:</b> T sobe → sudorese + vasodilatação (evaporação) → T <b>volta aos 37</b>.`
            : 'Modo estável. Aplique <b>❄️/🔥</b> ou siga o <b>tour guiado</b>. Note: quanto maior o desvio, mais forte a correção (ganho do sistema).');
      st.innerHTML = info;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 11. TRANSPORTE MEMBRANAR — 5 modos                              */
  /* ============================================================== */
  function transporte(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 460);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    const MODOS = {
      simples: { nome: 'Difusão simples', desc: 'Lipossolúveis (O₂, CO₂, álcool) atravessam a bicamada <b>a favor</b> do gradiente. Fluxo ∝ ΔC × área / espessura × permeabilidade (lei de Fick). Sem proteína, sem ATP, insaturável.' },
      canal: { nome: 'Canal iônico', desc: 'Íons passam por poros proteicos seletivos (K⁺, Na⁺, Ca²⁺, Cl⁻) — difusão facilitada <b>por canal</b>: ultra-rápida e regulável (voltagem, ligante, vazamento). Ainda que favor do gradiente.' },
      transportador: { nome: 'Transportador (GLUT)', desc: 'A glicose liga-se, o carrier muda de conformação e a solta do outro lado. <b>Saturável</b> (Vmáx quando 100% ocupados) e específico — cinética tipo Michaelis-Menten. Suba o gradiente ao máximo e veja a taxa estabilizar.' },
      osmose: { nome: 'Osmose', desc: 'Membrana semipermeável: o soluto NÃO passa, a <b>água</b> vai da solução mais diluída à mais concentrada. Gradiente alto de soluto fora → água sai → célula encolhe (hipertônico).' },
      bomba: { nome: 'Bomba Na⁺/K⁺-ATPase', desc: 'Ativo primário: <b>3 Na⁺ saem e 2 K⁺ entram por ATP</b>, CONTRA o gradiente — portanto eletrogênica. Sustenta o potencial de membrana, o volume celular e todo o transporte secundário. ~20–40% do ATP celular.' }
    };
    let modo = 'simples', t = 0, grad = 0.5;
    let parts = [], atp = 0, vol = 0.5;
    const linha = document.createElement('div'); linha.className = 'modo-linha';
    Object.keys(MODOS).forEach(m => {
      const b = document.createElement('button');
      b.className = 'btn modo-btn'; b.textContent = MODOS[m].nome;
      b.addEventListener('click', () => { modo = m; parts = []; vol = 0.5; linha.querySelectorAll('.modo-btn').forEach(x => x.classList.remove('ativo')); b.classList.add('ativo'); });
      linha.appendChild(b);
    });
    linha.querySelector('.modo-btn').classList.add('ativo');
    ctl.appendChild(linha);
    const sl = document.createElement('div'); sl.className = 'slider-wrap';
    sl.innerHTML = '<label>Gradiente de concentração (↔): <b>50%</b></label>';
    const input = document.createElement('input');
    input.type = 'range'; input.min = 0; input.max = 100; input.value = 50;
    input.addEventListener('input', () => { grad = input.value / 100; sl.querySelector('b').textContent = input.value + '%'; });
    sl.appendChild(input); ctl.appendChild(sl);
    for (let i = 0; i < 36; i++) parts.push(nova());
    function nova() {
      const ty = modo === 'simples' ? 'O₂' : modo === 'canal' ? 'K⁺' : modo === 'transportador' ? 'glc' : modo === 'osmose' ? 'sol' : (Math.random() < 0.5 ? 'Na' : 'K');
      const fora = Math.random() < 0.3 + grad * 0.4;
      return { x: 70 + Math.random() * (W - 140), y: fora ? 74 + Math.random() * 96 : 318 + Math.random() * 96, vx: 0, vy: 0, lado: fora ? 0 : 1, ty };
    }
    const MY = 236;
    function draw(dt) {
      t += dt;
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'TRANSPORTE ATRAVÉS DA MEMBRANA PLASMÁTICA — compare os 5 mecanismos', W);
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = '600 11.5px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('MEIO EXTRACELULAR', 26, 52);
      ctx.fillText('CITOPLASMA', 26, H - 18);
      /* bicamada */
      ctx.fillStyle = 'rgba(250,204,21,.13)';
      ctx.fillRect(36, MY - 15, W - 72, 30);
      ctx.strokeStyle = 'rgba(250,204,21,.6)'; ctx.lineWidth = 1.6;
      [MY - 15, MY + 15].forEach(y => {
        for (let x = 40; x < W - 44; x += 18) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 11, y); ctx.stroke();
        }
      });
      const canais = [220, 460, 700];
      if (modo === 'canal') canais.forEach(x => {
        ctx.fillStyle = '#0c1120'; ctx.fillRect(x - 13, MY - 15, 26, 30);
        ctx.strokeStyle = ROXO; ctx.lineWidth = 2; ctx.strokeRect(x - 13, MY - 15, 26, 30);
      });
      if (modo === 'transportador') {
        const x = 460, f = Math.sin(t * 3) * 8;
        ctx.fillStyle = VERDE;
        roundRect(ctx, x - 24, MY - 17, 48, 34, 13); ctx.fill();
        ctx.fillStyle = '#052e16'; ctx.font = '700 10.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('GLUT', x, MY + 4);
        ctx.strokeStyle = 'rgba(74,222,128,.5)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, MY, 16 + f * 0.5, 0, Math.PI * 2); ctx.stroke();
      }
      if (modo === 'bomba') {
        const x = 460, pisca = Math.floor(t * 2.4) % 2 === 0;
        ctx.fillStyle = VERM;
        roundRect(ctx, x - 30, MY - 18, 60, 36, 10); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = '700 9.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('Na⁺/K⁺', x - 8, MY + 4);
        ctx.fillStyle = pisca ? '#fde047' : '#a16207'; ctx.font = '700 11px system-ui';
        ctx.fillText('ATP', x + 22, MY - 22);
        if (Math.random() < dt * 3) atp++;
        ctx.fillStyle = 'rgba(226,232,240,.7)'; ctx.font = '600 11.5px system-ui'; ctx.textAlign = 'left';
        ctx.fillText('ciclos: ' + atp + ' ATP — sempre 3 Na⁺ : 2 K⁺, mesmo contra o gradiente', 60, MY + 42);
        for (let i = 0; i < 3; i++) {
          const yy = MY - 26 - ((t * 46 + i * 15) % 46);
          ctx.fillStyle = VERM; ctx.font = '700 10.5px system-ui'; ctx.textAlign = 'center';
          ctx.fillText('Na', x - 44, yy);
        }
        for (let i = 0; i < 2; i++) {
          const yy = MY + 26 + ((t * 46 + i * 20) % 46);
          ctx.fillStyle = ROXO;
          ctx.fillText('K', x + 44, yy);
        }
      }
      /* partículas */
      for (const p of parts) {
        p.vx += (Math.random() - 0.5) * 0.5; p.vy += (Math.random() - 0.5) * 0.5;
        p.vx = Math.max(-1.2, Math.min(1.2, p.vx)); p.vy = Math.max(-1.2, Math.min(1.2, p.vy));
        p.x += p.vx * 60 * dt; p.y += p.vy * 60 * dt;
        if (p.x < 46) { p.x = 46; p.vx = Math.abs(p.vx); }
        if (p.x > W - 46) { p.x = W - 46; p.vx = -Math.abs(p.vx); }
        const tocando = p.lado === 1 ? (p.y < MY + 12) : (p.y > MY - 12);
        if (tocando) {
          p.vy = -p.vy * 0.55;
          p.y = p.lado === 1 ? MY + 13 : MY - 13;
          const paraFora = p.lado === 1;
          const nFora = parts.filter(q => q.lado === 0).length;
          const alvoFora = Math.round(12 + 44 * grad);
          let passa = false;
          if (modo === 'simples') passa = Math.random() < 0.10;
          else if (modo === 'canal') passa = canais.some(cx => Math.abs(p.x - cx) < 15) ? Math.random() < 0.16 : Math.random() < 0.004;
          else if (modo === 'transportador') passa = Math.abs(p.x - 460) < 26 && Math.random() < 0.09;
          if (passa) {
            const desejo = paraFora ? nFora < alvoFora : nFora > alvoFora;
            if (desejo) {
              p.lado = 1 - p.lado;
              p.y = p.lado === 0 ? MY - 16 : MY + 16;
              p.vy = p.lado === 0 ? -1.4 : 1.4;
            }
          }
        }
        if (p.lado === 0 && p.y > MY - 20) { p.y = MY - 20; p.vy = -Math.abs(p.vy); }
        if (p.lado === 1 && p.y < MY + 20) { p.y = MY + 20; p.vy = Math.abs(p.vy); }
        if (p.y < 64) { p.y = 64; p.vy = Math.abs(p.vy); }
        if (p.y > H - 34) { p.y = H - 34; p.vy = -Math.abs(p.vy); }
        const cor = p.ty === 'O₂' ? '#94a3b8' : p.ty === 'K⁺' || p.ty === 'K' ? ROXO : p.ty === 'glc' ? VERDE : p.ty === 'Na' ? VERM : '#fb923c';
        ctx.fillStyle = cor;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.ty === 'O₂' ? 3.5 : 5.5, 0, Math.PI * 2); ctx.fill();
        if (p.ty !== 'O₂' && p.ty !== 'glc') {
          ctx.fillStyle = '#0b1020'; ctx.font = '700 8px system-ui'; ctx.textAlign = 'center';
          ctx.fillText('+', p.x, p.y + 3);
        }
        if (p.ty === 'glc') { ctx.fillStyle = '#052e16'; ctx.font = '700 8px system-ui'; ctx.fillText('G', p.x, p.y + 3); }
      }
      /* osmose: colunas de água + célula */
      if (modo === 'osmose') {
        const alvoVol = 0.5 + (grad - 0.5) * -0.9;
        vol += (alvoVol - vol) * dt * 1.5;
        const dir = grad > 0.55 ? -1 : grad < 0.45 ? 1 : 0;
        if (dir !== 0) {
          for (let i = 0; i < 3; i++) {
            const yy = dir === -1 ? MY + 20 + ((t * 70 + i * 26) % 70) : MY - 20 - ((t * 70 + i * 26) % 70);
            ctx.fillStyle = AZUL; ctx.beginPath();
            ctx.arc(220 + i * 220, yy, 4, 0, Math.PI * 2); ctx.fill();
          }
        }
        const cw = 300 * vol + 80;
        ctx.strokeStyle = AZUL; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(56,189,248,.12)';
        roundRect(ctx, 700 - cw / 2, 396, cw, 46, 20); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(226,232,240,.75)'; ctx.font = '600 11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(vol > 0.66 ? 'célula INCHA — hipotônico (hemólise!)' : vol < 0.36 ? 'célula ENCOLHE — hipertônico' : 'célula estável — isotônico', 700, H - 8);
        ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
        ctx.fillText('água', 60, MY + 40);
      }
      st.innerHTML = `<b style="color:${ROXO}">${MODOS[modo].nome}</b> — ${MODOS[modo].desc}`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 12. COAGULAÇÃO — hemostasia guiada                              */
  /* ============================================================== */
  function coagulacao(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 470);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, etapa = 0, auto = false, acc = 0;
    const ETAPAS = [
      { nome: 'Vaso íntegro', desc: 'Endotélio ativo libera <b>NO e prostaciclina (PGI₂)</b>: nada gruda, nada fecha. O melhor anticoagulante é o vaso saudável.' },
      { nome: '1. Lesão + vasoconstrição', desc: 'Colágeno exposto e endotelina/TXA₂ → <b>vasoconstrição reflexa</b> (segundos) — primeiro freio ao sangramento.' },
      { nome: '2. Tampão plaquetário', desc: 'Plaquetas <b>aderem</b> ao colágeno (vWf), <b>ativam-se</b> (ADP, TXA₂, mudam de forma) e <b>agregam</b>. 💊 Aspirina bloqueia o TXA₂ (COX-1) — antiagregante.' },
      { nome: '3. Cascata → fibrina', desc: 'Fator tecidual (via extrínseca) ativa X → <b>protrombinase</b> gera <b>trombina (IIa)</b> → fibrinogênio vira <b>fibrina</b> (fator XIII estabiliza). 💊 Heparina potencializa ATIII (IIa/Xa); varfarina bloqueia fatores vit-K (II, VII, IX, X); NOACs inibem Xa/IIa direto.' },
      { nome: '4. Retração e fibrinólise', desc: 'Trombopoietina à parte: o coágulo <b>retrai</b>, o vaso repara e a <b>plasmina</b> (ativada pelo tPA — trombolítico do infarto/AVC) cliva a fibrina em <b>D-dímeros</b>. Hemostasia completa.' }
    ];
    const btnProx = button(ctl, 'Próxima etapa ▸', () => { etapa = Math.min(4, etapa + 1); auto = false; autoBtn.textContent = '▶ Automático'; });
    const autoBtn = button(ctl, '▶ Automático', () => { auto = !auto; autoBtn.textContent = auto ? '⏸ Pausar auto' : '▶ Automático'; if (auto && etapa >= 4) etapa = 0; });
    button(ctl, '↺ Reiniciar', () => { etapa = 0; auto = false; autoBtn.textContent = '▶ Automático'; });

    function draw(dt) {
      t += dt;
      if (auto) { acc += dt; if (acc > 4) { acc = 0; etapa = etapa >= 4 ? 0 : etapa + 1; } }
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'HEMOSTASIA EM 3 TEMPOS — vasoconstricção → tampão plaquetário → cascata de coagulação → cura', W);

      const cy = 120, L = 90, R = W - 110;
      const luz = etapa === 0 ? 42 : 28;
      ctx.strokeStyle = 'rgba(248,113,113,.85)'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(L, cy - luz); ctx.lineTo(R, cy - luz); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(L, cy + luz); ctx.lineTo(R, cy + luz); ctx.stroke();
      if (etapa === 0) {
        ctx.fillStyle = 'rgba(239,68,68,.3)';
        roundRect(ctx, L, cy - luz + 4, R - L, luz * 2 - 8, 12); ctx.fill();
        ctx.fillStyle = 'rgba(226,232,240,.55)'; ctx.font = '11.5px system-ui'; ctx.textAlign = 'left';
        ctx.fillText('fluxo laminar · endotélio NO/PGI₂', L + 8, cy + 4);
      }
      const lx = W / 2 + 30;
      if (etapa >= 1) {
        ctx.strokeStyle = 'rgba(248,113,113,.85)';
        ctx.beginPath(); ctx.moveTo(L, cy - luz); ctx.lineTo(lx - 20, cy - luz); ctx.lineTo(lx + 24, cy - luz - 10); ctx.stroke();
        if (etapa === 1) {
          ctx.fillStyle = 'rgba(239,68,68,.65)';
          for (let i = 0; i < 3; i++) {
            const g = ((t * 50 + i * 36) % 110);
            ctx.beginPath(); ctx.arc(lx + Math.sin(i * 2 + t * 3) * 7, cy - luz - 6 - g * 0.28, 4.5 - i * 0.8, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '11.5px system-ui'; ctx.textAlign = 'left';
          ctx.fillText('lesão · colágeno exposto · vasoconstrição (luz ↓)', L, cy + luz + 24);
        }
      }
      if (etapa >= 2) {
        ctx.fillStyle = 'rgba(167,139,250,.9)';
        for (let i = 0; i < 26; i++) {
          const s = (i / 26);
          ctx.beginPath();
          ctx.ellipse(lx - 30 + (s * 56) - 10, cy - luz + 7 + ((i * 7) % 16), 4.6, 3.6, i, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '11.5px system-ui'; ctx.textAlign = 'left';
        ctx.fillText('tampão plaquetário: adesão → ativação → agregação', L, cy + luz + 24);
      }
      if (etapa >= 3) {
        const fx = lx - 64, fy = cy - luz - 18, fw = 118, fh = luz + 36;
        ctx.strokeStyle = 'rgba(250,204,21,.7)'; ctx.lineWidth = 1.4;
        for (let i = 0; i <= 9; i++) {
          const x1 = fx + (i / 9) * fw;
          const x2 = fx + (((i + 4) % 9) / 9) * fw;
          ctx.beginPath(); ctx.moveTo(x1, fy); ctx.lineTo(x2, fy + fh); ctx.stroke();
        }
      }
      if (etapa >= 4) {
        ctx.fillStyle = VERDE; ctx.font = '700 15px system-ui'; ctx.textAlign = 'center';
        for (let i = 0; i < 3; i++) ctx.fillText('✂ plasmina', lx - 110 + i * 90, cy - luz - 30 - i * 10);
        ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '11.5px system-ui'; ctx.textAlign = 'left';
        ctx.fillText('coágulo retrai · tPA ativa plasmina → D-dímeros · vaso repara', L, cy + luz + 24);
      }

      /* cascata */
      const nos = [
        ['FT', 'fator tecidual', 110, VERM],
        ['Xa·Va', 'protrombinase', 260, AMAR],
        ['IIa', 'trombina', 410, VERDE],
        ['I → fibrina', 'malha estável', 560, AZUL],
        ['XIII', 'liga cruzadas', 710, ROXO]
      ];
      const ny = 300;
      nos.forEach(([nome, sub, x, cor], i) => {
        const aceso = etapa >= 3 && (t * 0.9 - i * 0.55) % 3.4 > 0 && (t * 0.9 - i * 0.55) % 3.4 < 1.6;
        roundRect(ctx, x - 62, ny, 124, 50, 10);
        ctx.fillStyle = etapa >= 3 && aceso ? cor : 'rgba(148,163,184,.18)';
        ctx.fill();
        ctx.strokeStyle = etapa >= 3 ? cor : 'rgba(148,163,184,.3)'; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.fillStyle = '#0b1020'; ctx.font = '700 13px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(nome, x, ny + 21);
        ctx.fillStyle = 'rgba(226,232,240,.7)'; ctx.font = '10px system-ui';
        ctx.fillText(sub, x, ny + 38);
        if (i < 4) {
          ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(x + 66, ny + 25); ctx.lineTo(x + 90, ny + 25); ctx.stroke();
        }
      });
      ctx.font = '10.5px system-ui'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(248,113,113,.85)';
      ctx.fillText('💊 varfarina ✂ vit-K (II·VII·IX·X)', 110, ny + 74);
      ctx.fillText('💊 heparina/NOACs ✂ IIa·Xa', 410, ny + 74);
      ctx.fillStyle = 'rgba(226,232,240,.4)'; ctx.font = '11.5px system-ui';
      if (etapa < 3) ctx.fillText('(a cascata acende na etapa 3 — avance com "Próxima etapa ▸")', W / 2, ny - 14);

      st.innerHTML = `<b style="color:${VERM}">■ ${ETAPAS[etapa].nome}</b> — ${ETAPAS[etapa].desc} <i>· etapa ${etapa + 1}/5 · clínica: TP = via extrínseca (varfarina), TTPa = intrínseca (heparina).</i>`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 13. CURVA DA OXIEMOGLOBINA                                      */
  /* ============================================================== */
  function oxi(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 450);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let pH = 7.4, T = 37, co2 = 40, dpg = 0, co = false;
    const defs = [
      ['pH (efeito Bohr)', 70, 76, 74, v => pH = v / 10, v => (v / 10).toFixed(2)],
      ['Temperatura (°C)', 33, 43, 37, v => T = v, v => v.toFixed(1)],
      ['PCO₂ (mmHg)', 20, 60, 40, v => co2 = v, v => v.toFixed(0)],
      ['2,3-DPG', -1, 1, 0, v => dpg = v, v => v > 0.3 ? 'alto' : v < -0.3 ? 'baixo' : 'normal']
    ];
    defs.forEach(([nome, mn, mx, ini, set, fmt]) => {
      const w = document.createElement('div'); w.className = 'slider-wrap';
      w.innerHTML = `<label>${nome}: <b>${fmt(ini)}</b></label>`;
      const inp = document.createElement('input');
      inp.type = 'range'; inp.min = mn; inp.max = mx; inp.step = 0.1; inp.value = ini;
      inp.addEventListener('input', () => { const v = parseFloat(inp.value); set(v); w.querySelector('b').textContent = fmt(v); });
      w.appendChild(inp); ctl.appendChild(w);
    });
    const btnCO = button(ctl, '☠️ CO (monóxido de carbono)', () => { co = !co; btnCO.textContent = co ? '✖ Sem CO' : '☠️ CO (monóxido de carbono)'; });

    function p50ef() {
      let p = 26.6;
      p *= Math.pow(10, 0.48 * (7.4 - pH));
      p *= 1 + 0.032 * (T - 37);
      p *= 1 + 0.004 * (co2 - 40);
      p *= 1 + 0.35 * dpg;
      if (co) p *= 0.32;
      return p;
    }
    const sat = (po2, p50) => { const n = 2.8; return 100 * Math.pow(po2, n) / (Math.pow(po2, n) + Math.pow(p50, n)); };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'CURVA DE DISSOCIAÇÃO DA OXIEMOGLOBINA — sigmoide por cooperatividade das 4 hemes', W);
      const gx = 96, gy = 48, gw = 660, gh = 300;
      const X = p => gx + (p / 110) * gw;
      const Y = s => gy + gh - (s / 100) * gh;
      eixo(ctx, gx, gy, gw, gh);
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('SO₂ (%)', gx - 70, gy + 10);
      ctx.fillText('PO₂ (mmHg)', gx + gw - 70, gy + gh + 34);
      for (let s = 0; s <= 100; s += 25) {
        ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.fillText(s + '', gx - 28, Y(s) + 4);
        ctx.strokeStyle = 'rgba(148,163,184,.1)';
        ctx.beginPath(); ctx.moveTo(gx, Y(s)); ctx.lineTo(gx + gw, Y(s)); ctx.stroke();
      }
      for (let p = 0; p <= 100; p += 20) {
        ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.fillText(p + '', X(p) - 8, gy + gh + 18);
        ctx.strokeStyle = 'rgba(148,163,184,.07)';
        ctx.beginPath(); ctx.moveTo(X(p), gy); ctx.lineTo(X(p), gy + gh); ctx.stroke();
      }
      /* zonas */
      ctx.fillStyle = 'rgba(96,165,250,.06)'; ctx.fillRect(gx, gy, X(40) - gx, gh);
      ctx.fillStyle = 'rgba(74,222,128,.06)'; ctx.fillRect(X(80), gy, gx + gw - X(80), gh);
      ctx.fillStyle = 'rgba(96,165,250,.8)'; ctx.font = '10.5px system-ui';
      ctx.fillText('ambiente tecidual (PO₂ 20–40)', gx + 8, gy + 16);
      ctx.fillStyle = 'rgba(74,222,128,.8)';
      ctx.fillText('alvéolo (PO₂ ~100)', X(80) + 8, gy + 16);

      const p50 = p50ef();
      function curva(cor, p, dash) {
        ctx.strokeStyle = cor; ctx.lineWidth = 2.6; ctx.setLineDash(dash || []);
        ctx.beginPath();
        for (let k = 0; k <= 105; k += 1) {
          const y = Y(sat(k, p));
          if (k === 0) ctx.moveTo(X(k), y); else ctx.lineTo(X(k), y);
        }
        ctx.stroke(); ctx.setLineDash([]);
      }
      curva('rgba(148,163,184,.35)', 26.6, [6, 6]);
      curva(co ? VERM : VERDE, p50);
      /* leituras */
      const s100 = sat(100, p50), s40 = sat(40, p50);
      [[100, s100, VERDE, 'pulmão'], [40, s40, AZUL, 'tecido']].forEach(([p, s, cor, nome]) => {
        ctx.strokeStyle = cor; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(X(p), gy + gh); ctx.lineTo(X(p), Y(s)); ctx.lineTo(gx, Y(s)); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = cor;
        ctx.beginPath(); ctx.arc(X(p), Y(s), 5, 0, Math.PI * 2); ctx.fill();
        ctx.font = '700 13px system-ui'; ctx.textAlign = p > 60 ? 'right' : 'left';
        ctx.fillText(s.toFixed(0) + '%', X(p) + (p > 60 ? -12 : 12), Y(s) - 8);
        ctx.font = '10.5px system-ui';
        ctx.fillText(nome + ' (PO₂ ' + p + ')', X(p) + (p > 60 ? -12 : 12), Y(s) + 8);
      });
      /* painel P50 */
      const px = 760;
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '600 11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('P₅₀ efetivo', px, gy + 16);
      ctx.fillStyle = '#fff'; ctx.font = '700 24px system-ui';
      ctx.fillText(p50.toFixed(1), px, gy + 44);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px system-ui';
      ctx.fillText('mmHg', px, gy + 62);
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '600 11px system-ui';
      ctx.fillText('entrega', px, gy + 96);
      ctx.fillStyle = '#fff'; ctx.font = '700 24px system-ui';
      ctx.fillText((s100 - s40).toFixed(0) + 'pp', px, gy + 124);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '10.5px system-ui';
      ctx.fillText('S(100) − S(40)', px, gy + 142);

      const dir = p50 > 31 ? 'DIREITA' : p50 < 22.5 ? 'ESQUERDA' : 'NORMAL';
      const corD = dir === 'DIREITA' ? VERDE : dir === 'ESQUERDA' ? AZUL : '#e2e8f0';
      let obs = ' Condições padrão: afinidade equilibrada — 97% no pulmão, ~75% no tecido venoso misto.';
      if (dir === 'DIREITA') obs = ' P₅₀ ↑ = MENOR afinidade: a Hb libera mais O₂ nos tecidos (exercício, fever, acidose — efeito Bohr).';
      if (dir === 'ESQUERDA') obs = ' P₅₀ ↓ = MAIOR afinidade: a Hb "abraça" o O₂ e libera menos (alcalose, hipotermia, HbF, armazenamento).';
      if (co) obs = ' CO ocupa ~metade das hemes e desloca o restante à esquerda: SpO₂ falsamente normal com transporte de O₂ muito reduzido — hipoxia celular.';

      st.innerHTML = `Curva <b style="color:${corD}">${dir}</b> · pulmão <b style="color:${VERDE}">${s100.toFixed(0)}%</b> · tecido <b style="color:${AZUL}">${s40.toFixed(0)}%</b>.${obs} <i>Experimente: pH 7,10 + T 41 °C (músculo em exercício).</i>`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 14. SINAPSE — passo a passo                                      */
  /* ============================================================== */
  function sinapse(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 470);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, etapa = 0, auto = false, acc = 0, inib = false;
    const ETAPAS = [
      { nome: 'Repouso', desc: () => 'Vesículas cheias de neurotransmissor ancoradas na zona ativa; membranas a −70 mV; fenda limpa.' },
      { nome: '1. PA chega ao terminal', desc: () => 'O potencial de ação invade o terminal pré-sináptico e despolariza a membrana.' },
      { nome: '2. Ca²⁺ entra', desc: () => 'Canais de Ca²⁺ voltagem-dependentes abrem — o influxo de Ca²⁺ é o <b>gatilho universal</b> da exocitose.' },
      { nome: '3. Exocitose', desc: () => 'Ca²⁺ liga a sinaptotagmina → complexo SNARE funde a vesícula → neurotransmissor na fenda (liberação QUANTAL: cada vesícula = 1 quantum).' },
      { nome: '4. Receptores ligados', desc: () => 'O transmissor liga receptores pós-sinápticos específicos (' + (inib ? 'GABA-A' : 'nicotínico/glutamatérgico') + ').' },
      { nome: '5. Canais pós abrem', desc: () => inib ? 'Canais de <b>Cl⁻</b> abrem: Cl⁻ ENTRA → hiperpolarização → <b>PIPS</b> (inibição).' : 'Canais catiônicos abrem: <b>Na⁺ entra</b> → despolarização local → <b>PEPS</b> (excitação).' },
      { nome: '6. Potencial pós-sináptico', desc: () => inib ? 'PIPS afasta do limiar — <b>inibição</b>. 💊 Benzodiazepínicos potencializam GABA-A (sedação, ansiólise).' : 'PEPS somam-se aos demais inputs; se cruzar −55 mV no cone de implantação → novo PA. 💊 SSRIs bloqueiam a recaptação de serotonina.' },
      { nome: '7. Encerramento', desc: () => 'Enzimas degradam (AChE) ou transportadores recaptam o transmissor — a fenda zera em milissegundos e fica pronta para o próximo disparo.' }
    ];
    const btnProx = button(ctl, 'Próxima etapa ▸', () => { etapa = Math.min(ETAPAS.length - 1, etapa + 1); auto = false; autoBtn.textContent = '▶ Automático'; });
    const autoBtn = button(ctl, '▶ Automático', () => { auto = !auto; autoBtn.textContent = auto ? '⏸ Pausar auto' : '▶ Automático'; });
    const btnTipo = button(ctl, '🔀 Excitatória (ACh)', () => { inib = !inib; btnTipo.textContent = inib ? '🔀 Inibitória (GABA)' : '🔀 Excitatória (ACh)'; });
    button(ctl, '↺ Reiniciar', () => { etapa = 0; auto = false; autoBtn.textContent = '▶ Automático'; });

    function draw(dt) {
      t += dt;
      if (auto) { acc += dt; if (acc > 3) { acc = 0; etapa = etapa >= ETAPAS.length - 1 ? 0 : etapa + 1; } }
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'SINAPSE QUÍMICA — transdução elétrica → química → elétrica, em 8 passos', W);

      const ty = 200;
      /* axônio */
      ctx.strokeStyle = 'rgba(167,139,250,.7)'; ctx.lineWidth = 9; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(30, ty); ctx.lineTo(220, ty); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('axônio (terminal do neurônio pré-sináptico)', 30, ty - 40);
      if (etapa === 1) {
        const px = 30 + ((t * 240) % 190);
        ctx.fillStyle = AMAR;
        ctx.beginPath(); ctx.arc(px, ty, 7, 0, Math.PI * 2); ctx.fill();
        ctx.font = '700 11px system-ui'; ctx.fillText('PA', px - 8, ty - 12);
      }
      /* terminal */
      ctx.fillStyle = 'rgba(167,139,250,.14)'; ctx.strokeStyle = 'rgba(167,139,250,.85)'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.ellipse(320, ty, 105, 92, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '10.5px system-ui';
      ctx.fillText('terminal pré-sináptico', 250, ty - 98);
      /* vesículas */
      [[290, ty - 28], [338, ty - 14], [296, ty + 26], [346, ty + 30]].forEach(([vx, vy]) => {
        ctx.strokeStyle = 'rgba(74,222,128,.85)'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.arc(vx, vy, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(74,222,128,.5)'; ctx.font = '7.5px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(inib ? 'GABA' : 'ACh', vx, vy + 3);
      });
      /* fenda */
      const fx = 448;
      ctx.strokeStyle = 'rgba(255,255,255,.15)';
      ctx.beginPath(); ctx.moveTo(fx, ty - 112); ctx.lineTo(fx, ty + 112); ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.5)'; ctx.font = '10.5px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('fenda sináptica (~20 nm)', fx, ty + 128);
      /* canais de Ca */
      if (etapa >= 2) {
        ctx.fillStyle = VERM;
        roundRect(ctx, 408, ty - 46, 14, 24, 4); ctx.fill();
        roundRect(ctx, 408, ty + 20, 14, 24, 4); ctx.fill();
        ctx.fillStyle = 'rgba(226,232,240,.75)'; ctx.font = '10px system-ui'; ctx.textAlign = 'right';
        ctx.fillText('Ca²⁺', 402, ty - 32);
        for (let i = 0; i < 3; i++) {
          const pr = (t * 1.5 + i * 0.33) % 1;
          ctx.fillStyle = VERM; ctx.beginPath();
          ctx.arc(422 - pr * 84, ty - 34 + i * 34, 3.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      /* exocitose + transmissor */
      if (etapa >= 3) {
        ctx.strokeStyle = 'rgba(74,222,128,.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(412, ty, 14, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 7; i++) {
          const pr = (t * 1.2 + i * 0.143) % 1;
          ctx.fillStyle = VERDE; ctx.beginPath();
          ctx.arc(fx + 2 + pr * 46, ty - 78 + ((i * 43) % 150), 3.2, 0, Math.PI * 2); ctx.fill();
        }
        if (etapa === 3) { ctx.fillStyle = VERDE; ctx.font = '10.5px system-ui'; ctx.textAlign = 'center'; ctx.fillText('exocitose!', 384, ty - 108); }
      }
      /* pós-sináptico */
      ctx.fillStyle = 'rgba(56,189,248,.10)'; ctx.strokeStyle = 'rgba(56,189,248,.85)'; ctx.lineWidth = 2.5;
      roundRect(ctx, 496, ty - 108, 250, 216, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(226,232,240,.6)'; ctx.font = '10.5px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('célula pós-sináptica', 508, ty - 116);
      const recs = [ty - 66, ty, ty + 66];
      recs.forEach((ry, i) => {
        const ligado = etapa >= 4 && i === 1;
        ctx.fillStyle = ligado ? VERDE : 'rgba(148,163,184,.4)';
        roundRect(ctx, 492, ry - 13, 22, 26, 6); ctx.fill();
        if (ligado) {
          ctx.fillStyle = 'rgba(74,222,128,.9)'; ctx.font = '9px system-ui'; ctx.textAlign = 'left';
          ctx.fillText('receptor', 520, ry - 16);
        }
        if (etapa >= 5 && i === 1) {
          const cor = inib ? AZUL : AMAR;
          ctx.fillStyle = cor; ctx.font = '700 10.5px system-ui';
          for (let k = 0; k < 2; k++) {
            const pr = (t * 1.7 + k * 0.5) % 1;
            ctx.fillText(inib ? 'Cl⁻ →' : 'Na⁺ →', 522 + pr * 60, ry + 4);
          }
        }
      });
      /* traçado */
      const gy = 350, gh = 76, gx = 120, gw = 640;
      eixo(ctx, gx, gy, gw, gh);
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '10.5px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('potencial pós-sináptico', gx + 6, gy - 6);
      const base = gy + gh * 0.62;
      ctx.strokeStyle = 'rgba(148,163,184,.25)';
      ctx.beginPath(); ctx.moveTo(gx, base); ctx.lineTo(gx + gw, base); ctx.stroke();
      ctx.fillStyle = 'rgba(250,204,21,.5)'; ctx.font = '9.5px system-ui';
      ctx.fillText('limiar', gx + gw - 40, base - 34);
      if (etapa >= 6) {
        const amp = inib ? -26 : 30;
        ctx.strokeStyle = inib ? AZUL : VERDE; ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let i = 0; i <= gw; i += 3) {
          const p = i / gw;
          const y = base - amp * Math.exp(-Math.pow((p - 0.35) / 0.2, 2));
          if (i === 0) ctx.moveTo(gx + i, y); else ctx.lineTo(gx + i, y);
        }
        ctx.stroke();
        if (!inib) {
          ctx.strokeStyle = 'rgba(250,204,21,.5)'; ctx.setLineDash([4, 4]);
          ctx.beginPath(); ctx.moveTo(gx, base - 34); ctx.lineTo(gx + gw, base - 34); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.fillStyle = inib ? AZUL : VERDE; ctx.font = '700 11.5px system-ui';
        ctx.fillText(inib ? 'PIPS — hiperpolariza (inibe)' : 'PEPS — despolariza (excita)', gx + gw - 235, inib ? base + 30 : base - 44);
      }
      const d = ETAPAS[etapa].desc();
      st.innerHTML = `<b style="color:${ROXO}">■ ${ETAPAS[etapa].nome}</b> — ${d} <i>· etapa ${etapa + 1}/8</i>`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 15. ESPIROMETRIA — volumes e capacidades por cenário            */
  /* ============================================================== */
  function volumes(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 440);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0;
    const CENARIOS = {
      normal: { v: [3000, 500, 1100, 1200], nome: 'Repouso normal', txt: 'Volumes de referência: VC 500, IRV 3000, ERV 1100, RV 1200 mL. TLC ≈ 5,8 L. A linha que "respira" percorre a VC.' },
      exercicio: { v: [900, 2700, 1300, 1200], nome: 'Exercício máximo', txt: 'O volume corrente se expande PARA DENTRO das reservas (VC 500→~2.700 mL); RV não muda — a respiração fica mais profunda, não mais "cheia de gás preso".' },
      restritivo: { v: [1500, 400, 700, 800], nome: 'Padrão restritivo', txt: 'Fibrose/restritivo: TODAS as capacidades encolhem (TLC < 80% do previsto) — CV e CPT reduzidas, RV proporcional. Espirometria: FEV1 e CV caem JUNTOS (FEV1/CV normal ou alto).' },
      obstrutivo: { v: [2000, 400, 600, 2800], nome: 'Padrão obstrutivo (DPOC)', txt: 'Broncoobstrução com AR PRESO: RV sobe muito (1.200→2.800 mL), FRC aumenta e o VR/TLC ↑. Espirometria: FEV1 cai MAIS que a CV → FEV1/CV < 0,70.' }
    };
    let cenario = 'normal';
    let cur = CENARIOS.normal.v.slice();
    const botoes = {};
    Object.keys(CENARIOS).forEach(k => {
      botoes[k] = button(ctl, CENARIOS[k].nome, () => { cenario = k; Object.values(botoes).forEach(b => b.classList.remove('ativo')); botoes[k].classList.add('ativo'); });
    });
    botoes.normal.classList.add('ativo');

    const CORES = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];
    const NOMES = ['IRV (reserva inspiratória)', 'VC (volume corrente)', 'ERV (reserva expiratória)', 'RV (residual)'];

    function draw(dt) {
      t += dt;
      const alvo = CENARIOS[cenario].v;
      for (let i = 0; i < 4; i++) cur[i] += (alvo[i] - cur[i]) * Math.min(1, dt * 2.2);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'ESPIROMETRIA — volumes e capacidades pulmonares por cenário', W);

      const gx = 110, gy = 56, gw = 330, gh = 320;
      const total = cur[0] + cur[1] + cur[2] + cur[3];
      const Y = ml => gy + gh - (ml / 6500) * gh;
      eixo(ctx, gx, gy, gw, gh);
      ctx.fillStyle = 'rgba(148,163,184,.75)'; ctx.font = '11px system-ui'; ctx.textAlign = 'right';
      for (let ml = 0; ml <= 6000; ml += 1000) ctx.fillText(ml, gx - 8, Y(ml) + 4);
      ctx.textAlign = 'center';
      ctx.fillText('mL', gx - 34, gy + 12);

      /* coluna empilhada */
      const bx = gx + 70, bw = 150;
      let acc = 0;
      for (let i = 0; i < 4; i++) {
        const y1 = Y(acc), y2 = Y(acc + cur[i]);
        ctx.fillStyle = CORES[i] + 'cc';
        ctx.fillRect(bx, y2, bw, y1 - y2);
        ctx.strokeStyle = '#0c1120'; ctx.lineWidth = 1.5;
        ctx.strokeRect(bx, y2, bw, y1 - y2);
        acc += cur[i];
      }
      /* respiração animada (linha que percorre a VC) */
      const base = cur[2] + cur[3];
      const osc = 0.5 - 0.5 * Math.cos(t * 2.2);
      const nivel = base + cur[1] * osc;
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.moveTo(gx + 4, Y(nivel)); ctx.lineTo(gx + gw - 4, Y(nivel)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff'; ctx.font = '700 11px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('respirando', gx + 6, Y(nivel) - 6);

      /* cotas de capacidade à direita da coluna */
      const caps = [
        ['VC', cur[1] + cur[2] + cur[0], '#22c55e'],
        ['CI', cur[0] + cur[1], '#0ea5e9'],
        ['CRF', cur[2] + cur[3], '#f59e0b'],
        ['CPT', total, '#e2e8f0']
      ];
      const cx2 = bx + bw + 26;
      ctx.font = '700 12px system-ui';
      caps.forEach(([nome, val], i) => {
        const y = Y(val);
        ctx.strokeStyle = 'rgba(226,232,240,.6)'; ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(bx + bw, y); ctx.lineTo(cx2 + 60, y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left';
        ctx.fillText(nome + ' ' + Math.round(val) + ' mL', cx2 + 8, y - 5);
      });

      /* legenda */
      const lx = 600, ly0 = 70;
      ctx.textAlign = 'left';
      NOMES.forEach((n, i) => {
        ctx.fillStyle = CORES[i];
        roundRect(ctx, lx, ly0 + i * 34, 18, 14, 4); ctx.fill();
        ctx.fillStyle = 'rgba(226,232,240,.9)'; ctx.font = '12.5px system-ui';
        ctx.fillText(n, lx + 28, ly0 + i * 34 + 12);
        ctx.fillStyle = '#fff'; ctx.font = '700 12px system-ui';
        ctx.fillText(Math.round(cur[i]) + ' mL', lx + 250, ly0 + i * 34 + 12);
      });
      /* resumo clínico */
      const fev1cv = cenario === 'obstrutivo' ? '< 0,70 ✓ diagnóstico' : cenario === 'restritivo' ? 'normal/alto (≥ 0,70)' : '~0,80 (normal)';
      ctx.fillStyle = 'rgba(226,232,240,.85)'; ctx.font = '600 12.5px system-ui';
      ctx.fillText('TCL (CPT): ' + Math.round(total) + ' mL', lx, ly0 + 4 * 34 + 10);
      ctx.fillText('FEV1/CV: ' + fev1cv, lx, ly0 + 4 * 34 + 32);

      st.innerHTML = `<b style="color:#5eead4">■ ${CENARIOS[cenario].nome}</b> — ${CENARIOS[cenario].txt}`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 16. EIXO HIPOTÁLAMO-HIPÓFISE — feedback na prática              */
  /* ============================================================== */
  function eixoendocrino(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 470);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, glandula = 1.0, tumor = false;
    let n1 = 0.5, n2 = 0.5, n3 = 0.5;
    const parts = [];

    const EIXOS = {
      tireoide: { nome: 'Eixo tireotrófico', hip: 'TRH', pit: 'TSH', alvo: 'Tireoide', fin: 'T₃/T₄', corr: '#0e7490', diag: ['hipotireoidismo PRIMÁRIO (falha na glândula)', 'eutiroidismo', 'hipertireoidismo PRIMÁRIO'] },
      adrenal: { nome: 'Eixo adrenocortical (HPA)', hip: 'CRH', pit: 'ACTH', alvo: 'Córtex adrenal', fin: 'Cortisol', corr: '#c2410c', diag: ['doença de Addison (insuf. primária)', 'função normal', 'síndrome de Cushing (excesso primário)'] },
      gonadal: { nome: 'Eixo gonadal', hip: 'GnRH', pit: 'LH / FSH', alvo: 'Gônadas', fin: 'Estradiol / Testosterona', corr: '#a21caf', diag: ['hipogonadismo primário (ex.: menopausa)', 'função normal', 'tumor autônomo da gônada'] }
    };
    let eixo = 'tireoide';
    const bx = {};
    Object.keys(EIXOS).forEach(k => {
      bx[k] = button(ctl, EIXOS[k].nome.split(' (')[0], () => { eixo = k; n1 = n2 = n3 = 0.5; tumor = false; tumorBtn.textContent = '🧬 Tumor autônomo da glândula'; Object.values(bx).forEach(b => b.classList.remove('ativo')); bx[k].classList.add('ativo'); });
    });
    bx.tireoide.classList.add('ativo');
    const tumorBtn = button(ctl, '🧬 Tumor autônomo da glândula', () => {
      tumor = !tumor;
      tumorBtn.textContent = tumor ? '✖ Sem tumor' : '🧬 Tumor autônomo da glândula';
    });
    const sl = document.createElement('div'); sl.className = 'slider-wrap';
    sl.innerHTML = '<label>Função da glândula alvo: <b>100%</b></label>';
    const input = document.createElement('input');
    input.type = 'range'; input.min = 5; input.max = 100; input.value = 100;
    input.addEventListener('input', () => { glandula = input.value / 100; sl.querySelector('b').textContent = input.value + '%'; });
    sl.appendChild(input); ctl.appendChild(sl);

    function draw(dt) {
      t += dt;
      const E = EIXOS[eixo];
      const prod = tumor ? 1.35 : glandula * 0.9;
      /* dinâmica com feedback negativo: hormônio final suprime hipotálamo e hipófise */
      n3 += (prod - n3) * Math.min(1, dt * 1.4);
      const alvoPit = Math.max(0.08, (1.05 - n3) * 1.15);
      n2 += (alvoPit - n2) * Math.min(1, dt * 1.4);
      n1 += (Math.max(0.08, (1.05 - n3) * 1.1) - n1) * Math.min(1, dt * 1.4);
      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'EIXO HIPOTÁLAMO–HIPÓFISE–GLÂNDULA — o feedback negativo ao vivo', W);

      const cx = 300;
      function caixa(x, y, w, h, titulo2, sub, nivel, cor) {
        roundRect(ctx, x, y, w, h, 12);
        ctx.fillStyle = 'rgba(226,232,240,.07)'; ctx.fill();
        ctx.strokeStyle = cor; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = '700 14px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(titulo2, x + w / 2, y + 24);
        ctx.fillStyle = 'rgba(148,163,184,.9)'; ctx.font = '11.5px system-ui';
        ctx.fillText(sub, x + w / 2, y + 42);
        /* medidor */
        ctx.fillStyle = 'rgba(148,163,184,.2)';
        roundRect(ctx, x + 16, y + h - 20, w - 32, 8, 4); ctx.fill();
        ctx.fillStyle = cor;
        roundRect(ctx, x + 16, y + h - 20, Math.max(4, (w - 32) * Math.min(1, nivel)), 8, 4); ctx.fill();
      }
      caixa(cx - 110, 50, 220, 74, 'HIPOTÁLAMO', E.hip, n1 * 1.6, '#f472b6');
      caixa(cx - 110, 170, 220, 74, 'HIPÓFISE', E.pit, n2 * 1.6, '#facc15');
      caixa(cx - 110, 290, 220, 74, E.alvo.toUpperCase(), E.fin, n3, E.corr);
      /* setas do eixo */
      function seta(x, y1, y2, cor, fluxo) {
        ctx.strokeStyle = cor; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
        ctx.fillStyle = cor;
        ctx.beginPath(); ctx.moveTo(x, y2); ctx.lineTo(x - 6, y2 - 9); ctx.lineTo(x + 6, y2 - 9); ctx.closePath(); ctx.fill();
        if (fluxo > 0.3) {
          const py = y1 + ((t * 60) % (y2 - y1));
          ctx.beginPath(); ctx.arc(x, py, 4, 0, Math.PI * 2); ctx.fill();
        }
      }
      seta(cx, 124, 170, '#facc15', n1);
      seta(cx, 244, 290, E.corr, n2);
      /* feedback (linha de volta da glândula ao hipotálamo) */
      ctx.strokeStyle = 'rgba(74,222,128,.7)'; ctx.lineWidth = 2.4; ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(cx + 110, 327); ctx.lineTo(cx + 190, 327); ctx.lineTo(cx + 190, 87); ctx.lineTo(cx + 110, 87);
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(74,222,128,.9)'; ctx.font = '600 11px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('feedback negativo (' + E.fin + ' suprime)', cx + 190, 60);

      /* painel de leitura */
      const px = 620;
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '600 12px system-ui';
      ctx.fillText('Exame laboratorial simulado', px, 60);
      const linhas = [
        [E.hip + ' (hipotálamo)', n1, '#f472b6'],
        [E.pit + ' (hipófise)', n2, '#facc15'],
        [E.fin, n3, E.corr]
      ];
      linhas.forEach(([nome, val, cor], i) => {
        const y = 92 + i * 74;
        ctx.fillStyle = '#fff'; ctx.font = '700 14.5px system-ui';
        ctx.fillText(val < 0.3 ? '↓ BAIXO' : val > 0.75 ? '↑ ALTO' : 'normal', px, y + 6);
        ctx.fillStyle = 'rgba(226,232,240,.85)'; ctx.font = '12px system-ui';
        ctx.fillText(nome, px, y - 16);
        ctx.fillStyle = 'rgba(148,163,184,.2)';
        roundRect(ctx, px, y + 16, 200, 10, 5); ctx.fill();
        ctx.fillStyle = cor;
        roundRect(ctx, px, y + 16, Math.max(5, 200 * Math.min(1.05, val)), 10, 5); ctx.fill();
      });
      const diag = n3 < 0.35 ? E.diag[0] : n3 > 0.8 ? E.diag[2] : E.diag[1];
      ctx.fillStyle = n3 < 0.35 || n3 > 0.8 ? '#f87171' : '#4ade80';
      ctx.font = '700 13px system-ui';
      ctx.fillText('Diagnóstico: ' + diag, 60, 420);

      st.innerHTML = `<b style="color:${E.corr}">■ ${E.nome}</b> — baixe a <b>função da glândula</b> e veja o feedback: ${E.fin} cai → ${E.pit} e ${E.hip} SOBEM (estímulo máximo). É o padrão "primário": <b>${E.pit} alta + hormônio final baixo</b>. Tumor autônomo → o contrário. <i>(Na clínica: TSH é o melhor rastreio da tireoide por exatamente esse motivo.)</i>`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ============================================================== */
  /* 17. VILLOSIDADE INTESTINAL — absorção dos nutrientes            */
  /* ============================================================== */
  function vilosidade(container) {
    const { canvas, ctx, W, H } = makeCanvas(880, 460);
    container.appendChild(canvas);
    const st = status(container);
    const ctl = controls(container);
    let t = 0, modo = 'normal', alturaV = 1, noSangue = 0, naLinfa = 0;
    const parts = [];
    button(ctl, '🍽 Refeição mista', () => { modo = 'normal'; });
    button(ctl, '🥑 Rica em gorduras', () => { modo = 'gordura'; });
    button(ctl, '📉 Má absorção (celíaca)', () => { modo = 'celiaca'; });

    function spawn() {
      const r = Math.random();
      const ty = modo === 'gordura' ? (r < 0.7 ? 'fat' : r < 0.85 ? 'glc' : 'aa')
        : (r < 0.45 ? 'glc' : r < 0.8 ? 'aa' : 'fat');
      parts.push({ x: 40 + Math.random() * 60, y: 140 + Math.random() * 200, ty, fase: 0, v: 40 + Math.random() * 30 });
    }

    function draw(dt) {
      t += dt;
      const alvoAlt = modo === 'celiaca' ? 0.42 : 1;
      alturaV += (alvoAlt - alturaV) * Math.min(1, dt * 1.2);
      const taxa = modo === 'celiaca' ? dt * 1.2 : modo === 'gordura' ? dt * 3.2 : dt * 2.6;
      if (Math.random() < taxa) spawn();

      ctx.clearRect(0, 0, W, H);
      titulo(ctx, 'ABSORÇÃO INTESTINAL — da vilosidade ao sangue (porta) e à linfa (lacteal)', W);

      /* lúmen */
      ctx.fillStyle = 'rgba(250,204,21,.06)';
      ctx.fillRect(0, 60, 150, 340);
      ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('lúmen (quimo)', 18, 78);

      /* vilosidades */
      const bases = [230, 330, 430, 530];
      const vTopBase = 110, vBot = 400, vH = (vBot - vTopBase) * alturaV;
      bases.forEach((vx, i) => {
        const vh = vH * (0.85 + 0.15 * Math.sin(i * 1.7));
        /* corpo da vilosidade */
        roundRect(ctx, vx - 34, vBot - vh, 68, vh + 20, 30);
        ctx.fillStyle = 'rgba(244,114,182,.10)'; ctx.fill();
        ctx.strokeStyle = 'rgba(244,114,182,.7)'; ctx.lineWidth = 2; ctx.stroke();
        /* borda em escova */
        ctx.strokeStyle = 'rgba(244,114,182,.5)'; ctx.lineWidth = 1;
        for (let yy = vBot - vh + 16; yy < vBot; yy += 8) {
          ctx.beginPath(); ctx.moveTo(vx - 34, yy); ctx.lineTo(vx - 42, yy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(vx + 34, yy); ctx.lineTo(vx + 42, yy); ctx.stroke();
        }
        /* capilar central (vermelho) */
        ctx.strokeStyle = 'rgba(239,68,68,.8)'; ctx.lineWidth = 7; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(vx, vBot + 8); ctx.lineTo(vx, vBot - vh + 26); ctx.stroke();
        /* lacteal (verde) */
        ctx.strokeStyle = 'rgba(74,222,128,.7)'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(vx + 12, vBot + 8); ctx.lineTo(vx + 12, vBot - vh + 34); ctx.stroke();
      });

      /* coletores */
      ctx.strokeStyle = 'rgba(239,68,68,.9)'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(200, 420); ctx.lineTo(760, 420); ctx.stroke();
      ctx.fillStyle = '#f87171'; ctx.font = '600 12px system-ui'; ctx.textAlign = 'left';
      ctx.fillText('→ veia porta (sangue)', 640, 446);
      ctx.strokeStyle = 'rgba(74,222,128,.85)'; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(200, 444); ctx.lineTo(760, 444); ctx.stroke();
      ctx.fillStyle = '#4ade80';
      ctx.fillText('→ linfa (quilomícrons)', 640, 418);

      /* partículas */
      const absorve = modo === 'celiaca' ? 0.15 : 1;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.fase += dt * (p.v / 100);
        const cor = p.ty === 'glc' ? '#4ade80' : p.ty === 'aa' ? '#60a5fa' : '#fbbf24';
        const ico = p.ty === 'glc' ? 'G' : p.ty === 'aa' ? 'A' : 'F';
        let x = p.x + p.fase * 150, y = p.y;
        const vilX = bases.find(v => Math.abs(x - v) < 40);
        if (vilX && p.fase > 0.55) {
          /* dentro da vilosidade: sobe (sangue) ou desce p/ lacteal */
          if (p.ty === 'fat') x = vilX + 12;
          else x = vilX;
          y -= dt * 120;
          if (y < 40) {
            if (p.ty === 'fat') naLinfa += Math.random() < absorve ? 1 : 0;
            else noSangue += Math.random() < absorve ? 1 : 0;
            parts.splice(i, 1); continue;
          }
        } else if (x > 640) { parts.splice(i, 1); continue; }
        ctx.fillStyle = cor; ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(ico, x, y + 4);
      }

      /* contadores */
      ctx.textAlign = 'left';
      ctx.fillStyle = '#4ade80'; ctx.font = '700 14px system-ui';
      ctx.fillText('no sangue: ' + noSangue, 700, 90);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('na linfa: ' + naLinfa, 700, 116);

      const MODO_TXT = {
        normal: 'Refeição mista: <b>glicose (G)</b> e <b>aminoácidos (A)</b> vão ao <b>sangue porta</b> (SGLT1/GLUT2 → capilar); <b>gorduras (F)</b> viram quilomícrons e vão ao <b>lacteal → linfa</b>.',
        gordura: 'Dieta rica em gorduras: a maioria segue o caminho linfático — a absorção de lipídios é MAIS LENTA e via quilomícrons (por isso a gordura não "suja" o sangue da veia porta logo após a refeição).',
        celiaca: 'Doença celíaca (glúten): vilosidades ACHATADAS e borda em escova destruída → <b>má absorção</b> de tudo (contadores quase param) — diarreia, perda de peso e deficiências.'
      };
      st.innerHTML = `${MODO_TXT[modo]} <i>Área de absorção = vilosidades × microvilosidades ≈ 200–250 m².</i>`;
    }
    const stop = iniciarLoop(st, draw);
    return { destroy: stop };
  }

  /* ---------------- registro ---------------- */
  return {
    coracao, respiracao, potencial, sarcomero, nefron, glicemia, peristalse,
    inflamacao, compartimentos, feedback, transporte, coagulacao, oxi, sinapse,
    volumes, eixoendocrino, vilosidade
  };
})();
