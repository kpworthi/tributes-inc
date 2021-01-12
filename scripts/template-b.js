class TemplateB extends React.Component {
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
    this.renderTimeline = this.renderTimeline.bind(this);
  }

  componentDidMount() {
    this.loadPalette(this.content.palette);

    if (this.preview) {
      $('#color-select').on("change", () => {
        this.loadPalette($('#color-select option:selected')[0].value);
      });
      $('#info-link').click(event => {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }

  componentWillUnmount() {
    this.loadPalette('classic');
  }

  loadPalette(palette) {
    $('.navbar').css('background-color', this.palette[palette].nav);
    $('.nav-link').css('border', `1px solid ${this.palette[palette].nav}`);
    $('body').css('background-color', this.palette[palette].page);
    $('#footer').css('background-color', this.palette[palette].page);
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

  renderTimeline() {
    let timelineInfo = this.content.timeline;
    return /*#__PURE__*/React.createElement("div", {
      id: "timeline-area"
    }, timelineInfo.map((date, index) => /*#__PURE__*/React.createElement("p", {
      key: `date${index + 1}`
    }, /*#__PURE__*/React.createElement("b", null, date[0], ":"), " ", date[1])));
  }

  render() {
    let Timeline = this.renderTimeline;
    return this.content.approved === false ? /*#__PURE__*/React.createElement("div", {
      id: "template-b-component",
      class: "mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around"
    }, /*#__PURE__*/React.createElement("p", {
      class: "text-center"
    }, "Hold on just a bit! This tribute hasn't been approved just yet.")) : /*#__PURE__*/React.createElement("div", {
      id: "template-b-component",
      class: "mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around"
    }, /*#__PURE__*/React.createElement("div", {
      id: "left-block",
      class: "d-flex flex-column col-lg-6 rounded inset text-center"
    }, /*#__PURE__*/React.createElement("div", {
      id: "title-area"
    }, /*#__PURE__*/React.createElement("h1", {
      class: ""
    }, this.content.name), this.content.tagline ? /*#__PURE__*/React.createElement("p", {
      class: "h2"
    }, this.content.tagline) : null), /*#__PURE__*/React.createElement("figure", {
      id: "img-area",
      class: "text-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: this.content.img,
      class: "rounded border template-a-img"
    })), /*#__PURE__*/React.createElement("figcaption", null, this.content.caption)), /*#__PURE__*/React.createElement("div", {
      id: "right-block",
      class: "d-flex flex-column col-lg-6 rounded inset"
    }, this.content.quote && this.content.author ? /*#__PURE__*/React.createElement("blockquote", {
      class: "blockquote mt-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      class: "mb-0"
    }, this.content.quote), /*#__PURE__*/React.createElement("footer", {
      class: "blockquote-footer"
    }, this.content.author), this.preview ? this.colorPreviewer() : null) : null, /*#__PURE__*/React.createElement(Timeline, null), this.content.link ? /*#__PURE__*/React.createElement("a", {
      id: "info-link",
      href: this.content.link
    }, `Click here to learn more about ${this.preview ? "[Your Tribute's Name] (Optional)" : this.content.name}`) : null));
  }

}

export default TemplateB;