/* OPERATION POSEIDON · seeded demo data (all fictional except brand) */
const IMG='../assets/img/';
const LOGO='../assets/logo/opposeidon.png';
const P=n=>IMG+n+'.jpg';
const gbp=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:0,maximumFractionDigits:0});
const gbp2=n=>'£'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});

const PEOPLE={
  jamie:{n:'Jamie Doxey',role:'Founder · Surf therapy lead',img:P('p11')},
  me:{n:'Tom Whitfield',role:'Member since Mar 2026',img:P('man2'),first:'Tom'},
  hannah:{n:'Hannah Reid',role:'Volunteer water safety',img:P('p2')},
  liam:{n:'Liam Osei',role:'Retreat alumni',img:P('p3')},
  sophie:{n:'Sophie Marsh',role:'Member',img:P('p6')},
  dan:{n:'Dan Pritchard',role:'Ex-Forces · Member',img:P('p5')},
  ellie:{n:'Ellie Cox',role:'Member',img:P('p4')},
  ryan:{n:'Ryan Booth',role:'Applicant',img:P('man5')},
  grace:{n:'Grace Adeyemi',role:'Applicant',img:P('p9')},
  mark:{n:'Mark Sullivan',role:'Applicant',img:P('man1')},
  amy:{n:'Amy Clarke',role:'Member',img:P('p12')},
  josh:{n:'Josh Lowe',role:'Member',img:P('man3')},
  kate:{n:'Kate Turner',role:'Volunteer · Yoga',img:P('p8')},
};

const RETREATS=[
  {id:'r1',title:'Autumn Reset · Jurassic Coast',type:'Weekend retreat',loc:'Kimmeridge Bay, Dorset',start:'2026-10-03',end:'2026-10-04',day:'03',mon:'Oct',dates:'Sat 3 – Sun 4 Oct 2026',nights:'1 night · 2 days',cap:12,booked:9,free:4,price:245,deposit:60,img:P('surf4'),gal:[P('surf4'),P('grp3'),P('canopy1')],lead:'jamie',level:'All levels',
    blurb:'Two days of surf, breathwork and honest conversation on the cliffs and in the water. Wetsuits, boards and a hot meal round the fire every evening included.',
    desc:'The Autumn Reset is our flagship weekend. You arrive on Saturday morning, we get you into the water before you have time to overthink it, and by Sunday afternoon most people have caught their first green wave and said something out loud they have been carrying for years. There is no pressure to perform in the sea or in the circle. Water safety cover is in place at all times.',
    itin:[['Sat 08:30','Arrive & brew','Kit fitting, safety brief, cold water shock talk on the shingle.'],['Sat 10:00','Session one','Whitewater, pop-ups, learning to fall well. Small groups of four.'],['Sat 14:00','Reflection walk','Cliff path to Chapman’s Pool. Walk-and-talk in pairs.'],['Sat 18:30','Fire & food','Chilli, stories, no phones.'],['Sun 07:00','Dawn dip','Optional. Nobody has ever regretted it.'],['Sun 10:30','Session two','Green waves for those ready, more whitewater for those not.'],['Sun 15:00','Close the circle','Where next. Home by teatime.']],
    tags:['Free places available']},
  {id:'r2',title:'Veterans’ Blue Space Week',type:'5-day residential',loc:'Bantham, South Devon',start:'2026-10-19',end:'2026-10-23',day:'19',mon:'Oct',dates:'Mon 19 – Fri 23 Oct 2026',nights:'4 nights · 5 days',cap:8,booked:8,free:8,price:0,deposit:0,img:P('grp4'),gal:[P('grp4'),P('surf5'),P('surfK')],lead:'jamie',level:'Ex-Forces only',
    blurb:'A fully funded week for serving and ex-serving personnel. Surf, coasteering, kayaking and the sort of talking that only happens after a cold sea.',
    desc:'Built by a Royal Marine for people who have served. Every place is free, funded by our forestry work and by the members and shop customers of this platform. Waitlist open.',
    itin:[['Mon','Arrive & settle','Bunkhouse, kit, first paddle-out.'],['Tue','Surf & breathwork','Two sessions, Wim Hof style breathwork on the beach.'],['Wed','Coasteering','Jumping off things into the sea. Optional but encouraged.'],['Thu','Sea kayak','Estuary paddle, lunch on a sandbar.'],['Fri','Dawn dip & close','Plans for keeping the water in your week.']],
    tags:['Fully funded','Waitlist']},
  {id:'r3',title:'Winter Dip Day',type:'Single day',loc:'Lulworth Cove, Dorset',start:'2026-11-14',end:'2026-11-14',day:'14',mon:'Nov',dates:'Sat 14 Nov 2026',nights:'1 day',cap:16,booked:5,free:6,price:45,deposit:0,img:P('surfF'),gal:[P('surfF'),P('surf3'),P('grp7')],lead:'hannah',level:'Beginner friendly',
    blurb:'Cold water done properly. Learn the breathing, get in, get out, warm up with soup. Ideal first step before a full retreat.',
    desc:'A gentle introduction to cold water. We teach you what cold water shock actually is and how to breathe through it, then get in together. No swimming ability needed beyond standing depth.',
    itin:[['09:30','Brief & breathe','Cold water shock, the science and the practice.'],['10:30','The dip','Two minutes. Then three. Then whatever you like.'],['12:00','Soup & stories','Warm up, talk it through.']],
    tags:['Free places available']},
  {id:'r4',title:'Spring Surf Camp',type:'Weekend retreat',loc:'Kimmeridge Bay, Dorset',start:'2027-03-27',end:'2027-03-28',day:'27',mon:'Mar',dates:'Sat 27 – Sun 28 Mar 2027',nights:'1 night · 2 days',cap:12,booked:2,free:4,price:245,deposit:60,img:P('surfJ'),gal:[P('surfJ'),P('surfM'),P('grp2')],lead:'jamie',level:'All levels',
    blurb:'First warm-ish water of the year. Same format as the Autumn Reset with longer daylight and bigger smiles.',
    desc:'Our spring weekend. Longer days, more time in the water, and the whole cohort from winter dips coming back together.',
    itin:[['Sat 08:30','Arrive & brew','Kit fitting and safety brief.'],['Sat 10:00','Session one','Whitewater and pop-ups.'],['Sat 18:30','Fire & food','Stories round the fire.'],['Sun 10:30','Session two','Green waves.'],['Sun 15:00','Close the circle','Home by teatime.']],
    tags:['Early bird']},
];

