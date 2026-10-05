const app=document.getElementById('app');



const toastEl=document.getElementById('toast');



const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};



const state={



  page:'landing', sidebar:false, user:store.get('lm_user',{name:'Alex',goal:'AI Engineer'}), tasks:store.get('lm_tasks',[]), streak:store.get('lm_streak',8), xp:store.get('lm_xp',2480), chats:store.get('lm_chats',[{who:'ai',text:'Hi! I’m LearnMate. Tell me what you’re trying to learn, build, or achieve and I’ll help you figure out the next step.'}])



};



const icons={dashboard:'⌂',ai:'✦',learn:'◈',docs:'▤',interview:'◉',planner:'□',projects:'⌘',career:'↗',resume:'▥',progress:'◒',settings:'⚙'};



function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}



function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2300)}



function go(p){state.page=p;state.sidebar=false;render();window.scrollTo(0,0)}



function nav(){return `<aside class="sidebar ${state.sidebar?'open':''}"><div class="brand"><div class="logo">✦</div><div><strong>LearnMate</strong><span>AI learning companion</span></div></div><div class="nav-label">Workspace</div><nav class="nav">${[['dashboard','Dashboard'],['ai','AI Assistant'],['learn','Learn'],['docs','Documents'],['interview','Interview'],['planner','Planner'],['projects','Projects'],['career','Career'],['resume','Resume'],['progress','Progress']].map(([k,n])=>`<button class="${state.page===k?'active':''}" onclick="go('${k}')"><span class="ico">${icons[k]}</span>${n}</button>`).join('')}</nav><div class="nav-label">Account</div><nav class="nav"><button class="${state.page==='settings'?'active':''}" onclick="go('settings')"><span class="ico">⚙</span>Settings</button></nav><div class="sidebar-bottom"><div class="profile-mini"><div class="avatar">${esc(state.user.name[0]||'A')}</div><div><b>${esc(state.user.name)}</b><small>${esc(state.user.goal)}</small></div></div></div></aside>`}



function shell(body,title='LearnMate'){return `<div class="app-shell">${nav()}<main class="main"><header class="topbar"><div style="display:flex;align-items:center;gap:12px"><button class="icon-btn mobile-menu" onclick="state.sidebar=!state.sidebar;render()">☰</button><span class="crumb">${title}</span></div><div class="top-actions"><button class="ghost-btn" onclick="go('ai')">✦ Ask LearnMate</button><button class="icon-btn" onclick="toast('Notifications are clear')">♢</button></div></header>${body}</main></div>`}



