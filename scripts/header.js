const currentTimeEST = () => Date().toLocaleString('en-US', {
  timeZone: 'EST'
}) + ' EST';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth;
    this.username = props.username;
    this.updateLoginState = this.props.updateLoginState;
    this.userArea = this.userArea.bind(this);
  }

  componentDidMount() {}

  userArea() {
    if (this.auth === true) {
      return () => /*#__PURE__*/React.createElement("div", {
        class: ""
      }, /*#__PURE__*/React.createElement("a", {
        href: "#account",
        class: "nav-link mx-3 p-1",
        id: "account-nav"
      }, " ", this.username, "'s account"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
        href: "#logout",
        class: "nav-link mx-3 p-1",
        id: "logout-nav"
      }, " Sign out"));
    } else return () => /*#__PURE__*/React.createElement("a", {
      class: "nav-link mx-3",
      href: "#login",
      id: "login-nav"
    }, " Log-in or Register");
  }

  render() {
    this.auth = this.props.auth;
    this.username = this.props.username;
    let UserArea = this.userArea();
    return /*#__PURE__*/React.createElement("header", {
      id: "header",
      class: ""
    }, /*#__PURE__*/React.createElement("nav", {
      class: "navbar navbar-dark navbar-expand-lg fixed-top"
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
      href: "#"
    }, /*#__PURE__*/React.createElement("img", {
      src: "./img/logo.png",
      class: ""
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
    }, " Tributes A-Z"), /*#__PURE__*/React.createElement(UserArea, null)))));
  }

}

export default Header;