const SESSIONS=[
  {id:'s1',title:'Dawn Dip',loc:'Kimmeridge',when:'Sat 19 Sep · 07:00',img:P('surf3'),price:0,spots:6,lead:'hannah'},
  {id:'s2',title:'Beginner surf lesson',loc:'Kimmeridge',when:'Sat 19 Sep · 10:00',img:P('surfG'),price:35,spots:3,lead:'jamie'},
  {id:'s3',title:'Sea kayak · Poole Harbour',loc:'Poole',when:'Sun 20 Sep · 09:30',img:P('grp6'),price:40,spots:4,lead:'jamie'},
  {id:'s4',title:'Intro to climbing · Portland',loc:'Portland',when:'Sat 26 Sep · 09:00',img:P('climb1'),price:40,spots:5,lead:'jamie'},
  {id:'s5',title:'Try dive · pool session',loc:'Weymouth',when:'Wed 30 Sep · 19:00',img:P('kayak2'),price:30,spots:2,lead:'jamie'},
];

const COURSES=[
  {id:'c1',cat:'Start here',title:'Welcome to Operation Poseidon',tier:'free',dur:'12 min',lessons:3,img:P('surf5'),lead:'jamie',blurb:'Who we are, why the sea, and what a retreat actually looks like from arrival to the drive home.',progress:100,
    ls:[['Why the sea heals','4:12',true],['What a retreat looks like','5:40',true],['How free places work','2:30',true]]},
  {id:'c2',cat:'Safety',title:'Cold Water Shock: what it is and how to breathe through it',tier:'free',dur:'28 min',lessons:5,img:P('surfG'),lead:'jamie',blurb:'The one thing everyone must watch before a winter dip. The physiology, the first 90 seconds, and the breathing that gets you through.',progress:60,
    ls:[['The gasp reflex','5:10',true],['The first ninety seconds','6:02',true],['Box breathing on the shingle','7:15',true],['Getting out and warming up','5:30',false],['When not to get in','4:20',false]]},
  {id:'c3',cat:'Safety',title:'Reading tides, rips and swell',tier:'free',dur:'34 min',lessons:4,img:P('surfL'),lead:'hannah',blurb:'How to look at a beach and know whether to get in. Tide tables, rip currents, and reading a forecast.',progress:0,
    ls:[['Tide tables without the maths','8:00',false],['Spotting a rip','9:30',false],['Reading a swell forecast','10:10',false],['Our local breaks','6:40',false]]},
  {id:'c4',cat:'Preparation',title:'Preparing for your retreat',tier:'free',dur:'18 min',lessons:4,img:P('grp3'),lead:'jamie',blurb:'Kit list, what to expect emotionally, and how to get the most out of two days.',progress:0,
    ls:[['What to pack','4:00',false],['The first morning','5:20',false],['The circle','4:45',false],['Aftercare','4:10',false]]},
  {id:'c5',cat:'Surf fundamentals',title:'Surf Fundamentals: whitewater to green waves',tier:'member',dur:'2 h 40 min',lessons:12,img:P('surf4'),lead:'jamie',blurb:'The full beginner programme. Paddling, pop-ups, positioning, and catching your first unbroken wave. Filmed at Kimmeridge.',progress:25,
    ls:[['Board, leash, wetsuit','8:00',true],['Paddling technique','12:30',true],['The pop-up on land','14:00',true],['Whitewater take-offs','16:20',false],['Falling well','9:10',false],['Positioning in the line-up','15:00',false],['Reading a wave','13:40',false],['Your first green wave','18:00',false],['Turning: the basics','16:30',false],['Etiquette and priority','10:00',false],['Surf fitness at home','14:00',false],['Where next','6:10',false]]},
  {id:'c6',cat:'Blue space practice',title:'Breathwork by the Sea',tier:'member',dur:'1 h 15 min',lessons:6,img:P('sea5'),lead:'kate',blurb:'Six guided practices to use on the beach, in the car park, or at 3am. Recorded live on the Jurassic Coast.',progress:0,
    ls:[['Arriving','10:00',false],['Box breathing','12:00',false],['Coherent breathing','14:00',false],['Before the dip','11:30',false],['After the dip','13:00',false],['Sleep','15:00',false]]},
  {id:'c7',cat:'Blue space practice',title:'Guided Reflections: the walk-and-talk toolkit',tier:'member',dur:'55 min',lessons:5,img:P('trunk1'),lead:'jamie',blurb:'The prompts and structure we use on retreat walks, so you can run one with a mate at home.',progress:0,
    ls:[['Why walking works','9:00',false],['The three questions','11:00',false],['Listening without fixing','12:30',false],['Running it with a friend','13:00',false],['Closing well','9:30',false]]},
  {id:'c8',cat:'Beyond surf',title:'Sea Kayak Foundations',tier:'member',dur:'1 h 30 min',lessons:7,img:P('grp6'),lead:'jamie',blurb:'From launching off a beach to reading an estuary. Taught by a qualified canoe and kayak instructor.',progress:0,
    ls:[['Kit and launching','12:00',false],['Forward paddling','13:00',false],['Turning','11:00',false],['Capsize and recovery','15:00',false],['Estuary reading','14:30',false],['Planning a paddle','13:00',false],['Our routes','11:30',false]]},
  {id:'c9',cat:'Beyond surf',title:'Rock & Rope: intro to climbing',tier:'member',dur:'1 h 05 min',lessons:5,img:P('climb1'),lead:'jamie',blurb:'Knots, belaying and your first top-rope on Portland limestone. Filmed with the Poseidon crew.',progress:0,
    ls:[['Harness and knots','14:00',false],['Belaying','15:00',false],['Movement basics','13:00',false],['Portland','12:30',false],['Fear and falling','10:30',false]]},
  {id:'c10',cat:'Live replays',title:'Live: Ask Jamie anything · September',tier:'member',dur:'48 min',lessons:1,img:P('canopy1'),lead:'jamie',blurb:'Replay of the monthly members’ call. Cold water in winter, how the veterans’ week is funded, and what happens in the circle.',progress:0,
    ls:[['Full replay','48:00',false]]},
];

