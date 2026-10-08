import type { ConsortiumCompany, TradeCorridor } from '../types';

export interface ComprehensiveService {
  id: string;
  category: 'Bonded Carrier' | 'Customs Clearance' | 'Maritime' | 'TIR Transit' | 'Afghan Transit' | 'Specialized Fleet';
  title: string;
  subtitle: string;
  managingEntity: string;
  badge: string;
  statutoryAuthority: string;
  overview: string;
  coreHighlights: string[];
  operationalMetrics: { label: string; value: string }[];
  technicalSpecs: string[];
  activeHubs: string[];
}

export const COMPREHENSIVE_SERVICES: ComprehensiveService[] = [
  {
    id: 'bonded-carrier',
    category: 'Bonded Carrier',
    title: 'Bonded Carrier Line-Haul & Dry Ports Transshipment',
    subtitle: 'FBR Licensed Port-to-Dryport Transshipment Under Sec 121–123 Customs Act 1969',
    managingEntity: 'Docks (Pvt) Ltd (DPL)',
    badge: 'FBR BONDED LICENSED',
    statutoryAuthority: 'Officially approved Private Customs Bonded Carrier operating nationwide since 2012',
    overview: 'Direct duty-unpaid transshipment (TP) connecting coastal seaports (KICT, SAPT, QICT, KPT, AICT) to all up-country inland dry ports across Pakistan. Operating under strict FBR regulatory escrow with zero-defect cargo containment.',
    coreHighlights: [
      'Duty-Unpaid TP Transit: Direct haulage from coastal seaports to 8 Punjab dry ports, KPK, Balochistan, and Gilgit.',
      '2,000+ Customs-Registered Fleet: Customs-approved prime movers, 40ft/20ft flatbeds, and heavy multi-axle trailers.',
      'Triple-Tier Tamper-Evident Seals: Customs lead seal + shipping line bolt seal + 3 uniquely numbered anti-theft paper seals inspected at 9 checkpoints.',
      'Inter-Port Transfers: Seamless bonded shuttling between KICT, SAPT, QICT, and off-dock yards.',
      'Empty Turnaround Depots: Return depots in Lahore, Faisalabad, Sambrial & Peshawar eliminating carrier detention charges.',
      'Over-Dimensional (OOG) Escorts: Specialized multi-axle hydraulic trailers moving project equipment under customs escort.'
    ],
    operationalMetrics: [
      { label: 'Monthly Containers', value: '1,000+' },
      { label: 'Bonded Vehicles', value: '2,000+' },
      { label: 'FBR Compliance', value: '100% Legal' },
      { label: 'Route Checkpoints', value: '9 Verified' }
    ],
    technicalSpecs: [
      'Sections 121–123 Customs Act 1969 Compliance',
      'Electronic WeBOC TP-GD generation and validation',
      'Satellite GPS convoy tracking with automated route geo-fencing',
      'Origin-to-destination weighment discrepancy audit log'
    ],
    activeHubs: [
      'Punjab: Lahore (Mughal Pura, Jia Bagga, DP World, NLC), Faisalabad, Multan, Sialkot (Sambrial), Islamabad',
      'Balochistan: Quetta Railway Dry Port, Quetta NLC, Chaman Border, Taftan Border (Iran)',
      'KPK: Peshawar Dry Port, Azakhel (Nowshera), Torkham Border, Ghulam Khan Border',
      'Sindh: Karachi Inter-Port Grid (KICT/SAPT/QICT/KPT), Hyderabad NLC, AICT'
    ]
  },
  {
    id: 'customs-clearance',
    category: 'Customs Clearance',
    title: 'Customs Clearance, Port Operations & Tariff Advisory',
    subtitle: 'WeBOC, PSW & All-Pakistan Port Clearance Desks Under Sec 207 Customs Act 1969',
    managingEntity: 'Muhib International (SMC-Pvt) Ltd',
    badge: 'PSW CERTIFIED BROKER',
    statutoryAuthority: 'Licensed Customs House Agent (Sec 207) operating across all national Collectorates',
    overview: 'Complete digital Pakistan Single Window (PSW) and WeBOC electronic Goods Declaration (GD) handling. Providing expert HS code classification, tariff valuation, plant/animal quarantine clearances, and regulatory SRO exemptions.',
    coreHighlights: [
      'Digital PSW & WeBOC Mastery: Accelerated duty assessments, paperless e-filings, and real-time GD clearance.',
      'Seaport Terminal Presence: Dedicated clearing staff stationed permanently at KICT, SAPT, QICT, KPT East/West Wharves, and KGTL.',
      'Off-Dock Bonded Clearing: Fast release representation at Al-Hamd (AICT), NLC Sultanabad, and private CFS terminals.',
      'Border Customs Brokerage: Stationed clearing desks at Torkham & Ghulam Khan (KP), Chaman & Taftan (Balochistan), and Sost (CPEC).',
      'SRO Concessions & Relief: Special Regulatory Order duty relief for industrial machinery, energy plants, diplomatic, and relief cargo.',
      'Demurrage & Detention Defense: Pre-arrival documentation audits saving consignees heavy shipping line detention costs.'
    ],
    operationalMetrics: [
      { label: 'Digital Filing', value: '100% WeBOC/PSW' },
      { label: 'Port & Border Desks', value: '7+ Active' },
      { label: 'Demurrage Risk', value: 'Zero Defect' },
      { label: 'Clearance Turnaround', value: 'Rapid Track' }
    ],
    technicalSpecs: [
      'Section 207 Customs Act 1969 & Customs Rules 2001',
      'Direct statutory liaison with PSQCA, EDB, and Ministry of Commerce',
      'Green Channel and Risk Management System (RMS) compliance',
      'Cash GD, TP GD, and Export Rebate handling'
    ],
    activeHubs: [
      'Karachi Appraisement East & West',
      'Port Muhammad Bin Qasim (QICT)',
      'South Asia Pakistan Terminals (SAPT)',
      'Torkham, Chaman, Taftan, and Sost Borders'
    ]
  },
  {
    id: 'maritime-liner',
    category: 'Maritime',
    title: 'Maritime Freight & Vessel Slot Operations',
    subtitle: 'Global Ocean Freight Forwarding, NVOCC Slot Management & Marine Chartering',
    managingEntity: 'Vantage Shipping Line (VSL)',
    badge: 'NVOCC LINER CARRIER',
    statutoryAuthority: 'Dubai Maritime City Authority & Global Maritime Trade Licensures',
    overview: 'Licensed Non-Vessel Operating Common Carrier issuing through Multimodal Bills of Lading (MBL/HBL). Contracted slot space agreements on Tier-1 global ocean carriers connecting Pakistan to Middle East, China, Europe, and the Americas.',
    coreHighlights: [
      'Contracted Vessel Slot Charters: Guaranteed container space during peak shipping cycles and seasonal surges.',
      'Dedicated Regional Feeder: Regular scheduled container loops linking Karachi (SAPT/QICT) with Jebel Ali (Dubai) and Hamriya.',
      'ISO Tank Operations: Dedicated sea desk for food-grade, molasses, chemical, and IMO dangerous goods liquid haulage.',
      'Continuous Cold-Chain Reefer: Temperature-controlled ocean bookings for fruits (citrus, mangoes), meat, and seafood exports.',
      'Heavy-Lift & Project Cargo Rigging: Full/part vessel charters, out-of-gauge (OOG) flat-racks, and break-bulk stevedoring.'
    ],
    operationalMetrics: [
      { label: 'Global Port Corridors', value: '50+' },
      { label: 'Container Types', value: 'FCL & LCL' },
      { label: 'Demurrage Control', value: 'Zero Risk' },
      { label: 'Feeder Frequency', value: 'Weekly Fixed' }
    ],
    technicalSpecs: [
      'MBL & HBL Multimodal Documentation',
      'IMDG Code certified liquid transport',
      'Direct port-to-inland bonded handoff into DPL fleet',
      'DP World Jebel Ali Free Zone (JAFZA) transshipment hub'
    ],
    activeHubs: [
      'Karachi: KICT, SAPT, QICT, KPT, KGTL, Gwadar Port',
      'UAE: Jebel Ali Port (DP World Hub), Hamriya Port (Sharjah)',
      'Oman: Salalah & Sohar'
    ]
  },
  {
    id: 'tir-transit',
    category: 'TIR Transit',
    title: 'International TIR Transit & Strategic Overland Corridors',
    subtitle: 'UN TIR Convention (1975) • FBR SRO 1066(I)/2017 • IRU Accredited',
    managingEntity: 'MAK Consortium Joint Operational Command',
    badge: 'IRU ACCREDITED',
    statutoryAuthority: 'International Road Transport Union (IRU) & ATCUAE Carnet de Passage',
    overview: 'Turnkey overland road freight corridors connecting Pakistan deep-sea ports across Iran, Turkey, China, and Central Asian Republics (CARs) with standardized customs sealing bypassing en-route border inspections.',
    coreHighlights: [
      '250+ Registered TIR Fleet: Heavy prime movers, box trailers, and specialized units certified under TIR specifications.',
      '€100,000 Carnet Financial Guarantee: Eliminates border cash deposits, customs duties, and physical checking across transit states.',
      'TIR-EPD Electronic Filing: Pre-declaration via Pakistan Single Window (PSW) and IRU portals for non-stop border transit.',
      'Pakistan to Türkiye (via Iran): 5,300 km corridor (Karachi/Quetta → Taftan → Tehran → Istanbul) connecting directly to EU.',
      'Central Asian Republics (CARs): 3,813 km corridor (Karachi → Torkham → Kabul → Hairatan/Termez → Tashkent, Dushanbe, Almaty).',
      'China CPEC High-Altitude Corridor: 1,106 km corridor via Sost Customs Dry Port & Khunjerab Pass to Kashgar (Xinjiang).'
    ],
    operationalMetrics: [
      { label: 'Connected Nations', value: '10+' },
      { label: 'Active TIR Vehicles', value: '250+' },
      { label: 'Carnet Guarantee', value: '€100,000' },
      { label: 'Full Insurance', value: 'CMR Liability' }
    ],
    technicalSpecs: [
      'Inviolable customs cable seals verified at international frontiers',
      'Full CMR carrier liability insurance coverage',
      'Reefer transport for agro-commodities with mobile power gensets',
      'Karachi cross-docking saving container demurrage penalties'
    ],
    activeHubs: [
      'Taftan Border (Iran / Turkey Gateway)',
      'Torkham & Chaman (Central Asia Gateway)',
      'Sost / Khunjerab Pass (China Gateway)'
    ]
  },
  {
    id: 'afghan-transit',
    category: 'Afghan Transit',
    title: 'Afghan Transit Trade (AzOT) Turnkey Logistics',
    subtitle: 'APTTA Bilateral Framework • One-Window Command • 60,000+ TEUs Moved',
    managingEntity: 'Muhib International & Docks (Pvt) Ltd',
    badge: 'APTTA CROSS-BORDER',
    statutoryAuthority: 'Authorized APTTA Transit Operator with Security Escort Accreditations',
    overview: 'Daily scheduled line-haul connecting Karachi ports directly to major Afghan consumption centers (Kabul, Kandahar, Jalalabad, Herat, Mazar-e-Sharif) under official bilateral trade protocols.',
    coreHighlights: [
      'Dual Border Gateways: Regular daily transit convoys moving through Torkham (N-5 Highway) and Chaman (N-25 Baluchistan Link).',
      'Proven Mega Project Track Record: Trusted operator for UN World Food Programme (WFP), NATO retrograde operations, and China Aynak Copper Project.',
      'Port Cross-Stuffing Defense: Rapid off-dock de-stuffing into bonded trucks saving clients millions in shipping line detention.',
      'Reverse Empty Box Repatriation: Swift return management returning empty containers back to Karachi yards within allowed free time.',
      'Multi-Tier Armed Security: Soft armed escort across Pakistan corridors and accredited APPF security inside Afghanistan.'
    ],
    operationalMetrics: [
      { label: 'TEUs Transited', value: '60,000+' },
      { label: 'Reefer / Dry Split', value: '55% / 45%' },
      { label: 'Safe Delivery Ratio', value: '100%' },
      { label: 'Border Clearances', value: 'Daily Convoys' }
    ],
    technicalSpecs: [
      'Electronic GD processing under WeBOC/PSW',
      '24/7 central satellite GPS convoy surveillance',
      'Reefer gensets for perishable food items',
      'Approved customs border marshaling yards'
    ],
    activeHubs: [
      'Northern Gate: Torkham Border (Haji Gulab Market Desk)',
      'Southern Gate: Chaman Border (Mall Road / Khojak Desk)',
      'Subordinate Gates: Ghulam Khan, Kharlachi, Angur Ada, Badini'
    ]
  },
  {
    id: 'specialized-fleet',
    category: 'Specialized Fleet',
    title: 'Engineered Transport, Cold-Chain & Private Cargo Distribution',
    subtitle: '1,500+ Commercial Prime Movers • 200+ Reefer Gensets • 500,000+ Sq. Ft. Warehouses',
    managingEntity: 'Truckit (Pvt) Ltd',
    badge: 'ENGINEERED FLEET',
    statutoryAuthority: 'NHA Compliant National Commercial Transport Fleet',
    overview: 'Complete nationwide commercial freight and engineered haulage. Operating temperature-controlled reefer gensets (-25°C to +25°C), ISO tanks for hazardous chemicals, hydraulic low-beds for heavy machinery up to 200T+, and double-deck car carriers.',
    coreHighlights: [
      'Active Cold-Chain Fleet: 200+ Clip-on/Undermount gensets powering 40ft high-cube reefers with digital temperature logging.',
      'Bulk Liquid ISO Tanks: Stainless Steel SS 316 containers (21,000L - 26,000L) with steam heating for chemicals and food-grade oils.',
      'Hydraulic Multi-Axle Low-Beds: Goldhofer multi-axles for 200T+ transformers, power turbines, and CPEC industrial kilns.',
      'Pakistan Car Carrier Network: Double-deck hydraulic vehicle haulers moving passenger cars, SUVs, and commercial chassis damage-free.',
      'Nationwide Private Cargo (FTL): Scheduled daily line-haul serving 600+ corporate clients between seaports and industrial hubs.',
      'Secure Bonded Warehouses: 500,000+ sq. ft. racked and open storage in Lahore, Karachi, Sialkot, and Islamabad.'
    ],
    operationalMetrics: [
      { label: 'Commercial Fleet', value: '1,500+' },
      { label: 'Reefer Gensets', value: '200+' },
      { label: 'Corporate Accounts', value: '600+' },
      { label: 'Warehousing Space', value: '500,000+ Sq Ft' }
    ],
    technicalSpecs: [
      'Full lashing, rigging & tank cleaning certifications',
      'National Highway Authority (NHA) load limit compliance',
      'Electronic Proof of Delivery (POD) milestone tracking',
      'High-speed motorway routing via M-9, M-5, M-3, M-2'
    ],
    activeHubs: [
      'Karachi Central Dispatch Hub',
      'Lahore Central Logistics Terminal (Mughal Pura / Jia Bagga)',
      'Faisalabad Textile Industrial Hub',
      'Islamabad / Rawalpindi Distribution Center'
    ]
  }
];

