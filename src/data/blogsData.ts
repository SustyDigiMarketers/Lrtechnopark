export interface BlogPost {
  id: string;
  slug: string;
  category: 'NETWORKING' | 'SECURITY' | 'SURVEILLANCE' | 'HARDWARE';
  title: string;
  summary: string;
  readTime: string;
  date: string;
  content: string[];
}

export const blogsData: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'next-gen-firewall-best-practices',
    category: 'SECURITY',
    title: 'Next-Gen Firewall Best Practices for Growing Enterprises',
    summary: 'Essential configuration rules, application-layer filtering, and VPN hardening techniques to protect modern business networks.',
    readTime: '4 min read',
    date: 'February 2026',
    content: [
      'Modern enterprise security requires moving beyond traditional port-based filtering. Next-Generation Firewalls (NGFW) inspect traffic at Layer 7, identifying applications, users, and encrypted threats in real time.',
      '1. Implement Strict Default-Deny Policies: Always start with an explicit deny-all rule and whitelist only authenticated business traffic.',
      '2. Enable Deep Packet Inspection (DPI) with SSL Offloading: Over 80% of enterprise web traffic is encrypted. Without DPI, malicious payloads easily bypass perimeter defenses.',
      '3. Enforce Multi-Factor Authentication on VPN Gateways: Protect remote connections with zero-trust posture checks and time-based one-time passwords.'
    ]
  },
  {
    id: 'blog-2',
    slug: 'structured-cabling-cat6a-vs-fiber',
    category: 'NETWORKING',
    title: 'Cat6A vs Optical Fiber: Choosing Your Backbone Infrastructure',
    summary: 'When to deploy shielded 10G copper versus single-mode fiber optic cabling in commercial offices and multi-floor buildings.',
    readTime: '3 min read',
    date: 'January 2026',
    content: [
      'Planning a structured cabling fit-out requires balancing bandwidth requirements, distance limitations, and deployment costs.',
      'Cat6A shielded twisted pair cables support 10 Gigabit speeds up to 100 meters, making them ideal for workstation drops and ceiling Wi-Fi access points.',
      'For inter-floor risers, campus interconnects, and datacenter server links, single-mode optical fiber is mandatory to eliminate electromagnetic interference and guarantee sub-millisecond latency.'
    ]
  },
  {
    id: 'blog-3',
    slug: '4k-cctv-storage-bandwidth-planning',
    category: 'SURVEILLANCE',
    title: '4K CCTV Storage & Bandwidth Calculation Guide',
    summary: 'How to calculate RAID storage arrays, bitrate settings, and H.265+ compression for commercial surveillance setups.',
    readTime: '5 min read',
    date: 'January 2026',
    content: [
      'High-resolution 4K surveillance cameras generate massive video streams. Without proper compression planning, storage pools fill up prematurely.',
      'Smart H.265+ codecs reduce bitrate consumption by up to 70% during static scenes while preserving full forensic fidelity when motion is detected.',
      'We recommend RAID 5 or RAID 6 enterprise hard drives designed for 24/7 continuous write cycles with dedicated hot-spare drives to prevent footage loss.'
    ]
  },
  {
    id: 'blog-4',
    slug: 'wifi-7-campus-deployment-considerations',
    category: 'HARDWARE',
    title: 'Enterprise Wi-Fi 7: Preparing for High-Density Roaming',
    summary: 'Understanding 320 MHz channels, Multi-Link Operation (MLO), and PoE+ switch power budgets for seamless client roaming.',
    readTime: '4 min read',
    date: 'December 2025',
    content: [
      'Wi-Fi 7 introduces Multi-Link Operation (MLO), allowing client devices to transmit and receive across 2.4 GHz, 5 GHz, and 6 GHz bands simultaneously.',
      'To unlock maximum throughput, ensure your edge switching infrastructure supports multi-gigabit (2.5G/10G) PoE+ ports and clean thermal dissipation.',
      'Conduct a thorough RF spectrum survey before installation to minimize channel overlap and ensure fast BSS transitions across high-traffic conference rooms.'
    ]
  }
];
