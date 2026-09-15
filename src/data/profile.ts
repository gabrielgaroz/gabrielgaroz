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
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const profile: Profile = {
  name: "Gabriel Garoz",
  role: "Staff Software Architect — Cloud, Platform & AI",
  biography: [
    "I’m Gabriel, a Staff Software Architect with 13+ years in the technology industry. With a foundation in software engineering, my work has evolved toward cloud infrastructure modernization, Kubernetes, Google Cloud, platform engineering, DevOps, and AI-driven automation.",
    "I’ve contributed to large-scale cloud modernization initiatives for global enterprises, helping design and build the platform foundations behind secure, reliable, cloud-native systems.",
    "I bring a strategic mindset to engineering and use emerging technologies where they solve real problems.",
    "My background spans cloud infrastructure, full-stack development, automation, and large-scale engineering environments.",
    "Let’s connect if you’re building cloud-native systems, modernizing infrastructure, or looking for practical platform engineering expertise.",
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
};
