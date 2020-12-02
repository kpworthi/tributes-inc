class Auth extends React.Component {
  constructor() {
    super();
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
      class: "btn btn-light"
    }, " Submit ")), /*#__PURE__*/React.createElement("div", {
      class: "vert-divider d-none d-sm-block"
    }), /*#__PURE__*/React.createElement("div", {
      class: "sub-divider d-block d-sm-none"
    }), /*#__PURE__*/React.createElement("form", {
      class: "col-sm-5 mx-3",
      id: "login-form"
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
      type: "submit",
      class: "btn btn-light"
    }, " Submit "))));
  }

}

export default Auth;