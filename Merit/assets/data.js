/* ==========================================================
   MERIT · demo data (fictional)
   ========================================================== */
const IMG = 'assets/img/';
const USER = { name:'Femi Adeyemi', first:'Femi', area:'Mayfair, London', avatar:'me.jpg', balance:1240.50, points:3860, tier:'Founding member', memberNo:'0001 0427', since:'Sep 2026' };

const CATS = [
  { id:'transport', name:'Transport', sub:'Rides', icon:'car', bg:'hero-transport.jpg',
    head:'Where shall we <em>take you</em>?',
    subs:[ {id:'ride',n:'Ride now',icon:'car'}, {id:'schedule',n:'Schedule',icon:'clock'}, {id:'airport',n:'Airport',icon:'plane'}, {id:'chauffeur',n:'Chauffeur',icon:'key'} ] },
  { id:'dining', name:'Dining', sub:'Kitchens', icon:'fork', bg:'hero-dining.jpg',
    head:'What are you <em>hungry</em> for?',
    subs:[ {id:'order',n:'Order in',icon:'bag'}, {id:'table',n:'Book a table',icon:'calendar'}, {id:'collect',n:'Collection',icon:'store'}, {id:'kitchens',n:'Merit Kitchens',icon:'chef'} ] },
  { id:'build', name:'Build & Property', sub:'Homes', icon:'hammer', bg:'hero-build.jpg',
    head:'Find the right <em>people</em>.',
    subs:[ {id:'builders',n:'Builders',icon:'hammer'}, {id:'architects',n:'Architects & design',icon:'ruler'}, {id:'buy',n:'Buy a home',icon:'home'}, {id:'sell',n:'Sell a home',icon:'send'} ] },
  { id:'design', name:'Designer', sub:'Atelier', icon:'hanger', bg:'hero-design.jpg',
    head:'Dress on <em>merit</em>.',
    subs:[ {id:'newin',n:'New in',icon:'sparkle'}, {id:'designers',n:'Designers',icon:'users'}, {id:'bespoke',n:'Made to measure',icon:'scissors'}, {id:'window',n:'Merit Window',icon:'store'} ] },
];

/* ---------- transport ---------- */
const DESTS = [
  { id:'lhr',  n:'Heathrow Terminal 5', s:'Longford, TW6 2GA', d:'14.2 mi', min:52, icon:'plane', prices:{go:58.00, exec:84.00, xl:72.00, chauffeur:140.00} },
  { id:'shard',n:'The Shard', s:'32 London Bridge St, SE1', d:'3.8 mi', min:22, icon:'building', prices:{go:18.40, exec:28.00, xl:24.00, chauffeur:52.00} },
  { id:'kgx',  n:'King’s Cross St Pancras', s:'Euston Rd, N1C', d:'2.9 mi', min:17, icon:'train', prices:{go:14.20, exec:22.00, xl:19.00, chauffeur:44.00} },
  { id:'home', n:'Home', s:'Elgin Crescent, Notting Hill W11', d:'2.4 mi', min:14, icon:'home', prices:{go:12.60, exec:19.00, xl:16.00, chauffeur:38.00} },
];
const TIERS = [
  { id:'go',        n:'Merit Go',        s:'Everyday · up to 4', img:'car-go.jpg',   eta:3 },
  { id:'exec',      n:'Merit Exec',      s:'Premium saloon · up to 4', img:'car-blue.jpg', eta:5 },
  { id:'xl',        n:'Merit XL',        s:'SUV · up to 6 · luggage', img:'car-xl.jpg', eta:6 },
  { id:'chauffeur', n:'Merit Chauffeur', s:'Suited driver · by the hour', img:'car-exec.jpg', eta:8, star:true },
];
const DRIVERS = {
  go:        { n:'Marcus Bello',  img:'driver-go.jpg',        plate:'LK21 MRT', car:'BMW 5 Series · White', rating:'4.96', trips:'2,140' },
  exec:      { n:'Tomasz Nowak',  img:'driver-xl.jpg',        plate:'MT70 EXC', car:'BMW M5 · Blue', rating:'4.98', trips:'1,860' },
  xl:        { n:'Tomasz Nowak',  img:'driver-xl.jpg',        plate:'LR68 XLM', car:'Honda CR-V · White', rating:'4.98', trips:'1,860' },
  chauffeur: { n:'James Okoro',   img:'driver-chauffeur.jpg', plate:'MER 1T',   car:'Porsche Panamera · Black', rating:'5.00', trips:'940' },
};

