/**
 * Single source of truth for business details, navigation, services,
 * pricing and service areas. Edit here and every page updates.
 */

export const site = {
  name: 'TOP Property Management',
  shortName: 'TOP PM',
  url: 'https://www.toppm.ca',
  tagline: 'Cornwall property management you can trust',
  description:
    'TOP Property Management offers trusted property management services in Cornwall, Ontario, connecting homeowners with quality tenants. Reach out today for all of your Cornwall property management needs!',
  phone: {
    display: '(613) 416-3263',
    e164: '+16134163263',
    href: 'tel:+16134163263',
  },
  email: 'rentals@toppm.ca',
  city: 'Cornwall',
  region: 'ON',
  regionLong: 'Ontario',
  country: 'CA',
  /** Approximate centre of Cornwall, ON — used for geo hints in schema */
  geo: { lat: 45.0212, lng: -74.7307 },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100090524349735',
    google: 'https://g.co/kgs/DZxLrYA',
  },
  /** Google Analytics 4 measurement ID (carried over from the previous site) */
  gaId: 'G-G486Y613LQ',
  /**
   * Formspree form ID. Create a form at https://formspree.io, then replace
   * the placeholder below with the ID from the endpoint URL
   * (https://formspree.io/f/<ID>).
   */
  formspreeId: 'YOUR_FORMSPREE_ID',
  /** Google Form used for "Get alerts for new listings" */
  listingAlertsUrl: 'https://forms.gle/EGHFyDy4XwBKJ2TW8',
  yearsExperience: '10+',
  foundingYear: 2014,
} as const;

export const nav = [
  { label: 'Property Owners', href: '/property-owners' },
  { label: 'Renters', href: '/renters' },
  { label: 'Rentals', href: '/cornwall-rental-properties' },
  { label: 'Pricing', href: '/about-us/cornwall-property-management#ServicesandPricing' },
  { label: 'About', href: '/about-us/cornwall-property-management' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact-us/cornwall-property-management' },
] as const;

export const pricing = {
  monthlyFee: 109,
  leaseRenewalFee: 99,
  vendorFeePercent: 10,
  directDepositDay: '10th',
  volumeDiscounts: [
    { units: '5–9 units', discount: '5%' },
    { units: '10–39 units', discount: '15%' },
    { units: '40–59 units', discount: '25%' },
    { units: '60+ units', discount: '35%' },
  ],
} as const;

export const services = [
  {
    id: 'tenant-screening',
    title: 'Tenant Acquisition & Screening',
    short: 'Attract reliable renters with proven marketing and a thorough application process.',
    detail:
      'Professional listings across the major rental platforms, showings, and comprehensive screening that covers credit, income, employment, references, and eviction history.',
    icon: 'users',
  },
  {
    id: 'rent-collection',
    title: 'Rent Collection & Financial Reporting',
    short: 'Rent on time, every time, with clear statements so you always know where you stand.',
    detail:
      'Strict collection policies, direct deposit of your rent by the 10th of each month, monthly statements, and year-end summaries in PDF or Excel for tax time.',
    icon: 'chart',
  },
  {
    id: 'maintenance',
    title: 'Property Inspections & Maintenance',
    short: 'Routine inspections and prompt, professional maintenance keep your property in top condition.',
    detail:
      'Move-in and move-out inspections, per-item approval limits you set, no trip charges or minimums on in-house work, and trusted local trades when a specialist is needed.',
    icon: 'wrench',
  },
  {
    id: 'lease-management',
    title: 'Lease Management',
    short: 'From drafting to renewals, your agreements stay legally sound and tenant-friendly.',
    detail:
      'Ontario Standard Lease preparation, renewals, rent-increase notices, and the LTB paperwork landlords would rather not think about.',
    icon: 'document',
  },
  {
    id: 'emergency',
    title: '24/7 Emergency Support',
    short: 'Emergencies don’t wait, and neither do we. Our team is on call around the clock.',
    detail:
      'Renters reach a real person day or night for urgent issues, so small problems are handled before they become expensive ones.',
    icon: 'phone',
  },
  {
    id: 'full-service',
    title: 'Full-Service Management',
    short: 'From tenant relations to renewals and maintenance, we handle it all so you don’t have to.',
    detail:
      'Invoice payment, welcome gifts for new renters, communication with tenants, and condominium management coming soon.',
    icon: 'home',
  },
] as const;

export const whyChooseUs = [
  {
    title: 'Local expertise, personalized service',
    text: 'We understand the unique needs of Cornwall’s rental market. Our dedicated team tailors our services to the specific requirements of property owners and renters in our community.',
  },
  {
    title: 'Expedited leasing to quality renters',
    text: 'We attract and secure high-quality renters quickly. From professional marketing to rigorous screening, your property is in good hands.',
  },
  {
    title: 'Proactive property maintenance',
    text: 'Our hands-on approach keeps your investment in top condition while giving renters a safe, comfortable place to live.',
  },
  {
    title: 'Transparent accounting',
    text: 'Clear communication and detailed financial reporting mean you always know exactly where your investment stands.',
  },
  {
    title: 'Proven systems, dedicated team',
    text: 'More than ten years of reliable management, built on processes that keep owners informed and renters happy.',
  },
  {
    title: 'Cost efficiency and tenant retention',
    text: 'Fair pricing, volume discounts, and a focus on keeping good renters mean lower vacancy and better returns.',
  },
] as const;

export const testimonials = [
  {
    quote:
      'As a landlord, finding a reliable property management company is essential. I have been extremely impressed with the level of professionalism and expertise of this company. They have taken care of everything from finding and screening renters to handling maintenance and repairs. I have complete trust in their ability to manage my properties and would highly recommend them to others.',
    name: 'Claude L.',
    role: 'Property owner',
  },
  {
    quote:
      'Honestly, it is so nice to have a company like this in Cornwall that you can trust. This is my second unit with Jared and the TOP team and I feel comfortable under their management. 5/5 stars!',
    name: 'Sue B.',
    role: 'Renter',
  },
  {
    quote:
      'I was hesitant to hire a property management company, but after working with Jared and the team, I am so glad I did. They have made the process so much easier and stress free. Their communication is top notch and they put a strong emphasis on ensuring my renters are happy. Recommend!',
    name: 'Shiraz M.',
    role: 'Property owner',
  },
] as const;

export const partners = [
  {
    name: 'Cornwall Painting Plus',
    url: 'https://cornwallpainting.ca',
    text: 'Professional residential and commercial painters in Cornwall, ON.',
  },
  {
    name: 'Gryphon Systems',
    url: 'https://gryphonsystems.net',
    text: 'Cornwall’s trusted partner for security and access control systems.',
  },
] as const;

/** Towns and townships served across Stormont, Dundas and Glengarry */
export const serviceAreas = [
  'Cornwall',
  'Long Sault',
  'Ingleside',
  'Alexandria',
  'Morrisburg',
  'Lancaster',
  'South Glengarry',
  'South Stormont',
] as const;
