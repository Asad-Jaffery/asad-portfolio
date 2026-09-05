export type Role = {
  org: string;
  title: string;
  team: string;
  logo?: string;
  logoIcon?: boolean;
  logoBlend?: boolean;
};

export const roles: Role[] = [
  {
    org: 'Shopify',
    title: 'Data Engineer Intern',
    team: 'Analytics Engineering',
    logo: '/shopify-icon.svg',
    logoIcon: true,
  },
  {
    org: 'Tesla',
    title: 'Data Engineer Intern',
    team: 'Energy, Residential Service Engineering',
    logo: '/tesla_icon.png',
    logoIcon: true,
  },
  {
    org: 'USAFacts',
    title: 'Data Analyst Intern',
    team: 'Product',
    logo: '/usafacts-icon.svg',
    logoIcon: true,
  },
  {
    org: 'Recognize',
    title: 'Software Engineer',
    team: 'Capstone',
    logo: '/recognize-icon.png',
    logoIcon: true,
    logoBlend: true,
  },
];