/* ---------- dining ---------- */
const RESTAURANTS = [
  { id:'iyaloja', n:'Ìyálọja by Merit', cuisine:'Modern Nigerian', area:'Mayfair', img:'rest-warm.jpg', rating:'4.9', time:'25–35 min', price:'£££', merit:true, tags:['kitchens','nigerian'],
    blurb:'Merit’s flagship kitchen. Wood-grilled croaker, slow-cooked stews and the best puff-puff in W1.',
    menu:[
      { id:'croaker', n:'Grilled Croaker & Yaji', d:'Whole croaker, wood-grilled, yaji spice, charred plantain', p:24, img:'dish-fish.jpg' },
      { id:'efo',     n:'Efo Riro & Pounded Yam', d:'Spinach stew, smoked fish, assorted meats', p:19, img:'dish-efo.jpg' },
      { id:'okra',    n:'Seafood Okra', d:'Prawns, crab, okra, palm oil, rice', p:22, img:'dish-stew.jpg' },
      { id:'suya',    n:'Suya Platter', d:'Beef & chicken suya, onions, tomato, kuli-kuli', p:18, img:'dish-platter.jpg' },
      { id:'puff',    n:'Puff-Puff & Salted Caramel', d:'Warm, dusted, dipping caramel', p:9, img:'dish-dessert.jpg' },
    ] },
  { id:'sable', n:'Sable & Rye', cuisine:'Modern British', area:'Marylebone', img:'rest-modern.jpg', rating:'4.8', time:'30–40 min', price:'£££', tags:['british'],
    blurb:'Open fire cooking, British produce, a serious wine list.',
    menu:[
      { id:'ribeye', n:'Ribeye & Frites', d:'35-day aged, béarnaise, triple-cooked frites', p:32, img:'dish-steak.jpg' },
      { id:'salmon', n:'Roast Salmon', d:'Herb crème fraîche, spring greens', p:26, img:'dish-salmon.jpg' },
      { id:'garden', n:'Garden Bowl', d:'Avocado, heritage tomato, chickpea, tahini', p:14, img:'dish-salad.jpg' },
      { id:'pavlova',n:'Berry Pavlova', d:'Meringue, Chantilly, summer berries', p:10, img:'dish-cake.jpg' },
    ] },
  { id:'lumiere', n:'Casa Lumière', cuisine:'Italian', area:'Soho', img:'rest-cafe.jpg', rating:'4.7', time:'20–30 min', price:'££', tags:['italian'],
    blurb:'Neapolitan dough, 72-hour ferment, wood-fired in ninety seconds.',
    menu:[
      { id:'marg', n:'Wood-fired Margherita', d:'San Marzano, fior di latte, basil', p:16, img:'dish-pizza.jpg' },
      { id:'ribs', n:'Smoked Short Ribs', d:'Slow smoked, chimichurri, pickles', p:24, img:'dish-ribs.jpg' },
      { id:'bowl', n:'Salmon Poke Bowl', d:'Sushi rice, edamame, pickled ginger', p:15, img:'dish-bowl.jpg' },
    ] },
  { id:'harbour', n:'Harbour House', cuisine:'Seafood', area:'Canary Wharf', img:'rest-water.jpg', rating:'4.8', time:'35–45 min', price:'£££', tags:['seafood'],
    blurb:'Day-boat fish on the water. Book the terrace.',
    menu:[
      { id:'cured', n:'Cured Salmon & Greens', d:'Citrus cure, courgette ribbons', p:23, img:'dish-salmon2.jpg' },
      { id:'poke',  n:'Tuna Poke', d:'Sushi grade, avocado, sesame', p:17, img:'dish-bowl.jpg' },
    ] },
  { id:'morning', n:'The Morning Room', cuisine:'Brunch', area:'Chelsea', img:'rest-brunch.jpg', rating:'4.6', time:'15–25 min', price:'££', tags:['brunch'],
    blurb:'All-day brunch, proper coffee, sunlit corners.',
    menu:[
      { id:'eggs', n:'Eggs & Greens', d:'Soft eggs, spinach, sourdough', p:12, img:'dish-salad.jpg' },
      { id:'salad2', n:'Rainbow Bowl', d:'Grains, roasted veg, herb dressing', p:13, img:'dish-bowl.jpg' },
    ] },
  { id:'buka', n:'Buka House', cuisine:'Nigerian · Street food', area:'Peckham', img:'dish-platter.jpg', rating:'4.7', time:'20–30 min', price:'££', tags:['nigerian'],
    blurb:'Jollof, suya and pepper soup from a proper buka. Loud, fast, brilliant.',
    menu:[ { id:'jollof', n:'Smoky Jollof & Chicken', d:'Party jollof, grilled thigh, plantain', p:14, img:'dish-platter.jpg' }, { id:'pepper', n:'Goat Pepper Soup', d:'Uziza, scent leaf, yam', p:12, img:'dish-stew.jpg' }, { id:'moi', n:'Moi Moi & Ogi', d:'Steamed bean pudding, fermented corn', p:8, img:'dish-efo.jpg' } ] },
  { id:'koji', n:'Kōji Omakase', cuisine:'Japanese', area:'Fitzrovia', img:'dish-bowl.jpg', rating:'4.9', time:'Dine-in · book', price:'££££', tags:['japanese'],
    blurb:'Twelve seats, sixteen courses, one chef. Merit members get first release on Friday seats.',
    menu:[ { id:'omakase', n:'Omakase · 16 courses', d:'Chef’s selection, evening sitting', p:120, img:'dish-bowl.jpg' }, { id:'chirashi', n:'Chirashi Bowl', d:'Lunch only · 9 cuts over rice', p:28, img:'dish-salmon2.jpg' } ] },
  { id:'saffron', n:'Saffron & Salt', cuisine:'Indian · Modern', area:'Marylebone', img:'dish-stew.jpg', rating:'4.8', time:'30–40 min', price:'£££', tags:['indian'],
    blurb:'Coastal Indian cooking with a tandoor at the centre of the room.',
    menu:[ { id:'prawn', n:'Kerala Prawn Curry', d:'Coconut, curry leaf, tamarind', p:24, img:'dish-stew.jpg' }, { id:'lamb', n:'Tandoori Lamb Chops', d:'Yoghurt, kashmiri chilli', p:26, img:'dish-ribs.jpg' }, { id:'dal', n:'Black Dal', d:'24-hour slow cooked', p:11, img:'dish-salad.jpg' } ] },
  { id:'butcher', n:'The Butcher’s Table', cuisine:'Steak & grill', area:'Shoreditch', img:'dish-steak.jpg', rating:'4.8', time:'35–45 min', price:'£££', tags:['british','steak'],
    blurb:'Dry-aged British beef over English oak.',
    menu:[ { id:'tomahawk', n:'Tomahawk for two', d:'1.2kg, 45-day aged, bone marrow', p:98, img:'dish-steak.jpg' }, { id:'shortrib', n:'Smoked Short Rib', d:'Chimichurri, pickles', p:26, img:'dish-ribs.jpg' } ] },
  { id:'yard', n:'Yard & Rum', cuisine:'Caribbean', area:'Brixton', img:'dish-ribs.jpg', rating:'4.6', time:'25–35 min', price:'££', tags:['caribbean'],
    blurb:'Jerk over pimento wood, rum punch by the jug.',
    menu:[ { id:'jerk', n:'Jerk Chicken & Rice ’n’ Peas', d:'Pimento smoked, scotch bonnet', p:15, img:'dish-ribs.jpg' }, { id:'curry', n:'Curry Goat', d:'Slow cooked, fried dumplings', p:17, img:'dish-stew.jpg' } ] },
  { id:'verde', n:'Verde', cuisine:'Plant-based', area:'Notting Hill', img:'dish-salad.jpg', rating:'4.7', time:'20–30 min', price:'££', tags:['vegan','brunch'],
    blurb:'Vegetables treated like the main event. All-day.',
    menu:[ { id:'bowl2', n:'Roast Squash Bowl', d:'Freekeh, harissa, tahini', p:14, img:'dish-salad.jpg' }, { id:'pav', n:'Coconut Pavlova', d:'Passion fruit, mint', p:9, img:'dish-cake.jpg' } ] },
  { id:'lantern', n:'Little Lantern', cuisine:'Sichuan', area:'Chinatown', img:'dish-pizza.jpg', rating:'4.7', time:'25–35 min', price:'££', tags:['chinese'],
    blurb:'Numbing, fiery, unmissable dan dan noodles.',
    menu:[ { id:'dandan', n:'Dan Dan Noodles', d:'Pork, sesame, Sichuan pepper', p:13, img:'dish-bowl.jpg' }, { id:'mapo', n:'Mapo Tofu', d:'Fermented bean, minced beef', p:14, img:'dish-stew.jpg' } ] },
];
const COURIER = { n:'Dele A.', img:'courier.jpg', vehicle:'Merit e-bike' };
const TIMES = ['12:30','13:00','13:30','19:00','19:30','20:00','20:30','21:00'];

