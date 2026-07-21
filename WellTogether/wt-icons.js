/* WellTogether icon set — inline stroke SVGs (Lucide-style), no emoji */
(function () {
  const P = {
    mapPin: '<path d="M12 21.5S5 15.6 5 10a7 7 0 0 1 14 0c0 5.6-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1H9z"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    fileText: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    testTube: '<path d="M14.5 2v7.5l4.6 8.6A2.5 2.5 0 0 1 16.9 22H7.1a2.5 2.5 0 0 1-2.2-3.9L9.5 9.5V2"/><path d="M8 2h8"/><path d="M7.5 14h9"/>',
    droplet: '<path d="M12 3c3.2 3.4 6 6.8 6 10a6 6 0 0 1-12 0c0-3.2 2.8-6.6 6-10z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    shieldCheck: '<path d="M12 2l8 3.5V11c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V5.5z"/><path d="M9 11.5l2 2 4-4"/>',
    shieldPlus: '<path d="M12 2l8 3.5V11c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V5.5z"/><path d="M12 8.5v6"/><path d="M9 11.5h6"/>',
    printer: '<path d="M6 8V3h12v5"/><path d="M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7" rx="1"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
    send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
    userPlus: '<circle cx="9.5" cy="8" r="3.5"/><path d="M3 20v-.5a6.5 6.5 0 0 1 13 0v.5"/><path d="M19 7v6"/><path d="M16 10h6"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-.5a7 7 0 0 1 14 0v.5"/>',
    building: '<rect x="4" y="3" width="12" height="18" rx="1"/><path d="M16 9h3a1 1 0 0 1 1 1v11"/><path d="M2 21h20"/><path d="M8 7h1.5"/><path d="M8 11h1.5"/><path d="M8 15h1.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9.5h18"/><path d="M8 3v4"/><path d="M16 3v4"/>',
    home: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5.5 9v11h13V9"/>',
    chevronRight: '<path d="M9.5 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="M11.5 18.5L5 12l6.5-6.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    x: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    activity: '<path d="M22 12h-4l-3 8L9 4l-3 8H2"/>',
    bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-2.5 8-2.5 8h17S18 16 18 9z"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
    alert: '<path d="M10.3 4L2.3 18a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0z"/><path d="M12 9.5V14"/><path d="M12 17.5h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18z"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    listChecks: '<path d="M4 5.5L5.5 7 8 4.5"/><path d="M4 11.5L5.5 13 8 10.5"/><path d="M4 17.5L5.5 19 8 16.5"/><path d="M11 6h10"/><path d="M11 12h10"/><path d="M11 18h10"/>',
    barChart: '<path d="M6 20v-8"/><path d="M12 20V5"/><path d="M18 20v-5"/><path d="M3 20h18"/>',
    van: '<path d="M2 17V8a2 2 0 0 1 2-2h9v11"/><path d="M13 9h4.4a1 1 0 0 1 .8.4l2.6 3.3a1 1 0 0 1 .2.6V17h-2"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M9 17h5.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
    heart: '<path d="M12 21C6.4 16.3 3 12.7 3 9a4.8 4.8 0 0 1 4.9-4.8c1.6 0 3.1.8 4.1 2.1a5.1 5.1 0 0 1 4.1-2.1A4.8 4.8 0 0 1 21 9c0 3.7-3.4 7.3-9 12z"/>',
    smartphone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18.5h2"/>'
  };
  window.icon = function (name, size, cls) {
    size = size || 20;
    return '<svg class="ic ' + (cls || '') + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  };
})();
