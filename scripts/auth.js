class Auth extends React.Component {
  constructor() {
    super();
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(event) {
    let clicked = event.target;

    if (clicked.id === "submit-reg") {
      event.preventDefault();
      let username = $("#register-username")[0].value,
          password = $("#register-password")[0].value,
          passwordConfirm = $("#register-password-confirm")[0].value;

      if (password !== passwordConfirm) {
        $("#reg-status")[0].textContent = 'Passwords entered do not match!';
        return null;
      }

      let submission = $.post('/register', {
        username: username,
        password: password
      }).done(function (response) {
        $("#reg-status")[0].textContent = response;
      }).fail(function (err) {
        console.log(' THERE WAS AN ERROR!!!!!!!!!!!!!!!!! ');
        $("#reg-status")[0].textContent = err;
      });
    } else if (clicked.id === "submit-login") {
      event.preventDefault();
      $("#login-status")[0].textContent = "This doesn't work yet!";
      console.log('Failed log-in.');
    }
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
    }, " Username: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "register-username"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "register-password"
    }, " Password "), /*#__PURE__*/React.createElement("input", {
      type: "password",
      class: "form-control",
      id: "register-password"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "register-password-confirm"
    }, " Confirm Password "), /*#__PURE__*/React.createElement("input", {
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