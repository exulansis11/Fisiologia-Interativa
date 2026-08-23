/* ============================================================
   FISIOLOGIA INTERATIVA — Ilustrações SVG anatômicas
   Ícones de linha (estilo prancheta médica) por sistema +
   silhueta corporal interativa para a página inicial.
   Uso: window.SysIcon(id) → string SVG; herda a cor via
   currentColor (defina color no elemento pai).
   ============================================================ */

window.SYS_COLORS = {
  introducao: '#b45309',
  celular: '#4f46e5',
  nervoso: '#7c3aed',
  muscular: '#c2410c',
  endocrino: '#0e7490',
  digestorio: '#4d7c0f',
  cardiovascular: '#dc2626',
  respiratorio: '#0369a1',
  urinario: '#ea580c',
  imunologico: '#047857',
  fluidos: '#1d4ed8'
};

(function () {
  'use strict';
  const S = 'stroke="currentColor" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';

  const PATHS = {
    /* coração anatômico com aorta e tratos de saída */
    cardiovascular: `
      <path d="M25 18c-1-6 2-10 7-10h3" ${S}/>
      <path d="M42 17c3-3 8-3 11 0" ${S}/>
      <path d="M32 54C22 46 11 40 11 28c0-6 4-11 10-11 5 0 8 3 11 7 3-4 6-7 11-7 6 0 10 5 10 11 0 12-11 18-21 26z" ${S}/>
      <path d="M32 24v14" stroke="currentColor" fill="none" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M26 33h12" stroke="currentColor" fill="none" stroke-width="2.4" stroke-linecap="round"/>`,
    /* pulmões + traqueia + brônquios */
    respiratorio: `
      <path d="M32 8v12" ${S}/>
      <path d="M32 20l-8 7M32 20l8 7" ${S}/>
      <path d="M24 27c-8 0-13 6-13 16 0 6 2 12 8 12 4 0 8-3 8-8V33" ${S}/>
      <path d="M40 27c8 0 13 6 13 16 0 6-2 12-8 12-4 0-8-3-8-8V33" ${S}/>`,
    /* encéfalo em perfil com giros */
    nervoso: `
      <path d="M30 12c-3-3-8-4-12-2s-6 6-4 10c-3 2-4 6-2 9s5 4 8 3c0 4 3 8 8 8 2 0 3-1 3-2V12z" ${S}/>
      <path d="M34 12c3-3 8-4 12-2s6 6 4 10c3 2 4 6 2 9s-5 4-8 3c0 4-3 8-8 8-2 0-3-1-3-2V12z" ${S}/>
      <path d="M32 12v38" ${S}/>
      <path d="M20 22c2-1 4 0 5 2M44 22c-2-1-4 0-5 2" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 34c2 1 5 1 7-1M42 34c-2 1-5 1-7-1" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>`,
    /* feixe muscular fusiforme com fibras e tendões */
    muscular: `
      <path d="M7 38h6M51 38h6" ${S}/>
      <path d="M13 38c6-13 32-13 38 0-6 13-32 13-38 0z" ${S}/>
      <path d="M22 31c4 5 4 11 0 16M42 31c-4 5-4 11 0 16" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M32 26.5v23" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round"/>`,
    /* rim em perfil com ureter */
    urinario: `
      <path d="M44 11c-11 0-20 10-20 22s9 22 20 22c5 0 9-2 11-5-8-5-13-11-13-17s5-12 13-17c-2-3-6-5-11-5z" ${S}/>
      <path d="M41 54c0 3 3 5 6 5" ${S}/>
      <circle cx="27" cy="20" r="3.5" ${S}/>`,
    /* tireoide (borboleta) com ondas de sinal hormonal */
    endocrino: `
      <path d="M32 25c-3-5-9-8-15-6-3 7-3 16 1 23 6 2 12 0 14-6 2 6 8 8 14 6 4-7 4-16 1-23-6-2-12 1-15 6z" ${S}/>
      <path d="M24 52c2 2 5 2 7 0M33 52c2 2 5 2 7 0" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round"/>`,
    /* estômago em J + alça intestinal */
    digestorio: `
      <path d="M22 8v6c0 8 5 15 14 15 8 0 14 5 14 12 0 6-5 11-11 11-5 0-9-3-10-8" ${S}/>
      <path d="M18 40c-5 3-7 9-3 14 4 5 11 5 15 1" ${S}/>
      <path d="M30 55h16c5 0 8-4 6-9" ${S}/>`,
    /* anticorpo IgG em Y */
    imunologico: `
      <path d="M32 56V35" ${S}/>
      <path d="M32 35L20 23M32 35l12-12" ${S}/>
      <path d="M20 23V11M44 23V11" ${S}/>
      <path d="M20 18l-4-4M44 18l4-4" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round"/>`,
    /* gota (água) com íons */
    fluidos: `
      <path d="M32 7C24 20 18 28 18 36a14 14 0 0 0 28 0c0-8-6-16-14-29z" ${S}/>
      <path d="M24 37a8 8 0 0 0 8 8" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="17" cy="52" r="1.6" fill="currentColor"/><circle cx="47" cy="52" r="1.6" fill="currentColor"/>`,
    /* silhueta humana (introdução) */
    introducao: `
      <circle cx="32" cy="12" r="6" ${S}/>
      <path d="M32 20c-9 0-14 6-14 14v6c0 9 3 17 5 22M32 20c9 0 14 6 14 14v6c0 9-3 17-5 22" ${S}/>
      <path d="M18 26l-4 14M46 26l4 14" ${S}/>`,
    /* célula com núcleo e organelas */
    celular: `
      <circle cx="32" cy="32" r="23" ${S}/>
      <circle cx="32" cy="30" r="9" ${S}/>
      <ellipse cx="22" cy="42" rx="5" ry="3" ${S}/>
      <circle cx="44" cy="42" r="1.6" fill="currentColor"/>
      <circle cx="48" cy="24" r="1.6" fill="currentColor"/>`
  };

  window.SysIcon = function (sysId, size) {
    const s = size || 26;
    const p = PATHS[sysId];
    if (!p) return '';
    return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" style="flex:none">${p}</svg>`;
  };

  /* ---------- silhueta corporal interativa (home) ---------- */
  window.BodyMapSVG = function () {
    const hotspots = [
      { sid: 'nervoso', x: 130, y: 34, n: 3 },
      { sid: 'endocrino', x: 130, y: 74, n: 5 },
      { sid: 'respiratorio', x: 130, y: 112, n: 8 },
      { sid: 'cardiovascular', x: 108, y: 146, n: 7 },
      { sid: 'muscular', x: 72, y: 156, n: 4 },
      { sid: 'urinario', x: 152, y: 178, n: 9 },
      { sid: 'digestorio', x: 130, y: 200, n: 6 }
    ];
    const hs = hotspots.map(h => `
      <g class="hotspot" data-sid="${h.sid}" tabindex="0" role="link" aria-label="Abrir módulo">
        <circle cx="${h.x}" cy="${h.y}" r="15" fill="${window.SYS_COLORS[h.sid]}" opacity=".14">
          <animate attributeName="r" values="13;19;13" dur="2.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${h.x}" cy="${h.y}" r="10.5" fill="${window.SYS_COLORS[h.sid]}"/>
        <text x="${h.x}" y="${h.y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="system-ui">${h.n}</text>
      </g>`).join('');

    return `
    <svg viewBox="0 0 260 500" class="bodymap" role="img" aria-label="Mapa do corpo com os sistemas">
      <g stroke="#33415580" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="130" cy="34" r="21"/>
        <path d="M130 55v14"/>
        <path d="M96 76q34-18 68 0l5 128q-4 26-9 40h-60q-5-14-9-40z" fill="#f8fafc"/>
        <path d="M99 80 66 190"/>
        <path d="M161 80l33 110"/>
        <circle cx="66" cy="198" r="7"/>
        <circle cx="194" cy="198" r="7"/>
        <path d="M110 244l-6 92"/>
        <path d="M150 244l6 92"/>
        <path d="M104 336l-3 76"/>
        <path d="M156 336l3 76"/>
        <path d="M104 412h-22M156 412h22" stroke-width="4.5"/>
      </g>
      ${hs}
    </svg>`;
  };
})();
