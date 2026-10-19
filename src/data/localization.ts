import { profile, type Profile } from "./profile";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export interface ProfileLabels {
  kicker: string;
  discipline: string;
  focusHeading: string;
  aboutLabel: string;
  languageLabel: string;
}

export interface LocalizedContent {
  profile: Profile;
  labels: ProfileLabels;
  metadata: {
    title: string;
    description: string;
    jobTitle: string;
    knowsAbout: string[];
  };
}

export const localizedContent: Record<Locale, LocalizedContent> = {
  en: {
    profile,
    labels: {
      kicker: "Designing systems that endure",
      discipline: "Engineering · Architecture",
      focusHeading: "Areas of focus",
      aboutLabel: "About Gabriel",
      languageLabel: "Language",
    },
    metadata: {
      title: "Gabriel Garoz | Software Engineering & Architecture",
      description: "Gabriel Garoz, software engineer and architect. Experience across AI and automation, websites, applications, cloud infrastructure, and platform engineering.",
      jobTitle: "Software Engineer & Architect",
      knowsAbout: [
        "AI and automation",
        "Website development",
        "Web application development",
        "Software architecture",
        "Cloud infrastructure",
        "Kubernetes",
        "Google Cloud",
        "Platform engineering",
        "DevOps",
      ],
    },
  },
  es: {
    profile: {
      ...profile,
      role: "Ingeniería y arquitectura de software",
      introduction: "Mi trabajo abarca IA y automatización, sitios y aplicaciones web, arquitectura de software y plataformas en la nube.",
      practices: ["IA y automatización", "Sitios web", "Aplicaciones", "Nube y plataformas"],
      biography: [
        "Soy Gabriel, ingeniero y arquitecto de software con más de 13 años de experiencia en la industria tecnológica.",
        "Mi experiencia abarca el desarrollo de aplicaciones y la modernización de infraestructura en la nube a gran escala para empresas globales. Combino la experiencia práctica en ingeniería con una visión de arquitectura para construir sistemas de software seguros y confiables.",
      ],
      focusAreas: [
        {
          title: "IA y automatización",
          description: "IA aplicada, integraciones y automatización de flujos de trabajo.",
        },
        {
          title: "Sitios web y aplicaciones",
          description: "Sitios y aplicaciones web, portales para clientes e integraciones.",
        },
        {
          title: "Arquitectura de software",
          description: "Diseño de sistemas, integraciones y modernización de software nuevo y existente.",
        },
        {
          title: "Nube y plataformas",
          description: "Infraestructura en la nube, ingeniería de plataformas, automatización de despliegues y sistemas confiables.",
        },
      ],
      primaryAction: {
        ...profile.primaryAction,
        label: "Conectar en LinkedIn",
        accessibleLabel: "Conectar con Gabriel Garoz en LinkedIn",
      },
      secondaryAction: {
        ...profile.secondaryAction,
        label: "Correo electrónico",
        accessibleLabel: "Enviar un correo electrónico a Gabriel Garoz",
      },
    },
    labels: {
      kicker: "Diseño de sistemas duraderos",
      discipline: "Ingeniería · Arquitectura",
      focusHeading: "Áreas de enfoque",
      aboutLabel: "Acerca de Gabriel",
      languageLabel: "Idioma",
    },
    metadata: {
      title: "Gabriel Garoz | Ingeniería y arquitectura de software",
      description: "Gabriel Garoz, ingeniero y arquitecto de software. Experiencia en IA y automatización, sitios web, aplicaciones, infraestructura en la nube e ingeniería de plataformas.",
      jobTitle: "Ingeniero y arquitecto de software",
      knowsAbout: [
        "IA y automatización",
        "Desarrollo de sitios web",
        "Desarrollo de aplicaciones web",
        "Arquitectura de software",
        "Infraestructura en la nube",
        "Kubernetes",
        "Google Cloud",
        "Ingeniería de plataformas",
        "DevOps",
      ],
    },
  },
};
