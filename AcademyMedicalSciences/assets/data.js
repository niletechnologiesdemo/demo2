/* ==========================================================================
   Academy of Medical Science — demonstration dataset
   Programme names, module topics, audiences and contact details are taken
   from the academy's own flyer and website. Fees, intake dates, student
   records and revenue figures are illustrative sample data for the mock-up.
   ========================================================================== */

const ACADEMY = {
  name:'Academy of Medical Science',
  tagline:'Helping You Succeed',
  phone:'437-898-3761',
  cell:'647-524-5976',
  email:'medicalacademyinfo@gmail.com',
  payEmail:'academy.medicalscience@gmail.com',
  address:'10 George St N, Brampton, ON L6X 1R2',
  site:'www.academyofmedicalscience.ca'
};

/* ---------- lesson helpers ---------- */
const V=(t,m)=>({type:'video',title:t,len:m});
const P=(t,pg)=>({type:'pdf',title:t,len:pg});
const R=(t,m)=>({type:'audio',title:t,len:m});
const Q=(t,n)=>({type:'quiz',title:t,len:n});
const S=(t,h)=>({type:'session',title:t,len:h});

const CATS = [
  {id:'cert',  name:'Certificate Programs',   icon:'i-cert',   desc:'Multi-week hybrid programs that qualify you for a role.'},
  {id:'skill', name:'Clinical Skills',        icon:'i-syringe',desc:'Focused hands-on competencies you can add this month.'},
  {id:'exam',  name:'Exam Preparation',       icon:'i-quiz',   desc:'Structured preparation for Canadian licensing exams.'},
  {id:'safe',  name:'Compliance & Safety',    icon:'i-shield', desc:'Mandatory workplace certifications for Ontario employers.'}
];

