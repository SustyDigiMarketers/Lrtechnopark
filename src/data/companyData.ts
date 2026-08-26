/**
 * LR TECHNO PARK ENTERPRISE CAPABILITY & ARCHITECTURAL DATA
 * Production Data Layer - Engineering Focus Pillars & Supported Standards
 */

export interface EngineeringPillar {
  value: string;
  label: string;
  description: string;
  context: string;
}

export const companyStats: EngineeringPillar[] = [
  {
    value: 'Zero-Trust',
    label: 'Architecture Paradigm',
    description: 'Next-gen firewall perimeter defense, network segmentation, and secure site-to-site VPNs.',
    context: 'Core Security'
  },
  {
    value: 'Dual NOC',
    label: 'Redundant Operations Model',
    description: 'High-availability monitoring framework with rapid on-site engineer dispatch and SLA guarantees.',
    context: 'Reliability'
  },
  {
    value: '4 Core Pillars',
    label: 'Hardware & Infrastructure',
    description: 'Commercial computers, 4K CCTV surveillance, structured networking, and enterprise laptops.',
    context: 'Product Stack'
  },
  {
    value: 'On-Site & Edge',
    label: 'Deployment Flexibility',
    description: 'Turnkey physical installation, server rack dressing, Fluke-tested structured cabling, and cloud controller setups.',
    context: 'Infrastructure'
  },
  {
    value: '10 Gbps',
    label: 'High-Speed Backbone',
    description: 'Layer 3 managed PoE+ switching, optical fiber backbones, and enterprise Wi-Fi 7 access.',
    context: 'Networking'
  },
  {
    value: 'BIS & GST',
    label: 'Compliance Standard Ready',
    description: 'BIS-certified hardware, GST e-invoicing compliant, and comprehensive 3-5 year on-site warranty.',
    context: 'Standards'
  }
];

export const keyStats = companyStats;

export const industrySectors = [
  { id: 'healthcare', name: 'Healthcare & Life Sciences', code: 'HLTH-ENG', focus: 'HIPAA Isolation & PACS Storage' },
  { id: 'fintech', name: 'Banking & Financial Technology', code: 'BFSI-ENG', focus: 'Low-Latency APIs & PCI-DSS PAM' },
  { id: 'manufacturing', name: 'Smart Manufacturing & OT', code: 'IND-4.0', focus: 'SCADA Telemetry & Edge AI' },
  { id: 'logistics', name: 'Supply Chain & Cold Storage', code: 'LOG-FLEET', focus: 'GPS Telematics & Warehouse Wi-Fi' },
  { id: 'education', name: 'Higher Education & Research', code: 'EDU-HPC', focus: 'Gigabit Campus & HPC Clusters' },
  { id: 'enterprise', name: 'Corporate Multi-Cloud', code: 'ENT-CLOUD', focus: 'Kubernetes CI/CD & Zero-Trust SSO' }
];

export const clientLogos = industrySectors.map(s => ({
  name: s.name,
  industry: s.code,
  logoText: s.name.toUpperCase()
}));

export const industriesList = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: 'Activity',
    description: 'HIPAA-aligned cloud architectures, high-density hospital Wi-Fi, DICOM/PACS image archiving, and medical device network segmentation.',
    stat: 'Architecture Blueprint: Patient Data Isolation'
  },
  {
    id: 'financial',
    name: 'Banking, Financial Services & Insurance (BFSI)',
    icon: 'Landmark',
    description: 'Ultra-low latency transaction backbones, PCI-DSS compliant microservices, biometric PAM vaulting, and automated audit trails.',
    stat: 'Architecture Blueprint: High-Throughput Core APIs'
  },
  {
    id: 'manufacturing',
    name: 'Smart Manufacturing & Industry 4.0',
    icon: 'Cpu',
    description: 'Industrial IoT gateway integration, PLC SCADA telemetry, edge AI predictive maintenance, and air-gapped OT network firewalls.',
    stat: 'Architecture Blueprint: OT/IT Air-Gapped Bridging'
  },
  {
    id: 'logistics',
    name: 'Logistics, Supply Chain & Fleet',
    icon: 'Truck',
    description: 'Automated warehouse Wi-Fi mesh, GPS telematics telemetry pipelines, barcode/RFID scanners, and real-time shipment dispatch engines.',
    stat: 'Architecture Blueprint: Warehouse Mesh SD-WAN'
  },
  {
    id: 'education',
    name: 'Higher Education & Research Institutes',
    icon: 'GraduationCap',
    description: 'Campus-wide Gigabit Wi-Fi 7, high-performance computing (HPC) research clusters, student portal SSO, and lab endpoint virtualization.',
    stat: 'Architecture Blueprint: Campus Identity & HPC'
  },
  {
    id: 'corporate',
    name: 'Corporate Enterprises & SaaS',
    icon: 'Building2',
    description: 'Multi-cloud Kubernetes infrastructure, zero-trust employee remote access, automated CI/CD golden paths, and 24/7 managed NOC services.',
    stat: 'Architecture Blueprint: Multi-Cloud Golden Path'
  }
];