function landing(){return `
<div class="landing lm-home">
<style>
.lm-home{min-height:100vh;background:radial-gradient(circle at 72% 18%,rgba(91,239,206,.10),transparent 28%),radial-gradient(circle at 18% 40%,rgba(112,124,255,.10),transparent 25%),#071014;color:#edf8f6;overflow:hidden}
.lm-home .landing-nav{position:relative;z-index:5;max-width:1180px;margin:0 auto;padding:22px 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07)}
.lm-home .brand{display:flex;align-items:center;gap:12px}.lm-home .brand .logo{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#7df3d2,#62d9ff);color:#071014;font-weight:900;box-shadow:0 0 30px rgba(98,217,255,.18)}
.lm-home .brand strong{display:block;font-family:Manrope,sans-serif;font-size:18px}.lm-home .brand span{display:block;color:#86a19f;font-size:11px;margin-top:2px}
.lm-home .actions{display:flex;gap:10px;align-items:center}.lm-home .actions .ghost-btn{color:#d9e9e7;border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.03)}
.lm-home .lm-hero{max-width:1180px;margin:0 auto;padding:78px 28px 70px;display:grid;grid-template-columns:1.03fr .97fr;gap:64px;align-items:center;position:relative}
.lm-home .lm-glow{position:absolute;width:420px;height:420px;border-radius:50%;background:rgba(89,239,206,.08);filter:blur(70px);right:3%;top:8%;pointer-events:none}
.lm-home .lm-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(125,243,210,.20);background:rgba(125,243,210,.06);color:#8af1d4;border-radius:999px;padding:8px 13px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.lm-home .lm-badge i{width:7px;height:7px;border-radius:50%;background:#7df3d2;box-shadow:0 0 12px #7df3d2}
.lm-home .lm-hero h1{font-family:Manrope,sans-serif;font-size:clamp(48px,6vw,78px);line-height:.98;letter-spacing:-.055em;margin:22px 0 22px;max-width:720px}.lm-home .lm-hero h1 span{background:linear-gradient(90deg,#82f5d7,#74d9ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.lm-home .lm-hero-copy{font-size:17px;line-height:1.75;color:#9ab1af;max-width:650px;margin:0}.lm-home .lm-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.lm-home .lm-cta .primary{padding:14px 20px;font-size:14px}.lm-home .lm-cta .ghost-btn{padding:13px 18px;color:#dce9e7;border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.03)}
.lm-home .lm-trust{display:flex;gap:22px;flex-wrap:wrap;margin-top:30px;color:#78918f;font-size:12px}.lm-home .lm-trust b{color:#d6e7e5;margin-right:5px}
.lm-home .lm-ai-window{position:relative;border:1px solid rgba(255,255,255,.10);background:linear-gradient(145deg,rgba(21,38,43,.94),rgba(8,18,22,.96));border-radius:26px;padding:18px;box-shadow:0 35px 90px rgba(0,0,0,.38),inset 0 1px rgba(255,255,255,.04);transform:rotate(1deg)}
.lm-home .lm-window-top{display:flex;justify-content:space-between;align-items:center;padding:3px 4px 15px;border-bottom:1px solid rgba(255,255,255,.07);font-size:11px;color:#77908e}.lm-home .lm-dots{display:flex;gap:5px}.lm-home .lm-dots i{width:7px;height:7px;border-radius:50%;background:#31484a}.lm-home .lm-ai-title{display:flex;gap:12px;align-items:center;padding:20px 8px 15px}.lm-home .lm-ai-orb{width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#79efd1,#5fcfff);color:#071014;font-weight:900;box-shadow:0 0 25px rgba(95,207,255,.14)}.lm-home .lm-ai-title b{display:block;font-size:15px}.lm-home .lm-ai-title span{display:block;font-size:11px;color:#78918f;margin-top:3px}
.lm-home .lm-goal{border:1px solid rgba(125,243,210,.12);background:rgba(125,243,210,.035);border-radius:18px;padding:16px}.lm-home .lm-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#72b5aa;font-weight:800}.lm-home .lm-goal h3{margin:8px 0 13px;font-size:20px}.lm-home .lm-mini-row{display:flex;justify-content:space-between;align-items:center;color:#91aaa7;font-size:11px;margin-top:9px}.lm-home .lm-mini-row b{color:#dcebe8}.lm-home .lm-progress{height:7px;border-radius:99px;background:#1b3033;overflow:hidden;margin-top:8px}.lm-home .lm-progress i{display:block;height:100%;width:72%;background:linear-gradient(90deg,#75e9cc,#69d7ff);border-radius:99px}.lm-home .lm-next{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:9px}.lm-home .lm-next div{padding:13px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}.lm-home .lm-next small{display:block;color:#6f8987;font-size:9px;text-transform:uppercase;letter-spacing:.06em}.lm-home .lm-next b{display:block;margin-top:5px;font-size:12px}
.lm-home .lm-section{max-width:1180px;margin:0 auto;padding:75px 28px}.lm-home .lm-section-head{text-align:center;max-width:720px;margin:0 auto 38px}.lm-home .lm-section-head .lm-kicker{color:#79e9ce;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.lm-home .lm-section-head h2{font-family:Manrope,sans-serif;font-size:36px;letter-spacing:-.035em;margin:10px 0}.lm-home .lm-section-head p{color:#829a98;line-height:1.7;margin:0}
.lm-home .lm-cap-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.lm-home .lm-cap{min-height:205px;padding:22px;border-radius:20px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);transition:transform .2s,border-color .2s,background .2s}.lm-home .lm-cap:hover{transform:translateY(-4px);border-color:rgba(125,243,210,.20);background:rgba(125,243,210,.035)}.lm-home .lm-cap-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:rgba(125,243,210,.08);font-size:18px}.lm-home .lm-cap h3{font-size:15px;margin:17px 0 8px}.lm-home .lm-cap p{font-size:12px;line-height:1.65;color:#79918f;margin:0}
.lm-home .lm-flow{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid rgba(255,255,255,.07);border-radius:22px;overflow:hidden;background:rgba(255,255,255,.018)}.lm-home .lm-step{padding:25px 20px;border-right:1px solid rgba(255,255,255,.07)}.lm-home .lm-step:last-child{border-right:0}.lm-home .lm-step-num{color:#6ee5ca;font-size:11px;font-weight:900;letter-spacing:.08em}.lm-home .lm-step h3{font-size:14px;margin:12px 0 7px}.lm-home .lm-step p{font-size:11px;line-height:1.6;color:#748d8a;margin:0}
.lm-home .lm-career{display:grid;grid-template-columns:.9fr 1.1fr;gap:24px;align-items:stretch}.lm-home .lm-career-copy,.lm-home .lm-career-panel{border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);border-radius:24px;padding:30px}.lm-home .lm-career-copy h2{font-family:Manrope,sans-serif;font-size:32px;letter-spacing:-.03em;margin:10px 0 13px}.lm-home .lm-career-copy p{color:#829a98;line-height:1.7}.lm-home .lm-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}.lm-home .lm-pill{padding:7px 10px;border-radius:999px;background:#102225;border:1px solid rgba(255,255,255,.06);font-size:10px;color:#9db4b1}.lm-home .lm-career-panel{background:linear-gradient(145deg,#0e1b20,#0a1418)}.lm-home .lm-panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.lm-home .lm-score{font-size:12px;color:#7df3d2;font-weight:800}.lm-home .lm-skill{margin:15px 0}.lm-home .lm-skill-top{display:flex;justify-content:space-between;font-size:11px;color:#8ea6a3}.lm-home .lm-skill-top b{color:#d8e8e5}.lm-home .lm-skill .lm-progress i{width:var(--w)}
.lm-home .lm-footer{border-top:1px solid rgba(255,255,255,.07);background:#050c10;margin-top:25px}.lm-home .lm-footer-inner{max-width:1180px;margin:0 auto;padding:55px 28px 25px}.lm-home .lm-footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px}.lm-home .lm-footer-brand p{color:#6f8987;font-size:12px;line-height:1.7;max-width:310px}.lm-home .lm-footer h4{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#dceae7;margin:0 0 15px}.lm-home .lm-footer a{display:block;color:#718a88;font-size:12px;margin:10px 0;cursor:pointer}.lm-home .lm-footer a:hover{color:#8df0d4}.lm-home .lm-footer-bottom{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-top:42px;padding-top:20px;border-top:1px solid rgba(255,255,255,.06);color:#5e7775;font-size:10px}.lm-home .lm-footer-brand strong{font-family:Manrope,sans-serif;font-size:18px}.lm-home .lm-footer-badge{display:inline-flex;margin-top:16px;padding:7px 10px;border-radius:8px;background:rgba(125,243,210,.06);border:1px solid rgba(125,243,210,.10);color:#78cbb8;font-size:10px}
@media(max-width:900px){.lm-home .lm-hero,.lm-home .lm-career{grid-template-columns:1fr}.lm-home .lm-cap-grid{grid-template-columns:repeat(2,1fr)}.lm-home .lm-flow{grid-template-columns:1fr}.lm-home .lm-step{border-right:0;border-bottom:1px solid rgba(255,255,255,.07)}.lm-home .lm-step:last-child{border-bottom:0}.lm-home .lm-footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.lm-home .landing-nav{padding:17px 18px}.lm-home .actions .ghost-btn{display:none}.lm-home .lm-hero{padding:55px 18px}.lm-home .lm-hero h1{font-size:45px}.lm-home .lm-section{padding:55px 18px}.lm-home .lm-cap-grid{grid-template-columns:1fr}.lm-home .lm-footer-grid{grid-template-columns:1fr 1fr;gap:25px}.lm-home .lm-footer-bottom{align-items:flex-start;flex-direction:column}.lm-home .lm-ai-window{transform:none}}
</style>
<header class="landing-nav">
  <div class="brand"><div class="logo">✦</div><div><strong>LearnMate</strong><span>AI learning & career companion</span></div></div>
  <div class="actions"><button class="ghost-btn" onclick="go('ai')">✦ Ask LearnMate</button><button class="primary" onclick="enterApp()">Get started →</button></div>
</header>
<main>
  <section class="lm-hero">
    <div class="lm-glow"></div>
    <div>
      <div class="lm-badge"><i></i> Intelligent learning, built around you</div>
      <h1>Learn smarter.<br><span>Build faster.</span><br>Grow with purpose.</h1>
      <p class="lm-hero-copy">LearnMate is your AI-powered learning and career companion — helping you understand anything, build real projects, prepare for interviews and turn your goals into a practical next step.</p>
      <div class="lm-cta"><button class="primary" onclick="enterApp()">Start learning for free →</button><button class="ghost-btn" onclick="go('ai')">Talk to LearnMate ✦</button></div>
      <div class="lm-trust"><span><b>✦</b> Personalized</span><span><b>⌁</b> AI-guided</span><span><b>↗</b> Career-focused</span><span><b>∞</b> Learn anything</span></div>
    </div>
    <div class="lm-ai-window">
      <div class="lm-window-top"><div class="lm-dots"><i></i><i></i><i></i></div><span>LEARNMATE / AI WORKSPACE</span><span>LIVE</span></div>
      <div class="lm-ai-title"><div class="lm-ai-orb">✦</div><div><b>Your AI learning companion</b><span>Understanding your goal and planning the next move</span></div></div>
      <div class="lm-goal"><div class="lm-label">Goal detected</div><h3>Become an AI Engineer</h3><div class="lm-mini-row"><span>Career readiness</span><b>72%</b></div><div class="lm-progress"><i></i></div><div class="lm-mini-row"><span>Current focus</span><b>Deep Learning</b></div></div>
      <div class="lm-next"><div><small>Next lesson</small><b>Neural Networks</b></div><div><small>Next action</small><b>Build a mini project</b></div></div>
    </div>
  </section>

  <section class="lm-section">
    <div class="lm-section-head"><div class="lm-kicker">One companion. Every stage.</div><h2>Everything you need to move forward.</h2><p>LearnMate connects learning, practice, projects and career preparation into one intelligent workspace.</p></div>
    <div class="lm-cap-grid">
      <div class="lm-cap"><div class="lm-cap-icon">🧠</div><h3>Learn</h3><p>Understand concepts at your level with simple explanations, examples and practice.</p></div>
      <div class="lm-cap"><div class="lm-cap-icon">📚</div><h3>Study</h3><p>Turn your notes and documents into structured learning, quizzes and revision.</p></div>
      <div class="lm-cap"><div class="lm-cap-icon">🛠</div><h3>Build</h3><p>Go from idea to architecture, tasks and a real portfolio-ready project.</p></div>
      <div class="lm-cap"><div class="lm-cap-icon">💼</div><h3>Career</h3><p>See your skill gaps and follow a roadmap toward your target role.</p></div>
      <div class="lm-cap"><div class="lm-cap-icon">🎤</div><h3>Interview</h3><p>Practice technical and behavioral interviews and improve from feedback.</p></div>
    </div>
  </section>

  <section class="lm-section">
    <div class="lm-section-head"><div class="lm-kicker">Simple 5-step flow</div><h2>From “I want to learn” to “I can do it.”</h2><p>LearnMate turns a vague goal into a sequence of actions you can actually follow.</p></div>
    <div class="lm-flow">
      <div class="lm-step"><div class="lm-step-num">01</div><h3>Tell LearnMate</h3><p>Share your goal, topic, deadline or problem.</p></div>
      <div class="lm-step"><div class="lm-step-num">02</div><h3>Understand you</h3><p>LearnMate considers your level and target.</p></div>
      <div class="lm-step"><div class="lm-step-num">03</div><h3>Build your path</h3><p>Get a personalized roadmap and next actions.</p></div>
      <div class="lm-step"><div class="lm-step-num">04</div><h3>Learn & build</h3><p>Study, practice, create projects and improve.</p></div>
      <div class="lm-step"><div class="lm-step-num">05</div><h3>Grow</h3><p>Track progress and move toward your career goal.</p></div>
    </div>
  </section>

  <section class="lm-section">
    <div class="lm-career">
      <div class="lm-career-copy"><div class="lm-kicker">Career intelligence</div><h2>Your goal becomes a roadmap.</h2><p>Instead of giving you random resources, LearnMate can connect the dots between what you know, what your target role needs, what you should build and what you should practice next.</p><div class="lm-pills"><span class="lm-pill">Skill gaps</span><span class="lm-pill">Projects</span><span class="lm-pill">Resume</span><span class="lm-pill">Interviews</span><span class="lm-pill">Roadmap</span></div></div>
      <div class="lm-career-panel"><div class="lm-panel-head"><div><div class="lm-label">AI Engineer pathway</div><h3 style="margin:6px 0 0">Your skill map</h3></div><span class="lm-score">72% ready</span></div>
        <div class="lm-skill"><div class="lm-skill-top"><span>Python</span><b>Strong · 92%</b></div><div class="lm-progress"><i style="--w:92%"></i></div></div>
        <div class="lm-skill"><div class="lm-skill-top"><span>Machine Learning</span><b>Strong · 84%</b></div><div class="lm-progress"><i style="--w:84%"></i></div></div>
        <div class="lm-skill"><div class="lm-skill-top"><span>Deep Learning</span><b>Developing · 64%</b></div><div class="lm-progress"><i style="--w:64%"></i></div></div>
        <div class="lm-skill"><div class="lm-skill-top"><span>LLMs & RAG</span><b>Developing · 45%</b></div><div class="lm-progress"><i style="--w:45%"></i></div></div>
      </div>
    </div>
  </section>
</main>
<footer class="lm-footer">
  <div class="lm-footer-inner">
    <div class="lm-footer-grid">
      <div class="lm-footer-brand"><strong>LearnMate AI</strong><p>Your intelligent learning and career companion for understanding more, building better and moving closer to your goals.</p><span class="lm-footer-badge">✦ AI-powered learning workspace</span></div>
      <div><h4>Product</h4><a onclick="go('ai')">AI Assistant</a><a onclick="go('learn')">Learn</a><a onclick="go('docs')">Documents</a><a onclick="go('projects')">Projects</a></div>
      <div><h4>Career</h4><a onclick="go('career')">Career roadmap</a><a onclick="go('resume')">Resume</a><a onclick="go('interview')">Interview prep</a><a onclick="go('progress')">Progress</a></div>
      <div><h4>Explore</h4><a onclick="enterApp()">Dashboard</a><a onclick="go('planner')">Planner</a><a onclick="go('settings')">Settings</a><a onclick="go('ai')">Ask LearnMate ✦</a></div>
    </div>
    <div class="lm-footer-bottom"><span>© 2026 LearnMate AI. Learn. Build. Grow.</span><span>Built as an intelligent learning & career platform.</span></div>
  </div>
</footer>
</div>`}

