import {questions,dimensions,calculateResult} from './data.js';

const main=document.querySelector('main');
const KEY='kahuan-letter-v1';
let answers=Array(24).fill(null), current=0, storageAvailable=true;
try {
 const saved=JSON.parse(localStorage.getItem(KEY));
 if(saved?.version===1&&Array.isArray(saved.answers)&&saved.answers.length===24&&saved.answers.every(a=>a===null||Number.isInteger(a)&&a>=0&&a<4)){
  answers=saved.answers;
  current=Number.isInteger(saved.current)?Math.max(0,Math.min(23,saved.current)):0;
 }
}catch{storageAvailable=false;}
const count=()=>answers.filter(Number.isInteger).length;
const complete=()=>count()===24;
const sourceUrl='https://kh2322.com/page/Timeline.html';
const envelope=`<div class="letter-art" aria-hidden="true"><svg class="thread" viewBox="0 0 440 390"><path d="M360 64c-42 31 30 48 22 89-8 44-180 64-211 112-35 54 120 13 131 49 8 27-68 55-75 61"/><path d="m342 33 23-21m-13 35 26-8"/></svg><div class="envelope blue"><i></i></div><div class="envelope lemon"><i></i></div></div>`;
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,answers,current}));}catch{storageAvailable=false;}}
function navigate(page){if(location.hash===`#${page}`)render();else location.hash=page;}
function focusMain(){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function home(){
 const n=count();
 return `<section class="hero"><div class="hero-copy"><h1>如果是你，<br>会怎样靠近？</h1><p class="intro">24 个友情情境，<br class="mobile-break">遇见你在关系里的样子。</p><button class="primary start" data-action="start">${n?(complete()?'查看我的回信':'继续这封来信'):'开始这封来信'} <span aria-hidden="true">→</span></button><p class="micro">${n?`已完成 ${n} / 24 题 · 答案留在这台设备`:'约 5 分钟 · 没有标准答案'}</p></div>${envelope}</section><section class="steps" aria-label="测试步骤"><div><span>01</span>代入情境</div><i></i><div><span>02</span>跟随直觉</div><i></i><div><span>03</span>收到回信</div></section><section class="home-note"><h2>同一段故事，<br>也可以有你的答案。</h2><div><p>从卡黄时间线里，借来一些关于靠近、陪伴和误会的片刻。把名字暂时放下，想一想：如果是你和朋友，会怎样选择？</p><p>你可能更接近婷婷桑，也可能更接近发卡；或者，恰好拥有两种表达真心的方式。</p><button class="text-button" data-page="about">读一读测试说明 <span aria-hidden="true">↗</span></button></div></section>`;
}
function quiz(){
 const q=questions[current];
 return `<section class="quiz"><div class="question-status"><span>第 ${String(current+1).padStart(2,'0')} 封小笺</span><span>${count()} / 24 已作答</span></div><div class="progress" role="progressbar" aria-label="答题完成进度" aria-valuenow="${count()}" aria-valuemin="0" aria-valuemax="24"><i style="width:${count()/24*100}%"></i></div><div class="question-heading"><p class="section-label">${dimensions[q.dimension].name}</p><h1 id="q-title">${q.title}</h1><p id="q-scene">${q.scene}</p></div><fieldset aria-labelledby="q-title" aria-describedby="q-scene"><legend class="sr-only">选择最接近你想法的答案</legend>${q.options.map((o,i)=>`<label class="option ${answers[current]===i?'selected':''}"><input type="radio" name="answer" value="${i}" ${answers[current]===i?'checked':''}><span class="option-letter" aria-hidden="true">${'ABCD'[i]}</span><span>${o.text}</span><span class="check" aria-hidden="true">${answers[current]===i?'✓':''}</span></label>`).join('')}</fieldset><div class="quiz-actions"><button class="secondary" data-action="prev">${current?'← 上一题':'← 回到首页'}</button><button class="primary" data-action="next" ${answers[current]===null?'disabled':''}>${current===23?'检查并收信':'下一题 →'}</button></div><p class="save-note">${storageAvailable?'已自动保存，可随时回来继续。':'本次答案可正常提交；浏览器未允许本地保存。'}<br>选你真正会做的，而不是你觉得应该做的。</p><button class="text-button review-link" data-page="review">查看答题进度</button></section>`;
}
function review(){return `<section class="reading review"><p class="section-label">寄出之前</p><h1>再看看你的选择。</h1><p>已经完成 ${count()} / 24 题。点击题号，可以返回修改。</p><div class="question-grid">${questions.map((q,i)=>`<button data-question="${i}" class="${Number.isInteger(answers[i])?'answered':''}" aria-label="第${i+1}题，${Number.isInteger(answers[i])?'已选'+ 'ABCD'[answers[i]]:'未作答'}">${String(i+1).padStart(2,'0')}<span>${Number.isInteger(answers[i])?'ABCD'[answers[i]]:'未答'}</span></button>`).join('')}</div>${complete()?'<button class="primary" data-page="result">收下我的回信 →</button>':'<button class="primary" data-action="unanswered">继续未答题目 →</button>'}<p class="save-note">回信根据全部 24 道题计算。没有哪一种选择更好。</p></section>`;}
const resultCopy={
 ka:{title:'你把在意，\n写在了行动里。',name:'更接近发卡的叙事倾向',tag:'主动靠近 · 愿意表达',body:'遇到珍惜的人，你常愿意先走一步。你希望喜欢能被看见，也希望自己的认真能得到回应。一起做过的小事，在你心里常常有独特的分量。',strength:'你的主动让关系有了开始；你的表达让朋友知道，自己是被惦记的人。',risk:'当对方回应得慢，或表达得轻，你可能容易失落。你期待的仪式，也许还没有被对方听懂。',advice:'试着把“你怎么还不懂”换成“这件事对我很重要，我希望你能……”。把需要说具体，也听听她的节奏。'},
 huang:{title:'你把真心，\n留在了细节里。',name:'更接近婷婷桑的叙事倾向',tag:'细腻观察 · 保有节奏',body:'你未必把每一句在意挂在嘴边，却会记住那些实际的小事。舒服的关系对你来说，可以热闹，也可以安静；亲近之中，仍然能保留自己的节奏。',strength:'你的稳定与分寸，让相处多了一些自在。你能用具体的小事，把关心留在日常里。',risk:'你的安静有时会被读成冷淡。你以为已经表达的在意，对方未必接收到了。',advice:'偶尔为自己的行动配一句说明：“我记得这件事，因为我在乎你。”一句清楚的回应，能让很多猜测停下来。'},
 mixed:{title:'你愿意靠近，\n也懂得留白。',name:'婷婷桑 × 发卡 · 交织倾向',tag:'热烈与安静，都在你心里',body:'你会随着情境选择表达：有时主动伸手，有时给彼此一点空间。你并不总是站在同一端，真心也可以在不同的关系里，长出不同的样子。',strength:'你能看见两种相处节奏的价值，既珍惜回应，也尊重边界。',risk:'当你在靠近与退后之间切换，朋友可能不确定你此刻需要什么。',advice:'把当下的状态告诉朋友：“我现在想安静一下，但这不影响我在乎你。”让变化有迹可循，比始终维持一种姿态更轻松。'}
};
function result(){
 const r=calculateResult(answers),c=resultCopy[r.type];
 return `<section class="result"><div class="result-head"><div><p class="section-label">写给你的第 25 封信</p><h1>${c.title.replace('\n','<br>')}</h1><p class="result-name">${c.name}</p><p class="micro">${c.tag}</p></div>${envelope}</div><div class="result-body"><p class="result-intro">${c.body}</p><div class="balance-label"><span>婷婷桑叙事 ${r.huang}%</span><span>发卡叙事 ${r.ka}%</span></div><div class="balance" aria-label="婷婷桑叙事 ${r.huang}%，发卡叙事 ${r.ka}%"><i style="width:${r.huang}%"></i></div><p class="score-note">这是本测试的选项倾向指数，不是科学人格测量，也不代表真实人物的完整性格。</p><h2>你在友情里的六种节奏</h2><div class="dimension-list">${dimensions.map((d,i)=>`<div><h3>${d.name}</h3><div class="dimension-label"><span>${d.left}</span><span>${d.right}</span></div><div class="dimension-track"><i style="left:${r.dimensions[i]}%"></i></div></div>`).join('')}</div><div class="letter-body"><h2>你带来的温柔</h2><p>${c.strength}</p><h2>也许会遇到的小误会</h2><p>${c.risk}</p><h2>下一次，可以试着</h2><p>${c.advice}</p><p class="sign">愿你的真心，被温柔读懂。<br>友情来信</p></div><div class="result-actions"><button class="primary" data-action="download">保存这封回信 ↓</button><button class="secondary" data-page="review">回看我的选择</button><button class="text-button" data-action="restart">再测一次</button></div><p class="micro" id="notice" role="status"></p><button class="text-button" data-page="sources">这些情境从哪里来？ ↗</button></div></section>`;
}
function about(){return `<article class="reading"><p class="section-label">关于这封来信</p><h1>把故事，<br>换成你的日常。</h1><p class="lead">24 次选择，不是为了替友情打分，而是看见你表达真心的方式。</p><h2>怎么作答？</h2><p>把每个情境想象成你和一个珍惜的朋友。选最接近你实际会做的答案。没有标准答案，也不需要了解卡黄的全部故事。</p><h2>结果如何得来？</h2><p>题目分为靠近、表达、陪伴、边界、分歧与回忆六个维度，每个维度 4 题。每个选项有 −2、−1、+1 或 +2 的创作性权重；总体分数换算为两端合计 100% 的倾向指数。发卡叙事指数达到 60% 为发卡倾向，不超过 40% 为婷婷桑倾向，中间为交织倾向。维度滑块仅展示对应维度的选择。</p><p>作品借用部分公开互动中的表达差异建立两端：较多主动表达与寻求回应的发卡叙事，较多克制表达与保有节奏的婷婷桑叙事。实际记录也呈现婷婷桑主动赠礼、发卡安静陪伴等相反表现，因此不能把人物简化成固定标签。分歧题中的“感受／事情”同样只是编辑视角，不是对谁更会沟通的评价。</p><h2>关于人物与原故事</h2><p>婷婷桑指黄婷婷，发卡指李艺彤。本作品为非官方同人情境创作。题目是改编后的假设，不是对真实关系、动机或心理状态的认定。原站是粉丝整理材料，部分记录未获独立核验。</p><h2>答案会保存在哪里？</h2><p>答案只保存在当前浏览器的本地存储中，不上传、不收集姓名、不连接统计服务。清除浏览器数据会删除进度；在共享设备上可用“清除本机进度”移除保存的答案。GitHub Pages 作为托管平台可能保有常规访问日志。</p><div class="reading-actions"><button class="primary" data-action="start">${count()?'回到我的测试':'开始这封来信'} →</button><button class="text-button" data-action="clear">清除本机进度</button></div><p id="notice" class="micro" role="status"></p></article>`;}
function sources(){return `<article class="reading sources"><p class="section-label">故事的来处</p><h1>从她们的片刻，<br>走向你的选择。</h1><p class="lead">灵感来自<a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">卡黄时间线 ↗</a>，题目与选项均为重新创作。</p><p>已读取 2013—2026 年 758 条记录，题目重点取材于早期共同经历。未搬运原站图片、长篇原文或完整数据库。以下日期是原站的检索线索，打开时间线后可搜索日期；不是直达事件的锚点链接。</p><p>原站混合公开互动、第三方记录与粉丝解读。我们不将“同款”“同日发文”等巧合用作关系证据，也不以传闻定义人物。第 17、18 题只借用了误读和沟通议题，所涉争执记录未经独立核验。</p><details><summary>查看 24 道题的灵感与改编说明（含题目）</summary><ol class="source-list">${questions.map(q=>`<li><h2>${String(q.id).padStart(2,'0')} · ${q.title}</h2><p class="source-date">${q.sourceId.replace(/(\d{4})(\d{2})(\d{2})/,'$1.$2.$3')}</p><p>${q.note}</p></li>`).join('')}</ol></details><p>更完整的取舍与计分说明见项目的 <a href="./docs/research.md" target="_blank" rel="noopener noreferrer">研究笔记</a>。如果发现出处或日期有误，可以通过 <a href="https://github.com/lovebirb10/kahuan-friendship-letter/issues" target="_blank" rel="noopener noreferrer">GitHub Issue</a>反馈。</p><button class="primary" data-action="start">${count()?'继续我的来信':'开始测试'} →</button></article>`;}
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
  main.querySelector('.question-status span:last-child').textContent=`${count()} / 24 已作答`;
  const progress=main.querySelector('.progress');progress.setAttribute('aria-valuenow',count());progress.firstElementChild.style.width=`${count()/24*100}%`;
 }
});
document.addEventListener('click',e=>{
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.page){navigate(button.dataset.page);return;}
 if(button.dataset.question!==undefined){current=Number(button.dataset.question);save();navigate('quiz');return;}
 switch(button.dataset.action){
  case 'start': if(complete())navigate('result');else navigate('quiz');break;
  case 'next': if(answers[current]===null)return;if(current<23){current++;save();render();}else navigate('review');break;
  case 'prev': if(current){current--;save();render();}else navigate('home');break;
  case 'unanswered': current=answers.indexOf(null);save();navigate('quiz');break;
  case 'restart': answers=Array(24).fill(null);current=0;save();navigate('quiz');break;
  case 'clear': answers=Array(24).fill(null);current=0;try{localStorage.removeItem(KEY);}catch{} document.querySelector('#notice').textContent='已清除本机答题进度。';break;
  case 'download': {
   const r=calculateResult(answers),c=resultCopy[r.type];
   const text=`卡黄 · 友情来信\n\n${c.title}\n${c.name}\n\n${c.body}\n\n婷婷桑叙事 ${r.huang}% · 发卡叙事 ${r.ka}%\n\n${dimensions.map((d,i)=>`${d.name}：${d.left} ${100-r.dimensions[i]}% / ${d.right} ${r.dimensions[i]}%`).join('\n')}\n\n你带来的温柔\n${c.strength}\n\n也许会遇到的小误会\n${c.risk}\n\n下一次，可以试着\n${c.advice}\n\n仅为同人情境创作与选项倾向，不是科学人格测量或真实人物心理判断。`;
   const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='我的友情来信.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#notice').textContent='已生成文字回信，保存到你的设备即可。';break;
  }
 }
});
window.addEventListener('hashchange',render);render();
