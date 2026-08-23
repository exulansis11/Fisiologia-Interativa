/* ============================================================
   FISIOLOGIA INTERATIVA — Conteúdo educacional (PT-BR)
   Conteúdo original cobrindo os módulos clássicos de fisiologia.
   Formato do texto: parágrafos separados por linha vazia,
   listas com "- ", subtítulos com "## ", negrito com **termo**.
   ============================================================ */

window.FISIO = { sistemas: [

/* ===================== INTRODUÇÃO À FISIOLOGIA ===================== */
{
  id: 'introducao',
  nome: 'Introdução à Fisiologia',
  emoji: '🧭',
  cor: '#fbbf24',
  resumo: 'Homeostase, feedback negativo, líquidos corporais e como estudar fisiologia.',
  topicos: [
    {
      id: 'o-que-e',
      titulo: 'O que é fisiologia?',
      texto: `**Fisiologia** é o estudo do **funcionamento** do corpo vivo — como células, tecidos, órgãos e sistemas trabalham juntos para manter a vida. Onde a anatomia pergunta "como é feito?", a fisiologia pergunta **"como funciona?"** — e as duas são inseparáveis: a estrutura explica a função (o alvéolo é fino porque precisa difundir gases; o miocárdio esquerdo é grosso porque bombeia para todo o corpo).

## Níveis de organização
- **Químico → celular → tecido → órgão → sistema → organismo**, todos integrados.
- A **função integrada** é o coração da fisiologia: nenhum sistema trabalha sozinho (no exercício, coração, pulmões, músculos, SNA e hormônios agem juntos).

## O grande tema: homeostase
O ambiente **interno** (líquido extracelular que banha as células — Claude Bernard chamou de *milieu intérieur*) precisa permanecer quase constante: temperatura, pH, glicemia, osmolaridade, pressão... Walter Cannon cunhou o termo **homeostase** para o conjunto de processos que mantêm essas variáveis dentro de faixas estreitas.

**Por que isso importa para você:** a doença é, quase sempre, **fisiologia desregulada** — entender o normal é entender o que quebrou no diabetes, na hipertensão ou na insuficiência cardíaca. Este site segue a ordem clássica da ementa: introdução → célula → nervoso → músculo → endócrino → digestório → circulatório → respiratório → urinário (e ainda imunológico e fluidos/eletrólitos).`
    },
    {
      id: 'homeostase-feedback',
      titulo: 'Homeostase e mecanismos de feedback',
      texto: `Todo controle homeostático tem os mesmos componentes — memorize este "circuito":

## Componentes do circuito de controle
1. **Variável controlada** — o que é mantido estável (temperatura, glicemia, PA…).
2. **Sensor (receptor)** — mede a variável (termorreceptores, barorreceptores, quimiorreceptores).
3. **Centro integrador** — compara o valor medido com o **set point** (grande parte no hipotálamo e bulbo) e decide a resposta.
4. **Efetor** — músculo, glândula ou órgão que executa a correção.

## Tipos de feedback
- **Negativo (o mais comum)**: a resposta **reduz** o estímulo inicial e devolve a variável ao set point — termostato do corpo, barorreflexo, eixos hormonais (TSH–T4, insulina–glicemia). É **estabilizador**.
- **Positivo (raríssimo e autocatalítico)**: a resposta **amplifica** o estímulo, até um evento final: potencial de ação, **parto** (ocitocina), **coagulação**, esvaziamento gástrico. Instável por natureza — precisa ser encerrado.
- **Feedforward (antecipatório)**: o corpo responde **antes** da mudança da variável — salivar ao ver comida, aumentar a ventilação no início do exercício, o hipotálamo "prevê" o dia (ritmo circadiano).

Explore a simulação abaixo — aplique frio ou calor e veja o circuito completo agir, ou siga o **modo guiado**, etapa por etapa.`,
      interativo: 'feedback',
      avancado: `## Nível de livro
- O **ganho de um sistema de controle** quantifica sua eficiência: ganho = correção necessária ÷ correção que o sistema realmente entrega. Sistemas de alto ganho (termorregulação, glicemia) mantêm a variável em faixas estreitas (±0,5 °C; ±10–20 mg/dL).
- A **resposta proporcional**: quanto maior o erro (T° − set point), maior a resposta efetora — sem erro, não há resposta sustentada. Isso explica por que a T° "oscila" em torno do alvo em vez de fixar-se nele.
- **Set point não é imutável**: febre = hipotálamo com set point elevado por PGE₂ (pirógenos IL-1, IL-6, TNF); por isso no resfriado você tremula mesmo com 38 °C. Hipertermia maligna e golpe de calor são falha da dissipação, não set point alterado.
- Glossário quantitativo: variação de ±1% da osmolaridade plasmática já estimula ADH; barorreceptores detectam desvios ≥ 5–10 mmHg.

📖 *Vander, Fisiologia Humana — cap. 1 (Homeostase); Guyton & Hall — cap. 1 (Introdução à homeostase); Ganong — caps. iniciais de revisão.*`
    },
    {
      id: 'liquidos',
      titulo: 'Líquidos corporais: o "mar interno"',
      texto: `A água é o solvente da vida: **50–60% da massa corporal** (~42 L num adulto de 70 kg; menor na mulher e no obeso, maior na criança).

## Compartimentos
- **Líquido intracelular (LIC)**: ~2/3 (~28 L), rico em **K⁺**, Mg²⁺ e fosfato/proteínas.
- **Líquido extracelular (LEC)**: ~1/3 (~14 L), dominado pelo **Na⁺** e Cl⁻ — divide-se em **plasma** (~3 L, nos vasos) e **líquido interstício** (~11 L, entre as células).

A **osmolaridade** (≈ 280–296 mOsm/kg) é igual nos dois compartimentos, porque a água atravessa livremente as membranas: o que muda a água muda o volume das células. A bomba Na⁺/K⁺ mantém a assimetria de íons — é o alicerce do potencial de membrana e de quase todo transporte (veja o módulo **Fisiologia Celular** e, para clínica, **Fluidos e Eletrólitos**).

Regra prática de exames: o plasma é a "janela" do LEC — sódio, cloreto e bicarbonato medidos no soro refletem o compartimento extracelular.`,
      avancado: `## Nível de livro
- **Medição dos compartimentos**: LEC pelo espaço de distribuição da inulina (não entra nas células); água total pela água tritiada ou antipirina; LIC = água total − LEC; plasma pelo azul de Evans (albumina marcada); volume sanguíneo = plasma × 1/(1 − hematócrito).
- **Osmolaridade plasmática calculada**: Osm ≈ 2×[Na⁺] + glicemia/18 + ureia/2,8 (mg/dL) ≈ 2×140 + 100/18 + 30/2,8 ≈ **291 mOsm/L**. Gap osmolar = osmolaridade medida − calculada > 10 sugere osmois tóxicos (etanol, metanol, manitol).
- **Efeito Donnan**: proteínas plasmáticas aniônicas geram pequena diferença de íons entre plasma e interstício (Cl⁻ discretamente maior no interstício) — base da diferença entre íons "medidos no soro" e no interstício.
- Regra de bolso do volume: 60% do peso = água; 2/3 intracelular; do LEC, 3/4 interstício e 1/4 plasma (regra 60-40-20).

📖 *Vander — cap. 1 (Compartimentos líquidos); Guyton & Hall — cap. 25 (Corpo líquido e compartimentos); Berne & Levy — seção de fisiologia celular inicial.*`
    },
    {
      id: 'comunicacao',
      titulo: 'Comunicação celular: neural, endócrina e local',
      texto: `Para manter a homeostase, as células "conversam" por quatro vias principais:

- **Neural**: um axônio libera neurotransmissor sobre uma célula específica — resposta em **milissegundos**, de curto alcance e muito direcionada (músculo, glândula, outro neurônio).
- **Endócrina**: hormônio lançado no sangue atua em qualquer célula com receptor — resposta em **minutos a horas**, difusa e prolongada.
- **Parácrina**: sinal local que atua no vizinho (óxido nítrico dos endotélios, citocinas, eicosanoides) — micrômetros de alcance.
- **Autócrina**: a célula sinaliza **para si mesma** (muitas citocinas imunes, fatores de crescimento tumorais).

Os sistemas nervoso e endócrino são interdependentes: o **hipotálamo** é a interface (neurônios que liberam hormônios). E boa parte da comunicação usa os mesmos princípios de **sinalização**: primeiro mensageiro → receptor → transdução (cAMP, Ca²⁺, tirosina-quinase) → resposta — tema que retorna no módulo Endócrino.

Como regra de estudo: sempre pergunte *"qual é o sinal, qual é o receptor, qual é a resposta?"* — isso resolve quase qualquer mecanismo.`
    },
    {
      id: 'como-estudar',
      titulo: 'Como estudar fisiologia (e a bibliografia)',
      texto: `Fisiologia se aprende **entendendo mecanismos**, não decorando números. Estratégias que funcionam:

- **Siga o fluxo**: para cada processo, desenhe a seta do começo ao fim (sangue → glomérulo → túbulo → urina; estímulo → sensor → centro → efetor). Se você consegue desenhar, entendeu.
- **Pergunte "por quê?" três vezes**: por que o ventrículo esquerdo é mais espesso? Por que a alça de Henle é em U? Por que a curva da hemoglobina é sigmoide?
- **Preveja o distúrbio**: dado o mecanismo, o que acontece se ele falhar? (É a ponte para a fisiopatologia.)
- Use as **animações** deste site com o modo guiado e peça à IA para revisar, criar questões e explicar "como se você fosse o professor".

## Bibliografia do curso (e quando usar cada uma)
- **Vander — Fisiologia Humana**: o mais didático para começar; ótimo para celular, renal e respiratório.
- **Guyton & Hall**: completo e enciclopédico; referência para integrados e para cardiovascular/renal.
- **Ganong — Fisiologia Médica**: denso e conciso, amado por quem quer profundidade médica rápida.
- **Berne & Levy**: rigoroso, excelente em cardiovascular; bom para aprofundar.
- **Furtado — Fisiologia Humana**: em português, boa para acompanhar a graduação.

Nenhum substitui o outro: comece por Vander/Furtado, consolide com as animações e quizzes daqui, e aprofunda em Guyton/Ganong nos temas difíceis.`
    }
  ],
  quiz: [
    { p: 'O termo homeostase refere-se a:', alternativas: ['Estado de equilíbrio estático, sem variações', 'Manutenção dinâmica do ambiente interno em faixas estreitas', 'Aumento progressivo das funções corporais', 'Igualdade completa entre LIC e LEC'], correta: 1, explicacao: 'Homeostase é a regulação DINÂMICA do milieu intérieur — a variável oscila dentro de uma faixa, não é fixa.' },
    { p: 'No feedback negativo, a resposta do efetor:', alternativas: ['Amplifica o estímulo inicial', 'Reduz o estímulo inicial, devolvendo a variável ao set point', 'É sempre hormonal', 'Antecipa o estímulo'], correta: 1, explicacao: 'O feedback negativo é estabilizador: a correção opõe-se ao desvio (ex.: insulina ante a hiperglicemia).' },
    { p: 'São exemplos de feedback POSITIVO, exceto:', alternativas: ['Parto (ocitocina)', 'Coagulação sanguínea', 'Potencial de ação', 'Controle da pressão arterial pelo barorreflexo'], correta: 3, explicacao: 'O barorreflexo é negativo (estabilizador). Parto, coagulação e potencial de ação são ciclos autocatalíticos.' },
    { p: 'O líquido extracelular representa cerca de:', alternativas: ['2/3 da água corporal', '1/3 da água corporal', '90% do peso', 'Somente o plasma'], correta: 1, explicacao: 'LEC ≈ 1/3 (~14 L: plasma + interstício); LIC ≈ 2/3 (~28 L).' },
    { p: 'A comunicação mais rápida e direcionada do corpo é a:', alternativas: ['Endócrina', 'Parácrina', 'Neural (sináptica)', 'Autócrina'], correta: 2, explicacao: 'A sinapse age em milissegundos sobre uma célula-alvo específica; a endócrina é difusa e lenta.' },
    { caso: 'Homem, 52 anos, admite-se confuso e com hálito cetônico; glicemia 540 mg/dL, pH 7,10, HCO₃⁻ 6 mEq/L. O internista institui hidratação e insulina e o pH se normaliza em 12 h.', p: 'A recuperação do pH ilustra qual propriedade dos sistemas de controle homeostático?', alternativas: ['Feedback positivo, pois a resposta ampliou o estímulo', 'Feedback negativo: múltiplos efetores (rim, pulmão, terapia) devolvendo a variável ao set point', 'Feedforward puro, pois a correção antecipou o distúrbio', 'Ausência de regulação, já que houve intervenção exógena'], correta: 1, explicacao: 'Mesmo com terapia, o princípio é feedback negativo: o desvio (acidose) disparou respostas (hiperventilação compensatória, excreção renal de H⁺, insulina) que reduzem o próprio estímulo até o set point.' },
    { caso: 'Recém-nascido a termo, 2 dias de vida, T retal 36,2 °C em sala a 22 °C; a mãe o cobre e ele chora. Após 30 min, T 36,8 °C sem fonte externa de calor.', p: 'O mecanismo que elevou a temperatura do RN foi:', alternativas: ['Feedback positivo induzido pelo frio', 'Vasoconstrição cutânea + metabolismo marrom (termogênese sem tremor) comandados pelo hipotálamo', 'Aumento do set point hipotalâmico por citocinas', 'Hipertermia por falha de dissipação'], correta: 1, explicacao: 'O RN usa termogênese sem tremor (tecido adiposo marrom, desacoplamento por UCP1) + vasoconstrição — efetores clássicos do feedback negativo termorregulador. Aumentar o set point por citocinas define FEBRE, que não é o caso (T era baixa).' },
    { p: 'Sobre set point e ganho de um sistema homeostático (nível de livro):', alternativas: ['O ganho é maior quanto menor a correção entregue por unidade de erro', 'Sistemas de alto ganho mantêm a variável em faixa estreita; a febre representa um set point deslocado por PGE₂', 'O set point é fixo e imutável após o nascimento', 'Ganho alto significa resposta lenta e amplo desvio'], correta: 1, explicacao: 'Ganho = correção entregue ÷ correção necessária — alto ganho = faixa estreita. A febre é o exemplo clássico de set point dinâmico (pirógenos → PGE₂ → hipotálamo eleva o alvo), distinto da hipertermia (falha de dissipação).' }
  ]
},

/* ===================== FISIOLOGIA CELULAR ===================== */
{
  id: 'celular',
  nome: 'Fisiologia Celular',
  emoji: '🔬',
  cor: '#818cf8',
  resumo: 'Membrana, transporte passivo e ativo, osmose e as bombas que sustentam tudo.',
  topicos: [
    {
      id: 'membrana',
      titulo: 'A membrana plasmática',
      texto: `Toda fisiologia celular começa na membrana: uma **bicamada lipídica** com proteínas incrustadas — o modelo do **mosaico fluido** (Singer & Nicolson).

## Composição
- **Fosfolipídeos**: cabeça hidrofílica fora, caudas hidrofóbicas dentro — barreira **lipossolúvel** (O₂, CO₂, esteroides e álcool atravessam livremente; íons e glicose, não).
- **Proteínas**: canais, transportadores, bombas, receptores, enzimas e marcadores (MHC). São elas que dão **seletividade**.
- **Colesterol**: estabiliza a fluidez (menos fluido em altas temperaturas, mais em baixas).
- **Glicocálice** (glicoproteínas): reconhecimento celular.

## Consequências fisiológicas
- A **permeabilidade seletiva** cria gradientes — e gradientes são **energia armazenada** que a célula usa para transportar, sinalizar e gerar potencial elétrico.
- Anestesias gerais e muitos fármacos exploram a lipossolubilidade; anfotericina B fura membranas (usa terapêutica em fungos); venenos como o da abelha dissolvem bicamadas.

Regra mental: *"se é lipossolúvel, passa; se é hidrossolúvel, precisa de proteína"*. O interativo do próximo tópico mostra todos os casos.`
    },
    {
      id: 'transporte-passivo',
      titulo: 'Transporte passivo: difusão e canais',
      texto: `O transporte **passivo** não gasta ATP — usa apenas a energia do **gradiente de concentração** (e elétrico, para íons).

## Difusão simples
Moléculas movem-se do lado mais concentrado para o menos concentrado, até equilibrar. A **lei de Fick** resume: fluxo ∝ (área × Δconcentração) / espessura × permeabilidade. É assim que O₂ entra e CO₂ sai das células.

## Difusão facilitada (canais e transportadores)
- **Canais iônicos**: poros com selectividade (K⁺, Na⁺, Ca²⁺, Cl⁻) — ultrarrápidos. Podos ser de **vazamento** (sempre abertos), **voltagem-dependentes** (nervo, coração) ou **ligand-dependentes** (sinapses). **Aquaporinas** canalizam água.
- **Transportadores (carriers)**, como os **GLUT** para glicose: ligam a molécula, mudam de conformação e a soltam do outro lado. São **saturáveis** (têm Vmáx — quando todos os transportadores estão ocupados, a taxa não sobe mais) e específicos.

## Onde isso aparece
- Insulina traz **GLUT4** para a membrana do músculo/adiposo (diabetes = glicose presa fora).
- Intestino e rim dependem de GLUT e SGLT (transporte ativo secundário — tópico adiante).

Abra a animação e teste **todos os modos de transporte** — simples, canal, transportador saturável, osmose e a bomba Na⁺/K⁺ — mexendo no gradiente.`,
      interativo: 'transporte',
      avancado: `## Nível de livro
- **Lei de Fick com unidades**: J = (D × A × ΔC) / Δx, em que D é o coeficiente de difusão (↑ com temperatura e ↓ com raiz do peso molecular), A a área, ΔC o gradiente e Δx a espessura. Nos alvéolos, A ≈ 70 m² e Δx ≈ 0,5 µm — daí a rapidez da hematose.
- **Cinética de saturação (tipo Michaelis-Menten)** para carriers: J = (Jmáx × [S]) / (Km + [S]). Para glicose e GLUT2 hepático, Km ≈ 15–20 mM (nunca satura em fisiologia); GLUT1/3 (cérebro) têm Km ~1–2 mM (alta afinidade constante). Nos rins, Tm da glicose ≈ 375 mg/min (massa), com splay — início da glicosúria em ~180–200 mg/dL.
- **Difusão de água**: aquaporina-1 constitutiva nos túbulos; AQP2 regulada por ADH (trafego vesicular) — o modelo de "canal vs carrier" se traduz clinicamente em diuréticos aquareticos (vaptanos).

📖 *Vander — cap. 4 (Transporte através de membranas); Guyton & Hall — cap. 4 (Transporte de substâncias através da membrana celular).*`
    },
    {
      id: 'osmose',
      titulo: 'Osmose e tonicidade',
      texto: `**Osmose** é a difusão de água através de membrana semipermeável: da solução mais diluída para a mais concentrada (em direção à maior **osmolaridade**), até equalizar.

## Tonicidade (efeito da solução sobre a célula)
- Solução **isotônica** (~300 mOsm, ex.: soro fisiológico 0,9%): sem fluxo líquido — célula estável.
- Solução **hipotônica** (água pura, soro 0,45%): água **entra** → célula incha → **hemólise** dos eritrócitos.
- Solução **hipertônica** (NaCl 3%): água **sai** → célula encolhe (**crenação**).

## Detalhe que cai em prova
**Osmolaridade ≠ tonicidade**: a osmolaridade conta TODOS os solutos; a tonicidade, apenas os que **não atravessam** a membrana ("solutos efetivos"). A **ureia** a 300 mOsm é isoosmótica mas **hipotônica** — ela difunde para dentro da célula e a água a segue, inchando-a. O mesmo vale para o etanol. Já o Na⁺ é efetivo: fica no LEC e "segura" a água (base da correção de hiponatremia e dos edemas).

Na prática clínica: glicose hipertônica (manitol) desidrata o cérebro na hipertensão intracraniana; água destilada em veia causa hemólise — por isso existem soluções padronizadas (veja Fluidos e Eletrólitos).`
    },
    {
      id: 'transporte-ativo',
      titulo: 'Transporte ativo primário: as bombas',
      texto: `O transporte **ativo** move soluto **contra** o gradiente, gastando energia — quase sempre **ATP** direto (primário).

## A estrela: bomba Na⁺/K⁺-ATPase
- Expulsa **3 Na⁺** e insere **2 K⁺** por ATP hidrolisado — portanto **eletrogênica** (contribui com o negativismo interno).
- Mantém: o gradiente de Na⁺ (que alimenta o transporte secundário e o potencial de ação), o volume celular (sem ela, Na⁺ entra e a água segue → inchaço), e o gradiente de K⁺ (base do potencial de repouso).
- Consome **20–40% do ATP celular** (mais no neurônio!). Inibidores: **ouabaína** (digitálicos como a digoxina — aumentam Ca²⁺ no coração e a contractilidade).
- Análogo gástrico: bomba **H⁺/K⁺-ATPase**, alvo do **omeprazol**. No colon e no túbulo, bombas de Ca²⁺ (SERCA) e H⁺ também mantêm gradientes vitais.

## Por que isso importa
Todos os "produtos caros" da célula — potencial elétrico, volume, captação de glicose, sinalização por Ca²⁺ — são pagos com o ATP dessas bombas. É por isso que o hipóxico (isquemia, choque) perde tudo isso: sem ATP, a bomba para, a célula incha e o Na⁺/K⁺ se equaliza → lesão irreversível.`,
      avancado: `## Nível de livro
- **Estequiometria da bomba Na⁺/K⁺-ATPase**: 3 Na⁺ para fora e 2 K⁺ para dentro por ATP → corrente eletrogênica líquida (contribui com ~ −5 a −10 mV do repouso). Consumo: 20–40% do ATP celular (até 70% no neurônio ativo).
- **Inibidores na clínica**: digoxina (inibe a bomba → ↑ Ca²⁺ intracelular via trocador NCX → inotropismo positivo); omeprazol (bomba H⁺/K⁺ gástrica); furosemida e tiazídicos agem em cotransportadores do néfron (transporte secundário).
- **Gradientes em números**: [Na⁺]i ≈ 10–15 mM vs [Na⁺]o ≈ 142 mM (~10×); [K⁺]i ≈ 140 mM vs [K⁺]o ≈ 4 mM (~35×). Cada PA troca ~1/10.000 do Na⁺ intracelular — milhares de impulsos são possíveis sem "recarregar".

📖 *Vander — caps. de Transporte ativo; Guyton & Hall — cap. 4 (Transporte através da membrana celular).*`
    },
    {
      id: 'transporte-secundario',
      titulo: 'Transporte ativo secundário e vesicular',
      texto: `## Secundário: aproveitando o gradiente alheio
A célula usa a "moeda" do gradiente de Na⁺ (feito pela bomba) para mover outras coisas — **sem gastar ATP diretamente**:
- **Simport (cotransporte)**: Na⁺ entra a favor do gradiente e **arrasta** glicose contra o dela — **SGLT1** no intestino/rim (por isso a reidratação oral combina soro + glicose!) e **SGLT2** no túbulo proximal (alvo dos novos antidiabéticos que causam glicosúria).
- **Antiport (contratransporte)**: Na⁺ entra e Ca²⁺ sai (trocador **NCX** do coração) ou H⁺ sai (túbulo, controle do pH).

Se a bomba Na⁺/K⁺ para, o gradiente desaparece e TODO o transporte secundário cai junto — a energia vem, em última instância, do ATP.

## Vesicular: para o que é grande demais
- **Endocitose**: fagocitose (bactérias, por neutrófilos), pinocitose (líquidos) e mediada por receptor (LDL — defeito na hipercolesterolemia familiar).
- **Exocitose**: liberação de neurotransmissores, hormônios e enzimas digestivas — depende de Ca²⁺.

Com este panorama você já tem a "caixa de ferramentas" que os próximos módulos usam sem parar: o neurônio dispara com gradientes, o rim reabsorve com simports, o intestino absorve com GLUT/SGLT e o pâncreas secreta insulina por exocitose.`
    },
    {
      id: 'potencial-repouso-intro',
      titulo: 'Potencial de membrana: a ponte para o sistema nervoso',
      texto: `Todas as células têm potencial elétrico através da membrana; as **excitáveis** (neurônio, músculo, cardíaco) usam-no para gerar sinais.

## A receita do −70 mV
1. A bomba Na⁺/K⁺ constrói os gradientes: **Na⁺ fora, K⁺ dentro**.
2. A membrana em repouso é ~40× mais permeável ao **K⁺**, que escapa pelos canais de vazamento — deixando ânions (proteínas) para trás.
3. O equilíbrio entre o gradiente químico (K⁺ quer sair) e o elétrico (carga negativa o puxa de volta) fixa o potencial perto do **equilíbrio do K⁺ (≈ −90 mV)**; a pequena permeabilidade ao Na⁺ e a bomba eletrogênica ajustam o valor final para **≈ −70 mV**.

Mudanças clínicas rápidas: **hipocalemia** hiperpolariza (fraqueza, íleo); **hiperkalemia** despolariza (arritmias — por isso o K⁺ é o eletrólito mais vigiado do CTI).

O próximo passo é o **potencial de ação** — o sinal tudo-ou-nada que viaja pelos nervos. Siga para o módulo **Sistema Nervoso**, onde há uma animação dedicada, e volte aqui sempre que precisar relembrar de onde vem o −70 mV.`,
      avancado: `## Nível de livro
- **Equação de Nernst** (37 °C): E_ion = (61,5/z) × log([ion]o/[ion]i). Com valores típicos: E_K ≈ 61,5 × log(4/140) ≈ **−94 mV**; E_Na ≈ 61,5 × log(142/14) ≈ **+61 mV**.
- **Goldman-Hodgkin-Katz** (potencial real, ponderado pelas permeabilidades): com P_K : P_Na : P_Cl ≈ 1 : 0,04 : 0,45 em repouso → Vm ≈ **−70 mV** — mais positivo que E_K pela pequena permeabilidade ao Na⁺ e pela contribuição eletrogênica da bomba.
- No pico do PA, a razão P_Na/P_K inverte-se (~20 : 1) e o Vm aproxima-se de E_Na. **Muda a permeabilidade, não a concentração.**
- Clínica: elevar [K⁺]o de 4 para 7 mEq/L despolariza a célula — base eletrofisiológica das arritmias da hiperkalemia.

📖 *Vander — cap. de Potenciais de membrana; Guyton & Hall — cap. 5; Ganong — neurofisiologia básica.*`
    }
  ],
  quiz: [
    { p: 'Moléculas que atravessam a membrana por difusão simples, sem proteína:', alternativas: ['Glicose e aminoácidos', 'O₂, CO₂ e esteroides (lipossolúveis)', 'Na⁺ e K⁺', 'Insulina'], correta: 1, explicacao: 'Lipossolúveis e gasosas difundem pela bicamada; hidrossolúveis precisam de canais/transportadores.' },
    { p: 'A difusão facilitada por transportadores (ex.: GLUT) caracteriza-se por:', alternativas: ['Gastar ATP', 'Ser saturável (tem Vmáx)', 'Mover soluto contra o gradiente', 'Não ser específica'], correta: 1, explicacao: 'Carriers são saturáveis e específicos; quando todos ocupados, a taxa atinge Vmáx — diferente dos canais.' },
    { p: 'A bomba Na⁺/K⁺-ATPase, por ciclo, transporta:', alternativas: ['2 Na⁺ para fora e 3 K⁺ para dentro', '3 Na⁺ para fora e 2 K⁺ para dentro', '3 Na⁺ e 3 K⁺ para dentro', '2 Na⁺ e 2 K⁺ para fora'], correta: 1, explicacao: '3 Na⁺ saem, 2 K⁺ entram por ATP — razão eletrogênica que ajuda a tornar o interior negativo.' },
    { p: 'Uma solução de ureia a 300 mOsm, para os eritrócitos, é:', alternativas: ['Isotônica', 'Hipotônica', 'Hipertônica', 'Isosmótica e hipertônica'], correta: 1, explicacao: 'É isoosmótica, mas a ureia atravessa a membrana: entra na célula e puxa água → hipotônica (hemólise).' },
    { p: 'O simport SGLT1 do intestino capta glicose:', alternativas: ['Por difusão simples', 'Usando o gradiente de Na⁺ criado pela bomba Na⁺/K⁺', 'Gastando ATP diretamente', 'Por endocitose'], correta: 1, explicacao: 'Transporte secundário: a energia armazenada no gradiente de Na⁺ arrasta a glicose contra o seu gradiente.' },
    { caso: 'Mulher, 68 anos, usa furosemida há meses e chega com fraqueza: K⁺ 2,8 mEq/L. O eletrocardiograma mostra ondas U proeminentes.', p: 'A hipocalemia altera a excitabilidade celular principalmente por:', alternativas: ['Aumentar a concentração intracelular de K⁺', 'Hiperpolarizar o potencial de repouso (mais negativo), afastando-o do limiar', 'Despolarizar a membrana até o limiar', 'Bloquear os canais de Na⁺ diretamente'], correta: 1, explicacao: '[K⁺]o baixo torna E_K (Nernst) mais negativo → hiperpolarização do repouso → músculo e célula cardíaca mais longe do limiar (fraqueza, íleo, arritmias com ondas U).' },
    { caso: 'Paciente em choque séptico com hipóxia tecidual grave desenvolve acidose láctica; as células do túbulos renais ficam hipóxicas.', p: 'A consequência celular direta da falência da Na⁺/K⁺-ATPase nessa hipóxia é:', alternativas: ['Acúmulo intracelular de Na⁺ com entrada de água e inchaço celular', 'Hiperpolarização por saída de K⁺', 'Aumento do gradiente de Na⁺ como moeda de transporte', 'Ativação da exocitose constitutiva'], correta: 0, explicacao: 'Sem ATP, a bomba para: Na⁺ entra, a água osmoticamente o segue → inchaço celular (lesão isquêmica clássica) e perda do potencial de membrana — o dano reversível inicial da hipóxia.' },
    { p: 'Aplicando a equação de Nernst a 37 °C com [K⁺]o = 4 e [K⁺]i = 140 mmol/L, o E_K vale aproximadamente (nível de livro):', alternativas: ['−94 mV', '−70 mV', '+61 mV', '−55 mV'], correta: 0, explicacao: 'E_K = 61,5 × log(4/140) ≈ 61,5 × (−1,54) ≈ −94 mV. O repouso (−70 mV) é menos negativo porque a membrana também é levemente permeável ao Na⁺ (GHK).' }
  ]
},

/* ===================== CARDIOVASCULAR ===================== */
{
  id: 'cardiovascular',
  nome: 'Sistema Cardiovascular',
  emoji: '❤️',
  cor: '#ef4444',
  resumo: 'Coração, vasos e sangue: transporte, ciclos cardíacos, ECG e controle da pressão arterial.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Visão geral',
      texto: `O sistema cardiovascular é formado pelo **coração**, pelos **vasos sanguíneos** (artérias, veias e capilares) e pelo **sangue** — cerca de 5 litros em um adulto. Sua função central é manter o ambiente interno constante (**homeostase**), transportando gases, nutrientes, hormônios e resíduos entre os tecidos.

## Funções essenciais
- **Transporte**: O₂ dos pulmões aos tecidos; CO₂ dos tecidos aos pulmões; nutrientes do intestino às células; hormônios das glândulas aos órgãos-alvo; resíduos ao rim e fígado.
- **Regulação**: distribuição de calor (termorregulação), ajuste do pH e distribuição de fluidos entre compartimentos.
- **Proteção**: leucócitos, anticorpos e proteínas de coagulação.

O coração é uma bomba muscular dupla: o **lado direito** bombeia sangue pobre em O₂ para os pulmões (**circulação pulmonar**) e o **lado esquerdo** bombeia sangue rico em O₂ para o corpo todo (**circulação sistêmica**). Os dois lados trabalham em paralelo e em série com os pulmões, movimentando o mesmo volume: cerca de **5 litros por minuto** em repouso.`
    },
    {
      id: 'anatomia',
      titulo: 'Anatomia do coração e circulação',
      texto: `O coração tem **4 câmaras**: dois átrios (receptores, de baixa pressão) e dois ventrículos (bombeadores, de alta pressão). O **miocárdio** ventricular esquerdo é o mais espesso, pois gera pressão para todo o corpo.

## Valvulas cardíacas
- **Valvas atrioventriculares (AV)** — tricúspide (direita) e mitral (esquerda): impedem refluxo dos ventrículos para os átrios durante a sístole.
- **Valvas semilunares** — pulmonar e aórtica: impedem refluxo das artérias para os ventrículos durante a diástole.

O ruído **"tum-tum"** do coração vem do fechamento das valvas: o 1º ruído (B1) marca o fechamento das valvas AV; o 2º ruído (B2), o fechamento das semilunares.

## Circulação
O sangue segue este caminho: corpo → **veias cavas** → átrio direito → ventrículo direito → **artéria pulmonar** → pulmões (hematose) → **veias pulmonares** → átrio esquerdo → ventrículo esquerdo → **aorta** → corpo. Artérias saem do coração; veias chegam a ele. As artérias têm paredes espessas e elásticas; os **capilares** são o local das trocas (parede de uma célula de espessura); as veias são capacitivas e guardam ~65% do sangue, ajudadas por valvas anti-refluxo.`
    },
    {
      id: 'ciclo-cardiaco',
      titulo: 'Ciclo cardíaco',
      texto: `O ciclo cardíaco é a sequência de eventos entre dois batimentos, com fase de contração (**sístole**) e de relaxamento (**diástole**). Em 60–80 batimentos por minuto, cada ciclo dura cerca de 0,8 segundo.

## Fases do ciclo
- **Contração atrial (final da diástole)**: os átrios se contraem e empurram os últimos ~20% do sangue para os ventrículos (volume telediastólico ≈ 120–130 mL).
- **Contração isovolumétrica**: as valvas AV fecham (B1), os ventrículos começam a contrair sem mudar de volume — a pressão sobe rápido.
- **Ejeção**: a pressão ventricular supera a da aorta/pulmonar, as semilunares abrem e o sangue é ejetado (~70 mL — **volume sistólico**).
- **Relaxamento isovolumétrico**: as semilunares fecham (B2), o volume fica constante enquanto a pressão cai.
- **Enchimento ventricular**: as valvas AV abrem e o sangue dos átrios enche passivamente os ventrículos.

**Regra de ouro:** as valvas abrem e fecham por **gradientes de pressão**, de forma totalmente passiva. Explore a animação abaixo e observe como as pressões se invertem a cada fase.`,
      interativo: 'coracao',
      avancado: `## Nível de livro — o diagrama de Wiggers
- **Sincronia temporal (75 bpm)**: contração atrial 0–0,1 s; contração isovolumétrica 0,1–0,17 s; ejeção 0,17–0,42 s; relaxamento isovolumétrico até 0,5 s; enchimento até 0,85 s. O enchimento é ~70–80% **passivo** — por isso a fibrilação atrial é tolerada, mas a perda do kick atrial (estenose mitral) derruba o VS.
- **Pontos do Wiggers**: válvula AV fecha quando P_VD > P_átrio (B1); semilunar abre quando P_vent > P_aorta (80 mmHg); pico ventricular ~120 mmHg; a **incisura dícrota** marca B2.
- **Volumes**: EDV 120–130 mL · ESV ~50 mL · VS ~70 mL · FE = VS/EDV ≈ 55–60%.
- O **dP/dt máximo** (fase isovolumétrica) é o índice de contractilidade; a "onda a" do pulso venoso jugular espelha a contração atrial.

📖 *Guyton & Hall — cap. do ciclo cardíaco (fig. de Wiggers); Berne & Levy — secção de ciclo cardíaco; Vander — cap. do coração como bomba.*`
    },
    {
      id: 'conducao',
      titulo: 'Sistema de condução e automatismo',
      texto: `O coração gera seu próprio ritmo (**automatismo**), sem depender do sistema nervoso. Isso é possível porque algumas células cardíacas têm **potenciais de ação automáticos** — despolarizam espontaneamente até o limiar.

## Ordem de ativação
1. **Nó sinoatrial (nó SA)** — "marca-passo", no átrio direito (60–100 bpm inerentes). Inicia o batimento.
2. **Via internodal e átrios** — despolarização atrial (contração atrial).
3. **Nó atrioventricular (nó AV)** — o único caminho elétrico entre átrios e ventrículos; impõe um atraso (~0,1 s) que permite o enchimento ventricular.
4. **Feixe de His e ramos** — conduzem o impulso aos ventrículos.
5. **Fibras de Purkinje** — distribuem a despolarização ao miocárdio ventricular para contração coordenada de baixo para cima.

O potencial das células do nó SA é especial: após a repolarização, há **despolarização diastólica lenta** (corrente "funny" de Na⁺ e cálcio tipo T) que sobe o potencial até o limiar. O sistema nervoso apenas **modula**: o parassimpático (vago) reduz a frequência cardíaca; o simpático aumenta força e frequência. Qualquer nó abaixo do SA pode assumir como marca-passo reserva, com ritmo mais lento (escape).`
    },
    {
      id: 'ecg',
      titulo: 'Eletrocardiograma (ECG)',
      texto: `O ECG registra a **atividade elétrica** do coração captada na pele — não é a contração em si, mas sua ordem de chegada dos impulsos.

## Ondas e complexos
- **Onda P** — despolarização atrial.
- **Complexo QRS** — despolarização ventricular (a repolarização atrial fica "escondida" dentro dele).
- **Onda T** — repolarização ventricular.
- **Intervalo PR** — do início de P ao início de QRS (0,12–0,20 s); reflete o atraso no nó AV. Prolongado → bloqueio AV.
- **Intervalo QT** — despolarização + repolarização ventricular; reflete a duração do potencial de ação ventricular.
- **Segmento ST** — deve estar isoelétrico; elevação/depressão sugere isquemia ou infarto.

Como a despolarização ventricular começa no septo e sobe pelos ventrículos, a orientação das deflexões depende do der (eletrodo) — o mesmo batimento pode ser positivo em um der e negativo em outro. A **frequência cardíaca** pode ser estimada dividindo 1500 pelo número de "quadradinhos pequenos" entre dois complexos QRS no papel padrão (25 mm/s), ou 300 dividido pelo número de quadrados grandes. Observe o traçado sincronizado com o batimento na animação do Ciclo Cardíaco.`
    },
    {
      id: 'debito',
      titulo: 'Débito cardíaco e Frank-Starling',
      texto: `O **débito cardíaco (DC)** é o volume de sangue bombeado por minuto:

**DC = Frequência cardíaca × Volume sistólico** → 70 bpm × 70 mL ≈ **5 L/min** em repouso, podendo chegar a 20–25 L/min em atletas no exercício.

## Volume sistólico
- **Volume telediastólico (EDV)**: sangue no ventrículo no fim do enchimento (~120 mL) — a **pré-carga**.
- **Volume telestólico (ESV)**: o que sobra após a ejeção (~50 mL).
- **VS = EDV − ESV** (~70 mL). A **fração de ejeção** = VS/EDV ≈ 55–70%.

## Lei de Frank-Starling
Dentro de limites fisiológicos, **o coração bombeia todo o sangue que recebe**: quanto maior o enchimento diastólico (pré-carga), maior o estiramento das fibras e maior a força da contração seguinte — pelas pontes cruzadas de actina e miosina ficarem mais bem posicionadas. Se a pré-carga cai (ex.: hemorragia), o VS cai; se sobe (ex.: transfusão), o VS sobe. Em pré-cargas muito altas, o mecanismo se satura.

A frequência cardíaca é modulada pelo **sistema nervoso autônomo**: o vago (parassimpático) a reduz (efeito dominante em repouso) e o simpático a aumenta, junto com a **contractilidade** (inotropismo positivo, via noradrenalina e Ca²⁺ intracelular).`,
      avancado: `## Nível de livro
- **Curvas de função cardíaca vs. retorno venoso (Guyton)**: o débito é determinado pelo equilíbrio entre a curva do coração (Frank-Starling) e a do retorno venoso (dependente da pressão venosa média sistêmica ~7 mmHg e da complacência). Qual é o "ganho" do mecanismo intrínseco? O VS sobe ~2× com EDV de 100→160 mL.
- **Números de reserva cardíaca**: DC de repouso 5 L/min → 25 L/min no atleta (×5): FC 70→180, VS 70→110 mL; extração de O₂ 25%→75% e captação periférica completa.
- **Índices**: IC = DC/superfície ≈ 3,0 L/min/m²; trabalho sistólico = VS × pressão média ejetada (≈ 0,8 J/sístole); consumo de O₂ do miocárdio ∝ área pressão-tempo (índice de tensão).
- **Reserva coronariana**: fluxo 250 mL/min em repouso → 1.250 no máximo (×5) — a isquemia aparece quando a demanda excede essa reserva (>70% de estenose).

📖 *Guyton & Hall — caps. 20–21 (Débito cardíaco e retorno venoso); Berne & Levy — secção de débito e função ventricular.*`
    },
    {
      id: 'pressao',
      titulo: 'Pressão arterial e sua regulação',
      texto: `A **pressão arterial (PA)** é a força que o sangue exerce nas paredes dos vasos:

**PA = Débito cardíaco × Resistência vascular periférica**

Valores normais: ~120/80 mmHg. A **pressão de pulso** (sistólica − diastólica ≈ 40 mmHg) depende do volume sistólico e da complacência arterial. A resistência é determinada principalmente pelas **arteríolas** e varia com o raio à 4ª potência (lei de Poiseuille): pequenas mudanças de calibre mudam muito a resistência.

## Mecanismos de regulação
- **Rápida (segundos a minutos) — Barorreflexo**: barorreceptores no seio carotídeo e arco aórtico detectam quedas de PA → ativam simpático (taquicardia, vasoconstrição) e retiram o vago. Responde a mudanças posturais e hemorragias.
- **Intermediária (minutos a horas)**: sistema **renina-angiotensina-aldosterona (SRAA)** — angiotensina II vasoconstringe e aldosterona retém Na⁺; **ADH** retém água; resposta ao estresse.
- **Longo prazo (dias)**: o **rim** é o regulador final — a pressão de filtração renal determina a excreção de sal e água (pressão-natriurese), ajustando o volume sanguíneo e, com ele, a pressão.

É por isso que o rim é órgão-chave na hipertensão crônica e que diuréticos e inibidores da ECA estão entre os anti-hipertensivos mais usados.`,
      avancado: `## Nível de livro
- **Poiseuille aplicado**: R = 8ηL/(πr⁴) — dobrar o raio da arteríola reduz a resistência a 1/16. Por isso vasodilatadores agem onde há músculo liso (arteríolas), e não nos capilares.
- **MAP = DC × RVP**; numericamente MAP ≈ PD + ⅓(PS − PD) ≈ 93 mmHg. A cada metro de altura hidrostática, ±74 mmHg nos vasos dos pés vs cabeça (por que surgem edemas dependentes e síncope ortostática).
- **Curva função vascular (retorno venoso × PA cardíaca)** e o ponto de equilíbrio único onde débito = retorno — a análise de Guyton que explica por que infusões e hemorragias deslocam o equilíbrio.
- **Complacência arterial** C = ΔV/ΔP: com o envelecimento cai → PS sobe com PP ampla ("padrão do idoso"). A velocidade de onda de pulso (REFLETIDA) chega na sístole tardia e aumenta a pós-carga do VE.

📖 *Guyton & Hall — caps. 14–19 (Circulação e regulação da PA); Berne & Levy — cap. de microcirculação; Ganong — fisiologia cardiovascular.*`
    },
    {
      id: 'sangue',
      titulo: 'Sangue: composição e funções',
      texto: `O sangue é o "correio" do corpo: ~**5 L** (7–8% do peso), 55% **plasma** (ágente 90%, proteínas — albumina mantém a pressão oncótica, globulinas e fatores de coagulação) e 45% **elementos figurados** (hematócrito).

## Elementos figurados
- **Eritrócitos** (~5 milhões/mm³): discos bicôncavos sem núcleo, embalados com **hemoglobina** (4 hemes com Fe²⁺; cada grama carrega 1,34 mL de O₂). Vida ~120 dias; produção na medula sob **eritropoietina** renal (por isso a IRC causa anemia). Anemia = Hb < 13 g/dL (H) / 12 (M): fadiga, palidez, taquicardia.
- **Leucócitos** (4–11 mil/mm³): neutrófilos (bactérias, primeiros a chegar), linfócitos (B/T — imunidade adaptativa), monócitos→macrófagos, eosinófilos (parasitas/alergia), basófilos. Leucocitose com desvio à esquerda = infecção bacteriana.
- **Plaquetas** (150–400 mil/mm³): fragmentos do megacariócito, essenciais à **hemostasia** (próximo tópico).

## Grupos sanguíneos e Rh
Antígenos A/B na membrana do eritrócito; anticorpos naturais contra o antígeno ausente (tipo O tem anti-A e anti-B → doador universal para eritrócitos; AB receptor universal). **Rh⁻** gestante sensibilizada por feto Rh⁺ → doença hemolítica perinatal (prevenção com imunoglobulina anti-D).

O sistema linfático complementa: devolve o excesso de interstício à veia, transporta quilomícrons e abriga as defesas (detalhes no módulo Imunológico).`
    },
    {
      id: 'hemostasia',
      titulo: 'Hemostasia: do tampão plaquetário à fibrina',
      texto: `Ao ferir um vaso, três mecanismos em cadeia evitam o sangramento — **"vaso, plaqueta, coagulação"**:

## 1. Vasoconstrição (segundos)
Reflexo neural + **endotelina** e tromboxano A₂ liberados localmente estreitam o vaso.

## 2. Tampão plaquetário (primária)
Plaquetas **aderem** ao colágeno exposto (via fator de von Willebrand), **ativam-se** (mudam de forma, liberam ADP e TXA₂) e **agregam-se** umas às outras. A **aspirina** inibe a COX → menos TXA₂ → menos agregação (base da cardioproteção).
- Defeito: púrpura, sangramento mucoso, plaquetas baixas (< 50 mil perigoso).

## 3. Coagulação (secundária) — cascata
Ativação por **fator tecidual** (via extrínseca) ou superfície negativa (intrínseca) converge para o **complexo protrombinase (Xa + Va)** → gera **trombina (IIa)** → converte **fibrinogênio (I) em fibrina**, estabilizada pelo fator XIII. A malha de fibrina aprisiona o tampão. A maioria dos fatores é sintetizada no **fígado** e depende de **vitamina K** (II, VII, IX, X).

## Farmacologia essencial
- **Heparina**: potencializa a antitrombina III (IIa/Xa) — rápida, monitorada por TCA.
- **Varfarina**: antagoniza a vitamina K — lenta, monitorada por INR.
- **NOACs/dabigatrana-rivaroxabana**: inibem IIa ou Xa diretamente, sem monitorar.
- **TP avalia via extrínseca; TTPa, a intrínseca** — o par diferencia defeitos.

Ao final, a **fibrinólise** (plasmina, ativada pelo tPA — alteplase no AVC/infarto) dissolve o coágulo e restaura o fluxo. Siga a animação, etapa por etapa.`,
      interativo: 'coagulacao'
    }
  ],
  quiz: [
    { p: 'A onda P do ECG representa:', alternativas: ['Despolarização atrial', 'Despolarização ventricular', 'Repolarização ventricular', 'Contração atrial visível no traçado'], correta: 0, explicacao: 'A onda P é a despolarização elétrica dos átrios, que antecede a contração atrial.' },
    { p: 'O 1º ruído cardíaco (B1) é produzido por:', alternativas: ['Fechamento das valvas semilunares', 'Fechamento das valvas atrioventriculares', 'Abertura da valva aórtica', 'Contração atrial'], correta: 1, explicacao: 'B1 marca o início da sístole ventricular, quando as valvas AV (mitral e tricúspide) fecham.' },
    { p: 'O volume sistólico é calculado como:', alternativas: ['EDV + ESV', 'EDV − ESV', 'Débito cardíaco × frequência', 'Fração de ejeção × frequência'], correta: 1, explicacao: 'VS = volume telediastólico (EDV) − volume telestólico (ESV), tipicamente 120 − 50 ≈ 70 mL.' },
    { p: 'O nó sinoatrial é o marca-passo do coração porque:', alternativas: ['Conduz o impulso mais rápido', 'Tem a despolarização espontânea mais rápida', 'É inervado apenas pelo vago', 'Tem o potencial de repouso mais negativo'], correta: 1, explicacao: 'As células do nó SA despolarizam espontaneamente até o limiar mais rapidamente que qualquer outro tecido cardíaco.' },
    { p: 'Segundo a lei de Frank-Starling, o aumento da pré-carga:', alternativas: ['Reduz o volume sistólico', 'Aumenta a força de contração ventricular', 'Diminui a frequência cardíaca', 'Aumenta a resistência vascular'], correta: 1, explicacao: 'Maior enchimento estira as fibras, otimiza as pontes cruzadas e aumenta o volume ejetado.' },
    { p: 'Na hemorragia aguda, o barorreflexo responde:', alternativas: ['Ativando o parassimpático', 'Ativando o simpático com taquicardia e vasoconstrição', 'Aumentando a diurese', 'Reduzindo a contractilidade'], correta: 1, explicacao: 'A queda de PA nos barorreceptores dispara simpático: FC↑, contractilidade↑ e vasoconstrição para restaurar a PA.' },
    { caso: 'Homem, 62 anos, dor precordial há 1 h; ECG: supradesnivelamento de ST em parede inferior. A angioplastia restaura o fluxo e o ST normaliza.', p: 'A elevação aguda do ST representa, na eletrofisiologia cardíaca:', alternativas: ['Despolarização atrial anômala', 'Lesão isquêmica subepicárdica: correntes de lesão em diástole que desviam o segmento ST', 'Bloqueio completo do nó AV', 'Repolarização precoce das células do nó SA'], correta: 1, explicacao: 'Células isquêmicas ficam despolarizadas em repouso; a diferença de potencial entre área lesada e sadia gera "corrente de lesão" que desloca o ST — supradesnivelamento na lesão transmural/subepicárdica sobre a área acometida.' },
    { caso: 'Homem, 58 anos, hipertenso, PA 172/104 mmHg e coração com FE 38%. Ao exame, B3 (terceira bulha) e estase pulmonar.', p: 'A FE reduzida indica que volume diastólico final de ~130 mL está ejetando:', alternativas: ['~70 mL (FE normal)', 'menos de 50 mL — FE = (EDV − ESV)/EDV abaixo do normal (< 40%)', 'volume maior que o normal', 'volume idêntico ao sistema nervoso compensou'], correta: 1, explicacao: 'FE = VS/EDV. Com FE 38% e EDV 130 mL, o VS ≈ 49 mL — abaixo do normal de 55–60%. O B3 decorre do enchimento rápido de ventrículo dilatado/complacente.' },
    { p: 'No diagrama de Wiggers (nível de livro), o 1º ruído cardíaco (B1) coincide com:', alternativas: ['Abertura das valvas semilunares', 'Fechamento das valvas AV ao início da contração isovolumétrica', 'O pico da onda T', 'A incisura dícrota'], correta: 1, explicacao: 'B1 marca o fechamento mitral/tricúspide (início da sístole); B2, o fechamento aórtico/pulmonar (fim da ejeção — onde surge a incisura dícrota no traçado aórtico).' }
  ]
},

