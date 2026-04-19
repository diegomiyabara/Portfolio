import type { FC, SVGProps } from 'react'
import {
  siDocker,
  siGit,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPhp,
  siReact,
  siTypescript,
} from 'simple-icons'

type SvgProps = SVGProps<SVGSVGElement>
type TechIconMap = Record<string, FC<SvgProps>>

interface BrandIconOptions {
  hex: string
  path: string
  viewBox?: string
}

function createBrandIcon({ hex, path, viewBox = '0 0 24 24' }: BrandIconOptions): FC<SvgProps> {
  const BrandIcon: FC<SvgProps> = ({ style, ...props }) => (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: `#${hex}`, ...style }}
      {...props}
    >
      <path d={path} fill="currentColor" />
    </svg>
  )

  return BrandIcon
}

const reactIcon = createBrandIcon({ hex: siReact.hex, path: siReact.path })
const typeScriptIcon = createBrandIcon({ hex: siTypescript.hex, path: siTypescript.path })
const javaScriptIcon = createBrandIcon({ hex: siJavascript.hex, path: siJavascript.path })
const phpIcon = createBrandIcon({ hex: siPhp.hex, path: siPhp.path })
const nodeJsIcon = createBrandIcon({ hex: siNodedotjs.hex, path: siNodedotjs.path })
const mySqlIcon = createBrandIcon({ hex: siMysql.hex, path: siMysql.path })
const gitIcon = createBrandIcon({ hex: siGit.hex, path: siGit.path })
const dockerIcon = createBrandIcon({ hex: siDocker.hex, path: siDocker.path })

const magentoIcon: FC<SvgProps> = ({ style, ...props }) => (
  <svg
    viewBox="0 0 43 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: '#F26322', ...style }}
    {...props}
  >
    <polygon fill="currentColor" points="21.43 0 0 12.37 0 37.09 6.12 40.62 6.08 15.91 21.39 7.06 36.7 15.91 36.7 40.61 42.82 37.09 42.82 12.35 21.43 0" />
    <polygon fill="currentColor" points="24.47 40.62 21.41 42.39 18.34 40.63 18.34 15.91 12.22 19.44 12.23 44.15 21.41 49.45 30.59 44.15 30.59 19.44 24.47 15.91 24.47 40.62" />
  </svg>
)

const adobeCommerceIcon: FC<SvgProps> = ({ style, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ ...style }}
    {...props}
  >
    <rect width="24" height="24" rx="4" fill="#FA0C00" />
    <path
      d="M7.25 18.5h2.75l1.25-3.5h2.5l1.25 3.5h2.75L12 5.5 7.25 18.5zm2.1-5.75 1-2.8 1 2.8h-2z"
      fill="#ffffff"
    />
  </svg>
)

const techIcons = Object.assign(Object.create(null), {
  React: reactIcon,
  TypeScript: typeScriptIcon,
  JavaScript: javaScriptIcon,
  Magento: magentoIcon,
  'Adobe Commerce': adobeCommerceIcon,
  PHP: phpIcon,
  'Node.js': nodeJsIcon,
  MySQL: mySqlIcon,
  Git: gitIcon,
  Docker: dockerIcon,
}) as TechIconMap

export default techIcons
export type { TechIconMap }