const PRODUCTS=[
  {id:'m1',cat:'Merch',name:'Poseidon Wave Tee',price:24,funds:'Funds 1 dip day place',col:'#0E6B7C',type:'tee',stock:42},
  {id:'m2',cat:'Merch',name:'Reset Button Hoodie',price:48,funds:'Funds half a retreat place',col:'#0A2740',type:'hoodie',stock:18},
  {id:'m3',cat:'Merch',name:'Dawn Dip Beanie',price:16,funds:'Funds hot soup for a dip day',col:'#E2643C',type:'beanie',stock:60},
  {id:'m4',cat:'Merch',name:'Sticker pack · 6',price:6,funds:'Funds a wetsuit wash',col:'#5FBCCB',type:'sticker',stock:200},
  {id:'m5',cat:'Equipment',name:'Poseidon Changing Robe',price:79,was:95,funds:'Funds a full retreat place',col:'#0F3A57',type:'robe',stock:12},
  {id:'m6',cat:'Equipment',name:'Cold Water Swim Cap',price:14,funds:'Funds a dip day place',col:'#E2643C',type:'cap',stock:35},
  {id:'m7',cat:'Equipment',name:'Wetsuit Gloves & Boots set · 3mm',price:42,funds:'Funds half a retreat place',col:'#122129',type:'gloves',stock:9},
  {id:'m8',cat:'Equipment',name:'Tow Float · Poseidon orange',price:28,funds:'Funds a dip day place',col:'#F08662',type:'float',stock:22},
  {id:'m9',cat:'Bundles',name:'Retreat Ready Kit',price:129,was:163,funds:'Funds a full retreat place',col:'#0E6B7C',type:'bundle',stock:8},
  {id:'m10',cat:'Give',name:'Sponsor a free place',price:245,funds:'Funds one full retreat place',col:'#1E7F5C',type:'gift',stock:999},
];