/* ===================== RESPIRATÓRIO ===================== */
{
  id: 'respiratorio',
  nome: 'Sistema Respiratório',
  emoji: '🫁',
  cor: '#38bdf8',
  resumo: 'Ventilação, trocas gasosas, transporte de O₂ e CO₂ e o controle bulbar da respiração.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Visão geral',
      texto: `O sistema respiratório realiza a **hematose**: troca de O₂ e CO₂ entre o ar atmosférico e o sangue. Ele faz isso com três etapas encadeadas:

- **Ventilação**: movimento de ar para dentro e fora dos alvéolos (inspiração/expiração).
- **Trocas gasosas**: difusão de O₂ e CO₂ entre alvéolos e capilares (e entre capilares e tecidos).
- **Transporte**: carreamento dos gases pelo sangue (principalmente ligados à hemoglobina).

Além disso, os pulmões participam da **fonação** (fala), do **olfato**, da **proteção** (muco, cílios, tosse) e da **regulação do pH** sanguíneo pelo controle da eliminação de CO₂ — e convertem angiotensina I em II (função metabólica).

As vias aéreas vão do nariz e boca → faringe → laringe → traqueia → brônquios → bronquíolos → **alvéolos** (o "árvore" chega a ~300 milhões de alvéolos, com área de troca de ~70 m², quase um quadrado de tênis). Da traqueia aos bronquíolos respiratórios, a parede tem cartilagem e epitélio ciliado com células caliciformes (produção de muco) — o **escada mucociliar** que varre partículas em direção à faringe. Os alvéolos são recobertos por **células tipo I** (trocas) e **tipo II** (produzem **surfactante**, que reduz a tensão superficial e evita o colapso — a falta no prematuro causa doença da membrana hialina).`
    },
    {
      id: 'ventilacao',
      titulo: 'Mecânica ventilatória',
      texto: `O ar entra e sai dos pulmões por **diferenças de pressão**, não por "aspiração" direta dos pulmões.

## Como o ar entra
1. O **diafragma** se contrai (desce) e os intercostais externos elevam as costelas.
2. O volume da caixa torácica aumenta; a **pressão intrapleural** (já negativa, ~ −5 cmH₂O) torna-se ainda mais negativa.
3. A pressão alveolar cai abaixo da atmosférica (−1 cmH₂O) → o ar **entra** (inspiração).
4. No relaxamento, o recolhimento elástico dos pulmões comprime os alvéolos, a pressão alveolar fica positiva (+1) → o ar **sai** (expiração passiva).

A "cola" que mantém os pulmões expansíveis é o **espaço pleural**: líquido entre as pleuras visceral e parietal faz as superfícies aderirem. Se ar entra nesse espaço (**pneumotórax**), a pressão pleural iguala-se à atmosférica e o pulmão colapsa.

A facilidade com que o ar flui é a **complacência** (ΔVolume/ΔPressão) e o obstáculo é a **resistência** das vias (menor calibre → mais resistência, motivo pelo qual a broncoconstrição da asma dificulta tanto a expiração). Explore a animação e observe o diafragma, as setas de fluxo e as pressões.`,
      interativo: 'respiracao',
      avancado: `## Nível de livro
- **Complacência pulmonar** = ΔV/ΔP ≈ 0,2 L/cmH₂O (200 mL por cmH₂O) no adulto — cai na fibrose e no edema, sobe no enfisema. A complacência específica (por volume) é máxima na CRF.
- **Equação de Laplace aplicada ao alvéolo** (P = 2T/r): alvéolos pequenos tenderiam a colapsar — o **surfactante** (lecitina, células tipo II, a partir da ~34ª semana) reduz T proporcionalmente ao raio e estabiliza a população alveolar. L/S (lecitina/esfingomielina) > 2 no líquido amniótico indica maturidade pulmonar.
- **Números de referência**: Ppleural ≈ −5 cmH₂O no fim da expiração e ≈ −7,5 na inspiração máxima em repouso; Palveolar oscila ±1 cmH₂O no ciclo tranquilo; Ptranspulmonar (Palv − Ppl) é a força que mantém os alvéolos abertos.
- **Trabalho respiratório**: ~3–5% do VO₂ total em repouso, >25% no exercício máximo — e a respiração com pressão positiva reduz o trabalho em pacientes exaustos.

📖 *Vander — cap. de Mecânica ventilatória; Guyton & Hall — cap. 37–38 (Ventilação pulmonar); Berne & Levy — secção respiratória.*`
    },
    {
      id: 'volumes',
      titulo: 'Volumes e capacidades pulmonares',
      texto: `A **espirometria** mede volumes móveis de ar:

- **Volume corrente (VC)**: ~500 mL em repouso.
- **Volume de reserva inspiratória (VRI)**: ~3.000 mL adicionais numa inspiração máxima.
- **Volume de reserva expiratória (VRE)**: ~1.100 mL adicionais numa expiração máxima.
- **Volume residual (VR)**: ~1.200 mL que nunca sai dos pulmões.

## Capacidades (somatórios)
- **Capacidade inspiratória** = VC + VRI.
- **Capacidade vital (CV)** = VC + VRI + VRE (~4.600 mL) — o máximo que se consegue mobilizar.
- **Capacidade residual funcional (CRF)** = VRE + VR — o volume de equilíbrio entre os ciclos.
- **Capacidade pulmonar total (CPT)** = CV + VR.

Conceitos clínicos: o **FEV1** (volume forçado no 1º segundo) reduzido indica obstrução (asma, DPOC); a relação FEV1/CV < 0,7 confirma padrão obstrutivo. Padrões **restritivos** (fibrose) reduzem CV e CPT. A ventilação alveolar (VA = (VC − espaço morto) × frequência) é o que importa para as trocas: o **espaço morto anatômico** (~150 mL de vias aéreas) não participa das trocas.

Compare os volumes nos quatro cenários na espirometria interativa abaixo.`,
      interativo: 'volumes'
    },
    {
      id: 'trocas',
      titulo: 'Trocas gasosas',
      texto: `Os gases atravessam a membrana respiratória (alvéolo → capilar, ~0,5 µm) por **difusão simples**, segundo a **lei de Fick**:

**Difusão ∝ (área × diferença de pressão parcial) / espessura**

- Pressões parciais no ar inspirado: PO₂ ≈ 159 mmHg; nos alvéolos **PAO₂ ≈ 100 mmHg**; no sangue arterial ≈ 95–100 mmHg; nos tecidos ≈ 40 mmHg.
- **PACO₂** alveolar ≈ 40 mmHg; no sangue venoso ≈ 45 mmHg; nos tecidos até 50+.

O O₂ difunde dos alvéolos (100) para o sangue venoso (40) e, nos tecidos, do capilar para o interior celular. O CO₂ faz o caminho inverso. O equilíbrio é rápido (~0,25 s de trânsito capilar, que duram ~0,75 s).

## Matching ventilação/perfusão (V/Q)
As trocas dependem de ar **e** sangue chegando juntos. Regiões bem ventiladas mas mal perfundidas têm alto V/Q (espaço morto); mal ventiladas e bem perfundidas, baixo V/Q (**shunt**). O corpo desvia o sangue de alvéolos mal ventilados por **vasoconstrição hipóxica** pulmonar. Doenças como embolia pulmonar e DPOC causam desequilíbrios V/Q que explicam a hipoxemia. A **equação do gás alveolar** (PAO₂ = PIO₂ − PaCO₂/R) permite calcular o gradiente A-a e investigar causas de hipoxemia.`,
      avancado: `## Nível de livro
- **Equação do gás alveolar**: PAO₂ = PIO₂ − PaCO₂/R = (47%×713 − 47) − 40/0,8 ≈ 100 mmHg. O **gradiente A-a** = PAO₂ − PaO₂ ≤ 10–15 mmHg no jovem (↑ ~1 mmHg por década): normal na hipoventilação e na altitude, **elevado** em shunt, V/Q baixo, DPM e difusão.
- **Capacidade de difusão (DLCO)**: ~20–25 mL O₂/min/mmHg; cai na fibrose e no enfisema, sobe no exercício (recrutamento capilar), na hemorragia alveolar e na policitemia.
- **Regra dos 4 causas de hipoxemia**: hipoventilação (PaCO₂ ↑, A-a normal), ↓ PIO₂ (altitude), shunt (não corrige com O₂ 100%), V/Q baixo (corrige com O₂). O teste de resposta a FiO₂ 100% diferencia shunt de V/Q.
- Perfusion-limited vs diffusion-limited: O₂ em repouso é perfusion-limited (equilibra em 0,25 s de trânsito); CO é sempre diffusion-limited — por isso serve para medir DLCO.

📖 *Vander — cap. de Trocas gasosas; Guyton & Hall — cap. 39–40 (Trocas de gases e transporte); West, Fisiologia Respiratória.*`
    },
    {
      id: 'transporte',
      titulo: 'Transporte de O₂ e CO₂ no sangue',
      texto: `## Oxigênio
Quase todo O₂ viaja ligado à **hemoglobina** (Hb): cada molécula carrega 4 O₂; a saturação SpO₂ é a % de sítios ocupados. A **curva de dissociação da oxiemoglobina** é sigmoide (cooperatividade): satura ~97% em PaO₂ 100 mmHg e ainda mantém ~75% em 40 mmHg (também entrega O₂ nos tecidos).

**Desvios da curva:**
- **Para a direita** (menor afinidade, entrega mais O₂): ↑ CO₂, ↓ pH (efeito Bohr), ↑ temperatura, ↑ 2,3-DPG — situações de tecido ativo.
- **Para a esquerda** (mais afinidade, menos entrega): ↑ pH, ↓ temperatura, ↓ DPG, HbF e intoxicacao por **monóxido de carbono** (CO ocupa o sítio do O₂ e ainda desloca a curva à esquerda — hipoxia grave com SpO₂ enganosamente normal).

## Gás carbônico
O CO₂ viaja de 3 formas: **dissolvido** (10%), ligado a **grupos amina da Hb** (carbamino, 30%) e, majoritariamente, como **bicarbonato** (HCO₃⁻, 60%): dentro do eritrócito, a anidrase carbônica converte CO₂ + H₂O em H⁺ + HCO₃⁻; o HCO₃⁻ sai da célula em troca de Cl⁻ (**efeito Hamburger**) e o H⁺ é tamponado pela Hb. Nos pulmões, tudo se reverte — o CO₂ "empurra" H⁺ para a Hb, facilitando a captação de O₂ (efeito Haldane).

Abra a animação abaixo: mexa em pH, temperatura, CO₂ e DPG e veja a curva se deslocar em tempo real — com a leitura da saturação arterial (PO₂ 100) e tecidual (PO₂ 40).`,
      interativo: 'oxi'
    },
    {
      id: 'controle',
      titulo: 'Controle da respiração',
      texto: `A respiração rítmica é gerada no **bulbo** por redes neuronais com atividade intrínseca (pre-Bötzinger), moduladas por:

## Controle neural
- **Centro inspiratório bulbar** (grupo respiratório dorsal) e centros pneumotáxicos/apnêusticos na ponte, que limitam a inspiração.
- **Reflexos**: Hering-Breuer (estiramento pulmonar excessivo interrompe a inspiração), reflexos de irritação (tosse, broncoconstrição).

## Controle químico — o mais importante
- **Quimiorreceptores centrais** (bulbo, na superfície ventral): respondem a H⁺ do LCR, que atravessa a barreira como CO₂. Ou seja: **o CO₂ é o principal estímulo respiratório** — subir PaCO₂ de 40 para 45 mmHg já aumenta bastante a ventilação.
- **Quimiorreceptores periféricos** (corpos carotídeos e aórticos): respondem a queda de PaO₂ (principalmente abaixo de 60 mmHg), além de CO₂/H⁺. São os únicos que "sentem" a hipóxia.

Consequências clínicas: em DPOC crônica com retenção crônica de CO₂, os quimiorreceptores centrais se adaptam e o paciente passa a depender do estímulo **hipóxico** — por isso O₂ deve ser ofertado com cautela (metas de SpO₂ 88–92%). A **hiperventilação** elimina CO₂ (alcalose respiratória, formigamento, tétanie); a **hipoventilação** acumula CO₂ (acidose respiratória).`
    }
  ],
  quiz: [
    { p: 'A inspiração ocorre quando a pressão alveolar:', alternativas: ['Fica maior que a atmosférica', 'Fica menor que a atmosférica', 'Iguala a pressão pleural', 'Fica positiva em 5 cmH₂O'], correta: 1, explicacao: 'A expansão torácica torna a pressão alveolar negativa (~ −1 cmH₂O) e o ar entra por gradiente.' },
    { p: 'O surfactante alveolar produzido pelas células tipo II serve para:', alternativas: ['Aumentar a tensão superficial', 'Reduzir a tensão superficial e evitar colapso alveolar', 'Transportar O₂', 'Umectar as vias aéreas'], correta: 1, explicacao: 'Ao reduzir a tensão superficial, o surfactante (lecitina) mantém alvéolos pequenos abertos — falta causa doença da membrana hialina.' },
    { p: 'O principal estímulo químico da respiração em condições normais é:', alternativas: ['Queda da PaO₂', 'Elevação da PaCO₂ (H⁺ central)', 'Aumento do pH', 'Queda da pressão arterial'], correta: 1, explicacao: 'O CO₂ difunde para o LCR, gera H⁺ e estimula quimiorreceptores centrais — é o drive respiratório dominante.' },
    { p: 'A curva de dissociação da oxiemoglobina se desloca para a direita quando:', alternativas: ['pH aumenta', 'Temperatura aumenta', 'CO₂ diminui', '2,3-DPG diminui'], correta: 1, explicacao: '↑ temperatura, ↑ CO₂, ↓ pH e ↑ 2,3-DPG deslocam à direita: menor afinidade e maior liberação de O₂ nos tecidos.' },
    { p: 'A maior parte do CO₂ no sangue é transportada como:', alternativas: ['Dissolvida no plasma', 'Ligada à hemoglobina', 'Bicarbonato (HCO₃⁻)', 'Ácido carbônico livre'], correta: 2, explicacao: 'Cerca de 60% viaja como HCO₃⁻ formado no eritrócito pela anidrase carbônica.' },
    { caso: 'Homem, 55 anos, DPOC grave com PaO₂ 52 mmHg, PaCO₂ 65 mmHg e pH 7,28. Na emergência, recebeu O₂ em alta concentração e ficou sonolento, com PaCO₂ 82 mmHg.', p: 'A piora da PaCO₂ após O₂ alto deveu-se principalmente a:', alternativas: ['Aumento do espaço morto anatômico', 'Perda do estímulo hipóxico à ventilação + piora da relação V/Q (redistribuição de fluxo para áreas mal ventiladas)', 'Depressão direta do bulbo pelo oxigênio', 'Broncoconstrição reflexa'], correta: 1, explicacao: 'No retentor crônico, o drive passa a depender da hipóxia: O₂ alto remove o estímulo (hypoventilação) e ainda elimina a vasoconstrição hipóxica, desviando sangue para alvéolos mal ventilados (shunt efectivo). Ofertar O₂ com metas SpO₂ 88–92%.' },
    { caso: 'Jovem resgatada de incêndio: cefaleia, tontura, SpO₂ 99%, mas lactato alto e pH 7,30.', p: 'A hipóxia com SpO₂ "normal" sugere intoxicacao por monóxido de carbono, cujo mecanismo é:', alternativas: ['Ocupação da heme pela carboxiemoglobina com deslocamento adicional da curva à esquerda, reduzindo a liberação de O₂', 'Formação de metemoglobina', 'Edema pulmonar agudo', 'Hipoventilação por depressão bulbar'], correta: 0, explicacao: 'O CO liga-se ~200× mais que o O₂ à heme (carboxiemoglobina) e ainda aumenta a afinidade das hemes restantes — transporte e entrega de O₂ despencam com oxímetro "enganado" (não distingue HbCO). Tratamento: O₂ 100%/hiperbárico.' },
    { p: 'Pela equação do gás alveolar com PaCO₂ 40 e R 0,8, a PAO₂ respirando ar ambiente é ~100 mmHg. Um gradiente A-a de 35 mmHg aponta para (nível de livro):', alternativas: ['Hipoventilação pura', 'Altitude', 'Distúrbio do parênquima: shunt, V/Q baixo ou defeito de difusão', 'Hiperventilação'], correta: 2, explicacao: 'Hipoventilação e altitude elevam PaCO₂ ou reduzem PIO₂ com gradiente A-a NORMAL. Gradiente alto = problema alveolocapilar (DPOC, edema, shunt, DPM).' }
  ]
},