export const CONSORTIUM_ENTITIES: ConsortiumCompany[] = [
  {
    id: 'docks',
    name: 'Docks (Pvt) Ltd.',
    brandTag: 'Customs Bonded Carrier & Regional Transit',
    tagline: 'FBR Licensed Private Customs Bonded Carrier Operating Nationwide Since 2012',
    description: 'Statutory bonded line-haul connecting coastal ports (KICT, SAPT, QICT, KPT) directly to up-country dry ports under Sections 121–123 of Customs Act 1969. Over 1,000+ containers moved monthly with triple-tier tamper seals.',
    specialties: [
      'Duty-Unpaid TP Transit to All Up-Country Dry Ports',
      '2,000+ Customs-Approved Prime Movers & Multi-Axles',
      'Triple-Tier Tamper-Evident Seals Verified at 9 Checkpoints',
      'Inter-Port Bonded Shuttling Between KICT, SAPT, QICT',
      'Empty Container Return Depots in Lahore, Faisalabad & Peshawar'
    ],
    operationalHubs: ['Karachi Coastal Ports', 'Lahore Dry Ports', 'Faisalabad Dry Port', 'Peshawar Dry Port', 'Quetta Dry Port'],
    keyHighlights: ['FBR Bonded Lic. 2012', '1,000+ Containers/Month', '100% Bonded Legal Compliance'],
    accentColor: '#1E3A8A',
    badge: 'BONDED CARRIER LIC.',
    fleetCount: '2,000+ Bonded Vehicles',
    established: '1981'
  },
  {
    id: 'truckit',
    name: 'Truckit (Pvt) Ltd.',
    brandTag: 'Domestic Commercial Haulage & Specialized Cold-Chain',
    tagline: '1,500+ Commercial Prime Movers, Heavy Low-Beds & 200+ Reefer Gensets',
    description: 'Pakistan’s leading private cargo and engineered heavy transport operator. Providing nationwide line-haul across national motorways, temperature-controlled cold chains, bulk liquid ISO tanks, and double-deck automotive carriers.',
    specialties: [
      '1,500+ Commercial Trucks & Multi-Axle Trailers',
      '200+ Clip-On & Undermount Reefer Gensets (-25°C to +25°C)',
      'Heavy Drop-Deck Low-Beds & Hydraulic Multi-Axles (Up to 200T+)',
      'Stainless Steel SS 316 ISO Tanks for Food & Chemical Liquids',
      '500,000+ Sq. Ft. Bonded & Dry Warehousing Network'
    ],
    operationalHubs: ['National Motorways (M-9, M-5, M-3, M-2)', 'Lahore Central Terminal', 'Karachi Dispatch Center', 'Islamabad Depot'],
    keyHighlights: ['1,500+ Fleet Units', '600+ Corporate Accounts', '99.8% On-Time Delivery'],
    accentColor: '#D97706',
    badge: '1,500+ COMMERCIAL FLEET',
    fleetCount: '1,500+ Prime Movers',
    established: '2016'
  },
  {
    id: 'muhib',
    name: 'Muhib International (SMC-Pvt) Ltd',
    brandTag: 'Customs Clearance & Regulatory Brokerage Desks',
    tagline: 'WeBOC / PSW Electronic GD Handling & Seaport Terminal Clearances',
    description: 'Licensed Customs Agency operating under Section 207 of Customs Act 1969. Stationed clearing desks at Karachi Port, Port Qasim, and international border gateways with full digital Pakistan Single Window (PSW) capabilities.',
    specialties: [
      'Licensed Customs House Agent (Sec 207 Customs Act 1969)',
      'Digital PSW & WeBOC Electronic Goods Declaration Processing',
      'On-Ground Clearing Desks at KICT, SAPT, QICT, KPT, and KGTL',
      'Border Desks at Torkham, Chaman, Taftan, and Sost',
      'Special Regulatory Order (SRO) Duty Concessions & Tariff Advisory'
    ],
    operationalHubs: ['Karachi Ports Command', 'Torkham Border Terminal', 'Chaman Border Dry Port', 'Taftan (Iran Border)', 'Sost (CPEC)'],
    keyHighlights: ['100% Digital PSW/WeBOC', '7+ Port & Border Desks', 'Zero Demurrage Risk'],
    accentColor: '#047857',
    badge: 'PSW LICENSED BROKER',
    fleetCount: '7+ Dedicated Customs Desks',
    established: '1995'
  },
  {
    id: 'vantage',
    name: 'Vantage Shipping Line',
    brandTag: 'Global Maritime Liner Operations & NVOCC Slots',
    tagline: 'Vessel Slot Allocations, Ocean Forwarding & Karachi-Jebel Ali Feeder',
    description: 'Licensed NVOCC carrier issuing Multimodal Bills of Lading (MBL/HBL). Connecting Pakistan exporters and importers to the Middle East, Far East, China, Europe, and Americas with regular feeder rotations.',
    specialties: [
      'Licensed NVOCC & Multimodal Bills of Lading Issuance',
      'Guaranteed Slot Allocations on Tier-1 Global Ocean Carriers',
      'Regular Scheduled Feeder Services: Karachi ⇄ Jebel Ali / Hamriya',
      'ISO Tank & Flexitank Management for Hazardous & Food Liquids',
      'Marine Reefer Cargo Bookings with Direct Inland Bonded Handoff'
    ],
    operationalHubs: ['Jebel Ali Port (DP World Hub), Dubai', 'Hamriya Port, UAE', 'KICT / SAPT / QICT, Karachi', 'Gwadar Deepsea Port'],
    keyHighlights: ['50+ Global Port Corridors', 'FCL & LCL Consolidation Hubs', 'Zero Risk Demurrage Control'],
    accentColor: '#0284C7',
    badge: 'NVOCC LINER',
    fleetCount: 'Owned Boxes & Chartered Slots',
    established: '2008'
  }
];

