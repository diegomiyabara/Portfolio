export const BASE_SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'] as const

export const BASE_NAV_LINKS = [
  { id: 'home', key: 'navbar.home' },
  { id: 'about', key: 'navbar.about' },
  { id: 'skills', key: 'navbar.skills' },
  { id: 'projects', key: 'navbar.projects' },
  { id: 'contact', key: 'navbar.contact' },
] as const

export function getSectionIds(includeProfile: boolean): string[] {
  return includeProfile ? ['profile', ...BASE_SECTION_IDS] : [...BASE_SECTION_IDS]
}

export function getNavLinks(includeProfile: boolean) {
  return includeProfile
    ? [{ id: 'profile', key: 'navbar.profile' as const }, ...BASE_NAV_LINKS]
    : [...BASE_NAV_LINKS]
}
