/* Off That Couch Fitness — icon set. Inline stroke SVGs (Lucide-style), no emoji. */
(function () {
  const P = {
    /* nav */
    home:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"/>',
    layers:    '<path d="M12 3 3 7.5 12 12l9-4.5z"/><path d="m3 12.5 9 4.5 9-4.5"/><path d="m3 17 9 4.5L21 17"/>',
    spark:     '<path d="M12 3v3.5"/><path d="M12 17.5V21"/><path d="M3 12h3.5"/><path d="M17.5 12H21"/><path d="m5.6 5.6 2.5 2.5"/><path d="m15.9 15.9 2.5 2.5"/><path d="m18.4 5.6-2.5 2.5"/><path d="m8.1 15.9-2.5 2.5"/><circle cx="12" cy="12" r="3"/>',
    apple:     '<path d="M12 8.5c-1.5-2.5-5-2.6-6.4 0-1.6 3 .6 7.6 3 10 1.2 1.2 2.4 1.2 3.4.6 1-.6 2.2-.6 3.4.6 2.4-2.4 4.6-7 3-10-1.4-2.6-4.9-2.5-6.4 0z"/><path d="M12 8.5c.2-1.9 1.6-3.4 3.4-3.6"/>',
    user:      '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
    /* disciplines */
    swim:      '<circle cx="16" cy="7" r="1.8"/><path d="M5 12.5 9 10l3.5 2.2L10 15"/><path d="m12.5 12.2 3.5-2.4 2.8 2.2"/><path d="M2.5 18.5c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4"/>',
    bike:      '<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17 9 8h5"/><path d="m9 8 5 9h4.5"/><circle cx="15.5" cy="4.5" r="1.4"/><path d="M11 11h5"/>',
    run:       '<circle cx="14.5" cy="4.5" r="1.9"/><path d="m8 21 2.6-5.2-2.4-2.6.9-4.4L13 7l2.6 3.2 3 .8"/><path d="m10.2 12.2 3.4 2.1L15 21"/><path d="M4.5 10.8 8.1 8.8"/>',
    strength:  '<path d="M4 9v6"/><path d="M20 9v6"/><path d="M6.5 6.5v11"/><path d="M17.5 6.5v11"/><path d="M6.5 12h11"/>',
    rest:      '<path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
    brick:     '<path d="M3 8h18"/><path d="M3 16h18"/><path d="M3 4.5h18v15H3z"/><path d="M9 4.5V8"/><path d="M15 8v8"/><path d="M9 16v3.5"/>',
    /* content types */
    pdf:       '<path d="M6.5 2.5h7l4.5 4.5v14.5h-11.5z"/><path d="M13.5 2.5V7H18"/><path d="M9 13h6"/><path d="M9 16.5h4"/>',
    video:     '<rect x="2.5" y="5.5" width="13.5" height="13" rx="2.5"/><path d="m16 11 5.5-3.2v8.4L16 13z"/>',
    audio:     '<path d="M11 5 6.5 8.5H3v7h3.5L11 19z"/><path d="M15 9.2a4 4 0 0 1 0 5.6"/><path d="M17.8 6.4a8 8 0 0 1 0 11.2"/>',
    play:      '<path d="M7 4.5 19 12 7 19.5z"/>',
    /* ui */
    check:     '<path d="m4.5 12.5 5 5 10-11"/>',
    checkCircle:'<circle cx="12" cy="12" r="9.2"/><path d="m8 12.3 2.8 2.8L16.2 9.5"/>',
    lock:      '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.4"/><path d="M8 10.5V7.2a4 4 0 0 1 8 0v3.3"/><circle cx="12" cy="15.7" r="1.2"/>',
    chevR:     '<path d="m9.5 5 7 7-7 7"/>',
    chevL:     '<path d="m14.5 5-7 7 7 7"/>',
    chevD:     '<path d="m5 9.5 7 7 7-7"/>',
    plus:      '<path d="M12 5v14"/><path d="M5 12h14"/>',
    camera:    '<path d="M3 8.5h3.6l1.6-2.6h7.6l1.6 2.6H21v11H3z"/><circle cx="12" cy="14" r="3.6"/>',
    flame:     '<path d="M12 22c4 0 6.5-2.7 6.5-6.2 0-4.4-4.2-6-5.2-10.3-2 1.4-3 3.2-3 5.2-1.2-.6-1.8-1.8-1.8-3-1.9 1.7-3 4-3 6.6C5.5 18.6 8 22 12 22z"/>',
    heart:     '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
    moon:      '<path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
    sun:       '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5"/><path d="M12 19.5V22"/><path d="M2 12h2.5"/><path d="M19.5 12H22"/><path d="m4.9 4.9 1.8 1.8"/><path d="m17.3 17.3 1.8 1.8"/><path d="m19.1 4.9-1.8 1.8"/><path d="m6.7 17.3-1.8 1.8"/>',
    calendar:  '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/>',
    chart:     '<path d="M4 20V9"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M3 20h18"/>',
    trend:     '<path d="m3 16 5.5-5.5 3.5 3.5L21 5"/><path d="M15.5 5H21v5.5"/>',
    watch:     '<rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="M9 6.5 9.5 2h5l.5 4.5"/><path d="M9 17.5 9.5 22h5l.5-4.5"/><path d="M12 9.5V12l1.8 1.2"/>',
    bell:      '<path d="M18 8.5a6 6 0 1 0-12 0c0 6-2 7.5-2 7.5h16s-2-1.5-2-7.5z"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
    target:    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    trophy:    '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5.5H4.5v1A3.5 3.5 0 0 0 8 10"/><path d="M17 5.5h2.5v1A3.5 3.5 0 0 1 16 10"/><path d="M12 14v3.5"/><path d="M8.5 21h7l-.7-3.5h-5.6z"/>',
    shield:    '<path d="M12 2.5 20 6v5.5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z"/><path d="m8.8 12 2.3 2.3 4.3-4.6"/>',
    utensils:  '<path d="M6 2.5V11a2.5 2.5 0 0 0 5 0V2.5"/><path d="M8.5 11v10.5"/><path d="M17 2.5c-1.6 1.2-2.5 3-2.5 5.2V13H19V2.5z"/><path d="M17 13v8.5"/>',
    send:      '<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.8 18-3.7-7.5L3 9.8z"/>',
    settings:  '<circle cx="12" cy="12" r="3"/><path d="M19.4 14.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1A1.6 1.6 0 0 0 10 3.5v-.3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.3 1.5z"/>',
    droplet:   '<path d="M12 3c3.2 3.4 6 6.8 6 10a6 6 0 0 1-12 0c0-3.2 2.8-6.6 6-10z"/>',
    alert:     '<path d="M12 3 2.5 20h19z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r=".8"/>',
    info:      '<circle cx="12" cy="12" r="9.2"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".9"/>',
    clock:     '<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2"/>',
    mapPin:    '<path d="M12 21.5S5 15.6 5 10a7 7 0 0 1 14 0c0 5.6-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
    arrowUp:   '<path d="M12 20V4"/><path d="m5.5 10.5 6.5-6.5 6.5 6.5"/>',
    x:         '<path d="M6 6 18 18"/><path d="M18 6 6 18"/>',
    menu:      '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    sliders:   '<path d="M4 6h10"/><path d="M18 6h2"/><path d="M4 12h4"/><path d="M12 12h8"/><path d="M4 18h10"/><path d="M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    book:      '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    search:    '<circle cx="11" cy="11" r="7"/><path d="m16.2 16.2 4.3 4.3"/>',
    star:      '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/>',
    zap:       '<path d="M13.5 2 4 13.5h6.5L10 22l9.5-11.5H13z"/>',
    wave:      '<path d="M2 8c1.6 0 1.6 1.6 3.2 1.6S6.8 8 8.4 8 10 9.6 11.6 9.6 13.2 8 14.8 8s1.6 1.6 3.2 1.6S19.6 8 21.2 8"/><path d="M2 14c1.6 0 1.6 1.6 3.2 1.6S6.8 14 8.4 14s1.6 1.6 3.2 1.6S13.2 14 14.8 14s1.6 1.6 3.2 1.6S19.6 14 21.2 14"/>',
  };

  const SIZE_DEFAULT = 22;

  window.otcfIcon = function (name, opts) {
    opts = opts || {};
    const size = opts.size || SIZE_DEFAULT;
    const sw = opts.sw || 1.7;
    const cls = opts.cls ? ' ' + opts.cls : '';
    const fill = opts.fill || 'none';
    const body = P[name];
    if (!body) return '';
    return '<svg class="ic' + cls + '" viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="' + fill + '" stroke="currentColor" stroke-width="' + sw +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  };
  window.otcfIconNames = Object.keys(P);
})();
