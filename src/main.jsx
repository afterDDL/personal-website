import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleUserRound,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Heart,
  Languages,
  Mail,
  MessageCircle,
  Mic2,
  Moon,
  PanelsTopLeft,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Send,
  Workflow,
} from 'lucide-react';
import './styles.css';

const REPORT_URL = '/assets/speakeasy-report.pdf';
const RESUME_URL = '/assets/nina-shi-resume.pdf';
const EMAIL = '1246012616@qq.com';
const WECHAT = 'Summer1Xn025';
const MESSAGES_KEY = 'nina-shi-guestbook';
const SITE_LIKES_KEY = 'nina-shi-site-likes';

const navItems = [
  { label: '首页', href: '#home' },
  { label: '关于', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '经历', href: '#resume' },
  { label: '联系', href: '#contact' },
];

const timeline = [
  {
    year: '2023.09 - 2027.06',
    title: '经济学训练',
    place: '吉林大学 · 经济学专业',
    tag: 'Structured Thinking',
    text: '在经济学训练中形成用数据、结构和约束条件理解问题的方法；雅思 7 分、大学英语六级，可使用英文资料开展研究与日常工作。',
  },
  {
    year: '2025.07 - 2025.11',
    title: '汽车行业研究实习',
    place: '开源证券研究所 · 汽车组',
    tag: 'Industry Research',
    text: '参与敏实集团、吉利汽车等上市公司深度研究，从竞争格局、经营数据、产业链、技术壁垒与车型等维度完成分析，并参与盈利预测、估值及深度报告撰写。',
  },
  {
    year: '2026.02 - 2026.04',
    title: 'AI 芯片招聘方向实习',
    place: '理想汽车北京研发总部',
    tag: 'Talent Mapping',
    text: '围绕 AI 芯片业务开展半导体人才 Mapping，梳理竞对、目标公司与核心岗位人才分布；在无具体 JD 的情况下推进高端岗位候选人 20+，建联成功率 70%。',
  },
  {
    year: '2026',
    title: 'MCM 数学建模竞赛',
    place: '美国大学生数学建模竞赛 · H 奖',
    tag: 'Modeling & Analysis',
    text: '负责 Python 数据处理、模型构建、仿真与可视化，与团队完成完整建模分析并获得 Honorable Mention。',
  },
  {
    year: '2026.06 - 2026.08',
    title: 'AI 产品经理实习',
    place: '安哲科技 · 嘴替键盘项目组',
    tag: 'AI Product Delivery',
    text: '曾参与 C 端 AI 回复产品迭代，负责场景化模板评测、截图回复与 Onboarding 等功能的设计与落地。',
  },
];

const projectHighlights = [
  {
    icon: Mic2,
    title: '语音交互',
    text: '通过浏览器语音识别与朗读能力，让练习从“看题作答”变成更接近真实考试的听题反应。',
  },
  {
    icon: Workflow,
    title: '真实雅思流程',
    text: '围绕 Part 1 / Part 2 / Part 3 的题目关系和考试节奏组织训练，减少用户自己控流程的负担。',
  },
  {
    icon: PanelsTopLeft,
    title: 'AI 反馈报告',
    text: '把回答复盘拆成结构化反馈字段，帮助用户发现表达、内容和逻辑问题，并回到同一道题复练。',
  },
];

const feedbackInsights = [
  {
    quote: '反馈建议在不同题目里有些重复，缺少针对每一道题的具体分析。',
    insight: '用户需要的不是通用鼓励，而是基于题目、答案内容和表达问题生成的逐题反馈。',
    action: '将反馈报告改为结构化逐题分析，并接入 DeepSeek，让建议围绕具体题干与用户回答生成。',
  },
  {
    quote: '练习流程里重复题目的概率偏高，连续刷题时效率会下降。',
    insight: '题库抽题不能只随机，需要考虑去重、题型分散和 Part 1 常见流程题的占比。',
    action: '优化抽题策略，增加去重逻辑和分类分散机制，让重复练习更适合复盘而不是机械撞题。',
  },
];

