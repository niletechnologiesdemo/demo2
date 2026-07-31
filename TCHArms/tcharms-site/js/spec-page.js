/* Shared controller for the two specification pages. The page supplies the
   model through <body data-model>, everything else is read from TCH. */
function pageInit() {
  const model = document.body.dataset.model;
  const p = TCH.products[model];
  const other = TCH.products[model === "rs9" ? "rs9x" : "rs9"];

  document.getElementById("phTitle").textContent = p.name;
  document.getElementById("phBlurb").textContent = p.blurb;
  document.getElementById("dragIcon").innerHTML = TCHIcons.drag;
  // set before initViewers() reads it, so one markup file serves both models
  document.getElementById("viewer").dataset.viewer = model;
  document.getElementById("viewerBadge").textContent = p.short + " · 6 angles";
  document.getElementById("price").textContent = tchMoney(p.price);

  const tag = document.getElementById("stockTag");
  tag.textContent = p.stock === "in" ? "In Stock" : "Out of Stock";
  tag.classList.add(p.stock === "in" ? "tag-stock" : "tag-out");

  const add = document.getElementById("addBtn");
  add.dataset.add = model;
  if (p.stock !== "in") { add.disabled = true; add.textContent = "Out of Stock"; }

  // specification tables
  document.getElementById("specs").innerHTML = TCH.specs[model].map(g => `
    <div class="spec-group">
      <div class="spec-title">${g.group}</div>
      ${g.rows.map(r => `<div class="spec-row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join("")}
    </div>`).join("");

  document.getElementById("legalRestrict").textContent = TCH.legal.restrict;
  document.getElementById("legalAge").textContent = TCH.legal.age;

  // headline figures, pulled from the tables so the two never drift apart
  const find = (group, key) => {
    const g = TCH.specs[model].find(x => x.group === group);
    const row = g && g.rows.find(r => r[0] === key);
    return row ? row[1] : "";
  };
  const num = s => (s.match(/[\d.]+/) || [""])[0];
  const stats = [
    { n: "18", l: "Round Magazine" },
    { n: num(find(model === "rs9" ? "RS9 Vampir" : "RS9 X Vampir", "Muzzle Velocity")), s: "ft/s", l: "Muzzle Velocity" },
    { n: num(find("Barrel Profile", "Barrel Length")), s: "in", l: "Barrel Length" },
    { n: num(find("Dimensions and Weight", "With Full Magazine")), s: "lb", l: "Loaded Weight" }
  ];
  document.getElementById("stats").innerHTML = stats.map(s => `
    <div class="stat">
      <div class="n"><span data-count="${s.n}">0</span>${s.s ? `<small>${s.s}</small>` : ""}</div>
      <div class="l">${s.l}</div>
    </div>`).join("");

  document.getElementById("otherName").textContent = other.name;
  document.getElementById("otherBlurb").textContent = other.blurb;
  document.getElementById("otherLink").href = other.id + ".html";
  const oi = document.getElementById("otherImg");
  oi.src = other.img;
  oi.alt = other.name;
}
