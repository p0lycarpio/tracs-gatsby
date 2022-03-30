import * as React from "react"
import { Link } from "gatsby"
import { navLinks, navLinkItem, navLinkText } from "./nav.module.scss"

const menuLinks = [
    {
        name: "Home",
        link: "/",
        icon: "home",
    },
    {
        name: "Thèmes",
        link: "/themes",
        icon: "category",
    },
    {
        name: "Articles",
        link: "/articles",
        icon: "article",
    },
]

const Nav = () => {
    return (
        <nav>
            <ul className={navLinks}>
                {menuLinks.map(link => (
                    <li className={navLinkItem}>
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