const POSTS=[
  {id:'p1',who:'liam',when:'2 h ago',board:'Reflections',txt:'Six months since the Autumn Reset. Still doing the dawn dip every Saturday. Still using the three questions from the walk with my brother. Never thought a weekend would do that.',img:P('surf3'),likes:24,liked:false,replies:[['jamie','This is exactly why we do it Liam. See you in October.'],['sophie','Six months! Brilliant.']]},
  {id:'p2',who:'jamie',when:'Yesterday',board:'Announcements',txt:'Veterans’ Blue Space Week in October is now full. Eight places, all funded. If you missed out, the waitlist is open and the Spring dates go live next week. Thank you to everyone who bought a hoodie. That is genuinely what paid for two of those places.',likes:61,liked:true,replies:[['dan','Made the list. Thank you mate.']]},
  {id:'p3',who:'hannah',when:'Yesterday',board:'Dip of the Day',txt:'Kimmeridge this morning. 14°C, glassy, nobody else out. Three minutes then soup. Tide info and today’s photo below.',img:P('surfF'),likes:18,liked:false,replies:[]},
  {id:'p4',who:'sophie',when:'2 days ago',board:'Ask the crew',txt:'Doing my first Winter Dip Day in November and honestly a bit nervous about the cold. Anyone got tips beyond the cold water shock course?',likes:9,liked:false,replies:[['kate','Breathe out longer than you breathe in. And wear the beanie in the water, it changes everything.'],['ellie','I was the same. You will be fine, the group carries you.']]},
  {id:'p5',who:'dan',when:'3 days ago',board:'Reflections',txt:'Did not want to come. Wife made me. Best thing I have done since leaving the regiment. That is all.',likes:47,liked:false,replies:[['jamie','Proud of you Dan.']]},
];
const BOARDS=[['All posts','messages',0],['Announcements','bell',3],['Reflections','heart',28],['Dip of the Day','sunrise',112],['Ask the crew','life-buoy',19],['Wellbeing tips','leaf',14],['Autumn Reset cohort','users',9]];

