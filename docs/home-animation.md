# 首页海豹与企鹅动画

交付为首页内嵌动画，保持原有奶油底、海盐蓝与柠檬黄网站布局，仅替换首页信封。结果页保留原信封。没有新增音乐或音效，镜头固定。

角色素材：内置 Image Gen 生成的透明 2×2 图集，保存为 `assets/seal-penguin-atlas.png`。四格分别为无尾海豹、独立短尾、睁眼企鹅、脸红眯眼企鹅。通过 SVG 视口使用各格素材，不把人物画成 CSS 占位几何形状。

## 动作

- 0—1 秒：小海豹轻微蓄力回弹，短尾从放低状态抬起，调皮回望企鹅。
- 1—2 秒：短尾在企鹅左侧脸颊轻蹭，企鹅切换为脸红眯眼，身体以脚边为支点轻轻左右晃动并回弹。
- 2—2.8 秒：短暂停留、自然复位，然后循环，避免末帧硬切回第一帧。
- 所有角色动画共享 2.8 秒周期，无镜头位移、缩放或剪切。使用 transform 与 opacity；位置可通过 `mascot.js` 的图集视口及 `mascot.css` 的关键帧微调。

## 使用与无障碍

支持“暂停动画／播放动画”，不影响测试按钮和进度。系统开启“减少动态效果”时显示安静的脸红姿态，用户可主动播放。图集提供文字替代描述，手机等比例缩放，不裁切角色。

## 图集生成提示

使用内置 Image Gen（透明背景），提示方向：production 2x2 sprite atlas; four equal transparent tiles; cute soft kawaii flat 2D cel animation art, navy outline, warm white seal, pastel-blue shadows, pale-navy penguin, cream belly, yellow beak and feet. Top-left seal body only, looking back playfully to the right, no attached tail. Top-right separate short two-lobed seal tail. Bottom-left open-eyed penguin. Bottom-right the same penguin, identically registered, eyes closed with pink blushing cheeks. No text, borders, props or ground shadows. Fixed camera and independent layered sprites for precise website animation.

## 结局改稿

本地 `结局文案_可修改.txt` 是从线上 `result-copy.js` 导出的可编辑副本。用户可以直接修改，之后再同步；这次首页动画变更没有修改结局正文或计分。

工具检查：HyperFrames 用量检测未能完成，额度未知。本次为网站内嵌动画，没有使用其视频渲染能力。
