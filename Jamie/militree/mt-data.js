/* MILITREE OPERATORS · seeded demo data (fictional except brand) */
const IMG='../assets/img/'; const LOGO='../assets/logo/militree.png';
const P=n=>IMG+n+'.jpg';
const gbp=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:0,maximumFractionDigits:0});
const gbp2=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});

const PEOPLE={
  jamie:{n:'Jamie Doxey',role:'Owner · Lead climber',img:P('p11')},
  callum:{n:'Callum Rees',role:'Climber',img:P('man5')},
  priya:{n:'Priya Shah',role:'Groundworker · Chipper',img:P('p9')},
  marcus:{n:'Marcus Doyle',role:'Climber · MEWP',img:P('man2')},
  ben:{n:'Ben Okafor',role:'Forwarder operator',img:P('man7')},
  tomasz:{n:'Tomasz Nowak',role:'Climber',img:P('man6')},
  lewis:{n:'Lewis Grant',role:'Applicant · Climber',img:P('man3')},
  aisha:{n:'Aisha Bello',role:'Applicant · Ground',img:P('p12')},
  sarah:{n:'Sarah Pemberton',role:'Private client · Broadstone',img:P('p2')},
  rob:{n:'Rob Hale',role:'Private client · Blandford',img:P('man1')},
  nt:{n:'National Trust · Purbeck',role:'Estate client',img:P('forest7')},
  hinton:{n:'Hinton Estate',role:'Estate client',img:P('forest6')},
  dwt:{n:'Dorset Wildlife Trust',role:'Charity client',img:P('trunk1')},
  poole:{n:'BCP Council',role:'Local authority',img:P('forest2')},
  me:{n:'Sarah Pemberton',first:'Sarah',img:P('p2')},
};

const SERVICES=[
  {id:'thin',icon:'trees',title:'Woodland thinning',short:'Selective thinning that lets veteran trees breathe and the next generation come through.',from:'From £1,200 / ha',dur:'1–3 weeks',img:P('forest5'),tags:['Estates','Private woodland','FC grant work'],
    body:'We mark, fell and extract the trees that are holding a woodland back and leave the ones that make it. Veteran trees stay. Natural regeneration gets light. Timber from thinnings is stacked at ride-side or sold on your behalf, which usually offsets a good chunk of the cost.',inc:['Survey and marking with you on site','Felling, snedding and extraction','Ride-side stacking or timber sale','Brash management and ride reinstatement','Forestry Commission felling licence support']},
  {id:'ancient',icon:'leaf',title:'Ancient & veteran woodland',short:'Halo release, crown work and long-term plans for the trees that were here before us.',from:'Survey first',dur:'Ongoing',img:P('forest6'),tags:['Veteran trees','Halo thinning','Management plans'],
    body:'Ancient woodland needs a lighter hand. Halo thinning around veterans, careful deadwood retention and a ten-year plan you can actually follow. We have worked on SSSI sites and know the paperwork.',inc:['Veteran tree assessment','Halo release thinning','Deadwood and habitat retention','Ten-year management plan','Natural England liaison']},
  {id:'fell',icon:'axe',title:'Felling & dismantling',short:'Straight felling in the wood, sectional dismantling over the house.',from:'From £480 / day',dur:'1–3 days',img:P('forest3'),tags:['Sectional','Rigging','Near structures'],
    body:'From a single dangerous ash to a stand of poplar over a lane. Sectional dismantling with rigging where there is a roof or a road underneath, straight felling where there is not. All work to BS3998.',inc:['Risk assessment and method statement','Rigging and lowering','Road or footpath closure liaison','Chip, log or remove','Stump grinding on request']},
  {id:'plant',icon:'tree',title:'Tree planting & establishment',short:'Native broadleaf schemes from whips to first thin. Planted, guarded, beaten up.',from:'From £2.40 / tree',dur:'Nov – Mar',img:P('tree1'),tags:['Native broadleaf','Grant schemes','Hedgerows'],
    body:'Planting is the easy part. We plant, guard, weed and beat up for three seasons so what goes in the ground stays in the ground. Species mixes chosen for your soil and what the wood is for.',inc:['Species and spacing plan','Supply and planting','Guards, stakes and mulch','Three seasons of beat-up and weeding','Grant claim paperwork']},
  {id:'storm',icon:'wind',title:'Storm damage & call-out',short:'Wind-blown, hung-up and dangerous trees made safe, fast.',from:'From £640 call-out',dur:'Same or next day',img:P('forest8'),tags:['24h response','Insurance work','Roads & rail'],
    body:'When something comes down we come out. Hung-up trees, wind-blow across tracks, ash dieback failures. We make it safe first and tidy second, with the photos your insurer wants.',inc:['Same or next day response','Make-safe and clearance','Insurer-ready photo report','Hung-up tree winching','Follow-up remedial work']},
  {id:'estate',icon:'clipboard',title:'Estate & land contracts',short:'A crew that knows your ground, on an annual programme, with one invoice a month.',from:'From £1,800 / month',dur:'Annual',img:P('forest7'),tags:['Annual programme','Fixed monthly','Named crew'],
    body:'For estates, trusts and councils who want the work planned a year ahead and done by people who know the site. One named lead, a shared calendar, one invoice.',inc:['Annual work programme','Named lead and crew','Shared job calendar','Monthly reporting and invoicing','Priority storm response']},
];

