// src/data/navMenuData.js
export const navMenuData = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      hasDropdown: false,
    },
    {
      id: 'about-us',
      label: 'About Us',
      path: '/about-us',
      hasDropdown: true,
      menu: {
        type: 'mega',
        // groups represent columns in the mega menu
        groups: [
          {
            title: null, // no column header in design for this column
            links: [
              { id: 'our-story', label: 'Our Story & Legacy', path: '/about-us' },
              { id: 'vision-mission', label: 'Vision & Mission', path: '/about-us/vision-mission' },
              { id: 'leadership', label: 'Leadership Team', path: '/about-us/leadership-team' },
              { id: 'sustainability', label: 'Sustainability Commitment', path: '/about-us/sustainability' },
              { id: 'careers', label: 'Careers & Culture', path: '/about-us/careers' },
              { id: 'customer-stories', label: 'Customer Stories / Case Studies', path: '/about-us/customer-stories' },
            ],
          },
        ],
      },
    },
    {
      id: 'network',
      label: 'Network',
      path: '/network',
      hasDropdown: true,
      menu: {
        type: 'mega',
        groups: [
          {
            title: null,
            links: [
              { id: 'after-sales', label: 'After-Sales Service', path: '/network/after-sales-service' },
              { id: 'showroom', label: 'Showroom', path: '/network/showroom' },
              { id: 'charging-infra', label: 'Charging Infrastructure & Partnerships', path: '/network/charging-infrastructure' },
            ],
          },
        ],
      },
    },
    {
      id: 'products',
      label: 'Products',
      path: '/products',
      hasDropdown: true,
      menu: {
        type: 'mega',
        groups: [
          {
            title: null,
            links: [
              { id: 'ecv-overview', label: 'Electric Commercial Vehicles Overview', path: '/vehicle-showcase' },
              { id: 'e-scv', label: 'e-SCV (Detailed Specs, Features, Gallery, Video)', path: '/products/e-scv' },
              { id: 'e-bus', label: 'e-Bus (Detailed Specs, Features, Gallery, Video)', path: '/products/e-bus' },
              { id: 'future-models', label: 'Future Models (Coming Soon)', path: '/products/future-models' },
              { id: 'custom-solutions', label: 'Custom Solutions & Fleet Management Tools', path: '/products/custom-solutions' },
            ],
          },
        ],
      },
    },
    {
      id: 'tech-innovation',
      label: 'Tech & Innovation',
      path: '/tech-innovation',
      hasDropdown: true,
      menu: {
        type: 'mega',
        groups: [
          {
            title: null,
            links: [
              { id: 'vehicle-intel', label: 'Vehicle Intelligence & Connectivity', path: '/tech/vehicle-intelligence' },
              { id: 'energy-battery', label: 'Energy Efficiency & Battery Tech', path: '/tech/energy-battery' },
              { id: 'safety-standards', label: 'Safety & Compliance Standards', path: '/tech/safety-standards' },
            ],
          },
        ],
      },
    },
    {
      id: 'resources',
      label: 'Resources',
      path: '/resources',
      hasDropdown: true,
      menu: {
        type: 'mega',
        groups: [
          {
            title: null,
            links: [
              { id: 'blog-news', label: 'Blog & News', path: '/resources/blog' },
              { id: 'emi-calculator', label: 'EMI Calculator', path: '/resources/emi-calculator' },
              { id: 'tco-calculator', label: 'TCO Calculator', path: '/resources/tco-calculator' },
              { id: 'faqs', label: 'FAQs', path: '/resources/faqs' },
              { id: 'downloads', label: 'Download Brochures & Manuals', path: '/resources/downloads' },
              { id: 'industry-reports', label: 'Industry Reports & Insights', path: '/resources/reports' },
              { id: 'policy-updates', label: 'EV Industry Policy Updates', path: '/resources/policy-updates' },
            ],
          },
        ],
      },
    },
    {
      id: 'contact-us',
      label: 'Contact Us',
      path: '/contact',
      hasDropdown: true,
      menu: {
        type: 'mega', // still uses groups for consistent rendering
        groups: [
          {
            title: 'Contact',
            links: [
              { id: 'feedback', label: 'Feedback Form', path: '/contact/feedback' },
              { id: 'dealer-locator', label: 'Dealer Locator', path: '/contact/dealer-locator' },
              { id: 'request-demo', label: 'Request a Demo', path: '/contact/request-demo' },
              { id: 'apply-dealership', label: 'Apply for Dealership', path: '/contact/apply-dealership' },
              { id: 'customer-support', label: 'Customer Support', path: '/contact-us' },
            ],
          },
        ],
      },
    },
  ];
  