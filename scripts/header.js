const currentTimeEST = () => Date().toLocaleString('en-US', {
  timeZone: 'EST'
}) + ' EST';

const Header = ({
  auth,
  username
}) => {
  return /*#__PURE__*/React.createElement("header", {
    id: "header",
    class: ""
  }, /*#__PURE__*/React.createElement("nav", {
    class: "navbar navbar-dark navbar-expand-lg"
  }, /*#__PURE__*/React.createElement("button", {
    class: "navbar-toggler",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navbar-links",
    "aria-controls": "navbar-links",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    class: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("a", {
    class: "navbar-brand",
    href: "#home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./img/logo.png",
    id: "ti-logo",
    href: "#home"
  })), /*#__PURE__*/React.createElement("div", {
    class: "collapse navbar-collapse",
    id: "navbar-links"
  }, /*#__PURE__*/React.createElement("div", {
    class: "navbar-nav text-center"
  }, /*#__PURE__*/React.createElement("a", {
    class: "nav-link align-self-center mx-3",
    href: "#home",
    id: "home-nav"
  }, " Home"), /*#__PURE__*/React.createElement("a", {
    class: "nav-link align-self-center mx-3",
    href: "#products",
    id: "products-nav"
  }, " Products"), /*#__PURE__*/React.createElement("a", {
    class: "nav-link align-self-center mx-3",
    href: "#directory",
    id: "directory-nav"
  }, " Tributes A-Z"), auth ? /*#__PURE__*/React.createElement("div", {
    class: ""
  }, /*#__PURE__*/React.createElement("a", {
    href: "#account",
    class: "nav-link mx-3 p-1",
    id: "account-nav"
  }, " ", username, "'s account"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "#logout",
    class: "nav-link mx-3 p-1",
    id: "logout-nav"
  }, " Sign out")) : /*#__PURE__*/React.createElement("a", {
    class: "nav-link mx-3",
    href: "#login",
    id: "login-nav"
  }, " Log-in or Register")))));
};

export default Header;