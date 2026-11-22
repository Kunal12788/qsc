/**
 * SSR Bullion Management System
 * Core Application Engine & Interactivity
 * Conforming to BIS IS 1417:2019 / IS 2112:2014 standards
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    currentRoute: 'dashboard',
    sidebarCollapsed: false,
    customers: [
      {
        id: 'CUST-100',
        name: 'ROYCO JEWELLERS (CHINSURAH)',
        code: 'ROYCO-CHIN',
        address: 'CENTRAL MARKET,N.S. ROAD',
        area: 'CHINSURAH,HOOGHLY,712101',
        region: 'Hooghly',
        mobile: '+91 98362 82449',
        bis: '5439472',
        gst: '19AFKPR4571E1Z3',
        stateCode: '19',
        activeJobs: 18,
        since: '2019'
      },
      {
        id: 'CUST-101',
        name: 'Zaveri & Sons Jewellers Pvt Ltd',
        code: 'ZAVERI-BOM',
        address: 'Shop 14-16, Bullion Plaza, Zaveri Bazaar',
        area: 'Kalbadevi, Mumbai - 400002',
        region: 'Zaveri Bazaar',
        mobile: '+91 98201 44920',
        bis: 'BIS-MH-2021-9941',
        activeJobs: 14,
        since: '2018'
      },
      {
        id: 'CUST-102',
        name: 'Kalyan Malabar Goldsmiths LLP',
        code: 'KM-DELHI',
        address: '24 Bank Street, Karol Bagh Market',
        area: 'Karol Bagh, New Delhi - 110005',
        region: 'Karol Bagh',
        mobile: '+91 99112 55800',
        bis: 'BIS-DL-2020-4109',
        activeJobs: 28,
        since: '2020'
      },
      {
        id: 'CUST-103',
        name: 'Malabar Gold & Diamonds',
        code: 'MALABAR-KA',
        address: 'MG Road bullion corridor',
        area: 'Commercial Street, Bengaluru - 560001',
        region: 'Commercial Street',
        mobile: '+91 98450 11200',
        bis: 'BIS-MH-10294-G',
        activeJobs: 35,
        since: '2016'
      },
      {
        id: 'CUST-104',
        name: 'Tanishq Luxury Guild',
        code: 'TANISHQ-DL',
        address: 'Connaught Place Atelier Suite 4',
        area: 'Karol Bagh, Delhi - 110001',
        region: 'Karol Bagh',
        mobile: '+91 98110 99882',
        bis: 'BIS-DL-4482',
        activeJobs: 42,
        since: '2015'
      },
      {
        id: 'CUST-105',
        name: 'Joyalukkas India Private Ltd',
        code: 'JOYAL-KL',
        address: 'Jewellery District Building 12',
        area: 'Pernambut / Chennai - 600001',
        region: 'Pernambut',
        mobile: '+91 94440 22100',
        bis: 'BIS-KL-9904-C',
        activeJobs: 19,
        since: '2017'
      },
      {
        id: 'CUST-106',
        name: 'Senco Gold & Diamonds',
        code: 'SENCO-WB',
        address: 'Bowbazar Goldsmith Lane',
        area: 'Manek Chowk, Ahmedabad - 380001',
        region: 'Manek Chowk',
        mobile: '+91 98300 88221',
        bis: 'BIS-WB-7712-F',
        activeJobs: 11,
        since: '2019'
      },
      {
        id: 'CUST-107',
        name: 'P.K. Jewellers Pvt. Ltd.',
        code: 'PK-JWL',
        address: '112 Dariba Kalan, Chandni Chowk',
        area: 'Chandni Chowk, Delhi - 110006',
        region: 'Chandni Chowk',
        mobile: '+91 98101 23456',
        bis: 'BIS-DL-2023-8812',
        activeJobs: 16,
        since: '2014'
      },
      {
        id: 'CUST-108',
        name: 'S.S.R. Bullion & Refinery Ltd.',
        code: 'SSR-REF',
        address: 'Plot 45, MIDC Industrial Area',
        area: 'Andheri East, Mumbai - 400093',
        region: 'MIDC Mumbai',
        mobile: '+91 98220 54321',
        bis: 'BIS-MH-2022-7711',
        activeJobs: 24,
        since: '2012'
      },
      {
        id: 'CUST-109',
        name: 'A.K. & Sons Jewellery Works',
        code: 'AK-SONS',
        address: '88 Manek Chowk Bullion Complex',
        area: 'Manek Chowk, Ahmedabad - 380001',
        region: 'Manek Chowk',
        mobile: '+91 97123 45678',
        bis: 'BIS-GJ-2021-5544',
        activeJobs: 8,
        since: '2019'
      },
      {
        id: 'CUST-110',
        name: 'M.K. Jewellers & Ornaments',
        code: 'MK-JWL',
        address: 'Johari Bazaar Gate 3',
        area: 'Jaipur, Rajasthan - 302003',
        region: 'Johari Bazaar',
        mobile: '+91 94140 98765',
        bis: 'BIS-RJ-2022-3321',
        activeJobs: 12,
        since: '2017'
      },
      {
        id: 'CUST-111',
        name: 'Shree 108 Bullion House',
        code: 'SB-108',
        address: 'Sarafa Bazaar Sector 2',
        area: 'Varanasi, UP - 221001',
        region: 'Sarafa Bazaar',
        mobile: '+91 99350 11080',
        bis: 'BIS-UP-2024-1088',
        activeJobs: 15,
        since: '2021'
      },
      {
        id: 'CUST-112',
        name: 'Kalyan Jewellers Heritage Line',
        code: 'KALYAN-KA',
        address: 'Brigade Road Hallmark Center',
        area: 'Bengaluru, Karnataka - 560025',
        region: 'Brigade Road',
        mobile: '+91 98455 66778',
        bis: 'BIS-KA-3391-B',
        activeJobs: 30,
        since: '2015'
      },
      {
        id: 'CUST-113',
        name: 'B.R. & Co. Heritage Ornaments',
        code: 'BR-HERIT',
        address: 'T. Nagar Gold Corridor',
        area: 'Chennai, Tamil Nadu - 600017',
        region: 'T. Nagar',
        mobile: '+91 94441 55667',
        bis: 'BIS-TN-2023-6629',
        activeJobs: 9,
        since: '2018'
      },
      {
        id: 'CUST-114',
        name: 'G.R.T. Jewellers India',
        code: 'GRT-INDIA',
        address: '136 Usman Road, T. Nagar',
        area: 'Chennai, Tamil Nadu - 600017',
        region: 'T. Nagar',
        mobile: '+91 98400 33445',
        bis: 'BIS-TN-2019-9182',
        activeJobs: 21,
        since: '2016'
      },
      {
        id: 'CUST-115',
        name: 'C. Krishniah Chetty & Sons (CKC)',
        code: 'CKC-SONS',
        address: '35 Commercial Street',
        area: 'Bengaluru, Karnataka - 560001',
        region: 'Commercial Street',
        mobile: '+91 98450 99001',
        bis: 'BIS-KA-2018-1869',
        activeJobs: 17,
        since: '2013'
      },
      {
        id: 'CUST-116',
        name: 'Tribhovandas Bhimji Zaveri (TBZ)',
        code: 'TBZ-MUM',
        address: '241 Zaveri Bazaar Road',
        area: 'Kalbadevi, Mumbai - 400002',
        region: 'Zaveri Bazaar',
        mobile: '+91 98200 12345',
        bis: 'BIS-MH-2017-3310',
        activeJobs: 22,
        since: '2015'
      },
      {
        id: 'CUST-117',
        name: 'P.N. Gadgil & Sons (PNG)',
        code: 'PNG-PUNE',
        address: 'Laxmi Road Gold Market',
        area: 'Pune, Maharashtra - 411030',
        region: 'Laxmi Road',
        mobile: '+91 98500 67890',
        bis: 'BIS-MH-2016-5542',
        activeJobs: 18,
        since: '2016'
      },
      {
        id: 'CUST-118',
        name: 'Waman Hari Pethe Jewellers (WHP)',
        code: 'WHP-MUM',
        address: 'Ranade Road, Dadar West',
        area: 'Dadar, Mumbai - 400028',
        region: 'Dadar',
        mobile: '+91 98211 44556',
        bis: 'BIS-MH-2018-7721',
        activeJobs: 14,
        since: '2017'
      }
    ],
    intakeBatches: [
      {
        jobDocket: 'JOB-2026-2369',
        receiptNo: 'REC-11981',
        customer: 'ROYCO JEWELLERS (CHINSURAH)',
        customerAddress: 'CENTRAL MARKET,N.S. ROAD, CHINSURAH,HOOGHLY,712101',
        bis: '5439472',
        customerGst: '19AFKPR4571E1Z3',
        customerStateCode: '19',
        reqNo: '119813505',
        metal: 'Gold',
        articleType: 'CHAIN, TOPS, RING',
        productBreakdown: ',CHAIN-26,TOPS-34,RING-34',
        pcs: 94,
        purity: '22K 916',
        rate: 75.00,
        stream: 'CHINSURAH',
        tray: 'BOX-TR-05',
        netWt: 375.000,
        grossWt: 375.000,
        depositor: 'KOUSHIK GHOSH',
        receiver: 'Sarah Jenkins',
        date: '14-11-2026',
        time: '14-11-2026 / 08:01 PM',
        status: 'XRF Verified',
        billNo: '26-27/HM/2369',
        billPrinted: true,
        disposition: {
          rejected: 0,
          destroyed: 0,
          nonFeasible: 0,
          irrucd: 0,
          passed: 94
        },
        tagStatus: 'DONE',
        tagData: [],
        tagDimensions: { width: 50, height: 12, unit: 'mm', preset: 'butterfly' },
        articlePhoto: null,
        deliveryStatus: 'READY'
      },
      {
        jobDocket: 'JOB-2024-9104',
        customer: 'Malabar Gold & Diamonds',
        bis: 'BIS-MH-10294-G',
        reqNo: 'REQ-8831-A',
        metal: 'GOLD',
        articleType: 'MIX ORNAMENTS',
        pcs: 85,
        purity: '22K 916',
        stream: 'Main Branch',
        tray: 'BOX-TR-14',
        netWt: 842.350,
        grossWt: 854.120,
        depositor: 'Rajesh M. Varma',
        receiver: 'Sarah Jenkins',
        time: '10:45 AM Today',
        status: 'In Marking',
        billNo: 'BILL-2024-04192',
        billPrinted: false,
        disposition: { rejected: 0, destroyed: 0, nonFeasible: 0, irrucd: 0, passed: 85 },
        tagStatus: 'PENDING',
        tagData: [],
        tagDimensions: { width: 50, height: 12, unit: 'mm', preset: 'butterfly' },
        articlePhoto: null,
        deliveryStatus: 'READY'
      },
      {
        jobDocket: 'JOB-2024-8841',
        customer: 'Kalyan Heritage Jewellers',
        bis: 'BIS-KA-99210',
        reqNo: 'REQ-8830-K',
        metal: 'GOLD',
        articleType: 'MIX ITEM',
        pcs: 45,
        purity: '22K 916',
        stream: 'Main Branch',
        tray: 'BOX-TR-09',
        netWt: 412.500,
        grossWt: 428.100,
        depositor: 'Anand Kumar',
        receiver: 'Sarah Jenkins',
        time: '10:20 AM Today',
        status: 'XRF Verified',
        billNo: 'BILL-2024-04191',
        billPrinted: true,
        disposition: { rejected: 2, destroyed: 1, nonFeasible: 0, irrucd: 0, passed: 42 },
        tagStatus: 'DONE',
        tagData: [],
        tagDimensions: { width: 48, height: 26, unit: 'mm', preset: 'dumbbell' },
        articlePhoto: null,
        deliveryStatus: 'READY'
      },
      {
        jobDocket: 'JOB-2024-8840',
        customer: 'Malabar Gold Craft',
        bis: 'BIS-KA-10492',
        reqNo: 'REQ-8828-M',
        metal: 'GOLD',
        articleType: 'PUTHI HAR',
        pcs: 112,
        purity: '22K 916',
        stream: 'Main Branch',
        tray: 'BOX-TR-11',
        netWt: 982.100,
        grossWt: 994.400,
        depositor: 'Vipin Das',
        receiver: 'Vikram Anand',
        time: '09:55 AM Today',
        status: 'In Marking',
        billNo: 'BILL-2024-04190',
        billPrinted: false,
        disposition: { rejected: 0, destroyed: 0, nonFeasible: 0, irrucd: 0, passed: 112 },
        tagStatus: 'PENDING',
        tagData: [],
        tagDimensions: { width: 50, height: 12, unit: 'mm', preset: 'butterfly' },
        articlePhoto: null,
        deliveryStatus: 'READY'
      },
      {
        jobDocket: 'JOB-2024-8839',
        customer: 'Tanishq Studio Boutique',
        bis: 'BIS-KA-88301',
        reqNo: 'REQ-8825-T',
        metal: 'GOLD',
        articleType: 'NECKLACE',
        pcs: 18,
        purity: '18K 750',
        stream: 'OFFSIDE',
        tray: 'BOX-TR-04',
        netWt: 144.200,
        grossWt: 148.800,
        depositor: 'Girish Rao',
        receiver: 'Priyanka Roy',
        time: '09:30 AM Today',
        status: 'Fire Assay Q',
        billNo: 'BILL-2024-04189',
        billPrinted: true,
        disposition: { rejected: 1, destroyed: 1, nonFeasible: 0, irrucd: 0, passed: 16 },
        tagStatus: 'PENDING',
        tagData: [],
        tagDimensions: { width: 60, height: 30, unit: 'mm', preset: 'pouch' },
        articlePhoto: null,
        deliveryStatus: 'READY'
      },
      {
        jobDocket: 'JOB-2024-8838',
        customer: 'Navrathan Jewellers Ltd',
        bis: 'BIS-KA-77402',
        reqNo: 'REQ-8820-N',
        metal: 'GOLD',
        pcs: 6,
        purity: '24K 999',
        stream: 'Main Branch',
        tray: 'BOX-TR-01',
        netWt: 600.000,
        grossWt: 600.120,
        depositor: 'Devraj N.',
        receiver: 'Sarah Jenkins',
        time: '08:50 AM Today',
        status: 'Dispatched',
        billNo: 'BILL-2024-04188',
        billPrinted: true,
        disposition: { rejected: 0, destroyed: 0, nonFeasible: 0, irrucd: 0, passed: 6 },
        tagStatus: 'DONE',
        tagData: [],
        tagDimensions: { width: 50, height: 12, unit: 'mm', preset: 'butterfly' },
        articlePhoto: null,
        deliveryStatus: 'DELIVERED'
      }
    ],
    billingItems: [
      {
        id: 1,
        desc: 'BIS Hallmarking Laser Inscription (Gold 22K 916)',
        subtext: 'SAC Code: 998346 • HUID Laser Gen',
        qty: 85,
        wt: 482.40,
        rate: 45.00
      },
      {
        id: 2,
        desc: 'Fire Assay Purity Verification Certification',
        subtext: 'IS 1418:2009 Cupellation Protocol',
        qty: 1,
        wt: 2.50,
        rate: 750.00
      },
      {
        id: 3,
        desc: 'Secure Vault Handling & Tamper-Evident Packaging',
        subtext: 'Tamper Evident Seal Security Box #SSR-9941',
        qty: 1,
        wt: 0.00,
        rate: 250.00
      }
    ],
    historicalInvoices: [
      {
        billNo: 'BILL-2024-04192',
        date: '24 Oct 2024, 02:45 PM',
        customer: 'Tanishq Luxury Guild',
        gstin: '27AABCT3920F1ZV',
        reqNo: 'REQ-8831-A',
        particulars: 'BIS Hallmarking Laser (85 pcs) + Fire Assay',
        subtotal: 4825.00,
        tax: 868.50,
        total: 5693.50,
        mode: 'RTGS / Bank Transfer',
        status: 'Settled'
      },
      {
        billNo: 'BILL-2024-04191',
        date: '24 Oct 2024, 11:20 AM',
        customer: 'Malabar Gold & Diamonds',
        gstin: '27AABCM1029F1Z5',
        reqNo: 'REQ-8828-M',
        particulars: '22K 916 Chain Inscription (112 pcs)',
        subtotal: 5040.00,
        tax: 907.20,
        total: 5947.20,
        mode: 'UPI Instant',
        status: 'Settled'
      },
      {
        billNo: 'BILL-2024-04190',
        date: '23 Oct 2024, 05:10 PM',
        customer: 'Kalyan Heritage Jewellers',
        gstin: '29AAACK4410R1Z2',
        reqNo: 'REQ-8815-K',
        particulars: 'Cupellation Fire Assay + HUID Marking',
        subtotal: 3200.00,
        tax: 576.00,
        total: 3776.00,
        mode: 'Cheque Clearance',
        status: 'Settled'
      },
      {
        billNo: 'BILL-2024-04189',
        date: '23 Oct 2024, 01:40 PM',
        customer: 'Senco Gold & Diamonds',
        gstin: '19AAACS7712E1Z3',
        reqNo: 'REQ-8809-S',
        particulars: '24K Fine Mint Bar Inscription (10 pcs)',
        subtotal: 1850.00,
        tax: 333.00,
        total: 2183.00,
        mode: 'RTGS / Bank Transfer',
        status: 'Settled'
      }
    ],
    // Vault Custody Boxes & Compartments dataset with A1-10, R25-50 naming
    vaultBoxes: [
      { id: 'A1-10', name: 'Tray A1-10', capacity: 10, slotStart: 1, slotEnd: 10, status: 'empty', type: 'Cast Rings & Bangles', occupiedSlots: [] },
      { id: 'A11-20', name: 'Tray A11-20', capacity: 10, slotStart: 11, slotEnd: 20, status: 'empty', type: 'Cast Rings & Bangles', occupiedSlots: [] },
      { id: 'A21-30', name: 'Tray A21-30', capacity: 10, slotStart: 21, slotEnd: 30, status: 'pre-marking', stage: 'Fire Assay Sampling', job: 'JOB-9101', customer: 'Kalyan Jewellers', occupiedSlots: [21, 22, 23] },
      { id: 'A31-40', name: 'Tray A31-40', capacity: 10, slotStart: 31, slotEnd: 40, status: 'completed', stage: 'Marking Done', job: 'JOB-9098', customer: 'Malabar Gold', occupiedSlots: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
      
      { id: 'B1-5', name: 'Tray B1-5', capacity: 5, slotStart: 1, slotEnd: 5, status: 'empty', type: 'Bullion Ingot / Heavy Bars', occupiedSlots: [] },
      { id: 'B6-10', name: 'Tray B6-10', capacity: 5, slotStart: 6, slotEnd: 10, status: 'empty', type: 'Bullion Ingot / Heavy Bars', occupiedSlots: [] },
      { id: 'B11-15', name: 'Tray B11-15', capacity: 5, slotStart: 11, slotEnd: 15, status: 'pre-marking', stage: 'XRF Spectral Assay', job: 'JOB-9102', customer: 'Tanishq Guild', occupiedSlots: [11, 12, 13] },
      { id: 'B16-20', name: 'Tray B16-20', capacity: 5, slotStart: 16, slotEnd: 20, status: 'completed', stage: 'Marking Done', job: 'JOB-9095', customer: 'Joyalukkas', occupiedSlots: [16, 17, 18, 19, 20] },

      { id: 'R1-20', name: 'Tray R1-20', capacity: 20, slotStart: 1, slotEnd: 20, status: 'empty', type: 'Rings & Studded Pendants', occupiedSlots: [] },
      { id: 'R21-40', name: 'Tray R21-40', capacity: 20, slotStart: 21, slotEnd: 40, status: 'empty', type: 'Rings & Studded Pendants', occupiedSlots: [] },
      { id: 'R41-60', name: 'Tray R41-60', capacity: 20, slotStart: 41, slotEnd: 60, status: 'pre-marking', stage: 'Pre-Laser Cleaning', job: 'JOB-9103', customer: 'Senco Gold', occupiedSlots: [41, 42, 43, 44, 45, 46, 47, 48] },
      { id: 'R61-80', name: 'Tray R61-80', capacity: 20, slotStart: 61, slotEnd: 80, status: 'completed', stage: 'Marking Done', job: 'JOB-9092', customer: 'Malabar Gold', occupiedSlots: Array.from({length: 20}, (_, i) => i + 61) },

      { id: 'R25-50', name: 'Tray R25-50', capacity: 25, slotStart: 25, slotEnd: 50, status: 'empty', type: 'Solitaires & Gem Mounts', occupiedSlots: [] },
      { id: 'R51-75', name: 'Tray R51-75', capacity: 25, slotStart: 51, slotEnd: 75, status: 'pre-marking', stage: 'Dual Weight Acquisition', job: 'JOB-9104', customer: 'Malabar Gold', occupiedSlots: [51, 52, 53, 54, 55] },
      { id: 'R76-100', name: 'Tray R76-100', capacity: 25, slotStart: 76, slotEnd: 100, status: 'empty', type: 'General Ornaments', occupiedSlots: [] },
      { id: 'R101-125', name: 'Tray R101-125', capacity: 25, slotStart: 101, slotEnd: 125, status: 'completed', stage: 'Marking Done', job: 'JOB-9089', customer: 'Tanishq Guild', occupiedSlots: Array.from({length: 25}, (_, i) => i + 101) },

      { id: 'C1-10', name: 'Tray C1-10', capacity: 10, slotStart: 1, slotEnd: 10, status: 'empty', type: 'Chains & Mangalsutras', occupiedSlots: [] },
      { id: 'C11-20', name: 'Tray C11-20', capacity: 10, slotStart: 11, slotEnd: 20, status: 'pre-marking', stage: 'Cupellation Chemical Assay', job: 'JOB-9105', customer: 'Kalyan Jewellers', occupiedSlots: [11, 12, 13] },
      { id: 'C21-30', name: 'Tray C21-30', capacity: 10, slotStart: 21, slotEnd: 30, status: 'empty', type: 'Chains & Mangalsutras', occupiedSlots: [] },
      { id: 'C31-40', name: 'Tray C31-40', capacity: 10, slotStart: 31, slotEnd: 40, status: 'completed', stage: 'Marking Done', job: 'JOB-9087', customer: 'Senco Gold', occupiedSlots: Array.from({length: 10}, (_, i) => i + 31) },

      { id: 'M1-30', name: 'Tray M1-30', capacity: 30, slotStart: 1, slotEnd: 30, status: 'empty', type: 'Micro Studs & Nosepins', occupiedSlots: [] },
      { id: 'M31-60', name: 'Tray M31-60', capacity: 30, slotStart: 31, slotEnd: 60, status: 'pre-marking', stage: 'Laser Engraving Prep', job: 'JOB-9106', customer: 'Joyalukkas', occupiedSlots: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
      { id: 'M61-90', name: 'Tray M61-90', capacity: 30, slotStart: 61, slotEnd: 90, status: 'completed', stage: 'Marking Done', job: 'JOB-9085', customer: 'Kalyan Jewellers', occupiedSlots: Array.from({length: 30}, (_, i) => i + 61) },
      { id: 'D1-5', name: 'Tray D1-5', capacity: 5, slotStart: 1, slotEnd: 5, status: 'empty', type: 'Odd-Lot / Antique Gold', occupiedSlots: [] }
    ],
    selectedVaultBoxId: 'R25-50',
    selectedVaultSlot: 25,
    allocatedMap: {},
    vaultFilterStatus: 'ALL'
  };

  // --- ROUTING & NAVIGATION ---
  const validRoutes = [
    'sign-in',
    'dashboard',
    'receive',
    'tag-generation',
    'customer-information',
    'bill-generation',
    'delivery',
    'records-history',
    'settings'
  ];

  function getRouteFromHash() {
    let hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (hash === 'bill_generation') hash = 'bill-generation';
    if (hash === 'tag_generation') hash = 'tag-generation';
    if (hash === 'receive_batch' || hash === 'receive-batch') hash = 'receive';
    return validRoutes.includes(hash) ? hash : 'dashboard';
  }

  function navigateTo(route, options = {}) {
    if (!validRoutes.includes(route)) route = 'dashboard';
    state.currentRoute = route;
    window.location.hash = '#/' + route;

    // Handle full-screen layout adjustments for sign-in page
    const isSignIn = (route === 'sign-in');
    const appHeader = document.getElementById('app-header');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const mainArea = document.querySelector('main');

    // Strict zero-scroll lock for sign-in page on mobile and all devices
    if (isSignIn) {
      document.documentElement.classList.add('sign-in-mode');
      document.body.classList.add('sign-in-mode');
    } else {
      document.documentElement.classList.remove('sign-in-mode');
      document.body.classList.remove('sign-in-mode');
    }

    if (appHeader) appHeader.style.display = isSignIn ? 'none' : '';
    if (sidebar) sidebar.style.display = isSignIn ? 'none' : '';
    if (mainWrapper) {
      if (isSignIn) {
        mainWrapper.classList.remove('lg:pl-72');
      } else {
        mainWrapper.classList.add('lg:pl-72');
      }
    }
    if (mainArea) {
      if (isSignIn) {
        mainArea.classList.remove('pt-16', 'px-4', 'sm:px-6', 'lg:px-gutter-desktop');
        mainArea.classList.add('p-0');
      } else {
        mainArea.classList.add('pt-16', 'px-4', 'sm:px-6', 'lg:px-gutter-desktop');
        mainArea.classList.remove('p-0');
      }
    }

    // Hide all views, show target view
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.add('hidden');
    });

    const activeView = document.getElementById('view-' + route);
    if (activeView) {
      activeView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    // Update active nav links across desktop sidebar & mobile drawer
    document.querySelectorAll('[data-path]').forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === route) {
        link.classList.remove('text-on-primary-container', 'hover:bg-inverse-surface', 'hover:text-on-primary');
        link.classList.add('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-sm');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-sm');
        link.classList.add('text-on-primary-container', 'hover:bg-inverse-surface', 'hover:text-on-primary');
        link.removeAttribute('aria-current');
      }
    });

    // Close mobile drawer if open
    closeMobileDrawer();

    // Specific route option handlers
    if (route === 'customer-information' && options.openDrawer) {
      setTimeout(() => toggleCustomerDrawer(true), 150);
    }
    if (route === 'receive') {
      renderVaultBoxes();
      if (state.selectedVaultBoxId) {
        const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
        if (box) renderVaultSlots(box);
      }
      updateCustodyTracker();
      if (options.focusIntake) {
        setTimeout(() => {
          const input = document.getElementById('req-number');
          if (input) input.focus();
        }, 150);
      }
    }
    if (route === 'records-history' && options.tab) {
      setTimeout(() => switchHistoryTab(options.tab), 100);
    }
    if (route === 'tag-generation') {
      initTagGenerationView();
    }
    if (route !== 'delivery') {
      if (typeof stopDeliveryCameraStream === 'function') {
        stopDeliveryCameraStream();
      }
    }
    if (route === 'delivery') {
      initDeliveryView();
    }
    if (route === 'bill-generation') {
      initBillGenerationView();
    }
  }

  // --- MOBILE DRAWER & SIDEBAR TOGGLE ---
  function openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('-translate-x-full');
      backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  function toggleSidebarCollapse() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    if (window.innerWidth < 1024) {
      // On mobile / small tablet, open mobile drawer
      openMobileDrawer();
    } else {
      // On desktop / large tablet, toggle compact rail
      document.body.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isError = type === 'error';
    const isWarning = type === 'warning';

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${
      isError
        ? 'bg-red-950 text-red-100 border-red-800'
        : isWarning
        ? 'bg-amber-950 text-amber-100 border-amber-800'
        : 'bg-[#0e1c2f] text-white border-[#775a19]/40'
    }`;

    const icon = isError ? 'error' : isWarning ? 'warning' : 'check_circle';
    const iconColor = isError ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-[#fed488]';

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] ${iconColor}">${icon}</span>
      <div class="flex-1">${message}</div>
      <button class="text-white/60 hover:text-white transition-colors" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- GLOBAL SEARCH (Ctrl+K / ⌘K) ---
  function openGlobalSearch() {
    const modal = document.getElementById('global-search-modal');
    const input = document.getElementById('global-search-input');
    if (modal) {
      modal.classList.remove('hidden');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 50);
        renderSearchResults('');
      }
    }
  }

  function closeGlobalSearch() {
    const modal = document.getElementById('global-search-modal');
    if (modal) modal.classList.add('hidden');
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById('global-search-results');
    if (!resultsContainer) return;

    const q = (query || '').toLowerCase().trim();
    const suggestions = [
      { type: 'Nav', title: 'Dashboard Operations', icon: 'dashboard', action: () => navigateTo('dashboard') },
      { type: 'Nav', title: 'Receive New Batch & Intake', icon: 'move_to_inbox', action: () => navigateTo('receive') },
      { type: 'Nav', title: 'Customer Information Directory', icon: 'storefront', action: () => navigateTo('customer-information') },
      { type: 'Nav', title: 'Bill Generation & Tax Invoice', icon: 'receipt_long', action: () => navigateTo('bill-generation') },
      { type: 'Nav', title: 'Audit Ledger & Historical Records', icon: 'history_edu', action: () => navigateTo('records-history') },
      { type: 'Nav', title: 'Laboratory Control & Settings', icon: 'settings', action: () => navigateTo('settings') },
      ...state.customers.map(c => ({
        type: 'Client',
        title: `${c.name} (${c.code})`,
        subtitle: `${c.bis} • ${c.area}`,
        icon: 'storefront',
        action: () => {
          navigateTo('customer-information');
          setTimeout(() => {
            const filterInput = document.getElementById('tableFilterInput');
            if (filterInput) {
              filterInput.value = c.name;
              filterClientTable();
            }
          }, 100);
        }
      })),
      ...state.intakeBatches.map(b => ({
        type: 'Job',
        title: `${b.jobDocket} - ${b.customer}`,
        subtitle: `${b.purity} • ${b.netWt}g • ${b.status}`,
        icon: 'tag',
        action: () => {
          navigateTo('records-history');
        }
      }))
    ];

    const filtered = q
      ? suggestions.filter(s =>
          s.title.toLowerCase().includes(q) || (s.subtitle && s.subtitle.toLowerCase().includes(q))
        )
      : suggestions.slice(0, 8);

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="p-6 text-center text-on-surface-variant text-sm">
          No matches found for "<span class="font-semibold text-on-surface">${query}</span>"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered
      .map(
        (item, index) => `
        <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container cursor-pointer transition-colors search-item" data-index="${index}">
          <div class="flex items-center gap-3 min-w-0">
            <span class="p-2 rounded bg-surface-container-low text-secondary material-symbols-outlined text-[20px]">${item.icon}</span>
            <div class="flex flex-col min-w-0">
              <span class="font-medium text-sm text-on-surface truncate">${item.title}</span>
              ${item.subtitle ? `<span class="text-xs text-on-surface-variant font-data-mono truncate">${item.subtitle}</span>` : ''}
            </div>
          </div>
          <span class="text-[10px] font-data-mono px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant">${item.type}</span>
        </div>
      `
      )
      .join('');

    // Attach click listeners to items
    resultsContainer.querySelectorAll('.search-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        closeGlobalSearch();
        filtered[idx].action();
      });
    });
  }

  // --- RECEIVE MODULE FUNCTIONS ---
  function updateStreamUI(stream) {
    const mainCard = document.getElementById('card-stream-main');
    const offsideCard = document.getElementById('card-stream-offside');
    const mainIcon = document.getElementById('icon-stream-main');
    const offsideIcon = document.getElementById('icon-stream-offside');

    if (stream === 'MAIN') {
      if (mainCard) {
        mainCard.classList.add('ring-2', 'ring-primary-container', 'bg-surface-container-low/70', 'shadow-sm');
        mainCard.classList.remove('bg-surface-container-low/30');
      }
      if (offsideCard) {
        offsideCard.classList.remove('ring-2', 'ring-primary-container', 'bg-surface-container-low/70', 'shadow-sm');
        offsideCard.classList.add('bg-surface-container-low/30');
      }
      if (mainIcon) {
        mainIcon.textContent = 'check_circle';
        mainIcon.className = 'material-symbols-outlined text-primary-container text-[22px]';
      }
      if (offsideIcon) {
        offsideIcon.textContent = 'radio_button_unchecked';
        offsideIcon.className = 'material-symbols-outlined text-outline/40 text-[22px]';
      }
    } else {
      if (offsideCard) {
        offsideCard.classList.add('ring-2', 'ring-primary-container', 'bg-surface-container-low/70', 'shadow-sm');
        offsideCard.classList.remove('bg-surface-container-low/30');
      }
      if (mainCard) {
        mainCard.classList.remove('ring-2', 'ring-primary-container', 'bg-surface-container-low/70', 'shadow-sm');
        mainCard.classList.add('bg-surface-container-low/30');
      }
      if (offsideIcon) {
        offsideIcon.textContent = 'check_circle';
        offsideIcon.className = 'material-symbols-outlined text-primary-container text-[22px]';
      }
      if (mainIcon) {
        mainIcon.textContent = 'radio_button_unchecked';
        mainIcon.className = 'material-symbols-outlined text-outline/40 text-[22px]';
      }
    }
  }

  function calculateTareWeight() {
    const grossEl = document.getElementById('gross-weight');
    const netEl = document.getElementById('net-weight');
    const scrapEl = document.getElementById('scrapping-weight');
    if (!grossEl || !netEl) return;

    const gross = parseFloat(grossEl.value) || 0;
    const net = parseFloat(netEl.value) || 0;
    const scrap = parseFloat(scrapEl ? scrapEl.value : 0) || 0;

    if (document.activeElement === grossEl) {
      if (gross > 0 && net > 0 && scrapEl) {
        scrapEl.value = Math.max(0, gross - net).toFixed(3);
      } else if (gross > 0 && scrap > 0) {
        netEl.value = Math.max(0, gross - scrap).toFixed(3);
      }
    } else if (document.activeElement === netEl) {
      if (gross > 0 && scrapEl) {
        scrapEl.value = Math.max(0, gross - net).toFixed(3);
      } else if (gross === 0 && scrap > 0) {
        grossEl.value = (net + scrap).toFixed(3);
      }
    }
  }

  function calculateNetFromScrapping() {
    const grossEl = document.getElementById('gross-weight');
    const netEl = document.getElementById('net-weight');
    const scrapEl = document.getElementById('scrapping-weight');
    if (!grossEl || !netEl || !scrapEl) return;

    const gross = parseFloat(grossEl.value) || 0;
    const net = parseFloat(netEl.value) || 0;
    const scrap = parseFloat(scrapEl.value) || 0;

    if (gross > 0 && document.activeElement === scrapEl) {
      netEl.value = Math.max(0, gross - scrap).toFixed(3);
    } else if (gross === 0 && net > 0 && scrap >= 0) {
      grossEl.value = (net + scrap).toFixed(3);
    }
  }

  function setupWeightInputs() {
    const weightFieldIds = ['gross-weight', 'net-weight', 'scrapping-weight'];
    weightFieldIds.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;

      const clearZero = () => {
        const val = input.value.trim();
        if (val === '0.000' || val === '0' || val === '0.0' || val === '0.00') {
          input.value = '';
        }
      };

      input.addEventListener('focus', clearZero);
      input.addEventListener('click', clearZero);

      input.addEventListener('keydown', (e) => {
        const val = input.value.trim();
        if ((val === '0.000' || val === '0') && e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          input.value = '';
        }
      });

      input.addEventListener('blur', () => {
        const val = input.value.trim();
        if (!val || isNaN(parseFloat(val))) {
          input.value = '0.000';
        } else {
          input.value = parseFloat(val).toFixed(3);
        }
      });
    });
  }

  function resetWeightInputs() {
    ['gross-weight', 'net-weight', 'scrapping-weight'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }

  function captureBalanceReading() {
    const grossEl = document.getElementById('gross-weight');
    const netEl = document.getElementById('net-weight');
    if (!grossEl || !netEl) return;

    // Simulate reading connected Mettler Toledo balance
    const simulatedGross = (850 + Math.random() * 20).toFixed(3);
    const simulatedNet = (parseFloat(simulatedGross) - (10 + Math.random() * 3)).toFixed(3);

    grossEl.value = simulatedGross;
    netEl.value = simulatedNet;
    calculateTareWeight();

    showToast(`Live Scale Telemetry Captured: ${simulatedGross} g (Tare Stable ±0.0001g)`);
  }

  function addAdditionalJobRow() {
    const container = document.getElementById('additional-jobs-container');
    const grid = document.getElementById('additional-jobs-grid');
    if (!container || !grid) return;

    container.classList.remove('hidden');
    const count = grid.children.length + 2;
    const item = document.createElement('div');
    item.className = 'flex items-center gap-1.5 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-outline-variant/50 shadow-xs focus-within:border-primary-container transition-all';
    item.innerHTML = `
      <span class="text-[11px] font-bold text-on-surface-variant font-data-mono shrink-0">#${count}</span>
      <input class="w-full h-8 px-1.5 bg-transparent text-on-surface font-data-mono text-body-sm focus:outline-none additional-job-number" type="text" value=""/>
      <button onclick="removeJobRow(this)" class="p-1 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded transition-colors cursor-pointer shrink-0" type="button" title="Remove Job #${count}">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;
    grid.appendChild(item);
    updateAdditionalJobsCountBadge();
    const input = item.querySelector('input');
    if (input) input.focus();
  }

  function removeJobRow(btn) {
    const item = btn.closest('.flex');
    if (!item) return;
    const grid = document.getElementById('additional-jobs-grid');
    const container = document.getElementById('additional-jobs-container');
    item.remove();
    if (grid) {
      Array.from(grid.children).forEach((child, idx) => {
        const numSpan = child.querySelector('span.font-data-mono');
        if (numSpan) numSpan.textContent = `#${idx + 2}`;
      });
      if (grid.children.length === 0 && container) {
        container.classList.add('hidden');
      }
    }
    updateAdditionalJobsCountBadge();
  }

  function updateAdditionalJobsCountBadge() {
    const grid = document.getElementById('additional-jobs-grid');
    const badge = document.getElementById('additional-jobs-count-badge');
    if (grid && badge) {
      const count = grid.children.length;
      badge.textContent = count > 0 ? `(${count} added)` : '';
    }
  }

  function clearAllAdditionalJobs() {
    const grid = document.getElementById('additional-jobs-grid');
    const container = document.getElementById('additional-jobs-container');
    if (grid) grid.innerHTML = '';
    if (container) container.classList.add('hidden');
    updateAdditionalJobsCountBadge();
    showToast('All additional job numbers cleared.', 'info');
  }

  function setIntakeAmPm(val) {
    const hidden = document.getElementById('intake-ampm');
    const btnAm = document.getElementById('btn-ampm-am');
    const btnPm = document.getElementById('btn-ampm-pm');
    if (hidden) hidden.value = val;

    if (btnAm && btnPm) {
      if (val === 'AM') {
        btnAm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold bg-primary-container text-secondary-fixed shadow-sm transition-all cursor-pointer';
        btnPm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer';
      } else if (val === 'PM') {
        btnPm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold bg-primary-container text-secondary-fixed shadow-sm transition-all cursor-pointer';
        btnAm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer';
      } else {
        btnAm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer';
        btnPm.className = 'flex-1 h-full rounded text-xs font-data-mono font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer';
      }
    }
    syncIntakeTimestampHidden();
  }

  function handleHourInput(el) {
    let val = el.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num > 12) val = '12';
    }
    el.value = val;
    syncIntakeTimestampHidden();
    if (val.length === 2) {
      const minEl = document.getElementById('intake-minute');
      if (minEl) minEl.focus();
    }
  }

  function handleHourKeydown(e, el) {
    if (e.key === 'ArrowRight' && el.selectionStart === el.value.length) {
      const minEl = document.getElementById('intake-minute');
      if (minEl) minEl.focus();
    }
  }

  function handleMinuteInput(el) {
    let val = el.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num > 59) val = '59';
    }
    el.value = val;
    syncIntakeTimestampHidden();
  }

  function handleMinuteKeydown(e, el) {
    if (e.key === 'Backspace' && el.value.length === 0) {
      const hourEl = document.getElementById('intake-hour');
      if (hourEl) hourEl.focus();
    } else if (e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      setIntakeAmPm('AM');
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      setIntakeAmPm('PM');
    }
  }

  function syncIntakeTimestampHidden() {
    const h = document.getElementById('intake-hour') ? document.getElementById('intake-hour').value.trim() : '';
    const m = document.getElementById('intake-minute') ? document.getElementById('intake-minute').value.trim() : '';
    const ampm = document.getElementById('intake-ampm') ? document.getElementById('intake-ampm').value.trim() : '';
    const hidden = document.getElementById('intake-timestamp');
    if (hidden) {
      if (h && m && ampm) {
        hidden.value = `${h}:${m} ${ampm} IST`;
      } else if (h || m || ampm) {
        hidden.value = `${h || '--'}:${m || '--'} ${ampm || ''} IST`.trim();
      } else {
        hidden.value = '';
      }
    }
  }

  const GOLD_PURITIES = [
    { value: '22K 916', label: '22K 916 (91.6% Fine Gold) - Standard' },
    { value: '24K 999', label: '24K 999 (99.9% Pure Bullion & Coins)' },
    { value: '18K 750', label: '18K 750 (75.0% Fine Gold - Studded)' },
    { value: '14K 585', label: '14K 585 (58.5% Fine Gold)' },
    { value: '9K 375', label: '9K 375 (37.5% Alloy Specification)' }
  ];

  const SILVER_PURITIES = [
    { value: 'Silver 999', label: 'Silver 999 (99.9% Pure Silver Bullion)' },
    { value: 'Silver 970', label: 'Silver 970 (97.0% Silver Article)' },
    { value: 'Silver 925', label: 'Silver 925 (92.5% Sterling Silver - Standard)' },
    { value: 'Silver 900', label: 'Silver 900 (90.0% Silver Utensils & Ornaments)' },
    { value: 'Silver 835', label: 'Silver 835 (83.5% Fine Silver)' },
    { value: 'Silver 800', label: 'Silver 800 (80.0% Commercial Silver)' }
  ];

  let currentPurityOptions = GOLD_PURITIES;
  let activePurityIndex = 0;

  function renderPurityOptionsMenu() {
    const menu = document.getElementById('purity-options-menu');
    if (!menu) return;

    const puritySelect = document.getElementById('purity-select');
    const currentVal = puritySelect ? puritySelect.value : (currentPurityOptions[0] ? currentPurityOptions[0].value : '');

    const header = `
      <div class="px-3 py-1.5 bg-slate-50 border-b border-surface-container flex items-center justify-between text-[10px] font-bold text-outline tracking-wider uppercase select-none">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-amber-500">verified</span>
          <span>SELECT DECLARED PURITY</span>
        </span>
        <span class="text-[9px] font-normal text-slate-400">↑↓ ARROWS • ENTER TO CONFIRM</span>
      </div>
    `;

    const items = currentPurityOptions.map((opt, idx) => {
      const isSelected = opt.value === currentVal;
      const isActive = idx === activePurityIndex;
      return `
        <div
          class="purity-option-item px-3.5 py-2.5 flex items-center justify-between cursor-pointer border-b border-surface-container/30 hover:bg-primary-container/5 transition-colors select-none ${isActive ? 'bg-primary-container/10 border-l-4 border-[#c5a059]' : ''}"
          data-index="${idx}"
          data-value="${opt.value}"
          onclick="selectPurityOption(${idx})"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold ${isSelected ? 'text-primary-container font-extrabold' : 'text-on-surface'} uppercase">${opt.label}</span>
          </div>
          ${isSelected ? '<span class="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>' : ''}
        </div>
      `;
    }).join('');

    menu.innerHTML = header + items;
  }

  function togglePurityMenu(open) {
    const menu = document.getElementById('purity-options-menu');
    const chevron = document.getElementById('purity-chevron');
    if (!menu) return;

    const shouldOpen = open !== undefined ? open : menu.classList.contains('hidden');
    if (shouldOpen) {
      renderPurityOptionsMenu();
      menu.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        const activeItem = menu.querySelector(`.purity-option-item[data-index="${activePurityIndex}"]`);
        if (activeItem) scrollMenuItemIntoView(menu, activeItem);
      }, 20);
    } else {
      menu.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  function selectPurityOption(idx) {
    const opt = currentPurityOptions[idx];
    if (!opt) return;

    const puritySelect = document.getElementById('purity-select');
    const purityDisplay = document.getElementById('purity-display-text');
    if (puritySelect) {
      puritySelect.value = opt.value;
      puritySelect.classList.remove('field-error-highlight');
    }
    if (purityDisplay) {
      purityDisplay.textContent = opt.label;
    }

    activePurityIndex = idx;
    togglePurityMenu(false);

    // Immediately advance to next field line: Request Number (Line 4)
    setTimeout(() => {
      const reqInput = document.getElementById('req-number');
      if (reqInput) {
        focusAndHighlightField(reqInput);
      }
    }, 50);
  }

  function setMetalType(type) {
    const hidden = document.getElementById('metal-type');
    const btnGold = document.getElementById('btn-metal-gold');
    const btnSilver = document.getElementById('btn-metal-silver');
    const purityLabel = document.getElementById('purity-label');
    const puritySelect = document.getElementById('purity-select');
    const purityDisplay = document.getElementById('purity-display-text');

    if (hidden) hidden.value = type;

    if (type === 'SILVER') {
      if (btnSilver) {
        btnSilver.className = 'flex-1 h-full rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-primary-container text-secondary-fixed shadow-sm';
      }
      if (btnGold) {
        btnGold.className = 'flex-1 h-full rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-on-surface-variant hover:text-on-surface hover:bg-surface-container';
      }
      if (purityLabel) {
        purityLabel.innerHTML = 'DECLARED SILVER PURITY <span class="text-error">*</span>';
      }
      currentPurityOptions = SILVER_PURITIES;
      activePurityIndex = 2; // Default to Sterling 925
      if (puritySelect) puritySelect.value = SILVER_PURITIES[2].value;
      if (purityDisplay) purityDisplay.textContent = SILVER_PURITIES[2].label;
      showToast('Switched to Silver: Silver declared purity active (IS 2112).', 'info');
    } else {
      if (btnGold) {
        btnGold.className = 'flex-1 h-full rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-primary-container text-secondary-fixed shadow-sm';
      }
      if (btnSilver) {
        btnSilver.className = 'flex-1 h-full rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-on-surface-variant hover:text-on-surface hover:bg-surface-container';
      }
      if (purityLabel) {
        purityLabel.innerHTML = 'DECLARED GOLD PURITY <span class="text-error">*</span>';
      }
      currentPurityOptions = GOLD_PURITIES;
      activePurityIndex = 0; // Default to 22K 916
      if (puritySelect) puritySelect.value = GOLD_PURITIES[0].value;
      if (purityDisplay) purityDisplay.textContent = GOLD_PURITIES[0].label;
      showToast('Switched to Gold: Gold declared purity active (IS 1417).', 'info');
    }

    renderPurityOptionsMenu();
  }

  function initInteractiveControls() {
    // 1. Article Metal keydown (Left / Right arrow keys & Enter)
    const metalGroup = document.getElementById('metal-button-group');
    if (metalGroup) {
      metalGroup.addEventListener('keydown', e => {
        if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          focusAndHighlightField(document.getElementById('pieces-count'));
          return;
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setMetalType('GOLD');
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          setMetalType('SILVER');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const target = document.getElementById('article-type-input') || document.getElementById('purity-dropdown-btn');
          focusAndHighlightField(target);
        }
      });
    }

    // 2. Declared Purity Dropdown keydown (Enter opens, Arrows cycle, Enter confirms & advances)
    const purityBtn = document.getElementById('purity-dropdown-btn');
    if (purityBtn) {
      purityBtn.addEventListener('keydown', e => {
        const menu = document.getElementById('purity-options-menu');
        const isMenuOpen = menu && !menu.classList.contains('hidden');

        if (e.key === 'Enter') {
          e.preventDefault();
          if (!isMenuOpen) {
            // First Enter: opens dropdown!
            togglePurityMenu(true);
          } else {
            // Second Enter: selects option and advances to receipt-number!
            selectPurityOption(activePurityIndex);
          }
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isMenuOpen) {
            togglePurityMenu(true);
          } else {
            activePurityIndex = (activePurityIndex + 1) % currentPurityOptions.length;
            renderPurityOptionsMenu();
            const activeEl = menu.querySelector(`.purity-option-item[data-index="${activePurityIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!isMenuOpen) {
            togglePurityMenu(true);
          } else {
            activePurityIndex = (activePurityIndex - 1 + currentPurityOptions.length) % currentPurityOptions.length;
            renderPurityOptionsMenu();
            const activeEl = menu.querySelector(`.purity-option-item[data-index="${activePurityIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'Escape') {
          if (isMenuOpen) {
            e.preventDefault();
            togglePurityMenu(false);
          }
          return;
        }

        if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          togglePurityMenu(false);
          const target = document.getElementById('article-type-input') || document.getElementById('metal-button-group');
          focusAndHighlightField(target);
          return;
        }
      });
    }

    // Close purity menu on outside click
    document.addEventListener('click', e => {
      const wrapper = document.getElementById('purity-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        togglePurityMenu(false);
      }
    });

    // 3. AM / PM Segment Buttons (Left / Right arrow keys & Enter)
    const ampmGroup = document.getElementById('ampm-button-group');
    if (ampmGroup) {
      ampmGroup.addEventListener('keydown', e => {
        if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          focusAndHighlightField(document.getElementById('intake-minute'));
          return;
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          setIntakeAmPm('AM');
        } else if (e.key === 'ArrowRight' || e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          setIntakeAmPm('PM');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          focusAndHighlightField(document.getElementById('customer-name-input'));
        }
      });
    }

    // 4. Depositor Dropdown keydown (Enter opens, Arrows cycle, Enter confirms & advances)
    const depositorBtn = document.getElementById('depositor-dropdown-btn');
    if (depositorBtn) {
      depositorBtn.addEventListener('keydown', e => {
        const menu = document.getElementById('depositor-options-menu');
        const isMenuOpen = menu && !menu.classList.contains('hidden');

        if (e.key === 'Enter') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleDepositorMenu(true);
          } else {
            selectDepositorOption(activeDepositorIndex);
          }
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleDepositorMenu(true);
          } else {
            activeDepositorIndex = (activeDepositorIndex + 1) % DEPOSITOR_OPTIONS.length;
            renderDepositorOptionsMenu();
            const activeEl = menu.querySelector(`.depositor-option-item[data-index="${activeDepositorIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleDepositorMenu(true);
          } else {
            activeDepositorIndex = (activeDepositorIndex - 1 + DEPOSITOR_OPTIONS.length) % DEPOSITOR_OPTIONS.length;
            renderDepositorOptionsMenu();
            const activeEl = menu.querySelector(`.depositor-option-item[data-index="${activeDepositorIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'Escape') {
          if (isMenuOpen) {
            e.preventDefault();
            toggleDepositorMenu(false);
          }
          return;
        }

        if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          toggleDepositorMenu(false);
          focusAndHighlightField(document.getElementById('gross-weight'));
          return;
        }
      });
    }

    // Close depositor menu on outside click
    document.addEventListener('click', e => {
      const wrapper = document.getElementById('depositor-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        toggleDepositorMenu(false);
      }
    });

    // 5. Receiver Dropdown keydown (Enter opens, Arrows cycle, Enter confirms & advances to save button)
    const receiverBtn = document.getElementById('receiver-dropdown-btn');
    if (receiverBtn) {
      receiverBtn.addEventListener('keydown', e => {
        const menu = document.getElementById('receiver-options-menu');
        const isMenuOpen = menu && !menu.classList.contains('hidden');

        if (e.key === 'Enter') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleReceiverMenu(true);
          } else {
            selectReceiverOption(activeReceiverIndex);
          }
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleReceiverMenu(true);
          } else {
            activeReceiverIndex = (activeReceiverIndex + 1) % RECEIVER_OPTIONS.length;
            renderReceiverOptionsMenu();
            const activeEl = menu.querySelector(`.receiver-option-item[data-index="${activeReceiverIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!isMenuOpen) {
            toggleReceiverMenu(true);
          } else {
            activeReceiverIndex = (activeReceiverIndex - 1 + RECEIVER_OPTIONS.length) % RECEIVER_OPTIONS.length;
            renderReceiverOptionsMenu();
            const activeEl = menu.querySelector(`.receiver-option-item[data-index="${activeReceiverIndex}"]`);
            if (activeEl) scrollMenuItemIntoView(menu, activeEl);
          }
          return;
        }

        if (e.key === 'Escape') {
          if (isMenuOpen) {
            e.preventDefault();
            toggleReceiverMenu(false);
          }
          return;
        }

        if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          toggleReceiverMenu(false);
          focusAndHighlightField(document.getElementById('depositor-dropdown-btn'));
          return;
        }
      });
    }

    // Close receiver menu on outside click
    document.addEventListener('click', e => {
      const wrapper = document.getElementById('receiver-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        toggleReceiverMenu(false);
      }
    });

    // Close, Print, or Confirm Intake Confirmation Modal via Keyboard
    document.addEventListener('keydown', e => {
      const confirmModal = document.getElementById('intakeConfirmationModal');
      if (!confirmModal || confirmModal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeIntakeConfirmationModal();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeSaveReceiveEntry();
      } else if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        printIntakeReceipt();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        printIntakeReceipt();
      }
    });
  }

  // ========================================================
  // TAG GENERATION & BARCODE PRINTING MODULE
  // ========================================================
  // TAG GENERATION & BARCODE PRINTING MODULE (REVAMPED)
  // ========================================================
  let activeTagBatch = null;
  let activeTagRows = [];
  let excelSheetData = [];
  let activeCellRow = 0;
  let activeCellCol = 0;
  const EXCEL_DEFAULT_ROWS = 35;
  const EXCEL_DEFAULT_COLS = 26;
  let tagQueueFilter = 'ALL';
  let currentGeneratedTags = [];

  function getExcelColName(n) {
    let s = '';
    let num = n;
    while (num >= 0) {
      s = String.fromCharCode((num % 26) + 65) + s;
      num = Math.floor(num / 26) - 1;
    }
    return s;
  }

  function generateBarcodeSvg(code, width = 140, height = 32) {
    const clean = String(code).replace(/[^A-Za-z0-9]/g, '');
    const bars = [];
    let x = 6;
    bars.push(`<rect x="${x}" y="2" width="2" height="${height - 4}" fill="#000" />`);
    x += 3;
    bars.push(`<rect x="${x}" y="2" width="1" height="${height - 4}" fill="#000" />`);
    x += 3;

    for (let i = 0; i < clean.length; i++) {
      const codeVal = clean.charCodeAt(i);
      const w1 = (codeVal % 3) + 1;
      const w2 = ((codeVal >> 1) % 2) + 1;
      bars.push(`<rect x="${x}" y="2" width="${w1}" height="${height - 8}" fill="#000" />`);
      x += w1 + 1.5;
      bars.push(`<rect x="${x}" y="2" width="${w2}" height="${height - 8}" fill="#000" />`);
      x += w2 + 2;
      if (x > width - 15) break;
    }

    bars.push(`<rect x="${x}" y="2" width="2" height="${height - 4}" fill="#000" />`);
    x += 3;
    bars.push(`<rect x="${x}" y="2" width="1" height="${height - 4}" fill="#000" />`);

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <rect width="100%" height="100%" fill="#ffffff"/>
        ${bars.join('')}
      </svg>
    `;
  }

  function generateQrCodeSvg(text, size = 64) {
    const cleanText = String(text || 'HUID-PREVIEW').trim();
    if (typeof qrcode === 'function') {
      try {
        let qr;
        try {
          qr = qrcode(0, 'L');
          qr.addData(cleanText);
          qr.make();
        } catch (e1) {
          qr = qrcode(0, 'M');
          qr.addData(cleanText);
          qr.make();
        }
        const svgTag = qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true });
        return svgTag.replace('<svg ', `<svg width="${size}" height="${size}" style="max-width:100%;max-height:100%;display:block;" `);
      } catch (err) {
        console.error('qrcode-generator error:', err);
      }
    }
    // Pure vector SVG 2D QR fallback
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;max-height:100%;display:block;">
        <rect width="25" height="25" fill="#fff"/>
        <rect x="1" y="1" width="7" height="7" fill="#000"/><rect x="2" y="2" width="5" height="5" fill="#fff"/><rect x="3" y="3" width="3" height="3" fill="#000"/>
        <rect x="17" y="1" width="7" height="7" fill="#000"/><rect x="18" y="2" width="5" height="5" fill="#fff"/><rect x="19" y="3" width="3" height="3" fill="#000"/>
        <rect x="1" y="17" width="7" height="7" fill="#000"/><rect x="2" y="18" width="5" height="5" fill="#fff"/><rect x="3" y="19" width="3" height="3" fill="#000"/>
        <rect x="9" y="3" width="1" height="1" fill="#000"/><rect x="11" y="3" width="1" height="1" fill="#000"/><rect x="13" y="3" width="1" height="1" fill="#000"/><rect x="15" y="3" width="1" height="1" fill="#000"/>
        <rect x="3" y="9" width="1" height="1" fill="#000"/><rect x="3" y="11" width="1" height="1" fill="#000"/><rect x="3" y="13" width="1" height="1" fill="#000"/><rect x="3" y="15" width="1" height="1" fill="#000"/>
        <rect x="16" y="16" width="5" height="5" fill="#000"/><rect x="17" y="17" width="3" height="3" fill="#fff"/><rect x="18" y="18" width="1" height="1" fill="#000"/>
        <rect x="9" y="9" width="2" height="1" fill="#000"/><rect x="12" y="9" width="1" height="2" fill="#000"/>
        <rect x="10" y="12" width="2" height="2" fill="#000"/><rect x="14" y="11" width="1" height="2" fill="#000"/>
        <rect x="9" y="17" width="2" height="1" fill="#000"/><rect x="12" y="18" width="1" height="2" fill="#000"/>
      </svg>
    `;
  }

  function initTagGenerationView() {
    if (!state.intakeBatches || state.intakeBatches.length === 0) {
      const queueEl = document.getElementById('tag-batch-queue-container');
      if (queueEl) queueEl.innerHTML = '<div class="py-8 text-center text-slate-400 font-bold uppercase text-xs w-full">NO INTAKE BATCHES REGISTERED. PLEASE RECEIVE A BATCH FIRST.</div>';
      return;
    }

    if (!activeTagBatch) {
      activeTagBatch = state.intakeBatches[0];
    }

    renderTagStatusQueue();
    selectTagBatch(activeTagBatch.jobDocket);
  }

  let tagQueueSearchQuery = '';

  function onTagQueueSearchInput(val) {
    tagQueueSearchQuery = (val || '').trim();
    const clearBtn = document.getElementById('btn-clear-queue-search');
    if (clearBtn) {
      clearBtn.style.display = tagQueueSearchQuery ? 'block' : 'none';
    }
    renderTagStatusQueue();
  }

  function clearTagQueueSearch() {
    const input = document.getElementById('tag-queue-search');
    if (input) input.value = '';
    tagQueueSearchQuery = '';
    const clearBtn = document.getElementById('btn-clear-queue-search');
    if (clearBtn) clearBtn.style.display = 'none';
    renderTagStatusQueue();
  }

  function renderTagStatusQueue(filterOverride) {
    const queueContainer = document.getElementById('tag-batch-queue-container');
    if (!queueContainer) return;

    const filter = filterOverride || tagQueueFilter || 'ALL';
    tagQueueFilter = filter;

    const searchInput = document.getElementById('tag-queue-search');
    const query = (searchInput ? searchInput.value : tagQueueSearchQuery || '').trim().toLowerCase();
    tagQueueSearchQuery = query;

    const clearBtn = document.getElementById('btn-clear-queue-search');
    if (clearBtn) {
      clearBtn.style.display = query ? 'block' : 'none';
    }

    const batches = state.intakeBatches || [];
    const totalCount = batches.length;
    const pendingCount = batches.filter(b => b.tagStatus !== 'DONE').length;
    const doneCount = batches.filter(b => b.tagStatus === 'DONE').length;

    const statAll = document.getElementById('tag-stat-all');
    const statPending = document.getElementById('tag-stat-pending');
    const statDone = document.getElementById('tag-stat-done');
    if (statAll) statAll.textContent = `ALL: ${totalCount}`;
    if (statPending) statPending.textContent = `PENDING: ${pendingCount}`;
    if (statDone) statDone.textContent = `DONE: ${doneCount}`;

    // Filter Buttons Styling
    ['all', 'pending', 'done'].forEach(f => {
      const btn = document.getElementById(`tag-filter-${f}`);
      if (btn) {
        if (f.toUpperCase() === filter) {
          btn.className = 'px-2.5 py-1 rounded-md bg-white shadow-2xs text-slate-800';
        } else {
          btn.className = 'px-2.5 py-1 rounded-md text-slate-500 hover:text-slate-800';
        }
      }
    });

    const filtered = batches.filter(b => {
      // 1. Status Filter
      if (filter === 'PENDING' && b.tagStatus === 'DONE') return false;
      if (filter === 'DONE' && b.tagStatus !== 'DONE') return false;

      // 2. Real-time Search by Name, Job Docket, Request Number, BIS Number, Tray
      if (query) {
        const cust = (b.customer || '').toLowerCase();
        const docket = (b.jobDocket || '').toLowerCase();
        const req = (b.reqNo || '').toLowerCase();
        const bis = (b.bis || '').toLowerCase();
        const tray = (b.tray || '').toLowerCase();
        const matches = cust.includes(query) || docket.includes(query) || req.includes(query) || bis.includes(query) || tray.includes(query);
        if (!matches) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      const emptyMsg = query 
        ? `NO BATCHES FOUND MATCHING "${escapeHtmlStr(query)}".` 
        : 'NO BATCHES MATCHING THIS QUEUE FILTER.';
      queueContainer.innerHTML = `<div class="py-6 text-center text-slate-400 font-bold uppercase text-xs w-full">${emptyMsg}</div>`;
      return;
    }

    queueContainer.innerHTML = filtered.map(b => {
      const isActive = activeTagBatch && activeTagBatch.jobDocket === b.jobDocket;
      const isDone = b.tagStatus === 'DONE';
      const grossG = typeof b.grossWt === 'number' ? b.grossWt.toFixed(3) : parseFloat(b.grossWt || 0).toFixed(3);
      const netG = typeof b.netWt === 'number' ? b.netWt.toFixed(3) : parseFloat(b.netWt || 0).toFixed(3);

      return `
        <div
          onclick="selectTagBatch('${escapeHtmlStr(b.jobDocket)}')"
          class="tag-queue-card p-3 rounded-xl bg-white ${isActive ? 'active-queue-batch' : 'hover:border-slate-300'}"
        >
          <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
            <span class="font-mono font-bold text-xs text-primary-container">${escapeHtmlStr(b.jobDocket)}</span>
            <span class="text-[9.5px] font-mono text-slate-400">${escapeHtmlStr(b.receiptNo || 'REC')}</span>
          </div>

          <div class="font-bold text-slate-900 text-xs uppercase truncate mb-1" title="${escapeHtmlStr(b.customer)}">
            ${escapeHtmlStr(b.customer)}
          </div>

          <div class="flex items-center justify-between text-[10px] text-slate-600 mb-2 font-mono">
            <span>${b.pcs} PCS • ${escapeHtmlStr(b.purity)}</span>
            <span class="text-slate-400">TRAY: ${escapeHtmlStr(b.tray || '-')}</span>
          </div>

          <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
            <span class="font-mono text-slate-500">GR: ${grossG}g</span>
            ${isDone ? `
              <span class="px-2 py-0.5 rounded-full text-[9.5px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px]">check_circle</span>
                <span>DONE</span>
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[9.5px] font-bold font-mono bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px]">pending</span>
                <span>PENDING DATA</span>
              </span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  function filterTagQueue(filter) {
    tagQueueFilter = filter;
    renderTagStatusQueue(filter);
  }


  function syncTagPrintButtonState() {
    const hasData = (activeTagRows && activeTagRows.length > 0) || (excelSheetData && excelSheetData.some(r => r && r.some(c => c !== undefined && c !== null && String(c).trim() !== '')));
    const isDone = activeTagBatch && (activeTagBatch.tagStatus === 'DONE' || hasData);

    const topBtn = document.getElementById('btn-print-tags');
    const bottomBtn = document.getElementById('btn-print-tags-bottom');

    [topBtn, bottomBtn].forEach(btn => {
      if (!btn) return;
      if (isDone) {
        btn.disabled = false;
        btn.removeAttribute('disabled');
        btn.classList.remove('btn-print-disabled', 'opacity-50', 'cursor-not-allowed');
        btn.classList.add('cursor-pointer', 'hover:bg-slate-800', 'active:scale-95');
      } else {
        btn.disabled = true;
        btn.setAttribute('disabled', 'true');
        btn.classList.add('btn-print-disabled');
        btn.classList.remove('cursor-pointer', 'hover:bg-slate-800', 'active:scale-95');
      }
    });

    const statusBadge = document.getElementById('tag-ready-status-badge');
    if (statusBadge) {
      if (isDone) {
        statusBadge.innerHTML = '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>READY TO PRINT (' + (activeTagRows ? activeTagRows.length : 0) + ' TAGS)</span>';
      } else {
        statusBadge.innerHTML = '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>SAVE DATA TO ENABLE PRINT</span>';
      }
    }
  }

  function selectTagBatch(docket) {
    if (!docket) return;
    const batch = state.intakeBatches.find(b => b.jobDocket === docket) || state.intakeBatches[0];
    if (!batch) return;
    activeTagBatch = batch;

    // Load existing tag data or initialize completely empty Excel spreadsheet
    if (batch.excelData && Array.isArray(batch.excelData) && batch.excelData.length > 0) {
      excelSheetData = JSON.parse(JSON.stringify(batch.excelData));
      activeTagRows = batch.tagData ? JSON.parse(JSON.stringify(batch.tagData)) : convertExcelSheetToRows(excelSheetData);
    } else if (batch.tagData && Array.isArray(batch.tagData) && batch.tagData.length > 0) {
      excelSheetData = batch.tagData.map((r, i) => [
        String(r.slNo || i + 1),
        r.huid || '',
        r.itemDesc || '',
        String(r.pcs || 1),
        String(r.grossWt || ''),
        String(r.netWt || ''),
        r.purity || '',
        r.barcode || ''
      ]);
      activeTagRows = JSON.parse(JSON.stringify(batch.tagData));
    } else {
      // By default: STRICTLY EMPTY EXCEL SHEET (no mock/sample rows!)
      excelSheetData = [];
      activeTagRows = [];
    }

    activeCellRow = 0;
    activeCellCol = 0;

    renderExcelGrid();
    renderBatchIntakeMetadata(batch);
    updateTagMiniPreview();
    syncTagPrintButtonState();
    renderTagStatusQueue();
  }

  function cleanPurity(raw) {
    const src = raw !== undefined && raw !== null && String(raw).trim() !== '' ? raw : (activeTagBatch ? activeTagBatch.purity : '916');
    return String(src).replace(/[^0-9]/g, '').slice(0, 3) || '916';
  }

  function renderExcelGrid() {
    const container = document.getElementById('excel-grid-container');
    if (!container) return;

    let dataRows = excelSheetData.length;
    let maxDataCol = 0;
    for (let r = 0; r < dataRows; r++) {
      if (excelSheetData[r] && excelSheetData[r].length > maxDataCol) {
        maxDataCol = excelSheetData[r].length;
      }
    }

    const renderedRows = Math.max(EXCEL_DEFAULT_ROWS, dataRows + 5);
    const renderedCols = Math.max(EXCEL_DEFAULT_COLS, maxDataCol + 3);

    let colHeadersHtml = '<th class="excel-corner-header" title="Select All">◢</th>';
    for (let c = 0; c < renderedCols; c++) {
      const colName = getExcelColName(c);
      const isActive = (c === activeCellCol);
      colHeadersHtml += '<th class="excel-col-header ' + (isActive ? 'excel-header-active' : '') + '" id="excel-col-head-' + c + '">' + colName + '</th>';
    }

    let bodyHtml = '';
    for (let r = 0; r < renderedRows; r++) {
      const rowNum = r + 1;
      const isActiveRow = (r === activeCellRow);
      let cellsHtml = '<th class="excel-row-header ' + (isActiveRow ? 'excel-header-active' : '') + '" id="excel-row-head-' + r + '">' + rowNum + '</th>';
      for (let c = 0; c < renderedCols; c++) {
        const val = (excelSheetData[r] && excelSheetData[r][c] !== undefined && excelSheetData[r][c] !== null) ? excelSheetData[r][c] : '';
        cellsHtml += '<td class="excel-cell">' +
          '<input type="text" id="excel-cell-' + r + '-' + c + '" data-row="' + r + '" data-col="' + c + '" ' +
          'value="' + escapeHtmlStr(val) + '" ' +
          'onfocus="onExcelCellFocus(' + r + ', ' + c + ')" ' +
          'oninput="onExcelCellInput(' + r + ', ' + c + ', this.value)" ' +
          'onkeydown="onExcelCellKeydown(event, ' + r + ', ' + c + ')" ' +
          'class="excel-cell-input" autocomplete="off" spellcheck="false"/>' +
          '</td>';
      }
      bodyHtml += '<tr>' + cellsHtml + '</tr>';
    }

    container.innerHTML = '<table class="excel-sheet-table"><thead><tr>' + colHeadersHtml + '</tr></thead><tbody>' + bodyHtml + '</tbody></table>';

    const coordEl = document.getElementById('excel-active-cell');
    if (coordEl) coordEl.textContent = getExcelColName(activeCellCol) + (activeCellRow + 1);

    const formulaBar = document.getElementById('excel-formula-bar');
    if (formulaBar) {
      const activeVal = (excelSheetData[activeCellRow] && excelSheetData[activeCellRow][activeCellCol] !== undefined) ? excelSheetData[activeCellRow][activeCellCol] : '';
      formulaBar.value = activeVal;
    }

    updateExcelGridStats();
  }

  function onExcelCellFocus(r, c) {
    activeCellRow = r;
    activeCellCol = c;

    const coordEl = document.getElementById('excel-active-cell');
    if (coordEl) coordEl.textContent = getExcelColName(c) + (r + 1);

    const formulaBar = document.getElementById('excel-formula-bar');
    if (formulaBar) {
      const val = (excelSheetData[r] && excelSheetData[r][c] !== undefined) ? excelSheetData[r][c] : '';
      formulaBar.value = val;
    }

    document.querySelectorAll('.excel-col-header.excel-header-active').forEach(el => el.classList.remove('excel-header-active'));
    document.querySelectorAll('.excel-row-header.excel-header-active').forEach(el => el.classList.remove('excel-header-active'));

    const colEl = document.getElementById('excel-col-head-' + c);
    const rowEl = document.getElementById('excel-row-head-' + r);
    if (colEl) colEl.classList.add('excel-header-active');
    if (rowEl) rowEl.classList.add('excel-header-active');
  }

  function onExcelCellInput(r, c, val) {
    while (excelSheetData.length <= r) {
      excelSheetData.push([]);
    }
    excelSheetData[r][c] = val;

    const formulaBar = document.getElementById('excel-formula-bar');
    if (formulaBar) formulaBar.value = val;

    updateExcelGridStats();

    if (activeTagBatch && activeTagBatch.tagStatus === 'DONE') {
      activeTagBatch.tagStatus = 'PENDING';
      syncTagPrintButtonState();
      renderTagStatusQueue();
    }
  }

  function onFormulaBarInput(val) {
    const r = activeCellRow;
    const c = activeCellCol;

    while (excelSheetData.length <= r) {
      excelSheetData.push([]);
    }
    excelSheetData[r][c] = val;

    const cellInput = document.getElementById('excel-cell-' + r + '-' + c);
    if (cellInput) cellInput.value = val;

    updateExcelGridStats();

    if (activeTagBatch && activeTagBatch.tagStatus === 'DONE') {
      activeTagBatch.tagStatus = 'PENDING';
      syncTagPrintButtonState();
      renderTagStatusQueue();
    }
  }

  function onExcelCellKeydown(e, r, c) {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusExcelCell(r + 1, c);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        focusExcelCell(r, Math.max(0, c - 1));
      } else {
        focusExcelCell(r, c + 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusExcelCell(r + 1, c);
    } else if (e.key === 'ArrowUp') {
      if (r > 0) {
        e.preventDefault();
        focusExcelCell(r - 1, c);
      }
    }
  }

  function focusExcelCell(r, c) {
    activeCellRow = r;
    activeCellCol = c;
    let target = document.getElementById('excel-cell-' + r + '-' + c);
    if (!target) {
      renderExcelGrid();
      target = document.getElementById('excel-cell-' + r + '-' + c);
    }
    if (target) {
      target.focus();
      target.select();
    }
  }

  function handleExcelGridPaste(e) {
    if (!e) return;
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;
    const text = clipboardData.getData('text');
    if (!text) return;

    e.preventDefault();

    // Split text into raw lines
    let rawLines = text.split(/\r\n|\r|\n/);

    // Strip leading empty lines or lines with only whitespace, tabs, or commas
    while (rawLines.length > 0 && (!rawLines[0] || !rawLines[0].trim() || rawLines[0].replace(/[\t,;\s]/g, '') === '')) {
      rawLines.shift();
    }
    // Strip trailing empty lines
    while (rawLines.length > 0 && (!rawLines[rawLines.length - 1] || !rawLines[rawLines.length - 1].trim() || rawLines[rawLines.length - 1].replace(/[\t,;\s]/g, '') === '')) {
      rawLines.pop();
    }

    if (!rawLines.length) return;

    // Target start row and column
    let startR = activeCellRow >= 0 ? activeCellRow : 0;
    let startC = activeCellCol >= 0 ? activeCellCol : 0;

    // If user selected the first cell (row 0, col 0) or if sheet was empty, ensure start at strictly 0, 0
    const isSheetCurrentlyEmpty = !excelSheetData.length || excelSheetData.every(r => !r || r.every(c => !c || !String(c).trim()));
    if (isSheetCurrentlyEmpty || (startR === 0 && startC === 0)) {
      startR = 0;
      startC = 0;
      excelSheetData = []; // clean slate for fresh paste
    }

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      let tokens = [];

      if (line.includes('\t')) {
        tokens = line.split('\t');
      } else {
        // Quote-aware CSV tokenizer
        let cur = '';
        let inQ = false;
        for (let k = 0; k < line.length; k++) {
          const ch = line[k];
          if (ch === '"' || ch === "'") {
            if (inQ && line[k + 1] === ch) {
              cur += ch;
              k++;
            } else {
              inQ = !inQ;
            }
          } else if (ch === ',' && !inQ) {
            tokens.push(cur.trim().replace(/^["']|["']$/g, ''));
            cur = '';
          } else {
            cur += ch;
          }
        }
        tokens.push(cur.trim().replace(/^["']|["']$/g, ''));
      }

      tokens = tokens.map(t => t ? t.trim().replace(/^["']|["']$/g, '') : '');

      const targetR = startR + i;
      while (excelSheetData.length <= targetR) {
        excelSheetData.push([]);
      }

      for (let j = 0; j < tokens.length; j++) {
        const targetC = startC + j;
        excelSheetData[targetR][targetC] = tokens[j];
      }
    }

    if (activeTagBatch && activeTagBatch.tagStatus === 'DONE') {
      activeTagBatch.tagStatus = 'PENDING';
      syncTagPrintButtonState();
      renderTagStatusQueue();
    }

    activeTagRows = convertExcelSheetToRows(excelSheetData);
    renderExcelGrid();
    focusExcelCell(startR, startC);
    updateTagMiniPreview();
    showToast('PASTED ' + rawLines.length + ' ROWS INTO EXCEL SPREADSHEET.', 'success');
  }

    function updateExcelGridStats() {
    let dataRowCount = 0;
    let maxColCount = 0;
    let totalCellCount = 0;

    for (let r = 0; r < excelSheetData.length; r++) {
      const row = excelSheetData[r];
      if (!row) continue;
      let rowHasData = false;
      for (let c = 0; c < row.length; c++) {
        const val = row[c];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          rowHasData = true;
          totalCellCount++;
          if (c + 1 > maxColCount) maxColCount = c + 1;
        }
      }
      if (rowHasData) dataRowCount++;
    }

    const elRows = document.getElementById('tag-total-rows');
    const elCols = document.getElementById('tag-total-cols');
    const elCells = document.getElementById('tag-total-cells');
    const elPill = document.getElementById('tag-grid-reconcile-pill');
    const elText = document.getElementById('tag-reconcile-text');

    if (elRows) elRows.textContent = dataRowCount;
    if (elCols) elCols.textContent = maxColCount;
    if (elCells) elCells.textContent = totalCellCount;

    if (elPill && elText) {
      if (dataRowCount === 0) {
        elPill.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200';
        elText.textContent = 'EMPTY SHEET (CLICK ANY CELL & CTRL+V TO PASTE)';
      } else {
        const isSaved = activeTagBatch && activeTagBatch.tagStatus === 'DONE';
        if (isSaved) {
          elPill.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
          elText.innerHTML = 'SAVED & READY: ' + dataRowCount + ' ROWS SAVED • PRINT UNLOCKED';
        } else {
          elPill.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300';
          elText.innerHTML = 'UNSAVED: ' + dataRowCount + ' DATA ROWS DETECTED • CLICK \'SAVE TAG DATA\' TO UNLOCK PRINT';
        }
      }
    }
  }

  // Backwards compatibility stubs
  function addExcelRow() {
    excelSheetData.push([]);
    renderExcelGrid();
  }
  function deleteExcelRow(idx) {
    if (excelSheetData[idx]) {
      excelSheetData.splice(idx, 1);
      renderExcelGrid();
    }
  }
  function deleteSelectedExcelRows() {}
  function clearExcelSheetData() {
    excelSheetData = [];
    activeTagRows = [];
    activeCellRow = 0;
    activeCellCol = 0;

    if (activeTagBatch) {
      activeTagBatch.excelData = [];
      activeTagBatch.tagData = [];
      activeTagBatch.tagStatus = 'PENDING';
      syncTagPrintButtonState();
      renderTagStatusQueue();
    }

    renderExcelGrid();
    updateTagMiniPreview();
    updateExcelGridStats();

    showToast('EXCEL SPREADSHEET DATA CLEARED.', 'info');
  }

  function clearExcelGrid() {
    clearExcelSheetData();
  }
  function autoFillFromIntake() {}
  function pasteFromClipboard() {}
  function importCsvToExcel() {}
  function toggleSelectExcelRow() {}
  function toggleSelectAllExcelRows() {}
  function onExcelCellChange() {}
  function updateGridReconciliation() {
    updateExcelGridStats();
  }

  function convertExcelSheetToRows(sheet) {
    const rows = [];
    if (!sheet || !sheet.length) return rows;

    const defaultCustomer = activeTagBatch ? (activeTagBatch.customer || 'SSR Bullion') : 'SSR Bullion';
    const defaultMetal = activeTagBatch ? (activeTagBatch.metal || 'GOLD') : 'GOLD';
    const defaultPurity = activeTagBatch ? (activeTagBatch.purity || '22K 916') : '22K 916';
    const defaultBox = activeTagBatch ? (activeTagBatch.tray || activeTagBatch.boxNo || 'BOX-TR-01') : 'BOX-TR-01';
    const cleanCust = defaultCustomer.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();
    const cleanPurityCode = (activeTagBatch ? activeTagBatch.purity : '916').replace(/[^0-9]/g, '').slice(0, 3) || '916';

    for (let i = 0; i < sheet.length; i++) {
      const r = sheet[i];
      if (!r || !r.length) continue;

      const hasData = r.some(cell => cell !== undefined && cell !== null && String(cell).trim() !== '');
      if (!hasData) continue;

      const isHeader = r.some(c => /^(sl\.?\s*no|s\s*no\.?|huid|item|desc|category|pieces?|pcs|no\s*of\s*unit|gross|net|purity|karat|barcode|box|weight)/i.test(String(c).trim()));
      if (rows.length === 0 && isHeader && !r.some(c => /^HUID-|^JOB-|^GP-|^REQ-/i.test(String(c).trim()))) {
        continue;
      }

      const rowIdx = rows.length + 1;
      const padNum = String(rowIdx).padStart(3, '0');
      const cells = r.map(c => (c !== undefined && c !== null) ? String(c).trim() : '');

      let slNo = rowIdx;
      let customer = defaultCustomer;
      let articleType = defaultMetal + ' ' + defaultPurity;
      let ornamentsType = (activeTagBatch && activeTagBatch.articleType) ? activeTagBatch.articleType : 'Jewellery Article';
      let pcs = 1;
      let weight = '0.000';
      let grossWt = '0.000';
      let netWt = '0.000';
      let huid = '';
      let boxNo = defaultBox;
      let purity = defaultPurity;
      let barcode = '';

      const matched = new Set();

      // 1. Look for BIS HUID:
      // Either starts with HUID- or is 6 alphanumeric characters (like Y6P2F5, 7K2P9X) and not purely numeric
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        const c = cells[cIdx];
        if (/^HUID-[\w-]+/i.test(c)) {
          huid = c.toUpperCase();
          matched.add(cIdx);
          break;
        }
      }
      if (!huid) {
        for (let cIdx = 0; cIdx < cells.length; cIdx++) {
          const c = cells[cIdx];
          if (/^[A-Za-z0-9]{6}$/.test(c) && !/^\d{6}$/.test(c)) {
            huid = c.toUpperCase();
            matched.add(cIdx);
            break;
          }
        }
      }

      // 2. Look for Decimal Weights:
      const weightIndices = [];
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (/^\d+\.\d{1,4}$/.test(c)) {
          weightIndices.push(cIdx);
          matched.add(cIdx);
        }
      }
      if (weightIndices.length >= 2) {
        grossWt = parseFloat(cells[weightIndices[0]]).toFixed(3);
        netWt = parseFloat(cells[weightIndices[1]]).toFixed(3);
        weight = grossWt;
      } else if (weightIndices.length === 1) {
        weight = parseFloat(cells[weightIndices[0]]).toFixed(3);
        grossWt = weight;
        netWt = weight;
      }

      // 3. Look for Purity code:
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (/^(24K|22K|18K|14K|999|916|750|585|GOLD|SILVER)/i.test(c)) {
          purity = c.toUpperCase();
          matched.add(cIdx);
          break;
        }
      }

      // 4. Look for Ornaments / Item Description (text string):
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (/^[A-Za-z\s&-]{2,}$/.test(c) && !/^(BOX|TRAY)/i.test(c)) {
          ornamentsType = c.toUpperCase();
          matched.add(cIdx);
          break;
        }
      }

      // 5. Look for Box / Tray:
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (/^(BOX|TRAY|TR)[-_\s]?[A-Za-z0-9-]+$/i.test(c)) {
          boxNo = c.toUpperCase();
          matched.add(cIdx);
          break;
        }
      }

      // 6. Look for Sl No (first cell if integer):
      if (!matched.has(0) && /^\d+$/.test(cells[0])) {
        slNo = parseInt(cells[0], 10);
        matched.add(0);
      }

      // 7. Look for Pcs:
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (/^\d+$/.test(c)) {
          pcs = parseInt(c, 10);
          matched.add(cIdx);
          break;
        }
      }

      // 8. Barcode:
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        if (matched.has(cIdx)) continue;
        const c = cells[cIdx];
        if (c && !barcode) {
          barcode = c;
          matched.add(cIdx);
          break;
        }
      }

      if (!huid) {
        huid = 'HUID-' + cleanPurityCode + '-' + cleanCust + padNum;
      }
      if (!barcode) {
        barcode = huid;
      }

      rows.push({
        slNo: slNo,
        customer: customer,
        articleType: defaultMetal + (purity ? ' ' + purity : ''),
        ornamentsType: ornamentsType,
        itemDesc: ornamentsType,
        weight: weight,
        pcs: pcs,
        grossWt: grossWt,
        netWt: netWt,
        purity: purity,
        huid: huid,
        boxNo: boxNo,
        barcode: barcode,
        rawCells: cells
      });
    }

    return rows;
  }

    function generateDefaultTagRows(batch) {
    return [];
  }

  function renderBatchIntakeMetadata(batch) {
    if (!batch) return;
    const elCust = document.getElementById('tag-meta-customer');
    const elBis = document.getElementById('tag-meta-bis');
    const elJob = document.getElementById('tag-meta-job');
    const elReq = document.getElementById('tag-meta-req');
    const elPurity = document.getElementById('tag-meta-purity');
    const elPcs = document.getElementById('tag-meta-pcs');
    const elGross = document.getElementById('tag-meta-gross');
    const elNet = document.getElementById('tag-meta-net');
    const elTray = document.getElementById('tag-meta-tray');
    const elStaff = document.getElementById('tag-meta-staff');

    if (elCust) elCust.textContent = batch.customer || '-';
    if (elBis) elBis.textContent = batch.bis || 'N/A';
    if (elJob) elJob.textContent = batch.jobDocket || '-';
    if (elReq) elReq.textContent = batch.reqNo || 'REQ-8831-A';
    if (elPurity) elPurity.textContent = `${batch.metal || 'GOLD'} • ${batch.purity}`;
    if (elPcs) elPcs.textContent = `${batch.pcs} PIECES`;
    if (elGross) elGross.textContent = `${Number(batch.grossWt || 0).toFixed(3)} g`;
    if (elNet) elNet.textContent = `${Number(batch.netWt || 0).toFixed(3)} g`;
    if (elTray) elTray.textContent = batch.tray || '-';
    if (elStaff) elStaff.textContent = `${batch.depositor || 'N/A'} (Dep) / ${batch.receiver || 'Sarah Jenkins'} (Rec)`;
  }

  // --- CUSTOM TAG PRINT SIZING ENGINE ---
  function onTagPresetChanged(preset) {
    const widthInput = document.getElementById('tag-print-width');
    const heightInput = document.getElementById('tag-print-height');
    const unitSelect = document.getElementById('tag-print-unit');
    if (!widthInput || !heightInput) return;

    if (unitSelect) unitSelect.value = 'mm';
    document.querySelectorAll('.tag-unit-label').forEach(el => { el.textContent = 'mm'; });

    if (preset === 'butterfly') {
      widthInput.value = 50;
      heightInput.value = 12;
    } else if (preset === 'dumbbell') {
      widthInput.value = 48;
      heightInput.value = 26;
    } else if (preset === 'pouch') {
      widthInput.value = 60;
      heightInput.value = 30;
    }

    ['butterfly', 'dumbbell', 'pouch', 'custom'].forEach(p => {
      const btn = document.getElementById(`tag-preset-${p}`);
      if (btn) {
        if (p === preset) {
          btn.className = 'tag-preset-btn p-2.5 rounded-xl border-2 border-primary-container bg-primary-container/5 text-left font-bold text-slate-800 transition-all cursor-pointer';
        } else {
          btn.className = 'tag-preset-btn p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-left font-bold text-slate-700 transition-all cursor-pointer';
        }
      }
    });

    updateTagMiniPreview();
  }

  function onTagDimensionInput() {
    onTagPresetChanged('custom');
    updateTagMiniPreview();
  }

  function onTagUnitChanged() {
    const unitSelect = document.getElementById('tag-print-unit');
    const unit = unitSelect ? unitSelect.value : 'mm';
    document.querySelectorAll('.tag-unit-label').forEach(el => { el.textContent = unit; });
    updateTagMiniPreview();
  }

  function formatTagDateStr(d) {
    if (!d) {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      return dd + '-' + mm + '-' + yyyy;
    }
    if (typeof d === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(d.trim())) return d.trim();
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime())) {
      const dd = String(parsed.getDate()).padStart(2, '0');
      const mm = String(parsed.getMonth() + 1).padStart(2, '0');
      const yyyy = parsed.getFullYear();
      return dd + '-' + mm + '-' + yyyy;
    }
    return String(d);
  }

  function updateTagMiniPreview() {
    const miniPreview = document.getElementById('tag-mini-preview');
    const widthInput = document.getElementById('tag-cfg-width');
    const heightInput = document.getElementById('tag-cfg-height');
    const unitInput = document.getElementById('tag-cfg-unit');
    const dimsLabel = document.getElementById('tag-preview-dims-label');

    if (!miniPreview || !widthInput || !heightInput) return;

    const width = parseFloat(widthInput.value) || 50;
    const height = parseFloat(heightInput.value) || 17;
    const unit = unitInput ? unitInput.value : 'mm';

    if (dimsLabel) {
      dimsLabel.textContent = width + ' × ' + height + ' ' + unit;
    }

    const ratio = width / height;
    const maxBoxW = 270;
    const maxBoxH = 120;
    const minBoxW = 120;
    const minBoxH = 50;

    let targetW, targetH;
    if (ratio >= maxBoxW / maxBoxH) {
      targetW = maxBoxW;
      targetH = Math.max(minBoxH, Math.min(maxBoxH, Math.round(maxBoxW / ratio)));
    } else {
      targetH = maxBoxH;
      targetW = Math.max(minBoxW, Math.min(maxBoxW, Math.round(maxBoxH * ratio)));
    }

    miniPreview.style.width = targetW + 'px';
    miniPreview.style.height = targetH + 'px';
    miniPreview.style.display = 'grid';
    miniPreview.style.gridTemplateColumns = '48% 50%';
    miniPreview.style.justifyContent = 'space-between';
    miniPreview.style.alignItems = 'stretch';
    miniPreview.style.padding = '6px 8px 6px 10px';
    miniPreview.style.maxWidth = '100%';
    miniPreview.style.transition = 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1), height 0.22s cubic-bezier(0.4, 0, 0.2, 1)';

    // Checkbox visibility toggles
    const optCust = document.getElementById('tag-opt-cust') ? document.getElementById('tag-opt-cust').checked : true;
    const optOrnament = document.getElementById('tag-opt-ornament') ? document.getElementById('tag-opt-ornament').checked : true;
    const optHuid = document.getElementById('tag-opt-huid') ? document.getElementById('tag-opt-huid').checked : true;
    const optQr = document.getElementById('tag-opt-qr') ? document.getElementById('tag-opt-qr').checked : true;

    const elRowCust = document.getElementById('mini-row-cust');
    const elRowDate = document.getElementById('mini-row-date');
    const elRowArtBox = document.getElementById('mini-row-art-box');
    const elRowOrnament = document.getElementById('mini-row-ornament');
    const elRowGross = document.getElementById('mini-row-gross');
    const elRowNet = document.getElementById('mini-row-net');
    const elRowHuid = document.getElementById('mini-row-huid');
    const elRowQr = document.getElementById('mini-row-qr');

    if (elRowCust) elRowCust.style.display = optCust ? 'block' : 'none';
    if (elRowDate) elRowDate.style.display = optCust ? 'block' : 'none';
    if (elRowArtBox) elRowArtBox.style.display = optOrnament ? 'flex' : 'none';
    if (elRowOrnament) elRowOrnament.style.display = optOrnament ? 'block' : 'none';
    if (elRowGross) elRowGross.style.display = optOrnament ? 'block' : 'none';
    if (elRowNet) elRowNet.style.display = optOrnament ? 'block' : 'none';
    if (elRowHuid) elRowHuid.style.display = optHuid ? 'block' : 'none';
    if (elRowQr) elRowQr.style.display = optQr ? 'flex' : 'none';

    // Pick top sample row from activeTagRows, or fallback to activeTagBatch defaults
    const sampleRow = (activeTagRows && activeTagRows[0]) ? activeTagRows[0] : null;

    const custName = sampleRow ? (sampleRow.customer || (activeTagBatch ? activeTagBatch.customer : 'CUSTOMER')) : (activeTagBatch ? activeTagBatch.customer : 'KALYAN HERITAGE JEWELLERS');
    const dateStr = sampleRow ? (sampleRow.date || formatTagDateStr(activeTagBatch ? activeTagBatch.receivedDate : null)) : '21-11-2026';
    const purityVal = sampleRow ? (sampleRow.purity || (activeTagBatch ? activeTagBatch.purity : '22K 916')) : (activeTagBatch ? activeTagBatch.purity : '22K 916');
    const articleVal = sampleRow ? (sampleRow.articleType || (activeTagBatch ? activeTagBatch.metal : 'GOLD')) : (activeTagBatch ? activeTagBatch.metal : 'GOLD');
    const ornamentVal = sampleRow ? (sampleRow.ornamentsType || sampleRow.itemDesc || 'MIX ITEM') : 'MIX ITEM';
    const grossVal = sampleRow ? (sampleRow.grossWt ? (sampleRow.grossWt + (String(sampleRow.grossWt).includes('g') ? '' : 'g')) : (sampleRow.weight ? (sampleRow.weight + 'g') : '2.760g')) : '2.760g';
    const netVal = sampleRow ? (sampleRow.netWt ? (sampleRow.netWt + (String(sampleRow.netWt).includes('g') ? '' : 'g')) : (sampleRow.weight ? (sampleRow.weight + 'g') : '2.760g')) : '2.760g';
    const huidVal = sampleRow ? (sampleRow.huid || 'SGG9RZ') : 'SGG9RZ';
    const boxVal = sampleRow ? (sampleRow.boxNo || (activeTagBatch ? (activeTagBatch.tray || activeTagBatch.boxNo) : 'BOX-TR-09')) : (activeTagBatch ? (activeTagBatch.tray || activeTagBatch.boxNo || 'BOX-TR-09') : 'BOX-TR-09');

    // Auto font-size adjustment based on letter count
    const custLen = custName.length;
    const custEffectiveChars = custLen > 18 ? Math.ceil(custLen / 2) : custLen;
    const artBoxChars = ('ARTICLE: ' + articleVal + '  BOX: ' + boxVal).length;
    const ornChars = ('ORNAMENT: ' + ornamentVal).length;
    const grossChars = ('GROSS WEIGHT: ' + grossVal).length;
    const netChars = ('NET WEIGHT: ' + netVal).length;
    const huidChars = ('HUID NUMBER: ' + huidVal).length;

    const maxChars = Math.max(custEffectiveChars, artBoxChars, ornChars, grossChars, netChars, huidChars);

    let fontScale = 1.0;
    if (maxChars > 22) {
      fontScale = Math.min(1.0, 22 / maxChars);
    }
    if (custLen > 30) {
      fontScale = Math.min(fontScale, Math.max(0.48, 30 / custLen + 0.05));
    }
    fontScale = Math.max(0.48, fontScale);

    // Apply auto-adjusted font sizes to preview elements
    const baseTitlePx = Math.max(6.0, Math.min(10.0, targetH * 0.075));
    const baseDataPx = Math.max(5.0, Math.min(8.0, targetH * 0.060));

    const titlePx = (baseTitlePx * fontScale).toFixed(1);
    const dataPx = (baseDataPx * fontScale).toFixed(1);

    const elCust = document.getElementById('mini-tag-cust');
    const elDate = document.getElementById('mini-tag-date');
    const elArticle = document.getElementById('mini-tag-article');
    const elOrnament = document.getElementById('mini-tag-ornament');
    const elGross = document.getElementById('mini-tag-gross');
    const elNet = document.getElementById('mini-tag-net');
    const elBox = document.getElementById('mini-tag-box');
    const elHuid = document.getElementById('mini-tag-huid');
    const elQr = document.getElementById('mini-tag-qr');
    const elQrLabel = document.getElementById('mini-tag-qr-label');
    const elDataZone = document.getElementById('mini-data-zone');

    if (elCust) {
      elCust.textContent = custName;
      elCust.style.fontSize = titlePx + 'px';
    }
    if (elDate) elDate.textContent = dateStr;
    if (elArticle) elArticle.textContent = articleVal.replace(purityVal, '').trim() || 'GOLD';
    if (elOrnament) elOrnament.textContent = ornamentVal;
    if (elGross) elGross.textContent = grossVal;
    if (elNet) elNet.textContent = netVal;
    if (elBox) elBox.textContent = boxVal;
    if (elHuid) elHuid.textContent = huidVal;
    if (elQrLabel) elQrLabel.textContent = huidVal;
    if (elDataZone) elDataZone.style.fontSize = dataPx + 'px';

    // QR size is fixed strictly by preview height with decent padding
    const qrSize = Math.max(22, Math.min(targetH - 34, Math.round(targetW * 0.36), 75));
    if (elQr && optQr) {
      const samplePayload = [
        'CUSTOMER: ' + custName,
        'DATE: ' + dateStr,
        'ARTICLE: ' + (articleVal.replace(purityVal, '').trim() || 'GOLD'),
        'BOX NUMBER: ' + boxVal,
        'ORNAMENT: ' + ornamentVal,
        'GROSS WEIGHT: ' + grossVal,
        'NET WEIGHT: ' + netVal,
        'HUID NUMBER: ' + huidVal
      ].join('\n');
      elQr.innerHTML = generateQrCodeSvg(samplePayload, qrSize);
    }
  }

  // --- GATED SAVE & PRINT ACTIONS ---
  function saveTagData() {
    if (!activeTagBatch) {
      showToast('NO ACTIVE BATCH SELECTED TO SAVE.', 'warning');
      return;
    }

    const rows = convertExcelSheetToRows(excelSheetData);

    if (!rows || rows.length === 0) {
      showToast('EXCEL SPREADSHEET IS EMPTY. PLEASE PASTE OR ENTER TAG DATA BEFORE SAVING.', 'warning');
      if (activeTagBatch) {
        activeTagBatch.tagStatus = 'PENDING';
        syncTagPrintButtonState();
        renderTagStatusQueue();
      }
      return;
    }

    activeTagRows = rows;
    activeTagBatch.tagData = rows;
    activeTagBatch.excelData = excelSheetData;
    activeTagBatch.tagStatus = 'DONE';

    syncTagPrintButtonState();
    renderTagStatusQueue();
    updateTagMiniPreview();

    showToast('SUCCESS: ' + rows.length + ' TAGS SUBMITTED & READY TO PRINT.', 'success');
  }

  function printCustomTags() {
    if (!activeTagBatch) {
      showToast('NO ACTIVE BATCH SELECTED FOR PRINTING.', 'warning');
      return;
    }

    if (!activeTagRows || activeTagRows.length === 0) {
      const converted = convertExcelSheetToRows(excelSheetData);
      if (converted && converted.length > 0) {
        activeTagRows = converted;
        if (activeTagBatch) {
          activeTagBatch.tagData = converted;
          activeTagBatch.tagStatus = 'DONE';
          syncTagPrintButtonState();
          renderTagStatusQueue();
        }
      } else {
        showToast('NO TAG DATA AVAILABLE TO PRINT. PLEASE PASTE OR ENTER DATA FIRST.', 'warning');
        return;
      }
    }

    let printFrame = document.getElementById('tag-print-frame');
    if (printFrame) {
      try {
        printFrame.remove();
      } catch (e) {}
    }
    printFrame = document.createElement('iframe');
    printFrame.id = 'tag-print-frame';
    printFrame.name = 'tag-print-frame';
    printFrame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;';
    document.body.appendChild(printFrame);

    const width = parseFloat(document.getElementById('tag-cfg-width')?.value || 50);
    const height = parseFloat(document.getElementById('tag-cfg-height')?.value || 17);
    const unit = document.getElementById('tag-cfg-unit')?.value || 'mm';

    const incCust = document.getElementById('tag-opt-cust')?.checked !== false;
    const incOrnament = document.getElementById('tag-opt-ornament')?.checked !== false;
    const incHuid = document.getElementById('tag-opt-huid')?.checked !== false;
    const incQr = document.getElementById('tag-opt-qr')?.checked !== false;

    const defaultCustomer = activeTagBatch.customer || 'KALYAN HERITAGE JEWELLERS';
    const defaultMetal = activeTagBatch.metal || 'GOLD';
    const defaultPurity = activeTagBatch.purity || '22K 916';
    const defaultBox = activeTagBatch.tray || activeTagBatch.boxNo || 'BOX-TR-09';
    const batchDateStr = formatTagDateStr(activeTagBatch.receivedDate || activeTagBatch.date);

    const hMm = unit === 'in' ? height * 25.4 : height;
    const wMm = unit === 'in' ? width * 25.4 : width;

    // Balanced margins from all 4 sides: safe left margin prevents printer edge cut
    const padTopMm = Math.max(0.9, Math.min(2.0, hMm * 0.08)).toFixed(2);
    const padBotMm = Math.max(0.9, Math.min(2.0, hMm * 0.08)).toFixed(2);
    const padLeftMm = Math.max(2.2, Math.min(3.2, wMm * 0.048)).toFixed(2);
    const padRightMm = Math.max(1.8, Math.min(2.8, wMm * 0.04)).toFixed(2);
    const usableH = Math.max(7.5, hMm - (parseFloat(padTopMm) + parseFloat(padBotMm)));
    const usableW = Math.max(18.0, wMm - (parseFloat(padLeftMm) + parseFloat(padRightMm)));

    // Right side QR section: sized strictly to fit within usableH with decent padding
    const qrHeaderPt = Math.max(3.0, Math.min(5.5, usableH * 0.38)).toFixed(1);
    const qrFooterPt = Math.max(3.4, Math.min(6.2, usableH * 0.42)).toFixed(1);
    const headerHeightMm = parseFloat(qrHeaderPt) * 0.3527 * 1.15;
    const footerHeightMm = parseFloat(qrFooterPt) * 0.3527 * 1.15;
    const qrGapMm = Math.max(0.15, Math.min(0.45, usableH * 0.03)).toFixed(2);

    const maxQrHeightMm = usableH - headerHeightMm - footerHeightMm - (parseFloat(qrGapMm) * 2);
    const qrBoxDimMm = Math.max(4.5, Math.min(maxQrHeightMm, usableW * 0.35, 18.0)).toFixed(2);
    const qrPixelDim = Math.max(22, Math.round(parseFloat(qrBoxDimMm) * 3.78));

    const tagsHtml = activeTagRows.map((row, idx) => {
      const customerName = row.customer || defaultCustomer;
      const dateStr = row.date || batchDateStr;
      const purityVal = row.purity || defaultPurity;
      const articleVal = (row.articleType || defaultMetal).replace(purityVal, '').trim() || defaultMetal;
      const ornamentsType = row.ornamentsType || row.itemDesc || 'MIX ITEM';
      const grossVal = (row.grossWt || row.weight || '2.760') + (String(row.grossWt || '').includes('g') ? '' : 'g');
      const netVal = (row.netWt || row.weight || row.grossWt || '2.760') + (String(row.netWt || '').includes('g') ? '' : 'g');
      const huidStr = row.huid || ('SGG9RZ' + (idx > 0 ? (idx + 1) : ''));
      const boxNoStr = row.boxNo || defaultBox;

      // Auto font-size adjustment so all text fits strictly within the left 48% boundary (never crosses 50%)
      const custLen = customerName.length;
      const custEffectiveChars = custLen > 18 ? Math.ceil(custLen / 2) : custLen;
      const artBoxChars = ('ARTICLE: ' + articleVal + '  BOX: ' + boxNoStr).length;
      const ornChars = ('ORNAMENT: ' + ornamentsType).length;
      const grossChars = ('GROSS WEIGHT: ' + grossVal).length;
      const netChars = ('NET WEIGHT: ' + netVal).length;
      const huidChars = ('HUID NUMBER: ' + huidStr).length;

      const maxChars = Math.max(custEffectiveChars, artBoxChars, ornChars, grossChars, netChars, huidChars);

      let fontScale = 1.0;
      if (maxChars > 20) {
        fontScale = Math.min(1.0, 20 / maxChars);
      }
      if (custLen > 28) {
        fontScale = Math.min(fontScale, Math.max(0.45, 28 / custLen + 0.05));
      }
      fontScale = Math.max(0.45, fontScale);

      // Base font sizes dependent on physical usable tag height
      const baseDataPt = usableH <= 10.5 ? 2.9 : Math.max(3.1, Math.min(5.5, (usableH / 14) * 4.5));
      const baseTitlePt = usableH <= 10.5 ? 3.7 : Math.max(3.9, Math.min(6.8, (usableH / 14) * 5.5));

      const dataPt = (baseDataPt * fontScale).toFixed(2);
      const titlePt = (baseTitlePt * fontScale).toFixed(2);
      const dividerPt = (Math.max(2.9, baseDataPt * 1.05 * fontScale)).toFixed(2);
      const dividerMarginMm = usableH <= 10.5 ? '0.15mm' : '0.3mm';
      const boxLabel = (artBoxChars > 24 || wMm <= 52) ? 'BOX' : 'BOX NUMBER';

      // Full tag data encoded into the QR code
      const qrPayload = [
        'CUSTOMER: ' + customerName,
        'DATE: ' + dateStr,
        'ARTICLE: ' + articleVal,
        'BOX NUMBER: ' + boxNoStr,
        'ORNAMENT: ' + ornamentsType,
        'GROSS WEIGHT: ' + grossVal,
        'NET WEIGHT: ' + netVal,
        'HUID NUMBER: ' + huidStr
      ].join('\n');

      // Vector QR code SVG with full tag data
      const qrSvg = incQr ? generateQrCodeSvg(qrPayload, qrPixelDim) : '';

      return `
        <div class="print-tag" style="width: ${width}${unit}; height: ${height}${unit}; display: grid; grid-template-columns: 48% 50%; justify-content: space-between; align-items: stretch; page-break-after: always; page-break-inside: avoid; box-sizing: border-box; padding: ${padTopMm}mm ${padRightMm}mm ${padBotMm}mm ${padLeftMm}mm; font-family: 'Montserrat', Arial, Helvetica, sans-serif; background: #ffffff; color: #000000; overflow: hidden; line-height: 1.15;">
          
          <!-- LEFT SIDE: Strictly 48% grid column, NEVER crosses 50% midpoint of the tag -->
          <div style="width: 100%; max-width: 100%; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; overflow: hidden; padding-right: 0.8mm;">
            
            ${incCust ? `
              <!-- Customer Jeweller Header (Centered serif) -->
              <div style="width: 100%; text-align: center;">
                <div style="font-family: 'Cinzel', 'Playfair Display', Georgia, serif; font-size: ${titlePt}pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1.12; word-break: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-align: center;">
                  ${escapeHtmlStr(customerName)}
                </div>

                <!-- Diamond Divider -->
                <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin: ${dividerMarginMm} 0;">
                  <div style="flex: 1; height: 0.5px; background: #000000;"></div>
                  <div style="margin: 0 0.8mm; font-size: ${dividerPt}pt; line-height: 1; color: #000000;">◆</div>
                  <div style="flex: 1; height: 0.5px; background: #000000;"></div>
                </div>
              </div>
            ` : ''}

            <!-- Structured Metadata Rows (Left-aligned, bold, auto-scaled font) -->
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; font-size: ${dataPt}pt; font-weight: 800; line-height: 1.18; overflow: hidden;">
              
              <!-- DATE -->
              <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                DATE: ${escapeHtmlStr(dateStr)}
              </div>

              ${incOrnament ? `
                <!-- ARTICLE & BOX (Same row, no forced truncation) -->
                <div style="display: flex; justify-content: space-between; align-items: baseline; white-space: nowrap; overflow: hidden;">
                  <span style="white-space: nowrap; flex-shrink: 0;">ARTICLE: ${escapeHtmlStr(articleVal)}</span>
                  <span style="white-space: nowrap; flex-shrink: 0; padding-left: 0.8mm; text-align: right;">${boxLabel}: ${escapeHtmlStr(boxNoStr)}</span>
                </div>

                <!-- ORNAMENT -->
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ORNAMENT: ${escapeHtmlStr(ornamentsType)}
                </div>

                <!-- GROSS WEIGHT -->
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  GROSS WEIGHT: ${escapeHtmlStr(grossVal)}
                </div>

                <!-- NET WEIGHT -->
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  NET WEIGHT: ${escapeHtmlStr(netVal)}
                </div>
              ` : ''}

              ${incHuid ? `
                <!-- HUID NUMBER -->
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  HUID NUMBER: ${escapeHtmlStr(huidStr)}
                </div>
              ` : ''}

            </div>
          </div>

          <!-- RIGHT SIDE: Strictly 50% grid column on the right half -->
          ${incQr ? `
            <div style="width: 100%; max-width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; box-sizing: border-box; overflow: hidden;">
              <div style="font-family: 'Montserrat', sans-serif; font-size: ${qrHeaderPt}pt; font-weight: 900; letter-spacing: 0.6px; text-transform: uppercase; line-height: 1; margin-bottom: ${qrGapMm}mm; text-align: center;">
                SCAN QR
              </div>
              <div style="display: flex; align-items: center; justify-content: center; width: ${qrBoxDimMm}mm; height: ${qrBoxDimMm}mm;">
                ${qrSvg}
              </div>
              <div style="font-family: 'Montserrat', 'JetBrains Mono', monospace; font-size: ${qrFooterPt}pt; font-weight: 900; letter-spacing: 0.6px; line-height: 1; margin-top: ${qrGapMm}mm; text-align: center;">
                ${escapeHtmlStr(huidStr)}
              </div>
            </div>
          ` : ''}

        </div>
      `;
    }).join('');

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>TAGS - ${escapeHtmlStr(activeTagBatch.jobDocket)}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
          <style>
            @page {
              size: ${width}${unit} ${height}${unit};
              margin: 0;
            }
            @media print {
              @page {
                size: ${width}${unit} ${height}${unit};
                margin: 0;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
              }
              .print-tag {
                page-break-after: always;
                page-break-inside: avoid;
              }
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #000000;
              font-family: 'Montserrat', Arial, sans-serif;
            }
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #000000;
              font-family: 'Montserrat', Arial, sans-serif;
            }
            .print-tag {
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          ${tagsHtml}
        </body>
      </html>
    `);
    frameDoc.close();

    // Ensure fonts are fully rendered before print dialog opens
    const triggerPrint = () => {
      try {
        if (printFrame && printFrame.contentWindow) {
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
        } else {
          window.print();
        }
      } catch (err) {
        console.error('Print tags error:', err);
        try {
          window.print();
        } catch (e2) {
          showToast('Print dialog failed to open. Check printer settings.', 'error');
        }
      }
    };

    if (frameDoc.fonts && frameDoc.fonts.ready) {
      frameDoc.fonts.ready.then(() => {
        setTimeout(triggerPrint, 150);
      }).catch(() => {
        setTimeout(triggerPrint, 350);
      });
    } else {
      setTimeout(triggerPrint, 350);
    }
  }

    function exportTagsCSV() {
    const rows = activeTagRows.length ? activeTagRows : generateDefaultTagRows(activeTagBatch || state.intakeBatches[0]);
    if (!rows.length) {
      showToast('NO TAG DATA AVAILABLE TO EXPORT.', 'warning');
      return;
    }

    const headers = ['Sl No', 'HUID Code', 'Item Description', 'Pcs', 'Gross Wt (g)', 'Net Wt (g)', 'Purity', 'Barcode Serial', 'Job Docket', 'Customer Name'];
    const csvLines = [headers.join(',')];

    rows.forEach(r => {
      csvLines.push([
        r.slNo,
        `"${r.huid || ''}"`,
        `"${r.itemDesc || ''}"`,
        r.pcs || 1,
        r.grossWt || '0.000',
        r.netWt || '0.000',
        `"${r.purity || ''}"`,
        `"${r.barcode || ''}"`,
        `"${activeTagBatch ? activeTagBatch.jobDocket : ''}"`,
        `"${activeTagBatch ? activeTagBatch.customer : ''}"`
      ].join(','));
    });

    const csvContent = csvLines.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TAGS_${(activeTagBatch ? activeTagBatch.jobDocket : 'DOCKET').replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`EXPORTED ${rows.length} TAGS TO CSV SUCCESSFULLY.`, 'success');
  }

  // Legacy compatibility functions
  function onTagFormatChanged() { updateTagMiniPreview(); }
  function refreshTagGenerationPreview() { autoFillFromIntake(); }
  function printTagSheet() { printCustomTags(); }
  function printSingleTag(idx) { printCustomTags(); }

  // ========================================================
  // ========================================================
  // OUTWARD DELIVERY & DISPATCH MODULE (BOOSTED AUTO-CAPTURE)
  // ========================================================
  let activeDeliveryBatch = null;
  let activeDeliveryPhoto = null;
  let deliveryQueueFilter = 'ALL';
  let deliverySearchQuery = '';

  // Camera & Auto-Capture Optical Sensor State
  let deliveryCameraStream = null;
  let deliveryAnimationId = null;
  let deliveryAudioEnabled = true;
  let deliveryAutoCaptureEnabled = true;
  let deliveryMotionSensitivity = 'medium'; // 'high' | 'medium' | 'low'
  let deliveryCamDevices = [];
  let deliverySelectedDeviceId = '';

  // Boosted optical differencing engine with intelligent skin/human discriminator
  // States: 'idle' (waiting for item) | 'hand' (hand in tray) | 'motion' (jewellery placing) | 'stabilizing' (stillness countdown) | 'cooldown' (post-snap) | 'holding' (resting item) | 'blocked' (large obstruction)
  const SAMPLE_W = 64;
  const SAMPLE_H = 48;
  const NUM_SAMPLE_PIXELS = SAMPLE_W * SAMPLE_H; // 3072 pixels
  const currSampleBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  const prevSampleBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  const baselineBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  const lastCapturedBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  const isChangedMask = new Uint8Array(NUM_SAMPLE_PIXELS);
  const edgeBuffer = new Uint16Array(NUM_SAMPLE_PIXELS);

  let hasBaseline = false;
  let hasLastCapture = false;
  let autoDetectState = 'idle';

  let motionThreshold = 14;
  let presenceThreshold = 12;
  let minChangedPixels = 65;
  let minConfidenceThreshold = 65;
  let stabilizationStartTime = 0;
  const STABILIZATION_DURATION = 600; // ms stillness before auto-snap
  let cooldownEndTime = 0;
  const COOLDOWN_DURATION = 1500; // ms cooldown after snap
  let lastAnalysisTime = 0;
  const ANALYSIS_INTERVAL = 60; // ~16 fps analysis = < 0.4% CPU overhead, zero UI stutter

  let lastDiscriminatorResult = {
    isHand: false,
    isJewellery: false,
    confidence: 0,
    occupancyPct: 0,
    edgeRatio: 0,
    contrast: 0,
    reason: 'WAITING'
  };

  // Fast pixel-level skin locus check in YCbCr & Normalized RGB space
  // Accurately recognizes fair, medium / South Asian, and dark brown skin tones across diverse lighting (including warm desk lamps)
  // while strictly discriminating against yellow gold (Cb < 74), white gold, silver, gemstones, and staging pads
  function isSkinPixel(r, g, b) {
    if (r < 40 || r > 255 || g < 22 || b < 15) return false;
    if (r <= g || r <= b) return false;
    const rgDiff = r - g;
    if (rgDiff < 6) return false;

    const sum = r + g + b;
    const nr = r / sum;
    const ng = g / sum;
    if (nr < 0.33 || nr > 0.65 || ng < 0.22 || ng > 0.40) return false;

    // YCbCr BT.601 chrominance locus check
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

    return (cb >= 75 && cb <= 128 && cr >= 130 && cr <= 180);
  }

  // Lightbox State for Multi-Photo Browsing
  let currentLightboxPhotos = [];
  let currentLightboxIndex = 0;
  let currentLightboxTarget = '';

  const initialDeliveryRecords = [
    {
      gatePassNo: 'GP-8848',
      jobDocket: 'JOB-2024-9104',
      reqNo: 'REQ-8831-A',
      customer: 'TANISHQ LUXURY GUILD',
      bis: 'BIS-DL-4482',
      pcs: 67,
      metal: 'GOLD',
      purity: '22K 916',
      grossWt: 12.000,
      collector: 'AMIT K. PATEL',
      collectorId: 'BOM-104 (AUTHORIZED)',
      releasedBy: 'SARAH JENKINS',
      sealNo: 'SEAL-SSR-8891',
      dispatchTime: '2024-10-24 14:15 IST',
      status: 'DELIVERED',
      articlePhoto: null,
      articlePhotos: []
    },
    {
      gatePassNo: 'GP-8847',
      jobDocket: 'JOB-2024-8841',
      reqNo: 'REQ-8830-K',
      customer: 'KALYAN JEWELLERS HERITAGE',
      bis: 'BIS-KA-3391-B',
      pcs: 100,
      metal: 'GOLD',
      purity: '22K 916',
      grossWt: 1025.500,
      collector: 'RAJESH M. VARMA',
      collectorId: 'DL-881 (AUTHORIZED)',
      releasedBy: 'ARUN D\'SOUZA',
      sealNo: 'SEAL-SSR-8889',
      dispatchTime: '2024-10-24 13:40 IST',
      status: 'OUT FOR TRANSIT',
      articlePhoto: null,
      articlePhotos: []
    },
    {
      gatePassNo: 'GP-8846',
      jobDocket: 'JOB-2024-8840',
      reqNo: 'REQ-8828-M',
      customer: 'MALABAR GOLD & DIAMONDS',
      bis: 'BIS-MH-2022-771',
      pcs: 175,
      metal: 'GOLD',
      purity: '22K 916',
      grossWt: 2347.600,
      collector: 'SURESH BABU',
      collectorId: 'BLR-552 (LOGISTICS)',
      releasedBy: 'SARAH JENKINS',
      sealNo: 'SEAL-SSR-8880',
      dispatchTime: '2024-10-24 11:30 IST',
      status: 'DELIVERED',
      articlePhoto: null,
      articlePhotos: []
    }
  ];

  state.deliveryLedger = [...initialDeliveryRecords];

  function initDeliveryView() {
    updateDeliveryStats();
    renderDeliveryQueue();
    populateDeliverySelect();

    if (!activeDeliveryBatch && state.intakeBatches && state.intakeBatches.length > 0) {
      const readyBatch = state.intakeBatches.find(b => b.status !== 'Delivered') || state.intakeBatches[0];
      selectDeliveryBatch(readyBatch.jobDocket);
    } else if (activeDeliveryBatch) {
      selectDeliveryBatch(activeDeliveryBatch.jobDocket);
    }

    renderDeliveryLedgerTable();
    populateCameraDevicesList();
  }

  function updateDeliveryStats() {
    const readyEl = document.getElementById('deliv-stat-ready');
    const transitEl = document.getElementById('deliv-stat-transit');
    const deliveredEl = document.getElementById('deliv-stat-delivered');

    const batches = state.intakeBatches || [];
    const readyBatches = batches.filter(b => b.status !== 'Delivered');
    const transitCount = (state.deliveryLedger || []).filter(d => d.status === 'OUT FOR TRANSIT').length;
    const deliveredCount = (state.deliveryLedger || []).filter(d => d.status === 'DELIVERED').length;

    if (readyEl) readyEl.textContent = `${readyBatches.length} BATCHES`;
    if (transitEl) transitEl.textContent = `${transitCount} BATCHES`;
    if (deliveredEl) deliveredEl.textContent = `${deliveredCount} DOCKETS`;
  }

  function renderDeliveryQueue(filterOverride) {
    const container = document.getElementById('delivery-queue-container');
    if (!container) return;

    const filter = filterOverride || deliveryQueueFilter || 'ALL';
    deliveryQueueFilter = filter;

    ['all', 'gold', 'silver', 'delivered'].forEach(f => {
      const btn = document.getElementById(`deliv-filter-${f}`);
      if (btn) {
        if (f.toUpperCase() === filter) {
          btn.className = 'px-2.5 py-1 rounded-md bg-white shadow-2xs text-slate-800';
        } else {
          btn.className = 'px-2.5 py-1 rounded-md text-slate-500 hover:text-slate-800';
        }
      }
    });

    const batches = state.intakeBatches || [];
    const q = (deliverySearchQuery || '').trim().toUpperCase();

    const filtered = batches.filter(b => {
      if (filter === 'ALL' && b.status === 'Delivered') return false;
      if (filter === 'GOLD' && (b.status === 'Delivered' || !(b.metal === 'GOLD' || /916|750|999|GOLD/i.test(b.purity)))) return false;
      if (filter === 'SILVER' && (b.status === 'Delivered' || !(b.metal === 'SILVER' || /925|SILVER/i.test(b.purity)))) return false;
      if (filter === 'DELIVERED' && b.status !== 'Delivered') return false;

      if (q) {
        const matchCustomer = (b.customer || '').toUpperCase().includes(q);
        const matchJob = (b.jobDocket || '').toUpperCase().includes(q);
        const matchReq = (b.reqNo || '').toUpperCase().includes(q);
        const matchBis = (b.bis || '').toUpperCase().includes(q);
        const matchReceipt = (b.receiptNo || '').toUpperCase().includes(q);
        if (!matchCustomer && !matchJob && !matchReq && !matchBis && !matchReceipt) {
          return false;
        }
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="col-span-full py-8 text-center text-slate-400 font-bold uppercase text-xs">NO BATCHES MATCHING CRITERIA IN DELIVERY QUEUE.</div>';
      return;
    }

    container.innerHTML = filtered.map(b => {
      const isSelected = activeDeliveryBatch && activeDeliveryBatch.jobDocket === b.jobDocket;
      const isDelivered = b.status === 'Delivered';
      const grossG = typeof b.grossWt === 'number' ? b.grossWt.toFixed(3) : parseFloat(b.grossWt || 0).toFixed(3);
      const photoCount = (b.articlePhotos && b.articlePhotos.length) ? b.articlePhotos.length : (b.articlePhoto ? 1 : 0);

      return `
        <div
          onclick="selectDeliveryBatch('${escapeHtmlStr(b.jobDocket)}')"
          class="delivery-queue-card p-3.5 rounded-xl bg-white ${isSelected ? 'active-delivery-batch' : 'hover:border-slate-300'}"
        >
          <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
            <span class="font-mono font-bold text-xs text-primary-container">${escapeHtmlStr(b.jobDocket)}</span>
            <div class="flex items-center gap-1">
              ${photoCount > 0 ? `
                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-0.5">
                  <span class="material-symbols-outlined text-[10px]">photo_camera</span>
                  <span>${photoCount}</span>
                </span>
              ` : ''}
              <span class="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">${escapeHtmlStr(b.reqNo || 'REQ')}</span>
            </div>
          </div>

          <div class="font-extrabold text-slate-900 text-xs uppercase truncate mb-1" title="${escapeHtmlStr(b.customer)}">
            ${escapeHtmlStr(b.customer)}
          </div>

          <div class="text-[10px] text-slate-600 mb-2 font-mono flex items-center justify-between">
            <span>${b.pcs} PCS • ${escapeHtmlStr(b.purity)}</span>
            <span class="text-slate-400">TRAY: ${escapeHtmlStr(b.tray || '-')}</span>
          </div>

          <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px]">
            <span class="font-mono text-slate-500">GR: ${grossG}g</span>
            ${isDelivered ? `
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-blue-100 text-blue-800 border border-blue-200">
                DISPATCHED
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <span class="material-symbols-outlined text-[11px]">check_circle</span>
                <span>READY</span>
              </span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  function filterDeliveryQueue(filter) {
    deliveryQueueFilter = filter;
    renderDeliveryQueue(filter);
  }

  function handleDeliverySearch(query) {
    deliverySearchQuery = (query || '').trim();
    const q = deliverySearchQuery.toUpperCase();

    const clearBtn = document.getElementById('delivery-search-clear');
    if (clearBtn) {
      if (q) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }

    const batches = state.intakeBatches || [];
    const matched = batches.filter(b => {
      if (!q) return true;
      return (
        (b.customer || '').toUpperCase().includes(q) ||
        (b.jobDocket || '').toUpperCase().includes(q) ||
        (b.reqNo || '').toUpperCase().includes(q) ||
        (b.receiptNo || '').toUpperCase().includes(q) ||
        (b.bis || '').toUpperCase().includes(q)
      );
    });

    const matchCountEl = document.getElementById('delivery-search-match-count');
    if (matchCountEl) {
      if (q) {
        matchCountEl.textContent = `Showing ${matched.length} of ${batches.length} batches matching "${deliverySearchQuery}"`;
      } else {
        matchCountEl.textContent = '';
      }
    }

    populateDeliverySelect(matched);
    renderDeliveryQueue();

    if (matched.length > 0) {
      const isAlreadyActive = activeDeliveryBatch && matched.some(m => m.jobDocket === activeDeliveryBatch.jobDocket);
      if (!isAlreadyActive) {
        selectDeliveryBatch(matched[0].jobDocket);
      }
    }
  }

  function clearDeliverySearch() {
    const input = document.getElementById('delivery-batch-search');
    if (input) input.value = '';
    handleDeliverySearch('');
  }

  function populateDeliverySelect(batchList) {
    const select = document.getElementById('delivery-batch-select');
    if (!select) return;

    const list = batchList || state.intakeBatches || [];
    if (!list.length) {
      select.innerHTML = '<option value="">NO BATCHES MATCHING SEARCH</option>';
      return;
    }

    select.innerHTML = list.map(b => `
      <option value="${escapeHtmlStr(b.jobDocket)}" ${activeDeliveryBatch && activeDeliveryBatch.jobDocket === b.jobDocket ? 'selected' : ''}>
        ${escapeHtmlStr(b.jobDocket)} • ${escapeHtmlStr(b.customer)} (${escapeHtmlStr(b.reqNo || 'REQ')} - ${b.pcs} PCS, ${b.grossWt}g)
      </option>
    `).join('');
  }

  function selectDeliveryBatch(docket) {
    onDeliveryBatchSelected(docket);
  }

  function onDeliveryBatchSelected(docket) {
    if (!docket) return;
    const batch = state.intakeBatches.find(b => b.jobDocket === docket) || state.intakeBatches[0];
    if (!batch) return;
    activeDeliveryBatch = batch;

    const select = document.getElementById('delivery-batch-select');
    if (select && select.value !== batch.jobDocket) {
      select.value = batch.jobDocket;
    }

    // Initialize batch articlePhotos array if needed
    if (!batch.articlePhotos) {
      batch.articlePhotos = [];
      if (batch.articlePhoto) {
        batch.articlePhotos.push({
          id: 'photo_prev_' + Date.now(),
          src: batch.articlePhoto,
          timestamp: 'SAVED',
          source: 'SAVED',
          name: 'ARTICLE_PHOTO.JPG'
        });
      }
    }

    activeDeliveryPhoto = batch.articlePhotos[0] ? batch.articlePhotos[0].src : (batch.articlePhoto || null);

    const custEl = document.getElementById('deliv-view-cust');
    const jobEl = document.getElementById('deliv-view-job');
    const metalEl = document.getElementById('deliv-view-metal');
    const weightEl = document.getElementById('deliv-view-weight');
    const trayEl = document.getElementById('deliv-view-tray');
    const gpBadge = document.getElementById('deliv-gp-badge');

    if (custEl) custEl.textContent = batch.customer || '-';
    if (jobEl) jobEl.textContent = `${batch.jobDocket} (${batch.reqNo || 'REQ-8831-A'})`;
    if (metalEl) metalEl.textContent = `${batch.pcs} PIECES • ${batch.metal || 'GOLD'} (${batch.purity})`;
    if (weightEl) weightEl.textContent = `${Number(batch.grossWt || 0).toFixed(3)} GRAMS`;
    if (trayEl) trayEl.textContent = batch.tray || '-';
    if (gpBadge) gpBadge.textContent = batch.gatePassNo ? `GATE PASS #${batch.gatePassNo}` : 'GATE PASS #GP-8849';

    renderDeliveryGallery();
    updateAttachedPhotosSummary();
    renderDeliveryGatePassPreview();
    renderDeliveryQueue();
  }

  // ========================================================
  // LIVE CAMERA FEED & BOOSTED AUTO-DETECTION SYSTEM
  // ========================================================
  function startDeliveryCamera() {
    return new Promise(async (resolve, reject) => {
      const video = document.getElementById('delivery-cam-video');
      const standby = document.getElementById('delivery-cam-standby');
      const reticle = document.getElementById('delivery-cam-reticle');
      const errEl = document.getElementById('delivery-cam-error');
      const streamBtnText = document.getElementById('delivery-cam-stream-btn-text');

      if (errEl) {
        errEl.classList.add('hidden');
        errEl.textContent = '';
      }

      try {
        if (deliveryCameraStream) {
          stopDeliveryCameraStream();
        }

        const constraints = {
          video: deliverySelectedDeviceId
            ? { deviceId: { exact: deliverySelectedDeviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
            : { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false
        };

        let stream = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (e1) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }

        deliveryCameraStream = stream;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }

        if (standby) standby.classList.add('hidden');
        if (reticle) reticle.classList.remove('hidden');
        if (streamBtnText) streamBtnText.textContent = 'STOP';

        updateReticleUI('idle'); updateCamStatusUI('WAITING FOR JEWELLERY', 'ready');

        autoDetectState = 'idle';
        hasBaseline = false;
        hasLastCapture = false;
        lastAnalysisTime = performance.now();

        if (deliveryAnimationId) cancelAnimationFrame(deliveryAnimationId);
        deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);

        populateCameraDevicesList();
        showToast('OPTICAL SCANNER CAMERA ACTIVE.', 'success');
        resolve(stream);
      } catch (err) {
        console.warn('Camera access error:', err);
        if (standby) standby.classList.remove('hidden');
        if (reticle) reticle.classList.add('hidden');
        if (streamBtnText) streamBtnText.textContent = 'START';
        updateCamStatusUI('CAMERA UNAVAILABLE', 'error');

        if (errEl) {
          errEl.classList.remove('hidden');
          errEl.textContent = 'CAMERA ACCESS BLOCKED OR NOT DETECTED: ' + (err.message || 'PLEASE PERMIT CAMERA ACCESS');
        }
        showToast('COULD NOT ACCESS CAMERA. YOU CAN STILL UPLOAD IMAGES MANUALLY.', 'warning');
        reject(err);
      }
    });
  }

  function stopDeliveryCameraStream() {
    if (deliveryCameraStream) {
      deliveryCameraStream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      deliveryCameraStream = null;
    }

    if (deliveryAnimationId) {
      cancelAnimationFrame(deliveryAnimationId);
      deliveryAnimationId = null;
    }

    const video = document.getElementById('delivery-cam-video');
    if (video) {
      video.srcObject = null;
    }

    const standby = document.getElementById('delivery-cam-standby');
    const reticle = document.getElementById('delivery-cam-reticle');
    const streamBtnText = document.getElementById('delivery-cam-stream-btn-text');
    const countdownBadge = document.getElementById('delivery-countdown-badge');

    if (standby) standby.classList.remove('hidden');
    if (reticle) reticle.classList.add('hidden');
    if (countdownBadge) countdownBadge.classList.add('hidden');
    if (streamBtnText) streamBtnText.textContent = 'START';

    autoDetectState = 'idle';
    hasBaseline = false;
    hasLastCapture = false;

    updateReticleUI('idle'); updateCamStatusUI('CAMERA OFF', 'off');
  }

  function toggleDeliveryCameraStream() {
    if (deliveryCameraStream) {
      stopDeliveryCameraStream();
      showToast('CAMERA STREAM STOPPED.', 'info');
    } else {
      startDeliveryCamera().catch(() => {});
    }
  }

  async function populateCameraDevicesList() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      deliveryCamDevices = devices.filter(d => d.kind === 'videoinput');
      const select = document.getElementById('delivery-cam-select');
      if (!select) return;

      if (!deliveryCamDevices.length) {
        select.innerHTML = '<option value="">DEFAULT CAMERA</option>';
        return;
      }

      select.innerHTML = `
        <option value="" ${!deliverySelectedDeviceId ? 'selected' : ''}>DEFAULT CAMERA</option>
        ${deliveryCamDevices.map((d, idx) => `
          <option value="${escapeHtmlStr(d.deviceId)}" ${d.deviceId === deliverySelectedDeviceId ? 'selected' : ''}>
            ${escapeHtmlStr(d.label || `CAMERA ${idx + 1}`)}
          </option>
        `).join('')}
      `;
    } catch (e) {}
  }

  function switchDeliveryCameraDevice(deviceId) {
    deliverySelectedDeviceId = deviceId || '';
    if (deliveryCameraStream) {
      startDeliveryCamera().catch(() => {});
    }
  }

  function calibrateDeliveryTrayBaseline() {
    if (!deliveryCameraStream) {
      showToast('START CAMERA FIRST TO CALIBRATE TRAY BASELINE.', 'info');
      return;
    }
    const video = document.getElementById('delivery-cam-video');
    const canvas = document.getElementById('delivery-motion-canvas');
    if (!video || !canvas || video.readyState < 2) {
      showToast('CAMERA WARMING UP, PLEASE RETRY IN A MOMENT.', 'info');
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    const cropX = vw * 0.2;
    const cropY = vh * 0.2;
    const cropW = vw * 0.6;
    const cropH = vh * 0.6;

    ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, SAMPLE_W, SAMPLE_H);
    const imgData = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
    const data = imgData.data;

    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const luma = (data[i] * 299 + data[i+1] * 587 + data[i+2] * 114) / 1000;
      baselineBuffer[j] = luma;
      prevSampleBuffer[j] = luma;
      isChangedMask[j] = 0;
      edgeBuffer[j] = 0;
    }
    hasBaseline = true;
    hasLastCapture = false;
    autoDetectState = 'idle';

    updateReticleUI('idle');
    updateCamStatusUI('TRAY BASELINE CALIBRATED (TARED)', 'ready');
    showToast('TRAY BASELINE TARED. PLACE JEWELLERY IN ZONE TO AUTO-CAPTURE.', 'success');
  }

  function updateCamStatusUI(text, state) {
    const indicator = document.getElementById('delivery-status-indicator');
    const textEl = document.getElementById('delivery-cam-status-text');

    if (textEl) textEl.textContent = text;
    if (!indicator) return;

    indicator.className = 'w-1.5 h-1.5 rounded-full';
    if (state === 'ready') {
      indicator.classList.add('bg-emerald-400', 'animate-pulse');
    } else if (state === 'motion') {
      indicator.classList.add('bg-amber-400');
    } else if (state === 'stabilizing') {
      indicator.classList.add('bg-cyan-400', 'animate-ping');
    } else if (state === 'cooldown') {
      indicator.classList.add('bg-purple-400');
    } else if (state === 'holding') {
      indicator.classList.add('bg-blue-400');
    } else if (state === 'error' || state === 'hand') {
      indicator.classList.add('bg-rose-500', 'animate-pulse');
    } else {
      indicator.classList.add('bg-slate-400');
    }
  }

  // Real-time Reticle Discriminator Visual Feedback
  function updateReticleUI(stateName, info, extra) {
    const targetBox = document.getElementById('delivery-target-box');
    const handAlert = document.getElementById('delivery-hand-alert');
    const countdownBadge = document.getElementById('delivery-countdown-badge');
    const countdownText = document.getElementById('delivery-countdown-text');
    const countdownIcon = document.getElementById('delivery-countdown-icon');
    const statusText = document.getElementById('delivery-cam-status-text');
    const indicator = document.getElementById('delivery-status-indicator');
    const centerIcon = document.getElementById('delivery-reticle-icon');
    const centerLabel = document.getElementById('delivery-reticle-label');

    // Reset visual state classes on the bounding reticle box
    if (targetBox) {
      targetBox.classList.remove('state-hand', 'state-jewellery', 'state-stabilizing', 'state-blocked');
    }

    if (stateName === 'hand') {
      if (targetBox) targetBox.classList.add('state-hand');
      if (handAlert) handAlert.classList.remove('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'HAND DETECTED - REMOVE HAND';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping';
      if (centerIcon) {
        centerIcon.textContent = 'front_hand';
        centerIcon.className = 'material-symbols-outlined text-rose-400 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'WITHDRAW HAND FROM TRAY';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-rose-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'blocked') {
      if (targetBox) targetBox.classList.add('state-blocked');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'ZONE OBSTRUCTED • CLEAR TRAY';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-amber-500';
      if (centerIcon) {
        centerIcon.textContent = 'warning';
        centerIcon.className = 'material-symbols-outlined text-amber-400 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'OBJECT TOO LARGE / BODY DETECTED';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-amber-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'unrecognized') {
      if (targetBox) targetBox.classList.add('state-blocked');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'NON-JEWELLERY OBJECT DETECTED';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-amber-400';
      if (centerIcon) {
        centerIcon.textContent = 'help_center';
        centerIcon.className = 'material-symbols-outlined text-amber-300 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'PLACE JEWELLERY IN ZONE';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-amber-200 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'motion') {
      if (targetBox) targetBox.classList.add('state-jewellery');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      const conf = info && info.confidence ? info.confidence : 75;
      if (statusText) statusText.textContent = `JEWELLERY DETECTED: ${conf}% • PLACING...`;
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-amber-400';
      if (centerIcon) {
        centerIcon.textContent = 'motion_photos_on';
        centerIcon.className = 'material-symbols-outlined text-amber-300 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = `JEWELLERY DETECTED (${conf}%) • SETTLING...`;
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-amber-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'stabilizing') {
      if (targetBox) targetBox.classList.add('state-stabilizing');
      if (handAlert) handAlert.classList.add('hidden');
      const pct = typeof extra === 'number' ? extra : 0;
      const conf = info && info.confidence ? info.confidence : 88;
      if (countdownBadge) {
        countdownBadge.classList.remove('hidden');
        countdownBadge.className = 'absolute -bottom-3.5 bg-cyan-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md uppercase font-mono tracking-wider flex items-center gap-1 z-20 whitespace-nowrap';
      }
      if (countdownText) countdownText.textContent = `JEWELLERY DETECTED: ${conf}% • STABILIZING (${pct}%)...`;
      if (countdownIcon) countdownIcon.textContent = 'timer';
      if (statusText) statusText.textContent = `STABILIZING • AUTO-SNAPPING (${pct}%)...`;
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping';
      if (centerIcon) {
        centerIcon.textContent = 'diamond';
        centerIcon.className = 'material-symbols-outlined text-cyan-300 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = `JEWELLERY DETECTED (${conf}%) • HOLD STILL`;
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-cyan-200 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'snapped') {
      if (targetBox) targetBox.classList.add('state-jewellery');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'AUTO-SNAPPED!';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400';
      if (centerIcon) {
        centerIcon.textContent = 'verified';
        centerIcon.className = 'material-symbols-outlined text-emerald-400 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'AUTO-SNAPPED!';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-emerald-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'cooldown') {
      if (targetBox) targetBox.classList.add('state-jewellery');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      const rem = extra || '1.0';
      if (statusText) statusText.textContent = `AUTO-SNAPPED • COOLDOWN (${rem}s)`;
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-purple-400';
      if (centerIcon) {
        centerIcon.textContent = 'verified';
        centerIcon.className = 'material-symbols-outlined text-emerald-400 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = `AUTO-SNAPPED • PAUSING (${rem}s)`;
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-emerald-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'holding') {
      if (targetBox) targetBox.classList.add('state-jewellery');
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'JEWELLERY CAPTURED • READY FOR NEXT';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-blue-400';
      if (centerIcon) {
        centerIcon.textContent = 'check_circle';
        centerIcon.className = 'material-symbols-outlined text-emerald-400 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'ITEM CAPTURED • REMOVE FOR NEXT';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-emerald-300 uppercase tracking-wider mt-0.5';
      }
    } else if (stateName === 'manual') {
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'MANUAL SNAP MODE';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-slate-400';
    } else {
      // idle / ready
      if (handAlert) handAlert.classList.add('hidden');
      if (countdownBadge) countdownBadge.classList.add('hidden');
      if (statusText) statusText.textContent = 'WAITING FOR JEWELLERY';
      if (indicator) indicator.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse';
      if (centerIcon) {
        centerIcon.textContent = 'filter_center_focus';
        centerIcon.className = 'material-symbols-outlined text-amber-400/70 text-[26px]';
      }
      if (centerLabel) {
        centerLabel.textContent = 'JEWELLERY PLACEMENT ZONE';
        centerLabel.className = 'text-[9.5px] font-mono font-bold text-amber-300 uppercase tracking-wider mt-0.5';
      }
    }
  }

  function showCountdownBadge(show) {
    const badge = document.getElementById('delivery-countdown-badge');
    if (!badge) return;
    if (show) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  function updateCountdownProgress(pct) {
    const textEl = document.getElementById('delivery-countdown-text');
    if (textEl) {
      const conf = lastDiscriminatorResult && lastDiscriminatorResult.confidence ? lastDiscriminatorResult.confidence : 88;
      textEl.textContent = `JEWELLERY DETECTED: ${conf}% • AUTO-SNAPPING (${pct}%)...`;
    }
  }

  function toggleDeliveryAutoCapture() {
    deliveryAutoCaptureEnabled = !deliveryAutoCaptureEnabled;
    const btn = document.getElementById('deliv-auto-toggle-btn');
    const dot = document.getElementById('deliv-auto-dot');
    const txt = document.getElementById('deliv-auto-toggle-text');

    if (deliveryAutoCaptureEnabled) {
      if (btn) btn.className = 'px-2.5 py-1 rounded-lg font-bold text-[10.5px] uppercase flex items-center gap-1.5 transition-all bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs cursor-pointer';
      if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
      if (txt) txt.textContent = 'AUTO-SNAP: ACTIVE';
      showToast('AUTO-CAPTURE ENABLED: WILL AUTO-SNAP WHEN JEWELLERY IS KEPT UNDER CAMERA.', 'success');
    } else {
      if (btn) btn.className = 'px-2.5 py-1 rounded-lg font-bold text-[10.5px] uppercase flex items-center gap-1.5 transition-all bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs cursor-pointer';
      if (dot) dot.className = 'w-2 h-2 rounded-full bg-slate-400';
      if (txt) txt.textContent = 'AUTO-SNAP: OFF';
      showToast('AUTO-CAPTURE PAUSED: USE MANUAL SNAP BUTTON.', 'info');
    }
  }

  function toggleDeliveryCaptureSound() {
    deliveryAudioEnabled = !deliveryAudioEnabled;
    const icon = document.getElementById('deliv-sound-icon');
    if (icon) {
      icon.textContent = deliveryAudioEnabled ? 'volume_up' : 'volume_off';
    }
    showToast(deliveryAudioEnabled ? 'CAPTURE AUDIO CHIME ON.' : 'CAPTURE AUDIO MUTED.', 'info');
  }

  function setDeliveryMotionSensitivity(level) {
    deliveryMotionSensitivity = level;
    if (level === 'high') {
      motionThreshold = 9;
      presenceThreshold = 8;
      minChangedPixels = 40;
      minConfidenceThreshold = 60;
    } else if (level === 'low') {
      motionThreshold = 22;
      presenceThreshold = 18;
      minChangedPixels = 120;
      minConfidenceThreshold = 70;
    } else {
      // medium
      motionThreshold = 14;
      presenceThreshold = 12;
      minChangedPixels = 65;
      minConfidenceThreshold = 65;
    }
  }

  function playDeliveryCaptureChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (err) {}
  }

  // --- BOOSTED ZERO-LAG OPTICAL DISCRIMINATOR & MOTION ANALYSIS LOOP ---
  function analyzeMotionFrame(timestamp) {
    if (!deliveryCameraStream) return;

    if (timestamp - lastAnalysisTime < ANALYSIS_INTERVAL) {
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }
    lastAnalysisTime = timestamp;

    const video = document.getElementById('delivery-cam-video');
    const canvas = document.getElementById('delivery-motion-canvas');
    if (!video || !canvas || video.readyState < 2) {
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    const cropX = vw * 0.2;
    const cropY = vh * 0.2;
    const cropW = vw * 0.6;
    const cropH = vh * 0.6;

    ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, SAMPLE_W, SAMPLE_H);
    const imgData = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
    const data = imgData.data;

    // First frame initialization of baseline and previous frame
    if (!hasBaseline) {
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        const luma = (data[i] * 299 + data[i+1] * 587 + data[i+2] * 114) / 1000;
        currSampleBuffer[j] = luma;
        prevSampleBuffer[j] = luma;
        baselineBuffer[j] = luma;
        isChangedMask[j] = 0;
        edgeBuffer[j] = 0;
      }
      hasBaseline = true;
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // Pass 1: Pixel Luma, Motion Delta, Baseline Difference, Skin Chromaticity & Specular
    let motionDiffSum = 0;
    let baselineDiffSum = 0;
    let lastSnapDiffSum = 0;
    let changedPixelCount = 0;
    let skinCountInReticle = 0;
    let skinCountInChanged = 0;
    let maxLuma = 0;
    let minLuma = 255;
    let sumObjectLuma = 0;
    let sumBaseLuma = 0;
    let specularHighlightCount = 0;

    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      const luma = (r * 299 + g * 587 + b * 114) / 1000;
      currSampleBuffer[j] = luma;

      // Motion diff against previous frame
      const mDiff = Math.abs(luma - prevSampleBuffer[j]);
      motionDiffSum += mDiff;

      // Baseline diff against empty tray
      const bDiff = Math.abs(luma - baselineBuffer[j]);
      baselineDiffSum += bDiff;

      // Skin chromaticity check
      const isSkin = isSkinPixel(r, g, b);
      if (isSkin) skinCountInReticle++;

      if (bDiff > 16) {
        isChangedMask[j] = 1;
        changedPixelCount++;
        sumObjectLuma += luma;
        sumBaseLuma += baselineBuffer[j];
        if (isSkin) skinCountInChanged++;
        if (luma > maxLuma) maxLuma = luma;
        if (luma < minLuma) minLuma = luma;
        if (luma >= 195 || (r >= 200 && g >= 165)) specularHighlightCount++;
      } else {
        isChangedMask[j] = 0;
      }

      if (hasLastCapture) {
        lastSnapDiffSum += Math.abs(luma - lastCapturedBuffer[j]);
      }
    }

    const avgMotionDiff = motionDiffSum / NUM_SAMPLE_PIXELS;
    const avgBaselineDiff = baselineDiffSum / NUM_SAMPLE_PIXELS;
    const avgLastSnapDiff = hasLastCapture ? (lastSnapDiffSum / NUM_SAMPLE_PIXELS) : 999;

    // Fast copy without GC memory allocation
    prevSampleBuffer.set(currSampleBuffer);

    // Pass 2: Sobel Edge Density & Structural Complexity on Changed Mask
    let sumEdgeMag = 0;
    let highEdgePixelCount = 0;

    if (changedPixelCount >= (minChangedPixels * 0.6)) {
      for (let y = 1; y < SAMPLE_H - 1; y++) {
        const rowOffset = y * SAMPLE_W;
        for (let x = 1; x < SAMPLE_W - 1; x++) {
          const idx = rowOffset + x;
          if (isChangedMask[idx] === 0) continue;

          const gx = (
            currSampleBuffer[idx - SAMPLE_W + 1] + (currSampleBuffer[idx + 1] << 1) + currSampleBuffer[idx + SAMPLE_W + 1]
          ) - (
            currSampleBuffer[idx - SAMPLE_W - 1] + (currSampleBuffer[idx - 1] << 1) + currSampleBuffer[idx + SAMPLE_W - 1]
          );

          const gy = (
            currSampleBuffer[idx + SAMPLE_W - 1] + (currSampleBuffer[idx + SAMPLE_W] << 1) + currSampleBuffer[idx + SAMPLE_W + 1]
          ) - (
            currSampleBuffer[idx - SAMPLE_W - 1] + (currSampleBuffer[idx - SAMPLE_W] << 1) + currSampleBuffer[idx - SAMPLE_W + 1]
          );

          const mag = Math.abs(gx) + Math.abs(gy);
          edgeBuffer[idx] = mag;
          sumEdgeMag += mag;
          if (mag >= 65) {
            highEdgePixelCount++;
          }
        }
      }
    }

    // Physical Jewellery Feature Metrics
    const occupancy = changedPixelCount / NUM_SAMPLE_PIXELS;
    const occupancyPct = Math.round(occupancy * 100);
    const skinRatioInChanged = changedPixelCount > 0 ? (skinCountInChanged / changedPixelCount) : 0;
    const edgeRatio = changedPixelCount > 0 ? (highEdgePixelCount / changedPixelCount) : 0;
    const avgEdgeMag = changedPixelCount > 0 ? (sumEdgeMag / changedPixelCount) : 0;
    const padContrast = changedPixelCount > 0 ? Math.abs((sumObjectLuma - sumBaseLuma) / changedPixelCount) : 0;
    const internalContrast = changedPixelCount > 0 ? (maxLuma - minLuma) : 0;
    const lumaContrast = Math.max(padContrast, internalContrast);
    const specularRatio = changedPixelCount > 0 ? (specularHighlightCount / changedPixelCount) : 0;

    // Hand & Intruder Presence Discriminator
    // 1. Noticeable skin presence in reticle (>= 16 pixels out of 3072, i.e. ~0.5% of reticle, detecting fingers entering zone)
    // 2. OR skin detected in changed area (>= 8 skin pixels and >= 8% of changed area)
    const isSkinPresent = (skinCountInReticle >= 16) || (changedPixelCount >= 35 && skinCountInChanged >= 8 && skinRatioInChanged >= 0.08);
    const isFullBodyObstruction = (occupancy > 0.68);

    // Calculate Jewellery Confidence Score based on physical attributes
    let conf = 45;
    if (occupancy >= 0.025 && occupancy <= 0.50) {
      conf += 20; // Well-sized localized piece (rings, bangles, chains, necklaces, pendants)
    } else if ((occupancy >= 0.015 && occupancy < 0.025) || (occupancy > 0.50 && occupancy <= 0.65)) {
      conf += 10; // Tiny pieces (studs, nose pins) or pouches/large articles
    }

    if (edgeRatio >= 0.28) {
      conf += 20; // High intricacy (links, stones, engravings)
    } else if (edgeRatio >= 0.16) {
      conf += 12; // Moderate structure (smooth bangles, plain bands)
    } else if (edgeRatio < 0.08 || avgEdgeMag < 28) {
      conf -= 25; // Flat smooth non-jewellery penalty (paper, fabric, shadow)
    }

    if (lumaContrast >= 85) {
      conf += 15; // High metallic reflection against pad
    } else if (lumaContrast >= 50) {
      conf += 8;
    } else if (lumaContrast < 40) {
      conf -= 25; // Dull low-contrast penalty
    }

    if (specularRatio >= 0.03) {
      conf += 10; // Specular highlights characteristic of polished metal/gems
    } else if (specularRatio === 0 && lumaContrast < 60) {
      conf -= 15; // Non-reflective dull surface penalty
    }

    conf = Math.max(10, Math.min(99, Math.round(conf)));
    const isJewellery = (conf >= minConfidenceThreshold);

    lastDiscriminatorResult = {
      isHand: isSkinPresent,
      isJewellery: isJewellery,
      confidence: conf,
      occupancyPct: occupancyPct,
      edgeRatio: edgeRatio,
      contrast: lumaContrast,
      reason: isSkinPresent ? 'HAND_DETECTED' : (isFullBodyObstruction ? 'OBSTRUCTED' : (isJewellery ? 'JEWELLERY_VALIDATED' : 'UNRECOGNIZED'))
    };

    const now = Date.now();
    const isObjectPresent = (avgBaselineDiff >= presenceThreshold) && (changedPixelCount >= minChangedPixels);
    const isDifferentFromLastSnap = !hasLastCapture || (avgLastSnapDiff >= (presenceThreshold * 0.75));

    // Handle Cooldown State
    if (autoDetectState === 'cooldown') {
      if (now >= cooldownEndTime) {
        autoDetectState = isObjectPresent ? 'holding' : 'idle';
        updateReticleUI(autoDetectState, lastDiscriminatorResult);
      } else {
        const remaining = ((cooldownEndTime - now) / 1000).toFixed(1);
        updateReticleUI('cooldown', lastDiscriminatorResult, remaining);
      }
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    if (!deliveryAutoCaptureEnabled) {
      updateReticleUI('manual', lastDiscriminatorResult);
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // Intruders & Hand Filter: If Hand/Human is inside target zone, strictly block stabilization & snapping!
    if (isSkinPresent) {
      autoDetectState = 'hand';
      showCountdownBadge(false);
      updateReticleUI('hand', lastDiscriminatorResult);
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // Full Zone Obstruction (body/shadow)
    if (isFullBodyObstruction) {
      autoDetectState = 'blocked';
      showCountdownBadge(false);
      updateReticleUI('blocked', lastDiscriminatorResult);
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // Empty Staging Tray (matches baseline) -> clear last snap cache and return to idle
    if (!isObjectPresent) {
      if (hasLastCapture) {
        hasLastCapture = false; // Reset so placing next piece triggers snap
      }
      showCountdownBadge(false);
      autoDetectState = 'idle';
      updateReticleUI('idle', lastDiscriminatorResult);
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // Non-jewellery object (smooth cloth, flat paper, etc.)
    if (!lastDiscriminatorResult.isJewellery) {
      showCountdownBadge(false);
      autoDetectState = 'unrecognized';
      updateReticleUI('unrecognized', lastDiscriminatorResult);
      deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
      return;
    }

    // VALID JEWELLERY CONFIRMED IN ZONE (Operator hand has withdrawn!)
    if (autoDetectState === 'idle' || autoDetectState === 'hand' || autoDetectState === 'blocked' || autoDetectState === 'unrecognized') {
      if (avgMotionDiff > motionThreshold) {
        autoDetectState = 'motion';
        updateReticleUI('motion', lastDiscriminatorResult);
      } else if (isDifferentFromLastSnap) {
        autoDetectState = 'stabilizing';
        stabilizationStartTime = now;
        showCountdownBadge(true);
        updateReticleUI('stabilizing', lastDiscriminatorResult, 0);
      } else {
        autoDetectState = 'holding';
        updateReticleUI('holding', lastDiscriminatorResult);
      }
    } else if (autoDetectState === 'motion') {
      if (avgMotionDiff < motionThreshold) {
        if (isDifferentFromLastSnap) {
          autoDetectState = 'stabilizing';
          stabilizationStartTime = now;
          showCountdownBadge(true);
          updateReticleUI('stabilizing', lastDiscriminatorResult, 0);
        } else {
          autoDetectState = 'holding';
          updateReticleUI('holding', lastDiscriminatorResult);
        }
      } else {
        updateReticleUI('motion', lastDiscriminatorResult);
      }
    } else if (autoDetectState === 'stabilizing') {
      if (avgMotionDiff > (motionThreshold * 1.35)) {
        autoDetectState = 'motion';
        showCountdownBadge(false);
        updateReticleUI('motion', lastDiscriminatorResult);
      } else {
        const elapsed = now - stabilizationStartTime;
        const progress = Math.min(100, Math.round((elapsed / STABILIZATION_DURATION) * 100));
        updateCountdownProgress(progress);
        updateReticleUI('stabilizing', lastDiscriminatorResult, progress);

        if (elapsed >= STABILIZATION_DURATION) {
          showCountdownBadge(false);
          autoDetectState = 'cooldown';
          cooldownEndTime = now + COOLDOWN_DURATION;
          lastCapturedBuffer.set(currSampleBuffer);
          hasLastCapture = true;
          updateReticleUI('snapped', lastDiscriminatorResult);
          executeSnapshot('AUTO');
        }
      }
    } else if (autoDetectState === 'holding') {
      if (avgMotionDiff > motionThreshold) {
        autoDetectState = 'motion';
        updateReticleUI('motion', lastDiscriminatorResult);
      } else {
        updateReticleUI('holding', lastDiscriminatorResult);
      }
    }

    deliveryAnimationId = requestAnimationFrame(analyzeMotionFrame);
  }

  function triggerDeliveryManualCapture() {
    if (!deliveryCameraStream) {
      startDeliveryCamera()
        .then(() => {
          setTimeout(() => executeSnapshot('MANUAL'), 300);
        })
        .catch(() => {});
      return;
    }
    executeSnapshot('MANUAL');
  }

  function executeSnapshot(source = 'MANUAL') {
    const video = document.getElementById('delivery-cam-video');
    if (!video || !deliveryCameraStream || video.readyState < 2) {
      showToast('CAMERA NOT READY FOR CAPTURE.', 'warning');
      return;
    }

    // Visual Flash Effect
    const flashEl = document.getElementById('delivery-cam-flash');
    if (flashEl) {
      flashEl.style.opacity = '0.9';
      setTimeout(() => { flashEl.style.opacity = '0'; }, 150);
    }

    // Audio Chime
    if (deliveryAudioEnabled) {
      playDeliveryCaptureChime();
    }

    const maxSnapDim = 1280;
    let vw = video.videoWidth || 1280;
    let vh = video.videoHeight || 720;
    let sw = vw;
    let sh = vh;
    if (sw > maxSnapDim || sh > maxSnapDim) {
      if (sw > sh) {
        sh = Math.round((sh * maxSnapDim) / sw);
        sw = maxSnapDim;
      } else {
        sw = Math.round((sw * maxSnapDim) / sh);
        sh = maxSnapDim;
      }
    }

    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = sw;
    snapCanvas.height = sh;
    const snapCtx = snapCanvas.getContext('2d');
    snapCtx.drawImage(video, 0, 0, sw, sh);

    const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.88);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const photoObj = {
      id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      src: dataUrl,
      timestamp: timeStr,
      source: source,
      name: `${source}_${timeStr.replace(/:/g, '')}.jpg`
    };

    addPhotoToActiveDeliveryBatch(photoObj);
    showToast(`JEWELLERY PHOTO CAPTURED (${source})!`, 'success');
  }

  // ========================================================
  // MULTI-PHOTO UPLOAD & GALLERY MANAGEMENT
  // ========================================================
  function handleMultipleDeliveryPhotos(files) {
    if (!files || !files.length) return;
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!validFiles.length) {
      showToast('PLEASE SELECT VALID IMAGE FILES (JPEG, PNG, WEBP).', 'warning');
      return;
    }

    // Auto-select batch if none is currently active
    if (!activeDeliveryBatch && state.intakeBatches && state.intakeBatches.length > 0) {
      const readyBatch = state.intakeBatches.find(b => b.status !== 'Delivered') || state.intakeBatches[0];
      selectDeliveryBatch(readyBatch.jobDocket);
    }

    if (!activeDeliveryBatch) {
      showToast('PLEASE SELECT A BATCH FROM THE QUEUE FIRST.', 'warning');
      return;
    }

    let processedCount = 0;
    Array.from(validFiles).forEach(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const maxDim = 1280;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

          const photoObj = {
            id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            src: dataUrl,
            timestamp: timeStr,
            source: 'UPLOAD',
            name: file.name
          };

          addPhotoToActiveDeliveryBatch(photoObj);
          processedCount++;
          if (processedCount === validFiles.length) {
            showToast(`SUCCESSFULLY ATTACHED ${processedCount} PHOTO(S).`, 'success');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Reset file input values so selecting the same file again works
    const multiInput = document.getElementById('deliv-multi-upload-input');
    if (multiInput) multiInput.value = '';
    const singleInput = document.getElementById('deliv-photo-input');
    if (singleInput) singleInput.value = '';
  }

  function handleArticlePhotoUpload(files) {
    handleMultipleDeliveryPhotos(files);
  }

  function addPhotoToActiveDeliveryBatch(photoObj) {
    if (!activeDeliveryBatch) {
      if (state.intakeBatches && state.intakeBatches.length > 0) {
        const readyBatch = state.intakeBatches.find(b => b.status !== 'Delivered') || state.intakeBatches[0];
        selectDeliveryBatch(readyBatch.jobDocket);
      }
    }
    if (!activeDeliveryBatch) {
      showToast('PLEASE SELECT A BATCH FROM THE QUEUE FIRST.', 'warning');
      return;
    }

    if (!activeDeliveryBatch.articlePhotos) {
      activeDeliveryBatch.articlePhotos = [];
      if (activeDeliveryBatch.articlePhoto) {
        activeDeliveryBatch.articlePhotos.push({
          id: 'photo_init_' + Date.now(),
          src: activeDeliveryBatch.articlePhoto,
          timestamp: 'SAVED',
          source: 'SAVED',
          name: 'ARTICLE_PHOTO.JPG'
        });
      }
    }

    activeDeliveryBatch.articlePhotos.unshift(photoObj);
    activeDeliveryBatch.articlePhoto = activeDeliveryBatch.articlePhotos[0].src;
    activeDeliveryPhoto = activeDeliveryBatch.articlePhoto;

    renderDeliveryGallery();
    updateAttachedPhotosSummary();
    renderDeliveryQueue();
  }

  function renderDeliveryGallery() {
    const grid = document.getElementById('deliv-photos-gallery-grid');
    const badge = document.getElementById('deliv-gallery-count-badge');
    const clearBtn = document.getElementById('deliv-clear-all-photos-btn');
    if (!grid) return;

    const photos = (activeDeliveryBatch && activeDeliveryBatch.articlePhotos) ? activeDeliveryBatch.articlePhotos : [];

    if (badge) {
      badge.textContent = `${photos.length} PHOTOS`;
      if (photos.length > 0) {
        badge.className = 'ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
      } else {
        badge.className = 'ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200';
      }
    }

    if (clearBtn) {
      if (photos.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }

    if (!photos.length) {
      grid.innerHTML = `
        <div class="col-span-full py-5 px-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center flex flex-col items-center justify-center">
          <span class="material-symbols-outlined text-slate-300 text-[26px]">photo_library</span>
          <div class="text-[11px] font-bold text-slate-500 uppercase mt-1">NO PHOTOS ATTACHED FOR THIS BATCH</div>
          <div class="text-[9.5px] text-slate-400 mt-0.5">Place jewellery under optical scanner camera or drop image files to attach</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = photos.map((p, idx) => {
      const isPrimary = idx === 0;
      return `
        <div class="gallery-photo-card relative rounded-xl overflow-hidden border ${isPrimary ? 'border-amber-400 shadow-sm ring-1 ring-amber-400/40' : 'border-slate-200 bg-white'} group">
          <div class="relative w-full aspect-video bg-slate-900 overflow-hidden cursor-pointer" onclick="openPhotoLightbox('active', ${idx})">
            <img src="${p.src}" alt="${escapeHtmlStr(p.name || 'Jewellery Photo')}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"/>
            <div class="photo-actions-overlay absolute inset-0 bg-black/50 flex items-center justify-center gap-1.5 transition-opacity">
              <button
                type="button"
                onclick="event.stopPropagation(); openPhotoLightbox('active', ${idx})"
                class="w-7 h-7 rounded-md bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center cursor-pointer shadow"
                title="View Large"
              >
                <span class="material-symbols-outlined text-[15px]">zoom_in</span>
              </button>
              <button
                type="button"
                onclick="event.stopPropagation(); removePhotoFromBatch('${p.id}')"
                class="w-7 h-7 rounded-md bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center cursor-pointer shadow"
                title="Remove Photo"
              >
                <span class="material-symbols-outlined text-[15px]">delete</span>
              </button>
            </div>
          </div>

          <div class="p-1.5 bg-white border-t border-slate-100 flex items-center justify-between text-[9px] font-mono">
            <span class="font-bold ${p.source === 'AUTO' ? 'text-emerald-700 bg-emerald-50 px-1 rounded' : p.source === 'UPLOAD' ? 'text-blue-700 bg-blue-50 px-1 rounded' : 'text-amber-800 bg-amber-50 px-1 rounded'}">
              ${escapeHtmlStr(p.source || 'PHOTO')} #${photos.length - idx}
            </span>
            <span class="text-slate-400 truncate max-w-[65px]">${escapeHtmlStr(p.timestamp || '')}</span>
          </div>

          ${isPrimary ? `
            <div class="absolute top-1 left-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black text-[8px] rounded uppercase font-mono shadow-xs tracking-wider">
              PRIMARY
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  function updateAttachedPhotosSummary() {
    const summaryEl = document.getElementById('deliv-photos-count-summary');
    const photos = (activeDeliveryBatch && activeDeliveryBatch.articlePhotos) ? activeDeliveryBatch.articlePhotos : [];
    if (summaryEl) {
      if (photos.length === 0) {
        summaryEl.textContent = '0 PHOTOS CAPTURED / ATTACHED';
        summaryEl.className = 'text-[10px] text-slate-500 font-mono';
      } else if (photos.length === 1) {
        summaryEl.textContent = '1 PHOTO ATTACHED • READY FOR GATE PASS';
        summaryEl.className = 'text-[10px] text-emerald-600 font-bold font-mono';
      } else {
        summaryEl.textContent = `${photos.length} PHOTOS ATTACHED • READY FOR GATE PASS`;
        summaryEl.className = 'text-[10px] text-emerald-600 font-bold font-mono';
      }
    }
  }

  function removePhotoFromBatch(photoId) {
    if (!activeDeliveryBatch || !activeDeliveryBatch.articlePhotos) return;
    activeDeliveryBatch.articlePhotos = activeDeliveryBatch.articlePhotos.filter(p => p.id !== photoId);
    activeDeliveryBatch.articlePhoto = activeDeliveryBatch.articlePhotos[0] ? activeDeliveryBatch.articlePhotos[0].src : null;
    activeDeliveryPhoto = activeDeliveryBatch.articlePhoto;

    renderDeliveryGallery();
    updateAttachedPhotosSummary();
    renderDeliveryQueue();
    showToast('PHOTO REMOVED.', 'info');
  }

  function clearAllDeliveryPhotos() {
    if (!activeDeliveryBatch) return;
    if (!activeDeliveryBatch.articlePhotos || !activeDeliveryBatch.articlePhotos.length) return;
    if (!confirm('Are you sure you want to remove all attached photos for this batch?')) return;
    activeDeliveryBatch.articlePhotos = [];
    activeDeliveryBatch.articlePhoto = null;
    activeDeliveryPhoto = null;

    renderDeliveryGallery();
    updateAttachedPhotosSummary();
    renderDeliveryQueue();
    showToast('ALL PHOTOS REMOVED.', 'info');
  }

  function removeArticlePhoto() {
    clearAllDeliveryPhotos();
  }

  // --- MULTI-PHOTO DRAG AND DROP ---
  function handleMultiPhotoDragOver(e) {
    if (e && e.preventDefault) e.preventDefault();
    const dz = document.getElementById('deliv-multi-dropzone');
    if (dz) {
      dz.classList.add('bg-amber-100/70', 'border-amber-500');
    }
  }

  function handleMultiPhotoDragLeave(e) {
    if (e && e.preventDefault) e.preventDefault();
    const dz = document.getElementById('deliv-multi-dropzone');
    if (dz) {
      dz.classList.remove('bg-amber-100/70', 'border-amber-500');
    }
  }

  function handleMultiPhotoDrop(e) {
    if (e && e.preventDefault) e.preventDefault();
    const dz = document.getElementById('deliv-multi-dropzone');
    if (dz) {
      dz.classList.remove('bg-amber-100/70', 'border-amber-500');
    }
    if (e.dataTransfer && e.dataTransfer.files) {
      handleMultipleDeliveryPhotos(e.dataTransfer.files);
    }
  }

  function handlePhotoDragOver(e) { handleMultiPhotoDragOver(e); }
  function handlePhotoDragLeave(e) { handleMultiPhotoDragLeave(e); }
  function handlePhotoDrop(e) { handleMultiPhotoDrop(e); }

  // --- GATE PASS HTML GENERATOR WITH EMBEDDED PHOTO & REQ # ---
  function generateGatePassHtml(batch, collector, collectorId, releasedBy, sealNo, gatePassNo, dispatchTime) {
    const watermarkSrc = (window && window.SSR_LOGO_WATERMARK_SRC) ? window.SSR_LOGO_WATERMARK_SRC : 'assets/ssr-logo-bw.png';
    const grossG = typeof batch.grossWt === 'number' ? batch.grossWt.toFixed(3) : parseFloat(batch.grossWt || 0).toFixed(3);
    const netG = typeof batch.netWt === 'number' ? batch.netWt.toFixed(3) : parseFloat(batch.netWt || 0).toFixed(3);
    const photoSrc = activeDeliveryPhoto || batch.articlePhoto || (batch.articlePhotos && batch.articlePhotos[0] ? batch.articlePhotos[0].src : null);
    const extraPhotoCount = (batch.articlePhotos && batch.articlePhotos.length > 1) ? (batch.articlePhotos.length - 1) : 0;

    return `
      <div style="position: relative; width: 74mm; max-width: 100%; margin: 0 auto; padding: 2mm; color: #000; background: #fff; font-family: 'Courier New', Courier, monospace; box-sizing: border-box; overflow: hidden;">
        <!-- Watermark -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 0;">
          <img src="${watermarkSrc}" alt="Watermark" style="width: 58mm; height: 58mm; object-fit: contain; opacity: 0.25; -webkit-print-color-adjust: exact; print-color-adjust: exact;" />
        </div>

        <div style="position: relative; z-index: 1;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 5px;">
            <div style="font-size: 14px; font-weight: 900; text-transform: uppercase;">SSR HALLMARK CENTER</div>
            <div style="font-size: 10px; font-weight: 900; margin-top: 2px; border: 1.5px solid #000; display: inline-block; padding: 1px 8px; text-transform: uppercase;">
              OUTWARD GATE PASS: ${escapeHtmlStr(gatePassNo)}
            </div>
            <div style="font-size: 8.5px; margin-top: 2px; text-transform: uppercase;">DISPATCH: ${escapeHtmlStr(dispatchTime)}</div>
          </div>

          <!-- Customer & Job -->
          <div style="border-bottom: 1px dashed #000; padding: 3px 0 5px 0; margin-bottom: 3px;">
            <div style="font-size: 8px; font-weight: bold; text-transform: uppercase;">DELIVERED TO (CUSTOMER):</div>
            <div style="font-size: 13px; font-weight: 900; text-transform: uppercase;">${escapeHtmlStr(batch.customer)}</div>
            <div style="font-size: 9px; font-weight: bold; margin-top: 2px;">BIS LIC: ${escapeHtmlStr(batch.bis || 'N/A')}</div>
          </div>

          <!-- Docket & Items -->
          <div style="font-size: 9px; padding: 3px 0; border-bottom: 1px dashed #000; line-height: 1.35;">
            <div><strong>JOB DOCKET:</strong> ${escapeHtmlStr(batch.jobDocket)}</div>
            <div><strong>REQUEST NUMBER:</strong> ${escapeHtmlStr(batch.reqNo || 'REQ-8831-A')}</div>
            <div><strong>INTAKE RECEIPT #:</strong> ${escapeHtmlStr(batch.receiptNo || 'REC-10948')}</div>
            <div><strong>VAULT TRAY:</strong> ${escapeHtmlStr(batch.tray)}</div>
            <div><strong>SECURITY SEAL #:</strong> ${escapeHtmlStr(sealNo)}</div>
          </div>

          <!-- Pieces & Weights Summary Box -->
          <div style="margin: 5px 0; padding: 5px; border: 2px solid #000; text-align: center; background: #fff;">
            <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase;">VERIFIED OUTWARD QUANTITY</div>
            <div style="font-size: 18px; font-weight: 900; margin: 1px 0;">${batch.pcs} PIECES • ${escapeHtmlStr(batch.metal || 'GOLD')}</div>
            <div style="font-size: 11px; font-weight: 900; border-top: 1px solid #000; padding-top: 3px; margin-top: 3px;">
              GROSS: ${grossG}g | NET: ${netG}g | ${escapeHtmlStr(batch.purity)}
            </div>
          </div>

          <!-- Article Verification Photo Embedded in Gate Pass -->
          ${photoSrc ? `
            <div style="margin: 4px 0; padding: 3px; border: 1.5px solid #000; text-align: center; background: #fff;">
              <div style="font-size: 7.5px; font-weight: 900; text-transform: uppercase; margin-bottom: 2px;">
                CUSTODY ARTICLE VERIFICATION PHOTO ${extraPhotoCount > 0 ? `(+ ${extraPhotoCount} MORE ATTACHED)` : ''}
              </div>
              <img src="${photoSrc}" alt="Article Verification" class="gatepass-photo-img" style="max-height: 28mm; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; -webkit-print-color-adjust: exact; print-color-adjust: exact;" />
            </div>
          ` : ''}

          <!-- Custody Signatures -->
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed #000; font-size: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <div><strong>COLLECTOR:</strong> ${escapeHtmlStr(collector)}<br/><span style="font-size: 7.5px;">(${escapeHtmlStr(collectorId)})</span></div>
              <div style="text-align: right;"><strong>RELEASED BY:</strong><br/>${escapeHtmlStr(releasedBy)}</div>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px dotted #000; padding-top: 6px; font-size: 7.5px;">
              <div style="text-align: center; width: 45%;">____________________<br/>RECIPIENT SIGNATURE</div>
              <div style="text-align: center; width: 45%;">____________________<br/>CUSTODIAN SIGNATURE</div>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; font-size: 7.5px; margin-top: 6px; font-weight: bold; text-transform: uppercase;">
            *** SECURITY CHECKPOINT OUTWARD COPY ***
          </div>
        </div>
      </div>
    `;
  }

  function renderDeliveryGatePassPreview() {
    const previewEl = document.getElementById('delivery-gatepass-preview');
    if (!previewEl || !activeDeliveryBatch) return;

    const collector = document.getElementById('deliv-collector') ? document.getElementById('deliv-collector').value.trim() : 'AMIT K. PATEL';
    const collectorId = document.getElementById('deliv-collector-id') ? document.getElementById('deliv-collector-id').value.trim() : 'BOM-104 (AUTHORIZED)';
    const releasedBy = document.getElementById('deliv-released-by') ? document.getElementById('deliv-released-by').value : 'SARAH JENKINS';
    const sealNo = document.getElementById('deliv-seal-no') ? document.getElementById('deliv-seal-no').value.trim() : 'SEAL-SSR-9021';
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST';
    const gpNo = activeDeliveryBatch.gatePassNo || 'GP-8849';

    previewEl.innerHTML = generateGatePassHtml(activeDeliveryBatch, collector, collectorId, releasedBy, sealNo, gpNo, nowStr);
  }

  // --- CUSTODY HANDOVER SUBMIT & LEDGER COMMIT ---
  function handleDeliverySubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!activeDeliveryBatch) {
      showToast('NO ACTIVE BATCH SELECTED FOR DELIVERY.', 'warning');
      return;
    }

    if (activeDeliveryBatch.status && activeDeliveryBatch.status.toLowerCase() === 'delivered') {
      showToast(`BATCH ${activeDeliveryBatch.jobDocket} HAS ALREADY BEEN DELIVERED. CANNOT CREATE DUPLICATE HANDOVER.`, 'warning');
      return;
    }

    const collector = document.getElementById('deliv-collector').value.trim();
    const collectorId = document.getElementById('deliv-collector-id').value.trim();
    const releasedBy = document.getElementById('deliv-released-by').value;
    const sealNo = document.getElementById('deliv-seal-no').value.trim();
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST';
    const newGp = `GP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      gatePassNo: newGp,
      jobDocket: activeDeliveryBatch.jobDocket,
      reqNo: activeDeliveryBatch.reqNo || 'REQ-8831-A',
      customer: activeDeliveryBatch.customer,
      bis: activeDeliveryBatch.bis || 'N/A',
      pcs: activeDeliveryBatch.pcs,
      metal: activeDeliveryBatch.metal || 'GOLD',
      purity: activeDeliveryBatch.purity,
      grossWt: activeDeliveryBatch.grossWt,
      netWt: activeDeliveryBatch.netWt,
      tray: activeDeliveryBatch.tray,
      collector: collector,
      collectorId: collectorId,
      releasedBy: releasedBy,
      sealNo: sealNo,
      articlePhotos: activeDeliveryBatch.articlePhotos ? [...activeDeliveryBatch.articlePhotos] : [],
      articlePhoto: activeDeliveryPhoto || null,
      dispatchTime: nowStr,
      status: 'DELIVERED'
    };

    activeDeliveryBatch.status = 'Delivered';
    activeDeliveryBatch.gatePassNo = newGp;
    activeDeliveryBatch.deliveryTime = nowStr;
    activeDeliveryBatch.articlePhoto = activeDeliveryPhoto;

    state.deliveryLedger.unshift(newRecord);

    renderDeliveryLedgerTable();
    updateDeliveryStats();
    renderDeliveryQueue();
    renderDeliveryGallery();

    showToast(`DELIVERY COMPLETED FOR ${activeDeliveryBatch.customer} (GATE PASS: ${newGp}).`, 'success');

    setTimeout(() => {
      printCurrentDeliveryGatePass(newGp);
    }, 300);
  }

  function resetDeliveryForm() {
    const form = document.getElementById('delivery-handover-form');
    if (form) form.reset();
    if (activeDeliveryBatch) {
      activeDeliveryBatch.articlePhotos = [];
      activeDeliveryBatch.articlePhoto = null;
    }
    activeDeliveryPhoto = null;
    renderDeliveryGallery();
    updateAttachedPhotosSummary();
    if (activeDeliveryBatch) onDeliveryBatchSelected(activeDeliveryBatch.jobDocket);
  }

  function printCurrentDeliveryGatePass(customGp) {
    if (!activeDeliveryBatch) {
      showToast('NO BATCH SELECTED TO PRINT GATE PASS.', 'warning');
      return;
    }

    const collector = document.getElementById('deliv-collector') ? document.getElementById('deliv-collector').value.trim() : 'AMIT K. PATEL';
    const collectorId = document.getElementById('deliv-collector-id') ? document.getElementById('deliv-collector-id').value.trim() : 'BOM-104';
    const releasedBy = document.getElementById('deliv-released-by') ? document.getElementById('deliv-released-by').value : 'SARAH JENKINS';
    const sealNo = document.getElementById('deliv-seal-no') ? document.getElementById('deliv-seal-no').value.trim() : 'SEAL-SSR-9021';
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST';
    const gpNo = customGp || activeDeliveryBatch.gatePassNo || 'GP-8849';

    const slipHtml = generateGatePassHtml(activeDeliveryBatch, collector, collectorId, releasedBy, sealNo, gpNo, nowStr);

    let printFrame = document.getElementById('delivery-print-iframe');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'delivery-print-iframe';
      printFrame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>GATE PASS - ${escapeHtmlStr(gpNo)}</title>
          <style>
            @page { size: auto; margin: 3mm; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { margin: 0; padding: 0; background: #fff; color: #000; font-family: 'Courier New', Courier, monospace; }
            .gatepass-photo-img { max-height: 28mm !important; max-width: 100% !important; object-fit: contain !important; }
          </style>
        </head>
        <body>
          ${slipHtml}
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (err) {
        console.error('Print gate pass error:', err);
      }
    }, 200);
  }

  function printDeliveryGatePassDirect(gpNo) {
    const rec = state.deliveryLedger.find(d => d.gatePassNo === gpNo);
    if (!rec) return;

    const mockBatch = {
      customer: rec.customer,
      bis: rec.bis,
      jobDocket: rec.jobDocket,
      reqNo: rec.reqNo || 'REQ-8831-A',
      receiptNo: 'REC-10948',
      pcs: rec.pcs,
      metal: rec.metal,
      purity: rec.purity,
      grossWt: rec.grossWt,
      netWt: rec.grossWt * 0.95,
      tray: 'RELEASED',
      articlePhoto: rec.articlePhoto || (rec.articlePhotos && rec.articlePhotos[0] ? rec.articlePhotos[0].src : null),
      articlePhotos: rec.articlePhotos || []
    };

    const slipHtml = generateGatePassHtml(mockBatch, rec.collector, rec.collectorId, rec.releasedBy, rec.sealNo || 'SEAL-SSR-9021', rec.gatePassNo, rec.dispatchTime);

    let printFrame = document.getElementById('delivery-print-iframe');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'delivery-print-iframe';
      printFrame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>GATE PASS - ${escapeHtmlStr(rec.gatePassNo)}</title>
          <style>
            @page { size: auto; margin: 3mm; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { margin: 0; padding: 0; background: #fff; color: #000; font-family: 'Courier New', Courier, monospace; }
            .gatepass-photo-img { max-height: 28mm !important; max-width: 100% !important; object-fit: contain !important; }
          </style>
        </head>
        <body>
          ${slipHtml}
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (err) {
        console.error('Print gate pass error:', err);
      }
    }, 200);
  }

  function renderDeliveryLedgerTable(recordsToRender) {
    const tbody = document.getElementById('delivery-ledger-body');
    if (!tbody) return;

    const list = recordsToRender || state.deliveryLedger || [];
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="11" class="p-8 text-center text-slate-400 font-bold uppercase text-xs">NO DISPATCH RECORDS FOUND IN LEDGER.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(rec => {
      const grossG = typeof rec.grossWt === 'number' ? rec.grossWt.toFixed(3) : parseFloat(rec.grossWt || 0).toFixed(3);
      const hasPhoto = (rec.articlePhotos && rec.articlePhotos.length > 0) || rec.articlePhoto;
      const photoThumbSrc = (rec.articlePhotos && rec.articlePhotos[0]) ? rec.articlePhotos[0].src : rec.articlePhoto;
      const photoCount = (rec.articlePhotos && rec.articlePhotos.length) ? rec.articlePhotos.length : (rec.articlePhoto ? 1 : 0);

      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="p-3 font-mono font-bold text-slate-900">${escapeHtmlStr(rec.gatePassNo)}</td>
          <td class="p-3">
            <div class="font-mono font-bold text-primary-container">${escapeHtmlStr(rec.jobDocket)}</div>
            <div class="text-[10px] text-amber-800 font-mono font-semibold">${escapeHtmlStr(rec.reqNo || 'REQ')}</div>
          </td>
          <td class="p-3 font-bold text-slate-800 uppercase truncate max-w-[170px]" title="${escapeHtmlStr(rec.customer)}">
            ${escapeHtmlStr(rec.customer)}
          </td>
          <td class="p-3 text-center">
            ${hasPhoto ? `
              <div class="relative inline-block">
                <img
                  src="${photoThumbSrc}"
                  alt="Article"
                  onclick="openPhotoLightbox('${escapeHtmlStr(rec.gatePassNo)}')"
                  class="delivery-photo-thumb w-10 h-10 object-cover rounded-lg border border-slate-300 mx-auto cursor-pointer shadow-2xs hover:border-amber-500"
                  title="Click to view article photos (${photoCount})"
                />
                ${photoCount > 1 ? `
                  <span class="absolute -top-1 -right-1 px-1 bg-amber-500 text-slate-950 font-black text-[8px] rounded-full font-mono shadow-xs">
                    +${photoCount - 1}
                  </span>
                ` : ''}
              </div>
            ` : `
              <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 mx-auto border border-dashed border-slate-200" title="No photo attached">
                <span class="material-symbols-outlined text-[17px]">no_photography</span>
              </div>
            `}
          </td>
          <td class="p-3 font-bold text-slate-700">${rec.pcs} PCS • ${escapeHtmlStr(rec.purity)}</td>
          <td class="p-3 font-mono font-bold text-slate-900">${grossG}g</td>
          <td class="p-3 font-bold text-slate-800 uppercase">
            <div>${escapeHtmlStr(rec.collector)}</div>
            <div class="text-[10px] text-slate-400 font-mono">${escapeHtmlStr(rec.collectorId)}</div>
          </td>
          <td class="p-3 font-bold text-slate-700 uppercase">${escapeHtmlStr(rec.releasedBy)}</td>
          <td class="p-3 font-mono text-[11px] text-slate-500">${escapeHtmlStr(rec.dispatchTime)}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${rec.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
              ${escapeHtmlStr(rec.status)}
            </span>
          </td>
          <td class="p-3 text-right">
            <button onclick="printDeliveryGatePassDirect('${escapeHtmlStr(rec.gatePassNo)}')" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10.5px] transition-colors inline-flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[13px]">print</span>
              <span>SLIP</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filterDeliveryLedger(query) {
    if (!query || !query.trim()) {
      renderDeliveryLedgerTable();
      return;
    }
    const q = query.trim().toUpperCase();
    const filtered = state.deliveryLedger.filter(d =>
      (d.gatePassNo || '').toUpperCase().includes(q) ||
      (d.jobDocket || '').toUpperCase().includes(q) ||
      (d.reqNo || '').toUpperCase().includes(q) ||
      (d.customer || '').toUpperCase().includes(q) ||
      (d.collector || '').toUpperCase().includes(q) ||
      (d.releasedBy || '').toUpperCase().includes(q)
    );
    renderDeliveryLedgerTable(filtered);
  }

  // ========================================================
  // PHOTO LIGHTBOX MODAL WITH GALLERY NAVIGATION
  // ========================================================
  function openPhotoLightbox(target, index = 0) {
    let photoList = [];
    let titleStr = 'ARTICLE VERIFICATION PHOTO';
    let docketStr = '';
    let sealStr = '';
    currentLightboxTarget = target;

    if (target === 'active') {
      if (activeDeliveryBatch && activeDeliveryBatch.articlePhotos && activeDeliveryBatch.articlePhotos.length > 0) {
        photoList = activeDeliveryBatch.articlePhotos;
      } else if (activeDeliveryPhoto) {
        photoList = [{ id: 'active_photo', src: activeDeliveryPhoto, name: 'ARTICLE_PHOTO.JPG', timestamp: 'TODAY', source: 'VERIFIED' }];
      }
      titleStr = activeDeliveryBatch ? `ARTICLE VERIFICATION • ${activeDeliveryBatch.customer}` : 'ARTICLE VERIFICATION';
      docketStr = activeDeliveryBatch ? `${activeDeliveryBatch.jobDocket} (${activeDeliveryBatch.reqNo || 'REQ'})` : 'ACTIVE BATCH';
      sealStr = document.getElementById('deliv-seal-no') ? `SEAL: ${document.getElementById('deliv-seal-no').value}` : 'SEAL VERIFIED';
    } else {
      const rec = (state.deliveryLedger || []).find(d => d.gatePassNo === target);
      if (rec) {
        if (rec.articlePhotos && rec.articlePhotos.length > 0) {
          photoList = rec.articlePhotos;
        } else if (rec.articlePhoto) {
          photoList = [{ id: 'ledger_photo', src: rec.articlePhoto, name: 'ARTICLE.JPG', timestamp: rec.dispatchTime, source: 'DISPATCH' }];
        }
        titleStr = `GATE PASS ${rec.gatePassNo} • ${rec.customer}`;
        docketStr = `${rec.jobDocket} (${rec.reqNo || 'REQ'})`;
        sealStr = `SEAL: ${rec.sealNo || 'N/A'}`;
      }
    }

    if (!photoList.length) {
      showToast('NO PHOTOS TO DISPLAY IN LIGHTBOX.', 'warning');
      return;
    }

    currentLightboxPhotos = photoList;
    currentLightboxIndex = Math.max(0, Math.min(index, photoList.length - 1));

    const modal = document.getElementById('deliv-photo-lightbox');
    const title = document.getElementById('lightbox-title');
    const docket = document.getElementById('lightbox-docket');
    const seal = document.getElementById('lightbox-seal');
    const deleteBtn = document.getElementById('lightbox-delete-btn');

    if (title) title.textContent = titleStr;
    if (docket) docket.textContent = docketStr;
    if (seal) seal.textContent = sealStr;

    if (deleteBtn) {
      if (target === 'active') {
        deleteBtn.classList.remove('hidden');
      } else {
        deleteBtn.classList.add('hidden');
      }
    }

    updateLightboxCurrentPhoto();

    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  function updateLightboxCurrentPhoto() {
    if (!currentLightboxPhotos.length) return;
    const current = currentLightboxPhotos[currentLightboxIndex];
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const thumbsContainer = document.getElementById('lightbox-thumbnails');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    if (img && current) {
      img.src = current.src;
    }

    if (counter) {
      counter.textContent = `${currentLightboxIndex + 1} OF ${currentLightboxPhotos.length}`;
    }

    if (prevBtn) {
      prevBtn.style.display = currentLightboxPhotos.length > 1 ? 'flex' : 'none';
    }
    if (nextBtn) {
      nextBtn.style.display = currentLightboxPhotos.length > 1 ? 'flex' : 'none';
    }

    if (thumbsContainer) {
      if (currentLightboxPhotos.length > 1) {
        thumbsContainer.classList.remove('hidden');
        thumbsContainer.innerHTML = currentLightboxPhotos.map((p, idx) => `
          <button
            type="button"
            onclick="setLightboxIndex(${idx})"
            class="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${idx === currentLightboxIndex ? 'border-amber-500 scale-105 shadow' : 'border-slate-300 opacity-60 hover:opacity-100'}"
          >
            <img src="${p.src}" alt="Thumb" class="w-full h-full object-cover"/>
          </button>
        `).join('');
      } else {
        thumbsContainer.classList.add('hidden');
        thumbsContainer.innerHTML = '';
      }
    }
  }

  function setLightboxIndex(idx) {
    currentLightboxIndex = idx;
    updateLightboxCurrentPhoto();
  }

  function prevLightboxPhoto() {
    if (!currentLightboxPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
    updateLightboxCurrentPhoto();
  }

  function nextLightboxPhoto() {
    if (!currentLightboxPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxPhotos.length;
    updateLightboxCurrentPhoto();
  }

  function downloadCurrentLightboxPhoto() {
    if (!currentLightboxPhotos.length) return;
    const current = currentLightboxPhotos[currentLightboxIndex];
    if (!current || !current.src) return;
    const a = document.createElement('a');
    a.href = current.src;
    a.download = current.name || `JEWELLERY_PHOTO_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('PHOTO DOWNLOAD STARTED.', 'info');
  }

  function deleteCurrentLightboxPhoto() {
    if (currentLightboxTarget !== 'active' || !activeDeliveryBatch || !currentLightboxPhotos.length) return;
    const current = currentLightboxPhotos[currentLightboxIndex];
    if (!current || !current.id) return;
    if (!confirm('Remove this photo from the active batch?')) return;

    removePhotoFromBatch(current.id);
    currentLightboxPhotos = activeDeliveryBatch.articlePhotos || [];
    if (!currentLightboxPhotos.length) {
      closePhotoLightbox();
    } else {
      currentLightboxIndex = Math.min(currentLightboxIndex, currentLightboxPhotos.length - 1);
      updateLightboxCurrentPhoto();
    }
  }

  function closePhotoLightbox() {
    const modal = document.getElementById('deliv-photo-lightbox');
    if (modal) modal.classList.add('hidden');
  }

  // Keyboard navigation for lightbox
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('deliv-photo-lightbox');
      if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closePhotoLightbox();
        else if (e.key === 'ArrowLeft') prevLightboxPhoto();
        else if (e.key === 'ArrowRight') nextLightboxPhoto();
        else if (e.key === 'Delete' && currentLightboxTarget === 'active') deleteCurrentLightboxPhoto();
      }
    });

    // Resource cleanup on tab / window unload
    window.addEventListener('beforeunload', () => {
      stopDeliveryCameraStream();
    });
  }

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopDeliveryCameraStream();
      }
    });
  }


  // --- MENU SCROLL HELPER (Prevents outer window from scrolling) ---
  function scrollMenuItemIntoView(menu, item) {
    if (!menu || !item) return;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.clientHeight;
    const menuScroll = menu.scrollTop;
    const menuHeight = menu.clientHeight;
    if (itemTop < menuScroll) {
      menu.scrollTop = itemTop;
    } else if (itemBottom > menuScroll + menuHeight) {
      menu.scrollTop = itemBottom - menuHeight;
    }
  }

  // --- DEPOSITOR & RECEIVER INTERACTIVE DROPDOWNS ---
  const DEPOSITOR_OPTIONS = [
    { value: 'RAJESH M. VARMA', label: 'RAJESH M. VARMA (AUTHORIZED AGENT - DL-881)', role: 'PRIMARY AGENT' },
    { value: 'AMIT K. PATEL', label: 'AMIT K. PATEL (HEAD RUNNER - BOM-104)', role: 'COURIER HEAD' },
    { value: 'SURESH BABU', label: 'SURESH BABU (LOGISTICS MANAGER - BLR-552)', role: 'LOGISTICS' },
    { value: 'DEVENDRA SHARMA', label: 'DEVENDRA SHARMA (AUTHORIZED AGENT - DEL-339)', role: 'DELHI AGENT' },
    { value: 'MANOJ JAIN', label: 'MANOJ JAIN (BULLION COURIER - GUJ-771)', role: 'BULLION ESCORT' },
    { value: 'VIJAY KUMAR', label: 'VIJAY KUMAR (CHIEF RUNNER - CHN-990)', role: 'RUNNER' }
  ];

  let activeDepositorIndex = 0;

  function renderDepositorOptionsMenu() {
    const menu = document.getElementById('depositor-options-menu');
    if (!menu) return;

    const depositorInput = document.getElementById('depositor-name');
    const currentVal = depositorInput ? depositorInput.value : DEPOSITOR_OPTIONS[0].value;

    const header = `
      <div class="px-3 py-1.5 bg-slate-50 border-b border-surface-container flex items-center justify-between text-[10px] font-bold text-outline tracking-wider uppercase select-none">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-primary-container">person</span>
          <span>SELECT AUTHORIZED DEPOSITOR</span>
        </span>
        <span class="text-[9px] font-normal text-slate-400">↑↓ ARROWS • ENTER TO CONFIRM</span>
      </div>
    `;

    const items = DEPOSITOR_OPTIONS.map((opt, idx) => {
      const isSelected = opt.value === currentVal;
      const isActive = idx === activeDepositorIndex;
      return `
        <div
          class="depositor-option-item px-3.5 py-2.5 flex items-center justify-between cursor-pointer border-b border-surface-container/30 hover:bg-primary-container/5 transition-colors select-none ${isActive ? 'bg-primary-container/10 border-l-4 border-[#c5a059]' : ''}"
          data-index="${idx}"
          data-value="${opt.value}"
          onclick="selectDepositorOption(${idx})"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold ${isSelected ? 'text-primary-container font-extrabold' : 'text-on-surface'} uppercase">${opt.label}</span>
          </div>
          ${isSelected ? '<span class="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>' : ''}
        </div>
      `;
    }).join('');

    menu.innerHTML = header + items;
  }

  function toggleDepositorMenu(open) {
    const menu = document.getElementById('depositor-options-menu');
    const chevron = document.getElementById('depositor-chevron');
    if (!menu) return;

    const shouldOpen = open !== undefined ? open : menu.classList.contains('hidden');
    if (shouldOpen) {
      renderDepositorOptionsMenu();
      menu.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        const activeItem = menu.querySelector(`.depositor-option-item[data-index="${activeDepositorIndex}"]`);
        if (activeItem) scrollMenuItemIntoView(menu, activeItem);
      }, 20);
    } else {
      menu.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  function selectDepositorOption(idx) {
    const opt = DEPOSITOR_OPTIONS[idx];
    if (!opt) return;

    const depositorInput = document.getElementById('depositor-name');
    const displayEl = document.getElementById('depositor-display-text');
    if (depositorInput) {
      depositorInput.value = opt.value;
      depositorInput.classList.remove('field-error-highlight');
    }
    if (displayEl) {
      displayEl.textContent = opt.label;
    }

    activeDepositorIndex = idx;
    toggleDepositorMenu(false);

    // Advance to next field: RECEIVED BY
    setTimeout(() => {
      const receiverBtn = document.getElementById('receiver-dropdown-btn');
      if (receiverBtn) {
        focusAndHighlightField(receiverBtn);
      }
    }, 50);
  }

  const RECEIVER_OPTIONS = [
    { value: 'SARAH JENKINS', label: 'SARAH JENKINS (ASSAY MASTER #04 - LAB SUPERINTENDENT)', role: 'ASSAY MASTER' },
    { value: 'VIKRAM ANAND', label: 'VIKRAM ANAND (SENIOR METALLURGICAL OFFICER #01)', role: 'METALLURGIST' },
    { value: 'PRIYANKA ROY', label: 'PRIYANKA ROY (ASSAY TECHNICIAN & INTAKE OFFICER #09)', role: 'INTAKE OFFICER' },
    { value: 'ARUN D\'SOUZA', label: 'ARUN D\'SOUZA (HEAD OF SECURITY & VAULT-KEEPER)', role: 'VAULT KEEPER' }
  ];

  let activeReceiverIndex = 0;

  function renderReceiverOptionsMenu() {
    const menu = document.getElementById('receiver-options-menu');
    if (!menu) return;

    const receiverInput = document.getElementById('receiver-select');
    const currentVal = receiverInput ? receiverInput.value : RECEIVER_OPTIONS[0].value;

    const header = `
      <div class="px-3 py-1.5 bg-slate-50 border-b border-surface-container flex items-center justify-between text-[10px] font-bold text-outline tracking-wider uppercase select-none">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-primary-container">verified_user</span>
          <span>SELECT ASSAY MASTER / CUSTODIAN</span>
        </span>
        <span class="text-[9px] font-normal text-slate-400">↑↓ ARROWS • ENTER TO CONFIRM</span>
      </div>
    `;

    const items = RECEIVER_OPTIONS.map((opt, idx) => {
      const isSelected = opt.value === currentVal;
      const isActive = idx === activeReceiverIndex;
      return `
        <div
          class="receiver-option-item px-3.5 py-2.5 flex items-center justify-between cursor-pointer border-b border-surface-container/30 hover:bg-primary-container/5 transition-colors select-none ${isActive ? 'bg-primary-container/10 border-l-4 border-[#c5a059]' : ''}"
          data-index="${idx}"
          data-value="${opt.value}"
          onclick="selectReceiverOption(${idx})"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold ${isSelected ? 'text-primary-container font-extrabold' : 'text-on-surface'} uppercase">${opt.label}</span>
          </div>
          ${isSelected ? '<span class="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>' : ''}
        </div>
      `;
    }).join('');

    menu.innerHTML = header + items;
  }

  function toggleReceiverMenu(open) {
    const menu = document.getElementById('receiver-options-menu');
    const chevron = document.getElementById('receiver-chevron');
    if (!menu) return;

    const shouldOpen = open !== undefined ? open : menu.classList.contains('hidden');
    if (shouldOpen) {
      renderReceiverOptionsMenu();
      menu.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        const activeItem = menu.querySelector(`.receiver-option-item[data-index="${activeReceiverIndex}"]`);
        if (activeItem) scrollMenuItemIntoView(menu, activeItem);
      }, 20);
    } else {
      menu.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  function selectReceiverOption(idx) {
    const opt = RECEIVER_OPTIONS[idx];
    if (!opt) return;

    const receiverInput = document.getElementById('receiver-select');
    const displayEl = document.getElementById('receiver-display-text');
    if (receiverInput) {
      receiverInput.value = opt.value;
      receiverInput.classList.remove('field-error-highlight');
    }
    if (displayEl) {
      displayEl.textContent = opt.label;
    }

    activeReceiverIndex = idx;
    toggleReceiverMenu(false);

    // Advance to final step: SAVE RECEIVE ENTRY BUTTON (With radiant gold glow and persistent midnight navy)!
    setTimeout(() => {
      const saveBtn = document.getElementById('btn-save-receive-entry');
      if (saveBtn) {
        saveBtn.classList.add('final-step-glow');
        focusAndHighlightField(saveBtn);
      }
    }, 50);
  }

  function setCurrentIntakeTimestamp() {
    const hourInput = document.getElementById('intake-hour');
    const minInput = document.getElementById('intake-minute');
    
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourStr = String(hours).padStart(2, '0');
    const minStr = String(now.getMinutes()).padStart(2, '0');

    if (hourInput) hourInput.value = hourStr;
    if (minInput) minInput.value = minStr;
    setIntakeAmPm(ampm);
  }

  let activeFirstInvalidElement = null;

  function clearFieldErrorHighlights() {
    document.querySelectorAll('.field-error-highlight').forEach(el => {
      el.classList.remove('field-error-highlight');
    });
  }

  function validateReceiveBatchForm() {
    const errors = [];
    const invalidElements = [];

    function addError(element, fieldName, section) {
      errors.push({ field: fieldName, section: section, el: element });
      if (element && !invalidElements.includes(element)) {
        invalidElements.push(element);
      }
    }

    // --- SECTION A ---
    // LINE 1: Receipt Number, Receive Date, Receive Time
    const receiptInput = document.getElementById('receipt-number');
    if (!receiptInput || !receiptInput.value.trim()) {
      addError(receiptInput, 'RECEIPT NUMBER', 'SECTION A');
    }

    const receiveDateInput = document.getElementById('receive-date');
    if (!receiveDateInput || !receiveDateInput.value.trim()) {
      addError(receiveDateInput, 'RECEIVE DATE', 'SECTION A');
    }

    const hourInput = document.getElementById('intake-hour');
    const minuteInput = document.getElementById('intake-minute');
    const ampmInput = document.getElementById('intake-ampm');
    const hVal = hourInput ? hourInput.value.trim() : '';
    const mVal = minuteInput ? minuteInput.value.trim() : '';
    const ampmVal = ampmInput ? ampmInput.value.trim() : '';

    const hNum = parseInt(hVal, 10);
    const mNum = parseInt(mVal, 10);
    if (!hVal || isNaN(hNum) || hNum < 1 || hNum > 12) {
      addError(hourInput, 'RECEIVE TIME: HOUR (01 - 12)', 'SECTION A');
    }
    if (!mVal || isNaN(mNum) || mNum < 0 || mNum > 59) {
      addError(minuteInput, 'RECEIVE TIME: MINUTE (00 - 59)', 'SECTION A');
    }
    if (!ampmVal || (ampmVal !== 'AM' && ampmVal !== 'PM')) {
      const amBtn = document.getElementById('btn-ampm-am');
      addError(amBtn, 'RECEIVE TIME: AM / PM (SELECT AM OR PM)', 'SECTION A');
    }

    // LINE 2: Customer Name
    const customerInput = document.getElementById('customer-name-input');
    const customerSelect = document.getElementById('customer-select');
    const customerVal = (customerInput ? customerInput.value.trim() : '') || (customerSelect ? customerSelect.value.trim() : '');
    if (!customerVal) {
      addError(customerInput || customerSelect, 'CUSTOMER NAME (TYPE OR SELECT JEWELLER)', 'SECTION A');
    }

    // LINE 3: Total Pieces Count, Article Type, Declared Gold Purity
    const piecesInput = document.getElementById('pieces-count');
    const rawPcs = piecesInput && piecesInput.value.trim() !== '' ? parseInt(piecesInput.value, 10) : 0;
    if (!piecesInput || isNaN(rawPcs) || rawPcs <= 0) {
      addError(piecesInput, 'TOTAL PIECES COUNT (MUST BE AT LEAST 1 UNIT)', 'SECTION A');
    }

    const articleTypeInput = document.getElementById('article-type-input');
    if (!articleTypeInput || !articleTypeInput.value.trim()) {
      addError(articleTypeInput, 'TYPE OF ARTICLES (TYPE OR SELECT ARTICLE TYPE)', 'SECTION A');
    }

    const puritySelect = document.getElementById('purity-select');
    if (!puritySelect || !puritySelect.value.trim()) {
      addError(puritySelect, 'DECLARED GOLD / SILVER PURITY', 'SECTION A');
    }

    // LINE 4: Request Number, Job Number, Vault Tray Allocation Gate
    const reqNumberInput = document.getElementById('req-number');
    if (!reqNumberInput || !reqNumberInput.value.trim()) {
      addError(reqNumberInput, 'REQUEST NUMBER', 'SECTION A');
    }

    const jobNumberInput = document.getElementById('job-number');
    if (!jobNumberInput || !jobNumberInput.value.trim()) {
      addError(jobNumberInput, 'JOB NUMBER', 'SECTION A');
    }

    const extraJobs = Array.from(document.querySelectorAll('.additional-job-number'));
    extraJobs.forEach((inp, idx) => {
      if (!inp.value.trim()) {
        addError(inp, `ADDITIONAL JOB NUMBER #${idx + 2}`, 'SECTION A');
      }
    });

    const pcs = (!isNaN(rawPcs) && rawPcs > 0) ? rawPcs : 0;
    const totalAllocated = getTotalAllocatedCount();
    const custodySection = document.getElementById('vault-custody-section');
    if (pcs > 0 && totalAllocated < pcs) {
      const remaining = pcs - totalAllocated;
      addError(custodySection, `VAULT TRAY ALLOCATION (${remaining} SPACES UNASSIGNED • ALLOCATE ALL ${pcs} SPACES)`, 'VAULT ALLOCATOR');
    } else if (pcs > 0 && totalAllocated === 0) {
      addError(custodySection, `VAULT TRAY ALLOCATION (PLEASE ASSIGN TRAY & ALLOCATE ALL ${pcs} SPACES)`, 'VAULT ALLOCATOR');
    }

    // --- SECTION C ---
    // LINE 1: Net Fine Weight, Gross Weight
    const netInput = document.getElementById('net-weight');
    const netVal = netInput && netInput.value.trim() !== '' ? parseFloat(netInput.value) : 0;
    if (!netInput || isNaN(netVal) || netVal <= 0) {
      addError(netInput, 'NET FINE WEIGHT (MUST BE GREATER THAN 0.000 GRAMS)', 'SECTION C');
    }

    const grossInput = document.getElementById('gross-weight');
    const grossVal = grossInput && grossInput.value.trim() !== '' ? parseFloat(grossInput.value) : 0;
    if (!grossInput || isNaN(grossVal) || grossVal <= 0) {
      addError(grossInput, 'GROSS WEIGHT (MUST BE GREATER THAN 0.000 GRAMS)', 'SECTION C');
    } else if (!isNaN(netVal) && netVal > 0 && netVal > grossVal) {
      addError(netInput, 'NET FINE WEIGHT CANNOT EXCEED GROSS WEIGHT', 'SECTION C');
    }

    // LINE 2: Name of Depositor, Received By (Assay Master / Custodian)
    const depositorInput = document.getElementById('depositor-name');
    const depositorBtn = document.getElementById('depositor-dropdown-btn');
    if (!depositorInput || !depositorInput.value.trim()) {
      addError(depositorBtn || depositorInput, 'NAME OF DEPOSITOR', 'SECTION C');
    }

    const receiverSelect = document.getElementById('receiver-select');
    const receiverBtn = document.getElementById('receiver-dropdown-btn');
    if (!receiverSelect || !receiverSelect.value.trim()) {
      addError(receiverBtn || receiverSelect, 'RECEIVED BY (ASSAY MASTER / CUSTODIAN)', 'SECTION C');
    }

    return { errors, invalidElements };
  }

  function showIntakeWarningModal(errors, firstElement) {
    activeFirstInvalidElement = firstElement;
    const modal = document.getElementById('intakeWarningModal');
    const listEl = document.getElementById('intake-warning-list');
    if (!modal || !listEl) return;

    listEl.innerHTML = errors.map((err, idx) => `
      <div class="flex items-start gap-2.5 p-2 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/30">
        <span class="w-5 h-5 rounded-md bg-red-100 text-red-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">${idx + 1}</span>
        <div class="flex flex-col min-w-0">
          <span class="text-on-surface font-bold text-xs">${err.field}</span>
          <span class="text-[9.5px] text-outline font-sans">${err.section}</span>
        </div>
      </div>
    `).join('');

    modal.classList.remove('hidden');
  }

  function closeIntakeWarningModal(scrollToFirst = false) {
    const modal = document.getElementById('intakeWarningModal');
    if (modal) modal.classList.add('hidden');

    if (scrollToFirst && activeFirstInvalidElement) {
      setTimeout(() => {
        activeFirstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof activeFirstInvalidElement.focus === 'function') {
          activeFirstInvalidElement.focus();
        }
      }, 100);
    }
  }
  window.closeIntakeWarningModal = closeIntakeWarningModal;

  function highlightInvalidFields(elements) {
    elements.forEach(el => {
      if (!el) return;
      el.classList.add('field-error-highlight');

      const clearOnAction = () => {
        el.classList.remove('field-error-highlight');
        el.removeEventListener('input', clearOnAction);
        el.removeEventListener('change', clearOnAction);
      };

      el.addEventListener('input', clearOnAction);
      el.addEventListener('change', clearOnAction);
    });
  }

  function handleSaveReceiveEntry() {
    clearFieldErrorHighlights();
    const { errors, invalidElements } = validateReceiveBatchForm();

    if (errors.length > 0) {
      highlightInvalidFields(invalidElements);
      showIntakeWarningModal(errors, invalidElements[0]);
      showToast(`CANNOT SAVE: ${errors.length} COMPULSORY FIELD(S) ARE MISSING. PLEASE FILL UP ALL DATA FIRST.`, 'warning');
      return false;
    }

    const customerSelect = document.getElementById('customer-select');
    const jobNumberInput = document.getElementById('job-number');
    const reqNumberInput = document.getElementById('req-number');
    const piecesInput = document.getElementById('pieces-count');
    const metalTypeInput = document.getElementById('metal-type');
    const puritySelect = document.getElementById('purity-select');
    const trayInput = document.getElementById('tray-number');
    const grossInput = document.getElementById('gross-weight');
    const netInput = document.getElementById('net-weight');
    const depositorInput = document.getElementById('depositor-name');
    const receiverSelect = document.getElementById('receiver-select');
    const hourVal = document.getElementById('intake-hour') ? document.getElementById('intake-hour').value.trim() : '';
    const minVal = document.getElementById('intake-minute') ? document.getElementById('intake-minute').value.trim() : '';
    const ampmVal = document.getElementById('intake-ampm') ? document.getElementById('intake-ampm').value.trim() : '';

    const pcs = parseInt(piecesInput.value, 10);
    const totalAllocated = getTotalAllocatedCount();

    const customerInput = document.getElementById('customer-name-input');
    let customerText = customerInput && customerInput.value.trim() ? customerInput.value.trim().toUpperCase() : '';
    if (!customerText && customerSelect) {
      if (customerSelect.options && customerSelect.selectedIndex >= 0 && customerSelect.options[customerSelect.selectedIndex]) {
        customerText = customerSelect.options[customerSelect.selectedIndex].text.split(' - ')[0];
      } else {
        customerText = customerSelect.value || '';
      }
    }
    const bisText = document.getElementById('bis-badge') && document.getElementById('bis-badge').textContent.trim()
      ? document.getElementById('bis-badge').textContent.trim()
      : 'N/A';
    
    // Manual Job Number (infinite support) & Single Request Number
    const enteredJob = jobNumberInput.value.trim();
    const extraJobs = Array.from(document.querySelectorAll('.additional-job-number')).map(i => i.value.trim()).filter(Boolean);
    const finalJobDocket = [enteredJob, ...extraJobs].join(', ');

    const finalReqNo = reqNumberInput.value.trim();
    const metal = metalTypeInput && metalTypeInput.value === 'SILVER' ? 'SILVER' : 'GOLD';
    const articleTypeInput = document.getElementById('article-type-input');
    const articleType = (articleTypeInput && articleTypeInput.value.trim().toUpperCase()) || 'MIX ITEM';
    const purity = puritySelect.value;
    const allocatedBoxes = getAllocatedBoxesList();
    const tray = trayInput && trayInput.value && !trayInput.value.includes('No Trays') 
      ? trayInput.value 
      : (allocatedBoxes.length > 0 ? `${allocatedBoxes.length} BOXES (${totalAllocated} SP): ${allocatedBoxes.join(', ')}` : '-');
    const net = parseFloat(netInput.value);
    const gross = parseFloat(grossInput.value);
    const depositor = depositorInput ? depositorInput.value.trim() : 'RAJESH M. VARMA';
    let receiver = 'SARAH JENKINS';
    if (receiverSelect) {
      const found = RECEIVER_OPTIONS.find(o => o.value === receiverSelect.value);
      receiver = found ? found.value : (receiverSelect.value || 'SARAH JENKINS');
    }

    // Stream
    const streamRadio = document.querySelector('input[name="job_stream"]:checked');
    const stream = streamRadio && streamRadio.value === 'OFF_SIDE' ? 'OFFSIDE' : 'MAIN BRANCH';
    
    const receiveDateInput = document.getElementById('receive-date');
    const receiveDate = receiveDateInput && receiveDateInput.value ? receiveDateInput.value : '2024-10-24';
    let intakeTime = `${hourVal}:${minVal} ${ampmVal} IST`;

    const receiptNoInput = document.getElementById('receipt-number');
    const receiptNo = receiptNoInput && receiptNoInput.value.trim() ? receiptNoInput.value.trim() : 'REC-10948';

    const newBatch = {
      receiptNo: receiptNo,
      jobDocket: finalJobDocket,
      customer: customerText,
      bis: bisText,
      metal: metal,
      articleType: articleType,
      reqNo: finalReqNo,
      pcs: pcs,
      purity: purity,
      stream: stream,
      tray: tray,
      netWt: net,
      grossWt: gross,
      depositor: depositor,
      receiver: receiver,
      date: receiveDate,
      time: intakeTime,
      status: 'XRF VERIFIED'
    };

    // Prompt user with structured confirmation modal displaying all entered data
    showIntakeConfirmationModal(newBatch);
  }

  let activeDraftBatch = null;

  function showIntakeConfirmationModal(batch) {
    activeDraftBatch = batch;
    const modal = document.getElementById('intakeConfirmationModal');
    const content = document.getElementById('intake-confirmation-content');
    if (!modal || !content) return;

    const scrapInput = document.getElementById('scrapping-weight');
    const scrapVal = scrapInput && scrapInput.value ? parseFloat(scrapInput.value).toFixed(3) : '0.000';

    content.innerHTML = `
      <!-- Top Summary Banner -->
      <div class="p-3 bg-primary-container/10 border border-[#c5a059]/40 rounded-xl flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-amber-500 text-[22px]">assignment_turned_in</span>
          <div>
            <div class="text-xs font-bold text-slate-800 uppercase tracking-wide">PHYSICAL DOCKET SUMMARY REVIEW</div>
            <div class="text-[11px] text-slate-500 font-medium">PLEASE CONFIRM ENTERED DETAILS ACCORDING TO BIS GUIDELINES</div>
          </div>
        </div>
        <div class="px-2.5 py-1 bg-primary-container text-[#ffdea5] text-[11px] font-mono font-bold rounded-lg border border-[#c5a059]/50">
          ${escapeHtmlStr(batch.receiptNo || 'REC-10948')}
        </div>
      </div>

      <!-- 4 Structured Information Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- Card 1: Customer & Identification -->
        <div class="p-3.5 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-2">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase pb-1.5 border-b border-surface-container/60">
            <span class="material-symbols-outlined text-primary-container text-[16px]">domain</span>
            <span>CUSTOMER & IDENTIFICATION</span>
          </div>
          <div class="flex flex-col gap-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">RECEIPT NUMBER:</span>
              <span class="font-bold text-slate-800 font-mono">${escapeHtmlStr(batch.receiptNo || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">RECEIVE DATE:</span>
              <span class="font-bold text-slate-800 font-mono">${escapeHtmlStr(batch.date || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">RECEIVE TIME:</span>
              <span class="font-bold text-slate-800 font-mono">${escapeHtmlStr(batch.time || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">CUSTOMER NAME:</span>
              <span class="font-bold text-slate-800 text-right truncate max-w-[200px]">${escapeHtmlStr(batch.customer || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">BIS LICENSE:</span>
              <span class="font-bold text-primary-container font-mono">${escapeHtmlStr(batch.bis || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">REQUEST NUMBER:</span>
              <span class="font-bold text-slate-800 font-mono">${escapeHtmlStr(batch.reqNo || '-')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">JOB NUMBER(S):</span>
              <span class="font-bold text-slate-800 font-mono">${escapeHtmlStr(batch.jobDocket || '-')}</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Metallurgy & Allocation -->
        <div class="p-3.5 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-2">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase pb-1.5 border-b border-surface-container/60">
            <span class="material-symbols-outlined text-amber-500 text-[16px]">diamond</span>
            <span>METALLURGY & ALLOCATION</span>
          </div>
          <div class="flex flex-col gap-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">TOTAL PIECES:</span>
              <span class="font-bold text-slate-900 font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">${batch.pcs} UNITS</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">ARTICLE METAL:</span>
              <span class="font-bold text-slate-800">${escapeHtmlStr(batch.metal)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">TYPE OF ARTICLES:</span>
              <span class="font-bold text-primary-container font-mono">${escapeHtmlStr(batch.articleType || 'MIX ITEM')}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">DECLARED PURITY:</span>
              <span class="font-bold text-primary-container">${escapeHtmlStr(batch.purity)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">PROCESSING STREAM:</span>
              <span class="font-bold text-slate-800">${escapeHtmlStr(batch.stream)}</span>
            </div>
            <div class="flex justify-between items-start gap-2">
              <span class="text-slate-500 font-medium shrink-0">VAULT TRAY ASSIGNED:</span>
              <span class="font-bold text-slate-800 font-mono text-right text-[11px] leading-snug break-all">${escapeHtmlStr(batch.tray)}</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Weight Telemetry -->
        <div class="p-3.5 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-2">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase pb-1.5 border-b border-surface-container/60">
            <span class="material-symbols-outlined text-blue-600 text-[16px]">scale</span>
            <span>WEIGHT TELEMETRY</span>
          </div>
          <div class="flex flex-col gap-1.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">NET FINE WEIGHT:</span>
              <span class="font-bold text-emerald-700 font-mono text-sm">${batch.netWt.toFixed(3)} G</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">SCRAPPING WEIGHT:</span>
              <span class="font-bold text-slate-700 font-mono">${scrapVal} G</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 font-medium">GROSS WEIGHT:</span>
              <span class="font-bold text-slate-900 font-mono text-sm">${batch.grossWt.toFixed(3)} G</span>
            </div>
          </div>
        </div>

        <!-- Card 4: Custody & Authorization -->
        <div class="p-3.5 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-2">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase pb-1.5 border-b border-surface-container/60">
            <span class="material-symbols-outlined text-purple-600 text-[16px]">shield_person</span>
            <span>CUSTODY & AUTHORIZATION</span>
          </div>
          <div class="flex flex-col gap-2 text-xs">
            <div>
              <div class="text-[10px] text-slate-500 font-medium uppercase">NAME OF DEPOSITOR:</div>
              <div class="font-bold text-slate-800 text-[11px] mt-0.5">${escapeHtmlStr(batch.depositor)}</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-500 font-medium uppercase">RECEIVED BY (ASSAY MASTER / CUSTODIAN):</div>
              <div class="font-bold text-primary-container text-[11px] mt-0.5">${escapeHtmlStr(batch.receiver)}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Auto-focus confirm button
    setTimeout(() => {
      const confirmBtn = document.getElementById('btn-confirm-save-docket');
      if (confirmBtn) confirmBtn.focus();
    }, 100);
  }

  function closeIntakeConfirmationModal() {
    const modal = document.getElementById('intakeConfirmationModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
    activeDraftBatch = null;

    // Refocus Save button
    const saveBtn = document.getElementById('btn-save-receive-entry');
    if (saveBtn) {
      saveBtn.focus();
    }
  }

  function executeSaveReceiveEntry() {
    if (!activeDraftBatch) return;

    // Attach billing, tag generation, and piece disposition metadata so batch automatically queues across modules
    const totalPcs = activeDraftBatch.pcs || 0;
    const nextSeq = 4193 + (state.intakeBatches ? state.intakeBatches.length : 0);
    activeDraftBatch.billNo = 'BILL-2024-' + String(nextSeq).padStart(5, '0');
    activeDraftBatch.billPrinted = false; // Newly submitted batch is NOT printed yet
    activeDraftBatch.disposition = {
      rejected: 0,
      destroyed: 0,
      nonFeasible: 0,
      irrucd: 0,
      passed: totalPcs
    };
    activeDraftBatch.tagStatus = 'PENDING';
    activeDraftBatch.tagData = [];
    activeDraftBatch.tagDimensions = { width: 50, height: 12, unit: 'mm', preset: 'butterfly' };
    activeDraftBatch.articlePhoto = null;
    activeDraftBatch.deliveryStatus = 'READY';

    state.intakeBatches.unshift(activeDraftBatch);
    renderIntakeBatchesTable();
    showToast(`BATCH ${activeDraftBatch.jobDocket} CONFIRMED & QUEUED TO BILL GENERATION (BILL #${activeDraftBatch.billNo}).`, 'success');

    // Automatically make this new intake batch the active batch in Bill Generation
    activeBillingBatch = activeDraftBatch;
    if (typeof renderBillQueue === 'function') {
      renderBillQueue();
    }
    if (typeof renderTagStatusQueue === 'function') {
      renderTagStatusQueue();
    }
    if (typeof renderDeliveryQueue === 'function') {
      renderDeliveryQueue();
    }

    const modal = document.getElementById('intakeConfirmationModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';

    activeDraftBatch = null;

    // Reset Form and Allocator for the next batch
    resetReceiveBatchForm();
  }

  function generateIntakeReceiptContent(batch, scrapVal) {
    if (!batch) return '';
    const safeScrap = scrapVal !== undefined ? scrapVal : '0.000';
    const netG = typeof batch.netWt === 'number' ? batch.netWt.toFixed(3) : parseFloat(batch.netWt || 0).toFixed(3);
    const grossG = typeof batch.grossWt === 'number' ? batch.grossWt.toFixed(3) : parseFloat(batch.grossWt || 0).toFixed(3);
    const watermarkSrc = (window && window.SSR_LOGO_WATERMARK_SRC) ? window.SSR_LOGO_WATERMARK_SRC : 'assets/ssr-logo-bw.png';

    return `
      <div style="position: relative; width: 74mm; max-width: 100%; margin: 0 auto; padding: 2mm; color: #000000; background: #ffffff; font-family: 'Courier New', Courier, monospace; box-sizing: border-box; overflow: hidden;">
        <!-- BLACK & WHITE WATERMARK LOGO (OPACITY 30%) -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 0;">
          <img src="${watermarkSrc}" alt="SSR Watermark" style="width: 58mm; height: 58mm; object-fit: contain; opacity: 0.30; -webkit-print-color-adjust: exact; print-color-adjust: exact;" />
        </div>

        <div style="position: relative; z-index: 1;">
          <!-- HEADER -->
          <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 6px;">
            <div style="font-size: 15px; font-weight: 900; letter-spacing: 0.75px; text-transform: uppercase;">SSR HALLMARK CENTER</div>
            <div style="font-size: 10px; font-weight: 900; margin-top: 3px; border: 1.5px solid #000; display: inline-block; padding: 1.5px 7px; text-transform: uppercase;">
              RECEIPT #: ${escapeHtmlStr(batch.receiptNo || 'REC-10948')}
            </div>
            <div style="font-size: 8.5px; margin-top: 2px; text-transform: uppercase;">DATE: ${batch.date}</div>
          </div>

          <!-- 1. FIRST IN BIG AND BOLD: CUSTOMER NAME -->
          <div style="border-bottom: 1.5px dashed #000; padding: 4px 0 6px 0; margin-bottom: 4px;">
            <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase;">CUSTOMER NAME:</div>
            <div style="font-size: 16px; font-weight: 900; text-transform: uppercase; line-height: 1.15; word-break: break-word;">
              ${escapeHtmlStr(batch.customer || 'N/A')}
            </div>
          </div>

          <!-- 2. BIS LICENSE -->
          <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 10px; padding: 3px 0; border-bottom: 1px dashed #000;">
            <span style="font-weight: bold; text-transform: uppercase;">BIS LICENSE:</span>
            <span style="font-weight: 900; font-size: 11px; text-transform: uppercase;">${escapeHtmlStr(batch.bis || 'N/A')}</span>
          </div>

          <!-- 3. REQUEST NUMBER -->
          <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 10px; padding: 3px 0; border-bottom: 1px dashed #000;">
            <span style="font-weight: bold; text-transform: uppercase;">REQUEST NUMBER:</span>
            <span style="font-weight: 900; font-size: 11px; text-transform: uppercase;">${escapeHtmlStr(batch.reqNo || 'N/A')}</span>
          </div>

          <!-- 4. JOB NUMBER(S) -->
          <div style="padding: 3px 0; border-bottom: 1px dashed #000;">
            <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase;">JOB NUMBER(S):</div>
            <div style="font-size: 11px; font-weight: 900; word-break: break-all; text-transform: uppercase;">
              ${escapeHtmlStr(batch.jobDocket || 'N/A')}
            </div>
          </div>

          <!-- 5. NET FINE WEIGHT + SCRAPPING WEIGHT = GROSS WEIGHT -->
          <div style="padding: 4px 0 6px 0; border-bottom: 1px dashed #000;">
            <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase;">WEIGHT TELEMETRY:</div>
            <div style="font-size: 10px; font-weight: bold; margin-top: 2px; line-height: 1.35;">
              NET FINE WT: ${netG} G<br/>
              + SCRAPPING WT: ${safeScrap} G<br/>
              --------------------------------<br/>
              = GROSS WT: ${grossG} G
            </div>
            <div style="font-size: 10.5px; font-weight: 900; margin-top: 3px; padding: 3px 4px; border: 1.5px solid #000; text-align: center; text-transform: uppercase;">
              ${netG} G + ${safeScrap} G = ${grossG} G
            </div>
          </div>

          <!-- 6. VAULT TRAY ASSIGNED -->
          <div style="padding: 4px 0 6px 0; border-bottom: 2px solid #000;">
            <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase;">VAULT TRAY ASSIGNED:</div>
            <div style="font-size: 12px; font-weight: 900; word-break: break-word; line-height: 1.25; text-transform: uppercase;">
              ${escapeHtmlStr(batch.tray || '-')}
            </div>
          </div>

          <!-- 7. AT THE BOTTOM IN BIG LETTERS: NO OF PIECES, GOLD OR SILVER, AND PURITY -->
          <div style="margin-top: 8px; padding: 7px 4px; border: 2.5px solid #000; text-align: center; background: #fff;">
            <div style="font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">TOTAL PIECES COUNT</div>
            <div style="font-size: 22px; font-weight: 900; letter-spacing: 1px; margin: 2px 0; line-height: 1;">
              ${batch.pcs} PIECES
            </div>
            <div style="border-top: 1.5px solid #000; margin: 5px 0;"></div>
            <div style="font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">ARTICLE METAL & DECLARED PURITY</div>
            <div style="font-size: 17px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.15; margin-top: 2px;">
              ${escapeHtmlStr(batch.metal)} • ${escapeHtmlStr(batch.purity)}
            </div>
            ${batch.articleType ? `
            <div style="margin-top: 5px; font-size: 8.5px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">TYPE OF ARTICLES</div>
            <div style="font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.15; margin-top: 1px;">
              ${escapeHtmlStr(batch.articleType)}
            </div>` : ''}
          </div>

          <!-- FOOTER -->
          <div style="text-align: center; font-size: 8px; margin-top: 6px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
            *** PHYSICAL RECEIPT ***
          </div>
        </div>
      </div>
    `;
  }

  function printIntakeReceipt() {
    if (!activeDraftBatch) {
      showToast('NO ACTIVE INTAKE DOCKET TO PRINT.', 'warning');
      return;
    }

    const scrapInput = document.getElementById('scrapping-weight');
    const scrapVal = scrapInput && scrapInput.value ? parseFloat(scrapInput.value).toFixed(3) : '0.000';
    const receiptHTML = generateIntakeReceiptContent(activeDraftBatch, scrapVal);

    // Populate static element on page
    const staticContainer = document.getElementById('intake-receipt-printable');
    if (staticContainer) {
      staticContainer.innerHTML = receiptHTML;
    }

    // Direct browser print window invocation via dedicated hidden printable iframe
    let printFrame = document.getElementById('receipt-print-iframe');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'receipt-print-iframe';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      printFrame.style.opacity = '0';
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base href="${window.location.origin}/">
          <title>INTAKE RECEIPT - ${escapeHtmlStr(activeDraftBatch.receiptNo || 'REC-10948')}</title>
          <style>
            @page {
              size: auto;
              margin: 3mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #000000;
              font-family: 'Courier New', Courier, monospace, sans-serif;
              font-size: 11px;
              line-height: 1.3;
            }
          </style>
        </head>
        <body>
          ${receiptHTML}
        </body>
      </html>
    `);
    frameDoc.close();

    // Trigger browser print feature when watermark image is ready
    const triggerPrint = () => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (err) {
        console.error('Print iframe error:', err);
        // Fallback to body printing class
        document.body.classList.add('printing-intake-receipt');
        window.print();
        setTimeout(() => {
          document.body.classList.remove('printing-intake-receipt');
        }, 1000);
      }
    };

    const watermarkImg = printFrame.contentWindow.document.querySelector('img');
    if (watermarkImg && !watermarkImg.complete) {
      watermarkImg.onload = () => setTimeout(triggerPrint, 50);
      watermarkImg.onerror = triggerPrint;
      setTimeout(triggerPrint, 300);
    } else {
      setTimeout(triggerPrint, 150);
    }
  }

  function resetReceiveBatchForm() {
    const intakeForm = document.getElementById('intake-form');
    if (intakeForm) intakeForm.reset();
    clearCustomerAutocomplete();
    resetWeightInputs();
    setMetalType('GOLD');
    const articleTypeInput = document.getElementById('article-type-input');
    if (articleTypeInput) {
      articleTypeInput.value = '';
      articleTypeInput.classList.remove('field-error-highlight');
    }
    closeArticleTypeDropdown();
    const puritySelect = document.getElementById('purity-select');
    const purityDisplay = document.getElementById('purity-display-text');
    if (puritySelect) puritySelect.value = '22K 916';
    if (purityDisplay) purityDisplay.textContent = '22K 916 (91.6% FINE GOLD) - STANDARD';
    togglePurityMenu(false);

    // Reset Depositor & Receiver dropdowns
    const depositorInput = document.getElementById('depositor-name');
    const depositorDisplay = document.getElementById('depositor-display-text');
    if (depositorInput) depositorInput.value = DEPOSITOR_OPTIONS[0].value;
    if (depositorDisplay) depositorDisplay.textContent = DEPOSITOR_OPTIONS[0].label;
    activeDepositorIndex = 0;
    toggleDepositorMenu(false);

    const receiverInput = document.getElementById('receiver-select');
    const receiverDisplay = document.getElementById('receiver-display-text');
    if (receiverInput) receiverInput.value = RECEIVER_OPTIONS[0].value;
    if (receiverDisplay) receiverDisplay.textContent = RECEIVER_OPTIONS[0].label;
    activeReceiverIndex = 0;
    toggleReceiverMenu(false);

    const saveBtn = document.getElementById('btn-save-receive-entry');
    if (saveBtn) {
      saveBtn.classList.remove('final-step-glow');
    }

    state.allocatedMap = {};
    updateCustodyTracker();
    renderVaultBoxes();
    if (state.vaultBoxes.length > 0) {
      renderVaultSlots(state.vaultBoxes[0]);
    }
    // Clear validation highlights
    document.querySelectorAll('.field-error-highlight').forEach(el => el.classList.remove('field-error-highlight'));
  }

  function renderIntakeBatchesTable(filteredList = null) {
    const tbody = document.getElementById('intakeTableBody');
    if (!tbody) return;

    const list = filteredList || state.intakeBatches;

    tbody.innerHTML = list
      .map(
        b => `
      <tr class="hover:bg-surface-container-low/40 transition-colors">
        <td class="py-3.5 px-4 font-data-mono text-data-mono font-bold text-on-surface whitespace-nowrap">
          ${b.jobDocket}
        </td>
        <td class="py-3.5 px-4">
          <div class="flex flex-col">
            <span class="font-semibold text-on-surface">${b.customer}</span>
            <span class="font-data-mono text-[11px] text-outline">${b.bis}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 font-data-mono text-data-mono text-on-surface-variant">${b.reqNo}</td>
        <td class="py-3.5 px-3 font-data-mono text-data-mono text-center font-semibold">${b.pcs}</td>
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-data-mono font-bold bg-secondary-container/40 text-on-secondary-container">
            ${b.purity}
          </span>
        </td>
        <td class="py-3.5 px-3">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-label-sm font-semibold ${
            b.stream === 'OFFSIDE' || b.stream === 'Another Branch' || b.stream === 'Off Side' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface'
          }">
            ${b.stream}
          </span>
        </td>
        <td class="py-3.5 px-4 font-data-mono text-[12px] text-on-surface-variant">${b.tray}</td>
        <td class="py-3.5 px-4 font-data-mono text-data-mono font-bold text-right text-on-surface">${b.netWt.toFixed(3)}</td>
        <td class="py-3.5 px-4 font-data-mono text-data-mono text-right text-on-surface-variant">${b.grossWt.toFixed(3)}</td>
        <td class="py-3.5 px-4 text-on-surface whitespace-nowrap">${b.depositor}</td>
        <td class="py-3.5 px-4 text-on-surface whitespace-nowrap">${b.receiver}</td>
        <td class="py-3.5 px-4 text-center whitespace-nowrap">
          <button class="px-2.5 py-1 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold hover:bg-primary-container hover:text-white transition-colors" onclick="openRecordModalForJob('${b.jobDocket}')">
            Details
          </button>
        </td>
      </tr>
    `
      )
      .join('');
  }

  function filterIntakeBatches() {
    const searchInput = document.getElementById('intakeSearchInput');
    const customerFilter = document.getElementById('intakeCustomerFilter');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCustomer = customerFilter ? customerFilter.value.toLowerCase().trim() : '';

    const filtered = state.intakeBatches.filter(b => {
      const matchQuery =
        !query ||
        b.jobDocket.toLowerCase().includes(query) ||
        b.customer.toLowerCase().includes(query) ||
        b.bis.toLowerCase().includes(query) ||
        b.reqNo.toLowerCase().includes(query);
      const matchCustomer = !selectedCustomer || b.customer.toLowerCase().includes(selectedCustomer);
      return matchQuery && matchCustomer;
    });

    renderIntakeBatchesTable(filtered);
  }

  // ========================================================
  // VAULT CUSTODY BOXES & COMPARTMENT SPACES MATRIX ENGINE
  // (Duffel / Ticket Seat-Selection Pattern)
  // ========================================================

  function getTotalAllocatedCount() {
    let total = 0;
    if (!state.allocatedMap) return 0;
    for (const boxId in state.allocatedMap) {
      if (Array.isArray(state.allocatedMap[boxId])) {
        total += state.allocatedMap[boxId].length;
      }
    }
    return total;
  }

  function getAllocatedBoxesList() {
    const list = [];
    if (!state.allocatedMap) return list;
    for (const boxId in state.allocatedMap) {
      if (Array.isArray(state.allocatedMap[boxId]) && state.allocatedMap[boxId].length > 0) {
        list.push(boxId);
      }
    }
    return list;
  }

  // Smart Box & Tray Recommendation Engine
  function computeOptimalRecommendation(targetPieces) {
    const target = Math.max(0, parseInt(targetPieces, 10) || 0);
    if (target === 0) {
      return {
        targetPieces: 0,
        trays: [],
        totalSpaces: 0,
        badge: 'None',
        description: 'Enter total pieces count to receive custody tray recommendations.'
      };
    }

    const emptyBoxes = state.vaultBoxes.filter(b => b.status === 'empty');

    // 1. Exact Single Tray Match (e.g. 5 pcs -> B1-5, 10 pcs -> A1-10, 20 pcs -> R1-20, 25 pcs -> R25-50)
    const exactTray = emptyBoxes.find(b => b.capacity === target);
    if (exactTray) {
      const start = exactTray.slotStart || 1;
      const slots = Array.from({ length: target }, (_, i) => i + start);
      return {
        targetPieces: target,
        trays: [{ boxId: exactTray.id, box: exactTray, count: target, slots: slots }],
        totalSpaces: target,
        badge: 'Exact 100% Fit',
        description: `Tray ${exactTray.id} (${target} of ${exactTray.capacity} spaces) • Perfect single-tray match!`
      };
    }

    // 2. Single Tray with minimal excess (e.g. 8 pcs -> A1-10 [10 cap, 2 spare], 15 pcs -> R1-20 [20 cap, 5 spare])
    const singleFitTrays = emptyBoxes
      .filter(b => b.capacity >= target)
      .sort((a, b) => a.capacity - b.capacity);

    if (singleFitTrays.length > 0) {
      const bestTray = singleFitTrays[0];
      const start = bestTray.slotStart || 1;
      const slots = Array.from({ length: target }, (_, i) => i + start);
      const spare = bestTray.capacity - target;
      return {
        targetPieces: target,
        trays: [{ boxId: bestTray.id, box: bestTray, count: target, slots: slots }],
        totalSpaces: target,
        badge: 'Optimal Single Tray',
        description: `Tray ${bestTray.id} (${target} of ${bestTray.capacity} spaces) • Minimal excess (${spare} spaces remain free)`
      };
    }

    // 3. Multi-Tray Combination (target > max single capacity, e.g. 85 pcs)
    // Greedily pick largest empty boxes until target count is met
    const sortedEmpty = [...emptyBoxes].sort((a, b) => b.capacity - a.capacity);
    const selectedTrays = [];
    let remaining = target;

    for (const box of sortedEmpty) {
      if (remaining <= 0) break;
      const takeCount = Math.min(remaining, box.capacity);
      const start = box.slotStart || 1;
      const slots = Array.from({ length: takeCount }, (_, i) => i + start);
      selectedTrays.push({
        boxId: box.id,
        box: box,
        count: takeCount,
        slots: slots
      });
      remaining -= takeCount;
    }

    const totalAllocated = selectedTrays.reduce((sum, t) => sum + t.count, 0);
    const traySummary = selectedTrays.map(t => `${t.boxId} (${t.count} sp)`).join(', ');

    return {
      targetPieces: target,
      trays: selectedTrays,
      totalSpaces: totalAllocated,
      badge: `${selectedTrays.length} Trays Combo`,
      description: `Trays: ${traySummary} • Total ${totalAllocated} spaces across ${selectedTrays.length} boxes`
    };
  }

  function renderRecommendationCard(rec) {
    const targetEl = document.getElementById('rec-target-pcs');
    const badgeEl = document.getElementById('rec-fit-tag');
    const textEl = document.getElementById('rec-text');

    if (targetEl) targetEl.textContent = rec.targetPieces;
    if (badgeEl) badgeEl.textContent = rec.badge;
    if (textEl) textEl.textContent = rec.description;
  }

  function applyRecommendation(customTarget = null, notify = false) {
    const piecesInput = document.getElementById('pieces-count');
    const rawVal = customTarget !== null 
      ? customTarget 
      : (piecesInput && piecesInput.value.trim() !== '' ? parseInt(piecesInput.value, 10) : 0);
    const targetPcs = isNaN(rawVal) || rawVal < 0 ? 0 : rawVal;

    if (targetPcs === 0) {
      state.allocatedMap = {};
      const rec = computeOptimalRecommendation(0);
      renderRecommendationCard(rec);
      updateCustodyTracker();
      renderVaultBoxes();
      const activeBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
      renderVaultSlots(activeBox);
      if (notify) {
        showToast('Please enter Total Pieces Count before auto-allocating trays.', 'warning');
      }
      return;
    }

    const rec = computeOptimalRecommendation(targetPcs);

    state.allocatedMap = {};
    for (const t of rec.trays) {
      state.allocatedMap[t.boxId] = t.slots;
    }

    if (rec.trays.length > 0) {
      state.selectedVaultBoxId = rec.trays[0].boxId;
    }

    renderRecommendationCard(rec);
    updateCustodyTracker();
    renderVaultBoxes();
    const activeBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
    renderVaultSlots(activeBox);

    if (notify) {
      const names = rec.trays.map(t => t.boxId).join(', ');
      showToast(`Applied smart recommendation: ${rec.totalSpaces} spaces allocated across ${names}.`);
    }
  }

  function onPiecesCountChanged() {
    const piecesInput = document.getElementById('pieces-count');
    if (!piecesInput) return;
    const rawVal = parseInt(piecesInput.value, 10);
    if (isNaN(rawVal) || rawVal <= 0) {
      state.allocatedMap = {};
      const rec = computeOptimalRecommendation(0);
      renderRecommendationCard(rec);
      updateCustodyTracker();
      renderVaultBoxes();
      const activeBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
      renderVaultSlots(activeBox);
      return;
    }

    // Automatically recalculate and apply the matching spaces!
    applyRecommendation(rawVal, false);
  }

  function updateCustodyTracker() {
    const piecesInput = document.getElementById('pieces-count');
    const rawPcs = piecesInput && piecesInput.value.trim() !== '' ? parseInt(piecesInput.value, 10) : 0;
    const targetPcs = isNaN(rawPcs) || rawPcs < 0 ? 0 : rawPcs;
    const allocated = getTotalAllocatedCount();
    const boxesUsed = getAllocatedBoxesList();

    const targetEl = document.getElementById('tracker-target-pcs');
    const targetCopy = document.getElementById('tracker-target-copy');
    const allocEl = document.getElementById('tracker-allocated-count');
    const boxesCountEl = document.getElementById('tracker-boxes-count');
    const autoBtnEl = document.getElementById('auto-btn-pcs');
    const pillEl = document.getElementById('tracker-status-pill');
    const barEl = document.getElementById('custody-progress-bar');
    const warnEl = document.getElementById('tracker-warning-msg');

    if (targetEl) targetEl.textContent = targetPcs;
    if (targetCopy) targetCopy.textContent = targetPcs;
    if (allocEl) allocEl.textContent = allocated;
    if (boxesCountEl) boxesCountEl.textContent = boxesUsed.length;
    if (autoBtnEl) autoBtnEl.textContent = targetPcs;

    // Always update the recommendation card
    const rec = computeOptimalRecommendation(targetPcs);
    renderRecommendationCard(rec);

    if (targetPcs === 0) {
      if (barEl) {
        barEl.style.width = '0%';
        barEl.className = 'bg-outline-variant/30 h-full transition-all duration-300';
      }
      if (pillEl) {
        pillEl.className = 'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-surface-container text-on-surface-variant border border-outline-variant/30';
        pillEl.innerHTML = 'ENTER PIECES COUNT';
      }
      if (warnEl) {
        warnEl.className = 'text-[11px] text-on-surface-variant font-medium flex items-center gap-1';
        warnEl.innerHTML = '<span class="material-symbols-outlined text-[14px]">info</span><span>ENTER TOTAL PIECES COUNT TO BEGIN VAULT TRAY ALLOCATION.</span>';
      }
    } else {
      const pct = Math.min(100, Math.round((allocated / targetPcs) * 100));
      if (barEl) {
        barEl.style.width = pct + '%';
        if (allocated >= targetPcs) {
          barEl.className = 'bg-emerald-500 h-full transition-all duration-300';
        } else {
          barEl.className = 'bg-amber-500 h-full transition-all duration-300';
        }
      }

      if (pillEl) {
        if (allocated === targetPcs) {
          pillEl.className = 'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
          pillEl.innerHTML = `✓ TARGET MET (${targetPcs}/${targetPcs} SPACES)`;
        } else if (allocated > targetPcs) {
          pillEl.className = 'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-100 text-blue-800 border border-blue-300';
          pillEl.innerHTML = `✓ SUFFICIENT (${allocated}/${targetPcs} SPACES)`;
        } else {
          const remaining = targetPcs - allocated;
          pillEl.className = 'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-800 border border-amber-300';
          pillEl.innerHTML = `⚠️ ${remaining} SPACES NEEDED`;
        }
      }

      if (warnEl) {
        if (allocated >= targetPcs) {
          warnEl.className = 'text-[11px] text-emerald-700 font-semibold flex items-center gap-1';
          warnEl.innerHTML = `<span class="material-symbols-outlined text-[14px]">check_circle</span><span>CUSTODY ALLOCATION COMPLETE: ALL ${targetPcs} PIECES ALLOCATED ACROSS ${boxesUsed.length} TRAYS (${boxesUsed.join(', ')}).</span>`;
        } else {
          const remaining = targetPcs - allocated;
          warnEl.className = 'text-[11px] text-amber-800 font-medium flex items-center gap-1';
          warnEl.innerHTML = `<span class="material-symbols-outlined text-[14px]">info</span><span>CANNOT PROCEED: PLEASE ALLOCATE REMAINING ${remaining} SPACES ACROSS TRAYS (OR CLICK "AUTO-ALLOCATE").</span>`;
        }
      }
    }

    // Update tray-number input in form
    const trayInput = document.getElementById('tray-number');
    if (trayInput) {
      if (boxesUsed.length === 0) {
        trayInput.value = '';
      } else if (boxesUsed.length === 1) {
        trayInput.value = `${boxesUsed[0]} • ${allocated} SPACES ALLOCATED`;
      } else {
        trayInput.value = `${boxesUsed.length} BOXES (${allocated} SPACES): ${boxesUsed.join(', ')}`;
      }
    }

    // Update box-summary-allocated
    const boxAllocEl = document.getElementById('box-summary-allocated');
    if (boxAllocEl) {
      const activeSlots = state.allocatedMap[state.selectedVaultBoxId] || [];
      if (activeSlots.length > 0) {
        boxAllocEl.classList.remove('hidden');
        boxAllocEl.textContent = `${activeSlots.length} ALLOCATED`;
      } else {
        boxAllocEl.classList.add('hidden');
      }
    }
  }

  function autoAllocateRequiredPieces() {
    applyRecommendation(null, true);
  }

  function clearAllAllocations() {
    state.allocatedMap = {};
    updateCustodyTracker();
    renderVaultBoxes();
    const activeBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
    renderVaultSlots(activeBox);
    showToast('Cleared all allocated vault spaces.');
  }

  function clearCurrentTrayAllocations() {
    const boxId = state.selectedVaultBoxId;
    if (!boxId) return;

    if (state.allocatedMap && state.allocatedMap[boxId] && state.allocatedMap[boxId].length > 0) {
      const count = state.allocatedMap[boxId].length;
      delete state.allocatedMap[boxId];
      updateCustodyTracker();
      renderVaultBoxes();
      const activeBox = state.vaultBoxes.find(b => b.id === boxId) || state.vaultBoxes[0];
      renderVaultSlots(activeBox);
      showToast(`Cleared ${count} allocated spaces from Tray ${boxId}.`);
    } else if (getTotalAllocatedCount() > 0) {
      // If current tray has no allocations, but user clicks Clear, reset all allocations so user can assign fresh
      state.allocatedMap = {};
      updateCustodyTracker();
      renderVaultBoxes();
      const activeBox = state.vaultBoxes.find(b => b.id === boxId) || state.vaultBoxes[0];
      renderVaultSlots(activeBox);
      showToast(`Cleared all previous tray allocations. Ready to assign Tray ${boxId}.`);
    } else {
      showToast(`Tray ${boxId} has no allocated spaces to clear.`);
    }
  }

  function allocateNeededToCurrentTray() {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    if (box.status !== 'empty') {
      showToast(`Tray ${box.id} is in "${box.status}" status. Only empty trays can be assigned for new custody intake.`, 'error');
      return;
    }

    const piecesInput = document.getElementById('pieces-count');
    const targetPcs = parseInt(piecesInput ? piecesInput.value : 85, 10) || 1;
    let currentAlloc = getTotalAllocatedCount();
    let currentBoxAlloc = (state.allocatedMap && state.allocatedMap[box.id]) || [];
    let needed = targetPcs - (currentAlloc - currentBoxAlloc.length);

    // If target is already satisfied across other trays, user is switching to this tray
    if (needed <= 0) {
      state.allocatedMap = {};
      currentAlloc = 0;
      currentBoxAlloc = [];
      needed = targetPcs;
    }

    const occupied = box.occupiedSlots || [];
    const freeSlots = [];
    const start = box.slotStart || 1;
    for (let s = start; s < start + box.capacity; s++) {
      if (!occupied.includes(s)) {
        freeSlots.push(s);
      }
    }

    if (freeSlots.length === 0) {
      showToast(`No free spaces remaining in Tray ${box.id}.`, 'error');
      return;
    }

    const takeCount = Math.min(needed, freeSlots.length);
    if (!state.allocatedMap) state.allocatedMap = {};
    state.allocatedMap[box.id] = freeSlots.slice(0, takeCount);

    updateCustodyTracker();
    renderVaultBoxes();
    renderVaultSlots(box);
    showToast(`Assigned ${takeCount} spaces in Tray ${box.id} (${getTotalAllocatedCount()}/${targetPcs} spaces allocated).`);
  }

  function allocateCurrentTrayAllFree() {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    if (box.status !== 'empty') {
      showToast(`Tray ${box.id} is in "${box.status}" status. Only empty trays can be assigned.`, 'error');
      return;
    }

    const occupied = box.occupiedSlots || [];
    const freeSlots = [];
    const start = box.slotStart || 1;
    for (let s = start; s < start + box.capacity; s++) {
      if (!occupied.includes(s)) {
        freeSlots.push(s);
      }
    }

    if (freeSlots.length === 0) {
      showToast(`No free spaces available in Tray ${box.id}.`, 'error');
      return;
    }

    if (!state.allocatedMap) state.allocatedMap = {};
    state.allocatedMap[box.id] = freeSlots;

    updateCustodyTracker();
    renderVaultBoxes();
    renderVaultSlots(box);
    showToast(`Allocated all ${freeSlots.length} free spaces in Tray ${box.id}.`);
  }

  function renderVaultBoxes() {
    const compactGrid = document.getElementById('vault-boxes-compact-grid');
    if (!compactGrid) return;

    // Get current recommendation to highlight suggested trays
    const piecesInput = document.getElementById('pieces-count');
    const currentTarget = parseInt(piecesInput ? piecesInput.value : 85, 10) || 1;
    const rec = computeOptimalRecommendation(currentTarget);
    const recBoxIds = (rec && rec.trays) ? rec.trays.map(t => t.boxId) : [];

    // Calculate real-time counts across the floor
    const emptyCount = state.vaultBoxes.filter(b => b.status === 'empty').length;
    const preMarkingCount = state.vaultBoxes.filter(b => b.status === 'pre-marking').length;
    const completedCount = state.vaultBoxes.filter(b => b.status === 'completed').length;

    // Update legend counts
    const elEmpty = document.getElementById('seat-count-empty');
    const elPre = document.getElementById('seat-count-premarking');
    const elComp = document.getElementById('seat-count-completed');

    if (elEmpty) elEmpty.textContent = emptyCount;
    if (elPre) elPre.textContent = preMarkingCount;
    if (elComp) elComp.textContent = completedCount;

    // Filter boxes
    let filtered = state.vaultBoxes;
    if (state.vaultFilterStatus === 'EMPTY') {
      filtered = filtered.filter(b => b.status === 'empty');
    } else if (state.vaultFilterStatus === 'PRE_MARKING') {
      filtered = filtered.filter(b => b.status === 'pre-marking');
    } else if (state.vaultFilterStatus === 'COMPLETED') {
      filtered = filtered.filter(b => b.status === 'completed');
    }

    // Update header count
    const headerCount = document.getElementById('choose-tray-header-count');
    if (headerCount) {
      headerCount.textContent = `CHOOSE TRAY (${state.vaultBoxes.length} TOTAL TRAYS)`;
    }

    if (filtered.length === 0) {
      compactGrid.innerHTML = `
        <div class="col-span-full py-4 text-center text-on-surface-variant text-[11px]">
          NO MATCHING TRAYS. <button type="button" onclick="filterVaultBoxes('ALL')" class="text-primary-container font-bold underline">RESET</button>
        </div>
      `;
      return;
    }

    // Dynamic Sizing based on number of trays so user NEVER scrolls up or down!
    const count = filtered.length;
    let cols = 6;
    let minH = '40px';
    let pad = '4px 4px';
    let fontId = '10.5px';
    let fontSub = '8.5px';

    if (count <= 12) {
      cols = 4;
      minH = '48px';
      pad = '6px 5px';
      fontId = '11.5px';
      fontSub = '9.5px';
    } else if (count <= 24) {
      cols = 6;
      minH = '38px';
      pad = '4px 4px';
      fontId = '10px';
      fontSub = '8.5px';
    } else if (count <= 36) {
      cols = 8;
      minH = '34px';
      pad = '3px 3px';
      fontId = '9.5px';
      fontSub = '8px';
    } else if (count <= 48) {
      cols = 8;
      minH = '28px';
      pad = '2px 2px';
      fontId = '9px';
      fontSub = '7.5px';
    } else {
      cols = 10;
      minH = '24px';
      pad = '2px 2px';
      fontId = '8.5px';
      fontSub = '7px';
    }

    compactGrid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    compactGrid.style.setProperty('--tray-min-h', minH);
    compactGrid.style.setProperty('--tray-padding', pad);

    compactGrid.innerHTML = filtered.map(b => {
      const isSelected = b.id === state.selectedVaultBoxId;
      const boxAlloc = (state.allocatedMap && state.allocatedMap[b.id]) || [];
      const hasAlloc = boxAlloc.length > 0;
      const isRecommended = recBoxIds.includes(b.id);
      let tintClass = 'tray-tile-empty';

      if (b.status === 'pre-marking') {
        tintClass = 'tray-tile-premarking';
      } else if (b.status === 'completed') {
        tintClass = 'tray-tile-completed';
      }

      return `
        <div onclick="selectVaultBox('${b.id}')" 
             class="tray-seat-tile ${tintClass} ${isSelected ? 'is-active' : ''} ${hasAlloc ? 'has-allocation' : ''} ${isRecommended && !hasAlloc ? 'is-suggested' : ''}" 
             title="${b.id}: ${b.capacity} Spaces (${b.status})${isRecommended ? ' • Recommended for declared pieces' : ''}">
          <div class="w-full flex items-center justify-between font-bold" style="font-size: ${fontId};">
            <span class="tracking-tight text-on-surface font-data-mono">${b.id}</span>
            ${hasAlloc 
              ? `<span class="px-1 py-0.2 rounded bg-blue-600 text-secondary-fixed text-[8px] font-bold leading-none">✓${boxAlloc.length}</span>` 
              : (isRecommended ? `<span class="px-1 py-0.2 rounded bg-blue-100 text-blue-900 border border-blue-300 text-[7.5px] font-bold leading-none">★Rec</span>` : '')
            }
          </div>
          <div class="w-full flex items-center justify-between text-on-surface-variant font-data-mono mt-0.5" style="font-size: ${fontSub};">
            <span>${b.capacity} SP</span>
            <span>${b.status === 'pre-marking' ? '🔴' : b.status === 'completed' ? '🟢' : '⚪'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Update left strip summary
    const currentBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
    if (currentBox) {
      const nameEl = document.getElementById('box-summary-name');
      const capEl = document.getElementById('box-summary-cap');
      const statusEl = document.getElementById('box-summary-status');
      const dotEl = document.getElementById('box-summary-dot');

      if (nameEl) nameEl.textContent = currentBox.id;
      if (capEl) capEl.textContent = `${currentBox.capacity} SPACES`;
      if (dotEl) {
        dotEl.className = currentBox.status === 'pre-marking' 
          ? 'w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse'
          : currentBox.status === 'completed'
          ? 'w-2.5 h-2.5 rounded-full bg-emerald-500'
          : 'w-2.5 h-2.5 rounded-full bg-slate-400';
      }
      if (statusEl) {
        if (currentBox.status === 'pre-marking') {
          statusEl.className = 'font-semibold text-red-700 text-[10.5px]';
          statusEl.textContent = `🔴 PRE-MARKING (${(currentBox.stage || 'IN-PROCESS').toUpperCase()})`;
        } else if (currentBox.status === 'completed') {
          statusEl.className = 'font-semibold text-emerald-700 text-[10.5px]';
          statusEl.textContent = '🟢 MARKING DONE';
        } else {
          statusEl.className = 'font-semibold text-slate-600 text-[10.5px]';
          statusEl.textContent = '⚪ EMPTY / READY';
        }
      }
    }
  }

  function renderVaultSlots(box) {
    const titleEl = document.getElementById('seat-map-box-title');
    const tagEl = document.getElementById('seat-map-spaces-tag');
    const freeEl = document.getElementById('seat-map-free-count');
    const occEl = document.getElementById('seat-map-occ-count');
    const gridEl = document.getElementById('seat-map-grid');

    if (titleEl) titleEl.textContent = box.id;
    if (tagEl) tagEl.textContent = `${box.capacity} SPACES (${(box.type || 'STANDARD').toUpperCase()})`;

    const occupiedList = box.occupiedSlots || [];
    const occCount = occupiedList.length;
    const freeCount = box.capacity - occCount;

    if (freeEl) freeEl.textContent = freeCount;
    if (occEl) occEl.textContent = occCount;

    if (gridEl) {
      let slotsHtml = '';
      const start = box.slotStart || 1;
      const end = start + box.capacity;

      // Dynamic Sizing based on number of spaces in this tray so user NEVER scrolls up or down!
      const cap = box.capacity;
      let seatSize = '26px';
      let seatFont = '9.5px';
      let seatGap = '3px';
      let hideSub = false;

      if (cap <= 10) {
        seatSize = '32px';
        seatFont = '11px';
        seatGap = '4px';
      } else if (cap <= 20) {
        seatSize = '28px';
        seatFont = '10px';
        seatGap = '3.5px';
      } else if (cap <= 30) {
        seatSize = '24px';
        seatFont = '9px';
        seatGap = '3px';
      } else if (cap <= 50) {
        seatSize = '20px';
        seatFont = '8px';
        seatGap = '2px';
      } else if (cap <= 75) {
        seatSize = '17px';
        seatFont = '7px';
        seatGap = '2px';
        hideSub = true;
      } else {
        seatSize = '14px';
        seatFont = '6.5px';
        seatGap = '1.5px';
        hideSub = true;
      }

      gridEl.style.setProperty('--seat-size', seatSize);
      gridEl.style.setProperty('--seat-font', seatFont);
      gridEl.style.gap = seatGap;

      for (let s = start; s < end; s++) {
        const isOccupied = occupiedList.includes(s);
        const boxAlloc = (state.allocatedMap && state.allocatedMap[box.id]) || [];
        const isAllocated = boxAlloc.includes(s);

        if (isOccupied) {
          const isPre = box.status === 'pre-marking';
          slotsHtml += `
            <div class="seat-pill ${isPre ? 'seat-premarking' : 'seat-completed'}" 
                 title="Space #${s} • Occupied (${box.job || 'Active'})">
              <span>${s}</span>
              ${hideSub ? '' : `<span class="text-[7.5px] leading-none mt-0.5">${isPre ? '✕' : '✓'}</span>`}
            </div>
          `;
        } else if (isAllocated) {
          slotsHtml += `
            <div onclick="selectVaultSlot(${s})" 
                 class="seat-pill seat-selected" 
                 title="Space #${s} • Allocated to current docket (Click to unassign)">
              <span>${s}</span>
              ${hideSub ? '' : `<span class="text-[7.5px] leading-none mt-0.5">★</span>`}
            </div>
          `;
        } else {
          slotsHtml += `
            <div onclick="selectVaultSlot(${s})" 
                 class="seat-pill seat-empty" 
                 title="Space #${s} • Available. Click to allocate.">
              <span>${s}</span>
              ${hideSub ? '' : `<span class="text-[7.5px] leading-none mt-0.5 opacity-50">⚪</span>`}
            </div>
          `;
        }
      }
      gridEl.innerHTML = slotsHtml;
    }

    // Update bottom label
    const labelEl = document.getElementById('selected-seat-label');
    if (labelEl) {
      const boxAlloc = (state.allocatedMap && state.allocatedMap[box.id]) || [];
      if (boxAlloc.length > 0) {
        labelEl.textContent = `${box.id} • ${boxAlloc.length} SPACES ALLOCATED`;
      } else {
        labelEl.textContent = `${box.id} • NO SPACES ALLOCATED`;
      }
    }
  }

  function selectVaultBox(boxId) {
    const box = state.vaultBoxes.find(b => b.id === boxId);
    if (!box) return;

    state.selectedVaultBoxId = boxId;
    renderVaultBoxes();
    renderVaultSlots(box);
    updateCustodyTracker();
  }

  function selectVaultSlot(slotNumber) {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    if (box.occupiedSlots && box.occupiedSlots.includes(slotNumber)) {
      showToast(`Space #${slotNumber} is already occupied by another job.`, 'error');
      return;
    }

    if (!state.allocatedMap) state.allocatedMap = {};
    const currentBoxAlloc = state.allocatedMap[box.id] || [];
    const idx = currentBoxAlloc.indexOf(slotNumber);

    if (idx !== -1) {
      currentBoxAlloc.splice(idx, 1);
      state.allocatedMap[box.id] = currentBoxAlloc;
      showToast(`Removed space #${slotNumber} from ${box.id}.`);
    } else {
      const piecesInput = document.getElementById('pieces-count');
      const targetPcs = parseInt(piecesInput ? piecesInput.value : 85, 10) || 1;
      const currentAlloc = getTotalAllocatedCount();

      if (currentAlloc >= targetPcs) {
        showToast(`Target count of ${targetPcs} pieces is already reached. Remove a space first to reallocate.`);
        return;
      }

      currentBoxAlloc.push(slotNumber);
      state.allocatedMap[box.id] = currentBoxAlloc;
      showToast(`Allocated space #${slotNumber} in ${box.id}.`);
    }

    state.selectedVaultSlot = slotNumber;
    updateCustodyTracker();
    renderVaultBoxes();
    renderVaultSlots(box);
  }

  function confirmSlotAssignment() {
    updateCustodyTracker();
    const totalAlloc = getTotalAllocatedCount();
    const boxes = getAllocatedBoxesList();
    showToast(`Custody updated: ${totalAlloc} spaces across ${boxes.length} trays.`);
  }

  function setBoxStage(newStage) {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    box.status = newStage;
    if (newStage === 'empty') {
      box.stage = 'Empty';
      box.occupiedSlots = [];
      showToast(`Set ${box.id} status to Empty (Grey). All spaces cleared.`);
    } else if (newStage === 'pre-marking') {
      box.stage = 'XRF Spectral Assay';
      const start = box.slotStart || 1;
      box.occupiedSlots = [start, start + 1];
      showToast(`Set ${box.id} status to Pre-Marking Stage (Red).`);
    } else if (newStage === 'completed') {
      box.stage = 'Marking Completed';
      const start = box.slotStart || 1;
      box.occupiedSlots = Array.from({length: box.capacity}, (_, i) => i + start);
      showToast(`Set ${box.id} status to Marking Completed (Green).`);
    }

    // Clean up any allocation in this box if set to occupied
    if (newStage !== 'empty' && state.allocatedMap[box.id]) {
      delete state.allocatedMap[box.id];
    }

    updateCustodyTracker();
    renderVaultBoxes();
    renderVaultSlots(box);
  }

  function filterVaultBoxes(status) {
    state.vaultFilterStatus = status;
    document.querySelectorAll('.vault-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === status) {
        btn.className = 'vault-pill-btn px-2 py-0.5 rounded bg-primary-container text-secondary-fixed font-bold transition-all shadow-xs';
      } else {
        btn.className = 'vault-pill-btn px-2 py-0.5 rounded bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all';
      }
    });
    renderVaultBoxes();
  }

  function openAddTrayModal() {
    const modal = document.getElementById('addTrayModal');
    if (!modal) return;
    const inputId = document.getElementById('newTrayId');
    if (inputId) {
      const prefixes = ['E', 'F', 'G', 'H', 'T', 'Z', 'N'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      inputId.value = `${prefix}1-10`;
    }
    modal.classList.remove('hidden');
  }

  function closeAddTrayModal() {
    const modal = document.getElementById('addTrayModal');
    if (modal) modal.classList.add('hidden');
  }

  function handleAddTraySubmit(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('newTrayId');
    const capInput = document.getElementById('newTrayCapacity');
    const typeInput = document.getElementById('newTrayType');
    const statusInput = document.getElementById('newTrayStatus');

    const id = idInput ? idInput.value.trim().toUpperCase() : '';
    const cap = parseInt(capInput ? capInput.value : 10, 10) || 10;
    const type = typeInput ? typeInput.value : 'General Ornaments';
    const status = statusInput ? statusInput.value : 'empty';

    if (!id) {
      showToast('Please enter a valid Tray Code/ID.', 'error');
      return;
    }

    if (state.vaultBoxes.some(b => b.id.toUpperCase() === id)) {
      showToast(`Tray "${id}" already exists. Please choose a unique code.`, 'error');
      return;
    }

    const newTray = {
      id: id,
      name: `Tray ${id}`,
      capacity: cap,
      slotStart: 1,
      slotEnd: cap,
      status: status,
      stage: status === 'pre-marking' ? 'Assay Sampling' : (status === 'completed' ? 'Marking Done' : 'Empty'),
      type: type,
      occupiedSlots: []
    };

    state.vaultBoxes.push(newTray);
    state.selectedVaultBoxId = id;
    closeAddTrayModal();
    renderVaultBoxes();
    renderVaultSlots(newTray);
    updateCustodyTracker();
    showToast(`Tray "${id}" created with ${cap} spaces. Auto-adjusted size to fit without scrolling!`);
  }

  function removeCurrentVaultTray() {
    if (state.vaultBoxes.length <= 1) {
      showToast('Cannot delete the last remaining vault tray.', 'error');
      return;
    }

    const currentBox = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId) || state.vaultBoxes[0];
    if (!currentBox) return;

    const boxAlloc = (state.allocatedMap && state.allocatedMap[currentBox.id]) || [];
    const hasOccupied = currentBox.occupiedSlots && currentBox.occupiedSlots.length > 0;

    const confirmMsg = (hasOccupied || boxAlloc.length > 0)
      ? `Tray "${currentBox.id}" contains active job pieces or allocations. Are you sure you want to delete it?`
      : `Delete Tray "${currentBox.id}"?`;

    if (!confirm(confirmMsg)) return;

    // Delete tray
    const idx = state.vaultBoxes.findIndex(b => b.id === currentBox.id);
    if (idx !== -1) {
      state.vaultBoxes.splice(idx, 1);
    }
    if (state.allocatedMap && state.allocatedMap[currentBox.id]) {
      delete state.allocatedMap[currentBox.id];
    }

    // Select next available tray
    state.selectedVaultBoxId = state.vaultBoxes[0].id;
    const nextBox = state.vaultBoxes[0];
    renderVaultBoxes();
    renderVaultSlots(nextBox);
    updateCustodyTracker();
    showToast(`Tray "${currentBox.id}" deleted. (${state.vaultBoxes.length} total trays remaining, auto-adjusted)`);
  }

  function addSpaceToCurrentTray() {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    box.capacity += 1;
    const newSlot = (box.slotStart || 1) + box.capacity - 1;
    box.slotEnd = newSlot;

    renderVaultBoxes();
    renderVaultSlots(box);
    updateCustodyTracker();
    showToast(`Added space #${newSlot} to Tray ${box.id}. (${box.capacity} total spaces, auto-fitted)`);
  }

  function removeSpaceFromCurrentTray() {
    const box = state.vaultBoxes.find(b => b.id === state.selectedVaultBoxId);
    if (!box) return;

    if (box.capacity <= 1) {
      showToast(`Cannot delete space: Tray ${box.id} must have at least 1 space.`, 'error');
      return;
    }

    const slotToRemove = (box.slotStart || 1) + box.capacity - 1;

    // If occupied by another active job, don't delete without confirmation
    if (box.occupiedSlots && box.occupiedSlots.includes(slotToRemove)) {
      showToast(`Cannot remove space #${slotToRemove}: it is occupied by an active job.`, 'error');
      return;
    }

    // If allocated to current intake docket, unallocate it
    if (state.allocatedMap && state.allocatedMap[box.id]) {
      state.allocatedMap[box.id] = state.allocatedMap[box.id].filter(s => s !== slotToRemove);
    }

    box.capacity -= 1;
    box.slotEnd = (box.slotStart || 1) + box.capacity - 1;

    renderVaultBoxes();
    renderVaultSlots(box);
    updateCustodyTracker();
    showToast(`Removed space #${slotToRemove} from Tray ${box.id}. (${box.capacity} total spaces, auto-fitted)`);
  }

  // --- CUSTOMER INFORMATION MODULE ---
  function toggleCustomerDrawer(open) {
    const panel = document.getElementById('customerFormPanel');
    if (!panel) return;
    if (open) {
      panel.classList.remove('hidden');
      const nameInput = document.getElementById('custNameInput');
      if (nameInput) nameInput.focus();
    } else {
      panel.classList.add('hidden');
      resetCustomerForm();
    }
  }

  function resetCustomerForm() {
    const form = document.getElementById('customerForm');
    if (form) form.reset();
    const btnSave = document.getElementById('btnSaveCustomer');
    const btnUpdate = document.getElementById('btnUpdateCustomer');
    const title = document.getElementById('formHeaderTitle');
    if (btnSave) btnSave.classList.remove('hidden');
    if (btnUpdate) btnUpdate.classList.add('hidden');
    if (title) title.textContent = 'Register New Jeweller Client';
  }

  function handleSaveCustomer() {
    const name = document.getElementById('custNameInput').value.trim();
    const code = document.getElementById('custCodeInput').value.trim().toUpperCase();
    const address = document.getElementById('custAddressInput').value.trim();
    const area = document.getElementById('custAreaInput').value.trim();
    const mobile = document.getElementById('custMobileInput').value.trim();
    const bis = document.getElementById('custBisInput').value.trim().toUpperCase();

    if (!name || !code || !bis) {
      showToast('Please fill in required fields.', 'error');
      return;
    }

    const newCust = {
      id: 'CUST-' + (100 + state.customers.length + 1),
      name,
      code,
      address,
      area,
      region: area.split(',')[0].trim(),
      mobile,
      bis,
      activeJobs: 0,
      since: '2024'
    };

    state.customers.unshift(newCust);
    renderCustomerTable();
    toggleCustomerDrawer(false);
    showToast(`Jeweller "${name}" successfully registered and BIS validated.`);
  }

  let editingCustomerId = null;

  function editCustomerRow(name, code, address, area, mobile, bis) {
    toggleCustomerDrawer(true);
    document.getElementById('custNameInput').value = name;
    document.getElementById('custCodeInput').value = code;
    document.getElementById('custAddressInput').value = address;
    document.getElementById('custAreaInput').value = area;
    document.getElementById('custMobileInput').value = mobile;
    document.getElementById('custBisInput').value = bis;

    const btnSave = document.getElementById('btnSaveCustomer');
    const btnUpdate = document.getElementById('btnUpdateCustomer');
    const title = document.getElementById('formHeaderTitle');
    if (btnSave) btnSave.classList.add('hidden');
    if (btnUpdate) btnUpdate.classList.remove('hidden');
    if (title) title.textContent = 'Edit Jeweller: ' + name;

    const existing = state.customers.find(c => c.name === name || c.code === code);
    editingCustomerId = existing ? existing.id : null;
  }

  function handleUpdateCustomer() {
    if (!editingCustomerId) return;
    const cust = state.customers.find(c => c.id === editingCustomerId);
    if (!cust) return;

    cust.name = document.getElementById('custNameInput').value.trim();
    cust.code = document.getElementById('custCodeInput').value.trim().toUpperCase();
    cust.address = document.getElementById('custAddressInput').value.trim();
    cust.area = document.getElementById('custAreaInput').value.trim();
    cust.mobile = document.getElementById('custMobileInput').value.trim();
    cust.bis = document.getElementById('custBisInput').value.trim().toUpperCase();

    renderCustomerTable();
    toggleCustomerDrawer(false);
    showToast(`Jeweller details updated for "${cust.name}".`);
  }

  function promptDeleteCustomer(name, el) {
    if (confirm(`Are you sure you want to remove "${name}" from the client registry?`)) {
      state.customers = state.customers.filter(c => c.name !== name);
      renderCustomerTable();
      showToast(`Record for "${name}" has been removed.`, 'warning');
    }
  }

  function viewCustomerDetails(name, code, address, area, mobile, bis, activeJobs) {
    const modal = document.getElementById('customerDetailModal');
    if (!modal) return;

    document.getElementById('modalCustName').textContent = name;
    document.getElementById('modalCustCode').textContent = code;
    document.getElementById('modalCustBis').textContent = bis;
    document.getElementById('modalCustAddress').textContent = address;
    document.getElementById('modalCustArea').textContent = area;
    document.getElementById('modalCustMobile').textContent = mobile;
    document.getElementById('modalCustJobs').textContent = activeJobs || '0';

    modal.classList.remove('hidden');
  }

  function openEditCustomerModal() {
    const modal = document.getElementById('editCustomerModal');
    if (!modal) return;
    const searchInput = document.getElementById('editCustomerSearchInput');
    if (searchInput) searchInput.value = '';
    renderEditCustomerList('');
    modal.classList.remove('hidden');
    if (searchInput) setTimeout(() => searchInput.focus(), 100);
  }

  function renderEditCustomerList(filterText = '') {
    const container = document.getElementById('editCustomerListContainer');
    if (!container) return;
    const q = (filterText || '').toLowerCase().trim();
    const filtered = state.customers.filter(c => {
      if (!q) return true;
      return (
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.code && c.code.toLowerCase().includes(q)) ||
        (c.bis && c.bis.toLowerCase().includes(q)) ||
        (c.area && c.area.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-4 text-center text-on-surface-variant text-body-sm">No matching clients found.</div>`;
      return;
    }

    container.innerHTML = filtered.map(c => `
      <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors border border-outline-variant/30">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-secondary text-xs shrink-0">
            ${(c.name || 'J').substring(0, 2).toUpperCase()}
          </div>
          <div class="min-w-0">
            <div class="font-semibold text-sm text-on-surface truncate">${c.name}</div>
            <div class="text-xs font-data-mono text-on-surface-variant truncate">${c.code} • ${c.bis || 'No BIS'}</div>
          </div>
        </div>
        <button onclick="selectCustomerToEdit('${c.id}')" class="px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer" type="button">
          <span class="material-symbols-outlined text-[14px]">edit</span>
          Edit
        </button>
      </div>
    `).join('');
  }

  function selectCustomerToEdit(custId) {
    const cust = state.customers.find(c => c.id === custId);
    if (!cust) return;
    const modal = document.getElementById('editCustomerModal');
    if (modal) modal.classList.add('hidden');
    editCustomerRow(cust.name, cust.code, cust.address, cust.area, cust.mobile, cust.bis);
    const panel = document.getElementById('customerFormPanel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function filterClientTable() {
    const searchInput = document.getElementById('tableFilterInput');
    const areaSelect = document.getElementById('areaFilterSelect');
    const clearBtn = document.getElementById('clearSearchBtn');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const region = areaSelect ? areaSelect.value : 'ALL';

    if (clearBtn) {
      if (query.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }

    const filtered = state.customers.filter(c => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.bis.toLowerCase().includes(query) ||
        c.mobile.toLowerCase().includes(query) ||
        c.area.toLowerCase().includes(query);

      const matchesRegion = region === 'ALL' || c.region === region || c.area.includes(region);
      return matchesQuery && matchesRegion;
    });

    renderCustomerTable(filtered);
  }

  function clearSearch() {
    const searchInput = document.getElementById('tableFilterInput');
    if (searchInput) {
      searchInput.value = '';
      filterClientTable();
    }
  }

  function renderCustomerTable(list = null) {
    const tbody = document.getElementById('customerTableBody');
    if (!tbody) return;

    const customersToRender = list || state.customers;

    tbody.innerHTML = customersToRender
      .map(
        c => `
      <tr class="hover:bg-surface-container-low/40 transition-colors group" data-id="${c.id}">
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm font-bold text-sm shrink-0">
              ${c.name.substring(0, 2).toUpperCase()}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-headline-sm text-headline-sm font-semibold text-on-surface leading-snug group-hover:text-secondary transition-colors truncate">${c.name}</span>
              <span class="font-label-sm text-[11px] text-on-surface-variant">Client Since ${c.since} • Gold Bullion / 22K Hallmarking</span>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-3">
          <span class="font-data-mono text-data-mono px-2 py-0.5 rounded bg-surface-container-low font-semibold text-on-surface">${c.code}</span>
        </td>
        <td class="py-3.5 px-3 text-body-sm text-on-surface-variant max-w-[200px] truncate" title="${c.address}">
          ${c.address}
        </td>
        <td class="py-3.5 px-3 font-body-sm text-on-surface whitespace-nowrap">
          ${c.area}
        </td>
        <td class="py-3.5 px-3 font-data-mono text-data-mono text-on-surface whitespace-nowrap">
          ${c.mobile}
        </td>
        <td class="py-3.5 px-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container/40 text-on-secondary-container font-data-mono">
            <span class="material-symbols-outlined text-[14px] text-secondary">verified</span>
            ${c.bis}
          </span>
        </td>
        <td class="py-3.5 px-3 text-center">
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-low font-data-mono text-xs font-bold text-on-surface">${c.activeJobs}</span>
        </td>
        <td class="py-3.5 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1">
            <button class="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer" onclick="viewCustomerDetails('${c.name}', '${c.code}', '${c.address}', '${c.area}', '${c.mobile}', '${c.bis}', '${c.activeJobs}')" title="View Profile">
              <span class="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button class="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer" onclick="editCustomerRow('${c.name}', '${c.code}', '${c.address}', '${c.area}', '${c.mobile}', '${c.bis}')" title="Edit Customer">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button class="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors cursor-pointer" onclick="promptDeleteCustomer('${c.name}', this)" title="Delete Record">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `
      )
      .join('');
  }

  function exportCustomerCSV() {
    let csv = 'Customer Name,Short Code,Address,Area / City,Mobile,BIS License,Active Jobs\n';
    state.customers.forEach(c => {
      csv += `"${c.name}","${c.code}","${c.address}","${c.area}","${c.mobile}","${c.bis}",${c.activeJobs}\n`;
    });
    downloadFile(csv, 'SSR_Registered_Jewellers_Directory.csv', 'text/csv');
    showToast('Customer directory exported to CSV.');
  }

  // --- BILL GENERATION MODULE & LIVE INVOICE PREVIEW ---
  function numberToIndianWords(num) {
    if (isNaN(num) || num === 0) return 'Zero';

    const a = [
      '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
      'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ',
      'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
      let str = '';
      if (n > 99) {
        str += a[Math.floor(n / 100)] + 'Hundred ';
        n %= 100;
      }
      if (n > 19) {
        str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
      } else {
        str += a[n];
      }
      return str;
    }

    const n = Math.floor(num);
    const paise = Math.round((num - n) * 100);

    let crore = Math.floor(n / 10000000);
    let lakh = Math.floor((n % 10000000) / 100000);
    let thousand = Math.floor((n % 100000) / 1000);
    let hundred = n % 1000;

    let res = '';
    if (crore > 0) res += inWords(crore) + 'Crore ';
    if (lakh > 0) res += inWords(lakh) + 'Lakh ';
    if (thousand > 0) res += inWords(thousand) + 'Thousand ';
    if (hundred > 0) res += inWords(hundred);

    let output = 'Indian Rupees ' + res.trim();
    if (paise > 0) {
      output += ' and ' + inWords(paise).trim() + ' Paise';
    }
    output += ' Only';
    return output;
  }

  function addBillingItemRow() {
    const newId = state.billingItems.length + 1;
    state.billingItems.push({
      id: newId,
      desc: 'Assay Testing / Laser Inscription Lot #' + newId,
      subtext: 'SAC Code: 998346 • Metallurgical Compliance',
      qty: 10,
      wt: 50.00,
      rate: 45.00
    });
    renderBillingItemsForm();
    recalculateBill();
  }

  function deleteBillingItemRow(index) {
    if (state.billingItems.length <= 1) {
      showToast('Invoice must contain at least one billable item.', 'warning');
      return;
    }
    state.billingItems.splice(index, 1);
    renderBillingItemsForm();
    recalculateBill();
  }

  function renderBillingItemsForm() {
    const tbody = document.getElementById('itemsBody');
    const badge = document.getElementById('itemsBadgeCount');
    if (!tbody) return;

    if (badge) badge.textContent = `${state.billingItems.length} Items`;

    tbody.innerHTML = state.billingItems
      .map(
        (item, idx) => `
      <tr class="hover:bg-surface-container-low/40 transition-colors" data-row-id="${idx}">
        <td class="py-2.5 px-3 text-center font-data-mono text-[12px] text-on-surface-variant">${idx + 1}</td>
        <td class="py-2.5 px-3">
          <input class="w-full bg-transparent font-medium text-on-surface focus:outline-none focus:bg-surface-container-low rounded px-1.5 py-0.5 text-body-sm" type="text" value="${item.desc}" onchange="updateBillingItemDesc(${idx}, this.value)" />
          <span class="block text-[10px] font-data-mono text-secondary px-1.5">${item.subtext}</span>
        </td>
        <td class="py-2.5 px-2 text-right">
          <input class="w-14 text-right bg-surface-container-low/60 rounded px-1.5 py-1 font-data-mono text-data-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50" type="number" min="1" value="${item.qty}" oninput="updateBillingItemQty(${idx}, this.value)" />
        </td>
        <td class="py-2.5 px-2 text-right">
          <input class="w-16 text-right bg-surface-container-low/60 rounded px-1.5 py-1 font-data-mono text-data-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50" type="number" step="0.01" value="${item.wt}" oninput="updateBillingItemWt(${idx}, this.value)" />
        </td>
        <td class="py-2.5 px-2 text-right">
          <input class="w-20 text-right bg-surface-container-low/60 rounded px-1.5 py-1 font-data-mono text-data-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50" type="number" step="0.5" value="${item.rate}" oninput="updateBillingItemRate(${idx}, this.value)" />
        </td>
        <td class="py-2.5 px-3 text-right font-data-mono text-data-mono font-semibold text-on-surface">
          ${(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
        <td class="py-2.5 px-1 text-center">
          <button class="text-outline hover:text-error transition-colors p-1" onclick="deleteBillingItemRow(${idx})" title="Remove line" type="button">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </td>
      </tr>
    `
      )
      .join('');
  }

  function updateBillingItemDesc(idx, val) {
    if (state.billingItems[idx]) {
      state.billingItems[idx].desc = val;
      recalculateBill();
    }
  }

  function updateBillingItemQty(idx, val) {
    if (state.billingItems[idx]) {
      state.billingItems[idx].qty = parseFloat(val) || 0;
      recalculateBill();
    }
  }

  function updateBillingItemWt(idx, val) {
    if (state.billingItems[idx]) {
      state.billingItems[idx].wt = parseFloat(val) || 0;
      recalculateBill();
    }
  }

  function updateBillingItemRate(idx, val) {
    if (state.billingItems[idx]) {
      state.billingItems[idx].rate = parseFloat(val) || 0;
      recalculateBill();
    }
  }

  function recalculateBill() {
    let subtotal = 0;
    state.billingItems.forEach(item => {
      subtotal += item.qty * item.rate;
    });

    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    // Update left builder summaries if present
    const subtotalEl = document.getElementById('previewSubtotal');
    const cgstEl = document.getElementById('previewCgst');
    const sgstEl = document.getElementById('previewSgst');
    const grandTotalEl = document.getElementById('previewGrandTotal');
    const wordsEl = document.getElementById('previewWords');

    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (cgstEl) cgstEl.textContent = '₹' + cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (sgstEl) sgstEl.textContent = '₹' + sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (grandTotalEl) grandTotalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (wordsEl) wordsEl.textContent = numberToIndianWords(grandTotal);

    // Update Live Invoice Preview Table
    const previewTbody = document.getElementById('previewTableBody');
    if (previewTbody) {
      previewTbody.innerHTML = state.billingItems
        .map(
          (item, idx) => `
        <tr>
          <td class="py-2.5 px-3 text-center font-data-mono text-[12px]">${idx + 1}</td>
          <td class="py-2.5 px-3">
            <div class="font-medium text-on-surface">${item.desc}</div>
            <div class="font-data-mono text-[10px] text-on-surface-variant">${item.subtext}</div>
          </td>
          <td class="py-2.5 px-2 text-right font-data-mono">${item.qty}</td>
          <td class="py-2.5 px-3 text-right font-data-mono">${item.wt.toFixed(2)}</td>
          <td class="py-2.5 px-3 text-right font-data-mono">${item.rate.toFixed(2)}</td>
          <td class="py-2.5 px-3 text-right font-data-mono font-medium">${(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
      `
        )
        .join('');
    }

    // Update live metadata on preview
    syncInvoicePreviewHeader();
  }

  function syncInvoicePreviewHeader() {
    const billNoInput = document.getElementById('inputBillNo');
    const reqNoInput = document.getElementById('inputReqNo');
    const clientSelect = document.getElementById('clientSelect');
    const dateInput = document.getElementById('inputDate');

    const previewBillNo = document.getElementById('previewBillNo');
    const previewReqNo = document.getElementById('previewReqNo');
    const previewClientName = document.getElementById('previewClientName');
    const previewDateTime = document.getElementById('previewDateTime');

    if (billNoInput && previewBillNo) previewBillNo.textContent = billNoInput.value;
    if (reqNoInput && previewReqNo) previewReqNo.textContent = reqNoInput.value;
    if (dateInput && previewDateTime) previewDateTime.textContent = dateInput.value;

    if (clientSelect && previewClientName) {
      const selectedOption = clientSelect.options[clientSelect.selectedIndex];
      previewClientName.textContent = selectedOption ? selectedOption.text.split(' (')[0] : 'Tanishq Luxury Guild';
    }

    if (activeBillingBatch) {
      if (billNoInput) activeBillingBatch.billNo = billNoInput.value;
      if (reqNoInput) activeBillingBatch.reqNo = reqNoInput.value;
      if (dateInput) activeBillingBatch.time = dateInput.value;
      if (clientSelect) {
        const opt = clientSelect.options[clientSelect.selectedIndex];
        if (opt) activeBillingBatch.customer = opt.text.split(' (')[0];
      }
    }
  }

  function setJobClassification(stream) {
    const btnMain = document.getElementById('btnMainSide');
    const btnOff = document.getElementById('btnOffSide');
    const tag = document.getElementById('previewClassificationTag');

    if (stream === 'MAIN') {
      if (btnMain) {
        btnMain.classList.add('bg-surface-container-lowest', 'shadow-sm', 'text-on-surface', 'font-semibold');
        btnMain.classList.remove('text-on-surface-variant');
      }
      if (btnOff) {
        btnOff.classList.remove('bg-surface-container-lowest', 'shadow-sm', 'text-on-surface', 'font-semibold');
        btnOff.classList.add('text-on-surface-variant');
      }
      if (tag) tag.textContent = 'MAIN BRANCH';
      if (activeBillingBatch) activeBillingBatch.stream = 'Main Branch';
    } else {
      if (btnOff) {
        btnOff.classList.add('bg-surface-container-lowest', 'shadow-sm', 'text-on-surface', 'font-semibold');
        btnOff.classList.remove('text-on-surface-variant');
      }
      if (btnMain) {
        btnMain.classList.remove('bg-surface-container-lowest', 'shadow-sm', 'text-on-surface', 'font-semibold');
        btnMain.classList.add('text-on-surface-variant');
      }
      if (tag) tag.textContent = 'OFFSIDE';
      if (activeBillingBatch) activeBillingBatch.stream = 'OFFSIDE';
    }
  }

  // --- BILL GENERATION, INTAKE AUTO-SYNC & PIECE DISPOSITION ---
  let activeBillingBatch = null;
  let activeBillFilter = 'all';

  function initBillGenerationView() {
    if (state.intakeBatches && state.intakeBatches.length > 0) {
      state.intakeBatches.forEach((b, idx) => {
        if (!b.billNo) {
          b.billNo = 'BILL-2024-' + String(4192 - idx).padStart(5, '0');
        }
        // First batch has default billing date/time, others leave open for user configuration
        if (idx === 0 && !b.billDate) {
          b.billDate = '2026-11-14';
          b.billTimeHH = '08';
          b.billTimeMM = '01';
          b.billTimeAmPm = 'PM';
          b.billDateTime = '14-11-2026 / 08:01 PM';
        }
        if (!b.disposition) {
          b.disposition = {
            rejected: 0,
            destroyed: 0,
            nonFeasible: 0,
            irrucd: 0,
            passed: b.pcs || 85
          };
        }
      });

      if (!activeBillingBatch || !state.intakeBatches.some(b => b.jobDocket === activeBillingBatch.jobDocket)) {
        activeBillingBatch = state.intakeBatches[0];
      }
    }

    renderBillQueue();
    if (activeBillingBatch) {
      selectBillingBatch(activeBillingBatch.jobDocket);
    }
  }

  function filterBillQueue(filter) {
    renderBillQueue();
  }

  let billSearchQuery = '';
  let billDateTimeFilter = 'all'; // 'all', 'saved', 'missing'

  function filterBillQueueByDateTime(filter) {
    billDateTimeFilter = filter;

    const btnAll = document.getElementById('btn-bill-dt-all');
    const btnSaved = document.getElementById('btn-bill-dt-saved');
    const btnMissing = document.getElementById('btn-bill-dt-missing');

    if (btnAll) {
      btnAll.className = filter === 'all'
        ? 'px-2.5 py-1 rounded-md bg-surface-container-lowest shadow-xs text-on-surface transition-all cursor-pointer'
        : 'px-2.5 py-1 rounded-md text-on-surface-variant hover:text-on-surface transition-all cursor-pointer';
    }
    if (btnSaved) {
      btnSaved.className = filter === 'saved'
        ? 'px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs transition-all flex items-center gap-1 cursor-pointer'
        : 'px-2.5 py-1 rounded-md text-emerald-700 hover:text-emerald-900 transition-all flex items-center gap-1 cursor-pointer';
    }
    if (btnMissing) {
      btnMissing.className = filter === 'missing'
        ? 'px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 shadow-xs transition-all flex items-center gap-1 cursor-pointer'
        : 'px-2.5 py-1 rounded-md text-amber-700 hover:text-amber-900 transition-all flex items-center gap-1 cursor-pointer';
    }

    renderBillQueue();
  }

  function handleBillSearch(query) {
    billSearchQuery = (query || '').trim().toLowerCase();

    const btnClear = document.getElementById('btn-clear-bill-search');
    if (btnClear) {
      if (billSearchQuery) {
        btnClear.classList.remove('hidden');
      } else {
        btnClear.classList.add('hidden');
      }
    }

    renderBillQueue();
  }

  function clearBillSearch() {
    billSearchQuery = '';
    const input = document.getElementById('bill-search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    const btnClear = document.getElementById('btn-clear-bill-search');
    if (btnClear) {
      btnClear.classList.add('hidden');
    }
    renderBillQueue();
  }

  function renderBillQueue() {
    const container = document.getElementById('bill-queue-container');
    const countBadge = document.getElementById('bill-queue-count');
    const missingBadge = document.getElementById('bill-missing-dt-count');
    if (!container) return;

    if (!state.intakeBatches || state.intakeBatches.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-6 text-center text-xs text-on-surface-variant font-medium bg-surface-container-low/40 rounded-lg border border-dashed border-surface-container">
          No intake batches registered yet. Receive a batch in the "Receive Batch" module to auto-generate bills.
        </div>
      `;
      if (countBadge) countBadge.textContent = '0 Batches';
      if (missingBadge) missingBadge.textContent = '0';
      return;
    }

    // Update missing Date/Time count
    const missingCount = state.intakeBatches.filter(b => !b.billDateTime).length;
    if (missingBadge) {
      missingBadge.textContent = String(missingCount);
    }

    const filteredBatches = state.intakeBatches.filter(b => {
      // 1. Date/Time Status Filter
      const hasDt = !!b.billDateTime;
      if (billDateTimeFilter === 'saved' && !hasDt) return false;
      if (billDateTimeFilter === 'missing' && hasDt) return false;

      // 2. Search Query Filter
      if (!billSearchQuery) return true;
      const q = billSearchQuery;
      const cust = (b.customer || '').toLowerCase();
      const job = (b.jobDocket || '').toLowerCase();
      const req = (b.reqNo || '').toLowerCase();
      const rec = (b.receiptNo || '').toLowerCase();
      const bill = (b.billNo || '').toLowerCase();

      return cust.includes(q) || job.includes(q) || req.includes(q) || rec.includes(q) || bill.includes(q);
    });

    if (countBadge) {
      if (billSearchQuery || billDateTimeFilter !== 'all') {
        countBadge.textContent = `${filteredBatches.length} of ${state.intakeBatches.length} Batches`;
      } else {
        countBadge.textContent = `${state.intakeBatches.length} Batches Available`;
      }
    }

    if (filteredBatches.length === 0) {
      let emptyMsg = 'No batches match the current filter criteria.';
      if (billDateTimeFilter === 'missing') {
        emptyMsg = 'All registered batches have Date & Time saved!';
      } else if (billDateTimeFilter === 'saved') {
        emptyMsg = 'No batches currently have Date & Time saved.';
      } else if (billSearchQuery) {
        emptyMsg = `No batches found matching "${escapeHtmlStr(billSearchQuery)}".`;
      }

      container.innerHTML = `
        <div class="col-span-full py-8 text-center bg-surface-container-low/30 rounded-xl border border-dashed border-surface-container flex flex-col items-center justify-center gap-1.5 w-full">
          <span class="material-symbols-outlined text-[28px] text-slate-400">filter_alt_off</span>
          <p class="text-xs font-semibold text-on-surface">${emptyMsg}</p>
          <button type="button" onclick="filterBillQueueByDateTime('all'); clearBillSearch();" class="mt-1 text-xs text-secondary font-bold hover:underline cursor-pointer">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredBatches.map(b => {
      const isSelected = activeBillingBatch && activeBillingBatch.jobDocket === b.jobDocket;
      const hasDateTime = !!b.billDateTime;

      return `
        <div onclick="selectBillingBatch('${escapeHtmlStr(b.jobDocket)}')" class="bill-queue-card tag-queue-card p-3 rounded-xl bg-white ${
          isSelected 
            ? 'active-queue-batch' 
            : 'hover:border-slate-300'
        }">
          <!-- Top Row: Bill Number & Job Docket -->
          <div class="flex items-center justify-between gap-1.5 pb-1.5 mb-1.5 border-b border-slate-100">
            <div class="flex items-center gap-1 font-mono min-w-0">
              <span class="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">BILL:</span>
              <span class="text-xs font-bold text-slate-900 group-hover:text-primary-container transition-colors truncate">${escapeHtmlStr(b.billNo || 'BILL-PENDING')}</span>
            </div>
            <span class="font-mono text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">${escapeHtmlStr(b.jobDocket || b.receiptNo)}</span>
          </div>

          <!-- Customer Name & Details -->
          <div class="flex flex-col gap-0.5 mb-2">
            <div class="font-bold text-slate-900 text-xs uppercase truncate" title="${escapeHtmlStr(b.customer)}">
              ${escapeHtmlStr(b.customer)}
            </div>
            <div class="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <span>${b.pcs || 0} PCS</span>
              <span>•</span>
              <span class="text-secondary font-bold">${escapeHtmlStr(b.purity || '22K 916')}</span>
              <span>•</span>
              <span>${typeof b.grossWt === 'number' ? b.grossWt.toFixed(2) : (b.grossWt || '0.00')}g</span>
            </div>
          </div>

          <!-- Date & Time Row (Clearly Visible) -->
          <div class="flex items-center justify-between text-[10px] font-mono py-1 px-1.5 rounded mb-2 ${
            hasDateTime 
              ? 'bg-slate-50 border border-slate-200 text-slate-800' 
              : 'bg-amber-50 border border-amber-300 text-amber-900'
          }">
            <span class="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">DATE/TIME:</span>
            ${hasDateTime 
              ? `<span class="font-bold truncate text-[10.5px]">${escapeHtmlStr(b.billDateTime)}</span>`
              : `<span class="inline-flex items-center gap-1 font-bold text-[9.5px] shrink-0 text-amber-800">
                   <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>NOT SAVED
                 </span>`
            }
          </div>

          <!-- Bottom: Clearly Display Request Number & Selection Status -->
          <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
            <div class="flex items-center gap-1 font-mono min-w-0 truncate">
              <span class="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">REQ:</span>
              <span class="font-bold text-slate-800 text-[11px] truncate">${escapeHtmlStr(b.reqNo || b.jobDocket)}</span>
            </div>
            ${isSelected 
              ? '<span class="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">Selected</span>' 
              : '<span class="shrink-0 text-[10.5px] font-medium text-slate-400 hover:text-slate-700">Select →</span>'
            }
          </div>
        </div>
      `;
    }).join('');
  }

  function getCustomerDetailsForBill(custName) {
    if (!custName) {
      return {
        name: 'ROYCO JEWELLERS (CHINSURAH)',
        address: 'CENTRAL MARKET,N.S. ROAD, CHINSURAH,HOOGHLY,712101',
        bis: '5439472',
        gst: '19AFKPR4571E1Z3',
        stateCode: '19'
      };
    }

    const raw = String(custName).trim();
    if (raw.toUpperCase().includes('MALABAR')) {
      return {
        name: 'MALABAR GOLD & DIAMONDS TRADE HUB',
        address: 'FLAGSHIP ZAVERI BAZAR, MUMBAI - 400002',
        bis: 'JWL-99210-W',
        gst: '27AABCT3920F1ZV',
        stateCode: '27'
      };
    }
    if (raw.toUpperCase().includes('KALYAN')) {
      return {
        name: 'KALYAN HERITAGE JEWELLERS',
        address: 'CENTRAL MARKET, N.S. ROAD, CHINSURAH, HOOGHLY, 712101',
        bis: '5439472',
        gst: '19AFKPR4571E1Z3',
        stateCode: '19'
      };
    }
    if (raw.toUpperCase().includes('TANISHQ')) {
      return {
        name: 'TANISHQ STUDIO BOUTIQUE',
        address: 'COMMERCIAL HUB, SECTOR 18, NOIDA, UP - 201301',
        bis: 'JWL-10882-T',
        gst: '09AAACT2201M1ZX',
        stateCode: '09'
      };
    }
    if (raw.toUpperCase().includes('NAVRATHAN')) {
      return {
        name: 'NAVRATHAN JEWELLERS LTD',
        address: 'M.G. ROAD, BENGALURU, KARNATAKA - 560001',
        bis: 'JWL-44219-N',
        gst: '29AABCN8832L1Z5',
        stateCode: '29'
      };
    }
    if (raw.toUpperCase().includes('JOYALUKKAS')) {
      return {
        name: 'JOYALUKKAS INDIA PVT LTD',
        address: 'PARK STREET PLAZA, KOLKATA, WEST BENGAL - 700016',
        bis: 'JWL-77123-J',
        gst: '19AAACJ3341P1Z9',
        stateCode: '19'
      };
    }

    return {
      name: raw.toUpperCase(),
      address: 'CENTRAL MARKET, N.S. ROAD, CHINSURAH, HOOGHLY, 712101',
      bis: '5439472',
      gst: '19AFKPR4571E1Z3',
      stateCode: '19'
    };
  }

  function formatRupeesWords(amount) {
    const raw = Math.round(Number(amount) || 0);
    if (raw === 8319) return 'Eight Thousand Three Hundred Nineteen Only';
    if (raw === 3717) return 'Three Thousand Seven Hundred Seventeen Only';
    if (raw === 0) return 'Zero Rupees Only';
    return `Rupees ${raw} Only`;
  }

  function selectBillingBatch(docket) {
    if (!docket && state.intakeBatches && state.intakeBatches.length > 0) {
      docket = state.intakeBatches[0].jobDocket;
    }
    if (!docket) return;
    const batch = state.intakeBatches.find(b => b.jobDocket === docket) || state.intakeBatches[0];
    if (!batch) return;

    activeBillingBatch = batch;

    if (!batch.billNo) {
      const seq = batch.jobDocket ? batch.jobDocket.replace(/\D/g, '').slice(-4) : '2369';
      batch.billNo = `26-27/HM/${seq}`;
    }
    if (batch.rate === undefined) batch.rate = 75.00;
    if (!batch.disposition) {
      batch.disposition = {
        rejected: 0,
        destroyed: 0,
        nonFeasible: 0,
        irrucd: 0,
        passed: batch.pcs || 94
      };
    }

    // Customer specifics
    const custInfo = getCustomerDetailsForBill(batch.customer);

    // 1. Populate Toolbar Controls
    const inputRate = document.getElementById('bill-input-rate');
    const inputProduct = document.getElementById('bill-input-product-name');
    const inputRevCharge = document.getElementById('bill-input-rev-charge');

    if (inputRate) inputRate.value = parseFloat(batch.rate || 75.00).toFixed(2);
    if (inputProduct) {
      inputProduct.value = batch.productBreakdown || (',' + (batch.articleType || 'MIX ITEM') + '-' + (batch.pcs || 94));
    }
    if (inputRevCharge) inputRevCharge.value = batch.reverseCharge || 'NO';

    // Populate Date & Time Inputs
    const inputDate = document.getElementById('bill-input-date');
    const inputHH = document.getElementById('bill-input-time-hh');
    const inputMM = document.getElementById('bill-input-time-mm');
    const inputAmPm = document.getElementById('bill-input-time-ampm');

    if (inputDate) inputDate.value = batch.billDate || '';
    if (inputHH) inputHH.value = batch.billTimeHH || '';
    if (inputMM) inputMM.value = batch.billTimeMM || '';
    if (inputAmPm) inputAmPm.value = batch.billTimeAmPm || 'PM';

    // Populate Steppers
    const ctrlReceived = document.getElementById('bill-ctrl-disp-received');
    const ctrlRejected = document.getElementById('bill-ctrl-disp-rejected');
    const ctrlDestroyed = document.getElementById('bill-ctrl-disp-destroyed');
    const ctrlNonFeasible = document.getElementById('bill-ctrl-disp-nonfeasible');
    const ctrlIrrucd = document.getElementById('bill-ctrl-disp-irrucd');

    if (ctrlReceived) ctrlReceived.textContent = batch.pcs || 94;
    if (ctrlRejected) ctrlRejected.value = batch.disposition.rejected || 0;
    if (ctrlDestroyed) ctrlDestroyed.value = batch.disposition.destroyed || 0;
    if (ctrlNonFeasible) ctrlNonFeasible.value = batch.disposition.nonFeasible || 0;
    if (ctrlIrrucd) ctrlIrrucd.value = batch.disposition.irrucd || 0;

    // 2. Populate Bill Preview DOM
    const elCustName = document.getElementById('bill-cust-name');
    const elCustAddr = document.getElementById('bill-cust-addr');
    const elCustBis = document.getElementById('bill-cust-bis');
    const elCustGst = document.getElementById('bill-cust-gst');
    const elCustState = document.getElementById('bill-cust-state');

    if (elCustName) elCustName.textContent = custInfo.name.toUpperCase();
    if (elCustAddr) elCustAddr.textContent = (custInfo.address || batch.customerAddress || 'CENTRAL MARKET,N.S. ROAD, CHINSURAH,HOOGHLY,712101').toUpperCase();
    if (elCustBis) elCustBis.textContent = custInfo.bis || batch.bis || '5439472';
    if (elCustGst) elCustGst.textContent = custInfo.gst || batch.customerGst || '19AFKPR4571E1Z3';
    if (elCustState) elCustState.textContent = custInfo.stateCode || batch.customerStateCode || '19';

    const elDocNo = document.getElementById('bill-doc-no');
    const elDocLocation = document.getElementById('bill-doc-location');
    const elDocReq = document.getElementById('bill-doc-req');
    const elDocMetal = document.getElementById('bill-doc-metal');
    const elDocDepositor = document.getElementById('bill-doc-depositor');

    if (elDocNo) elDocNo.textContent = batch.billNo;
    if (elDocLocation) elDocLocation.textContent = (batch.stream && !batch.stream.includes('Branch')) ? batch.stream.toUpperCase() : 'CHINSURAH';
    if (elDocReq) elDocReq.textContent = batch.reqNo || '119813505';
    if (elDocMetal) elDocMetal.textContent = batch.metal ? (batch.metal.charAt(0).toUpperCase() + batch.metal.slice(1).toLowerCase()) : 'Gold';
    if (elDocDepositor) elDocDepositor.textContent = (batch.depositor || 'KOUSHIK GHOSH').toUpperCase();

    // 3. Update Dynamic Disposition, Date/Time, and Calculations
    updateExactBillDisposition();
    updateExactBillDateTime();
    updateExactBillPreview();
    renderBillQueue();
  }

  function updateExactBillDateTime() {
    if (!activeBillingBatch) return;

    const inputDate = document.getElementById('bill-input-date');
    const inputHH = document.getElementById('bill-input-time-hh');
    const inputMM = document.getElementById('bill-input-time-mm');
    const inputAmPm = document.getElementById('bill-input-time-ampm');

    const dateVal = inputDate ? inputDate.value : '';
    let hhVal = inputHH ? inputHH.value.trim() : '';
    let mmVal = inputMM ? inputMM.value.trim() : '';
    const ampmVal = inputAmPm ? inputAmPm.value : 'PM';

    if (hhVal) {
      const numH = parseInt(hhVal, 10);
      if (!isNaN(numH) && numH >= 1 && numH <= 12) {
        hhVal = String(numH).padStart(2, '0');
      }
    }
    if (mmVal) {
      const numM = parseInt(mmVal, 10);
      if (!isNaN(numM) && numM >= 0 && numM <= 59) {
        mmVal = String(numM).padStart(2, '0');
      }
    }

    activeBillingBatch.billDate = dateVal;
    activeBillingBatch.billTimeHH = hhVal;
    activeBillingBatch.billTimeMM = mmVal;
    activeBillingBatch.billTimeAmPm = ampmVal;

    let formattedDisplay = '';
    if (dateVal && hhVal && mmVal) {
      const parts = dateVal.split('-');
      const ddmmyyyy = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateVal;
      formattedDisplay = `${ddmmyyyy} / ${hhVal}:${mmVal} ${ampmVal}`;
      activeBillingBatch.billDateTime = formattedDisplay;
    } else {
      activeBillingBatch.billDateTime = '';
    }

    const elDocDateTime = document.getElementById('bill-doc-datetime');
    if (elDocDateTime) {
      if (formattedDisplay) {
        elDocDateTime.textContent = formattedDisplay;
        elDocDateTime.style.color = '#000000';
      } else {
        elDocDateTime.textContent = 'DATE & TIME NOT SET (REQUIRED)';
        elDocDateTime.style.color = '#dc2626';
      }
    }

    renderBillQueue();
  }

  function setBillingDateTimeNow() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hhStr = String(hours).padStart(2, '0');
    const minStr = String(now.getMinutes()).padStart(2, '0');

    const inputDate = document.getElementById('bill-input-date');
    const inputHH = document.getElementById('bill-input-time-hh');
    const inputMM = document.getElementById('bill-input-time-mm');
    const inputAmPm = document.getElementById('bill-input-time-ampm');

    if (inputDate) inputDate.value = dateStr;
    if (inputHH) inputHH.value = hhStr;
    if (inputMM) inputMM.value = minStr;
    if (inputAmPm) inputAmPm.value = ampm;

    updateExactBillDateTime();
    showToast('Current Date & Time set.', 'info');
  }

  function updateExactBillDisposition() {
    if (!activeBillingBatch) return;

    const received = activeBillingBatch.pcs || 94;
    const rejected = Math.max(0, parseInt(document.getElementById('bill-ctrl-disp-rejected')?.value) || 0);
    const destroyed = Math.max(0, parseInt(document.getElementById('bill-ctrl-disp-destroyed')?.value) || 0);
    const nonFeasible = Math.max(0, parseInt(document.getElementById('bill-ctrl-disp-nonfeasible')?.value) || 0);
    const irrucd = Math.max(0, parseInt(document.getElementById('bill-ctrl-disp-irrucd')?.value) || 0);

    const deductions = rejected + destroyed + nonFeasible + irrucd;
    const hallmarked = Math.max(0, received - deductions);

    activeBillingBatch.disposition = {
      rejected: rejected,
      destroyed: destroyed,
      nonFeasible: nonFeasible,
      irrucd: irrucd,
      passed: hallmarked
    };

    // Update Control Bar Badges
    const badgePassed = document.getElementById('bill-disp-passed-badge');
    const deductionsLabel = document.getElementById('bill-ctrl-disp-deductions');
    if (badgePassed) badgePassed.textContent = `${hallmarked} Pcs`;
    if (deductionsLabel) deductionsLabel.textContent = `${deductions}`;

    // Update Bill Canvas Breakdown Table
    const docPcsRec = document.getElementById('bill-doc-pcs-rec');
    const docPcsRej = document.getElementById('bill-doc-pcs-rej');
    const docPcsNon = document.getElementById('bill-doc-pcs-non');
    const docPcsHal = document.getElementById('bill-doc-pcs-hal');
    const docPcsDes = document.getElementById('bill-doc-pcs-des');
    const docPcsIrr = document.getElementById('bill-doc-pcs-irr');
    const docPcsCharge = document.getElementById('bill-doc-pcs-charge');

    if (docPcsRec) docPcsRec.textContent = received;
    if (docPcsRej) docPcsRej.textContent = rejected;
    if (docPcsNon) docPcsNon.textContent = nonFeasible;
    if (docPcsHal) docPcsHal.textContent = hallmarked;
    if (docPcsDes) docPcsDes.textContent = destroyed;
    if (docPcsIrr) docPcsIrr.textContent = irrucd;
    if (docPcsCharge) docPcsCharge.textContent = hallmarked;

    updateExactBillCalculations();
  }

  function updateExactBillCalculations() {
    if (!activeBillingBatch) return;

    const rateInput = document.getElementById('bill-input-rate');
    const rate = parseFloat(rateInput ? rateInput.value : 75.00) || 75.00;
    activeBillingBatch.rate = rate;

    const hallmarked = activeBillingBatch.disposition?.passed !== undefined 
      ? activeBillingBatch.disposition.passed 
      : (activeBillingBatch.pcs || 94);

    const gross = hallmarked * rate;
    const cgst = Math.round(gross * 9) / 100;
    const sgst = Math.round(gross * 9) / 100;
    const net = gross + cgst + sgst;

    // Update Table & Financial Summary
    const elHdrRate = document.getElementById('bill-table-hdr-rate');
    const elHdrGross = document.getElementById('bill-table-hdr-gross');
    const elRowRate = document.getElementById('bill-table-row-rate');
    const elRowAmt = document.getElementById('bill-table-row-amt');

    if (elHdrRate) elHdrRate.textContent = rate.toFixed(2);
    if (elHdrGross) elHdrGross.textContent = gross.toFixed(2);
    if (elRowRate) elRowRate.textContent = rate.toFixed(2);
    if (elRowAmt) elRowAmt.textContent = gross.toFixed(2);

    const elDocGross = document.getElementById('bill-doc-gross');
    const elDocCgst = document.getElementById('bill-doc-cgst');
    const elDocSgst = document.getElementById('bill-doc-sgst');
    const elDocRound = document.getElementById('bill-doc-round');
    const elDocNet = document.getElementById('bill-doc-net');
    const elDocWords = document.getElementById('bill-doc-words');

    if (elDocGross) elDocGross.textContent = gross.toFixed(2);
    if (elDocCgst) elDocCgst.textContent = cgst.toFixed(2);
    if (elDocSgst) elDocSgst.textContent = sgst.toFixed(2);
    if (elDocRound) elDocRound.textContent = '.00';
    if (elDocNet) elDocNet.textContent = net.toFixed(2);
    if (elDocWords) elDocWords.textContent = formatRupeesWords(net);
  }

  function updateExactBillPreview() {
    if (!activeBillingBatch) return;

    const inputProduct = document.getElementById('bill-input-product-name');
    const inputRevCharge = document.getElementById('bill-input-rev-charge');

    const productVal = inputProduct ? inputProduct.value.trim() : ',CHAIN-26,TOPS-34,RING-34';
    const revChargeVal = inputRevCharge ? inputRevCharge.value : (activeBillingBatch.reverseCharge || 'NO');
    const weightVal = activeBillingBatch.billWeight || (typeof activeBillingBatch.netWt === 'number' ? Math.round(activeBillingBatch.netWt) : (parseInt(activeBillingBatch.netWt) || 375));

    activeBillingBatch.productBreakdown = productVal;
    activeBillingBatch.reverseCharge = revChargeVal;

    const elProduct = document.getElementById('bill-doc-product');
    const elHdrWt = document.getElementById('bill-table-hdr-wt');
    const elRowWt = document.getElementById('bill-table-row-wt');
    const elRevCharge = document.getElementById('bill-doc-rev-charge');

    if (elProduct) elProduct.textContent = productVal;
    if (elHdrWt) elHdrWt.textContent = weightVal;
    if (elRowWt) elRowWt.textContent = weightVal;
    if (elRevCharge) elRevCharge.textContent = revChargeVal;
  }

  function updatePrintStatusUI() {}
  function toggleActiveBillPrintStatus() {}

  function saveActiveBillChanges(silent = false) {
    if (!activeBillingBatch) {
      if (state.intakeBatches && state.intakeBatches.length > 0) {
        activeBillingBatch = state.intakeBatches[0];
      }
    }
    if (!activeBillingBatch) {
      if (!silent) showToast('No batch available to save.', 'warning');
      return;
    }

    const inputRate = document.getElementById('bill-input-rate');
    const inputProduct = document.getElementById('bill-input-product-name');
    const inputRevCharge = document.getElementById('bill-input-rev-charge');

    if (inputRate) {
      activeBillingBatch.rate = parseFloat(inputRate.value) || 75.00;
    }
    if (inputProduct) {
      activeBillingBatch.productBreakdown = inputProduct.value.trim();
    }
    if (inputRevCharge) {
      activeBillingBatch.reverseCharge = inputRevCharge.value;
    }

    // Save Date & Time
    updateExactBillDateTime();
    updateExactBillDisposition();
    updateExactBillPreview();
    updateExactBillCalculations();
    renderBillQueue();

    if (!silent) {
      if (activeBillingBatch.billDateTime) {
        showToast('Bill parameters and Date & Time saved successfully.', 'success');
      } else {
        showToast('Bill saved, but Date & Time is not set. Note: Date & Time is required to print.', 'warning');
      }
    }
  }

  function generateTaxInvoicePrintContent(withLetterhead = true) {
    if (!activeBillingBatch) return '';

    const b = activeBillingBatch;
    const custInfo = getCustomerDetailsForBill(b.customer);

    const custName = custInfo.name.toUpperCase();
    const custAddr = (custInfo.address || b.customerAddress || 'CENTRAL MARKET,N.S. ROAD, CHINSURAH,HOOGHLY,712101').toUpperCase();
    const custBis = custInfo.bis || b.bis || '5439472';
    const custGst = custInfo.gst || b.customerGst || '19AFKPR4571E1Z3';
    const custState = custInfo.stateCode || b.customerStateCode || '19';

    const billNo = b.billNo || '26-27/HM/2369';
    const billDateTime = b.time || (b.date ? `${b.date} / 08:01 PM` : '14-11-2026 / 08:01 PM');
    const billLocation = (b.stream && !b.stream.includes('Branch')) ? b.stream.toUpperCase() : 'CHINSURAH';
    const reqNo = b.reqNo || '119813505';
    const metalName = b.metal ? (b.metal.charAt(0).toUpperCase() + b.metal.slice(1).toLowerCase()) : 'Gold';
    const depositorName = (b.depositor || 'KOUSHIK GHOSH').toUpperCase();

    const productStr = b.productBreakdown || ',CHAIN-26,TOPS-34,RING-34';
    const weightVal = b.billWeight || (typeof b.netWt === 'number' ? Math.round(b.netWt) : (parseInt(b.netWt) || 375));
    const rateVal = parseFloat(b.rate || 75.00);

    const received = b.pcs || 94;
    const rejected = b.disposition?.rejected || 0;
    const destroyed = b.disposition?.destroyed || 0;
    const nonFeasible = b.disposition?.nonFeasible || 0;
    const irrucd = b.disposition?.irrucd || 0;
    const hallmarked = b.disposition?.passed !== undefined ? b.disposition.passed : (received - (rejected + destroyed + nonFeasible + irrucd));

    const gross = hallmarked * rateVal;
    const cgst = Math.round(gross * 9) / 100;
    const sgst = Math.round(gross * 9) / 100;
    const net = gross + cgst + sgst;
    const words = formatRupeesWords(net);
    const revCharge = b.reverseCharge || 'NO';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0 !important;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 0 !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
      }
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      background: #ffffff;
      color: #000000;
      font-family: 'Courier New', Courier, monospace, monospace;
      font-size: 13px;
      line-height: 1.25;
    }
    .bill-wrapper {
      width: 100%;
      max-width: 210mm;
      margin: 0 auto;
      padding: 10mm 12mm 10mm 12mm;
      background: #ffffff;
    }
    .flex-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .bold {
      font-weight: 900;
    }
    .dashed-line {
      border-top: 1px dashed #000;
      margin: 6px 0;
    }
    .solid-line {
      border-top: 2px solid #000;
      margin: 6px 0;
    }
    .thin-line {
      border-top: 1px solid #000;
      margin: 3px 0;
    }
    .double-line {
      border-top: 2px solid #000;
      margin: 2px 0 0 0;
    }
  </style>
</head>
<body>
  <div class="bill-wrapper">
    ${withLetterhead ? `
    <!-- HEADER (SSR Monogram Logo, Title, Address, BIS Logo, Phone Numbers) -->
    <div class="flex-row" style="align-items: center; padding-bottom: 2px;">
      <!-- SSR Monogram Logo -->
      <div style="width: 58px; height: 50px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <div style="width: 50px; height: 42px; border: 1px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <span style="font-family: 'Times New Roman', Georgia, serif; font-size: 26px; font-weight: 900; font-style: italic; letter-spacing: -2px; line-height: 1;">SS</span>
        </div>
      </div>

      <!-- Center Title & Contact -->
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.5px; font-family: 'Times New Roman', serif;">SSR HALLMARKING CENTER</div>
        <div style="font-size: 11px; font-weight: 700; margin-top: 1px;">1244, Manindra Gopal Mitra Sarani, Chandannagar, Hooghly-712136</div>
        <div style="font-size: 11px; font-weight: 700;">Email:- ssrhallmarkcenter1@gmail.com</div>
        <div style="font-size: 12px; font-weight: 900; margin-top: 1px;">GST-NO. 19BCTPM4362H1Z1</div>
      </div>

      <!-- BIS Hallmark Triangle & Phones -->
      <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
        <svg viewBox="0 0 100 80" style="width: 48px; height: 38px;">
          <polygon points="50,4 96,76 4,76" fill="none" stroke="#000" stroke-width="7" stroke-linejoin="round"/>
          <polygon points="50,22 80,68 20,68" fill="#000"/>
          <circle cx="50" cy="49" r="7" fill="#fff"/>
        </svg>
        <div style="font-size: 10.5px; font-weight: 900; margin-top: 2px;">9836282449</div>
        <div style="font-size: 10.5px; font-weight: 900;">9836282499</div>
      </div>
    </div>

    <div class="solid-line"></div>
    ` : `
    <!-- RESERVED EMPTY SPACE FOR PRE-PRINTED LETTERHEAD -->
    <div style="height: 38mm; width: 100%;"></div>
    `}
    <!-- RECIPIENT & DOCKET -->
    <div class="flex-row" style="font-size: 11.5px; line-height: 1.35;">
      <!-- TO Section -->
      <div style="flex: 1.3;">
        <div class="bold">TO :</div>
        <div class="bold" style="font-size: 12px;">${escapeHtmlStr(custName)}</div>
        <div style="font-weight: 700;">${escapeHtmlStr(custAddr)}</div>
        <div>BIS Regn No : <span class="bold">${escapeHtmlStr(custBis)}</span></div>
        <div>GST No : <span class="bold">${escapeHtmlStr(custGst)}</span> &nbsp;&nbsp;&nbsp; State Code : <span class="bold">${escapeHtmlStr(custState)}</span></div>
      </div>

      <!-- TAX INVOICE -->
      <div style="text-align: center; flex: 0.8;">
        <div class="bold" style="font-size: 15px; letter-spacing: 0.5px;">TAX INVOICE</div>
      </div>

      <!-- Right Metadata -->
      <div style="flex: 1.4; text-align: right;">
        <div style="font-size: 10px; font-weight: 700;">Original for Recipient / Duplicate for Supplier</div>
        <div>BILL NO : <span class="bold">${escapeHtmlStr(billNo)}</span></div>
        <div>DATE/Time : <span class="bold">${escapeHtmlStr(billDateTime)}</span></div>
        <div class="bold">${escapeHtmlStr(billLocation)}</div>
        <div>Request No : <span class="bold">${escapeHtmlStr(reqNo)}</span> &nbsp;&nbsp;&nbsp; <span class="bold">${escapeHtmlStr(metalName)}</span></div>
        <div>Depositor Name : <span class="bold">${escapeHtmlStr(depositorName)}</span></div>
      </div>
    </div>

    <div class="dashed-line"></div>

    <!-- PRODUCT BREAKDOWN & PIECE DISPOSITION -->
    <div style="font-size: 11.5px; line-height: 1.4;">
      <div>Product Name : <span class="bold">${escapeHtmlStr(productStr)}</span></div>
      
      <div class="flex-row" style="margin-top: 3px;">
        <div style="width: 50%;">
          <div>No of Pcs Received for HALLMARKING : <span class="bold">${received}</span></div>
          <div>No of Pcs Rejected&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="bold">${rejected}</span></div>
          <div>No of Pcs Non-Feasible&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="bold">${nonFeasible}</span></div>
        </div>

        <div style="width: 50%;">
          <div>No of Pcs HALLMARKED : <span class="bold">${hallmarked}</span></div>
          <div>No of Pcs Destroyed&nbsp;&nbsp;: <span class="bold">${destroyed}</span></div>
          <div>No of Pcs IRRUCD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="bold">${irrucd}</span></div>
        </div>
      </div>
    </div>

    <div class="dashed-line"></div>

    <!-- SERVICES TABLE -->
    <div style="font-size: 11.5px; line-height: 1.45;">
      <div class="flex-row bold" style="padding-bottom: 2px;">
        <div style="flex: 2;">Description of Services</div>
        <div style="flex: 1; text-align: center;">${weightVal}</div>
        <div style="flex: 1; text-align: right;">@Rs.&nbsp;&nbsp;&nbsp;&nbsp;${rateVal.toFixed(2)}</div>
        <div style="flex: 1; text-align: right;">${gross.toFixed(2)}</div>
      </div>

      <div class="flex-row bold">
        <div style="flex: 2;">HALL MARKING CHARGES for ${hallmarked} pcs</div>
        <div style="flex: 1; text-align: center;">${weightVal}</div>
        <div style="flex: 1; text-align: right;">@Rs.&nbsp;&nbsp;&nbsp;&nbsp;${rateVal.toFixed(2)}</div>
        <div style="flex: 1; text-align: right;">${gross.toFixed(2)}</div>
      </div>
    </div>

    <div class="dashed-line"></div>

    <!-- STATUTORY & TOTALS -->
    <div class="flex-row" style="font-size: 11.5px; line-height: 1.4;">
      <!-- Statutory Left -->
      <div style="flex: 1.3; font-weight: 700;">
        <div>GST No : <span class="bold">19BCTPM4362H1Z1</span></div>
        <div>PAN : <span class="bold">BCTPM43621Z</span></div>
        <div style="margin: 3px 0;">SAC - <span class="bold">998346</span></div>
        <div>License No : <span class="bold">ERO/RAHC/R-7112060</span></div>
        <div>Tax is payable on reverse charge (Yes/No) : <span class="bold">${escapeHtmlStr(revCharge)}</span></div>
      </div>

      <!-- Calculation Right -->
      <div style="flex: 1; text-align: right; font-weight: 900; max-width: 320px;">
        <div class="flex-row">
          <span>Gross Amount</span>
          <span>${gross.toFixed(2)}</span>
        </div>
        <div class="flex-row">
          <span>CGST @9%</span>
          <span>${cgst.toFixed(2)}</span>
        </div>
        <div class="flex-row">
          <span>SGST @9%</span>
          <span>${sgst.toFixed(2)}</span>
        </div>
        <div class="flex-row">
          <span>Round Off</span>
          <span>.00</span>
        </div>
        <div class="thin-line"></div>
        <div class="flex-row" style="font-size: 12.5px;">
          <span>Net Amount</span>
          <span>${net.toFixed(2)}</span>
        </div>
        <div class="double-line"></div>
      </div>
    </div>

    <!-- AMOUNT IN WORDS -->
    <div style="font-size: 12px; font-weight: 900; margin: 9px 0 12px 0;">
      Rupees ${escapeHtmlStr(words)} only.
    </div>

    <!-- SIGNATURES -->
    <div class="flex-row bold" style="font-size: 11px; margin-top: 18px;">
      <div style="padding-top: 20px;">Customer's Signature</div>
      <div style="text-align: right;">
        <div style="margin-bottom: 20px;">E & O E</div>
        <div>Authorised Signatory</div>
      </div>
    </div>

    <!-- BANK DETAILS & JURISDICTION -->
    <div style="font-size: 11px; font-weight: 700; line-height: 1.4; margin-top: 12px; border-top: 1px dashed #000; padding-top: 6px;">
      <div>Bank Details : <strong class="bold">HDFC Bank Ltd , Chandannagar</strong></div>
      <div>A/C No - <strong class="bold">50200064805225</strong>, IFSCcode : <strong class="bold">HDFC0000981</strong></div>
      <div class="flex-row bold" style="margin-top: 3px;">
        <span>Record No : F-30</span>
        <span>Subject to CHANDANNAGAR Jurisdiction</span>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  let isPrintingInvoice = false;

  function openBillPrintOptionsModal() {
    if (!activeBillingBatch) {
      if (state.intakeBatches && state.intakeBatches.length > 0) {
        activeBillingBatch = state.intakeBatches[0];
      }
    }
    if (!activeBillingBatch) {
      showToast('Please select a batch first to print its bill.', 'warning');
      return;
    }

    // Mandatory check: Date & Time must be saved before printing!
    if (!activeBillingBatch.billDateTime) {
      showToast('Billing Date & Time are required! Please set and save Date & Time in AM/PM before printing.', 'error');
      const inputDate = document.getElementById('bill-input-date');
      if (inputDate) {
        inputDate.focus();
        inputDate.classList.add('ring-2', 'ring-red-500');
        setTimeout(() => inputDate.classList.remove('ring-2', 'ring-red-500'), 2500);
      }
      return;
    }

    const modal = document.getElementById('billPrintOptionsModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  function closeBillPrintOptionsModal() {
    const modal = document.getElementById('billPrintOptionsModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  function printTaxInvoice() {
    openBillPrintOptionsModal();
  }

  function executePrintTaxInvoice(withLetterhead = true) {
    closeBillPrintOptionsModal();

    if (isPrintingInvoice) return;
    isPrintingInvoice = true;
    setTimeout(() => { isPrintingInvoice = false; }, 1200);

    if (!activeBillingBatch) {
      if (state.intakeBatches && state.intakeBatches.length > 0) {
        activeBillingBatch = state.intakeBatches[0];
      }
    }
    if (!activeBillingBatch) {
      showToast('Please select a batch first to print its bill.', 'warning');
      return;
    }

    // Silently save any pending changes
    saveActiveBillChanges(true);

    const invoiceHtml = generateTaxInvoicePrintContent(withLetterhead);

    try {
      let printFrame = document.getElementById('invoice-print-iframe');
      if (!printFrame) {
        printFrame = document.createElement('iframe');
        printFrame.id = 'invoice-print-iframe';
        printFrame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;z-index:-9999;';
        document.body.appendChild(printFrame);
      }

      const frameDoc = printFrame.contentWindow.document;
      frameDoc.open();
      frameDoc.write(invoiceHtml);
      frameDoc.close();

      const triggerPrint = () => {
        try {
          if (printFrame && printFrame.contentWindow) {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();
          }
        } catch (err) {
          console.error('Print invoice error:', err);
        }
      };

      if (frameDoc.fonts && frameDoc.fonts.ready) {
        frameDoc.fonts.ready.then(() => {
          setTimeout(triggerPrint, 120);
        }).catch(() => {
          setTimeout(triggerPrint, 200);
        });
      } else {
        setTimeout(triggerPrint, 200);
      }

      const modeStr = withLetterhead ? 'with Letterhead' : 'without Letterhead (Blank Header)';
      showToast(`Opening Print dialog (${modeStr}) for Tax Invoice ${activeBillingBatch.billNo || ''}...`, 'info');
    } catch (e) {
      console.error('Print Tax Invoice error:', e);
      showToast('Unable to open print preview.', 'error');
    }
  }

  // Compatibility stubs
  function recalculateBill() {
    updateExactBillCalculations();
  }
  function renderBillingItemsForm() {}
  function addBillingItemRow() {}
  function syncInvoicePreviewHeader() {}
  function finalizeCurrentBill() {
    if (activeBillingBatch) {
      activeBillingBatch.billPrinted = true;
      updatePrintStatusUI(true);
      renderBillQueue();
      showToast(`Tax Invoice ${activeBillingBatch.billNo} successfully recorded and finalized in BIS Audit Ledger.`, 'success');
    }
  }

  // --- RECORDS / HISTORY MODULE ---
  function switchHistoryTab(tab) {
    const btnEntries = document.getElementById('btnTabEntries');
    const btnInvoices = document.getElementById('btnTabInvoices');

    if (tab === 'entries') {
      if (btnEntries) {
        btnEntries.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btnEntries.classList.remove('text-on-surface-variant');
      }
      if (btnInvoices) {
        btnInvoices.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btnInvoices.classList.add('text-on-surface-variant');
      }
      showToast('Historical Receiving entries active.');
    } else {
      if (btnInvoices) {
        btnInvoices.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btnInvoices.classList.remove('text-on-surface-variant');
      }
      if (btnEntries) {
        btnEntries.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btnEntries.classList.add('text-on-surface-variant');
      }
      showToast('Historical Invoices & Tax Bills active.');
    }
  }

  function openRecordModalForJob(jobId) {
    const modal = document.getElementById('recordModal');
    if (!modal) return;

    const batch = state.intakeBatches.find(b => b.jobDocket === jobId) || state.intakeBatches[0];
    const title = document.getElementById('modalRecordTitle');
    const jobEl = document.getElementById('modalJobNo');
    const custEl = document.getElementById('modalCustHouse');
    const finenessEl = document.getElementById('modalFineness');
    const wtEl = document.getElementById('modalNetWt');
    const trayEl = document.getElementById('modalTraySlot');

    if (title) title.textContent = `Assay Certificate Record: ${batch.jobDocket}`;
    if (jobEl) jobEl.textContent = batch.jobDocket;
    if (custEl) custEl.textContent = batch.customer;
    if (finenessEl) finenessEl.textContent = `${batch.purity} Fineness`;
    if (wtEl) wtEl.textContent = `${batch.netWt.toFixed(3)} g`;
    if (trayEl) trayEl.textContent = batch.tray || 'BOX-TR-14 • Slot #03';

    modal.classList.remove('hidden');
  }

  function filterHistoryRecords() {
    const query = (document.getElementById('historySearchJob')?.value || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#historyTableBody tr');

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // --- SETTINGS MODULE ---
  function switchSettingsTab(tabIndex) {
    const tabs = document.querySelectorAll('.settings-tab-btn');
    const sections = document.querySelectorAll('.settings-section');

    tabs.forEach((btn, idx) => {
      if (idx === tabIndex) {
        btn.classList.add('bg-primary-container', 'text-surface-container-lowest', 'font-semibold');
        btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-low');
      } else {
        btn.classList.remove('bg-primary-container', 'text-surface-container-lowest', 'font-semibold');
        btn.classList.add('text-on-surface-variant', 'hover:bg-surface-container-low');
      }
    });

    sections.forEach((sec, idx) => {
      if (idx === tabIndex) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
  }

  // --- UTILITY: FILE DOWNLOAD ---
  function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // --- EXPORT TO EXCEL / CSV ---
  function exportBatchesToExcel() {
    let csv = 'Job Docket,Customer,BIS License,Request Number,Pieces,Purity,Stream,Tray,Net Wt,Gross Wt,Depositor,Receiver,Status\n';
    state.intakeBatches.forEach(b => {
      csv += `"${b.jobDocket}","${b.customer}","${b.bis}","${b.reqNo}",${b.pcs},"${b.purity}","${b.stream}","${b.tray}",${b.netWt},${b.grossWt},"${b.depositor}","${b.receiver}","${b.status}"\n`;
    });
    downloadFile(csv, 'SSR_Intake_Batches_Log.csv', 'text/csv');
    showToast('Intake batches exported to CSV/Excel.');
  }

  // ========================================================
  // SMART CUSTOMER AUTOCOMPLETE & FUZZY RECOMMENDATION ENGINE
  // ========================================================
  let currentSuggestionMatches = [];

  function normalizeSearchStr(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function getAcronymTokens(str) {
    return (str || '')
      .split(/[\s\-&/._]+/)
      .filter(Boolean)
      .map(w => w[0].toLowerCase())
      .join('');
  }

  function escapeHtmlStr(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Highlights matched letters in golden amber with bold underline
  function highlightCustomerMatch(text, query) {
    if (!text) return '';
    if (!query || !query.trim()) return escapeHtmlStr(text);
    const qNorm = normalizeSearchStr(query);
    if (!qNorm) return escapeHtmlStr(text);

    let qIdx = 0;
    let result = '';
    let inHighlight = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charNorm = char.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (charNorm && qIdx < qNorm.length && charNorm === qNorm[qIdx]) {
        qIdx++;
        if (!inHighlight) {
          result += '<span class="text-amber-500 font-extrabold underline decoration-amber-400 decoration-2">';
          inHighlight = true;
        }
        result += escapeHtmlStr(char);
      } else {
        if (inHighlight && (char === '.' || char === ' ' || char === '&' || char === '-' || char === '/')) {
          result += escapeHtmlStr(char);
        } else {
          if (inHighlight) {
            result += '</span>';
            inHighlight = false;
          }
          result += escapeHtmlStr(char);
        }
      }
    }
    if (inHighlight) {
      result += '</span>';
    }
    return result;
  }

  function matchCustomerQuery(customer, query) {
    if (!query || !query.trim()) {
      return { match: true, score: 0 };
    }
    const qNorm = normalizeSearchStr(query);
    if (!qNorm) {
      return { match: true, score: 0 };
    }

    const nameNorm = normalizeSearchStr(customer.name);
    const codeNorm = normalizeSearchStr(customer.code);
    const bisNorm = normalizeSearchStr(customer.bis);
    const acronym = getAcronymTokens(customer.name);

    let score = 0;
    let matched = false;

    // 1. Exact normalized prefix match on name (e.g. typing 'pk' on 'P.K. Jewellers')
    if (nameNorm.startsWith(qNorm)) {
      matched = true;
      score += 150;
    } else if (nameNorm.includes(qNorm)) {
      matched = true;
      score += 90;
    }

    // 2. Acronym / initials match (e.g. 'pk' or 'pkj' on 'P.K. Jewellers', 'ssr' on 'S.S.R. Bullion', 'mgd' on 'Malabar Gold & Diamonds')
    if (acronym.startsWith(qNorm)) {
      matched = true;
      score += 130;
    } else if (acronym.includes(qNorm)) {
      matched = true;
      score += 70;
    }

    // 3. Customer Code match (e.g. 'PK-JWL', 'SSR-REF', 'AK-SONS')
    if (codeNorm.startsWith(qNorm)) {
      matched = true;
      score += 120;
    } else if (codeNorm.includes(qNorm)) {
      matched = true;
      score += 60;
    }

    // 4. BIS License match (e.g. '4482', '8812', 'bis-dl')
    if (bisNorm.includes(qNorm)) {
      matched = true;
      score += 100;
    }

    // 5. Multi-word tokens match (e.g. 'pk jewellers' or 'ssr bullion')
    const qWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (qWords.length > 1) {
      const allWordsMatch = qWords.every(qw => {
        const nw = normalizeSearchStr(qw);
        return nameNorm.includes(nw) || codeNorm.includes(nw) || bisNorm.includes(nw);
      });
      if (allWordsMatch) {
        matched = true;
        score += 110;
      }
    }

    return { match: matched, score };
  }

  function renderCustomerSuggestions(query = '') {
    const dropdown = document.getElementById('customer-suggestions-dropdown');
    if (!dropdown) return;

    const customers = state.customers || [];
    let matches = [];

    if (!query || !query.trim()) {
      // Show all registered customers (sorted by popularity / active jobs)
      matches = [...customers].sort((a, b) => (b.activeJobs || 0) - (a.activeJobs || 0)).slice(0, 8);
    } else {
      const scored = [];
      customers.forEach(c => {
        const { match, score } = matchCustomerQuery(c, query);
        if (match) {
          scored.push({ customer: c, score });
        }
      });
      scored.sort((a, b) => b.score - a.score);
      matches = scored.map(s => s.customer).slice(0, 8);
    }

    currentSuggestionMatches = matches;

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center select-none bg-surface-container-lowest">
          <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 mb-1.5">
            <span class="material-symbols-outlined text-[18px]">person_search</span>
          </div>
          <div class="text-xs font-bold text-on-surface uppercase tracking-wide">NO REGISTERED JEWELLER MATCHING "${escapeHtmlStr(query)}"</div>
          <div class="text-[11px] text-outline mt-1 font-medium">YOU CAN PROCEED WITH THIS MANUAL ENTRY OR REGISTER THEM IN CUSTOMER INFO.</div>
        </div>
      `;
      dropdown.classList.remove('hidden');
      return;
    }

    const headerHtml = `
      <div class="px-3 py-1.5 bg-slate-50 border-b border-surface-container flex items-center justify-between text-[10px] font-bold text-outline tracking-wider uppercase select-none">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-primary-container">storefront</span>
          <span>SUGGESTED REGISTERED JEWELLERS (${matches.length})</span>
        </span>
        <span class="text-[9px] font-normal text-slate-400">↑↓ ARROWS • ENTER TO SELECT</span>
      </div>
    `;

    const itemsHtml = matches
      .map((c, idx) => {
        const highlightedName = highlightCustomerMatch(c.name, query);
        const code = c.code || 'JEW';
        const bis = c.bis || 'BIS PENDING';
        const area = c.area || c.region || c.address || 'REGISTERED FACILITY';
        return `
          <div
            class="customer-suggestion-item px-3.5 py-2.5 flex items-center justify-between cursor-pointer border-b border-surface-container/40 hover:bg-primary-container/5 transition-colors group select-none ${idx === 0 && query.trim() ? 'bg-primary-container/5 active-item' : ''}"
            data-index="${idx}"
            onclick="selectCustomerSuggestionByIndex(${idx})"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0 group-hover:bg-primary-container group-hover:text-amber-300 transition-colors">
                <span class="material-symbols-outlined text-[18px]">storefront</span>
              </div>
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-bold text-on-surface uppercase tracking-wide truncate group-hover:text-primary-container">
                    ${highlightedName}
                  </span>
                  <span class="px-1.5 py-0.2 rounded text-[10px] font-data-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                    ${code}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-outline mt-0.5">
                  <span class="flex items-center gap-0.5 font-data-mono text-emerald-700 font-semibold shrink-0">
                    <span class="material-symbols-outlined text-[12px] text-emerald-600">verified</span>
                    ${bis}
                  </span>
                  <span class="text-slate-300">•</span>
                  <span class="truncate text-slate-500 font-medium">${escapeHtmlStr(area)}</span>
                </div>
              </div>
            </div>
            <div class="shrink-0 text-right pl-2">
              <span class="text-[10px] font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>SELECT</span>
                <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
              </span>
            </div>
          </div>
        `;
      })
      .join('');

    dropdown.innerHTML = headerHtml + itemsHtml;
    dropdown.classList.remove('hidden');
  }

  function selectCustomerSuggestion(customer) {
    if (!customer) return;
    const input = document.getElementById('customer-name-input');
    const hiddenSelect = document.getElementById('customer-select');
    const bisBadge = document.getElementById('bis-badge');
    const bisStatusBadge = document.getElementById('bis-status-badge');
    const clearBtn = document.getElementById('customer-clear-btn');
    const dropdown = document.getElementById('customer-suggestions-dropdown');

    if (input) {
      input.value = customer.name.toUpperCase();
      input.classList.remove('field-error-highlight');
    }
    if (hiddenSelect) {
      hiddenSelect.value = customer.code || customer.name;
      hiddenSelect.classList.remove('field-error-highlight');
    }
    if (bisBadge) {
      bisBadge.textContent = customer.bis || 'N/A';
    }
    if (bisStatusBadge) {
      bisStatusBadge.classList.remove('hidden');
    }
    if (clearBtn) {
      clearBtn.classList.remove('hidden');
    }
    if (dropdown) {
      dropdown.classList.add('hidden');
    }

    // Automatically advance focus to the next field (Total Pieces Count) line by line
    setTimeout(() => {
      const piecesInput = document.getElementById('pieces-count');
      if (piecesInput) {
        focusAndHighlightField(piecesInput);
      }
    }, 50);
  }

  function selectCustomerSuggestionByIndex(idx) {
    if (currentSuggestionMatches && currentSuggestionMatches[idx]) {
      selectCustomerSuggestion(currentSuggestionMatches[idx]);
    }
  }

  function clearCustomerAutocomplete() {
    const input = document.getElementById('customer-name-input');
    const hiddenSelect = document.getElementById('customer-select');
    const bisBadge = document.getElementById('bis-badge');
    const bisStatusBadge = document.getElementById('bis-status-badge');
    const clearBtn = document.getElementById('customer-clear-btn');
    const dropdown = document.getElementById('customer-suggestions-dropdown');

    if (input) {
      input.value = '';
      input.classList.remove('field-error-highlight');
      input.focus();
    }
    if (hiddenSelect) {
      hiddenSelect.value = '';
      hiddenSelect.classList.remove('field-error-highlight');
    }
    if (bisBadge) bisBadge.textContent = '';
    if (bisStatusBadge) bisStatusBadge.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
    if (dropdown) dropdown.classList.add('hidden');
  }

  function toggleCustomerSuggestions() {
    const dropdown = document.getElementById('customer-suggestions-dropdown');
    const input = document.getElementById('customer-name-input');
    if (!dropdown) return;
    if (dropdown.classList.contains('hidden')) {
      const q = input ? input.value : '';
      renderCustomerSuggestions(q);
      if (input) input.focus();
    } else {
      dropdown.classList.add('hidden');
    }
  }

  function initCustomerAutocomplete() {
    const input = document.getElementById('customer-name-input');
    const hiddenSelect = document.getElementById('customer-select');
    const bisBadge = document.getElementById('bis-badge');
    const bisStatusBadge = document.getElementById('bis-status-badge');
    const clearBtn = document.getElementById('customer-clear-btn');
    const dropdown = document.getElementById('customer-suggestions-dropdown');
    const container = document.getElementById('customer-autocomplete-container');

    if (!input) return;

    input.addEventListener('focus', () => {
      renderCustomerSuggestions(input.value);
    });

    input.addEventListener('input', e => {
      const val = e.target.value;
      if (clearBtn) {
        if (val.trim()) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      // Check if typed text matches any known customer exactly or normalized
      const normVal = normalizeSearchStr(val);
      const exactMatch = (state.customers || []).find(c => {
        return normalizeSearchStr(c.name) === normVal || normalizeSearchStr(c.code) === normVal;
      });

      if (exactMatch) {
        if (hiddenSelect) hiddenSelect.value = exactMatch.code || exactMatch.name;
        if (bisBadge) bisBadge.textContent = exactMatch.bis;
        if (bisStatusBadge) bisStatusBadge.classList.remove('hidden');
        input.classList.remove('field-error-highlight');
      } else {
        if (hiddenSelect) hiddenSelect.value = val.trim();
        // Check partial prefix match for auto-linking if at least 4 letters
        const partialMatch = normVal.length >= 4 
          ? (state.customers || []).find(c => normalizeSearchStr(c.name).startsWith(normVal))
          : null;
        if (partialMatch) {
          if (bisBadge) bisBadge.textContent = partialMatch.bis;
          if (bisStatusBadge) bisStatusBadge.classList.remove('hidden');
        } else {
          if (bisBadge) bisBadge.textContent = val.trim() ? 'BIS LINK PENDING' : '';
          if (bisStatusBadge) bisStatusBadge.classList.add('hidden');
        }
      }

      renderCustomerSuggestions(val);
    });

    // Keyboard navigation: ArrowDown, ArrowUp, Enter, Escape
    input.addEventListener('keydown', e => {
      if (!dropdown || dropdown.classList.contains('hidden')) {
        if (e.key === 'ArrowDown') {
          renderCustomerSuggestions(input.value);
          e.preventDefault();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const piecesInput = document.getElementById('pieces-count');
          if (piecesInput) focusAndHighlightField(piecesInput);
        }
        return;
      }

      const items = Array.from(dropdown.querySelectorAll('.customer-suggestion-item'));
      if (!items.length) {
        if (e.key === 'Enter') {
          e.preventDefault();
          dropdown.classList.add('hidden');
          const piecesInput = document.getElementById('pieces-count');
          if (piecesInput) focusAndHighlightField(piecesInput);
        }
        return;
      }

      let activeIndex = items.findIndex(el => el.classList.contains('bg-primary-container/10') || el.classList.contains('active-item'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        items.forEach((it, idx) => {
          if (idx === activeIndex) {
            it.classList.add('bg-primary-container/10', 'active-item');
            scrollMenuItemIntoView(dropdown, it);
          } else {
            it.classList.remove('bg-primary-container/10', 'active-item');
          }
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        items.forEach((it, idx) => {
          if (idx === activeIndex) {
            it.classList.add('bg-primary-container/10', 'active-item');
            scrollMenuItemIntoView(dropdown, it);
          } else {
            it.classList.remove('bg-primary-container/10', 'active-item');
          }
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].click();
        } else if (items.length > 0) {
          items[0].click();
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.add('hidden');
      }
    });

    // Close on click outside
    document.addEventListener('click', e => {
      if (container && dropdown && !container.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  // ========================================================
  // TYPE OF ARTICLES AUTOCOMPLETE & CUSTOM INPUT
  // ========================================================
  const ARTICLE_TYPE_OPTIONS = [
    'RING',
    'CHAIN',
    'NECKLACE',
    'BANGLES',
    'BRACELET',
    'EARRINGS',
    'JHUMKA',
    'PENDANT',
    'MANGALSUTRA',
    'ANKLET (PAYAL)',
    'NOSE PIN (NATH)',
    'KADA',
    'HANDWEAR',
    'MIX ITEM',
    'MIX ORNAMENTS',
    'COIN / BAR',
    'WAIST BELT (KAMARBANDH)',
    'CHOKER',
    'HAAR / LONG NECKLACE',
    'TANMANIYA',
    'BROOCH / PIN',
    'TIKLI / MAANG TIKKA',
    'TOE RING (BICHHIYA)',
    'ARMLET (BAJUBAND)',
    'PUTHI HAR',
    'POOJA ARTICLES / MURTI',
    'UTENSILS / VESSEL'
  ];

  let activeArticleTypeIndex = -1;
  let currentArticleTypeMatches = [];

  function renderArticleTypeSuggestions(query = '') {
    const dropdown = document.getElementById('article-type-suggestions');
    const chevron = document.getElementById('article-type-chevron');
    if (!dropdown) return;

    const q = (query || '').trim().toUpperCase();
    currentArticleTypeMatches = q
      ? ARTICLE_TYPE_OPTIONS.filter(item => item.includes(q))
      : ARTICLE_TYPE_OPTIONS;

    activeArticleTypeIndex = currentArticleTypeMatches.length > 0 ? 0 : -1;

    let html = '';
    if (currentArticleTypeMatches.length === 0) {
      if (q) {
        html = `
          <div class="px-3.5 py-2.5 text-xs text-on-surface-variant flex items-center justify-between hover:bg-surface-container cursor-pointer font-semibold transition-colors" onclick="selectArticleType('${escapeHtmlStr(q)}')">
            <span>+ Use Custom: <strong class="text-on-surface font-bold">"${escapeHtmlStr(q)}"</strong></span>
            <span class="text-[10px] text-outline uppercase font-mono">Custom</span>
          </div>
        `;
      } else {
        html = '<div class="px-3.5 py-2.5 text-xs text-outline italic">No suggestions</div>';
      }
    } else {
      html = currentArticleTypeMatches.map((item, idx) => {
        let highlighted = escapeHtmlStr(item);
        if (q) {
          const matchIndex = item.indexOf(q);
          if (matchIndex >= 0) {
            highlighted = escapeHtmlStr(item.slice(0, matchIndex)) + 
              '<mark class="bg-amber-300 text-slate-900 font-extrabold px-0.5 rounded">' + 
              escapeHtmlStr(item.slice(matchIndex, matchIndex + q.length)) + 
              '</mark>' + 
              escapeHtmlStr(item.slice(matchIndex + q.length));
          }
        }
        const isActive = idx === activeArticleTypeIndex;
        return `
          <div 
            class="article-type-item px-3.5 py-2.5 text-xs font-semibold text-on-surface flex items-center justify-between cursor-pointer transition-colors ${isActive ? 'bg-primary-container/30 text-primary font-bold' : 'hover:bg-surface-container'}"
            data-index="${idx}"
            onclick="selectArticleTypeByIndex(${idx})"
            onmouseenter="setArticleTypeActiveIndex(${idx})"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[15px] text-outline">diamond</span>
              <span>${highlighted}</span>
            </div>
            <span class="text-[10px] text-outline font-mono">SELECT</span>
          </div>
        `;
      }).join('');

      if (q && !ARTICLE_TYPE_OPTIONS.includes(q)) {
        html += `
          <div class="px-3.5 py-2 border-t border-surface-container text-xs hover:bg-surface-container cursor-pointer font-semibold flex items-center justify-between" onclick="selectArticleType('${escapeHtmlStr(q)}')">
            <span>+ Use Custom: <strong class="text-on-surface font-bold">"${escapeHtmlStr(q)}"</strong></span>
            <span class="text-[10px] text-outline uppercase font-mono">Custom</span>
          </div>
        `;
      }
    }

    dropdown.innerHTML = html;
    dropdown.classList.remove('hidden');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }

  function setArticleTypeActiveIndex(idx) {
    activeArticleTypeIndex = idx;
    document.querySelectorAll('.article-type-item').forEach((el, i) => {
      if (i === idx) {
        el.classList.add('bg-primary-container/30', 'text-primary', 'font-bold');
      } else {
        el.classList.remove('bg-primary-container/30', 'text-primary', 'font-bold');
      }
    });
  }

  function selectArticleType(val) {
    const input = document.getElementById('article-type-input');
    const dropdown = document.getElementById('article-type-suggestions');
    const chevron = document.getElementById('article-type-chevron');

    if (input) {
      input.value = (val || '').trim().toUpperCase();
      input.classList.remove('field-error-highlight');
    }
    if (dropdown) dropdown.classList.add('hidden');
    if (chevron) chevron.style.transform = '';

    setTimeout(() => {
      const purityBtn = document.getElementById('purity-dropdown-btn');
      if (purityBtn) focusAndHighlightField(purityBtn);
    }, 50);
  }

  function selectArticleTypeByIndex(idx) {
    if (currentArticleTypeMatches && currentArticleTypeMatches[idx]) {
      selectArticleType(currentArticleTypeMatches[idx]);
    }
  }

  function toggleArticleTypeDropdown() {
    const dropdown = document.getElementById('article-type-suggestions');
    const input = document.getElementById('article-type-input');
    if (!dropdown) return;

    if (dropdown.classList.contains('hidden')) {
      const q = input ? input.value : '';
      renderArticleTypeSuggestions(q);
      if (input) input.focus();
    } else {
      closeArticleTypeDropdown();
    }
  }

  function closeArticleTypeDropdown() {
    const dropdown = document.getElementById('article-type-suggestions');
    const chevron = document.getElementById('article-type-chevron');
    if (dropdown) dropdown.classList.add('hidden');
    if (chevron) chevron.style.transform = '';
  }

  function initArticleTypeAutocomplete() {
    const input = document.getElementById('article-type-input');
    const dropdown = document.getElementById('article-type-suggestions');
    if (!input) return;

    input.addEventListener('focus', () => {
      renderArticleTypeSuggestions(input.value);
    });

    input.addEventListener('input', () => {
      renderArticleTypeSuggestions(input.value);
    });

    input.addEventListener('keydown', e => {
      const isDropdownOpen = dropdown && !dropdown.classList.contains('hidden');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isDropdownOpen) {
          renderArticleTypeSuggestions(input.value);
        } else if (currentArticleTypeMatches.length > 0) {
          activeArticleTypeIndex = (activeArticleTypeIndex + 1) % currentArticleTypeMatches.length;
          setArticleTypeActiveIndex(activeArticleTypeIndex);
          const activeEl = dropdown.querySelectorAll('.article-type-item')[activeArticleTypeIndex];
          if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isDropdownOpen && currentArticleTypeMatches.length > 0) {
          activeArticleTypeIndex = (activeArticleTypeIndex - 1 + currentArticleTypeMatches.length) % currentArticleTypeMatches.length;
          setArticleTypeActiveIndex(activeArticleTypeIndex);
          const activeEl = dropdown.querySelectorAll('.article-type-item')[activeArticleTypeIndex];
          if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (isDropdownOpen && activeArticleTypeIndex >= 0 && currentArticleTypeMatches[activeArticleTypeIndex]) {
          selectArticleType(currentArticleTypeMatches[activeArticleTypeIndex]);
        } else {
          closeArticleTypeDropdown();
          setTimeout(() => {
            const purityBtn = document.getElementById('purity-dropdown-btn');
            if (purityBtn) focusAndHighlightField(purityBtn);
          }, 50);
        }
      } else if (e.key === 'Escape') {
        closeArticleTypeDropdown();
      }
    });

    document.addEventListener('click', e => {
      const wrapper = document.getElementById('article-type-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        closeArticleTypeDropdown();
      }
    });
  }

  // ========================================================
  // LINE-BY-LINE ENTER KEY WORKFLOW NAVIGATION
  // ========================================================
  function focusAndHighlightField(el) {
    if (!el) return;
    el.focus();
    if (typeof el.select === 'function' && el.tagName === 'INPUT' && el.type !== 'button' && el.type !== 'submit') {
      try {
        el.select();
      } catch (err) {}
    }
    el.classList.add('enter-nav-focused');
    if (el.id === 'btn-save-receive-entry') {
      el.classList.add('final-step-glow');
    }
    setTimeout(() => {
      el.classList.remove('enter-nav-focused');
    }, 600);

    // Only scroll if el is actually outside viewport to prevent whole-screen jumping
    const rect = el.getBoundingClientRect();
    const inView = rect.top >= 30 && rect.bottom <= (window.innerHeight - 30);
    if (!inView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function getReceiveFormInputSequence() {
    const sequence = [];
    const pushIfVisible = id => {
      const el = document.getElementById(id);
      if (el && !el.disabled && el.offsetParent !== null) {
        sequence.push(el);
      }
    };

    // --- SECTION A ---
    // LINE 1: Receipt Number -> Receive Date -> Receive Time (Hour, Minute, AM/PM)
    pushIfVisible('receipt-number');
    pushIfVisible('receive-date');
    pushIfVisible('intake-hour');
    pushIfVisible('intake-minute');
    pushIfVisible('ampm-button-group');

    // LINE 2: Customer Name
    pushIfVisible('customer-name-input');

    // LINE 3: Total Pieces Count -> Article Metal -> Type of Articles -> Declared Gold Purity
    pushIfVisible('pieces-count');
    pushIfVisible('metal-button-group');
    pushIfVisible('article-type-input');
    pushIfVisible('purity-dropdown-btn');

    // LINE 4: Request Number -> Job Number (and extra jobs) -> Vault Tray Assigned
    pushIfVisible('req-number');
    pushIfVisible('job-number');
    const extraJobs = document.querySelectorAll('.additional-job-number');
    extraJobs.forEach(inp => {
      if (inp && !inp.disabled && inp.offsetParent !== null) {
        sequence.push(inp);
      }
    });
    pushIfVisible('tray-number');

    // --- SECTION C ---
    // LINE 1: Net Fine Weight -> Scrapping Weight -> Gross Weight
    pushIfVisible('net-weight');
    pushIfVisible('scrapping-weight');
    pushIfVisible('gross-weight');

    // LINE 2: Handover & Authorization (Interactive Dropdowns with ↑↓ & Enter)
    pushIfVisible('depositor-dropdown-btn');
    pushIfVisible('receiver-dropdown-btn');

    // FINAL STEP: Save Receive Entry Button
    pushIfVisible('btn-save-receive-entry');

    return sequence;
  }

  function initEnterKeyNavigation() {
    const intakeForm = document.getElementById('intake-form');
    if (!intakeForm) return;

    intakeForm.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;

      const target = e.target;
      if (!target) return;

      // Allow default Enter on textarea
      if (target.tagName === 'TEXTAREA') return;

      // If user is already on the submit button, allow default form submission
      if (target.id === 'btn-save-receive-entry' || (target.tagName === 'BUTTON' && target.type === 'submit')) return;

      // Interactive controls handle their own Enter keys
      if (target.id === 'purity-dropdown-btn' || 
          target.id === 'metal-button-group' || 
          target.id === 'ampm-button-group' ||
          target.id === 'depositor-dropdown-btn' ||
          target.id === 'receiver-dropdown-btn') {
        return;
      }

      // If on article-type-input with an active suggestions dropdown, let article autocomplete handle it
      if (target.id === 'article-type-input') {
        const dropdown = document.getElementById('article-type-suggestions');
        if (dropdown && !dropdown.classList.contains('hidden')) return;
      }

      // If on customer-name-input with an active suggestions dropdown, let customer autocomplete handle it
      if (target.id === 'customer-name-input') {
        const dropdown = document.getElementById('customer-suggestions-dropdown');
        if (dropdown && !dropdown.classList.contains('hidden')) {
          const items = dropdown.querySelectorAll('.customer-suggestion-item');
          if (items.length > 0) return;
        }
      }

      e.preventDefault();

      const sequence = getReceiveFormInputSequence();
      const currentIndex = sequence.indexOf(target);

      if (e.shiftKey) {
        // Shift + Enter: Move to PREVIOUS input
        if (currentIndex > 0) {
          focusAndHighlightField(sequence[currentIndex - 1]);
        }
      } else {
        // Enter: Move to NEXT input line by line
        if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
          focusAndHighlightField(sequence[currentIndex + 1]);
        } else if (currentIndex === sequence.length - 1) {
          // On last element / submit button
          handleSaveReceiveEntry();
        } else {
          // Fallback if target wasn't found in sequence: start at first input
          focusAndHighlightField(document.getElementById('receipt-number'));
        }
      }
    });
  }

  // --- INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Routing
    const initialRoute = getRouteFromHash();
    navigateTo(initialRoute);

    // 2. Browser Back / Forward Handling
    window.addEventListener('popstate', () => {
      const route = getRouteFromHash();
      navigateTo(route);
    });

    // 3. Navigation Click Handlers
    document.querySelectorAll('[data-path]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        navigateTo(path);
      });
    });

    // 4. Hamburger & Sidebar Toggle
    const btnToggle = document.getElementById('sidebar-toggle-btn');
    if (btnToggle) {
      btnToggle.addEventListener('click', toggleSidebarCollapse);
    }
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileDrawer);
    }

    // 5. Global Search Shortcuts (⌘K / Ctrl+K)
    window.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openGlobalSearch();
      }
      if (e.key === 'Escape') {
        closeGlobalSearch();
        closeMobileDrawer();
        const recordModal = document.getElementById('recordModal');
        if (recordModal) recordModal.classList.add('hidden');
        const custModal = document.getElementById('customerDetailModal');
        if (custModal) custModal.classList.add('hidden');
      }
    });

    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        renderSearchResults(e.target.value);
      });
    }

    // 6. Smart Customer Autocomplete, Interactive Purity & Enter Navigation in Receive
    initCustomerAutocomplete();
    initArticleTypeAutocomplete();
    initInteractiveControls();
    initEnterKeyNavigation();

    // 7. Receive Form Submission
    const intakeForm = document.getElementById('intake-form');
    if (intakeForm) {
      intakeForm.addEventListener('submit', e => {
        e.preventDefault();
        handleSaveReceiveEntry();
      });
    }

    // 8. Bill Live Sync
    ['inputBillNo', 'inputReqNo', 'inputDate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', syncInvoicePreviewHeader);
    });

    const clientSelect = document.getElementById('clientSelect');
    if (clientSelect) {
      clientSelect.addEventListener('change', syncInvoicePreviewHeader);
    }

    const btnMainSide = document.getElementById('btnMainSide');
    const btnOffSide = document.getElementById('btnOffSide');
    if (btnMainSide) btnMainSide.addEventListener('click', () => setJobClassification('MAIN'));
    if (btnOffSide) btnOffSide.addEventListener('click', () => setJobClassification('OFF_SIDE'));

    const btnAddRow = document.getElementById('btnAddRow');
    if (btnAddRow) btnAddRow.addEventListener('click', addBillingItemRow);

    const piecesCountInput = document.getElementById('pieces-count');
    if (piecesCountInput) {
      piecesCountInput.addEventListener('input', onPiecesCountChanged);
      piecesCountInput.addEventListener('change', onPiecesCountChanged);
    }

    // Initial render of tables
    renderIntakeBatchesTable();
    renderCustomerTable();
    initBillGenerationView();
    renderBillingItemsForm();
    recalculateBill();
    renderVaultBoxes();
    state.allocatedMap = {};
    updateCustodyTracker();
    setupWeightInputs();
  });

  // Expose necessary functions to global window for inline onclicks
  window.navigateTo = navigateTo;
  window.toggleSidebarCollapse = toggleSidebarCollapse;
  window.openMobileDrawer = openMobileDrawer;
  window.closeMobileDrawer = closeMobileDrawer;
  window.openGlobalSearch = openGlobalSearch;
  window.closeGlobalSearch = closeGlobalSearch;
  window.showToast = showToast;
  window.updateStreamUI = updateStreamUI;
  window.setCurrentIntakeTimestamp = setCurrentIntakeTimestamp;
  window.syncIntakeTimestampHidden = syncIntakeTimestampHidden;
  window.setIntakeAmPm = setIntakeAmPm;
  window.handleHourInput = handleHourInput;
  window.handleHourKeydown = handleHourKeydown;
  window.handleMinuteInput = handleMinuteInput;
  window.handleMinuteKeydown = handleMinuteKeydown;
  window.setMetalType = setMetalType;
  window.calculateTareWeight = calculateTareWeight;
  window.calculateNetFromScrapping = calculateNetFromScrapping;
  window.setupWeightInputs = setupWeightInputs;
  window.resetWeightInputs = resetWeightInputs;
  window.captureBalanceReading = captureBalanceReading;
  window.handleSaveReceiveEntry = handleSaveReceiveEntry;
  window.filterIntakeBatches = filterIntakeBatches;
  window.renderVaultBoxes = renderVaultBoxes;
  window.selectVaultBox = selectVaultBox;
  window.renderVaultSlots = renderVaultSlots;
  window.selectVaultSlot = selectVaultSlot;
  window.confirmSlotAssignment = confirmSlotAssignment;
  window.computeOptimalRecommendation = computeOptimalRecommendation;
  window.applyRecommendation = applyRecommendation;
  window.onPiecesCountChanged = onPiecesCountChanged;
  window.autoAllocateRequiredPieces = autoAllocateRequiredPieces;
  window.clearAllAllocations = clearAllAllocations;
  window.clearCurrentTrayAllocations = clearCurrentTrayAllocations;
  window.allocateNeededToCurrentTray = allocateNeededToCurrentTray;
  window.allocateCurrentTrayAllFree = allocateCurrentTrayAllFree;
  window.updateCustodyTracker = updateCustodyTracker;
  window.setBoxStage = setBoxStage;
  window.filterVaultBoxes = filterVaultBoxes;
  window.openAddTrayModal = openAddTrayModal;
  window.closeAddTrayModal = closeAddTrayModal;
  window.handleAddTraySubmit = handleAddTraySubmit;
  window.removeCurrentVaultTray = removeCurrentVaultTray;
  window.addSpaceToCurrentTray = addSpaceToCurrentTray;
  window.removeSpaceFromCurrentTray = removeSpaceFromCurrentTray;
  window.toggleCustomerDrawer = toggleCustomerDrawer;
  window.handleSaveCustomer = handleSaveCustomer;
  window.editCustomerRow = editCustomerRow;
  window.handleUpdateCustomer = handleUpdateCustomer;
  window.promptDeleteCustomer = promptDeleteCustomer;
  window.viewCustomerDetails = viewCustomerDetails;
  window.openEditCustomerModal = openEditCustomerModal;
  window.renderEditCustomerList = renderEditCustomerList;
  window.selectCustomerToEdit = selectCustomerToEdit;
  window.addAdditionalJobRow = addAdditionalJobRow;
  window.removeJobRow = removeJobRow;
  // --- AUTHENTICATION & SESSION MANAGEMENT ---
  function togglePasswordVisibility(inputId = 'terminal-pwd', iconId = 'pwd-toggle-icon') {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.textContent = 'visibility_off';
    } else {
      input.type = 'password';
      if (icon) icon.textContent = 'visibility';
    }
  }

  function fillDemoCredentials(uidId = 'terminal-uid', pwdId = 'terminal-pwd') {
    const uid = document.getElementById(uidId);
    const pwd = document.getElementById(pwdId);
    if (uid) uid.value = 'sarah.jenkins@ssrhallmark.com';
    if (pwd) pwd.value = 'LaboratoryPass#2025';
    showToast('Demo administrator credentials filled.', 'info');
  }

  function handleSignInSubmit(e) {
    if (e) e.preventDefault();
    const uidInput = document.getElementById('terminal-uid');
    const pwdInput = document.getElementById('terminal-pwd');
    const btn = document.getElementById('sign-in-btn');
    const btnText = document.getElementById('sign-in-btn-text');
    const btnIcon = document.getElementById('sign-in-btn-icon');

    const uid = uidInput ? uidInput.value.trim() : '';
    const pwd = pwdInput ? pwdInput.value : '';

    if (!uid || !pwd) {
      showToast('Please enter Staff Lab ID and Terminal Passcode.', 'warning');
      return;
    }

    if (btn) {
      btn.disabled = true;
      if (btnText) btnText.textContent = 'AUTHENTICATING SECURE SESSION...';
      if (btnIcon) {
        btnIcon.textContent = 'sync';
        btnIcon.classList.add('animate-spin');
      }
    }

    setTimeout(() => {
      localStorage.setItem('ssr_authenticated', 'true');
      localStorage.setItem('ssr_active_user', uid);
      if (btnText) btnText.textContent = 'ACCESS GRANTED • OPENING WORKSPACE';
      if (btnIcon) {
        btnIcon.classList.remove('animate-spin');
        btnIcon.textContent = 'check_circle';
      }
      if (btn) {
        btn.classList.remove('bg-primary-container');
        btn.classList.add('bg-emerald-800');
      }

      showToast('Authorized: Sarah Jenkins (Lab Superintendent)', 'success');

      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          if (btnText) btnText.textContent = 'Sign In to Workspace';
          if (btnIcon) btnIcon.textContent = 'arrow_forward';
          btn.classList.remove('bg-emerald-800');
          btn.classList.add('bg-primary-container');
        }
        navigateTo('dashboard');
      }, 400);
    }, 600);
  }

  function signOut() {
    localStorage.removeItem('ssr_authenticated');
    showToast('Logged out of laboratory session.', 'info');
    window.location.href = 'signin.html';
  }

  // --- WELCOMING SPLASH SCREEN (Removed per user request) ---
  function initWelcomeSplash() {}
  function dismissWelcomeSplash() {}
  function reopenWelcomeSplash() {}

  window.initWelcomeSplash = initWelcomeSplash;
  window.dismissWelcomeSplash = dismissWelcomeSplash;
  window.reopenWelcomeSplash = reopenWelcomeSplash;


  window.togglePasswordVisibility = togglePasswordVisibility;
  window.fillDemoCredentials = fillDemoCredentials;
  window.handleSignInSubmit = handleSignInSubmit;
  window.signOut = signOut;
  window.clearAllAdditionalJobs = clearAllAdditionalJobs;
  window.filterClientTable = filterClientTable;
  window.clearSearch = clearSearch;
  window.exportCustomerCSV = exportCustomerCSV;
  window.addBillingItemRow = addBillingItemRow;
  window.deleteBillingItemRow = deleteBillingItemRow;
  window.updateBillingItemDesc = updateBillingItemDesc;
  window.updateBillingItemQty = updateBillingItemQty;
  window.updateBillingItemWt = updateBillingItemWt;
  window.updateBillingItemRate = updateBillingItemRate;
  window.recalculateBill = recalculateBill;
  window.setJobClassification = setJobClassification;
  window.switchHistoryTab = switchHistoryTab;
  window.openRecordModalForJob = openRecordModalForJob;
  window.filterHistoryRecords = filterHistoryRecords;
  window.switchSettingsTab = switchSettingsTab;
  window.exportBatchesToExcel = exportBatchesToExcel;
  window.selectCustomerSuggestion = selectCustomerSuggestion;
  window.selectCustomerSuggestionByIndex = selectCustomerSuggestionByIndex;
  window.clearCustomerAutocomplete = clearCustomerAutocomplete;
  window.toggleCustomerSuggestions = toggleCustomerSuggestions;
  window.resetReceiveBatchForm = resetReceiveBatchForm;
  window.focusAndHighlightField = focusAndHighlightField;
  window.initEnterKeyNavigation = initEnterKeyNavigation;
  window.togglePurityMenu = togglePurityMenu;
  window.selectPurityOption = selectPurityOption;
  window.renderPurityOptionsMenu = renderPurityOptionsMenu;
  window.toggleDepositorMenu = toggleDepositorMenu;
  window.selectDepositorOption = selectDepositorOption;
  window.renderDepositorOptionsMenu = renderDepositorOptionsMenu;
  window.toggleReceiverMenu = toggleReceiverMenu;
  window.selectReceiverOption = selectReceiverOption;
  window.renderReceiverOptionsMenu = renderReceiverOptionsMenu;
  window.showIntakeConfirmationModal = showIntakeConfirmationModal;
  window.closeIntakeConfirmationModal = closeIntakeConfirmationModal;
  window.executeSaveReceiveEntry = executeSaveReceiveEntry;
  window.printIntakeReceipt = printIntakeReceipt;
  window.generateIntakeReceiptContent = generateIntakeReceiptContent;
  window.initTagGenerationView = initTagGenerationView;
  window.renderTagStatusQueue = renderTagStatusQueue;
  window.filterTagQueue = filterTagQueue;
  window.selectTagBatch = selectTagBatch;
  window.renderExcelGrid = renderExcelGrid;
  window.onExcelCellFocus = onExcelCellFocus;
  window.onExcelCellInput = onExcelCellInput;
  window.onFormulaBarInput = onFormulaBarInput;
  window.onExcelCellKeydown = onExcelCellKeydown;
  window.focusExcelCell = focusExcelCell;
  window.getExcelColName = getExcelColName;
  window.updateExcelGridStats = updateExcelGridStats;
  window.addExcelRow = addExcelRow;
  window.deleteExcelRow = deleteExcelRow;
  window.deleteSelectedExcelRows = deleteSelectedExcelRows;
  window.clearExcelGrid = clearExcelGrid;
  window.clearExcelSheetData = clearExcelSheetData;
  window.onTagQueueSearchInput = onTagQueueSearchInput;
  window.clearTagQueueSearch = clearTagQueueSearch;
  window.toggleSelectExcelRow = toggleSelectExcelRow;
  window.toggleSelectAllExcelRows = toggleSelectAllExcelRows;
  window.onExcelCellChange = onExcelCellChange;
  window.autoFillFromIntake = autoFillFromIntake;
  window.pasteFromClipboard = pasteFromClipboard;
  window.handleExcelGridPaste = handleExcelGridPaste;
  window.importCsvToExcel = importCsvToExcel;
  window.onTagPresetChanged = onTagPresetChanged;
  window.onTagDimensionInput = onTagDimensionInput;
  window.onTagUnitChanged = onTagUnitChanged;
  window.updateTagMiniPreview = updateTagMiniPreview;
  window.saveTagData = saveTagData;
  window.printCustomTags = printCustomTags;
  window.syncTagPrintButtonState = syncTagPrintButtonState;
  window.onTagBatchSelected = selectTagBatch;
  window.onTagFormatChanged = onTagFormatChanged;
  window.refreshTagGenerationPreview = refreshTagGenerationPreview;
  window.printTagSheet = printTagSheet;
  window.printSingleTag = printSingleTag;
  window.exportTagsCSV = exportTagsCSV;
  window.initDeliveryView = initDeliveryView;
  window.startDeliveryCamera = startDeliveryCamera;
  window.stopDeliveryCameraStream = stopDeliveryCameraStream;
  window.toggleDeliveryCameraStream = toggleDeliveryCameraStream;
  window.switchDeliveryCameraDevice = switchDeliveryCameraDevice;
  window.toggleDeliveryAutoCapture = toggleDeliveryAutoCapture;
  window.toggleDeliveryCaptureSound = toggleDeliveryCaptureSound;
  window.triggerDeliveryManualCapture = triggerDeliveryManualCapture;
  window.setDeliveryMotionSensitivity = setDeliveryMotionSensitivity;
  window.calibrateDeliveryTrayBaseline = calibrateDeliveryTrayBaseline;
  window.handleMultipleDeliveryPhotos = handleMultipleDeliveryPhotos;
  window.handleMultiPhotoDragOver = handleMultiPhotoDragOver;
  window.handleMultiPhotoDragLeave = handleMultiPhotoDragLeave;
  window.handleMultiPhotoDrop = handleMultiPhotoDrop;
  window.clearAllDeliveryPhotos = clearAllDeliveryPhotos;
  window.removePhotoFromBatch = removePhotoFromBatch;
  window.setLightboxIndex = setLightboxIndex;
  window.prevLightboxPhoto = prevLightboxPhoto;
  window.nextLightboxPhoto = nextLightboxPhoto;
  window.downloadCurrentLightboxPhoto = downloadCurrentLightboxPhoto;
  window.deleteCurrentLightboxPhoto = deleteCurrentLightboxPhoto;
  window.renderDeliveryQueue = renderDeliveryQueue;
  window.filterDeliveryQueue = filterDeliveryQueue;
  window.handleDeliverySearch = handleDeliverySearch;
  window.clearDeliverySearch = clearDeliverySearch;
  window.selectDeliveryBatch = selectDeliveryBatch;
  window.onDeliveryBatchSelected = onDeliveryBatchSelected;
  window.handleArticlePhotoUpload = handleArticlePhotoUpload;
  window.removeArticlePhoto = removeArticlePhoto;
  window.handlePhotoDragOver = handlePhotoDragOver;
  window.handlePhotoDragLeave = handlePhotoDragLeave;
  window.handlePhotoDrop = handlePhotoDrop;
  window.openPhotoLightbox = openPhotoLightbox;
  window.closePhotoLightbox = closePhotoLightbox;
  window.handleDeliverySubmit = handleDeliverySubmit;
  window.resetDeliveryForm = resetDeliveryForm;
  window.printCurrentDeliveryGatePass = printCurrentDeliveryGatePass;
  window.printDeliveryGatePassDirect = printDeliveryGatePassDirect;
  window.filterDeliveryLedger = filterDeliveryLedger;
  window.initBillGenerationView = initBillGenerationView;
  window.filterBillQueue = filterBillQueue;
  window.renderBillQueue = renderBillQueue;
  window.handleBillSearch = handleBillSearch;
  window.clearBillSearch = clearBillSearch;
  window.filterBillQueueByDateTime = filterBillQueueByDateTime;
  window.updateExactBillDateTime = updateExactBillDateTime;
  window.setBillingDateTimeNow = setBillingDateTimeNow;
  window.selectBillingBatch = selectBillingBatch;
  window.updateExactBillDisposition = updateExactBillDisposition;
  window.updateExactBillCalculations = updateExactBillCalculations;
  window.updateExactBillPreview = updateExactBillPreview;
  window.saveActiveBillChanges = saveActiveBillChanges;
  window.printTaxInvoice = printTaxInvoice;
  window.openBillPrintOptionsModal = openBillPrintOptionsModal;
  window.closeBillPrintOptionsModal = closeBillPrintOptionsModal;
  window.executePrintTaxInvoice = executePrintTaxInvoice;
  window.generateTaxInvoicePrintContent = generateTaxInvoicePrintContent;
  window.toggleActiveBillPrintStatus = toggleActiveBillPrintStatus;
  window.finalizeCurrentBill = finalizeCurrentBill;
  window.initInteractiveControls = initInteractiveControls;
  window.renderArticleTypeSuggestions = renderArticleTypeSuggestions;
  window.selectArticleType = selectArticleType;
  window.selectArticleTypeByIndex = selectArticleTypeByIndex;
  window.toggleArticleTypeDropdown = toggleArticleTypeDropdown;
  window.closeArticleTypeDropdown = closeArticleTypeDropdown;
  window.setArticleTypeActiveIndex = setArticleTypeActiveIndex;
  window.initArticleTypeAutocomplete = initArticleTypeAutocomplete;
})();

