class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      tributeList: [{
        "name": 'Hang in there while we get some things together....'
      }]
    };
    this.getList = this.getList.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    $.post("/api/list", {
      "type": "directory"
    }).done(response => {
      this.setState({
        tributeList: response
      });
    }).fail(function (err) {
      console.log(' Directory HTTP request failed. ');
      return 'An error occurred during the request, please try again.';
    });
  }

  renderList() {
    let tributeList = this.state.tributeList;
    return /*#__PURE__*/React.createElement("div", {
      id: "list-area",
      class: "d-flex flex-column align-items-center text-center"
    }, tributeList[0].name.startsWith('Hang') ? /*#__PURE__*/React.createElement("p", null, tributeList[0].name) : tributeList.map(value => /*#__PURE__*/React.createElement("a", {
      key: value.name,
      class: "tribute-link",
      href: `#${value.name.toLowerCase().split(' ').join('-')}`
    }, value.name)));
  }

  render() {
    let List = this.renderList;
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
    }), /*#__PURE__*/React.createElement(List, null));
  }

}

export default Directory;