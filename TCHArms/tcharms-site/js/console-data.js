/* ==========================================================================
   TCH Arms Admin Console — seed data
   Stands in for the API. Everything the console edits lives here and is
   mirrored to localStorage so changes survive a reload during a demo.
   ========================================================================== */

const SEED = {

  /* ---------------------------------------------------------- product types
     A type carries the rules that apply to every product filed under it, so
     compliance behaviour is set once rather than per product.                */
  types: [
    { id: "firearm",   name: "Firearm",   requiresFFL: true,  ageLimit: 21, taxable: true,
      shipRate: 45.00, serialised: true,  note: "Ships to a licensed dealer only. Never to a home address." },
    { id: "accessory", name: "Accessory", requiresFFL: false, ageLimit: 18, taxable: true,
      shipRate: 9.50,  serialised: false, note: "Magazines and hardware. Check state capacity limits." },
    { id: "apparel",   name: "Apparel",   requiresFFL: false, ageLimit: 0,  taxable: true,
      shipRate: 9.50,  serialised: false, note: "Sized goods. Variants carry their own stock." },
    { id: "optics",    name: "Optics",    requiresFFL: false, ageLimit: 18, taxable: true,
      shipRate: 9.50,  serialised: false, note: "Sights and mounts." }
  ],

  /* ---------------------------------------------------------------- products */
  products: [
    { id: "rs9", type: "firearm", name: "RS9 Vampir", line: "Vampir", sku: "TCH-RS9-9MM",
      price: 1285.00, status: "active", img: "assets/guns/rs9-right.webp",
      caliber: "9mmx19", reorderPoint: 6,
      variants: [
        { id: "rs9-blk", label: "Black", sku: "TCH-RS9-9MM-BLK", delta: 0, stock: 14, status: "active" },
        { id: "rs9-fde", label: "FDE",   sku: "TCH-RS9-9MM-FDE", delta: 60, stock: 0, status: "coming" },
        { id: "rs9-odg", label: "OD Green", sku: "TCH-RS9-9MM-ODG", delta: 60, stock: 0, status: "coming" }
      ]},
    { id: "rs9x", type: "firearm", name: "RS9 X Vampir", line: "Vampir", sku: "TCH-RS9X-9MM",
      price: 1285.00, status: "active", img: "assets/guns/rs9x-right.webp",
      caliber: "9mmx19", reorderPoint: 6,
      variants: [
        { id: "rs9x-blk", label: "Black", sku: "TCH-RS9X-9MM-BLK", delta: 0, stock: 5, status: "active" },
        { id: "rs9x-fde", label: "FDE",   sku: "TCH-RS9X-9MM-FDE", delta: 60, stock: 0, status: "coming" }
      ]},
    { id: "mag18", type: "accessory", name: "18 Round Magazine", line: "Vampir", sku: "TCH-MAG-18",
      price: 32.00, status: "active", img: "assets/acc/mag18.webp",
      caliber: "9mm Luger", reorderPoint: 25,
      variants: [{ id: "mag18-std", label: "Standard", sku: "TCH-MAG-18", delta: 0, stock: 0, status: "active" }]},
    { id: "mag10", type: "accessory", name: "10 Round Magazine", line: "Vampir", sku: "TCH-MAG-10",
      price: 32.00, status: "active", img: "assets/acc/mag10.webp",
      caliber: "9mmx19", reorderPoint: 25,
      variants: [{ id: "mag10-std", label: "Standard", sku: "TCH-MAG-10", delta: 0, stock: 62, status: "active" }]},
    { id: "tee", type: "apparel", name: "TCH Arms Tee Shirt", line: "TCH Arms", sku: "TCH-TEE",
      price: 22.50, status: "active", img: "assets/acc/tee.webp",
      caliber: "", reorderPoint: 12,
      variants: [
        { id: "tee-s",  label: "Small",    sku: "TCH-TEE-S",  delta: 0, stock: 18, status: "active" },
        { id: "tee-m",  label: "Medium",   sku: "TCH-TEE-M",  delta: 0, stock: 24, status: "active" },
        { id: "tee-l",  label: "Large",    sku: "TCH-TEE-L",  delta: 0, stock: 9,  status: "active" },
        { id: "tee-xl", label: "X-Large",  sku: "TCH-TEE-XL", delta: 0, stock: 6,  status: "active" },
        { id: "tee-2xl",label: "XX-Large", sku: "TCH-TEE-2XL",delta: 2, stock: 3,  status: "active" }
      ]},
    { id: "mount", type: "optics", name: "Red Dot Dovetail Mount", line: "ADE Advanced Optics",
      sku: "ADE-DVT-01", price: 45.00, status: "discontinued", img: "assets/acc/mount.webp",
      caliber: "", reorderPoint: 4,
      variants: [{ id: "mount-std", label: "Standard", sku: "ADE-DVT-01", delta: 0, stock: 7, status: "active" }]}
  ],

  /* ---------------------------------------------------------------- orders
     fulfilment moves: paid -> awaiting-ffl -> ffl-verified -> shipped -> transferred
     Accessory-only orders skip straight to shipped.                          */
  orders: [
    { id: "TCH-1058", placed: "2026-08-04", channel: "Website",
      customer: { name: "Marcus Webb", email: "m.webb@example.com", phone: "314-555-0182",
                  address: "418 Kingsbury Ave", city: "St Louis", state: "MO", zip: "63112" },
      items: [{ pid: "rs9", vid: "rs9-blk", qty: 1 }],
      payment: "paid", fulfilment: "awaiting-ffl",
      ffl: null,
      flags: ["Awaiting dealer details"] },

    { id: "TCH-1057", placed: "2026-08-04", channel: "Website",
      customer: { name: "Dana Alvarez", email: "dalvarez@example.com", phone: "636-555-0140",
                  address: "22 Foxfield Ct", city: "Wentzville", state: "MO", zip: "63385" },
      items: [{ pid: "mag10", vid: "mag10-std", qty: 3 }, { pid: "tee", vid: "tee-l", qty: 1 }],
      payment: "paid", fulfilment: "shipped",
      ffl: null, tracking: "1Z999AA10123456784", flags: [] },

    { id: "TCH-1056", placed: "2026-08-03", channel: "Website",
      customer: { name: "Ray Okafor", email: "r.okafor@example.com", phone: "314-555-0119",
                  address: "9 Bellerive Dr", city: "O'Fallon", state: "MO", zip: "63368" },
      items: [{ pid: "rs9x", vid: "rs9x-blk", qty: 1 }, { pid: "mag18", vid: "mag18-std", qty: 2 }],
      payment: "paid", fulfilment: "ffl-verified",
      ffl: { dealer: "Midwest Firearms LLC", licence: "5-43-XXX-XX-2K-01197", phone: "636-555-0144",
             address: "88 Trade Rd", city: "O'Fallon", state: "MO", zip: "63368",
             expires: "2027-03-31", verified: true },
      flags: ["18 rd magazine on backorder"] },

    { id: "TCH-1055", placed: "2026-08-02", channel: "Phone",
      customer: { name: "Ellen Prosser", email: "eprosser@example.com", phone: "217-555-0166",
                  address: "1140 Ridge Line", city: "Springfield", state: "IL", zip: "62704" },
      items: [{ pid: "rs9", vid: "rs9-blk", qty: 1 }],
      payment: "paid", fulfilment: "shipped",
      ffl: { dealer: "Prairie State Arms", licence: "3-37-XXX-XX-1A-04421", phone: "217-555-0100",
             address: "76 Adams St", city: "Springfield", state: "IL", zip: "62701",
             expires: "2026-09-14", verified: true },
      tracking: "1Z999AA10123456713",
      flags: ["Dealer licence expires in 40 days"] },

    { id: "TCH-1054", placed: "2026-08-01", channel: "Website",
      customer: { name: "Tomas Lindqvist", email: "t.lind@example.com", phone: "314-555-0173",
                  address: "3 Carrswold", city: "Clayton", state: "MO", zip: "63105" },
      items: [{ pid: "tee", vid: "tee-m", qty: 2 }],
      payment: "paid", fulfilment: "transferred", ffl: null, flags: [] },

    { id: "TCH-1053", placed: "2026-07-31", channel: "Website",
      customer: { name: "Priya Raman", email: "praman@example.com", phone: "636-555-0158",
                  address: "204 Meadowbrook", city: "St Charles", state: "MO", zip: "63301" },
      items: [{ pid: "rs9", vid: "rs9-blk", qty: 1 }, { pid: "mount", vid: "mount-std", qty: 1 }],
      payment: "paid", fulfilment: "transferred",
      ffl: { dealer: "Gateway Sporting Goods", licence: "5-43-XXX-XX-9H-00832", phone: "636-555-0177",
             address: "1200 Boone Rd", city: "St Charles", state: "MO", zip: "63301",
             expires: "2028-01-31", verified: true },
      flags: [] },

    { id: "TCH-1052", placed: "2026-07-30", channel: "Website",
      customer: { name: "Grant Hollis", email: "ghollis@example.com", phone: "573-555-0104",
                  address: "51 Cedar Bluff", city: "Columbia", state: "MO", zip: "65201" },
      items: [{ pid: "rs9x", vid: "rs9x-blk", qty: 1 }],
      payment: "refunded", fulfilment: "cancelled",
      ffl: null, flags: ["Customer cancelled before transfer"] },

    { id: "TCH-1051", placed: "2026-07-29", channel: "Website",
      customer: { name: "Alicia Fenn", email: "afenn@example.com", phone: "314-555-0192",
                  address: "77 Lindell Blvd", city: "St Louis", state: "MO", zip: "63108" },
      items: [{ pid: "mag10", vid: "mag10-std", qty: 2 }],
      payment: "paid", fulfilment: "transferred", ffl: null, flags: [] },

    { id: "TCH-1050", placed: "2026-07-28", channel: "Website",
      customer: { name: "Devon Kearns", email: "dkearns@example.com", phone: "816-555-0131",
                  address: "310 Summit Rd", city: "Kansas City", state: "MO", zip: "64111" },
      items: [{ pid: "rs9", vid: "rs9-blk", qty: 2 }],
      payment: "pending", fulfilment: "awaiting-ffl",
      ffl: { dealer: "Westside Range & Supply", licence: "5-43-XXX-XX-4C-02210", phone: "816-555-0148",
             address: "44 Rail Yard Rd", city: "Kansas City", state: "MO", zip: "64108",
             expires: "2027-11-30", verified: false },
      flags: ["Payment not settled", "Dealer licence not yet verified"] },

    { id: "TCH-1049", placed: "2026-07-27", channel: "Website",
      customer: { name: "Nina Sokolov", email: "nsokolov@example.com", phone: "314-555-0155",
                  address: "18 Waverly Pl", city: "Kirkwood", state: "MO", zip: "63122" },
      items: [{ pid: "tee", vid: "tee-xl", qty: 1 }, { pid: "mag10", vid: "mag10-std", qty: 1 }],
      payment: "paid", fulfilment: "transferred", ffl: null, flags: [] },

    { id: "TCH-1048", placed: "2026-07-25", channel: "Phone",
      customer: { name: "Curtis Bailey", email: "cbailey@example.com", phone: "618-555-0127",
                  address: "902 Elm Hollow", city: "Belleville", state: "IL", zip: "62220" },
      items: [{ pid: "rs9", vid: "rs9-blk", qty: 1 }],
      payment: "paid", fulfilment: "transferred",
      ffl: { dealer: "Metro East Firearms", licence: "3-37-XXX-XX-7B-03390", phone: "618-555-0190",
             address: "5 Commerce Way", city: "Belleville", state: "IL", zip: "62221",
             expires: "2027-06-30", verified: true },
      flags: [] },

    { id: "TCH-1047", placed: "2026-07-24", channel: "Website",
      customer: { name: "Harold Mensah", email: "hmensah@example.com", phone: "314-555-0166",
                  address: "66 Delmar Loop", city: "University City", state: "MO", zip: "63130" },
      items: [{ pid: "rs9x", vid: "rs9x-blk", qty: 1 }, { pid: "tee", vid: "tee-l", qty: 1 }],
      payment: "paid", fulfilment: "transferred",
      ffl: { dealer: "Gateway Sporting Goods", licence: "5-43-XXX-XX-9H-00832", phone: "636-555-0177",
             address: "1200 Boone Rd", city: "St Charles", state: "MO", zip: "63301",
             expires: "2028-01-31", verified: true },
      flags: [] }
  ],

  /* ------------------------------------------------------------- content
     Copy blocks the storefront reads. Editing here is the point: the client
     asked to change site content without going back to a developer.        */
  content: [
    { id: "tagline", label: "Home hero tagline", where: "index.html", type: "line",
      value: "Designed for Shooters who Care About Performance . . . Not Logos!" },
    { id: "heroLead", label: "Home hero paragraph", where: "index.html", type: "text",
      value: "Two pistols, built to one standard. The RS9 and the RS9 X are manufactured by TRB in Republika Srpska and have been in service with the Special Anti-Terrorist Unit since 2020." },
    { id: "finishNote", label: "Gallery finish note", where: "gallery.html", type: "text",
      value: "Current finish available in the VAMPIR RS9 and RS9X is black only. Other finishes shown are expected to be available in second or third quarter of 2025." },
    { id: "orderIntro", label: "Order page intro", where: "order.html", type: "text",
      value: "We will contact you for shipping method and local FFL information for transfer once your weapon is ready for shipment. Shipping and tax will be added at that time." },
    { id: "legalRestrict", label: "State restriction notice", where: "site wide", type: "text", locked: true,
      value: "Some items for sale in this store may be restricted or prohibited in your area. Please check your local and state regulations before ordering, this is your responsibility." },
    { id: "legalAge", label: "ATF age notice", where: "site wide", type: "text", locked: true,
      value: "You must be 18 or older to purchase a long gun and 21 or older to purchase a handgun per ATF rules." },
    { id: "warranty", label: "Warranty terms", where: "site wide", type: "text", locked: true,
      value: "All new firearms are shipped in the original manufacturer's box, with magazine(s), accessories and applicable warranty. Firearms requiring warranty work must be returned to our shop within 1 year of purchase for repair." }
  ],

  /* ------------------------------------------------------------- revenue
     Twelve weeks, split by product type. Weeks run oldest to newest.       */
  revenue: [
    { week: "May 18", firearm: 3855, accessory: 288, apparel: 90 },
    { week: "May 25", firearm: 2570, accessory: 416, apparel: 135 },
    { week: "Jun 01", firearm: 5140, accessory: 192, apparel: 68 },
    { week: "Jun 08", firearm: 3855, accessory: 352, apparel: 158 },
    { week: "Jun 15", firearm: 6425, accessory: 288, apparel: 113 },
    { week: "Jun 22", firearm: 2570, accessory: 480, apparel: 203 },
    { week: "Jun 29", firearm: 5140, accessory: 224, apparel: 90 },
    { week: "Jul 06", firearm: 7710, accessory: 384, apparel: 180 },
    { week: "Jul 13", firearm: 3855, accessory: 320, apparel: 135 },
    { week: "Jul 20", firearm: 6425, accessory: 512, apparel: 225 },
    { week: "Jul 27", firearm: 5140, accessory: 288, apparel: 158 },
    { week: "Aug 03", firearm: 8995, accessory: 448, apparel: 203 }
  ],

  rates: { taxRate: 0.08988, ccFeeRate: 0.035 }
};

