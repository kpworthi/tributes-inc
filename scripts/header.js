class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false
    };
    this.userArea = this.userArea.bind(this);
  }

  userArea() {
    if (this.state.auth === true) {
      return /*#__PURE__*/React.createElement("a", {
        href: "#auth",
        class: "nav-link mx-3",
        id: "auth-nav"
      }, " Hello, user!");
    } else return /*#__PURE__*/React.createElement("a", {
      href: "#auth",
      class: "nav-link mx-3",
      id: "auth-nav"
    }, " Log-in or Register");
  }

  render() {
    return /*#__PURE__*/React.createElement("header", {
      id: "header",
      class: ""
    }, /*#__PURE__*/React.createElement("nav", {
      class: "navbar navbar-expand-lg fixed-top"
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
    }, /*#__PURE__*/React.createElement("img", {
      src: "../img/list.svg",
      alt: "",
      width: "48",
      height: "48",
      title: "Menu"
    }))), /*#__PURE__*/React.createElement("a", {
      class: "navbar-brand",
      href: "#"
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://i.postimg.cc/4y2k0W3g/test-logo.png",
      class: ""
    })), /*#__PURE__*/React.createElement("div", {
      class: "collapse navbar-collapse",
      id: "navbar-links"
    }, /*#__PURE__*/React.createElement("div", {
      class: "navbar-nav col-lg text-center"
    }, /*#__PURE__*/React.createElement("a", {
      class: "nav-link mx-3",
      href: "#home",
      id: "home-nav"
    }, " Home"), /*#__PURE__*/React.createElement("a", {
      class: "nav-link mx-3",
      href: "#products",
      id: "products-nav"
    }, " Products"), /*#__PURE__*/React.createElement("a", {
      class: "nav-link mx-3",
      href: "#directory",
      id: "directory-nav"
    }, " Tributes A-Z")), /*#__PURE__*/React.createElement("div", {
      class: "navbar-nav col-lg text-center justify-content-end",
      id: "nav-account-area"
    }, this.userArea()))));
  }

}

export default Header;