const WORK=[
  {id:'w1',title:'Kingston Lacy · 12 ha thinning',cat:'Thinning',loc:'Wimborne, Dorset',img:P('forest7'),year:'2026',client:'nt',blurb:'First thin of a 1990s oak and ash planting. 4 crew, 11 days, 380 tonnes to ride-side.',ba:true},
  {id:'w2',title:'Veteran oak halo release',cat:'Ancient woodland',loc:'Wareham',img:P('forest6'),year:'2026',client:'dwt',blurb:'Twelve veteran oaks released from encroaching sycamore across an SSSI.'},
  {id:'w3',title:'Storm Eunice clearance',cat:'Storm',loc:'Purbeck',img:P('forest3'),year:'2025',client:'nt',blurb:'Forty wind-blown beech across three rides cleared in nine days.'},
  {id:'w4',title:'Native planting · 4,200 whips',cat:'Planting',loc:'Cranborne Chase',img:P('tree1'),year:'2025',client:'hinton',blurb:'Oak, hazel, field maple and hawthorn on 3 ha of former pasture. 94% survival at year two.'},
  {id:'w5',title:'Ride widening for butterflies',cat:'Ancient woodland',loc:'Dorset Wildlife Trust',img:P('trunk1'),year:'2025',client:'dwt',blurb:'800 m of ride scalloped and widened for pearl-bordered fritillary.'},
  {id:'w6',title:'Beech dismantle over cottage',cat:'Felling',loc:'Corfe Castle',img:P('forest5'),year:'2026',client:'rob',blurb:'A 26 m beech dismantled in sections over a thatched roof. Nothing touched the thatch.'},
];

const CERTS=[['NPTC CS30 / CS31','Chainsaw maintenance & felling small trees'],['NPTC CS38 / CS39','Tree climbing & aerial rescue · chainsaw from rope'],['NPTC CS41','Large tree felling'],['LANTRA forwarder & chipper','Extraction & processing plant'],['First Aid +F','Forestry first aid, all crew'],['£5m public liability','Plus employers’ liability & hired-in plant'],['Waste carrier licence','Environment Agency registered'],['FISA guidance','Forest Industry Safety Accord compliant']];

const CREW=[
  {id:'jamie',who:'jamie',tix:['CS30/31','CS38/39','CS41','MEWP','First Aid +F'],status:'On job',job:'Kingston Lacy',day:480},
  {id:'callum',who:'callum',tix:['CS30/31','CS38/39','First Aid +F'],status:'Available',day:260},
  {id:'priya',who:'priya',tix:['CS30/31','LANTRA chipper','First Aid +F'],status:'Available',day:200},
  {id:'marcus',who:'marcus',tix:['CS38/39','MEWP','Rigging','First Aid +F'],status:'On job',job:'Kingston Lacy',day:280},
  {id:'ben',who:'ben',tix:['LANTRA forwarder','CS30','First Aid +F'],status:'From 28 Sep',day:300},
  {id:'tomasz',who:'tomasz',tix:['CS38/39','CS41','First Aid +F'],status:'Unavailable',day:270},
];
const CREW_APPS=[{who:'lewis',when:'Today',tix:['CS30/31','CS38/39'],note:'Three seasons with a Hampshire firm, own climbing kit, can start Monday.'},{who:'aisha',when:'2 days ago',tix:['CS30/31','First Aid'],note:'Groundworker, chipper ticket booked for October. Keen to climb.'}];