/* Labels and colours for the three revenue series. The hues are validated
   all-pairs on white (CVD ΔE 9.2, normal-vision 24.4). Apparel green sits at
   2.82:1 on white, so the chart ships a legend, direct labels and a table
   view rather than relying on the fill alone. */
const SERIES = [
  { key: "firearm",   label: "Firearms",    color: "#0F72C9" },
  { key: "accessory", label: "Accessories", color: "#EB6834" },
  { key: "apparel",   label: "Apparel",     color: "#1BAF7A" }
];

const FULFILMENT = {
  "awaiting-ffl":  { label: "Awaiting FFL",  cls: "b-warn" },
  "ffl-verified":  { label: "FFL verified",  cls: "b-info" },
  "shipped":       { label: "Shipped",       cls: "b-info" },
  "transferred":   { label: "Complete",      cls: "b-ok"   },
  "cancelled":     { label: "Cancelled",     cls: "b-idle" }
};

const PAYMENT = {
  paid:     { label: "Paid",     cls: "b-ok"   },
  pending:  { label: "Pending",  cls: "b-warn" },
  refunded: { label: "Refunded", cls: "b-idle" }
};

/* Ordered pipeline used by the order drawer's timeline. */
const PIPELINE = [
  { key: "placed",        label: "Order placed" },
  { key: "paid",          label: "Payment settled" },
  { key: "awaiting-ffl",  label: "Awaiting dealer details", fflOnly: true },
  { key: "ffl-verified",  label: "Dealer licence verified", fflOnly: true },
  { key: "shipped",       label: "Shipped" },
  { key: "transferred",   label: "Transferred to customer" }
];
