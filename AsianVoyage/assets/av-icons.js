/* Asian Voyage icon set — inline stroke SVGs, no emoji anywhere in the UI. */
(function () {
  const P = {
    // navigation & chrome
    menu:        '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    x:           '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    search:      '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
    chevronRight:'<path d="M9.5 6l6 6-6 6"/>',
    chevronDown: '<path d="M6 9.5l6 6 6-6"/>',
    chevronLeft: '<path d="M14.5 6l-6 6 6 6"/>',
    arrowLeft:   '<path d="M19 12H5"/><path d="M11.5 18.5L5 12l6.5-6.5"/>',
    arrowRight:  '<path d="M5 12h14"/><path d="M12.5 5.5L19 12l-6.5 6.5"/>',
    external:    '<path d="M14 4h6v6"/><path d="M20 4l-8.5 8.5"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    plus:        '<path d="M12 5v14"/><path d="M5 12h14"/>',
    minus:       '<path d="M5 12h14"/>',
    check:       '<path d="M5 12.5l4.5 4.5L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    dot:         '<circle cx="12" cy="12" r="4"/>',
    trash:       '<path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/>',
    edit:        '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 6.5l3 3"/>',
    refresh:     '<path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5"/><path d="M20 20v-4.5h-4.5"/>',
    settings:    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',

    // ordering & restaurant
    cart:        '<circle cx="9" cy="20" r="1.6"/><circle cx="17.5" cy="20" r="1.6"/><path d="M2.5 3h2.2l2.4 12.1a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.3L21 7H6"/>',
    bowl:        '<path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z"/><path d="M12 11V6"/><path d="M9.5 6.5a2.5 2.5 0 1 1 5 0"/><path d="M6 20.5h12"/>',
    chopsticks:  '<path d="M4 20L17 4"/><path d="M8 20L21 4"/>',
    table:       '<path d="M3 9h18"/><path d="M5 9v11"/><path d="M19 9v11"/><path d="M4 5h16a1 1 0 0 1 1 1v3H3V6a1 1 0 0 1 1-1z"/>',
    receipt:     '<path d="M5 3h14v18l-2.3-1.6L14.4 21l-2.4-1.6L9.6 21l-2.3-1.6L5 21z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/>',
    printer:     '<path d="M6 8V3h12v5"/><path d="M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7" rx="1"/>',
    chef:        '<path d="M7 21h10"/><path d="M6.5 17h11l.6-6.2A4.2 4.2 0 0 0 15 6.4a3.6 3.6 0 0 0-6 0 4.2 4.2 0 0 0-3.1 4.4z"/><path d="M6.6 13.5h10.8"/>',
    fire:        '<path d="M12 22a6 6 0 0 0 6-6c0-4-3-5.5-3-9 0 0-2.5 1.5-2.5 4.5C12.5 9 11 7 11 4.5 8.5 6 6 9 6 16a6 6 0 0 0 6 6z"/>',
    leaf:        '<path d="M4 20c0-8 5-14 16-15 0 0 1 12-8 14-4 1-8 1-8 1z"/><path d="M4 20c2-4 5-7 9-9"/>',
    qr:          '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M20 14h1"/><path d="M14 20h3"/><path d="M20 17.5v3.5"/>',
    bag:         '<path d="M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/>',
    car:         '<path d="M5 17h14"/><path d="M6.5 17V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2"/><path d="M20.5 17V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2"/><path d="M3 17v-4.2a2 2 0 0 1 .3-1L5.6 8A2 2 0 0 1 7.3 7h9.4a2 2 0 0 1 1.7 1l2.3 3.8a2 2 0 0 1 .3 1V17z"/><path d="M5 12.5h14"/>',

    // people & loyalty
    user:        '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-.5a7 7 0 0 1 14 0v.5"/>',
    users:       '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20v-.5A6.5 6.5 0 0 1 9 13a6.5 6.5 0 0 1 6.5 6.5v.5"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 6"/><path d="M18 13.4a6.5 6.5 0 0 1 3.5 5.8v.8"/>',
    phone:       '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
    smartphone:  '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18.5h2"/>',
    star:        '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    wallet:      '<path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 14h-4a2 2 0 0 1 0-4h4z"/>',
    gift:        '<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9S10.5 5 8.5 5a2.2 2.2 0 0 0 0 4.4"/><path d="M12 9s1.5-4 3.5-4a2.2 2.2 0 0 1 0 4.4"/>',
    trending:    '<path d="M22 7l-8.5 8.5-4-4L2 19"/><path d="M16 7h6v6"/>',

    // status & feedback
    clock:       '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
    bell:        '<path d="M18 9a6 6 0 0 0-12 0c0 7-2.5 8-2.5 8h17S18 16 18 9z"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
    alert:       '<path d="M10.3 4L2.3 18a2 2 0 0 0 1.7 3h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0z"/><path d="M12 9.5V14"/><path d="M12 17.5h.01"/>',
    info:        '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    lock:        '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',

    // money
    card:        '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
    cash:        '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v5"/><path d="M18 9.5v5"/>',
    percent:     '<path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',

    // layout
    grid:        '<rect x="3" y="3" width="7.5" height="7.5" rx="1.4"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.4"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.4"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.4"/>',
    list:        '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/>',
    layers:      '<path d="M12 2.5l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
    mapPin:      '<path d="M12 21.5S5 15.6 5 10a7 7 0 0 1 14 0c0 5.6-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
    building:    '<rect x="4" y="3" width="12" height="18" rx="1"/><path d="M16 9h3a1 1 0 0 1 1 1v11"/><path d="M2 21h20"/><path d="M8 7h1.5"/><path d="M8 11h1.5"/><path d="M8 15h1.5"/>',
    download:    '<path d="M12 3v12"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4 18v1.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V18"/>',
    apple:       '<path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9C6 6.9 4.4 7.9 3.5 9.5c-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3-.05 1.8-.8 3.4-.8s2 .8 3.4.8 2.2-1.2 3.1-2.4a10.6 10.6 0 0 0 1.4-2.9c-.03-.01-2.7-1.05-2.7-4.1z"/><path d="M14.1 5.2A4.3 4.3 0 0 0 15.1 2a4.4 4.4 0 0 0-2.9 1.5 4.1 4.1 0 0 0-1 3.1 3.6 3.6 0 0 0 2.9-1.4z"/>',
    android:     '<path d="M6 10.5h12v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 17.5z"/><path d="M6 10.5a6 6 0 0 1 12 0"/><path d="M8.5 7.5L7 5.2"/><path d="M15.5 7.5L17 5.2"/><path d="M9.5 8.5h.01"/><path d="M14.5 8.5h.01"/><path d="M3.5 11.5v4"/><path d="M20.5 11.5v4"/><path d="M9 19v2"/><path d="M15 19v2"/>'
  };

  window.icon = function (name, size, cls) {
    size = size || 20;
    return '<svg class="ic ' + (cls || '') + '" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  };

  /* Ornamental corner bracket traced from the printed menu's red fretwork. */
  window.bracketSVG = function () {
    return '<svg viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M2 16V2h14"/><path d="M8 24V8h16"/><path d="M2 30v-6"/><path d="M22 2h6"/>' +
      '<rect x="13" y="13" width="6" height="6"/></svg>';
  };
})();
