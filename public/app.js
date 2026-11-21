import {groups,met,gods,book,people,events,relations} from './data.js';

const app=document.querySelector('#app');
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(url,label)=>'<a href="'+escapeHtml(url)+'">'+escapeHtml(label)+'</a>';
const person=id=>people.find(row=>row[0]===id);
const personLink=id=>link('#character/'+id,person(id)[1]);
const volume=(work,n)=>link(book(work,n),'第 '+n+' 卷');
const starter={athena:[{image:'athena-detail.jpg',note:'頭盔輪廓與衣褶。羅馬時期大理石雅典娜像細節。',source:met},{image:'athena-armored-figure.jpg',note:'穿愛奧尼式 Chiton 的青銅雅典娜。',source:'https://www.metmuseum.org/art/collection/search/244457'}],odysseus:[{image:'odysseus.jpg',note:'陶壺上的弓箭手，可能是奧德修斯。',source:'https://www.metmuseum.org/art/collection/search/251485'}]};
let filter=-1;
let focusPerson='athena';
let posterSeen=false;
const metObject=id=>'https://www.metmuseum.org/art/collection/search/'+id;
const commons=name=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(name);
const art={
  athena:['athena-figure.jpg','雅典娜與貓頭鷹青銅小像 · The Met · 公共領域',metObject(254648)],
  hermes:['hermes-figure.jpg','赫米斯青銅小像 · The Met · 公共領域',metObject(246679)],
  apollo:['apollo-figure.jpg','阿波羅青銅小像 · The Met · 公共領域',metObject(247971)],
  poseidon:['poseidon-figure.jpg','青銅神像，館方暫定可能是波賽頓 · The Met · 公共領域',metObject(252529)],
  aphrodite:['venus-figure.jpg','阿芙蘿黛蒂大理石像 · The Met · 公共領域',metObject(253372)],
  zeus:['zeus-figure.jpg','宙斯／朱庇特青銅小像 · The Met · 公共領域',metObject(246539)],
  hera:['hera-figure.jpg','巴貝里尼赫拉像 · 公共領域',commons('Barberini_Hera.jpg')],
  achilles:['achilles-figure.jpg','阿基里斯雕像 · LJeandupeux · CC BY-SA 4.0 · 縮圖',commons('Achille_Achilleon.jpg'),'https://creativecommons.org/licenses/by-sa/4.0/'],
  hector:['hector-figure.jpg','依卡諾瓦的赫克托耳雕像製作的版畫 · Rijksmuseum · 公共領域','https://id.rijksmuseum.nl/200146850'],
  odysseus:['odysseus-figure.jpg','羅馬大理石奧德修斯像 · Mark Landon / Wikimedia Commons · CC BY 4.0 · 縮圖',commons('Venice_MAN_98_Statue_of_Odysseus_01.jpg'),'https://creativecommons.org/licenses/by/4.0/'],
  patroclus:['patroclus-figure.jpg','傳為墨涅拉俄斯抱著帕特羅克洛斯的群像 · sonofgroucho · CC BY 2.0',commons('Firenze-piazza_signoria_statue02.jpg'),'https://creativecommons.org/licenses/by/2.0/'],
  penelope:['penelope-figure.jpg','傳為潘妮洛佩的雕像 · Fabrizio Garrisi · CC BY-SA 4.0',commons('Statua_detta_di_Penelope,_I_sec._d.C._-FG1.jpg'),'https://creativecommons.org/licenses/by-sa/4.0/']
};
function defaultCover(id){
  const item=art[id];
  return item?{image:item[0],note:item[1],source:item[2],license:item[3]}:null;
}
let saved={};
async function loadSaved(){
  try{const rows=await fetch('/api/references').then(r=>r.json());saved={};for(const item of rows){const current=saved[item.owner]||{refs:[]};if(item.kind==='cover')current.cover=item;else current.refs.push(item);saved[item.owner]=current}}catch{saved={}}
}
function safeUrl(value){
  try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:''}catch{return ''}
}
function figure(item,alt){
  const status=item.transparency==='possible'?'可能含透明背景':item.transparency==='no'?'非透明格式':'透明度未檢查';
  return '<figure><img src="'+escapeHtml(item.image)+'" alt="'+escapeHtml(alt)+'"><figcaption>'+escapeHtml(item.note)+(item.source?' · '+link(item.source,'圖像來源'):'')+(item.license?' · '+(safeUrl(item.license)?link(item.license,'授權'):escapeHtml(item.license)):'')+(item.id?' · <span class="asset-status">'+status+'</span><span class="asset-actions"><button data-edit="'+item.id+'">編輯</button><button data-delete="'+item.id+'">刪除</button></span>':'')+'</figcaption></figure>';
}
function portrait(id){
  const cover=saved[id]?.cover||defaultCover(id);
  return cover?'<img src="'+escapeHtml(cover.image)+'" alt="" loading="lazy">':'<span class="pending">立繪待更新</span>';
}
const animatedName=name=>[...String(name)].map((char,index)=>`<span style="--char:${index}">${escapeHtml(char)}</span>`).join('');
function home(){
  if(filter<0)filter=0;
  const cards=people.filter(p=>p[3][0]===filter);
  const selected=cards[0];
  const fragments=[
    ['blue-disc','shape',-46,-28,-2],['spear','spear.png',-62,20,-6],['temple','temple-column.png',54,-38,3],
    ['athena','athena-bust.png',-24,18,-2],['shield','round-shield.png',12,64,5],
    ['olive-left','olive-branch.png',-66,54,-7],['olive-right','olive-branch.png',58,58,7],
    ['rubble-left','marble-rubble.png',-58,70,-7],['rubble-right','marble-rubble.png',64,72,6],
    ['letter-m','M',22,-42,-2],['letter-y','Y',36,-22,2],['letter-t','T',48,4,-2],
    ['letter-h','H',58,28,2],['letter-s','S',70,48,5],['blue-paper','shape',-34,64,-4],['fine-line','shape',62,-16,3]
  ];
  return `<section class="poster ${posterSeen?"seen":""}" aria-label="MYTHS 雅典娜拼貼封面">
    <img class="hero-reference hero-final-art" src="/hero-myths-serif.png" alt="MYTHS 雅典娜拼貼封面">
    <img class="hero-s-vine" src="/hero-layers/olive-branch.png" alt="" aria-hidden="true">
    <div class="hero-underlay"><img src="athena-figure.jpg" alt="雅典娜全身立像"></div>
    <div class="hero-layers" aria-hidden="true">${fragments.map(([name,asset,x,y,r],index)=>asset.endsWith?.('.png')?`<img class="hero-fragment fragment-${name}" src="/hero-layers/${asset}" alt="" style="--i:${index};--scatter-x:${x}px;--scatter-y:${y}px;--scatter-r:${r}deg">`:`<span class="hero-fragment fragment-${name}" style="--i:${index};--scatter-x:${x}px;--scatter-y:${y}px;--scatter-r:${r}deg">${asset==='shape'?'':asset}</span>`).join('')}</div>
  </section>
  <section id="characters"><div class="section-heading"><p>CHARACTER ARCHIVE</p><h2>角色檔案</h2></div><div class="filters">${groups.slice(0,3).map((g,i)=>`<button data-filter="${i}" aria-pressed="${filter===i}">${g}</button>`).join('')}</div>
  <div class="character-showcase"><nav class="character-picker" aria-label="目前分類角色">${cards.map(([id,name])=>`<a href="#character/${id}" data-preview="${id}" class="${id===selected[0]?'is-active':''}"><span>${portrait(id)}</span><b>${name}</b></a>`).join('')}</nav>
  <article class="character-preview is-changing" aria-live="polite"><div class="preview-art"><a class="preview-figure" href="#character/${selected[0]}" aria-label="查看 ${selected[1]} 完整資料">${portrait(selected[0])}</a></div><div class="preview-info"><small>SELECTED CHARACTER</small><h3>${animatedName(selected[1])}</h3><p class="preview-en">${selected[2]}</p><p class="preview-bio">${selected[4]}</p></div></article></div></section>`;
}

