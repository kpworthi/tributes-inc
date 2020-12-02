import Footer from '../scripts/footer.js';
import Header from '../scripts/header.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      viewing: 'default',
      auth: false
    };
    this.loadPage = this.loadPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.pageView = class View extends React.Component {
      constructor() {
        super();
      }

      render() {
        return /*#__PURE__*/React.createElement("div", null);
      }

    };
    this.pages = ['home', 'products', 'directory', 'auth', 'account'];
  }

  componentDidMount() {
    if (window.location.hash && this.pages.includes(window.location.hash.slice(1))) {
      this.loadPage(window.location.hash.slice(1));
    } else if (this.state.viewing === 'default') {
      this.loadPage();
    }

    $(window).click(this.handleClick);
    $('#defaultLoad').css('display', 'none');
  }

  handleClick(event) {
    let clicked = event.target;
    if (!clicked.href) return null;else if (clicked.getAttribute("class").includes("nav-link")) {
      $(".nav-link").css('border-color', '#7e4a35');
      $(".nav-link").css('color', 'white');
      clicked.style.borderColor = "white";
      clicked.style.color = "#ccc";

      if (clicked.href.split('#')[1] !== this.state.viewing) {
        this.loadPage(clicked.href.split('#')[1]);
      }
    } else if (clicked.href.includes('#')) {
      $(".nav-link").css('border-color', '#7e4a35');
      $(".nav-link").css('color', 'white');
      let matchingNav = $(`${clicked.hash}-nav`)[0];
      matchingNav.style.borderColor = "white";
      matchingNav.style.color = "#ccc";
      this.loadPage(clicked.href.split('#')[1]);
    } else return null;
  }

  loadPage(page = 'home') {
    switch (page) {
      case 'home':
        import('../scripts/home.js').then(module => {
          this.pageView = module.default;
          this.setState({
            viewing: 'home'
          });
        });
        break;

      case 'products':
        import('../scripts/products.js').then(module => {
          this.pageView = module.default;
          this.setState({
            viewing: 'products'
          });
        });
        break;

      case 'directory':
        import('../scripts/directory.js').then(module => {
          this.pageView = module.default;
          this.setState({
            viewing: 'directory'
          });
        });
        break;

      case 'account':
        import('../scripts/account.js').then(module => {
          this.pageView = module.default;
          this.setState({
            viewing: 'account'
          });
        });
        break;

      case 'auth':
        import('../scripts/auth.js').then(module => {
          this.pageView = module.default;
          this.setState({
            viewing: 'auth'
          });
        });
        break;
    }
  }

  render() {
    let View = this.pageView;
    return /*#__PURE__*/React.createElement("main", {
      id: "main",
      class: "container-fluid"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(View, null), /*#__PURE__*/React.createElement("div", {
      id: "defaultLoad",
      class: "mx-3 mb-4 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "",
      id: "title"
    }, "Welcome to Tributes Inc.!"), /*#__PURE__*/React.createElement("h2", {
      class: "",
      id: "subTitle"
    }, "We're glad you're here")), /*#__PURE__*/React.createElement(Footer, null));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.querySelector("body"));