/* ===================== NERVOSO ===================== */
{
  id: 'nervoso',
  nome: 'Sistema Nervoso',
  emoji: '🧠',
  cor: '#a78bfa',
  resumo: 'Neurônios, potencial de ação, sinapses, SNC, sistema autônomo e reflexos.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Visão geral e o neurônio',
      texto: `O sistema nervoso detecta, interpreta e responde a estímulos — é a rede de comando rápido do corpo. Divide-se em **sistema nervoso central (SNC)** — encéfalo e medula espinhal — e **sistema nervoso periférico (SNP)** — nervos e gânglios, subdividido em **somático** (voluntário, músculos esqueléticos) e **autônomo** (visceral: simpático e parassimpático), além da divisão sensorial (aferente) e motora (eferente).

## O neurônio
- **Dendritos** recebem sinais; **corpo celular** integra; **axônio** conduz o potencial de ação; **terminal sináptico** transmite a outros células.
- Células da **glia** sustentam tudo: astrócitos (sustentação, barreira hematoencefálica), oligodendrócitos e células de Schwann (**mielina**), micróglia (defesa).

A **mielina** isola o axônio e força o salto do impulso entre os espaços descobertos (**nós de ranvier**) — a **condução saltatória** multiplica a velocidade (de ~1 m/s até 120 m/s). Quanto maior o diâmetro e mais mielina, mais rápido. Na esclerose múltipla, a desmielinização dispersa e atrasa os impulsos.

Neurônios são **excitáveis**: mantêm diferença de potencial elétrico através da membrana e respondem a estímulos com mudanças rápidas desse potencial — é o que você vê no interativo do Potencial de Ação.`
    },
    {
      id: 'potencial-repouso',
      titulo: 'Potencial de membrana de repouso',
      texto: `Em repouso, o interior do neurônio é **negativo** em relação ao exterior: cerca de **−70 mV**. Isso decorre de:

- **Gradientes de concentração** mantidos pela **bomba Na⁺/K⁺-ATPase** (expulsa 3 Na⁺ e insere 2 K⁺ por ATP): Na⁺ concentrado fora, K⁺ concentrado dentro.
- **Permeabilidade seletiva**: a membrana em repouso é muito mais permeável ao K⁺ (canais de vazamento). O K⁺ sai pelo gradiente, deixando ânions intracelulares (proteínas) para trás — o potencial estabiliza próximo ao **equilíbrio do K⁺** (≈ −90 mV, equação de Nernst).
- As proteínas intracelulares negativas e o sódio externo empurram o valor final para −70 mV.

Qualquer evento que abra canais de Na⁺ **despolariza** (interior menos negativo); abrir mais canais de K⁺ ou Cl⁻ **hiperpolariza** (mais negativo). Pequenas despolarizações locais (potenciais graduados nos dendritos) somam-se no **cone de implantação do axônio** — se atingirem o **limiar (≈ −55 mV)**, dispara um potencial de ação. Abra o próximo tópico para ver a animação.`
    },
    {
      id: 'potencial-acao',
      titulo: 'Potencial de ação',
      texto: `O potencial de ação (PA) é a "moeda" elétrica do neurônio: uma inversão rápida e autossustentada do potencial de membrana, que viaja pelo axônio sem perder amplitude (**tudo-ou-nada**).

## Fases (acompanhe na animação)
1. **Repouso (−70 mV)**: canais de Na⁺ e K⁺ voltagem-dependentes fechados.
2. **Despolarização até o limiar (−55 mV)**: estímulo abre alguns canais de Na⁺; se o limiar for atingido, dispara.
3. **Fase ascendente (upstroke)**: canais de Na⁺ **abrem** maciçamente → entrada de Na⁺ → potencial sobe a **+30 mV**.
4. **Repolarização**: os canais de Na⁺ **inativam** (tampa de inativação) e os canais de K⁺ (mais lentos) **abrem** → saída de K⁺ → o potencial cai.
5. **Hiperpolarização transitória**: o K⁺ demora a fechar; o potencial passa brevemente de −70 mV (ex.: −80 mV).
6. **Retorno ao repouso** pela bomba Na⁺/K⁺ e fechamento dos canais.

O **período refratário absoluto** (canais de Na⁺ inativados) impede novo PA — limita a frequência máxima de disparo e garante direção única do impulso. O **refratário relativo** exige estímulo mais forte (fase de hiperpolarização). Estímulos mais intensos não geram PA maiores: geram PA **mais frequentes** (codificação por frequência).`,
      interativo: 'potencial',
      avancado: `## Nível de livro
- **Velocidade de condução** (∝ diâmetro e mielina): fibras Aα (12–20 µm, mielinizadas) até 70–120 m/s; Aδ (2–5 µm) 12–30 m/s; C (0,4–1,2 µm, amielínicas) 0,5–2 m/s. A garraja da dor "em duas ondas" (primeiro pontada Aδ, depois queimação C) é consequência direta dessas velocidades.
- **Durações**: PA neuronal ≈ 1–2 ms; cardíaco (com plateau por Ca²⁺) ≈ 200–300 ms; muscular esquelético ≈ 2–4 ms.
- **Refratariedade em números**: refratário absoluto ≈ duração do upstroke + pico (~0,5 ms no neurônio) → frequência máxima teórica ~1.000 Hz; no coração, o plateau limita a ~200–300 bpm — a proteção contra tetania cardíaca.
- **Segurança de condução**: nos nós de ranvier, a corrente local é ~5× o mínimo para despolarizar o nó seguinte; a esclerose múltipla derruba essa margem e bloqueia a condução (condução falha com o calor — sinal de Uthhoff).

📖 *Vander — cap. 6 e 8 (Potencial de ação e condução); Guyton & Hall — cap. 5–6; Berne & Levy — secção de eletrofisiologia.*`
    },
    {
      id: 'sinapse',
      titulo: 'Sinapse e neurotransmissores',
      texto: `A **sinapse química** transmite o sinal do neurônio pré-sináptico para o pós-sináptico:

1. O PA chega ao terminal → abre canais de Ca²⁺ dependente de voltagem.
2. O Ca²⁺ entra e induz a **fusão das vesículas** com a membrana (**exocitose** do neurotransmissor).
3. O transmissor difunde na fenda e liga-se a **receptores** pós-sinápticos.
4. Abre-se um canal iônico: se despolariza → **PEPS** (excitatório); se hiperpolariza → **PIPS** (inibitório).
5. O transmissor é removido por degradação enzimática, recaptação ou difusão.

O neurônio pós-sináptico soma dezenas a milhares de inputs (excitatórios e inibitórios) — a **integração sináptica** — e dispara apenas se o limiar for superado no cone de implantação.

## Principais neurotransmissores
- **Acetilcolina**: junção neuromuscular, parassimpático; degradada pela acetilcolinesterase.
- **Glutamato**: principal excitatório do SNC; **GABA e glicina**: principais inibitórios.
- **Noradrenalina, dopamina, serotonina**: moduladores do humor, sono, atenção e recompensa.
- **Endorfinas e substância P**: analgesia e dor.

Muitos fármacos agem aqui: benzodiazepínicos potencializam GABA (sedação), antidepressivos inibem a recaptação de serotonina/noradrenalina, e o curare bloqueia receptores nicotínicos da placa motora.

Dispare a sinapse na animação abaixo — no modo automático ou passo a passo — e veja cada evento acontecer.`,
      interativo: 'sinapse',
      avancado: `## Nível de livro
- **Liberação quantal**: cada vesícula contém ~3.000–10.000 moléculas de neurotransmissor; um potencial de placa terminal em miniatura (mEPP, ~0,5 mV) = 1 quantum; um PA libera 100–300 quanta → PEPT ~40 mV (limiar ~15 mV — margem de segurança 3×). O Ca²⁺ entra pela 4ª potência da relação com a liberação.
- **Atraso sináptico**: ~0,5 ms (a "assinatura" da sinapse química). Velocidade de condução vs. atraso sináptico define o tempo de reação (~200 ms totais no reflexo de retirada).
- **PPSE/PPSI**: PEPS de 0,5–1 mV, decai com τ ≈ 5–15 ms (constante de membrana); um neurônio do SNC recebe 1.000–10.000 sinapses — a integração é espacial e temporal.
- **Fármacos com alvo molecular**: botulino cleava SNARE (SNAP-25); tetano impede a liberação de GABA/glicina (espasmo); SSRIs bloqueam SERT; benzodiazepínicos são moduladores alostéricos positivos do GABA-A (↑ frequência de abertura do canal Cl⁻).

📖 *Vander — caps. de Sinapses e neurotransmissores; Guyton & Hall — caps. de sinapses; Ganong — neurofisiologia da sinapse; Kandel (para profundidade).*`
    },
    {
      id: 'snc',
      titulo: 'Sistema nervoso central',
      texto: `## Encéfalo
- **Córtex cerebral**: áreas motoras (lobo frontal, com representação somatotrópica — o homúnculo), sensoriais (parietal), visuais (occipital), auditivas e da linguagem (áreas de Broca — produção — e Wernicke — compreensão, geralmente no hemisfério esquerdo).
- **Cerebelo**: coordenação, equilíbrio, calibração motora fina e aprendizado motor.
- **Tronco encefálico**: bulbo (centros cardiorespiratórios), ponte, mesencéfalo (reflexos visuais/auditivos). Reticular: estado de alerta; circa 10 núcleos de nervos cranianos saem do tronco.
- **Diencéfalo**: tálamo (estaço de retransmissão sensorial, exceto olfato) e **hipotálamo** (homeostase: temperatura, fome, sede, ritmo circadiano, eixo hormonal e Sistema Nervoso Autônomo).
- **Corpo caloso**: conecta os hemisférios; **líquor** (LCR) banha e protege o SNC, produzido nos plexos coroides.

## Medula espinhal
Conduz vias **ascendentes** (sensibilidade: colunas dorsais para toque fino/propriocepção; espinotalâmica para dor e temperatura) e **descendentes** (corticoespinhais para movimento). A lesão completa acima de C4 compromete diafragma; abaixo de T12, reflexos de membro inferior. A substância cinzenta central (formato de borboleta) contém os corpos neuronais; a branca, os tractos.`
    },
    {
      id: 'autonomo',
      titulo: 'Sistema nervoso autônomo (SNA)',
      texto: `O SNA inerva vísceras, coração, vasos e glândulas **de forma involuntária**. Tem duas divisões que costumam agir em oposição (o conceito clássico de "acelerador e freio"), comandadas pelo hipotálamo:

## Simpático — "luta ou fuga"
- Preganglionar curta (libera **acetilcolina** em gânglios paravertebrais), pós-ganglionar longa liberando **noradrenalina**.
- Efeitos: taquicardia e ↑ contractilidade, broncodilatação, vasoconstrição cutânea e visceral (mas vasodilatação muscular), midríase, ↓ motilidade intestinal, glicogenólise, sudorese.
- Preparado também pela **medula adrenal** (adrenalina + noradrenalina no sangue).

## Parassimpático — "descanso e digestão"
- Preganglionar longa até gânglios próximos ao órgão; pós-ganglionar libera **acetilcolina** em receptores muscarínicos.
- Efeitos: bradicardia, broncoconstrição, ↑ motilidade e secreções digestivas, miose, estimula bexiga.

Farmacologia derivada daqui: β-bloqueadores (propranolol) reduzem o eixo simpático cardíaco; atropina bloqueia muscarínicos (taquicardia); salbutamol é agonista β₂ (broncodilata). A inervação da maioria dos órgãos é dupla, mas exceções: vasos e glândulas sudoríparas recebem quase só simpático.`
    },
    {
      id: 'reflexos',
      titulo: 'Reflexos e arco reflexo',
      texto: `Um **reflexo** é uma resposta rápida, involuntária e estereotipada — o teste neurologico de cabeceira mais antigo que existe.

## Arco reflexo
1. **Receptor** (ex.: fuso muscular) detecta o estímulo.
2. **Neurônio sensorial (aferente)** entra pela **raiz dorsal**.
3. **Centro integrador** na medela (monossináptico) ou com interneurônios (polissináptico).
4. **Neurônio motor (eferente)** sai pela **raiz ventral**.
5. **Órgão efetor** (músculo ou glândula) responde.

## Exemplo: reflexo patelar (miotático)
A percussão do tendão patelar estira o quadríceps → fusos musculares disparam → neurônio aferente → medela → ativa o motor do quadríceps (extensão) e, via interneurônio inibitório, relaxa o isquiotibial (**inibição recíproca**). Reflexo monossináptico, arco L2–L4.

O **reflexo de retirada** à dor é polissináptico e inclui o **reflexo cruzado de extensão** (a outra perna se estende para sustentar o corpo). Reflexos tendinosos vivos = arco íntegro; hiperativos (clônus) sugerem lesão de via piramidal (corticoespinhal); ausentes, lesão periférica. O teste de Babinski (extensão do hálux) é fisiológico no lactente e sugere lesão da via corticoespinhal no adulto.`
    },
    {
      id: 'sensibilidade-dor',
      titulo: 'Sensibilidade somática e dor',
      texto: `## Modalidades e vias
- **Toque fino, vibração e propriocepção** → fibras Aβ grandes e rápidas → **colunas dorsais** da medula → cruzam no bulbo → tálamo → córtex somatossensorial (S1).
- **Dor, temperatura e toque grosseiro** → fibras Aδ (dor rápida, "em pontada") e C (lenta, "queimação", sem mielina) → **substância gelatinosa** → cruzam imediatamente → **via espinotalâmica** → tálamo → S1 e sistema límbico (a dor tem componente emocional!).
- Os **dermátomos** mapeiam raízes; a lesão de raiz vs. de nervo periférico distingue-se pelo padrão.

## Dor: transdução e modulação
Nociceptores terminam em receptores de bradicinina, H⁺, ATP e capsaicina (TRPV1). A inflamação **sensibiliza** (hiperalgesia: mais dor pelo mesmo estímulo; alodinia: dor ao toque inofensivo — a "pele que dói" após queimadura).

**Teoria do portão (Melzack & Wall)**: fibras Aβ (toca, massageia) inibem no corno dorsal a projeção da dor — por isso esfregar um machucado alivia, e o TENS funciona. Analgésicos: AINEs/opioides (µ) agem em pontos distintos; a descida analgésica do SNC (endorfina, matéria cinzenta periaquedutal) explica placebo e acupuntura parcialmente.

## Dor crônica
Quando a dor perde a função de alarme e vira doença: sensibilização central (fibromialgia), dor neuropática (neuralgia pós-herpética, diabética — tratada com gabapentina/antidepressivos, não com AINEs). Avaliar sempre: intensidade (EVA), tipo (nociceptiva vs neuropática) e contexto.`
    }
  ],
  quiz: [
    { p: 'O potencial de repouso (~ −70 mV) é principalmente determinado por:', alternativas: ['Entrada de Na⁺', 'Permeabilidade ao K⁺ e ação da bomba Na⁺/K⁺', 'Saída de Cl⁻', 'Canais de Ca²⁺ abertos'], correta: 1, explicacao: 'A membrana em repouso é permeável ao K⁺, e a bomba Na⁺/K⁺ mantém os gradientes iônicos que geram o potencial negativo interno.' },
    { p: 'A fase ascendente do potencial de ação deve-se à:', alternativas: ['Saída de K⁺', 'Entrada maciça de Na⁺ pelos canais de sódio voltagem-dependentes', 'Entrada de Cl⁻', 'Ação da bomba Na⁺/K⁺'], correta: 1, explicacao: 'Canais de Na⁺ abertos → influxo de Na⁺ → despolarização até +30 mV.' },
    { p: 'A condução saltatória ocorre:', alternativas: ['Em axônios amielínicos', 'Nos nós de ranvier de axônios mielinizados', 'Nos dendritos', 'Apenas no SNA'], correta: 1, explicacao: 'A mielina isola o axônio; o potencial "salta" entre os nós, multiplicando a velocidade de condução.' },
    { p: 'Na sinapse química, a exocitose do neurotransmissor é desencadeada por:', alternativas: ['Entrada de K⁺', 'Entrada de Ca²⁺ no terminal pré-sináptico', 'Saída de Na⁺', 'Abertura de canais de Cl⁻'], correta: 1, explicacao: 'O PA abre canais de Ca²⁺; o cálcio entra e promove a fusão das vesículas sinápticas.' },
    { p: 'No reflexo patelar, a inibição do isquiotibial (antagonista) é feita por:', alternativas: ['Neurônio motor direto', 'Interneurônio inibitório na medula', 'Via corticoespinhal', 'Simpático'], correta: 1, explicacao: 'Inibição recíproca: um interneurônio inibitório (GABA/glicina) relaxa o músculo antagonista.' },
    { caso: 'Jovem, 22 anos, vítima de ferimento por arma branca com secção completa da medela T10. No 3º dia há paralisia flácida e arreflexia dos membros inferiores.', p: 'A arreflexia aguda (choque espinal) ocorre porque:', alternativas: ['Os reflexos dependem do córtex cerebral', 'Neurônios medulares abaixo da lesão ficam hiperpolarizados e inativos por perda do drive descendente', 'As vias aferentes sensitivas foram seccionadas junto', 'Há destruição permanente dos interneurônios'], correta: 1, explicacao: 'No choque espinal, a perda abrupta da ativação descendente deixa o circuito medular abaixo da lesão silente (arreflexia flácida). Com semanas, a hiperexcitabilidade instala reflexos exagerados (fase de espasticidade).' },
    { caso: 'Homem, 60 anos, câimbra súbita na panturrilha ao nadar. A contração involuntária sustentada do músculo resulta de disparos repetidos da placa motora — e a "amarradura" não cessa imediatamente.', p: 'O fenômeno de contração sustentada por somação temporal de PA chama-se:', alternativas: ['Contração isotônica', 'Tetania fisiológica (sumação/tetania incompleta → completa)', 'Tremso de repouso', 'Contração excêntrica'], correta: 1, explicacao: 'Estímulos em alta frequência mantêm o Ca²⁺ citosólico elevado — as contrações somam-se (treppe → tetania incompleta → completa), base da contração voluntária normal. No nervo, porém, o refratário absoluto impede a tetania do próprio PA.' },
    { p: 'Fibras Aα mielinizadas de 15 µm conduzem a ~100 m/s porque (nível de livro):', alternativas: ['A condução é contínua e lenta por toda a membrana', 'A mielina força condução saltatória de nó a nó, com grande economia de tempo e energia', 'Possuem canais de Na⁺ em toda a extensão', 'Seus potenciais de ação têm maior amplitude'], correta: 1, explicacao: 'A mielina isola internodos; o PA "salta" pelos nós de Ranvier (condução saltatória). Velocidade ∝ diâmetro e mielinização — Aα 70–120 m/s vs fibras C amielínicas ~1 m/s.' }
  ]
},

