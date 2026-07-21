/* WellTogether demo data layer — shared by patient & admin apps via localStorage */
(function () {
  const KEY = 'wt_intakes_v1';
  const RKEY = 'wt_requests_v1';

  const CLINIC = {
    name: 'Cedar Creek Community Center',
    unit: 'Mobile Health Unit #2',
    date: 'Friday, July 18, 2026',
    hours: '9:00 AM – 3:00 PM',
    address: '410 Cedar Creek Rd, Ashland County'
  };

  // Mobile unit deployments shown to patients as "Units Near Me"
  const UNITS = [
    { id: 'u1', today: true, m: 'JUL', d: '18', site: 'Cedar Creek Community Center', address: '410 Cedar Creek Rd, Ashland County', unit: 'Mobile Health Unit #2', hours: '9:00 AM – 3:00 PM', dist: '0.8 mi' },
    { id: 'u2', today: false, m: 'JUL', d: '24', site: 'Harvest Ridge Farm Workers Assoc.', address: '2201 County Rd 9, Harvest Ridge', unit: 'Mobile Health Unit #1', hours: '7:00 AM – 1:00 PM', dist: '6.2 mi' },
    { id: 'u3', today: false, m: 'JUL', d: '29', site: 'St. Brigid Shelter — Downtown', address: '88 Mercer St, Rockport', unit: 'Mobile Health Unit #2', hours: '10:00 AM – 4:00 PM', dist: '12.4 mi' },
    { id: 'u4', today: false, m: 'AUG', d: '11', site: 'Lakeview Unified Schools', address: '1 Wildcat Way, Lakeview', unit: 'Both units', hours: '8:00 AM – 2:00 PM', dist: '18.1 mi' }
  ];

  const SERVICES = {
    cbc:     { code: 'CBC',   name: 'Complete Blood Count (CBC)', group: 'blood', tube: 'Lavender' },
    lipid:   { code: 'LIPID', name: 'Lipid Panel (Cholesterol)',  group: 'blood', tube: 'Gold' },
    a1c:     { code: 'A1C',   name: 'Hemoglobin A1C (Diabetes)',  group: 'blood', tube: 'Lavender' },
    glucose: { code: 'GLU',   name: 'Blood Glucose',              group: 'blood', tube: 'Gray' },
    bp:      { code: 'BP',    name: 'Blood Pressure Check',       group: 'screen' },
    bmi:     { code: 'BMI',   name: 'Height, Weight & BMI',       group: 'screen' },
    flu:     { code: 'FLU',   name: 'Flu Vaccine',                group: 'vax' },
    covid:   { code: 'COV',   name: 'COVID-19 Vaccine',           group: 'vax' },
    consult: { code: 'WELL',  name: 'Wellness Consultation',      group: 'other' }
  };

  // Reference ranges for the results-entry screen
  const RESULT_FIELDS = {
    cbc:     [{ id: 'wbc', label: 'WBC', unit: 'K/uL', low: 4.5, high: 11 }, { id: 'hgb', label: 'Hemoglobin', unit: 'g/dL', low: 12, high: 17.5 }, { id: 'plt', label: 'Platelets', unit: 'K/uL', low: 150, high: 400 }],
    lipid:   [{ id: 'chol', label: 'Total Cholesterol', unit: 'mg/dL', low: 0, high: 200 }, { id: 'hdl', label: 'HDL', unit: 'mg/dL', low: 40, high: 100 }, { id: 'ldl', label: 'LDL', unit: 'mg/dL', low: 0, high: 130 }],
    a1c:     [{ id: 'a1c', label: 'Hemoglobin A1C', unit: '%', low: 4, high: 5.7 }],
    glucose: [{ id: 'glu', label: 'Glucose (fasting)', unit: 'mg/dL', low: 70, high: 100 }],
    bp:      [{ id: 'sys', label: 'Systolic', unit: 'mmHg', low: 90, high: 130 }, { id: 'dia', label: 'Diastolic', unit: 'mmHg', low: 60, high: 85 }],
    bmi:     [{ id: 'bmi', label: 'BMI', unit: 'kg/m²', low: 18.5, high: 25 }],
    flu:     [{ id: 'dose', label: 'Dose administered', unit: '', low: null, high: null }],
    covid:   [{ id: 'dose', label: 'Dose administered', unit: '', low: null, high: null }],
    consult: [{ id: 'note', label: 'Consult note', unit: '', low: null, high: null }]
  };

  const SEED = [
    {
      id: 'WT-2026-0141', first: 'Rosa', last: 'Delgado', dob: '1961-03-22', phone: '(555) 204-8817',
      ssn4: '4821', services: ['cbc', 'lipid', 'a1c', 'bp'], lang: 'es', source: 'app',
      status: 'reported', checkedInAt: '9:04 AM',
      results: {
        cbc: { wbc: '6.8', hgb: '13.1', plt: '265' },
        lipid: { chol: '224', hdl: '48', ldl: '151' },
        a1c: { a1c: '6.4' },
        bp: { sys: '138', dia: '88' }
      }
    },
    {
      id: 'WT-2026-0142', first: 'Earl', last: 'Whitfield', dob: '1954-11-02', phone: '(555) 887-2903',
      ssn4: '7714', services: ['glucose', 'bp', 'flu'], lang: 'en', source: 'walkup',
      status: 'collected', checkedInAt: '9:21 AM', results: {}
    },
    {
      id: 'WT-2026-0143', first: 'Tammy', last: 'Boyd', dob: '1987-06-14', phone: '(555) 310-4462',
      ssn4: '0937', services: ['cbc', 'glucose', 'bmi'], lang: 'en', source: 'app',
      status: 'labeled', checkedInAt: '9:38 AM', results: {}
    },
    {
      id: 'WT-2026-0144', first: 'Marcus', last: 'Jefferson', dob: '1978-01-30', phone: '(555) 662-1180',
      ssn4: '3358', services: ['lipid', 'a1c', 'consult'], lang: 'en', source: 'app',
      status: 'checkedin', checkedInAt: '9:52 AM', results: {}
    },
    {
      id: 'WT-2026-0145', first: 'Linh', last: 'Pham', dob: '1993-09-08', phone: '(555) 448-7726',
      ssn4: '6602', services: ['covid', 'bp'], lang: 'en', source: 'walkup',
      status: 'checkedin', checkedInAt: '10:07 AM', results: {}
    }
  ];

  // General test requests — not tied to a clinic day; power the demand view
  const RSEED = [
    { id: 'RQ-2026-0312', first: 'Grace', last: 'Hartman', phone: '(555) 918-2274', zip: '44710', area: 'Maple Falls', services: ['a1c', 'glucose'], date: 'Jul 12', status: 'new', note: 'No car — closest lab is 40 min away.' },
    { id: 'RQ-2026-0313', first: 'Peter', last: 'Okafor', phone: '(555) 340-1189', zip: '44710', area: 'Maple Falls', services: ['cbc', 'lipid'], date: 'Jul 13', status: 'new', note: '' },
    { id: 'RQ-2026-0314', first: 'Dolores', last: 'Reyes', phone: '(555) 227-6641', zip: '44710', area: 'Maple Falls', services: ['bp', 'consult'], date: 'Jul 15', status: 'new', note: 'Prefiere atención en español.' },
    { id: 'RQ-2026-0315', first: 'Susan', last: 'Chen', phone: '(555) 762-0038', zip: '44821', area: 'Rockport', services: ['lipid', 'a1c'], date: 'Jul 11', status: 'planned', note: '' },
    { id: 'RQ-2026-0316', first: 'Milan', last: 'Novak', phone: '(555) 883-5520', zip: '44821', area: 'Rockport', services: ['flu'], date: 'Jul 14', status: 'new', note: '' },
    { id: 'RQ-2026-0317', first: 'Troy', last: 'Caldwell', phone: '(555) 495-7713', zip: '44530', area: 'Harlan Ridge', services: ['cbc', 'glucose', 'bp'], date: 'Jul 16', status: 'new', note: 'Several neighbors interested as well.' },
    { id: 'RQ-2026-0318', first: 'Lucille', last: 'Fontaine', phone: '(555) 606-9821', zip: '44530', area: 'Harlan Ridge', services: ['covid'], date: 'Jul 17', status: 'new', note: '' },
    { id: 'RQ-2026-0319', first: 'James', last: 'Whitmore', phone: '(555) 133-4470', zip: '44662', area: 'Cedar Creek', services: ['a1c'], date: 'Jul 17', status: 'new', note: '' }
  ];

  function loadKey(key, seed) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through to seed */ }
    localStorage.setItem(key, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }

  function load() { return loadKey(KEY, SEED); }
  function save(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
  function loadReq() { return loadKey(RKEY, RSEED); }
  function saveReq(list) { localStorage.setItem(RKEY, JSON.stringify(list)); }

  function add(intake) {
    const list = load();
    const num = 140 + list.length + 1;
    intake.id = 'WT-2026-0' + num;
    intake.status = 'checkedin';
    intake.checkedInAt = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    intake.results = intake.results || {};
    list.push(intake);
    save(list);
    return intake;
  }

  function update(id, patch) {
    const list = load();
    const i = list.findIndex(x => x.id === id);
    if (i > -1) { Object.assign(list[i], patch); save(list); return list[i]; }
    return null;
  }

  function addReq(req) {
    const list = loadReq();
    const num = 311 + list.length + 1;
    req.id = 'RQ-2026-0' + num;
    req.status = 'new';
    req.date = 'Jul 18';
    list.push(req);
    saveReq(list);
    return req;
  }

  function updateReq(id, patch) {
    const list = loadReq();
    const i = list.findIndex(x => x.id === id);
    if (i > -1) { Object.assign(list[i], patch); saveReq(list); return list[i]; }
    return null;
  }

  function reset() { localStorage.removeItem(KEY); localStorage.removeItem(RKEY); }

  const STATUS = {
    checkedin: { label: 'Checked In',       chip: 'orange' },
    labeled:   { label: 'Labels Printed',   chip: 'teal' },
    collected: { label: 'Sample Collected', chip: 'gray' },
    resulted:  { label: 'Results Entered',  chip: 'green' },
    reported:  { label: 'Results Published', chip: 'green' }
  };

  const RSTATUS = {
    new:     { label: 'New',     chip: 'orange' },
    planned: { label: 'Planned', chip: 'teal' }
  };

  window.WT = { CLINIC, UNITS, SERVICES, RESULT_FIELDS, STATUS, RSTATUS, load, save, add, update, loadReq, saveReq, addReq, updateReq, reset };
})();