export const NATIONWIDE_STATIONS = [
  { name: 'Karachi (Head Office)', role: 'Tower / Seaport Command', address: 'Office No. 14, 1st Floor, State Life Bldg No 7, G-Allana Road, Tower, Karachi', phone: '+92-21-32330103 / 0104' },
  { name: 'Dubai (UAE Hub)', role: 'International Liner Agency (VSL)', address: 'Shipping Tower, Al Mina Road, Jebel Ali / Dubai, UAE', phone: '+971 (4) 880-7711' },
  { name: 'Lahore Hub', role: 'Dry Ports & Central Line-Haul', address: 'Mughal Pura / Jia Bagga Dry Port Stations, Lahore', phone: '+92-42-3759900' },
  { name: 'Islamabad / RWP', role: 'Federal Liaison & I-9 Dry Port', address: 'Spinzer Plaza, I-9 Markaz, Islamabad', phone: '+92-51-4433100' },
  { name: 'Peshawar Hub', role: 'Regional Overland Transit Command', address: "Dean's Trade Centre, 3rd Floor, Peshawar", phone: '+92-91-5274400' },
  { name: 'Torkham Border', role: 'Afghan Transit Northern Gate', address: 'Haji Gulab Market Desk, Torkham Border Terminal', phone: '03218496006' },
  { name: 'Chaman & Quetta', role: 'Southern Afghan Gate & Quetta Hub', address: 'Mall Road Chaman / Khojak Road, Balochistan', phone: '03218496006' },
  { name: 'Sialkot (Sambrial)', role: 'Export Cargo & Dry Port Station', address: 'Sambrial Dry Port Station, Sialkot', phone: '+92-52-6520100' },
  { name: 'Faisalabad Hub', role: 'Textile Cargo & Dry Port Desk', address: 'Dry Port Complex, Faisalabad', phone: '+92-41-8720100' },
  { name: 'Multan Station', role: 'South Punjab Transit & Reefer Hub', address: 'Industrial Estate / NLC Terminal, Multan', phone: '+92-61-6510100' },
  { name: 'Hyderabad Station', role: 'NLC Dry Port Sindh Corridor', address: 'NLC Dry Port, Hyderabad', phone: '+92-22-3810100' },
  { name: 'Gwadar Port Hub', role: 'Deep-Sea Port Operations', address: 'Gwadar Free Zone Terminal, Gwadar', phone: '+92-86-4210100' },
  { name: 'Sost / Gilgit (CPEC)', role: 'China Khunjerab Border Hub', address: 'Sost Customs Dry Port, Gilgit-Baltistan', phone: '+92-5813-450100' },
  { name: 'Taftan / Ghulam Khan', role: 'Iran TIR Gateway & Waziristan', address: 'Customs Border Stations, Taftan & Ghulam Khan', phone: '03218496006' },
  { name: 'Azakhel (Nowshera)', role: 'KPK Bonded Terminal Desk', address: 'Azakhel Dry Port, Nowshera', phone: '+92-923-640100' }
];

