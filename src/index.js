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

    this.pages       = ['home', 'products', 'directory', 'login', 'logout', 'account'];
    //temp template testing addition
    this.pages.concat(...['template-a', 'template-b']);
    this.securePages = ['login', 'account'];
    this.pageView    = class View extends React.Component { constructor(){super();} render(){ return (<div></div>) } } ;

  }

  componentDidMount(){
    let linkHash = window.location.hash;

    // make sure there is or isn't an existing session synchronously
    if ( linkHash && this.securePages.includes(linkHash.slice(1))) {
      console.log('secure page check');
      let submission = $.get( '/api/login' )
        .done( ( response ) => {
          this.setState( {auth: response.auth, username: response.username?response.username:'' }, () => {
            // if there's already a session and user is on login, move them to account
            if (this.state.auth && linkHash === '#login') linkHash = '#account';
            this.loadPage( linkHash.slice(1) );
            $( window ).click(this.handleClick);
            $( '#defaultLoad' ).css('display', 'none');
          });
        })
        .fail( function ( err ) {
          console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
        });
      return null;
    }
    // otherwise make sure there is or isn't an existing session asynchronously
    // after starting the page load
    else if ( linkHash && this.pages.includes(linkHash.slice(1))) {
      console.log('insecure page check');
      this.loadPage( linkHash.slice(1) );
    }
    else if (this.state.viewing === 'default'){
      console.log('default page check');
      this.loadPage();
    }

    let submission = $.get( '/api/login' )
      .done( ( response ) => {
        this.updateLoginState( response.auth, response.username?response.username:'' )
      })
      .fail( function ( err ) {
        console.log(' Auth-check HTTP request failed. ' + currentTimeEST());
      });

    $( window ).click(this.handleClick);
    $( '#defaultLoad' ).css('display', 'none');
  }

  handleClick ( event ) {
    let clicked = event.target;

    if ( !clicked.href ) return null;
    else if ( clicked.href.includes('#logout')) {
      let submission = $.get( '/api/logout' )
      .done( ( response ) => {
        this.updateLoginState( false, '' );
      })
      .fail( function ( err ) {
        console.log(' Log out HTTP request failed. ' + currentTimeEST());
        this.updateLoginState( false, '' );//force user logout client-side, at least
      });
    }
    else if( clicked.href.includes('#') ) {
      $( `#${this.state.viewing}-nav`).toggleClass('active');
      this.loadPage( clicked.href.split('#')[1] );
    }
    else return null;
  }

  loadPage ( page = 'home' ) {
    switch ( page ) {
      //template test buttons
      case 'template-a':
          import('../scripts/template-a.js')
            .then(module => {
              this.pageView = module.default;
              this.setState({ viewing: 'template-a' }, ()=>
              $( `#${this.state.viewing}-nav`).toggleClass('active'));
            });
        break;
      case 'template-b':
          import('../scripts/template-b.js')
            .then(module => {
              this.pageView = module.default;
              this.setState({ viewing: 'template-b' }, ()=>
              $( `#${this.state.viewing}-nav`).toggleClass('active'));
            });
        break;
      //normal buttons
      case 'home':
        import('../scripts/home.js')
          .then(module => {
            this.pageView = module.default;
            this.setState({ viewing: 'home' }, ()=>
            $( `#${this.state.viewing}-nav`).toggleClass('active'));
          });
        break;
      case 'products':
        import('../scripts/products.js')
          .then(module => {
            this.pageView = module.default;
            this.setState({ viewing: 'products' }, ()=>
            $( `#${this.state.viewing}-nav`).toggleClass('active'));
          });
        break;
      case 'directory':
        import('../scripts/directory.js')
          .then(module => {
            this.pageView = module.default;
            this.setState({ viewing: 'directory' }, ()=>
            $( `#${this.state.viewing}-nav`).toggleClass('active'));
          });
        break;
      case 'account':
        if ( this.state.auth ) {
          import('../scripts/account.js')
            .then(module => {
              this.pageView = module.default;
              this.setState({ viewing: 'account' }, ()=>
              $( `#${this.state.viewing}-nav`).toggleClass('active'));
            });
          break;
        }
      case 'logout':
      case 'login':
        import('../scripts/login.js')
          .then(module => {
            this.pageView = module.default;
            this.setState({ viewing: 'login' }, ()=>
            $( `#${this.state.viewing}-nav`).toggleClass('active'));
          });
        break;
    }
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

        <View updateLoginState={this.updateLoginState} username={this.state.username} />

        <div id="defaultLoad" class="mx-3 mb-4 px-sm-4 main-area">
          <h1 class="text-center" id="title">Welcome to Tributes Inc.!</h1>
          <h2 class="text-center" id="subTitle">We're glad you're here</h2>
          <p class="text-center">Hang in there while we get some things together....</p>
        </div>

        <Footer />

      </main>
      
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));