function enterApp(){go('dashboard')}



function dashboard(){return shell(`<div class="content"><div class="hero"><section class="card hero-card"><div class="eyebrow">Your personal AI companion</div><h1>Good morning, ${esc(state.user.name)}. Let's make today count.</h1><p>Tell LearnMate what you want to achieve. It can turn your goal into a learning path, practice plan, project roadmap or interview session.</p><div class="hero-actions"><button class="primary" onclick="go('ai')">✦ Ask LearnMate</button><button class="ghost-btn" onclick="go('planner')">View today's plan</button></div></section><section class="card focus-card"><div><div class="eyebrow">Today's focus</div><h3 style="font-size:23px;margin-top:10px">AI Engineer readiness</h3><p class="muted">Your next recommended step is strengthening Deep Learning fundamentals.</p></div><div><div class="stat"><div><div class="metric-label">Career readiness</div><strong>72%</strong></div><span class="tag">+8% this month</span></div><div class="progress" style="margin-top:12px"><i style="width:72%"></i></div></div></section></div><div class="grid g4"><div class="card"><div class="metric-label">Learning streak</div><div class="stat"><strong>${state.streak}</strong><span>🔥 days</span></div></div><div class="card"><div class="metric-label">XP earned</div><div class="stat"><strong>${state.xp.toLocaleString()}</strong><span>⭐ XP</span></div></div><div class="card"><div class="metric-label">Hours learned</div><div class="stat"><strong>24.5</strong><span>this month</span></div></div><div class="card"><div class="metric-label">Goals completed</div><div class="stat"><strong>12</strong><span>🎯 goals</span></div></div></div><div class="section-head"><h2>Continue learning</h2><button class="link" onclick="go('learn')">View all →</button></div><div class="grid g3"><div class="card feature-card"><div><div class="feature-icon">🧠</div><h3>Deep Learning</h3><p>Neural networks, backpropagation and practical model building.</p></div><div><div class="progress"><i style="width:65%"></i></div><small class="muted">65% complete</small></div></div><div class="card feature-card"><div><div class="feature-icon">💬</div><h3>Technical Interview</h3><p>Practice explaining ML concepts clearly and confidently.</p></div><button class="ghost-btn" onclick="go('interview')">Practice now →</button></div><div class="card feature-card"><div><div class="feature-icon">🚀</div><h3>Build a project</h3><p>Turn your AI skills into a portfolio project recruiters can understand.</p></div><button class="ghost-btn" onclick="go('projects')">Explore projects →</button></div></div><div class="section-head"><h2>Today's plan</h2><button class="link" onclick="go('planner')">Open planner →</button></div><div class="card"><div class="timeline"><div class="timeline-item"><span class="time">06:00 PM</span><i class="dot"></i><div><b>Deep Learning — Fundamentals</b><div class="muted">45 minutes · Continue lesson</div></div></div><div class="timeline-item"><span class="time">07:00 PM</span><i class="dot"></i><div><b>Interview practice</b><div class="muted">20 minutes · 5 technical questions</div></div></div><div class="timeline-item"><span class="time">07:30 PM</span><i class="dot"></i><div><b>Quick quiz</b><div class="muted">10 questions · Reinforce today's learning</div></div></div></div></div></div>`,'Dashboard')}



