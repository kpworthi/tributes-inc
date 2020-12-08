class Account extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username || 'user';
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "account",
      class: "mx-3 mb-4 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "",
      id: "title"
    }, "Welcome, ", this.username, "!"), /*#__PURE__*/React.createElement("h2", {
      class: "",
      id: "subTitle"
    }, "Please choose an option below"));
  }

}

export default Account;