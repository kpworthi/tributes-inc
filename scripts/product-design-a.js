class DesignBio extends React.Component {
  constructor(props) {
    super(props);
    this.content = props.dbEntry;
    this.preview = true;
    this.palette = {
      "classic": {
        nav: '#7E4A35',
        page: '#dbceb0',
        container: '#cab577',
        content: '#D4C391'
      },
      "cool": {
        nav: '#667292',
        page: '#F1E3DD',
        container: '#8D9DB6',
        content: '#BCCAD6'
      },
      "warm": {
        nav: '#B04517',
        page: '#F2E394',
        container: '#F2AE72',
        content: '#F4E1D2'
      }
    };
    this.loadPalette = this.loadPalette.bind(this);
    this.renderBio = this.renderBio.bind(this);
  }

  componentDidMount() {
    this.loadPalette('classic');
    if (this.preview) $('#color-select').on("change", () => {
      this.loadPalette($('#color-select option:selected')[0].value);
    });
  }

  componentWillUnmount() {
    this.loadPalette('classic');
  }

  loadPalette(palette) {
    $('.navbar').css('background-color', this.palette[palette].nav);
    $('.nav-link').css('border', `1px solid ${this.palette[palette].nav}`);
    $('body').css('background-color', this.palette[palette].page);
    $('.main-area').css('background-color', this.palette[palette].container);
    $('.inset').css('background-color', this.palette[palette].content);
  }

  renderBio() {
    console.log(this.content);
    let bioText = this.content.bio;
    return /*#__PURE__*/React.createElement("div", {
      id: "bio-text"
    }, bioText.map((para, index) => /*#__PURE__*/React.createElement("p", {
      key: `para${index + 1}`
    }, para)));
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      id: "design-a-component",
      class: "mx-3 px-sm-3 px-1 main-area"
    }, /*#__PURE__*/React.createElement("div", {
      id: "top-block",
      class: "row mx-0 my-2 px-sm-5 py-1 justify-content-center rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      id: "title-area",
      class: "d-flex flex-column justify-content-center col-lg-5"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "name"
    }, "Tributee's Name"), /*#__PURE__*/React.createElement("input", {
      id: "name",
      type: "text",
      class: "form-control",
      placeholder: "Name (Required)",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "sub-title"
    }, "Sub-title"), /*#__PURE__*/React.createElement("input", {
      id: "sub-title",
      type: "text",
      class: "form-control",
      placeholder: "Sub-title (Optional)"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "picture-area",
      class: "d-flex flex-column justify-content-center col-lg-5"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "img"
    }, "Image link"), /*#__PURE__*/React.createElement("input", {
      id: "img",
      type: "text",
      class: "form-control",
      placeholder: "https://example.com/img.jpg (Required)",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement("input", {
      id: "caption",
      type: "text",
      class: "form-control",
      placeholder: "Caption (Required)",
      required: true
    })))), /*#__PURE__*/React.createElement("div", {
      id: "bottom-block",
      class: "row mx-0 mt-3 justify-content-center rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      id: "text-wrapper",
      class: "col-12 col-lg-10 text-justify"
    }, /*#__PURE__*/React.createElement("div", {
      class: "d-flex flex-column align-items-center text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group w-75"
    }, /*#__PURE__*/React.createElement("label", {
      for: "quote"
    }, "Quote about or from your tributee"), /*#__PURE__*/React.createElement("input", {
      id: "quote",
      type: "text",
      class: "form-control",
      placeholder: "Quote (Optional)"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group w-50"
    }, /*#__PURE__*/React.createElement("label", {
      for: "author"
    }, "Author of the quote"), /*#__PURE__*/React.createElement("input", {
      id: "author",
      type: "text",
      class: "form-control",
      placeholder: "Author (Optional)"
    }))), /*#__PURE__*/React.createElement("div", {
      class: "form-group text-center"
    }, /*#__PURE__*/React.createElement("label", {
      for: "color-select"
    }, "Choose a color scheme: "), /*#__PURE__*/React.createElement("select", {
      id: "color-select"
    }, /*#__PURE__*/React.createElement("option", {
      value: "classic",
      selected: "true"
    }, "Tributes Classic"), /*#__PURE__*/React.createElement("option", {
      value: "cool"
    }, "Tributes Cool "), /*#__PURE__*/React.createElement("option", {
      value: "warm"
    }, "Tributes Warm "))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "bio"
    }, "Biography Text"), /*#__PURE__*/React.createElement("textarea", {
      id: "bio",
      class: "form-control",
      placeholder: "Enter the main text of your tribute here (Required)"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "link"
    }, "External Link"), /*#__PURE__*/React.createElement("input", {
      id: "link",
      type: "text",
      class: "form-control",
      placeholder: "Enter a link for more information (Optional)"
    })))), /*#__PURE__*/React.createElement("div", {
      id: "lower-buffer",
      style: {
        "height": "100px"
      }
    }));
  }

}

export default DesignBio;