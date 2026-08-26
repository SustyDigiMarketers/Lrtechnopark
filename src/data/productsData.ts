import { Product } from '../types';

export const productsData: Product[] = [
  // =========================================================================
  // 01 — COMPUTER HARDWARE
  // =========================================================================
  {
    id: 'hw-01',
    name: 'Enterprise Commercial Desktop PC',
    slug: 'enterprise-business-desktop-pc',
    code: 'LR-HW-DSK01',
    tagline: 'Reliable Core i7 Business Workstation for High-Productivity Office Workloads',
    category: 'Computer Hardware',
    brand: 'LR Certified Enterprise',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Commercial-grade business desktop computer with high-speed NVMe storage, expandable DDR5 memory, and dual 4K display outputs for daily enterprise computing.',
    description: 'Engineered for 24/7 commercial reliability, this business desktop delivers responsive performance across accounting, ERP systems, multi-tab office applications, and corporate database management. Features robust metal chassis ventilation, front USB-C connectivity, and enterprise BIOS hardware security.',
    badge: 'Enterprise Best-Seller',
    rating: 4.9,
    availability: 'In Stock — Ready for Immediate Dispatch',
    price: 68500,
    discountPrice: 62900,
    unit: 'Unit',
    orderEnabled: true,
    featured: true,
    complianceTags: ['BIS Certified', 'Energy Star 8.0', 'RoHS Compliant', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years On-Site Comprehensive Hardware Warranty',
    features: [
      {
        title: '14th Gen Intel Core i7 Processor',
        description: 'Multi-core computing architecture engineered for intensive multitasking and business data processing.',
        metricHighlight: 'Up to 5.2 GHz Boost'
      },
      {
        title: 'High-Speed NVMe Gen4 Storage',
        description: 'Instant operating system boot times and near-instantaneous enterprise file transfers.',
        metricHighlight: '1TB M.2 PCIe 4.0'
      },
      {
        title: 'Dual 4K Display Outputs',
        description: 'DisplayPort and HDMI outputs supporting multi-monitor productivity setups seamlessly.',
        metricHighlight: 'Dual 4K @ 60Hz'
      },
      {
        title: 'Tool-Less Expandable Chassis',
        description: 'Effortless internal upgrades for additional storage drives, PCIe cards, and RAM expansion.',
        metricHighlight: 'Up to 64GB DDR5'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Automatic Data Processing Machines)' },
      { label: 'Processor', value: 'Intel Core i7-14700 (20 Cores, 28 Threads)' },
      { label: 'System Memory', value: '16GB DDR5 5600MHz (Expandable to 64GB)' },
      { label: 'Primary Storage', value: '1TB NVMe M.2 PCIe Gen 4 SSD' },
      { label: 'Graphics', value: 'Intel UHD Graphics 770 (Dual Display Output)' },
      { label: 'Networking', value: 'Gigabit Ethernet (RJ-45) + Wi-Fi 6 AX + Bluetooth 5.3' },
      { label: 'Power Supply', value: '350W 80 PLUS Bronze High-Efficiency PSU' },
      { label: 'Operating System', value: 'Windows 11 Pro 64-bit / Linux Compatible' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Unit Standard Supply',
        pricePerUnit: 68500,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Hardware Unit', 'Power Cable', '3-Year On-Site Warranty', 'Pre-installed Windows 11 Pro']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Enterprise Bulk Deployment (10+ Units)',
        pricePerUnit: 62900,
        billingPeriod: 'per unit (bulk discount)',
        minimumSeats: 10,
        featuresIncluded: ['Custom Golden OS Image Staging', 'Asset Tagging', 'Free On-Site Delivery', 'Dedicated Technical Support']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Configuration & Quantity Selection',
        description: 'Select quantity and submit your delivery and GST billing details via our self-service procurement wizard.'
      },
      {
        step: '02',
        title: 'Automated Order Dispatch',
        description: 'Our warehouse team stages, tests hardware components, and burns in memory/storage before dispatch.'
      },
      {
        step: '03',
        title: 'On-Site Delivery & Setup',
        description: 'Units arrive securely packaged with GST compliance documentation and on-site deployment support.'
      },
      {
        step: '04',
        title: 'Comprehensive Warranty Support',
        description: 'Direct technician dispatch and on-site component replacement under 3-year enterprise warranty.'
      }
    ]
  },
  {
    id: 'hw-02',
    name: 'Precision CAD & Engineering Workstation',
    slug: 'precision-cad-engineering-workstation',
    code: 'LR-HW-WRK02',
    tagline: 'Extreme Compute & GPU Acceleration for 3D Modeling, Simulation, and AI Inference',
    category: 'Computer Hardware',
    brand: 'LR Certified Enterprise',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy-duty workstation powered by Intel Core i9 / Xeon, NVIDIA RTX professional graphics, and ECC memory for rendering and structural simulation.',
    description: 'Purpose-built for architects, mechanical engineers, and data scientists running AutoCAD, Revit, SolidWorks, Blender, and deep learning models. Features ISV certifications, high-airflow cooling, and redundant power options.',
    badge: 'Heavy Compute',
    rating: 5.0,
    availability: 'In Stock — Configured to Order',
    price: 145000,
    discountPrice: 135000,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['ISV Certified', 'BIS Certified', 'ECC Memory Protected', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years Next-Business-Day On-Site Warranty',
    features: [
      {
        title: 'NVIDIA RTX Professional GPU',
        description: 'Certified drivers guarantee zero crashes and rapid viewport rendering in Autodesk, Dassault, and Adobe suites.',
        metricHighlight: '16GB GDDR6 VRAM'
      },
      {
        title: 'DDR5 ECC Error-Correcting Memory',
        description: 'Eliminates single-bit memory corruptions during multi-day rendering or complex physics simulations.',
        metricHighlight: '64GB DDR5 ECC'
      },
      {
        title: 'Dual Gen4 NVMe RAID Storage',
        description: 'Configured in RAID 1 for real-time mirroring to protect project files against drive failure.',
        metricHighlight: '2x 2TB NVMe RAID'
      },
      {
        title: '850W Platinum Redundant PSU Ready',
        description: 'Clean, continuous power delivery under sustained 100% CPU and GPU compute loads.',
        metricHighlight: '92% Efficiency'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Automatic Data Processing Machines)' },
      { label: 'Processor', value: 'Intel Core i9-14900K (24 Cores, 32 Threads, up to 6.0 GHz)' },
      { label: 'Memory', value: '64GB DDR5 5600MHz ECC (Expandable to 128GB)' },
      { label: 'Dedicated Graphics', value: 'NVIDIA RTX 4000 Ada Generation (16GB GDDR6 ECC)' },
      { label: 'Storage', value: '2x 2TB NVMe M.2 PCIe Gen4 in Hardware RAID' },
      { label: 'Cooling', value: 'Closed-Loop Liquid Cooler with 360mm Radiator' },
      { label: 'Power Supply', value: '850W 80 PLUS Platinum Certified' },
      { label: 'Chassis Form Factor', value: 'Full Tower with Acoustic Sound Dampening' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Standard Workstation Package',
        pricePerUnit: 145000,
        billingPeriod: 'per workstation',
        minimumSeats: 1,
        featuresIncluded: ['Workstation Unit', 'ISV-Certified Driver Suite', '3-Year NBD On-Site Warranty']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Design Studio Bundle (5+ Units)',
        pricePerUnit: 135000,
        billingPeriod: 'per workstation (bulk)',
        minimumSeats: 5,
        featuresIncluded: ['Custom CAD Benchmark Validation', 'Free On-Site Staging', 'Priority Spare Parts Pool']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Workflow Sizing Consultation',
        description: 'We verify memory and GPU requirements for your software toolchains (AutoCAD, Revit, SolidWorks).'
      },
      {
        step: '02',
        title: 'Burn-In Stress Testing',
        description: 'Every workstation undergoes a mandatory 24-hour thermal and memory stress test before packing.'
      },
      {
        step: '03',
        title: 'Safe White-Glove Transport',
        description: 'Delivered in high-density foam crates with GPU braces installed to prevent transit damage.'
      },
      {
        step: '04',
        title: 'On-Site Commissioning',
        description: 'Our engineers handle physical placement, peripheral cabling, and driver initialization.'
      }
    ]
  },
  {
    id: 'hw-03',
    name: '27-inch 4K UHD IPS Commercial Monitor',
    slug: '27-inch-4k-uhd-commercial-monitor',
    code: 'LR-HW-MON03',
    tagline: 'Factory Calibrated Ultra-High Definition Display with 90W USB-C Power Delivery',
    category: 'Computer Hardware',
    brand: 'LR Vision Displays',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Color-accurate 4K IPS display featuring ultra-thin bezels, ergonomic height/tilt stand, and single-cable USB-C laptop docking.',
    description: 'Designed to elevate modern workspace productivity. With 3840 x 2160 resolution, 99% sRGB color gamut, and TÜV Rheinland certified low-blue-light technology, this monitor reduces eye strain during long working hours.',
    badge: 'Display Ergonomics',
    rating: 4.8,
    availability: 'In Stock — Ready for Dispatch',
    price: 26500,
    discountPrice: 24000,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['TÜV Eye Comfort', 'Energy Star', 'VESA 100x100 Ready', 'GST e-Invoice Ready (HSN 8528)'],
    warranty: '3 Years Advanced Replacement Warranty',
    features: [
      {
        title: 'Crisp 4K UHD Resolution',
        description: 'Over 8.3 million pixels deliver razor-sharp typography and immaculate spreadsheet clarity.',
        metricHighlight: '3840 x 2160 IPS'
      },
      {
        title: '90W USB-C Power Delivery',
        description: 'Charge your laptop while transmitting 4K video and USB hub signals via a single cable.',
        metricHighlight: 'Single Cable Docking'
      },
      {
        title: '4-Way Ergonomic Stand',
        description: 'Height adjustment, tilt, swivel, and 90° pivot rotation for vertical document viewing.',
        metricHighlight: '150mm Height Travel'
      },
      {
        title: '99% sRGB Color Accuracy',
        description: 'Factory calibrated color profiles for consistent, lifelike visuals across all creative tasks.',
        metricHighlight: 'Delta E < 2'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8528 (Monitors and Projectors)' },
      { label: 'Screen Size & Panel', value: '27-inch IPS (In-Plane Switching) Anti-Glare' },
      { label: 'Resolution', value: '3840 x 2160 at 60Hz' },
      { label: 'Brightness & Contrast', value: '350 cd/m², 1000:1 Static Contrast Ratio' },
      { label: 'Connectivity', value: '1x USB-C (90W PD), 2x HDMI 2.0, 1x DisplayPort 1.4, 4x USB 3.2 Hub' },
      { label: 'Audio', value: 'Integrated 2x 3W Stereo Speakers + 3.5mm Audio Out' },
      { label: 'Mounting', value: 'VESA 100x100mm Standard Mount' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Display Unit',
        pricePerUnit: 26500,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Monitor & Ergonomic Stand', 'USB-C Cable', 'HDMI Cable', '3-Year Replacement Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Select Units & Mounting',
        description: 'Choose desk stand or VESA arm configurations for your office floor plan.'
      },
      {
        step: '02',
        title: 'Immediate Logistics Dispatch',
        description: 'Shipped with reinforced corner foam protectors and verified pixel-perfect display panels.'
      },
      {
        step: '03',
        title: 'Plug & Play Integration',
        description: 'Zero driver installation needed for Windows, macOS, or ChromeOS.'
      },
      {
        step: '04',
        title: 'Express Swapping',
        description: 'Immediate replacement unit dispatch if any panel fault is encountered during warranty.'
      }
    ]
  },
  {
    id: 'hw-04',
    name: 'Online Double-Conversion 2kVA UPS System',
    slug: 'online-double-conversion-2kva-ups',
    code: 'LR-HW-UPS04',
    tagline: 'Zero-Transfer Time Pure Sine Wave Power Protection for Servers and Critical Workstations',
    category: 'Computer Hardware',
    brand: 'LR Power Systems',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Enterprise 2000VA / 1800W rack/tower convertible online UPS delivering clean, continuous pure sine wave power, automatic voltage regulation, and SNMP remote monitoring.',
    description: 'Safeguards servers, network switches, and critical workstations against total blackouts, voltage brownouts, surges, and electrical noise. Double-conversion topology guarantees 0ms transfer time to battery when main utility power fails.',
    badge: 'Power Protection',
    rating: 4.9,
    availability: 'In Stock',
    price: 38000,
    discountPrice: 35500,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['CE Certified', 'IEC 62040-1', 'RoHS Compliant', 'GST e-Invoice Ready (HSN 8504)'],
    warranty: '2 Years Comprehensive Warranty (Including Batteries)',
    features: [
      {
        title: 'Zero Transfer Time (0ms)',
        description: 'True double-conversion ensures sensitive server power supplies never experience a micro-drop.',
        metricHighlight: '0ms Transfer Time'
      },
      {
        title: 'Pure Sine Wave Output',
        description: 'Prevents damage to active PFC server power supplies and medical computing hardware.',
        metricHighlight: 'THD < 2%'
      },
      {
        title: 'Intelligent LCD Dashboard',
        description: 'Real-time load wattage, battery runtime remaining, and input/output voltage telemetry.',
        metricHighlight: 'Interactive Display'
      },
      {
        title: 'Network Management Ready',
        description: 'Optional SNMP card slot for automated email alerts and safe graceful server shutdown scripts.',
        metricHighlight: 'SNMP/HTTP Support'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8504 (Electrical Transformers, Static Converters & UPS)' },
      { label: 'Capacity', value: '2000VA / 1800W True Online' },
      { label: 'Input Voltage Range', value: '110V - 300V AC (Auto Sensing)' },
      { label: 'Output Voltage', value: '220V/230V/240V AC Pure Sine Wave ±1%' },
      { label: 'Battery Type', value: 'Sealed Lead-Acid 12V / 9Ah x 4 (Hot-Swappable)' },
      { label: 'Form Factor', value: '2U Rackmount or Floor Tower Convertible' },
      { label: 'Outlets', value: '6x IEC C13 Outlets + 1x High-Current C19' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'UPS Standard Package',
        pricePerUnit: 38000,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['UPS Unit', 'Battery Pack Pre-installed', 'Rackmount Ears & Tower Feet', '2-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Load Calculation',
        description: 'We help calculate total peak wattage across your server and workstation loads.'
      },
      {
        step: '02',
        title: 'Delivery & Battery Connection',
        description: 'Shipped with safety isolator connected; ready for simple screwless rack insertion.'
      },
      {
        step: '03',
        title: 'Automated Shutdown Setup',
        description: 'Connect USB/Ethernet to configure automatic graceful server shutdowns during outages.'
      },
      {
        step: '04',
        title: 'Ongoing Power Security',
        description: 'Battery health self-testing runs automatically every 14 days.'
      }
    ]
  },

  // =========================================================================
  // 02 — CCTV CAMERAS
  // =========================================================================
  {
    id: 'cctv-01',
    name: '4K Ultra HD AI Smart IP Dome Camera',
    slug: '4k-ultra-hd-smart-ip-dome-camera',
    code: 'LR-CAM-DOME01',
    tagline: 'Vandal-Proof 8MP Commercial Dome Camera with Human/Vehicle AI Classification',
    category: 'CCTV Cameras',
    brand: 'LR Vision Security',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High-resolution 4K PoE security dome camera equipped with smart AI motion filtering, 30m infrared night vision, vandal-proof IK10 casing, and built-in microphone.',
    description: 'Designed for commercial lobbies, office hallways, retail stores, and perimeter entryways. Deep-learning algorithms eliminate false alarms triggered by rain, trees, or small animals by classifying human and vehicle silhouettes in real time with crystal clear 8MP imaging.',
    badge: 'Top Commercial Dome',
    rating: 4.9,
    availability: 'In Stock — Ready for Installation',
    price: 9800,
    discountPrice: 8900,
    unit: 'Unit',
    orderEnabled: true,
    featured: true,
    complianceTags: ['IK10 Vandal-Proof', 'IP67 Weatherproof', 'ONVIF Profile S/G/T', 'GST e-Invoice Ready (HSN 8525)'],
    warranty: '2 Years Manufacturer Replacement Warranty',
    features: [
      {
        title: '8MP 4K Ultra HD Resolution',
        description: 'Captures crisp facial features, license plates, and currency exchange details with sharp clarity.',
        metricHighlight: '3840 x 2160 @ 30fps'
      },
      {
        title: 'Smart Human & Vehicle AI Detection',
        description: 'Filters false alarms by over 95%, alerting security teams only to verified perimeter intrusions.',
        metricHighlight: '< 5% False Alarms'
      },
      {
        title: 'True 120dB Wide Dynamic Range (WDR)',
        description: 'Balances extreme backlight situations near glass doors and windows without washing out faces.',
        metricHighlight: '120dB True WDR'
      },
      {
        title: 'Vandal-Resistant IK10 Metal Housing',
        description: 'Heavy-duty aluminum housing withstands physical impacts and harsh outdoor weather conditions.',
        metricHighlight: 'IK10 & IP67 Rated'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8525 (Transmission apparatus for radio-broadcasting / CCTV)' },
      { label: 'Image Sensor', value: '1/2.8" Progressive Scan CMOS Sensor' },
      { label: 'Lens Options', value: '2.8mm (108° FOV) or 4.0mm (86° FOV)' },
      { label: 'Night Vision IR Range', value: 'Up to 30 Meters (Smart EXIR LEDs)' },
      { label: 'Power Input', value: 'PoE (802.3af, Class 3) or 12V DC ± 25%' },
      { label: 'Video Compression', value: 'H.265+ / H.265 / H.264+ / H.264' },
      { label: 'Edge Storage', value: 'MicroSD / MicroSDHC / MicroSDXC Slot up to 512GB' },
      { label: 'Audio & Alarm', value: 'Built-in Noise-Cancelling Microphone' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Camera Unit',
        pricePerUnit: 9800,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Dome Camera Unit', 'Mounting Template & Screws', 'Waterproof RJ45 Cap', '2-Year Warranty']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Bulk Commercial Pack (10+ Units)',
        pricePerUnit: 8900,
        billingPeriod: 'per unit (bulk package)',
        minimumSeats: 10,
        featuresIncluded: ['Free NVR Integration Configuration', 'Cable Labels', 'Fast Priority Support']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Select Camera Quantity & Focal Length',
        description: 'Choose 2.8mm for wide room coverage or 4mm for corridor/entry zoom.'
      },
      {
        step: '02',
        title: 'PoE Single-Cable Connection',
        description: 'Connect standard CAT6 cable from your PoE switch or NVR; power and video transmit together.'
      },
      {
        step: '03',
        title: 'AI Smart Boundary Setup',
        description: 'Draw virtual tripwire lines and intrusion boxes via NVR or browser interface.'
      },
      {
        step: '04',
        title: 'Mobile & Cloud Live Streaming',
        description: 'Receive instant push alerts and review playback on iOS, Android, and desktop.'
      }
    ]
  },
  {
    id: 'cctv-02',
    name: 'Long-Range Outdoor 4K Bullet Camera',
    slug: 'long-range-outdoor-4k-bullet-camera',
    code: 'LR-CAM-BLT02',
    tagline: 'IP67 Weatherproof Perimeter Security Camera with 60m Night Vision & Color Night Mode',
    category: 'CCTV Cameras',
    brand: 'LR Vision Security',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial outdoor bullet camera with 60-meter infrared illumination, motorized varifocal zoom lens, full metal weather housing, and license plate capture capability.',
    description: 'Engineered for campus boundary fences, parking lots, logistics yards, and highway toll gates. Features motorized 4x optical zoom, IP67 waterproof certification, and high-intensity infrared array for zero-lux nighttime surveillance.',
    badge: 'Long Range Surveillance',
    rating: 4.9,
    availability: 'In Stock',
    price: 11500,
    discountPrice: 10200,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['IP67 Weatherproof', 'IK10 Rated', 'CE / FCC Certified', 'GST e-Invoice Ready (HSN 8525)'],
    warranty: '2 Years Manufacturer Replacement Warranty',
    features: [
      {
        title: '60-Meter Extended Night Vision',
        description: 'High-power EXIR infrared LEDs illuminate pitch-black parking lots and warehouse perimeters.',
        metricHighlight: '60m IR Distance'
      },
      {
        title: 'Motorized Varifocal Optical Zoom',
        description: 'Adjust viewing angle remotely from 2.8mm (wide angle) to 12mm (telephoto zoom) from your phone/NVR.',
        metricHighlight: '4x Optical Zoom'
      },
      {
        title: 'License Plate Recognition (LPR)',
        description: 'High shutter speed mode freezes fast-moving vehicles at entry gates for crisp plate capture.',
        metricHighlight: 'Vehicle Capture Mode'
      },
      {
        title: 'IP67 All-Weather Aluminum Body',
        description: 'Complete sealing against torrential monsoons, dust storms, and extreme temperatures (-30°C to +60°C).',
        metricHighlight: 'IP67 Certified'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8525 (Transmission apparatus / CCTV Cameras)' },
      { label: 'Resolution', value: '8 Megapixel (3840 x 2160) at 30 fps' },
      { label: 'Motorized Lens', value: '2.8mm to 12mm Auto-Focus Varifocal Lens' },
      { label: 'Night Vision', value: 'Dual Smart IR LEDs up to 60m + Low-Light Color Mode' },
      { label: 'Interface', value: '1x RJ45 10M/100M Self-Adaptive Ethernet Port (PoE)' },
      { label: 'Operating Temp', value: '-30 °C to 60 °C (-22 °F to 140 °F), Humidity 95% or less' },
      { label: 'Housing', value: 'Full Metal Body with Integrated Cable Management Base' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Bullet Unit',
        pricePerUnit: 11500,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Bullet Camera', 'Heavy-Duty Bracket', 'Weatherproof Connector', '2-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Mounting & Angle Alignment',
        description: 'Securely mount to perimeter pole, exterior brick wall, or security gate structure.'
      },
      {
        step: '02',
        title: 'PoE Ethernet Hookup',
        description: 'Run single outdoor-rated Cat6 cable directly to your central PoE switch.'
      },
      {
        step: '03',
        title: 'Remote Zoom Calibration',
        description: 'Fine-tune the optical zoom and focus from the comfort of the security monitoring room.'
      },
      {
        step: '04',
        title: 'Perimeter Alert Rules',
        description: 'Set up real-time perimeter breach push alerts with automated siren/strobe triggers.'
      }
    ]
  },
  {
    id: 'cctv-03',
    name: '32-Channel 4K AI Network Video Recorder (NVR)',
    slug: '32-channel-4k-ai-network-video-recorder',
    code: 'LR-NVR-32CH03',
    tagline: 'Enterprise 8-Bay NVR with 320Mbps Bandwidth and RAID 0/1/5/6/10 Storage Redundancy',
    category: 'CCTV Cameras',
    brand: 'LR Vision Security',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial rackmount 32-camera surveillance server supporting up to 8x 16TB enterprise hard drives, dual 4K HDMI outputs, and AI face/vehicle search.',
    description: 'The central brain of your facility security. Records and indexes 32 simultaneous 4K streams with H.265+ smart compression. Features dual Gigabit network ports for physical network separation between cameras and corporate LAN.',
    badge: 'Central Surveillance Hub',
    rating: 5.0,
    availability: 'In Stock',
    price: 42000,
    discountPrice: 38500,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['ONVIF Compliant', 'RAID 5/6 Supported', 'BIS Certified', 'GST e-Invoice Ready (HSN 8521)'],
    warranty: '3 Years Enterprise Warranty',
    features: [
      {
        title: '32-Channel 4K Concurrent Recording',
        description: 'Supports up to 32 individual 8MP IP cameras streaming at full frame rates simultaneously.',
        metricHighlight: '320 Mbps Bandwidth'
      },
      {
        title: '8-Bay SATA Hard Drive Capacity',
        description: 'Up to 128 Terabytes raw storage capacity for 90+ days of uninterrupted continuous recording.',
        metricHighlight: 'Up to 128TB Storage'
      },
      {
        title: 'Hardware RAID 5/6 Protection',
        description: 'Zero data loss even if one or two hard drives physically fail in the storage array.',
        metricHighlight: 'Hot-Swap RAID Ready'
      },
      {
        title: 'Smart AI Quick Search & Playback',
        description: 'Filter through weeks of video footage in seconds by searching specific vehicle colors or human clothing.',
        metricHighlight: 'Fast AI Tag Search'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8521 (Video Recording or Reproducing Apparatus)' },
      { label: 'Channels', value: '32 IP Video Channel Inputs' },
      { label: 'Incoming Bandwidth', value: '320 Mbps (256 Mbps Outgoing)' },
      { label: 'HDD Bays', value: '8x SATA III Interfaces (Up to 16TB per HDD)' },
      { label: 'Video Outputs', value: '2x HDMI (up to 4K 3840x2160) + 1x VGA Independent' },
      { label: 'Network', value: '2x RJ-45 10M/100M/1000M Self-Adaptive Ethernet Ports' },
      { label: 'Form Factor', value: '2U 19-inch Rackmount Chassis with Redundant Fan Array' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: '32-Channel NVR Base Unit',
        pricePerUnit: 42000,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['32-Channel NVR Chassis', 'Rackmount Ears', 'Mouse & Power Cord', '3-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Install into 19" Equipment Rack',
        description: 'Slide unit into server rack enclosure with included heavy-duty rack rails.'
      },
      {
        step: '02',
        title: 'Insert Surveillance HDDs',
        description: 'Populate front-loading caddies with WD Purple or Seagate SkyHawk surveillance drives.'
      },
      {
        step: '03',
        title: 'Auto-Discover IP Cameras',
        description: 'NVR automatically scans the camera subnet, binds ONVIF streams, and activates recording.'
      },
      {
        step: '04',
        title: 'Setup Central Guard Console',
        description: 'Connect 4K wall monitors to HDMI 1 & 2 for custom 16-split or 32-split live security monitoring.'
      }
    ]
  },
  {
    id: 'cctv-04',
    name: '360° Panoramic Fisheye 12MP IP Camera',
    slug: '360-panoramic-fisheye-12mp-camera',
    code: 'LR-CAM-FISH04',
    tagline: 'Ceiling-Mount Single-Sensor Camera Covering Entire Retail and Warehouse Floors',
    category: 'CCTV Cameras',
    brand: 'LR Vision Security',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '12 Megapixel panoramic camera offering zero-blind-spot 360-degree coverage, client-side dewarping, and retail heat-mapping analytics.',
    description: 'Eliminates the cost of mounting 4 separate cameras in large open areas. One single fisheye camera installed at ceiling center captures an entire 1500 sq.ft hall with hardware dewarping into 4 virtual PTZ channels.',
    badge: '360° Zero Blind Spots',
    rating: 4.8,
    availability: 'In Stock',
    price: 18500,
    discountPrice: 16900,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['IK10 Vandal-Proof', 'Client Dewarping', 'Heatmap Ready', 'GST e-Invoice Ready (HSN 8525)'],
    warranty: '2 Years Manufacturer Replacement Warranty',
    features: [
      {
        title: '12MP Ultra-High Resolution Sensor',
        description: 'Extreme resolution allows zooming into individual checkout lanes and shelf aisles without pixelation.',
        metricHighlight: '4000 x 3000 Sensor'
      },
      {
        title: 'Complete 360° Hemispheric View',
        description: 'Replaces 3 to 4 conventional cameras, dramatically cutting down cabling and switch port costs.',
        metricHighlight: 'Zero Blind Spots'
      },
      {
        title: 'Real-Time Hardware Dewarping',
        description: 'Flattens panoramic fisheye distortion into standard 4-split rectangular perspectives on fly.',
        metricHighlight: '4 Virtual Views'
      },
      {
        title: 'Customer Foot-Traffic Heatmaps',
        description: 'Analyzes customer dwell times and walking paths across retail showroom displays.',
        metricHighlight: 'Business Analytics'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8525 (CCTV & Security Cameras)' },
      { label: 'Image Sensor', value: '1/1.7" Progressive Scan CMOS (12 Megapixels)' },
      { label: 'Focal Length', value: '1.29mm Ultra-Wide Fisheye Lens (180° / 360°)' },
      { label: 'IR Range', value: 'Smart IR LEDs up to 15m (360° Circular Array)' },
      { label: 'Audio & Alarm', value: 'Built-in Mic, Speaker for 2-way Talk + 1x Alarm In/Out' },
      { label: 'Power Options', value: 'PoE+ (802.3at) or 12V DC' },
      { label: 'Enclosure', value: 'Discreet Flush-Mount Ceiling Dome with IK10 Vandal Resistance' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Fisheye Camera',
        pricePerUnit: 18500,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['12MP Fisheye Camera', 'Ceiling Mount Bracket', 'Dewarping Software License', '2-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Center-Ceiling Installation',
        description: 'Mount flush to acoustic ceiling tile or concrete slab in center of the room.'
      },
      {
        step: '02',
        title: 'Connect PoE+ Switch Drop',
        description: 'Single Cat6 cable supplies full power, 12MP video stream, and two-way audio.'
      },
      {
        step: '03',
        title: 'Configure Virtual PTZ Splits',
        description: 'Dewarp the 360-degree round image into 4 independent virtual camera views.'
      },
      {
        step: '04',
        title: 'Review Heatmaps & Footage',
        description: 'Export retail traffic density maps and monitor comprehensive room security.'
      }
    ]
  },

  // =========================================================================
  // 03 — NETWORKING HARDWARE
  // =========================================================================
  {
    id: 'net-01',
    name: '24-Port Gigabit L2+ Managed PoE+ Switch',
    slug: '24-port-gigabit-managed-poe-switch',
    code: 'LR-NET-SW24P',
    tagline: '370W PoE Power Budget with 4x 10G SFP+ Uplinks for High-Density IP Cameras & Wi-Fi 6',
    category: 'Networking Hardware',
    brand: 'LR Core Networks',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Enterprise Layer 2+ switch delivering 24 Gigabit PoE+ ports (up to 30W per port), 4x 10G SFP+ fiber uplinks, static routing, VLAN segmentation, and cloud/CLI management.',
    description: 'Engineered as the workhorse edge switch for corporate offices, schools, and hospitals. Powers 24 IP cameras or Wi-Fi 6 access points with zero power bottlenecks, while dual 10G fiber uplinks prevent network congestion back to core servers.',
    badge: 'Enterprise Core Edge',
    rating: 4.9,
    availability: 'In Stock — Ready for Rack Deployment',
    price: 34500,
    discountPrice: 31500,
    unit: 'Unit',
    orderEnabled: true,
    featured: true,
    complianceTags: ['IEEE 802.3at/af', '10G SFP+ Ready', 'L2+ Static Routing', 'GST e-Invoice Ready (HSN 8517)'],
    warranty: '5 Years Limited Lifetime Enterprise Hardware Warranty',
    features: [
      {
        title: '370W Total PoE+ Power Budget',
        description: 'Powers 24 high-draw PTZ cameras, Wi-Fi 6 APs, and VoIP phones across all ports simultaneously.',
        metricHighlight: '370W PoE Budget'
      },
      {
        title: '4x 10-Gigabit SFP+ Fiber Uplinks',
        description: 'Ultra-high bandwidth backbone connection to server storage and core distribution switches.',
        metricHighlight: '4x 10G SFP+'
      },
      {
        title: 'Layer 2+ Static Routing & VLANs',
        description: 'Isolates guest Wi-Fi, CCTV streams, and finance databases into secure broadcast domains.',
        metricHighlight: '802.1Q VLANs'
      },
      {
        title: 'Intelligent Thermal Fan Control',
        description: 'Smart variable-speed cooling fans keep noise to a minimum while maintaining low operating temps.',
        metricHighlight: '< 32 dB Quiet'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8517 (Apparatus for transmission of data / Network Switches)' },
      { label: 'Ports', value: '24x 10/100/1000 Mbps RJ45 PoE+ Ports (802.3at/af)' },
      { label: 'Uplink Ports', value: '4x 10G/1G SFP+ Fiber Ports' },
      { label: 'Switching Capacity', value: '128 Gbps Non-Blocking Backplane' },
      { label: 'Forwarding Rate', value: '95.23 Mpps Packet Forwarding' },
      { label: 'Management', value: 'Web GUI, Console CLI, SNMP v1/v2c/v3, RMON, Cloud Controller' },
      { label: 'Form Factor', value: '1U 19-inch Standard Rackmount with Internal Power Supply' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Switch Unit',
        pricePerUnit: 34500,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['24-Port Switch', '19" Rackmount Brackets', 'Console Cable', '5-Year Lifetime Warranty']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Enterprise Infrastructure Multi-Pack (4+ Units)',
        pricePerUnit: 31500,
        billingPeriod: 'per unit (bulk)',
        minimumSeats: 4,
        featuresIncluded: ['Pre-Configured Trunk & VLAN Staging', 'Patch Cables Pack', 'Priority Next-Day Replacement']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Rack Mounting in Server Cabinet',
        description: 'Fasten unit into 1U slot using included standard cage nuts and rack screws.'
      },
      {
        step: '02',
        title: 'Patch Panel Termination',
        description: 'Connect Cat6 patch cords from patch panels directly into ports 1 through 24.'
      },
      {
        step: '03',
        title: 'VLAN & PoE Allocation Setup',
        description: 'Assign VLAN 10 for Corporate, VLAN 20 for CCTV, and VLAN 30 for Guest Wi-Fi.'
      },
      {
        step: '04',
        title: '10G Fiber Backbone Uplink',
        description: 'Insert 10G LC SFP+ optical transceiver to link directly with the server cluster.'
      }
    ]
  },
  {
    id: 'net-02',
    name: '48-Port 10G SFP+ Layer 3 Core Enterprise Switch',
    slug: '48-port-10g-sfp-plus-layer-3-core-switch',
    code: 'LR-NET-L3C48',
    tagline: 'High-Density Aggregation Switch with 6x 100G QSFP28 Uplinks and Redundant Hot-Swap Power',
    category: 'Networking Hardware',
    brand: 'LR Core Networks',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High-performance datacenter core switch providing 48x 10G/1G SFP+ ports, 6x 100G QSFP28 uplinks, dynamic OSPF/BGP routing, and 1+1 redundant hot-swappable AC power supplies.',
    description: 'Designed as the central nervous system for multi-story office buildings, datacenters, and campus headquarters. Handles line-rate 2.16 Tbps switching capacity with hardware BGP/OSPF/VRRP routing.',
    badge: 'Datacenter Backbone',
    rating: 5.0,
    availability: 'In Stock',
    price: 112000,
    discountPrice: 102000,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['Layer 3 Full Dynamic Routing', '1+1 Redundant Power', '2.16 Tbps Backplane', 'GST e-Invoice Ready (HSN 8517)'],
    warranty: '5 Years Next-Business-Day Replacement Warranty',
    features: [
      {
        title: '48x 10-Gigabit SFP+ Fiber Ports',
        description: 'Aggregates dozens of floor edge switches with dedicated wire-speed 10G connections.',
        metricHighlight: '48x 10G Ports'
      },
      {
        title: '6x 100G QSFP28 Ultra-High Uplinks',
        description: 'Connects directly to SAN storage matrices, high-speed virtualization servers, and ISP transit.',
        metricHighlight: '6x 100G QSFP28'
      },
      {
        title: 'Dynamic Layer 3 Routing (OSPF, BGP, VRRP)',
        description: 'Eliminates core router bottlenecks by performing line-rate inter-VLAN routing in hardware.',
        metricHighlight: 'Full L3 Stack'
      },
      {
        title: '1+1 Hot-Swappable Redundant Power Supplies',
        description: 'Zero system downtime even if one power circuit or power module is removed or serviced.',
        metricHighlight: '1+1 Redundancy'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8517 (Data Transmission / Core Network Switches)' },
      { label: 'Port Density', value: '48x 10G/1G SFP+ Ports + 6x 100G/40G QSFP28 Ports' },
      { label: 'Switching Capacity', value: '2.16 Tbps Non-Blocking Wire Speed' },
      { label: 'Packet Buffer', value: '32MB Intelligent Deep Packet Buffer' },
      { label: 'Power Supply', value: 'Dual 1+1 Hot-Swap 550W Platinum Redundant AC Modules' },
      { label: 'Airflow', value: 'Front-to-Back High-CFM Hot-Swappable Fan Trays' },
      { label: 'Chassis', value: '1U 19-inch Heavy-Duty Industrial Steel Enclosure' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Core Switch Base Configuration',
        pricePerUnit: 112000,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Core Switch Unit', 'Dual Redundant Power Modules', '4x SFP+ Transceivers Included', '5-Year NBD Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Core Datacenter Rack Placement',
        description: 'Install into central network distribution rack with dual independent power feeds.'
      },
      {
        step: '02',
        title: 'Inter-Floor Fiber Aggregation',
        description: 'Terminate single-mode/multi-mode fiber cables coming from all floor distribution switches.'
      },
      {
        step: '03',
        title: 'Configure High-Availability VRRP',
        description: 'Set up automated gateway redundancy and OSPF multi-area routing rules.'
      },
      {
        step: '04',
        title: 'Continuous NOC Telemetry',
        description: 'Integrate SNMP and Syslog output into centralized 24/7 network monitoring consoles.'
      }
    ]
  },
  {
    id: 'net-03',
    name: 'Enterprise Multi-WAN Dual-10G VPN Gateway Router',
    slug: 'enterprise-multi-wan-dual-10g-vpn-router',
    code: 'LR-NET-RTR03',
    tagline: 'High-Throughput Load Balancing Router with Hardware IPsec/WireGuard VPN Acceleration',
    category: 'Networking Hardware',
    brand: 'LR Core Networks',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Commercial multi-WAN load balancer and VPN gateway featuring 2x 10G SFP+ WAN/LAN ports, 8x Gigabit ports, policy-based routing, and failover redundancy.',
    description: 'Combines multiple ISP connections (Fiber, Cable, 5G backup) into a seamless high-speed internet link with instantaneous sub-second failover. Protects branch office interconnects with hardware-accelerated IPsec and WireGuard tunneling.',
    badge: 'Multi-ISP Redundancy',
    rating: 4.8,
    availability: 'In Stock',
    price: 54000,
    discountPrice: 49500,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['Dual-WAN Load Balance', 'Hardware IPsec AES-NI', 'WireGuard Support', 'GST e-Invoice Ready (HSN 8517)'],
    warranty: '3 Years Comprehensive Hardware Warranty',
    features: [
      {
        title: 'Multi-WAN Dynamic Load Balancing',
        description: 'Aggregates bandwidth across up to 4 different ISP fiber connections for maximum throughput.',
        metricHighlight: 'Up to 4 WAN Links'
      },
      {
        title: 'Instantaneous Zero-Drop Failover',
        description: 'If your primary ISP goes down, video calls and VoIP traffic switch to secondary ISP in milliseconds.',
        metricHighlight: '< 100ms Failover'
      },
      {
        title: 'Hardware VPN Cryptographic Engine',
        description: 'Delivers over 2.5 Gbps encrypted IPsec and WireGuard throughput for seamless site-to-site connectivity.',
        metricHighlight: '2.5 Gbps VPN Line-Rate'
      },
      {
        title: 'Built-in DPI Bandwidth Bandwidth Control',
        description: 'Prioritize Zoom, Microsoft Teams, and ERP traffic while throttling non-business video streaming.',
        metricHighlight: 'QoS Traffic Shaping'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8517 (Routers / Data Communication Equipment)' },
      { label: 'Interfaces', value: '2x 10G SFP+ WAN/LAN Ports + 8x Gigabit RJ45 Ports (Configurable)' },
      { label: 'Concurrent Sessions', value: '1,000,000 Concurrent TCP/UDP Sessions' },
      { label: 'NAT Throughput', value: '9.4 Gbps IPv4/IPv6 Routing Throughput' },
      { label: 'VPN Tunnels', value: 'Up to 500 Site-to-Site IPsec Tunnels + 1,000 Client VPN Users' },
      { label: 'CPU', value: 'Quad-Core 64-bit ARM 2.0 GHz Network Processing Engine with AES-NI' },
      { label: 'Form Factor', value: '1U Rackmount with Integrated AC Power Supply' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Enterprise Router Standard Package',
        pricePerUnit: 54000,
        billingPeriod: 'per router',
        minimumSeats: 1,
        featuresIncluded: ['Router Unit', 'Rackmount Ears', 'Power Cord', 'Console Cable', '3-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Connect Primary & Secondary ISPs',
        description: 'Plug ISP 1 (Primary Leased Line) into WAN 1 and ISP 2 (Backup Broadband) into WAN 2.'
      },
      {
        step: '02',
        title: 'Configure Load-Balancing Weights',
        description: 'Set up 70/30 traffic distribution or strict primary-active / backup-standby failover mode.'
      },
      {
        step: '03',
        title: 'Set Site-to-Site VPN Tunnels',
        description: 'Create encrypted mesh connections between headquarters and all remote branch offices.'
      },
      {
        step: '04',
        title: 'Activate QoS Application Rules',
        description: 'Guarantee minimum dedicated bandwidth for Zoom, Teams, and VoIP voice traffic.'
      }
    ]
  },
  {
    id: 'net-04',
    name: '42U Heavy-Duty Server & Network Rack Enclosure',
    slug: '42u-heavy-duty-server-network-rack-enclosure',
    code: 'LR-NET-RCK42',
    tagline: 'Standard 19-Inch 800x1000mm Datacenter Rack with Perforated High-Airflow Doors & Cable Fingers',
    category: 'Networking Hardware',
    brand: 'LR Enclosures',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial 42U server cabinet with 1500kg static load rating, 75% perforated front/rear honeycomb doors, integrated vertical cable management, and key-lock security.',
    description: 'The foundation for professional server rooms and network closets. Engineered with heavy-gauge cold-rolled steel, pre-installed grounding kits, and generous depth to accommodate deep 4-socket servers, UPS batteries, and dense patch panels.',
    badge: 'Server Room Essential',
    rating: 4.9,
    availability: 'In Stock — Flat-Pack or Pre-Assembled Dispatch',
    price: 48000,
    discountPrice: 43500,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['EIA/ECA-310-E Standard', '1500kg Load Rated', 'IP20 Protection', 'GST e-Invoice Ready (HSN 9403)'],
    warranty: '5 Years Structural Frame Warranty',
    features: [
      {
        title: '1500kg Static Weight Capacity',
        description: 'Heavy cold-rolled steel construction supports dense server stacks and heavy UPS battery units.',
        metricHighlight: '1500 kg Capacity'
      },
      {
        title: '75% Perforated Airflow Doors',
        description: 'Honeycomb mesh door pattern maximizes cold-aisle / hot-aisle server cooling efficiency.',
        metricHighlight: '75% High Airflow'
      },
      {
        title: 'Integrated Vertical Cable Channels',
        description: 'Wide side cable trays with plastic finger ducts keep hundreds of Cat6 and fiber patches immaculate.',
        metricHighlight: 'Clean Cable Dress'
      },
      {
        title: 'Keyed Master Locking Mechanism',
        description: 'Secures enterprise servers and network switches against unauthorized physical tampering.',
        metricHighlight: '3-Point Locking'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '9403 (Metal furniture / Server racks and enclosures)' },
      { label: 'Rack Height & Standard', value: '42U Standard (19-inch EIA-310-E Compliant)' },
      { label: 'Dimensions (W x D x H)', value: '800mm (W) x 1000mm (D) x 2050mm (H)' },
      { label: 'Material', value: '2.0mm High-Grade Cold Rolled Steel Posts, 1.2mm Side Panels' },
      { label: 'Mobility & Leveling', value: 'Heavy-Duty 360° Swivel Casters + 4x Adjustable Leveling Feet' },
      { label: 'Included Accessories', value: '2x Fixed Heavy Shelves, 1x 8-Way PDU, 50x Cage Nut Screws, Earth Ground Kit' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: '42U Cabinet Complete Package',
        pricePerUnit: 48000,
        billingPeriod: 'per enclosure',
        minimumSeats: 1,
        featuresIncluded: ['42U Cabinet', '2x Heavy-Duty Equipment Shelves', '8-Way Power Distribution Unit', 'Grounding Kit', '5-Year Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Placement & Leveling',
        description: 'Roll cabinet into position inside server room and lower leveling feet for solid vibration dampening.'
      },
      {
        step: '02',
        title: 'PDU & Grounding Installation',
        description: 'Connect pre-installed heavy-duty PDU to UPS circuit and bond copper ground busbar to room earth.'
      },
      {
        step: '03',
        title: 'Equipment Staging (Top to Bottom)',
        description: 'Mount patch panels and switches in top 10U, servers in middle 20U, and heavy UPS systems at bottom.'
      },
      {
        step: '04',
        title: 'Vertical Cable Dressing',
        description: 'Route all incoming Cat6 drops neatly through vertical finger ducts with velcro ties.'
      }
    ]
  },

  // =========================================================================
  // 04 — LAPTOPS
  // =========================================================================
  {
    id: 'lap-01',
    name: 'Executive Lightweight Enterprise Laptop 14"',
    slug: 'executive-lightweight-enterprise-laptop-14',
    code: 'LR-LAP-EXE01',
    tagline: 'Military-Grade Carbon Fiber Ultrabook with 14-Hour Battery, 5G LTE, and Core i7 vPro',
    category: 'Laptops',
    brand: 'LR Certified Enterprise',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Premium business ultrabook weighing just 1.18 kg with Intel Core i7 vPro processor, 32GB LPDDR5X RAM, 1TB Gen4 SSD, 2.8K OLED display, and TPM 2.0 biometric security.',
    description: 'Engineered for traveling executives, consultants, and senior management. Offers all-day battery life, crystal-clear 1080p AI noise-cancelling webcam for meetings, and optional 5G eSIM connectivity for secure internet anywhere.',
    badge: 'Executive Ultralight',
    rating: 4.9,
    availability: 'In Stock — Immediate Dispatch',
    price: 92000,
    discountPrice: 86500,
    unit: 'Unit',
    orderEnabled: true,
    featured: true,
    complianceTags: ['Intel vPro Enterprise', 'MIL-STD-810H Passed', 'TPM 2.0 Secured', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years International On-Site Commercial Warranty with Accidental Damage Protection',
    features: [
      {
        title: 'Ultra-Featherweight Carbon Chassis (1.18 kg)',
        description: 'Magnesium-carbon composite frame withstands drops, spills, and constant international travel.',
        metricHighlight: 'Only 1.18 kg Weight'
      },
      {
        title: '14-Hour Fast-Charging Battery',
        description: 'Work through full transatlantic flights; charges to 80% capacity in just 50 minutes via USB-C.',
        metricHighlight: '14h Battery Life'
      },
      {
        title: '2.8K (2880 x 1800) OLED 120Hz Display',
        description: 'Stunning 100% DCI-P3 color accuracy, deep blacks, and anti-reflective matte coating.',
        metricHighlight: '2.8K OLED 120Hz'
      },
      {
        title: 'Biometric Face & Fingerprint Login',
        description: 'Windows Hello IR camera with automated human presence detection locks screen when you walk away.',
        metricHighlight: 'Zero-Trust Lock'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Portable automatic data processing machines / Laptops)' },
      { label: 'Processor', value: 'Intel Core Ultra 7 155H (16 Cores, 22 Threads, NPU AI Engine)' },
      { label: 'Memory', value: '32GB LPDDR5X 7467MHz Dual-Channel' },
      { label: 'Storage', value: '1TB M.2 NVMe PCIe Gen4 Performance SSD' },
      { label: 'Display', value: '14.0-inch 2.8K (2880x1800) OLED, 400 nits, 120Hz, 100% DCI-P3' },
      { label: 'Ports', value: '2x Thunderbolt 4 (40Gbps, PD 3.0), 2x USB-A 3.2 Gen 1, 1x HDMI 2.1, Audio Jack' },
      { label: 'Wireless', value: 'Wi-Fi 7 (802.11be) + Bluetooth 5.4 + Optional 5G Sub-6 eSIM' },
      { label: 'Security', value: 'Hardware dTPM 2.0, Fingerprint Reader, Web Camera Privacy Shutter' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Executive Laptop Standard Supply',
        pricePerUnit: 92000,
        billingPeriod: 'per laptop',
        minimumSeats: 1,
        featuresIncluded: ['Laptop Unit', '65W USB-C GaN Charger', 'Protective Sleeve', '3-Year On-Site ADP Warranty']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Corporate Fleet Deployment (10+ Units)',
        pricePerUnit: 86500,
        billingPeriod: 'per laptop (bulk discount)',
        minimumSeats: 10,
        featuresIncluded: ['Pre-Configured Domain Join & VPN', 'Custom Asset Tagging', 'Free On-Site Handover']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Configure OS & Encryption Options',
        description: 'Choose between Windows 11 Pro with BitLocker encryption or Ubuntu Enterprise Certified.'
      },
      {
        step: '02',
        title: 'Zero-Touch Autopilot Enrollment',
        description: 'We register device hardware hashes into your Microsoft Intune / MDM tenant.'
      },
      {
        step: '03',
        title: 'Express Doorstep Delivery',
        description: 'Shipped directly to your office or employee home addresses with tamper-evident seals.'
      },
      {
        step: '04',
        title: 'Global On-Site Tech Support',
        description: 'Next-business-day on-site engineer dispatch for keyboard, screen, or motherboard replacements.'
      }
    ]
  },
  {
    id: 'lap-02',
    name: 'Precision Mobile Workstation Laptop 16"',
    slug: 'precision-mobile-workstation-laptop-16',
    code: 'LR-LAP-WRK02',
    tagline: 'Desktop-Class Compute Power with Intel Core i9, NVIDIA RTX 4000 Ada GPU, and 64GB RAM',
    category: 'Laptops',
    brand: 'LR Certified Enterprise',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavyweight computing performance in a mobile form factor. Combines Intel Core i9-14900HX, NVIDIA RTX 4000 Ada 12GB graphics, 64GB RAM, and dual Gen4 NVMe slots for on-site simulation and VR.',
    description: 'Designed for field engineers, VFX animators, and data scientists requiring extreme workstation power on construction sites, client pitches, or remote filming locations. ISV certified for AutoCAD, SolidWorks, Maya, and Premiere Pro.',
    badge: 'Ultimate Mobile Compute',
    rating: 5.0,
    availability: 'In Stock',
    price: 188000,
    discountPrice: 175000,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['ISV Certified', 'Vapor Chamber Cooled', 'Thunderbolt 4 Certified', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years Next-Business-Day International On-Site Service',
    features: [
      {
        title: 'Desktop-Grade Core i9-14900HX (24 Cores)',
        description: 'Delivers full multi-threaded performance for rendering 3D scenes and running local LLM inference.',
        metricHighlight: '24 Cores / 5.8 GHz'
      },
      {
        title: 'NVIDIA RTX 4000 Ada (12GB GDDR6)',
        description: 'Certified workstation GPU with ECC VRAM support prevents viewport glitches in 3D CAD modeling.',
        metricHighlight: '12GB Workstation VRAM'
      },
      {
        title: 'Massive 64GB DDR5 Expandable Memory',
        description: 'Dual SODIMM slots allow expanding system memory up to 128GB for immense datasets.',
        metricHighlight: '64GB DDR5 (Up to 128GB)'
      },
      {
        title: 'Dual Liquid-Metal Vapor Chamber Cooling',
        description: 'Dissipates over 175W of sustained combined CPU/GPU thermal power without thermal throttling.',
        metricHighlight: '175W Thermal Capacity'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Workstation Laptops / Computing Machines)' },
      { label: 'Processor', value: 'Intel Core i9-14900HX (24 Cores, 32 Threads, 36MB Cache)' },
      { label: 'GPU', value: 'NVIDIA RTX 4000 Ada Generation Laptop GPU (12GB GDDR6)' },
      { label: 'Memory', value: '64GB DDR5 5600MHz (2x 32GB SODIMM, expandable to 128GB)' },
      { label: 'Storage', value: '2TB NVMe PCIe Gen4 M.2 Performance SSD (1x Extra NVMe Slot Free)' },
      { label: 'Display', value: '16.0-inch 4K UHD+ (3840x2400) IPS, 500 nits, 100% AdobeRGB, Factory Calibrated' },
      { label: 'Battery & Power', value: '99.9 Wh High-Capacity Battery + 240W GaN Slim AC Adapter' },
      { label: 'Chassis', value: 'CNC Machined Anodized Aluminum with Spill-Resistant Backlit Keyboard' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Mobile Workstation Standard Unit',
        pricePerUnit: 188000,
        billingPeriod: 'per laptop',
        minimumSeats: 1,
        featuresIncluded: ['Mobile Workstation', '240W Charger', 'Color Calibration Report', '3-Year NBD Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Hardware Sizing & Verification',
        description: 'We confirm software requirements (Revit, ANSYS, Blender) and benchmark memory allocation.'
      },
      {
        step: '02',
        title: 'Thermal & Graphic Burn-In',
        description: 'Every workstation undergoes full 3DMark and FurMark stress testing prior to packaging.'
      },
      {
        step: '03',
        title: 'Protective Courier Delivery',
        description: 'Dispatched in shock-absorbent rugged courier cases with transit insurance.'
      },
      {
        step: '04',
        title: 'Priority Enterprise Support',
        description: 'Direct access to senior hardware engineering tier with next-day parts replacement.'
      }
    ]
  },
  {
    id: 'lap-03',
    name: 'Mainstream Commercial Office Laptop 15.6"',
    slug: 'mainstream-commercial-office-laptop-15',
    code: 'LR-LAP-BUS03',
    tagline: 'Durable, Budget-Friendly Business Laptop with Numeric Keypad and 10-Hour Battery',
    category: 'Laptops',
    brand: 'LR Certified Enterprise',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'The essential business standard. Equipped with Intel Core i5 processor, 16GB DDR5 memory, 512GB SSD, full numeric keypad, and full-size Ethernet RJ45 port for daily office teams.',
    description: 'Engineered for call centers, operations teams, banking branches, and enterprise office workforces. Delivers dependable day-in day-out reliability with reinforced hinges, spill-resistant keyboard, and dual-microphone background noise suppression.',
    badge: 'Best Corporate Value',
    rating: 4.8,
    availability: 'In Stock — High Bulk Availability',
    price: 54500,
    discountPrice: 49900,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['EPEAT Gold', 'Energy Star 8.0', 'TÜV Low Blue Light', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years On-Site Comprehensive Commercial Warranty',
    features: [
      {
        title: '14th Gen Intel Core i5 Efficiency',
        description: 'Smooth performance across Google Workspace, Microsoft 365, Zoom, and enterprise web portals.',
        metricHighlight: 'Core i5-1335U'
      },
      {
        title: 'Full Dedicated Numeric Keypad',
        description: 'Essential for accounting, finance, inventory data entry, and spreadsheet analysis.',
        metricHighlight: 'Full 10-Key Numpad'
      },
      {
        title: 'Native Gigabit Ethernet (RJ-45) Port',
        description: 'Plug directly into enterprise office desk network drops without needing annoying dongles.',
        metricHighlight: 'Native RJ45 Jack'
      },
      {
        title: 'Spill-Resistant Keyboard & Anti-Glare Screen',
        description: 'Tolerates minor coffee spills and prevents harsh overhead office fluorescent glare.',
        metricHighlight: 'Anti-Glare FHD'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Commercial Laptops / Business Computing)' },
      { label: 'Processor', value: 'Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6 GHz)' },
      { label: 'Memory', value: '16GB DDR5 5200MHz (Upgradeable to 32GB)' },
      { label: 'Storage', value: '512GB M.2 NVMe PCIe Gen4 SSD' },
      { label: 'Display', value: '15.6-inch Full HD (1920x1080) IPS, 300 nits, Anti-Glare Coating' },
      { label: 'Ports', value: '1x USB-C (DisplayPort & Power), 2x USB-A 3.2, 1x HDMI 1.4b, 1x RJ45 LAN, SD Reader' },
      { label: 'Camera & Audio', value: '720p HD Webcam with Privacy Slider + Dual Array Digital Mics' },
      { label: 'Weight & Battery', value: '1.68 kg with 54Wh All-Day Fast-Charging Battery' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Single Unit Standard Supply',
        pricePerUnit: 54500,
        billingPeriod: 'per laptop',
        minimumSeats: 1,
        featuresIncluded: ['Laptop Unit', '65W Power Adapter', '3-Year On-Site Commercial Warranty']
      },
      {
        licenseType: 'MONTHLY',
        name: 'Bulk Operations Package (20+ Units)',
        pricePerUnit: 49900,
        billingPeriod: 'per laptop (bulk discount)',
        minimumSeats: 20,
        featuresIncluded: ['Company Wallpaper & Domain Staging', 'Free On-Site Bulk Handover', 'Dedicated Account Manager']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Bulk Quantity Quotation',
        description: 'Enter required laptop count (1 to 500+ units) in our self-service order wizard.'
      },
      {
        step: '02',
        title: 'Corporate GST Billing Validation',
        description: 'Instant generation of GST compliant proforma invoices with your organization GSTIN.'
      },
      {
        step: '03',
        title: 'Pre-Delivery Quality Checks',
        description: 'Units are staged, verified for dead pixels, and loaded with standard corporate image.'
      },
      {
        step: '04',
        title: 'Direct Multi-Office Distribution',
        description: 'Dispatched in bulk cartons directly to your regional branch offices across India.'
      }
    ]
  },
  {
    id: 'lap-04',
    name: 'Ultra-Rugged Field Service Laptop 14"',
    slug: 'ultra-rugged-field-service-laptop-14',
    code: 'LR-LAP-RUG04',
    tagline: 'IP65 Water/Dust Sealed & MIL-STD-810H Drop-Proof Laptop with 1000-Nit Sunlight Readable Screen',
    category: 'Laptops',
    brand: 'LR Rugged Systems',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial tough laptop designed for harsh field environments, factories, mining sites, and emergency services. Features hot-swappable dual batteries, RS-232 serial port, and glove-touch display.',
    description: 'Built like a tank to operate reliably in scorching heat, sub-zero winters, driving rain, and dusty construction yards. Survives 6-foot drops onto concrete, intense vibrations, and electromagnetic interference.',
    badge: 'Industrial Grade Extreme',
    rating: 4.9,
    availability: 'In Stock',
    price: 165000,
    discountPrice: 152000,
    unit: 'Unit',
    orderEnabled: true,
    featured: false,
    complianceTags: ['MIL-STD-810H Certified', 'IP65 Ingress Protected', 'ATEX Zone 2 Ready', 'GST e-Invoice Ready (HSN 8471)'],
    warranty: '3 Years Comprehensive Bumper-to-Bumper Warranty (Including Accidental Drop Damage)',
    features: [
      {
        title: 'MIL-STD-810H & IP65 Certified Housing',
        description: 'Magnesium alloy chassis with shock-absorbing elastomer bumpers survives 6-ft concrete drops.',
        metricHighlight: '6-ft Drop Proof'
      },
      {
        title: '1000-Nit Ultra-Bright Sunlight Screen',
        description: 'Direct optical bonding and anti-reflective filters make screen easily readable in harsh desert sun.',
        metricHighlight: '1000 Nits Brightness'
      },
      {
        title: 'Hot-Swappable Dual Battery System',
        description: 'Swap dead battery for a fresh one while the laptop is running without shutting down applications.',
        metricHighlight: '24/7 Zero Downtime'
      },
      {
        title: 'Native RS-232 Serial Port & Dual LAN',
        description: 'Directly configure CNC machinery, PLC controllers, and industrial networking hardware in field.',
        metricHighlight: 'Native DB9 Serial'
      }
    ],
    specs: [
      { label: 'HSN Code', value: '8471 (Rugged Computer Systems / Field Laptops)' },
      { label: 'Processor', value: 'Intel Core i7-1370P vPro (14 Cores, 20 Threads)' },
      { label: 'Memory', value: '32GB DDR5 Sealed Shock-Resistant RAM' },
      { label: 'Storage', value: '1TB Removable Quick-Release NVMe SSD (Heated for Sub-Zero Boot)' },
      { label: 'Display', value: '14.0-inch FHD (1920x1080) 1000 nits Glove-Touch Capacitive Touchscreen' },
      { label: 'Industrial I/O', value: '1x True RS-232 Serial (DB9), 2x RJ45 Gigabit Ethernet, 2x USB 3.2, 1x HDMI' },
      { label: 'Environmental', value: 'Operating Temp: -29°C to 63°C (-20°F to 145°F), IP65 Sealed Port Doors' },
      { label: 'Carrying Design', value: 'Integrated Ergonomic Rigid Handle + Retractable Stylus Pen' }
    ],
    pricing: [
      {
        licenseType: 'ANNUAL',
        name: 'Rugged Field Package',
        pricePerUnit: 165000,
        billingPeriod: 'per unit',
        minimumSeats: 1,
        featuresIncluded: ['Rugged Laptop', 'Dual Hot-Swap Batteries', 'Heavy-Duty AC Charger', 'Stylus', '3-Year Bumper-to-Bumper Warranty']
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Environmental Assessment',
        description: 'We evaluate site environmental extremes (temperature, dust, explosive atmosphere ratings).'
      },
      {
        step: '02',
        title: 'Industrial Interface Setup',
        description: 'Configure RS-232 baud rates and specialized diagnostics telemetry software.'
      },
      {
        step: '03',
        title: 'Rugged Pelican Case Dispatch',
        description: 'Shipped in heavy-duty flight cases with extra hot-swappable batteries and vehicle chargers.'
      },
      {
        step: '04',
        title: 'Unconditional Swap Warranty',
        description: 'Immediate replacement unit provided if physical damage occurs in harsh field duty.'
      }
    ]
  }
];
