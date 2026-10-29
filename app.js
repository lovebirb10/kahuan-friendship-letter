import {questions,dimensions,calculateResult} from './data.js?v=18-3';
import {resultCopy} from './result-copy.js?v=18-3';

const main=document.querySelector('main');
const KEY='kahuan-letter-v2-final18';
let answers=Array(18).fill(null), current=0, storageAvailable=true;
try {
 const saved=JSON.parse(localStorage.getItem(KEY));
 if(saved?.version===2&&Array.isArray(saved.answers)&&saved.answers.length===18&&saved.answers.every(a=>a===null||Number.isInteger(a)&&a>=0&&a<6)){
  answers=saved.answers;
  current=Number.isInteger(saved.current)?Math.max(0,Math.min(17,saved.current)):0;
 }
}catch{storageAvailable=false;}
const count=()=>answers.filter(Number.isInteger).length;
const complete=()=>count()===18;
const sourceUrl='https://kh2322.com/page/Timeline.html';
const envelope=`<div class="letter-art" aria-hidden="true"><svg class="thread" viewBox="0 0 440 390"><path d="M360 64c-42 31 30 48 22 89-8 44-180 64-211 112-35 54 120 13 131 49 8 27-68 55-75 61"/><path d="m342 33 23-21m-13 35 26-8"/></svg><div class="envelope blue"><i></i></div><div class="envelope lemon"><i></i></div></div>`;
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:2,answers,current}));}catch{storageAvailable=false;}}
function navigate(page){if(location.hash===`#${page}`)render();else location.hash=page;}
function focusMain(){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function home(){
 const n=count();
 return `<section class="hero"><div class="hero-copy"><h1>如果是你，<br>会怎样靠近？</h1><p class="intro">18 个友情情境，<br class="mobile-break">遇见你在关系里的样子。</p><button class="primary start" data-action="start">${n?(complete()?'查看我的回信':'继续这封来信'):'开始这封来信'} <span aria-hidden="true">→</span></button><p class="micro">${n?`已完成 ${n} / 18 题 · 答案留在这台设备`:'约 3–5 分钟 · 没有标准答案'}</p></div>${envelope}</section><section class="steps" aria-label="测试步骤"><div><span>01</span>代入情境</div><i></i><div><span>02</span>跟随直觉</div><i></i><div><span>03</span>收到回信</div></section><section class="home-note"><h2>同一段故事，<br>也可以有你的答案。</h2><div><p>你有没有一个曾经密不可分的好朋友？现在呢？还联系吗？有没有从无话不谈，走到连名字都不好提？</p><p>如果时光真的能倒流，回到那个你们刚认识的那天，你还会选择去认识TA吗？请根据你的真实心路历程，选出最贴合你本能反应的选项。</p><button class="text-button" data-page="about">读一读测试说明 <span aria-hidden="true">↗</span></button></div></section>`;
}
function quiz(){
 const q=questions[current];
 return `<section class="quiz"><div class="question-status"><span>第 ${String(current+1).padStart(2,'0')} 封小笺</span><span>${count()} / 18 已作答</span></div><div class="progress" role="progressbar" aria-label="答题完成进度" aria-valuenow="${count()}" aria-valuemin="0" aria-valuemax="18"><i style="width:${count()/18*100}%"></i></div><div class="question-heading"><p class="section-label">${dimensions[q.dimension].name}</p><h1 id="q-title">${q.title}</h1><p id="q-scene">${q.scene}</p></div><fieldset aria-labelledby="q-title" aria-describedby="q-scene"><legend class="sr-only">选择最接近你想法的答案</legend>${q.options.map((o,i)=>`<label class="option ${answers[current]===i?'selected':''}"><input type="radio" name="answer" value="${i}" ${answers[current]===i?'checked':''}><span class="option-letter" aria-hidden="true">${'ABCDEF'[i]}</span><span>${o.text}</span><span class="check" aria-hidden="true">${answers[current]===i?'✓':''}</span></label>`).join('')}</fieldset><div class="quiz-actions"><button class="secondary" data-action="prev">${current?'← 上一题':'← 回到首页'}</button><button class="primary" data-action="next" ${answers[current]===null?'disabled':''}>${current===17?'检查并收信':'下一题 →'}</button></div><p class="save-note">${storageAvailable?'已自动保存，可随时回来继续。':'本次答案可正常提交；浏览器未允许本地保存。'}<br>选你真正会做的，而不是你觉得应该做的。</p><button class="text-button review-link" data-page="review">查看答题进度</button></section>`;
}
function review(){return `<section class="reading review"><p class="section-label">寄出之前</p><h1>再看看你的选择。</h1><p>已经完成 ${count()} / 18 题。点击题号，可以返回修改。</p><div class="question-grid">${questions.map((q,i)=>`<button data-question="${i}" class="${Number.isInteger(answers[i])?'answered':''}" aria-label="第${i+1}题，${Number.isInteger(answers[i])?'已选'+ 'ABCDEF'[answers[i]]:'未作答'}">${String(i+1).padStart(2,'0')}<span>${Number.isInteger(answers[i])?'ABCDEF'[answers[i]]:'未答'}</span></button>`).join('')}</div>${complete()?'<button class="primary" data-page="result">收下我的回信 →</button>':'<button class="primary" data-action="unanswered">继续未答题目 →</button>'}<p class="save-note">回信根据全部 18 道题计算。没有哪一种选择更好。</p></section>`;}
function result(){
 const r=calculateResult(answers),c=resultCopy[r.type];
 return `<section class="result"><div class="result-head"><div><p class="section-label">写给你的友情回信</p><h1>${c.title.replace('\n','<br>')}</h1><p class="result-name">${c.name}</p><p class="micro">${c.tag}</p></div>${envelope}</div><div class="result-body"><p class="result-intro">${c.body}</p><div class="balance-label"><span>婷婷桑 ${r.huang}%</span><span>发卡 ${r.ka}%</span><span>交织 ${r.mixed}%</span></div><div class="balance three" aria-label="婷婷桑 ${r.huang}%，发卡 ${r.ka}%，交织 ${r.mixed}%"><i style="width:${r.huang}%"></i><i style="width:${r.ka}%"></i><i style="width:${r.mixed}%"></i></div><p class="score-note">${r.reason==='tie'?'最高票并列：你的选择在几种反应之间切换，因此归为交织型。':r.reason==='mixed'?'交织类选项最多：你常在嘴硬和上头之间反复横跳。':'按你选中的人物类别累计票数，最高票决定本次结果。'}</p><p class="score-note">这是本测试的选项倾向指数，不是科学人格测量，也不代表真实人物的完整性格。</p><h2>你在友情里的六幕反应</h2><p class="score-note">每幕 3 题，仅展示淡／浓反应的平均位置；中点也可能来自两端抵消，不额外影响总票数。</p><div class="dimension-list">${dimensions.map((d,i)=>`<div><h3>${d.name}</h3><div class="dimension-label"><span>${d.left}</span><span>${d.right}</span></div><div class="dimension-track"><i style="left:${r.dimensions[i]}%"></i></div></div>`).join('')}</div><div class="letter-body"><h2>你的友情名场面</h2><p>${c.strength}</p><h2>你的破防开关</h2><p>${c.risk}</p><h2>给嘴硬的你一句话</h2><p>${c.advice}</p><p class="sign">愿你的真心，被温柔读懂。<br>友情来信</p></div><div class="result-actions"><button class="primary" data-action="download">保存这封回信 ↓</button><button class="secondary" data-page="review">回看我的选择</button><button class="text-button" data-action="restart">再测一次</button></div><p class="micro" id="notice" role="status"></p><button class="text-button" data-page="sources">这些情境从哪里来？ ↗</button></div></section>`;
}
function about(){return `<article class="reading"><p class="section-label">关于这封来信</p><h1>把故事，<br>换成你的日常。</h1><p class="lead">18 次选择，不是为了替友情打分，而是看见你表达真心的方式。</p><h2>怎么作答？</h2><p>把每个情境想象成你和一个珍惜的朋友。选最接近你实际会做的答案。没有标准答案，也不需要了解卡黄的全部故事。</p><h2>结果如何得来？</h2><p>18 题按初识、亲密、落差、冲突、告别、后来分成六幕，每幕 3 题。每题 6 个选项，按创作者定稿的内部标记分别对应婷婷桑、发卡或交织，各有 2 个。每选一项，为对应类别加 1 票；选项顺序已逐题打乱，字母本身不计分。</p><p>三类中最高票决定结果；最高票并列时归为交织型，并说明是并列。比例是该类票数占 18 题的比例，四舍五入补齐为 100%。交织是独立类别，并列也可能来自两端各占一半，结果页会区分原因。六幕滑块以婷婷桑为左端、发卡为右端、交织为中点汇总，只表示这一幕的选择，不参与额外加权；滑块在中间不一定表示选了交织。</p><p>这是一份把“淡着嘴硬”和“浓着上头”放大的同人娱乐测试，没有更成熟或更正确的答案，也不测友情好坏。</p><h2>关于人物与原故事</h2><p>婷婷桑指黄婷婷，发卡指李艺彤。本作品为非官方同人情境创作。题目是改编后的假设，不是对真实关系、动机或心理状态的认定。原站是粉丝整理材料，部分记录未获独立核验。</p><h2>答案会保存在哪里？</h2><p>答案只保存在当前浏览器的本地存储中，不上传、不收集姓名、不连接统计服务。清除浏览器数据会删除进度；在共享设备上可用“清除本机进度”移除保存的答案。GitHub Pages 作为托管平台可能保有常规访问日志。</p><div class="reading-actions"><button class="primary" data-action="start">${count()?'回到我的测试':'开始这封来信'} →</button><button class="text-button" data-action="clear">清除本机进度</button></div><p id="notice" class="micro" role="status"></p></article>`;}
function sources(){return `<article class="reading sources"><p class="section-label">故事的来处</p><h1>她们的片刻，<br>你的友情剧本。</h1><p class="lead">灵感来自<a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">卡黄时间线 ↗</a>，本版采用创作者重新定稿的 18 道情境。</p><p>原先读取的 758 条记录是创作背景，不是每一句选项的事实出处。现版的心理活动、台词、内心戏与人物倾向均是同人放大创作，不声称当事人真的这样想、这样做。</p><p>题目按初识、亲密、落差、冲突、告别与后来展开；保留你的强情绪与网感，人物后缀仅用于内部计分，答题时隐藏。没有搬运原站图片或完整时间线。</p><p>改编与计分说明见 <a href="./docs/research.md" target="_blank" rel="noopener noreferrer">研究与计分笔记</a>。发现问题可通过 <a href="https://github.com/lovebirb10/kahuan-friendship-letter/issues" target="_blank" rel="noopener noreferrer">GitHub Issue</a>反馈。</p><button class="primary" data-action="start">${count()?'继续我的来信':'开始测试'} →</button></article>`;}

function render(){
 let page=location.hash.slice(1)||'home';
 if(page==='result'&&!complete())page='review';
 const views={home,quiz,review,result,about,sources};
 main.innerHTML=(views[page]||home)();
 document.querySelectorAll('nav button').forEach(b=>{if(b.dataset.page===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 document.title=({quiz:`第 ${current+1} 题`,result:'你的友情回信',sources:'故事来源',about:'测试说明',review:'答题进度'}[page]||'如果是你，会怎样靠近？')+' | 卡黄 · 友情来信';
 focusMain();
}
document.addEventListener('change',e=>{
 if(e.target.matches('input[name="answer"]')){
  answers[current]=Number(e.target.value);save();
  main.querySelectorAll('.option').forEach((el,i)=>{el.classList.toggle('selected',i===answers[current]);el.querySelector('.check').textContent=i===answers[current]?'✓':'';});
  main.querySelector('[data-action="next"]').disabled=false;
  main.querySelector('.question-status span:last-child').textContent=`${count()} / 18 已作答`;
  const progress=main.querySelector('.progress');progress.setAttribute('aria-valuenow',count());progress.firstElementChild.style.width=`${count()/18*100}%`;
 }
});
document.addEventListener('click',e=>{
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.page){navigate(button.dataset.page);return;}
 if(button.dataset.question!==undefined){current=Number(button.dataset.question);save();navigate('quiz');return;}
 switch(button.dataset.action){
  case 'start': if(complete())navigate('result');else navigate('quiz');break;
  case 'next': if(answers[current]===null)return;if(current<17){current++;save();render();}else navigate('review');break;
  case 'prev': if(current){current--;save();render();}else navigate('home');break;
  case 'unanswered': current=answers.indexOf(null);save();navigate('quiz');break;
  case 'restart': answers=Array(18).fill(null);current=0;save();navigate('quiz');break;
  case 'clear': answers=Array(18).fill(null);current=0;try{localStorage.removeItem(KEY);}catch{} document.querySelector('#notice').textContent='已清除本机答题进度。';break;
  case 'download': {
   const r=calculateResult(answers),c=resultCopy[r.type];
   const text=`卡黄 · 友情来信\n\n${c.title}\n${c.name}\n\n${c.body}\n\n婷婷桑 ${r.huang}% · 发卡 ${r.ka}% · 交织 ${r.mixed}%\n\n${dimensions.map((d,i)=>`${d.name}：${d.left} ${100-r.dimensions[i]}% / ${d.right} ${r.dimensions[i]}%`).join('\n')}\n\n你的友情名场面\n${c.strength}\n\n你的破防开关\n${c.risk}\n\n给嘴硬的你一句话\n${c.advice}\n\n仅为同人情境创作与选项倾向，不是科学人格测量或真实人物心理判断。`;
   const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='我的友情来信.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#notice').textContent='已生成文字回信，保存到你的设备即可。';break;
  }
 }
});
window.addEventListener('hashchange',render);render();
