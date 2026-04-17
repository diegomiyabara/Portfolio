export interface ContactItem {
  id: 'linkedin' | 'github' | 'email' | 'whatsapp'
  href: string
  available: boolean
}

const contact: ContactItem[] = [
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/diego',
    available: true,
  },
  {
    id: 'github',
    href: 'https://github.com/diego',
    available: true,
  },
  {
    id: 'email',
    href: 'mailto:diego@example.com',
    available: true,
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/5500000000000',
    available: false,
  },
]

export default contact
