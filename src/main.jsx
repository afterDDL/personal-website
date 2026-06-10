import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
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
  Sparkles,
  Sun,
  Send,
  Workflow,
} from 'lucide-react';
import './styles.css';

const RESUME_URL = '/assets/nina-shi-resume.pdf';
const REPORT_URL = '/assets/speakeasy-report.pdf';
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
    year: '2023 - 至今',
    title: '经济学训练',
    place: '吉林大学 · 经济学专业',
    tag: 'Structured Thinking',
    text: '系统学习统计学、计量经济学、宏微观经济学、金融学等课程，形成用数据、结构和约束条件理解问题的基础方法。',
  },
  {
    year: '2025',
    title: '行业研究实习',
    place: '光大证券研究所 / 开源证券研究所',
    tag: 'Industry Research',
    text: '参与能源、汽车行业研究，覆盖中煤能源、敏实集团、吉利汽车等公司，完成 3 篇个股深度报告相关研究与底稿整理，训练信息搜集、逻辑拆解和商业判断能力。',
  },
  {
    year: '2025',
    title: 'AI 工具与数据分析实践',
    place: '丽兹行豪宅研究院',
    tag: 'AI-assisted Research',
    text: '使用 AI 工具、Excel、ThinkCell、Jupyter 等完成海内外竞对分析、数据可视化和战略可行性判断。',
  },
  {
    year: '2026',
    title: 'AI 芯片招聘方向实习',
    place: '理想汽车北京研发总部',
    tag: 'Talent Mapping',
    text: '梳理半导体产业链人才图谱，进行竞对组织研究、人才 Mapping 和候选人建联，理解技术岗位、产业结构和组织需求。',
  },
  {
    year: '2026',
    title: 'MCM 建模竞赛与 AI 产品实践',
    place: 'MCM H 奖 / SpeakEasy / TalentBridge',
    tag: 'Product Building',
    text: '获得美国大学生数学建模竞赛 H 奖，负责 Python 数据处理、仿真与可视化；随后独立完成 SpeakEasy 与 TalentBridge，从学习场景和招聘场景出发完成产品设计、开发、部署与验证。',
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
];

const talentHighlights = [
  {
    icon: Workflow,
    title: '能力迁移模型',
    text: '不只匹配岗位关键词，而是从业务任务、工作方法、问题复杂度、责任范围和结果证据五个维度理解候选人。',
  },
  {
    icon: PanelsTopLeft,
    title: '可解释 AI 判断',
    text: '将简历事实、AI 推断和待验证信息分开呈现，每项建议都能回到证据、缺口与验证问题。',
  },
  {
    icon: Check,
    title: '人机共同决策',
    text: 'AI 负责扩大召回、排序和解释，最终联系、保留或淘汰仍由招聘人员完成。',
  },
];

const reportMetrics = [
  { label: '综合评分', value: '6.5' },
  { label: '参考 Band', value: '7' },
  { label: '反馈维度', value: '6 类' },
  { label: '报告页数', value: '4 页' },
];

const tools = ['Coze', 'DeepSeek', '墨刀', 'Codex', 'React', 'Vite', 'Cloudflare Pages', 'Python'];

const profileSignals = [
  { label: 'University', value: '吉林大学 · 985', detail: 'Economics · 2023' },
  { label: 'Language', value: 'IELTS 7.0', detail: '英语可作为工作语言' },
  { label: 'Research', value: '行业研究 / 数据分析', detail: '证券研究所 · 市场调研' },
  { label: 'Builder Stack', value: 'AI + Product + Frontend', detail: 'PRD · Prototype · React' },
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [copied, setCopied] = useState('');
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeTalentScreen, setActiveTalentScreen] = useState(0);
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
              <a className="button secondary" href={RESUME_URL} download>
                下载简历 <Download size={17} />
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
                    <small>{signal.detail}</small>
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
                我关注真实学习场景中的低效环节，并尝试用 AI、产品设计和前端实现，把想法做成可被使用和验证的产品。经济学训练让我习惯先拆解约束、变量和激励，行业研究经历让我更重视证据、结构和结论的可解释性。
              </p>
              <p>
              我是在真实业务场景中逐渐意识到 AI 的潜力的：它不只是提高效率的工具，也可以改变一个人学习、搜索、判断和表达的方式。对我来说，做 AI 产品不是追热点，而是把生活里反复出现的低效环节重新拆开，找到可以被 AI 放大的部分，再把它做成真正可用的体验。
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
              <p>TalentBridge 不是替 HR 做决定，而是把容易被忽略的迁移关系变成可解释、可复核、可验证的招聘判断。</p>
            </div>
            <dl>
              <div><dt>场景</dt><dd>中高端社招 / 陌生行业猎聘</dd></div>
              <div><dt>角色</dt><dd>独立产品设计与全栈实现</dd></div>
              <div><dt>技术</dt><dd>Node.js · OpenAI / DeepSeek · Railway</dd></div>
            </dl>
          </div>

          <div className="talent-story" aria-label="TalentBridge 产品逻辑">
            <article>
              <span>01 · Problem</span>
              <h3>关键词无法代表真实能力</h3>
              <p>
                在真实的招聘实习中，我发现传统关键词筛选简历难以理解不同岗位、技术路线和行业经历背后相通的任务与能力的困境，既容易漏掉具备迁移潜力的人才，也可能放入只有关键词却缺少真实经验的人选。
              </p>
            </article>
            <article>
              <span>02 · Approach</span>
              <h3>还原任务、机理与证据</h3>
              <p>
                TalentBridge 基于系统化的行业与技术研究，将岗位要求和候选人经历还原为底层任务、技术机理与能力证据，识别可信的迁移关系，帮助 HR 找回漏选人才。
              </p>
            </article>
            <article>
              <span>03 · Validation</span>
              <h3>让判断回到招聘结果</h3>
              <p>
                通过人工复核、招聘进展回填和效果复盘，完成从岗位理解到招聘结果验证的业务闭环。
              </p>
            </article>
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

          <div className="highlight-grid talent-highlights">
            {talentHighlights.map(({ icon: Icon, title, text }) => (
              <article className="highlight-card" key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section resume" id="resume">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>从经济学训练到 AI 产品实践的能力迁移。</h2>
            </div>
            <a className="button primary compact" href={RESUME_URL} download>
              下载 PDF 简历 <Download size={16} />
            </a>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-item" key={`${item.year}-${item.title}`}>
                <div className="timeline-marker">
                  {index === 0 ? <BookOpen size={18} /> : index === 4 ? <Sparkles size={18} /> : <BriefcaseBusiness size={18} />}
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