export const supportedComplianceFrameworks = [
  { name: 'SOC 2 Type II Architecture Alignment', focus: 'Security, Availability, and Confidentiality Trust Services Criteria' },
  { name: 'ISO/IEC 27001 ISMS Blueprint', focus: 'Information Security Management System Governance' },
  { name: 'HIPAA / HITECH Data Security Controls', focus: 'Administrative, Physical, and Technical Safeguards for ePHI' },
  { name: 'PCI-DSS v4.0 Network Segmentation', focus: 'Cardholder Data Environment (CDE) Isolation & PAM' }
];

export const companyCertifications = supportedComplianceFrameworks.map(c => ({
  name: c.name,
  issuer: 'Framework Alignment',
  status: 'Design Supported'
}));

export const leadershipTeam = [
  {
    name: 'LR Techno Park Systems Architecture',
    role: 'Principal Solutions & Engineering Group',
    bio: 'Dedicated technical team specializing in enterprise IT infrastructure, distributed systems architecture, cloud networking, and zero-trust security engineering.',
    expertise: 'Enterprise Strategy, Cloud Architecture, Critical Infrastructure'
  },
  {
    name: 'Core Software & Protocols Engineering',
    role: 'Platform & Systems Group',
    bio: 'Engineering specialists in distributed microservices, SD-WAN protocol design, Kubernetes orchestration, and edge AI runtime development.',
    expertise: 'Microservices, Edge AI, Distributed Consensus'
  },
  {
    name: 'Cybersecurity Operations & PAM',
    role: 'Security Engineering Group',
    bio: 'Specialists in SIEM ingestion architectures, 24/7 Security Operations Center workflows, threat modeling, and zero-trust identity vaulting.',
    expertise: 'SIEM Architecture, SOC Management, Penetration Testing'
  },
  {
    name: 'Enterprise Client Operations & SLA',
    role: 'Technical Account & Solutions Delivery',
    bio: 'Technical architects responsible for continuous deployment governance, infrastructure provisioning, and multi-tier SLA execution.',
    expertise: 'SLA Governance, Solutions Engineering, Customer Lifecycle'
  }
];

export const milestones = [
  {
    year: 'Foundation',
    title: 'Enterprise IT & Datacenter Networking',
    description: 'Initiated mission-critical datacenter networking, high-availability switching, and enterprise hardware engineering operations.'
  },
  {
    year: 'Expansion',
    title: 'Next-Gen Firewall & Security Deployment',
    description: 'Scaled enterprise perimeter security, UTM appliances, and multi-branch site-to-site VPN deployments.'
  },
  {
    year: 'Surveillance & AI',
    title: '4K CCTV & AI Surveillance Systems',
    description: 'Integrated high-definition IP video surveillance, centralized NVR matrices, and smart motion detection.'
  },
  {
    year: 'Campus Wi-Fi',
    title: 'High-Density Wi-Fi 6/7 & Hotspots',
    description: 'Engineered high-concurrency corporate wireless, guest captive portals, and structured Cat6A fiber cabling.'
  },
  {
    year: 'Self-Service',
    title: 'Automated Procurement & Support Portal',
    description: 'Unified customer self-service hardware procurement, automated dispatching, live order tracking, and GST invoicing.'
  }
];

export const coreValues = [
  {
    title: 'Absolute Engineering Rigor',
    description: 'We build durable, audited systems. Every line of code, network route, and server configuration is engineered for enterprise resilience.',
    icon: 'Layers'
  },
  {
    title: 'Zero-Trust Security by Design',
    description: 'Least-privilege authorization, end-to-end data encryption, and immutable audit trails are embedded into every layer of our solutions.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Operational Transparency',
    description: 'Clear architectural specifications, standard protocols, and predictable licensing with no vendor lock-in traps.',
    icon: 'Handshake'
  },
  {
    title: 'Continuous Availability Focus',
    description: 'Dual-redundant system designs and automated failover pipelines to safeguard operational continuity.',
    icon: 'Clock'
  }
];