/* ===================== MUSCULAR ===================== */
{
  id: 'muscular',
  nome: 'Sistema Muscular',
  emoji: '💪',
  cor: '#f59e0b',
  resumo: 'Sarcômero, pontes cruzadas, acoplamento excitação-contração e tipos de fibra.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Visão geral — três tipos de músculo',
      texto: `Existem **três tipos de tecido muscular**:

- **Esquelético**: estriado, voluntário, multi-inervado, contrai rápido e forte, depende de estímulo nervoso. Move ossos, gera calor e postura (~40% da massa corporal).
- **Cardíaco**: estriado, involuntário, com **discos intercalares** (junções comunicantes — o coração funciona como um sincício funcional), com automatismo próprio.
- **Liso**: não estriado, involuntário, mononucleado, forma as paredes de vísceras (tubo digestivo, vasos, bexiga, útero). Contrai lento e sustenta tônus com gasto mínimo de energia, respondendo a hormônios, estiramento e SNA.

## Funções
Movimento, estabilidade postural, **geração de calor** (termogênese pelo tremor), proteção de órgãos e bombas periféricas (o "coração periférico" da musculatura venosa da perna).

O músculo esquelético é organizado em fascículos → fibras (células) → miofibrilas → **sarcômeros**, a unidade contrátil, em série. A fibra muscular é excitável e contrátil ao mesmo tempo: conduz o potencial de ação pela membrana (sarcolema) e o converte em força — o próximo tópico mostra como, na escala molecular.`
    },
    {
      id: 'sarcomero',
      titulo: 'O sarcômero: actina, miosina e bandas',
      texto: `O **sarcômero** vai de uma **linha Z** à seguinte e é o menor bloco contrátil.

## Filamentos
- **Finos (actina)**: ancorados nas linhas Z; compostos de actina (dupla hélice), **tropomiosina** (envolve a hélice) e **troponina** (complexo TnT, TnI e **TnC** — que liga Ca²⁺).
- **Grossos (miosina)**: no centro, com **cabeças de miosina** (ponte cruzada) que têm sítio de ligação à actina e atividade **ATPase**.

## Bandas ao microscópio
- **Banda A**: toda a extensão da miosina (escura) — **não muda** de tamanho na contração.
- **Banda I**: só actina (clara, inclui a linha Z) — **encurta**.
- **Zona H**: só miosina no centro — **encurta/desaparece**.
- **Linha M**: no meio da zona H, estabiliza a miosina.

## Teoria dos filamentos deslizantes
A contração não encurta os filamentos: eles **deslizam um sobre o outro**, aproximando as linhas Z (do repouso ~2,2 µm até ~1,6 µm). A força máxima ocorre na sobreposição ótima entre actina e miosina — o que conecta este tópico à lei de Frank-Starling, no coração. Veja a animação abaixo.`,
      interativo: 'sarcomero',
      avancado: `## Nível de livro
- **Relação comprimento-tensão**: tensão ativa máxima com sarcômeros de **2,0–2,2 µm** (overlap ótimo); tensão nula acima de ~3,65 µm (sem overlap) e queda abaixo de ~1,6 µm (colisão de filamentos). O VE opera entre 1,7–2,1 µm — a base celular da pré-carga.
- **Ciclo da ponte cruzada**: golpe desloca a actina ~10 nm; cada cabeça cicla ~5–50 vezes/s; 1 ATP por ciclo; força específica ~20–40 N/cm² de secção transversa.
- **Ca²⁺ em números**: citosólico sobe de ~100 nM (repouso) para ~10 µM na contração; TnC com 4 sítios de ligação.
- **Organização**: uma fibra tem ~10.000 sarcômeros em **série** (ganham velocidade) e as fibras se somam em **paralelo** (ganham força).

📖 *Vander — caps. de Músculo; Guyton & Hall — cap. de contração muscular esquelética; Berne & Levy — secção muscular.*`
    },
    {
      id: 'acoplamento',
      titulo: 'Acoplamento excitação-contração',
      texto: `Como o impulso nervoso vira contração? A sequência:

1. O neurônio motor libera **acetilcolina** na placa motora (junção neuromuscular) → receptores nicotínicos abrem canal de Na⁺ → **potencial de placa motora** → PA no sarcolema.
2. O PA propaga-se por invaginações do sarcolema: os **túbulos T**.
3. Os túbulos T ativam receptores de **diidropiridina (DHPR)**, que abrem canais de Ca²⁺ do **retículo sarcoplasmático (RS)** — os receptores de rianodina.
4. O **Ca²⁺** difunde para o citosol e **liga-se à troponina C** → a tropomiosina desloca-se e expõe o sítio de actina → as cabeças de miosina podem ligar-se.
5. **Relaxamento**: a ATPase de Ca²⁺ do RS bombeia o Ca²⁺ de volta; a troponina/tropomiosina recobre os sítios e a contração cessa.

Perceba: **o Ca²⁺ é o gatilho**, e a **acetilcolinesterase** encerra o sinal na placa. Por isso o curare (bloqueia o receptor) causa paralisia, o botulismo (impede a exocitose de ACh) causa paralisia flácida, e os bloqueadores de canal de Ca²⁺ reduzem a contractilidade cardíaca. Sem ATP não há relaxamento — é a base da **rigor mortis**.`
    },
    {
      id: 'ponte-cruzada',
      titulo: 'Ciclo de ponte cruzada e tipos de contração',
      texto: `## O ciclo (gasta 1 ATP por golpe)
1. **Golpe de força**: cabeça de miosina com ADP+Pi ligados "engatilhada" liga-se à actina exposta e libera Pi → gira ~45°, puxando a actina em direção ao centro.
2. **ADP sai** no fim do golpe.
3. **Nova ATP liga-se** → desprendimento da actina.
4. **Hidrólise do ATP** (ATPase da miosina) → rearme da cabeça → recomeça enquanto houver Ca²⁺ e ATP.

Quando a frequência de estímulos aumenta, o Ca²⁺ não volta todo ao RS entre estímulos — as forças se somam (**sumação temporal**/**tetania**: contração sustentada e máxima, fisiológica nos músculos in vivo). Um estímulo único = **contração isolada** (tremor).

## Tipos de contração
- **Isométrica**: gera tensão sem encurtar (postura, empurrar parede).
- **Isotônica**: encurta com carga constante (levantar um peso).
- **Excêntrica**: alonga sob tensão (descida controlada).

## Unidade motora
Um neurônio motor + todas as fibras que inerva; segue a **lei do tudo-ou-nada**. Força é ajustada por **recrutamento** (unidades pequenas primeiro — princípio do tamanho) e pela frequência de disparo.`
    },
    {
      id: 'fibras',
      titulo: 'Tipos de fibra, metabolismo e fadiga',
      texto: `## Três perfis principais de fibra
- **Tipo I (lentas oxidativas, vermelhas)**: muitas mitocôndrias e mioglobina, resistentes à fadiga — postura, maratona.
- **Tipo IIa (rápidas oxidoglicolíticas)**: intermediárias — corrida de média distância.
- **Tipo IIx/IIb (rápidas glicolíticas, brancas)**: força e velocidade explosivas, fatigam rápido — sprint, levantamento.

## Fontes de ATP (em ordem de velocidade)
1. **ATP e fosfocreatina** existentes (segundos).
2. **Glicólise anaeróbia** (dezenas de segundos; gera lactato/H⁺).
3. **Oxidação aeróbia** de glicose e ácidos graxos (minutos a horas).

## Fadiga
Declínio da força por: queda de ATP/fosfocreatina, acúmulo de **Pi e H⁺** (interferem no ciclo de pontes cruzadas e na liberação de Ca²⁺ pelo RS), esgotamento de glicogênio e falha da junção neuromuscular (fadiga central). O **O₂ em dívida** (EPOC) após o exercício repõe fosfocreatina, reconverte lactato e restabelece as reservas.

Treino de força **hipertrofia** as fibras (novas miofibrilas); treino aeróbio aumenta densidade mitocondrial, capilares e enzimas oxidativas — a conversão de fibra é parcial (IIx→IIa).`
    },
    {
      id: 'liso-cardiaco',
      titulo: 'Músculo liso e cardíaco — diferenças-chave',
      texto: `## Músculo liso
- Sem estrias (desorganizado: filamentos ancorados em **corpos densos**), células fusiformes e mononucleadas.
- O Ca²⁺ vem principalmente de fora (canais de Ca²⁺ voltagem e ligantes) e ativa a **cadeia leve de miosina** via **calmodulina–quinase da cadeia leve (MLCK)**: fosforila a miosina para que ela possa ligar a actina — mecanismo diferente da troponina.
- Contrai **lento e por muito tempo** com pouco ATP ("trava" — *latch*), ideal para tônus vascular e vísceras.
- Estímulos: SNA, hormônios (ex.: ocitocina no útero), **estiramento** (mio-metabolismo/auto-regulação no território digestivo e vascular) e junções comunicantes.

## Músculo cardíaco
- Estriado com **discos intercalares** (desmossomas + junções gap): o impulso se espalha de célula a célula — **sincício funcional** (todo o átrio contrai junto, depois os ventrículos).
- Células do nó SA com **despolarização diastólica** (automatismo, ver módulo Cardiovascular).
- O potencial de ação cardíaco dura ~300 ms (plataforma por Ca²⁺), o que impede tetania — o coração **precisa** relaxar para se encher. O Ca²⁺ extracelular entra pelos canais tipo L durante o plateau e induz mais liberação do RS (**acoplamento Ca²⁺-induzido-Ca²⁺**).`
    },
    {
      id: 'jnm',
      titulo: 'Junção neuromuscular e sua farmacologia',
      texto: `A **junção neuromuscular (JNM)** é a sinapse especializada entre o axônio motor e a fibra muscular — a maior e mais segura sinapse do corpo (1 axônio → 1 placa motora; cada disparo quase sempre contrai).

## A sequência
1. PA no terminal → canais de **Ca²⁺** abrem → exocitose de **acetilcolina** (vesículas prontas "ancoradas" na zona ativa).
2. ACh difunde na fenda e liga o receptor **nicotínico** da placa — canal catiônico → influxo de Na⁺.
3. **Potencial de placa motora** local (sempre supralimiar: margem de segurança 3–4×) → dispara PA pelo sarcolema → contração.
4. **Acetilcolinesterase** na fenda degrada a ACh em milissegundos (recicla colina) — sinal encerrado.

## Clínica da JNM
- **Miastenia grave**: anticorpos contra o receptor nicotínico → fraqueza que piora ao longo do dia (ptose, diplopia). Tratamento: inibidores da AChE (piridostigmina) + imunossupressão.
- **Botulismo**: toxina cleava proteínas da exocitose → **sem ACh liberada** → paralisia flácida descendente (toxina usada em doses mínimas na estética/espasticidade).
- **Curare/rocurônio**: bloqueiam o receptor → paralisia para intubação (reversão com sugamadex ou neostigmina + atropina).
- **Organofosfados** (agrotóxicos): inibem a AChE → ACh acumulada → crise colinérgica (miose, broncorreia, bradicardia — atropina + oximas).

Regra de estudo: ACh é o transmissor da JNM e de todo o parassimpático; noradrenalina, do simpático pós-ganglionar (exceto glândulas sudoríparas, que usam ACh).`
    }
  ],
  quiz: [
    { p: 'O Ca²⁺ no músculo esquelético age ligando-se a:', alternativas: ['Miosina diretamente', 'Troponina C', 'Actina', 'Túbulos T'], correta: 1, explicacao: 'Ca²⁺ liga TnC → desloca a tropomiosina → expõe o sítio da actina para a cabeça de miosina.' },
    { p: 'Durante a contração, a banda que NÃO muda de comprimento é a:', alternativas: ['Banda I', 'Banda A', 'Zona H', 'Linha Z a linha Z'], correta: 1, explicacao: 'A banda A é a extensão total da miosina, que não muda; os filamentos apenas deslizam.' },
    { p: 'O relaxamento muscular exige:', alternativas: ['Ausência de acetilcolina apenas', 'ATP para recolher Ca²⁺ ao retículo sarcoplasmático e desligar as pontes cruzadas', 'Simpático ativo', 'Acúmulo de lactato'], correta: 1, explicacao: 'A ATPase do RS recolhe o Ca²⁺ e a ATP desliga a cabeça de miosina da actina — sem ATP, há rigor.' },
    { p: 'A tetania (contração sustentada) ocorre quando:', alternativas: ['Há estímulo único', 'A frequência de estímulos impede a remoção do Ca²⁺ entre os estímulos', 'Falta ATP', 'O Ca²⁺ sai do músculo'], correta: 1, explicacao: 'Estímulos frequentes somam a liberação de Ca²⁺ — as pontes cruzadas não se desligam entre os estímulos.' },
    { p: 'No músculo liso, a contração é regulada por:', alternativas: ['Troponina', 'Fosforilação da cadeia leve de miosina via calmodulina/MLCK', 'Túbulos T', 'Acetilcolina apenas'], correta: 1, explicacao: 'O músculo liso não tem troponina: o Ca²⁺ ativa calmodulina → MLCK → fosforila a miosina.' },
    { caso: 'Mulher, 35 anos, ptose palpebral e diplopia que pioram ao fim do dia; teste do gelo positivo e anticorpos anti-receptor nicotínico reagentes.', p: 'Miastenia grave: o defeito está na:', alternativas: ['Liberação de Ca²⁺ do retículo sarcoplasmático', 'Junção neuromuscular — anticorpos destroem receptores de ACh (menor amplitude do potencial de placa motora)', 'Cascata de pontes cruzadas da actina-miosina', 'Bomba Na⁺/K⁺ da fibra muscular'], correta: 1, explicacao: 'Menos receptores funcionantes → PEPM menor (ainda supralimiar no início do dia; com o uso repetitivo, a reserva de ACh cai → fadiga piora ao dia). Piridostigmina (inibir AChE) aumenta a ACh disponível.' },
    { caso: 'Paciente em UTI recebe bloqueador neuromuscular (rocurônio) para intubação e depois neostigmina + atropina para reverter.', p: 'A neostigmina reverte o bloqueio porque:', alternativas: ['Antagoniza diretamente o receptor nicotínico', 'Inibe a acetilcolinesterase, aumentando a ACh na fenda que compete com o bloqueador pelo receptor', 'Acelera a hidrólise do rocurônio', 'Facilita a exocitose vesicular'], correta: 1, explicacao: 'Inibindo a AChE, a ACh se acumula e desloca o bloqueador competitivo do receptor. A atropina acompanha para bloquear os efeitos muscarínicos indesejados (bradicardia, secreções) da ACh alta.' },
    { p: 'Sobre a relação comprimento-tensão do sarcômero (nível de livro):', alternativas: ['A tensão máxima ocorre com 3,6 µm', 'A tensão ativa máxima ocorre com 2,0–2,2 µm (overlap ótimo); acima de 3,65 µm é nula', 'Encurtar abaixo de 1,6 µm aumenta a tensão pela compressão da miosina', 'A tensão independe do comprimento inicial'], correta: 1, explicacao: 'Sem overlap (L > 3,65 µm) não há pontes cruzadas possíveis; o ótimo é 2,0–2,2 µm. Abaixo de ~1,6 µm os filamentos colidem e a tensão cai — a base celular da curva de Frank-Starling (VE opera em 1,7–2,1 µm).' }
  ]
},

