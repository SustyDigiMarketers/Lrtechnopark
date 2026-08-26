import { CaseStudy } from '../types';

/**
 * SOLUTION ARCHITECTURE BLUEPRINTS & REFERENCE CASE STUDIES
 * ==========================================================
 * Aligned with LR Techno Park's core domain: IT Hardware, Enterprise Networking,
 * Next-Gen Firewalls, CCTV Surveillance Systems, and High-Density Wi-Fi.
 */
export const caseStudiesData: CaseStudy[] = [
  {
    id: 'blueprint-healthcare-01',
    isTemplatePlaceholder: true,
    clientIndustry: 'Healthcare & Life Sciences',
    clientName: 'Multi-Specialty Hospital Campus & Medical Center',
    title: 'High-Density Wi-Fi 7, Isolated Medical VLANs & 4K CCTV Security Architecture',
    challenge: 'Aging unmanaged network switches causing packet latency in PACS imaging retrieval, lack of campus-wide roaming Wi-Fi for medical tablets, and blind spots in emergency pharmacy corridors.',
    solution: 'Designed and deployed an end-to-end IT infrastructure overhaul: 42U datacenter server racks, 10G fiber backbone switching, high-density medical Wi-Fi 6E/7 with isolated VLANs, Next-Gen Perimeter Firewall, and 4K AI dome/PTZ cameras.',
    architectureHighlights: [
      'Core 10G fiber ring connecting hospital buildings with sub-second failover',
      'Next-Gen Firewall with deep packet inspection and HIPAA compliant network segmentation',
      'Campus-wide high-density Wi-Fi with fast BSS transition for zero-stutter tablet roaming',
      '128-channel centralized 4K AI surveillance matrix with 90-day RAID storage'
    ],
    results: [
      { metric: '99.999%', label: 'Continuous Network Backbone Uptime' },
      { metric: '< 2ms', label: 'PACS Imaging Local LAN Latency' },
      { metric: '100% Isolated', label: 'Biomedical Equipment VLAN Security' },
      { metric: 'Zero Dead-Zone', label: 'Campus-Wide High-Speed Wi-Fi' }
    ],
    timeline: '3 Months Turnkey Implementation',
    quote: {
      text: 'Having certified structured cabling, pristine server racks, and reliable medical Wi-Fi with 24/7 SLA support transformed our daily patient care operations.',
      author: 'Hospital Infrastructure Directorate',
      role: 'Healthcare Systems Engineering'
    }
  },
  {
    id: 'blueprint-fintech-02',
    isTemplatePlaceholder: true,
    clientIndustry: 'Banking & Financial Technology',
    clientName: 'Corporate Financial Center & Regional Branches',
    title: 'Dual-WAN Enterprise Router, Perimeter Firewall & Biometric Rack Security',
    challenge: 'Need for 100% guaranteed zero-downtime internet for core banking operations, branch-to-headquarters IPsec VPN encryption, and strict regulatory audit trails for physical server access.',
    solution: 'Deployed dual-WAN automated failover routers, high-throughput Next-Gen Firewalls with encrypted IPsec tunnels, Cat6A shielded structured cabling, and 2kVA double-conversion online UPS systems with automated battery telemetry.',
    architectureHighlights: [
      'Dual-WAN multi-gigabit load balancing with automatic ISP link health failover',
      'Hardware-accelerated IPsec VPN mesh linking 14 regional branch offices',
      'Shielded Cat6A 10G patch panel cabling with Fluke calibration certification',
      '2kVA Online Pure Sine Wave UPS guaranteeing 0ms power cutover'
    ],
    results: [
      { metric: '0ms', label: 'Power Transfer Time During Outages' },
      { metric: 'Dual-ISP', label: 'Active-Active Automated Link Failover' },
      { metric: '100%', label: 'Fluke Certified Cable Compliance' },
      { metric: 'PCI-DSS Ready', label: 'Encrypted Perimeter Network Layer' }
    ],
    timeline: '6 Weeks Branch Rollout',
    quote: {
      text: 'The combination of dual-WAN automated failover and certified shielded cabling gives us peace of mind during peak market trading hours.',
      author: 'Vice President of IT Operations',
      role: 'Financial Systems Group'
    }
  },
  {
    id: 'blueprint-manufacturing-03',
    isTemplatePlaceholder: true,
    clientIndustry: 'Smart Manufacturing & Logistics',
    clientName: 'Automated Logistics Hub & Industrial Plant',
    title: 'Factory-Wide Fiber Backbone, 360° PTZ Security & Warehouse Barcode Wi-Fi',
    challenge: 'Massive 120,000 sq.ft warehouse experiencing Wi-Fi dead spots for forklift barcode scanners, harsh dust exposure damaging ordinary network switches, and perimeter theft risks.',
    solution: 'Engineered an industrial-grade networking and surveillance fabric: armored single-mode fiber links, IP67 outdoor 60m bullet cameras, 360° auto-tracking PTZ speed domes, and high-gain industrial Wi-Fi access points.',
    architectureHighlights: [
      'Armored fiber optic backbone connecting warehouse bays to central server room',
      'Industrial L3 PoE+ managed switches in dust-sealed lockable wall cabinets',
      'High-gain directional Wi-Fi access points engineered for narrow aisle forklift roaming',
      '360° 25x optical zoom PTZ cameras with smart AI human/vehicle intrusion alarms'
    ],
    results: [
      { metric: '100% Coverage', label: 'Zero-Dead-Spot Warehouse Wi-Fi Roaming' },
      { metric: '150m IR', label: 'Night-Vision Perimeter Security Range' },
      { metric: '60W PoE+', label: 'Direct High-Power Camera Transmission' },
      { metric: 'IP67 Sealed', label: 'Dust & Moisture Resistant Hardware' }
    ],
    timeline: '4 Weeks Turnkey Deployment',
    quote: {
      text: 'Our forklift operators never lose connection, and the 4K surveillance system provides crystal-clear visibility across every loading bay.',
      author: 'Plant Operations & Security Director',
      role: 'Industrial Logistics Group'
    }
  }
];