const productScreens = [
  { title: '首页', src: '/assets/speakeasy-home.jpg', note: '考官选择与练习模式入口' },
  { title: '练习页', src: '/assets/speakeasy-practice.jpg', note: '听题、作答、转写与保存流程' },
  { title: '题库页', src: '/assets/speakeasy-bank.jpg', note: '按 Part 与分类浏览 IELTS 口语题库' },
  { title: '设置页', src: '/assets/speakeasy-settings.jpg', note: '语音参数与常见问题说明' },
];

const talentScreens = [
  { title: '人才研察工作台', src: '/assets/talentbridge-workbench.png', note: '从岗位项目进入，集中呈现候选人规模、AI 增量召回和待复核进度。' },
  { title: '岗位能力校准', src: '/assets/talentbridge-calibration.png', note: '把 JD 与招聘经理的隐性判断转化为可编辑、可复用的岗位能力模型。' },
  { title: '人才复核队列', src: '/assets/talentbridge-queue.png', note: '按证据强度和迁移价值组织候选人，并明确区分 ATS 命中与 AI 新找回。' },
  { title: 'ATS 与 AI 效果评估', src: '/assets/talentbridge-evaluation.png', note: '使用独立人工标注计算召回率、精确率和复核成本，避免 AI 自证效果。' },
  { title: 'AI 寻访策略', src: '/assets/talentbridge-sourcing.png', note: '从正向招聘结果反向生成技术词、相邻岗位、目标公司与布尔搜索组合。' },
];

const talentActions = [
  {
    icon: BriefcaseBusiness,
    label: '岗位建模',
    title: '把 JD 转成可校准的能力标准',
    text: '拆解岗位任务、关键能力、必须项与相邻经历。',
  },
  {
    icon: PanelsTopLeft,
    label: '候选人分析',
    title: '从五个维度识别迁移可能',
    text: '分析业务目标、工作对象、方法工具、复杂度与个人责任。',
  },
  {
    icon: Building2,
    label: '企业研究',
    title: '补足候选人原司的业务背景',
    text: '识别企业主体、产品与技术背景，辅助判断岗位关联。',
  },
  {
    icon: ShieldCheck,
    label: '业务工作流',
    title: '兼顾隐私、复核与结果沉淀',
    text: '支持本地解析、自动脱敏、人工复核与招聘进度回填。',
  },
];

const talentLoop = ['岗位理解', '候选人分析', '人工决策', '结果回填', '效果复盘', '策略优化'];

const blueprintPointEditSteps = [
  {
    label: 'SELECT',
    caption: '点选 Blueprint 中的具体节点',
    src: '/assets/blueprint-point-edit-01-select.jpg',
    alt: '选择 Shared Blueprint 中的做什么节点，并将该节点作为 Creator 上下文',
  },
  {
    label: 'EDIT',
    caption: '直接在当前节点修改内容',
    src: '/assets/blueprint-point-edit-02-edit.jpg',
    alt: '在 Shared Blueprint 的做什么节点中编辑新的 Purpose 内容',
  },
  {
    label: 'SUBMIT',
    caption: '局部修改意图提交回 Creator',
    src: '/assets/blueprint-point-edit-03-submit.jpg',
    alt: '提交针对当前 Blueprint 节点的自然语言修改并回到 Creator',
  },
  {
    label: 'PROPOSAL',
    caption: 'AI 先给出明确的变更建议',
    src: '/assets/blueprint-point-edit-04-proposal.jpg',
    alt: 'Creator 生成 Purpose 变更 Proposal 并等待用户确认',
  },
  {
    label: 'APPLY',
    caption: '确认后，Blueprint 更新为新的状态',
    src: '/assets/blueprint-point-edit-05-apply.jpg',
    alt: 'Proposal 应用后 Shared Blueprint 的 Purpose 已更新',
  },
];

const reportMetrics = [
  { label: '综合评分', value: '6.5' },
  { label: '参考 Band', value: '7' },
  { label: '反馈维度', value: '6 类' },
  { label: '报告页数', value: '4 页' },
];

const tools = ['Figma', 'HTML Prototype', 'Codex', 'Hermes', 'Git / GitHub', 'Python', 'Office', '飞书', 'Wind', 'iFinD'];

