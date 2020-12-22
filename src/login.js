class Login extends React.Component {

  constructor (props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegister = this.submitRegister.bind(this);

    this.updateLoginState = this.props.updateLoginState;
    
  }

  handleButton ( event ) {
    let clicked = event.target;
    if (clicked.id === "submit-reg"){
      event.preventDefault();
      this.submitRegister(
        $( "#register-username" )[0].value,
        $( "#register-password" )[0].value,
        $( "#register-password-confirm")[0].value
      );
    }
    else if (clicked.id === "submit-login"){
      event.preventDefault();
      this.submitLogin ( 
        $( "#login-username" )[0].value, 
        $( "#login-password" )[0].value
      );
    }
  }

  submitLogin ( username, password ) {
    let status = $( "#login-status" )[0];
    let clicked = $( '#submit-login' )[0];

    if( username === '' || password === '' ) {
      return status.textContent = 'Please complete both the username and the password fields.';
    }

    clicked.disabled = true;
    let buttonTimeout = setTimeout(() => {
      clicked.disabled = false;
      return status.textContent = 'An error occurred during submission, please try again.';
    }, 4000);

    status.textContent = 'Request submitted, please wait.';

    let submission = $.post( '/api/login', { username: username, password: password })
      .done( ( response ) => {
        setTimeout(() => {
          this.updateLoginState( response.auth, response.username )
        }, 2000);
        clearTimeout(buttonTimeout);
        clicked.disabled = response.auth;
        return status.textContent = response.msg;
      })
      .fail( function ( err ) {
        console.log(' Log-in HTTP request failed. ' + err);
        clicked.disabled = false;
        clearTimeout(buttonTimeout);
        return status.textContent = 'An error occurred during submission, please try again.';
      });
  }

  submitRegister ( username, password, passwordConfirm ) {
    let status = $( "#reg-status" )[0];
    let clicked = $( '#submit-reg' )[0];

    if ( !this.registerChecker( username, password, passwordConfirm) ) {
      return 'Username or password did not meet criteria.';
    }

    clicked.disabled = true;
    let buttonTimeout = setTimeout(() => {
      clicked.disabled = false;
      return status.textContent = 'An error occurred during submission, please try again.';
    }, 4000);

    status.textContent = 'Request submitted, please wait.';

    let submission = $.post( '/api/register', { username: username, password: password })
      .done( ( response ) => {
        setTimeout(() => {
          this.updateLoginState( response.auth, response.username )
        }, 2000);
        clearTimeout(buttonTimeout);
        clicked.disabled = response.auth;
        return status.textContent = response.msg;
      })
      .fail( function ( err ) {
        console.log(' Registration HTTP request failed. ');
        clicked.disabled = false;
        clearTimeout(buttonTimeout);
        return status.textContent = 'An error occurred during submission, please try again.';
      });
  }

  registerChecker ( user, pass, passConfirm ) {
    let status = $( "#reg-status" )[0];
    if( pass !== passConfirm ) {
      status.textContent = 'Passwords entered do not match.';
      return false;
    } else if ( user === '' ) {
      status.textContent = 'You need to specify a username!';
      return false;
    } else if ( pass === '' || passConfirm === '' ) {
      status.textContent = 'A password must be entered in both fields.';
      return false;
    } else if ( pass.length < 10) {
      status.textContent = 'Password must be at least 10 characters.';
      return false;
    } else if ( pass.match(/[0-9]/) === null ) {
      status.textContent = 'Password must have at least one number.';
      return false;
    } else if ( pass.match(/[a-z]/) === null || pass.match(/[A-Z]/) === null ) {
      status.textContent = 'Password must have at least one lowercase and one uppercase letter.';
      return false;
    } else if ( user.length < 6 ) {
      status.textContent = 'Username must be at least 6 characters.';
      return false;
    }
    else return true;
  }

  render () {
    return(
      <div id="auth-component" class="mx-3 mb-4 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Let's get you logged in!</h1>
        <h2 class="text-center" id="subTitle"></h2>

        <div class="row my-3 h-100 text-center align-items-start justify-content-around" id="form-table">

          <form class="col-sm-5 mx-3" id="login-form">
            <h3 class="text-align"><u> Existing Account </u></h3>
            <br/>
            <div class="form-group">
              <label for="login-username"> Username: </label>
              <input type="text" class="form-control" id="login-username"/>
            </div>
            <div class="form-group">
              <label for="login-password"> Password </label>
              <input type="password" class="form-control" id="login-password"/>
            </div>
            <button type="submit" class="btn btn-light" id="submit-login" onClick={this.handleButton}> Submit </button>
            <p id="login-status"></p>
          </form>
          
          <div class="vert-divider d-none d-sm-block"></div>
          <div class="sub-divider d-block d-sm-none"></div>
          
          <form class="col-sm-5 mx-3" id="register-form">
            <h3 class="text-align"><u> Register New Account </u></h3>
            <br/>
            <div class="form-group">
              <label for="register-username"> Username (six characters minimum): </label>
              <input type="text" class="form-control" id="register-username"/>
            </div>
            <div class="form-group">
              <label for="register-password"> Password (ten characters minimum): </label>
              <input type="password" class="form-control" id="register-password"/>
            </div>
            <div class="form-group">
              <label for="register-password-confirm"> Confirm Password: </label>
              <input type="password" class="form-control" id="register-password-confirm"/>
            </div>
            <button type="button" class="btn btn-light" id="submit-reg" onClick={this.handleButton}> Submit </button>
            <p id="reg-status"></p>
          </form>
          
        </div>
      </div>
    )
  }
}

export default Login;