/* ---------- build & property ---------- */
const PROVIDER_CATS = [
  { id:'all', n:'All' }, { id:'builders', n:'Builders' }, { id:'architects', n:'Architects & design' }, { id:'trades', n:'Trades' }, { id:'agents', n:'Estate agents' }, { id:'surveyors', n:'Surveyors' },
];
const PROVIDERS = [
  { id:'hartwell',  n:'Hartwell Construction', cat:'builders', s:'Main contractor · renovations, extensions, new builds', area:'West London', img:'pro-pm.jpg', cover:'build-site.jpg', rating:'4.8', jobs:'61 Merit jobs', replies:'Replies within 2 hours', verified:true,
    about:'Family-run main contractor, FMB member, working across Kensington, Chelsea and Notting Hill since 2004. Full renovations, rear and loft extensions, new-build homes.', services:['Whole-house renovation','Extensions','New build','Loft conversion'], gal:['build-site.jpg','build-site2.jpg','home-int-1.jpg'] },
  { id:'okonkwo',   n:'Okonkwo & Reid', cat:'architects', s:'RIBA chartered architects · residential', area:'Shoreditch', img:'pro-architect.jpg', cover:'build-drawing.jpg', rating:'4.9', jobs:'38 Merit jobs', replies:'Replies within a day', verified:true,
    about:'Award-winning residential practice. Planning applications, concept to construction drawings, interior architecture.', services:['Planning & design','Construction drawings','Interior architecture','Party wall'], gal:['build-drawing.jpg','build-plans.jpg','home-int-2.jpg'] },
  { id:'brightline',n:'Brightline M&E', cat:'trades', s:'Electrical & mechanical · NICEIC registered', area:'Greater London', img:'pro-surveyor.jpg', cover:'build-electric.jpg', rating:'4.7', jobs:'22 Merit jobs', replies:'Replies within 4 hours', verified:true,
    about:'Rewires, consumer units, EV chargers, underfloor heating and smart-home installs.', services:['Rewiring','Heating','EV charging','Smart home'], gal:['build-electric.jpg','build-weld.jpg'] },
  { id:'meritprop', n:'Merit Property', cat:'agents', s:'Sales & lettings · prime London', area:'Mayfair', img:'host.jpg', cover:'home-7.jpg', rating:'4.9', jobs:'140 Merit clients', replies:'Replies within an hour', verified:true, merit:true,
    about:'Merit’s in-house agency. Valuations, sales, lettings and acquisitions across prime London and the Home Counties.', services:['Free valuation','Sell my home','Buy-side search','Lettings'], gal:['home-7.jpg','home-2.jpg','home-int-3.jpg'] },
  { id:'cedarsurv', n:'Cedar Surveying', cat:'surveyors', s:'RICS building surveys & valuations', area:'Richmond', img:'p-14.jpg', cover:'build-modern.jpg', rating:'4.8', jobs:'54 Merit jobs', replies:'Replies within a day', verified:true,
    about:'Level 2 and Level 3 surveys, valuations and snagging inspections.', services:['Building survey','Valuation','Snagging'], gal:['build-modern.jpg','home-4.jpg'] },
  { id:'marlowjoin',n:'Marlow Joinery & Interiors', cat:'architects', s:'Bespoke kitchens, joinery & fit-out', area:'Battersea', img:'p-3.jpg', cover:'home-int-1.jpg', rating:'4.9', jobs:'29 Merit jobs', replies:'Replies within 3 hours', verified:true,
    about:'Handmade kitchens, wardrobes and full interior fit-outs in oak, walnut and painted timber.', services:['Kitchens','Wardrobes','Fit-out'], gal:['home-int-1.jpg','home-int-4.jpg'] },
];
const INQ_TYPES = ['Renovation','Extension','New build','Interiors','Valuation','Buying','Selling','Survey','Other'];
const INQ_WHEN = ['As soon as possible','Within 3 months','3–6 months','Just planning'];
const LISTINGS = [
  { id:'glass',   n:'The Glass House', area:'Hampstead, NW3', price:'£3,200,000', type:'Buy', beds:5, baths:4, sqft:'3,840', img:'home-2.jpg', gal:['home-2.jpg','home-int-1.jpg','home-int-2.jpg'], blurb:'A light-filled contemporary home with a heated pool, set back from the Heath. Architect-designed, finished to an exceptional standard.' },
  { id:'cedar',   n:'Cedar Court', area:'Richmond, TW10', price:'£1,850,000', type:'Buy', beds:4, baths:3, sqft:'2,610', img:'home-1.jpg', gal:['home-1.jpg','home-int-3.jpg','home-int-4.jpg'], blurb:'Timber and glass pavilion house on a private plot moments from the river.' },
  { id:'marlow',  n:'Marlow Villa', area:'Surrey Hills, GU5', price:'£2,400,000', type:'Buy', beds:5, baths:5, sqft:'4,120', img:'home-6.jpg', gal:['home-6.jpg','home-7.jpg','home-int-1.jpg'], blurb:'Infinity pool, panoramic terrace and views to the Downs.' },
  { id:'river',   n:'Riverside Loft', area:'Battersea, SW11', price:'£4,200 pcm', type:'Rent', beds:2, baths:2, sqft:'1,290', img:'home-int-2.jpg', gal:['home-int-2.jpg','home-int-3.jpg'], blurb:'Double-height loft with a sculptural staircase and river views.' },
  { id:'kens',    n:'Kensington Garden Flat', area:'Kensington, W8', price:'£1,100,000', type:'Buy', beds:2, baths:2, sqft:'980', img:'home-int-3.jpg', gal:['home-int-3.jpg','home-int-4.jpg'], blurb:'Period conversion with a private garden and original detailing.' },
  { id:'highgate',n:'Modernist House', area:'Highgate, N6', price:'£2,750,000', type:'Buy', beds:4, baths:3, sqft:'3,050', img:'home-4.jpg', gal:['home-4.jpg','home-5.jpg','home-int-1.jpg'], blurb:'Cor-ten steel and cedar, courtyard garden, studio annexe.' },
];
const AGENT = { n:'Priya Raman', s:'Merit Property · Senior negotiator', img:'host.jpg' };

