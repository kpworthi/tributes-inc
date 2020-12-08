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
    this.initialLoginCheck = this.initialLoginCheck.bind(this);
  }

  componentDidMount() {
    this.initialLoginCheck();
  }

  initialLoginCheck() {
    let submission = $.get('/api/login').done(response => {
      this.updateLoginState(response.auth, response.username ? response.username : '');
    }).fail(function (err) {
      console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
    });
  }

  userArea() {
    if (this.auth === true) {
      return () => /*#__PURE__*/React.createElement("div", {
        class: "nav-link"
      }, /*#__PURE__*/React.createElement("a", {
        href: "#account",
        class: "mx-3 p-1 link-navbar",
        id: "account-nav"
      }, " ", this.username, "'s account"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
        href: "#logout",
        class: "mx-3 p-1 link-navbar",
        id: "logout"
      }, " Sign out"));
    } else return () => /*#__PURE__*/React.createElement("a", {
      href: "#login",
      class: "nav-link link-navbar box-highlight mx-3",
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
      class: "nav-link link-navbar box-highlight mx-3",
      href: "#home",
      id: "home-nav"
    }, " Home"), /*#__PURE__*/React.createElement("a", {
      class: "nav-link link-navbar box-highlight mx-3",
      href: "#products",
      id: "products-nav"
    }, " Products"), /*#__PURE__*/React.createElement("a", {
      class: "nav-link link-navbar box-highlight mx-3",
      href: "#directory",
      id: "directory-nav"
    }, " Tributes A-Z")), /*#__PURE__*/React.createElement("div", {
      class: "navbar-nav col-lg text-center justify-content-end",
      id: "nav-account-area"
    }, /*#__PURE__*/React.createElement(UserArea, null)))));
  }

}

export default Header;