export const LEADERSHIP_TEAM = [
  { name: 'Khalid Lakhani', role: 'General Manager - Customs & PSW Brokerage', expertise: 'Statutory WeBOC, PSW filings, valuation & port appraisement.' },
  { name: 'Umair', role: 'Head - Maritime & Liner Operations', expertise: 'Liner space allocations, NVOCC documentation & feeder management.' },
  { name: 'Uzair Ali', role: 'Director - Border Operations & TIR Convoy', expertise: 'Torkham, Chaman & Taftan overland cross-border convoys.' },
  { name: 'Salman', role: 'General Manager - Reefer & Heavy Fleet', expertise: 'Fleet maintenance, mobile gensets telematics & line-haul dispatch.' }
];

export const CORPORATE_CLIENTS = [
  'Haier', 'Samsung', 'Honda', 'National Logistics Cell (NLC)', 'China Metallurgical Group (MCC)',
  'Indus Hospital', 'Mobilink', 'UniTrans International', "Gerry's Dnata", 'Power Cement',
  'CPHGC Power Hub', 'PepsiCo', 'Procon Engineering', 'Attock Refinery Limited',
  'Sinotrans', 'United Nations World Food Programme (WFP)', 'Maersk Line', 'Supreme Global Services',
  'Zong CMPak', 'Allco Transfer Printers'
];

