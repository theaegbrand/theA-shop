const $=s=>document.querySelector(s), money=n=>"EGP "+n.toLocaleString("en-US"), pct=p=>Math.round((1-p.now/p.was)*100);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const img=(src,alt,extra="")=>`<img src="${src}" alt="${esc(alt)}" data-ph="${esc(alt)}" loading="lazy" decoding="async" ${extra}>`;
const toast=m=>{const t=$("#toast"),d=document.getElementById("dlg");(d.open?d:document.body).appendChild(t);t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3200)};

/* embedded logo: nav holds the single copy; hero & footer reuse it */
const LOGO=LOGO_DATA, FAV="favicon.png";
document.querySelectorAll("img[data-logo]").forEach(i=>i.src=LOGO);

/* graceful image fallback */
document.addEventListener("error",e=>{
  const i=e.target; if(i.tagName!=="IMG"||!i.dataset.ph) return;
  if(i.classList.contains("alt")){i.remove();return}
  if(i.closest(".thumbs")&&i.closest("button").previousElementSibling){i.closest("button").remove();return}
  const ph=document.createElement("div");ph.className="ph";ph.setAttribute("role","img");ph.setAttribute("aria-label",i.dataset.ph);
  ph.innerHTML='<img src="'+FAV+'" alt=""><span>'+esc(i.dataset.ph)+"</span>";
  i.replaceWith(ph);
},true);

/* links */
function waUrl(msg){
  if(CONFIG.whatsappNumber) return "https://wa.me/"+CONFIG.whatsappNumber.replace(/\D/g,"")+"?text="+encodeURIComponent(msg);
  const l=CONFIG.whatsappLink; return l+(l.includes("?")?"&":"?")+"text="+encodeURIComponent(msg);
}
const generic="Hello THE A, I'd like to ask about your collection.";
[["cWa","fWa"]].flat().forEach(id=>$("#"+id).href=waUrl(generic));
["cIg","fIg"].forEach(id=>$("#"+id).href=CONFIG.instagram);
$("#fab").href=waUrl(generic);
["cFb","fFb"].forEach(id=>$("#"+id).href=CONFIG.facebook);
$("#yr").textContent=new Date().getFullYear();

/* ordering info, policies, contact & about (all from CONFIG) */
$("#aboutBody").innerHTML=CONFIG.about.map(t=>`<p>${esc(t)}</p>`).join("")
 +`<ul class="pillars">${CONFIG.aboutPillars.map(x=>`<li><strong>${esc(x.t)}</strong><span>${esc(x.d)}</span></li>`).join("")}</ul>`
 +(CONFIG.aboutIsPlaceholder?'<p class="note">[Placeholder — replace with your own brand story in CONFIG.]</p>':"");
