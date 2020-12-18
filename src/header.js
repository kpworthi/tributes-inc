
const currentTimeEST = () => Date().toLocaleString('en-US', { timeZone: 'EST'}) + ' EST';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.auth = props.auth;
    this.username = props.username;

    this.updateLoginState = this.props.updateLoginState;

    this.palette = { 
      one: {nav: '#7E4A35', page: '#dbceb0', container: '#cab577', content: '#D4C391'},
      two: {nav: '#667292', page: '#F1E3DD', container: '#8D9DB6', content: '#BCCAD6'},
      three: {nav: '#B04517', page: '#F2E394', container: '#F2AE72', content: '#F4E1D2'}
    }

    this.userArea = this.userArea.bind(this);
    
  }

  componentDidMount(){
    //testing only
    $('#color-select').on("change", (event)=>{
      this.loadPalette( this.palette[ $('#color-select option:selected')[0].value ]);
    });
  }

  loadPalette( palette ) {
    $('.navbar').css('background-color', palette.nav);
    $('body').css('background-color', palette.page);
    $('.main-area').css('background-color', palette.container);
    $('.inset').css('background-color', palette.content);
  }

  userArea(){
    if (this.auth === true) {
      return () => (
        <div class="">
          <a href="#account" class="nav-link mx-3 p-1" id="account-nav"> {this.username}'s account</a>
          <br/>
          <a href="#logout" class="nav-link mx-3 p-1" id="logout-nav"> Sign out</a>
        </div>
      )
    }
    else return () => (
        <a class="nav-link mx-3" href="#login" id="login-nav"> Log-in or Register</a>
    )
  }
  
  render(){
    this.auth = this.props.auth;
    this.username = this.props.username;
    let UserArea = this.userArea();

    return(
      <header id="header" class="">
        <nav class="navbar navbar-dark navbar-expand-lg fixed-top">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-links" aria-controls="navbar-links" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
          </button>
          <a class="navbar-brand" href="#"><img src="./img/logo.png" class="" /></a>

          <div class="collapse navbar-collapse" id="navbar-links">
            <div class="navbar-nav text-center">
              <a class="nav-link align-self-center mx-3" href="#home" id="home-nav"> Home</a>
              <a class="nav-link align-self-center mx-3" href="#products" id="products-nav"> Products</a>
              <a class="nav-link align-self-center mx-3" href="#directory" id="directory-nav"> Tributes A-Z</a>

              {/* Temporary template additions */}
              <a class="nav-link align-self-center mx-3" href="#template-a" id="template-a-nav"> Temp A</a>
              <a class="nav-link align-self-center mx-3" href="#template-b" id="template-b-nav"> Temp B</a>
              <select id="color-select">
                  <option value="one">Tributes Classic</option>
                  <option value="two">Tributes Cool   </option>
                  <option value="three">Tributes Warm </option>
              </select>

              <UserArea />
            </div>
          </div>

        </nav>
      </header>
   )
  }
}

export default Header;
