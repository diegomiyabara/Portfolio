export interface ContactItem {
  id: 'linkedin' | 'github' | 'email' | 'whatsapp'
  href: string
  available: boolean
}

const contact: ContactItem[] = [
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/diegomiyabara',
    available: true,
  },
  {
    id: 'github',
    href: 'https://github.com/diegomiyabara',
    available: true,
  },
  {
    id: 'email',
    href: 'mailto:diego.miyabara@hotmail.com',
    available: true,
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/5543991183010',
    available: true,
  },
]

export default contact