/* ===================== URINÁRIO ===================== */
{
  id: 'urinario',
  nome: 'Sistema Urinário',
  emoji: '🫘',
  cor: '#f97316',
  resumo: 'Néfron, filtração glomerular, reabsorção tubular, concentração da urina e regulação iônica.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Funções dos rins',
      texto: `Os dois rins recebem ~20–25% do débito cardíaco e processam ~180 L de filtrado por dia — produzindo ~1,5 L de urina. O néfron não é só órgão excretor: é o **centro da homeostase**.

## Funções
- **Excreção** de resíduos nitrogenados (ureia, creatinina) e de substâncias em excesso.
- **Regulação do volume** e da osmolaridade dos líquidos corporais (água e Na⁺).
- **Regulação ácido-base**: reabsorve HCO₃⁻, excreta H⁺, gera novo bicarbonato.
- **Equilíbrio eletrolítico**: Na⁺, K⁺, Ca²⁺, PO₄³⁻, Mg²⁺.
- **Funções endócrinas**: **renina** (controle da pressão), **eritropoietina** (medula óssea), ativação da **vitamina D** (junto à pele e fígado; regula Ca²⁺).
- **Gluconeogênese** em jejum prolongado.

## Anatomia funcional
Cada rim tem ~1 milhão de **néfrons**: corpo glomerular (glomérulo + cápsula de Bowman), túbulo proximal, alça de Henle (limb descendente/ascendente), túbulo distal e ducto coletor cortical e medular. O néfron justamedular (com alça longa) é o que constrói o gradiente medular para urina concentrada. A urina segue: ductos coletores → cálices → pelve → ureteres → bexiga (reservatório de 400–600 mL, controlado pelo esfíncter externo esquelético) → uretra.`
    },
    {
      id: 'nefron',
      titulo: 'Passeio pelo néfron',
      texto: `Acompanhe o filtrado no interativo e nos marcos abaixo:

## Marcos do trajeto
- **Glomérulo**: leito capilar de alta pressão dentro da cápsula de Bowman; filtra ~180 L/dia de plasma (tudo, menos proteínas grandes e células).
- **Túbulo proximal**: o "towncenter" da reabsorção — **65% do Na⁺ e da água**, **100% da glicose e aminoácidos** (cotransportadores SGLT), HCO₃⁻, e **secreção** de H⁺, ácidos orgânicos e fármacos (ex.: penicilina, diurético de alça).
- **Alça de Henle**: ramo descendente (permeável à água) e ascendente espesso (**impermeável à água**, reabsorve Na⁺-K⁺-2Cl⁻ pela NKCC2 — alvo da furosemida); mergulha na medula hipertônica e constrói o gradiente contracorrente.
- **Túbulo distal**: reabsorve Na⁺ e Ca²⁺ (este último sob controle do PTH); impermeável à água por padrão.
- **Ducto coletor**: sob **ADH** insere **aquaporinas-2** e reabsorve água (urina concentrada); sob **aldosterona** reabsorve Na⁺ e excreta K⁺ e H⁺.

No fim: **1% do filtrado vira urina** (~1,5 L/dia) — reabsorve-se 99%. Veja as partículas serem filtradas, reabsorvidas e o que sobra virar urina na animação abaixo.`,
      interativo: 'nefron'
    },
    {
      id: 'filtracao',
      titulo: 'Filtração glomerular (TFG)',
      texto: `A **taxa de filtração glomerular** (TFG ≈ 125 mL/min) é o produto da **pressão líquida de filtração** pelo coeficiente de filtração:

**TFG = Kf × (Pg − Pb − πg)**

- **Pg** — pressão hidrostática glomerular (~55–60 mmHg): empurra o filtrado para fora. Mantida pela tonus da arteríola aferente/eferente.
- **Pb** — pressão hidrostática na cápsula de Bowman (~15 mmHg): resiste.
- **πg** — pressão oncótica das proteínas plasmáticas (~30 mmHg): puxa o líquido de volta para o capilar.

Líquido resultante: pressão líquida ~ +10 mmHg → filtração contínua. O que passa: água, íons, glicose, ureia (livremente); o que fica: células e proteínas (albumina só escapa em doença glomerular — **proteinúria**, como na síndrome nefrótica).

## Autorregulação
O rim mantém a TFG constante entre PA 80–180 mmHg por: **reflexo miogênico** (estiramento → contração da arteríola aferente) e **feedback tubuloglomerular** (mácula densa no distal detecta NaCl alto → adenosina → constrição da aferente). Angiotensina II, em hemorragia, constri a eferente para preservar a TFG. Inibidores da ECA, ao dilatar a eferente, podem reduzir a TFG em estenose de artéria renal. Medida clínica: TFG estimada pelo **clearence de creatinina**.`,
      avancado: `## Nível de livro
- **Forças de Starling glomerulares (valores)**: Pgc ≈ 60 mmHg; Pbs ≈ 15 mmHg; πgc ≈ 32 mmHg (sobe ao longo do capilar) → PUF ≈ 60 − 15 − 32 ≈ **+10–13 mmHg**. Kf ≈ 12,5 mL/min/mmHg — cem vezes maior que capilares sistêmicos.
- **Clearence (C = U×V/P)**: inulina mede a TFG (125 mL/min); PAH mede o fluxo plasmático renal (~625 mL/min, extração ~90%); fração de filtração = TFG/FPR ≈ 0,2.
- **Autorregulação em números**: TFG estável entre PA 80–180 mmHg; o feedback tubuloglomerular usa o sinal de NaCl na mácula densa → adenosina → constrição da aferente. Angiotensina II prefere constrição da eferente (preserva TFG na hipotensão).
- **Creatinina**: produzida constante (0,5–1,5 mg/dL), secretada ~10–20% — por isso o clearence superestima levemente a TFG; TFG estimada (CKD-EPI) corrive idade/sexo.

📖 *Vander — caps. de Regulação da filtração glomerular; Guyton & Hall — cap. 26–27 (Formação de urina e TFG); Boron — secção renal.*`
    },
    {
      id: 'reabsorcao',
      titulo: 'Reabsorção e secreção tubular',
      texto: `Dos 180 L filtrados por dia, o destino típico:

| Segmento | Reabsorve | Secreta |
|---|---|---|
| Túbulo proximal | 65% Na⁺/água; 100% glicose e aminoácidos; HCO₃⁻; ureia parcial | H⁺, ácidos/bases orgânicas, creatinina |
| Alça (ascendente espesso) | 25% Na⁺-K⁺-2Cl⁻; Ca²⁺/Mg²⁺ paracelular | — |
| Túbulo distal | 5% Na⁺/Cl⁻ (NCC); Ca²⁺ (PTH) | — |
| Ducto coletor | Na⁺ (aldosterona); água (ADH); ureia (medular) | K⁺ e H⁺ |

## Princípios
- **Transporte transcelular/paracelular** com a bomba Na⁺/K⁺-ATPase na membrana basolateral como motor de tudo (cria gradiente para cotransporte de Na⁺ com glicose, aminoácidos etc.).
- A reabsorção de solutos **arrasta água** por osmose nos segmentos permeáveis.
- **Glicose**: transporter saturável — acima de ~180–200 mg/dL plasmáticos, excede a capacidade (Tm) e aparece **glicosúria** (diabetes descompensado).
- **Diuréticos** exploram cada segmento: osmótico (manitol, proximal), de alça (furosemida, NKCC2), tiazídico (NCC, distal) e poupador de K⁺ (espironolactona/amilorida, ducto coletor).
- **Secreção** de K⁺ no coletor é o principal caminho de eliminação de potássio — controlada por aldosterona, fluxo tubular e dieta.`
    },
    {
      id: 'concentracao',
      titulo: 'Concentração da urina: contracorrente e ADH',
      texto: `Como fazer urina 4× mais concentrada que o plasma (até 1.200 mOsm/L)? Com um **gradiente osmótico medular** e uma torneira hormônio-dependente.

## Multiplicação contracorrente
- O **ascendente espesso** bombeia NaCl para o interstício medular **sem deixar a água sair** (impermeável) — a medula fica hipertônica (300 mOsm cortical → 1.200 mOsm na papila).
- O **descendente** é permeável à água: o fluido que desce se concentra, e o que sobe vai perdendo sal — o formato em U da alça multiplica o gradiente.
- Os **vasa recta** (capilares em U) nutrem a medula sem "lavar" o gradiente (troca contracorrente passiva).
- A **ureia** reciclada pelo ducto coletor medular contribui com ~50% da osmolaridade medular.

## O papel da ADH (hormônio antidiurético)
Produzida no hipotálamo e liberada pela neuro-hipófise quando a osmolaridade sobe (> 280 mOsm) ou o volume cai:
1. Insere **aquaporinas-2** na membrana luminal do ducto coletor.
2. A água sai do ducto para o interstício hipertônico e é reabsorvida → **urina concentrada, volume baixo**.

Sem ADH (diabetes insipidus central ou nefrogênico): ducto impermeável → até 20 L/dia de urina diluída. Álcool e café inibem ADH (diurese). Beba água: a ADH cai, urina diluída e clara.`,
      avancado: `## Nível de livro
- **Gradiente medular em números**: córtex 300 mOsm → junção córtico-medular 600 → papila 1.200 mOsm. O ramo espesso pode gerar até 200 mOsm de gradiente trans-epitelial em cada "andar" da alça — o formato em U multiplica esse passo ao longo da medula.
- **Urina máxima**: 1.200 mOsm (concentrada, ADH alta) vs 50 mOsm (diluída, sem ADH) — capacidade de concentração de 24×. Obrigatória: ~0,5 L/dia para excretar 600 mOsm de resíduos.
- **Vasa recta**: fluxo baixo (~2% do débito) em contracorrente — lavam o gradiente se o fluxo sobe (diuréticos de alça reduzem o gradiente ao inibir a NKCC2).
- **Diabetes insipidus**: central (sem ADH; responde ao desmopressina) vs nefrogênico (receptor V2/AQP2; não responde). Teste de privação hídrica diferencia da polidipsia primária.

📖 *Vander — cap. de Regulação da osmolaridade e concentração urinária; Guyton & Hall — cap. 28–29 (Túbulos e mecanismo contracorrente).*`
    },
    {
      id: 'regulacao-ionica',
      titulo: 'Regulação de Na⁺, K⁺ e equilíbrio ácido-base',
      texto: `## Sódio e volume
O Na⁺ é o principal cátion extracelular e determina o **volume** do LEC. Controle pelo SRAA: ↓ pressão/volume → renina → angiotensina II (vasoconstrição + estimula aldosterona + ADH + sede) → retenção de Na⁺ e água. Contrapartida natriurética: **ANP/BNP** liberados pelo coração distendido → excretam Na⁺.

## Potássio
K⁺ determina o potencial de repouso das células — a faixa plasmática (3,5–5,0 mEq/L) é crítica. Rins controlam a **secreção no ducto coletor**: ↑ pela aldosterona, alcalose e alto fluxo tubular. Hiperkalemia despolariza coração (alterações ECG em "tenda T" → risco de parada); hipokalemia causa fraqueza e arritmias.

## Ácido-base
O rim compensa a respiração e vice-versa:
- **Reabsorve todo o HCO₃⁻ filtrado** (principalmente no proximal, via anidrase carbônica).
- **Excreta H⁺** tamponado por fosfato e amônia (NH₄⁺) — e cada H⁺ excretado assim **gera novo HCO₃⁻** para o sangue.
- Em acidose: ↑ excreção de H⁺, ↑ geração de HCO₃⁻. Em alcalose: excreta HCO₃⁻.

Exemplo integrado: na acidose metabólica, a hiperventilação compensatória (reduz PCO₂) e a excreção renal de H⁺ levam horas a dias — a regra dos sistemas tampão (minutos), respiratório (minutos-horas) e renal (horas-dias).`,
      avancado: `## Nível de livro
- **Henderson-Hasselbalch**: pH = 6,1 + log([HCO₃⁻]/(0,03×PCO₂)). Com 24 mEq/L e 40 mmHg → 6,1 + log(20) = **7,40**. O sistema é eficiente porque ambos os lados são reguláveis (rim controla HCO₃⁻, pulmão controla PCO₂).
- **Compensações esperadas**: acidose metabólica — Winter: PCO₂ = 1,5×HCO₃⁻ + 8 (±2); alcalose metabólica — PCO₂ sobe 0,7 por cada HCO₃⁻ +1; acidose respiratória aguda — HCO₃⁻ +1 por PCO₂ +10; crônica +3,5 a 4.
- **Anion gap** = Na⁺ − (Cl⁻ + HCO₃⁻), normal 8–12 mEq/L (corrija para albumina: +2,5 por cada 1 g/dL abaixo de 4). Gap normal + osmolar gap = perdas GI/acetazolamida/acidose tubular renal.
- **Produção diária**: CO₂ volátil ~15.000 mmol/dia (eliminado pelo pulmão); ácidos fixos ~70–100 mEq/dia (proteína da dieta, metabólitos) — eliminados pelo rim. O tampão mais importante do plasma é o par HCO₃⁻/CO₂ (~53% da capacidade); no intracelular, proteínas e fosfato.

📖 *Vander — cap. de Equilíbrio ácido-base; Guyton & Hall — cap. 30 (Regulação ácido-base); Ganong — secão renal/ácido-base.*`
    },
    {
      id: 'miccao',
      titulo: 'Bexiga e micção',
      texto: `A urina chega pelos ureteres (peristaltismo ureteral) à **bexiga** — reservatório muscular (detrusor liso) de 400–600 mL com alta complacência (enchimento até ~100 mL quase sem subir pressão).

## Dois estados alternados
- **Armazenamento (guarda)**: o trato de armazenamento é **simpático** (β₂ relaxa o detrusor, α contrai o colo) + nervo pudendo mantém o **esfíncter externo** (esquelético, voluntário) fechado. A bexiga enche em silêncio.
- **Esvaziamento (micção)**: ao superar o limiar (~300 mL), **receptores de estiramento** disparam o **reflexo da micção** (arco espinhal S2–S4, centro pontino): parassimpático contrai o detrusor, simpático e pudendo relaxam → fluxo. A vontade pode adiá-la (controle superior) até limite de dor.

## Clínica
- **Bexiga neurogênica**: lesão medular acima de S2 → inicialmente bexiga flácida, depois "automática" (reflexa sem controle); lesão da cauda equina → bexiga atônica com incontinência por transbordamento e esfincter frouxo.
- **HPB**: hiperplasia prostática comprime a uretra → hesitação, jato fraco, resíduo (tratamento: alfa-bloqueadores relaxam o colo).
- **Incontinência de esforço** (tosse, espirro): falha esfincteriana (pós-parto); **de urgência**: detrusor hiperativo (antisspasmódicos/β₃-agonistas).
- **Retenção aguda**: sonda vesical de alívio; o exame simples é a **urodinâmica**.`
    }
  ],
  quiz: [
    { p: 'A força que se opõe à filtração glomerular puxando líquido de volta ao capilar é:', alternativas: ['Pressão hidrostática glomerular', 'Pressão oncótica das proteínas plasmáticas', 'Pressão da cápsula de Bowman', 'Pressão arterial sistêmica'], correta: 1, explicacao: 'πg (~30 mmHg) das proteínas retém líquido no capilar; a soma Pg − Pb − πg ≈ +10 mmHg mantém a filtração.' },
    { p: 'A reabsorção de glicose ocorre principalmente no:', alternativas: ['Alça de Henle', 'Túbulo proximal (SGLT2)', 'Ducto coletor', 'Túbulo distal'], correta: 1, explicacao: 'O túbulo proximal reabsorve 100% da glicose via cotransportador Na⁺-glicose; saturado → glicosúria.' },
    { p: 'A ADH concentra a urina ao:', alternativas: ['Bombar NaCl para a medula', 'Inserir aquaporinas-2 no ducto coletor', 'Dilatar a arteríola aferente', 'Estimular a aldosterona'], correta: 1, explicacao: 'Aquaporinas-2 permitem que a água saia do ducto para o interstício medular hipertônico.' },
    { p: 'O ramo ascendente espesso da alça de Henle é:', alternativas: ['Permeável à água', 'Impermeável à água e reabsorve NaCl ativamente', 'Local da filtração', 'Alvo da aldosterona'], correta: 1, explicacao: 'É impermeável à água e bombeia Na⁺-K⁺-2Cl⁻ (NKCC2) — daí o gradiente medular e o efeito da furosemida.' },
    { p: 'Cada H⁺ excretado tamponado por fosfato/amônia no rim resulta em:', alternativas: ['Perda de bicarbonato', 'Geração de novo HCO₃⁻ para o sangue', 'Aumento da PCO₂', 'Retenção de K⁺'], correta: 1, explicacao: 'A excreção de H⁺ tamponada gera novo bicarbonato, repondo as reservas alcalinas do corpo.' },
    { caso: 'Homem, 70 anos, diabético, chega confuso: Na⁺ 118 mOsm/L, osmolaridade 244, urina concentrada e sódio urinário alto; boa função tireoidiana e adrenal.', p: 'A correção da hiponatremia deve ser lenta (≤ 8–10 mEq/L/dia) porque a correção rápida pode causar:', alternativas: ['Edema agudo pulmonar', 'Mielinólise pontina (desmielinização osmótica)', 'Convulsões por hipernatremia imediata', 'Acidose metabólica'], correta: 1, explicacao: 'Com hiponatremia crônica, os neurônios perdem solutos osmóticos para se adaptar; elevar o Na⁺ rápido demais "encolhe" o cérebro adaptado → desmielinização (síndrome de Osmotic Demyelination). O quadro sugere SIADH (euvolêmico, hipotônico, Na urinário alto).' },
    { caso: 'Mulher, 28 anos, politraumatizada, chega hipotensa; após 2 L de soro fisiológico mantém oligúria (< 0,3 mL/kg/h) e a creatinina sobe de 0,7 para 1,9 mg/dL em 48 h.', p: 'A oligúria da lesão renal aguda prí-renal, antes da necrose tubular, reflete:', alternativas: ['Falência da TFG por queda do fluxo e da pressão de filtração, com túbulo ainda íntegro (FeNa baixo)', 'Dano tubular com FeNa alto', 'Obstrução ureteral bilateral', 'Diabetes insipidus nefrogênico'], correta: 0, explicacao: 'No hipovolêmico, o rim hipoperfundido recebe sinal simpático/RAA: retém sal e água (FeNa < 1%, uréia/creatinina alta) para preservar volume — TFG cai sem lesão estrutural. FeNa > 2% indicaria necrose tubular.' },
    { p: 'A respeito do gradiente medular (nível de livro):', alternativas: ['É construído apenas pela ureia reciclada', 'O ramo ascendente espesso gera até ~200 mOsm de gradiente trans-epitelial por "andar", multiplicado ao longo da alça em U (300 → 1.200 mOsm)', 'Os vasa recta aumentam o gradiente ao levarem o interstício', 'A furosemida concentra a urina ao ativar a NKCC2'], correta: 1, explicacao: 'Multiplicação contracorrente: cada segmento da alça adiciona um pequeno gradiente que se soma no eixo córtex-papila; ureia contribui ~50%. Furosemida INIBE a NKCC2 e "lava" o gradiente (diurese abundante e diluída).' }
  ]
},

