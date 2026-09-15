export interface ProfileLink {
  label: string;
  url: string;
  platform: "linkedin";
}

export interface Profile {
  name: string;
  role: string;
  biography: string[];
  portrait: {
    src: string;
    alt: string;
  };
  primaryAction: {
    label: string;
    url: string;
    accessibleLabel: string;
  };
  socialLinks: ProfileLink[];
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const profile: Profile = {
  name: "Gabriel Garoz",
  role: "Staff Software Architect — Cloud, Platform & AI",
  biography: [
    "I’m Gabriel, a Staff Software Architect specializing in cloud, platform, and AI, with 13+ years in technology focused on cloud infrastructure modernization, Kubernetes, Google Cloud, platform engineering, DevOps, and AI-driven automation.",
    "I’ve been part of core engineering efforts behind large-scale cloud modernization, helping design and build platform foundations for secure, reliable, cloud-native systems.",
    "I bring a strategic mindset to engineering and use emerging technologies where they solve real problems.",
    "My background spans cloud infrastructure, full-stack development, automation, and large-scale engineering environments.",
    "Let’s connect if you’re building cloud-native systems, modernizing infrastructure, or looking for practical platform engineering expertise.",
  ],
  portrait: {
    src: `${basePath}/assets/gabriel-garoz.jpg`,
    alt: "Gabriel Garoz",
  },
  primaryAction: {
    label: "Contact me",
    url: "https://www.linkedin.com/in/gabrielgaroz/",
    accessibleLabel: "Contact Gabriel Garoz on LinkedIn",
  },
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/gabrielgaroz/",
      platform: "linkedin",
    },
  ],
};