function ai(){return shell(`<div class="content"><div class="chat-layout"><aside class="card chat-side"><div class="eyebrow">AI workspace</div><h3>Conversations</h3><button class="ghost-btn" onclick="newChat()">＋ New conversation</button><div class="list" style="margin-top:6px"><div class="list-row"><div class="left"><div class="round">✦</div><span>My learning plan</span></div><span class="muted">Now</span></div><div class="list-row"><div class="left"><div class="round">🎤</div><span>Interview prep</span></div></div><div class="list-row"><div class="left"><div class="round">🚀</div><span>Project ideas</span></div></div></div></aside><section class="card chat-main"><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:13px"><div><div class="eyebrow">Adaptive AI</div><h3 style="margin-top:4px">Ask LearnMate</h3></div><span class="tag">Context aware</span></div><div id="chatMessages" class="chat-messages">${state.chats.map(m=>`<div class="bubble ${m.who}">${esc(m.text)}</div>`).join('')}</div><div class="suggestions"><button class="suggestion" onclick="quickChat('Make me a 7-day plan to learn Python')">Make a learning plan</button><button class="suggestion" onclick="quickChat('Prepare me for an AI interview')">Prepare for interview</button><button class="suggestion" onclick="quickChat('Give me a project idea for my skills')">Find a project</button><button class="suggestion" onclick="quickChat('Review my career goal and tell me what to learn next')">What should I learn next?</button></div><form class="chat-input" onsubmit="sendChat(event)"><input id="chatInput" class="input" placeholder="Tell me what you want to learn, build or achieve..." autocomplete="off"><button class="primary">Send →</button></form></section></div></div>`,'AI Assistant')}



function newChat(){state.chats=[{who:'ai',text:'New conversation started. What are you working toward?'}];store.set('lm_chats',state.chats);render()}



function quickChat(t){document.getElementById('chatInput').value=t;document.querySelector('.chat-input').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}))}



function sendChat(e){e.preventDefault();const input=document.getElementById('chatInput');const t=input.value.trim();if(!t)return;state.chats.push({who:'user',text:t});let r='I can help with that. I would break your goal into a clear next step, then a practical plan you can follow. For this MVP, the response is simulated — the real agent router can be connected next.';if(/interview/i.test(t))r='Let’s prepare strategically: first identify the role, then practice technical and behavioral questions, analyze your answers, and turn weak areas into a focused practice plan.';if(/resume/i.test(t))r='For a strong resume, we can align your summary, skills and projects to the target role, improve impact-focused bullets, and run an ATS-style review.';if(/plan|learn/i.test(t))r='I recommend a goal → roadmap → daily tasks → practice → assessment loop. Tell me your deadline and available time and LearnMate can personalize it.';if(/project/i.test(t))r='I can help you choose a project based on your current skills, target career, time available and desired difficulty, then guide you through architecture, development and deployment.';state.chats.push({who:'ai',text:r});store.set('lm_chats',state.chats);render();setTimeout(()=>{const el=document.getElementById('chatMessages');if(el)el.scrollTop=el.scrollHeight},30)}



function learn(){return shell(`
  <div class="content">
    <div class="page-title">Learn anything, your way.</div>
    <p class="sub">Tell LearnMate what you want to learn and it will turn the topic into a practical path with lessons, practice and revision.</p>

    <div class="card" style="margin-bottom:16px">
      <div class="eyebrow">AI Learning Path</div>
      <h3>What do you want to learn?</h3>
      <div style="display:flex;gap:10px;margin-top:12px;align-items:center">
        <input id="learnTopicInput" class="input" placeholder="e.g. Python, photography, calculus, machine learning..." onkeydown="if(event.key==='Enter'){event.preventDefault();generateLearningPath()}" />
        <button class="primary" type="button" onclick="generateLearningPath()">Create path →</button>
      </div>
      <div class="suggestions" style="margin-top:12px">
        <button class="suggestion" type="button" onclick="setLearnTopic('Python')">Python</button>
        <button class="suggestion" type="button" onclick="setLearnTopic('Machine Learning')">Machine Learning</button>
        <button class="suggestion" type="button" onclick="setLearnTopic('English communication')">English</button>
        <button class="suggestion" type="button" onclick="setLearnTopic('Data Science')">Data Science</button>
        <button class="suggestion" type="button" onclick="setLearnTopic('Digital Marketing')">Digital Marketing</button>
      </div>
      <div id="learnPathResult" style="margin-top:18px"></div>
    </div>

    <div class="section-head">
      <h2>Your learning paths</h2>
      <span class="muted">Personalized</span>
    </div>

    <div class="grid g3">
      <div class="card feature-card">
        <div>
          <div class="feature-icon">🐍</div>
          <h3>Python Foundations</h3>
          <p>Syntax → functions → OOP → projects.</p>
        </div>
        <div>
          <div class="progress"><i style="width:82%"></i></div>
          <small class="muted">82% · 4h 20m left</small>
        </div>
      </div>
      <div class="card feature-card">
        <div>
          <div class="feature-icon">🧠</div>
          <h3>Machine Learning</h3>
          <p>Models, evaluation, practical intuition and projects.</p>
        </div>
        <div>
          <div class="progress"><i style="width:58%"></i></div>
          <small class="muted">58% · 8h 10m left</small>
        </div>
      </div>
      <div class="card feature-card">
        <div>
          <div class="feature-icon">🎯</div>
          <h3>Interview Communication</h3>
          <p>Answer structure, confidence and concise explanations.</p>
        </div>
        <div>
          <div class="progress"><i style="width:35%"></i></div>
          <small class="muted">35% · 3h 40m left</small>
        </div>
      </div>
    </div>

    <div class="section-head">
      <h2>Learning toolkit</h2>
      <span class="muted">Powered by LearnMate AI</span>
    </div>

    <div class="grid g4">
      <div class="card feature-card">
        <div>
          <div class="feature-icon">📖</div>
          <h3>Learn</h3>
          <p>Get a clear explanation at your current level, with examples and practice.</p>
        </div>
        <button class="ghost-btn" type="button" onclick="openLearningLesson()">Open →</button>
      </div>
      <div class="card feature-card">
        <div>
          <div class="feature-icon">🧪</div>
          <h3>Quiz</h3>
          <p>Generate questions that check whether you actually understood the topic.</p>
        </div>
        <button class="ghost-btn" type="button" onclick="generateLearningQuiz()">Generate →</button>
      </div>
      <div class="card feature-card">
        <div>
          <div class="feature-icon">🗂️</div>
          <h3>Flashcards</h3>
          <p>Turn the important ideas into quick revision cards.</p>
        </div>
        <button class="ghost-btn" type="button" onclick="generateLearningFlashcards()">Create →</button>
      </div>
      <div class="card feature-card">
        <div>
          <div class="feature-icon">📊</div>
          <h3>Progress</h3>
          <p>See your current learning progress and decide what to work on next.</p>
        </div>
        <button class="ghost-btn" type="button" onclick="go('progress')">View →</button>
      </div>
    </div>
  </div>
`,'Learn')}


