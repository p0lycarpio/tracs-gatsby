import * as React from 'react'
import { Link } from 'gatsby'
import {
  navLinks,
  navLinkItem,
  navLinkText
} from './nav.module.scss'


const menuLinks = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Thèmes',
    link: '/page-2'
  },
  {
    name: 'Espaces',
    link: '/page-3'
  },
  {
    name: 'Périodes',
    link: '/page-4'
  },
]

const Nav = () => {
  return (
    <nav>
      <ul className={navLinks}>
        {menuLinks.map(link =>
          <li className={navLinkItem}>

            <Link to={link.link} className={navLinkText}>
              {link.name}
            </Link>
          </li>
        )}

      </ul>
    </nav>
  )
}

export default Nav