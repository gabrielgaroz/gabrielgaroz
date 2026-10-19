export interface Profile {
  name: string;
  role: string;
  introduction: string;
  practices: string[];
  biography: string[];
  services: {
    title: string;
    description: string;
  }[];
  portrait: {
    src: string;
    alt: string;
  };
  primaryAction: {
    label: string;
    url: string;
    accessibleLabel: string;
  };
  linkedInUrl: string;
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const profile: Profile = {
  name: "Gabriel Garoz",
  role: "Software Engineering & Architecture",
  introduction: "I design and build websites, applications, and practical AI solutions.",
  practices: ["AI & Automation", "Websites", "Applications", "Cloud", "Platforms"],
  biography: [
    "I’m Gabriel, a software engineer and architect with 13+ years in the technology industry. I help businesses and teams turn ideas into useful software, improve existing products, and build systems that can grow with them.",
    "I’ve contributed to large-scale cloud modernization initiatives for global enterprises, bringing hands-on engineering experience and architectural thinking to projects of different sizes.",
  ],
  services: [
    {
      title: "AI & Automation",
      description: "AI features, integrations, and workflows that reduce manual work.",
    },
    {
      title: "Websites & Applications",
      description: "Business websites, customer portals, dashboards, and custom web applications.",
    },
    {
      title: "Software Architecture",
      description: "System design, integrations, and modernization for new and existing software.",
    },
    {
      title: "Cloud & Platforms",
      description: "Cloud infrastructure, deployment automation, and reliable operations.",
    },
  ],
  portrait: {
    src: `${basePath}/assets/gabriel-garoz.jpg`,
    alt: "Gabriel Garoz",
  },
  primaryAction: {
    label: "Let’s discuss your project",
    url: "mailto:dev@gabrielgaroz.com",
    accessibleLabel: "Email Gabriel Garoz to discuss your project",
  },
  linkedInUrl: "https://www.linkedin.com/in/gabrielgaroz/",
};