const COURSES = [
{
  id:'phlebotomy', cat:'cert', img:'course-phlebotomy',
  name:'Micro-Credential Phlebotomy',
  sub:'Accredited Certificate Course',
  price:1499, weeks:6, format:'Hybrid', accredited:true, featured:true,
  rating:4.9, reviews:184, enrolled:312, seats:6, intake:'2 Sep 2026',
  blurb:'Start work as a phlebotomist in hospitals, walk-in clinics, physician offices, laboratories, research institutes, long-term care centres and insurance companies.',
  audience:['Nurses','Doctors / IMGs','Dentists','Laboratory Technicians','Laboratory Technologists','Healthcare background'],
  outcomes:['Draw blood safely using correct order of draw','Complete lab requisitions and patient identification','Record vitals, urinalysis and medical history','Work to the Canadian protocol of phlebotomy'],
  careers:['Hospital','Walk-in Clinic','Physician Office','Laboratories','Research Institute','Long-term Care','Insurance Companies'],
  modules:[
    {n:'Introduction & Professional Practice', lessons:[
      V('Welcome to the programme',6), V('Introduction to the Insurance Industry',18),
      V("Health Professional's Responsibilities",22), P('Types of Insurance Forms',14),
      P('Paramedical Forms',11), Q('Module 1 knowledge check',10)]},
    {n:'Medical Terminology, Anatomy & Physiology', lessons:[
      V('Root words, prefixes and suffixes',26), V('Circulatory system essentials',31),
      R('Recorded lecture — venous anatomy of the arm',44), P('Terminology reference workbook',38),
      Q('Anatomy & terminology quiz',20)]},
    {n:'Phlebotomy Equipment', lessons:[
      V('Vacutainer tubes and additives',24), V('Order of draw — and why it matters',19),
      P('Order of draw wall chart',2), P('Lab requisition form walkthrough',9),
      Q('Equipment and order of draw',15)]},
    {n:'Blood Collection Technique', lessons:[
      V('Venipuncture step by step',34), V('Patient identification protocol',15),
      V('Blood collection in special populations',28), V('Phlebotomy complications and how to avoid them',26),
      R('Recorded lecture — difficult draws',38), Q('Collection technique assessment',25)]},
    {n:'Canadian Protocol & Legal Issues', lessons:[
      V('Canadian protocol of phlebotomy',23), V('Legal issues in phlebotomy',21),
      P('Incident report template and worked example',7), Q('Protocol and legal quiz',15)]},
    {n:'Vitals & Screening', lessons:[
      V('Blood pressure, pulse, height and weight',29), V('Temperature technique',12),
      V('Urinalysis — sugar, protein and blood',24), V('Medical history technique',20),
      V('Family history technique',16), Q('Vitals and screening quiz',20)]},
    {n:'Hands-on Practical Training', inPerson:true, lessons:[
      S('Practical day 1 — equipment handling and mannequin draws',4),
      S('Practical day 2 — supervised live draws and vitals',4),
      S('Competency assessment and sign-off',3)]}
  ]
},
{
  id:'medical-assistant', cat:'cert', img:'course-medical-assistant',
  name:'Medical Assistant',
  sub:'Certificate Course',
  price:1999, weeks:8, format:'Hybrid', accredited:false, featured:true,
  rating:4.8, reviews:126, enrolled:241, seats:4, intake:'9 Sep 2026',
  blurb:'A two-month hybrid programme combining flexible online study with in-person practical sessions — fast-track your goals and go job-ready for a doctor’s office, walk-in clinic or medical office.',
  audience:['Career changers','Internationally trained professionals','Medical Office Assistants'],
  outcomes:['Run front-desk and clinical support in a medical office','Take and record patient vitals accurately','Handle scheduling, billing and records','Assist with in-office clinical procedures'],
  careers:["Doctor's Office",'Walk-in Clinic','Medical Offices','Specialist Practices'],
  modules:[
    {n:'The Medical Office', lessons:[V('Roles in a Canadian medical practice',22),V('Professionalism and patient communication',25),P('Office workflow handbook',30),Q('Module quiz',12)]},
    {n:'Medical Terminology', lessons:[V('Building and decoding medical terms',28),P('Terminology glossary',42),Q('Terminology quiz',25)]},
    {n:'Anatomy & Physiology', lessons:[V('Body systems overview',35),R('Recorded lecture — cardiovascular system',46),P('Anatomy workbook',36),Q('Systems quiz',20)]},
    {n:'Clinical Support Skills', lessons:[V('Taking vitals in practice',27),V('Preparing the treatment room',18),V('Infection prevention and control',24),Q('Clinical skills quiz',18)]},
    {n:'Administration, Scheduling & Billing', lessons:[V('Appointment systems and patient flow',21),V('OHIP billing basics',26),P('Forms and templates pack',18),Q('Administration quiz',15)]},
    {n:'In-Person Practical Block', inPerson:true, lessons:[S('Clinical skills lab — vitals and room prep',4),S('Simulated patient day',5),S('Final competency assessment',3)]}
  ]
},
{
  id:'clinical-research', cat:'cert', img:'course-clinical-research',
  name:'Clinical Research Assistant',
  sub:'Certificate Course',
  price:2499, weeks:12, format:'Hybrid', accredited:false, featured:true,
  rating:4.7, reviews:63, enrolled:88, seats:9, intake:'16 Sep 2026',
  blurb:'Move into Canada’s clinical trials sector — good clinical practice, protocol handling, consent, data integrity and site coordination.',
  audience:['IMGs','Life science graduates','Laboratory Technologists','Nurses'],
  outcomes:['Work to ICH-GCP standards','Support informed consent and screening','Maintain source data and trial documentation','Coordinate site visits and monitoring'],
  careers:['Research Institute','Hospital Research Unit','Contract Research Organisation','Pharmaceutical Sponsor'],
  modules:[
    {n:'Introduction to Clinical Research', lessons:[V('Phases of clinical trials',30),V('Who does what on a trial site',24),P('Glossary of research terms',20),Q('Foundations quiz',15)]},
    {n:'Good Clinical Practice (ICH-GCP)', lessons:[V('The 13 GCP principles',34),R('Recorded lecture — GCP in Canadian practice',52),P('GCP reference guide',44),Q('GCP assessment',30)]},
    {n:'Consent, Ethics & REB', lessons:[V('Informed consent in practice',28),V('Research Ethics Board submissions',26),P('Consent form examples',16),Q('Ethics quiz',20)]},
    {n:'Data Integrity & Source Documentation', lessons:[V('ALCOA+ and source data',31),V('Case report forms and queries',25),Q('Data quiz',20)]},
    {n:'Site Coordination', lessons:[V('Screening, visits and scheduling',27),V('Monitoring visits and audits',24),P('Site file checklist',12),Q('Coordination quiz',18)]},
    {n:'Practical Site Workshop', inPerson:true, lessons:[S('Mock site visit and file review',5),S('Consent role-play and assessment',4)]}
  ]
},
{
  id:'field-examiner', cat:'cert', img:'course-field-examiner',
  name:'Field Health Examiner',
  sub:'Certificate Course',
  price:1299, weeks:5, format:'Hybrid', accredited:false, featured:false,
  rating:4.8, reviews:71, enrolled:134, seats:8, intake:'26 Aug 2026',
  blurb:'Carry out paramedical examinations for the insurance industry — vitals, blood and urine collection, medical and family history, in the client’s home or office.',
  audience:['Nurses','Phlebotomists','IMGs','Paramedics'],
  outcomes:['Complete paramedical and insurance forms accurately','Take a full set of vitals in the field','Collect blood and urine samples off-site','Take medical and family histories'],
  careers:['Insurance Companies','Paramedical Service Providers','Independent Contracting'],
  modules:[
    {n:'The Insurance Industry', lessons:[V('Introduction to the insurance industry',20),V("Health professional's responsibilities",22),P('Types of insurance forms',16),P('Paramedical forms',12),Q('Industry quiz',15)]},
    {n:'Vitals in the Field', lessons:[V('Blood pressure, height, weight, pulse',30),V('Temperature and general observation',14),Q('Vitals quiz',15)]},
    {n:'Specimen Collection Off-Site', lessons:[V('Field blood draw technique',28),V('Urinalysis — sugar, protein, blood',22),V('Specimen handling and transport',18),Q('Collection quiz',20)]},
    {n:'History Taking', lessons:[V('Medical history technique',24),V('Family history technique',18),R('Recorded lecture — difficult interviews',36),Q('History quiz',15)]},
    {n:'Field Practical', inPerson:true, lessons:[S('Simulated in-home examination',4),S('Assessment and sign-off',3)]}
  ]
},
{
  id:'ultrasound', cat:'cert', img:'course-ultrasound',
  name:'Basic Ultrasound',
  sub:'Introductory Course',
  price:2899, weeks:10, format:'Hybrid', accredited:false, featured:false,
  rating:4.6, reviews:38, enrolled:52, seats:5, intake:'30 Sep 2026',
  blurb:'An introduction to diagnostic ultrasound physics, probe handling, scanning planes and normal anatomy, with supervised scanning practice on campus.',
  audience:['Doctors / IMGs','Technologists','Nurses'],
  outcomes:['Explain ultrasound physics and machine controls','Select and handle probes correctly','Recognise normal anatomy in standard planes','Follow safety and ALARA principles'],
  careers:['Imaging Clinics','Hospital Departments','Physician Offices'],
  modules:[
    {n:'Physics & Instrumentation', lessons:[V('How ultrasound images are formed',32),V('Machine controls and optimisation',28),P('Physics workbook',34),Q('Physics quiz',25)]},
    {n:'Probes & Scanning Technique', lessons:[V('Transducer types and selection',24),V('Probe handling and ergonomics',22),Q('Technique quiz',15)]},
    {n:'Normal Anatomy on Ultrasound', lessons:[V('Abdominal planes',36),V('Vascular structures',30),R('Recorded lecture — recognising artefacts',42),Q('Anatomy quiz',30)]},
    {n:'Safety & Documentation', lessons:[V('ALARA and bio-effects',20),P('Reporting templates',14),Q('Safety quiz',15)]},
    {n:'Supervised Scanning Practice', inPerson:true, lessons:[S('Scanning lab 1 — probe handling',4),S('Scanning lab 2 — abdominal planes',4),S('Scanning lab 3 — assessment',4)]}
  ]
},
{
  id:'ecg', cat:'skill', img:'course-ecg',
  name:'ECG & Holter Monitor',
  sub:'Hands-on Course',
  price:899, weeks:4, format:'Hybrid', accredited:false, featured:true,
  rating:4.9, reviews:152, enrolled:287, seats:7, intake:'2 Sep 2026',
  blurb:'Theory online, practical on campus. Place leads correctly, run a 12-lead ECG, fit a Holter monitor and recognise the rhythms that matter.',
  audience:['Nurses','IMGs','Medical Office Assistants','Technicians'],
  outcomes:['Place a 12-lead ECG accurately','Recognise common rhythms and artefacts','Fit and download a Holter monitor','Escalate abnormal findings appropriately'],
  careers:['Hospital','Cardiology Clinic','Walk-in Clinic','Physician Office'],
  modules:[
    {n:'Cardiac Anatomy & Conduction', lessons:[V('The conduction system',26),V('What each waveform represents',24),P('Anatomy reference sheets',18),Q('Anatomy quiz',15)]},
    {n:'Running a 12-Lead ECG', lessons:[V('Lead placement — chest and limb',30),V('Patient preparation and artefact reduction',20),V('Common placement errors',16),Q('Placement quiz',20)]},
    {n:'Rhythm Recognition', lessons:[V('Sinus rhythms and rates',28),V('Atrial fibrillation and flutter',26),V('Recognising ischaemic changes',30),R('Recorded lecture — strips walkthrough',48),Q('Rhythm recognition test',35)]},
    {n:'Holter Monitoring', lessons:[V('Fitting a Holter monitor',22),V('Patient instructions and diaries',15),V('Downloading and reporting',20),Q('Holter quiz',15)]},
    {n:'Practical Session', inPerson:true, lessons:[S('12-lead placement practice on volunteers',4),S('Holter fitting and competency assessment',3)]}
  ]
},
{
  id:'injection', cat:'skill', img:'course-injection',
  name:'Intramuscular Injection',
  sub:'Hands-on Course',
  price:549, weeks:2, format:'Hybrid', accredited:false, featured:false,
  rating:4.9, reviews:118, enrolled:203, seats:10, intake:'23 Aug 2026',
  blurb:'Safe intramuscular injection technique — site selection, needle choice, aseptic technique and adverse-event management, finished with a supervised practical.',
  audience:['Nurses','IMGs','Dentists','Pharmacists','Healthcare background'],
  outcomes:['Select and land IM sites correctly','Choose the right needle and gauge','Maintain aseptic technique','Manage adverse events and document'],
  careers:['Pharmacy','Walk-in Clinic','Physician Office','Long-term Care'],
  modules:[
    {n:'Theory & Safety', lessons:[V('Anatomy of IM injection sites',24),V('Needle selection and aseptic technique',22),V('Adverse events and anaphylaxis',26),P('Safety checklist',6),Q('Theory assessment',20)]},
    {n:'Documentation', lessons:[V('Consent, records and incident reporting',18),P('Documentation templates',8),Q('Documentation quiz',10)]},
    {n:'Practical Workshop', inPerson:true, lessons:[S('Mannequin practice — deltoid and ventrogluteal',3),S('Supervised assessment and sign-off',2)]}
  ]
},
{
  id:'medication', cat:'skill', img:'course-medication',
  name:'Administration of Medication',
  sub:'Certificate Course',
  price:649, weeks:3, format:'Hybrid', accredited:false, featured:false,
  rating:4.7, reviews:94, enrolled:161, seats:12, intake:'2 Sep 2026',
  blurb:'The rights of medication administration, dosage calculation, routes, storage and controlled substances — with a practical competency session.',
  audience:['Nurses','Personal Support Workers','Medical Office Assistants'],
  outcomes:['Apply the rights of administration','Calculate dosages accurately','Handle and store medication correctly','Document administration and errors'],
  careers:['Long-term Care','Clinics','Community Care','Pharmacy'],
  modules:[
    {n:'Principles & Rights', lessons:[V('The rights of medication administration',24),V('Routes and forms',22),Q('Principles quiz',18)]},
    {n:'Dosage Calculation', lessons:[V('Calculation methods and worked examples',32),P('Calculation practice pack',22),Q('Calculation test',30)]},
    {n:'Storage, Controls & Errors', lessons:[V('Storage and controlled substances',20),V('Medication errors — prevention and reporting',24),P('Error report template',5),Q('Safety quiz',15)]},
    {n:'Practical Competency', inPerson:true, lessons:[S('Supervised administration scenarios',3),S('Assessment',2)]}
  ]
},
{
  id:'phleb-workshop', cat:'skill', img:'course-phleb-workshop',
  name:'Phlebotomy Workshop',
  sub:'One-Day Refresher',
  price:399, weeks:1, format:'In-person', accredited:false, featured:false,
  rating:4.9, reviews:207, enrolled:418, seats:3, intake:'24 Aug 2026',
  blurb:'A hands-on training workshop that refreshes the knowledge of practising professionals — order of draw, difficult veins, complications and current Canadian protocol.',
  audience:['Doctors / IMGs','Nurses','Laboratory Assistants','Technicians','Technologists','Dentists','Health Professionals'],
  outcomes:['Refresh order of draw and tube additives','Practise difficult venipuncture','Update to current Canadian protocol','Review complications and incident reporting'],
  careers:['Hospital','Laboratories','Walk-in Clinic','Long-term Care'],
  modules:[
    {n:'Pre-Workshop Refresher (online)', lessons:[V('Order of draw refresher',16),P('Vacutainer tube chart',2),Q('Readiness check',10)]},
    {n:'Workshop Day', inPerson:true, lessons:[S('Equipment station and order of draw drills',2),S('Supervised venipuncture practice',3),S('Complications and incident reporting review',2)]}
  ]
},
{
  id:'iv', cat:'skill', img:'course-iv',
  name:'Intravenous Administration',
  sub:'Hands-on Course',
  price:899, weeks:3, format:'Hybrid', accredited:false, featured:false,
  rating:4.7, reviews:57, enrolled:96, seats:6, intake:'9 Sep 2026',
  blurb:'IV cannulation and infusion therapy — vein selection, cannula sizing, securement, flow rates and complication management.',
  audience:['Nurses','IMGs','Paramedics'],
  outcomes:['Select veins and cannula sizes','Insert and secure a peripheral IV','Calculate and set flow rates','Recognise and manage complications'],
  careers:['Hospital','Infusion Clinic','Urgent Care','Long-term Care'],
  modules:[
    {n:'IV Theory', lessons:[V('Vascular access anatomy',26),V('Cannula sizing and equipment',22),V('Fluids and flow rate calculation',28),Q('Theory quiz',25)]},
    {n:'Complications', lessons:[V('Phlebitis, infiltration and extravasation',26),V('Infection prevention in IV therapy',20),Q('Complications quiz',20)]},
    {n:'Practical Session', inPerson:true, lessons:[S('Cannulation arm practice',4),S('Supervised assessment',3)]}
  ]
},
{
  id:'prp', cat:'skill', img:'course-prp',
  name:'Platelet-Rich Plasma (PRP)',
  sub:'Advanced Course',
  price:1199, weeks:3, format:'Hybrid', accredited:false, featured:false,
  rating:4.6, reviews:41, enrolled:63, seats:4, intake:'16 Sep 2026',
  blurb:'PRP preparation and administration — draw, centrifugation, sterile handling and injection protocols for aesthetic and musculoskeletal indications.',
  audience:['Doctors / IMGs','Nurses','Dentists'],
  outcomes:['Prepare PRP to protocol','Operate centrifuge settings correctly','Maintain sterile technique end to end','Consent and document treatments'],
  careers:['Aesthetic Clinics','Sports Medicine','Dental Practice','Private Clinics'],
  modules:[
    {n:'Science & Indications', lessons:[V('Platelet biology and healing',26),V('Indications and evidence',24),P('Protocol reference',18),Q('Science quiz',20)]},
    {n:'Preparation Protocol', lessons:[V('Draw, spin and separation',30),V('Sterile field and handling',22),Q('Protocol quiz',20)]},
    {n:'Consent & Documentation', lessons:[V('Consent and contraindications',20),P('Consent templates',8),Q('Documentation quiz',12)]},
    {n:'Practical Laboratory', inPerson:true, lessons:[S('Centrifuge and preparation lab',4),S('Injection technique and assessment',4)]}
  ]
},
{
  id:'wound-care', cat:'skill', img:'course-wound-care',
  name:'Wound Care Management',
  sub:'Certificate Course',
  price:459, weeks:2, format:'Hybrid', accredited:false, featured:false,
  rating:4.8, reviews:86, enrolled:147, seats:11, intake:'26 Aug 2026',
  blurb:'Assessment, cleansing, dressing selection and documentation for acute and chronic wounds, including pressure injury staging.',
  audience:['Nurses','Personal Support Workers','IMGs'],
  outcomes:['Assess and stage wounds','Select appropriate dressings','Apply aseptic dressing technique','Document healing progression'],
  careers:['Long-term Care','Home Care','Wound Clinic','Hospital'],
  modules:[
    {n:'Wound Assessment', lessons:[V('Wound types and healing phases',26),V('Pressure injury staging',24),P('Assessment charts',12),Q('Assessment quiz',20)]},
    {n:'Dressings & Technique', lessons:[V('Dressing categories and selection',28),V('Aseptic dressing change',22),Q('Dressing quiz',18)]},
    {n:'Practical Session', inPerson:true, lessons:[S('Dressing technique lab',3),S('Assessment',2)]}
  ]
},
{
  id:'urinalysis', cat:'skill', img:'course-urinalysis',
  name:'Urinalysis',
  sub:'Short Course',
  price:279, weeks:1, format:'Hybrid', accredited:false, featured:false,
  rating:4.7, reviews:64, enrolled:129, seats:14, intake:'23 Aug 2026',
  blurb:'Dipstick and macroscopic urinalysis — testing for sugar, protein and blood, sample integrity, and reporting results correctly.',
  audience:['Nurses','Laboratory Assistants','Medical Office Assistants','Field Health Examiners'],
  outcomes:['Collect and preserve samples correctly','Run and read dipstick tests','Interpret sugar, protein and blood results','Report and escalate abnormal findings'],
  careers:['Laboratories','Physician Office','Insurance Paramedical','Walk-in Clinic'],
  modules:[
    {n:'Sample & Method', lessons:[V('Collection, preservation and integrity',20),V('Dipstick method and timing',18),Q('Method quiz',15)]},
    {n:'Interpretation', lessons:[V('Sugar, protein and blood — what results mean',24),P('Result interpretation chart',8),Q('Interpretation quiz',20)]},
    {n:'Practical', inPerson:true, lessons:[S('Bench practice and assessment',3)]}
  ]
},
{
  id:'terminology', cat:'cert', img:'course-terminology',
  name:'Medical Terminology',
  sub:'Online Course',
  price:349, weeks:4, format:'Online', accredited:false, featured:false,
  rating:4.8, reviews:143, enrolled:388, seats:null, intake:'Start anytime',
  blurb:'Build the vocabulary every Canadian healthcare role assumes you already have — roots, prefixes, suffixes and system-by-system terminology.',
  audience:['All healthcare backgrounds','Career changers','IMGs'],
  outcomes:['Decode unfamiliar medical terms','Use correct terminology in documentation','Read requisitions and reports confidently'],
  careers:['Prerequisite for most academy programmes'],
  modules:[
    {n:'Word Building', lessons:[V('Roots, prefixes and suffixes',28),P('Word-building workbook',30),Q('Word building quiz',25)]},
    {n:'Body Systems Terminology', lessons:[V('Cardiovascular and respiratory',30),V('Musculoskeletal and nervous',30),V('Digestive, renal and endocrine',28),R('Recorded lecture — abbreviations in practice',40),Q('Systems terminology test',40)]},
    {n:'Terminology in Documents', lessons:[V('Reading requisitions and reports',24),P('Sample documents pack',16),Q('Final assessment',35)]}
  ]
},
{
  id:'anatomy', cat:'cert', img:'course-anatomy',
  name:'Anatomy & Physiology',
  sub:'Online Course',
  price:499, weeks:6, format:'Online', accredited:false, featured:false,
  rating:4.8, reviews:97, enrolled:264, seats:null, intake:'Start anytime',
  blurb:'A systems-based grounding in human anatomy and physiology, with recorded lectures and downloadable workbooks you keep for reference.',
  audience:['All healthcare backgrounds','Career changers','IMGs'],
  outcomes:['Describe the major body systems','Explain normal physiological function','Apply anatomy to clinical procedures'],
  careers:['Prerequisite for clinical skills programmes'],
  modules:[
    {n:'Cells, Tissues & Organisation', lessons:[V('Levels of organisation',24),P('Foundations workbook',26),Q('Foundations quiz',20)]},
    {n:'Cardiovascular & Respiratory', lessons:[V('Heart structure and function',32),V('Vessels and circulation',28),V('Gas exchange',26),R('Recorded lecture — cardiac cycle',44),Q('Cardio-respiratory test',30)]},
    {n:'Musculoskeletal & Nervous', lessons:[V('Bones, joints and muscles',34),V('Nervous system overview',30),Q('MSK and neuro quiz',30)]},
    {n:'Renal, Digestive & Endocrine', lessons:[V('Kidneys and fluid balance',28),V('Digestion and absorption',26),V('Hormones and regulation',24),Q('Final assessment',40)]}
  ]
},
{
  id:'exam-prep', cat:'exam', img:'course-exam-prep',
  name:'MLPAO / CSMLS Exam Preparation',
  sub:'Structured Preparation',
  price:799, weeks:8, format:'Hybrid', accredited:false, featured:true,
  rating:4.9, reviews:211, enrolled:356, seats:null, intake:'Rolling — weekly sessions',
  blurb:'Structured preparation for the MLPAO and CSMLS examinations, with a free live Zoom session every week and a full bank of practice questions.',
  audience:['Medical Laboratory Technicians','Medical Laboratory Technologists','IMGs'],
  outcomes:['Cover the full examination blueprint','Practise under timed conditions','Identify and close your weak areas','Attend a live review session every week'],
  careers:['Laboratories','Hospital Laboratory Departments'],
  freeSession:true,
  modules:[
    {n:'Blueprint & Study Plan', lessons:[V('How the examination is structured',22),P('8-week study plan',10),Q('Diagnostic assessment',60)]},
    {n:'Clinical Chemistry', lessons:[V('Core chemistry review',36),R('Recorded lecture — chemistry pitfalls',48),Q('Chemistry question set',50)]},
    {n:'Haematology & Transfusion', lessons:[V('Haematology review',34),V('Transfusion science review',30),Q('Haematology question set',50)]},
    {n:'Microbiology & Histology', lessons:[V('Microbiology review',32),V('Histotechnology review',26),Q('Micro and histo question set',45)]},
    {n:'Safety, Quality & Professional Practice', lessons:[V('Quality management review',24),V('Professional practice and ethics',20),Q('Professional practice set',35)]},
    {n:'Live Weekly Review Sessions', inPerson:true, lessons:[S('Weekly Zoom review session (free, every week)',2)]}
  ]
},
{
  id:'office', cat:'cert', img:'course-office',
  name:'Medical Office Procedures',
  sub:'Certificate Course',
  price:749, weeks:5, format:'Hybrid', accredited:false, featured:false,
  rating:4.6, reviews:58, enrolled:112, seats:10, intake:'9 Sep 2026',
  blurb:'Everything a Canadian medical office runs on — scheduling, records, OHIP billing, referrals, supplies and patient communication.',
  audience:['Medical Office Assistants','Career changers','Administrators'],
  outcomes:['Run scheduling and patient flow','Maintain records to standard','Submit OHIP billing correctly','Manage referrals and supplies'],
  careers:["Doctor's Office",'Walk-in Clinic','Specialist Practice','Diagnostic Clinic'],
  modules:[
    {n:'Scheduling & Patient Flow', lessons:[V('Appointment systems',22),V('Managing waiting rooms and no-shows',18),Q('Scheduling quiz',15)]},
    {n:'Records & Privacy', lessons:[V('Charting standards',24),V('PHIPA and patient privacy',26),P('Privacy checklist',8),Q('Records quiz',20)]},
    {n:'OHIP Billing', lessons:[V('Billing codes and submission',30),V('Rejections and reconciliation',24),P('Billing quick reference',14),Q('Billing test',30)]},
    {n:'Referrals & Supplies', lessons:[V('Referral workflow',20),V('Inventory and ordering',16),Q('Operations quiz',15)]},
    {n:'Office Simulation Day', inPerson:true, lessons:[S('Simulated clinic day',5),S('Assessment',2)]}
  ]
},
{
  id:'diabetes', cat:'skill', img:'course-diabetes',
  name:'Diabetes Workshop',
  sub:'One-Day Workshop',
  price:299, weeks:1, format:'Hybrid', accredited:false, featured:false,
  rating:4.7, reviews:73, enrolled:158, seats:15, intake:'30 Aug 2026',
  blurb:'Practical diabetes support — glucose monitoring, insulin administration, hypo/hyperglycaemia recognition and patient education.',
  audience:['Nurses','Personal Support Workers','Pharmacy staff','Medical Office Assistants'],
  outcomes:['Perform and interpret glucose monitoring','Support insulin administration safely','Recognise and act on hypo/hyperglycaemia','Deliver basic patient education'],
  careers:['Long-term Care','Community Care','Pharmacy','Clinics'],
  modules:[
    {n:'Diabetes Foundations', lessons:[V('Type 1, type 2 and gestational diabetes',26),V('Monitoring and targets',22),Q('Foundations quiz',20)]},
    {n:'Medication & Emergencies', lessons:[V('Insulin types and administration',28),V('Hypo and hyperglycaemia response',24),P('Emergency response card',4),Q('Emergency quiz',18)]},
    {n:'Workshop Day', inPerson:true, lessons:[S('Glucose monitoring and insulin pen practice',3),S('Case scenarios and assessment',2)]}
  ]
},
{
  id:'whmis', cat:'safe', img:'course-whmis',
  name:'WHMIS Certification & TDG',
  sub:'Compliance Certification',
  price:199, weeks:1, format:'Online', accredited:true, featured:false,
  rating:4.8, reviews:245, enrolled:612, seats:null, intake:'Start anytime',
  blurb:'Workplace Hazardous Materials Information System and Transportation of Dangerous Goods — the certification Ontario employers ask for, completed online with an instant certificate.',
  audience:['All healthcare workers','Laboratory staff','Students'],
  outcomes:['Interpret WHMIS labels and pictograms','Read and apply safety data sheets','Follow TDG requirements for transport','Download your certificate immediately'],
  careers:['Required by most Ontario healthcare employers'],
  modules:[
    {n:'WHMIS 2015', lessons:[V('Hazard classes and pictograms',24),V('Labels and safety data sheets',26),P('Pictogram reference card',4),Q('WHMIS assessment',30)]},
    {n:'Transportation of Dangerous Goods', lessons:[V('TDG classes and documentation',22),V('Packaging, marking and placarding',20),Q('TDG assessment',25)]},
    {n:'Certification', lessons:[Q('Final certification examination',40)]}
  ]
},
{
  id:'crisis', cat:'safe', img:'course-crisis',
  name:'Crisis Intervention',
  sub:'Certificate Course',
  price:329, weeks:2, format:'Hybrid', accredited:false, featured:false,
  rating:4.8, reviews:69, enrolled:118, seats:12, intake:'2 Sep 2026',
  blurb:'De-escalation and crisis response for healthcare settings — recognising escalation, verbal de-escalation, personal safety and post-incident support.',
  audience:['Nurses','Personal Support Workers','Front-desk staff','Security-adjacent roles'],
  outcomes:['Recognise escalation early','Apply verbal de-escalation techniques','Maintain personal and patient safety','Support colleagues after an incident'],
  careers:['Hospital','Long-term Care','Community Mental Health','Walk-in Clinic'],
  modules:[
    {n:'Understanding Crisis', lessons:[V('The escalation cycle',26),V('Trauma-informed approaches',24),Q('Foundations quiz',20)]},
    {n:'De-escalation Skills', lessons:[V('Verbal de-escalation techniques',30),V('Personal safety and positioning',22),R('Recorded lecture — real scenarios',38),Q('Skills quiz',20)]},
    {n:'Practical Scenarios', inPerson:true, lessons:[S('Role-play scenarios',3),S('Debrief and assessment',2)]}
  ]
},
{
  id:'stress', cat:'safe', img:'course-stress',
  name:'Stress Management Workshop',
  sub:'One-Day Workshop',
  price:249, weeks:1, format:'Hybrid', accredited:false, featured:false,
  rating:4.9, reviews:88, enrolled:174, seats:16, intake:'6 Sep 2026',
  blurb:'Burnout is the leading reason healthcare workers leave the profession. A practical day on recognising it, recovering from it and building resilience.',
  audience:['All healthcare workers','Students','Managers'],
  outcomes:['Recognise the signs of burnout','Apply practical recovery techniques','Build sustainable shift routines','Support colleagues at risk'],
  careers:['Applicable across all healthcare settings'],
  modules:[
    {n:'Understanding Burnout', lessons:[V('Stress, strain and burnout',24),V('Shift work and recovery',22),Q('Self-assessment',15)]},
    {n:'Practical Techniques', lessons:[V('Breathing, grounding and micro-recovery',20),P('Resilience toolkit',12),Q('Techniques quiz',12)]},
    {n:'Workshop Day', inPerson:true, lessons:[S('Facilitated group workshop',4)]}
  ]
}
];