/* ===================== ENDÓCRINO ===================== */
{
  id: 'endocrino',
  nome: 'Sistema Endócrino',
  emoji: '⚗️',
  cor: '#22d3ee',
  resumo: 'Hormônios, eixo hipotálamo-hipófise, tireoide, pâncreas endócrino e adrenal.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Princípios da endocrinologia',
      texto: `O sistema endócrino coordena funções de **longa duração** (crescimento, metabolismo, reprodução, estresse) por hormônios lançados no sangue que agem em células-alvo com receptor específico — em contraste com a rapidez elétrica do sistema nervoso. Os dois sistemas se interconectam (o hipotálamo é a ponte).

## Classes de hormônios e mecanismo de ação
- **Peptídicos** (insulina, GH, ADH): receptores de **superfície** → segundos mensageiros (cAMP, IP3/Ca²⁺, tirosina-quinase) → efeito rápido (segundos a minutos); não atravessam a membrana.
- **Esteroides** (cortisol, aldosterona, hormônios sexuais): derivados do colesterol, **lipossolúveis** → atravessam a membrana → receptores **intracelulares/nucleares** → modulam transcrição gênica (efeito em horas); viajam ligados a proteínas transportadoras.
- **Aminas**: catecolaminas (como peptídeos) e hormônios tireoidianos T3/T4 (como esteroides).

## Controle por feedback negativo
O princípio organizador: o hormônio final (ou seu efeito) **inibe a sua própria produção** cascata acima — mantém níveis estáveis. Exemplo: cortisol alto → inibe CRH e ACTH. A quebra desse loop gera doença: tumores produtores, deficiências enzimáticas ( hiperplasia adrenal congênita), resistência periférica.

As glândulas principais: hipotálamo, hipófise, tireoide, paratireoides, adrenais, pâncreas endócrino, gônadas e tecido adiposo (leptina) — e o rim (EPO, renina), coração (ANP) e intestino (hormônios digestivos).`
    },
    {
      id: 'hipofise',
      titulo: 'Eixo hipotálamo-hipófise',
      texto: `A **hipófise** (glândula pituitária) fica sob o hipotálamo, a "central de comando" neuroendócrina.

## Adeno-hipófise (anterior) — controle hipofisiotrópico
Ligada ao hipotálamo pelo **sistema porta hipotálamo-hipofisário**. Hormônios hipotalâmicos (liberadores/inibidores) chegam por esse sistema e comandam a liberação de:
- **TSH** (tireoestimulante) ← TRH — estimula T3/T4.
- **ACTH** ← CRH — estimula cortisol (e androgênios) no córtex adrenal.
- **FSH e LH** ← GnRH — gônadas (gametas e esteroides sexuais).
- **GH** (crescimento) ← GHRH/− somatostatina — via **IGF-1** hepático.
- **Prolactina** ← inibição tônica por **dopamina** (por isso drogas antidopaminérgicas causam hiperprolactinemia e galactorreia).

## Neuro-hipófise (posterior)
Extensão neuronal do hipotálamo: armazena e libera **ADH** (osmolaridade/volume) e **ocitocina** (contração uterina e ejeção do leite).

Cada eixo se fecha com **feedback negativo** do hormônio final sobre hipotálamo e hipófise — por isso, medir TSH é a forma mais sensível de avaliar a função tireoidiana: TSH alta sugere falência primária da tireoide; TSH baixa, hiperfunção ou uso excessivo de hormônio exógeno.

Explore o simulador abaixo: escolha um eixo, reduza a função da glândula alvo e veja os hormônios tróficos dispararem — é o padrão laboratorial "primário" aparecendo na sua frente.`,
      interativo: 'eixoendocrino',
      avancado: `## Nível de livro
- **Pulsatilidade é a regra**: GnRH precisa ser pulsátil (pulsos de 30–60 min) — pulsos contínuos downregulam receptores (base do agonista contínuo leuprorrelina, que "desliga" o eixo gonadal). A amplitude e a frequência dos pulsos discriminam LH vs FSH.
- **Meias-vidas** (definem o tempo de feedback): peptídeos minutos (insulina ~5 min), proteínas horas (TSH ~1 h), esteroides circulantes horas-dias ligados a SHBG/CBG/TBG (T4 total ~7 dias — por isso dosar TSH e aguardar 6–8 semanas para reavaliar reposição).
- **Cascata de umplo sinal de amplificação**: CRH (pg) → ACTH (ng) → cortisol (µg) — amplificação de 10⁵ do sinal inicial.
- **Eixos com feedback duplo**: estradiol em fase folicular baixa FSH/LH (negativo), mas o pico pré-ovulatório sustained >200 pg/mL reverte para **feedback positivo** → pico de LH — o único exemplo fisiológico programado no adulto.

📖 *Vander — caps. de Hipotálamo e hipófise; Guyton & Hall — caps. 74–75 (Hipotálamo e hormônios); Ganong — secção endócrina.*`
    },
    {
      id: 'tireoide',
      titulo: 'Hormônios tireoidianos',
      texto: `A tireoide produz **T4** (majoritário, ~90%, meia-vida ~7 dias) e **T3** (mais ativo, ~10%, meia-vida ~1 dia; grande parte do T3 vem da conversão periférica de T4 por desiodases). Sintetizados a partir de **iodo** + tireoglobulina.

## Ações
- ↑ **metabolismo basal** (consumo de O₂, termogênese).
- Essenciais ao **desenvolvimento do SNC** no feto e lactente (deficiência nos 1ºs meses → cretinismo; triagem neonatal obrigatória).
- Potencializam efeitos de catecolaminas (taquicardia no hipertireoidismo), crescimento e maturação óssea.

## Regulação
TRH → TSH → tireoide (captura iodo, sintetiza e libera T3/T4) → feedback negativo. A TSH também promove crescimento da glândula.

## Clínica
- **Hipotireoidismo**: TSH ↑, T4 ↓ — cansaço, frio, bradicardia, pele seca, ganho de peso (mixedema). Causa mais comum: tireoidite de Hashimoto.
- **Hipertireoidismo**: TSH ↓, T4/T3 ↑ — calor, taquicardia, perda de peso, tremor. Graves (anticorpo estimulante), bócio, exoftalmia.
- **Bócio por deficiência de iodo** (TSH alta estimula crescimento) — prevenido pelo sal iodado.`
    },
    {
      id: 'pancreas',
      titulo: 'Insulina e glucagon — a glicemia',
      texto: `As **ilhotas pancreáticas** têm células **β** (insulina, ~70%), **α** (glucagon) e **δ** (somatostatina). Juntas mantêm a glicemia entre 70–110 mgH em jejum.

## Insulina (hipoglicemiante) — "alimente e armazene"
Liberada quando a **glicemia sobe** (e por aminoácidos, GLP-1, parasimpático):
- Receptor tirosina-quinase → **GLUT4** migra para a membrana de músculo e adipócito → captação de glicose.
- Fígado: glicogênese, lipogênese; inibe glicogenólise e gliconeogênese.
- Armazena: glicogênio, triglicerídeos, proteínas (síntese proteica ↑).

## Glucagon (hiperglicemiante) — "mobilize"
Liberado na **queda da glicemia** (jejum) e por aminoácidos/simpático:
- Fígado: **glicogenólise** e **gliconeogênese** → glicose para o sangue.
- Adipócito: lipólise (ácidos graxos livres, corpos cetônicos em jejum prolongado).

O par funciona em see-saw com adrenalina e cortisol (contrarregulatórios). **Diabetes tipo 1**: destruição autoimune das células β → insulinopenia absoluta. **Tipo 2**: resistência à insulina com falência progressiva de β. Crise: hiperglicemia + cetose (tipo 1) e SHC (tipo 2); excesso de insulina → **hipoglicemia** (sudorese, tremor, confusão — glicagon de resgate). Teste a simulação abaixo.`,
      interativo: 'glicemia'
    },
    {
      id: 'adrenal',
      titulo: 'Glândulas suprarrenais',
      texto: `## Córtex (esteroides) — "3 camadas, 3 grupos"
- **Glomerulosa → aldosterona**: retém Na⁺ e excreta K⁺/H⁺ no ducto coletor (eixo **renina-angiotensina**, não o ACTH como principal controle). Hiperaldosteronismo → hipertensão com hipocalemia (Conn).
- **Fasciculada → cortisol** (via ACTH): estresse, glicemia (gliconeogênese, proteólise, lipólise), anti-inflamatório/ imunossupressor, permissivo para catecolaminas. Excesso → síndrome de Cushing (cúpula, estrias, fraqueza proximal); deficiência → Addison (hipotensão, hiperpigmentação por ACTH↑).
- **Reticular → androgênios** (DHEA): pêlos pubianos, pré-púber.

## Medula (catecolaminas)
Células cromafins = "neurônios sem axônio": liberam **adrenalina (80%) e noradrenalina** ao estímulo simpático — resposta de luta ou fuga (taquicardia, broncodilatação, glicogenólise, redistribuição de fluxo). Feocromocitoma: tumor produtor → crises hipertensivas paroxísticas.

Todos os esteroides adrenais derivam do **colesterol** — e a enzima 21-hidroxilase deficiente na hiperplasia adrenal congênita desvia a produção para androgênios (virilização + perda de sal).`
    },
    {
      id: 'calcio-reproducao',
      titulo: 'Cálcio, crescimento e reprodução',
      texto: `## Regulação da calcemia (Ca²⁺ iônico 8,5–10,5 mg/dL)
- **PTH** (paratireoides, sensor de Ca no receptor de cálcio): ↑ Ca²⁺ via osso (osteoclastos), rim (reabsorção distal + ativar vitamina D) e intestino (indireto pela vitamina D). Hipercalcemia com PTH alta → hiperparatireoidismo (pedras, ossos, abdominal groan).
- **Vitamina D** (1,25-(OH)₂ — calcitriol, ativada no rim): ↑ absorção intestinal de Ca **e** PO₄. Deficiência → raquitismo/osteomalacia.
- **Calcitonina** (tireoide, célula C): efeito hipocalcemiante discreto no adulto.

## Crescimento
**GH** → IGF-1 hepático → crescimento de cartilagem epifisária, síntese proteica e lipólise. Deficiência → nanismo; excesso pré-pubere → gigantismo, adulto → acromegalia.

## Reprodução
- **Puberdade**: GnRH pulsátil → LH/FSH. **LH**: células de Leydig (testosterona) / ovulação e corpo lúteo. **FSH**: espermatogênese / folículos ovarianos (estradiol + inibina B).
- **Ciclo menstrual**: estradiol proliferativo; pico de LH por feedback positivo → ovulação → **progesterona** lútea secretora. Sem fecundação, queda dos hormônios → menstruação.
- **Gravidez**: hCG sustenta o corpo lúteo; placenta produz estrogênio/progesterona e lactogênio placentário; **prolactina** + queda pós-parto de progesterona → lactação.`
    },
    {
      id: 'estresse',
      titulo: 'Resposta integrada ao estresse',
      texto: `O estresse (trauma, infecção, cirurgia, provas, corrida) ativa dois eixos que agem em tempos diferentes:

## Eixo rápido: simpático–medular (segundos)
Hipotálamo → simpático → **medula adrenal** libera **adrenalina (80%) e noradrenalina**: taquicardia e ↑ contractilidade, broncodilatação, glicogenólise e lipólise, redistribuição do fluxo para músculo/cérebro, pupilas dilatadas. É a resposta "luta ou fuga".

## Eixo lento: hipotálamo–hipófise–adrenal (HPA, minutos-horas)
**CRH** hipotalâmico → **ACTH** hipofisário → **cortisol** córtex-adrenal:
- Metabólico: ↑ glicemia (gliconeogênese, proteólise muscular, lipólise central), poupando glicose para o cérebro.
- Permissivo: potencia catecolaminas e glucagon.
- Imunossupressor e anti-inflamatório (por isso usado em autoimunes — e a defesa cai com uso crônico).
- Com o tempo: osteopenia, pele frágil, obesidade central, hipertensão (quadro do **Cushing**, igual ao uso prolongado de corticoide).

## Estresse agudo vs crônico
- **Agudo**: adaptativo — mobiliza energia, afia a atenção, consolida memória.
- **Crônico**: desgaste — hipertensão, resistência à insulina, imunossupressão, atrofia hipocampal (depressão, esquecimento).

Integração com o que você já viu: no exercício ou no choque hemorrágico, simpático + cortisol + ADH + renina-angiotensina agem **juntos** — cada sistema do corpo contribui com um pedaço da resposta. É a fisiologia integrada em ação.`
    }
  ],
  quiz: [
    { p: 'Hormônios esteroides agem:', alternativas: ['Em receptores de superfície via cAMP', 'Em receptores intracelulares modulando transcrição', 'Por canais iônicos diretos', 'Apenas na hipófise'], correta: 1, explicacao: 'Lipossolúveis, atravessam a membrana e ligam receptores nucleares — efeito mais lento e duradouro.' },
    { p: 'A prolactina é controlada principalmente por:', alternativas: ['Estímulo de GnRH', 'Inibição tônica de dopamina', 'Feedback do cortisol', 'ADH'], correta: 1, explicacao: 'A dopamina inibe tonicamente a prolactina; seu bloqueio causa hiperprolactinemia e galactorreia.' },
    { p: 'A insulina reduz a glicemia principalmente por:', alternativas: ['Estimular glicogenólise hepática', 'Translocar GLUT4 em músculo e tecido adiposo', 'Aumentar a lipólise', 'Inibir a captação de glicose'], correta: 1, explicacao: 'O receptor de insulina leva o GLUT4 à membrana, permitindo a captação de glicose nos tecidos insulino-dependentes.' },
    { p: 'No hipotireoidismo primário, o padrão laboratorial típico é:', alternativas: ['TSH ↓ e T4 ↑', 'TSH ↑ e T4 ↓', 'TSH e T4 normais', 'TSH e T4 altas'], correta: 1, explicacao: 'A tireoide falha → T4 cai → o feedback negativo cessa → TSH sobe. TSH é o melhor rastreio.' },
    { p: 'A aldosterona é secretada principalmente em resposta a:', alternativas: ['ACTH alto', 'Angiotensina II e hipercalemia', 'ADH', 'Cortisol alto'], correta: 1, explicacao: 'O eixo renina-angiotensina e o K⁺ são os controles dominantes da aldosterona — retenção de Na⁺, excreção de K⁺.' },
    { caso: 'Homem, 45 anos, obeso, com HbA1c 8,9%. O clínico inicia metformina e explica que a resistência à insulina reduz a captação de glicose pelo músculo.', p: 'O transportador que a insulina mobiliza para a membrana do músculo é o:', alternativas: ['GLUT2 (constitutivo hepático)', 'SGLT1 (simport Na⁺-glicose)', 'GLUT4, armazenado em vesículas e translocado pelo sinal insulinico', 'GLUT1 do cérebro'], correta: 2, explicacao: 'GLUT4 é o único sensível à insulina: o receptor (tirosina-quinase) dispara PI3K-Akt → fusão das vesículas de GLUT4 com a membrana → captação de glicose. No diabetes tipo 2 esse passo é resistente.' },
    { caso: 'Mulher, 30 anos, taquicardia, perda de peso, tremor e TSH < 0,01 com T4 livre alto; a cintilografia mostra captação difusa aumentada.', p: 'O padrão hormonal TSH suprimida + T4 alto demonstra:', alternativas: ['Falência primária da tireoide', 'Integridade do feedback negativo: o excesso de T4 inibe TSH (doença primária da glândula, como Graves)', 'Falha hipofisária', 'Efeito do feedback positivo fisiológico'], correta: 1, explicacao: 'Na doença primária, a glândula produz hormone independente e o feedback negativo intacto SUPRIME o TSH — por isso TSH é o melhor rastreio: alta na falência primária, baixa na hiperfunção.' },
    { p: 'A respeito dos eixos hormonais (nível de livro):', alternativas: ['Todos os hormônios hipofisários são controlados por feedback positivo', 'A pulsatilidade importa: GnRH contínuo desregula o eixo gonadal (base dos agonistas como a leuprorrelina)', 'O feedback negativo atua apenas sobre a hipófise, nunca sobre o hipotálamo', 'A meia-vida da TSH é de semanas'], correta: 1, explicacao: 'GnRH pulsátil estimula; contínuo, downregula receptores hipofisários — princípio dos agonistas depot que "desligam" o eixo. O feedback negativo incide sobre hipotálamo E hipófise (e TSH tem meia-vida ~1 h).' }
  ]
},

