class TemplateA extends React.Component {
  constructor(props) {
    super(props);
    this.content = props.dbEntry;
    this.preview = this.content.name === "Your Tribute's Name" ? true : false;
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
    this.colorPreviewer = this.colorPreviewer.bind(this);
    this.loadPalette = this.loadPalette.bind(this);
    this.renderBio = this.renderBio.bind(this);
  }

  componentDidMount() {
    this.loadPalette(this.content.palette);
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

  colorPreviewer() {
    return /*#__PURE__*/React.createElement("select", {
      id: "color-select"
    }, /*#__PURE__*/React.createElement("option", {
      value: "default",
      disabled: "true",
      selected: "true"
    }, "Preview a color scheme"), /*#__PURE__*/React.createElement("option", {
      value: "classic"
    }, "Tributes Classic"), /*#__PURE__*/React.createElement("option", {
      value: "cool"
    }, "Tributes Cool   "), /*#__PURE__*/React.createElement("option", {
      value: "warm"
    }, "Tributes Warm "));
  }

  renderBio() {
    let bioText = this.content.bio;
    return /*#__PURE__*/React.createElement("div", {
      id: "bio-text"
    }, bioText.map((para, index) => /*#__PURE__*/React.createElement("p", {
      key: `para${index + 1}`
    }, para)));
  }

  render() {
    let Bio = this.renderBio;
    return /*#__PURE__*/React.createElement("div", {
      id: "template-a-component",
      class: "mx-3 px-sm-3 px-1 main-area"
    }, /*#__PURE__*/React.createElement("div", {
      id: "top-block",
      class: "row mx-0 my-2 px-sm-5 py-1 justify-content-center rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      id: "title-area",
      class: "d-flex flex-column justify-content-center col-lg-5 text-center"
    }, /*#__PURE__*/React.createElement("h1", null, this.content.name), this.content.tagline ? /*#__PURE__*/React.createElement("p", {
      class: "h2"
    }, this.content.tagline) : null), /*#__PURE__*/React.createElement("figure", {
      id: "picture-area",
      class: "d-flex flex-column justify-content-center col-lg-5"
    }, /*#__PURE__*/React.createElement("img", {
      src: this.content.img,
      class: "rounded border template-a-pic"
    }), /*#__PURE__*/React.createElement("figcaption", {
      class: "text-center"
    }, this.content.caption))), /*#__PURE__*/React.createElement("div", {
      id: "bottom-block",
      class: "row mx-0 mt-3 justify-content-center rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      id: "text-wrapper",
      class: "col-12 col-lg-10 text-justify"
    }, this.content.quote && this.content.author ? /*#__PURE__*/React.createElement("blockquote", {
      class: "blockquote text-center"
    }, /*#__PURE__*/React.createElement("p", {
      class: "mb-0"
    }, this.content.quote), /*#__PURE__*/React.createElement("footer", {
      class: "blockquote-footer"
    }, this.content.author), this.preview ? this.colorPreviewer() : null) : null, /*#__PURE__*/React.createElement(Bio, null), this.content.link ? /*#__PURE__*/React.createElement("a", {
      href: this.content.link
    }, `Click here to learn more about ${this.preview ? "[Your Tribute's Name] (Optional)" : this.content.name}`) : null)), /*#__PURE__*/React.createElement("div", {
      id: "lower-buffer",
      style: {
        "height": "100px"
      }
    }));
  }

}

export default TemplateA;