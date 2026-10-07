import type { ConsortiumCompany, TradeCorridor } from '../types';

export const CONSORTIUM_ENTITIES: ConsortiumCompany[] = [
  {
    id: 'docks',
    name: 'Docks (Pvt) Ltd',
    brandTag: 'Maritime Stevedoring & Terminal Operations',
    tagline: 'Premier Gateway Handling at Karachi Port & Port Qasim',
    description: 'Specializing in vessel husbandry, specialized stevedoring, breakbulk cargo management, and terminal container handling with heavy-lift shore crane infrastructure across Pakistan’s key deep-sea ports.',
    specialties: [
      'Deepwater Stevedoring (KPT & PQA)',
      'Heavy Lift & Project Cargo Discharging',
      'Port Berth Marshaling & Warehousing',
      'Bulk Liquid & Dry Mineral Handling',
      'Vessel Husbandry & Shore Crew Logistics'
    ],
    operationalHubs: ['Karachi Port Trust (East & West Wharves)', 'Port Qasim (QICT / FOTCO / MW)', 'Gwadar Port Deepsea'],
    keyHighlights: ['Over 35+ years maritime legacy', 'Handles 1.2M+ MT annual tonnage', 'Direct quay-to-trailer operations'],
    accentColor: '#1E3A8A', // Deep Maritime Blue
    badge: 'EST. 1988',
    fleetCount: '45+ Port Cranes & Reach Stackers',
    established: '1988'
  },
  {
    id: 'truckit',
    name: 'Truckit Logistics',
    brandTag: 'Digital Fleet Haulage & National Freight Network',
    tagline: 'High-Velocity Inland Transportation & Bonded Carriers',
    description: 'Pakistan’s tech-enabled freight haulage network operating multi-axle trailers, temperature-controlled reefers, and flatbeds connected through GPS telematics for seamless port-to-inland transit.',
    specialties: [
      'Bonded Carrier Container Haulage',
      'Over-Dimensional Cargo (ODC) Transport',
      'Nationwide Express Linehaul (Karachi-Lahore-Islamabad)',
      'Refrigerated Cold-Chain Fleet (Pharma & Agro)',
      '24/7 Satellite Telematics & Geofencing'
    ],
    operationalHubs: ['Karachi Central Hub', 'Lahore Dry Port Corridor', 'Faisalabad Industrial Estate', 'Islamabad / Rawalpindi Hub'],
    keyHighlights: ['650+ Enrolled Prime Movers', '99.4% On-Time Delivery Metric', 'Direct customs-sealed bonded trucking'],
    accentColor: '#D97706', // Amber Gold
    badge: 'DIGITAL FLEET',
    fleetCount: '650+ Commercial Trucks',
    established: '2016'
  },
  {
    id: 'muhib',
    name: 'Muhib International',
    brandTag: 'Afghan Transit Trade (ATT) & Customs Brokerage',
    tagline: 'Unrivaled Border Clearance & TIR Central Asia Gateways',
    description: 'Premier cross-border transit specialist managing Afghan Transit Trade (ATT) under APTTA and TIR Convention routes to Central Asian Republics (Uzbekistan, Tajikistan, Turkmenistan) with zero-delay customs clearance.',
    specialties: [
      'Afghan Transit Trade via Torkham & Chaman',
      'TIR Carnet Cross-Border Corridors',
      'Authorized Custom House Agents (CHA)',
      'Border Transshipment Marshaling (Weesh / Spin Boldak)',
      'Cross-Border Security & Escort Protocol'
    ],
    operationalHubs: ['Torkham Border Terminal', 'Chaman Border Dry Port', 'Peshawar Marshaling Yard', 'Quetta Transit Terminal', 'Kabul Clearing Office'],
    keyHighlights: ['30,000+ Transit TEUs Cleared Annually', 'Direct Customs Bonded Licensure', 'TIR approved transport provider'],
    accentColor: '#047857', // Emerald Green
    badge: 'CROSS-BORDER AUTHORITY',
    fleetCount: 'Dedicated Border Shuttles',
    established: '1995'
  },
  {
    id: 'vantage',
    name: 'Vantage Shipping Line',
    brandTag: 'NVOCC, Feeder Services & Regional Charters',
    tagline: 'Connecting Arabian Gulf, South Asia & Red Sea Ports',
    description: 'Independent container carrier and NVOCC network providing regular vessel feeder slots, ISO tank rentals, and breakbulk chartering between Karachi, Jebel Ali (Dubai), Bandar Abbas, and regional transshipment centers.',
    specialties: [
      'Karachi – Jebel Ali Dedicated Feeder Line',
      'Specialized ISO Tank & Flexitank Operations',
      'Coastal Shipping & Bulk Chartering',
      'NVOCC Container Leasing & Demurrage Mitigation',
      'Middle East – Central Asia Multimodal Routing'
    ],
    operationalHubs: ['Jebel Ali Port (UAE)', 'Hamriya Port (Sharjah)', 'Karachi (QICT/SAPT)', 'Salalah (Oman)', 'Mundra (India)'],
    keyHighlights: ['Weekly Guaranteed Sailings', 'Own Fleet of 4,500+ SOC Containers', 'Zero transshipment rollover guarantee'],
    accentColor: '#0284C7', // Sky Maritime Cyan
    badge: 'NVOCC CARRIER',
    fleetCount: '4,500+ Containers & ISO Tanks',
    established: '2008'
  }
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
    operatingEntity: 'Muhib International + Truckit',
    keyCheckpoints: ['Karachi Ports', 'Hyderabad Motorway M-9', 'Sukkur M-5', 'Peshawar Jamrud', 'Torkham Border', 'Jalalabad Custom Yard'],
    description: 'Primary Northern Afghan Transit corridor handling commercial goods, construction equipment, humanitarian food grains, and consumer cargo under APTTA.'
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
    operatingEntity: 'Muhib International',
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
    operatingEntity: 'Muhib International + Truckit',
    keyCheckpoints: ['Karachi Port', 'Torkham', 'Kabul', 'Salang Pass', 'Hairatan / Termez River Border', 'Tashkent Logistics Hub'],
    description: 'Revolutionary transit corridor unlocking bilateral trade between Pakistan and landlocked Central Asian nations without double customs inspection under TIR Carnets.'
  },
  {
    id: 'corridor-5',
    name: 'North-South National Economic Arteries',
    code: 'COR-PAK-NS-LINE',
    category: 'Domestic Pakistan',
    origin: 'Karachi Maritime Gateways',
    destination: 'Upcountry Dry Ports (Lahore, Sialkot, Faisalabad, Islamabad)',
    transitTime: '36 – 48 Hours',
    mode: 'GPS-Monitored Heavy Linehaul',
    operatingEntity: 'Truckit + Docks (Pvt) Ltd',
    keyCheckpoints: ['Port Qasim / KPT', 'M-9 Motorway', 'M-5 Motorway (Multan)', 'M-3 Motorway (Faisalabad)', 'M-2 (Lahore / Rawalpindi)'],
    description: '24/7 bonded and commercial carrier network delivering containerized and breakbulk manufacturing components to industrial heartlands.'
  }
];