/* ===================== DIGESTÓRIO ===================== */
{
  id: 'digestorio',
  nome: 'Sistema Digestório',
  emoji: '🍽️',
  cor: '#84cc16',
  resumo: 'Motilidade, secreção, digestão e absorção ao longo do tubo digestivo.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Visão geral — seis funções',
      texto: `O tubo digestivo (boca → ânus, ~9 m) e os órgãos anexos (glândulas salivares, fígado e pâncreas) realizam:

1. **Ingestão** da comida e líquidos.
2. **Motilidade**: mastigação, deglutição, **peristaltismo**, mistura e armazenamento.
3. **Secreção**: saliva, HCl, enzimas, bile, muco e hormônios (total ~7 L/dia, quase todo reabsorvido).
4. **Digestão**: mecânica (triturar) e química (hidrólise enzimática a moléculas absorvíveis).
5. **Absorção**: nutrientes, água e eletrólitos para o sangue/linfa (sobretudo no intestino delgado).
6. **Eliminação** de resíduos (fezes).

## Arquitetura da parede
Quatro camadas ao longo de todo o tubo: **mucosa** (epitélio, lâmina própria, muscular da mucosa), **submucosa** (vasos e plexo de Meissner — nervos digestivos), **muscular** (circular + longitudinal, com o **plexo de Auerbach**) e **adventícia/serosa**.

O tubo tem seu próprio "cérebro": o **sistema nervoso entérico** (milhões de neurônios) opera reflexos locais — o SNA (parassimpático via vago estimula; simpático inibe) e os hormônios digestivos apenas **modulam**. Tempo de trânsito típico: estômago 2–4 h, delgado 3–5 h, cólon 10–59 h.`
    },
    {
      id: 'boca-esofago',
      titulo: 'Boca e esôfago: mastigação, saliva e deglutição',
      texto: `## Boca
- **Mastigação** reduz partículas e mistura com a **saliva** (~1–1,5 L/dia): **α-amilase salivar** (ptialina) inicia a digestão do **amido**, lipase lingual; muco e lisozima lubrificam e defendem; pH ~7.
- O bolo alimentar se forma e a deglutição começa.

## Deglutição (3 fases)
1. **Bucal (voluntária)**: língua empurra o bolo ao fundo da boca.
2. **Faringea (involuntária, ~1 s)**: epiglote protege a via aérea, o palato mole fecha a nasofaringe, a respiração pausa.
3. **Esofagiana**: **peristaltismo primário** (onda muscular) empurra o bolo; o **esfíncter esofágico inferior (EEI)** relaxa ao chegar o bolo e fecha em seguida. Refluxo gastroesofágico = falha do EEI.

O esôfago tem músculo esquelético no 1/3 superior, misto no meio e liso no 1/3 inferior. Se o bolo "prende", ondas **secundárias** repetem o empurrão. Gravidez e hérnia de hiato predispoem a refluxo; a acetilcolina e a substância P estimulam o peristaltismo; o vago coordena tudo. Veja a animação abaixo.`,
      interativo: 'peristalse'
    },
    {
      id: 'estomago',
      titulo: 'Estômago: secreção e digestão química',
      texto: `O estômago armazena (1,5 L), mistura e inicia a digestão de **proteínas**. As glândulas gástricas têm células especializadas:

- **Parietais**: secretam **HCl** (pH 1,5–2,0, via bomba H⁺/K⁺-ATPase) e **fator intrínseco** (indispensável para absorver **B12** no íleo — a gastrectomia exige reposição).
- **Principais (peáticas)**: secretam **pepsinogênio**, ativado pelo ácido em **pepsina** (digere proteína em peptídeos; ótimo em pH ácido).
- **Mucosas**: muco e bicarbonato — a "barreira do muco" protege a parede de autodigestão. Se falha: **úlcera** (H. pylori e AINH são as grandes causas).
- **G (enteroendócrinas)**: **gastrina** → estimula parietais (e crescimento da mucosa).

## Regulação da secreção
- **Céfálica** (pensar/cheirar comida, vago), **gástrica** (distensão, peptides → gastrina) e **intestinal** (feedback negativo: secretina/CCK inibem).
- O quimo sai pelo **esfíncter pilórico** em pequenas porções para o duodeno.

## Proteção
Muco + HCO₃⁻, renovação epitelial rápida, prostaglandinas. Omeprazol (IBP) bloqueia a bomba H⁺/K⁺; H2-bloqueadores reduzem o estímulo histamínico das parietais.`
    },
    {
      id: 'delgado',
      titulo: 'Intestino delgado: digestão e absorção',
      texto: `É aqui que a maior parte da digestão e **~90% da absorção** acontece. A superfície é multiplicada por **vilosidades → microvilosidades (borda em escova)** (~250 m²) e há movimentos de **segmentação** (mistura) e peristaltismo.

## Digestão química final
- **Bordas em escova**: disacaridases (lactase — sua queda causa intolerância à lactose), peptidases.
- **Pancreáticas**: amilase, lipase (+ colipase), **tripsina/quimotripsina** (ativadas no lúmen pela enteroquinase), nucleases.
- **Bile** (fígado, armazenada na vesícula): **sais biliares emulsificam** gorduras → micelas para lipase trabalhar.

## Absorção (principalmente jejuno-íleo)
- **Carboidratos** → glicose/galactose (SGLT1, com Na⁺) e frutose (GLUT5) → sangue porta.
- **Proteínas** → aminoácidos e di/tripeptídeos (cotransporte com Na⁺) → sangue.
- **Gorduras** → ácidos graxos + monoglicerídeos nas micelas → enterócito → **quylomícrons** → **linfa** (lacteais).
- **Água e eletrólitos**: por osmose e transporte ativo; B12 no íleo (com fator intrínseco); sais biliares reabsorvidos no íleo (circulação êntero-hepática).

Hormônios coordenando: **secretina** (↑ HCO₃⁻ pancreático/biliar, inibe gastrina), **CCK** (contração vesícula, enzimas pancreáticas, saciedade), **GLP-1/GIP** (incrétinas — base dos novos antidiabéticos). Doença celíaca (glúten) achata vilosidades → má absorção.

Acompanhe a rota de cada nutriente na vilosidade interativa abaixo.`,
      interativo: 'vilosidade'
    },
    {
      id: 'figado-pancreas',
      titulo: 'Fígado, pâncreas e bile',
      texto: `## Fígado (com vesícula biliar)
Recebe sangue portal (nutrientes) e arterial; processa tudo e produz **bile** (600–1.000 mL/dia):
- **Sais biliares**: emulsificam gorduras (circulam 6–8× ao dia pela circulação êntero-hepática).
- **Bilirrubina**: pigmento do metabolismo da Hb, conjugado e excretado na bile (o excesso → icterícia; urobilinogênio dá cor às fezes/urina).
- Outras funções hepáticas: gliconeogênese/glicogenólise, síntese de **albumina e fatores de coagulação**, metabolismo de fármacos e álcool, amônia → ureia (falência → encefalopatia hepática), estocagem de vitaminas (A, D, B12, ferro).
- A **vesícula** concentra e libera bile sob **CCK**; obstrução por cálculo → cólica/icterícia obstrutiva.

## Pâncreas
- **Exócrino** (98% da massa): acinos produzem enzimas (amilase, lipase, proteases inativas) e o ducto, **bicarbonato** (neutraliza o quimo ácido, sob secretina).
- As proteases são ativadas só no intestino (tripsinogênio → tripsina pela enteroquinase) — a ativação prematura dentro do pâncreas causa **pancreatite aguda**.
- **Endócrino**: ilhotas (insulina/glucagon) — ver módulo Endócrino.
- **Fibrose cística**: muco espesso obstrui ductos pancreáticos → insuficiência digestiva.`
    },
    {
      id: 'grosso',
      titulo: 'Intestino grosso e microbiota',
      texto: `O cólon (~1,5 m) recebe ~1,5 L de fluido diário e reabsorve **~90% da água** (junto com Na⁺ e Cl⁻), transformando o quimo em fezes (~150 g/dia).

## Motilidade e flora
- Movimentos de **massa** (1–3×/dia, geralmente pós-prandiais — reflexo gastrocólico) empurram o material distalmente; a defecação coordena reto, ângioesplênico e esfíncteres (interno liso involuntário; **externo esquelético voluntário**).
- **Microbiota** (trilhões de bactérias): fermentam fibra → **ácidos graxos de cadeia curta** (nutrem colonócitos), sintetizam **vitamina K e algumas B**, treinam o sistema imune; o desequilíbrio (disbiose) associa-se a diarreia, SII e colite.
- A fermentação produz gases (H₂, CH₄) — flatulência.

## Distúrbios funcionais
- **Diarreia**: trânsito rápido/secretora/infecciosa (cólera ativa adenilato ciclase → secreção maciça de Cl⁻/água).
- **Constipação**: trânsito lento, pouca fibra/água.
- **Câncer colorretal**: rastreio por colonoscopia; a maioria adeno-carcinomas segue sequência pólipo → câncer.
- **Apendicite, diverticulite, SII** — o eixo intestino-cérebro explica muito da sintomatologia funcional.`
    },
    {
      id: 'regulacao-digestiva',
      titulo: 'Regulação neural e hormonal da digestão',
      texto: `A digestão é orquestrada pelo **sistema nervoso entérico** (o "segundo cérebro": 100 milhões de neurônios, plexos de Meissner e Auerbach) modulado pelo **vago** e por **hormônios intestinais**. A regra geral: **parassimpático/vago e hormônios "crescem" digestivas; simpático trava** (prioriza luta ou fuga).

## Hormônios digestivos-chave
- **Gastrina** (células G, antro): ↑ HCl, trofismo da mucosa. Estimulada por peptídeos e distensão; inibida por pH < 2 (feedback negativo). Excesso: síndrome de Zollinger-Ellison.
- **Secretina** (duodeno, pH ácido): ↑ HCO₃⁻ pancreático e biliar — o "antiácido hormonal".
- **CCK (colecistoquinina)** (duodeno, gorduras/proteínas): contração da vesícula, enzimas pancreáticas, relaxa o esfíncter de Oddi, dá saciedade.
- **GIP e GLP-1 (incrétinas)**: insulinotrópicas quando há glicose — alvo dos medicamentos para diabetes (inibidores de DPP-4, agonistas de GLP-1 como o Ozempic, que também retardam o esvaziamento gástrico e reduzem o apetite).
- **Motilina**: ondas migratórias do jejum (medicada a "limpeza" entre refeições); eritromicina é agonista (procinético).

## Fases da secreção gástrica
1. **Céfálica** (30%): pensar/cheirar/comer → vago.
2. **Gástrica** (60%): distensão e peptídeos → gastrina.
3. **Intestinal** (10%): quimo no duodeno — e daí em diante **secretina e CCK assumem**, coordenando pâncreas, bile e esvaziamento.

Conexões: o vago também é aferente (saciiedade via nervo vago ao núcleo do tracto solitário) — por isso "comer devagar" sacia antes.`
    }
  ],
  quiz: [
    { p: 'A digestão de carboidratos começa na boca por ação da:', alternativas: ['Pepsina', 'Amilase salivar', 'Lipase lingual apenas', 'Tripsina'], correta: 1, explicacao: 'A α-amilase salivar hidrolisa o amido em maltose/dextrinas ainda na boca.' },
    { p: 'O peristaltismo esofágico é coordenado para empurrar o bolo até o estômago, cuja entrada é controlada pelo:', alternativas: ['Piloro', 'Esfíncter esofágico inferior', 'Ângulo de His apenas', 'Esfíncter anal interno'], correta: 1, explicacao: 'O EEI relaxa para o bolo passar e fecha para impedir o refluxo.' },
    { p: 'As células parietais gástricas secretam:', alternativas: ['Pepsinogênio', 'HCl e fator intrínseco', 'Mucina', 'Gastrina'], correta: 1, explicacao: 'Parietais: ácido clorídrico (bomba H⁺/K⁺) e fator intrínseco para a absorção de B12.' },
    { p: 'A principal função dos sais biliares é:', alternativas: ['Digerir proteínas', 'Emulsificar gorduras formando micelas', 'Neutralizar o ácido gástrico', 'Ativar a tripsina'], correta: 1, explicacao: 'A emulsificação aumenta a superfície para a lipase pancreática agir.' },
    { p: 'A maior parte da absorção de nutrientes ocorre no:', alternativas: ['Estômago', 'Intestino delgado', 'Cólon', 'Esôfago'], correta: 1, explicacao: 'Vilosidades e enzimas da borda em escova tornam o delgado o sítio de ~90% da absorção.' },
    { caso: 'Homem, 50 anos, queima epigástrica noturna que melhora com alimentos; endoscopia: úlceras duodenais múltiplas; gastrina basal muito elevada.', p: 'O quadro (síndrome de Zollinger-Ellison) causa úlceras duodenais porque:', alternativas: ['A gastrina alta estimula HCl excessivo que ultrapassa a neutralização pancreática do duodeno', 'Há deficiência de fator intrínseco', 'A secretina está suprimida, impedindo o bicarbonato pancreático', 'O refluxo biliar lesa o duodeno diretamente'], correta: 0, explicacao: 'Gastrina (tumor das células G/pancreáticas) → acidese maciça → carga ácida que sobrepõe o HCO₃⁻ pancreático no duodeno → úlcera. A secreção ácida descontrolada quebra o equilíbrio secretina/CCK do duodeno.' },
    { caso: 'Lactente de 9 meses com episódios de desidratação e diarreia osmótica após introdução de leite comum; melhora com fórmula sem lactose.', p: 'O mecanismo da diarreia por intolerância à lactose é:', alternativas: ['Alergia mediada por IgE ao leite', 'Deficiência da lactase da borda em escova: lactose não hidrolisada fica no lúmen e osmoticamente retém água (e é fermentada, gerando gases)', 'Excesso de secretina com secreção de Cl⁻', 'Aceleração do peristaltismo por toxina bacteriana'], correta: 1, explicacao: 'Sem lactase, o dissacarídeo não é absorvido: permanece no lúmen, eleva a osmolaridade e "puxa" água (diarreia osmótica); a fermentação bacteriana produz H₂/CH₄ (distensão, flatos). Diferente da alergia à proteína do leite (imune).' },
    { p: 'Sobre a regulação da digestão (nível de livro):', alternativas: ['A secretina é liberada pelo duodeno em resposta à gordura', 'A secretina responde ao pH ácido do quimo e comanda bicarbonato pancreático; a CCK responde a gorduras/proteínas e comanda enzimas e contração vesicular', 'A gastrina é inibida pela distensão gástrica', 'O vago inibe toda a secreção digestiva'], correta: 1, explicacao: 'Secretina = "hormônio do bicarbonato" (pH ácido); CCK = enzimas + vesícula + saciedade. Gastrina é ESTIMULADA por distensão/peptídeos e inibida por pH < 2 (feedback negativo local).' }
  ]
},

