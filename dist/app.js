import {groups,met,gods,book,people,events,relations} from './data.js';

const app=document.querySelector('#app');
const key='aegean-myth-references';
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(url,label)=>'<a href="'+escapeHtml(url)+'">'+escapeHtml(label)+'</a>';
const person=id=>people.find(row=>row[0]===id);
const personLink=id=>link('#character/'+id,person(id)[1]);
const volume=(work,n)=>link(book(work,n),'第 '+n+' 卷');
const starter={athena:[{image:'athena-detail.jpg',note:'頭盔輪廓與衣褶。羅馬時期大理石雅典娜像細節。',source:met}]};
let filter=-1;
let focusPerson='athena';
const art={
  athena:[251476,'羅馬時期大理石雅典娜像'],
  apollo:[246995,'羅馬時期大理石阿波羅頭像'],
  aphrodite:[251844,'希臘化時期大理石阿芙蘿黛蒂小像'],
  odysseus:[251485,'古希臘陶壺上的弓箭手，可能是奧德修斯'],
  zeus:[252511,'希臘化時期大理石神祇頭像，可能是宙斯']
};
function defaultCover(id){
  const item=art[id];
  return item?{image:id+'.jpg',note:item[1]+' · The Met · 公共領域',source:'https://www.metmuseum.org/art/collection/search/'+item[0]}:null;
}
let saved={};
try{saved=JSON.parse(localStorage.getItem(key))||{}}catch{}
function safeUrl(value){
  try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:''}catch{return ''}
}
function figure(item,alt){
  return '<figure><img src="'+escapeHtml(item.image)+'" alt="'+escapeHtml(alt)+'"><figcaption>'+escapeHtml(item.note)+(item.source?' · '+link(item.source,'圖像來源'):'')+'</figcaption></figure>';
}
function home(){
  const cards=people.filter(p=>filter<0||p[3].includes(filter));
  return `<div class="hero"><div><span class="eyebrow">奧林帕斯主神與荷馬史詩</span><h1>希臘神話圖鑑</h1><p>從眾神、特洛伊戰場與伊薩卡，認識故事裡的人物。</p></div><a href="#character/athena" aria-label="認識雅典娜"><img src="athena.jpg" alt="羅馬時期大理石雅典娜像"></a></div>
<h2>角色介紹</h2><div class="filters">${['全部',...groups].map((g,i)=>`<button data-filter="${i-1}" aria-pressed="${filter===i-1}">${g}</button>`).join('')}</div>
<div class="grid">${cards.map(([id,name,en,_,bio])=>`<a class="card" href="#character/${id}"><h3>${name}</h3><small>${en}</small><p>${bio}</p></a>`).join('')}</div>`;
}
function detail([id,name,en,tags,bio,volumes]){
  const custom=saved[id]||{refs:[]};
  const cover=custom.cover||defaultCover(id);
  const refs=[...(starter[id]||[]),...custom.refs];
  return `<p>${link('#','← 所有角色')}</p><div class="detail"><div><small>${tags.map(index=>groups[index]).join(' · ')}</small><h1>${name}</h1><small>${en}</small></div>${cover?figure(cover,name):'<figure><figcaption>主圖待更新</figcaption></figure>'}</div>
<section><h2>簡介</h2><p>${bio}</p><p><small>${volumes.map(([w,n])=>groups[w]+' '+volume(w,n)).join(' · ')}</small></p></section>
<section><h2>Reference</h2><div class="grid">${refs.map(item=>figure(item,item.note||name+'參考圖')).join('')||'<p>參考圖待新增</p>'}</div>
<details><summary>新增參考圖或更換主圖</summary><p><small>可上傳圖片或輸入圖片網址。新增內容會儲存在目前的瀏覽器。</small></p>
<form id="edit"><label>用途<select name="kind"><option value="reference">新增 Reference</option><option value="cover">更換主圖</option></select></label><label>上傳圖片<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif"></label><label>圖片網址<input name="url" type="url"></label><label>參考筆記<input name="note" maxlength="200"></label><label>來源連結<input name="source" type="url"></label><div><button>儲存</button></div><output aria-live="polite"></output></form></details></section>
<section><h2>相關人物</h2>${relationshipList(relations.filter(([a,_,b])=>a===id||b===id))}</section>`;
}
function relationshipList(rows){
  return rows.length?'<ul>'+rows.map(([a,rel,b])=>'<li>'+personLink(a)+' <span>— '+rel+' —</span> '+personLink(b)+'</li>').join('')+'</ul>':'<p>關係待補充</p>';
}
function relationshipView(){
  const rows=relations.filter(([a,_,b])=>a===focusPerson||b===focusPerson);
  return '<h1>關係線</h1><label class="pivot">選擇人物<select id="pivot">'+people.map(([id,name])=>'<option value="'+id+'"'+(id===focusPerson?' selected':'')+'>'+name+'</option>').join('')+'</select></label><section><h2>'+personLink(focusPerson)+'</h2><div class="edges">'+rows.map(([a,rel,b])=>'<div>'+personLink(a)+'<span>'+rel+'</span>'+personLink(b)+'</div>').join('')+'</div>'+(rows.length?'':'<p>關係待補充</p>')+'</section>';
}
function timeline(){
  return '<h1>時間線</h1><p>依事件發生順序排列，卷數連到史詩英譯。</p>'+[1,2].map(work=>'<section><h2>'+groups[work]+'</h2><ol>'+events.filter(([w])=>w===work).map(([w,n,summary])=>'<li>'+summary+' <small>'+volume(w,n)+'</small></li>').join('')+'</ol></section>').join('');
}
function sources(){
  return `<h1>資料來源</h1><section><h2>史詩文本</h2><ul><li>${link(book(1,1),'荷馬《伊利亞德》')}</li><li>${link(book(2,1),'荷馬《奧德賽》')}</li></ul><p>各卷引用 Theoi Classical Texts Library 所收錄的英譯。站內人物簡介為繁中摘要。</p></section><section><h2>神話與圖像</h2><ul><li>${link(gods,'Theoi · 奧林帕斯諸神')}</li>${Object.entries(art).map(([id])=>'<li>'+link(defaultCover(id).source,art[id][1]+' · The Met')+'</li>').join('')}</ul></section>`;
}
function render(){
  const route=location.hash.slice(1);
  const views={timeline,relations:relationshipView,sources,studio:()=>'<h1>我流角色互動</h1><p>待更新</p>'};
  const entry=route.startsWith('character/')?person(route.split('/')[1]):null;
  app.innerHTML=entry?detail(entry):Object.hasOwn(views,route)?views[route]():home();
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
  if(entry)document.querySelector('#edit').addEventListener('submit',e=>saveImage(e,entry[0]));
}
async function saveImage(e,id){
  e.preventDefault();
  const form=e.currentTarget;
  const out=form.querySelector('output');
  const data=new FormData(form);
  const file=data.get('file');
  let image=safeUrl(data.get('url'));
  try{
    if(file.size){
      if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)||file.size>1500000){
        out.textContent='請選擇 1.5 MB 以下的 JPG、PNG、WebP 或 GIF。';
        return;
      }
      image=await new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result);
        reader.onerror=reject;
        reader.readAsDataURL(file);
      });
    }
    if(!image){out.textContent='請上傳一張圖或輸入圖片網址。';return}
    const item={image,note:data.get('note').trim(),source:safeUrl(data.get('source'))};
    const current=saved[id]||{refs:[]};
    const next=data.get('kind')==='cover'?{...current,cover:item}:{...current,refs:[...current.refs,item]};
    const updated={...saved,[id]:next};
    localStorage.setItem(key,JSON.stringify(updated));
    saved=updated;
    render();
    const details=document.querySelector('details');
    details.open=true;
    details.querySelector('output').textContent='已儲存。';
  }catch{
    out.textContent='無法儲存圖片。可以試較小的檔案或使用圖片網址。';
  }
}
app.addEventListener('click',e=>{
  const button=e.target.closest('[data-filter]');
  if(!button)return;
  filter=Number(button.dataset.filter);
  render();
  app.querySelector('[aria-pressed="true"]').focus();
});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});
render();
