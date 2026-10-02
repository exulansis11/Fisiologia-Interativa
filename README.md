<div align="center">

# 🫀 Fisiologia Interativa

**O corpo humano, funcionando na sua frente.**

Plataforma gratuita de estudo de fisiologia humana em português, com órgãos anatômicos em 3D, simuladores que calculam a fisiologia em tempo real, casos clínicos e questões comentadas, cobrindo os 11 sistemas.

### [▶ Abrir o app no navegador]([https://SEU-USUARIO.github.io/fisiologia-interativa/](https://exulansis11.github.io/Fisiologia-Interativa/)

![versão](https://img.shields.io/badge/versão-3.1.1-c41e3a)
![sistemas](https://img.shields.io/badge/sistemas-11-1f6feb)
![laboratórios](https://img.shields.io/badge/laboratórios-54-6f42c1)
![questões](https://img.shields.io/badge/questões-261-2da44e)
![offline](https://img.shields.io/badge/funciona-offline-555)

</div>

---

## O que é

O app foi pensado para quem estuda fisiologia (medicina, enfermagem, fisioterapia, farmácia, biomedicina e áreas afins) e quer **ver o mecanismo acontecendo**, em vez de só decorar. Você mexe em um parâmetro (a frequência cardíaca, o K⁺ extracelular, um diurético) e acompanha a resposta do corpo nos gráficos, nos números e no órgão em 3D.

Não precisa de cadastro nem de instalação: o app abre no navegador, funciona no celular e o progresso fica salvo no próprio aparelho.

## Em números

| | |
|---|---|
| **Sistemas** | 11: Introdução, Celular, Nervoso, Muscular, Endócrino, Digestório, Cardiovascular, Respiratório, Urinário, Imunológico e Líquidos/Ácido-base |
| **Tópicos** | 72, cada um com as abas Aprender, Laboratório, Praticar, Clínica e fármacos, Aprofundar e Questões |
| **Laboratórios** | 54, sendo 10 explorações anatômicas em 3D |
| **Práticas guiadas** | 110; muitas têm o objetivo conferido automaticamente pelo simulador |
| **Questões comentadas** | 261, de múltipla escolha e de cálculo |
| **Casos clínicos em etapas** | 52 |
| **Conceitos e flashcards** | 298 |

## Destaques por sistema


- **Introdução**: corpo humano em 3D, termorregulação em tempo real (frio, calor úmido, febre, antitérmico) e curva dose-resposta.
- **Celular**: célula em 3D, difusão × carreador, bomba Na⁺/K⁺ que pode ser desligada, SGLT, osmose na hemácia (com a pegadinha da ureia) e Nernst/Goldman.
- **Nervoso**: encéfalo em 3D; neurônio de Hodgkin–Huxley (limiar, período refratário, TTX, lidocaína, TEA, hipercalemia); mielina; sinapse com somação; treinador de fármacos autonômicos.
- **Muscular**: braço em 3D, sarcômero animado (comprimento-tensão), somação e tétano, força-velocidade e monitor de TOF com rocurônio, succinilcolina, neostigmina e sugamadex.
- **Endócrino**: glândulas em 3D; eixos tireoidiano e adrenal com feedback e casos misteriosos; glicemia pelo modelo de Bergman; cálcio/PTH; ciclo menstrual.
- **Digestório**: trato digestório em 3D, esvaziamento gástrico, pH gástrico de 24 h (IBP, anti-H₂, gastrinoma, *H. pylori*), má absorção e icterícias.
- **Cardiovascular**: coração em 3D sincronizado com o modelo hemodinâmico (Wiggers e alça pressão-volume); ECG; barorreflexo; curvas de Guyton; Starling; Poiseuille; coagulograma.
- **Respiratório**: pulmões em 3D; espirometria (curva fluxo-volume, broncodilatador); trocas gasosas (gradiente A-a, teste do O₂, shunt × V/Q); curva da hemoglobina (incluindo CO); controle da ventilação.
- **Urinário**: rins em 3D, glomérulo com forças de Starling e autorregulação (AINE, IECA), clearance/FENa e LRA, diuréticos por segmento e teste de restrição hídrica.
- **Imunológico**: órgãos linfoides em 3D, curso de uma infecção (neutropenia, corticoide, memória), IgM/IgG e vacinas, leucograma e hipersensibilidades.
- **Líquidos e ácido-base**: Darrow–Yannet, correção de sódio (Adrogué–Madias) e hiponatremias, potássio e ECG, gasometria em 5 passos com modo treino e hidratação 4-2-1.

Além disso, o app tem:
- **Atlas do corpo** na página inicial: gire o corpo e clique em um órgão para abrir o sistema.
- **Conexões** entre os sistemas, com 6 cenários integrados (hemorragia, exercício, altitude, jejum, diarreia e sepse).
- **Modo plantão**, com casos cronometrados de vários sistemas.
- **Flashcards** com repetição espaçada, **simulados**, **painel de progresso** com pontos fracos, busca e glossário.

## Como usar

**No navegador (recomendado):** abra o [link do app](https://SEU-USUARIO.github.io/fisiologia-interativa/). Funciona em computador, tablet e celular.

**Sem internet:** baixe este repositório (botão verde **Code → Download ZIP**), descompacte e abra o `index.html` com dois cliques.

**Como aplicativo instalado:** há versões para Linux (`.deb`) e Windows (`.exe`) na aba [**Releases**](../../releases).
- **Linux (Ubuntu, Mint, Debian):** `sudo apt install ./fisiologia-interativa_3.1.1_amd64.deb`
- **Windows 10/11:** execute o `Fisiologia-Interativa-Setup-3.1.1.exe`. Como o instalador não é assinado digitalmente, o SmartScreen pode avisar: clique em *Mais informações → Executar assim mesmo*.

> **O 3D não aparece?** O navegador provavelmente está com a aceleração gráfica (WebGL) desligada. No Chrome ou no Edge, vá em *Configurações → Sistema*, ative **"Usar aceleração gráfica quando disponível"** e reinicie o navegador. O restante do app funciona normalmente mesmo sem o 3D.

## Estrutura do repositório

```
index.html      página do app
app.js          aplicação (gerada pelo esbuild)
style.css       estilos
fonts.css       fontes locais (Sora, Source Sans 3, JetBrains Mono)
fonts/          arquivos das fontes
models/         modelos 3D, carregados sob demanda
capturas/       imagens deste README
```

É um site estático: não precisa de servidor, banco de dados nem conta. Ele é publicado pelo **GitHub Pages** (*Settings → Pages → Deploy from a branch → main / root*).

## Tecnologias

- JavaScript puro empacotado com [esbuild](https://esbuild.github.io/)
- [Three.js](https://threejs.org/) para os órgãos em 3D
- Simuladores escritos do zero, com modelos clássicos: elastância variável (Suga & Sagawa), Hodgkin–Huxley, Goldman–Hodgkin–Katz, modelo mínimo de Bergman, curva de Hill, equação do gás alveolar, forças de Starling, Gordon–Huxley–Julian, Adrogué–Madias, Darrow–Yannet, Henderson–Hasselbalch, fórmula de Winter e ânion gap
- [Electron](https://www.electronjs.org/) para as versões de desktop

## Créditos e licenças

- **Autor:** Genésio Martins de Aguiar Neto. Instagram: [@g.m.netto](https://www.instagram.com/g.m.netto/)
- **Código e textos:** © Genésio M. A. Neto. Todos os direitos reservados.
- **Modelos 3D** (coração, encéfalo, pulmões, rins, digestório, glândulas, braço e corpo): derivados do [BodyParts3D](https://lifesciencedb.jp/bp3d/), © The Database Center for Life Science, licenciados sob [CC BY-SA 2.1 JP](https://creativecommons.org/licenses/by-sa/2.1/jp/). Os modelos foram recortados, agrupados, simplificados e comprimidos, e os arquivos derivados da pasta `models/` seguem a mesma licença. Referência: Mitsuhashi N. et al. *Nucleic Acids Res.* 2009;37:D782–5.
- A tireoide e a célula são modelos próprios.
- **Three.js:** licença MIT.

## Aviso

Este é um material **educacional**. Os simuladores são modelos didáticos que reproduzem relações de causa e efeito e valores típicos de livros-texto, mas **não são validados para uso clínico**. O app não substitui livros-texto, aulas nem orientação médica.

---

<div align="center">
Feito para quem quer entender a fisiologia de verdade · <a href="https://www.instagram.com/g.m.netto/">@g.m.netto</a>
</div>