/* ---------- instructors ---------- */
const INSTRUCTORS = [
  {name:'Dr. Anita Raghunath',  role:'Programme Director · Phlebotomy & Laboratory', img:'inst-5', cred:'MD, MLT (CSMLS)', bio:'Twenty-two years in hospital laboratory medicine across Ontario, and the author of the academy’s Canadian phlebotomy protocol module.'},
  {name:'Marisa Delgado',       role:'Lead Instructor · Clinical Skills',            img:'inst-1', cred:'RN, BScN',        bio:'Emergency and urgent-care nurse who runs the ECG, injection and IV practical sessions on campus.'},
  {name:'Dr. Samuel Okonkwo',   role:'Instructor · Anatomy & Physiology',            img:'inst-3', cred:'MD, PhD',         bio:'Physiologist and lecturer; delivers the recorded lecture series used across every certificate programme.'},
  {name:'Jerome Castillo',      role:'Instructor · Medical Assistant & Office',      img:'inst-2', cred:'RPN, MOA',        bio:'Ran a five-physician family practice for nine years before joining the academy full time.'},
  {name:'Dr. Imran Sheikh',     role:'Instructor · Ultrasound & PRP',                img:'inst-4', cred:'MBBS, RDMS',      bio:'Diagnostic imaging specialist supervising the academy’s scanning laboratory.'}
];

