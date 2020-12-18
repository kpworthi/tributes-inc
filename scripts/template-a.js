class TemplateA extends React.Component {
  constructor() {
    super();
    this.content = {
      name: "Your Tribute's Name",
      tagline: "A fitting sub-heading for your tribute (optional)",
      img: "../img/test-house.jpg",
      caption: "Your tribute's humble beginnings",
      quote: "Here is a quote about this person and something that made them wonderful (optional)",
      author: "Someone that knew them (also optional)",
      bio: ["  Use this area to talk about the person you are dedicating this tribute to. You can type as much content as you might want so that you can fill out the page entirely. If you type enough text, a scroll bar will appear to make sure there is a way to view everything that you've entered. Don't worry about typign too much, this is your space to do with as you please! We've entered some additional filler text below to show how the space fills out.", "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo  re magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Tristique nulla aliquet enim tortor at auctor urna nunc id. Leo in vitae turpis massa sed. Purus sit amet volutpat consequat mauris nunc congue nisi vitae. Et odio pellentesque diam volutpat commodo sed. Lectus sit amet est placerat in egestas erat imperdiet. Elementum sagittis vitae et leo duis ut. Sed risus ultricies tristique nulla aliquet enim. Arcu cursus vitae congue mauris rhoncus. Egestas sed tempus urna et pharetra pharetra. Nibh mauris cursus mattis molestie a. Consectetur purus ut faucibus pulvinar elementum. Interdum consectetur libero id faucibus nisl. Ultricies tristique nulla aliquet enim. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Nullam non nisi est sit amet facilisis magna etiam. Et ligula ullamcorper malesuada proin libero. Arcu dictum varius duis at. In ornare quam viverra orci sagittis.", "  Blandit massa enim nec dui nunc mattis. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Laoreet suspendisse interdum consectetur libero id faucibus. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Iaculis at erat pellentesque adipiscing commodo elit at. Enim sed faucibus turpis in. Egestas fringilla phasellus faucibus scelerisque. Velit aliquet sagittis id consectetur. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Sed odio morbi quis commodo. Dapibus ultrices in iaculis nunc sed augue lacus. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Placerat orci nulla pellentesque dignissim enim sit amet. Ultrices in iaculis nunc sed augue lacus viverra. Duis at consectetur lorem donec. Odio tempor orci dapibus ultrices in iaculis nunc sed augue.", "  At the bottom, we can even include a link to additional information, if you'd like. It would look like this:"],
      link: '#'
    };
    this.renderBio = this.renderBio.bind(this);
  }

  componentDidMount() {}

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
    }, this.content.author)) : null, /*#__PURE__*/React.createElement(Bio, null), /*#__PURE__*/React.createElement("a", {
      href: this.content.link
    }, "  Click here to learn more about [Your Tribute's Name] (Optional)"))), /*#__PURE__*/React.createElement("div", {
      id: "lower-buffer",
      style: {
        "height": "100px"
      }
    }));
  }

}

export default TemplateA;