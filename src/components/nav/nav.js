import * as React from "react"
import { navLinks, navLinkItem, navLinkText } from "./nav.module.scss"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useTranslation } from "react-i18next"

const Nav = () => {
  const { t } = useTranslation("index")

  const menuLinks = [
    {
      name: "Home",
      link: "/",
      icon: "home",
    },
    {
      name: t("themes"),
      link: "/themes",
      icon: "category",
    },
    {
      name: "Articles",
      link: "/articles",
      icon: "article",
    },
  ]

  return (
    <nav>
      <ul className={navLinks}>
        {menuLinks.map(link => (
          <li className={navLinkItem} key={link.name}>
            <Link to={link.link} className={navLinkText}>
              <span>{link.icon}</span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
