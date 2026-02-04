const fs = require('fs');
const path = require('path');

const brands = [
  {
    slug: 'gearhouse',
    name: 'Gearhouse',
    metrics: { lcp: '6.2s', fcp: '5.8s', ttfb: '4.4s', cls: '0.01', score: 63 }
  },
  {
    slug: 'gearhouse-south-africa',
    name: 'Gearhouse South Africa',
    metrics: { lcp: '6.2s', fcp: '5.8s', ttfb: '4.4s', cls: '0.01', score: 63 } // Copied from Gearhouse
  },
  {
    slug: 'system-solutions',
    name: 'System Solutions',
    metrics: { lcp: '15.2s', fcp: '3.8s', ttfb: 'N/A', cls: '0.00', score: 57, speedIndex: '15.1s' }
  },
  {
    slug: 'ledvision',
    name: 'LEDVision',
    metrics: { lcp: '2.2s', fcp: '0.8s', ttfb: 'N/A', cls: '0.007', score: 81, tbt: '40ms' }
  },
  {
    slug: 'in2structures',
    name: 'In2Structures',
    metrics: { lcp: '5.3s', fcp: '0.9s', ttfb: 'N/A', cls: '0.069', score: 65 }
  },
  {
    slug: 'havaseat',
    name: 'Havaseat',
    metrics: { lcp: '8.9s', fcp: '3.5s', ttfb: 'N/A', cls: '0.224', score: 50 }
  },
  {
    slug: 'splitbeam',
    name: 'Splitbeam',
    metrics: { lcp: '3.4s', fcp: '0.9s', ttfb: 'N/A', cls: '0.002', score: 72, tbt: '40ms' }
  },
  {
    slug: 'showcom',
    name: 'Showcom',
    metrics: { lcp: '4.5s', fcp: '1.2s', ttfb: '0.8s', cls: '0.05', score: 60 } // Placeholder
  },
  {
    slug: 'ivtm',
    name: 'IVTM',
    metrics: { lcp: '12.8s', fcp: '3.8s', ttfb: 'N/A', cls: '0.001', score: 57, tbt: '140ms' }
  },
  {
    slug: 'sds',
    name: 'SDS',
    metrics: { lcp: '11.2s', fcp: '3.8s', ttfb: 'N/A', cls: '0.001', score: 58, tbt: '50ms' }
  }
];

const generateContent = (brand) => ({
  slug: brand.slug,
  name: brand.name,
  metrics: brand.metrics,
  sections: {
    overview: `${brand.name} is a leading provider in the technical event industry.`,
    how_buyers_find: "Mostly through direct search and industry referrals.",
    priority_channels: ["Organic Search", "Direct", "LinkedIn"],
    current_presence: "Established website with portfolio showcases.",
    gaps_improvements: [
      { gap: "Slow mobile load times", impact: "High bounce rate on mobile devices" },
      { gap: "Lack of clear CTA", impact: "Lower conversion on landing pages" }
    ],
    performance_leakage: "Site performance is hindering user retention.",
    additional_channels: ["Instagram for visual portfolio", "Email newsletters"],
    land_expand: "Cross-sell opportunities with sister companies."
  }
});

const outputDir = path.join(__dirname, '../src/content/brands');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

brands.forEach(brand => {
  const content = generateContent(brand);
  fs.writeFileSync(
    path.join(outputDir, `${brand.slug}.json`),
    JSON.stringify(content, null, 2)
  );
  console.log(`Generated ${brand.slug}.json`);
});
