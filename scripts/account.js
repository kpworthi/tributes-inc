class Account extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username || 'user';
    this.state = {
      currentButton: 'profile-btn',
      subOption: 'none'
    };
    this.handleClick = this.handleClick.bind(this);
    this.profileOption = this.profileOption.bind(this);
    this.createOption = this.createOption.bind(this);
    this.stateDropdown = this.stateDropdown.bind(this);
    this.options = {
      'profile': this.profileOption,
      'payment': this.paymentOption,
      'history': this.historyOption,
      'content': this.contentOption,
      'create': this.createOption
    };
    this.productOptions = ['default', 'design', 'templates'];
    this.stateList = [["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"]];
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
      id: "profile-display",
      class: "border p-2"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's your profile information"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container"
    }, /*#__PURE__*/React.createElement("form", {
      id: "profile-info"
    }, /*#__PURE__*/React.createElement("div", {
      id: "personal-info",
      class: "form-row text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("label", {
      for: "first-name"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      id: "first-name",
      type: "text",
      class: "form-control"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("label", {
      for: "last-name"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      id: "last-name",
      type: "text",
      class: "form-control"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("label", {
      for: "email"
    }, "E-mail Address"), /*#__PURE__*/React.createElement("input", {
      id: "email",
      type: "email",
      class: "form-control"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "address-forms",
      class: "row"
    }, /*#__PURE__*/React.createElement("div", {
      id: "shipping-address",
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Default Shipping Address")), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "s-street-one"
    }, "Street Address Line 1"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "s-street-one",
      class: "form-control",
      placeholder: "123 Street Rd."
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "s-street-two"
    }, "Street Address Line 2"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "s-street-two",
      class: "form-control",
      placeholder: "Apt A"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "s-city"
    }, "City"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "s-city",
      class: "form-control",
      placeholder: "City-ville"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "s-state-select"
    }, "State", this.stateDropdown('s'))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "s-zip"
    }, "Zip Code"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "s-zip",
      class: "form-control"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "billing-address",
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Default Billing Address")), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "p-street-one"
    }, "Street Address Line 1"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "p-street-one",
      class: "form-control",
      placeholder: "123 Street Rd."
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "p-street-two"
    }, "Street Address Line 2"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "p-street-two",
      class: "form-control",
      placeholder: "Apt A"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "p-city"
    }, "City"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "p-city",
      class: "form-control",
      placeholder: "City-ville"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "p-state-select"
    }, "State", this.stateDropdown('p'))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "p-zip"
    }, "Zip Code"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "p-zip",
      class: "form-control"
    })))))));
  }

  stateDropdown(form) {
    return /*#__PURE__*/React.createElement("select", {
      id: `${form}-state-select`,
      class: "form-control"
    }, this.stateList.map((arrayVal, ind) => /*#__PURE__*/React.createElement("option", {
      key: ind,
      value: arrayVal[0]
    }, arrayVal[1])));
  }

  paymentOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "payment-display",
      class: "border p-2"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the payment options you've saved"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container"
    }));
  }

  historyOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "history-display",
      class: "border p-2"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the list of your most recent orders"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container"
    }));
  }

  contentOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "content-display",
      class: "border p-2"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the content you've created"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container"
    }));
  }

  createOption(view = 'default') {
    let subOptions = {
      'default': [['Design: Our Custom Products', 'design', 'Here you’ll find our variety of à la carte products. From our professional tributes to our framed collages, start here to get designing.'], ['Customize: Tiered Packages', 'default', "Thinking about multiple items and want to design and ship everything conveniently? We have three different tier levels to get you what you want."], ['Order: Generic Items', 'default', 'Any items that are offered as an option, as well as any items you might need to refresh or maintain a previous purchase can be found here.']],
      'design': [['Templated Tribute', 'Choose from two different styles of tributes. Layouts are pre-made, and all that is needed is to fill in what you want them to say!'], ['Custom Designed Tribute', 'Feel comfortable with getting into the nitty gritty? Get started with a custom designed tribute to have greater control over content presentation.'], ['T. I. Designed Tribute', 'Interested in a custom look, but want to leave it to someone else? Select a Tributes Inc. designed tribute and we’ll work with you to get you a feel that’s just right.']],
      'templates': [['Templated Biography Tribute', 'A pre-designed tribute template that is used for large amounts of text in a biography style. Note: Users are able to create up to two templated tributes for free'], ['Templated Timeline Tribute', 'A pre-designed tribute template that is used for smaller amounts of text in a timeline style. Note: Users are able to create up to two templated tributes for free']]
    };
    let productDisplay = [];

    for (let each of subOptions['default']) {
      productDisplay.push(this.returnCard(...each));
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "create-display",
      class: "border p-2"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Create or Buy"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container",
      class: "d-flex flex-wrap justify-content-center"
    }, productDisplay));
  }

  returnCard(title, linkId, text) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: linkId,
      class: "card mx-3 my-2",
      style: {
        "width": "18rem"
      }
    }, /*#__PURE__*/React.createElement("h5", {
      class: "card-title text-center"
    }, title), /*#__PURE__*/React.createElement("svg", {
      class: "bd-placeholder-img card-img-top",
      width: "100%",
      height: "180",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid slice",
      focusable: "false",
      role: "img",
      "aria-label": "Placeholder: Preview Image"
    }, /*#__PURE__*/React.createElement("title", null, "Placeholder"), /*#__PURE__*/React.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: "#868e96"
    }), /*#__PURE__*/React.createElement("text", {
      x: "50%",
      y: "50%",
      fill: "#dee2e6",
      dy: ".3em"
    }, "Coming soon")), /*#__PURE__*/React.createElement("div", {
      class: "card-body"
    }, /*#__PURE__*/React.createElement("p", {
      class: "card-text"
    }, text)));
  }

  render() {
    let Option = this.options[this.state.currentButton.split('-')[0]];
    if (this.state.currentButton !== 'create-btn' && this.state.subOption !== 'none') this.setState({
      subOption: 'none'
    });
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
    }, "Your Content"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm",
      id: "create-btn"
    }, "Create or Buy")), /*#__PURE__*/React.createElement("div", {
      class: "mx-2 mt-2",
      id: "option-content"
    }, /*#__PURE__*/React.createElement(Option, null)));
  }

}

export default Account;