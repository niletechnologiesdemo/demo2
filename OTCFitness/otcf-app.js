/* ==========================================================================
   Off That Couch Fitness — app screen definitions
   Every screen is a pure function returning markup. Phones share the same
   definitions, so the boards and the interactive device never drift apart.
   ========================================================================== */
(function () {
  const I = window.otcfIcon;

  const DISC = {
    swim:  { c: 'var(--d-swim)',  ic: 'swim',     n: 'Swim' },
    bike:  { c: 'var(--d-bike)',  ic: 'bike',     n: 'Bike' },
    run:   { c: 'var(--d-run)',   ic: 'run',      n: 'Run' },
    str:   { c: 'var(--d-str)',   ic: 'strength', n: 'Strength' },
    brick: { c: 'var(--d-brick)', ic: 'brick',    n: 'Brick' },
    rest:  { c: 'var(--d-rest)',  ic: 'rest',     n: 'Recovery' },
  };
  const tint = (v, p) => 'color-mix(in srgb, ' + v + ' ' + p + '%, transparent)';

  /* ---------- chrome ---------- */
  const sbar = (dark) => `
    <div class="sbar">
      <span>9:41</span>
      <div class="sb-r">
        <div class="sb-sig"><i></i><i></i><i></i><i></i></div>
        ${I('wave', { size: 14, sw: 2 })}
        <div class="sb-bat"></div>
      </div>
    </div>`;

  const TABS = [
    { id: 'today',     ic: 'home',   n: 'Today' },
    { id: 'plans',     ic: 'layers', n: 'Plans' },
    { id: 'coach',     ic: 'spark',  n: 'Coach' },
    { id: 'fuel',      ic: 'apple',  n: 'Fuel' },
    { id: 'me',        ic: 'user',   n: 'Me' },
  ];
  const tabbar = (active) => `
    <div class="tabbar">
      ${TABS.map(t => `
        <button class="tab ${t.id === active ? 'on' : ''}" data-go="${t.id}">
          ${I(t.ic, { size: 21, sw: t.id === active ? 2.1 : 1.7 })}<span>${t.n}</span>
        </button>`).join('')}
    </div>`;

  const nav = (title, back, right) => `
    <div class="navbar">
      <button class="backbtn" data-go="${back}">${I('chevL', { size: 18, sw: 2.2 })}</button>
      <div class="nb-t">${title}</div>
      ${right ? `<div style="margin-left:auto">${right}</div>` : ''}
    </div>`;

  const ring = (pct, big, small, size, color) => {
    size = size || 74; color = color || 'var(--accent)';
    const r = (size - 8) / 2, c = 2 * Math.PI * r;
    return `<div class="ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="6.5"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="6.5"
          stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/>
      </svg>
      <div class="rv"><b>${big}</b><i>${small}</i></div>
    </div>`;
  };

  /* ======================================================================
     1 — WELCOME
     ====================================================================== */
  const welcome = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll" style="display:flex;flex-direction:column">
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 30px;position:relative">
          <div style="position:absolute;top:-40px;right:-70px;width:260px;height:260px;border-radius:50%;background:var(--glow);filter:blur(70px)"></div>
          <div style="position:relative">
            <img src="LogoDark.jpeg" alt="Off That Couch Fitness"
                 style="width:210px;border-radius:12px;display:block;margin-bottom:38px" class="lg-dark">
            <h1 style="font-size:37px;font-weight:820;letter-spacing:-.038em;line-height:1.06;margin:0">
              Your plan.<br>Your data.<br><span style="color:var(--accent)">Your coach.</span>
            </h1>
            <p style="font-size:14.5px;line-height:1.6;color:var(--text-2);margin:18px 0 0;max-width:31ch">
              Training plans, wearable tracking, nutrition and an AI coach that sees all three — in one app.
            </p>
          </div>
        </div>
        <div class="pad" style="padding-bottom:26px">
          <div style="display:flex;gap:9px;margin-bottom:20px">
            ${['run','bike','swim','strength'].map(k => `
              <div style="flex:1;height:46px;border-radius:13px;display:grid;place-items:center;
                          background:var(--surface-2);border:1px solid var(--border);color:var(--text-3)">
                ${I(k === 'strength' ? 'strength' : k, { size: 21 })}
              </div>`).join('')}
          </div>
          <button class="btn btn-p" data-go="goal">Start your journey ${I('chevR', { size: 17, sw: 2.2 })}</button>
          <div style="text-align:center;margin-top:15px;font-size:12.5px;color:var(--text-3)">
            Already training with us? <b style="color:var(--accent)">Sign in</b>
          </div>
        </div>
      </div>
    </div>`;

  /* ======================================================================
     2 — ONBOARDING: GOAL
     ====================================================================== */
  const goal = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Your goal', 'welcome', '<span style="font-size:12px;color:var(--text-3);font-weight:640">Step 4 of 7</span>')}
      <div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i></div>
      <div class="scroll pad pb">
        <h2 style="font-size:25px;font-weight:800;letter-spacing:-.032em;margin:6px 0 6px;line-height:1.14">
          What are you training for?
        </h2>
        <p style="font-size:13.5px;color:var(--text-2);line-height:1.55;margin:0 0 20px">
          This sets your plan length, your phases and how your taper is built.
        </p>

        <div class="opt on" data-go="preview">
          <div class="opt-ic" style="color:var(--d-brick)">${I('trophy', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">A specific event</div>
            <div class="opt-s">Pick your race and we build backwards from the date</div>
          </div>
          <div class="opt-r">${I('check', { size: 13, sw: 3 })}</div>
        </div>

        <div class="opt">
          <div class="opt-ic" style="color:var(--d-run)">${I('target', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">A distance or time goal</div>
            <div class="opt-s">No race booked yet — set a target date</div>
          </div>
          <div class="opt-r"></div>
        </div>

        <div class="opt">
          <div class="opt-ic" style="color:var(--d-swim)">${I('heart', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">General fitness &amp; longevity</div>
            <div class="opt-s">Ongoing health, strength and conditioning</div>
          </div>
          <div class="opt-r"></div>
        </div>

        <div class="sect-t"><h3>Your event</h3><span class="more">Change</span></div>
        <div class="card" style="display:flex;align-items:center;gap:13px;padding:14px">
          <div style="width:46px;height:46px;border-radius:14px;background:${tint('var(--d-brick)', 15)};
                      color:var(--d-brick);display:grid;place-items:center;flex:none">
            ${I('trophy', { size: 22 })}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14.5px;font-weight:730;letter-spacing:-.02em">Ironman 70.3 Staffordshire</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:3px;display:flex;gap:10px;flex-wrap:wrap">
              <span style="display:inline-flex;align-items:center;gap:4px">${I('calendar', { size: 12 })} 7 June</span>
              <span style="display:inline-flex;align-items:center;gap:4px">${I('mapPin', { size: 12 })} Staffordshire</span>
            </div>
          </div>
          <div style="text-align:right;flex:none">
            <div style="font-size:19px;font-weight:800;letter-spacing:-.03em;color:var(--accent)">16</div>
            <div style="font-size:9.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;font-weight:640">weeks</div>
          </div>
        </div>

        <div class="sync" style="margin-top:16px">
          ${I('info', { size: 14 })}
          <span>Swim 1.9km · Bike 90km · Run 21.1km — lake swim, rolling bike course</span>
        </div>

        <button class="btn btn-p" style="margin-top:22px" data-go="preview">
          Build my plan ${I('chevR', { size: 17, sw: 2.2 })}
        </button>
      </div>
    </div>`;

  /* ======================================================================
     3 — PLAN PREVIEW (conversion screen)
     ====================================================================== */
  const preview = () => {
    const wk = [
      { d: 'Mon', s: [['rest', 0]] },
      { d: 'Tue', s: [['bike', 75], ['str', 30]] },
      { d: 'Wed', s: [['swim', 60]] },
      { d: 'Thu', s: [['run', 55]] },
      { d: 'Fri', s: [['swim', 45], ['str', 30]] },
      { d: 'Sat', s: [['bike', 165]] },
      { d: 'Sun', s: [['run', 95], ['brick', 20]] },
    ];
    const max = 185;
    return `
    ${sbar()}
    <div class="appbody">
      ${nav('Your plan', 'goal')}
      <div class="scroll pad pb">
        <div class="hero-sess" style="margin-bottom:18px">
          <div class="hs-in">
            <div class="hs-row">
              <span class="pill free">Built for you</span>
              <span style="margin-left:auto;font-size:11.5px;color:var(--text-2);font-weight:620">16 weeks</span>
            </div>
            <div class="hs-title" style="font-size:23px">Ironman 70.3<br>Intermediate Build</div>
            <div class="hs-sub">Four phases to 7 June, shaped around your 5 available days and 8.5 hours a week.</div>
            <div class="hs-stats">
              <div class="hs-stat"><div class="v">8.5<small style="font-size:12px">h</small></div><div class="l">Avg / week</div></div>
              <div class="hs-stat"><div class="v">5</div><div class="l">Days</div></div>
              <div class="hs-stat"><div class="v">112</div><div class="l">Sessions</div></div>
            </div>
          </div>
        </div>

        <div class="sect-t"><h3>How it progresses</h3></div>
        <div style="display:flex;gap:4px;height:8px;border-radius:99px;overflow:hidden">
          <i style="flex:6;background:var(--d-swim)"></i>
          <i style="flex:5;background:var(--d-run)"></i>
          <i style="flex:3;background:var(--d-bike)"></i>
          <i style="flex:2;background:var(--d-str)"></i>
        </div>
        <div style="display:flex;gap:4px;margin-top:9px">
          ${[['Base', '6 wks', 'var(--d-swim)'], ['Build', '5 wks', 'var(--d-run)'], ['Peak', '3 wks', 'var(--d-bike)'], ['Taper', '2 wks', 'var(--d-str)']]
            .map(([n, w, c], i) => `
            <div style="flex:${[6,5,3,2][i]};min-width:0">
              <div style="font-size:11.5px;font-weight:700;color:${c}">${n}</div>
              <div style="font-size:10.5px;color:var(--text-3);margin-top:1px">${w}</div>
            </div>`).join('')}
        </div>

        <div class="sect-t"><h3>A typical week</h3><span class="more">Week 5</span></div>
        <div class="card">
          <div class="bars">
            ${wk.map(d => `
              <div class="bar-c">
                <div class="bar-st" style="height:${Math.max(4, (d.s.reduce((a, b) => a + b[1], 0) / max) * 100)}%">
                  ${d.s.map(([k, m]) => m ? `<i style="flex:${m};background:${DISC[k].c}"></i>` : '').join('')}
                </div>
                <div class="lb">${d.d}</div>
              </div>`).join('')}
          </div>
          <div class="legend">
            ${['swim', 'bike', 'run', 'str'].map(k => `<span><i style="background:${DISC[k].c}"></i>${DISC[k].n}</span>`).join('')}
          </div>
        </div>

        <div class="sect-t"><h3>What's included</h3></div>
        <div class="crow">
          <div class="crow-ic" style="background:${tint('var(--d-run)', 14)};color:var(--d-run)">${I('calendar', { size: 19 })}</div>
          <div class="crow-b">
            <div class="crow-t">Training Plan</div>
            <div class="crow-s">112 dated sessions with your own zones</div>
          </div>
          <span class="pill free">Week 1 free</span>
        </div>
        <div class="crow">
          <div class="crow-ic" style="background:${tint('var(--d-swim)', 14)};color:var(--d-swim)">${I('pdf', { size: 19 })}</div>
          <div class="crow-b">
            <div class="crow-t">Training Guide</div>
            <div class="crow-s">9 chapters · PDF + audio</div>
          </div>
          <span class="pill pro">Pro</span>
        </div>
        <div class="crow">
          <div class="crow-ic" style="background:${tint('var(--d-bike)', 14)};color:var(--d-bike)">${I('video', { size: 19 })}</div>
          <div class="crow-b">
            <div class="crow-t">Step-by-Step Guides</div>
            <div class="crow-s">34 technique videos from Steve</div>
          </div>
          <span class="pill pro">Pro</span>
        </div>

        <button class="btn btn-p" style="margin-top:20px" data-go="today">
          Start week 1 free ${I('chevR', { size: 17, sw: 2.2 })}
        </button>
        <button class="btn btn-g" style="margin-top:10px" data-go="paywall">See everything in Pro</button>
      </div>
    </div>`;
  };

  /* ======================================================================
     4 — TODAY  (home)
     ====================================================================== */
  const today = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div>
            <div class="ah-s">Tuesday 12 March · Build week 3</div>
            <div class="ah-t">Morning, Jess</div>
          </div>
          <div class="ahead-r">
            <button class="iconbtn">${I('bell', { size: 18 })}</button>
            <button class="iconbtn" data-go="calendar">${I('calendar', { size: 18 })}</button>
          </div>
        </div>

        <div class="pad">
          <div class="wstrip">
            ${[['M', 11, ['rest']], ['T', 12, ['bike', 'str']], ['W', 13, ['swim']], ['T', 14, ['run']],
               ['F', 15, ['swim', 'str']], ['S', 16, ['bike']], ['S', 17, ['run', 'brick']]]
              .map(([d, n, s], i) => `
              <div class="wday ${i === 1 ? 'on' : ''}">
                <div class="d">${d}</div><div class="n">${n}</div>
                <div class="dots">${s.map(k => `<i style="background:${i === 1 ? 'var(--accent-ink)' : DISC[k].c}"></i>`).join('')}</div>
              </div>`).join('')}
          </div>

          <div class="sect-t"><h3>Today's key session</h3></div>
          <div class="hero-sess" data-go="session" style="cursor:pointer">
            <div class="hs-in">
              <div class="hs-row">
                <span class="disc-dot" style="background:var(--d-bike)"></span>
                <span class="hs-kind">Bike · Threshold</span>
                <span style="margin-left:auto">${I('bike', { size: 20, cls: '' })}</span>
              </div>
              <div class="hs-title">5 × 4min<br>@ Threshold</div>
              <div class="hs-sub">The key session of your week. Hold 245–265 W and let the recoveries be genuinely easy.</div>
              <div class="hs-stats">
                <div class="hs-stat"><div class="v">1:15</div><div class="l">Duration</div></div>
                <div class="hs-stat"><div class="v">245<small style="font-size:12px">w</small></div><div class="l">Target</div></div>
                <div class="hs-stat"><div class="v">Z4</div><div class="l">Zone</div></div>
              </div>
              <button class="btn btn-p" style="margin-top:17px" data-go="session">
                ${I('play', { size: 15, fill: 'currentColor' })} View session
              </button>
            </div>
          </div>

          <div style="margin-top:12px">
            <div class="srow" data-go="session">
              <div class="srow-ic" style="color:var(--d-str)">${I('strength', { size: 20 })}</div>
              <div class="srow-b">
                <div class="srow-t">Core &amp; stability</div>
                <div class="srow-s">Supporting · 6 exercises</div>
              </div>
              <div class="srow-r"><div class="v">30min</div><div class="l">Evening</div></div>
            </div>
            <div class="srow done">
              <div class="srow-ic" style="color:var(--accent)">${I('checkCircle', { size: 20 })}</div>
              <div class="srow-b">
                <div class="srow-t">Easy shakeout run</div>
                <div class="srow-s">Auto-logged from Garmin · RPE 3</div>
              </div>
              <div class="srow-r"><div class="v">28min</div><div class="l">6.1 km</div></div>
            </div>
          </div>

          <div class="sect-t"><h3>Today at a glance</h3></div>
          <div class="card" style="display:flex;align-items:center;gap:18px">
            ${ring(64, '64%', 'Week', 78)}
            <div style="flex:1;display:grid;gap:11px">
              ${[['Training', '5.4 / 8.5 h', 64, 'var(--accent)'],
                 ['Fuelling', '1,840 / 2,650 kcal', 69, 'var(--d-bike)'],
                 ['Protein', '96 / 135 g', 71, 'var(--d-str)']].map(([n, v, p, c]) => `
                <div>
                  <div class="macro-h"><b style="font-size:12px">${n}</b><span>${v}</span></div>
                  <div class="track"><i style="width:${p}%;background:${c}"></i></div>
                </div>`).join('')}
            </div>
          </div>

          <div class="tiles" style="margin-top:12px">
            <div class="tile">
              <div class="th">${I('moon', { size: 14 })}<span>Sleep</span></div>
              <div class="tv">7h 24<small>m</small></div>
              <div class="td up">+38m vs your average</div>
            </div>
            <div class="tile">
              <div class="th">${I('heart', { size: 14 })}<span>Resting HR</span></div>
              <div class="tv">48<small> bpm</small></div>
              <div class="td">Steady for 9 days</div>
            </div>
          </div>

          <div class="card" style="margin-top:12px;display:flex;gap:12px;align-items:flex-start;
                      border-color:${tint('var(--accent)', 35)};background:${tint('var(--accent)', 7)}"
               data-go="coach">
            <div style="width:34px;height:34px;border-radius:11px;background:var(--accent);color:var(--accent-ink);
                        display:grid;place-items:center;flex:none">${I('spark', { size: 18 })}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:720;letter-spacing:-.015em">Your coach noticed something</div>
              <div style="font-size:12.5px;color:var(--text-2);line-height:1.5;margin-top:4px">
                Sleep is up and resting HR is stable — you're well placed for today's intervals. Fuel the ride properly.
              </div>
              <div style="font-size:12px;font-weight:680;color:var(--accent);margin-top:8px;display:flex;align-items:center;gap:4px">
                Ask about today ${I('chevR', { size: 13, sw: 2.4 })}
              </div>
            </div>
          </div>

          <div class="sync" style="margin-top:12px">
            <span class="dot-live"></span>${I('watch', { size: 14 })}
            <span>Garmin Forerunner via Apple Health — synced 6 minutes ago</span>
          </div>
        </div>
      </div>
      ${tabbar('today')}
    </div>`;

  /* ======================================================================
     5 — SESSION DETAIL
     ====================================================================== */
  const session = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Tuesday · Bike', 'today', `<button class="iconbtn">${I('sliders', { size: 17 })}</button>`)}
      <div class="scroll pad pb">
        <div class="hs-row" style="margin-bottom:9px">
          <span class="disc-dot" style="background:var(--d-bike)"></span>
          <span class="hs-kind">Threshold intervals · Key session</span>
        </div>
        <h2 style="font-size:26px;font-weight:810;letter-spacing:-.034em;margin:0;line-height:1.1">5 × 4min @ Threshold</h2>
        <div style="display:flex;gap:8px;margin-top:13px">
          ${[[I('clock', { size: 13 }), '1h 15m'], [I('zap', { size: 13 }), 'Zone 4'], [I('chart', { size: 13 }), 'Load 82']]
            .map(([ic, t]) => `<span class="tgt" style="display:inline-flex;align-items:center;gap:5px">${ic}${t}</span>`).join('')}
        </div>

        <div class="card" style="margin-top:16px;background:${tint('var(--accent)', 7)};border-color:${tint('var(--accent)', 30)}">
          <div class="eyebrow" style="color:var(--accent)">Why this session, this week</div>
          <p style="margin:8px 0 0;font-size:13px;line-height:1.6;color:var(--text-2)">
            Third week of Build. We're lifting your threshold before the volume steps up. Five reps is the sweet spot —
            enough to drive adaptation, not so much that Saturday's long ride suffers.
          </p>
        </div>

        <div class="sect-t"><h3>The session</h3><span class="more">Zones</span></div>
        ${[
          { t: '10 min', z: 'Z1', k: 0, n: 'Warm-up', s: 'Easy spin, build cadence to 95 rpm over the last 3 minutes.', g: ['120–150 W', '< 120 bpm'] },
          { t: '3 × 30s', z: 'Z5', k: 0, n: 'Activation', s: 'Fast pedalling, 60 seconds easy between. Wakes the legs up.', g: ['110 rpm+'] },
          { t: '5 × 4min', z: 'Z4', k: 1, n: 'Main set', s: '3 minutes easy spinning between each. Hold power steady — do not start too hard.', g: ['245–265 W', '152–162 bpm', '85–95 rpm'] },
          { t: '8 min', z: 'Z1', k: 0, n: 'Cool-down', s: 'Very easy. Spin the legs out completely before you stop.', g: ['< 130 W'] },
        ].map(s => `
          <div class="wstep ${s.k ? 'key' : ''}">
            <div class="wstep-l"><div class="t">${s.t}</div><div class="z">${s.z}</div></div>
            <div class="wstep-r">
              <div class="wstep-box">
                <div class="wstep-t">${s.n}</div>
                <div class="wstep-s">${s.s}</div>
                <div class="wstep-tg">${s.g.map(g => `<span class="tgt">${g}</span>`).join('')}</div>
              </div>
            </div>
          </div>`).join('')}

        <div class="sect-t"><h3>Before you go</h3></div>
        <div class="crow" data-go="guide">
          <div class="crow-ic" style="background:${tint('var(--d-bike)', 14)};color:var(--d-bike)">${I('video', { size: 19 })}</div>
          <div class="crow-b">
            <div class="crow-t">Pacing threshold intervals</div>
            <div class="crow-s">${I('play', { size: 11, fill: 'currentColor' })} 6:12 · Steve Clark</div>
          </div>
          ${I('chevR', { size: 17, sw: 2.2 })}
        </div>
        <div class="crow">
          <div class="crow-ic" style="background:${tint('var(--d-str)', 14)};color:var(--d-str)">${I('utensils', { size: 19 })}</div>
          <div class="crow-b">
            <div class="crow-t">Fuelling for this session</div>
            <div class="crow-s">40–60g carbs beforehand · 500ml with electrolyte</div>
          </div>
          ${I('chevR', { size: 17, sw: 2.2 })}
        </div>

        <div style="display:flex;gap:9px;margin-top:20px">
          <button class="btn btn-s" style="flex:1" data-go="today">Move</button>
          <button class="btn btn-p" style="flex:2" data-go="today">${I('check', { size: 16, sw: 2.6 })} Mark complete</button>
        </div>
        <div style="text-align:center;margin-top:12px;font-size:11.5px;color:var(--text-3);line-height:1.5">
          Or just ride it — we'll log it automatically when your watch syncs.
        </div>
      </div>
    </div>`;

  /* ======================================================================
     6 — PLAN LIBRARY
     ====================================================================== */
  const PLANS = [
    { t: 'Ironman 70.3 — Intermediate', d: 'bike', w: '16 wks', h: '8–10 h', lv: 'Intermediate', f: ['pdf', 'video', 'audio'], tag: 'Training now', on: 1 },
    { t: 'Sprint Triathlon — Beginner', d: 'swim', w: '10 wks', h: '4–6 h', lv: 'Beginner', f: ['pdf', 'video'], tag: 'Most popular' },
    { t: 'Olympic Distance — Build', d: 'run', w: '12 wks', h: '6–8 h', lv: 'Intermediate', f: ['pdf', 'video', 'audio'] },
    { t: 'Full Ironman — Advanced', d: 'brick', w: '24 wks', h: '12–16 h', lv: 'Advanced', f: ['pdf', 'video', 'audio'] },
    { t: 'Marathon — Sub 4:00', d: 'run', w: '16 wks', h: '5–7 h', lv: 'Intermediate', f: ['pdf', 'video'] },
    { t: 'Open Water Confidence', d: 'swim', w: '8 wks', h: '3–4 h', lv: 'Beginner', f: ['video', 'audio'] },
    { t: 'Wattbike FTP Builder', d: 'bike', w: '8 wks', h: '4–6 h', lv: 'All levels', f: ['pdf', 'video'] },
    { t: 'Aqua Running &amp; Recovery', d: 'swim', w: '6 wks', h: '3 h', lv: 'Rehab', f: ['pdf', 'audio'] },
    { t: 'Strength for Endurance', d: 'str', w: '12 wks', h: '2–3 h', lv: 'All levels', f: ['video'] },
    { t: 'Longevity &amp; General Fitness', d: 'str', w: 'Ongoing', h: '3–5 h', lv: 'All levels', f: ['pdf', 'video', 'audio'] },
  ];
  const FMT = { pdf: ['pdf', 'PDF'], video: ['video', 'Video'], audio: ['audio', 'Audio'] };

  const plans = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div><div class="ah-s">Off That Couch Fitness</div><div class="ah-t">Plan library</div></div>
          <div class="ahead-r"><button class="iconbtn">${I('search', { size: 18 })}</button></div>
        </div>
        <div class="pad">
          <div class="chips" style="margin-bottom:6px">
            <span class="chip on">All</span>
            <span class="chip">Triathlon</span><span class="chip">Running</span>
            <span class="chip">Cycling</span><span class="chip">Swimming</span>
            <span class="chip">Strength</span><span class="chip">Recovery</span>
          </div>

          <div class="sect-t"><h3>Continue</h3></div>
          <div class="hero-sess" data-go="plandetail" style="cursor:pointer;padding:17px">
            <div class="hs-in">
              <div class="hs-row">
                <span class="pill free">Week 3 of 16</span>
                <span style="margin-left:auto;font-size:11.5px;color:var(--text-2);font-weight:620">86 days to race</span>
              </div>
              <div class="hs-title" style="font-size:19px;margin-top:10px">Ironman 70.3 — Intermediate</div>
              <div class="track" style="margin-top:13px;background:rgba(255,255,255,.12)">
                <i style="width:19%;background:var(--accent)"></i>
              </div>
              <div style="display:flex;gap:8px;margin-top:13px">
                ${['pdf', 'video', 'audio'].map(f => `
                  <span class="fmt">${I(FMT[f][0], { size: 13 })}${FMT[f][1]}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="sect-t"><h3>All plans</h3><span class="more">10 plans</span></div>
          <div style="display:grid;gap:12px">
            ${PLANS.slice(1).map(p => `
              <div class="plan" data-go="plandetail">
                <div class="plan-top" style="background:linear-gradient(135deg, ${tint(DISC[p.d].c, 55)}, ${tint(DISC[p.d].c, 12)})">
                  <div class="pt-in">
                    <span style="color:#fff;opacity:.95">${I(DISC[p.d].ic, { size: 21 })}</span>
                    ${p.tag ? `<span class="pill new" style="margin-left:auto;background:rgba(0,0,0,.45);color:#fff">${p.tag}</span>` : ''}
                  </div>
                </div>
                <div class="plan-b">
                  <div class="plan-t">${p.t}</div>
                  <div class="plan-m">
                    <span><b>${p.w}</b></span><span>${p.h} / wk</span><span>${p.lv}</span>
                  </div>
                  <div class="plan-fmt">
                    ${p.f.map(f => `<span class="fmt">${I(FMT[f][0], { size: 12 })}${FMT[f][1]}</span>`).join('')}
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
      ${tabbar('plans')}
    </div>`;

  /* ======================================================================
     7 — PLAN DETAIL  (freemium gating + PDF / video / audio)
     ====================================================================== */
  const plandetail = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Plan', 'plans', `<button class="iconbtn">${I('star', { size: 17 })}</button>`)}
      <div class="scroll pb">
        <div style="height:130px;margin:0 22px;border-radius:var(--r-lg);position:relative;overflow:hidden;
                    background:linear-gradient(135deg, ${tint('var(--d-bike)', 55)}, ${tint('var(--d-swim)', 22)});
                    display:flex;align-items:flex-end;padding:15px">
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.6))"></div>
          <div style="position:relative;z-index:2;color:#fff">
            <div style="font-size:10.5px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;opacity:.9">Triathlon · Intermediate</div>
            <div style="font-size:21px;font-weight:800;letter-spacing:-.03em;margin-top:5px">Ironman 70.3 Build</div>
          </div>
        </div>

        <div class="pad">
          <div class="card" style="margin-top:15px;display:flex;text-align:center;padding:14px 8px">
            ${[['16', 'Weeks'], ['112', 'Sessions'], ['8.5h', 'Per week'], ['43', 'Guides']].map(([v, l], i) => `
              <div style="flex:1;${i ? 'border-left:1px solid var(--border)' : ''}">
                <div style="font-size:17px;font-weight:790;letter-spacing:-.03em">${v}</div>
                <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;font-weight:640;margin-top:2px">${l}</div>
              </div>`).join('')}
          </div>

          <p style="font-size:13.5px;line-height:1.65;color:var(--text-2);margin:16px 0 0">
            Sixteen weeks from base to race day, built on the same progression Steve uses with the OTCF race team.
            Every session comes with the reasoning behind it and a video showing you how to execute it.
          </p>

          <div class="sect-t"><h3>Training Plan</h3><span class="more">112 sessions</span></div>
          <div class="crow">
            <div class="crow-ic" style="background:${tint('var(--d-run)', 14)};color:var(--d-run)">${I('calendar', { size: 19 })}</div>
            <div class="crow-b">
              <div class="crow-t">Week 1 — Base foundation</div>
              <div class="crow-s">7 sessions · 6h 20m</div>
            </div>
            <span class="pill free">Free</span>
          </div>
          <div class="lockover" style="margin-top:8px">
            <div class="lk-blur">
              ${[2, 3, 4].map(w => `
                <div class="crow" style="${w > 2 ? 'margin-top:8px' : ''}">
                  <div class="crow-ic" style="background:${tint('var(--d-run)', 14)};color:var(--d-run)">${I('calendar', { size: 19 })}</div>
                  <div class="crow-b">
                    <div class="crow-t">Week ${w} — Base foundation</div>
                    <div class="crow-s">7 sessions · 6h 45m</div>
                  </div>
                </div>`).join('')}
            </div>
            <div class="lk-face">
              ${I('lock', { size: 20 })}
              <div class="lk-t">Weeks 2–16 in Pro</div>
              <div class="lk-s">109 more sessions to race day</div>
            </div>
          </div>

          <div class="sect-t"><h3>Training Guide</h3><span class="more">9 chapters</span></div>
          <div class="crow" data-go="guide">
            <div class="crow-ic" style="background:${tint('var(--d-swim)', 14)};color:var(--d-swim)">${I('pdf', { size: 19 })}</div>
            <div class="crow-b">
              <div class="crow-t">1 — How this plan is built</div>
              <div class="crow-s">${I('pdf', { size: 11 })} PDF · 14 pages ${I('audio', { size: 11 })} 11 min</div>
            </div>
            <span class="pill free">Free</span>
          </div>
          ${[['2 — Setting your zones', 'PDF · 9 pages', 'audio', '8 min'],
             ['3 — Swim in open water', 'PDF · 17 pages', 'audio', '14 min']].map(([t, s, a, d]) => `
            <div class="crow locked">
              <div class="crow-ic" style="background:${tint('var(--d-swim)', 14)};color:var(--d-swim)">${I('pdf', { size: 19 })}</div>
              <div class="crow-b">
                <div class="crow-t">${t}</div>
                <div class="crow-s">${I('pdf', { size: 11 })} ${s} ${I('audio', { size: 11 })} ${d}</div>
              </div>
              ${I('lock', { size: 17 })}
            </div>`).join('')}

          <div class="sect-t"><h3>Step-by-Step Guides</h3><span class="more">34 videos</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${[['Threshold pacing', '6:12', 'bike', 0], ['Open-water sighting', '4:48', 'swim', 0],
               ['Brick run form', '5:30', 'run', 1], ['T1 transition drill', '3:55', 'brick', 1]].map(([t, d, k, lk]) => `
              <div style="border-radius:var(--r-md);overflow:hidden;border:1px solid var(--border);background:var(--surface-2);${lk ? 'opacity:.55' : ''}"
                   ${lk ? '' : 'data-go="guide"'}>
                <div style="height:66px;position:relative;display:grid;place-items:center;
                            background:linear-gradient(135deg, ${tint(DISC[k].c, 40)}, ${tint(DISC[k].c, 10)})">
                  <div style="width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);
                              display:grid;place-items:center;color:#fff">
                    ${I(lk ? 'lock' : 'play', { size: 13, fill: lk ? 'none' : 'currentColor' })}
                  </div>
                  <span style="position:absolute;bottom:5px;right:6px;font-size:9.5px;font-weight:680;color:#fff;
                               background:rgba(0,0,0,.55);padding:2px 5px;border-radius:4px">${d}</span>
                </div>
                <div style="padding:9px 10px 11px;font-size:12px;font-weight:660;letter-spacing:-.01em;line-height:1.35">${t}</div>
              </div>`).join('')}
          </div>

          <button class="btn btn-p" style="margin-top:20px" data-go="paywall">
            ${I('lock', { size: 15 })} Unlock the full plan
          </button>
        </div>
      </div>
      ${tabbar('plans')}
    </div>`;

  /* ======================================================================
     8 — GUIDE PLAYER  (video + audio + PDF, admin-supplied)
     ====================================================================== */
  const guide = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Step-by-Step', 'plandetail')}
      <div class="scroll pb">
        <div class="pad">
          <div style="border-radius:var(--r-lg);overflow:hidden;position:relative;height:196px;
                      background:linear-gradient(140deg, ${tint('var(--d-bike)', 45)}, #10150F);
                      display:grid;place-items:center">
            <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.16);backdrop-filter:blur(10px);
                        display:grid;place-items:center;color:#fff;border:1.5px solid rgba(255,255,255,.3)">
              ${I('play', { size: 22, fill: 'currentColor' })}
            </div>
            <div style="position:absolute;left:0;right:0;bottom:0;padding:12px 14px;
                        background:linear-gradient(0deg,rgba(0,0,0,.72),transparent)">
              <div class="track" style="background:rgba(255,255,255,.22);height:3.5px"><i style="width:34%;background:var(--g-400)"></i></div>
              <div style="display:flex;justify-content:space-between;margin-top:7px;font-size:10.5px;color:#fff;opacity:.85;font-weight:620">
                <span>2:07</span><span>6:12</span>
              </div>
            </div>
          </div>

          <h2 style="font-size:20px;font-weight:790;letter-spacing:-.028em;margin:16px 0 0;line-height:1.22">
            Pacing threshold intervals
          </h2>
          <div style="display:flex;align-items:center;gap:9px;margin-top:10px">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(150deg,var(--g-400),var(--g-700));
                        display:grid;place-items:center;font-size:11px;font-weight:780;color:#06210C">SC</div>
            <div style="font-size:12.5px;color:var(--text-2);font-weight:620">Steve Clark · British Triathlon L2</div>
          </div>

          <div class="chips" style="margin-top:15px">
            <span class="chip on">${I('video', { size: 12 })} Video</span>
            <span class="chip">${I('audio', { size: 12 })} Audio 6:12</span>
            <span class="chip">${I('pdf', { size: 12 })} PDF notes</span>
          </div>

          <p style="font-size:13.5px;line-height:1.68;color:var(--text-2);margin:17px 0 0">
            The single most common mistake in a threshold set is starting rep one too hard. In this guide Steve walks
            through how to find the right opening pace, what the first two minutes should feel like, and how to read
            the numbers when it starts to hurt.
          </p>

          <div class="sect-t"><h3>In this guide</h3></div>
          ${[['0:00', 'Why threshold work matters'], ['1:24', 'Setting your opening pace'],
             ['3:10', 'Reading power vs feel'], ['4:52', 'Recovering properly between reps']].map(([t, n], i) => `
            <div class="srow" style="${i === 1 ? 'border-color:' + tint('var(--accent)', 45) : ''}">
              <div class="srow-ic" style="width:38px;height:38px;font-family:var(--fm);font-size:11px;font-weight:680;color:var(--text-2)">${t}</div>
              <div class="srow-b"><div class="srow-t" style="font-size:13px">${n}</div></div>
              ${i === 1 ? `<span style="color:var(--accent)">${I('play', { size: 15, fill: 'currentColor' })}</span>` : ''}
            </div>`).join('')}

          <div class="card" style="margin-top:16px;display:flex;gap:11px;align-items:center">
            <div style="width:38px;height:38px;border-radius:12px;background:${tint('var(--d-swim)', 15)};
                        color:var(--d-swim);display:grid;place-items:center;flex:none">${I('pdf', { size: 18 })}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:690">Threshold pacing — notes</div>
              <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">PDF · 4 pages · download for offline</div>
            </div>
            ${I('chevR', { size: 17, sw: 2.2 })}
          </div>
        </div>
      </div>
    </div>`;

  /* ======================================================================
     9 — CALENDAR
     ====================================================================== */
  const calendar = () => {
    const days = [
      { d: 'Mon 11', s: [] },
      { d: 'Tue 12', on: 1, s: [['bike', 'Threshold 5×4', '1:15', 0], ['str', 'Core & stability', '30m', 0]] },
      { d: 'Wed 13', s: [['swim', 'CSS intervals', '1:00', 0]] },
      { d: 'Thu 14', s: [['run', 'Tempo 3×8', '55m', 0]] },
      { d: 'Fri 15', s: [['swim', 'Technique', '45m', 0], ['str', 'Mobility', '30m', 0]] },
      { d: 'Sat 16', s: [['bike', 'Long ride Z2', '2:45', 0]] },
      { d: 'Sun 17', s: [['run', 'Long run', '1:35', 0], ['brick', 'Off-bike 20m', '20m', 0]] },
    ];
    return `
    ${sbar()}
    <div class="appbody">
      ${nav('Your plan', 'today', `<button class="iconbtn">${I('sliders', { size: 17 })}</button>`)}
      <div class="scroll pad pb">
        <div class="card" style="display:flex;align-items:center;gap:15px;background:var(--surface-3)">
          ${ring(19, '19%', 'Plan', 66)}
          <div style="flex:1">
            <div style="font-size:15px;font-weight:750;letter-spacing:-.022em">Build · Week 3 of 16</div>
            <div style="font-size:12.5px;color:var(--text-2);margin-top:4px;line-height:1.45">
              86 days to Ironman 70.3 Staffordshire
            </div>
            <div style="display:flex;gap:5px;margin-top:10px">
              ${[6, 5, 3, 2].map((f, i) => `<i style="flex:${f};height:5px;border-radius:99px;display:block;
                background:${i === 1 ? 'var(--accent)' : 'var(--surface)'}"></i>`).join('')}
            </div>
          </div>
        </div>

        <div class="chips" style="margin-top:14px">
          <span class="chip on">Week</span><span class="chip">Month</span><span class="chip">Phases</span>
        </div>

        <div class="sect-t"><h3>11 – 17 March</h3><span class="more">8h 30m</span></div>
        ${days.map(d => `
          <div style="margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:9px;margin-bottom:7px">
              <span style="font-size:12px;font-weight:720;letter-spacing:-.01em;${d.on ? 'color:var(--accent)' : ''}">${d.d}</span>
              ${d.on ? '<span class="pill free">Today</span>' : ''}
              <span style="margin-left:auto;font-size:11px;color:var(--text-3)">
                ${d.s.length ? d.s.length + (d.s.length > 1 ? ' sessions' : ' session') : 'Rest day'}
              </span>
            </div>
            ${d.s.length ? d.s.map(([k, n, t]) => `
              <div class="srow" data-go="session" style="padding:11px 13px">
                <div class="srow-ic" style="width:36px;height:36px;color:${DISC[k].c};background:${tint(DISC[k].c, 13)}">
                  ${I(DISC[k].ic, { size: 17 })}
                </div>
                <div class="srow-b"><div class="srow-t" style="font-size:13px">${n}</div>
                  <div class="srow-s">${DISC[k].n}</div></div>
                <div class="srow-r"><div class="v" style="font-size:12.5px">${t}</div></div>
              </div>`).join('') : `
              <div class="srow" style="padding:11px 13px;opacity:.5">
                <div class="srow-ic" style="width:36px;height:36px;color:var(--d-rest)">${I('rest', { size: 17 })}</div>
                <div class="srow-b"><div class="srow-t" style="font-size:13px">Full rest</div>
                  <div class="srow-s">Recovery is part of the plan</div></div>
              </div>`}
          </div>`).join('')}
      </div>
      ${tabbar('today')}
    </div>`;
  };

  /* ======================================================================
     10 — AI COACH
     ====================================================================== */
  const coach = () => `
    ${sbar()}
    <div class="appbody">
      <div class="ahead" style="padding-bottom:10px">
        <div style="width:38px;height:38px;border-radius:13px;background:linear-gradient(150deg,var(--g-400),var(--g-600));
                    color:#06210C;display:grid;place-items:center;flex:none">${I('spark', { size: 20 })}</div>
        <div>
          <div class="ah-t" style="font-size:19px">Your Coach</div>
          <div class="ah-s" style="display:flex;align-items:center;gap:5px">
            <span class="dot-live"></span>Sees your training, sleep and fuelling
          </div>
        </div>
      </div>

      <div class="scroll pad" style="padding-top:6px">
        <div class="card" style="background:${tint('var(--accent)', 8)};border-color:${tint('var(--accent)', 30)};margin-bottom:16px">
          <div class="eyebrow" style="color:var(--accent)">Weekly review · Sunday</div>
          <div style="font-size:14.5px;font-weight:730;letter-spacing:-.02em;margin-top:7px">A strong week — 6 of 7 done</div>
          <p style="font-size:12.5px;line-height:1.6;color:var(--text-2);margin:7px 0 0">
            You hit every key session. Protein came in 18% under on the two big days, which is likely why Saturday's
            ride felt harder than the numbers suggest.
          </p>
          <div style="display:flex;gap:7px;margin-top:12px">
            <span class="tgt">Compliance 86%</span><span class="tgt">Load +12%</span><span class="tgt">Sleep 7h 12m</span>
          </div>
        </div>

        <div class="msg a">
          Morning Jess. Sleep's been solid for nine days and your resting HR hasn't moved — you're in good shape for
          today's threshold set.
        </div>
        <div class="msg u">I felt awful on Saturday's long ride though. Should I be worried?</div>
        <div class="msg a">
          Looking at Saturday specifically — you rode 2h 45m but only logged <b>52g of carbohydrate</b> across the whole
          session. For a ride that length you'd want 60–90g per hour.<br><br>
          Your power held fine for the first 90 minutes and then dropped about 8%. That's a fuelling pattern, not a
          fitness one. Nothing to worry about.
        </div>
        <div class="msg a">
          Try 2 gels and a bottle with carb mix this Saturday, starting at 40 minutes. I'd expect a very different
          second half.
        </div>
        <div class="chips" style="margin:16px 0 6px">
          <span class="chip">Why Zone 2 today?</span>
          <span class="chip">Am I eating enough?</span>
          <span class="chip">I'm travelling next week</span>
        </div>
        <div class="msg-note">
          ${I('shield', { size: 13 })} Guidance based on your data — not medical advice.
        </div>
      </div>

      <div class="composer">
        <div class="inp">Ask your coach anything…</div>
        <button class="send-b">${I('send', { size: 18 })}</button>
      </div>
      ${tabbar('coach')}
    </div>`;

  /* ======================================================================
     11 — NUTRITION
     ====================================================================== */
  const fuel = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div><div class="ah-s">Tuesday · Threshold day</div><div class="ah-t">Fuel</div></div>
          <div class="ahead-r"><button class="iconbtn" data-go="scan">${I('camera', { size: 18 })}</button></div>
        </div>
        <div class="pad">
          <div class="card" style="background:var(--surface-3)">
            <div style="display:flex;align-items:center;gap:18px">
              ${ring(69, '1,840', 'of 2,650', 92, 'var(--d-bike)')}
              <div style="flex:1">
                <div style="font-size:12px;font-weight:700;letter-spacing:-.01em">810 kcal left</div>
                <div style="font-size:11.5px;color:var(--text-3);line-height:1.45;margin-top:3px">
                  Target raised 320 kcal for today's threshold session
                </div>
                <div style="display:inline-flex;align-items:center;gap:5px;margin-top:9px;font-size:10.5px;font-weight:680;
                            color:var(--d-bike);background:${tint('var(--d-bike)', 14)};padding:4px 9px;border-radius:7px">
                  ${I('zap', { size: 11 })} Training-adjusted
                </div>
              </div>
            </div>
            <div class="divider" style="margin:15px 0"></div>
            ${[['Protein', 96, 135, 'g', 'var(--d-str)'], ['Carbs', 214, 330, 'g', 'var(--d-bike)'], ['Fat', 58, 78, 'g', 'var(--d-swim)']]
              .map(([n, v, t, u, c]) => `
              <div class="macro">
                <div class="macro-h"><b>${n}</b><span>${v} / ${t}${u}</span></div>
                <div class="track"><i style="width:${(v / t) * 100}%;background:${c}"></i></div>
              </div>`).join('')}
          </div>

          <div style="display:flex;gap:9px;margin-top:13px">
            <button class="btn btn-p" style="flex:2" data-go="scan">${I('camera', { size: 16 })} Snap a meal</button>
            <button class="btn btn-s" style="flex:1">${I('plus', { size: 16, sw: 2.4 })} Manual</button>
          </div>

          <div class="card" style="margin-top:13px;display:flex;gap:11px;align-items:center;
                      border-color:${tint('var(--accent)', 32)};background:${tint('var(--accent)', 7)}">
            <div style="width:34px;height:34px;border-radius:11px;background:var(--accent);color:var(--accent-ink);
                        display:grid;place-items:center;flex:none">${I('clock', { size: 17 })}</div>
            <div style="flex:1">
              <div style="font-size:12.5px;font-weight:710">Recovery window open</div>
              <div style="font-size:11.5px;color:var(--text-2);margin-top:2px">
                25–30g protein in the next 45 minutes
              </div>
            </div>
          </div>

          <div class="sect-t"><h3>Today</h3><span class="more">4 meals</span></div>
          <div class="card" style="padding:4px 15px">
            ${[['Porridge, banana, honey', 'Breakfast · 07:10', '412', 'var(--d-bike)', 'utensils'],
               ['Whey &amp; oat shake', 'Post-session · 09:30', '286', 'var(--d-str)', 'droplet'],
               ['Chicken salad, sourdough', 'Lunch · 13:05', '648', 'var(--d-run)', 'utensils'],
               ['Greek yoghurt, berries', 'Snack · 16:20', '194', 'var(--d-swim)', 'apple']].map(([t, s, k, c, ic]) => `
              <div class="meal">
                <div class="meal-th" style="background:${tint(c, 15)};color:${c}">${I(ic, { size: 19 })}</div>
                <div class="meal-b"><div class="meal-t">${t}</div><div class="meal-s">${s}</div></div>
                <div class="meal-k">${k}</div>
              </div>`).join('')}
          </div>

          <div class="sect-t"><h3>Fuelling this session</h3></div>
          <div class="card">
            ${[['Before', '40–60g carbs, 90 min out', 'var(--d-bike)'],
               ['During', '500ml with electrolyte', 'var(--d-swim)'],
               ['After', '25–30g protein + carbs', 'var(--d-str)']].map(([w, t, c], i) => `
              <div style="display:flex;gap:12px;align-items:center;${i ? 'margin-top:12px' : ''}">
                <div style="width:52px;font-size:10.5px;font-weight:730;letter-spacing:.07em;text-transform:uppercase;color:${c}">${w}</div>
                <div style="flex:1;font-size:12.5px;color:var(--text-2)">${t}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
      ${tabbar('fuel')}
    </div>`;

  /* ======================================================================
     12 — PHOTO MEAL SCAN  (confirm & edit — never auto-saves)
     ====================================================================== */
  const scan = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Check your meal', 'fuel')}
      <div class="scroll pad pb">
        <div class="scanbox">
          <div class="scan-frame"></div>
          <div style="text-align:center;color:#CDE8D2;position:relative">
            ${I('utensils', { size: 34 })}
            <div style="font-size:11.5px;font-weight:640;margin-top:8px;opacity:.85">Photo analysed</div>
          </div>
          <span class="scan-lbl">${I('camera', { size: 11 })} 13:05 · Lunch</span>
        </div>

        <div class="card" style="margin-top:13px;display:flex;gap:11px;align-items:flex-start;
                    border-color:${tint('var(--warn)', 35)};background:${tint('var(--warn)', 7)}">
          ${I('info', { size: 17, cls: '' })}
          <div style="font-size:12px;line-height:1.55;color:var(--text-2)">
            <b style="color:var(--text)">These are estimates.</b> Check the portions and change anything that looks
            off before you save — your coach uses these numbers.
          </div>
        </div>

        <div class="sect-t"><h3>We found</h3><span class="more">Add item</span></div>
        ${[['Grilled chicken breast', '~140 g', '44g protein · 231 kcal', 'hi', 'High'],
           ['Mixed leaf salad', '~90 g', '2g protein · 28 kcal', 'hi', 'High'],
           ['Sourdough slice', '~55 g', '5g protein · 148 kcal', 'md', 'Medium'],
           ['Olive oil dressing', '~15 ml', '0g protein · 119 kcal', 'md', 'Medium']].map(([n, q, m, c, cl]) => `
          <div class="detected">
            <div style="width:36px;height:36px;border-radius:11px;background:var(--surface-3);display:grid;place-items:center;
                        color:var(--text-3);flex:none">${I('utensils', { size: 16 })}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:670;letter-spacing:-.012em">${n}</div>
              <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">${q} · ${m}</div>
            </div>
            <span class="conf ${c}">${cl}</span>
          </div>`).join('')}

        <div class="card" style="margin-top:14px">
          <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:12px">
            <b style="font-size:13.5px;font-weight:730">Meal total</b>
            <span style="margin-left:auto;font-size:19px;font-weight:800;letter-spacing:-.03em">526<small style="font-size:12px;color:var(--text-3);font-weight:600"> kcal</small></span>
          </div>
          <div style="display:flex;gap:7px">
            ${[['Protein', '51g', 'var(--d-str)'], ['Carbs', '34g', 'var(--d-bike)'], ['Fat', '24g', 'var(--d-swim)']].map(([n, v, c]) => `
              <div style="flex:1;background:var(--surface-3);border-radius:11px;padding:10px 11px">
                <div style="font-size:10px;color:var(--text-3);font-weight:640;text-transform:uppercase;letter-spacing:.06em">${n}</div>
                <div style="font-size:15px;font-weight:770;letter-spacing:-.025em;margin-top:3px;color:${c}">${v}</div>
              </div>`).join('')}
          </div>
        </div>

        <div style="display:flex;gap:9px;margin-top:18px">
          <button class="btn btn-s" style="flex:1" data-go="fuel">Edit</button>
          <button class="btn btn-p" style="flex:2" data-go="fuel">${I('check', { size: 16, sw: 2.6 })} Save to today</button>
        </div>
      </div>
    </div>`;

  /* ======================================================================
     13 — ANALYTICS  (the combined view)
     ====================================================================== */
  const analytics = () => {
    const wks = [
      { l: 'W1', s: [['swim', 22], ['bike', 38], ['run', 26], ['str', 12]] },
      { l: 'W2', s: [['swim', 26], ['bike', 44], ['run', 30], ['str', 12]] },
      { l: 'W3', s: [['swim', 24], ['bike', 52], ['run', 28], ['str', 10]] },
      { l: 'W4', s: [['swim', 18], ['bike', 30], ['run', 22], ['str', 8]] },
      { l: 'W5', s: [['swim', 30], ['bike', 58], ['run', 34], ['str', 14]] },
      { l: 'W6', s: [['swim', 32], ['bike', 64], ['run', 36], ['str', 14]] },
    ];
    const mx = 150;
    return `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div><div class="ah-s">Last 6 weeks</div><div class="ah-t">Progress</div></div>
          <div class="ahead-r"><button class="iconbtn">${I('sliders', { size: 18 })}</button></div>
        </div>
        <div class="pad">
          <div class="chips" style="margin-bottom:4px">
            <span class="chip on">Combined</span><span class="chip">Training</span>
            <span class="chip">Health</span><span class="chip">Nutrition</span>
          </div>

          <div class="sect-t"><h3>Training volume</h3><span class="more">by discipline</span></div>
          <div class="card">
            <div class="bars" style="height:124px">
              ${wks.map(w => `
                <div class="bar-c">
                  <div class="bar-st" style="height:${(w.s.reduce((a, b) => a + b[1], 0) / mx) * 100}%">
                    ${w.s.map(([k, v]) => `<i style="flex:${v};background:${DISC[k].c}"></i>`).join('')}
                  </div>
                  <div class="lb">${w.l}</div>
                </div>`).join('')}
            </div>
            <div class="legend">
              ${['swim', 'bike', 'run', 'str'].map(k => `<span><i style="background:${DISC[k].c}"></i>${DISC[k].n}</span>`).join('')}
            </div>
          </div>

          <div class="tiles" style="margin-top:12px">
            <div class="tile">
              <div class="th">${I('checkCircle', { size: 14 })}<span>Compliance</span></div>
              <div class="tv">86<small>%</small></div>
              <div class="td up">${I('arrowUp', { size: 10, sw: 2.6 })} 4 pts on last block</div>
            </div>
            <div class="tile">
              <div class="th">${I('chart', { size: 14 })}<span>OTC Load</span></div>
              <div class="tv">412</div>
              <div class="td up">Building steadily</div>
            </div>
          </div>

          <div class="sect-t"><h3>Load &amp; recovery</h3></div>
          <div class="card">
            <div style="position:relative;height:104px;margin-bottom:8px">
              <svg viewBox="0 0 320 104" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible">
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent)" stop-opacity=".28"/>
                    <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,74 L53,66 L107,58 L160,72 L213,44 L267,34 L320,26 L320,104 L0,104 Z" fill="url(#lg)"/>
                <path d="M0,74 L53,66 L107,58 L160,72 L213,44 L267,34 L320,26"
                      fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M0,84 L53,80 L107,74 L160,76 L213,64 L267,55 L320,47"
                      fill="none" stroke="var(--text-3)" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
                <circle cx="320" cy="26" r="4.5" fill="var(--accent)"/>
              </svg>
            </div>
            <div class="legend" style="margin-top:0">
              <span><i style="background:var(--accent)"></i>7-day load</span>
              <span><i style="background:var(--text-3)"></i>28-day load</span>
            </div>
            <p style="font-size:12px;line-height:1.55;color:var(--text-2);margin:12px 0 0">
              Your 7-day load is running above your 28-day for the third week — that's a build block working as intended.
            </p>
          </div>

          <div class="sect-t"><h3>How it fits together</h3></div>
          <div class="card" style="border-color:${tint('var(--accent)', 30)};background:${tint('var(--accent)', 6)}">
            <div style="display:flex;align-items:center;gap:9px">
              <span style="color:var(--accent)">${I('spark', { size: 17 })}</span>
              <b style="font-size:13px;font-weight:730;letter-spacing:-.015em">Fuelling vs training load</b>
            </div>
            <div style="display:flex;align-items:flex-end;gap:6px;height:72px;margin-top:14px">
              ${[[58, 62], [66, 68], [74, 60], [42, 70], [82, 58], [88, 55]].map(([load, fuel]) => `
                <div style="flex:1;display:flex;gap:2.5px;align-items:flex-end;height:100%">
                  <div style="flex:1;height:${load}%;background:var(--accent);border-radius:3px 3px 0 0"></div>
                  <div style="flex:1;height:${fuel}%;background:${tint('var(--d-bike)', 70)};border-radius:3px 3px 0 0"></div>
                </div>`).join('')}
            </div>
            <div class="legend">
              <span><i style="background:var(--accent)"></i>Load</span>
              <span><i style="background:${tint('var(--d-bike)', 70)}"></i>Carb intake</span>
            </div>
            <p style="font-size:12px;line-height:1.58;color:var(--text-2);margin:12px 0 0">
              Load has climbed 34% over six weeks. Carbohydrate intake has fallen 11%. That gap is the single
              biggest thing to fix in the next block.
            </p>
          </div>

          <div class="tiles" style="margin-top:12px">
            <div class="tile">
              <div class="th">${I('moon', { size: 14 })}<span>Avg sleep</span></div>
              <div class="tv">7h 12<small>m</small></div>
              <div class="td up">+22m this block</div>
            </div>
            <div class="tile">
              <div class="th">${I('trend', { size: 14 })}<span>Weight</span></div>
              <div class="tv">68.4<small> kg</small></div>
              <div class="td">−0.9 kg in 6 weeks</div>
            </div>
          </div>
        </div>
      </div>
      ${tabbar('me')}
    </div>`;
  };

  /* ======================================================================
     14 — PAYWALL
     ====================================================================== */
  const paywall = () => `
    ${sbar()}
    <div class="appbody">
      <div class="navbar" style="padding-top:4px">
        <button class="backbtn" data-go="plandetail">${I('x', { size: 17, sw: 2.3 })}</button>
        <div style="margin-left:auto;font-size:12.5px;font-weight:650;color:var(--text-3)">Restore</div>
      </div>
      <div class="scroll pad pb">
        <div class="pw-hero">
          <div class="pw-badge">${I('zap', { size: 28, fill: 'currentColor' })}</div>
          <div class="pw-t">Everything Steve<br>coaches, in your pocket</div>
          <div class="pw-s">Your full plan, every guide, unlimited coaching and the whole nutrition module.</div>
        </div>

        <div class="card" style="margin-top:20px;padding:6px 16px">
          ${[['Your complete plan', 'All 16 weeks, rebuilt whenever life changes'],
             ['43 guides — PDF, video &amp; audio', 'Steve talking you through every session type'],
             ['Unlimited AI coaching', 'Grounded in your training, sleep and fuelling'],
             ['Full nutrition tracking', 'Photo logging, macros, training-aware targets'],
             ['Combined analytics', 'The picture no single app gives you']].map(([t, s]) => `
            <div class="pw-feat">
              <div class="fi">${I('check', { size: 12, sw: 3.2 })}</div>
              <div class="ft"><b>${t}</b><br><span style="color:var(--text-3);font-size:12px">${s}</span></div>
            </div>`).join('')}
        </div>

        <div style="margin-top:20px">
          <div class="pw-opt on">
            <span class="pw-save">2 months free</span>
            <div style="flex:1">
              <div class="po-t">Annual</div>
              <div class="po-s">£7.42 / month, billed yearly</div>
            </div>
            <div class="po-p"><b>£89</b><i>per year</i></div>
          </div>
          <div class="pw-opt">
            <div style="flex:1">
              <div class="po-t">Monthly</div>
              <div class="po-s">Cancel any time</div>
            </div>
            <div class="po-p"><b>£8.99</b><i>per month</i></div>
          </div>
        </div>

        <button class="btn btn-p" style="margin-top:18px" data-go="today">Start 7-day free trial</button>
        <div style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-3);line-height:1.55">
          Free for 7 days, then £89/year. Cancel any time in Settings.
        </div>
        <div class="msg-note" style="padding-top:16px">
          ${I('shield', { size: 13 })} Your health data stays yours. Never sold, never used for ads.
        </div>
      </div>
    </div>`;

  /* ======================================================================
     15 — PROFILE
     ====================================================================== */
  const me = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead"><div><div class="ah-t">You</div></div>
          <div class="ahead-r"><button class="iconbtn">${I('settings', { size: 18 })}</button></div>
        </div>
        <div class="pad">
          <div class="prof-h">
            <div class="avatar">JW</div>
            <div style="flex:1">
              <div style="font-size:19px;font-weight:780;letter-spacing:-.028em">Jess Whitmore</div>
              <div style="font-size:12.5px;color:var(--text-3);margin-top:3px">Intermediate · 3rd season</div>
              <div style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:10.5px;font-weight:700;
                          color:var(--accent);background:${tint('var(--accent)', 14)};padding:4px 9px;border-radius:7px">
                ${I('zap', { size: 11 })} PRO · Annual
              </div>
            </div>
          </div>

          <div class="tiles" style="margin-top:18px">
            <div class="tile">
              <div class="th">${I('flame', { size: 14 })}<span>Streak</span></div>
              <div class="tv">23<small> days</small></div>
            </div>
            <div class="tile">
              <div class="th">${I('trophy', { size: 14 })}<span>Sessions</span></div>
              <div class="tv">184</div>
            </div>
          </div>

          <div class="sect-t"><h3>Your numbers</h3><span class="more">Update</span></div>
          <div class="card" style="padding:4px 16px">
            ${[['Bike FTP', '268 W', 'Wattbike test · 4 Mar'],
               ['Run threshold', '4:42 /km', 'Field test · 18 Feb'],
               ['Swim CSS', '1:48 /100m', '400m TT · 22 Feb'],
               ['Max HR', '186 bpm', 'From training data']].map(([n, v, s]) => `
              <div class="srow-nav">
                <div class="n">${n}<div style="font-size:11px;color:var(--text-3);font-weight:500;margin-top:2px">${s}</div></div>
                <div class="v" style="font-size:14px;font-weight:730;color:var(--text)">${v}</div>
              </div>`).join('')}
          </div>

          <div class="sect-t"><h3>Data sources</h3></div>
          <div class="card" style="padding:4px 16px">
            ${[['Apple Health', 'Connected · 6 min ago', 1],
               ['Garmin Forerunner 265', 'Via Apple Health', 1],
               ['Health Connect', 'Android only', 0]].map(([n, s, on]) => `
              <div class="srow-nav">
                <div style="width:34px;height:34px;border-radius:11px;display:grid;place-items:center;flex:none;
                            background:${on ? tint('var(--accent)', 14) : 'var(--surface-3)'};
                            color:${on ? 'var(--accent)' : 'var(--text-3)'}">${I('watch', { size: 17 })}</div>
                <div class="n">${n}<div style="font-size:11px;color:var(--text-3);font-weight:500;margin-top:2px">${s}</div></div>
                ${on ? `<span style="color:var(--accent)">${I('checkCircle', { size: 18 })}</span>` : `<span class="chip" style="padding:5px 10px">Connect</span>`}
              </div>`).join('')}
          </div>

          <div class="sect-t"><h3>More</h3></div>
          <div class="card" style="padding:4px 16px">
            ${[['chart', 'Progress &amp; analytics', 'analytics'], ['bell', 'Notifications', ''],
               ['shield', 'Privacy &amp; your data', ''], ['book', 'Help &amp; FAQ', '']].map(([ic, n, go]) => `
              <div class="srow-nav" ${go ? `data-go="${go}"` : ''}>
                <span style="color:var(--text-3)">${I(ic, { size: 18 })}</span>
                <div class="n">${n}</div>
                ${I('chevR', { size: 16, sw: 2.2 })}
              </div>`).join('')}
          </div>
        </div>
      </div>
      ${tabbar('me')}
    </div>`;

  /* ---------- registry ---------- */
  window.OTCF_SCREENS = {
    welcome:    { fn: welcome,    k: '01', t: 'Welcome',            d: 'Brand-forward entry. Logo, the promise in three lines, four disciplines, one clear action.' },
    goal:       { fn: goal,       k: '02', t: 'Goal & event',       d: 'Step 4 of 7. Event choice locks the race date, which drives every phase length downstream.' },
    preview:    { fn: preview,    k: '03', t: 'Plan preview',       d: 'The conversion screen. Shows the real plan shape before asking for anything.' },
    today:      { fn: today,      k: '04', t: 'Today',              d: 'The home screen and the daily habit. Session, fuelling and readiness in one glance.' },
    session:    { fn: session,    k: '05', t: 'Session detail',     d: 'Structured steps in the athlete\'s own zones, with the reasoning and the guide attached.' },
    calendar:   { fn: calendar,   k: '06', t: 'Plan calendar',      d: 'Week view with phase progress. Rest days shown as deliberate, not empty.' },
    plans:      { fn: plans,      k: '07', t: 'Plan library',       d: 'Every activity from the OTCF site. Format badges show PDF, video and audio up front.' },
    plandetail: { fn: plandetail, k: '08', t: 'Plan detail',        d: 'Freemium gating in the open — week 1 free, the rest visible but blurred behind Pro.' },
    guide:      { fn: guide,      k: '09', t: 'Guide player',       d: 'One guide, three formats. Everything here comes from the admin console.' },
    coach:      { fn: coach,      k: '10', t: 'AI Coach',           d: 'Grounded answers that cross training, sleep and fuelling. Disclaimer always present.' },
    fuel:       { fn: fuel,       k: '11', t: 'Nutrition',          d: 'Targets that move with the day\'s training load — the bridge no single-category app has.' },
    scan:       { fn: scan,       k: '12', t: 'Photo meal log',     d: 'AI estimates with confidence bands and a mandatory confirm step. Never auto-saves.' },
    analytics:  { fn: analytics,  k: '13', t: 'Analytics',          d: 'Training, health and nutrition on one surface, including load versus fuelling.' },
    paywall:    { fn: paywall,    k: '14', t: 'Paywall',            d: 'Reached after value is felt. Annual default, trial terms stated plainly.' },
    me:         { fn: me,         k: '15', t: 'Profile',            d: 'Baseline numbers Steve can push from a real Wattbike or lactate test.' },
  };
})();