const APPLICATIONS=[
  {id:'a1',who:'ryan',retreat:'r1',when:'Today 08:12',status:'new',ref:'Self-referral',txt:'Left the Army in 2024 and have not really settled. My GP suggested something outdoors. I cannot afford the £245 right now but I can bring my own wetsuit and I will help with anything on the day.',swim:'Confident',medical:'None declared'},
  {id:'a2',who:'grace',retreat:'r1',when:'Yesterday',status:'new',ref:'Referred by Dorset Mind',txt:'I have been signed off work with anxiety since June. A friend did your Winter Dip Day and said it was the first time she felt like herself in months.',swim:'Beginner',medical:'Asthma (inhaler)'},
  {id:'a3',who:'mark',retreat:'r3',when:'2 days ago',status:'approved',ref:'Self-referral',txt:'Recently bereaved. Not looking for therapy exactly, just to be in the sea with people who get it.',swim:'Confident',medical:'None declared'},
  {id:'a4',who:'amy',retreat:'r1',when:'4 days ago',status:'declined',ref:'Self-referral',txt:'Would love a free place but happy to pay if needed.',swim:'Confident',medical:'None declared',note:'Offered paid place with 50% bursary instead'},
];

const BOOKINGS=[
  {id:'B-2041',who:'me',retreat:'r1',type:'Paid place',paid:245,status:'Confirmed',when:'Today 09:41',new:true},
  {id:'B-2040',who:'sophie',retreat:'r3',type:'Paid place',paid:45,status:'Confirmed',when:'Today 08:20',new:true},
  {id:'B-2039',who:'dan',retreat:'r2',type:'Funded place',paid:0,status:'Confirmed',when:'Yesterday'},
  {id:'B-2038',who:'ellie',retreat:'r1',type:'Deposit',paid:60,status:'Deposit paid',when:'Yesterday'},
  {id:'B-2037',who:'mark',retreat:'r3',type:'Funded place',paid:0,status:'Confirmed',when:'2 days ago'},
  {id:'B-2036',who:'josh',retreat:'r1',type:'Paid place',paid:245,status:'Confirmed',when:'3 days ago'},
  {id:'B-2035',who:'liam',retreat:'r4',type:'Deposit',paid:60,status:'Deposit paid',when:'5 days ago'},
];

const ORDERS=[
  {id:'O-1188',who:'sophie',items:'Reset Button Hoodie ×1, Sticker pack ×1',tot:54,status:'To dispatch',when:'Today 10:02',new:true},
  {id:'O-1187',who:'josh',items:'Poseidon Changing Robe ×1',tot:79,status:'To dispatch',when:'Today 07:55',new:true},
  {id:'O-1186',who:'ellie',items:'Dawn Dip Beanie ×2',tot:32,status:'Dispatched',when:'Yesterday'},
  {id:'O-1185',who:'dan',items:'Sponsor a free place ×1',tot:245,status:'Complete',when:'Yesterday'},
  {id:'O-1184',who:'amy',items:'Poseidon Wave Tee ×1, Cold Water Swim Cap ×1',tot:38,status:'Dispatched',when:'2 days ago'},
  {id:'O-1183',who:'liam',items:'Retreat Ready Kit ×1',tot:129,status:'Complete',when:'4 days ago'},
];

const MEMBERS=[
  {who:'me',plan:'Crew · Monthly',since:'Mar 2026',status:'Active',ltv:66},
  {who:'sophie',plan:'Crew · Annual',since:'Jan 2026',status:'Active',ltv:99},
  {who:'dan',plan:'Free',since:'Aug 2026',status:'Active',ltv:0},
  {who:'ellie',plan:'Crew · Monthly',since:'May 2026',status:'Active',ltv:44},
  {who:'liam',plan:'Crew · Annual',since:'Nov 2025',status:'Active',ltv:99},
  {who:'josh',plan:'Crew · Monthly',since:'Jul 2026',status:'Past due',ltv:22},
  {who:'amy',plan:'Free',since:'Sep 2026',status:'Active',ltv:0},
];

const TESTIMONIALS=[
  {who:'dan',txt:'Did not want to come. Best thing I have done since leaving the regiment.'},
  {who:'sophie',txt:'I came for the surfing. I stayed for the people. The dawn dip group is now my week.'},
  {who:'liam',txt:'Six months on and I still use the three questions from the cliff walk. It changed how I talk to my brother.'},
];
