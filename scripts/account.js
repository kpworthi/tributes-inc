class Account extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username || 'user';
    this.state = {
      currentButton: 'profile-btn'
    };
    this.handleClick = this.handleClick.bind(this);
    this.options = {
      'profile': this.profileOption,
      'payment': this.paymentOption,
      'history': this.historyOption,
      'content': this.contentOption
    };
  }

  componentDidMount() {
    $('#account-area').click(this.handleClick);
  }

  handleClick(event) {
    if (event.target.type === 'button') {
      $(`#${this.state.currentButton}`).toggleClass('active');
      this.setState({
        currentButton: event.target.id
      }, () => $(`#${this.state.currentButton}`).toggleClass('active'));
    }
  }

  profileOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "profile-display"
    }, /*#__PURE__*/React.createElement("h3", null, "Here's your profile information"));
  }

  paymentOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "payment-display"
    }, /*#__PURE__*/React.createElement("h3", null, "Here's the payment options you've saved"));
  }

  historyOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "history-display"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the list of your most recent orders"));
  }

  contentOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "content-display"
    }, /*#__PURE__*/React.createElement("h3", null, "Here's the content you've created"));
  }

  render() {
    let Option = this.options[this.state.currentButton.split('-')[0]];
    return /*#__PURE__*/React.createElement("div", {
      id: "account-area",
      class: "mx-3 mb-4 px-sm-3 px-1 main-area"
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
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm active",
      id: "profile-btn"
    }, "Profile"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm",
      id: "payment-btn"
    }, "Payment Information"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm",
      id: "history-btn"
    }, "Payment History"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm",
      id: "content-btn"
    }, "Your Content")), /*#__PURE__*/React.createElement("div", {
      class: "border mx-2 mt-2",
      id: "option-content"
    }, /*#__PURE__*/React.createElement(Option, null)));
  }

}

export default Account;