async function learnMateLearningAI(prompt){

  const history=[];

  try{

    const response=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        message:prompt,
        history,
        profile:{
          name:state.user?.name||'Learner',
          career_goal:state.user?.goal||'Not specified'
        }
      })
    });

    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(data.error||'LearnMate AI could not respond right now.');
    if(!data.output) throw new Error('LearnMate returned an empty response.');
    return data.output;

  }catch(error){

    console.warn('LearnMate AI unavailable. Using built-in demo fallback:',error);
    return getLearnMateDemoFallback(prompt);

  }

}


function getLearnMateDemoFallback(prompt){

  const text=String(prompt||'');
  const topicMatch=text.match(/topic:\s*([^\.]+)\./i);
  const topic=(topicMatch?.[1]||localStorage.getItem('lm_learning_topic')||'the topic').trim();

  if(/learning path/i.test(text)){
    return `# ${topic} Learning Path

**Goal**
Build a practical foundation in ${topic} and become confident enough to use it in a small project.

## Prerequisites
- Basic computer/programming knowledge
- Willingness to practice regularly
- No advanced background required for this starter path

## Modules
1. **Foundations** — Learn the core terms, concepts, syntax or building blocks of ${topic}.
2. **Core concepts** — Understand the most important ideas and how they connect.
3. **Hands-on practice** — Solve small exercises after every concept.
4. **Intermediate skills** — Work with common real-world patterns and problems.
5. **Mini project** — Build one small useful application using what you learned.
6. **Review & assessment** — Test yourself, identify weak areas and revise them.

## Practice Plan
- Study one concept at a time.
- Write or solve examples yourself instead of only reading.
- Keep a small notes file with mistakes and corrections.
- Finish at least 3 practice problems before moving forward.

## Mini Project
Build a beginner-friendly **${topic} Practice Project** that demonstrates the core concepts and can later become part of your portfolio.

## First Task Today
Spend 25 minutes learning the foundations of ${topic}, then complete 3 small practice exercises without looking at the solution.

**Next step:** Click **Start lesson** to begin with the fundamentals.`;
  }

  if(/focused lesson/i.test(text)){
    return `# ${topic}: Your First Lesson

## Simple explanation
${topic} is a skill or technology you can learn by understanding its basic building blocks and then applying them through practice. The fastest way to learn it is to connect every concept to a small example.

## Intuition
Think of learning ${topic} like building with blocks: first learn what each block does, then learn how blocks fit together, and finally build something useful.

## Real-world example
A real ${topic} workflow usually starts with a goal, uses the core concepts to solve a problem, checks the result, and improves it when something goes wrong.

## Small practice
1. Write down 3 things you already know about ${topic}.
2. Learn one new core concept.
3. Explain that concept in your own words.
4. Try one tiny example without copying.

## Common mistakes
- Trying to learn everything at once.
- Watching tutorials without practicing.
- Copying code or answers without understanding them.
- Skipping revision after making mistakes.

## Practice questions
1. What is ${topic} used for?
2. Name two important concepts you should learn first.
3. Describe one small project you could build with ${topic}.

**Next step:** Answer the three questions, then take the quiz.`;
  }

  if(/5-question quiz/i.test(text)){
    return `# ${topic} Quick Quiz

### Question 1
What is the best way to begin learning ${topic}?
- A. Memorize everything first
- B. Learn the foundations and practice
- C. Skip the basics
- D. Only watch videos

**Correct answer:** B
**Why:** Strong fundamentals plus practice create usable understanding.

### Question 2
Which approach is most useful when learning a technical skill?
- A. Practice small examples
- B. Avoid mistakes
- C. Never revise
- D. Copy every solution

**Correct answer:** A
**Why:** Small hands-on examples reinforce concepts.

### Question 3
What should you do after getting a practice problem wrong?
- A. Ignore it
- B. Memorize the answer
- C. Understand the mistake and retry
- D. Stop learning

**Correct answer:** C
**Why:** Mistakes reveal exactly what needs improvement.

### Question 4
Why build a small project while learning ${topic}?
- A. To avoid theory
- B. To apply and connect concepts
- C. To finish instantly
- D. To skip practice

**Correct answer:** B
**Why:** Projects turn separate concepts into practical skill.

### Question 5
What is a good next step after a beginner lesson?
- A. Forget the lesson
- B. Practice, review mistakes and continue
- C. Jump to advanced topics immediately
- D. Stop practicing

**Correct answer:** B
**Why:** Practice and feedback are essential for progress.`;
  }

  if(/10 flashcards/i.test(text)){
    return `# ${topic} Flashcards

**Card 1 — What is ${topic}?**
A skill or technology that can be learned through concepts, examples and practice.

**Card 2 — Where do I start?**
Start with the fundamentals and vocabulary.

**Card 3 — Why practice?**
Practice turns passive understanding into usable skill.

**Card 4 — What is a core concept?**
An essential idea you need to understand before applying the skill.

**Card 5 — What should I do when stuck?**
Break the problem into smaller parts and test one idea at a time.

**Card 6 — Why make projects?**
Projects show that you can apply concepts to real problems.

**Card 7 — How should I revise?**
Recall the concept without notes, then check and correct yourself.

**Card 8 — What is a common beginner mistake?**
Trying to learn too much without enough hands-on practice.

**Card 9 — How do I measure progress?**
Track concepts understood, exercises completed and projects built.

**Card 10 — What comes next?**
Practice the fundamentals, identify weak areas and move to the next module.`;
  }

  return `# LearnMate Demo Mode

The AI service is temporarily unavailable, so LearnMate is using its built-in learning fallback.

You can still continue practicing **${topic}**.

**Next step:** Start with the fundamentals, complete a small exercise, and continue through the learning path.`;
}


function setLearnTopic(topic){

  const input=document.getElementById('learnTopicInput');

  if(input){input.value=topic;input.focus();}

}



function getCurrentLearnTopic(){

  const input=document.getElementById('learnTopicInput');

  const saved=localStorage.getItem('lm_learning_topic')||'';

  return (input?.value.trim()||saved||'').trim();

}



function saveLearnTopic(topic){

  localStorage.setItem('lm_learning_topic',topic);

}



