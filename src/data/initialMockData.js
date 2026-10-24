export const INITIAL_REPORTS = [
  {
    id: 'LF-20260808-1001',
    type: 'lost',
    category: 'phone',
    item: {
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      model: '15 Pro 256GB',
      color: 'Natural Titanium',
      description: 'Lost near SRM Campus food court. Has a dark blue transparent MagSafe case.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'SRM Campus Food Court',
      city: 'Chennai',
      latitude: 12.8231,
      longitude: 80.0442
    },
    date: '2026-08-07',
    time: '10:20 AM',
    reporter: {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98765 43210',
      anonymous: false
    },
    privateVerificationDetail: 'Tiny notch scratch on the bottom right corner of metal frame',
    status: 'spotted',
    trail: [
      {
        id: 'tr-101',
        status: 'lost',
        title: 'Reported Missing',
        location: 'SRM Campus Food Court, Chennai',
        timestamp: '2026-08-07T10:20:00Z',
        description: 'Owner noticed phone missing after sitting at central dining table.',
        contributor: 'Rohan Sharma (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-102',
        status: 'spotted',
        title: 'Spotted near Bus Stop',
        location: 'Kattankulathur Bus Terminal',
        timestamp: '2026-08-07T11:05:00Z',
        description: 'Saw a titanium phone with a blue case lying on bench #3.',
        contributor: 'Ananya Roy (Community Helper)',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
        icon: 'Eye'
      }
    ],
    sightings: [
      {
        id: 'sg-1',
        reporterName: 'Ananya Roy',
        location: 'Kattankulathur Bus Terminal',
        date: '2026-08-07',
        time: '11:05 AM',
        notes: 'Saw a titanium phone with blue transparent case on bench #3. Left it there as bus was arriving.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
      }
    ],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T10:20:00Z',
    updatedAt: '2026-08-07T11:05:00Z'
  },
  {
    id: 'FF-20260808-2001',
    type: 'found',
    category: 'phone',
    item: {
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      model: 'Pro 256GB',
      color: 'Natural Titanium',
      description: 'Found iPhone near Kattankulathur bus stop. Handed over to security guard post.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Kattankulathur Bus Terminal Guard Desk',
      city: 'Chennai',
      latitude: 12.8240,
      longitude: 80.0450
    },
    date: '2026-08-07',
    time: '11:40 AM',
    reporter: {
      name: 'Vikram Patel',
      email: 'vikram.p@example.com',
      phone: '+91 91234 56789',
      anonymous: false
    },
    privateVerificationDetail: 'Tiny notch scratch on the bottom right corner of metal frame',
    status: 'found',
    trail: [
      {
        id: 'tr-201',
        status: 'found',
        title: 'Found & Secured',
        location: 'Kattankulathur Bus Terminal Guard Desk',
        timestamp: '2026-08-07T11:40:00Z',
        description: 'Phone turned in to security booth by commuter.',
        contributor: 'Vikram Patel (Finder)',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [
      {
        id: 'cl-101',
        claimantName: 'Rohan Sharma',
        claimantEmail: 'rohan.sharma@example.com',
        claimantPhone: '+91 98765 43210',
        claimNotes: 'This matches my lost phone from the SRM food court. I have the IMEI box and receipt.',
        status: 'approved',
        timestamp: '2026-08-07T12:00:00Z'
      }
    ],
    matches: [],
    createdAt: '2026-08-07T11:40:00Z',
    updatedAt: '2026-08-07T11:40:00Z'
  },
  {
    id: 'LF-20260808-1002',
    type: 'lost',
    category: 'pet',
    item: {
      name: 'Milo (Golden Retriever)',
      brand: 'Dog',
      model: 'Golden Retriever (2 years)',
      color: 'Golden Yellow',
      description: 'Friendly Golden Retriever wearing a bright red leather collar with a silver bone tag.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Indiranagar 100ft Road Park',
      city: 'Bengaluru',
      latitude: 12.9784,
      longitude: 77.6408
    },
    date: '2026-08-06',
    time: '05:30 PM',
    reporter: {
      name: 'Priya Sundaram',
      email: 'priya.s@example.com',
      phone: '+91 99887 76655',
      anonymous: false
    },
    privateVerificationDetail: 'Heart-shaped black birthmark spot on inner left hind leg',
    status: 'spotted',
    trail: [
      {
        id: 'tr-301',
        status: 'lost',
        title: 'Pet Lost',
        location: 'Indiranagar Park, Bengaluru',
        timestamp: '2026-08-06T17:30:00Z',
        description: 'Milo slipped off leash during evening run.',
        contributor: 'Priya Sundaram (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-302',
        status: 'spotted',
        title: 'Spotted Drinking Water',
        location: 'Near Toit Pub, Indiranagar',
        timestamp: '2026-08-06T19:15:00Z',
        description: 'Spotted by cafe owner drinking water near entrance. Red collar visible.',
        contributor: 'Karan Nair (Cafe Owner)',
        icon: 'Eye'
      }
    ],
    sightings: [
      {
        id: 'sg-2',
        reporterName: 'Karan Nair',
        location: 'Near Toit Pub, Indiranagar',
        date: '2026-08-06',
        time: '07:15 PM',
        notes: 'Golden retriever with red collar was resting in shade.',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80'
      }
    ],
    claims: [],
    matches: [],
    createdAt: '2026-08-06T17:30:00Z',
    updatedAt: '2026-08-06T19:15:00Z'
  },
  {
    id: 'LF-20260808-1003',
    type: 'lost',
    category: 'document',
    item: {
      name: 'Leather Passport Holder & Driving License',
      brand: 'Samsonite',
      model: 'Travel Organizer',
      color: 'Brown',
      description: 'Contains Indian Passport (Name: Rahul Verma) and international driving permit.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'T3 Departure Terminal Gate 14',
      city: 'New Delhi',
      latitude: 28.5562,
      longitude: 77.1000
    },
    date: '2026-08-05',
    time: '08:00 AM',
    reporter: {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 97111 22233',
      anonymous: false
    },
    privateVerificationDetail: 'Passport number ends with 4829, contains two folded 100 USD notes inside slot',
    status: 'returned',
    trail: [
      {
        id: 'tr-401',
        status: 'lost',
        title: 'Lost at Airport Terminal',
        location: 'IGI Airport T3, Delhi',
        timestamp: '2026-08-05T08:00:00Z',
        description: 'Dropped holder near security screening counter.',
        contributor: 'Rahul Verma (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-402',
        status: 'found',
        title: 'Found by Airport CISF',
        location: 'T3 Lost & Found Desk',
        timestamp: '2026-08-05T09:30:00Z',
        description: 'Turned in by CISF Officer on duty.',
        contributor: 'Officer Suresh (CISF)',
        icon: 'CheckCircle2'
      },
      {
        id: 'tr-403',
        status: 'verified',
        title: 'Ownership Verified',
        location: 'Online Verification',
        timestamp: '2026-08-05T10:15:00Z',
        description: 'Verified matching passport serial digits.',
        contributor: 'System Verified',
        icon: 'ShieldCheck'
      },
      {
        id: 'tr-404',
        status: 'returned',
        title: 'Returned to Owner',
        location: 'T3 Counter 4',
        timestamp: '2026-08-05T11:00:00Z',
        description: 'Handed over in person prior to flight boarding.',
        contributor: 'Rahul Verma',
        icon: 'CheckCheck'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-05T08:00:00Z',
    updatedAt: '2026-08-05T11:00:00Z'
  },
  {
    id: 'LF-20260808-1004',
    type: 'lost',
    category: 'electronics',
    item: {
      name: 'MacBook Pro 16" Space Black',
      brand: 'Apple',
      model: 'M3 Max 36GB',
      color: 'Space Black',
      description: 'Left inside grey Incase sleeve at Starbucks Connaught Place.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Starbucks Inner Circle, CP',
      city: 'New Delhi',
      latitude: 28.6315,
      longitude: 77.2167
    },
    date: '2026-08-07',
    time: '03:45 PM',
    reporter: {
      name: 'Amitabh Sen',
      email: 'amitabh.sen@example.com',
      phone: '+91 98100 99887',
      anonymous: false
    },
    privateVerificationDetail: 'Custom NASA sticker on top lid corner next to Apple logo',
    status: 'lost',
    trail: [
      {
        id: 'tr-501',
        status: 'lost',
        title: 'Reported Missing',
        location: 'Starbucks CP, New Delhi',
        timestamp: '2026-08-07T15:45:00Z',
        description: 'Laptop forgotten on corner sofa table.',
        contributor: 'Amitabh Sen (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T15:45:00Z',
    updatedAt: '2026-08-07T15:45:00Z'
  },
  {
    id: 'FF-20260808-2002',
    type: 'found',
    category: 'wallet',
    item: {
      name: 'Tommy Hilfiger Men Leather Wallet',
      brand: 'Tommy Hilfiger',
      model: 'Bifold Classic',
      color: 'Black',
      description: 'Found black leather wallet near Metro Station Gate 2 escalator. Contains some cash and Metro Card.',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'M.G. Road Metro Station',
      city: 'Bengaluru',
      latitude: 12.9756,
      longitude: 77.6067
    },
    date: '2026-08-08',
    time: '09:10 AM',
    reporter: {
      name: 'Sneha Kapur',
      email: 'sneha.k@example.com',
      phone: '+91 94455 66778',
      anonymous: true
    },
    privateVerificationDetail: 'Library card named David Miller inside hidden flap',
    status: 'found',
    trail: [
      {
        id: 'tr-601',
        status: 'found',
        title: 'Found & Reported',
        location: 'M.G. Road Metro Station, Bengaluru',
        timestamp: '2026-08-08T09:10:00Z',
        description: 'Wallet found on escalator steps and secured by finder.',
        contributor: 'Anonymous Finder',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T09:10:00Z',
    updatedAt: '2026-08-08T09:10:00Z'
  },
  {
    id: 'LF-20260808-1005',
    type: 'lost',
    category: 'keys',
    item: {
      name: 'Hyundai Smart Car Key & Keyring',
      brand: 'Hyundai',
      model: 'Creta 2024 Fob',
      color: 'Black & Chrome',
      description: 'Car fob attached to a blue woven rope keychain with miniature brass bell.',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Phoenix Marketcity Parking B2',
      city: 'Mumbai',
      latitude: 19.0863,
      longitude: 72.8890
    },
    date: '2026-08-07',
    time: '07:30 PM',
    reporter: {
      name: 'Varun Dhawan',
      email: 'varun.d@example.com',
      phone: '+91 98201 11223',
      anonymous: false
    },
    privateVerificationDetail: 'Blue rope has a tiny knot near the brass bell attachment',
    status: 'lost',
    trail: [
      {
        id: 'tr-701',
        status: 'lost',
        title: 'Lost in Mall Parking',
        location: 'Phoenix Marketcity, Mumbai',
        timestamp: '2026-08-07T19:30:00Z',
        description: 'Fell out of pocket near pillar B2-14.',
        contributor: 'Varun Dhawan (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T19:30:00Z',
    updatedAt: '2026-08-07T19:30:00Z'
  },
  {
    id: 'LF-20260808-1006',
    type: 'lost',
    category: 'accessories',
    item: {
      name: 'Sony WF-1000XM5 Earbuds Case',
      brand: 'Sony',
      model: 'WF-1000XM5',
      color: 'Black Matte',
      description: 'Charging case containing black Sony wireless earbuds.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Hiranandani Gardens Promenade',
      city: 'Mumbai',
      latitude: 19.1197,
      longitude: 72.9051
    },
    date: '2026-08-08',
    time: '07:00 AM',
    reporter: {
      name: 'Meera Iyer',
      email: 'meera.i@example.com',
      phone: '+91 98922 33445',
      anonymous: false
    },
    privateVerificationDetail: 'Right earbud rubber tip is size Small, left earbud tip is size Medium',
    status: 'lost',
    trail: [
      {
        id: 'tr-801',
        status: 'lost',
        title: 'Lost During Morning Walk',
        location: 'Powai Promenade, Mumbai',
        timestamp: '2026-08-08T07:00:00Z',
        description: 'Slipped out of jacket pocket while jogging.',
        contributor: 'Meera Iyer (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T07:00:00Z',
    updatedAt: '2026-08-08T07:00:00Z'
  },
  {
    id: 'LF-20260808-1007',
    type: 'lost',
    category: 'bag',
    item: {
      name: 'North Face Surge Laptop Backpack',
      brand: 'The North Face',
      model: 'Surge 31L',
      color: 'Charcoal Heather',
      description: 'Water-resistant backpack with laptop compartment, college notebooks, and scientific calculator inside.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Central Library Reading Hall',
      city: 'Chennai',
      latitude: 13.0827,
      longitude: 80.2707
    },
    date: '2026-08-07',
    time: '04:15 PM',
    reporter: {
      name: 'Karthik Raja',
      email: 'karthik.r@example.com',
      phone: '+91 94441 23456',
      anonymous: false
    },
    privateVerificationDetail: 'TI-84 calculator has a small yellow Pokemon Pikachu sticker on battery cover',
    status: 'lost',
    trail: [
      {
        id: 'tr-901',
        status: 'lost',
        title: 'Reported Missing in Library',
        location: 'Anna Centenary Library 4th Floor, Chennai',
        timestamp: '2026-08-07T16:15:00Z',
        description: 'Left on desk 42 during coffee break.',
        contributor: 'Karthik Raja (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T16:15:00Z',
    updatedAt: '2026-08-07T16:15:00Z'
  },
  {
    id: 'FF-20260808-2003',
    type: 'found',
    category: 'bag',
    item: {
      name: 'The North Face Charcoal Backpack',
      brand: 'The North Face',
      model: 'Surge 31L',
      color: 'Charcoal',
      description: 'Found grey North Face backpack forgotten in 4th floor study zone. Kept at reception desk.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Anna Centenary Library Reception Desk',
      city: 'Chennai',
      latitude: 13.0829,
      longitude: 80.2710
    },
    date: '2026-08-07',
    time: '05:30 PM',
    reporter: {
      name: 'Selvam N.',
      email: 'selvam.staff@example.com',
      phone: '+91 94440 99881',
      anonymous: false
    },
    privateVerificationDetail: 'TI-84 calculator has a small yellow Pokemon Pikachu sticker on battery cover',
    status: 'found',
    trail: [
      {
        id: 'tr-902',
        status: 'found',
        title: 'Secured at Library Desk',
        location: 'Reception Counter, Anna Centenary Library',
        timestamp: '2026-08-07T17:30:00Z',
        description: 'Brought down by cleaning staff and logged in lost & found ledger.',
        contributor: 'Selvam N. (Staff)',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T17:30:00Z',
    updatedAt: '2026-08-07T17:30:00Z'
  },
  {
    id: 'LF-20260808-1008',
    type: 'lost',
    category: 'pet',
    item: {
      name: 'Luna (Calico Cat)',
      brand: 'Cat',
      model: 'Domestic Short Hair (1.5 years)',
      color: 'White, Orange & Black',
      description: 'Green-eyed calico cat with a pink bell collar. Very timid, answers to "Luna" or gentle clicks.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Koramangala 4th Block 8th Main',
      city: 'Bengaluru',
      latitude: 12.9345,
      longitude: 77.6266
    },
    date: '2026-08-06',
    time: '08:30 PM',
    reporter: {
      name: 'Aditi Mukhopadhyay',
      email: 'aditi.m@example.com',
      phone: '+91 97410 33221',
      anonymous: false
    },
    privateVerificationDetail: 'Right front paw is completely white with a single orange toe bean',
    status: 'spotted',
    trail: [
      {
        id: 'tr-1001',
        status: 'lost',
        title: 'Cat Slipped out Balcony',
        location: 'Koramangala 4th Block, Bengaluru',
        timestamp: '2026-08-06T20:30:00Z',
        description: 'Luna escaped through ground-floor garden fence.',
        contributor: 'Aditi M. (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-1002',
        status: 'spotted',
        title: 'Spotted under Car in Alley',
        location: 'Behind Third Wave Coffee, Koramangala',
        timestamp: '2026-08-07T08:15:00Z',
        description: 'Neighbor spotted calico cat with pink collar hiding behind rear tire of silver Honda City.',
        contributor: 'Naveen K. (Neighbor)',
        icon: 'Eye'
      }
    ],
    sightings: [
      {
        id: 'sg-3',
        reporterName: 'Naveen K.',
        location: 'Behind Third Wave Coffee, Koramangala',
        date: '2026-08-07',
        time: '08:15 AM',
        notes: 'Calico cat with pink bell collar was cautious but alert under parked vehicle.',
        image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80'
      }
    ],
    claims: [],
    matches: [],
    createdAt: '2026-08-06T20:30:00Z',
    updatedAt: '2026-08-07T08:15:00Z'
  },
  {
    id: 'LF-20260808-1009',
    type: 'lost',
    category: 'document',
    item: {
      name: 'University Degree Certificate & Marksheets',
      brand: 'IIT Madras',
      model: 'B.Tech Mechanical Certificate Folio',
      color: 'Maroon Leatherette Folder',
      description: 'Maroon folder with gold embossed IIT Madras seal containing original degree certificate for Siddharth Rao.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Airport Metro Station Concourse',
      city: 'Chennai',
      latitude: 12.9818,
      longitude: 80.1636
    },
    date: '2026-08-08',
    time: '06:40 AM',
    reporter: {
      name: 'Siddharth Rao',
      email: 'siddharth.rao@example.com',
      phone: '+91 98840 55667',
      anonymous: false
    },
    privateVerificationDetail: 'Roll Number inside certificate ends in 042, sealed in an inner transparent zip pouch',
    status: 'lost',
    trail: [
      {
        id: 'tr-1101',
        status: 'lost',
        title: 'Reported Missing at Metro',
        location: 'Chennai Airport Metro Concourse',
        timestamp: '2026-08-08T06:40:00Z',
        description: 'Left on ticketing counter while grabbing luggage trolley.',
        contributor: 'Siddharth Rao (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T06:40:00Z',
    updatedAt: '2026-08-08T06:40:00Z'
  },
  {
    id: 'FF-20260808-2004',
    type: 'found',
    category: 'electronics',
    item: {
      name: 'Apple iPad Air M2 (Starlight)',
      brand: 'Apple',
      model: 'iPad Air 11-inch M2',
      color: 'Starlight Silver',
      description: 'Found iPad with white magnetic smart folio case on domestic flight 6E-243 seat pocket.',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'IndiGo Baggage Help Desk T1',
      city: 'Mumbai',
      latitude: 19.0896,
      longitude: 72.8656
    },
    date: '2026-08-07',
    time: '08:50 PM',
    reporter: {
      name: 'Captain Deepak Joshi',
      email: 'ground.mumbai@example.com',
      phone: '+91 98200 44332',
      anonymous: false
    },
    privateVerificationDetail: 'Custom laser engraving on back reads: "Think Different 2024"',
    status: 'found',
    trail: [
      {
        id: 'tr-1201',
        status: 'found',
        title: 'Recovered from Cabin',
        location: 'Aircraft 6E-243 Seat 12F, CSMI Airport Mumbai',
        timestamp: '2026-08-07T20:50:00Z',
        description: 'Cabin crew turned over device to ground operations customer care.',
        contributor: 'Flight Crew',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T20:50:00Z',
    updatedAt: '2026-08-07T20:50:00Z'
  },
  {
    id: 'LF-20260808-1010',
    type: 'lost',
    category: 'accessories',
    item: {
      name: 'Titan Edge Ceramic Watch',
      brand: 'Titan',
      model: 'Edge Slim Ceramic',
      color: 'Midnight Black & Rose Gold',
      description: 'Ultra-thin ceramic wrist watch with scratch-resistant sapphire crystal and butterfly clasp.',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Gold Gym Changing Room',
      city: 'New Delhi',
      latitude: 28.5355,
      longitude: 77.2600
    },
    date: '2026-08-08',
    time: '08:15 AM',
    reporter: {
      name: 'Tanvi Khanna',
      email: 'tanvi.k@example.com',
      phone: '+91 98112 88776',
      anonymous: false
    },
    privateVerificationDetail: 'Back plate inscription: "TK - 25th Birthday Love Mom & Dad"',
    status: 'lost',
    trail: [
      {
        id: 'tr-1301',
        status: 'lost',
        title: 'Reported Missing after Workout',
        location: 'Saket Fitness Hub Locker #18, New Delhi',
        timestamp: '2026-08-08T08:15:00Z',
        description: 'Left in locker tray after swimming session.',
        contributor: 'Tanvi Khanna (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T08:15:00Z',
    updatedAt: '2026-08-08T08:15:00Z'
  },
  {
    id: 'FF-20260808-2005',
    type: 'found',
    category: 'keys',
    item: {
      name: 'BMW Smart Key Fob with Metal Carabiner',
      brand: 'BMW',
      model: '3-Series Fob (Display Key)',
      color: 'Silver & Black',
      description: 'Digital display car key on titanium carabiner with gym badge #4412.',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Cyber Hub Amphitheater Steps',
      city: 'Gurugram',
      latitude: 28.4952,
      longitude: 77.0894
    },
    date: '2026-08-07',
    time: '09:30 PM',
    reporter: {
      name: 'Arjun Mehra',
      email: 'arjun.m@example.com',
      phone: '+91 99100 23456',
      anonymous: false
    },
    privateVerificationDetail: 'Carabiner has a miniature copper bottle opener attached',
    status: 'found',
    trail: [
      {
        id: 'tr-1401',
        status: 'found',
        title: 'Key Found on Steps',
        location: 'Cyber Hub Central Courtyard, Gurugram',
        timestamp: '2026-08-07T21:30:00Z',
        description: 'Discovered near steps following live acoustic music performance.',
        contributor: 'Arjun Mehra (Finder)',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T21:30:00Z',
    updatedAt: '2026-08-07T21:30:00Z'
  },
  {
    id: 'LF-20260808-1011',
    type: 'lost',
    category: 'phone',
    item: {
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      model: 'S24 Ultra 512GB',
      color: 'Titanium Violet',
      description: 'Phone in dark grey Spigen armor case with embedded kickstand. Lost on train.',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Vande Bharat Express Coach C3',
      city: 'Bengaluru',
      latitude: 12.9778,
      longitude: 77.5714
    },
    date: '2026-08-06',
    time: '02:00 PM',
    reporter: {
      name: 'Gaurav Singhal',
      email: 'gaurav.s@example.com',
      phone: '+91 98450 77112',
      anonymous: false
    },
    privateVerificationDetail: 'Lockscreen photo is a mountain summit at sunset with timestamp 2023',
    status: 'verified',
    trail: [
      {
        id: 'tr-1501',
        status: 'lost',
        title: 'Lost on Train Journey',
        location: 'Vande Bharat Mysore-Bengaluru, KSR Station',
        timestamp: '2026-08-06T14:00:00Z',
        description: 'Slipped between seat cushions in Coach C3 seat 24.',
        contributor: 'Gaurav Singhal (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-1502',
        status: 'found',
        title: 'Found by RPF Station Post',
        location: 'RPF Post Platform 1, KSR Bengaluru',
        timestamp: '2026-08-06T15:30:00Z',
        description: 'Retrieved by maintenance crew during turnaround sweep.',
        contributor: 'Sub-Inspector Murthy',
        icon: 'CheckCircle2'
      },
      {
        id: 'tr-1503',
        status: 'verified',
        title: 'Ownership Verified',
        location: 'Online Security Challenge',
        timestamp: '2026-08-06T16:15:00Z',
        description: 'Owner successfully validated lockscreen photo detail.',
        contributor: 'System Verified',
        icon: 'ShieldCheck'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-06T14:00:00Z',
    updatedAt: '2026-08-06T16:15:00Z'
  },
  {
    id: 'LF-20260808-1012',
    type: 'lost',
    category: 'pet',
    item: {
      name: 'Bruno (German Shepherd)',
      brand: 'Dog',
      model: 'German Shepherd (3 years)',
      color: 'Black & Tan',
      description: 'Large, friendly trained German Shepherd wearing a reflective black tactical harness with "BRUNO" patch.',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5455?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Cubbon Park Tennis Pavilion',
      city: 'Bengaluru',
      latitude: 12.9763,
      longitude: 77.5929
    },
    date: '2026-08-05',
    time: '06:00 AM',
    reporter: {
      name: 'Major Rajesh Nair',
      email: 'rajesh.nair@example.com',
      phone: '+91 94480 11990',
      anonymous: false
    },
    privateVerificationDetail: 'Right ear has a small 2mm notch from playful puppyhood bite',
    status: 'reunited',
    trail: [
      {
        id: 'tr-1601',
        status: 'lost',
        title: 'Chased a Squirrel during Run',
        location: 'Cubbon Park Bamboo Grove, Bengaluru',
        timestamp: '2026-08-05T06:00:00Z',
        description: 'Bruno ran into bamboo thicket chasing birds.',
        contributor: 'Rajesh Nair (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-1602',
        status: 'spotted',
        title: 'Spotted by Morning Walkers',
        location: 'Near High Court Gate, Cubbon Park',
        timestamp: '2026-08-05T07:20:00Z',
        description: 'Dog was waiting peacefully near park security gate.',
        contributor: 'Dr. Ramesh Rao',
        icon: 'Eye'
      },
      {
        id: 'tr-1603',
        status: 'found',
        title: 'Sheltered by Park Ranger',
        location: 'Cubbon Park Security Post 2',
        timestamp: '2026-08-05T08:00:00Z',
        description: 'Secured on leash with fresh bowl of water.',
        contributor: 'Ranger Manjunath',
        icon: 'CheckCircle2'
      },
      {
        id: 'tr-1604',
        status: 'verified',
        title: 'Microchip & Ear Notch Verified',
        location: 'Park Ranger Office',
        timestamp: '2026-08-05T08:30:00Z',
        description: 'Owner arrived with pet passport and license.',
        contributor: 'System & Ranger Verified',
        icon: 'ShieldCheck'
      },
      {
        id: 'tr-1605',
        status: 'reunited',
        title: 'Reunited with Family!',
        location: 'Cubbon Park Main Gate',
        timestamp: '2026-08-05T09:00:00Z',
        description: 'Bruno enthusiastically jumped into the family SUV. Missing trail closed!',
        contributor: 'Family & Community',
        icon: 'Heart'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-05T06:00:00Z',
    updatedAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'LF-20260808-1013',
    type: 'lost',
    category: 'wallet',
    item: {
      name: 'Bellroy Hide & Seek Slim Leather Wallet',
      brand: 'Bellroy',
      model: 'Hide & Seek RFID',
      color: 'Caramel Brown',
      description: 'Full-grain leather wallet with hidden bill flap. Contains driver license and office access card.',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Bandra Bandstand Promenade',
      city: 'Mumbai',
      latitude: 19.0434,
      longitude: 72.8194
    },
    date: '2026-08-08',
    time: '06:15 PM',
    reporter: {
      name: 'Neil Fernandes',
      email: 'neil.f@example.com',
      phone: '+91 98200 66554',
      anonymous: false
    },
    privateVerificationDetail: 'Hidden flap contains a folded lucky two-dollar bill from 2017',
    status: 'lost',
    trail: [
      {
        id: 'tr-1701',
        status: 'lost',
        title: 'Lost on Seawall Bench',
        location: 'Bandstand Seafront, Bandra West, Mumbai',
        timestamp: '2026-08-08T18:15:00Z',
        description: 'Fell between rocks near bench opposite Mannat.',
        contributor: 'Neil Fernandes (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T18:15:00Z',
    updatedAt: '2026-08-08T18:15:00Z'
  },
  {
    id: 'FF-20260808-2006',
    type: 'found',
    category: 'wallet',
    item: {
      name: 'Brown Leather Slim Card Wallet',
      brand: 'Bellroy',
      model: 'Bifold',
      color: 'Caramel Tan',
      description: 'Found leather cardholder wallet on rocks near Bandra seafront. Handed to promenade beat marshal.',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Bandra Police Beat Chowky #4',
      city: 'Mumbai',
      latitude: 19.0440,
      longitude: 72.8200
    },
    date: '2026-08-08',
    time: '07:00 PM',
    reporter: {
      name: 'Constable Sanjay Sawant',
      email: 'chowky4.bandra@example.com',
      phone: '+91 98210 12345',
      anonymous: false
    },
    privateVerificationDetail: 'Hidden flap contains a folded lucky two-dollar bill from 2017',
    status: 'found',
    trail: [
      {
        id: 'tr-1702',
        status: 'found',
        title: 'Secured at Police Beat Chowky',
        location: 'Bandstand Beat Post, Mumbai',
        timestamp: '2026-08-08T19:00:00Z',
        description: 'Jogger handed in wallet to patrolling officer.',
        contributor: 'Constable Sanjay Sawant',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T19:00:00Z',
    updatedAt: '2026-08-08T19:00:00Z'
  },
  {
    id: 'LF-20260808-1014',
    type: 'lost',
    category: 'electronics',
    item: {
      name: 'Kindle Paperwhite Signature Edition',
      brand: 'Amazon',
      model: 'Paperwhite 11th Gen 32GB',
      color: 'Agave Green',
      description: 'E-reader in cork protective case. Left in seat pocket on Shatabdi Express.',
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'New Delhi Railway Station Platform 1',
      city: 'New Delhi',
      latitude: 28.6429,
      longitude: 77.2195
    },
    date: '2026-08-07',
    time: '11:15 AM',
    reporter: {
      name: 'Sunita Mehra',
      email: 'sunita.m@example.com',
      phone: '+91 98110 55443',
      anonymous: false
    },
    privateVerificationDetail: 'Kindle device name is set to "Sunita\'s Magical Library"',
    status: 'lost',
    trail: [
      {
        id: 'tr-1801',
        status: 'lost',
        title: 'Forgotten on Train',
        location: 'Bhopal-Delhi Shatabdi Coach E1, NDLS',
        timestamp: '2026-08-07T11:15:00Z',
        description: 'Left in magazine pouch on seat 45.',
        contributor: 'Sunita Mehra (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-07T11:15:00Z',
    updatedAt: '2026-08-07T11:15:00Z'
  },
  {
    id: 'LF-20260808-1015',
    type: 'lost',
    category: 'bag',
    item: {
      name: 'Tumi Alpha 3 Expandable Briefcase',
      brand: 'Tumi',
      model: 'Alpha 3 Brief Pack',
      color: 'Ballistic Black',
      description: 'Heavy-duty nylon business bag with business cards, company charger, and notebook.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'ITC Grand Chola Lobby',
      city: 'Chennai',
      latitude: 13.0104,
      longitude: 80.2208
    },
    date: '2026-08-08',
    time: '01:30 PM',
    reporter: {
      name: 'Harish Nambiar',
      email: 'harish.n@example.com',
      phone: '+91 99620 44556',
      anonymous: false
    },
    privateVerificationDetail: 'Tumi tracer barcode metal plate starts with digits 7419',
    status: 'handover',
    trail: [
      {
        id: 'tr-1901',
        status: 'lost',
        title: 'Left at Hotel Lounge',
        location: 'ITC Grand Chola Cigar Lounge, Guindy',
        timestamp: '2026-08-08T13:30:00Z',
        description: 'Forgotten on velvet arm chair after lunch meeting.',
        contributor: 'Harish Nambiar (Owner)',
        icon: 'AlertCircle'
      },
      {
        id: 'tr-1902',
        status: 'found',
        title: 'Turned into Hotel Concierge',
        location: 'Concierge Desk, ITC Grand Chola',
        timestamp: '2026-08-08T14:15:00Z',
        description: 'Found by hotel steward during floor check.',
        contributor: 'Concierge Manager',
        icon: 'CheckCircle2'
      },
      {
        id: 'tr-1903',
        status: 'verified',
        title: 'Tracer ID Validated',
        location: 'Online Verification',
        timestamp: '2026-08-08T14:45:00Z',
        description: 'Tumi tracer barcode matched owner registration.',
        contributor: 'System Verified',
        icon: 'ShieldCheck'
      },
      {
        id: 'tr-1904',
        status: 'handover',
        title: 'Safe Handover Meeting Scheduled',
        location: 'Main Reception Lobby Counter, ITC Grand Chola',
        timestamp: '2026-08-08T15:00:00Z',
        description: 'Owner scheduled pickup for 05:00 PM with Duty Manager.',
        contributor: 'Hotel & Owner Coordinated',
        icon: 'Handshake'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T13:30:00Z',
    updatedAt: '2026-08-08T15:00:00Z'
  },
  {
    id: 'LF-20260808-1016',
    type: 'lost',
    category: 'accessories',
    item: {
      name: 'Ray-Ban Classic Aviator Sunglasses (Polarized)',
      brand: 'Ray-Ban',
      model: 'RB3025 Aviator Gradient',
      color: 'Gold Frame / Brown Gradient Lens',
      description: 'Gold wire frame sunglasses in classic black leather case with Ray-Ban microfiber cloth.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Marina Beach Light House Promenade',
      city: 'Chennai',
      latitude: 13.0382,
      longitude: 80.2785
    },
    date: '2026-08-06',
    time: '05:45 PM',
    reporter: {
      name: 'Deepak Chandran',
      email: 'deepak.c@example.com',
      phone: '+91 98844 77661',
      anonymous: false
    },
    privateVerificationDetail: 'Right lens has tiny RB laser watermark near middle outer edge',
    status: 'lost',
    trail: [
      {
        id: 'tr-2001',
        status: 'lost',
        title: 'Lost on Sandy Beach',
        location: 'Near Marina Lighthouse Promenade, Chennai',
        timestamp: '2026-08-06T17:45:00Z',
        description: 'Fell out of beach bag during windy sunset walk.',
        contributor: 'Deepak Chandran (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-06T17:45:00Z',
    updatedAt: '2026-08-06T17:45:00Z'
  },
  {
    id: 'LF-20260808-1017',
    type: 'lost',
    category: 'electronics',
    item: {
      name: 'Nintendo Switch OLED Model',
      brand: 'Nintendo',
      model: 'Switch OLED Neon Red & Blue',
      color: 'Neon Red / Neon Blue',
      description: 'In black hard-shell travel case with 4 game cartridges (Zelda, Mario Kart, Smash Bros).',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Food Court Table 18, Ambience Mall',
      city: 'Gurugram',
      latitude: 28.5042,
      longitude: 77.0967
    },
    date: '2026-08-08',
    time: '02:30 PM',
    reporter: {
      name: 'Kabir Batra',
      email: 'kabir.b@example.com',
      phone: '+91 98110 33441',
      anonymous: false
    },
    privateVerificationDetail: 'Zelda game card has a tiny handwritten initial "KB" in silver marker on backside',
    status: 'lost',
    trail: [
      {
        id: 'tr-2101',
        status: 'lost',
        title: 'Reported Missing at Food Court',
        location: 'Ambience Mall Food Court, Gurugram',
        timestamp: '2026-08-08T14:30:00Z',
        description: 'Forgotten under tray while shopping with family.',
        contributor: 'Kabir Batra (Owner)',
        icon: 'AlertCircle'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T14:30:00Z',
    updatedAt: '2026-08-08T14:30:00Z'
  },
  {
    id: 'FF-20260808-2007',
    type: 'found',
    category: 'electronics',
    item: {
      name: 'Nintendo Switch Handheld Console in Black Case',
      brand: 'Nintendo',
      model: 'Switch OLED',
      color: 'Neon Red & Blue',
      description: 'Found black zipper console case with Nintendo logo at Ambience Mall food court tray deposit.',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80'
    },
    location: {
      area: 'Ambience Mall Customer Help Desk',
      city: 'Gurugram',
      latitude: 28.5045,
      longitude: 77.0970
    },
    date: '2026-08-08',
    time: '03:15 PM',
    reporter: {
      name: 'Pooja Verma (Mall Operations)',
      email: 'pooja.helpdesk@example.com',
      phone: '+91 99110 88221',
      anonymous: false
    },
    privateVerificationDetail: 'Zelda game card has a tiny handwritten initial "KB" in silver marker on backside',
    status: 'found',
    trail: [
      {
        id: 'tr-2102',
        status: 'found',
        title: 'Handed to Mall Help Desk',
        location: 'Ground Floor Information Desk, Ambience Mall',
        timestamp: '2026-08-08T15:15:00Z',
        description: 'Cleaning staff noticed case and turned in to official lost & found repository.',
        contributor: 'Pooja Verma',
        icon: 'CheckCircle2'
      }
    ],
    sightings: [],
    claims: [],
    matches: [],
    createdAt: '2026-08-08T15:15:00Z',
    updatedAt: '2026-08-08T15:15:00Z'
  }
];

export const INITIAL_MYSTERY_ITEMS = [
  {
    id: 'MYST-001',
    title: 'Small Black Metallic Electronic Cylinder',
    description: 'Found near Chennai Central Railway Station platform 4 bench. Has a USB-C port, a small power button, and a tiny blue LED ring.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    location: 'Chennai Central Railway Station',
    dateFound: '2026-08-06',
    finderName: 'Karthik S.',
    communityGuesses: [
      { id: 'g1', user: 'TechGuy99', guess: 'Portable DAC / Headphone Amplifier', votes: 14 },
      { id: 'g2', user: 'AudioPhile', guess: 'Wireless Microphone Receiver', votes: 8 },
      { id: 'g3', user: 'Samir_V', guess: 'Rechargeable Laser Pointer', votes: 3 }
    ]
  },
  {
    id: 'MYST-002',
    title: 'Intricate Carved Wooden Medallion Keychain',
    description: 'Carved circular wooden medallion with brass inlay forming a constellation pattern. Found on a bench at Lodhi Garden.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=800&q=80',
    location: 'Lodhi Garden, New Delhi',
    dateFound: '2026-08-07',
    finderName: 'Diya Rastogi',
    communityGuesses: [
      { id: 'g4', user: 'ArtCollector', guess: 'Handcrafted Nordic Sundial Charm', votes: 11 },
      { id: 'g5', user: 'DelhiLocal', guess: 'Custom Escape Room Souvenir Keyring', votes: 6 }
    ]
  },
  {
    id: 'MYST-003',
    title: 'Antique Brass Mechanical Pocket Watch with Astronomical Dial',
    description: 'Found in vintage velvet bag on Lalbagh Botanical Garden pathway. Has planetary engravings and roman numerals.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    location: 'Lalbagh Botanical Garden, Bengaluru',
    dateFound: '2026-08-08',
    finderName: 'Anil Deshmukh',
    communityGuesses: [
      { id: 'g6', user: 'HorologyFan', guess: 'Swiss Replica Perpetual Calendar Pocket Watch', votes: 19 },
      { id: 'g7', user: 'HistoryBuff', guess: 'Victorian Steampunk Pocket Astrolabe', votes: 9 }
    ]
  }
];