/* ---------- designer ---------- */
const DESIGNERS = [
  { id:'adaeze', n:'Adaeze Okonkwo', s:'Ankara couture', from:'Lagos · London', img:'designer-adaeze.jpg', cover:'hero-design.jpg', bio:'Adaeze cuts West African wax prints into sharp, modern silhouettes. Every piece is made to order in her Peckham studio.' },
  { id:'kwame',  n:'Kwame Mensah',   s:'Leather & tailoring', from:'Accra · London', img:'designer-kwame.jpg', cover:'look-green.jpg', bio:'Vegetable-tanned leather and relaxed tailoring, cut for movement.' },
  { id:'nia',    n:'Nia Charles',    s:'Streetwear', from:'Brixton', img:'designer-nia.jpg', cover:'look-yellow.jpg', bio:'Colour-saturated streetwear in organic cotton, made in small runs.' },
  { id:'theo',   n:'Theo Laurent',   s:'Suiting', from:'Paris · London', img:'designer-theo.jpg', cover:'rack-2.jpg', bio:'Unstructured suiting in Italian wool. Made to measure in ten days.' },
  { id:'zuri',   n:'Zuri Adebayo',   s:'Prints & knit', from:'Shoreditch', img:'designer-zuri.jpg', cover:'rack-3.jpg', bio:'Hand-loomed knits and bold, joyful prints.' },
  { id:'lola',   n:'Lola Bassey',     s:'Evening wear', from:'Mayfair', img:'p-22.jpg', cover:'shopping.jpg', bio:'Silk, sequins and bias cuts for nights that matter. Made to measure in fourteen days.' },
  { id:'marcus', n:'Marcus Hale',     s:'Sneakers & accessories', from:'Hackney', img:'p-20.jpg', cover:'prod-denim.jpg', bio:'Hand-finished trainers and leather goods in tiny numbered runs.' },
  { id:'ines',   n:'Inès Dupont',     s:'Knitwear', from:'Notting Hill', img:'p-23.jpg', cover:'rack-1.jpg', bio:'Slow knitwear in British wool. Nothing is made until it is ordered.' },
  { id:'tariq',  n:'Tariq Osei',      s:'Outerwear', from:'Camden', img:'p-3.jpg', cover:'window-2.jpg', bio:'Technical coats with a tailor’s eye. Waxed cotton, recycled down.' },
];
const PRODUCTS = [
  { id:'poncho', n:'Fringe Poncho', by:'zuri',  p:185, img:'prod-poncho.jpg', tag:'New', d:'Hand-loomed cotton', sizes:['XS','S','M','L'], colors:['#EFE6D2','#2F3A34','#A97A31'] },
  { id:'bomber', n:'Terracotta Bomber', by:'nia', p:240, img:'prod-bomber.jpg', tag:'New', d:'Recycled nylon, ribbed trim', sizes:['S','M','L','XL'], colors:['#C67B5C','#16191D','#5B6E5E'] },
  { id:'denim',  n:'Selvedge Denim Set', by:'kwame', p:160, img:'prod-denim.jpg', d:'Japanese selvedge, raw', sizes:['28','30','32','34','36'], colors:['#2E3F55','#16191D'] },
  { id:'access', n:'Heritage Accessories', by:'adaeze', p:95, img:'prod-access.jpg', tag:'Made to order', d:'Leather purse & bead set', sizes:['One size'], colors:['#A97A31','#16191D'] },
  { id:'knit',   n:'Rust Knit & Denim', by:'zuri', p:120, img:'prod-knit.jpg', d:'Merino knit, relaxed fit', sizes:['XS','S','M','L'], colors:['#B65E3B','#EFE6D2'] },
  { id:'tee',    n:'Essentials Tee Set', by:'nia', p:75, img:'prod-tee.jpg', d:'3 × organic cotton', sizes:['S','M','L','XL'], colors:['#FFFFFF','#16191D','#8B9299'] },
  { id:'shirt',  n:'Chambray Overshirt', by:'theo', p:110, img:'prod-shirt.jpg', d:'Washed chambray', sizes:['S','M','L','XL'], colors:['#9FB6C6','#EFE6D2'] },
  { id:'dress',  n:'Floral Wrap Dress', by:'adaeze', p:210, img:'prod-dress.jpg', tag:'Made to order', d:'Silk-cotton, hand-finished', sizes:['6','8','10','12','14'], colors:['#EFE6D2','#7A3E6B'] },
  { id:'track',  n:'Sunset Tracksuit', by:'nia', p:190, img:'look-yellow.jpg', d:'Brushed organic cotton', sizes:['S','M','L'], colors:['#E7B534','#16191D'] },
  { id:'pin',    n:'Pinstripe Wide-Leg', by:'kwame', p:165, img:'look-green.jpg', d:'Wool blend, high rise', sizes:['28','30','32','34'], colors:['#16191D','#2F3A34'] },
  { id:'gown',   n:'Bias-Cut Silk Gown', by:'lola', p:480, img:'shopping.jpg', tag:'Made to order', d:'Silk charmeuse, hand-rolled hem', sizes:['6','8','10','12','14'], colors:['#16191D','#7A3E6B','#A97A31'] },
  { id:'runner', n:'Numbered Runner 04', by:'marcus', p:220, img:'prod-denim.jpg', tag:'New', d:'Suede & leather, run of 50', sizes:['6','7','8','9','10','11'], colors:['#EFE6D2','#16191D'] },
  { id:'cardi',  n:'Chunky Wool Cardigan', by:'ines', p:210, img:'rack-1.jpg', tag:'Made to order', d:'Bluefaced Leicester wool', sizes:['XS','S','M','L'], colors:['#EFE6D2','#B65E3B','#2F3A34'] },
  { id:'wax',    n:'Waxed Field Coat', by:'tariq', p:340, img:'window-2.jpg', d:'Waxed cotton, recycled down', sizes:['S','M','L','XL'], colors:['#2F3A34','#16191D'] },
  { id:'clutch', n:'Folded Leather Clutch', by:'marcus', p:140, img:'prod-access.jpg', d:'Vegetable-tanned, numbered', sizes:['One size'], colors:['#A97A31','#16191D'] },
  { id:'beanie', n:'Rib Beanie', by:'ines', p:55, img:'prod-knit.jpg', d:'British wool', sizes:['One size'], colors:['#B65E3B','#EFE6D2','#2F3A34'] },
];
const WINDOWS = [
  { id:'regent', n:'Merit Window · Regent Street', s:'Adaeze Okonkwo × Zuri Adebayo · until 28 Sep', img:'window-1.jpg' },
  { id:'carnaby', n:'Merit Window · Carnaby', s:'Nia Charles · opens 3 Oct', img:'window-2.jpg' },
];

