class Header extends React.Component {
  constructor(){
    super();

    this.state = {
      auth: false
    }
    
  }

  userArea(){
    if (this.state.auth === true) {
      return (
        <a href="#" class="nav-link mx-3" id="auth-nav"> Hello, user!</a>
      )
    }
    else return (
        <a href="#" class="nav-link mx-3" id="auth-nav"> Log-in or Register</a>
    )
  }
  
  render(){
    return(
      <header id="header" class="">
        <nav class="navbar navbar-expand-lg fixed-top">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-links" aria-controls="navbar-links" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="fab fa-elementor"></i></span>
          </button>
          <a class="navbar-brand" href="#"><img src="https://i.postimg.cc/4y2k0W3g/test-logo.png" class="" /></a>
          <div class="collapse navbar-collapse" id="navbar-links">
            <div class="navbar-nav col-lg">
              <a href="#" class="nav-link mx-3" id="home-nav"> Home</a>
              <a href="#" class="nav-link mx-3" id="products-nav"> Products</a>
              <a href="#" class="nav-link mx-3" id="directory-nav"> Tributes A-Z</a>
            </div>
            <div class="navbar-nav" id="nav-account-area col-lg">

            {this.userArea}
            </div>
          </div>

        </nav>
      </header>
   )
  }
}

export default Header;
