import ConfirmModal from '../scripts/modal.js';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username || 'user';
    this.state = {
      contentList: [{
        "name": 'Hang in there while we get some things together....'
      }],
      currentTab: 'profile-tab',
      subOption: 'default'
    };
    this.manageMode = 'none';
    this.loadPage = props.loadPage;
    this.updateModalState = props.updateModalState;
    this.handleClick = this.handleClick.bind(this);
    this.profileOption = this.profileOption.bind(this);
    this.contentOption = this.contentOption.bind(this);
    this.createOption = this.createOption.bind(this);
    this.stateDropdown = this.stateDropdown.bind(this);
    this.getContentList = this.getContentList.bind(this);
    this.renderContentList = this.renderContentList.bind(this);
    this.options = {
      'profile': this.profileOption,
      'payment': this.paymentOption,
      'history': this.historyOption,
      'content': this.contentOption,
      'create': this.createOption
    };
    this.contentTypes = {
      'TemplateA': 'Digital Tribute: Template A (Biography)',
      'TemplateB': 'Digital Tribute: Template B (Timeline)',
      'Customized': 'Digital Tribute: Custom-made by You',
      'Professional': 'Digital Tribute: Designed by Tributes Inc'
    };
    this.subOptions = {
      'default': [['Design: Our Custom Products', 'design', "./img/design-prev.png", 'Here you’ll find our variety of à la carte products. From our professional tributes to our framed collages, start here to get designing.'], ['Customize: Tiered Packages', 'default', "", "Thinking about multiple items and want to design and ship everything conveniently? We have three different tier levels to get you what you want."], ['Order: Generic Items', 'default', "", 'Any items that are offered as an option, as well as any items you might need to refresh or maintain a previous purchase can be found here.']],
      'design': [['Templated Tribute', 'templates', "./img/templates-prev.png", 'Choose from two different styles of tributes. Layouts are pre-made, and all that is needed is to fill in what you want them to say!'], ['Custom Designed Tribute', 'design', "", 'Feel comfortable with getting into the nitty gritty? Get started with a custom designed tribute to have greater control over content presentation.'], ['T. I. Designed Tribute', 'design', "", 'Interested in a custom look, but want to leave it to someone else? Select a Tributes Inc. designed tribute and we’ll work with you to get you a feel that’s just right.'], ['Physical Designs', 'design', "", "Here you'll find our physical offerings, for when you want something to have in your home or another place of prominence"]],
      'templates': [['Templated Biography Tribute', 'product-design-a', "./img/temp-a-prev.png", 'A pre-designed tribute template that is used for large amounts of text in a biography style. Note: Users are able to create up to two templated tributes for free'], ['Templated Timeline Tribute', 'product-design-b', "./img/temp-b-prev.png", 'A pre-designed tribute template that is used for smaller amounts of text in a timeline style. Note: Users are able to create up to two templated tributes for free']]
    };
    this.stateList = [["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"]];
  }

  componentDidMount() {
    this.getContentList();
    $('.option').click(this.handleClick);
  }

  handleClick(event) {
    let clickedButton = event.currentTarget;
    console.log(clickedButton.id);
    event.stopPropagation(); // if clicking on a main tab

    if (clickedButton.id.includes('tab')) {
      // unset the current button as active, change state to re-render
      // activate current button
      $(`#${this.state.currentTab}`).toggleClass('active');
      this.setState({
        currentTab: event.target.id,
        subOption: 'default'
      }, () => $(`#${this.state.currentTab}`).toggleClass('active'));
    } // if clicking on a card
    else if (clickedButton.classList.contains('card')) {
        // if it's a product card, take to the product page
        if (clickedButton.id.includes('product')) {
          location.hash = `#${clickedButton.id}`;
        } // otherwise set state to re-render and load new cards
        else {
            this.setState({
              subOption: clickedButton.id
            });
          }
      } // if doing admin actions
      else if (clickedButton.id.startsWith('db')) {
          if (clickedButton.id === 'db-add-btn') {
            $.post('/api/admin', {}).done(response => {
              console.log(response);
            }).fail();
          } else if (clickedButton.id === 'db-rem-btn') {
            $.ajax({
              "type": "DELETE",
              "url": '/api/admin',
              "success": response => {
                console.log(response);
              }
            });
          }
        } // tribute modification
        else if (clickedButton.id.startsWith('t-')) {
            let buttonType = clickedButton.id.split('-')[1],
                buttonIndex = clickedButton.id.split('-')[2];
            console.log(`${buttonType} button pushed`);
            this.manageMode = `${buttonType}-${buttonIndex}`;
            this.updateModalState(`Are you sure you want to ${buttonType} the tribute for ${$(`#link-${buttonIndex}`).text()}`, `Yes, ${buttonType}`, `No, don't ${buttonType}`, this.handleClick);
          } // modal handling
          else if (clickedButton.id.startsWith('modal')) {
              let modeType = this.manageMode.split('-')[0];

              if (modeType === 'edit') {// do nothing for now, will go to designer page with filled in info for resubmission
              } else if (modeType === 'hide' || modeType === 'show' || modeType === 'delete') {
                switch (clickedButton.id) {
                  case 'modal-yes':
                    $.ajax({
                      "type": modeType === 'delete' ? "DELETE" : "PUT",
                      "url": '/api/design',
                      "data": {
                        userName: this.username,
                        tributeName: $(`#link-${this.manageMode.split('-')[1]}`).text(),
                        editType: modeType === 'delete' ? null : modeType
                      },
                      "success": response => {
                        this.getContentList();
                        this.updateModalState(response, 'Got it', null, this.handleClick);
                      },
                      "fail": response => {
                        console.log(`Something went wrong with the HTTP request!`);
                      }
                    });
                    break;

                  case 'modal-no':
                    break;
                }
              }

              this.manageMode = 'none';
              this.updateModalState();
            }
  }

  profileOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "profile-display",
      class: "border p-2 acct-cont"
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
    })))), /*#__PURE__*/React.createElement("p", {
      class: "text-right"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-success",
      disabled: true
    }, "Save Info")), /*#__PURE__*/React.createElement("small", {
      id: "emailHelp",
      class: "form-text text-muted text-right"
    }, "Saving personal information is currently disabled."))));
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
      class: "border p-2 acct-cont"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the payment options you've saved"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "payment-list",
      class: "d-flex flex-column align-items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "row justify-content-center w-100"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-5 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-5"
    }, "Name"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-7"
    }, "Type")), /*#__PURE__*/React.createElement("div", {
      class: "col-4 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-8"
    }, "Saved On"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-4"
    }, "Default?")), /*#__PURE__*/React.createElement("b", {
      class: "my-3 col-3"
    })), /*#__PURE__*/React.createElement("p", null, "Nothing to display, yet!")));
  }

  historyOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "history-display",
      class: "border p-2 acct-cont"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's a list of your most recent orders"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "history-list",
      class: "d-flex flex-column align-items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "row justify-content-center w-100"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-5 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-5"
    }, "Name"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-7"
    }, "Type")), /*#__PURE__*/React.createElement("div", {
      class: "col-4 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-8"
    }, "Created On"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-4"
    }, "Status")), /*#__PURE__*/React.createElement("b", {
      class: "my-3 col-3"
    })), /*#__PURE__*/React.createElement("p", null, "Nothing to display, yet!")));
  }

  contentOption() {
    return /*#__PURE__*/React.createElement("div", {
      id: "content-display",
      class: "border p-2 acct-cont"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Here's the content you've created"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), this.renderContentList());
  }

  getContentList() {
    $.post("/api/list", {
      "type": "user",
      "username": this.username
    }).done(response => {
      this.setState({
        contentList: response
      });
    }).fail(function (err) {
      console.log(' Directory HTTP request failed. ');
      return 'An error occurred during the request, please try again.';
    });
  }

  renderContentList() {
    let contentList = this.state.contentList;
    return /*#__PURE__*/React.createElement("div", {
      id: "content-list",
      class: "d-flex flex-column align-items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "row justify-content-center w-100"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-5 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-5"
    }, "Name"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-7"
    }, "Type")), /*#__PURE__*/React.createElement("div", {
      class: "col-4 row m-0"
    }, /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-8"
    }, "Created On"), /*#__PURE__*/React.createElement("b", {
      class: "my-1 my-lg-3 col-lg-4"
    }, "Approved?")), /*#__PURE__*/React.createElement("b", {
      class: "my-3 col-3"
    })), contentList.length === 0 ? /*#__PURE__*/React.createElement("p", null, "Nothing to display, yet!") : contentList[0].name.startsWith('Hang') ? /*#__PURE__*/React.createElement("p", null, contentList[0].name) : contentList.map((value, index) => /*#__PURE__*/React.createElement("div", {
      class: "row mb-1 align-items-center justify-content-center rounded border border-dark w-100"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-5 row m-0"
    }, /*#__PURE__*/React.createElement("a", {
      id: `link-${index}`,
      key: `link-${index}`,
      class: "tribute-link my-1 col-lg-5",
      href: `#${value.name.toLowerCase().split(' ').join('-')}`
    }, value.name), /*#__PURE__*/React.createElement("p", {
      class: "my-1 col-lg-7"
    }, this.contentTypes[value.type])), /*#__PURE__*/React.createElement("div", {
      class: "col-4 row m-0"
    }, /*#__PURE__*/React.createElement("p", {
      class: "my-2 my-lg-1 col-lg-8"
    }, new Date(value.created_on).toDateString()), /*#__PURE__*/React.createElement("p", {
      class: "my-2 my-lg-1 col-lg-4"
    }, value.approved ? "Yes" : "No")), /*#__PURE__*/React.createElement("div", {
      class: "col-3 row m-0"
    }, /*#__PURE__*/React.createElement("button", {
      id: `t-edit-${index}`,
      type: "button",
      class: "btn btn-primary my-1 p-2 col-lg-4",
      onClick: this.handleClick
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      id: `t-${value.visible ? "hide" : "show"}-${index}`,
      type: "button",
      class: "btn btn-dark my-1 p-2 col-lg-4",
      onClick: this.handleClick
    }, value.visible ? "Hide" : "Show"), /*#__PURE__*/React.createElement("button", {
      id: `t-delete-${index}`,
      type: "button",
      class: "btn btn-danger my-1 p-2 col-lg-4 text-center",
      onClick: this.handleClick
    }, "Delete")))));
  }

  createOption() {
    let productDisplay = [];

    for (let each of this.subOptions[this.state.subOption]) {
      productDisplay.push(this.returnCard(...each));
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "create-display",
      class: "border p-2 acct-cont"
    }, /*#__PURE__*/React.createElement("h3", {
      class: "text-center"
    }, "Create or Buy"), /*#__PURE__*/React.createElement("div", {
      class: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "sub-container",
      class: "d-flex flex-wrap justify-content-center"
    }, productDisplay));
  }

  returnCard(title, linkId, img, text) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: linkId,
      class: "card mx-3 my-2",
      style: {
        "width": "18rem",
        "opacity": img ? "100%" : "70%"
      },
      onClick: this.handleClick,
      disabled: img ? null : "disabled"
    }, /*#__PURE__*/React.createElement("h5", {
      class: "card-title text-center"
    }, title), img ? /*#__PURE__*/React.createElement("img", {
      src: img,
      class: "card-img border border-dark"
    }) : /*#__PURE__*/React.createElement("svg", {
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
    let Option = this.options[this.state.currentTab.split('-')[0]];
    return /*#__PURE__*/React.createElement("div", {
      id: "account-area",
      class: "mx-3 px-sm-3 px-1 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "text-center",
      id: "title"
    }, "Welcome, ", this.username, "!"), /*#__PURE__*/React.createElement("h2", {
      class: "text-center",
      id: "subTitle"
    }, "Please choose an option below"), this.username !== 'theTestaroo' ? null : /*#__PURE__*/React.createElement("div", {
      class: "btn-group"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-danger",
      id: "db-add-btn",
      onClick: this.handleClick
    }, "Add Admin Test Entries"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-danger",
      id: "db-rem-btn",
      onClick: this.handleClick
    }, "Rem Admin Test Entries ")), /*#__PURE__*/React.createElement("div", {
      class: "row justify-content-center mt-5",
      id: "option-tabs"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm option active",
      id: "profile-tab"
    }, "Profile"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm option",
      id: "payment-tab"
    }, "Payment Information"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm option",
      id: "history-tab"
    }, "Payment History"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm option",
      id: "content-tab"
    }, "Your Content"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "btn btn-light mx-3 my-1 my-sm-0 col-sm option",
      id: "create-tab"
    }, "Create or Buy")), /*#__PURE__*/React.createElement("div", {
      class: "mx-2 mt-2 acct-cont",
      id: "option-content"
    }, /*#__PURE__*/React.createElement(Option, null)));
  }

}

export default Account;