class TemplateB extends React.Component {
  constructor() {
    super();
    this.content = {
      name: "Your Tribute's Name",
      tagline: "A fitting sub-heading for your tribute (optional)",
      img: "../img/test-house.jpg",
      caption: "Your tribute's humble beginnings",
      quote: "Here is a quote about this person and something that made them wonderful (optional)",
      author: "Someone that knew them (also optional)",
      timeline: [[1981, 'This would be the First event on the list'], [1983, "The Second event of your tribute's timeline would go here and look like this"], [1984, 'A relatively uneventful Third event'], [1986, 'A wholesome Fourth event'], [1990, 'A Fifth event'], [1992, 'Sixth event, this one is a bit long to check how the text fills out the container it is in, as well as how the rest of the bullets react to it. With the larger amount of text, we can get a good feel for how everything around it will react.'], [1994, 'A plain old Seventh event'], [1997, 'The Eighth event'], [1999, 'The unexpected Ninth event'], [2000, 'Some kind of action worth recording for a tenth event'], [2002, 'Occurrences which befit the penultimate date, the Eleventh event'], [2003, 'The Twelfth and final event on the timeline, though not the maximum number of events you could display']],
      link: '#'
    };
    this.renderTimeline = this.renderTimeline.bind(this);
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
    return /*#__PURE__*/React.createElement("div", {
      id: "template-b-component",
      class: "mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around"
    }, /*#__PURE__*/React.createElement("div", {
      id: "left-block",
      class: "d-flex flex-column col-lg-6 rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      id: "title-area",
      class: "text-center"
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
    }), /*#__PURE__*/React.createElement("figcaption", null, this.content.caption))), /*#__PURE__*/React.createElement("div", {
      id: "right-block",
      class: "d-flex flex-column col-lg-6 rounded inset"
    }, this.content.quote && this.content.author ? /*#__PURE__*/React.createElement("blockquote", {
      class: "blockquote text-center"
    }, /*#__PURE__*/React.createElement("p", {
      class: "mb-0"
    }, this.content.quote), /*#__PURE__*/React.createElement("footer", {
      class: "blockquote-footer"
    }, this.content.author)) : null, /*#__PURE__*/React.createElement(Timeline, null), /*#__PURE__*/React.createElement("a", {
      href: this.content.link
    }, "  Click here to learn more about [Your Tribute's Name] (Optional)")));
  }

}

export default TemplateB;