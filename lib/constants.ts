export const CONTACT = {
  phone: "07427 556589",
  phoneTel: "07427556589",
  email: "info@lukmatic.co.uk",
  address: "Hatfield, Hertfordshire",
  hours: {
    weekday: "Mon–Fri: 7:00am – 7:00pm",
    saturday: "Saturday: 8:00am – 5:00pm",
    sunday: "Sunday: Emergency Callouts Only",
    emergency: "24/7 Emergency Callouts Available",
  },
};

export const SERVICES = [
  {
    id: "boiler-installation",
    title: "Boiler Installation",
    shortDesc: "Professional installation of the latest energy-efficient boilers from leading brands.",
    description:
      "We supply and install high-efficiency combi, system, and heat-only boilers from all leading manufacturers including Worcester Bosch, Viessmann, Ideal, and Baxi. Every installation includes a free home survey, full commissioning, and registration with the manufacturer for warranty purposes.",
    image: "/boiler-install.png",
    icon: "Flame",
    features: [
      "Free home survey and recommendation",
      "All major brands — Worcester Bosch, Viessmann, Ideal, Baxi",
      "10-year warranty options available",
      "Same-week installation available",
      "Full Gas Safe registration",
      "Energy-efficient A-rated models",
    ],
  },
  {
    id: "boiler-repair",
    title: "Boiler Repair & Servicing",
    shortDesc: "Fast, reliable repairs and annual servicing for all makes and models.",
    description:
      "When your boiler breaks down, you need it fixed fast. Our Gas Safe registered engineers respond quickly to all boiler faults, covering all makes and models. We also offer annual service plans to keep your boiler running efficiently and your warranty valid.",
    image: "/plumber-pipes.png",
    icon: "Wrench",
    features: [
      "Same-day emergency repairs",
      "All makes and models covered",
      "Annual service plans from £75",
      "Landlord gas safety certificates",
      "Boiler diagnostics and health check",
      "Pressure and fault-code resolution",
    ],
  },
  {
    id: "underfloor-heating",
    title: "Underfloor Heating",
    shortDesc: "Wet and electric underfloor heating systems for new builds and retrofits.",
    description:
      "Underfloor heating delivers even, comfortable warmth across your entire floor and is more energy-efficient than traditional radiators. We install both wet (hydronic) and electric systems, suitable for new builds, extensions, and retrofit projects.",
    image: "/underfloor.png",
    icon: "Layers",
    features: [
      "Wet & electric systems",
      "New builds & retrofit installations",
      "Smart thermostat control",
      "Heat pump compatible",
      "Compatible with all floor types",
      "Energy efficiency consultations",
    ],
  },
  {
    id: "radiator-services",
    title: "Radiator Services",
    shortDesc: "Installation, power flushing, and balancing to maximise your heating system.",
    description:
      "From single radiator replacements to full system power flushing, our engineers ensure your heating system performs at its best. We balance systems for even heat distribution and replace faulty TRV valves to restore full control.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    icon: "Thermometer",
    features: [
      "New radiator installation",
      "Power flushing",
      "System balancing",
      "TRV valve replacement",
      "Magnetic system filters",
      "Cold spot diagnosis and repair",
    ],
  },
];

export const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Emergency Callouts" },
];

export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Hatfield",
    text: "LukMaTic fitted a new combi boiler for us and the service was outstanding. Mike was professional, clean and tidy, and explained everything clearly. Highly recommended!",
    rating: 5,
  },
  {
    name: "James T.",
    location: "St Albans",
    text: "Called them for an emergency — no hot water on a Friday evening. They came within 2 hours and had it fixed the same night. Brilliant service, fair price.",
    rating: 5,
  },
  {
    name: "Claire B.",
    location: "Welwyn Garden City",
    text: "Excellent underfloor heating installation throughout our ground floor. Neat, professional work and very competitive pricing. We'd use them again without hesitation.",
    rating: 5,
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    title: "Underfloor Heating Installation",
    category: "Underfloor",
    image: "https://lukmatic.co.uk/wp-content/uploads/2024/01/project-underfloor.png",
    location: "St Albans",
  },
  {
    id: 2,
    title: "Boiler Installation",
    category: "Boiler",
    image: "https://lukmatic.co.uk/wp-content/uploads/2024/01/project-boiler_2.png",
    location: "Hatfield",
  },
  {
    id: 3,
    title: "Boiler Replacement",
    category: "Boiler",
    image: "https://lukmatic.co.uk/wp-content/uploads/2024/01/project-boiler.png",
    location: "Welwyn Garden City",
  },
  {
    id: 4,
    title: "Radiator Installation",
    category: "Radiators",
    image: "https://lukmatic.co.uk/wp-content/uploads/2024/01/project-radiator.png",
    location: "Potters Bar",
  },
  {
    id: 5,
    title: "Boiler Service",
    category: "Boiler",
    image: "https://lukmatic.co.uk/wp-content/uploads/2023/11/man-fixing-boiler-1024x682.jpeg",
    location: "Hatfield",
  },
  {
    id: 6,
    title: "New Heating System",
    category: "Boiler",
    image: "https://lukmatic.co.uk/wp-content/uploads/2024/01/installing_boilers.png",
    location: "Hertford",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];