const ENQ=[
  {id:'E-341',who:'sarah',col:0,title:'Overgrown 2 ha copse behind house',loc:'Broadstone BH18',svc:'thin',when:'Today 08:40',size:'~2 ha',photos:2,note:'Not touched in 20 years. Want light back to the garden but keep it a wood.',new:true},
  {id:'E-340',who:'nt',col:0,title:'Ride clearance · 800 m',loc:'Studland',svc:'ancient',when:'Yesterday',size:'800 m ride',photos:4,note:'Before the nesting season. Heathland edge.'},
  {id:'E-338',who:'rob',col:1,title:'Storm-damaged ash · 6 trees',loc:'Blandford DT11',svc:'storm',when:'3 days ago',size:'6 trees',survey:'Thu 18 Sep · 09:00',photos:5,note:'Two hung up over the lane.'},
  {id:'E-336',who:'hinton',col:2,title:'8 ha first thin · Hinton Wood',loc:'Cranborne',svc:'thin',when:'Last week',size:'8 ha',quote:14400,sent:'Fri 12 Sep',note:'Quote viewed twice. Estate manager asked about timber credit.'},
  {id:'E-335',who:'poole',col:2,title:'40 street trees · crown lift',loc:'Poole',svc:'fell',when:'Last week',size:'40 trees',quote:6200,sent:'Thu 11 Sep'},
  {id:'E-330',who:'nt',col:3,title:'Kingston Lacy · 12 ha thinning',loc:'Wimborne',svc:'thin',when:'Aug',size:'12 ha',quote:19800,dates:'5 – 16 Oct',crew:['jamie','marcus','callum','priya']},
  {id:'E-329',who:'rob',col:3,title:'Beech dismantle · cottage',loc:'Corfe Castle',svc:'fell',when:'Aug',size:'1 tree · 26 m',quote:2350,dates:'Mon 22 Sep',crew:['jamie','callum']},
];

const QUOTE={id:'Q-0412',enq:'E-336',client:'hinton',title:'Hinton Wood · 8 ha first thinning',valid:'Valid until 12 Oct 2026',lines:[['Survey, marking & felling licence support','1 day',480,480],['Selective thinning, felling & snedding','8 ha',1400,11200],['Extraction & ride-side stacking','8 ha',275,2200],['Brash management & ride reinstatement','1',1120,1120],['Timber credit · est. 240 t at £-2.50','240 t',-2.5,-600]],sub:14400,vat:2880,tot:17280,deposit:3600,start:'Wk commencing 3 Nov 2026',dur:'Approx. 9 working days',crew:'Crew of 4 · Jamie Doxey lead'};

const JOBS_WEEK={days:['Mon 21','Tue 22','Wed 23','Thu 24','Fri 25'],rows:[
  ['jamie',['Kingston Lacy prep','Corfe beech|coral','Kingston Lacy|deep','Kingston Lacy|deep','Survey · Blandford|gold']],
  ['callum',['Off|off','Corfe beech|coral','Kingston Lacy|deep','Kingston Lacy|deep','Kingston Lacy|deep']],
  ['marcus',['Kingston Lacy|deep','Kingston Lacy|deep','Kingston Lacy|deep','Off|off','Off|off']],
  ['priya',['Chipper service|gold','Corfe beech|coral','Kingston Lacy|deep','Kingston Lacy|deep','Kingston Lacy|deep']],
  ['ben',['Unavailable|off','Unavailable|off','Unavailable|off','Unavailable|off','Unavailable|off']],
]};

const INVOICES=[
  {id:'INV-2088',client:'nt',title:'Storm clearance · Studland',amt:4680,status:'Paid',when:'8 Sep'},
  {id:'INV-2089',client:'dwt',title:'Ride widening · phase 2',amt:3120,status:'Due 26 Sep',when:'12 Sep'},
  {id:'INV-2090',client:'rob',title:'Deposit · Corfe beech',amt:590,status:'Paid',when:'14 Sep'},
  {id:'INV-2091',client:'poole',title:'Crown lift · batch 1',amt:2400,status:'Overdue',when:'28 Aug'},
];

const TESTIMONIALS=[
  {who:'hinton',n:'Estate manager, Hinton Estate',txt:'First contractor in ten years who marked the wood with me instead of for me. Left the veterans, took the sycamore, timber paid a third of the bill.'},
  {who:'rob',n:'Rob Hale, Corfe Castle',txt:'Twenty-six metre beech over a thatched roof. They dismantled it like it was a puzzle. Not a straw out of place.'},
  {who:'dwt',n:'Reserves officer, Dorset Wildlife Trust',txt:'They understand why the ride is being widened, not just that it is. That matters on a reserve.'},
];
