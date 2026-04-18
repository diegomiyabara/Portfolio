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
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: '#FA0C00', ...style }}
    {...props}
  >
    <path d="M5.996 0H0v14.34h5.996z" fill="currentColor" />
    <path d="M10.215 0h5.988v14.34h-5.988z" fill="currentColor" />
    <path d="m8.105 5.285 3.816 9.055H9.418l-1.141-2.883H5.484z" fill="currentColor" />
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