/* ---------- the signed-in demonstration student ---------- */
const STUDENT = {
  name:'Priya Nair', first:'Priya', initials:'PN',
  email:'priya.nair@example.com', phone:'416-555-0142',
  city:'Mississauga, ON', joined:'12 May 2026',
  background:'Internationally trained physician (IMG)',
  id:'AMS-2026-0417',
  enrolments:[
    {course:'phlebotomy',        progress:68, paid:1499, status:'active',    started:'14 Jul 2026', nextLesson:[3,2]},
    {course:'ecg',               progress:34, paid:899,  status:'active',    started:'4 Aug 2026',  nextLesson:[1,1]},
    {course:'terminology',       progress:100,paid:349,  status:'completed', started:'20 May 2026', completed:'26 Jun 2026', cert:'AMS-MT-4417'},
    {course:'whmis',             progress:100,paid:199,  status:'completed', started:'15 May 2026', completed:'18 May 2026', cert:'AMS-WH-3902'}
  ],
  schedule:[
    {course:'phlebotomy', title:'Practical day 1 — equipment handling and mannequin draws', date:'2026-08-23', time:'09:00 – 13:00', room:'Skills Lab A', instructor:'Marisa Delgado', status:'confirmed'},
    {course:'ecg',        title:'12-lead placement practice on volunteers',                 date:'2026-08-29', time:'10:00 – 14:00', room:'Skills Lab B', instructor:'Marisa Delgado', status:'confirmed'},
    {course:'phlebotomy', title:'Practical day 2 — supervised live draws and vitals',       date:'2026-09-06', time:'09:00 – 13:00', room:'Skills Lab A', instructor:'Dr. Anita Raghunath', status:'pending'},
    {course:'phlebotomy', title:'Competency assessment and sign-off',                       date:'2026-09-13', time:'09:00 – 12:00', room:'Skills Lab A', instructor:'Dr. Anita Raghunath', status:'pending'}
  ],
  payments:[
    {ref:'AMS-INV-2091', date:'4 Aug 2026',  course:'ecg',         amount:899,  method:'Visa •••• 4021', status:'paid'},
    {ref:'AMS-INV-1884', date:'14 Jul 2026', course:'phlebotomy',  amount:1499, method:'Visa •••• 4021', status:'paid'},
    {ref:'AMS-INV-1502', date:'20 May 2026', course:'terminology', amount:349,  method:'e-Transfer',     status:'paid'},
    {ref:'AMS-INV-1477', date:'15 May 2026', course:'whmis',       amount:199,  method:'e-Transfer',     status:'paid'}
  ]
};

