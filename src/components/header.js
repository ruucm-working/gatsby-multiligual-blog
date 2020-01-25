import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useIntl, changeLocale } from "gatsby-plugin-intl"

const Header = ({ siteTitle }) => {
  const intl = useIntl()

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        {intl.locale === "en" ? (
          <button
            onClick={() => {
              changeLocale("ko")
            }}
          >
            KO
          </button>
        ) : (
          <button
            onClick={() => {
              changeLocale("en")
            }}
          >
            EN
          </button>
        )}
      </div>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