export const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    id: 'corridor-1',
    name: 'Karachi Port ⇄ Kabul / Jalalabad (via Torkham)',
    code: 'COR-KHI-KBL-TKM',
    category: 'Afghan Transit',
    origin: 'Karachi Ports (KPT / QICT / SAPT)',
    destination: 'Kabul Customs Yard / Jalalabad, Afghanistan',
    transitTime: '5 – 7 Days',
    mode: 'Bonded Multimodal (Sea + Road)',
    operatingEntity: 'Muhib International + Docks (Pvt) Ltd',
    keyCheckpoints: ['Karachi Ports', 'Hyderabad Motorway M-9', 'Sukkur M-5', 'Peshawar Jamrud', 'Torkham Border', 'Jalalabad Custom Yard'],
    description: 'Primary Northern Afghan Transit corridor handling commercial goods, construction equipment, humanitarian food grains, and relief cargo under APTTA.'
  },
  {
    id: 'corridor-2',
    name: 'Karachi Port ⇄ Kandahar / Herat (via Chaman)',
    code: 'COR-KHI-KDH-CHM',
    category: 'Afghan Transit',
    origin: 'Karachi Ports (KPT / SAPT)',
    destination: 'Kandahar Industrial Park / Herat, Afghanistan',
    transitTime: '4 – 6 Days',
    mode: 'Direct Bonded Road Haulage',
    operatingEntity: 'Muhib International + Truckit',
    keyCheckpoints: ['Karachi Port', 'Bela', 'Khuzdar', 'Quetta Marshaling', 'Chaman Customs', 'Spin Boldak / Weesh', 'Kandahar Custom Yard'],
    description: 'Fastest Southern access route into Southern and Western Afghanistan with dedicated off-dock customs inspection and border transshipment.'
  },
  {
    id: 'corridor-3',
    name: 'Karachi ⇄ Jebel Ali / UAE Regional Feeder',
    code: 'COR-KHI-DXB-MAR',
    category: 'Maritime',
    origin: 'Karachi (SAPT / QICT)',
    destination: 'Jebel Ali Port (DP World Hub), UAE',
    transitTime: '2 – 3 Days Sail',
    mode: 'Ocean Feeder & NVOCC',
    operatingEntity: 'Vantage Shipping Line + Docks (Pvt) Ltd',
    keyCheckpoints: ['Karachi Deepsea Berths', 'Strait of Hormuz Transit', 'Jebel Ali Free Zone (JAFZA)'],
    description: 'Scheduled weekly maritime express connecting Pakistan exporters and importers directly to global transshipment loops at DP World Jebel Ali.'
  },
  {
    id: 'corridor-4',
    name: 'Pakistan ⇄ Uzbekistan / Tajikistan (TIR Corridor)',
    code: 'COR-TIR-CAR-TASH',
    category: 'TIR Corridors',
    origin: 'Karachi / Gwadar Ports',
    destination: 'Tashkent / Termez (Uzbekistan) & Dushanbe (Tajikistan)',
    transitTime: '9 – 12 Days',
    mode: 'International TIR Convention Convoy',
    operatingEntity: 'MAK Consortium Joint Command',
    keyCheckpoints: ['Karachi Port', 'Torkham', 'Kabul', 'Salang Pass', 'Hairatan / Termez River Border', 'Tashkent Logistics Hub'],
    description: 'Revolutionary transit corridor unlocking bilateral trade between Pakistan and landlocked Central Asian nations without double customs inspection under TIR Carnets.'
  },
  {
    id: 'corridor-5',
    name: 'Pakistan to Türkiye (via Iran Overland TIR)',
    code: 'COR-PAK-TURK-IRAN',
    category: 'TIR Corridors',
    origin: 'Karachi / Quetta',
    destination: 'Istanbul / Ankara, Türkiye',
    transitTime: '10 – 12 Days (5,300 km)',
    mode: 'TIR Carnet International Convoy',
    operatingEntity: 'MAK Consortium Joint Command',
    keyCheckpoints: ['Quetta', 'Taftan Border', 'Zahedan', 'Tehran', 'Tabriz', 'Gurbulak', 'Ankara', 'Istanbul Gateway'],
    description: 'Direct commercial overland gateway into the European Union under €100,000 international customs carnet guarantees.'
  },
  {
    id: 'corridor-6',
    name: 'Pakistan to China (CPEC Overland Route)',
    code: 'COR-PAK-CHN-CPEC',
    category: 'TIR Corridors',
    origin: 'Islamabad / Karachi',
    destination: 'Kashgar (Xinjiang), China',
    transitTime: '4 – 6 Days (1,106 km)',
    mode: 'High-Altitude Bonded Trade Pipeline',
    operatingEntity: 'Truckit + Muhib International',
    keyCheckpoints: ['Hassanabdal', 'Mansehra', 'Chilas', 'Gilgit', 'Sost Customs Dry Port', 'Khunjerab Pass', 'Tashkurgan', 'Kashgar Hub'],
    description: 'High-altitude bonded trade corridor crossing the Khunjerab Pass connecting Pakistan directly with Western China.'
  }
];

export const SERVICE_OPTIONS = [
  'Bonded Carrier Line-Haul (Docks Pvt Ltd)',
  'Customs Clearance & PSW Brokerage (Muhib Intl)',
  'Ocean Freight / Feeder (Vantage Shipping)',
  'International TIR Transit Corridors (UN TIR Carnet)',
  'Afghan Transit Trade (AzOT via Torkham & Chaman)',
  'Refrigerated Cold Chain Transport (-25°C to +25°C)',
  'Heavy Lift & Hydraulic Multi-Axle Haulage',
  'Bulk Liquid ISO Tanks (SS 316)',
  'Bonded Warehousing (500,000+ Sq Ft)'
];

export const CARGO_TYPES = [
  'Standard Containerized (20ft / 40ft / 45ft)',
  'Customs Bonded Carrier Line-Haul',
  'Afghan Transit Commercial Cargo (AzOT)',
  'TIR Cross-Border Central Asia / Turkey',
  'Breakbulk, Steel & Heavy Project Cargo',
  'Refrigerated Perishables & Agro-Exports',
  'Liquid Bulk (ISO Tanks / Flexitanks)',
  'Dangerous Goods / Chemicals (IMO Class)'
];
