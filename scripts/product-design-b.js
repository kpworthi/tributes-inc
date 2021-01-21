class DesignTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username;
    this.dbEntry = props.dbEntry;
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
    this.fillTextFields = this.fillTextFields.bind(this);
    this.loadPalette = this.loadPalette.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.loadPalette('classic');
    $('#palette').on("change", () => {
      this.loadPalette($('#palette option:selected')[0].value);
    });
    $('#save-btn').click(this.submitHandler); // if we're editing an existing tribute, fill applicable fields

    if (this.dbEntry) this.fillTextFields();
  }

  componentWillUnmount() {
    this.loadPalette('classic');
  }

  fillTextFields() {
    let keys = Object.keys(this.dbEntry);
    keys.forEach(value => {
      let fieldText = ''; //re-build the timeline

      if (value === 'bio') {
        fieldText = this.dbEntry[value].join('\r\n');
      } else fieldText = this.dbEntry[value];

      $(`#${value}`).val(fieldText);
    });
  }

  loadPalette(palette) {
    $('.navbar').css('background-color', this.palette[palette].nav);
    $('.nav-link').css('border', `1px solid ${this.palette[palette].nav}`);
    $('body').css('background-color', this.palette[palette].page);
    $('.main-area').css('background-color', this.palette[palette].container);
    $('.inset').css('background-color', this.palette[palette].content);
  }

  loadTimelineFields() {
    let fieldList = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    return fieldList.map((field, index) => {
      let elementId = `${index + 1}`;
      let placeholder = `Enter an event ${index > 2 ? '(Optional)' : '(Required)'}`;
      return /*#__PURE__*/React.createElement("div", {
        class: "form-row"
      }, /*#__PURE__*/React.createElement("div", {
        class: "form-group col-2"
      }, /*#__PURE__*/React.createElement("label", {
        for: `year${elementId}`
      }, "Year ", elementId), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: `year${elementId}`,
        name: `year${elementId}`,
        class: "form-control timeline",
        required: index < 3 ? true : null,
        placeholder: "Year"
      })), /*#__PURE__*/React.createElement("div", {
        class: "form-group col-9"
      }, /*#__PURE__*/React.createElement("label", {
        for: `event${elementId}`
      }, "Event ", elementId), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: `event${elementId}`,
        name: `event${elementId}`,
        class: "form-control timeline",
        required: index < 3 ? true : null,
        placeholder: placeholder
      })));
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let submit = $('#save-btn')[0];
    let submitStatus = $('#submit-status')[0];
    submit.disabled = true;
    let buttonTimeout = setTimeout(() => {
      submit.disabled = false;
      return submitStatus.textContent = 'An error occurred during submission, please try again.';
    }, 4000);
    let validSubmission = true;

    for (let i = 1; i < 16; i++) {
      let yearObj = $(`#year${i}`),
          eventObj = $(`#event${i}`),
          yearValue = $(`#year${i}`).val(),
          eventValue = $(`#event${i}`).val(); // make sure year and event fields are filled out as pairs

      if ((!yearValue || !eventValue) && yearValue !== eventValue) {
        if (!yearValue) yearObj.css('border', '2px solid red');else eventObj.css('border', '2px solid red');
        validSubmission = false;
      } // also check that years are numbers only
      else if (!yearValue.match(/^\d+$/) && yearValue !== '') {
          yearObj.css('border', '2px solid red');
          validSubmission = false;
        } // clear any field highlighting otherwise
        else {
            yearObj.css('border', 'none');
            eventObj.css('border', 'none');
          }
    } // make sure all require fields are filled


    $(':required').each(function () {
      if ($(this).val() === '') {
        $(this).css('border', '2px solid red');
        validSubmission = false;
      } else $(this).css('border', 'none');
    }); // make sure either both or none of quote/author are filled out

    if ($('#quote').val() && !$('#author').val() || $('#author').val() && !$('#quote').val()) {
      $('#quote').css('border', '2px solid red');
      $('#author').css('border', '2px solid red');
      validSubmission = false;
    } else {
      $('#quote').css('border', 'none');
      $('#author').css('border', 'none');
    }

    if (validSubmission) {
      $('#submit-status').text('Saving...'); // when editing an existing tribute

      if (this.dbEntry) {
        $.ajax({
          "type": "PUT",
          "url": '/api/design',
          "data": $("#design-b-component").serialize(),
          "success": response => {
            if (response === 'Tribute successfully updated.') {
              setTimeout(() => {
                location.hash = "#account";
              }, 2000);
              clearTimeout(buttonTimeout);
              submit.disabled = true;
              return submitStatus.textContent = response;
            } else {
              clearTimeout(buttonTimeout);
              submit.disabled = false;
              return submitStatus.textContent = response;
            }
          },
          "fail": response => {
            console.log(' Tribute save HTTP request failed. ');
            submit.disabled = false;
            clearTimeout(buttonTimeout);
            return submitStatus.textContent = 'An error occurred during submission, please try again.';
          }
        });
      } // when creating a new tribute
      else {
          $.post("/api/design", $("#design-b-component").serialize()).done(response => {
            if (response === 'Success! Tribute saved.') {
              setTimeout(() => {
                location.hash = "#account";
              }, 2000);
              clearTimeout(buttonTimeout);
              submit.disabled = true;
              return submitStatus.textContent = response;
            } else {
              clearTimeout(buttonTimeout);
              submit.disabled = false;
              return submitStatus.textContent = response;
            }
          }).fail(function (err) {
            console.log(' Tribute save HTTP request failed. ');
            submit.disabled = false;
            clearTimeout(buttonTimeout);
            return submitStatus.textContent = 'An error occurred during submission, please try again.';
          });
        }
    } else {
      $('#submit-status').text('Please be sure to fill out all required fields properly!');
      submit.disabled = false;
      clearTimeout(buttonTimeout);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      id: "design-b-component",
      class: "mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around"
    }, /*#__PURE__*/React.createElement("div", {
      id: "left-block",
      class: "d-flex flex-column col-lg-6 justify-content-center rounded inset text-center"
    }, /*#__PURE__*/React.createElement("h1", {
      class: "text-center"
    }, "Build a Timeline Tribute"), /*#__PURE__*/React.createElement("div", {
      id: "title-area"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "name"
    }, "Tributee's Name"), /*#__PURE__*/React.createElement("input", {
      id: "name",
      name: "name",
      type: "text",
      class: "form-control",
      placeholder: "Name (Required)",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "tagline"
    }, "Sub-title"), /*#__PURE__*/React.createElement("input", {
      id: "tagline",
      name: "tagline",
      type: "text",
      class: "form-control",
      placeholder: "Sub-title (Optional)"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "img-area",
      class: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "img"
    }, "Image link"), /*#__PURE__*/React.createElement("input", {
      id: "img",
      name: "img",
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
      name: "caption",
      type: "text",
      class: "form-control",
      placeholder: "Caption (Required)",
      required: true
    })))), /*#__PURE__*/React.createElement("div", {
      id: "right-block",
      class: "d-flex flex-column col-lg-6 rounded inset"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group w-75"
    }, /*#__PURE__*/React.createElement("label", {
      for: "quote"
    }, "Quote about or from your tributee"), /*#__PURE__*/React.createElement("input", {
      id: "quote",
      name: "quote",
      type: "text",
      class: "form-control",
      placeholder: "Quote (Optional)"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group w-50"
    }, /*#__PURE__*/React.createElement("label", {
      for: "author"
    }, "Author of the quote"), /*#__PURE__*/React.createElement("input", {
      id: "author",
      name: "author",
      type: "text",
      class: "form-control",
      placeholder: "Author (Optional)"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group text-center"
    }, /*#__PURE__*/React.createElement("label", {
      for: "palette"
    }, "Choose a color scheme: "), /*#__PURE__*/React.createElement("select", {
      id: "palette",
      class: "ml-3",
      name: "palette"
    }, /*#__PURE__*/React.createElement("option", {
      value: "classic",
      selected: "true"
    }, "Tributes Classic"), /*#__PURE__*/React.createElement("option", {
      value: "cool"
    }, "Tributes Cool "), /*#__PURE__*/React.createElement("option", {
      value: "warm"
    }, "Tributes Warm "))), this.loadTimelineFields(), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "link"
    }, "External Link"), /*#__PURE__*/React.createElement("input", {
      id: "link",
      name: "link",
      type: "text",
      class: "form-control",
      placeholder: "Enter a link for more information (Optional)"
    })), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "username",
      name: "username",
      value: this.username
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "type",
      name: "type",
      value: "TemplateB"
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      id: "save-btn",
      class: "btn btn-success"
    }, "Save Tribute"), /*#__PURE__*/React.createElement("p", {
      id: "submit-status",
      class: ""
    }), /*#__PURE__*/React.createElement("div", {
      id: "lower-inside-buffer",
      style: {
        "min-height": "100px"
      }
    })));
  }

}

export default DesignTimeline;