// 两秒动作，随后短暂停留并自然复位；镜头始终固定。
export function mascotMarkup(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const atlas='./assets/seal-penguin-pixel-atlas.png';
 const sprite=(x,y,attrs='')=>`<svg ${attrs} viewBox="0 0 ${x===0&&y===0?560:512} 512" overflow="hidden">${x===1&&y===0?'<defs><clipPath id="mascot-tail-crop"><rect x="180" y="160" width="260" height="330"/></clipPath></defs><g clip-path="url(#mascot-tail-crop)">':''}<image href="${atlas}" x="${-x*512}" y="${-y*512}" width="1024" height="1024"/>${x===1&&y===0?'</g>':''}</svg>`;
 return `<div class="mascot-hero ${reduced?'reduced':''}"><svg class="mascot-stage" viewBox="0 0 600 420" role="img" aria-label="小海豹调皮抬尾，轻蹭企鹅脸颊；企鹅脸红、眯眼，害羞地晃一下。"><ellipse cx="303" cy="331" rx="235" ry="14" fill="#7c9d96" opacity=".10"/><g class="mascot-seal">${sprite(0,0,'x="0" y="25" width="390" height="390"')}</g><g class="mascot-penguin"><g class="penguin-open">${sprite(0,1,'x="302" y="82" width="290" height="290"')}</g><g class="penguin-shy">${sprite(1,1,'x="302" y="82" width="290" height="290"')}</g></g><g class="mascot-tail">${sprite(1,0,'x="220" y="69" width="280" height="280"')}</g></svg><button class="mascot-control" data-action="mascot-toggle" aria-pressed="${reduced}" aria-label="${reduced?'播放首页动画':'暂停首页动画'}">${reduced?'播放动画':'暂停动画'}</button></div>`;
}
export function toggleMascot(button){
 const scene=button.closest('.mascot-hero');
 if(scene.classList.contains('reduced')){scene.classList.remove('reduced');scene.classList.remove('is-paused');}
 else scene.classList.toggle('is-paused');
 const paused=scene.classList.contains('is-paused');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'播放首页动画':'暂停首页动画');button.textContent=paused?'播放动画':'暂停动画';
}
