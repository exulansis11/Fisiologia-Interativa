# 🚀 Como publicar o Fisiologia Interativa (deploy)

O site é **100% estático** (HTML + CSS + JS puro, sem build, sem servidor). Qualquer
hospedagem de arquivos estáticos serve — e todas as opções abaixo têm plano gratuito.

## O que vai para o ar (conteúdo do ZIP)

```
index.html      → a página única do aplicativo
css/style.css   → estilos (tema acadêmico)
js/             → data, ícones, imagens, animações, IA e o app
```

> Não são necessários: `node_modules`, `package.json`, `test_headless.js`, `tools/`
> (são só para rodar os testes automatizados localmente, com `npm i && node test_headless.js`).

---

## Opção 1 — Netlify Drop (a mais fácil, 2 minutos, sem conta de git)

1. Acesse **https://app.netlify.com/drop**
2. Arraste a pasta descompactada `fisiologia-interativa` (ou o ZIP) para a área indicada.
3. Pronto: você recebe uma URL `https://algo.netlify.app` já funcionando.
   - Para renomear: *Site settings → Change site name* (ex.: `fisiologia-seunome.netlify.app`).
   - Para atualizar depois: arraste a pasta de novo na mesma página do site (deploy novo).

## Opção 2 — GitHub Pages (grátis, com versionamento pelo git)

1. Crie uma conta em https://github.com e um repositório novo, ex.: `fisiologia-interativa` (público).
2. Suba os arquivos do site (interface web: *uploading an existing file* — arraste
   `index.html`, `css/` e `js/`; ou via git):
   ```
   git init
   git add index.html css js
   git commit -m "Fisiologia Interativa"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/fisiologia-interativa.git
   git push -u origin main
   ```
3. No repositório: **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save**.
4. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/fisiologia-interativa/`.

## Opção 3 — Vercel

1. Acesse https://vercel.com/new (login com GitHub ou e-mail).
2. Importe o repositório (da opção 2) ou use a CLI: `npx vercel` dentro da pasta.
3. Não configure nada (framework: *Other/Static*) → Deploy.

## Opção 4 — Cloudflare Pages

1. https://dash.cloudflare.com → Workers & Pages → Create → Pages → *Upload assets*
   (arraste a pasta) ou conecte o repositório do GitHub.
2. Framework preset: **None** (static). Deploy.

---

## Checklist pós-deploy (30 segundos)

- [ ] A home abre com o mapa do corpo e o guia de estudo 1→11;
- [ ] Abra "Ciclo cardíaco" → animação do Wiggers roda e o botão **Tour das fases** funciona;
- [ ] Abra um tópico com ilustração (ex.: SNC, no Sistema Nervoso) → a imagem do
      Wikimedia Commons carrega (requer internet);
- [ ] Clique em **Tutor IA** → o chat abre (na 1ª pergunta o Puter pede um login gratuito);
- [ ] Responda um quiz até o fim → conceito A–D aparece e fica salvo no navegador.

## Observações

- **Progresso e notas** ficam no `localStorage` do navegador de cada visitante
  (não há backend; limpar dados do navegador zera o progresso).
- **Tutor IA**: usa o Puter.js (gratuito, sem chave). Se preferir sua própria chave
  (Groq/OpenAI/OpenRouter), o ícone ⚙ do chat aceita endpoint compatível com OpenAI.
- **Imagens**: servidas pelo CDN do Wikimedia Commons (licenças livres; crédito no rodapé
  de cada figura). Se algum dia quiser 100% independente, baixe-as para uma pasta
  `img/` e troque as URLs em `js/imagens.js`.
- Atualizações: qualquer mudança nos arquivos `js/*.js`/`css` deve bumpar o `?v=` no
  `index.html` (evita cache antigo nos visitantes).

Boa aula! 🫀
