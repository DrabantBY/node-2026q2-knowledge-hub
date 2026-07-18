import { Status } from '@generated/enums';

export const ARTICLES_DATA = [
  {
    title: 'iPad Pro 11-inch and 13-inch (M5)',
    content:
      'We’re focused on decarbonizing the three largest sources of emissions—materials, electricity, and transportation—across our value chain. We’re making progress by expanding our suppliers’ sourcing of renewable energy—55 percent of manufacturing electricity for iPad Pro 11-inch and 13-inch (M5) was sourced from renewable energy projects.2 We prioritize the use of recycled, renewable, and low-carbon materials while focusing on the energy efficiency of our software and hardware.',
    status: Status.DRAFT,
    author: 'admin',
    category: 'iPad',
    tags: ['new-arrival', 'gift'],
  },
  {
    title: 'iPhone 16 and iPhone 16 Plus',
    content:
      'We’ve reduced emissions for iPhone 16 Plus with 128GB by 30 percent against our businessas-usual scenario as modeled by Apple.8 This device contains more than 30 percent recycled content, including 85 percent recycled aluminum in the enclosure, reducing total product emissions by about 8 percent.9 We’re also working with our suppliers to transition to 100 percent low-carbon electricity for Apple production. The low-carbon electricity solutions that suppliers have already implemented to date have reduced product emissions by 20 percent. In our carbon footprint calculations, we also account for the emissions necessary to generate low-carbon electricity, specifically to manufacture and maintain renewable energy infrastructure, like wind and solar farms.',
    status: Status.ARCHIVED,
    author: 'editor',
    category: 'iPhone',
    tags: ['gift', 'sale', 'best-seller'],
  },
  {
    title: 'iPhone Air',
    content:
      'We’re focused on decarbonizing the three largest sources of emissions—materials, electricity, and transportation—across our value chain. We’re making progress by expanding our suppliers’ sourcing of renewable energy—45 percent of manufacturing electricity for iPhone Air was sourced from renewable energy projects.2 We prioritize the use of recycled, renewable, and low-carbon materials while focusing on the energy efficiency of our software and hardware.',
    status: Status.DRAFT,
    author: 'editor',
    category: 'iPhone',
    tags: ['new-arrival', 'promo'],
  },
  {
    title: 'MacBook Neo',
    content:
      'We’re focused on decarbonizing the three largest sources of emissions—materials, electricity, and transportation—across our value chain. We’re making progress by expanding our suppliers’ sourcing of renewable energy—45 percent of manufacturing electricity for MacBook Neo was sourced from renewable energy projects.2 We prioritize the use of recycled, renewable, and low-carbon materials while focusing on the energy efficiency of our software and hardware.',
    status: Status.PUBLISHED,
    author: 'editor',
    category: 'Mac',
    tags: ['gift'],
  },
  {
    title: 'Mac Studio',
    content:
      'We’ve reduced emissions for Mac Studio (M4 Max, 512GB SSD) by more than 30 percent against our business-as-usual scenario as modeled by Apple.7 This product contains over 30 percent recycled content, including 100 percent recycled aluminum in the enclosure, which reduced total product emissions for this configuration by about 20 percent. We’re working with our suppliers to transition to 100 percent renewable electricity for Apple production. The renewable electricity solutions that suppliers have already implemented to date have reduced product emissions by about 12 percent. In our carbon footprint calculations, we also account for the emissions necessary to generate renewable electricity, specifically to manufacture and maintain renewable energy infrastructure, like wind and solar farms.',
    status: Status.PUBLISHED,
    author: 'admin',
    category: 'Mac',
    tags: ['new-arrival'],
  },
];
