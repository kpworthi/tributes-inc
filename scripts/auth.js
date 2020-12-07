class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.updateLoginState = this.props.updateLoginState;
  }

  handleButton(event) {
    let clicked = event.target;

    if (clicked.id === "submit-reg") {
      event.preventDefault();
      this.submitRegister($("#register-username")[0].value, $("#register-password")[0].value, $("#register-password-confirm")[0].value);
    } else if (clicked.id === "submit-login") {
      event.preventDefault();
      this.submitLogin($("#login-username")[0].value, $("#login-password")[0].value);
    }
  }

  submitLogin(username, password) {
    if (username === '' || password === '') {
      $("#login-status")[0].textContent = 'Please complete both the username and the password fields.';
    } else {
      $("#login-status")[0].textContent = 'Request submitted, please wait.';
      let submission = $.post('/api/login', {
        username: username,
        password: password
      }).done(response => {
        $("#login-status")[0].textContent = response.msg;
        setTimeout(() => {
          this.updateLoginState(response.auth, response.username);
        }, 2000);
      }).fail(function (err) {
        console.log(' Log-in HTTP request failed. ' + err);
        $("#login-status")[0].textContent = err;
      });
    }
  }

  submitRegister(username, password, passwordConfirm) {
    if (this.registerChecker(username, password, passwordConfirm)) {
      $("#reg-status")[0].textContent = 'Request submitted, please wait.';
      let submission = $.post('/api/register', {
        username: username,
        password: password
      }).done(response => {
        $("#reg-status")[0].textContent = response.msg;
        setTimeout(() => {
          this.updateLoginState(response.auth, response.username);
        }, 2000);
      }).fail(function (err) {
        console.log(' Registration HTTP request failed. ');
        $("#reg-status")[0].textContent = err;
      });
    }
  }

  registerChecker(user, pass, passConfirm) {
    if (pass !== passConfirm) {
      $("#reg-status")[0].textContent = 'Passwords entered do not match.';
      return false;
    } else if (user === '') {
      $("#reg-status")[0].textContent = 'You need to specify a username!';
      return false;
    } else if (pass === '' || passConfirm === '') {
      $("#reg-status")[0].textContent = 'A password must be entered in both fields.';
      return false;
    } else if (pass.length < 10) {
      $("#reg-status")[0].textContent = 'Password must be at least 10 characters.';
      return false;
    } else if (pass.match(/[0-9]/) === null) {
      $("#reg-status")[0].textContent = 'Password must have at least one number.';
      return false;
    } else if (pass.match(/[a-z]/) === null || pass.match(/[A-Z]/) === null) {
      $("#reg-status")[0].textContent = 'Password must have at least one lowercase and one uppercase letter.';
      return false;
    } else if (user.length < 6) {
      $("#reg-status")[0].textContent = 'Username must be at least 6 characters.';
      return false;
    } else return true;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "auth-component",
      class: "d-flex flex-column mx-3 mb-4 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "",
      id: "title"
    }, "Let's get you logged in!"), /*#__PURE__*/React.createElement("h2", {
      class: "",
      id: "subTitle"
    }), /*#__PURE__*/React.createElement("div", {
      class: "row my-3 h-100 text-center align-items-start justify-content-around",
      id: "form-table"
    }, /*#__PURE__*/React.createElement("form", {
      class: "col-sm-5 mx-3",
      id: "login-form"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-align"
    }, /*#__PURE__*/React.createElement("u", null, " Existing Account ")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "login-username"
    }, " Username: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "login-username"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "login-password"
    }, " Password "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      class: "form-control",
      id: "login-password"
    })), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      class: "btn btn-light",
      id: "submit-login",
      onClick: this.handleButton
    }, " Submit "), /*#__PURE__*/React.createElement("p", {
      id: "login-status"
    })), /*#__PURE__*/React.createElement("div", {
      class: "vert-divider d-none d-sm-block"
    }), /*#__PURE__*/React.createElement("div", {
      class: "sub-divider d-block d-sm-none"
    }), /*#__PURE__*/React.createElement("form", {
      class: "col-sm-5 mx-3",
      id: "register-form"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-align"
    }, /*#__PURE__*/React.createElement("u", null, " Register New Account ")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "register-username"
    }, " Username (six characters minimum): "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "register-username"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "register-password"
    }, " Password (ten characters minimum): "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      class: "form-control",
      id: "register-password"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "register-password-confirm"
    }, " Confirm Password: "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      class: "form-control",
      id: "register-password-confirm"
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light",
      id: "submit-reg",
      onClick: this.handleButton
    }, " Submit "), /*#__PURE__*/React.createElement("p", {
      id: "reg-status"
    }))));
  }

}

export default Auth;