const profileSignals = [
  { label: 'University', value: '吉林大学 · 985', detail: 'Economics · 2023' },
  { label: 'Language', value: 'IELTS 7.0', detail: '英语可作为工作语言' },
  { label: 'AI / Agent Product', value: 'AI应用 · Agent 产品 · 模型评测', detail: '' },
  { label: 'Builder', value: '从原型做到可运行产品', detail: 'Figma / HTML · Vibe Coding · GitHub' },
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [copied, setCopied] = useState('');
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeTalentScreen, setActiveTalentScreen] = useState(0);
  const [activePointEditStep, setActivePointEditStep] = useState(0);
  const [siteLikes, setSiteLikes] = useState(() => Number(localStorage.getItem(SITE_LIKES_KEY) || 0));
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [messageForm, setMessageForm] = useState({ name: '', content: '' });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setActivePointEditStep((current) => (
        current + 1
      ) % blueprintPointEditSteps.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const copyText = async (value, label) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1800);
  };

  const saveMessages = (nextMessages) => {
    setMessages(nextMessages);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(nextMessages));
  };

  const likeSite = () => {
    const nextLikes = siteLikes + 1;
    setSiteLikes(nextLikes);
    localStorage.setItem(SITE_LIKES_KEY, String(nextLikes));
  };

  const submitMessage = (event) => {
    event.preventDefault();
    const name = messageForm.name.trim();
    const content = messageForm.content.trim();

    if (!name || !content) return;

    saveMessages([
      {
        id: crypto.randomUUID(),
        name,
        content,
        likes: 0,
        createdAt: new Date().toISOString(),
      },
      ...messages,
    ]);
    setMessageForm({ name: '', content: '' });
  };

  const likeMessage = (id) => {
    saveMessages(messages.map((message) => (
      message.id === id ? { ...message, likes: message.likes + 1 } : message
    )));
  };

  const formatDate = (isoDate) => {
    return new Intl.DateTimeFormat('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoDate));
  };

  const changeScreen = (direction) => {
    setActiveScreen((current) => (
      current + direction + productScreens.length
    ) % productScreens.length);
  };

  const currentScreen = productScreens[activeScreen];
  const currentTalentScreen = talentScreens[activeTalentScreen];

  const changeTalentScreen = (direction) => {
    setActiveTalentScreen((current) => (
      current + direction + talentScreens.length
    ) % talentScreens.length);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="回到首页">
          <span>Nina Shi</span>
          <small>AI Product Builder</small>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="icon-button"
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="切换明暗模式"
          title="切换明暗模式"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy reveal">
            <p className="eyebrow">AI Product Builder · Economics Lens</p>
            <h1>
              从用户问题出发，
              <span>独立构建 AI 产品</span>
            </h1>
            <p className="hero-text">
              我是石夏宁 Nina Shi，吉林大学经济学专业学生。关注真实学习场景中的低效环节，并尝试用 AI、产品设计和前端实现，把想法做成可被使用和验证的产品。
            </p>
            <p className="hero-contact-note">
              需要我的完整简历或更多项目细节，请添加微信 <strong>{WECHAT}</strong> 并说明来意。
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                查看作品 <ChevronRight size={18} />
              </a>
            </div>
          </div>

          <div className="hero-panel profile-panel reveal delay-1" aria-label="个人能力摘要">
            <div className="profile-topline">
              <div className="profile-avatar">
                <img src="/assets/nina-portrait.jpg" alt="石夏宁正式形象照" />
              </div>
              <div>
                <p>石夏宁 · Nina Shi</p>
                <strong>AI Product Builder</strong>
                <span>Economics Lens</span>
              </div>
            </div>
            <div className="signal-list">
              {profileSignals.map((signal, index) => (
                <div className="signal-row" key={signal.label}>
                  <span className="signal-index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                    {signal.detail && <small>{signal.detail}</small>}
                  </div>
                </div>
              ))}
            </div>
            <div className="profile-note">
              <div>
                <GraduationCap size={18} />
                <span>985 院校背景</span>
              </div>
              <div>
                <Languages size={18} />
                <span>跨语言信息处理</span>
              </div>
              <p>把研究中的结构化判断，迁移到 AI 产品的问题定义、体验设计与快速验证。</p>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>用研究能力理解问题，用产品实践验证答案。</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p>
                我关注 AI 怎么真正进入人的沟通、学习和工作流程。比起只停留在方案层，我更习惯把问题拆清楚，做成原型和可运行产品，再通过实际使用和评测验证。最近主要在探索 Agent 产品，以及人与 AI 应该怎样共同理解和控制越来越复杂的 Agent。
              </p>
              <p>
                经济学和行业研究训练让我重视结构、证据与结果的可解释性；AI 产品实践则让我习惯用样本评测、失败案例和用户反馈持续迭代。对我来说，做产品就是把问题讲清楚、把协作推进下去，再用真实结果检验判断。
              </p>
              <div className="tool-cloud">
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            <figure className="life-photo">
              <img src="/assets/nina-life.jpg" alt="石夏宁生活照" loading="lazy" />
              <figcaption>Real person, real product practice.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="blueprint-feature">
            <div className="section-heading blueprint-heading">
              <p className="eyebrow">Featured Project · Agent Product</p>
              <p className="blueprint-name">Shared Blueprint｜共享蓝图</p>
              <h2>让人与 AI 看着同一套 Agent 结构工作。</h2>
            </div>

            <div className="talent-intro blueprint-intro">
              <div className="talent-intro-copy blueprint-intro-copy">
                <p>当 Agent 开始拥有不同的能力、规则、Skill 和协作 Agent，仅靠 Conversation 已经很难让用户回答一个基本问题：我现在正在构建的 Agent，究竟是什么？</p>
                <p>Shared Blueprint 将 Agent 映射成一套人与 AI 都能看到、选择和讨论的结构，让自然语言创建 Agent 的过程保持可理解、可控制。</p>
                <p className="blueprint-taxonomy">ROLE · PURPOSE · CAPABILITIES · RULES · OUTPUT</p>
                <div className="heading-actions blueprint-actions">
                  <a
                    className="button secondary compact"
                    href="https://afterddl.github.io/dsh-creator-shared-blueprint/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                  <a
                    className="button ghost compact"
                    href="https://github.com/afterDDL/dsh-creator-shared-blueprint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <Github size={16} />
                  </a>
                </div>
              </div>
              <dl>
                <div><dt>ROLE</dt><dd>Independent Product Builder</dd></div>
                <div><dt>SCOPE</dt><dd>Product · Interaction · Implementation</dd></div>
                <div><dt>BUILT ON</dt><dd>DeepSeek Harness</dd></div>
                <div><dt>STATUS</dt><dd>Interactive Preview</dd></div>
              </dl>
            </div>

            <figure className="blueprint-media blueprint-wide-media">
              <img src="/assets/01_blueprint_ready.png" alt="Shared Blueprint Creator 对话与完整 Agent Blueprint 界面" loading="lazy" />
            </figure>

            <div className="talent-action-section blueprint-interaction">
              <div className="talent-subheading">
                <span>INTERACTION MODEL</span>
                <h3>对话负责表达意图，Blueprint 负责让 Agent 的状态始终可见。</h3>
                <p>用户可以直接选择 Blueprint 中的真实节点，让对话获得明确的讨论对象。需要修改时，AI 不直接改写 Agent，而是先形成 Proposal，再由用户决定是否 Apply。</p>
              </div>
              <div className="talent-action-grid blueprint-step-grid">
                <article>
                  <span>01 SELECT</span>
                  <h4>选择真实 Blueprint 节点</h4>
                </article>
                <article>
                  <span>02 DISCUSS</span>
                  <h4>围绕当前状态精准讨论</h4>
                </article>
                <article>
                  <span>03 PROPOSE</span>
                  <h4>将修改意图转成明确 Proposal</h4>
                </article>
                <article>
                  <span>04 APPLY</span>
                  <h4>用户确认后才真正生效</h4>
                </article>
              </div>
            </div>

            <figure className="blueprint-media blueprint-wide-media">
              <img src="/assets/02_proposal_apply.png" alt="Shared Blueprint Proposal 与 Apply 修改流程" loading="lazy" />
            </figure>

            <div className="blueprint-point-edit">
              <div className="talent-outcome-heading">
                <span>POINT-TO-POINT EDITING</span>
                <h3>不用重新描述整个 Agent，直接对着想改的部分说你要改什么。</h3>
                <p>
                  用户可以直接选择 Blueprint 中的具体节点，让当前部分成为 Creator 的明确上下文，再用自然语言继续修改；变更不会直接生效，而是先进入 Proposal，再由用户决定是否 Apply。
                </p>
              </div>

              <div className="blueprint-point-edit-demo">
                <figure className="blueprint-point-edit-stage">
                  <img
                    key={blueprintPointEditSteps[activePointEditStep].src}
                    className="blueprint-point-edit-image"
                    src={blueprintPointEditSteps[activePointEditStep].src}
                    alt={blueprintPointEditSteps[activePointEditStep].alt}
                    loading="lazy"
                  />
                </figure>

                <div className="blueprint-point-edit-progress" aria-label="Point-to-point editing steps">
                  {blueprintPointEditSteps.map((step, index) => (
                    <button
                      key={step.label}
                      type="button"
                      className={index === activePointEditStep ? 'active' : ''}
                      onClick={() => setActivePointEditStep(index)}
                      aria-pressed={index === activePointEditStep}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong className="blueprint-point-edit-step-name">{step.label}</strong>
                    </button>
                  ))}
                </div>

                <p className="blueprint-point-edit-caption" aria-live="polite">
                  {blueprintPointEditSteps[activePointEditStep].caption}
                </p>
              </div>
            </div>

            <div className="blueprint-runtime">
              <div className="talent-outcome-heading">
                <span>FROM STRUCTURE TO RUNTIME</span>
                <h3>Blueprint 不只描述 Agent，它必须和真实运行状态保持一致。</h3>
                <p>当用户创建 Skill、加入协作 Agent，或修改已有能力后，Blueprint 会持续反映 Agent 的当前结构；通过 Try Agent，用户还能进一步确认这些变化是否真正进入 runtime，而不是只停留在界面或配置层。</p>
              </div>

              <div className="feedback-grid blueprint-runtime-grid">
                <figure className="blueprint-runtime-item">
                  <div className="blueprint-media">
                    <img src="/assets/03_skill_published.png" alt="Shared Blueprint 新增 Skill 后的结构更新" loading="lazy" />
                  </div>
                  <figcaption>
                    <strong>STRUCTURE UPDATED</strong>
                    <span>新增 Skill / 协作 Agent 后，能力变化回到同一个 Blueprint 中。</span>
                  </figcaption>
                </figure>
                <figure className="blueprint-runtime-item">
                  <div className="blueprint-media">
                    <img src="/assets/04_try_runtime.png" alt="Shared Blueprint Try Agent runtime 验证结果" loading="lazy" />
                  </div>
                  <figcaption>
                    <strong>RUNTIME VERIFIED</strong>
                    <span>Try Agent 验证当前 Blueprint 是否与真实 Agent 组装结果一致。</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Case Study</p>
              <h2>SpeakEasy：雅思口语 AI 陪练</h2>
            </div>
            <div className="heading-actions">
              <a className="button secondary compact" href="https://speakeasy-evd.pages.dev/" target="_blank" rel="noreferrer">
                在线体验 <ExternalLink size={16} />
              </a>
              <a className="button ghost compact" href="https://github.com/afterDDL/speakeasy" target="_blank" rel="noreferrer">
                GitHub <Github size={16} />
              </a>
            </div>
          </div>

          <div className="case-layout">
            <article className="case-main">
              <div className="case-cover screenshot-cover" aria-label="SpeakEasy 产品截图轮播">
                <figure className="screen-carousel">
                  <img src={currentScreen.src} alt={`SpeakEasy ${currentScreen.title}截图`} />
                  <button
                    className="screen-nav prev"
                    type="button"
                    onClick={() => changeScreen(-1)}
                    aria-label="查看上一张截图"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <button
                    className="screen-nav next"
                    type="button"
                    onClick={() => changeScreen(1)}
                    aria-label="查看下一张截图"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <figcaption>
                    <div>
                      <strong>{currentScreen.title}</strong>
                      <span>{currentScreen.note}</span>
                    </div>
                    <div className="screen-dots" aria-label="截图分页">
                      {productScreens.map((screen, index) => (
                        <button
                          key={screen.title}
                          type="button"
                          className={index === activeScreen ? 'active' : ''}
                          onClick={() => setActiveScreen(index)}
                          aria-label={`查看${screen.title}截图`}
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="case-text">
                <p>
                  传统雅思口语练习偏向“题库 + 录音 + 转写”，用户需要自己选题、控制节奏、判断复盘重点。SpeakEasy 试图把练习过程重新组织为更真实的考试体验。
                </p>
                <p>
                  产品核心闭环是：听题、作答、保存、AI 反馈、重答。它让用户不只获得一次评分，而是能回到具体题目继续修正表达。
                </p>
              </div>
            </article>

            <aside className="case-aside">
              <div className="meta-card">
                <span>Project Time</span>
                <strong>2026</strong>
              </div>
              <div className="meta-card">
                <span>My Role</span>
                <strong>独立开发 · 产品 / 设计 / 前端</strong>
              </div>
              <div className="meta-card">
                <span>Tech Stack</span>
                <strong>React · Vite · Cloudflare Pages · DeepSeek</strong>
              </div>
            </aside>
          </div>

          <div className="highlight-grid">
            {projectHighlights.map(({ icon: Icon, title, text }) => (
              <article className="highlight-card" key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="report-section">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Feedback Report</p>
                <h3>报告结构完整，能把评分、问题定位和逐题改进建议串成清晰复盘。</h3>
              </div>
              <a className="button secondary compact" href={REPORT_URL} target="_blank" rel="noreferrer">
                查看完整 PDF <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="report-layout">
              <article className="report-summary">
                <div className="report-score">
                  <span>DeepSeek 评分</span>
                  <strong>6.5</strong>
                  <em>IELTS speaking reference</em>
                </div>
                <div className="report-metrics">
                  {reportMetrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </article>
              <article className="report-anatomy">
                <div>
                  <span>总评</span>
                  <p>内容充实、结构清晰，但语言细节和表达自然度仍有提升空间。</p>
                </div>
                <div>
                  <span>逐题反馈</span>
                  <p>针对具体题目拆出问题所在、改进建议、答题结构、内容缺口和示例升级。</p>
                </div>
                <div>
                  <span>下次目标</span>
                  <p>练习更自然的过渡句，避免直接复制提示词，并保持过去时一致。</p>
                </div>
              </article>
            </div>
          </div>

          <div className="feedback-section">
            <div className="section-heading compact-heading">
              <p className="eyebrow">User Feedback</p>
              <h3>把朋友的内测反馈转成可执行的产品迭代。</h3>
            </div>
            <div className="feedback-grid">
              {feedbackInsights.map((item) => (
                <article className="feedback-card" key={item.quote}>
                  <p className="feedback-quote">“{item.quote}”</p>
                  <div>
                    <span>需求分析</span>
                    <p>{item.insight}</p>
                  </div>
                  <div>
                    <span>迭代动作</span>
                    <p>{item.action}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section talent-project" aria-labelledby="talentbridge-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Case Study 02 · Recruiting Intelligence</p>
              <h2 id="talentbridge-title">TalentBridge：AI 高端人才迁移识别助手</h2>
            </div>
            <div className="heading-actions">
              <a
                className="button secondary compact"
                href="https://talentbridge-production-1a40.up.railway.app"
                target="_blank"
                rel="noreferrer"
              >
                在线体验 <ExternalLink size={16} />
              </a>
              <a
                className="button ghost compact"
                href="https://github.com/afterDDL/talentbridge"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Github size={16} />
              </a>
            </div>
          </div>

          <div className="talent-intro">
            <div className="talent-intro-copy">
              <span className="project-index">02 / Talent Intelligence</span>
              <h3>从关键词命中，走向能力证据与招聘结果验证。</h3>
              <p>独立设计并搭建面向中高端人才招聘的 Web MVP，让 AI 不只判断“关键词是否一致”，而是理解候选人是否解决过相似问题、能力能否迁移。</p>
            </div>
            <dl>
              <div><dt>场景</dt><dd>中高端社招 / 陌生行业猎聘</dd></div>
              <div><dt>角色</dt><dd>独立产品设计与全栈实现</dd></div>
              <div><dt>技术</dt><dd>React · DeepSeek · Node.js · Railway</dd></div>
            </dl>
          </div>

          <div className="talent-brief" aria-label="TalentBridge 项目背景与目标">
            <article>
              <span>Project Background</span>
              <h3>关键词筛选难以识别能力迁移</h3>
              <p>
                传统 ATS 难以理解高度概括的项目经历与相邻技术路线，容易漏掉高潜人才，也增加 HR 的人工筛选成本。
              </p>
            </article>
            <article>
              <span>Project Goal</span>
              <h3>从词汇匹配升级为能力判断</h3>
              <p>
                判断候选人是否解决过相似问题、能力能否迁移，并连接人才识别、人工复核与招聘结果验证。
              </p>
            </article>
          </div>

          <div className="talent-action-section">
            <div className="talent-subheading">
              <span>Core Actions</span>
              <h3>四个关键能力模块</h3>
              <p>Codex 辅助完成 PRD、交互与开发，React 前端接入 DeepSeek。</p>
            </div>
            <div className="talent-action-grid">
              {talentActions.map(({ icon: Icon, label, title, text }) => (
                <article key={title}>
                  <Icon size={21} />
                  <span>{label}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="talent-carousel">
            <div className="talent-screen">
              <img src={currentTalentScreen.src} alt={`TalentBridge ${currentTalentScreen.title}截图`} />
              <button
                className="screen-nav prev"
                type="button"
                onClick={() => changeTalentScreen(-1)}
                aria-label="查看上一张 TalentBridge 截图"
              >
                <ChevronRight size={22} />
              </button>
              <button
                className="screen-nav next"
                type="button"
                onClick={() => changeTalentScreen(1)}
                aria-label="查看下一张 TalentBridge 截图"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            <figcaption>
              <div>
                <strong>{currentTalentScreen.title}</strong>
                <span>{currentTalentScreen.note}</span>
              </div>
              <div className="screen-dots" aria-label="TalentBridge 截图分页">
                {talentScreens.map((screen, index) => (
                  <button
                    key={screen.title}
                    type="button"
                    className={index === activeTalentScreen ? 'active' : ''}
                    onClick={() => setActiveTalentScreen(index)}
                    aria-label={`查看${screen.title}截图`}
                  />
                ))}
              </div>
            </figcaption>
          </figure>

          <div className="talent-outcome">
            <div className="talent-outcome-heading">
              <span>Project Outcome</span>
              <h3>产品已跑通从人才识别到下一轮寻访优化的完整闭环。</h3>
              <p>通过证据分级限制 AI 过度推断，自动生成待验证问题与面试追问，并用真实招聘进展持续检验筛选判断。</p>
            </div>

            <div className="talent-loop" aria-label="TalentBridge 招聘业务闭环">
              {talentLoop.map((step, index) => (
                <React.Fragment key={step}>
                  <span>{step}</span>
                  {index < talentLoop.length - 1 && <ChevronRight size={16} aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>

            <article className="sourcing-output">
              <div className="sourcing-output-icon">
                <RefreshCw size={24} />
              </div>
              <div className="sourcing-output-copy">
                <span>New Feature · Reverse Sourcing</span>
                <h3>把有效招聘结果，反向变成下一轮找人的策略。</h3>
                <p>系统根据 HR 复核及联系、面试、Offer 等招聘结果，提炼已验证的共同特征，减少每轮寻访都从零开始。</p>
              </div>
              <div className="sourcing-output-list">
                <span><Search size={16} /> 有效技术关键词</span>
                <span><CircleUserRound size={16} /> 相邻岗位</span>
                <span><Building2 size={16} /> 目标公司</span>
                <span><Workflow size={16} /> 布尔搜索组合</span>
              </div>
            </article>

            <p className="talent-validation-note">
              持续以有效找回率、联系率、面试率及 Offer 转化率验证筛选与寻访策略。
            </p>
          </div>
        </section>

        <section className="section resume" id="resume">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>从研究、招聘到 AI 产品交付的能力迁移。</h2>
            </div>
            <a className="button secondary compact" href={RESUME_URL} download="石夏宁简历-260818.pdf">
              下载最新版简历 <Download size={16} />
            </a>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-item" key={`${item.year}-${item.title}`}>
                <div className="timeline-marker">
                  {index === 0 ? <BookOpen size={18} /> : index === timeline.length - 1 ? <Sparkles size={18} /> : <BriefcaseBusiness size={18} />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-topline">
                    <span>{item.year}</span>
                    <em>{item.tag}</em>
                  </div>
                  <h3>{item.title}</h3>
                  <strong>{item.place}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>如果你想了解我的项目细节，欢迎联系我。</h2>
            </div>
            <div className="contact-actions">
              <button className="contact-link" type="button" onClick={() => copyText(EMAIL, 'email')}>
                {copied === 'email' ? <Check size={18} /> : <Mail size={18} />}
                <span>{copied === 'email' ? '邮箱已复制' : EMAIL}</span>
              </button>
              <a className="contact-link" href="https://github.com/afterDDL" target="_blank" rel="noreferrer">
                <Github size={18} />
                <span>github.com/afterDDL</span>
                <ArrowUpRight size={16} />
              </a>
              <a className="contact-link" href={RESUME_URL} download="石夏宁简历-260818.pdf">
                <Download size={18} />
                <span>下载最新版简历</span>
                <ArrowUpRight size={16} />
              </a>
              <button className="contact-link" type="button" onClick={() => copyText(WECHAT, 'wechat')}>
                {copied === 'wechat' ? <Check size={18} /> : <MessageCircle size={18} />}
                <span>{copied === 'wechat' ? '微信号已复制' : WECHAT}</span>
              </button>
            </div>
          </div>
        </section>

        <section className="section guestbook" id="guestbook">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Guestbook</p>
              <h2>留下建议，或给这个作品集点个赞。</h2>
            </div>
            <button className="button primary compact like-site-button" type="button" onClick={likeSite}>
              <Heart size={16} />
              {siteLikes} 次点赞
            </button>
          </div>

          <div className="guestbook-layout">
            <form className="message-form" onSubmit={submitMessage}>
              <label>
                <span>姓名</span>
                <input
                  type="text"
                  value={messageForm.name}
                  maxLength={24}
                  placeholder="你的名字"
                  onChange={(event) => setMessageForm({ ...messageForm, name: event.target.value })}
                />
              </label>
              <label>
                <span>留言</span>
                <textarea
                  value={messageForm.content}
                  maxLength={240}
                  placeholder="可以写下建议、反馈，或你对项目的第一印象。"
                  onChange={(event) => setMessageForm({ ...messageForm, content: event.target.value })}
                />
              </label>
              <button className="button primary" type="submit" disabled={!messageForm.name.trim() || !messageForm.content.trim()}>
                发布留言 <Send size={16} />
              </button>
            </form>

            <div className="message-list" aria-live="polite">
              {messages.length === 0 ? (
                <div className="empty-message">
                  <MessageCircle size={24} />
                  <strong>还没有留言</strong>
                  <span>第一条反馈会让这个页面更像真实产品。</span>
                </div>
              ) : (
                messages.map((message) => (
                  <article className="message-card" key={message.id}>
                    <div className="message-card-header">
                      <div>
                        <strong>{message.name}</strong>
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                      <button type="button" onClick={() => likeMessage(message.id)} aria-label={`给 ${message.name} 的留言点赞`}>
                        <Heart size={15} />
                        {message.likes}
                      </button>
                    </div>
                    <p>{message.content}</p>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {year} Nina Shi</span>
        <span>Built with React, Vite and a clear product story.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
