class Header extends React.Component {
  constructor(){
    super();
    
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
              <a href="#" class="nav-link mx-3"> Home</a>
              <a href="#" class="nav-link mx-3"> Products</a>
              <a href="#" class="nav-link mx-3"> Tributes A-Z</a>
            </div>
            <div class="navbar-nav" id="nav-account-area col-lg">
              <a href="#" class="nav-link mx-3"> Log-in or Register</a>
            </div>
          </div>

        </nav>
      </header>
   )
  }
}

export default Header;