function bindCharacterPreview(){
  const picker=document.querySelector('.character-picker');
  const preview=document.querySelector('.character-preview');
  if(!picker||!preview)return;
  const show=id=>{
    const item=person(id);if(!item)return;
    picker.querySelectorAll('[data-preview]').forEach(link=>link.classList.toggle('is-active',link.dataset.preview===id));
    preview.querySelector('.preview-figure').href='#character/'+id;
    preview.querySelector('.preview-figure').setAttribute('aria-label','查看 '+item[1]+' 完整資料');
    preview.querySelector('.preview-figure').innerHTML=portrait(id);
    preview.querySelector('h3').innerHTML=animatedName(item[1]);
    preview.querySelector('.preview-en').textContent=item[2];
    preview.querySelector('.preview-bio').textContent=item[4];
    preview.classList.remove('is-changing');
    void preview.offsetWidth;
    preview.classList.add('is-changing');
  };
  picker.querySelectorAll('[data-preview]').forEach(link=>{
    link.addEventListener('mouseenter',()=>show(link.dataset.preview));
    link.addEventListener('focus',()=>show(link.dataset.preview));
  });
}

function bindHero(){
  const poster=document.querySelector('.poster');
  if(!poster)return;
  const fragments=[...poster.querySelectorAll('.hero-fragment')];
  const underlay=poster.querySelector('.hero-underlay');
  if(!fragments.length||!underlay)return;
  const update=()=>{
    const progress=Math.max(0,Math.min(1,(scrollY-40)/360));
    poster.style.setProperty('--scatter',progress);
    poster.classList.toggle('is-scattered',progress>.08);
    underlay.style.opacity=String(.08+progress*.92);
    underlay.style.transform=`scale(${.88+progress*.12})`;
    fragments.forEach(fragment=>{
      const x=parseFloat(fragment.style.getPropertyValue('--scatter-x'))*progress;
      const y=parseFloat(fragment.style.getPropertyValue('--scatter-y'))*progress;
      const r=parseFloat(fragment.style.getPropertyValue('--scatter-r'))*progress;
      fragment.style.transform=`translate(${x}px,${y}px) rotate(${r}deg)`;
      fragment.style.opacity=String(1-progress*.9);
    });
  };
  update();
  addEventListener('scroll',update,{passive:true});
}
function detail([id,name,en,tags,bio,volumes]){
  const custom=saved[id]||{refs:[]};
  const cover=custom.cover||defaultCover(id);
  const archiveRefs=[...(custom.cover&&defaultCover(id)?[defaultCover(id)]:[]),...(starter[id]||[])];
  return `<p>${link('#','← 所有角色')}</p><div class="detail"><div><small>${tags.map(index=>groups[index]).join(' · ')}</small><h1>${name}</h1><small>${en}</small>${custom.cover?'<p>我的角色設計</p>':""}</div>${cover?figure(cover,name):'<figure><figcaption>主圖待更新</figcaption></figure>'}</div>
<section><h2>神話與史詩</h2><p>${bio}</p><p><small>${volumes.map(([w,n])=>groups[w]+' '+volume(w,n)).join(' · ')}</small></p></section>
<section class="board-section"><h2>Reference</h2>${figureResearch[id]?'<p>'+link(figureResearch[id][1],figureResearch[id][0])+'</p>':""}${archiveRefs.length?`<div class="grid">${archiveRefs.map(item=>figure(item,item.note||name+'參考圖')).join('')}</div>`:''}<div class="board-toolbar"><p class="board-help">點一下畫布後直接貼上圖片（Ctrl／⌘＋V），或把圖片檔拖進來。圖片、位置與尺寸會自動保存。</p><div><button type="button" data-export-board>匯出 PNG</button><button type="button" data-print-board>列印／存成 PDF</button></div><output aria-live="polite"></output></div>${referenceBoard(id,name)}</section>
<section><h2>相關人物</h2>${relationshipList(relations.filter(([a,_,b])=>a===id||b===id))}</section>`;
}
function editor(cover){
  return `<details><summary>${cover?"新增參考圖或更換主圖":"新增服裝參考"}</summary><p><small>圖片與筆記會持久保存，可跨裝置使用。透明立繪建議上傳 PNG 或 WebP。</small></p>
<form id="edit">${cover?'<label>用途<select name="kind"><option value="reference">新增 Reference</option><option value="cover">更換主圖</option></select></label>':""}<label>上傳圖片（立繪建議用透明 PNG）<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif"></label><label>圖片網址<input name="url" type="url"></label><label>參考筆記<input name="note" maxlength="500"></label><label>來源連結<input name="source" type="url"></label><label>授權名稱或連結<input name="license" placeholder="例如 Public Domain、CC BY 4.0"></label><div><button>儲存</button></div><output aria-live="polite"></output></form></details>`;
}
const figureResearch={
  circe:['巴黎市立博物館 · 喀耳刻雕塑習作','https://www.parismuseescollections.paris.fr/en/node/228137'],
  calypso:['法國文化部 · 卡呂普索雕像','https://pop.culture.gouv.fr/notice/joconde/000SC013057'],
  polyphemus:['卡比托利歐博物館 · 波呂斐摩斯雕像','https://www.museicapitolini.org/en/opera/statua-di-polifemo'],
  telemachus:['忒勒瑪科斯與涅斯托耳 · 浮雕紀錄','https://zenodo.org/records/20220430'],
  agamemnon:['希臘國家美術館 · 阿伽門農群像','https://www.nationalgallery.gr/en/artwork/agamemnon-clytemnestra-and-aegisthus/']
};
const dressSource='https://www.metmuseum.org/essays/ancient-greek-dress';
function wardrobe(){
  return `<h1>希臘服裝參考</h1><section><h2>服裝結構</h2><div class="grid">
  <article class="card"><h3>Chiton</h3><p>在肩部固定、腰部束帶。畫衣褶可以從肩扣、腰帶和布料垂下的方向開始。</p></article>
  <article class="card"><h3>Peplos</h3><p>布料上緣翻折後固定在肩上。畫輪廓時可以留意胸前的雙層布和側邊開口。</p></article>
  <article class="card"><h3>Himation</h3><p>矩形披布，可斜披過一肩，也能裹住雙肩。可以比較不同披法如何改變側面輪廓。</p></article>
  </div><p>${link(dressSource,'The Met · 古希臘服裝')}</p></section>
  <section><h2>文物穿法</h2><div class="grid">${figure(starter.athena[1],"穿愛奧尼式 Chiton 的雅典娜")}${figure({...defaultCover("aphrodite"),note:"觀察貼身 Chiton 的垂墜。"+defaultCover("aphrodite").note},"穿 Chiton 的阿芙蘿黛蒂像")}</div></section>`;
}

