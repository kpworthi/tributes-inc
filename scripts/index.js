import Footer from '../scripts/footer.js';
import Header from '../scripts/header.js';
import ConfirmModal from '../scripts/modal.js';

const currentTimeEST = () => new Date().toLocaleString("en-US", {
  timeZone: "EST"
}) + " EST";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      viewing: 'default',
      auth: false,
      username: '',
      dbEntry: {},
      modal: {}
    };
    this.loadPage = this.loadPage.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.updateMainState = this.updateMainState.bind(this); // fetching is used for preventing multiple db/server queries when one might already be active

    this.fetching = false;
    this.pages = ['home', 'products', 'directory', 'login', 'logout', 'account', 'template-a', 'template-b'];
    this.securePages = ['login', 'account', 'product-design-a', 'product-design-b'];

    this.pageView = () => /*#__PURE__*/React.createElement("div", {
      id: "defaultLoad",
      class: "mx-3 px-sm-4 main-area",
      style: {
        "opacity": 1
      }
    }, /*#__PURE__*/React.createElement("h1", {
      class: "text-center",
      id: "title"
    }, "Welcome to Tributes Inc.!"), /*#__PURE__*/React.createElement("h2", {
      class: "text-center",
      id: "subTitle"
    }, "We're glad you're here"), /*#__PURE__*/React.createElement("p", {
      class: "text-center"
    }, "Hang in there while we get some things together...."));
  }

  componentDidMount() {
    let linkHash = window.location.hash; // make sure there is or isn't an existing session synchronously
    // when loading a secure page

    if (linkHash && this.securePages.includes(linkHash.slice(1))) {
      let submission = $.get('/api/login').done(response => {
        this.setState({
          auth: response.auth,
          username: response.username ? response.username : ''
        }, () => {
          // if there's already a session and user is on login, move them to account
          if (this.state.auth && linkHash === '#login') window.location.hash = '#account'; // if there's no session
          else if (this.state.auth === false) window.location.hash = '#login';
          this.handleHashChange();
          $(document).click(() => {
            this.collapseNavbar();
          });
          $(window).on('hashchange', this.handleHashChange);
        });
      }).fail(function (err) {
        console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
      });
    } // otherwise make sure there is or isn't an existing session asynchronously
    // after starting the page load
    else {
        this.handleHashChange();
        let submission = $.get('/api/login').done(response => {
          this.setState({
            auth: response.auth,
            username: response.username ? response.username : ''
          });
        }).fail(function (err) {
          console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
        });
        $(document).click(() => {
          this.collapseNavbar();
        });
        $(window).on('hashchange', this.handleHashChange);
      }
  }

  handleHashChange(event) {
    let theHash = location.hash.slice(1).toLowerCase();
    $(`#${this.state.viewing}-nav`).removeClass('active'); // if the new hash is a predefined page

    if (this.pages.includes(theHash) || this.securePages.includes(theHash)) {
      //when logging out
      if (theHash === 'logout') {
        let submission = $.get('/api/logout').done(response => {
          this.updateMainState({
            auth: false,
            username: ''
          });
          window.location.href = "#home";
        }).fail(function (err) {
          console.log(' Log out HTTP request failed. ' + currentTimeEST());
          this.updateMainState({
            auth: false,
            username: ''
          }); //force user logout client-side, at least

          window.location.href = "home";
        });
      } //when loading a template preview
      else if (theHash.includes('template')) {
          let searchObj = {
            name: '',
            id: theHash === 'template-a' ? "5fe10116f521bd2c36488286" : "5fe101d6f521bd2c36488288"
          };
          this.dbSearch(searchObj).done(response => {
            this.setState({
              dbEntry: response
            }, () => {
              this.loadPage(theHash);
            });
          }).fail(function (err) {
            console.log(' DB HTTP template request failed. ' + err);
            this.loadPage('home');
            return status.textContent = 'An error occurred during template fetch, please try again.';
          });
        } else this.loadPage(theHash);
    } // else if the hash is possibly a template
    else {
        let searchObj = {
          name: theHash.split('-').join(' ')
        };
        this.dbSearch(searchObj).done(response => {
          if (response === 'No match found!') {
            this.loadPage('home');
            location.hash = 'home';
          }

          this.setState({
            dbEntry: response
          }, () => {
            this.loadPage(response.type === 'TemplateA' ? 'template-a' : 'template-b');
          });
        }).fail(function (err) {
          console.log(' DB HTTP template request failed. ' + err);
          this.loadPage('home');
          return status.textContent = 'An error occurred during template fetch, please try again.';
        });
      }
  }

  dbSearch(searchObj) {
    return $.post('/api/tribute', searchObj);
  }

  collapseNavbar() {
    if (!$('.navbar-toggler')[0].classList.contains('collapsed') && $('.navbar-toggler').css('display') !== 'none') $('.navbar-collapse').collapse('hide');
  }

  loadPage(page = 'home') {
    // if attempting to access 'secure' pages but not logged in
    if (this.securePages.includes(page) && this.state.auth === false) page = 'login'; // if hitting the login page but already logged in
    else if (page === 'login' && this.state.auth === true) return location.hash = 'account'; // if logging out, redirect to home
      else if (page === 'logout' || page === null) page = 'home'; // if accessing a template or tribute outside of normal navigation (no db info)
        else if ((page.includes('template') || page.includes('tribute')) && this.state.dbEntry.name == undefined) page = 'home'; // load the module if needed, update state, change browser location to reflect new area

    $('#view-wrapper').css('opacity', 0);
    setTimeout(() => {
      import(`../scripts/${page}.js`).then(module => {
        this.pageView = module.default;
        $(`#${page}-nav`).addClass('active');
        this.setState({
          viewing: page
        }, () => {
          $('#view-wrapper').css('opacity', 1);
        });
      });
    }, 400);
  } // passed to components to update index state


  updateMainState(updateObj, callback) {
    this.setState(updateObj, callback);
  }

  render() {
    let View = this.pageView;
    return /*#__PURE__*/React.createElement("main", {
      id: "main",
      class: ""
    }, /*#__PURE__*/React.createElement(Header, {
      auth: this.state.auth,
      username: this.state.username
    }), Object.keys(this.state.modal).length === 0 ? null : /*#__PURE__*/React.createElement(ConfirmModal, {
      text: this.state.modal.text,
      btnYes: this.state.modal.btnYes,
      btnNo: this.state.modal.btnNo,
      clickHandler: this.state.modal.clickHandler
    }), /*#__PURE__*/React.createElement("div", {
      id: "view-wrapper"
    }, /*#__PURE__*/React.createElement(View, {
      updateMainState: this.updateMainState,
      username: this.state.username,
      dbEntry: this.state.dbEntry || null,
      loadPage: this.loadPage
    })), /*#__PURE__*/React.createElement(Footer, null));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.querySelector("body"));