function renderLearnMateMarkdown(markdown){

  const source=String(markdown||'').replace(/\r\n/g,'\n').trim();
  if(!source) return '';

  const safe=esc(source)
    .replace(/```([\s\S]*?)```/g,(_,code)=>`<pre style="background:#0b171b;color:#e8fffa;padding:16px;border-radius:14px;overflow:auto;margin:14px 0"><code>${code.trim()}</code></pre>`)
    .replace(/^### (.+)$/gm,'<h4 style="margin:20px 0 8px;font-size:16px;color:#102326">$1</h4>')
    .replace(/^## (.+)$/gm,'<h3 style="margin:22px 0 9px;font-size:19px;color:#102326">$1</h3>')
    .replace(/^# (.+)$/gm,'<h2 style="margin:22px 0 10px;font-size:23px;color:#102326">$1</h2>')
    .replace(/^---+$/gm,'<hr style="border:0;border-top:1px solid #dce7e5;margin:18px 0">')
    .replace(/^\* (.+)$/gm,'<li style="margin:6px 0">$1</li>')
    .replace(/^- (.+)$/gm,'<li style="margin:6px 0">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm,'<li style="margin:6px 0"><strong>$1.</strong> $2</li>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/`([^`]+)`/g,'<code style="background:#edf4f2;padding:2px 6px;border-radius:6px;font-size:.92em">$1</code>')
    .replace(/\*([^*]+)\*/g,'<em>$1</em>')
    .replace(/\n\n/g,'</p><p style="margin:12px 0">')
    .replace(/\n/g,'<br>');

  return `<div class="learnmate-markdown"><p style="margin:0">${safe}</p></div>`;
}


function showLearnMateLearningModal(title,body){

  const old=document.getElementById('learnMateLearningModal');

  if(old) old.remove();

  const modal=document.createElement('div');

  modal.id='learnMateLearningModal';

  modal.innerHTML=`

    <div style="position:fixed;inset:0;z-index:100000;background:rgba(5,12,18,.78);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px">

      <div style="width:min(760px,100%);max-height:85vh;overflow:auto;background:#ffffff;border-radius:24px;padding:30px;box-shadow:0 30px 80px rgba(0,0,0,.35);color:#102326">

        <div style="display:flex;justify-content:space-between;gap:20px;align-items:flex-start">

          <div><div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#17836b">LearnMate AI</div><h2 style="margin:6px 0 0;font-family:Manrope,sans-serif">${esc(title)}</h2></div>

          <button type="button" onclick="closeLearningModal()" style="border:0;background:#eef3f3;border-radius:10px;padding:8px 12px;cursor:pointer;font-weight:700">✕</button>

        </div>

        <div style="margin-top:22px;line-height:1.75;font-size:15px">${renderLearnMateMarkdown(body)}</div>

      </div>

    </div>`;

  document.body.appendChild(modal);

}


function closeLearningModal(){

  const modal=document.getElementById('learnMateLearningModal');

  if(modal) modal.remove();

}



async function generateLearningPath(){

  const input=document.getElementById('learnTopicInput');

  const topic=input?.value.trim()||'';

  const result=document.getElementById('learnPathResult');

  if(!topic){toast('Tell me what you want to learn first');input?.focus();return;}

  saveLearnTopic(topic);

  if(result) result.innerHTML='<div class="card" style="padding:18px"><b>LearnMate is building your path...</b><p class="muted" style="margin-top:6px">Analyzing the topic and organizing the best learning sequence.</p></div>';

  try{

    const output=await learnMateLearningAI(`Create a practical learning path for the topic: ${topic}. The learner is ${state.user?.name||'a learner'} and their current career goal is ${state.user?.goal||'not specified'}. Start from an appropriate beginner-friendly level unless the topic clearly requires otherwise. Give: 1) goal, 2) prerequisites, 3) 5-8 ordered modules, 4) what to practice in each module, 5) a small project, 6) a first task for today. Keep it actionable and easy to follow.`);

    if(result) result.innerHTML=`<div class="card" style="padding:20px"><div class="eyebrow">Your AI-generated path</div><h3 style="margin-top:6px">${esc(topic)}</h3><div style="margin-top:14px;white-space:pre-wrap;line-height:1.7">${renderLearnMateMarkdown(output)}</div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><button class="primary" type="button" onclick="openLearningLesson()">Start lesson →</button><button class="ghost-btn" type="button" onclick="generateLearningQuiz()">Test me →</button></div></div>`;

  }catch(error){

    if(result) result.innerHTML='<div class="card" style="padding:18px"><b>Could not generate the path.</b><p class="muted" style="margin-top:6px">'+esc(error.message)+'</p></div>';

    toast('AI learning path failed');

  }

}



async function openLearningLesson(){

  const topic=getCurrentLearnTopic();

  if(!topic){toast('Choose a topic first');document.getElementById('learnTopicInput')?.focus();return;}

  saveLearnTopic(topic);

  showLearnMateLearningModal('Preparing your lesson...','LearnMate is creating a lesson for '+topic+'...');

  try{

    const output=await learnMateLearningAI(`Teach me ${topic} as a focused lesson. Assume I am learning this for the first time unless my context says otherwise. Use this sequence: simple explanation, intuition, real-world example, small example, common mistakes, then 3 practice questions. Finish with one clear next step. Do not overwhelm me.`);

    showLearnMateLearningModal(`Learn: ${topic}`,output);

  }catch(error){showLearnMateLearningModal('Lesson unavailable',error.message);}

}



async function generateLearningQuiz(){

  const topic=getCurrentLearnTopic();

  if(!topic){toast('Choose a topic first');document.getElementById('learnTopicInput')?.focus();return;}

  saveLearnTopic(topic);

  showLearnMateLearningModal('Generating your quiz...','LearnMate is preparing questions for '+topic+'...');

  try{

    const output=await learnMateLearningAI(`Create a short 5-question quiz on ${topic} for a learner. Mix conceptual and practical questions. For each question give 4 options (A-D), clearly mark the correct answer after the options, and add a one-sentence explanation. Make the difficulty increase gradually.`);

    showLearnMateLearningModal(`Quiz: ${topic}`,output);

  }catch(error){showLearnMateLearningModal('Quiz unavailable',error.message);}

}



async function generateLearningFlashcards(){

  const topic=getCurrentLearnTopic();

  if(!topic){toast('Choose a topic first');document.getElementById('learnTopicInput')?.focus();return;}

  saveLearnTopic(topic);

  showLearnMateLearningModal('Creating flashcards...','LearnMate is selecting the most important ideas from '+topic+'...');

  try{

    const output=await learnMateLearningAI(`Create 10 concise study flashcards for ${topic}. Format each as: Card 1 — Front: ... Back: ... Keep each answer short but useful, focus on high-value concepts, definitions, relationships and common interview points.`);

    showLearnMateLearningModal(`Flashcards: ${topic}`,output);

  }catch(error){showLearnMateLearningModal('Flashcards unavailable',error.message);}

}





async function learnMateAssistantChat(e){
  if(e) e.preventDefault();
  const input=document.getElementById('chatInput');
  if(!input) return;
  const message=input.value.trim();
  if(!message) return;
  input.value='';

  state.chats.push({who:'user',text:message});
  store.set('lm_chats',state.chats);
  render();

  try{
    const response=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        message,
        history:state.chats.slice(-12).map(m=>({role:m.who==='ai'?'assistant':'user',content:m.text})),
        profile:{name:state.user?.name||'Learner',career_goal:state.user?.goal||'Not specified'}
      })
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(data.error||'AI service unavailable');
    if(!data.output) throw new Error('AI returned an empty response');
    state.chats.push({who:'ai',text:data.output});
  }catch(error){
    console.warn('LearnMate Assistant AI unavailable; using fallback:',error);
    state.chats.push({who:'ai',text:getLearnMateChatFallback(message)});
  }

  store.set('lm_chats',state.chats);
  render();
  setTimeout(()=>{
    const el=document.getElementById('chatMessages');
    if(el) el.scrollTop=el.scrollHeight;
  },30);
}

function getLearnMateChatFallback(message){
  const t=String(message||'');
  if(/interview/i.test(t)) return `**Interview preparation**\n\nI can help you prepare step by step.\n\n1. Choose the target role.\n2. Review the required technical skills.\n3. Practice technical and HR questions.\n4. Improve weak answers with feedback.\n\n**Next step:** Tell me the role you are preparing for and your interview date.`;
  if(/resume|cv/i.test(t)) return `**Resume improvement**\n\nFocus on the target role first, then align your summary, skills and projects to that role. Use measurable outcomes where possible.\n\n**Next step:** Tell me the job role and I can give you a section-by-section improvement checklist.`;
  if(/project|build/i.test(t)) return `**Project planning**\n\nA strong project should match your current skills, career goal and available time. Start with the problem, users, features, architecture and first milestone.\n\n**Next step:** Tell me what skills you already know and I’ll suggest a project structure.`;
  if(/plan|learn|study/i.test(t)) return `**Learning plan**\n\nUse this loop: goal → fundamentals → practice → quiz → project → revision. Keep each study session focused on one measurable outcome.\n\n**Next step:** Tell me the topic, deadline and hours you can study each day.`;
  return `**LearnMate Demo Mode**\n\nThe live AI service is temporarily unavailable because its current API quota/credits are unavailable. Your LearnMate workspace is still working, and I can continue guiding you with the built-in assistant.\n\n**Next step:** Tell me what you want to learn, build or achieve, and I’ll help you break it into practical steps.`;
}

// supabase-auth.js currently installs an older simulated sendChat handler after app.js loads.
// Re-attach the real/fallback assistant after all scripts have initialized.
setTimeout(()=>{
  window.sendChat=learnMateAssistantChat;
},0);
window.learnMateAssistantChat=learnMateAssistantChat;

window.generateLearningPath=generateLearningPath;

window.openLearningLesson=openLearningLesson;

window.generateLearningQuiz=generateLearningQuiz;

window.generateLearningFlashcards=generateLearningFlashcards;

window.setLearnTopic=setLearnTopic;

window.closeLearningModal=closeLearningModal;
window.renderLearnMateMarkdown=renderLearnMateMarkdown;



function uploadDoc(el){if(el.files[0])toast(`${el.files[0].name} added to your workspace`)}



function interview(){return shell(`<div class="content"><div class="page-title">Interview Studio</div><p class="sub">Practice realistic interviews, get structured feedback and turn weak areas into your next preparation plan.</p><div class="grid g3"><div class="card feature-card"><div><div class="feature-icon">💼</div><h3>HR Interview</h3><p>Communication, behavioral and situational questions.</p></div><button class="primary" onclick="startInterview('HR')">Start →</button></div><div class="card feature-card"><div><div class="feature-icon">💻</div><h3>Technical Interview</h3><p>Role-specific questions with adaptive difficulty.</p></div><button class="primary" onclick="startInterview('Technical')">Start →</button></div><div class="card feature-card"><div><div class="feature-icon">🚀</div><h3>Project Interview</h3><p>Defend your project decisions like a real interview.</p></div><button class="primary" onclick="startInterview('Project')">Start →</button></div></div><div class="section-head"><h2>Latest performance</h2></div><div class="split"><div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="eyebrow">Last mock interview</div><h3>Technical — AI Engineer</h3><p class="muted">5 questions · 18 minutes</p></div><div class="score"><strong>78%</strong></div></div><div class="grid g2" style="margin-top:18px"><div><div class="metric-label">Technical knowledge</div><div class="progress"><i style="width:84%"></i></div></div><div><div class="metric-label">Communication</div><div class="progress"><i style="width:72%"></i></div></div><div><div class="metric-label">Answer structure</div><div class="progress"><i style="width:79%"></i></div></div><div><div class="metric-label">Confidence</div><div class="progress"><i style="width:65%"></i></div></div></div></div><div class="card"><div class="eyebrow">Recommended next</div><h3>Explain your projects more clearly</h3><p class="muted">Your answers are technically strong. Practice concise explanations using the Situation → Action → Result structure.</p><button class="ghost-btn" onclick="startInterview('Communication')">Practice weakness →</button></div></div></div>`,'Interview')}



function startInterview(type){toast(`${type} interview session started`);setTimeout(()=>go('ai'),500)}



function planner(){return shell(`<div class="content"><div class="page-title">Your AI planner.</div><p class="sub">Turn goals, deadlines and available time into a plan you can actually follow.</p><div class="grid g3"><div class="card"><div class="eyebrow">This week</div><h3>18h 30m planned</h3><p class="muted">Across learning, projects and interview prep.</p><button class="primary" onclick="createTask()">＋ Add goal</button></div><div class="card"><div class="eyebrow">Completion</div><h3>76%</h3><div class="progress"><i style="width:76%"></i></div><p class="muted">You're ahead of your weekly target.</p></div><div class="card"><div class="eyebrow">AI adjustment</div><h3>2 tasks moved</h3><p class="muted">Your plan adapts when you miss or reschedule a task.</p></div></div><div class="section-head"><h2>Today's schedule</h2><button class="link" onclick="toast('Plan optimized for your current goals')">✦ Optimize with AI</button></div><div class="card"><div class="timeline"><div class="timeline-item"><span class="time">6:00 PM</span><i class="dot"></i><div><b>Deep Learning</b><div class="muted">Learn neural network fundamentals · 45 min</div></div></div><div class="timeline-item"><span class="time">7:00 PM</span><i class="dot"></i><div><b>Technical Interview</b><div class="muted">5 questions · 20 min</div></div></div><div class="timeline-item"><span class="time">7:30 PM</span><i class="dot"></i><div><b>Project sprint</b><div class="muted">Implement document upload · 60 min</div></div></div></div></div><div class="section-head"><h2>Weekly view</h2></div><div class="card"><div class="calendar">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>`<div class="day"><b>${d}</b><span>${i<5?'2 tasks':'1 task'}</span></div>`).join('')}</div></div></div>`,'Planner')}



function createTask(){const t=prompt('What goal should LearnMate add?');if(t){state.tasks.push(t);store.set('lm_tasks',state.tasks);toast('Goal added to your plan')}}



function projects(){return shell(`<div class="content"><div class="page-title">Build something worth showing.</div><p class="sub">Discover ideas, choose the right difficulty and get a guided roadmap from problem statement to deployment.</p><div class="card" style="margin-bottom:18px"><div class="eyebrow">AI Project Generator</div><h3>Tell us what you want to build</h3><div style="display:flex;gap:10px;margin-top:12px"><input id="projectInput" class="input" placeholder="e.g. An AI project for my final year and portfolio"><button class="primary" onclick="generateProject()">Generate →</button></div></div><div class="section-head"><h2>Recommended for you</h2><span class="muted">Based on your career goal</span></div><div class="grid g3"><div class="card feature-card"><div><span class="tag">AI / Intermediate</span><h3 style="margin-top:12px">LearnMate Document Intelligence</h3><p>Build a RAG application that lets learners chat with their own study materials.</p></div><button class="ghost-btn" onclick="toast('Project roadmap opened')">View roadmap →</button></div><div class="card feature-card"><div><span class="tag">ML / Intermediate</span><h3 style="margin-top:12px">Interview Readiness Predictor</h3><p>Analyze practice performance and predict readiness across skill areas.</p></div><button class="ghost-btn" onclick="toast('Project roadmap opened')">View roadmap →</button></div><div class="card feature-card"><div><span class="tag">LLM / Advanced</span><h3 style="margin-top:12px">Agentic Career Coach</h3><p>Coordinate specialized agents for learning, projects, resumes and interview prep.</p></div><button class="ghost-btn" onclick="toast('Project roadmap opened')">View roadmap →</button></div></div></div>`,'Projects')}



function generateProject(){const x=document.getElementById('projectInput').value.trim();toast(x?`Project plan generated for: ${x}`:'Tell me what you want to build first')}



function career(){return shell(`<div class="content"><div class="page-title">Career, made actionable.</div><p class="sub">Set a destination and LearnMate maps the skills, projects and preparation that can take you there.</p><div class="split"><div class="card"><div class="eyebrow">Current goal</div><h3 style="font-size:25px">${esc(state.user.goal)}</h3><p class="muted">Your roadmap connects learning → skills → projects → resume → interview preparation.</p><button class="primary" onclick="toast('Career roadmap updated')">✦ Improve my roadmap</button></div><div class="card"><div class="eyebrow">Career readiness</div><div class="stat"><strong>72%</strong><span class="tag">On track</span></div><div class="progress" style="margin-top:12px"><i style="width:72%"></i></div></div></div><div class="section-head"><h2>Skill gap</h2><span class="muted">For ${esc(state.user.goal)}</span></div><div class="card">${[['Python','Strong',92],['Machine Learning','Strong',84],['Deep Learning','Developing',64],['LLMs & RAG','Developing',45],['MLOps','Needs focus',22],['System Design','Needs focus',15]].map(x=>`<div class="bar-row"><div class="bar-head"><span>${x[0]}</span><span class="muted">${x[1]} · ${x[2]}%</span></div><div class="progress"><i style="width:${x[2]}%"></i></div></div>`).join('')}</div><div class="section-head"><h2>Career toolkit</h2></div><div class="grid g3"><div class="card feature-card"><div><div class="feature-icon">🧭</div><h3>Roadmaps</h3><p>See what to learn for a target role and why it matters.</p></div><button class="ghost-btn" onclick="go('learn')">Explore →</button></div><div class="card feature-card"><div><div class="feature-icon">📄</div><h3>Resume</h3><p>Build and tailor a role-focused resume.</p></div><button class="ghost-btn" onclick="go('resume')">Open →</button></div><div class="card feature-card"><div><div class="feature-icon">🎤</div><h3>Interview</h3><p>Practice the skills employers will test.</p></div><button class="ghost-btn" onclick="go('interview')">Practice →</button></div></div></div>`,'Career')}



function resume(){return shell(`<div class="content"><div class="page-title">Resume Studio</div><p class="sub">Build a clear, ATS-friendly resume and tailor it to the role you want next.</p><div class="grid g2"><div class="card"><div class="eyebrow">Resume profile</div><div class="form-grid" style="margin-top:13px"><div class="form-group"><label>Full name</label><input id="rname" class="input" value="${esc(state.user.name)}"></div><div class="form-group"><label>Target role</label><input id="rrole" class="input" value="${esc(state.user.goal)}"></div><div class="form-group full"><label>Professional summary</label><textarea id="rsummary" class="textarea">AI/ML student passionate about building intelligent products and solving real-world problems.</textarea></div><div class="form-group full"><label>Skills</label><input class="input" value="Python, Machine Learning, NLP, LLMs, RAG, SQL, Git"></div><div class="form-group full"><label>Projects</label><textarea class="textarea">LearnMate AI — Intelligent learning and career guidance platform using conversational AI, RAG and specialized agents.</textarea></div></div><button class="primary" style="margin-top:14px" onclick="saveResume()">Save & analyze →</button></div><div class="resume"><h1 id="previewName">${esc(state.user.name)}</h1><p><b>${esc(state.user.goal)}</b> · Hyderabad, India · your.email\@example.com</p><h2>Profile</h2><p id="previewSummary">AI/ML student passionate about building intelligent products and solving real-world problems.</p><h2>Skills</h2><p>Python · Machine Learning · NLP · LLMs · RAG · SQL · Git</p><h2>Projects</h2><p><b>LearnMate AI</b> — Intelligent learning and career guidance platform combining conversational AI, RAG and specialized agents.</p><ul><li>Designed a learner-first experience spanning study, projects, interviews and career preparation.</li><li>Planned agent routing, document retrieval and personalized learning workflows.</li></ul><h2>Education</h2><p>B.Tech — Computer Science & Engineering</p></div></div></div>`,'Resume Studio')}



function saveResume(){const n=document.getElementById('rname').value;state.user.name=n||state.user.name;state.user.goal=document.getElementById('rrole').value||state.user.goal;store.set('lm_user',state.user);document.getElementById('previewName').textContent=state.user.name;document.getElementById('previewSummary').textContent=document.getElementById('rsummary').value;toast('Resume saved and analyzed')}



function progress(){return shell(`<div class="content"><div class="page-title">Your progress.</div><p class="sub">A calm view of what you've learned, practiced and completed.</p><div class="grid g4"><div class="card"><div class="metric-label">Overall learning</div><div class="stat"><strong>74%</strong><span>↗ 9%</span></div></div><div class="card"><div class="metric-label">Interview readiness</div><div class="stat"><strong>78%</strong><span>↗ 6%</span></div></div><div class="card"><div class="metric-label">Projects</div><div class="stat"><strong>4</strong><span>completed</span></div></div><div class="card"><div class="metric-label">Badges</div><div class="stat"><strong>7</strong><span>🏆 earned</span></div></div></div><div class="section-head"><h2>Skill growth</h2></div><div class="card">${[['Python',90],['ML',78],['NLP',68],['LLMs',52],['Interview',74]].map(x=>`<div class="bar-row"><div class="bar-head"><span>${x[0]}</span><span class="muted">${x[1]}%</span></div><div class="progress"><i style="width:${x[1]}%"></i></div></div>`).join('')}</div><div class="section-head"><h2>Achievements</h2></div><div class="grid g3"><div class="card"><div style="font-size:28px">🔥</div><h3>Consistency</h3><p class="muted">Maintained an 8-day learning streak.</p></div><div class="card"><div style="font-size:28px">🎤</div><h3>Interview Starter</h3><p class="muted">Completed your first mock interview.</p></div><div class="card"><div style="font-size:28px">🚀</div><h3>Builder</h3><p class="muted">Completed your first guided project.</p></div></div></div>`,'Progress')}