function boardLayout(item,index){try{const data=JSON.parse(item.note||'{}');return {x:Number(data.x)||30+(index%4)*190,y:Number(data.y)||30+Math.floor(index/4)*180,w:Number(data.w)||170,z:Number(data.z)||index+1}}catch{return {x:30+(index%4)*190,y:30+Math.floor(index/4)*180,w:170,z:index+1}}}
function referenceBoard(owner,name){const refs=saved[owner]?.refs||[];return `<div class="reference-board" data-owner="${owner}" tabindex="0" aria-label="${escapeHtml(name)}的創作參考板">${refs.map((item,index)=>{const p=boardLayout(item,index);return `<article class="board-item" data-id="${item.id}" style="left:${p.x}px;top:${p.y}px;width:${p.w}px;z-index:${p.z}"><img src="${escapeHtml(item.image)}" alt=""><button class="board-delete" data-delete="${item.id}" aria-label="刪除圖片">×</button><span class="board-resize" aria-hidden="true"></span></article>`}).join('')}<div class="board-empty">${refs.length?'':'在這裡貼上圖片'}</div></div>`}

async function uploadBoardFile(file,owner){if(!file?.type?.startsWith('image/'))return;const data=new FormData();data.set('owner',owner);data.set('kind','reference');data.set('file',file,file.name||`pasted-${Date.now()}.png`);data.set('note',JSON.stringify({x:35,y:35,w:190,z:Date.now()}));const response=await fetch('/api/references',{method:'POST',body:data});if(!response.ok)throw new Error((await response.json()).error||'圖片貼上失敗');await loadSaved();render()}
function saveBoardPosition(item){return fetch('/api/references/'+item.dataset.id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({note:JSON.stringify({x:item.offsetLeft,y:item.offsetTop,w:item.offsetWidth,z:Number(item.style.zIndex)||1})})})}
async function exportReferenceBoard(board,status){
  const scale=2,canvas=document.createElement('canvas');canvas.width=board.clientWidth*scale;canvas.height=board.clientHeight*scale;
  const context=canvas.getContext('2d');context.scale(scale,scale);context.fillStyle='#191919';context.fillRect(0,0,board.clientWidth,board.clientHeight);
  const items=[...board.querySelectorAll('.board-item')].sort((a,b)=>(Number(a.style.zIndex)||0)-(Number(b.style.zIndex)||0));
  try{
    for(const item of items){const image=item.querySelector('img');if(!image.complete)await image.decode();context.drawImage(image,item.offsetLeft,item.offsetTop,item.offsetWidth,item.offsetHeight)}
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('無法建立圖片')),'image/png'));
    const url=URL.createObjectURL(blob),download=document.createElement('a');download.href=url;download.download=`${board.dataset.owner}-reference-board.png`;download.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='PNG 已匯出。';
  }catch(error){status.textContent='有圖片來源不允許輸出，請先下載後再貼到畫布。'}
}
function bindBoard(){
  const board=document.querySelector('.reference-board');if(!board)return;
  const owner=board.dataset.owner;
  const toolbar=document.querySelector('.board-toolbar'),status=toolbar?.querySelector('output');
  toolbar?.querySelector('[data-export-board]')?.addEventListener('click',()=>exportReferenceBoard(board,status));
  toolbar?.querySelector('[data-print-board]')?.addEventListener('click',()=>{document.body.classList.add('printing-board');addEventListener('afterprint',()=>document.body.classList.remove('printing-board'),{once:true});print()});
  board.addEventListener('paste',e=>{const file=[...e.clipboardData.items].find(x=>x.type.startsWith('image/'))?.getAsFile();if(file){e.preventDefault();uploadBoardFile(file,owner)}});
  board.addEventListener('dragover',e=>{e.preventDefault();board.classList.add('is-over')});
  board.addEventListener('dragleave',()=>board.classList.remove('is-over'));
  board.addEventListener('drop',e=>{e.preventDefault();board.classList.remove('is-over');uploadBoardFile([...e.dataTransfer.files].find(x=>x.type.startsWith('image/')),owner)});
  if(window.interact){
    window.interact('.board-item').draggable({ignoreFrom:'.board-delete,.board-resize',modifiers:[window.interact.modifiers.restrictRect({restriction:'.reference-board',endOnly:true})],listeners:{start:e=>e.target.style.zIndex=String(Date.now()),move:e=>{const el=e.target;el.style.left=Math.max(0,el.offsetLeft+e.dx)+'px';el.style.top=Math.max(0,el.offsetTop+e.dy)+'px'},end:e=>saveBoardPosition(e.target)}}).resizable({edges:{right:'.board-resize',bottom:'.board-resize'},modifiers:[window.interact.modifiers.aspectRatio({ratio:'preserve'}),window.interact.modifiers.restrictSize({min:{width:80,height:60},max:{width:700,height:700}})],listeners:{move:e=>{e.target.style.width=e.rect.width+'px'},end:e=>saveBoardPosition(e.target)}});return;
  }
  board.querySelectorAll('.board-item').forEach(item=>item.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;const resizing=e.target.classList.contains('board-resize');const startX=e.clientX,startY=e.clientY,startLeft=item.offsetLeft,startTop=item.offsetTop,startWidth=item.offsetWidth;item.setPointerCapture(e.pointerId);item.style.zIndex=String(Date.now());const move=ev=>{if(resizing)item.style.width=Math.max(80,startWidth+ev.clientX-startX)+'px';else{item.style.left=Math.max(0,startLeft+ev.clientX-startX)+'px';item.style.top=Math.max(0,startTop+ev.clientY-startY)+'px'}};const end=()=>{item.removeEventListener('pointermove',move);item.removeEventListener('pointerup',end);saveBoardPosition(item)};item.addEventListener('pointermove',move);item.addEventListener('pointerup',end)}));
}
function guide(){
  return `<div class="detail"><div><h1>赫米斯</h1><p>想從哪裡開始？</p><ul><li>${link('#characters','認識角色')}</li><li>${link('#timeline','沿著史詩時間線閱讀')}</li><li>${link('#relations','看人物怎麼連在一起')}</li><li>${link('#wardrobe','翻看希臘服裝參考')}</li><li>${link('#character/hermes','認識赫米斯')}</li></ul></div>${figure(saved.hermes?.cover||defaultCover('hermes'),'赫米斯')}</div>`;
}
function relationshipList(rows){
  return rows.length?'<ul>'+rows.map(([a,rel,b])=>'<li>'+personLink(a)+' <span>— '+rel+' —</span> '+personLink(b)+'</li>').join('')+'</ul>':'<p>關係待補充</p>';
}
function relationshipView(){
  const box=(id,zh,en,x,y,w=150)=>`<a class="gene-node${id?' linked':''}" ${id?`href="#character/${id}"`:''} style="--gx:${x};--gy:${y};--gw:${w}"><b>${zh}</b><small>${en}</small></a>`;
  return `<div class="diagram-heading"><div><small>THE PRINCIPAL GODS</small><h1>眾神關係</h1><p>依你提供的神譜整理；人物只出現一次。</p></div></div>
  <div class="gene-legend"><span class="gene-double">夫妻</span><span class="gene-single">親子</span></div>
  <div class="genealogy-shell"><section class="genealogy-map">
    <svg viewBox="0 0 1100 720" aria-hidden="true"><g class="gene-lines"><line x1="530" y1="73" x2="645" y2="73"/><line x1="530" y1="79" x2="645" y2="79"/><path d="M588 79 V150 H150 V205 M588 150 H365 V205 M588 150 H585 V205 M588 150 H825 V205"/><line x1="440" y1="245" x2="510" y2="245"/><line x1="440" y1="251" x2="510" y2="251"/><path d="M365 285 V370 H255 V500 M365 370 H465 V500 M365 370 H685 V500 M365 370 H925 V500"/><path d="M150 285 V390 H75 V500"/></g><g class="gene-mothers"><text x="255" y="468">由宙斯而生</text><text x="465" y="468">母：瑪亞 Maia</text><text x="685" y="468">母：勒托 Leto</text><text x="925" y="468">母：狄俄涅 Dione</text><text x="75" y="468">波賽頓之子</text></g></svg>
    ${box('', '克羅諾斯','Cronus',380,20)}${box('', '瑞亞','Rhea',645,20)}${box('poseidon','波賽頓','Poseidon',75,205)}${box('zeus','宙斯','Zeus',290,205)}${box('hera','赫拉','Hera',510,205)}${box('','狄蜜特','Demeter',750,205)}${box('polyphemus','波呂斐摩斯','Polyphemus',0,500)}${box('athena','雅典娜','Athena',180,500)}${box('hermes','赫米斯','Hermes',390,500)}${box('apollo','阿波羅','Apollo',610,500)}${box('aphrodite','阿芙蘿黛蒂','Aphrodite',850,500)}
  </section></div>`;
}

