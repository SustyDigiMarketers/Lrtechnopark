import { ServiceCategory } from '../types';

export const servicesData: ServiceCategory[] = [
  // =========================================================================
  // 01 — FIREWALL
  // =========================================================================
  {
    id: 'srv-01',
    name: 'Firewall & Network Security',
    slug: 'firewall',
    tagline: 'Perimeter Defense, UTM Policy Hardening & Secure Site-to-Site VPN Architecture',
    shortDescription: 'Comprehensive Next-Gen Firewall (NGFW) deployment, custom threat-prevention rules, encrypted multi-branch VPN gateways, and 24/7 proactive security monitoring.',
    overview: 'Protect your enterprise network against cyber intrusions, ransomware, unauthorized data exfiltration, and port scanning. Our certified security engineers install, configure, and maintain enterprise firewall appliances tailored to your organization’s operational topology and compliance mandates.',
    icon: 'ShieldCheck',
    bookingEnabled: true,
    capabilities: [
      'Firewall installation',
      'Firewall configuration',
      'Network security configuration',
      'Security policies',
      'VPN configuration',
      'Firewall monitoring',
      'Firewall maintenance',
      'Security upgrades'
    ],
    deliverables: [
      'Hardened Next-Gen Firewall (NGFW) Hardware / Virtual Appliance Configuration',
      'Custom Layer 7 Application-Aware Security Rules Matrix & IPS/IDS Rulesets',
      'Encrypted IPsec / SSL / WireGuard Site-to-Site & Remote User VPN Gateways',
      'Automated Weekly Security Vulnerability & Blocked Threat Incident Reports',
      'Continuous Firmware Patching & Disaster Recovery Configuration Backup'
    ],
    recommendedUseCases: [
      'Corporate Headquarters & Branch Office Perimeter Isolation',
      'Secure Remote Workforce & Work-From-Home (WFH) VPN Access',
      'PCI-DSS & HIPAA Compliant Network Data Segmentation',
      'High-Throughput Threat Prevention for Financial & Healthcare Systems'
    ],
    technologies: [
      'Fortinet FortiGate',
      'Palo Alto Networks',
      'Sophos XGS',
      'SonicWall TZ/NSa',
      'Cisco Firepower',
      'IPsec IKEv2',
      'WireGuard',
      'OpenVPN'
    ],
    equipment: [
      'Hardware Next-Gen Firewall Appliances (100Mbps to 40Gbps Throughput)',
      'Dual-Power Redundant Security Gateways',
      'Dedicated SSL Decryption & Acceleration Modules',
      'Out-of-Band Remote Management Modems'
    ],
    processSteps: [
      {
        stepNumber: '01',
        phase: 'Security Assessment & Rule Planning',
        action: 'Audit existing network ports, IP ranges, employee access tiers, and compliance requirements.',
        outcome: 'Comprehensive security policy blueprint and port-forwarding matrix.'
      },
      {
        stepNumber: '02',
        phase: 'Appliance Installation & Cabling',
        action: 'Rack mounting, dual power supply cabling, WAN/LAN interface patching, and failover pairing.',
        outcome: 'Hardware securely integrated into server rack with clean cable labeling.'
      },
      {
        stepNumber: '03',
        phase: 'Policy Hardening & VPN Setup',
        action: 'Configure deep packet inspection (DPI), web content filtering, intrusion prevention, and user VPN.',
        outcome: 'Tested zero-leak firewall rules and verified remote VPN access.'
      },
      {
        stepNumber: '04',
        phase: '24/7 Monitoring & Firmware Maintenance',
        action: 'Connect to our operations monitoring console, enable automatic alerts, and schedule patch windows.',
        outcome: 'Continuous proactive defense with guaranteed SLA response.'
      }
    ],
    typicalSLA: '15-Minute Critical Incident Response / 4-Hour On-Site Hardware Replacement',
    targetAudience: 'Enterprises, Banks, Healthcare Facilities, Manufacturing Units, IT/BPO Offices'
  },

  // =========================================================================
  // 02 — NETWORKING
  // =========================================================================
  {
    id: 'srv-02',
    name: 'Networking & Infrastructure',
    slug: 'networking',
    tagline: 'Enterprise LAN/WAN Architecture, Structured Cabling, Server Racks & Managed Switching',
    shortDescription: 'Complete end-to-end design, structured CAT6/Fiber optic cabling, server rack assembly, managed L2/L3 switch deployment, and high-speed network troubleshooting.',
    overview: 'Transform your physical connectivity with pristine, certified network infrastructure. From greenfield office fit-outs and warehouse fiber backbones to high-density data closets and server room rack cleanups, we ensure high bandwidth, zero packet loss, and neat cable management.',
    icon: 'Network',
    bookingEnabled: true,
    capabilities: [
      'Network design',
      'LAN setup',
      'WAN setup',
      'Structured cabling',
      'Network switch installation',
      'Router configuration',
      'Rack setup',
      'Fiber networking',
      'Network troubleshooting',
      'Network maintenance'
    ],
    deliverables: [
      'Certified Structured Copper (CAT6/6A) and Single/Multi-Mode Optical Fiber Cabling',
      'Fluke Certified Cable Test Reports with 10Gbps Speed Verification',
      'As-Built L2/L3 Network Topology & VLAN Segmentation Architectural Schematics',
      'Neat Server Rack Dressing with Numbered Patch Panels and Cable Management',
      'Configured Core, Distribution, and Access Layer Managed Switches'
    ],
    recommendedUseCases: [
      'New Office Building & Commercial Space IT Infrastructure Fit-Outs',
      'Multi-Story Campus & Factory Floor Optical Fiber Backbone Linkage',
      'Messy Server Closet / Rack Cable Re-Dressing & Documentation Cleanup',
      'High-Speed Low-Latency Local Area Networks (LAN) for Data-Intensive Workflows'
    ],
    technologies: [
      'Cisco Catalyst & Nexus',
      'Aruba CX Series',
      'Ubiquiti UniFi Enterprise',
      'MikroTik RouterOS',
      'CommScope / Systimax Cat6A',
      'Corning Optical Fiber',
      'Fluke DSX-8000 Certification'
    ],
    equipment: [
      'Managed 24/48-Port Gigabit & 10G SFP+ Switches',
      'Multi-WAN Load Balancing Enterprise Routers',
      'Floor-Standing Server Racks (24U to 42U) & Wall-Mount Data Cabinets (6U to 15U)',
      '1U/2U Shielded Modular Patch Panels & Horizontal Cable Managers',
      'Fiber Optic Patch Panels (LIU) & SFP+ Transceiver Modules'
    ],
    processSteps: [
      {
        stepNumber: '01',
        phase: 'Site Survey & Cable Pathway Planning',
        action: 'On-site floor walk, cable conduit pathway inspection, node count calculation, and rack sizing.',
        outcome: 'Detailed bill of materials (BOM) and architectural cable layout diagram.'
      },
      {
        stepNumber: '02',
        phase: 'Structured Cabling & Rack Dressing',
        action: 'Pulling low-smoke zero-halogen (LSZH) CAT6/Fiber cables, punching patch panels, and dressing racks.',
        outcome: 'Immaculate, color-coded, labeled cable terminations passing all visual inspections.'
      },
      {
        stepNumber: '03',
        phase: 'Switch Configuration & Fluke Testing',
        action: 'Program VLANs, spanning tree protocol (STP), link aggregation (LACP), and execute Fluke tester runs.',
        outcome: '100% verified continuity, zero crosstalk, and signed calibration certificates.'
      },
      {
        stepNumber: '04',
        phase: 'Documentation & Handover',
        action: 'Provide detailed port mapping documentation, label keys, and administrator access credentials.',
        outcome: 'Seamless operational handover with ongoing preventative maintenance support.'
      }
    ],
    typicalSLA: '24/7 Rapid NOC Assistance / Guaranteed Clean Cable Aesthetics & Longevity',
    targetAudience: 'Corporate Offices, Co-Working Spaces, Educational Institutes, Logistics Hubs'
  },

  // =========================================================================
  // 03 — CCTV CAMERAS
  // =========================================================================
  {
    id: 'srv-03',
    name: 'CCTV Cameras & Surveillance Systems',
    slug: 'cctv-cameras',
    tagline: 'High-Definition IP Video Surveillance, AI Detection, NVR Storage & Remote Monitoring',
    shortDescription: 'Professional security camera site assessments, high-resolution 4K/PTZ installation, centralized NVR/DVR storage setup, and secure remote mobile monitoring configuration.',
    overview: 'Safeguard your premises, employees, inventory, and physical assets with state-of-the-art IP video surveillance systems. We provide comprehensive coverage design to eliminate blind spots, install weather-proof cameras, and configure smart AI event alerts on your smartphones and central control rooms.',
    icon: 'Layers',
    bookingEnabled: true,
    capabilities: [
      'CCTV consultation',
      'Site assessment',
      'Camera installation',
      'NVR/DVR installation',
      'CCTV configuration',
      'Remote monitoring setup',
      'CCTV maintenance',
      'Camera replacement/upgrades'
    ],
    deliverables: [
      'Zero-Blind-Spot Camera Placement Blueprint & Lens Focal Angle Calculations',
      'High-Definition (4MP/8MP 4K) IP Dome, Bullet, and 360° PTZ Camera Installations',
      'Centralized NVR Recording Server with Surveillance-Rated RAID Hard Drives',
      'Mobile App (iOS/Android) & Central Desktop CMS Multi-Screen Live View Setup',
      'Configured AI Motion, Line Crossing, Intrusion, and Facial Search Analytics'
    ],
    recommendedUseCases: [
      'Commercial Buildings, Office Corridors & Entry Reception Security',
      'Warehouse Inventory Bays, Shipping Docks & Perimeter Fence Monitoring',
      'Retail Stores & Supermarkets for Loss Prevention and Cash Desk Auditing',
      'Manufacturing Plant Floor Safety Compliance & Process Monitoring'
    ],
    technologies: [
      'Hikvision / ColorVu AI',
      'Dahua WizSense',
      'Uniview (UNV) Prime',
      'Axis Communications',
      'ONVIF Protocols',
      'H.265+ Video Encoding',
      'Smart EXIR Infrared Night Vision',
      'Cloud P2P Encryption'
    ],
    equipment: [
      '4K Ultra HD IP Dome Cameras (Vandal-Proof IK10)',
      'Outdoor IP67 Weatherproof Long-Range Bullet Cameras',
      '360° Pan-Tilt-Zoom (PTZ) Auto-Tracking Speed Domes',
      '16 / 32 / 64-Channel Network Video Recorders (NVR) with Built-in PoE',
      'High-Endurance Surveillance Storage Hard Drives (WD Purple / Seagate SkyHawk)'
    ],
    processSteps: [
      {
        stepNumber: '01',
        phase: 'Site Survey & Blind Spot Audit',
        action: 'Inspect premises, analyze lighting conditions, identify high-risk assets, and choose lens angles.',
        outcome: 'Custom camera layout floor plan and storage capacity calculation for 30/60/90 days.'
      },
      {
        stepNumber: '02',
        phase: 'PoE Cabling & Precision Mounting',
        action: 'Route weather-resistant CAT6 cables, secure mounting brackets, and position cameras for optimal FOV.',
        outcome: 'Clean, tamper-resistant installation with concealed wiring.'
      },
      {
        stepNumber: '03',
        phase: 'NVR System & AI Analytics Setup',
        action: 'Configure continuous 24/7 and AI-triggered recording, motion zones, and email/push notifications.',
        outcome: 'Fully configured recording matrix with smart event tagging.'
      },
      {
        stepNumber: '04',
        phase: 'Remote Client & Mobile App Activation',
        action: 'Pair smartphones, tablets, and security control room monitors with secure encrypted credentials.',
        outcome: 'Instant, crisp live video feeds and playback from anywhere in the world.'
      }
    ],
    typicalSLA: 'Same-Day Technician Visit for Critical Camera Feeds / Scheduled Quarterly Maintenance',
    targetAudience: 'Warehouses, Factories, Corporate Towers, Retail Chains, Residential Complexes'
  },

  // =========================================================================
  // 04 — WIFI & HOTSPOT
  // =========================================================================
  {
    id: 'srv-04',
    name: 'WiFi & Hotspot Solutions',
    slug: 'wifi-hotspot',
    tagline: 'High-Density Enterprise Wireless, Seamless Roaming & Custom Guest Captive Portals',
    shortDescription: 'Enterprise Wi-Fi 6/7 wireless deployment, RF heatmapping, seamless multi-access point roaming, guest hotspot authentication portals, and bandwidth throttling.',
    overview: 'Eliminate dead zones, slow speeds, and dropped connections across your entire facility. We engineer high-density wireless networks capable of supporting hundreds of simultaneous laptops, smartphones, barcode scanners, and IoT devices with seamless roaming and secure guest access.',
    icon: 'Cloud',
    bookingEnabled: true,
    capabilities: [
      'WiFi network installation',
      'Enterprise WiFi',
      'Hotspot deployment',
      'Access point installation',
      'WiFi coverage planning',
      'Captive portal configuration',
      'Guest WiFi',
      'Network optimization',
      'WiFi troubleshooting',
      'WiFi maintenance'
    ],
    deliverables: [
      'Comprehensive Predictive & Active RF Heatmap Coverage Reports',
      'High-Density Dual/Tri-Band Wi-Fi 6 / 6E / Wi-Fi 7 Enterprise Access Points',
      'Branded Guest Captive Portal with SMS OTP, Email, or Voucher Authentication',
      'Isolated Staff, Guest, and IoT Wireless SSIDs with Granular Bandwidth Limits',
      'Centralized Cloud Controller Dashboard for Real-Time Client Telemetry'
    ],
    recommendedUseCases: [
      'High-Density Open Plan Corporate Offices & Tech Hubs',
      'Hotels, Cafes & Restaurants Requiring Branded Guest Wi-Fi Portals',
      'Warehouses with Mobile Barcode & RFID Forklift Scanner Roaming',
      'Educational Campuses, Auditoriums & Event Venues with High Concurrency'
    ],
    technologies: [
      'Ubiquiti UniFi Enterprise',
      'Aruba Instant On / ESP',
      'Ruckus Unleashed / SmartZone',
      'Cisco Meraki Cloud',
      'TP-Link Omada SDN',
      'Wi-Fi 7 / 802.11be',
      'WPA3-Enterprise Encryption',
      'RADIUS 802.1X Auth'
    ],
    equipment: [
      'Ceiling-Mount & Wall-Mount Indoor Enterprise Access Points',
      'Long-Range Outdoor Weatherproof (IP67) Directional & Omni APs',
      'Cloud Controller Gateways & Hardware SDN Controllers',
      'High-Power Gigabit PoE+ Injectors & Switches'
    ],
    processSteps: [
      {
        stepNumber: '01',
        phase: 'RF Spectrum & Heatmap Planning',
        action: 'Simulate building floor plan walls, materials, and interference to calculate optimal AP locations.',
        outcome: 'Heatmap blueprint guaranteeing > -65dBm signal strength everywhere.'
      },
      {
        stepNumber: '02',
        phase: 'Access Point Installation & Cabling',
        action: 'Run ceiling CAT6 PoE cables and securely mount access points in designated locations.',
        outcome: 'Aesthetically discrete hardware installation with optimal radio propagation.'
      },
      {
        stepNumber: '03',
        phase: 'SSID & Captive Portal Configuration',
        action: 'Design custom branded login portal, setup SMS/Voucher authentication, and configure QoS bandwidth tiers.',
        outcome: 'Secure, segregated Wi-Fi networks for corporate employees and visitors.'
      },
      {
        stepNumber: '04',
        phase: 'Roaming & Concurrency Speed Tuning',
        action: 'Conduct physical walk tests to verify fast BSS transition (802.11r/k/v) seamless roaming.',
        outcome: 'Smooth, uninterrupted voice/video calls when moving across rooms and floors.'
      }
    ],
    typicalSLA: '99.9% Wireless Uptime SLA / Automated Channel Optimization & Interference Mitigation',
    targetAudience: 'Hotels & Hospitality, Corporate Workspaces, Hospitals, Schools, Retail Malls'
  }
];
