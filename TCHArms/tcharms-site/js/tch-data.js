/* ==========================================================================
   TCH Arms - catalogue, specifications and media manifest
   Specifications transcribed from the client's existing tch-arms.com pages.
   ========================================================================== */

const TCH = {

  company: {
    name: "TCH Arms",
    phone: "1-314-266-3361",
    email: "sales@tch-arms.com",
    street: "703 Rolling Wind",
    city: "O'Fallon, MO 63368",
    tagline: "Designed for Shooters who Care About Performance . . . Not Logos!",
    maker: "TRB",
    origin: "Republika Srpska, Bosnia & Herzegovina"
  },

  /* ------------------------------------------------------------ products */
  products: {
    rs9: {
      id: "rs9",
      name: "RS9 Vampir",
      short: "RS9",
      line: "Vampir",
      caliber: "9mmx19",
      price: 1285.00,
      stock: "in",
      img: "assets/guns/rs9-right.webp",
      angles: ["right", "upleft", "up", "left", "downleft", "down"],
      angleLabels: ["Right profile", "Upper left", "Top quarter", "Left profile", "Lower left", "Underside"],
      blurb: "A full-size 9x19 duty pistol built on a steel slide and aluminium alloy frame, with an 18 round magazine and a polymer and industrial rubber grip that carries a fifth-finger base plate.",
      barrel: "4.3 in",
      capacity: "18",
      weight: "2.63 lb"
    },
    rs9x: {
      id: "rs9x",
      name: "RS9 X Vampir",
      short: "RS9 X",
      line: "Vampir",
      caliber: "9mmx19",
      price: 1285.00,
      stock: "in",
      img: "assets/guns/rs9x-right.webp",
      angles: ["right", "upleft", "up", "left", "downleft", "down"],
      angleLabels: ["Right profile", "Upper left", "Top quarter", "Left profile", "Lower left", "Underside"],
      blurb: "The same build and tolerances as the RS9, extended. A longer threaded barrel adds sight radius and muzzle-device compatibility without changing the frame or the manual of arms.",
      barrel: "5.3 in",
      capacity: "18",
      weight: "2.78 lb"
    },
    tee: {
      id: "tee",
      name: "TCH Arms Tee Shirt",
      short: "Tee Shirt",
      line: "TCH Arms",
      caliber: "",
      price: 22.50,
      stock: "in",
      img: "assets/acc/tee.webp",
      sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
      blurb: "VAMPIR short sleeve tee. Front carries the VAMPIR mark and \"The Apex Predator\". Back reads \"This bitch got fangs\".",
      detail: "VAMPIR Short Sleeve Tees"
    },
    mag18: {
      id: "mag18",
      name: "18 Round Magazine",
      short: "18 Rd Magazine",
      line: "Vampir",
      caliber: "9mm Luger",
      price: 32.00,
      stock: "out",
      img: "assets/acc/mag18.webp",
      blurb: "Factory 18 round magazine for the RS9 and RS9 X Vampir, with the extended base plate that supports the fifth finger."
    },
    mag10: {
      id: "mag10",
      name: "10 Round Magazine",
      short: "10 Rd Magazine",
      line: "Vampir",
      caliber: "9mmx19",
      price: 32.00,
      stock: "in",
      img: "assets/acc/mag10.webp",
      blurb: "Factory 10 round magazine for the RS9 and RS9 X Vampir. Supplied for states that restrict magazine capacity."
    },
    mount: {
      id: "mount",
      name: "Red Dot Dovetail Mount",
      short: "Dovetail Mount",
      line: "ADE Advanced Optics",
      caliber: "",
      price: 45.00,
      stock: "disc",
      img: "assets/acc/mount.webp",
      blurb: "Dovetail mount for a red dot sight, fitted to the rear dovetail. Being discontinued, available while current stock lasts."
    }
  },

  /* ------------------------------------------------------------ specs
     Transcribed from the RS9 specification page. The RS9 X shares the
     platform, so only barrel-derived figures differ.                     */
  specs: {
    rs9: [
      {
        group: "Dimensions and Weight",
        rows: [
          ["Length", "7.7 inches"],
          ["Height w/Magazine", "6 inches"],
          ["Height w/o Magazine", "5.6 inches"],
          ["Width", "1.5 inch"],
          ["Without Magazine", "1.93 lbs."],
          ["With Empty Magazine", "2.15 lbs."],
          ["With Full Magazine", "2.63 lbs."]
        ]
      },
      {
        group: "RS9 Vampir",
        rows: [
          ["Fire Mode", "Semi-Automatic"],
          ["Operation", "Short recoil operated, locked breach"],
          ["Trigger System", "Double Action (DA) / Single Action (SA)"],
          ["Standard Trigger Pull", "DA 9.5 lb. max / SA 5.1 lb. max"],
          ["Caliber", "9x19mm PARA"],
          ["Feed System", "Standard 18 (10 available)"],
          ["Sight", "Fixed 3 dots"],
          ["Radius", "6.3 inches"],
          ["Muzzle Velocity", "1181 ft/s"],
          ["Rate of Fire", "120 - 140 RPM"],
          ["Effective Firing Range", "55 yards"],
          ["Maximum Firing Range", "164 yards"],
          ["Slide Material", "Steel"],
          ["Frame Material", "Aluminum Alloy"]
        ]
      },
      {
        group: "Barrel Profile",
        rows: [
          ["Barrel Material", "Chrome Molybdenum Steel"],
          ["Barrel Length", "4.3 inches"],
          ["Rifling", "6 grooves, right-hand twist, twist rate 9.8 inch"],
          ["Type of Rifling", "Hexagonal, Polygonal"]
        ]
      }
    ],
    rs9x: [
      {
        group: "Dimensions and Weight",
        rows: [
          ["Length", "8.7 inches"],
          ["Height w/Magazine", "6 inches"],
          ["Height w/o Magazine", "5.6 inches"],
          ["Width", "1.5 inch"],
          ["Without Magazine", "2.08 lbs."],
          ["With Empty Magazine", "2.30 lbs."],
          ["With Full Magazine", "2.78 lbs."]
        ]
      },
      {
        group: "RS9 X Vampir",
        rows: [
          ["Fire Mode", "Semi-Automatic"],
          ["Operation", "Short recoil operated, locked breach"],
          ["Trigger System", "Double Action (DA) / Single Action (SA)"],
          ["Standard Trigger Pull", "DA 9.5 lb. max / SA 5.1 lb. max"],
          ["Caliber", "9x19mm PARA"],
          ["Feed System", "Standard 18 (10 available)"],
          ["Sight", "Fixed 3 dots"],
          ["Radius", "7.3 inches"],
          ["Muzzle Velocity", "1214 ft/s"],
          ["Rate of Fire", "120 - 140 RPM"],
          ["Effective Firing Range", "55 yards"],
          ["Maximum Firing Range", "164 yards"],
          ["Slide Material", "Steel"],
          ["Frame Material", "Aluminum Alloy"]
        ]
      },
      {
        group: "Barrel Profile",
        rows: [
          ["Barrel Material", "Chrome Molybdenum Steel"],
          ["Barrel Length", "5.3 inches, threaded"],
          ["Rifling", "6 grooves, right-hand twist, twist rate 9.8 inch"],
          ["Type of Rifling", "Hexagonal, Polygonal"]
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ FFL copy
     Wording carried over from the client's current home page.            */
  ffl: [
    "Firearms purchases must be shipped to a local Federal Firearms License (FFL) of your choosing.",
    "Any background checks are conducted by the FFL dealer of your choosing, and completed by you.",
    "We will contact you before shipping for the information on your chosen local FFL.",
    "It is recommended that you inquire about any possible transfer fees they may charge.",
    "For pre-orders or deposits, once contacted that your VAMPIR has arrived you must choose a local FFL."
  ],

  legal: {
    regs: "All firearms and accessories are sold and shipped in accordance with existing federal regulations.",
    restrict: "Some items for sale in this store may be restricted or prohibited in your area. Please check your local and state regulations before ordering, this is your responsibility.",
    age: "You must be 18 or older to purchase a long gun and 21 or older to purchase a handgun per ATF rules.",
    warranty: "All new firearms are shipped in the original manufacturer's box, with magazine(s), accessories and applicable warranty. Firearms requiring warranty work must be returned to our shop within 1 year of purchase for repair."
  },

  /* ------------------------------------------------------------ gallery */
  gallery: [
    { id: "g1",  w: 1800, h: 1200, caption: "RS9 Vampir, full profile" },
    { id: "g4",  w: 1800, h: 1200, caption: "Grip panel geometry" },
    { id: "g9",  w: 1800, h: 1201, caption: "Range day, 9x19 brass" },
    { id: "g2",  w: 1800, h: 1201, caption: "Muzzle and accessory rail" },
    { id: "g8",  w: 1200, h: 1800, caption: "RS9 on the bench" },
    { id: "g10", w: 1800, h: 1201, caption: "RS9 Vampir with spent casings" },
    { id: "g3",  w: 1800, h: 1201, caption: "Slide serrations, ejection port" },
    { id: "g6",  w: 1800, h: 1200, caption: "Trigger group and takedown lever" },
    { id: "g11", w: 1800, h: 1201, caption: "Finish study, five variants" },
    { id: "g5",  w: 1800, h: 1201, caption: "Slide profile under studio light" },
    { id: "g12", w: 1800, h: 1201, caption: "Finish study, overhead" }
  ],

  finishNote: "Current finish available in the VAMPIR RS9 and RS9X is black only. Other finishes shown are expected to be available in second or third quarter of 2025.",

  /* ------------------------------------------------------------ video
     Placeholders. Client holds the master files on WeTransfer; each entry
     takes a src once those are supplied.                                  */
  videos: [
    { id: "v1", title: "VAMPIR RS9, design to production", poster: "assets/gallery/g4-t.webp",
      meta: "1:45", desc: "From the first CAD pass through to the finished slide.", src: "" },
    { id: "v2", title: "RS9 X at the range", poster: "assets/gallery/g9-t.webp",
      meta: "2:12", desc: "Extended barrel, 18 round magazine, steel plate.", src: "" }
  ],

  influencers: [
    { id: "i1", name: "Range Time Review", handle: "@rangetimereview", poster: "assets/gallery/g10-t.webp",
      desc: "Full teardown and 500 round reliability run.", url: "#" },
    { id: "i2", name: "Carry Considered", handle: "@carryconsidered", poster: "assets/gallery/g1-t.webp",
      desc: "Duty carry impressions after four weeks.", url: "#" },
    { id: "i3", name: "The Slide Rack", handle: "@theslugrack", poster: "assets/gallery/g3-t.webp",
      desc: "RS9 against three other alloy-frame nines.", url: "#" }
  ],

  /* ------------------------------------------------------------ checkout */
  rates: {
    taxRate: 0.08988,      // O'Fallon, MO combined rate
    ccFeeRate: 0.035,      // client charges a 3.5% card fee
    shipFirearm: 45.00,
    shipAccessory: 9.50
  }
};

if (typeof module !== "undefined") { module.exports = TCH; }
