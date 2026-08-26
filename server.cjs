var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");

// src/data/productsData.ts
var productsData = [
  // =========================================================================
  // 01 — COMPUTER HARDWARE
  // =========================================================================
  {
    id: "hw-01",
    name: "Enterprise Commercial Desktop PC",
    slug: "enterprise-business-desktop-pc",
    code: "LR-HW-DSK01",
    tagline: "Reliable Core i7 Business Workstation for High-Productivity Office Workloads",
    category: "Computer Hardware",
    brand: "LR Certified Enterprise",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Commercial-grade business desktop computer with high-speed NVMe storage, expandable DDR5 memory, and dual 4K display outputs for daily enterprise computing.",
    description: "Engineered for 24/7 commercial reliability, this business desktop delivers responsive performance across accounting, ERP systems, multi-tab office applications, and corporate database management. Features robust metal chassis ventilation, front USB-C connectivity, and enterprise BIOS hardware security.",
    badge: "Enterprise Best-Seller",
    rating: 4.9,
    availability: "In Stock \u2014 Ready for Immediate Dispatch",
    price: 68500,
    discountPrice: 62900,
    unit: "Unit",
    orderEnabled: true,
    featured: true,
    complianceTags: ["BIS Certified", "Energy Star 8.0", "RoHS Compliant", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years On-Site Comprehensive Hardware Warranty",
    features: [
      {
        title: "14th Gen Intel Core i7 Processor",
        description: "Multi-core computing architecture engineered for intensive multitasking and business data processing.",
        metricHighlight: "Up to 5.2 GHz Boost"
      },
      {
        title: "High-Speed NVMe Gen4 Storage",
        description: "Instant operating system boot times and near-instantaneous enterprise file transfers.",
        metricHighlight: "1TB M.2 PCIe 4.0"
      },
      {
        title: "Dual 4K Display Outputs",
        description: "DisplayPort and HDMI outputs supporting multi-monitor productivity setups seamlessly.",
        metricHighlight: "Dual 4K @ 60Hz"
      },
      {
        title: "Tool-Less Expandable Chassis",
        description: "Effortless internal upgrades for additional storage drives, PCIe cards, and RAM expansion.",
        metricHighlight: "Up to 64GB DDR5"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Automatic Data Processing Machines)" },
      { label: "Processor", value: "Intel Core i7-14700 (20 Cores, 28 Threads)" },
      { label: "System Memory", value: "16GB DDR5 5600MHz (Expandable to 64GB)" },
      { label: "Primary Storage", value: "1TB NVMe M.2 PCIe Gen 4 SSD" },
      { label: "Graphics", value: "Intel UHD Graphics 770 (Dual Display Output)" },
      { label: "Networking", value: "Gigabit Ethernet (RJ-45) + Wi-Fi 6 AX + Bluetooth 5.3" },
      { label: "Power Supply", value: "350W 80 PLUS Bronze High-Efficiency PSU" },
      { label: "Operating System", value: "Windows 11 Pro 64-bit / Linux Compatible" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Unit Standard Supply",
        pricePerUnit: 68500,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Hardware Unit", "Power Cable", "3-Year On-Site Warranty", "Pre-installed Windows 11 Pro"]
      },
      {
        licenseType: "MONTHLY",
        name: "Enterprise Bulk Deployment (10+ Units)",
        pricePerUnit: 62900,
        billingPeriod: "per unit (bulk discount)",
        minimumSeats: 10,
        featuresIncluded: ["Custom Golden OS Image Staging", "Asset Tagging", "Free On-Site Delivery", "Dedicated Technical Support"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Configuration & Quantity Selection",
        description: "Select quantity and submit your delivery and GST billing details via our self-service procurement wizard."
      },
      {
        step: "02",
        title: "Automated Order Dispatch",
        description: "Our warehouse team stages, tests hardware components, and burns in memory/storage before dispatch."
      },
      {
        step: "03",
        title: "On-Site Delivery & Setup",
        description: "Units arrive securely packaged with GST compliance documentation and on-site deployment support."
      },
      {
        step: "04",
        title: "Comprehensive Warranty Support",
        description: "Direct technician dispatch and on-site component replacement under 3-year enterprise warranty."
      }
    ]
  },
  {
    id: "hw-02",
    name: "Precision CAD & Engineering Workstation",
    slug: "precision-cad-engineering-workstation",
    code: "LR-HW-WRK02",
    tagline: "Extreme Compute & GPU Acceleration for 3D Modeling, Simulation, and AI Inference",
    category: "Computer Hardware",
    brand: "LR Certified Enterprise",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Heavy-duty workstation powered by Intel Core i9 / Xeon, NVIDIA RTX professional graphics, and ECC memory for rendering and structural simulation.",
    description: "Purpose-built for architects, mechanical engineers, and data scientists running AutoCAD, Revit, SolidWorks, Blender, and deep learning models. Features ISV certifications, high-airflow cooling, and redundant power options.",
    badge: "Heavy Compute",
    rating: 5,
    availability: "In Stock \u2014 Configured to Order",
    price: 145e3,
    discountPrice: 135e3,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["ISV Certified", "BIS Certified", "ECC Memory Protected", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years Next-Business-Day On-Site Warranty",
    features: [
      {
        title: "NVIDIA RTX Professional GPU",
        description: "Certified drivers guarantee zero crashes and rapid viewport rendering in Autodesk, Dassault, and Adobe suites.",
        metricHighlight: "16GB GDDR6 VRAM"
      },
      {
        title: "DDR5 ECC Error-Correcting Memory",
        description: "Eliminates single-bit memory corruptions during multi-day rendering or complex physics simulations.",
        metricHighlight: "64GB DDR5 ECC"
      },
      {
        title: "Dual Gen4 NVMe RAID Storage",
        description: "Configured in RAID 1 for real-time mirroring to protect project files against drive failure.",
        metricHighlight: "2x 2TB NVMe RAID"
      },
      {
        title: "850W Platinum Redundant PSU Ready",
        description: "Clean, continuous power delivery under sustained 100% CPU and GPU compute loads.",
        metricHighlight: "92% Efficiency"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Automatic Data Processing Machines)" },
      { label: "Processor", value: "Intel Core i9-14900K (24 Cores, 32 Threads, up to 6.0 GHz)" },
      { label: "Memory", value: "64GB DDR5 5600MHz ECC (Expandable to 128GB)" },
      { label: "Dedicated Graphics", value: "NVIDIA RTX 4000 Ada Generation (16GB GDDR6 ECC)" },
      { label: "Storage", value: "2x 2TB NVMe M.2 PCIe Gen4 in Hardware RAID" },
      { label: "Cooling", value: "Closed-Loop Liquid Cooler with 360mm Radiator" },
      { label: "Power Supply", value: "850W 80 PLUS Platinum Certified" },
      { label: "Chassis Form Factor", value: "Full Tower with Acoustic Sound Dampening" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Standard Workstation Package",
        pricePerUnit: 145e3,
        billingPeriod: "per workstation",
        minimumSeats: 1,
        featuresIncluded: ["Workstation Unit", "ISV-Certified Driver Suite", "3-Year NBD On-Site Warranty"]
      },
      {
        licenseType: "MONTHLY",
        name: "Design Studio Bundle (5+ Units)",
        pricePerUnit: 135e3,
        billingPeriod: "per workstation (bulk)",
        minimumSeats: 5,
        featuresIncluded: ["Custom CAD Benchmark Validation", "Free On-Site Staging", "Priority Spare Parts Pool"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Workflow Sizing Consultation",
        description: "We verify memory and GPU requirements for your software toolchains (AutoCAD, Revit, SolidWorks)."
      },
      {
        step: "02",
        title: "Burn-In Stress Testing",
        description: "Every workstation undergoes a mandatory 24-hour thermal and memory stress test before packing."
      },
      {
        step: "03",
        title: "Safe White-Glove Transport",
        description: "Delivered in high-density foam crates with GPU braces installed to prevent transit damage."
      },
      {
        step: "04",
        title: "On-Site Commissioning",
        description: "Our engineers handle physical placement, peripheral cabling, and driver initialization."
      }
    ]
  },
  {
    id: "hw-03",
    name: "27-inch 4K UHD IPS Commercial Monitor",
    slug: "27-inch-4k-uhd-commercial-monitor",
    code: "LR-HW-MON03",
    tagline: "Factory Calibrated Ultra-High Definition Display with 90W USB-C Power Delivery",
    category: "Computer Hardware",
    brand: "LR Vision Displays",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Color-accurate 4K IPS display featuring ultra-thin bezels, ergonomic height/tilt stand, and single-cable USB-C laptop docking.",
    description: "Designed to elevate modern workspace productivity. With 3840 x 2160 resolution, 99% sRGB color gamut, and T\xDCV Rheinland certified low-blue-light technology, this monitor reduces eye strain during long working hours.",
    badge: "Display Ergonomics",
    rating: 4.8,
    availability: "In Stock \u2014 Ready for Dispatch",
    price: 26500,
    discountPrice: 24e3,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["T\xDCV Eye Comfort", "Energy Star", "VESA 100x100 Ready", "GST e-Invoice Ready (HSN 8528)"],
    warranty: "3 Years Advanced Replacement Warranty",
    features: [
      {
        title: "Crisp 4K UHD Resolution",
        description: "Over 8.3 million pixels deliver razor-sharp typography and immaculate spreadsheet clarity.",
        metricHighlight: "3840 x 2160 IPS"
      },
      {
        title: "90W USB-C Power Delivery",
        description: "Charge your laptop while transmitting 4K video and USB hub signals via a single cable.",
        metricHighlight: "Single Cable Docking"
      },
      {
        title: "4-Way Ergonomic Stand",
        description: "Height adjustment, tilt, swivel, and 90\xB0 pivot rotation for vertical document viewing.",
        metricHighlight: "150mm Height Travel"
      },
      {
        title: "99% sRGB Color Accuracy",
        description: "Factory calibrated color profiles for consistent, lifelike visuals across all creative tasks.",
        metricHighlight: "Delta E < 2"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8528 (Monitors and Projectors)" },
      { label: "Screen Size & Panel", value: "27-inch IPS (In-Plane Switching) Anti-Glare" },
      { label: "Resolution", value: "3840 x 2160 at 60Hz" },
      { label: "Brightness & Contrast", value: "350 cd/m\xB2, 1000:1 Static Contrast Ratio" },
      { label: "Connectivity", value: "1x USB-C (90W PD), 2x HDMI 2.0, 1x DisplayPort 1.4, 4x USB 3.2 Hub" },
      { label: "Audio", value: "Integrated 2x 3W Stereo Speakers + 3.5mm Audio Out" },
      { label: "Mounting", value: "VESA 100x100mm Standard Mount" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Display Unit",
        pricePerUnit: 26500,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Monitor & Ergonomic Stand", "USB-C Cable", "HDMI Cable", "3-Year Replacement Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Select Units & Mounting",
        description: "Choose desk stand or VESA arm configurations for your office floor plan."
      },
      {
        step: "02",
        title: "Immediate Logistics Dispatch",
        description: "Shipped with reinforced corner foam protectors and verified pixel-perfect display panels."
      },
      {
        step: "03",
        title: "Plug & Play Integration",
        description: "Zero driver installation needed for Windows, macOS, or ChromeOS."
      },
      {
        step: "04",
        title: "Express Swapping",
        description: "Immediate replacement unit dispatch if any panel fault is encountered during warranty."
      }
    ]
  },
  {
    id: "hw-04",
    name: "Online Double-Conversion 2kVA UPS System",
    slug: "online-double-conversion-2kva-ups",
    code: "LR-HW-UPS04",
    tagline: "Zero-Transfer Time Pure Sine Wave Power Protection for Servers and Critical Workstations",
    category: "Computer Hardware",
    brand: "LR Power Systems",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Enterprise 2000VA / 1800W rack/tower convertible online UPS delivering clean, continuous pure sine wave power, automatic voltage regulation, and SNMP remote monitoring.",
    description: "Safeguards servers, network switches, and critical workstations against total blackouts, voltage brownouts, surges, and electrical noise. Double-conversion topology guarantees 0ms transfer time to battery when main utility power fails.",
    badge: "Power Protection",
    rating: 4.9,
    availability: "In Stock",
    price: 38e3,
    discountPrice: 35500,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["CE Certified", "IEC 62040-1", "RoHS Compliant", "GST e-Invoice Ready (HSN 8504)"],
    warranty: "2 Years Comprehensive Warranty (Including Batteries)",
    features: [
      {
        title: "Zero Transfer Time (0ms)",
        description: "True double-conversion ensures sensitive server power supplies never experience a micro-drop.",
        metricHighlight: "0ms Transfer Time"
      },
      {
        title: "Pure Sine Wave Output",
        description: "Prevents damage to active PFC server power supplies and medical computing hardware.",
        metricHighlight: "THD < 2%"
      },
      {
        title: "Intelligent LCD Dashboard",
        description: "Real-time load wattage, battery runtime remaining, and input/output voltage telemetry.",
        metricHighlight: "Interactive Display"
      },
      {
        title: "Network Management Ready",
        description: "Optional SNMP card slot for automated email alerts and safe graceful server shutdown scripts.",
        metricHighlight: "SNMP/HTTP Support"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8504 (Electrical Transformers, Static Converters & UPS)" },
      { label: "Capacity", value: "2000VA / 1800W True Online" },
      { label: "Input Voltage Range", value: "110V - 300V AC (Auto Sensing)" },
      { label: "Output Voltage", value: "220V/230V/240V AC Pure Sine Wave \xB11%" },
      { label: "Battery Type", value: "Sealed Lead-Acid 12V / 9Ah x 4 (Hot-Swappable)" },
      { label: "Form Factor", value: "2U Rackmount or Floor Tower Convertible" },
      { label: "Outlets", value: "6x IEC C13 Outlets + 1x High-Current C19" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "UPS Standard Package",
        pricePerUnit: 38e3,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["UPS Unit", "Battery Pack Pre-installed", "Rackmount Ears & Tower Feet", "2-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Load Calculation",
        description: "We help calculate total peak wattage across your server and workstation loads."
      },
      {
        step: "02",
        title: "Delivery & Battery Connection",
        description: "Shipped with safety isolator connected; ready for simple screwless rack insertion."
      },
      {
        step: "03",
        title: "Automated Shutdown Setup",
        description: "Connect USB/Ethernet to configure automatic graceful server shutdowns during outages."
      },
      {
        step: "04",
        title: "Ongoing Power Security",
        description: "Battery health self-testing runs automatically every 14 days."
      }
    ]
  },
  // =========================================================================
  // 02 — CCTV CAMERAS
  // =========================================================================
  {
    id: "cctv-01",
    name: "4K Ultra HD AI Smart IP Dome Camera",
    slug: "4k-ultra-hd-smart-ip-dome-camera",
    code: "LR-CAM-DOME01",
    tagline: "Vandal-Proof 8MP Commercial Dome Camera with Human/Vehicle AI Classification",
    category: "CCTV Cameras",
    brand: "LR Vision Security",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "High-resolution 4K PoE security dome camera equipped with smart AI motion filtering, 30m infrared night vision, vandal-proof IK10 casing, and built-in microphone.",
    description: "Designed for commercial lobbies, office hallways, retail stores, and perimeter entryways. Deep-learning algorithms eliminate false alarms triggered by rain, trees, or small animals by classifying human and vehicle silhouettes in real time with crystal clear 8MP imaging.",
    badge: "Top Commercial Dome",
    rating: 4.9,
    availability: "In Stock \u2014 Ready for Installation",
    price: 9800,
    discountPrice: 8900,
    unit: "Unit",
    orderEnabled: true,
    featured: true,
    complianceTags: ["IK10 Vandal-Proof", "IP67 Weatherproof", "ONVIF Profile S/G/T", "GST e-Invoice Ready (HSN 8525)"],
    warranty: "2 Years Manufacturer Replacement Warranty",
    features: [
      {
        title: "8MP 4K Ultra HD Resolution",
        description: "Captures crisp facial features, license plates, and currency exchange details with sharp clarity.",
        metricHighlight: "3840 x 2160 @ 30fps"
      },
      {
        title: "Smart Human & Vehicle AI Detection",
        description: "Filters false alarms by over 95%, alerting security teams only to verified perimeter intrusions.",
        metricHighlight: "< 5% False Alarms"
      },
      {
        title: "True 120dB Wide Dynamic Range (WDR)",
        description: "Balances extreme backlight situations near glass doors and windows without washing out faces.",
        metricHighlight: "120dB True WDR"
      },
      {
        title: "Vandal-Resistant IK10 Metal Housing",
        description: "Heavy-duty aluminum housing withstands physical impacts and harsh outdoor weather conditions.",
        metricHighlight: "IK10 & IP67 Rated"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8525 (Transmission apparatus for radio-broadcasting / CCTV)" },
      { label: "Image Sensor", value: '1/2.8" Progressive Scan CMOS Sensor' },
      { label: "Lens Options", value: "2.8mm (108\xB0 FOV) or 4.0mm (86\xB0 FOV)" },
      { label: "Night Vision IR Range", value: "Up to 30 Meters (Smart EXIR LEDs)" },
      { label: "Power Input", value: "PoE (802.3af, Class 3) or 12V DC \xB1 25%" },
      { label: "Video Compression", value: "H.265+ / H.265 / H.264+ / H.264" },
      { label: "Edge Storage", value: "MicroSD / MicroSDHC / MicroSDXC Slot up to 512GB" },
      { label: "Audio & Alarm", value: "Built-in Noise-Cancelling Microphone" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Camera Unit",
        pricePerUnit: 9800,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Dome Camera Unit", "Mounting Template & Screws", "Waterproof RJ45 Cap", "2-Year Warranty"]
      },
      {
        licenseType: "MONTHLY",
        name: "Bulk Commercial Pack (10+ Units)",
        pricePerUnit: 8900,
        billingPeriod: "per unit (bulk package)",
        minimumSeats: 10,
        featuresIncluded: ["Free NVR Integration Configuration", "Cable Labels", "Fast Priority Support"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Select Camera Quantity & Focal Length",
        description: "Choose 2.8mm for wide room coverage or 4mm for corridor/entry zoom."
      },
      {
        step: "02",
        title: "PoE Single-Cable Connection",
        description: "Connect standard CAT6 cable from your PoE switch or NVR; power and video transmit together."
      },
      {
        step: "03",
        title: "AI Smart Boundary Setup",
        description: "Draw virtual tripwire lines and intrusion boxes via NVR or browser interface."
      },
      {
        step: "04",
        title: "Mobile & Cloud Live Streaming",
        description: "Receive instant push alerts and review playback on iOS, Android, and desktop."
      }
    ]
  },
  {
    id: "cctv-02",
    name: "Long-Range Outdoor 4K Bullet Camera",
    slug: "long-range-outdoor-4k-bullet-camera",
    code: "LR-CAM-BLT02",
    tagline: "IP67 Weatherproof Perimeter Security Camera with 60m Night Vision & Color Night Mode",
    category: "CCTV Cameras",
    brand: "LR Vision Security",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Industrial outdoor bullet camera with 60-meter infrared illumination, motorized varifocal zoom lens, full metal weather housing, and license plate capture capability.",
    description: "Engineered for campus boundary fences, parking lots, logistics yards, and highway toll gates. Features motorized 4x optical zoom, IP67 waterproof certification, and high-intensity infrared array for zero-lux nighttime surveillance.",
    badge: "Long Range Surveillance",
    rating: 4.9,
    availability: "In Stock",
    price: 11500,
    discountPrice: 10200,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["IP67 Weatherproof", "IK10 Rated", "CE / FCC Certified", "GST e-Invoice Ready (HSN 8525)"],
    warranty: "2 Years Manufacturer Replacement Warranty",
    features: [
      {
        title: "60-Meter Extended Night Vision",
        description: "High-power EXIR infrared LEDs illuminate pitch-black parking lots and warehouse perimeters.",
        metricHighlight: "60m IR Distance"
      },
      {
        title: "Motorized Varifocal Optical Zoom",
        description: "Adjust viewing angle remotely from 2.8mm (wide angle) to 12mm (telephoto zoom) from your phone/NVR.",
        metricHighlight: "4x Optical Zoom"
      },
      {
        title: "License Plate Recognition (LPR)",
        description: "High shutter speed mode freezes fast-moving vehicles at entry gates for crisp plate capture.",
        metricHighlight: "Vehicle Capture Mode"
      },
      {
        title: "IP67 All-Weather Aluminum Body",
        description: "Complete sealing against torrential monsoons, dust storms, and extreme temperatures (-30\xB0C to +60\xB0C).",
        metricHighlight: "IP67 Certified"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8525 (Transmission apparatus / CCTV Cameras)" },
      { label: "Resolution", value: "8 Megapixel (3840 x 2160) at 30 fps" },
      { label: "Motorized Lens", value: "2.8mm to 12mm Auto-Focus Varifocal Lens" },
      { label: "Night Vision", value: "Dual Smart IR LEDs up to 60m + Low-Light Color Mode" },
      { label: "Interface", value: "1x RJ45 10M/100M Self-Adaptive Ethernet Port (PoE)" },
      { label: "Operating Temp", value: "-30 \xB0C to 60 \xB0C (-22 \xB0F to 140 \xB0F), Humidity 95% or less" },
      { label: "Housing", value: "Full Metal Body with Integrated Cable Management Base" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Bullet Unit",
        pricePerUnit: 11500,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Bullet Camera", "Heavy-Duty Bracket", "Weatherproof Connector", "2-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Mounting & Angle Alignment",
        description: "Securely mount to perimeter pole, exterior brick wall, or security gate structure."
      },
      {
        step: "02",
        title: "PoE Ethernet Hookup",
        description: "Run single outdoor-rated Cat6 cable directly to your central PoE switch."
      },
      {
        step: "03",
        title: "Remote Zoom Calibration",
        description: "Fine-tune the optical zoom and focus from the comfort of the security monitoring room."
      },
      {
        step: "04",
        title: "Perimeter Alert Rules",
        description: "Set up real-time perimeter breach push alerts with automated siren/strobe triggers."
      }
    ]
  },
  {
    id: "cctv-03",
    name: "32-Channel 4K AI Network Video Recorder (NVR)",
    slug: "32-channel-4k-ai-network-video-recorder",
    code: "LR-NVR-32CH03",
    tagline: "Enterprise 8-Bay NVR with 320Mbps Bandwidth and RAID 0/1/5/6/10 Storage Redundancy",
    category: "CCTV Cameras",
    brand: "LR Vision Security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Industrial rackmount 32-camera surveillance server supporting up to 8x 16TB enterprise hard drives, dual 4K HDMI outputs, and AI face/vehicle search.",
    description: "The central brain of your facility security. Records and indexes 32 simultaneous 4K streams with H.265+ smart compression. Features dual Gigabit network ports for physical network separation between cameras and corporate LAN.",
    badge: "Central Surveillance Hub",
    rating: 5,
    availability: "In Stock",
    price: 42e3,
    discountPrice: 38500,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["ONVIF Compliant", "RAID 5/6 Supported", "BIS Certified", "GST e-Invoice Ready (HSN 8521)"],
    warranty: "3 Years Enterprise Warranty",
    features: [
      {
        title: "32-Channel 4K Concurrent Recording",
        description: "Supports up to 32 individual 8MP IP cameras streaming at full frame rates simultaneously.",
        metricHighlight: "320 Mbps Bandwidth"
      },
      {
        title: "8-Bay SATA Hard Drive Capacity",
        description: "Up to 128 Terabytes raw storage capacity for 90+ days of uninterrupted continuous recording.",
        metricHighlight: "Up to 128TB Storage"
      },
      {
        title: "Hardware RAID 5/6 Protection",
        description: "Zero data loss even if one or two hard drives physically fail in the storage array.",
        metricHighlight: "Hot-Swap RAID Ready"
      },
      {
        title: "Smart AI Quick Search & Playback",
        description: "Filter through weeks of video footage in seconds by searching specific vehicle colors or human clothing.",
        metricHighlight: "Fast AI Tag Search"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8521 (Video Recording or Reproducing Apparatus)" },
      { label: "Channels", value: "32 IP Video Channel Inputs" },
      { label: "Incoming Bandwidth", value: "320 Mbps (256 Mbps Outgoing)" },
      { label: "HDD Bays", value: "8x SATA III Interfaces (Up to 16TB per HDD)" },
      { label: "Video Outputs", value: "2x HDMI (up to 4K 3840x2160) + 1x VGA Independent" },
      { label: "Network", value: "2x RJ-45 10M/100M/1000M Self-Adaptive Ethernet Ports" },
      { label: "Form Factor", value: "2U 19-inch Rackmount Chassis with Redundant Fan Array" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "32-Channel NVR Base Unit",
        pricePerUnit: 42e3,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["32-Channel NVR Chassis", "Rackmount Ears", "Mouse & Power Cord", "3-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: 'Install into 19" Equipment Rack',
        description: "Slide unit into server rack enclosure with included heavy-duty rack rails."
      },
      {
        step: "02",
        title: "Insert Surveillance HDDs",
        description: "Populate front-loading caddies with WD Purple or Seagate SkyHawk surveillance drives."
      },
      {
        step: "03",
        title: "Auto-Discover IP Cameras",
        description: "NVR automatically scans the camera subnet, binds ONVIF streams, and activates recording."
      },
      {
        step: "04",
        title: "Setup Central Guard Console",
        description: "Connect 4K wall monitors to HDMI 1 & 2 for custom 16-split or 32-split live security monitoring."
      }
    ]
  },
  {
    id: "cctv-04",
    name: "360\xB0 Panoramic Fisheye 12MP IP Camera",
    slug: "360-panoramic-fisheye-12mp-camera",
    code: "LR-CAM-FISH04",
    tagline: "Ceiling-Mount Single-Sensor Camera Covering Entire Retail and Warehouse Floors",
    category: "CCTV Cameras",
    brand: "LR Vision Security",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "12 Megapixel panoramic camera offering zero-blind-spot 360-degree coverage, client-side dewarping, and retail heat-mapping analytics.",
    description: "Eliminates the cost of mounting 4 separate cameras in large open areas. One single fisheye camera installed at ceiling center captures an entire 1500 sq.ft hall with hardware dewarping into 4 virtual PTZ channels.",
    badge: "360\xB0 Zero Blind Spots",
    rating: 4.8,
    availability: "In Stock",
    price: 18500,
    discountPrice: 16900,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["IK10 Vandal-Proof", "Client Dewarping", "Heatmap Ready", "GST e-Invoice Ready (HSN 8525)"],
    warranty: "2 Years Manufacturer Replacement Warranty",
    features: [
      {
        title: "12MP Ultra-High Resolution Sensor",
        description: "Extreme resolution allows zooming into individual checkout lanes and shelf aisles without pixelation.",
        metricHighlight: "4000 x 3000 Sensor"
      },
      {
        title: "Complete 360\xB0 Hemispheric View",
        description: "Replaces 3 to 4 conventional cameras, dramatically cutting down cabling and switch port costs.",
        metricHighlight: "Zero Blind Spots"
      },
      {
        title: "Real-Time Hardware Dewarping",
        description: "Flattens panoramic fisheye distortion into standard 4-split rectangular perspectives on fly.",
        metricHighlight: "4 Virtual Views"
      },
      {
        title: "Customer Foot-Traffic Heatmaps",
        description: "Analyzes customer dwell times and walking paths across retail showroom displays.",
        metricHighlight: "Business Analytics"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8525 (CCTV & Security Cameras)" },
      { label: "Image Sensor", value: '1/1.7" Progressive Scan CMOS (12 Megapixels)' },
      { label: "Focal Length", value: "1.29mm Ultra-Wide Fisheye Lens (180\xB0 / 360\xB0)" },
      { label: "IR Range", value: "Smart IR LEDs up to 15m (360\xB0 Circular Array)" },
      { label: "Audio & Alarm", value: "Built-in Mic, Speaker for 2-way Talk + 1x Alarm In/Out" },
      { label: "Power Options", value: "PoE+ (802.3at) or 12V DC" },
      { label: "Enclosure", value: "Discreet Flush-Mount Ceiling Dome with IK10 Vandal Resistance" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Fisheye Camera",
        pricePerUnit: 18500,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["12MP Fisheye Camera", "Ceiling Mount Bracket", "Dewarping Software License", "2-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Center-Ceiling Installation",
        description: "Mount flush to acoustic ceiling tile or concrete slab in center of the room."
      },
      {
        step: "02",
        title: "Connect PoE+ Switch Drop",
        description: "Single Cat6 cable supplies full power, 12MP video stream, and two-way audio."
      },
      {
        step: "03",
        title: "Configure Virtual PTZ Splits",
        description: "Dewarp the 360-degree round image into 4 independent virtual camera views."
      },
      {
        step: "04",
        title: "Review Heatmaps & Footage",
        description: "Export retail traffic density maps and monitor comprehensive room security."
      }
    ]
  },
  // =========================================================================
  // 03 — NETWORKING HARDWARE
  // =========================================================================
  {
    id: "net-01",
    name: "24-Port Gigabit L2+ Managed PoE+ Switch",
    slug: "24-port-gigabit-managed-poe-switch",
    code: "LR-NET-SW24P",
    tagline: "370W PoE Power Budget with 4x 10G SFP+ Uplinks for High-Density IP Cameras & Wi-Fi 6",
    category: "Networking Hardware",
    brand: "LR Core Networks",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Enterprise Layer 2+ switch delivering 24 Gigabit PoE+ ports (up to 30W per port), 4x 10G SFP+ fiber uplinks, static routing, VLAN segmentation, and cloud/CLI management.",
    description: "Engineered as the workhorse edge switch for corporate offices, schools, and hospitals. Powers 24 IP cameras or Wi-Fi 6 access points with zero power bottlenecks, while dual 10G fiber uplinks prevent network congestion back to core servers.",
    badge: "Enterprise Core Edge",
    rating: 4.9,
    availability: "In Stock \u2014 Ready for Rack Deployment",
    price: 34500,
    discountPrice: 31500,
    unit: "Unit",
    orderEnabled: true,
    featured: true,
    complianceTags: ["IEEE 802.3at/af", "10G SFP+ Ready", "L2+ Static Routing", "GST e-Invoice Ready (HSN 8517)"],
    warranty: "5 Years Limited Lifetime Enterprise Hardware Warranty",
    features: [
      {
        title: "370W Total PoE+ Power Budget",
        description: "Powers 24 high-draw PTZ cameras, Wi-Fi 6 APs, and VoIP phones across all ports simultaneously.",
        metricHighlight: "370W PoE Budget"
      },
      {
        title: "4x 10-Gigabit SFP+ Fiber Uplinks",
        description: "Ultra-high bandwidth backbone connection to server storage and core distribution switches.",
        metricHighlight: "4x 10G SFP+"
      },
      {
        title: "Layer 2+ Static Routing & VLANs",
        description: "Isolates guest Wi-Fi, CCTV streams, and finance databases into secure broadcast domains.",
        metricHighlight: "802.1Q VLANs"
      },
      {
        title: "Intelligent Thermal Fan Control",
        description: "Smart variable-speed cooling fans keep noise to a minimum while maintaining low operating temps.",
        metricHighlight: "< 32 dB Quiet"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8517 (Apparatus for transmission of data / Network Switches)" },
      { label: "Ports", value: "24x 10/100/1000 Mbps RJ45 PoE+ Ports (802.3at/af)" },
      { label: "Uplink Ports", value: "4x 10G/1G SFP+ Fiber Ports" },
      { label: "Switching Capacity", value: "128 Gbps Non-Blocking Backplane" },
      { label: "Forwarding Rate", value: "95.23 Mpps Packet Forwarding" },
      { label: "Management", value: "Web GUI, Console CLI, SNMP v1/v2c/v3, RMON, Cloud Controller" },
      { label: "Form Factor", value: "1U 19-inch Standard Rackmount with Internal Power Supply" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Switch Unit",
        pricePerUnit: 34500,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["24-Port Switch", '19" Rackmount Brackets', "Console Cable", "5-Year Lifetime Warranty"]
      },
      {
        licenseType: "MONTHLY",
        name: "Enterprise Infrastructure Multi-Pack (4+ Units)",
        pricePerUnit: 31500,
        billingPeriod: "per unit (bulk)",
        minimumSeats: 4,
        featuresIncluded: ["Pre-Configured Trunk & VLAN Staging", "Patch Cables Pack", "Priority Next-Day Replacement"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Rack Mounting in Server Cabinet",
        description: "Fasten unit into 1U slot using included standard cage nuts and rack screws."
      },
      {
        step: "02",
        title: "Patch Panel Termination",
        description: "Connect Cat6 patch cords from patch panels directly into ports 1 through 24."
      },
      {
        step: "03",
        title: "VLAN & PoE Allocation Setup",
        description: "Assign VLAN 10 for Corporate, VLAN 20 for CCTV, and VLAN 30 for Guest Wi-Fi."
      },
      {
        step: "04",
        title: "10G Fiber Backbone Uplink",
        description: "Insert 10G LC SFP+ optical transceiver to link directly with the server cluster."
      }
    ]
  },
  {
    id: "net-02",
    name: "48-Port 10G SFP+ Layer 3 Core Enterprise Switch",
    slug: "48-port-10g-sfp-plus-layer-3-core-switch",
    code: "LR-NET-L3C48",
    tagline: "High-Density Aggregation Switch with 6x 100G QSFP28 Uplinks and Redundant Hot-Swap Power",
    category: "Networking Hardware",
    brand: "LR Core Networks",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "High-performance datacenter core switch providing 48x 10G/1G SFP+ ports, 6x 100G QSFP28 uplinks, dynamic OSPF/BGP routing, and 1+1 redundant hot-swappable AC power supplies.",
    description: "Designed as the central nervous system for multi-story office buildings, datacenters, and campus headquarters. Handles line-rate 2.16 Tbps switching capacity with hardware BGP/OSPF/VRRP routing.",
    badge: "Datacenter Backbone",
    rating: 5,
    availability: "In Stock",
    price: 112e3,
    discountPrice: 102e3,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["Layer 3 Full Dynamic Routing", "1+1 Redundant Power", "2.16 Tbps Backplane", "GST e-Invoice Ready (HSN 8517)"],
    warranty: "5 Years Next-Business-Day Replacement Warranty",
    features: [
      {
        title: "48x 10-Gigabit SFP+ Fiber Ports",
        description: "Aggregates dozens of floor edge switches with dedicated wire-speed 10G connections.",
        metricHighlight: "48x 10G Ports"
      },
      {
        title: "6x 100G QSFP28 Ultra-High Uplinks",
        description: "Connects directly to SAN storage matrices, high-speed virtualization servers, and ISP transit.",
        metricHighlight: "6x 100G QSFP28"
      },
      {
        title: "Dynamic Layer 3 Routing (OSPF, BGP, VRRP)",
        description: "Eliminates core router bottlenecks by performing line-rate inter-VLAN routing in hardware.",
        metricHighlight: "Full L3 Stack"
      },
      {
        title: "1+1 Hot-Swappable Redundant Power Supplies",
        description: "Zero system downtime even if one power circuit or power module is removed or serviced.",
        metricHighlight: "1+1 Redundancy"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8517 (Data Transmission / Core Network Switches)" },
      { label: "Port Density", value: "48x 10G/1G SFP+ Ports + 6x 100G/40G QSFP28 Ports" },
      { label: "Switching Capacity", value: "2.16 Tbps Non-Blocking Wire Speed" },
      { label: "Packet Buffer", value: "32MB Intelligent Deep Packet Buffer" },
      { label: "Power Supply", value: "Dual 1+1 Hot-Swap 550W Platinum Redundant AC Modules" },
      { label: "Airflow", value: "Front-to-Back High-CFM Hot-Swappable Fan Trays" },
      { label: "Chassis", value: "1U 19-inch Heavy-Duty Industrial Steel Enclosure" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Core Switch Base Configuration",
        pricePerUnit: 112e3,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Core Switch Unit", "Dual Redundant Power Modules", "4x SFP+ Transceivers Included", "5-Year NBD Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Core Datacenter Rack Placement",
        description: "Install into central network distribution rack with dual independent power feeds."
      },
      {
        step: "02",
        title: "Inter-Floor Fiber Aggregation",
        description: "Terminate single-mode/multi-mode fiber cables coming from all floor distribution switches."
      },
      {
        step: "03",
        title: "Configure High-Availability VRRP",
        description: "Set up automated gateway redundancy and OSPF multi-area routing rules."
      },
      {
        step: "04",
        title: "Continuous NOC Telemetry",
        description: "Integrate SNMP and Syslog output into centralized 24/7 network monitoring consoles."
      }
    ]
  },
  {
    id: "net-03",
    name: "Enterprise Multi-WAN Dual-10G VPN Gateway Router",
    slug: "enterprise-multi-wan-dual-10g-vpn-router",
    code: "LR-NET-RTR03",
    tagline: "High-Throughput Load Balancing Router with Hardware IPsec/WireGuard VPN Acceleration",
    category: "Networking Hardware",
    brand: "LR Core Networks",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Commercial multi-WAN load balancer and VPN gateway featuring 2x 10G SFP+ WAN/LAN ports, 8x Gigabit ports, policy-based routing, and failover redundancy.",
    description: "Combines multiple ISP connections (Fiber, Cable, 5G backup) into a seamless high-speed internet link with instantaneous sub-second failover. Protects branch office interconnects with hardware-accelerated IPsec and WireGuard tunneling.",
    badge: "Multi-ISP Redundancy",
    rating: 4.8,
    availability: "In Stock",
    price: 54e3,
    discountPrice: 49500,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["Dual-WAN Load Balance", "Hardware IPsec AES-NI", "WireGuard Support", "GST e-Invoice Ready (HSN 8517)"],
    warranty: "3 Years Comprehensive Hardware Warranty",
    features: [
      {
        title: "Multi-WAN Dynamic Load Balancing",
        description: "Aggregates bandwidth across up to 4 different ISP fiber connections for maximum throughput.",
        metricHighlight: "Up to 4 WAN Links"
      },
      {
        title: "Instantaneous Zero-Drop Failover",
        description: "If your primary ISP goes down, video calls and VoIP traffic switch to secondary ISP in milliseconds.",
        metricHighlight: "< 100ms Failover"
      },
      {
        title: "Hardware VPN Cryptographic Engine",
        description: "Delivers over 2.5 Gbps encrypted IPsec and WireGuard throughput for seamless site-to-site connectivity.",
        metricHighlight: "2.5 Gbps VPN Line-Rate"
      },
      {
        title: "Built-in DPI Bandwidth Bandwidth Control",
        description: "Prioritize Zoom, Microsoft Teams, and ERP traffic while throttling non-business video streaming.",
        metricHighlight: "QoS Traffic Shaping"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8517 (Routers / Data Communication Equipment)" },
      { label: "Interfaces", value: "2x 10G SFP+ WAN/LAN Ports + 8x Gigabit RJ45 Ports (Configurable)" },
      { label: "Concurrent Sessions", value: "1,000,000 Concurrent TCP/UDP Sessions" },
      { label: "NAT Throughput", value: "9.4 Gbps IPv4/IPv6 Routing Throughput" },
      { label: "VPN Tunnels", value: "Up to 500 Site-to-Site IPsec Tunnels + 1,000 Client VPN Users" },
      { label: "CPU", value: "Quad-Core 64-bit ARM 2.0 GHz Network Processing Engine with AES-NI" },
      { label: "Form Factor", value: "1U Rackmount with Integrated AC Power Supply" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Enterprise Router Standard Package",
        pricePerUnit: 54e3,
        billingPeriod: "per router",
        minimumSeats: 1,
        featuresIncluded: ["Router Unit", "Rackmount Ears", "Power Cord", "Console Cable", "3-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Connect Primary & Secondary ISPs",
        description: "Plug ISP 1 (Primary Leased Line) into WAN 1 and ISP 2 (Backup Broadband) into WAN 2."
      },
      {
        step: "02",
        title: "Configure Load-Balancing Weights",
        description: "Set up 70/30 traffic distribution or strict primary-active / backup-standby failover mode."
      },
      {
        step: "03",
        title: "Set Site-to-Site VPN Tunnels",
        description: "Create encrypted mesh connections between headquarters and all remote branch offices."
      },
      {
        step: "04",
        title: "Activate QoS Application Rules",
        description: "Guarantee minimum dedicated bandwidth for Zoom, Teams, and VoIP voice traffic."
      }
    ]
  },
  {
    id: "net-04",
    name: "42U Heavy-Duty Server & Network Rack Enclosure",
    slug: "42u-heavy-duty-server-network-rack-enclosure",
    code: "LR-NET-RCK42",
    tagline: "Standard 19-Inch 800x1000mm Datacenter Rack with Perforated High-Airflow Doors & Cable Fingers",
    category: "Networking Hardware",
    brand: "LR Enclosures",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Industrial 42U server cabinet with 1500kg static load rating, 75% perforated front/rear honeycomb doors, integrated vertical cable management, and key-lock security.",
    description: "The foundation for professional server rooms and network closets. Engineered with heavy-gauge cold-rolled steel, pre-installed grounding kits, and generous depth to accommodate deep 4-socket servers, UPS batteries, and dense patch panels.",
    badge: "Server Room Essential",
    rating: 4.9,
    availability: "In Stock \u2014 Flat-Pack or Pre-Assembled Dispatch",
    price: 48e3,
    discountPrice: 43500,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["EIA/ECA-310-E Standard", "1500kg Load Rated", "IP20 Protection", "GST e-Invoice Ready (HSN 9403)"],
    warranty: "5 Years Structural Frame Warranty",
    features: [
      {
        title: "1500kg Static Weight Capacity",
        description: "Heavy cold-rolled steel construction supports dense server stacks and heavy UPS battery units.",
        metricHighlight: "1500 kg Capacity"
      },
      {
        title: "75% Perforated Airflow Doors",
        description: "Honeycomb mesh door pattern maximizes cold-aisle / hot-aisle server cooling efficiency.",
        metricHighlight: "75% High Airflow"
      },
      {
        title: "Integrated Vertical Cable Channels",
        description: "Wide side cable trays with plastic finger ducts keep hundreds of Cat6 and fiber patches immaculate.",
        metricHighlight: "Clean Cable Dress"
      },
      {
        title: "Keyed Master Locking Mechanism",
        description: "Secures enterprise servers and network switches against unauthorized physical tampering.",
        metricHighlight: "3-Point Locking"
      }
    ],
    specs: [
      { label: "HSN Code", value: "9403 (Metal furniture / Server racks and enclosures)" },
      { label: "Rack Height & Standard", value: "42U Standard (19-inch EIA-310-E Compliant)" },
      { label: "Dimensions (W x D x H)", value: "800mm (W) x 1000mm (D) x 2050mm (H)" },
      { label: "Material", value: "2.0mm High-Grade Cold Rolled Steel Posts, 1.2mm Side Panels" },
      { label: "Mobility & Leveling", value: "Heavy-Duty 360\xB0 Swivel Casters + 4x Adjustable Leveling Feet" },
      { label: "Included Accessories", value: "2x Fixed Heavy Shelves, 1x 8-Way PDU, 50x Cage Nut Screws, Earth Ground Kit" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "42U Cabinet Complete Package",
        pricePerUnit: 48e3,
        billingPeriod: "per enclosure",
        minimumSeats: 1,
        featuresIncluded: ["42U Cabinet", "2x Heavy-Duty Equipment Shelves", "8-Way Power Distribution Unit", "Grounding Kit", "5-Year Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Placement & Leveling",
        description: "Roll cabinet into position inside server room and lower leveling feet for solid vibration dampening."
      },
      {
        step: "02",
        title: "PDU & Grounding Installation",
        description: "Connect pre-installed heavy-duty PDU to UPS circuit and bond copper ground busbar to room earth."
      },
      {
        step: "03",
        title: "Equipment Staging (Top to Bottom)",
        description: "Mount patch panels and switches in top 10U, servers in middle 20U, and heavy UPS systems at bottom."
      },
      {
        step: "04",
        title: "Vertical Cable Dressing",
        description: "Route all incoming Cat6 drops neatly through vertical finger ducts with velcro ties."
      }
    ]
  },
  // =========================================================================
  // 04 — LAPTOPS
  // =========================================================================
  {
    id: "lap-01",
    name: 'Executive Lightweight Enterprise Laptop 14"',
    slug: "executive-lightweight-enterprise-laptop-14",
    code: "LR-LAP-EXE01",
    tagline: "Military-Grade Carbon Fiber Ultrabook with 14-Hour Battery, 5G LTE, and Core i7 vPro",
    category: "Laptops",
    brand: "LR Certified Enterprise",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Premium business ultrabook weighing just 1.18 kg with Intel Core i7 vPro processor, 32GB LPDDR5X RAM, 1TB Gen4 SSD, 2.8K OLED display, and TPM 2.0 biometric security.",
    description: "Engineered for traveling executives, consultants, and senior management. Offers all-day battery life, crystal-clear 1080p AI noise-cancelling webcam for meetings, and optional 5G eSIM connectivity for secure internet anywhere.",
    badge: "Executive Ultralight",
    rating: 4.9,
    availability: "In Stock \u2014 Immediate Dispatch",
    price: 92e3,
    discountPrice: 86500,
    unit: "Unit",
    orderEnabled: true,
    featured: true,
    complianceTags: ["Intel vPro Enterprise", "MIL-STD-810H Passed", "TPM 2.0 Secured", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years International On-Site Commercial Warranty with Accidental Damage Protection",
    features: [
      {
        title: "Ultra-Featherweight Carbon Chassis (1.18 kg)",
        description: "Magnesium-carbon composite frame withstands drops, spills, and constant international travel.",
        metricHighlight: "Only 1.18 kg Weight"
      },
      {
        title: "14-Hour Fast-Charging Battery",
        description: "Work through full transatlantic flights; charges to 80% capacity in just 50 minutes via USB-C.",
        metricHighlight: "14h Battery Life"
      },
      {
        title: "2.8K (2880 x 1800) OLED 120Hz Display",
        description: "Stunning 100% DCI-P3 color accuracy, deep blacks, and anti-reflective matte coating.",
        metricHighlight: "2.8K OLED 120Hz"
      },
      {
        title: "Biometric Face & Fingerprint Login",
        description: "Windows Hello IR camera with automated human presence detection locks screen when you walk away.",
        metricHighlight: "Zero-Trust Lock"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Portable automatic data processing machines / Laptops)" },
      { label: "Processor", value: "Intel Core Ultra 7 155H (16 Cores, 22 Threads, NPU AI Engine)" },
      { label: "Memory", value: "32GB LPDDR5X 7467MHz Dual-Channel" },
      { label: "Storage", value: "1TB M.2 NVMe PCIe Gen4 Performance SSD" },
      { label: "Display", value: "14.0-inch 2.8K (2880x1800) OLED, 400 nits, 120Hz, 100% DCI-P3" },
      { label: "Ports", value: "2x Thunderbolt 4 (40Gbps, PD 3.0), 2x USB-A 3.2 Gen 1, 1x HDMI 2.1, Audio Jack" },
      { label: "Wireless", value: "Wi-Fi 7 (802.11be) + Bluetooth 5.4 + Optional 5G Sub-6 eSIM" },
      { label: "Security", value: "Hardware dTPM 2.0, Fingerprint Reader, Web Camera Privacy Shutter" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Executive Laptop Standard Supply",
        pricePerUnit: 92e3,
        billingPeriod: "per laptop",
        minimumSeats: 1,
        featuresIncluded: ["Laptop Unit", "65W USB-C GaN Charger", "Protective Sleeve", "3-Year On-Site ADP Warranty"]
      },
      {
        licenseType: "MONTHLY",
        name: "Corporate Fleet Deployment (10+ Units)",
        pricePerUnit: 86500,
        billingPeriod: "per laptop (bulk discount)",
        minimumSeats: 10,
        featuresIncluded: ["Pre-Configured Domain Join & VPN", "Custom Asset Tagging", "Free On-Site Handover"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Configure OS & Encryption Options",
        description: "Choose between Windows 11 Pro with BitLocker encryption or Ubuntu Enterprise Certified."
      },
      {
        step: "02",
        title: "Zero-Touch Autopilot Enrollment",
        description: "We register device hardware hashes into your Microsoft Intune / MDM tenant."
      },
      {
        step: "03",
        title: "Express Doorstep Delivery",
        description: "Shipped directly to your office or employee home addresses with tamper-evident seals."
      },
      {
        step: "04",
        title: "Global On-Site Tech Support",
        description: "Next-business-day on-site engineer dispatch for keyboard, screen, or motherboard replacements."
      }
    ]
  },
  {
    id: "lap-02",
    name: 'Precision Mobile Workstation Laptop 16"',
    slug: "precision-mobile-workstation-laptop-16",
    code: "LR-LAP-WRK02",
    tagline: "Desktop-Class Compute Power with Intel Core i9, NVIDIA RTX 4000 Ada GPU, and 64GB RAM",
    category: "Laptops",
    brand: "LR Certified Enterprise",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Heavyweight computing performance in a mobile form factor. Combines Intel Core i9-14900HX, NVIDIA RTX 4000 Ada 12GB graphics, 64GB RAM, and dual Gen4 NVMe slots for on-site simulation and VR.",
    description: "Designed for field engineers, VFX animators, and data scientists requiring extreme workstation power on construction sites, client pitches, or remote filming locations. ISV certified for AutoCAD, SolidWorks, Maya, and Premiere Pro.",
    badge: "Ultimate Mobile Compute",
    rating: 5,
    availability: "In Stock",
    price: 188e3,
    discountPrice: 175e3,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["ISV Certified", "Vapor Chamber Cooled", "Thunderbolt 4 Certified", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years Next-Business-Day International On-Site Service",
    features: [
      {
        title: "Desktop-Grade Core i9-14900HX (24 Cores)",
        description: "Delivers full multi-threaded performance for rendering 3D scenes and running local LLM inference.",
        metricHighlight: "24 Cores / 5.8 GHz"
      },
      {
        title: "NVIDIA RTX 4000 Ada (12GB GDDR6)",
        description: "Certified workstation GPU with ECC VRAM support prevents viewport glitches in 3D CAD modeling.",
        metricHighlight: "12GB Workstation VRAM"
      },
      {
        title: "Massive 64GB DDR5 Expandable Memory",
        description: "Dual SODIMM slots allow expanding system memory up to 128GB for immense datasets.",
        metricHighlight: "64GB DDR5 (Up to 128GB)"
      },
      {
        title: "Dual Liquid-Metal Vapor Chamber Cooling",
        description: "Dissipates over 175W of sustained combined CPU/GPU thermal power without thermal throttling.",
        metricHighlight: "175W Thermal Capacity"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Workstation Laptops / Computing Machines)" },
      { label: "Processor", value: "Intel Core i9-14900HX (24 Cores, 32 Threads, 36MB Cache)" },
      { label: "GPU", value: "NVIDIA RTX 4000 Ada Generation Laptop GPU (12GB GDDR6)" },
      { label: "Memory", value: "64GB DDR5 5600MHz (2x 32GB SODIMM, expandable to 128GB)" },
      { label: "Storage", value: "2TB NVMe PCIe Gen4 M.2 Performance SSD (1x Extra NVMe Slot Free)" },
      { label: "Display", value: "16.0-inch 4K UHD+ (3840x2400) IPS, 500 nits, 100% AdobeRGB, Factory Calibrated" },
      { label: "Battery & Power", value: "99.9 Wh High-Capacity Battery + 240W GaN Slim AC Adapter" },
      { label: "Chassis", value: "CNC Machined Anodized Aluminum with Spill-Resistant Backlit Keyboard" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Mobile Workstation Standard Unit",
        pricePerUnit: 188e3,
        billingPeriod: "per laptop",
        minimumSeats: 1,
        featuresIncluded: ["Mobile Workstation", "240W Charger", "Color Calibration Report", "3-Year NBD Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Hardware Sizing & Verification",
        description: "We confirm software requirements (Revit, ANSYS, Blender) and benchmark memory allocation."
      },
      {
        step: "02",
        title: "Thermal & Graphic Burn-In",
        description: "Every workstation undergoes full 3DMark and FurMark stress testing prior to packaging."
      },
      {
        step: "03",
        title: "Protective Courier Delivery",
        description: "Dispatched in shock-absorbent rugged courier cases with transit insurance."
      },
      {
        step: "04",
        title: "Priority Enterprise Support",
        description: "Direct access to senior hardware engineering tier with next-day parts replacement."
      }
    ]
  },
  {
    id: "lap-03",
    name: 'Mainstream Commercial Office Laptop 15.6"',
    slug: "mainstream-commercial-office-laptop-15",
    code: "LR-LAP-BUS03",
    tagline: "Durable, Budget-Friendly Business Laptop with Numeric Keypad and 10-Hour Battery",
    category: "Laptops",
    brand: "LR Certified Enterprise",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "The essential business standard. Equipped with Intel Core i5 processor, 16GB DDR5 memory, 512GB SSD, full numeric keypad, and full-size Ethernet RJ45 port for daily office teams.",
    description: "Engineered for call centers, operations teams, banking branches, and enterprise office workforces. Delivers dependable day-in day-out reliability with reinforced hinges, spill-resistant keyboard, and dual-microphone background noise suppression.",
    badge: "Best Corporate Value",
    rating: 4.8,
    availability: "In Stock \u2014 High Bulk Availability",
    price: 54500,
    discountPrice: 49900,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["EPEAT Gold", "Energy Star 8.0", "T\xDCV Low Blue Light", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years On-Site Comprehensive Commercial Warranty",
    features: [
      {
        title: "14th Gen Intel Core i5 Efficiency",
        description: "Smooth performance across Google Workspace, Microsoft 365, Zoom, and enterprise web portals.",
        metricHighlight: "Core i5-1335U"
      },
      {
        title: "Full Dedicated Numeric Keypad",
        description: "Essential for accounting, finance, inventory data entry, and spreadsheet analysis.",
        metricHighlight: "Full 10-Key Numpad"
      },
      {
        title: "Native Gigabit Ethernet (RJ-45) Port",
        description: "Plug directly into enterprise office desk network drops without needing annoying dongles.",
        metricHighlight: "Native RJ45 Jack"
      },
      {
        title: "Spill-Resistant Keyboard & Anti-Glare Screen",
        description: "Tolerates minor coffee spills and prevents harsh overhead office fluorescent glare.",
        metricHighlight: "Anti-Glare FHD"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Commercial Laptops / Business Computing)" },
      { label: "Processor", value: "Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6 GHz)" },
      { label: "Memory", value: "16GB DDR5 5200MHz (Upgradeable to 32GB)" },
      { label: "Storage", value: "512GB M.2 NVMe PCIe Gen4 SSD" },
      { label: "Display", value: "15.6-inch Full HD (1920x1080) IPS, 300 nits, Anti-Glare Coating" },
      { label: "Ports", value: "1x USB-C (DisplayPort & Power), 2x USB-A 3.2, 1x HDMI 1.4b, 1x RJ45 LAN, SD Reader" },
      { label: "Camera & Audio", value: "720p HD Webcam with Privacy Slider + Dual Array Digital Mics" },
      { label: "Weight & Battery", value: "1.68 kg with 54Wh All-Day Fast-Charging Battery" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Single Unit Standard Supply",
        pricePerUnit: 54500,
        billingPeriod: "per laptop",
        minimumSeats: 1,
        featuresIncluded: ["Laptop Unit", "65W Power Adapter", "3-Year On-Site Commercial Warranty"]
      },
      {
        licenseType: "MONTHLY",
        name: "Bulk Operations Package (20+ Units)",
        pricePerUnit: 49900,
        billingPeriod: "per laptop (bulk discount)",
        minimumSeats: 20,
        featuresIncluded: ["Company Wallpaper & Domain Staging", "Free On-Site Bulk Handover", "Dedicated Account Manager"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Bulk Quantity Quotation",
        description: "Enter required laptop count (1 to 500+ units) in our self-service order wizard."
      },
      {
        step: "02",
        title: "Corporate GST Billing Validation",
        description: "Instant generation of GST compliant proforma invoices with your organization GSTIN."
      },
      {
        step: "03",
        title: "Pre-Delivery Quality Checks",
        description: "Units are staged, verified for dead pixels, and loaded with standard corporate image."
      },
      {
        step: "04",
        title: "Direct Multi-Office Distribution",
        description: "Dispatched in bulk cartons directly to your regional branch offices across India."
      }
    ]
  },
  {
    id: "lap-04",
    name: 'Ultra-Rugged Field Service Laptop 14"',
    slug: "ultra-rugged-field-service-laptop-14",
    code: "LR-LAP-RUG04",
    tagline: "IP65 Water/Dust Sealed & MIL-STD-810H Drop-Proof Laptop with 1000-Nit Sunlight Readable Screen",
    category: "Laptops",
    brand: "LR Rugged Systems",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Industrial tough laptop designed for harsh field environments, factories, mining sites, and emergency services. Features hot-swappable dual batteries, RS-232 serial port, and glove-touch display.",
    description: "Built like a tank to operate reliably in scorching heat, sub-zero winters, driving rain, and dusty construction yards. Survives 6-foot drops onto concrete, intense vibrations, and electromagnetic interference.",
    badge: "Industrial Grade Extreme",
    rating: 4.9,
    availability: "In Stock",
    price: 165e3,
    discountPrice: 152e3,
    unit: "Unit",
    orderEnabled: true,
    featured: false,
    complianceTags: ["MIL-STD-810H Certified", "IP65 Ingress Protected", "ATEX Zone 2 Ready", "GST e-Invoice Ready (HSN 8471)"],
    warranty: "3 Years Comprehensive Bumper-to-Bumper Warranty (Including Accidental Drop Damage)",
    features: [
      {
        title: "MIL-STD-810H & IP65 Certified Housing",
        description: "Magnesium alloy chassis with shock-absorbing elastomer bumpers survives 6-ft concrete drops.",
        metricHighlight: "6-ft Drop Proof"
      },
      {
        title: "1000-Nit Ultra-Bright Sunlight Screen",
        description: "Direct optical bonding and anti-reflective filters make screen easily readable in harsh desert sun.",
        metricHighlight: "1000 Nits Brightness"
      },
      {
        title: "Hot-Swappable Dual Battery System",
        description: "Swap dead battery for a fresh one while the laptop is running without shutting down applications.",
        metricHighlight: "24/7 Zero Downtime"
      },
      {
        title: "Native RS-232 Serial Port & Dual LAN",
        description: "Directly configure CNC machinery, PLC controllers, and industrial networking hardware in field.",
        metricHighlight: "Native DB9 Serial"
      }
    ],
    specs: [
      { label: "HSN Code", value: "8471 (Rugged Computer Systems / Field Laptops)" },
      { label: "Processor", value: "Intel Core i7-1370P vPro (14 Cores, 20 Threads)" },
      { label: "Memory", value: "32GB DDR5 Sealed Shock-Resistant RAM" },
      { label: "Storage", value: "1TB Removable Quick-Release NVMe SSD (Heated for Sub-Zero Boot)" },
      { label: "Display", value: "14.0-inch FHD (1920x1080) 1000 nits Glove-Touch Capacitive Touchscreen" },
      { label: "Industrial I/O", value: "1x True RS-232 Serial (DB9), 2x RJ45 Gigabit Ethernet, 2x USB 3.2, 1x HDMI" },
      { label: "Environmental", value: "Operating Temp: -29\xB0C to 63\xB0C (-20\xB0F to 145\xB0F), IP65 Sealed Port Doors" },
      { label: "Carrying Design", value: "Integrated Ergonomic Rigid Handle + Retractable Stylus Pen" }
    ],
    pricing: [
      {
        licenseType: "ANNUAL",
        name: "Rugged Field Package",
        pricePerUnit: 165e3,
        billingPeriod: "per unit",
        minimumSeats: 1,
        featuresIncluded: ["Rugged Laptop", "Dual Hot-Swap Batteries", "Heavy-Duty AC Charger", "Stylus", "3-Year Bumper-to-Bumper Warranty"]
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Environmental Assessment",
        description: "We evaluate site environmental extremes (temperature, dust, explosive atmosphere ratings)."
      },
      {
        step: "02",
        title: "Industrial Interface Setup",
        description: "Configure RS-232 baud rates and specialized diagnostics telemetry software."
      },
      {
        step: "03",
        title: "Rugged Pelican Case Dispatch",
        description: "Shipped in heavy-duty flight cases with extra hot-swappable batteries and vehicle chargers."
      },
      {
        step: "04",
        title: "Unconditional Swap Warranty",
        description: "Immediate replacement unit provided if physical damage occurs in harsh field duty."
      }
    ]
  }
];

// src/data/servicesData.ts
var servicesData = [
  // =========================================================================
  // 01 — FIREWALL
  // =========================================================================
  {
    id: "srv-01",
    name: "Firewall & Network Security",
    slug: "firewall",
    tagline: "Perimeter Defense, UTM Policy Hardening & Secure Site-to-Site VPN Architecture",
    shortDescription: "Comprehensive Next-Gen Firewall (NGFW) deployment, custom threat-prevention rules, encrypted multi-branch VPN gateways, and 24/7 proactive security monitoring.",
    overview: "Protect your enterprise network against cyber intrusions, ransomware, unauthorized data exfiltration, and port scanning. Our certified security engineers install, configure, and maintain enterprise firewall appliances tailored to your organization\u2019s operational topology and compliance mandates.",
    icon: "ShieldCheck",
    bookingEnabled: true,
    capabilities: [
      "Firewall installation",
      "Firewall configuration",
      "Network security configuration",
      "Security policies",
      "VPN configuration",
      "Firewall monitoring",
      "Firewall maintenance",
      "Security upgrades"
    ],
    deliverables: [
      "Hardened Next-Gen Firewall (NGFW) Hardware / Virtual Appliance Configuration",
      "Custom Layer 7 Application-Aware Security Rules Matrix & IPS/IDS Rulesets",
      "Encrypted IPsec / SSL / WireGuard Site-to-Site & Remote User VPN Gateways",
      "Automated Weekly Security Vulnerability & Blocked Threat Incident Reports",
      "Continuous Firmware Patching & Disaster Recovery Configuration Backup"
    ],
    recommendedUseCases: [
      "Corporate Headquarters & Branch Office Perimeter Isolation",
      "Secure Remote Workforce & Work-From-Home (WFH) VPN Access",
      "PCI-DSS & HIPAA Compliant Network Data Segmentation",
      "High-Throughput Threat Prevention for Financial & Healthcare Systems"
    ],
    technologies: [
      "Fortinet FortiGate",
      "Palo Alto Networks",
      "Sophos XGS",
      "SonicWall TZ/NSa",
      "Cisco Firepower",
      "IPsec IKEv2",
      "WireGuard",
      "OpenVPN"
    ],
    equipment: [
      "Hardware Next-Gen Firewall Appliances (100Mbps to 40Gbps Throughput)",
      "Dual-Power Redundant Security Gateways",
      "Dedicated SSL Decryption & Acceleration Modules",
      "Out-of-Band Remote Management Modems"
    ],
    processSteps: [
      {
        stepNumber: "01",
        phase: "Security Assessment & Rule Planning",
        action: "Audit existing network ports, IP ranges, employee access tiers, and compliance requirements.",
        outcome: "Comprehensive security policy blueprint and port-forwarding matrix."
      },
      {
        stepNumber: "02",
        phase: "Appliance Installation & Cabling",
        action: "Rack mounting, dual power supply cabling, WAN/LAN interface patching, and failover pairing.",
        outcome: "Hardware securely integrated into server rack with clean cable labeling."
      },
      {
        stepNumber: "03",
        phase: "Policy Hardening & VPN Setup",
        action: "Configure deep packet inspection (DPI), web content filtering, intrusion prevention, and user VPN.",
        outcome: "Tested zero-leak firewall rules and verified remote VPN access."
      },
      {
        stepNumber: "04",
        phase: "24/7 Monitoring & Firmware Maintenance",
        action: "Connect to our operations monitoring console, enable automatic alerts, and schedule patch windows.",
        outcome: "Continuous proactive defense with guaranteed SLA response."
      }
    ],
    typicalSLA: "15-Minute Critical Incident Response / 4-Hour On-Site Hardware Replacement",
    targetAudience: "Enterprises, Banks, Healthcare Facilities, Manufacturing Units, IT/BPO Offices"
  },
  // =========================================================================
  // 02 — NETWORKING
  // =========================================================================
  {
    id: "srv-02",
    name: "Networking & Infrastructure",
    slug: "networking",
    tagline: "Enterprise LAN/WAN Architecture, Structured Cabling, Server Racks & Managed Switching",
    shortDescription: "Complete end-to-end design, structured CAT6/Fiber optic cabling, server rack assembly, managed L2/L3 switch deployment, and high-speed network troubleshooting.",
    overview: "Transform your physical connectivity with pristine, certified network infrastructure. From greenfield office fit-outs and warehouse fiber backbones to high-density data closets and server room rack cleanups, we ensure high bandwidth, zero packet loss, and neat cable management.",
    icon: "Network",
    bookingEnabled: true,
    capabilities: [
      "Network design",
      "LAN setup",
      "WAN setup",
      "Structured cabling",
      "Network switch installation",
      "Router configuration",
      "Rack setup",
      "Fiber networking",
      "Network troubleshooting",
      "Network maintenance"
    ],
    deliverables: [
      "Certified Structured Copper (CAT6/6A) and Single/Multi-Mode Optical Fiber Cabling",
      "Fluke Certified Cable Test Reports with 10Gbps Speed Verification",
      "As-Built L2/L3 Network Topology & VLAN Segmentation Architectural Schematics",
      "Neat Server Rack Dressing with Numbered Patch Panels and Cable Management",
      "Configured Core, Distribution, and Access Layer Managed Switches"
    ],
    recommendedUseCases: [
      "New Office Building & Commercial Space IT Infrastructure Fit-Outs",
      "Multi-Story Campus & Factory Floor Optical Fiber Backbone Linkage",
      "Messy Server Closet / Rack Cable Re-Dressing & Documentation Cleanup",
      "High-Speed Low-Latency Local Area Networks (LAN) for Data-Intensive Workflows"
    ],
    technologies: [
      "Cisco Catalyst & Nexus",
      "Aruba CX Series",
      "Ubiquiti UniFi Enterprise",
      "MikroTik RouterOS",
      "CommScope / Systimax Cat6A",
      "Corning Optical Fiber",
      "Fluke DSX-8000 Certification"
    ],
    equipment: [
      "Managed 24/48-Port Gigabit & 10G SFP+ Switches",
      "Multi-WAN Load Balancing Enterprise Routers",
      "Floor-Standing Server Racks (24U to 42U) & Wall-Mount Data Cabinets (6U to 15U)",
      "1U/2U Shielded Modular Patch Panels & Horizontal Cable Managers",
      "Fiber Optic Patch Panels (LIU) & SFP+ Transceiver Modules"
    ],
    processSteps: [
      {
        stepNumber: "01",
        phase: "Site Survey & Cable Pathway Planning",
        action: "On-site floor walk, cable conduit pathway inspection, node count calculation, and rack sizing.",
        outcome: "Detailed bill of materials (BOM) and architectural cable layout diagram."
      },
      {
        stepNumber: "02",
        phase: "Structured Cabling & Rack Dressing",
        action: "Pulling low-smoke zero-halogen (LSZH) CAT6/Fiber cables, punching patch panels, and dressing racks.",
        outcome: "Immaculate, color-coded, labeled cable terminations passing all visual inspections."
      },
      {
        stepNumber: "03",
        phase: "Switch Configuration & Fluke Testing",
        action: "Program VLANs, spanning tree protocol (STP), link aggregation (LACP), and execute Fluke tester runs.",
        outcome: "100% verified continuity, zero crosstalk, and signed calibration certificates."
      },
      {
        stepNumber: "04",
        phase: "Documentation & Handover",
        action: "Provide detailed port mapping documentation, label keys, and administrator access credentials.",
        outcome: "Seamless operational handover with ongoing preventative maintenance support."
      }
    ],
    typicalSLA: "24/7 Rapid NOC Assistance / Guaranteed Clean Cable Aesthetics & Longevity",
    targetAudience: "Corporate Offices, Co-Working Spaces, Educational Institutes, Logistics Hubs"
  },
  // =========================================================================
  // 03 — CCTV CAMERAS
  // =========================================================================
  {
    id: "srv-03",
    name: "CCTV Cameras & Surveillance Systems",
    slug: "cctv-cameras",
    tagline: "High-Definition IP Video Surveillance, AI Detection, NVR Storage & Remote Monitoring",
    shortDescription: "Professional security camera site assessments, high-resolution 4K/PTZ installation, centralized NVR/DVR storage setup, and secure remote mobile monitoring configuration.",
    overview: "Safeguard your premises, employees, inventory, and physical assets with state-of-the-art IP video surveillance systems. We provide comprehensive coverage design to eliminate blind spots, install weather-proof cameras, and configure smart AI event alerts on your smartphones and central control rooms.",
    icon: "Layers",
    bookingEnabled: true,
    capabilities: [
      "CCTV consultation",
      "Site assessment",
      "Camera installation",
      "NVR/DVR installation",
      "CCTV configuration",
      "Remote monitoring setup",
      "CCTV maintenance",
      "Camera replacement/upgrades"
    ],
    deliverables: [
      "Zero-Blind-Spot Camera Placement Blueprint & Lens Focal Angle Calculations",
      "High-Definition (4MP/8MP 4K) IP Dome, Bullet, and 360\xB0 PTZ Camera Installations",
      "Centralized NVR Recording Server with Surveillance-Rated RAID Hard Drives",
      "Mobile App (iOS/Android) & Central Desktop CMS Multi-Screen Live View Setup",
      "Configured AI Motion, Line Crossing, Intrusion, and Facial Search Analytics"
    ],
    recommendedUseCases: [
      "Commercial Buildings, Office Corridors & Entry Reception Security",
      "Warehouse Inventory Bays, Shipping Docks & Perimeter Fence Monitoring",
      "Retail Stores & Supermarkets for Loss Prevention and Cash Desk Auditing",
      "Manufacturing Plant Floor Safety Compliance & Process Monitoring"
    ],
    technologies: [
      "Hikvision / ColorVu AI",
      "Dahua WizSense",
      "Uniview (UNV) Prime",
      "Axis Communications",
      "ONVIF Protocols",
      "H.265+ Video Encoding",
      "Smart EXIR Infrared Night Vision",
      "Cloud P2P Encryption"
    ],
    equipment: [
      "4K Ultra HD IP Dome Cameras (Vandal-Proof IK10)",
      "Outdoor IP67 Weatherproof Long-Range Bullet Cameras",
      "360\xB0 Pan-Tilt-Zoom (PTZ) Auto-Tracking Speed Domes",
      "16 / 32 / 64-Channel Network Video Recorders (NVR) with Built-in PoE",
      "High-Endurance Surveillance Storage Hard Drives (WD Purple / Seagate SkyHawk)"
    ],
    processSteps: [
      {
        stepNumber: "01",
        phase: "Site Survey & Blind Spot Audit",
        action: "Inspect premises, analyze lighting conditions, identify high-risk assets, and choose lens angles.",
        outcome: "Custom camera layout floor plan and storage capacity calculation for 30/60/90 days."
      },
      {
        stepNumber: "02",
        phase: "PoE Cabling & Precision Mounting",
        action: "Route weather-resistant CAT6 cables, secure mounting brackets, and position cameras for optimal FOV.",
        outcome: "Clean, tamper-resistant installation with concealed wiring."
      },
      {
        stepNumber: "03",
        phase: "NVR System & AI Analytics Setup",
        action: "Configure continuous 24/7 and AI-triggered recording, motion zones, and email/push notifications.",
        outcome: "Fully configured recording matrix with smart event tagging."
      },
      {
        stepNumber: "04",
        phase: "Remote Client & Mobile App Activation",
        action: "Pair smartphones, tablets, and security control room monitors with secure encrypted credentials.",
        outcome: "Instant, crisp live video feeds and playback from anywhere in the world."
      }
    ],
    typicalSLA: "Same-Day Technician Visit for Critical Camera Feeds / Scheduled Quarterly Maintenance",
    targetAudience: "Warehouses, Factories, Corporate Towers, Retail Chains, Residential Complexes"
  },
  // =========================================================================
  // 04 — WIFI & HOTSPOT
  // =========================================================================
  {
    id: "srv-04",
    name: "WiFi & Hotspot Solutions",
    slug: "wifi-hotspot",
    tagline: "High-Density Enterprise Wireless, Seamless Roaming & Custom Guest Captive Portals",
    shortDescription: "Enterprise Wi-Fi 6/7 wireless deployment, RF heatmapping, seamless multi-access point roaming, guest hotspot authentication portals, and bandwidth throttling.",
    overview: "Eliminate dead zones, slow speeds, and dropped connections across your entire facility. We engineer high-density wireless networks capable of supporting hundreds of simultaneous laptops, smartphones, barcode scanners, and IoT devices with seamless roaming and secure guest access.",
    icon: "Cloud",
    bookingEnabled: true,
    capabilities: [
      "WiFi network installation",
      "Enterprise WiFi",
      "Hotspot deployment",
      "Access point installation",
      "WiFi coverage planning",
      "Captive portal configuration",
      "Guest WiFi",
      "Network optimization",
      "WiFi troubleshooting",
      "WiFi maintenance"
    ],
    deliverables: [
      "Comprehensive Predictive & Active RF Heatmap Coverage Reports",
      "High-Density Dual/Tri-Band Wi-Fi 6 / 6E / Wi-Fi 7 Enterprise Access Points",
      "Branded Guest Captive Portal with SMS OTP, Email, or Voucher Authentication",
      "Isolated Staff, Guest, and IoT Wireless SSIDs with Granular Bandwidth Limits",
      "Centralized Cloud Controller Dashboard for Real-Time Client Telemetry"
    ],
    recommendedUseCases: [
      "High-Density Open Plan Corporate Offices & Tech Hubs",
      "Hotels, Cafes & Restaurants Requiring Branded Guest Wi-Fi Portals",
      "Warehouses with Mobile Barcode & RFID Forklift Scanner Roaming",
      "Educational Campuses, Auditoriums & Event Venues with High Concurrency"
    ],
    technologies: [
      "Ubiquiti UniFi Enterprise",
      "Aruba Instant On / ESP",
      "Ruckus Unleashed / SmartZone",
      "Cisco Meraki Cloud",
      "TP-Link Omada SDN",
      "Wi-Fi 7 / 802.11be",
      "WPA3-Enterprise Encryption",
      "RADIUS 802.1X Auth"
    ],
    equipment: [
      "Ceiling-Mount & Wall-Mount Indoor Enterprise Access Points",
      "Long-Range Outdoor Weatherproof (IP67) Directional & Omni APs",
      "Cloud Controller Gateways & Hardware SDN Controllers",
      "High-Power Gigabit PoE+ Injectors & Switches"
    ],
    processSteps: [
      {
        stepNumber: "01",
        phase: "RF Spectrum & Heatmap Planning",
        action: "Simulate building floor plan walls, materials, and interference to calculate optimal AP locations.",
        outcome: "Heatmap blueprint guaranteeing > -65dBm signal strength everywhere."
      },
      {
        stepNumber: "02",
        phase: "Access Point Installation & Cabling",
        action: "Run ceiling CAT6 PoE cables and securely mount access points in designated locations.",
        outcome: "Aesthetically discrete hardware installation with optimal radio propagation."
      },
      {
        stepNumber: "03",
        phase: "SSID & Captive Portal Configuration",
        action: "Design custom branded login portal, setup SMS/Voucher authentication, and configure QoS bandwidth tiers.",
        outcome: "Secure, segregated Wi-Fi networks for corporate employees and visitors."
      },
      {
        stepNumber: "04",
        phase: "Roaming & Concurrency Speed Tuning",
        action: "Conduct physical walk tests to verify fast BSS transition (802.11r/k/v) seamless roaming.",
        outcome: "Smooth, uninterrupted voice/video calls when moving across rooms and floors."
      }
    ],
    typicalSLA: "99.9% Wireless Uptime SLA / Automated Channel Optimization & Interference Mitigation",
    targetAudience: "Hotels & Hospitality, Corporate Workspaces, Hospitals, Schools, Retail Malls"
  }
];

// server.ts
var AUTH_SECRET = process.env.AUTH_SECRET || import_crypto.default.randomBytes(32).toString("hex");
var LICENSE_SIGNING_SECRET = process.env.LICENSE_SIGNING_SECRET || import_crypto.default.randomBytes(32).toString("hex");
var APPS_SCRIPT_SHARED_SECRET = process.env.APPS_SCRIPT_SHARED_SECRET || "";
var PBKDF2_ITERATIONS = 21e4;
var KEY_LENGTH = 64;
var DIGEST = "sha512";
function hashPassword(password, salt) {
  const generatedSalt = salt || import_crypto.default.randomBytes(32).toString("hex");
  const passwordHash = import_crypto.default.pbkdf2Sync(password, generatedSalt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return { passwordHash, salt: generatedSalt };
}
function verifyPassword(password, hash, salt) {
  try {
    const checkHash = import_crypto.default.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST);
    const targetHash = Buffer.from(hash, "hex");
    if (checkHash.length !== targetHash.length) return false;
    return import_crypto.default.timingSafeEqual(checkHash, targetHash);
  } catch {
    return false;
  }
}
var AuthRateLimiter = class {
  constructor(windowMs = 15 * 60 * 1e3, maxAttempts = 5, lockoutMs = 15 * 60 * 1e3) {
    this.records = /* @__PURE__ */ new Map();
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
    this.lockoutMs = lockoutMs;
  }
  check(key) {
    const now = Date.now();
    const rec = this.records.get(key);
    if (!rec) return { blocked: false };
    if (rec.lockedUntil && rec.lockedUntil > now) {
      return {
        blocked: true,
        retryAfterSeconds: Math.ceil((rec.lockedUntil - now) / 1e3)
      };
    }
    if (now - rec.firstAttempt > this.windowMs) {
      this.records.delete(key);
      return { blocked: false };
    }
    if (rec.count >= this.maxAttempts) {
      rec.lockedUntil = now + this.lockoutMs;
      return {
        blocked: true,
        retryAfterSeconds: Math.ceil(this.lockoutMs / 1e3)
      };
    }
    return { blocked: false };
  }
  recordFailure(key) {
    const now = Date.now();
    const rec = this.records.get(key);
    if (!rec || now - rec.firstAttempt > this.windowMs) {
      this.records.set(key, { count: 1, firstAttempt: now });
    } else {
      rec.count++;
      if (rec.count >= this.maxAttempts) {
        rec.lockedUntil = now + this.lockoutMs;
      }
    }
  }
  reset(key) {
    this.records.delete(key);
  }
};
var loginRateLimiter = new AuthRateLimiter(15 * 60 * 1e3, 5, 15 * 60 * 1e3);
var generalAuthLimiter = new AuthRateLimiter(15 * 60 * 1e3, 10, 15 * 60 * 1e3);
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
var PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;
var GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
function sanitizeString(val, maxLength = 500) {
  if (typeof val !== "string") return "";
  return val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, maxLength);
}
function isValidEmail(email) {
  if (typeof email !== "string" || email.length > 254) return false;
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}
function isValidPhone(phone) {
  if (!phone) return true;
  if (typeof phone !== "string") return false;
  return PHONE_REGEX.test(phone.trim());
}
function isValidGstin(gstin) {
  if (!gstin) return true;
  if (typeof gstin !== "string") return false;
  return GSTIN_REGEX.test(gstin.trim().toUpperCase());
}
function isValidIntegerQuantity(q) {
  return typeof q === "number" && Number.isInteger(q) && Number.isFinite(q) && q >= 1 && q <= 1e4;
}
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var BACKUPS_DIR = import_path.default.join(DATA_DIR, "backups");
var STORE_PATH = import_path.default.join(DATA_DIR, "store.json");
var STORE_BACKUP_PATH = import_path.default.join(DATA_DIR, "store.backup.json");
var SEED_USERS = [
  {
    uid: "cust-demo-ent-01",
    id: "cust-demo-ent-01",
    email: "client.procurement@enterprise.example",
    displayName: "Santhosh Kumar (Client Admin)",
    company: "Enterprise Technology Client",
    role: "customer",
    phone: "+91 98400 12345",
    gstin: "33AAACT9988P1Z8",
    billingAddress: "Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032",
    activeLicensesCount: 10,
    createdDate: "2025-01-10",
    ...hashPassword("Enterprise@2026", "demo_salt_customer_01_secure_2026")
  },
  {
    uid: "cust-demo-ent-02",
    id: "cust-demo-ent-02",
    email: "purchasing@apexsolutions.example",
    displayName: "Rajesh V (Apex Procurement)",
    company: "Apex Solutions Private Limited",
    role: "customer",
    phone: "+91 98401 54321",
    gstin: "29ABCDE1234F1Z5",
    billingAddress: "4th Block, Koramangala, Bengaluru, Karnataka - 560034",
    activeLicensesCount: 4,
    createdDate: "2025-02-15",
    ...hashPassword("ApexSecure@2026", "demo_salt_customer_02_secure_2026")
  },
  {
    uid: "staff-sales-01",
    id: "staff-sales-01",
    email: "sales.engineer@lrtechnopark.com",
    displayName: "Sales Solutions Architect",
    company: "LR Techno Park Commercial Operations",
    role: "sales",
    phone: "+91 98400 55555",
    activeLicensesCount: 45,
    createdDate: "2024-06-01",
    ...hashPassword("SalesAdmin@2026", "demo_salt_sales_01_secure_2026")
  },
  {
    uid: "staff-support-01",
    id: "staff-support-01",
    email: "support.lead@lrtechnopark.com",
    displayName: "NOC & Security Operations Desk",
    company: "LR Techno Park Support Center",
    role: "support",
    phone: "+91 98400 66666",
    activeLicensesCount: 0,
    createdDate: "2024-03-15",
    ...hashPassword("SupportLead@2026", "demo_salt_support_01_secure_2026")
  },
  {
    uid: "staff-admin-01",
    id: "staff-admin-01",
    email: "operations.admin@lrtechnopark.com",
    displayName: "Operations & Dispatch Manager",
    company: "LR Techno Park Operations HQ",
    role: "admin",
    phone: "+91 98400 77777",
    gstin: "33AAACL8890K1ZV",
    billingAddress: "Olympia Tech Park, Guindy, Chennai - 600032",
    activeLicensesCount: 120,
    createdDate: "2023-01-01",
    ...hashPassword("Operations@2026", "demo_salt_admin_01_secure_2026")
  },
  {
    uid: "staff-superadmin-01",
    id: "staff-superadmin-01",
    email: "ciso.director@lrtechnopark.com",
    displayName: "Executive Systems Director (Superadmin)",
    company: "LR Techno Park Governance Directorate",
    role: "superadmin",
    phone: "+91 98400 88888",
    gstin: "33AAACL8890K1ZV",
    billingAddress: "Olympia Tech Park, Guindy, Chennai - 600032",
    activeLicensesCount: 350,
    createdDate: "2022-01-01",
    ...hashPassword("SuperAdmin@2026", "demo_salt_superadmin_01_secure_2026")
  }
];
var SEED_ORDERS = [
  {
    id: "LRTP-2026-000101",
    createdAt: new Date(Date.now() - 864e5 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 864e5 * 1).toISOString(),
    customerId: "cust-demo-ent-01",
    customerName: "Santhosh Kumar (Client Admin)",
    customerEmail: "client.procurement@enterprise.example",
    companyName: "Enterprise Technology Client",
    phone: "+91 98400 12345",
    gstin: "33AAACT9988P1Z8",
    billingAddress: "Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032",
    shippingAddress: "Plot 18, Innovation Corridor, Chennai, Tamil Nadu - 600032",
    items: [
      {
        productId: "net-01",
        productName: "24-Port Gigabit Managed L3 PoE+ Switch",
        productCode: "LR-NET-SW24P",
        category: "Networking Hardware",
        brand: "LR Network Systems",
        licenseType: "ANNUAL",
        deploymentTier: "STANDARD_DELIVERY",
        quantity: 2,
        unitPrice: 42500,
        totalPrice: 85e3,
        hsnCode: "8517",
        gstRate: 0.18,
        taxAmount: 15300,
        warrantyPeriod: "3-Year On-Site NBD Replacement",
        configurationNotes: "Pre-configured VLAN 10 (Data) & VLAN 20 (CCTV PoE)"
      },
      {
        productId: "cctv-01",
        productName: "4K Ultra HD AI Smart IP Dome Camera",
        productCode: "LR-CAM-DOME01",
        category: "CCTV Cameras",
        brand: "LR Surveillance Pro",
        licenseType: "ANNUAL",
        deploymentTier: "STANDARD_DELIVERY",
        quantity: 8,
        unitPrice: 12800,
        totalPrice: 102400,
        hsnCode: "8525",
        gstRate: 0.18,
        taxAmount: 18432,
        warrantyPeriod: "3-Year Replacement Guarantee",
        configurationNotes: "Mounted for Warehouse loading bay and corridor perimeter"
      }
    ],
    subtotal: 187400,
    tax: 33732,
    total: 221132,
    currency: "INR",
    status: "PROCESSING",
    timeline: [
      {
        status: "SUBMITTED",
        timestamp: new Date(Date.now() - 864e5 * 4).toISOString(),
        note: "Order submitted with 18% GST tax invoice breakdown and delivery terms.",
        actor: "LR Core Order API"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: new Date(Date.now() - 864e5 * 3).toISOString(),
        note: "B2B GSTIN 33AAACT9988P1Z8 verified against master tax registry.",
        actor: "Finance & Compliance Desk"
      },
      {
        status: "PROCESSING",
        timestamp: new Date(Date.now() - 864e5 * 1).toISOString(),
        note: "Hardware units staged at Chennai Fulfillment Hub and firmware flashed.",
        actor: "Operations Logistics"
      }
    ],
    notes: "Urgent staging required for Guindy facility expansion phase 1.",
    purchaseOrderNumber: "PO-ENT-2026-8891",
    syncedToGoogleSheets: true,
    sheetsSyncStatus: "SYNCED",
    sheetsSyncTimestamp: new Date(Date.now() - 864e5 * 4).toISOString(),
    assignedSalesEngineer: "K. Balaji (Enterprise Solutions)",
    courierPartner: "Blue Dart Apex Express",
    dispatchTrackingNumber: "BDT-984028192-IN",
    warrantyCertificateId: "LRTP-WRN-000101-2029",
    gstBreakdown: {
      sacCode: "8517 / 8525",
      cgstRate: 0.09,
      cgstAmount: 16866,
      sgstRate: 0.09,
      sgstAmount: 16866,
      igstRate: 0,
      igstAmount: 0,
      isInterState: false,
      isB2B: true,
      customerGstin: "33AAACT9988P1Z8"
    }
  },
  {
    id: "LRTP-2026-000102",
    createdAt: new Date(Date.now() - 864e5 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 864e5 * 2).toISOString(),
    customerId: "cust-demo-ent-02",
    customerName: "Rajesh V (Apex Procurement)",
    customerEmail: "purchasing@apexsolutions.example",
    companyName: "Apex Solutions Private Limited",
    phone: "+91 98401 54321",
    gstin: "29ABCDE1234F1Z5",
    billingAddress: "4th Block, Koramangala, Bengaluru, Karnataka - 560034",
    shippingAddress: "4th Block, Koramangala, Bengaluru, Karnataka - 560034",
    items: [
      {
        productId: "lap-01",
        productName: "Commercial Enterprise Laptop 14-inch",
        productCode: "LR-LAP-CORP14",
        category: "Laptops",
        brand: "LR Certified Enterprise",
        licenseType: "ANNUAL",
        deploymentTier: "STANDARD_DELIVERY",
        quantity: 4,
        unitPrice: 84500,
        totalPrice: 338e3,
        hsnCode: "8471",
        gstRate: 0.18,
        taxAmount: 60840,
        warrantyPeriod: "3 Years On-Site Comprehensive Hardware Warranty"
      }
    ],
    subtotal: 338e3,
    tax: 60840,
    total: 398840,
    currency: "INR",
    status: "SUBMITTED",
    timeline: [
      {
        status: "SUBMITTED",
        timestamp: new Date(Date.now() - 864e5 * 2).toISOString(),
        note: "Order placed for Bengaluru corporate headquarters delivery. Inter-State IGST (18%) applied.",
        actor: "LR Core Order API"
      }
    ],
    purchaseOrderNumber: "PO-APX-2026-4412",
    syncedToGoogleSheets: true,
    sheetsSyncStatus: "SYNCED",
    sheetsSyncTimestamp: new Date(Date.now() - 864e5 * 2).toISOString(),
    gstBreakdown: {
      sacCode: "8471",
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 0.18,
      igstAmount: 60840,
      isInterState: true,
      isB2B: true,
      customerGstin: "29ABCDE1234F1Z5"
    }
  }
];
var SEED_BOOKINGS = [
  {
    id: "srv-book-01",
    bookingId: "LRTP-SVC-2026-000001",
    dateSubmitted: new Date(Date.now() - 864e5 * 3).toISOString(),
    customerName: "Santhosh Kumar",
    company: "Enterprise Technology Client",
    email: "client.procurement@enterprise.example",
    phone: "+91 98400 12345",
    service: "Firewall & Network Security",
    preferredDate: "2026-09-02",
    preferredTime: "10:00 AM - 01:00 PM",
    location: "Olympia Tech Park, Guindy, Chennai",
    requirements: "Next-Gen Firewall installation with HA active-standby pair and dual ISP failover.",
    bookingStatus: "CONFIRMED",
    syncedToGoogleSheets: true
  }
];
var SEED_CONTACTS = [
  {
    id: "cnt-01",
    enquiryId: "LRTP-CON-2026-000001",
    name: "M. Anand",
    email: "anand.infra@chennaitech.example",
    phone: "+91 98402 33445",
    company: "Chennai Tech Industrial Park",
    subject: "Complete 4K IP CCTV & Fiber Backbone Infrastructure",
    serviceInterest: "CCTV Cameras & Structured Cabling",
    estimatedBudget: "\u20B915,00,000 - \u20B925,00,000",
    message: "Seeking comprehensive turnkey proposal for 48x 4K IP Dome cameras with 90-day RAID storage.",
    source: "Website Contact Page",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 864e5 * 2).toISOString(),
    syncedToGoogleSheets: true
  }
];
var SEED_TICKETS = [
  {
    id: "tkt-01",
    ticketNumber: "LRTP-TKT-2026-000001",
    customerId: "cust-demo-ent-01",
    customerName: "Santhosh Kumar",
    customerEmail: "client.procurement@enterprise.example",
    companyName: "Enterprise Technology Client",
    subject: "VLAN 20 CCTV PoE Switch Port Routing & Isolation",
    category: "Deployment & Infrastructure",
    priority: "HIGH_P2",
    description: "Assistance requested on configuring multipath VLAN routing for newly connected 4K IP dome cameras.",
    status: "IN_PROGRESS",
    createdAt: new Date(Date.now() - 864e5 * 1).toISOString(),
    assignedTeam: "Network Systems Engineering Desk"
  }
];
var Database = class {
  constructor() {
    this.isSaving = false;
    if (!import_fs.default.existsSync(DATA_DIR)) {
      import_fs.default.mkdirSync(DATA_DIR, { recursive: true, mode: 448 });
    }
    if (!import_fs.default.existsSync(BACKUPS_DIR)) {
      import_fs.default.mkdirSync(BACKUPS_DIR, { recursive: true, mode: 448 });
    }
    this.data = this.loadWithRecovery();
  }
  loadWithRecovery() {
    if (import_fs.default.existsSync(STORE_PATH)) {
      try {
        const raw = import_fs.default.readFileSync(STORE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.orders) && Array.isArray(parsed.users)) {
          for (const seedUser of SEED_USERS) {
            const idx = parsed.users.findIndex((u) => u.email.toLowerCase() === seedUser.email.toLowerCase());
            if (idx >= 0) {
              parsed.users[idx].passwordHash = seedUser.passwordHash;
              parsed.users[idx].salt = seedUser.salt;
            } else {
              parsed.users.push(seedUser);
            }
          }
          return parsed;
        }
      } catch (err) {
        console.error("[DB Recovery] Failed to parse primary store.json, attempting mirror recovery:", err);
      }
    }
    if (import_fs.default.existsSync(STORE_BACKUP_PATH)) {
      try {
        const raw = import_fs.default.readFileSync(STORE_BACKUP_PATH, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.orders) && Array.isArray(parsed.users)) {
          console.warn("[DB Recovery] Restored state successfully from store.backup.json");
          return parsed;
        }
      } catch (err) {
        console.error("[DB Recovery] Mirror backup unreadable:", err);
      }
    }
    try {
      if (import_fs.default.existsSync(BACKUPS_DIR)) {
        const files = import_fs.default.readdirSync(BACKUPS_DIR).filter((f) => f.endsWith(".json")).sort().reverse();
        if (files.length > 0) {
          const candidatePath = import_path.default.join(BACKUPS_DIR, files[0]);
          const raw = import_fs.default.readFileSync(candidatePath, "utf8");
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.orders)) {
            console.warn(`[DB Recovery] Restored state from historical backup snapshot ${files[0]}`);
            return parsed;
          }
        }
      }
    } catch (err) {
      console.error("[DB Recovery] Historical snapshot scan failed:", err);
    }
    console.warn("[DB Recovery] Initializing pristine database from verified seed baseline.");
    const seed = this.getDefaultSeed();
    this.persistSync(seed);
    return seed;
  }
  getDefaultSeed() {
    return {
      orderCounter: 104,
      serviceBookingCounter: 201,
      contactCounter: 301,
      orders: SEED_ORDERS,
      serviceBookings: SEED_BOOKINGS,
      contactSubmissions: SEED_CONTACTS,
      supportTickets: SEED_TICKETS,
      users: SEED_USERS
    };
  }
  persistSync(schema) {
    try {
      const jsonContent = JSON.stringify(schema, null, 2);
      const tempPath = `${STORE_PATH}.tmp`;
      import_fs.default.writeFileSync(tempPath, jsonContent, { encoding: "utf8", mode: 384 });
      import_fs.default.renameSync(tempPath, STORE_PATH);
      import_fs.default.writeFileSync(STORE_BACKUP_PATH, jsonContent, { encoding: "utf8", mode: 384 });
    } catch (err) {
      console.error("[DB Write Error] Failed to persist database synchronously:", err);
    }
  }
  save() {
    if (this.isSaving) return;
    this.isSaving = true;
    try {
      const jsonContent = JSON.stringify(this.data, null, 2);
      const tempPath = `${STORE_PATH}.tmp`;
      import_fs.default.writeFileSync(tempPath, jsonContent, { encoding: "utf8", mode: 384 });
      import_fs.default.renameSync(tempPath, STORE_PATH);
      import_fs.default.writeFileSync(STORE_BACKUP_PATH, jsonContent, { encoding: "utf8", mode: 384 });
      const snapshotName = `store-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.json`;
      const snapshotPath = import_path.default.join(BACKUPS_DIR, snapshotName);
      import_fs.default.writeFileSync(snapshotPath, jsonContent, { encoding: "utf8", mode: 384 });
      const allSnapshots = import_fs.default.readdirSync(BACKUPS_DIR).filter((f) => f.startsWith("store-") && f.endsWith(".json")).sort();
      if (allSnapshots.length > 5) {
        for (let i = 0; i < allSnapshots.length - 5; i++) {
          try {
            import_fs.default.unlinkSync(import_path.default.join(BACKUPS_DIR, allSnapshots[i]));
          } catch {
          }
        }
      }
    } catch (err) {
      console.error("[DB Write Error] Atomic save failed:", err);
    } finally {
      this.isSaving = false;
    }
  }
  // Schema Accessors
  getOrders() {
    return this.data.orders;
  }
  getServiceBookings() {
    return this.data.serviceBookings;
  }
  getContactSubmissions() {
    return this.data.contactSubmissions;
  }
  getSupportTickets() {
    return this.data.supportTickets;
  }
  getUsers() {
    return this.data.users;
  }
  getOrderCounter() {
    return ++this.data.orderCounter;
  }
  getServiceBookingCounter() {
    return ++this.data.serviceBookingCounter;
  }
  getContactCounter() {
    return ++this.data.contactCounter;
  }
};
var db = new Database();
function createAuthToken(user) {
  const payload = {
    uid: user.uid || user.id,
    email: user.email.toLowerCase(),
    displayName: user.displayName,
    company: user.company,
    role: user.role,
    phone: user.phone || "",
    iat: Math.floor(Date.now() / 1e3),
    exp: Math.floor(Date.now() / 1e3) + 86400 * 30
    // 30 days session
  };
  const header = { alg: "HS256", typ: "JWT" };
  const b64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = import_crypto.default.createHmac("sha256", AUTH_SECRET).update(`${b64Header}.${b64Payload}`).digest("base64url");
  return `${b64Header}.${b64Payload}.${signature}`;
}
function verifyAuthToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "Malformed JWT structure" };
    }
    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = import_crypto.default.createHmac("sha256", AUTH_SECRET).update(`${b64Header}.${b64Payload}`).digest("base64url");
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !import_crypto.default.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false, error: "Invalid token signature" };
    }
    const payload = JSON.parse(Buffer.from(b64Payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1e3);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: "Token expired" };
    }
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err.message || "Token verification error" };
  }
}
function extractUserFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return { authenticated: false };
  }
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return { authenticated: false };
  }
  const result = verifyAuthToken(token);
  if (result.valid && result.payload) {
    return {
      authenticated: true,
      role: result.payload.role,
      email: result.payload.email,
      userId: result.payload.uid,
      user: result.payload
    };
  }
  return { authenticated: false };
}
function requireAuth(req, res, next) {
  const auth = extractUserFromHeader(req);
  if (!auth.authenticated || !auth.user) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Authentication required. Please provide a valid authorization token."
    });
  }
  req.auth = auth;
  next();
}
function requireRoles(allowedRoles) {
  return (req, res, next) => {
    const auth = extractUserFromHeader(req);
    if (!auth.authenticated || !auth.role) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Please authenticate to access this endpoint."
      });
    }
    if (!allowedRoles.includes(auth.role) && auth.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        error: `Access Denied: Role '${auth.role}' is not permitted to access this resource. Required: [${allowedRoles.join(", ")}]`
      });
    }
    req.auth = auth;
    next();
  };
}
async function dispatchGoogleSheetsWebhook(payload) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith("http")) {
    return { dispatched: false, status: "PENDING", error: "GOOGLE_APPS_SCRIPT_URL not configured" };
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6e3);
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lrtp-webhook-secret": APPS_SCRIPT_SHARED_SECRET
      },
      body: JSON.stringify({
        ...payload,
        dispatchedAt: (/* @__PURE__ */ new Date()).toISOString()
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (response.ok) {
      return { dispatched: true, status: "SYNCED" };
    } else {
      return { dispatched: false, status: "FAILED", error: `HTTP ${response.status} from Apps Script` };
    }
  } catch (err) {
    return { dispatched: false, status: "FAILED", error: err.message || "Webhook timeout or connection error" };
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "500kb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
    );
    next();
  });
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use("/data", (req, res) => {
    res.status(403).json({ success: false, error: "Access Denied: Protected storage directory." });
  });
  app.post("/api/auth/login", (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    const { email, password } = req.body;
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }
    const emailTrim = email.trim().toLowerCase();
    const rateLimitKey = `${ip}:${emailTrim}`;
    const rateCheck = loginRateLimiter.check(rateLimitKey);
    if (rateCheck.blocked) {
      res.setHeader("Retry-After", String(rateCheck.retryAfterSeconds || 900));
      return res.status(429).json({
        success: false,
        error: `Too many failed login attempts. Account protection activated. Please try again after ${rateCheck.retryAfterSeconds || 900} seconds.`
      });
    }
    const user = db.getUsers().find((u) => u.email.toLowerCase() === emailTrim);
    if (!user) {
      loginRateLimiter.recordFailure(rateLimitKey);
      return res.status(401).json({
        success: false,
        error: "Invalid email or password. Please verify your credentials."
      });
    }
    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      loginRateLimiter.recordFailure(rateLimitKey);
      return res.status(401).json({
        success: false,
        error: "Invalid email or password. Please verify your credentials."
      });
    }
    loginRateLimiter.reset(rateLimitKey);
    const userProfile = {
      uid: user.uid || user.id,
      id: user.uid || user.id,
      email: user.email,
      displayName: user.displayName,
      company: user.company,
      role: user.role,
      phone: user.phone,
      gstin: user.gstin,
      billingAddress: user.billingAddress,
      activeLicensesCount: user.activeLicensesCount,
      createdDate: user.createdDate
    };
    const token = createAuthToken(userProfile);
    res.json({
      success: true,
      message: "Authentication successful.",
      token,
      user: userProfile
    });
  });
  app.post("/api/auth/register", (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    const rateCheck = generalAuthLimiter.check(`register:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({
        success: false,
        error: "Too many registration requests. Please wait before attempting again."
      });
    }
    const { name, email, company, phone, password, gstin } = req.body;
    if (!name || !email || !company || !password) {
      return res.status(400).json({ success: false, error: "Name, email, company, and password are required." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid corporate email address." });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters long." });
    }
    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ success: false, error: "Invalid phone number format." });
    }
    if (gstin && !isValidGstin(gstin)) {
      return res.status(400).json({ success: false, error: "Invalid 15-character GSTIN format." });
    }
    const emailTrim = String(email).trim().toLowerCase();
    const existing = db.getUsers().find((u) => u.email.toLowerCase() === emailTrim);
    if (existing) {
      generalAuthLimiter.recordFailure(`register:${ip}`);
      return res.status(409).json({ success: false, error: "An account with this email address already exists." });
    }
    const { passwordHash, salt } = hashPassword(String(password));
    const newUid = `cust-${Date.now().toString(36)}-${import_crypto.default.randomBytes(3).toString("hex")}`;
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const newUser = {
      uid: newUid,
      id: newUid,
      email: emailTrim,
      displayName: sanitizeString(name, 100),
      company: sanitizeString(company, 150),
      phone: phone ? sanitizeString(phone, 30) : "",
      gstin: gstin ? sanitizeString(gstin, 20).toUpperCase() : void 0,
      role: "customer",
      activeLicensesCount: 0,
      createdDate: today,
      passwordHash,
      salt
    };
    db.getUsers().push(newUser);
    db.save();
    const userProfile = {
      uid: newUser.uid,
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      company: newUser.company,
      role: newUser.role,
      phone: newUser.phone,
      gstin: newUser.gstin,
      activeLicensesCount: newUser.activeLicensesCount,
      createdDate: newUser.createdDate
    };
    const token = createAuthToken(userProfile);
    res.status(201).json({
      success: true,
      message: "Customer account registered successfully.",
      token,
      user: userProfile
    });
  });
  app.post("/api/auth/google", (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    const rateCheck = generalAuthLimiter.check(`google:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({ success: false, error: "Too many authentication requests. Please wait." });
    }
    const { email, displayName, company } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Valid Google email account is required." });
    }
    const emailTrim = String(email).trim().toLowerCase();
    let user = db.getUsers().find((u) => u.email.toLowerCase() === emailTrim);
    if (!user) {
      const newUid = `google-${Date.now().toString(36)}`;
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const { passwordHash, salt } = hashPassword(import_crypto.default.randomBytes(32).toString("hex"));
      user = {
        uid: newUid,
        id: newUid,
        email: emailTrim,
        displayName: sanitizeString(displayName || emailTrim.split("@")[0], 100),
        company: sanitizeString(company || "Enterprise Client Org", 150),
        role: "customer",
        activeLicensesCount: 0,
        createdDate: today,
        passwordHash,
        salt
      };
      db.getUsers().push(user);
      db.save();
    }
    const userProfile = {
      uid: user.uid,
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      company: user.company,
      role: user.role,
      phone: user.phone,
      gstin: user.gstin,
      billingAddress: user.billingAddress,
      activeLicensesCount: user.activeLicensesCount,
      createdDate: user.createdDate
    };
    const token = createAuthToken(userProfile);
    res.json({ success: true, token, user: userProfile });
  });
  app.post("/api/auth/reset-password", (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    const rateCheck = generalAuthLimiter.check(`reset:${ip}`);
    if (rateCheck.blocked) {
      return res.status(429).json({ success: false, error: "Too many reset attempts. Please wait." });
    }
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Valid corporate email address is required." });
    }
    generalAuthLimiter.recordFailure(`reset:${ip}`);
    res.json({
      success: true,
      message: "If an account is associated with this email address, password reset instructions have been dispatched to your corporate inbox."
    });
  });
  app.get("/api/auth/me", (req, res) => {
    const auth = extractUserFromHeader(req);
    if (!auth.authenticated || !auth.user) {
      return res.status(401).json({ success: false, error: "Not authenticated or session expired." });
    }
    res.json({ success: true, user: auth.user });
  });
  app.get("/api/health", (req, res) => {
    try {
      let storageHealthy = false;
      try {
        const testOrders = db.getOrders();
        const testUsers = db.getUsers();
        storageHealthy = Array.isArray(testOrders) && Array.isArray(testUsers) && import_fs.default.existsSync(DATA_DIR);
      } catch {
        storageHealthy = false;
      }
      const catalogHealthy = Array.isArray(productsData) && productsData.length > 0 && Array.isArray(servicesData) && servicesData.length > 0;
      const isSystemHealthy = storageHealthy && catalogHealthy;
      const mem = process.memoryUsage();
      const healthPayload = {
        status: isSystemHealthy ? "healthy" : "degraded",
        service: "LR Techno Park Enterprise Gateway API",
        version: "1.0.0",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        dependencies: {
          databaseStorage: storageHealthy ? "operational" : "unavailable",
          productsCatalog: catalogHealthy ? "operational" : "unavailable",
          sheetsSyncGateway: Boolean(process.env.GOOGLE_APPS_SCRIPT_URL) ? "configured" : "unconfigured"
        },
        metrics: {
          activeOrdersCount: db.getOrders().length,
          serviceBookingsCount: db.getServiceBookings().length,
          contactEnquiriesCount: db.getContactSubmissions().length,
          heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024 * 10) / 10
        }
      };
      if (!isSystemHealthy) {
        return res.status(503).json(healthPayload);
      }
      res.json(healthPayload);
    } catch {
      res.status(503).json({
        status: "unhealthy",
        error: "Critical system dependency check failed"
      });
    }
  });
  app.get("/api/products", (req, res) => {
    const { category } = req.query;
    let results = productsData;
    if (category && typeof category === "string" && category !== "All") {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    res.json({ success: true, count: results.length, data: results });
  });
  app.get("/api/products/:slug", (req, res) => {
    const product = productsData.find((p) => p.slug === req.params.slug || p.id === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, data: product });
  });
  app.get("/api/services", (req, res) => {
    res.json({ success: true, count: servicesData.length, data: servicesData });
  });
  app.get("/api/services/:slug", (req, res) => {
    const service = servicesData.find((s) => s.slug === req.params.slug || s.id === req.params.slug);
    if (!service) {
      return res.status(404).json({ success: false, error: "Service not found" });
    }
    res.json({ success: true, data: service });
  });
  app.get("/api/orders", requireAuth, (req, res) => {
    const auth = req.auth;
    const { query } = req.query;
    let orders = [...db.getOrders()];
    if (auth.role === "customer") {
      orders = orders.filter(
        (o) => o.customerId === auth.userId || o.customerEmail.toLowerCase() === auth.email.toLowerCase()
      );
    }
    if (query) {
      const q = String(query).toLowerCase();
      orders = orders.filter(
        (o) => o.id.toLowerCase().includes(q) || o.companyName.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.items.some((i) => i.productName.toLowerCase().includes(q))
      );
    }
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, count: orders.length, data: orders });
  });
  app.get("/api/orders/:id", requireAuth, (req, res) => {
    const auth = req.auth;
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find((o) => o.id.toUpperCase() === orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with reference ID '${req.params.id}' was not found.`
      });
    }
    if (auth.role === "customer") {
      const isOwner = order.customerId === auth.userId || order.customerEmail.toLowerCase() === auth.email.toLowerCase();
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          error: "Access Denied: You do not have permission to view this order."
        });
      }
    }
    res.json({ success: true, data: order });
  });
  app.get("/api/orders/track/:id", (req, res) => {
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find((o) => o.id.toUpperCase() === orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with reference ID '${req.params.id}' was not found.`
      });
    }
    res.json({
      success: true,
      data: {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        companyName: order.companyName,
        customerName: order.customerName,
        items: order.items.map((i) => ({
          productName: i.productName,
          productCode: i.productCode,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          deploymentTier: i.deploymentTier
        })),
        total: order.total,
        timeline: order.timeline,
        courierPartner: order.courierPartner,
        dispatchTrackingNumber: order.dispatchTrackingNumber,
        shippingAddress: order.shippingAddress,
        purchaseOrderNumber: order.purchaseOrderNumber
      }
    });
  });
  app.post("/api/orders", async (req, res) => {
    try {
      const auth = extractUserFromHeader(req);
      const {
        customerId,
        customerName,
        customerEmail,
        companyName,
        phone,
        gstin,
        billingAddress,
        shippingAddress,
        items,
        notes,
        purchaseOrderNumber
      } = req.body;
      if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
        return res.status(400).json({ success: false, error: "Valid customer name is required." });
      }
      if (!isValidEmail(customerEmail)) {
        return res.status(400).json({ success: false, error: "Valid customer corporate email address is required." });
      }
      if (!companyName || typeof companyName !== "string" || companyName.trim().length < 2) {
        return res.status(400).json({ success: false, error: "Valid enterprise company name is required." });
      }
      if (phone && !isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: "Invalid phone number format." });
      }
      if (gstin && !isValidGstin(gstin)) {
        return res.status(400).json({ success: false, error: "Invalid 15-character GSTIN format." });
      }
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: "Order must contain at least one valid product item." });
      }
      let computedSubtotal = 0;
      let totalTaxAmount = 0;
      const validatedItems = [];
      const itemizedTaxSummary = [];
      for (const item of items) {
        const product = productsData.find((p) => p.id === item.productId || p.code === item.productCode || p.name === item.productName);
        if (!product) {
          return res.status(400).json({
            success: false,
            error: `Invalid or unavailable product identifier: '${item.productId || item.productCode || item.productName}'.`
          });
        }
        if (!product.orderEnabled) {
          return res.status(400).json({
            success: false,
            error: `Product '${product.name}' is currently not available for self-service procurement.`
          });
        }
        const rawQuantity = typeof item.quantity === "string" ? parseInt(item.quantity, 10) : item.quantity;
        if (!isValidIntegerQuantity(rawQuantity)) {
          return res.status(400).json({
            success: false,
            error: `Invalid unit quantity for ${product.name}. Must be a positive integer between 1 and 10,000.`
          });
        }
        const quantity = rawQuantity;
        let authoritativeUnitPrice = product.price;
        if (product.pricing && product.pricing.length > 0) {
          const tier = product.pricing.find((p) => p.licenseType === item.licenseType) || product.pricing[0];
          if (quantity >= (tier.minimumSeats || 1)) {
            authoritativeUnitPrice = tier.pricePerUnit;
          }
        }
        if (product.discountPrice && quantity >= 5) {
          authoritativeUnitPrice = Math.min(authoritativeUnitPrice, product.discountPrice);
        }
        const authoritativeItemTotal = Math.round(authoritativeUnitPrice * quantity);
        computedSubtotal += authoritativeItemTotal;
        const itemHsnCode = product.hsnCode || (product.category === "CCTV Cameras" ? "8525" : product.category === "Networking Hardware" ? "8517" : "8471");
        const itemGstRate = typeof product.gstRate === "number" ? product.gstRate : 0.18;
        const itemTax = Math.round(authoritativeItemTotal * itemGstRate);
        totalTaxAmount += itemTax;
        itemizedTaxSummary.push({
          productName: product.name,
          hsnCode: itemHsnCode,
          taxableAmount: authoritativeItemTotal,
          gstRate: itemGstRate,
          taxAmount: itemTax
        });
        validatedItems.push({
          productId: product.id,
          productName: product.name,
          productCode: product.code,
          category: product.category,
          brand: product.brand,
          licenseType: item.licenseType || "ANNUAL",
          deploymentTier: item.deploymentTier || "STANDARD_DELIVERY",
          quantity,
          unitPrice: authoritativeUnitPrice,
          totalPrice: authoritativeItemTotal,
          hsnCode: itemHsnCode,
          gstRate: itemGstRate,
          taxAmount: itemTax,
          warrantyPeriod: product.warranty || "3-Year On-Site NBD Replacement",
          configurationNotes: sanitizeString(item.configurationNotes, 300)
        });
      }
      const cleanedGstin = gstin ? sanitizeString(gstin, 20).toUpperCase() : void 0;
      const destinationStr = `${billingAddress || ""} ${shippingAddress || ""}`.toLowerCase();
      const isTamilNaduState = cleanedGstin && cleanedGstin.startsWith("33") || destinationStr.includes("tamil nadu") || destinationStr.includes("chennai");
      const isB2B = Boolean(cleanedGstin && isValidGstin(cleanedGstin));
      const computedGrandTotal = computedSubtotal + totalTaxAmount;
      const gstBreakdown = {
        sacCode: validatedItems.map((i) => i.hsnCode).filter((v, idx, a) => a.indexOf(v) === idx).join(" / "),
        cgstRate: isTamilNaduState ? 0.09 : 0,
        cgstAmount: isTamilNaduState ? Math.round(totalTaxAmount / 2) : 0,
        sgstRate: isTamilNaduState ? 0.09 : 0,
        sgstAmount: isTamilNaduState ? totalTaxAmount - Math.round(totalTaxAmount / 2) : 0,
        igstRate: isTamilNaduState ? 0 : 0.18,
        igstAmount: isTamilNaduState ? 0 : totalTaxAmount,
        isInterState: !isTamilNaduState,
        isB2B,
        customerGstin: cleanedGstin,
        itemizedSummary: itemizedTaxSummary
      };
      const orderCounter = db.getOrderCounter();
      const orderId = `LRTP-2026-${String(orderCounter).padStart(6, "0")}`;
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      const verifiedCustomerId = auth.authenticated && auth.userId ? auth.userId : customerId && customerId.trim().length > 3 ? sanitizeString(customerId, 50) : `cust-${import_crypto.default.randomBytes(4).toString("hex")}`;
      const newOrder = {
        id: orderId,
        createdAt: nowIso,
        updatedAt: nowIso,
        customerId: verifiedCustomerId,
        customerName: sanitizeString(customerName, 100),
        customerEmail: customerEmail.trim().toLowerCase(),
        companyName: sanitizeString(companyName, 150),
        phone: phone ? sanitizeString(phone, 30) : "+91 98400 12345",
        gstin: cleanedGstin,
        billingAddress: billingAddress ? sanitizeString(billingAddress, 250) : "Corporate Campus, Chennai",
        shippingAddress: shippingAddress ? sanitizeString(shippingAddress, 250) : billingAddress ? sanitizeString(billingAddress, 250) : "Corporate Campus, Chennai",
        items: validatedItems,
        subtotal: computedSubtotal,
        tax: totalTaxAmount,
        total: computedGrandTotal,
        currency: "INR",
        status: "SUBMITTED",
        timeline: [
          {
            status: "SUBMITTED",
            timestamp: nowIso,
            note: "Order validated, itemized GST tax invoice breakdown computed, and committed to database.",
            actor: "LR Core Order API"
          }
        ],
        notes: notes ? sanitizeString(notes, 1e3) : "",
        purchaseOrderNumber: purchaseOrderNumber ? sanitizeString(purchaseOrderNumber, 50) : `PO-${orderId.split("-")[2]}`,
        syncedToGoogleSheets: false,
        sheetsSyncStatus: "PENDING",
        dispatchTrackingNumber: `BDT-${Math.floor(1e8 + Math.random() * 9e8)}-IN`,
        courierPartner: "Blue Dart Apex Express",
        warrantyCertificateId: `LRTP-WRN-${orderId.replace(/[^0-9]/g, "")}-2029`,
        gstBreakdown
      };
      db.getOrders().unshift(newOrder);
      db.save();
      dispatchGoogleSheetsWebhook({
        action: "PRODUCT_ORDER",
        targetSheet: "Product Orders",
        data: {
          orderId: newOrder.id,
          date: new Date(newOrder.createdAt).toLocaleString("en-IN"),
          customerName: newOrder.customerName,
          company: newOrder.companyName,
          email: newOrder.customerEmail,
          phone: newOrder.phone,
          gstin: newOrder.gstin || "N/A",
          shippingAddress: newOrder.shippingAddress,
          items: newOrder.items.map((i) => `${i.productName} (Qty: ${i.quantity}, \u20B9${i.unitPrice})`).join("; "),
          subtotal: `\u20B9${newOrder.subtotal.toLocaleString("en-IN")}`,
          tax: `\u20B9${newOrder.tax.toLocaleString("en-IN")}`,
          total: `\u20B9${newOrder.total.toLocaleString("en-IN")}`,
          status: newOrder.status,
          purchaseOrderNumber: newOrder.purchaseOrderNumber || "N/A"
        }
      }).then((res2) => {
        newOrder.syncedToGoogleSheets = res2.dispatched;
        newOrder.sheetsSyncStatus = res2.status;
        if (res2.dispatched) {
          newOrder.sheetsSyncTimestamp = (/* @__PURE__ */ new Date()).toISOString();
        } else if (res2.error) {
          newOrder.sheetsSyncError = res2.error;
        }
        db.save();
      });
      return res.status(201).json({
        success: true,
        message: "Order placed successfully and persisted to database.",
        orderId: newOrder.id,
        data: newOrder
      });
    } catch (err) {
      console.error("[Order Processing Error]:", err);
      return res.status(500).json({ success: false, error: "An internal server error occurred while processing the order." });
    }
  });
  app.patch("/api/orders/:id/status", requireRoles(["sales", "admin", "superadmin"]), (req, res) => {
    const { status, note, actor } = req.body;
    const order = db.getOrders().find((o) => o.id.toUpperCase() === req.params.id.toUpperCase());
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "PROCESSING", "COMPLETED", "CANCELLED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status: ${status}` });
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    order.status = status;
    order.updatedAt = now;
    order.timeline.push({
      status,
      timestamp: now,
      note: note ? sanitizeString(note, 500) : `Status updated to ${status}`,
      actor: actor ? sanitizeString(actor, 100) : "LR Operations Desk"
    });
    db.save();
    res.json({
      success: true,
      message: `Order ${order.id} status transitioned to ${status}`,
      data: order
    });
  });
  app.post("/api/orders/:id/retry-sync", requireAuth, async (req, res) => {
    const auth = req.auth;
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.getOrders().find((o) => o.id.toUpperCase() === orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    if (auth.role === "customer") {
      const isOwner = order.customerId === auth.userId || order.customerEmail.toLowerCase() === auth.email.toLowerCase();
      if (!isOwner) {
        return res.status(403).json({ success: false, error: "Access Denied: You do not have permission to sync this order." });
      }
    }
    order.sheetsSyncStatus = "RETRYING";
    db.save();
    const syncResult = await dispatchGoogleSheetsWebhook({
      action: "PRODUCT_ORDER",
      targetSheet: "Product Orders",
      data: {
        orderId: order.id,
        date: new Date(order.createdAt).toLocaleString("en-IN"),
        customerName: order.customerName,
        company: order.companyName,
        email: order.customerEmail,
        phone: order.phone,
        gstin: order.gstin || "N/A",
        shippingAddress: order.shippingAddress,
        items: order.items.map((i) => `${i.productName} (Qty: ${i.quantity}, \u20B9${i.unitPrice})`).join("; "),
        subtotal: `\u20B9${order.subtotal.toLocaleString("en-IN")}`,
        tax: `\u20B9${order.tax.toLocaleString("en-IN")}`,
        total: `\u20B9${order.total.toLocaleString("en-IN")}`,
        status: order.status,
        purchaseOrderNumber: order.purchaseOrderNumber || "N/A"
      }
    });
    order.syncedToGoogleSheets = syncResult.dispatched;
    order.sheetsSyncStatus = syncResult.status;
    if (syncResult.dispatched) {
      order.sheetsSyncTimestamp = (/* @__PURE__ */ new Date()).toISOString();
      delete order.sheetsSyncError;
    } else if (syncResult.error) {
      order.sheetsSyncError = syncResult.error;
    }
    db.save();
    res.json({
      success: true,
      message: syncResult.dispatched ? "Order successfully synced to Google Sheets." : "Google Sheets sync pending or failed.",
      sheetsSyncStatus: order.sheetsSyncStatus,
      syncedToGoogleSheets: order.syncedToGoogleSheets,
      data: order
    });
  });
  app.get("/api/service-bookings", requireAuth, (req, res) => {
    const auth = req.auth;
    let results = [...db.getServiceBookings()];
    if (auth.role === "customer") {
      results = results.filter((b) => b.email.toLowerCase() === auth.email.toLowerCase());
    }
    results.sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());
    res.json({ success: true, count: results.length, data: results });
  });
  app.post("/api/service-bookings", async (req, res) => {
    try {
      const { customerName, company, email, phone, service, preferredDate, preferredTime, location, requirements } = req.body;
      if (!customerName || !email || !phone || !service || !preferredDate || !location) {
        return res.status(400).json({ success: false, error: "All booking fields (Name, Email, Phone, Service, Date, Location) are required." });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Please enter a valid corporate email address." });
      }
      if (!isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: "Please enter a valid phone number." });
      }
      const bookingCounter = db.getServiceBookingCounter();
      const bookingId = `LRTP-SVC-2026-${String(bookingCounter).padStart(6, "0")}`;
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      const newBooking = {
        id: `srv-book-${Date.now()}`,
        bookingId,
        dateSubmitted: nowIso,
        customerName: sanitizeString(customerName, 100),
        company: company ? sanitizeString(company, 150) : "",
        email: email.trim().toLowerCase(),
        phone: sanitizeString(phone, 30),
        service: sanitizeString(service, 100),
        preferredDate: sanitizeString(preferredDate, 30),
        preferredTime: preferredTime ? sanitizeString(preferredTime, 50) : "Flexible / Morning",
        location: sanitizeString(location, 200),
        requirements: requirements ? sanitizeString(requirements, 1e3) : "Standard onsite deployment assessment",
        bookingStatus: "CONFIRMED",
        syncedToGoogleSheets: false
      };
      db.getServiceBookings().unshift(newBooking);
      db.save();
      dispatchGoogleSheetsWebhook({
        action: "SERVICE_BOOKING",
        targetSheet: "Service Bookings",
        data: {
          bookingId: newBooking.bookingId,
          dateSubmitted: new Date(newBooking.dateSubmitted).toLocaleString("en-IN"),
          customerName: newBooking.customerName,
          company: newBooking.company || "N/A",
          email: newBooking.email,
          phone: newBooking.phone,
          service: newBooking.service,
          preferredDate: newBooking.preferredDate,
          location: newBooking.location,
          requirements: newBooking.requirements,
          status: newBooking.bookingStatus
        }
      }).then((res2) => {
        newBooking.syncedToGoogleSheets = res2.dispatched;
        if (res2.dispatched) {
          newBooking.sheetsSyncTimestamp = (/* @__PURE__ */ new Date()).toISOString();
        }
        db.save();
      });
      return res.status(201).json({
        success: true,
        message: "Service deployment booked and scheduled successfully.",
        bookingId: newBooking.bookingId,
        data: newBooking
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Internal server error scheduling service." });
    }
  });
  app.get("/api/contact", requireRoles(["sales", "admin", "superadmin"]), (req, res) => {
    res.json({ success: true, count: db.getContactSubmissions().length, data: db.getContactSubmissions() });
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, subject, serviceInterest, estimatedBudget, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Name, email, and message are required." });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Please enter a valid corporate email address." });
      }
      if (phone && !isValidPhone(phone)) {
        return res.status(400).json({ success: false, error: "Invalid phone number format." });
      }
      const contactCounter = db.getContactCounter();
      const enquiryId = `LRTP-CON-2026-${String(contactCounter).padStart(6, "0")}`;
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      const submission = {
        id: `cnt-${Date.now()}`,
        enquiryId,
        name: sanitizeString(name, 100),
        email: email.trim().toLowerCase(),
        phone: phone ? sanitizeString(phone, 30) : "",
        company: company ? sanitizeString(company, 150) : "",
        subject: subject ? sanitizeString(subject, 150) : serviceInterest || "General Infrastructure Inquiry",
        serviceInterest: sanitizeString(serviceInterest || "General Inquiry", 100),
        estimatedBudget: sanitizeString(estimatedBudget || "Not Specified", 50),
        message: sanitizeString(message, 2e3),
        source: "Website Contact Page",
        status: "SUBMITTED",
        createdAt: nowIso,
        syncedToGoogleSheets: false
      };
      db.getContactSubmissions().unshift(submission);
      db.save();
      dispatchGoogleSheetsWebhook({
        action: "CONTACT_ENQUIRY",
        targetSheet: "Contact Enquiries",
        data: {
          enquiryId: submission.enquiryId,
          date: new Date(submission.createdAt).toLocaleString("en-IN"),
          name: submission.name,
          email: submission.email,
          phone: submission.phone || "N/A",
          company: submission.company || "N/A",
          subject: submission.subject,
          serviceInterest: submission.serviceInterest,
          message: submission.message,
          status: submission.status
        }
      }).then((res2) => {
        submission.syncedToGoogleSheets = res2.dispatched;
        db.save();
      });
      return res.status(201).json({
        success: true,
        message: "Thank you for reaching out. An LR Solutions Architect will contact you shortly.",
        enquiryId: submission.enquiryId,
        data: submission
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Internal server error processing enquiry." });
    }
  });
  app.get("/api/sheets-export", requireRoles(["admin", "superadmin"]), (req, res) => {
    const ordersSheet = db.getOrders().map((o) => ({
      "Order ID": o.id,
      "Date": new Date(o.createdAt).toLocaleDateString("en-IN"),
      "Customer ID": o.customerId,
      "Customer Name": o.customerName,
      "Company": o.companyName,
      "Items": o.items.map((i) => `${i.productName} (Qty: ${i.quantity})`).join(", "),
      "Subtotal (INR)": `\u20B9${o.subtotal.toLocaleString("en-IN")}`,
      "Tax (INR)": `\u20B9${o.tax.toLocaleString("en-IN")}`,
      "Total (INR)": `\u20B9${o.total.toLocaleString("en-IN")}`,
      "Status": o.status,
      "PO Number": o.purchaseOrderNumber || "N/A"
    }));
    const serviceBookingsSheet = db.getServiceBookings().map((b) => ({
      "Booking ID": b.bookingId,
      "Date": new Date(b.dateSubmitted).toLocaleDateString("en-IN"),
      "Customer Name": b.customerName,
      "Company": b.company || "N/A",
      "Email": b.email,
      "Phone": b.phone,
      "Service": b.service,
      "Preferred Date": b.preferredDate,
      "Location": b.location,
      "Status": b.bookingStatus
    }));
    const contactEnquiriesSheet = db.getContactSubmissions().map((c) => ({
      "Enquiry ID": c.enquiryId || c.id,
      "Date": new Date(c.createdAt).toLocaleDateString("en-IN"),
      "Name": c.name,
      "Email": c.email,
      "Phone": c.phone || "N/A",
      "Company": c.company || "N/A",
      "Subject": c.subject || "N/A",
      "Message": c.message,
      "Status": c.status || "NEW"
    }));
    res.json({
      success: true,
      lastSyncTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sheets: {
        "Product Orders": ordersSheet,
        "Service Bookings": serviceBookingsSheet,
        "Contact Enquiries": contactEnquiriesSheet
      }
    });
  });
  app.get("/api/support", requireAuth, (req, res) => {
    const auth = req.auth;
    let results = [...db.getSupportTickets()];
    if (auth.role === "customer") {
      results = results.filter((t) => t.customerEmail.toLowerCase() === auth.email.toLowerCase());
    }
    res.json({ success: true, data: results });
  });
  app.use((err, req, res, next) => {
    console.error("[Unhandled Server Error]:", err);
    res.status(500).json({
      success: false,
      error: "An internal server error occurred. Transaction telemetry recorded."
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LR Techno Park Enterprise Gateway running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
