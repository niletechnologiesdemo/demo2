/* ROYAL HOME & GARDEN · seeded demo data (fictional except brand) */
const IMG='../assets/img/'; const LOGO='../assets/logo/royal.png';
const P=n=>IMG+n+'.jpg';
const gbp=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:0,maximumFractionDigits:0});
const gbp2=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
const PEOPLE={
  jamie:{n:'Jamie Doxey',role:'Owner',img:P('p11')},
  me:{n:'Margaret Ellis',first:'Margaret',role:'Customer · Swanage · over-65 rate',img:P('p6'),oap:true,addr:'22 Bay Crescent, Swanage BH19 1AB'},
  paul:{n:'Paul Dawson',role:'Customer · Wareham',img:P('man1'),addr:'7 Mill Lane, Wareham'},
  gemma:{n:'Gemma Rowe',role:'Customer · Poole',img:P('p4'),addr:'14 Lilliput Rd, Poole'},
  arthur:{n:'Arthur Finch',role:'Customer · Swanage · over-65 rate',img:P('p5'),oap:true,addr:'3 Priory Gdns, Swanage'},
  nadia:{n:'Nadia Hussain',role:'Customer · Wimborne',img:P('p8'),addr:'Oak House, Wimborne'},
  steve:{n:'Steve Barrett',role:'Customer · Corfe',img:P('man2'),addr:'Rose Cottage, Corfe Castle'},
  joan:{n:'Joan Pike',role:'Customer · Wareham · over-65 rate',img:P('p2'),oap:true,addr:'9 Church St, Wareham'},
  dev:{n:'Dev Patel',role:'Customer · Poole',img:P('man7'),addr:'41 Sandbanks Rd, Poole'},
};
const CATS=[
  {id:'garden',icon:'leaf',title:'Garden',items:[
    {id:'mow',title:'Lawn mowing',short:'Cut, edge and clippings taken away. Up to 200 m².',price:30,unit:'per visit',dur:45,recur:true,img:P('garden2')},
    {id:'hedge',title:'Hedge trimming',short:'Shaped and tidied, all cuttings removed.',price:45,unit:'from',dur:60,img:P('hedge1')},
    {id:'tidy',title:'Garden tidy & clearance',short:'Beds, borders, weeds, the lot. Half a day.',price:120,unit:'half day',dur:240,img:P('garden3')},
    {id:'prune',title:'Tree & shrub pruning',short:'Fruit trees, shrubs and small trees. Removal quoted.',price:80,unit:'from',dur:90,img:P('garden5')},
    {id:'care',title:'Garden care plan',short:'Fortnightly visit, mow, edge, borders, hedges in season.',price:89,unit:'per month',dur:0,recur:true,plan:true,img:P('garden1')}]},
  {id:'outside',icon:'home',title:'Outside the house',items:[
    {id:'fence',title:'Fence panel replacement',short:'Supply and fit a 6 ft panel. Posts extra if needed.',price:95,unit:'per panel',dur:60,img:P('hs4')},
    {id:'gutter',title:'Gutter clearing',short:'Whole house, ground and first floor, downpipes checked.',price:80,unit:'per house',dur:90,img:P('hs2')},
    {id:'wash',title:'Pressure washing',short:'Patio, path or driveway. Up to 40 m².',price:120,unit:'from',dur:150,img:P('hs3')},
    {id:'extpaint',title:'Exterior painting',short:'Fascias, doors, rendered walls. Quote from photos.',price:0,unit:'photo quote',dur:0,img:P('house2')}]},
  {id:'inside',icon:'paint',title:'Inside the house',items:[
    {id:'room',title:'Room painting & decorating',short:'Walls and ceiling, one room, prep included.',price:180,unit:'per room',dur:480,img:P('paint1')},
    {id:'handy',title:'Handyman hour',short:'Shelves, flat-pack, curtain poles, sealant, small fixes.',price:45,unit:'first hour · £35 after',dur:60,img:P('tools2')},
    {id:'bath',title:'Bathroom refresh',short:'Re-seal, re-grout, new fittings. Photo quote.',price:0,unit:'photo quote',dur:0,img:P('hm8')}]},
  {id:'access',icon:'shield-check',title:'Access & mobility',items:[
    {id:'ramp',title:'Access ramp',short:'Timber or modular ramp to your door, handrail included.',price:350,unit:'from',dur:300,img:P('hm1')},
    {id:'rails',title:'Grab rails & handrails',short:'Fitted where you need them. Up to 3.',price:65,unit:'from',dur:60,img:P('hm4')}]},
];
const ALL_ITEMS=CATS.flatMap(c=>c.items.map(i=>({...i,cat:c.title})));
const DAYS=[['Tue','16','Sep',3],['Wed','17','Sep',2],['Thu','18','Sep',0],['Fri','19','Sep',4],['Sat','20','Sep',1],['Mon','22','Sep',5],['Tue','23','Sep',5]];
const TIMES=[['08:00','Morning',true],['10:30','Late morning',true],['13:00','Afternoon',false],['15:30','Late afternoon',true]];
const BOOKINGS=[
  {id:'RB-1181',who:'me',item:'mow',when:'Thu 18 Sep · 10:30',status:'Confirmed',price:25.5,note:'Over-65 rate applied',recurring:'Fortnightly'},
  {id:'RB-1180',who:'paul',item:'fence',when:'Tue 16 Sep · 08:00',status:'On my way',price:190,note:'2 panels · posts OK'},
  {id:'RB-1179',who:'gemma',item:'room',when:'Tue 16 Sep · 10:30',status:'Today',price:180,note:'Lounge · Farrow & Ball Cornforth'},
  {id:'RB-1178',who:'arthur',item:'ramp',when:'Wed 17 Sep · 08:00',status:'Confirmed',price:298,note:'Over-65 rate · front door, 2 steps'},
  {id:'RB-1177',who:'nadia',item:'gutter',when:'Wed 17 Sep · 13:00',status:'Confirmed',price:80},
  {id:'RB-1176',who:'joan',item:'care',when:'Fri 19 Sep · 08:00',status:'Plan visit',price:0,note:'Garden care plan · fortnightly',recurring:'Fortnightly'},
  {id:'RB-1175',who:'steve',item:'wash',when:'Sat 20 Sep · 08:00',status:'Confirmed',price:120},
  {id:'RB-1174',who:'dev',item:'hedge',when:'Sat 13 Sep · 10:30',status:'Done',price:60,review:5},
];
const QUOTES=[
  {id:'PQ-88',who:'nadia',item:'extpaint',when:'Today 07:50',status:'new',txt:'Front of house fascias and the front door. Paint is peeling on the south side.',img:P('house2')},
  {id:'PQ-87',who:'dev',item:'bath',when:'Yesterday',status:'new',txt:'Shower seal gone black and two tiles cracked by the bath.',img:P('hm6')},
  {id:'PQ-86',who:'steve',item:'extpaint',when:'3 days ago',status:'sent',quote:640,txt:'Garden room exterior, two coats.',img:P('hs4')},
];
const REVIEWS=[
  {who:'joan',stars:5,txt:'Jamie has done my garden every fortnight for a year. Always on time, always tidy, and he charges me the pensioner rate without me asking.'},
  {who:'paul',stars:5,txt:'Two fence panels blown down on Sunday, booked online Sunday night, fixed Tuesday morning. Paid on the app. Easy.'},
  {who:'gemma',stars:5,txt:'Painted the lounge in a day. Sent photos when he finished because I was at work. Would recommend to anyone.'},
  {who:'arthur',stars:5,txt:'Built a ramp to my front door so I can get the wheelchair in on my own. Changed my week.'},
];
const AREAS=['Swanage','Wareham','Corfe Castle','Poole','Wimborne','Blandford','Dorchester','Weymouth'];
