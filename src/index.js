import Footer from '../scripts/footer.js';
import Header from '../scripts/header.js';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      viewing: 'default'
    };

    this.loadPage = this.loadPage.bind(this);
    this.pageView = class View extends React.Component { constructor(){super();} render(){ return (<div></div>) } } ;
    
  }

  componentDidload(){
    if (this.state.viewing === 'default'){
      this.loadPage();
      window.addEventListener("click", this.handleClick);
      document.querySelector('#defaultLoad').style.display = 'none';
    }
  }

  handleClick ( event ) {
    if(event.target.getAttribute("class").includes("nav-link")){
      for(let button of Array.from(document.getElementsByClassName("nav-link"))){
        button.style.borderColor="#7e4a35"
        button.style.color = "white"
      }
      event.target.style.borderColor="white";
      event.target.style.color="#ccc"
      this.loadPage( event.target.id.split('-')[0] );
    }
    else return null;

  }

  loadPage ( page = 'home' ) {
    switch ( page ) {
      case 'home':
        import('../scripts/home.js')
          .then(module => {
            this.pageView = module;
            this.setState({ viewing: 'home' });
          });
        break;
      case 'products':
        import('../scripts/products.js')
          .then(module => {
            this.pageView = module;
            this.setState({ viewing: 'products' });
          });
        break;
      case 'directory':
        import('../scripts/directory.js')
          .then(module => {
            this.pageView = module;
            this.setState({ viewing: 'directory' });
          });
        break;
      case 'account':
        import('../scripts/account.js')
          .then(module => {
            this.pageView = module;
            this.setState({ viewing: 'account' });
          });
        break;
      case 'auth':
        import('../scripts/auth.js')
          .then(module => {
            this.pageView = module;
            this.setState({ viewing: 'auth' });
          });
        break;
    }
  }


  
  render() {
    let View = this.pageView;

    return (
      <main id="main" class="container-fluid">
        <Header />
        <View />
        <div id="defaultLoad" class="mx-3 mb-4 main-area">
          <h1 class="" id="title">Welcome to Tributes Inc.!</h1>
          <h2 class="" id="subTitle">We're glad you're here</h2>
        </div>
        <Footer />
      </main>
      
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));