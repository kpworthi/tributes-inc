import Footer from '../scripts/footer.js';
import Header from '../scripts/header.js';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      viewing: 'default',
      auth: false,
      username: ''
    };

    this.loadPage          = this.loadPage.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.updateLoginState  = this.updateLoginState.bind(this);

    this.fetching    = false;
    this.dbEntry     = {};
    this.pages       = ['home', 'products', 'directory', 'login', 'logout', 'account', 'template-a', 'template-b'];
    this.securePages = ['login', 'account', 'product-design-a', 'product-design-b'];
    this.pageView    = () => (
      <div id="defaultLoad" class="mx-3 mb-4 px-sm-4 main-area" style={{"opacity": 1}}>
        <h1 class="text-center" id="title">Welcome to Tributes Inc.!</h1>
        <h2 class="text-center" id="subTitle">We're glad you're here</h2>
        <p class="text-center">Hang in there while we get some things together....</p>
      </div>);

  }

  componentDidMount(){
    let linkHash = window.location.hash;

    // make sure there is or isn't an existing session synchronously
    // when loading a secure page
    if ( linkHash && this.securePages.includes(linkHash.slice(1))) {
      //console.log('secure page check');
      let submission = $.get( '/api/login' )
        .done( ( response ) => {
          this.setState( {auth: response.auth, username: response.username?response.username:'' }, () => {
            // if there's already a session and user is on login, move them to account
            if (this.state.auth && linkHash === '#login') linkHash = '#account';
            this.loadPage( linkHash.slice(1) );
            $( window ).click(this.handleClick);
          });
        })
        .fail( function ( err ) {
          console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
        });
    }
    // otherwise make sure there is or isn't an existing session asynchronously
    // after starting the page load
    else {
      //console.log('insecure page check');
      this.loadPage( linkHash.slice(1) || null )

      let submission = $.get( '/api/login' )
        .done( ( response ) => {
          this.updateLoginState( response.auth, response.username?response.username:'' )
        })
        .fail( function ( err ) {
          console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
        });

      $( window ).click( this.handleClick );
    }
  }

  handleClick ( event ) {
    let clicked = event.target;
    console.log('index handleclick');
    console.log(clicked);

    //not a link, do nothing
    if ( !clicked.href ) {
      this.collapseNavbar();
      return null;
    }
    //handle going to a template or a tribute
    else if ((clicked.className === 'template-link' || clicked.className === 'tribute-link' ) && this.fetching === false) {
      let searchObj = {};
      this.fetching = true;

      $( `#${this.state.viewing}-nav`).removeClass('active');

      if (clicked.classList.contains('template-link'))
        searchObj = { name: '', id: (clicked.href.includes('template-a')?"5fe10116f521bd2c36488286":"5fe101d6f521bd2c36488288") };
      else searchObj = { name: clicked.textContent };
      console.log(searchObj);

      let submission = $.post( '/api/tribute', searchObj )
        .done( ( response ) => {
          this.dbEntry = response;

          if (searchObj.id) {
            this.loadPage(response.bio?'template-a':'template-b');
          } else if (response.type === 'TemplateA') {
            this.loadPage('template-a');
          } else if (response.type === 'TemplateB') {
            this.loadPage('template-b');
          }
          return this.fetching = false;
        })
        .fail( function ( err ) {
          console.log(' DB HTTP template request failed. ' + err);
          this.fetching = false;
          this.loadPage('home');
          return status.textContent = 'An error occurred during template fetch, please try again.';
        });
        this.collapseNavbar();
    }
    //logout path
    else if ( clicked.href.includes('#logout')) {
      let submission = $.get( '/api/logout' )
      .done( ( response ) => {
        this.updateLoginState( false, '' );
      })
      .fail( function ( err ) {
        console.log(' Log out HTTP request failed. ' + currentTimeEST());
        this.updateLoginState( false, '' );//force user logout client-side, at least
      });this.collapseNavbar();
    }
    //navbar path or clicking a product card in the account page
    else if( clicked.href.includes('#')) {
      $( `#${this.state.viewing}-nav`).removeClass('active');
      this.collapseNavbar();
      this.loadPage( clicked.href.split('#')[1] );
    }
    else {
        this.collapseNavbar();
      return null;
    }
  }

  collapseNavbar(){
    if (!$('.navbar-toggler')[0].classList.contains('collapsed') && $('.navbar-toggler').css('display') !== 'none' )
      $('.navbar-collapse').collapse('hide');
  }

  loadPage ( page = 'home' ) {
    // if attempting to access 'secure' pages but not logged in
    if ( this.securePages.includes(page) && this.state.auth === false ) page = 'login';
    // if logging out, redirect to home
    else if (page === 'logout' || page === null ) page = 'home';
    // if accessing a template or tribute outside of normal navigation (no db info)
    else if ((page.includes('template') || page.includes('tribute')) && this.dbEntry.name == undefined) page = 'home';

    $( '#view-wrapper' ).fadeOut(()=>{
      import(`../scripts/${page}.js`)
        .then(module => {
          this.pageView = module.default;
          $( `#${page}-nav` ).addClass('active');
          this.setState({ viewing: page }, ()=> {
            $( '#view-wrapper' ).fadeIn();
          });
          window.location.href = '#' + page;
        });
    });
  }

  updateLoginState ( isAuth, username = '' ) {
    this.setState( { auth: isAuth, username: username } );
    if ( isAuth && this.state.viewing === 'login' ) {
      this.handleClick( { target: { href: '#account', hash: '#account' }});
    }
    else if ( !isAuth && this.state.viewing === 'account' ) {
      this.handleClick( { target: { href: '#login', hash: '#login' }});
    }
  }
  
  render() {
    let View = this.pageView;

    return (
      <main id="main" class="">

        <Header auth={this.state.auth} username={this.state.username} updateLoginState={this.updateLoginState} />

        <div id="view-wrapper" class="h-100 w-100">
          <View updateLoginState={this.updateLoginState} 
                username={this.state.username} 
                dbEntry={this.dbEntry?this.dbEntry:null}
                loadPage={this.loadPage}
                />
        </div>

        <Footer />

      </main>
      
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));
