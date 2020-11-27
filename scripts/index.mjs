
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      viewing: "Intro"
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("main", {
      id: "main",
      class: "container-fluid"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
      id: "mainBlock",
      class: "mx-3 mb-4"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "",
      id: "title"
    }, "Welcome to Tributes Inc.!"), /*#__PURE__*/React.createElement("h2", {
      class: "",
      id: "subTitle"
    }, "We're glad you're here")), /*#__PURE__*/React.createElement(Footer, null));
  }

}

class Header extends React.Component {
  constructor() {
    super();
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
    }, /*#__PURE__*/React.createElement("i", {
      class: "fab fa-elementor"
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
      class: "navbar-nav col-lg"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      class: "nav-link mx-3"
    }, " Home"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      class: "nav-link mx-3"
    }, " Products"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      class: "nav-link mx-3"
    }, " Tributes A-Z")), /*#__PURE__*/React.createElement("div", {
      class: "navbar-nav",
      id: "nav-account-area col-lg"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      class: "nav-link mx-3"
    }, " Log-in or Register")))));
  }

}

class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return /*#__PURE__*/React.createElement("footer", {
      id: "footer",
      class: "mx-5 small"
    }, /*#__PURE__*/React.createElement("p", null, "The information listed on this page is drawn from and inspired by existing works. Any characters, locations, etc., described or listed are the property of their copyright holder and no claim of ownership is expressed or implied.", /*#__PURE__*/React.createElement("br", null), "Site layout and assets \xA9Tributes Inc. 2020 "));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.querySelector("body"));
/*
window.addEventListener("click",(event)=>{
  if(event.target.getAttribute("class").includes("nav-link")){
    for(let button of Array.from(document.getElementsByClassName("nav-link"))){
      button.style.borderColor="#7e4a35"
      button.style.color = "white"
    }
    event.target.style.borderColor="white";
    event.target.style.color="#ccc"
  }
});
*/