/* ---------- seeded activity & wallet ---------- */
const ACTIVITY_SEED = [
  { id:'a1', mod:'transport', n:'Ride to King’s Cross', s:'Tue 2 Sep · Merit Go · Marcus B.', v:14.20, img:'car-go.jpg', status:'Completed' },
  { id:'a2', mod:'dining', n:'Sable & Rye', s:'Sun 31 Aug · Delivery · 3 items', v:48.50, img:'dish-steak.jpg', status:'Delivered' },
  { id:'a3', mod:'design', n:'Heritage Accessories', s:'Fri 29 Aug · Adaeze Okonkwo', v:95.00, img:'prod-access.jpg', status:'Delivered' },
  { id:'a4', mod:'build', n:'Inquiry · Hartwell Construction', s:'Kitchen renovation · Notting Hill · replied Wed', v:0, img:'build-plans.jpg', status:'Replied', live:true, thread:'hartwell' },
  { id:'a5', mod:'transport', n:'Heathrow T5 · Chauffeur', s:'Mon 25 Aug · James O.', v:140.00, img:'car-exec.jpg', status:'Completed' },
];
const WALLET_SEED = [
  { n:'Top up · HSBC •• 4417', s:'Wed 3 Sep', v:+500, mod:'finance' },
  { n:'Ride to King’s Cross', s:'Tue 2 Sep', v:-14.20, mod:'transport' },
  { n:'Sable & Rye', s:'Sun 31 Aug', v:-48.50, mod:'dining' },
  { n:'Heritage Accessories', s:'Fri 29 Aug', v:-95.00, mod:'design' },
  { n:'Merit Points cashback', s:'Thu 28 Aug', v:+42.00, mod:'merit' },
];
const PICKS = [
  { mod:'dining', k:'Merit Kitchens', h:'Croaker night at Ìyálọja', p:'Table for two, tonight from 19:00', img:'dish-fish.jpg', go:'restaurant', p2:'iyaloja' },
  { mod:'design', k:'Designer of the week', h:'Adaeze Okonkwo', p:'New ankara capsule · made to order', img:'designer-adaeze.jpg', go:'designer', p2:'adaeze' },
  { mod:'build', k:'Just listed', h:'The Glass House, Hampstead', p:'£3.2m · 5 bed · pool', img:'home-2.jpg', go:'listing', p2:'glass' },
  { mod:'transport', k:'Chauffeur', h:'Heathrow, door to gate', p:'Fixed £140 · flight tracked', img:'car-exec.jpg', go:'tiers', p2:'airport' },
];
const NOTIFS = [
  { n:'Hartwell Construction replied', s:'“Happy to visit Tue or Thu next week — which suits?”', mod:'build', t:'2h' },
  { n:'Adaeze dropped 6 new pieces', s:'Made to order · ships in 10 days', mod:'design', t:'5h' },
  { n:'£42 Merit Points cashback landed', s:'Across 4 services this month', mod:'merit', t:'1d' },
];

/* seeded inquiry thread (Kayleb-style: the provider comes back to you in the app) */
const THREADS = {
  hartwell: [
    { me:true,  t:'Tue 2 Sep, 18:20', m:'Hi — we’d like to open our kitchen into the garden room at Elgin Crescent, W11. Crittall doors, underfloor heating, keep the original floorboards. Could you come and look?' },
    { me:false, t:'Wed 3 Sep, 08:05', m:'Morning Femi, thanks for the inquiry. That’s very much our kind of job. Happy to visit Tue or Thu next week — which suits? Sam, Hartwell.' },
  ],
};
