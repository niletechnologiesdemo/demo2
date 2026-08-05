/* ==========================================================================
   Off That Couch Fitness — OPTION 1 screen definitions
   Content-library model: the athlete picks a plan from the library and reads /
   watches / listens to it. No generated schedule, no dated sessions, no
   completion tracking. Wearable data, nutrition and the AI Coach are unchanged.
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

  const sbar = () => `
    <div class="sbar">
      <span>9:41</span>
      <div class="sb-r">
        <div class="sb-sig"><i></i><i></i><i></i><i></i></div>
        ${I('wave', { size: 14, sw: 2 })}
        <div class="sb-bat"></div>
      </div>
    </div>`;

  const TABS = [
    { id: 'home',  ic: 'home',   n: 'Home' },
    { id: 'plans', ic: 'book',   n: 'Library' },
    { id: 'coach', ic: 'spark',  n: 'Coach' },
    { id: 'fuel',  ic: 'apple',  n: 'Fuel' },
    { id: 'me',    ic: 'user',   n: 'Me' },
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
     01 — WELCOME
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
              Learn it.<br>Track it.<br><span style="color:var(--accent)">Fuel it.</span>
            </h1>
            <p style="font-size:14.5px;line-height:1.6;color:var(--text-2);margin:18px 0 0;max-width:31ch">
              Steve's training library, your wearable data and your nutrition — with an AI coach that reads all three.
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
          <button class="btn btn-p" data-go="setup">Get started ${I('chevR', { size: 17, sw: 2.2 })}</button>
          <div style="text-align:center;margin-top:15px;font-size:12.5px;color:var(--text-3)">
            Already training with us? <b style="color:var(--accent)">Sign in</b>
          </div>
        </div>
      </div>
    </div>`;

  /* ======================================================================
     02 — SETUP  (short — no availability, no plan generation)
     ====================================================================== */
  const setup = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('About you', 'welcome', '<span style="font-size:12px;color:var(--text-3);font-weight:640">Step 3 of 4</span>')}
      <div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
      <div class="scroll pad pb">
        <h2 style="font-size:25px;font-weight:800;letter-spacing:-.032em;margin:6px 0 6px;line-height:1.14">
          What are you working on?
        </h2>
        <p style="font-size:13.5px;color:var(--text-2);line-height:1.55;margin:0 0 20px">
          We'll use this to surface the right content and to give your coach context. You can change it any time.
        </p>

        <div class="opt on">
          <div class="opt-ic" style="color:var(--d-brick)">${I('trophy', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">Triathlon</div>
            <div class="opt-s">Sprint through to full distance</div>
          </div>
          <div class="opt-r">${I('check', { size: 13, sw: 3 })}</div>
        </div>
        <div class="opt">
          <div class="opt-ic" style="color:var(--d-run)">${I('run', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">Running</div>
            <div class="opt-s">5K to marathon</div>
          </div>
          <div class="opt-r"></div>
        </div>
        <div class="opt">
          <div class="opt-ic" style="color:var(--d-swim)">${I('heart', { size: 22 })}</div>
          <div class="opt-b">
            <div class="opt-t">General fitness</div>
            <div class="opt-s">Health, strength and longevity</div>
          </div>
          <div class="opt-r"></div>
        </div>

        <div class="sect-t"><h3>Connect your data</h3></div>
        <div class="card" style="display:flex;align-items:center;gap:13px;padding:14px">
          <div style="width:44px;height:44px;border-radius:13px;background:${tint('var(--accent)', 14)};
                      color:var(--accent);display:grid;place-items:center;flex:none">${I('watch', { size: 21 })}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:710">Apple Health</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Workouts, heart rate, sleep, steps</div>
          </div>
          <span class="chip" style="padding:6px 12px">Connect</span>
        </div>
        <div class="sync" style="margin-top:11px">
          ${I('info', { size: 14 })}
          <span>Works with Garmin, Apple Watch, Coros, Polar, Whoop, Fitbit and more</span>
        </div>

        <button class="btn btn-p" style="margin-top:22px" data-go="plans">
          Browse the library ${I('chevR', { size: 17, sw: 2.2 })}
        </button>
        <button class="btn btn-g" style="margin-top:10px" data-go="home">Skip for now</button>
      </div>
    </div>`;

  /* ======================================================================
     03 — HOME  (activity dashboard, NOT a session dispatcher)
     ====================================================================== */
  const home = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div>
            <div class="ah-s">Tuesday 12 March</div>
            <div class="ah-t">Morning, Jess</div>
          </div>
          <div class="ahead-r"><button class="iconbtn">${I('bell', { size: 18 })}</button></div>
        </div>

        <div class="pad">
          <div class="sect-t" style="margin-top:6px"><h3>Today's activity</h3>
            <span class="more" style="display:inline-flex;align-items:center;gap:5px">
              <span class="dot-live"></span>Live</span></div>
          <div class="hero-sess">
            <div class="hs-in">
              <div class="hs-row">
                <span class="disc-dot" style="background:var(--d-bike)"></span>
                <span class="hs-kind">Recorded on your Garmin</span>
                <span style="margin-left:auto">${I('bike', { size: 20 })}</span>
              </div>
              <div class="hs-title">Morning ride</div>
              <div class="hs-sub">Picked up automatically from Apple Health — nothing to log.</div>
              <div class="hs-stats">
                <div class="hs-stat"><div class="v">1:12</div><div class="l">Duration</div></div>
                <div class="hs-stat"><div class="v">34.2<small style="font-size:12px">km</small></div><div class="l">Distance</div></div>
                <div class="hs-stat"><div class="v">238<small style="font-size:12px">w</small></div><div class="l">Avg power</div></div>
              </div>
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
            <div class="tile">
              <div class="th">${I('flame', { size: 14 })}<span>Active energy</span></div>
              <div class="tv">812<small> kcal</small></div>
              <div class="td">Across 2 activities</div>
            </div>
            <div class="tile">
              <div class="th">${I('trend', { size: 14 })}<span>Steps</span></div>
              <div class="tv">9,140</div>
              <div class="td up">On track for today</div>
            </div>
          </div>

          <div class="sect-t"><h3>Continue learning</h3><span class="more">Library</span></div>
          <div class="card" data-go="plandetail" style="cursor:pointer;padding:15px">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:44px;height:44px;border-radius:13px;background:${tint('var(--d-bike)', 15)};
                          color:var(--d-bike);display:grid;place-items:center;flex:none">${I('video', { size: 21 })}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:10.5px;font-weight:740;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3)">Ironman 70.3 Guide</div>
                <div style="font-size:14px;font-weight:710;letter-spacing:-.018em;margin-top:3px">Module 3 — Building your bike base</div>
              </div>
            </div>
            <div class="track" style="margin-top:13px"><i style="width:38%;background:var(--accent)"></i></div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11.5px;color:var(--text-3)">
              <span>5 of 13 modules complete</span><span>38%</span>
            </div>
          </div>

          <div class="sect-t"><h3>Fuel today</h3><span class="more">Log a meal</span></div>
          <div class="card" style="display:flex;align-items:center;gap:16px">
            ${ring(69, '1,840', 'of 2,650', 84, 'var(--d-bike)')}
            <div style="flex:1;display:grid;gap:10px">
              ${[['Protein', 96, 135, 'var(--d-str)'], ['Carbs', 214, 330, 'var(--d-bike)'], ['Fat', 58, 78, 'var(--d-swim)']]
                .map(([n, v, t, c]) => `
                <div>
                  <div class="macro-h"><b style="font-size:12px">${n}</b><span>${v} / ${t}g</span></div>
                  <div class="track"><i style="width:${(v / t) * 100}%;background:${c}"></i></div>
                </div>`).join('')}
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
                That was your third ride above 230 W this week and your carbs are running low. Worth a look before Saturday.
              </div>
              <div style="font-size:12px;font-weight:680;color:var(--accent);margin-top:8px;display:flex;align-items:center;gap:4px">
                Ask your coach ${I('chevR', { size: 13, sw: 2.4 })}
              </div>
            </div>
          </div>

          <div class="sync" style="margin-top:12px">
            <span class="dot-live"></span>${I('watch', { size: 14 })}
            <span>Garmin Forerunner via Apple Health — synced 6 minutes ago</span>
          </div>
        </div>
      </div>
      ${tabbar('home')}
    </div>`;

  /* ======================================================================
     04 — LIBRARY
     ====================================================================== */
  const PLANS = [
    { t: 'Sprint Triathlon — Beginner', d: 'swim', m: '9 modules', h: '2h 40m', lv: 'Beginner', f: ['pdf', 'video'], tag: 'Most popular' },
    { t: 'Olympic Distance — Build', d: 'run', m: '11 modules', h: '3h 15m', lv: 'Intermediate', f: ['pdf', 'video', 'audio'] },
    { t: 'Full Ironman — Advanced', d: 'brick', m: '18 modules', h: '5h 50m', lv: 'Advanced', f: ['pdf', 'video', 'audio'] },
    { t: 'Marathon — Sub 4:00', d: 'run', m: '12 modules', h: '3h 40m', lv: 'Intermediate', f: ['pdf', 'video'] },
    { t: 'Open Water Confidence', d: 'swim', m: '7 modules', h: '1h 55m', lv: 'Beginner', f: ['video', 'audio'] },
    { t: 'Wattbike FTP Builder', d: 'bike', m: '8 modules', h: '2h 10m', lv: 'All levels', f: ['pdf', 'video'] },
    { t: 'Aqua Running &amp; Recovery', d: 'swim', m: '6 modules', h: '1h 30m', lv: 'Rehab', f: ['pdf', 'audio'] },
    { t: 'Strength for Endurance', d: 'str', m: '10 modules', h: '2h 25m', lv: 'All levels', f: ['video'] },
    { t: 'Longevity &amp; General Fitness', d: 'str', m: '14 modules', h: '4h 05m', lv: 'All levels', f: ['pdf', 'video', 'audio'] },
  ];
  const FMT = { pdf: ['pdf', 'PDF'], video: ['video', 'Video'], audio: ['audio', 'Audio'] };

  const plans = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div><div class="ah-s">Off That Couch Fitness</div><div class="ah-t">Training library</div></div>
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
                <span class="pill free">Module 3 of 13</span>
                <span style="margin-left:auto;font-size:11.5px;color:var(--text-2);font-weight:620">2h 10m left</span>
              </div>
              <div class="hs-title" style="font-size:19px;margin-top:10px">Ironman 70.3 — Intermediate</div>
              <div class="track" style="margin-top:13px;background:rgba(255,255,255,.12)">
                <i style="width:38%;background:var(--accent)"></i>
              </div>
              <div style="display:flex;gap:8px;margin-top:13px">
                ${['pdf', 'video', 'audio'].map(f => `
                  <span class="fmt">${I(FMT[f][0], { size: 13 })}${FMT[f][1]}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="sect-t"><h3>All guides</h3><span class="more">10 guides</span></div>
          <div style="display:grid;gap:12px">
            ${PLANS.map(p => `
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
                    <span><b>${p.m}</b></span><span>${p.h}</span><span>${p.lv}</span>
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
     05 — GUIDE DETAIL  (content package, no dated schedule)
     ====================================================================== */
  const plandetail = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Guide', 'plans', `<button class="iconbtn">${I('star', { size: 17 })}</button>`)}
      <div class="scroll pb">
        <div style="height:130px;margin:0 22px;border-radius:var(--r-lg);position:relative;overflow:hidden;
                    background:linear-gradient(135deg, ${tint('var(--d-bike)', 55)}, ${tint('var(--d-swim)', 22)});
                    display:flex;align-items:flex-end;padding:15px">
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.6))"></div>
          <div style="position:relative;z-index:2;color:#fff">
            <div style="font-size:10.5px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;opacity:.9">Triathlon · Intermediate</div>
            <div style="font-size:21px;font-weight:800;letter-spacing:-.03em;margin-top:5px">Ironman 70.3 Guide</div>
          </div>
        </div>

        <div class="pad">
          <div class="card" style="margin-top:15px;display:flex;text-align:center;padding:14px 8px">
            ${[['13', 'Modules'], ['3h 30m', 'Content'], ['9', 'Videos'], ['4', 'PDFs']].map(([v, l], i) => `
              <div style="flex:1;${i ? 'border-left:1px solid var(--border)' : ''}">
                <div style="font-size:17px;font-weight:790;letter-spacing:-.03em">${v}</div>
                <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;font-weight:640;margin-top:2px">${l}</div>
              </div>`).join('')}
          </div>

          <p style="font-size:13.5px;line-height:1.65;color:var(--text-2);margin:16px 0 0">
            Everything Steve teaches his own athletes about racing 70.3 — how to structure a block, how to pace each
            discipline, what to eat and when. Read it, watch it or listen to it on the bike.
          </p>

          <div class="card" style="margin-top:14px;display:flex;gap:11px;align-items:center;padding:13px">
            <div style="width:34px;height:34px;border-radius:11px;background:var(--surface-3);
                        color:var(--text-2);display:grid;place-items:center;flex:none">${I('info', { size: 17 })}</div>
            <div style="font-size:12px;color:var(--text-2);line-height:1.5">
              A reference guide, not a scheduled programme. Train when it suits you — your data still flows in.
            </div>
          </div>

          <div class="sect-t"><h3>Modules</h3><span class="more">38% complete</span></div>
          ${[['1', 'How this guide works', 'PDF · 12 pages', 'pdf', 'var(--d-swim)', 1, 0],
             ['2', 'Setting your zones', 'Video 9:20 · PDF', 'video', 'var(--d-bike)', 1, 0],
             ['3', 'Building your bike base', 'Video 14:05 · Audio', 'video', 'var(--d-bike)', 0, 1],
             ['4', 'Open-water skills', 'Video 11:40', 'video', 'var(--d-swim)', 0, 0],
             ['5', 'Running off the bike', 'Video 8:15 · PDF', 'video', 'var(--d-run)', 0, 0],
             ['6', 'Race-week fuelling', 'Audio 16:30 · PDF', 'audio', 'var(--d-str)', 0, 0]].map(([n, t, s, ic, c, done, cur]) => `
            <div class="crow" data-go="guide" style="${cur ? 'border-color:' + tint('var(--accent)', 45) + ';background:' + tint('var(--accent)', 6) : ''}">
              <div class="crow-ic" style="background:${done ? tint('var(--accent)', 14) : tint(c, 13)};
                          color:${done ? 'var(--accent)' : c}">
                ${done ? I('checkCircle', { size: 19 }) : I(ic, { size: 19 })}
              </div>
              <div class="crow-b">
                <div class="crow-t">${n} — ${t}</div>
                <div class="crow-s">${s}</div>
              </div>
              ${cur ? `<span class="pill free">Resume</span>` : I('chevR', { size: 17, sw: 2.2 })}
            </div>`).join('')}

          <div class="lockover" style="margin-top:8px">
            <div class="lk-blur">
              ${['7 — Taper and race day', '8 — Transitions'].map((t, i) => `
                <div class="crow" style="${i ? 'margin-top:8px' : ''}">
                  <div class="crow-ic" style="background:${tint('var(--d-run)', 14)};color:var(--d-run)">${I('video', { size: 19 })}</div>
                  <div class="crow-b"><div class="crow-t">${t}</div><div class="crow-s">Video · PDF</div></div>
                </div>`).join('')}
            </div>
            <div class="lk-face">
              ${I('lock', { size: 20 })}
              <div class="lk-t">Modules 7–13 in Pro</div>
              <div class="lk-s">2h 10m of content remaining</div>
            </div>
          </div>

          <button class="btn btn-p" style="margin-top:20px" data-go="paywall">
            ${I('lock', { size: 15 })} Unlock the full guide
          </button>
        </div>
      </div>
      ${tabbar('plans')}
    </div>`;

  /* ======================================================================
     06 — CONTENT PLAYER
     ====================================================================== */
  const guide = () => `
    ${sbar()}
    <div class="appbody">
      ${nav('Module 3', 'plandetail')}
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
                <span>4:47</span><span>14:05</span>
              </div>
            </div>
          </div>

          <h2 style="font-size:20px;font-weight:790;letter-spacing:-.028em;margin:16px 0 0;line-height:1.22">
            Building your bike base
          </h2>
          <div style="display:flex;align-items:center;gap:9px;margin-top:10px">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(150deg,var(--g-400),var(--g-700));
                        display:grid;place-items:center;font-size:11px;font-weight:780;color:#06210C">SC</div>
            <div style="font-size:12.5px;color:var(--text-2);font-weight:620">Steve Clark · British Triathlon L2</div>
          </div>

          <div class="chips" style="margin-top:15px">
            <span class="chip on">${I('video', { size: 12 })} Video</span>
            <span class="chip">${I('audio', { size: 12 })} Audio 14:05</span>
            <span class="chip">${I('pdf', { size: 12 })} PDF notes</span>
          </div>

          <p style="font-size:13.5px;line-height:1.68;color:var(--text-2);margin:17px 0 0">
            Base is the phase most age-groupers rush. In this module Steve explains what aerobic base actually does,
            how long to spend building it, and the two sessions a week that matter more than everything else combined.
          </p>

          <div class="sect-t"><h3>In this module</h3></div>
          ${[['0:00', 'What aerobic base really means'], ['3:20', 'How long to spend here'],
             ['7:45', 'The two sessions that matter'], ['11:10', 'Signs it is working']].map(([t, n], i) => `
            <div class="srow" style="${i === 1 ? 'border-color:' + tint('var(--accent)', 45) : ''}">
              <div class="srow-ic" style="width:38px;height:38px;font-family:var(--fm);font-size:11px;font-weight:680;color:var(--text-2)">${t}</div>
              <div class="srow-b"><div class="srow-t" style="font-size:13px">${n}</div></div>
              ${i === 1 ? `<span style="color:var(--accent)">${I('play', { size: 15, fill: 'currentColor' })}</span>` : ''}
            </div>`).join('')}

          <div class="card" style="margin-top:16px;display:flex;gap:11px;align-items:center">
            <div style="width:38px;height:38px;border-radius:12px;background:${tint('var(--d-swim)', 15)};
                        color:var(--d-swim);display:grid;place-items:center;flex:none">${I('pdf', { size: 18 })}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:690">Bike base — session notes</div>
              <div style="font-size:11.5px;color:var(--text-3);margin-top:2px">PDF · 6 pages · download for offline</div>
            </div>
            ${I('chevR', { size: 17, sw: 2.2 })}
          </div>

          <button class="btn btn-p" style="margin-top:20px" data-go="plandetail">
            ${I('check', { size: 16, sw: 2.6 })} Mark module complete
          </button>
        </div>
      </div>
    </div>`;

  /* ======================================================================
     07 — AI COACH
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
          <div style="font-size:14.5px;font-weight:730;letter-spacing:-.02em;margin-top:7px">6h 40m across 7 activities</div>
          <p style="font-size:12.5px;line-height:1.6;color:var(--text-2);margin:7px 0 0">
            Volume is up 14% on last week and your sleep held steady. Protein came in 18% under on the two big days,
            which is likely why Saturday felt harder than the numbers suggest.
          </p>
          <div style="display:flex;gap:7px;margin-top:12px">
            <span class="tgt">7 activities</span><span class="tgt">6h 40m</span><span class="tgt">Sleep 7h 12m</span>
          </div>
        </div>

        <div class="msg a">
          Morning Jess. Sleep's been solid for nine days and your resting HR hasn't moved — you're absorbing the
          training well.
        </div>
        <div class="msg u">I felt awful on Saturday's long ride though. Should I be worried?</div>
        <div class="msg a">
          Looking at Saturday specifically — you rode 2h 45m but only logged <b>52g of carbohydrate</b> across the whole
          session. For a ride that length you'd want 60–90g per hour.<br><br>
          Your power held fine for the first 90 minutes and then dropped about 8%. That's a fuelling pattern, not a
          fitness one. Nothing to worry about.
        </div>
        <div class="msg a">
          Module 6 of your 70.3 guide covers exactly this — worth 16 minutes before your next long ride.
        </div>
        <div class="chips" style="margin:16px 0 6px">
          <span class="chip">Am I eating enough?</span>
          <span class="chip">How was my week?</span>
          <span class="chip">Explain my resting HR</span>
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
     08 — NUTRITION
     ====================================================================== */
  const fuel = () => `
    ${sbar()}
    <div class="appbody">
      <div class="scroll pb">
        <div class="ahead">
          <div><div class="ah-s">Tuesday · 812 kcal burned</div><div class="ah-t">Fuel</div></div>
          <div class="ahead-r"><button class="iconbtn" data-go="scan">${I('camera', { size: 18 })}</button></div>
        </div>
        <div class="pad">
          <div class="card" style="background:var(--surface-3)">
            <div style="display:flex;align-items:center;gap:18px">
              ${ring(69, '1,840', 'of 2,650', 92, 'var(--d-bike)')}
              <div style="flex:1">
                <div style="font-size:12px;font-weight:700;letter-spacing:-.01em">810 kcal left</div>
                <div style="font-size:11.5px;color:var(--text-3);line-height:1.45;margin-top:3px">
                  Target raised 320 kcal for what your watch recorded today
                </div>
                <div style="display:inline-flex;align-items:center;gap:5px;margin-top:9px;font-size:10.5px;font-weight:680;
                            color:var(--d-bike);background:${tint('var(--d-bike)', 14)};padding:4px 9px;border-radius:7px">
                  ${I('zap', { size: 11 })} Activity-adjusted
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
               ['Whey &amp; oat shake', 'Post-ride · 09:30', '286', 'var(--d-str)', 'droplet'],
               ['Chicken salad, sourdough', 'Lunch · 13:05', '648', 'var(--d-run)', 'utensils'],
               ['Greek yoghurt, berries', 'Snack · 16:20', '194', 'var(--d-swim)', 'apple']].map(([t, s, k, c, ic]) => `
              <div class="meal">
                <div class="meal-th" style="background:${tint(c, 15)};color:${c}">${I(ic, { size: 19 })}</div>
                <div class="meal-b"><div class="meal-t">${t}</div><div class="meal-s">${s}</div></div>
                <div class="meal-k">${k}</div>
              </div>`).join('')}
          </div>

          <div class="sect-t"><h3>This week</h3></div>
          <div class="card">
            <div class="bars" style="height:96px">
              ${[[78, 92], [86, 88], [69, 94], [55, 70], [91, 96], [74, 82], [69, 78]].map(([p, c], i) => `
                <div class="bar-c">
                  <div class="bar-st" style="height:${c}%">
                    <i style="flex:${p};background:var(--d-str)"></i>
                    <i style="flex:${100 - p};background:var(--surface-3)"></i>
                  </div>
                  <div class="lb">${['M','T','W','T','F','S','S'][i]}</div>
                </div>`).join('')}
            </div>
            <div class="legend"><span><i style="background:var(--d-str)"></i>Protein target hit</span></div>
          </div>
        </div>
      </div>
      ${tabbar('fuel')}
    </div>`;

  /* ======================================================================
     09 — PHOTO MEAL LOG
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
          ${I('info', { size: 17 })}
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
     10 — ANALYTICS
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
            <span class="chip on">Combined</span><span class="chip">Activity</span>
            <span class="chip">Health</span><span class="chip">Nutrition</span>
          </div>

          <div class="sect-t"><h3>What you recorded</h3><span class="more">by activity</span></div>
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
              <div class="th">${I('clock', { size: 14 })}<span>Weekly hours</span></div>
              <div class="tv">6.6<small> h</small></div>
              <div class="td up">${I('arrowUp', { size: 10, sw: 2.6 })} 14% on last week</div>
            </div>
            <div class="tile">
              <div class="th">${I('chart', { size: 14 })}<span>Activities</span></div>
              <div class="tv">7</div>
              <div class="td">4 bike · 2 run · 1 swim</div>
            </div>
          </div>

          <div class="sect-t"><h3>Trend</h3></div>
          <div class="card">
            <div style="position:relative;height:104px;margin-bottom:8px">
              <svg viewBox="0 0 320 104" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible">
                <defs>
                  <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent)" stop-opacity=".28"/>
                    <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,74 L53,66 L107,58 L160,72 L213,44 L267,34 L320,26 L320,104 L0,104 Z" fill="url(#lg2)"/>
                <path d="M0,74 L53,66 L107,58 L160,72 L213,44 L267,34 L320,26"
                      fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M0,84 L53,80 L107,74 L160,76 L213,64 L267,55 L320,47"
                      fill="none" stroke="var(--text-3)" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
                <circle cx="320" cy="26" r="4.5" fill="var(--accent)"/>
              </svg>
            </div>
            <div class="legend" style="margin-top:0">
              <span><i style="background:var(--accent)"></i>7-day volume</span>
              <span><i style="background:var(--text-3)"></i>28-day average</span>
            </div>
          </div>

          <div class="sect-t"><h3>How it fits together</h3></div>
          <div class="card" style="border-color:${tint('var(--accent)', 30)};background:${tint('var(--accent)', 6)}">
            <div style="display:flex;align-items:center;gap:9px">
              <span style="color:var(--accent)">${I('spark', { size: 17 })}</span>
              <b style="font-size:13px;font-weight:730;letter-spacing:-.015em">Fuelling vs activity</b>
            </div>
            <div style="display:flex;align-items:flex-end;gap:6px;height:72px;margin-top:14px">
              ${[[58, 62], [66, 68], [74, 60], [42, 70], [82, 58], [88, 55]].map(([load, f]) => `
                <div style="flex:1;display:flex;gap:2.5px;align-items:flex-end;height:100%">
                  <div style="flex:1;height:${load}%;background:var(--accent);border-radius:3px 3px 0 0"></div>
                  <div style="flex:1;height:${f}%;background:${tint('var(--d-bike)', 70)};border-radius:3px 3px 0 0"></div>
                </div>`).join('')}
            </div>
            <div class="legend">
              <span><i style="background:var(--accent)"></i>Volume</span>
              <span><i style="background:${tint('var(--d-bike)', 70)}"></i>Carb intake</span>
            </div>
            <p style="font-size:12px;line-height:1.58;color:var(--text-2);margin:12px 0 0">
              Volume has climbed 34% over six weeks. Carbohydrate intake has fallen 11%. That gap is the single
              biggest thing to fix.
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
     11 — PAYWALL
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
          <div class="pw-t">Everything Steve<br>teaches, in your pocket</div>
          <div class="pw-s">The full training library, unlimited coaching and the whole nutrition module.</div>
        </div>

        <div class="card" style="margin-top:20px;padding:6px 16px">
          ${[['The complete library', '10 guides — every discipline Steve coaches'],
             ['PDF, video &amp; audio', 'Read it, watch it, or listen on the bike'],
             ['Unlimited AI coaching', 'Grounded in your training, sleep and fuelling'],
             ['Full nutrition tracking', 'Photo logging, macros, activity-aware targets'],
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
              <div class="po-s">£5.75 / month, billed yearly</div>
            </div>
            <div class="po-p"><b>£69</b><i>per year</i></div>
          </div>
          <div class="pw-opt">
            <div style="flex:1">
              <div class="po-t">Monthly</div>
              <div class="po-s">Cancel any time</div>
            </div>
            <div class="po-p"><b>£6.99</b><i>per month</i></div>
          </div>
        </div>

        <button class="btn btn-p" style="margin-top:18px" data-go="home">Start 7-day free trial</button>
        <div style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-3);line-height:1.55">
          Free for 7 days, then £69/year. Cancel any time in Settings.
        </div>
        <div class="msg-note" style="padding-top:16px">
          ${I('shield', { size: 13 })} Your health data stays yours. Never sold, never used for ads.
        </div>
      </div>
    </div>`;

  /* ======================================================================
     12 — PROFILE
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
              <div style="font-size:12.5px;color:var(--text-3);margin-top:3px">Triathlon · 3rd season</div>
              <div style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:10.5px;font-weight:700;
                          color:var(--accent);background:${tint('var(--accent)', 14)};padding:4px 9px;border-radius:7px">
                ${I('zap', { size: 11 })} PRO · Annual
              </div>
            </div>
          </div>

          <div class="tiles" style="margin-top:18px">
            <div class="tile">
              <div class="th">${I('book', { size: 14 })}<span>Modules done</span></div>
              <div class="tv">17</div>
            </div>
            <div class="tile">
              <div class="th">${I('trophy', { size: 14 })}<span>Activities</span></div>
              <div class="tv">184</div>
            </div>
          </div>

          <div class="sect-t"><h3>Your guides</h3><span class="more">Library</span></div>
          <div class="card" style="padding:4px 16px">
            ${[['Ironman 70.3 — Intermediate', '38% complete'],
               ['Strength for Endurance', '100% complete'],
               ['Open Water Confidence', 'Not started']].map(([n, s]) => `
              <div class="srow-nav">
                <div class="n">${n}<div style="font-size:11px;color:var(--text-3);font-weight:500;margin-top:2px">${s}</div></div>
                ${I('chevR', { size: 16, sw: 2.2 })}
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
    welcome:    { fn: welcome,    k: '01', t: 'Welcome',          d: 'Promise reframed around learning and tracking rather than being scheduled.' },
    setup:      { fn: setup,      k: '02', t: 'Setup',            d: 'Four steps, not seven. No availability, no zones — nothing needs collecting to build a plan.' },
    home:       { fn: home,       k: '03', t: 'Home',             d: 'An activity dashboard, not a session dispatcher. What you did, what you ate, what to read next.' },
    plans:      { fn: plans,      k: '04', t: 'Training library', d: 'The whole product. Every discipline on the OTCF site, measured in modules rather than weeks.' },
    plandetail: { fn: plandetail, k: '05', t: 'Guide detail',     d: 'A content package: modules in PDF, video and audio. Progress is what you have consumed.' },
    guide:      { fn: guide,      k: '06', t: 'Content player',   d: 'One module, three formats, chapter markers. Everything here comes from the admin console.' },
    coach:      { fn: coach,      k: '07', t: 'AI Coach',         d: 'Unchanged from Option 2 — and it can point you at the right module when it spots something.' },
    fuel:       { fn: fuel,       k: '08', t: 'Nutrition',        d: 'Targets adjust to what the wearable recorded, rather than to a prescribed session.' },
    scan:       { fn: scan,       k: '09', t: 'Photo meal log',   d: 'Unchanged. AI estimate, confidence band, mandatory confirm step.' },
    analytics:  { fn: analytics,  k: '10', t: 'Analytics',        d: 'Recorded activity instead of planned-versus-actual. No compliance metric without a plan.' },
    paywall:    { fn: paywall,    k: '11', t: 'Paywall',          d: 'Lower price point — the library is the product, so it is priced as a library.' },
    me:         { fn: me,         k: '12', t: 'Profile',          d: 'Guides owned and progress through them, in place of training zones and test results.' },
  };
})();
