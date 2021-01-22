const Profile = () => {
  function stateDropdown(form) {
    let stateList = [["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"]];
    return /*#__PURE__*/React.createElement("select", {
      id: `${form}-state-select`,
      class: "form-control"
    }, stateList.map((arrayVal, ind) => /*#__PURE__*/React.createElement("option", {
      key: ind,
      value: arrayVal[0]
    }, arrayVal[1])));
  }

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
  }, "State", stateDropdown('s'))), /*#__PURE__*/React.createElement("div", {
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
  }, "State", stateDropdown('p'))), /*#__PURE__*/React.createElement("div", {
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
};

export default Profile;