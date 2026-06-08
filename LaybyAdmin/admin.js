/* Shared sidebar + topbar injection for LayBys.com Super Admin */
(function(){
  const ICONS = {
    dash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    laybys:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>',
    merchants:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18l-1 4H4L3 7z"/><path d="M5 11v8h14v-8"/><path d="M9 22V14h6v8"/></svg>',
    products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    customers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    payments:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>',
    rules:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    exceptions:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.7 16.6-8.3-14.3a1.6 1.6 0 0 0-2.8 0L2.3 16.6A1.6 1.6 0 0 0 3.7 19h16.6a1.6 1.6 0 0 0 1.4-2.4z"/><path d="M12 9v4"/><path d="M12 17h0"/></svg>',
    reports:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>',
    notif:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
    newsletter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    content:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5 1a7 7 0 0 0-2.1-1.2L14 3h-4l-.4 2.5a7 7 0 0 0-2.1 1.2l-2.5-1-2 3.5L5.1 10.8a7 7 0 0 0 0 2.4L3 14.8l2 3.5 2.5-1a7 7 0 0 0 2.1 1.2L10 21h4l.4-2.5a7 7 0 0 0 2.1-1.2l2.5 1 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
    help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h0"/></svg>'
  };

  const NAV = [
    {section:'Overview',items:[
      {id:'dashboard',label:'Dashboard',icon:'dash',href:'dashboard.html'}
    ]},
    {section:'Operations',items:[
      {id:'laybys',label:'Lay-By Agreements',icon:'laybys',href:'laybys.html'},
      {id:'payments',label:'Payments',icon:'payments',href:'payments.html'},
      {id:'exceptions',label:'Exceptions',icon:'exceptions',href:'exceptions.html',badge:7}
    ]},
    {section:'Marketplace',items:[
      {id:'merchants',label:'Merchants',icon:'merchants',href:'merchants.html'},
      {id:'products',label:'Products & Categories',icon:'products',href:'products.html'},
      {id:'customers',label:'Customers',icon:'customers',href:'customers.html'}
    ]},
    {section:'Configuration',items:[
      {id:'rules',label:'Lay-By Rules',icon:'rules',href:'rules.html'}
    ]},
    {section:'Insights',items:[
      {id:'reports',label:'Reports',icon:'reports',href:'reports.html'}
    ]},
    {section:'Account',items:[
      {id:'settings',label:'Settings',icon:'settings',href:'settings.html'}
    ]}
  ];

  function buildSidebar(active){
    let html = `
      <a href="dashboard.html" class="sidebar-brand" style="text-decoration:none">
        <div class="sidebar-brand-mark">L</div>
        <div>
          <div class="sidebar-brand-text">LayBys.com</div>
          <small>Super Admin</small>
        </div>
      </a>
      <nav class="sidebar-nav">`;
    NAV.forEach(s=>{
      html += `<div class="sidebar-section"><div class="sidebar-section-title">${s.section}</div>`;
      s.items.forEach(it=>{
        const cls = it.id===active ? 'sidebar-link active' : 'sidebar-link';
        const badge = it.badge ? `<span class="badge">${it.badge}</span>` : '';
        html += `<a href="${it.href}" class="${cls}">${ICONS[it.icon]}<span>${it.label}</span>${badge}</a>`;
      });
      html += `</div>`;
    });
    html += `</nav>
      <div class="sidebar-foot">
        <div class="sidebar-foot-avatar">GR</div>
        <div style="min-width:0">
          <div class="sidebar-foot-name">Greg Rogers</div>
          <div class="sidebar-foot-role">Owner · Super Admin</div>
        </div>
      </div>`;
    return html;
  }

  function buildTopbar(title, sub){
    return `
      <div>
        <div class="topbar-title">${title}${sub?`<small>${sub}</small>`:''}</div>
      </div>
      <div class="topbar-spacer"></div>
      <div class="topbar-search">
        ${ICONS.search}
        <input type="text" placeholder="Search agreements, customers, merchants…" />
      </div>
      <button class="topbar-icon-btn" title="Help">${ICONS.help}</button>
      <button class="topbar-icon-btn" title="Notifications"><span class="dot"></span>${ICONS.bell}</button>
    `;
  }

  window.LBAdmin = {
    mount(active, title, sub){
      const sb = document.getElementById('sidebar');
      const tb = document.getElementById('topbar');
      if(sb) sb.innerHTML = buildSidebar(active);
      if(tb) tb.innerHTML = buildTopbar(title || 'Dashboard', sub || '');
    }
  };
})();
