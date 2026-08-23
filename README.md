# 🫀 Fisiologia Interativa (PT-BR)

Plataforma de estudo de **fisiologia humana universitária** em português, na ordem da ementa do
curso, com conteúdo original alinhado a **Vander, Guyton & Hall, Ganong, Berne & Levy e Furtado**.

## Destaques

- **38 ilustrações anatômicas gratuitas** do **Wikimedia Commons** (pranchas clássicas do Gray's
  Anatomy e diagramas NIH) acompanhando a leitura de todos os tópicos sem animação — cada uma com
  legenda e crédito/licença. O catálogo é gerado e **verificado automaticamente** pelos scripts em
  `tools/` (busca na API do Commons + checagem de conteúdo por descrição).
- **17 animações interativas** em canvas estilo "instrumento de laboratório": Wiggers do ciclo
  cardíaco, potencial de ação, sinapse, espirometria por cenários (normal/exercício/restritivo/
  obstrutivo), eixo hipotálamo-hipófise com feedback ao vivo, vilosidade intestinal com absorção,
  curva da oxiemoglobina, hemostasia guiada, transporte membranar (5 modos), feedback negativo,
  néfron, glicemia, sarcômero, peristaltismo, inflamação e osmose.
- **Tema acadêmico claro** com **ícones SVG anatômicos** próprios (nada de emojis genéricos).
- **Página inicial completa**: mapa do corpo interativo, **guia de estudo 1→11** (começo → fim),
  estatísticas e **painel de desempenho com conceitos A–D**.
- **89 questões de nível universitário** com **22 casos clínicos** em vinheta e questões "nível de
  livro" (Nernst, Winter, gradiente A-a…). Módulo certificado (✓) = tópicos lidos + quiz ≥ 70%.
- **17 aprofundamentos "nível de livro"** (equações, números e capítulos de referência).
- **Tutor IA gratuito** (Puter.js, sem chave de API) contextualizado no tópico aberto.
- **Busca global** (tecla `/`) indexando os 75 tópicos.

## Trilha (ordem da ementa)

Introdução → Fisiologia Celular → Nervoso → Muscular → Endócrino → Digestório → Circulatório →
Respiratório → Urinário → Imunológico → Fluidos e Eletrólitos — **11 módulos · 75 tópicos ·
17 animações · 38 ilustrações · 89 questões**.

## Qualidade / testes

`node test_headless.js` roda a **suíte de regressão headless** (jsdom): valida home, guia,
mapa, os 17 interativos (inclusive os tours guiados), quizzes com casos clínicos, notas,
busca, aprofundamentos e a renderização das figuras — **34 verificações**. Requer `npm i`
(jsdom). As imagens podem ser regeradas/curadas com os scripts de `tools/`.

## Como usar

Abra `index.html` com duplo clique (funciona offline; as ilustrações carregam da internet) ou
hospede grátis (GitHub Pages / Netlify Drop). Opcional: ⚙ no chat para usar chave própria de IA
(Groq/OpenRouter/OpenAI).

## Avisos

Conteúdo **original** (não copia obras protegidas) — nível graduação, para estudo; não substitui
livros-texto nem orientação médica.
