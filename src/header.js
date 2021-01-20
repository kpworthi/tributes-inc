const currentTimeEST = () => Date().toLocaleString('en-US', { timeZone: 'EST' }) + ' EST';

const Header = ({ auth, username }) => {
  return (
    <header id="header" class="">
      <nav class="navbar navbar-dark navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-links" aria-controls="navbar-links" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>
        <a class="navbar-brand" href="#home"><img src="./img/logo.png" id="ti-logo" href="#home" /></a>

        <div class="collapse navbar-collapse" id="navbar-links">
          <div class="navbar-nav text-center">
            <a class="nav-link align-self-center mx-3" href="#home" id="home-nav"> Home</a>
            <a class="nav-link align-self-center mx-3" href="#products" id="products-nav"> Products</a>
            <a class="nav-link align-self-center mx-3" href="#directory" id="directory-nav"> Tributes A-Z</a>

            {auth?(
            <div class="">
              <a href="#account" class="nav-link mx-3 p-1" id="account-nav"> {username}'s account</a>
              <br />
              <a href="#logout" class="nav-link mx-3 p-1" id="logout-nav"> Sign out</a>
            </div>
            ):(
            <a class="nav-link mx-3" href="#login" id="login-nav"> Log-in or Register</a>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