$("#steps").innerHTML=CONFIG.orderSteps.map(t=>`<li><span>${esc(t)}</span></li>`).join("");
$("#policies").innerHTML=CONFIG.policies.map(p=>`<div class="pol"><h4>${esc(p.title)}</h4>${p.text?`<p>${esc(p.text)}</p>`:`<p class="todo">To be completed — ${esc(p.hint||"")}</p>`}</div>`).join("");
const handle=(CONFIG.instagram.match(/instagram\.com\/([^/?#]+)/)||[])[1];
$("#channels").innerHTML=`<div><b>WhatsApp</b><a href="${waUrl(generic)}" target="_blank" rel="noopener">Chat with us</a></div>
 <div><b>Instagram</b><a href="${CONFIG.instagram}" target="_blank" rel="noopener">${handle?"@"+esc(handle):"Message us"}</a></div>
 <div><b>Facebook</b><a href="${CONFIG.facebook}" target="_blank" rel="noopener">Message us</a></div>`;

/* size table */
function sizeRows(){return "<thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr></thead><tbody>"+SIZES.map(s=>`<tr><td><b>${s[0]}</b></td><td>${s[1]} cm</td><td>${s[2]} cm</td><td>${s[3]} cm</td></tr>`).join("")+"</tbody>"}
$("#sizeTable").innerHTML=sizeRows();

/* cards */
$("#grid").innerHTML=PRODUCTS.map(p=>{
  const c=p.colors;
  return `<article class="card" data-id="${p.id}">
   <div class="media"><span class="tag">${pct(p)}% off</span>${img(c[0].imgs[0],p.name+" — "+c[0].name)}${c[1]?img(c[1].imgs[0],p.name+" — "+c[1].name,'class="alt" aria-hidden="true"'):""}</div>
   <h3>${p.name}</h3>${p.parts?'<p class="sub">Available as a set, top or pants</p>':""}
   <div class="price"><s>${money(p.was)}</s><b>${money(p.now)}</b></div>
   <button class="btn ghost" data-open="${p.id}" aria-label="View details — ${p.name}">View details</button>
  </article>`}).join("");
$("#grid").addEventListener("click",e=>{const a=e.target.closest(".card");if(a)openProduct(a.dataset.id,a.querySelector("button"))});

/* product dialog */
const dlg=$("#dlg"); let S={}, opener=null;
const imgsFor=c=>(S.part!=="set"&&c.partImgs&&c.partImgs[S.part])||c.imgs; // piece-specific photos when available
const showGal=()=>{const g=dlg.querySelector(".gal");if(g&&g.getBoundingClientRect().bottom<80)g.scrollIntoView({behavior:"smooth",block:"start"})};
const cur=()=>S.part!=="set"&&S.p.parts?S.p.parts.find(x=>x.id===S.part):{name:"Full set",was:S.p.was,now:S.p.now}; // price of the chosen piece
function openProduct(id,from){
  S={p:PRODUCTS.find(p=>p.id===id),ci:0,size:null,gi:0,part:"set"}; if(S.p.colors.length===1)S.ci=0, S.color=S.p.colors[0].name; else S.color=null;
  if(from) opener=from; render(true); if(!dlg.open){history.pushState({modal:1},"");dlg.showModal()} dlg.scrollTop=0; dlg.querySelector(".close").focus();
}
function render(fx){
  document.body.appendChild($("#toast"));
  const p=S.p,c=p.colors[S.ci],q=cur(),L=imgsFor(c);
  const others=PRODUCTS.filter(o=>o!==p);
  dlg.innerHTML=`<button class="close" aria-label="Close">&times;</button>
  <div class="pd">
   <div class="gal"><div class="main${fx?" fx":""}" id="main">${img(L[S.gi]||L[0],p.name+" — "+c.name+(S.part!=="set"?" — "+q.name:""))}${L.length>1?`<span class="count" aria-hidden="true">${S.gi+1} / ${L.length}</span>`:""}</div>
    <div class="thumbs" aria-label="Photos">${L.map((s,i)=>`<button data-g="${i}" aria-label="Photo ${i+1}" ${i===S.gi?'aria-current="true"':""}>${img(s,p.name+" photo "+(i+1))}</button>`).join("")}</div></div>
   <div class="info">
    <h2 id="pTitle">${p.name}</h2>
    <div class="price">${q.was?`<s>${money(q.was)}</s>`:""}<b>${money(q.now)}</b>${q.was?`<span class="pct">${pct(q)}% off</span>`:""}</div>
    <p class="desc">${p.desc}</p>
    <ul class="facts">${p.parts?`<li><span>Piece</span>${q.name}</li>`:""}${p.fabric?`<li><span>Fabric</span>${p.fabric}</li>`:""}<li><span>Color</span>${S.color||p.colors.map(x=>x.name).join(" / ")}</li></ul>
    ${p.parts?`<fieldset id="fPart"><legend>Choose your piece</legend><div class="opts">${[{id:"set",name:"Full set",now:p.now},...p.parts].map(x=>`<button class="opt" data-p="${x.id}" aria-pressed="${S.part===x.id}">${x.name}<small>${money(x.now)}</small></button>`).join("")}</div></fieldset>`:""}
    <fieldset id="fColor"><legend>${p.colors.length>1?"Choose your color":"Color"}</legend><div class="opts">
     ${p.colors.map((x,i)=>`<button class="opt" data-c="${i}" aria-pressed="${S.color===x.name}"><span class="sw" style="background:${x.sw}"></span>${x.name}</button>`).join("")}</div></fieldset>
    <fieldset id="fSize"><legend>Select your size</legend><div class="opts">
     ${SIZES.map(s=>`<button class="opt" data-s="${s[0]}" aria-pressed="${S.size===s[0]}">${s[0]}</button>`).join("")}</div>
     <button class="link" id="sgBtn" aria-expanded="false" aria-controls="sg">Size guide</button>
     <div class="tbl sg" id="sg" hidden><table>${sizeRows()}</table></div></fieldset>
    <div class="order">
     <p class="msg" id="msg" role="alert"></p>
     <a class="btn block" id="oWa" href="#" target="_blank" rel="noopener">Order via WhatsApp</a>
     <div class="two"><a class="btn ghost" id="oIg" href="#" target="_blank" rel="noopener">Message us on Instagram</a><a class="btn ghost" id="oFb" href="#" target="_blank" rel="noopener">Facebook Messenger</a></div>
     <p class="note">No online checkout — we confirm your order by message.</p>
    </div>
   </div>
  </div>
  <div class="more"><h3>You may also love</h3>
   <div class="mini">${others.map(o=>`<button data-o="${o.id}"><span class="t">${img(o.colors[0].imgs[0],o.name)}</span><span><strong>${o.name}</strong><span class="price"><s>${money(o.was)}</s><b>${money(o.now)}</b></span></span></button>`).join("")}</div>
   <div class="look"><h3>Complete your look</h3><p>Explore every piece in THE A collection.</p><button class="btn ghost" data-all>Discover the collection</button></div>
  </div>
  <div class="bar"><div class="price">${q.was?`<s>${money(q.was)}</s>`:""}<b>${money(q.now)}</b></div><a class="btn" id="bWa" href="#" target="_blank" rel="noopener">Order now</a></div>`;
  setOrder();
}
function message(){
  const p=S.p; return `Hello THE A, I'd like to order:\nProduct: ${p.name}\n`+(p.parts?`Piece: ${cur().name}\n`:"")+(p.colors.length>1||S.color?`Color: ${S.color}\n`:"")+`Size: ${S.size}\nPrice: ${money(cur().now)}\nThank you!`;
}
function ready(){return S.color&&S.size}
function setOrder(){
  const wa=$("#oWa"),ig=$("#oIg"),fb=$("#oFb"),ok=ready();
  const bw=$("#bWa");[wa,ig,fb,bw].forEach(a=>a.setAttribute("aria-disabled",!ok));
  wa.href=bw.href=ok?waUrl(message()):"#"; ig.href=ok?CONFIG.instagram:"#"; fb.href=ok?CONFIG.facebook:"#";
  if(ok)$("#msg").textContent="";
}
dlg.addEventListener("click",e=>{
  const t=e.target;
  if(t===dlg){dlg.close();return}
  if(t.closest(".close")){dlg.close();return}
  const g=t.closest("[data-g]"); if(g){S.gi=+g.dataset.g;render(true);dlg.querySelector(`[data-g="${S.gi}"]`)?.focus();return}
  const pt=t.closest("[data-p]"); if(pt){const before=imgsFor(S.p.colors[S.ci]);S.part=pt.dataset.p;S.gi=0;const changed=before!==imgsFor(S.p.colors[S.ci]);render(changed);dlg.querySelector(`[data-p="${S.part}"]`).focus({preventScroll:true});if(changed)showGal();return}
  const c=t.closest("[data-c]"); if(c){S.ci=+c.dataset.c;S.color=S.p.colors[S.ci].name;S.gi=0;render(true);dlg.querySelector(`[data-c="${S.ci}"]`).focus({preventScroll:true});
    const gal=dlg.querySelector(".gal");if(gal.getBoundingClientRect().bottom<80)gal.scrollIntoView({behavior:"smooth",block:"start"}); /* photo scrolled out of view (phones): bring it back */
    return}
  const s=t.closest("[data-s]"); if(s){S.size=s.dataset.s;render();dlg.querySelector(`[data-s="${S.size}"]`).focus();return}
  if(t.closest("#sgBtn")){const b=$("#sgBtn"),sg=$("#sg"),o=sg.hidden;sg.hidden=!o;b.setAttribute("aria-expanded",o);return}
  const o=t.closest("[data-o]"); if(o){openProduct(o.dataset.o);return}
  if(t.closest("[data-all]")){dlg.close();location.hash="#collection";return}
  const a=t.closest(".order a.btn,#bWa");
  if(a){
    if(!ready()){
      e.preventDefault();
      const m=!S.color?"Please choose your color first.":"Please select your size first.";
      $("#msg").textContent=m;const g=!S.color?$("#fColor"):$("#fSize");
      g.scrollIntoView({block:"center",behavior:"smooth"});g.querySelector(".opt").focus({preventScroll:true});
      g.classList.remove("nudge");void g.offsetWidth;g.classList.add("nudge");toast(m);return;
    }
    if(a.id!=="oWa"&&a.id!=="bWa"){ // Instagram / Facebook can't be pre-filled: copy the message
      navigator.clipboard?.writeText(message()).then(()=>toast("Order message copied — paste it in the chat."),()=>{});
    }
  }
});
dlg.addEventListener("close",()=>{opener?.focus();if(history.state&&history.state.modal)history.back()});
addEventListener("popstate",()=>{if(dlg.open)dlg.close()});
/* nav */
const menu=$("#menu"),nav=$("#nav");
menu.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o)});
nav.addEventListener("click",e=>{if(e.target.closest("a")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
/* ===== 3D interactive hero logo ===== */
const REDUCE=matchMedia("(prefers-reduced-motion: reduce)").matches;
(()=>{
 const st=$("#stage"),m=$("#logo3d"),hero=document.querySelector(".hero"); if(!st||!m) return;
 st.style.setProperty("--logo",`url("${LOGO}")`);
 // extrusion: stacked copies of the logo shape, darker toward the back
 const N=matchMedia("(pointer:coarse)").matches?12:18,A=[96,13,28],B=[40,5,13],col=t=>"rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(",")+")";
 let h="";for(let i=N;i>=1;i--){const t=i/N;h+=`<i class="layer" style="--c:${col(t)};transform:translateZ(calc(var(--d) * ${(.5-t).toFixed(3)}))"></i>`}
 m.insertAdjacentHTML("afterbegin",h); m.insertAdjacentHTML("beforeend",'<i class="sheen"></i>');
 const sh=m.querySelector(".sheen"),o1=st.querySelector(".o1"),o2=st.querySelector(".o2");
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 let tx=0,ty=0,ry=0,rx=0,last=0,drag=null,run=false,raf=0,paused=false,bob=0,roll=0,cyc=-1;
 const touch=()=>{last=performance.now();st.classList.add("used")};
 const ease=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2, RAD=Math.PI/180;
 // hands-free motion: lively sway + float, then one full turn every 11 s (reduced-motion setting: tiny slow sway only)
 function auto(now){
  if(REDUCE){tx=Math.sin(now/2600)*8;ty=Math.cos(now/3300)*3;return}
  const c=Math.floor(now/11000),t=now%11000;
  if(c!==cyc){cyc=c;ry=((ry+180)%360+360)%360-180}
  tx=t<7500?Math.sin(t/3750*Math.PI*2)*30:ease((t-7500)/3500)*360;
  ty=Math.cos(now/1500)*9; bob=Math.sin(now/900)*7; roll=Math.sin(now/2100)*1.6;
 }
 const mo=$("#mo");
 mo.addEventListener("click",()=>{paused=!paused;mo.setAttribute("aria-pressed",paused);mo.textContent=paused?"Play":"Pause";mo.setAttribute("aria-label",paused?"Play logo animation":"Pause logo animation")});
 function frame(now){
  if(!drag&&!paused&&now-last>1200)auto(now); else if(paused){bob*=.92;roll*=.92}
  ry+=(tx-ry)*.09; rx+=(ty-rx)*.09;
  m.style.transform=`translateY(${bob.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg)`;
  const sy=Math.sin(ry*RAD),sx=Math.sin(rx*RAD);
  sh.style.setProperty("--sx",(50+sy*40).toFixed(1)+"%"); sh.style.setProperty("--sy",(30-sx*60).toFixed(1)+"%");
  o1.style.transform=`translate3d(${(sy*40).toFixed(1)}px,${(sx*50).toFixed(1)}px,0)`; o2.style.transform=`translate3d(${(-sy*40).toFixed(1)}px,${(-sx*50).toFixed(1)}px,0)`;
  raf=run?requestAnimationFrame(frame):0;
 }
 new IntersectionObserver(([e])=>{run=e.isIntersecting;if(run&&!raf)raf=requestAnimationFrame(frame)}).observe(hero);
 addEventListener("pointermove",e=>{ // mouse: logo follows the pointer while over the hero
  if(drag||e.pointerType!=="mouse")return; const r=hero.getBoundingClientRect();
  if(e.clientY<r.top||e.clientY>r.bottom)return; touch();
  tx=clamp((e.clientX/innerWidth-.5)*60,-40,40); ty=clamp(-((e.clientY-r.top)/r.height-.5)*28,-16,16);
 },{passive:true});
 st.addEventListener("pointerdown",e=>{if(e.target.closest(".mo"))return;drag={x:e.clientX,y:e.clientY,tx,ty};st.setPointerCapture(e.pointerId);touch()});
 st.addEventListener("pointermove",e=>{if(!drag)return;touch();tx=clamp(drag.tx+(e.clientX-drag.x)*.55,-75,75);ty=clamp(drag.ty-(e.clientY-drag.y)*.3,-30,30)});
 const up=()=>{drag=null;last=performance.now()};
 st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up);
 st.addEventListener("keydown",e=>{const d={ArrowLeft:[-18,0],ArrowRight:[18,0],ArrowUp:[0,8],ArrowDown:[0,-8]}[e.key];if(!d)return;e.preventDefault();touch();tx=clamp(tx+d[0],-75,75);ty=clamp(ty+d[1],-30,30)});
})();

/* ===== product cards: 3D tilt + glare (mouse only) ===== */
if(!REDUCE&&matchMedia("(hover:hover) and (pointer:fine)").matches) document.querySelectorAll(".card").forEach(c=>{
 c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty("--cry",((x-.5)*9).toFixed(2)+"deg");c.style.setProperty("--crx",((.5-y)*7).toFixed(2)+"deg");
  c.style.setProperty("--gx",(x*100).toFixed(0)+"%");c.style.setProperty("--gy",(y*100).toFixed(0)+"%")});
 c.addEventListener("pointerleave",()=>{c.style.setProperty("--cry","0deg");c.style.setProperty("--crx","0deg")});
});
/* ===== mobile: swipe photos, carousel dots, quick-order button, menu ===== */
let swp=null;
dlg.addEventListener("touchstart",e=>{swp=e.target.closest("#main")?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
dlg.addEventListener("touchend",e=>{
 if(!swp)return; const t=e.changedTouches[0],dx=t.clientX-swp.x,dy=t.clientY-swp.y; swp=null;
 const L=imgsFor(S.p.colors[S.ci]); if(L.length<2||Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.3)return;
 S.gi=(S.gi+(dx<0?1:-1)+L.length)%L.length; render(true);
},{passive:true});
(()=>{
 const g=$("#grid"),d=$("#dots"); d.innerHTML=PRODUCTS.map(()=>"<i></i>").join("");
 const upd=()=>{const c=g.querySelector(".card");if(!c)return;const i=Math.round(g.scrollLeft/(c.offsetWidth+14));[...d.children].forEach((x,k)=>x.classList.toggle("on",k===Math.min(i,PRODUCTS.length-1)))};
 g.addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true}); upd();
 const fab=$("#fab"),hide=new Set();
 new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?hide.add(e.target):hide.delete(e.target));fab.classList.toggle("off",hide.size>0)}).observe($("#contact"));
 document.addEventListener("click",e=>{if(nav.classList.contains("open")&&!e.target.closest("nav,#menu")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
 addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.focus()}});
})();
