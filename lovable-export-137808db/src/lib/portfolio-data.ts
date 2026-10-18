export const GITHUB = "https://github.com/saif-pixel1";
export const EMAIL = "saifakhtar43528@gmail.com";

export const socials = [
  { id: "github", label: "GitHub", href: GITHUB },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/saif-mansuri-a96580380/" },
  { id: "x", label: "X", href: "https://x.com/AidsB69442" },
  { id: "reddit", label: "Reddit", href: "https://www.reddit.com/user/saifmansuri2007/" },
  { id: "discord", label: "Discord", href: "https://discord.com/users/1406178130590437528" },
  { id: "twitch", label: "Twitch", href: "https://www.twitch.tv/saifmansuri2007" },
  { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/saifmansuri2007/" },
  { id: "codeforces", label: "Codeforces", href: "https://codeforces.com/profile/saifakhtar43528" },
  { id: "email", label: "Email", href: `mailto:${EMAIL}` },
] as const;

export type Link = { label: string; href: string };

export const research = [
  {
    no: "01",
    title: "Adaptive Fractional Calculus-Based Optimization for Streaming Machine Learning under Concept Drift",
    status: "Published · ResearchGate",
    question:
      "Can an optimizer for streaming data use information from past gradients — weighted the way fractional derivatives weight history — while still reacting quickly when the data distribution shifts?",
    summary:
      "Fractional-order derivatives carry a memory of a function's past, with weights that decay over earlier points. This work studies that idea as an inspiration for gradient-based updates in online learning, where a model sees one sample or mini-batch at a time and the underlying distribution may drift.",
    method:
      "A gradient-history update of the form θₜ₊₁ = θₜ − ηₜ Σₖ wₖ(αₜ) gₜ₋ₖ is one formulation explored in the portfolio notes; see the publication for the exact method, assumptions and experiments.",
    links: [
      { label: "Read Publication", href: "https://www.researchgate.net/publication/415149955_Adaptive_Fractional_Calculus-Based_Optimization_for_Streaming_Machine_Learning_under_Concept_Drift" },
    ] as Link[],
  },
  {
    no: "02",
    title: "HELIX — NEUROGENISIS",
    status: "Research prototype · Zenodo record",
    question:
      "How can a learning system keep adapting to a changing data stream without discarding what it learned before?",
    summary:
      "A research-oriented machine-learning prototype around adaptation to concept drift and retention of earlier knowledge, with replay-style retention as a design direction. Its design draws loose inspiration from biological development; it does not claim to reproduce biological mechanisms.",
    method:
      "Implementation, modules and evaluation details live in the repository and the supporting project document.",
    links: [
      { label: "Read Publication", href: "https://zenodo.org/records/22802297" },
      { label: "View Code", href: "https://github.com/saif-pixel1/NEUROGENISIS" },
      { label: "View Documentation", href: "https://drive.google.com/file/d/1HwzF1TJ6c1parC4hRwZTypOTcaNXY47y/view?usp=sharing" },
    ] as Link[],
  },
  {
    no: "03",
    title: "Adaptive Ensemble Learning",
    status: "Technical study",
    question:
      "When several learners disagree, how should their predictions be combined?",
    summary:
      "A study of an adaptive multinomial blending ensemble: base learners produce class probabilities that a meta-model (XGBoost is the candidate under study) learns to combine. The motivation is complementary error patterns between models — no claim of superiority is made without comparative experiments.",
    method: "Presented as a technical study until a public implementation and comparative results are available.",
    links: [] as Link[],
  },
];

export type Project = {
  name: string;
  category: string;
  status: string;
  desc: string;
  detail: string;
  tech: string[];
  links: Link[];
};

export const secondary: Project[] = [
  {
    name: "Twitter Data Mining with Python",
    category: "NLP · Data mining",
    status: "Released",
    desc: "Text mining over tweet data: cleaning, tokenisation and term-frequency style exploration.",
    detail:
      "A Python project exploring tweet text. See the repository for the exact preprocessing, analysis and visualisations implemented; the Zenodo record archives the release.",
    tech: ["Python", "Pandas", "Matplotlib"],
    links: [
      { label: "GitHub", href: "https://github.com/saif-pixel1/twitter-data-mining-with-python" },
      { label: "Zenodo", href: "https://zenodo.org/records/22164786" },
    ],
  },
  {
    name: "Stock Market Analysis & Risk Engine",
    category: "Quant · Data science",
    status: "Released",
    desc: "Analysis of historical market data with a risk-oriented view of returns.",
    detail:
      "Explores price series and risk measures from historical data. Outputs are analytical, not investment advice; check the repository for the specific methods.",
    tech: ["Python", "NumPy", "Pandas"],
    links: [{ label: "GitHub", href: "https://github.com/saif-pixel1/Stock-market-analysis-risk-engine-prediction" }],
  },
  {
    name: "MicroGrad — Scalar Autodiff Engine",
    category: "Deep learning internals",
    status: "Study build",
    desc: "A scalar computational graph with reverse-mode automatic differentiation.",
    detail:
      "Each operation records its inputs; backpropagation walks the graph in reverse topological order applying the chain rule, enough to train small neurons and MLPs from scratch.",
    tech: ["Python"],
    links: [],
  },
  {
    name: "Quantitative Market Simulation Engine",
    category: "Simulation",
    status: "Study build",
    desc: "Monte Carlo simulation of price trajectories.",
    detail:
      "Generates many simulated paths to study the spread of outcomes. Simulated trajectories describe a model's assumptions, not reliable real-world forecasts.",
    tech: ["Python", "NumPy"],
    links: [],
  },
  {
    name: "AI-Based Exoplanet Detection",
    category: "Applied ML",
    status: "In development",
    desc: "Classifying planetary transit signals in stellar light curves.",
    detail: "Early-stage work on detecting transit dips in light-curve data. Scope and data sources will be documented as it matures.",
    tech: ["Python"],
    links: [],
  },
];

export const stack = [
  { group: "Programming", items: ["Python", "Java"] },
  { group: "Machine Learning", items: ["Supervised", "Unsupervised", "Ensembles", "Streaming ML"] },
  { group: "Deep Learning", items: ["PyTorch", "Neural networks", "Autodiff"] },
  { group: "Data Science", items: ["NumPy", "Pandas", "Matplotlib", "Statistics", "EDA"] },
  { group: "NLP", items: ["Text processing", "Tokenisation", "n-grams", "Text classification"] },
  { group: "Computer Vision", items: ["Fundamentals"] },
  { group: "Databases", items: ["SQL", "MongoDB"] },
  { group: "Tools", items: ["Git", "GitHub", "Jupyter", "Colab", "Kaggle", "FastAPI", "Docker"] },
];

export const interests = [
  { t: "Adaptive & online learning", q: "Models that update one sample at a time.", state: "Active work" },
  { t: "Concept-drift detection", q: "Knowing when the world under the data has changed.", state: "Active work" },
  { t: "Optimization", q: "Gradient methods with memory of their past.", state: "Active work" },
  { t: "Continual learning", q: "Adapting without forgetting.", state: "Active work" },
  { t: "Ensemble learning", q: "Combining learners through a meta-model.", state: "Study" },
  { t: "Automatic differentiation", q: "What actually happens inside .backward().", state: "Study" },
  { t: "Natural-language processing", q: "Structure in short, noisy text.", state: "Project work" },
  { t: "Intelligent data systems", q: "Pipelines that learn as data arrives.", state: "Exploring" },
];
