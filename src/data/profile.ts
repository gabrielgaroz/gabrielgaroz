export interface Profile {
  name: string;
  role: string;
  introduction: string;
  practices: string[];
  biography: string[];
  focusAreas: {
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
  secondaryAction: {
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
  introduction: "My work spans AI and automation, websites and applications, software architecture, and cloud platforms.",
  practices: ["AI & Automation", "Websites", "Applications", "Cloud & Platforms"],
  biography: [
    "I’m Gabriel, a software engineer and architect with 13+ years in the technology industry.",
    "My experience spans application development and large-scale cloud modernization for global enterprises. I bring hands-on engineering experience and architectural thinking to building secure, reliable software systems.",
  ],
  focusAreas: [
    {
      title: "AI & Automation",
      description: "Applied AI, integrations, and automation for practical workflows.",
    },
    {
      title: "Websites & Applications",
      description: "Websites, web applications, customer portals, and integrations.",
    },
    {
      title: "Software Architecture",
      description: "System design, integrations, and modernization for new and existing software.",
    },
    {
      title: "Cloud & Platforms",
      description: "Cloud infrastructure, platform engineering, deployment automation, and reliable systems.",
    },
  ],
  portrait: {
    src: `${basePath}/assets/gabriel-garoz.jpg`,
    alt: "Gabriel Garoz",
  },
  primaryAction: {
    label: "Connect on LinkedIn",
    url: "https://www.linkedin.com/in/gabrielgaroz/",
    accessibleLabel: "Connect with Gabriel Garoz on LinkedIn",
  },
  secondaryAction: {
    label: "Email",
    url: "mailto:dev@gabrielgaroz.com",
    accessibleLabel: "Email Gabriel Garoz",
  },
  linkedInUrl: "https://www.linkedin.com/in/gabrielgaroz/",
};
