import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { useTranslation } from "react-i18next"

// style
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

// markup
const NotFoundPage = () => {
  const { t } = useTranslation("index")

  return (
    <Layout>
      <h1>{t("page404")}</h1>
      <p>
        {t("page404msg")}
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">{t("go-home")}</Link>
      </p>
    </Layout>
  )
}

export default NotFoundPage