/* ---------- testimonials ---------- */
const TESTIMONIALS = [
  {name:'Fatima A.',  role:'IMG · now Phlebotomist, Brampton Civic', text:'I did the theory at night after my shifts and came in on two Saturdays for the practical. I had a job offer three weeks after the certificate.', course:'Micro-Credential Phlebotomy'},
  {name:'Daniel O.',  role:'RPN · Long-term care',                   text:'The ECG course was exactly what I needed. Lead placement finally made sense once I had done it on a real person with an instructor watching.', course:'ECG & Holter Monitor'},
  {name:'Simran K.',  role:'MLT candidate',                          text:'The weekly review session is free and I never missed one. I passed CSMLS first attempt.', course:'MLPAO / CSMLS Exam Prep'}
];

/* ---------- admin-side operational data ---------- */
const ADMIN = {
  kpis:{revenueMonth:71460, revenuePrev:58230, enrolments:34, enrolPrev:28, students:1284, completion:87, upcomingSessions:9},
  revenue12:[38200,41500,36800,44100,49600,46200,52800,55400,51900,58230,64100,71460],
  months:['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
  recent:[
    {name:'Priya Nair',       course:'ecg',                amount:899,  date:'4 Aug 2026',  method:'Visa •••• 4021', status:'paid'},
    {name:'Marcus Bailey',    course:'phlebotomy',         amount:1499, date:'4 Aug 2026',  method:'Mastercard •••• 8802', status:'paid'},
    {name:'Aisha Rahman',     course:'medical-assistant',  amount:1999, date:'3 Aug 2026',  method:'Visa •••• 1190', status:'paid'},
    {name:'Tomas Nowak',      course:'exam-prep',          amount:799,  date:'3 Aug 2026',  method:'e-Transfer',     status:'paid'},
    {name:'Grace Adeyemi',    course:'injection',          amount:549,  date:'2 Aug 2026',  method:'Visa •••• 3345', status:'paid'},
    {name:'Harpreet Singh',   course:'clinical-research',  amount:2499, date:'2 Aug 2026',  method:'Instalment 1 of 3', status:'partial'},
    {name:'Elena Petrova',    course:'whmis',              amount:199,  date:'1 Aug 2026',  method:'Visa •••• 7761', status:'paid'},
    {name:'David Chen',       course:'ultrasound',         amount:2899, date:'1 Aug 2026',  method:'e-Transfer',     status:'pending'}
  ],
  sessions:[
    {course:'phlebotomy', title:'Practical day 1 — equipment handling',   date:'23 Aug', time:'09:00', room:'Skills Lab A', booked:12, cap:12, instructor:'Marisa Delgado'},
    {course:'phleb-workshop', title:'Phlebotomy Workshop — full day',     date:'24 Aug', time:'09:00', room:'Skills Lab A', booked:15, cap:18, instructor:'Dr. Anita Raghunath'},
    {course:'injection', title:'Mannequin practice — deltoid',            date:'26 Aug', time:'13:00', room:'Skills Lab B', booked:8,  cap:14, instructor:'Marisa Delgado'},
    {course:'ecg',       title:'12-lead placement practice',              date:'29 Aug', time:'10:00', room:'Skills Lab B', booked:11, cap:12, instructor:'Marisa Delgado'},
    {course:'diabetes',  title:'Glucose monitoring and insulin pens',     date:'30 Aug', time:'09:30', room:'Classroom 2',  booked:9,  cap:16, instructor:'Jerome Castillo'},
    {course:'wound-care',title:'Dressing technique lab',                  date:'2 Sep',  time:'14:00', room:'Skills Lab B', booked:6,  cap:14, instructor:'Marisa Delgado'}
  ],
  students:[
    {name:'Priya Nair',      email:'priya.nair@example.com',   courses:4, active:2, spend:2946, last:'Today',      status:'active'},
    {name:'Marcus Bailey',   email:'m.bailey@example.com',     courses:1, active:1, spend:1499, last:'Today',      status:'active'},
    {name:'Aisha Rahman',    email:'a.rahman@example.com',     courses:2, active:1, spend:2348, last:'Yesterday',  status:'active'},
    {name:'Tomas Nowak',     email:'t.nowak@example.com',      courses:1, active:1, spend:799,  last:'Yesterday',  status:'active'},
    {name:'Grace Adeyemi',   email:'g.adeyemi@example.com',    courses:3, active:1, spend:1947, last:'2 days ago', status:'active'},
    {name:'Harpreet Singh',  email:'h.singh@example.com',      courses:1, active:1, spend:833,  last:'2 days ago', status:'instalment'},
    {name:'Elena Petrova',   email:'e.petrova@example.com',    courses:2, active:0, spend:548,  last:'5 days ago', status:'completed'},
    {name:'David Chen',      email:'d.chen@example.com',       courses:1, active:0, spend:0,    last:'6 days ago', status:'awaiting'}
  ],
  topCourses:[
    {id:'phlebotomy', enrol:11, rev:16489},
    {id:'medical-assistant', enrol:6, rev:11994},
    {id:'ecg', enrol:8, rev:7192},
    {id:'exam-prep', enrol:9, rev:7191},
    {id:'ultrasound', enrol:2, rev:5798}
  ]
};

/* ---------- shared helpers ---------- */
const byId = id => COURSES.find(c=>c.id===id);
const money = n => '$'+n.toLocaleString('en-CA');
const lessonCount = c => c.modules.reduce((s,m)=>s+m.lessons.length,0);
const hours = c => Math.round(c.modules.reduce((s,m)=>s+m.lessons.reduce((t,l)=>
  t + (l.type==='session'? l.len*60 : l.type==='pdf'? l.len*1.5 : l.type==='quiz'? l.len*1.2 : l.len),0),0)/60);
const LESSON_ICON = {video:'i-play', pdf:'i-pdf', audio:'i-audio', quiz:'i-quiz', session:'i-pin'};
const LESSON_LABEL = {video:'Video', pdf:'PDF', audio:'Recorded lecture', quiz:'Quiz', session:'In-person'};
const lessonMeta = l => l.type==='pdf' ? l.len+' pages'
  : l.type==='quiz' ? l.len+' questions'
  : l.type==='session' ? l.len+' hours on campus'
  : l.len+' min';