export const CONSORTIUM_STATS = [
  { label: 'Annual Metric Tonnage', value: '3,800,000+', subtext: 'Discharged & Hauled' },
  { label: 'Active Commercial Fleet', value: '1,200+', subtext: 'Trailers & Multi-Axle' },
  { label: 'Transit Corridors', value: '18+', subtext: 'Borders & Marine Lines' },
  { label: 'Single-Window Clearance', value: '< 24 Hrs', subtext: 'Consortium Processing' },
];

export const SERVICE_OPTIONS = [
  'Ocean Freight / Feeder (Vantage Shipping)',
  'Stevedoring & Port Handling (Docks Pvt Ltd)',
  'Bonded Road Freight Haulage (Truckit)',
  'Afghan Transit Trade Clearance (Muhib Intl)',
  'TIR Central Asia Corridors (Muhib + Truckit)',
  'Refrigerated Cold Chain Transport',
  'Heavy Lift & Project Cargo Logistics',
  'Custom House Brokerage (CHA)',
  'Off-Dock Bonded Warehousing'
];

export const CARGO_TYPES = [
  'Standard Containerized (20ft / 40ft / 45ft)',
  'Afghan Transit Commercial Cargo (ATT)',
  'TIR Cross-Border Central Asia Goods',
  'Breakbulk, Steel & Minerals',
  'Project Cargo & Over-Dimensional (ODC)',
  'Refrigerated Perishables & Pharmaceuticals',
  'Dangerous Goods / Chemicals (IMO Class)',
  'Liquid Bulk (ISO Tanks / Flexibags)'
];
