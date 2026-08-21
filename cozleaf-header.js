/* ==========================================================
   Cozyleaf Shared Header
   Include on every page with:
   <script src="cozleaf-header.js" defer></script>
   placed right after the opening <body> tag.
   Update MAIN_TOOLS here once and it updates everywhere.
   ========================================================== */
(function(){

  const MAIN_TOOLS = [
    {name:"Convert to JPG",        cat:"Image Tools",          url:"convert-to-jpg.html"},
    {name:"BMI Calculator",        cat:"Calculators",          url:"bmi-calculator.html"},
    {name:"Calorie Calculator",    cat:"Calculators",          url:"calorie-calculator.html"},
    {name:"BMR Calculator",        cat:"Calculators",          url:"bmr-calculator.html"},
    {name:"Love Calculator",       cat:"Calculators",          url:"love-calculator.html"},
    {name:"GPA / CGPA Calculator", cat:"Calculators",          url:"gpa-cgpa-calculator.html"},
    {name:"Dog Food Calculator",   cat:"Calculators",          url:"dog-food-calculator.html"},
    {name:"Typing Speed Test",     cat:"Text Tools",           url:"typing-speed-test.html"},
    {name:"Stylish Name Generator",cat:"Name Generator Tools", url:"name-style.html"}
  ];

  // Policy / trust pages — AdSense reviewers specifically check that these
  // are easy to find from any page, not buried only in one page's footer.
  const INFO_LINKS = [
    {name:"About",          url:"about.html"},
    {name:"Contact",        url:"contact.html"},
    {name:"Privacy Policy", url:"privacy-policy.html"},
    {name:"Terms of Service", url:"terms.html"}
  ];

  const CATEGORY_ORDER = ["Text Tools","Name Generator Tools","Calculators","Image Tools"];
  const CATEGORY_HEX = {
    "Image Tools":"#FF6B4A","Calculators":"#2EC4B6",
    "Text Tools":"#8676FF","Name Generator Tools":"#8676FF"
  };

  const CSS = `
    #czHeader{position:sticky;top:0;z-index:200;background:#1B1D29;color:#fff;
      padding:12px 14px;display:flex;align-items:center;
      font-family:'Space Grotesk','Inter',sans-serif;}
    #czHeader .cz-side{flex:1;display:flex;align-items:center;min-width:0;}
    #czHeader .cz-side.cz-right{justify-content:flex-end;}
    #czHeader .cz-icon-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
      color:#fff;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;
      justify-content:center;font-size:18px;flex-shrink:0;cursor:pointer;transition:.15s;}
    #czHeader .cz-icon-btn:hover{background:#262A3B;}
    #czHeader .cz-logo{display:flex;align-items:center;flex-shrink:0;}
    #czHeader .cz-logo svg{display:block;}
    #czSearchOverlay{position:fixed;top:0;left:0;right:0;background:#1B1D29;z-index:210;
      padding:12px 14px;display:flex;align-items:center;gap:10px;
      transform:translateY(-100%);transition:transform .2s ease;}
    #czSearchOverlay.show{transform:translateY(0);}
    #czSearchOverlay input{flex:1;padding:11px 16px;border-radius:10px;border:none;
      background:rgba(255,255,255,0.08);color:#fff;font-size:16px;font-family:'Inter',sans-serif;outline:none;}
    #czSearchOverlay input::placeholder{color:rgba(255,255,255,0.45);}
    #czSearchOverlay input:focus{background:#fff;color:#14161A;}
    #czSearchOverlay .cz-close{background:none;border:none;color:#fff;font-size:22px;flex-shrink:0;cursor:pointer;}
    #czSearchResults{position:fixed;top:66px;left:10px;right:10px;background:#fff;border-radius:14px;
      box-shadow:0 16px 40px rgba(0,0,0,.3);max-height:min(420px,70vh);overflow-y:auto;
      display:none;z-index:205;border:1px solid #EBEBEB;}
    #czSearchResults.show{display:block;}
    #czSearchResults .cz-sr-item{display:flex;align-items:center;justify-content:space-between;gap:10px;
      padding:16px 18px;color:#14161A;border-bottom:1px solid #EBEBEB;font-size:15.5px;
      font-weight:600;cursor:pointer;text-decoration:none;}
    #czSearchResults .cz-sr-item:last-child{border-bottom:none;}
    #czSearchResults .cz-sr-item:active,#czSearchResults .cz-sr-item:hover{background:#F6F6F6;}
    #czSearchResults .cz-sr-cat{color:#6B6F76;font-size:12px;font-weight:500;flex-shrink:0;
      background:#F6F6F6;padding:4px 10px;border-radius:20px;}
    #czOverlay{position:fixed;inset:0;background:rgba(10,10,14,.5);z-index:220;opacity:0;
      pointer-events:none;transition:.2s;}
    #czOverlay.show{opacity:1;pointer-events:auto;}
    #czDrawer{position:fixed;top:0;left:0;height:100%;width:320px;max-width:88vw;background:#1B1D29;
      color:#fff;z-index:230;transform:translateX(-105%);transition:.25s ease;display:flex;flex-direction:column;
      font-family:'Space Grotesk','Inter',sans-serif;}
    #czDrawer.show{transform:translateX(0);}
    #czDrawer .cz-drawer-head{padding:20px;display:flex;align-items:center;justify-content:space-between;
      border-bottom:1px solid rgba(255,255,255,.08);}
    #czDrawer .cz-drawer-head h2{font-size:18px;font-weight:600;margin:0;}
    #czDrawer .cz-drawer-body{overflow-y:auto;padding:10px 0 6px;flex:1;}
    #czDrawer .cz-drawer-cat{padding:16px 20px 8px;font-size:11.5px;letter-spacing:.07em;
      color:rgba(255,255,255,.45);text-transform:uppercase;font-weight:600;display:flex;align-items:center;gap:8px;}
    #czDrawer .cz-drawer-cat .cz-chip{width:8px;height:8px;border-radius:50%;}
    #czDrawer .cz-drawer-link{display:block;padding:9px 20px 9px 32px;font-size:14px;
      color:rgba(255,255,255,.85);text-decoration:none;}
    #czDrawer .cz-drawer-link:hover{background:#262A3B;}
    #czDrawer .cz-close-x{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;}
    #czDrawer .cz-drawer-info{border-top:1px solid rgba(255,255,255,.08);padding:14px 20px 22px;
      display:flex;flex-wrap:wrap;gap:10px 16px;}
    #czDrawer .cz-drawer-info a{font-size:12.5px;color:rgba(255,255,255,.55);text-decoration:none;}
    #czDrawer .cz-drawer-info a:hover{color:#fff;}
  `;

  function slug(str){ return str.toLowerCase().replace(/[^a-z0-9]+/g,'-'); }

  function buildDrawerHTML(){
    const cats = [...new Set(MAIN_TOOLS.map(t=>t.cat))]
      .sort((a,b)=>{
        const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
        if(ia===-1&&ib===-1) return 0;
        if(ia===-1) return 1;
        if(ib===-1) return -1;
        return ia-ib;
      });
    const toolsHTML = cats.map(cat=>{
      const hex = CATEGORY_HEX[cat] || '#9AA0AC';
      const tools = MAIN_TOOLS.filter(t=>t.cat===cat);
      return `<div class="cz-drawer-cat"><span class="cz-chip" style="background:${hex}"></span>${cat}</div>` +
        tools.map(t=>`<a class="cz-drawer-link" href="${t.url}">${t.name}</a>`).join('');
    }).join('');
    const infoHTML = `<div class="cz-drawer-info">` +
      INFO_LINKS.map(l=>`<a href="${l.url}">${l.name}</a>`).join('') +
      `</div>`;
    return toolsHTML + infoHTML;
  }

  function inject(){
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <header id="czHeader">
        <div class="cz-side"><button class="cz-icon-btn" id="czDrawerBtn" aria-label="Browse all tools">☰</button></div>
        <a class="cz-logo" href="index.html">
          <svg width="147" height="42" viewBox="0 0 210 68" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="18" r="5" fill="#3FA875"/>
            <text x="21" y="30" font-family="'Space Grotesk',sans-serif" font-size="27" font-weight="700" letter-spacing="-0.5" fill="#FFFFFF">Cozyleaf</text>
            <path d="M21 44C54 58 129 58 167 40" stroke="#3FA875" stroke-width="2.4" fill="none" stroke-linecap="round"/>
            <path d="M84 55C87 48 95 45 101 48C98 54 90 58 84 56C83.3 55.7 83.6 55.3 84 55Z" fill="#3FA875"/>
            <path d="M167 40C170 31 178 27 187 29C185 38 177 44 168 43C166.5 42.8 166.6 40.9 167 40Z" fill="#3FA875"/>
          </svg>
        </a>
        <div class="cz-side cz-right"><button class="cz-icon-btn" id="czSearchBtn" aria-label="Search tools">🔍</button></div>
      </header>
      <div id="czSearchOverlay">
        <input id="czSearchInput" type="text" placeholder="Search any tool — bmi, gpa, typing..."/>
        <button class="cz-close" id="czSearchClose" aria-label="Close search">×</button>
      </div>
      <div id="czSearchResults"></div>
      <div id="czOverlay"></div>
      <aside id="czDrawer">
        <div class="cz-drawer-head"><h2>All Tools</h2><button class="cz-close-x" id="czDrawerClose">×</button></div>
        <div class="cz-drawer-body">${buildDrawerHTML()}</div>
      </aside>
    `;
    document.body.prepend(wrap);

    const drawer = document.getElementById('czDrawer');
    const overlay = document.getElementById('czOverlay');
    const openDrawer = ()=>{ drawer.classList.add('show'); overlay.classList.add('show'); };
    const closeDrawer = ()=>{ drawer.classList.remove('show'); overlay.classList.remove('show'); };
    document.getElementById('czDrawerBtn').onclick = openDrawer;
    document.getElementById('czDrawerClose').onclick = closeDrawer;
    overlay.onclick = closeDrawer;

    const searchOverlay = document.getElementById('czSearchOverlay');
    const searchInput = document.getElementById('czSearchInput');
    const results = document.getElementById('czSearchResults');
    const openSearch = ()=>{ searchOverlay.classList.add('show'); setTimeout(()=>searchInput.focus(),150); };
    const closeSearch = ()=>{ searchOverlay.classList.remove('show'); results.classList.remove('show'); };
    document.getElementById('czSearchBtn').onclick = openSearch;
    document.getElementById('czSearchClose').onclick = closeSearch;

    searchInput.addEventListener('input', ()=>{
      const q = searchInput.value.trim().toLowerCase();
      if(!q){ results.classList.remove('show'); return; }
      const matches = MAIN_TOOLS.filter(t=>t.name.toLowerCase().includes(q));
      results.innerHTML = matches.length
        ? matches.map(t=>`<a class="cz-sr-item" href="${t.url}"><span>${t.name}</span><span class="cz-sr-cat">${t.cat}</span></a>`).join('')
        : `<div style="padding:20px 18px;color:#6B6F76;font-size:14.5px;">No tool found for "${q}"</div>`;
      results.classList.add('show');
    });
    document.addEventListener('click', e=>{
      if(!e.target.closest('#czSearchOverlay') && !e.target.closest('#czSearchBtn')){
        results.classList.remove('show');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