function settings(){return shell(`<div class="content"><div class="page-title">Settings</div><p class="sub">Make LearnMate work the way you learn.</p><div class="grid g2"><div class="card"><div class="eyebrow">Profile</div><div class="form-grid" style="margin-top:14px"><div class="form-group"><label>Name</label><input id="sname" class="input" value="${esc(state.user.name)}"></div><div class="form-group"><label>Target career</label><input id="sgoal" class="input" value="${esc(state.user.goal)}"></div></div><button class="primary" style="margin-top:14px" onclick="saveSettings()">Save changes</button></div><div class="card"><div class="eyebrow">Preferences</div><div class="list" style="margin-top:12px"><div class="list-row"><span>Adaptive explanations</span><span class="tag">On</span></div><div class="list-row"><span>Learning reminders</span><span class="tag">On</span></div><div class="list-row"><span>Progress & streaks</span><span class="tag">On</span></div><div class="list-row"><span>Memory</span><span class="tag">Ask before saving</span></div></div></div></div></div>`,'Settings')}



function saveSettings(){state.user.name=document.getElementById('sname').value||'Alex';state.user.goal=document.getElementById('sgoal').value||'Learner';store.set('lm_user',state.user);toast('Profile updated');render()}



function render(){let html;switch(state.page){case'landing':html=landing();break;case'dashboard':html=dashboard();break;case'ai':html=ai();break;case'learn':html=learn();break;case'docs':html=docs();break;case'interview':html=interview();break;case'planner':html=planner();break;case'projects':html=projects();break;case'career':html=career();break;case'resume':html=resume();break;case'progress':html=progress();break;case'settings':html=settings();break;default:html=landing()}app.innerHTML=html}



window.go=go;window.render=render;window.enterApp=enterApp;window.state=state;window.newChat=newChat;window.quickChat=quickChat;window.sendChat=sendChat;window.uploadDoc=uploadDoc;window.startInterview=startInterview;window.createTask=createTask;window.generateProject=generateProject;window.saveResume=saveResume;window.saveSettings=saveSettings;



render();