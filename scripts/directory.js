class Directory extends React.Component {
  constructor() {
    super();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "directory-component",
      class: "mx-3 mb-4 px-sm-3 px-1 main-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "text-center",
      id: "title"
    }, "Tributes Inc. Directory"), /*#__PURE__*/React.createElement("h2", {
      class: "text-center",
      id: "subTitle"
    }, "All the wonderful people we know about"), /*#__PURE__*/React.createElement("div", {
      class: "sub-divider"
    }), /*#__PURE__*/React.createElement("h3", {
      class: "text-center mt-5"
    }, "More to come soon: we're under renovation!"));
  }

}

export default Directory;