/* ===================== IMUNOLÓGICO ===================== */
{
  id: 'imunologico',
  nome: 'Sistema Imunológico',
  emoji: '🛡️',
  cor: '#34d399',
  resumo: 'Imunidade inata, inflamação, fagocitose, anticorpos, linfócitos T e vacinas.',
  topicos: [
    {
      id: 'visao-geral',
      titulo: 'Inata x adaptativa',
      texto: `A imunologia organiza-se em dois braços que cooperam:

## Imunidade inata (nato, rápida, inespecífica)
- **Barreiras**: pele, mucosas, muco/cílios, acidez gástrica, flora comensal.
- **Células**: neutrófilos, macrófagos, células NK, eosinófilos, mastócitos.
- **Moléculas**: sistema **complemento**, citocinas (IL-1, TNF, interferons), proteínas de fase aguda (CRP).
- Resposta em **minutos a horas**, sem memória, sempre igual (receptores PRR reconhecem padrões microbianos — PAMPs como LPS).

## Imunidade adaptativa (adquirida, específica, com memória)
- **Linfócitos B**: produzem **anticorpos** → imunidade **humoral** (extracelular: bactérias, toxinas, vírus livres).
- **Linfócitos T**: imunidade **celular** — T **citotóxicos (CD8)** matam células infectadas; T **helpers (CD4)** orquestram tudo via citocinas.
- Resposta em **dias**, altamente específica (receptor único por clone) e com **memória** — a base das vacinas.

A ponte entre os dois: as **células apresentadoras de antígeno (APCs)** — macrófagos e células dendríticas — fagocitam o invasor e mostram pedaços (peptídeos) aos linfócitos T no **MHC**. Sem ajuda do inato, o adaptativo não acorda; sem o adaptativo, não há memória (imunodeficiências: HIV destrói CD4; agamaglobulinemia sem anticorpos).`
    },
    {
      id: 'inflamacao',
      titulo: 'Resposta inflamatória',
      texto: `A inflamação é a resposta inata padrão a dano ou infecção, com os sinais clássicos **rubor, tumor, calor e dolor** (e functio laesa):

## Cascata
1. **Reconhecimento**: mastócitos e macrófagos detectam o dano → liberam **histamina**, prostaglandinas, TNF/IL-1.
2. **Vasodilatação** (rubor/calor) e ↑ permeabilidade (tumor — edema): a histamina abre junções endoteliais.
3. **Recrutamento**: células endoteliais expressam **selectinas/integrinas** (marginação, rolamento, adesão); quimiocinas (IL-8, C5a) atraem neutrófilos → **diapedese** (saída entre endoteliócitos) → **quimiotaxia** até o agressor.
4. **Fagocitose** e morte dos agentes; **pus** = neutrófilos mortos + debris + líquido.
5. **Resolução**: macrófagos limpam, antiinflamatórios (lipoxinas) encerram; se persistir o estímulo → inflamação crônica.

Os **sintomas sistêmicos** vêm das citocinas: febre (IL-1/TNF/IL-6 → PGE₂ hipotalâmica), leucocitose, proteínas de fase aguda (CRP/ferritina), e nas infecções graves, SIRS → choque séptico (vasodilatação disseminada). Antiinflamatórios NSAIDs bloqueiam prostaglandinas; corticoides suprimem múltiplos pontos da cascata (e a imunidade, com risco). Explore a simulação abaixo.`,
      interativo: 'inflamacao'
    },
    {
      id: 'inata-celular',
      titulo: 'Fagocitose, NK e complemento',
      texto: `## Fagocitose (neutrófilos e macrófagos)
1. **Quimiotaxia** até o alvo (quimiocinas, C5a, formil-peptídeos bacterianos).
2. **Reconhecimento e opsonização**: complemento (C3b) e anticorpos (IgG) "marcam" o micróbio para receptor do fagócito.
3. **Ingestão**: pseudópodes envolvem → **fagossomo**.
4. **Morte**: fusão com lisossomo (**fagolisossomo**) → explosão respiratória (NADPH oxidase produz ROS), enzimas, defensinas.
5. **Apresentação**: macrófagos/dendríticas ainda exibem peptídeos no MHC-II → ativam linfócitos T (ponte com o adaptativo).

Defeitos: doença granulomatosa crônica (NADPH oxidase deficiente → infecções catalase+), neutropenia grave → sepse.

## Células NK
Matam células "sem crachá": reconhecem a **redução de MHC-I** (vírus e tumores frequentemente o reduzem) e anticorpos na superfície (citotoxicidade dependente de anticorpo). Perforinas/granzimas → apoptose.

## Complemento
Cascata (~30 proteínas) ativada por via **clássica** (anticorpo), **alternativa** (superfície microbiana) ou **lectina** (mannose): gera **C3b** (opsonização), **C5a** (quimiotaxia/anafilatoxina) e **MAC C5b-9** (furo na membrana → lise). Deficiências: infecções recorrentes (C3) ou neisserias (C5–9); desregulação → angioedema (C1-INH), lúpus (C1/C4).`
    },
    {
      id: 'linfocitos-b',
      titulo: 'Linfócitos B e anticorpos',
      texto: `Cada linfócito B tem um **BCR único** (anticorpo de membrana). Quando o antígeno se liga (com ajuda do T helper via CD40-CD40L e IL-4/IL-5), o clone **prolifera** (seleção clonal) e diferencia:

- **Plasmócitos**: fábricas de anticorpos (milhares/segundo), de vida curta (ou longevos na medula).
- **Células de memória**: aguardam reencontro — base da vacinação.

## Estrutura do anticorpo
Duas cadeias pesadas + duas leves; **Fab** (liga antígeno) e **Fc** (efetor). A classe muda (class switch) mantendo a especificidade: **IgM** (primeira, complemento), **IgG** (mais abundante; atravessa placenta, opsoniza), **IgA** (secreções/mucosas, leite), **IgE** (alergia/parasitas, mastócitos), **IgD** (receptor).

## Funções dos anticorpos
- **Neutralização** (bloqueiam toxinas/vírus), **opsonização** (IgG/C3b), **ativação do complemento**, **aglutinação/precipitação**, ADCC (NK).

## Aplicações
- **Vacinas**: antígeno inativo/atenuado/conjugado → memória sem doença.
- **Alergias**: IgE contra alérgenos → mastócito → histamina (rinite, asma, anafilaxia).
- **Imunoterapia**: anticorpos monoclonais (anti-TNF, anti-HER2, anti-PD1).
- **Diagnóstico**: ELISA, testes rápidos (gravidez, HIV), sorologia.`
    },
    {
      id: 'linfocitos-t',
      titulo: 'Linfócitos T e MHC',
      texto: `Os linfócitos T amadurecem no **timo**, onde passam por seleção positiva (reconhecem MHC próprio) e **negativa** (deletam os que atacam "self" — tolerância central; a falha → autoimunidade).

## Apresentação de antígenos
- **MHC-I**: em **todas** as células nucleadas; mostra peptídeos **intracelulares** (vírus, tumores) → ativa **CD8 citotóxicos**.
- **MHC-II**: em **APCs profissionais** (dendríticas, macrófagos, B); mostra peptídeos **fagocitados extracelulares** → ativa **CD4 helpers**.

## Efetores
- **CD8 citotóxico**: reconhece MHC-I + peptídeo → libera **perforina/granzimas** (apoptose) e Fas-FasL; mata células infectadas uma a uma.
- **CD4 helper**: 
  - **Th1** (IFN-γ): ativa macrófagos (intracelulares).
  - **Th2** (IL-4/5): ajuda B (anticorpos, eosinófilos, parasitas/alergia).
  - **Th17**: recruta neutrófilos, mucosas.
  - **Treg** (IL-10/TGF-β): **limita** a resposta — tolerância periférica.

## Rejeição de transplantes e clínica
O MHC (HLA) é altamente polimórfico — a incompatibilidade gera rejeição mediada por T. Fármacos: calcineurina-inibidores (ciclosporina), anti-proliferativos (azatioprina, MPA), corticoides. O **HIV** destrói CD4 → aids; a contagem de CD4 guia profilaxias. Hipersensibilidade tardia (contato, tuberculina) é mediada por T, não por anticorpos.`
    },
    {
      id: 'memoria-vacinas',
      titulo: 'Memória imunológica e vacinas',
      texto: `## Resposta primária x secundária
- **Primária** (1º contato): período de latência de dias, IgM→IgG modesta, o indivíduo pode adoecer.
- **Secundária** (reencontro): células de memória B e T respondem em **horas**, títulos de IgG **10–100× maiores**, afinidade maior (hipermutação somática) — o micróbio é eliminado antes dos sintomas. É por isso que doenças como sarampo e varicela normalmente só ocorrem uma vez.

## Vacinas
Estratégias para gerar memória sem a doença:
- **Atenuadas** (sarampo, rubéola, polio Sabin, varicela): resposta forte e durável; contraindicadas em imunossuprimidos/grávidas.
- **Inativadas** (polio Salk, raiva, gripe): seguras, exigam reforços.
- **Subunidades/conjugadas** (HepB, pneumocócica, Hib): antígeno isolado; conjugação melhora resposta infantil.
- **Toxoides** (tétano, difteria): toxina inativada.
- **mRNA** (Covid, RSV): o próprio corpo produz o antígeno.
- Adjuvantes (alumínio, MF59) ampliam a resposta; **calendário vacinal** garante os reforços.

**Imunidade passiva**: anticorpos prontos — transplacentária (recém-nascido), colostro, imunoglobulinas (antitetânica, antirrábica, IVIG). Protege rápido, dura semanas, sem memória.

O paradoxo do sucesso: com coberturas altas, a imunidade de grupo protege os não-vacinados; quando cai (<95% para sarampo), surtos voltam.`
    },
    {
      id: 'hipersensibilidades',
      titulo: 'Hipersensibilidades: quando a imunidade erra o alvo',
      texto: `Classificação de Gell & Coombs — mecanismos de doença imune:

## Tipo I — imediata (IgE, minutos)
Primeiro contato: IgE fixa-se a mastócitos; reexposição → degranulação → **histamina**: rinite, asma, urticária, **anafilaxia** (hipotensão, edema de via aérea — adrenalina IM é o tratamento). Prick test e IgE sérica. Hiper-reatividade brônquica = asma (tratar com broncodilatador + corticoide inalatório).

## Tipo II — citotóxica (IgG contra célula, horas)
Anticorpo opsoniza células próprias → fagocitose/complemento: **anemia hemolítica autoimune**, púrpura trombocitopênica imune, eritroblastose fetal (anti-Rh), transfusão incompatível. Teste de Coombs direto positivo.

## Tipo III — imunocomplexos (IgG-antígeno, dias)
Complexos depositam-se em vasos articulares/glomerulares → complemento → inflamação: **lúpus** (rash renal/articular), glomerulonefrite pós-estreptocócica, soro doença. Consumo de C3/C4.

## Tipo IV — tardia (linfócitos T, 48–72 h)
Sem anticorpos: TCD4 memória recrutam macrófagos: **teste da tuberculina (PPD)**, dermatite de contato (níquel, hera), enxerto contra hospedeiro, rejeição de transplante. Tratamento: corticoide/imersão da resposta celular.

## Autoimunidade em resumo
Perda de **tolerância** (central no timo ou periférica por Treg): HLA, hormônios e gatilhos ambientais. Exemplos: Hashimoto, Graves, DM1, esclerose múltipla, lúpus. Tratamentos: imunossupressão, anticorpos monoclonais (anti-TNF, anti-CD20).`
    }
  ],
  quiz: [
    { p: 'A resposta imune inata caracteriza-se por:', alternativas: ['Especificidade a um único antígeno', 'Rapidez e ausência de memória', 'Produção de anticorpos apenas', 'Depender de linfócitos B'], correta: 1, explicacao: 'O sistema inato responde em minutos, sem especificidade antigênica e sem memória.' },
    { p: 'Os sinais cardinais da inflamação (rubor, calor, tumor, dor) decorrem principalmente de:', alternativas: ['Linfócitos T citotóxicos', 'Vasodilatação e aumento da permeabilidade vascular', 'Anticorpos IgE', 'Complemento MAC'], correta: 1, explicacao: 'Histamina e prostaglandinas dilatam os vasos e abrem as junções endoteliais → mais fluxo e edema.' },
    { p: 'O MHC-I apresenta antígenos para:', alternativas: ['CD4 helper', 'CD8 citotóxico', 'Linfócitos B', 'Células NK apenas'], correta: 1, explicacao: 'Peptídeos intracelulares no MHC-I ativam CD8; MHC-II (APCs) ativa CD4.' },
    { p: 'A IgE está envolvida principalmente em:', alternativas: ['Imunidade transplacentária', 'Reações alérgicas e parasitárias (mastócitos)', 'Opsonização bacteriana', 'Ativação do complemento clássico'], correta: 1, explicacao: 'IgE lina receptores Fc de mastócitos/basófilos → histamina → alergia; também defesa contra helmintos.' },
    { p: 'A resposta vacinal baseia-se na:', alternativas: ['Imunidade passiva', 'Memória imunológica gerada sem doença', 'Transferência de anticorpos maternos', 'Supressão do sistema imune'], correta: 1, explicacao: 'Vacinas expõem a antígenos seguros → células B/T de memória → resposta rápida e ampla no reencontro.' },
    { caso: 'Adolescente, 16 anos, após antibiótico (penicilina) apresenta urticária generalizada, edema labial e estridor 20 min após a dose; PA 80/50.', p: 'O mecanismo da anafilaxia por penicilina é hipersensibilidade:', alternativas: ['Tipo I (IgE → mastócito → histamina): resposta em minutos', 'Tipo II citotóxica', 'Tipo III por imunocomplexos', 'Tipo IV tardia mediada por linfócitos T'], correta: 0, explicacao: 'Reexposição ao fármaco (hapteno) cruza IgE fixada em mastócitos → degranulação rápida (histamina) → vasodilatação/edema/broncoconstrição. Tratamento imediato: adrenalina intramuscular.' },
    { caso: 'Criança, 5 anos, há 10 dias com infecção respiratória; agora surge edema em pálpebras e pernas, hipertensão e urina "cor de coca-cola"; complemento C3 baixo.', p: 'A glomerulonefrite pós-estreptocócica é hipersensibilidade:', alternativas: ['Tipo I por IgE', 'Tipo II citotóxica', 'Tipo III: imunocomplexos estafilocócico-anticorpo depositados no glomérulo com consumo de complemento', 'Tipo IV tardia'], correta: 2, explicacao: 'Complexos antígeno-anticorpo circulantes depositam-se no glomérulo, ativam complemento (C3 baixo) e atraem neutrófilos → hematúria dismórfica, edema e hipertensão ~2 semanas após a faringite.' },
    { p: 'A resposta imune adaptativa difere da inata porque (nível de livro):', alternativas: ['Age em minutos e sem especificidade', 'É clonal, específica e gera memória; seu repertório decorre de recombinação V(D)J', 'Não depende de apresentação de antígeno em MHC', 'Envolve apenas proteínas de fase aguda'], correta: 1, explicacao: 'Recombinação V(D)J gera milhões de receptores únicos (BCR/TCR); seleção clonal expande o clone específico e deixa memória — base da vacinação e da sorologia.' }
  ]
},

/* ===================== FLUIDOS E ELETRÓLITOS ===================== */
{
  id: 'fluidos',
  nome: 'Fluidos e Eletrólitos',
  emoji: '💧',
  cor: '#60a5fa',
  resumo: 'Compartimentos líquidos, osmolaridade, sódio, potássio e equilíbrio ácido-base.',
  topicos: [
    {
      id: 'compartimentos',
      titulo: 'Compartimentos líquidos',
      texto: `A água corresponde a **50–60% do peso corporal** (~42 L num adulto de 70 kg) e distribui-se:

- **Líquido intracelular (LIC)**: ~2/3 do total (~28 L) — o "volume de trabalho" das células.
- **Líquido extracelular (LEC)**: ~1/3 (~14 L), dividido em **plasma** (~3 L, dentro dos vasos) e **líquido interstício** (~11 L, banhando as células). O plasma é o "espelho" analisado nos exames.

## Composição iônica
- **LEC**: Na⁺ (~142 mEq/L) é o principal cátion; Cl⁻ e HCO₃⁻ os ânions.
- **LIC**: K⁺ (~140 mEq/L) e fosfato/proteínas dominam.
- A **bomba Na⁺/K⁺** mantém essa assimetria, e a **osmolaridade** (≈ 280–296 mOsm/kg) é **igual** nos dois compartimentos — a água move-se livremente entre eles por osmose.

## Movimentos
- Água atravessa capilares conforme forças de **Starling** (pressão hidrostática × oncótica — a albumina retém água no vaso; sua queda → edema).
- Entre LIC e LEC, a osmolaridade manda: alterar o Na⁺ (LEC) ou os solutos intracelulares move água para dentro ou fora das células. Explore a simulação abaixo.`,
      interativo: 'compartimentos'
    },
    {
      id: 'agua-osmolaridade',
      titulo: 'Equilíbrio de água e osmolaridade',
      texto: `O corpo ganha ~2,5 L/dia (bebida 1,2 + comida 1 + metabólica 0,3) e perde igualmente (urina 1,5 + pele/pulmão 0,9 + fezes 0,1). O balanço é controlado por **sede e ADH**:

## Detecção e resposta
- Osmorreceptores hipotalâmicos disparam quando a osmolaridade sobe >1–2%:
  1. **Sede** (bebemos).
  2. **ADH** (neuro-hipófise) → aquaporinas-2 no ducto coletor → água reabsorvida → urina concentrada (até 1.200 mOsm/L).
- Osmolaridade baixa → ADH suprimida → diurese diluída (até 50 mOsm/L).

## Perturbações
- **Desidratação hipertônica** (perda de água > solutos: febre, hiperventilação, diabetes insipidus): Na⁺ ↑, células encolhem — sede intensa.
- **Hiponatremia hipotônica** (água em excesso relativo, SIADH, IRC, polidipsia): água entra nas células → edema cerebral (cefaleia, confusão, convulsões). Correção deve ser **lenta** (risco de desmielinização pontina).
- **Excesso isotônico** (sobrecarga de sódio e água, ex.: infusões): volume ↑ sem alterar osmolaridade → edema/ICC.

A ureia e a glicose contribuem para a osmolaridade medida, mas só os "solutos efetivos" (Na⁺ e seus anions) movem água entre os compartimentos — hiperglicemia importante "puxa" água das células (Na⁺ medido dilui-se: cada 100 mg/dL de glicose acima de 100 reduz Na⁺ ~1,6 mEq/L).`
    },
    {
      id: 'sodio',
      titulo: 'Sódio e volume extracelular',
      texto: `A regra prática: **o Na⁺ determina o volume do LEC; a água determina a concentração de Na⁺**.

## Homeostase
- **Entrada**: dieta (~8–10 g de sal/dia recomendado < 5 g).
- **Saída**: rim (filtrado 25.000 mEq/dia, 99% reabsorvido) — o ponto de controle.

## Controle efetor
- **SRAA** (↓ volume/pressão): renina → angiotensina II → retenção de Na⁺ e água + vasoconstrição + aldosterona (Na⁺ em troca de K⁺/H⁺ no ducto coletor).
- **ANP/BNP** (↑ volume, distensão atrial): natriurese e vasodilatação.
- **Simpático** e **pressão de filtração** (pressão-natriurese) ajustam fino.

## Clínica
- **Hiponatremia** (< 135): sintomas neurológicos; classificar por osmolaridade e volemia (hipovolêmica: perdas com reposição de água pura — ex., tiazídicos; euvolêmica: SIADH; hipervolêmica: ICC, cirrose, síndrome nefrótica).
- **Hipernatremia** (> 145): sempre hipovolemia de água livre — desidratação, diabetes insipidus; corrige-se com água (VO ou glicosada).
- **Edema**: retenção renal de Na⁺ com distribuição intersticial (ICC, cirrose, nefrótico) — restrição de sal + diuréticos.`
    },
    {
      id: 'potassio',
      titulo: 'Potássio',
      texto: `O **K⁺** (3,5–5,0 mEq/L) é o cátion intracelular e determina o **potencial de repouso** — pequenas variações plasmáticas mudam a excitabilidade cardíaca e neuromuscular (o pool intracelular é ~4.000 mEq; o extracelular, ~70 mEq).

## Distribuição internas (shifts)
- K⁺ entra na célula com **insulina** (co-garra com Na⁺-K⁺-ATPase), **β₂-agonistas** (salbutamol), **alcalose** (H⁺ sai/K⁺ entra).
- K⁺ sai na **acidose**, hemólise, exercício intenso, hiperosmolaridade, bloqueadores β, digoxina (inibe a bomba).

## Eliminação renal (e fecal)
- Filtrado livremente; 65% reabsorvido no proximal, 25% na alça; o ajuste fino é a **secreção no ducto coletor**: ↑ com **aldosterona**, alto fluxo distal (diuréticos), dieta rica em K⁺ e alcalose.
- A insuficiência adrenal (Addison) retém K⁺; a insuficiência renal crônica limita a excreção — hiperkalemia.

## Clínica
- **Hiperkalemia**: parestesias, fraqueza; ECG com **T tendido (picuda)**, alargamento QRS → parada. Tratamento: estabilizar membrana (**cálcio IV**), empurrar K⁺ para dentro (insulina+glicose, salbutamol, bicarbonato) e remover (diuréticos, resinas, diálise).
- **Hipokalemia**: fraqueza, íleo, arritmias (extrasístoles, U waves), rabdomiólise grave. Causas: vômitos (perde H⁺ e K⁺), diuréticos, hiperaldosteronismo, refeeding.`
    },
    {
      id: 'acido-base',
      titulo: 'Equilíbrio ácido-base',
      texto: `O pH arterial normal é **7,35–7,45** ([H⁺] ~40 nmol/L) — vida difícil fora disso, pois enzimas e canais dependem do pH. O corpo gera ácido constante (CO₂ volátil ~15.000 mmol/dia + ácidos fixos ~70 mEq/dia da dieta/proteínas).

## Os três mecanismos de defesa
1. **Tampões** (instantâneos): bicarbonato/CO₂ (H-H: pH = 6,1 + log(HCO₃⁻/(0,03×PCO₂))), proteínas, hemoglobina e fosfato.
2. **Respiratório** (minutos): ↑ ventilação elimina CO₂ (alcaliniza), ↓ ventilação retém CO₂ (acidifica).
3. **Renal** (horas-dias): reabsorve HCO₃⁻, excreta H⁺ (tampão por fosfato e NH₄⁺) e gera novo bicarbonato.

## Distúrbios primários e compensação
- **Acidose metabólica** (HCO₃⁻ ↓): cetoacidose diabética, láctica, diarréia (perde HCO₃⁻), IRC. Compensação: hiperventilação de Kussmaul.
- **Alcalose metabólica** (HCO₃⁻ ↑): vômitos, diuréticos, hipocalemia.
- **Acidose respiratória** (PCO₂ ↑): hipoventilação (DPOC, opioids) — o rim retém HCO₃⁻.
- **Alcalose respiratória** (PCO₂ ↓): hiperventilação (ansiedade, altitude, dor) — parestesias/carpopedal por ↓ Ca iônico.

A regra das compensações esperadas (ex.: Winter: PCO₂ esperado = 1,5×HCO₃⁻+8) e o **anion gap** (Na⁺ − (Cl⁻+HCO₃⁻), normal ~12) separam as causas — gap alto: MUDPILES (metanol, ureia, DKA, propilenoglicol, isoniazida, lactato, etilenoglicol, salicilatos).`
    },
    {
      id: 'reposicao',
      titulo: 'Terapia hídrica na prática: soluções IV',
      texto: `Prescrever fluidos é aplicar os compartimentos na prática:

## Onde cada solução vai
- **Soro fisiológico 0,9%** (Na 154, Cl 154 — isotônica): fica no LEC → reposição de volume vascular (mas o Cl alto pode causar acidose hiperclorêmica).
- **Ringer lactato** (Na 130, K 4, Ca, lactato como buffer): preferido em reposição volumosa e cirurgias; o lactato é metabolizado em bicarbonato.
- **Solução glicosada 5%**: é **água livre** — a glicose é metabolizada e a água distribui-se 2/3 para dentro das células; serve para hidratação/mantenção, não para expandir vaso.
- **Sal hipertônico 3%**: puxa água do LIC — usada na hiponatremia grave sintomática (com correção LIMITADA: máx. 8–10 mEq/L/dia, risco de mielinólise pontina).
- **Coloides (albumina)**: ficam no vaso (oncótica) — escolhida em albumina sérica muito baixa; em geral não superam cristaloides no choque.

## Cálculo rápido
Déficit de água na hipernatremia: Água = 0,6 × peso × (Na/140 − 1). Reposição de manutenção: ~30–35 mL/kg/dia (4-2-1 pediatria) + perdas (febre +10–13%/°C, vômito/drenagens contabilizados).

## Sinais de volemia à beira do leito
Hipotensão, taquicardia, mucosa seca, pele com turgor diminuído, oligúria (< 0,5 mL/kg/h) e, no grave, letargia. A resposta da diurese e do lactato é o melhor "sensor" da reposição — monitorar, não só prescrever.`
    }
  ],
  quiz: [
    { p: 'A maior parte da água corporal está no:', alternativas: ['Plasma', 'Líquido interstício', 'Líquido intracelular', 'Líquor'], correta: 2, explicacao: 'O LIC concentra ~2/3 da água total (~28 L de 42 L); o LEC (plasma+interstício) tem ~1/3.' },
    { p: 'O principal cátion do líquido extracelular é o:', alternativas: ['K⁺', 'Na⁺', 'Ca²⁺', 'Mg²⁺'], correta: 1, explicacao: 'Na⁺ (~142 mEq/L) domina o LEC e é o principal determinante da osmolaridade extracelular.' },
    { p: 'Na hiponatremia hipotônica, a água:', alternativas: ['Sai das células', 'Entra nas células, que incham', 'Fica só no vaso', 'É excretada imediatamente'], correta: 1, explicacao: 'LEC hipotônico → osmose para dentro da célula → edema celular, incluindo o cérebro (risco de convulsão).' },
    { p: 'O potássio plasmático é empurrado para dentro das células por:', alternativas: ['Acidose', 'Insulina e β₂-agonistas', 'Exercício intenso', 'Digoxina'], correta: 1, explicacao: 'Insulina e β₂-agonistas ativam a Na⁺/K⁺-ATPase — por isso fazem parte do tratamento da hiperkalemia.' },
    { p: 'Na acidose metabólica, a compensação respiratória é:', alternativas: ['Hipoventilação', 'Hiperventilação (respiração de Kussmaul)', 'Apneia', 'Bradipneia profunda'], correta: 1, explicacao: 'Eliminar CO₂ eleva o pH; a hiperventilação profunda e rápida de Kussmaul é típica da cetoacidose.' },
    { caso: 'Idosa, 80 anos, pneumonia e vômitos há 2 dias: Na⁺ 122, uréia alta, mucosas secas, FC 108.', p: 'A fisiologia da hiponatremia dela é:', alternativas: ['SIADH euvolêmico', 'Hipovolêmica: perdas de água e sal (vômitos) com reposição de água pura — ADH alto não-osmótico retém água', 'Polidipsia primária', 'Pseudohiponatremia por hiperlipidemia'], correta: 1, explicacao: 'Depleção de volume ativa ADH (sinal não osmótico): água retida em excesso relativo ao Na⁺ → hiponatremia hipovolêmica (uréia alta e taquicardia distinguem do SIADH, que é euvolêmico).' },
    { caso: 'Homem, 60 anos, DPOC descompensado: pH 7,25, PaCO₂ 75, HCO₃⁻ 32 mEq/L.', p: 'O distúrbio e a compensação são:', alternativas: ['Acidose metabólica com compensação respiratória', 'Acidose respiratória crônica/aguda com retenção renal compensatória de HCO₃⁻', 'Alcalose metabólica', 'Acidose respiratória aguda sem qualquer compensação (HCO₃⁻ ainda normal)'], correta: 1, explicacao: 'PaCO₂ alto ↓ pH = acidose respiratória. HCO₃⁻ 32 mostra compensação renal já instalada (crônica sobreagudizada).' },
    { p: 'Pela fórmula de Winter (nível de livro), na acidose metabólica com HCO₃⁻ 10 mEq/L, a PCO₂ esperada se a compensação for adequada é:', alternativas: ['PCO₂ = 1,5×HCO₃⁻ + 8 = 23 mmHg', 'PCO₂ = 40 mmHg', 'PCO₂ = 55 mmHg', 'PCO₂ = HCO₃⁻ × 2'], correta: 0, explicacao: 'Winter: PCO₂ esperado = 1,5×[HCO₃⁻] + 8 ± 2 → 23 mmHg. Se o medido difere, há distúrbio respiratório associado — o jeito "de livro" de detectar distúrbios mistos.' }
  ]
}
]};

/* Trilha de estudo na ordem da ementa do curso */
window.FISIO.ordem = [
  'introducao', 'celular', 'nervoso', 'muscular', 'endocrino',
  'digestorio', 'cardiovascular', 'respiratorio', 'urinario',
  'imunologico', 'fluidos'
];
