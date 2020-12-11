class Account extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username || 'user';
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "account-area",
      class: "mx-3 mb-4 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "text-center",
      id: "title"
    }, "Welcome, ", this.username, "!"), /*#__PURE__*/React.createElement("h2", {
      class: "text-center",
      id: "subTitle"
    }, "Please choose an option below"), /*#__PURE__*/React.createElement("div", {
      class: "row justify-content-center mt-5",
      id: "option-tabs"
    }, /*#__PURE__*/React.createElement("button", {
      class: "btn btn-light mx-3"
    }, "Profile"), /*#__PURE__*/React.createElement("button", {
      class: "btn btn-light mx-3"
    }, "Payment Information"), /*#__PURE__*/React.createElement("button", {
      class: "btn btn-light mx-3"
    }, "Payment History"), /*#__PURE__*/React.createElement("button", {
      class: "btn btn-light mx-3"
    }, "Your Content")), /*#__PURE__*/React.createElement("div", {
      class: "border mx-2 mt-2",
      id: "option-content"
    }, /*#__PURE__*/React.createElement("p", null, "Here's where your stuff would display")));
  }

}

export default Account;