function bindRelationMap(){
  const map=document.querySelector('.relation-map');if(!map)return;
  const reset=()=>map.querySelectorAll('.map-node,.relation-edge').forEach(item=>item.classList.remove('is-dim','is-related'));
  map.querySelectorAll('.map-node').forEach(node=>{
    const show=()=>{const id=node.dataset.person;map.querySelectorAll('.map-node').forEach(item=>item.classList.toggle('is-dim',item.dataset.person!==id&&!map.querySelector(`.relation-edge[data-people~="${id}"][data-people~="${item.dataset.person}"]`)));map.querySelectorAll('.relation-edge').forEach(item=>{const related=item.dataset.people.split(' ').includes(id);item.classList.toggle('is-related',related);item.classList.toggle('is-dim',!related)})};
    node.addEventListener('mouseenter',show);node.addEventListener('focus',show);node.addEventListener('mouseleave',reset);node.addEventListener('blur',reset);
  });
}
function timeline(){
  return '<div class="diagram-heading"><div><small>EPIC SEQUENCE</small><h1>時間線</h1><p>依故事順序整理成兩條簡化主線，卷數可連到史詩英譯。</p></div></div><div class="epic-timelines">'+[1,2].map(work=>'<section class="epic-line"><header><span>0'+work+'</span><h2>'+groups[work]+'</h2></header><div class="timeline-track">'+events.filter(([w])=>w===work).map(([w,n,summary],index)=>'<article class="timeline-event" style="--event:'+index+'"><small>'+volume(w,n)+'</small><p>'+escapeHtml(summary)+'</p></article>').join('')+'</div></section>').join('')+'</div>';
}
function sources(){
  return `<h1>資料來源</h1><section><h2>史詩文本</h2><ul><li>${link(book(1,1),'荷馬《伊利亞德》')}</li><li>${link(book(2,1),'荷馬《奧德賽》')}</li></ul><p>各卷引用 Theoi Classical Texts Library 所收錄的英譯。站內人物簡介為繁中摘要。</p></section><section><h2>神話與圖像</h2><ul><li>${link(dressSource,"The Met · 古希臘服裝")}</li><li>${link(gods,'Theoi · 奧林帕斯諸神')}</li><li>${link(metObject(252453),'The Met · 薩第斯阿耳忒彌斯神廟石柱')}</li>${Object.entries(art).map(([id])=>'<li>'+link(defaultCover(id).source,art[id][1])+'</li>').join('')}</ul></section>`;
}
function render(){
  const route=location.hash.slice(1);
  const views={wardrobe,guide,timeline,relations:relationshipView,sources,studio:()=>'<h1>我流角色互動</h1><p>待更新</p>'};
  const entry=route.startsWith('character/')?person(route.split('/')[1]):null;
  app.innerHTML=entry?detail(entry):Object.hasOwn(views,route)?views[route]():home();
  bindHero();
  bindCharacterPreview();
  bindBoard();
  if(app.querySelector(".poster"))posterSeen=true;
  for(const a of document.querySelectorAll('nav a')){
    const active=a.getAttribute('href')==='#'+(entry?'':route);
    if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  }
  const pivot=document.querySelector('#pivot');
  if(pivot)pivot.addEventListener('change',()=>{
    focusPerson=pivot.value;
    render();
    document.querySelector('#pivot').focus();
  });
  const editorForm=document.querySelector('#edit');
  if(editorForm)editorForm.addEventListener('submit',e=>saveImage(e,entry?.[0]||'wardrobe'));
}
async function saveImage(e,id){
  e.preventDefault();
  const form=e.currentTarget;
  const out=form.querySelector('output');
  const data=new FormData(form);data.set('owner',id);if(!data.get('kind'))data.set('kind','reference');
  try{
    const response=await fetch('/api/references',{method:'POST',body:data});const result=await response.json();if(!response.ok)throw new Error(result.error||'儲存失敗');
    await loadSaved();
    render();
    const details=document.querySelector('details');
    details.open=true;
    details.querySelector('output').textContent='已儲存。';
  }catch(error){
    out.textContent=error.message||'無法儲存圖片。';
  }
}
app.addEventListener('click',e=>{
  const del=e.target.closest('[data-delete]');if(del){if(confirm('確定刪除這張圖與筆記？'))fetch('/api/references/'+del.dataset.delete,{method:'DELETE'}).then(loadSaved).then(render);return}
  const edit=e.target.closest('[data-edit]');if(edit){const item=Object.values(saved).flatMap(x=>[x.cover,...x.refs].filter(Boolean)).find(x=>x.id===edit.dataset.edit);if(!item)return;const note=prompt('修改筆記',item.note||'');if(note===null)return;const source=prompt('修改來源連結',item.source||'');if(source===null)return;const license=prompt('修改授權資訊',item.license||'');if(license===null)return;fetch('/api/references/'+item.id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({note,source,license})}).then(loadSaved).then(render);return}
  const button=e.target.closest('[data-filter]');
  if(!button)return;
  filter=Number(button.dataset.filter);
  render();
  app.querySelector('[aria-pressed="true"]').focus();
});
window.addEventListener('hashchange',()=>{render();location.hash==='#characters'?document.querySelector('#characters').scrollIntoView():window.scrollTo(0,0)});
loadSaved().then(render);
