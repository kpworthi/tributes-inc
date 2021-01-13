class ConfirmModal {
  constructor(text, btnYes, btnNo, clickHandler) {
    this.modalText = text;
    this.btnYesText = btnYes;
    this.btnNoText = btnNo;
    this.clickHandler = clickHandler;
  }

  outputJSX() {
    return /*#__PURE__*/React.createElement("div", {
      id: "modal-overlay",
      class: "d-flex align-items-center justify-content-center modal-bg"
    }, /*#__PURE__*/React.createElement("div", {
      id: "modal-box",
      class: "p-3 text-justify modal"
    }, /*#__PURE__*/React.createElement("p", {
      id: "modal-text",
      class: "h2"
    }, this.modalText), /*#__PURE__*/React.createElement("div", {
      class: "btn-group"
    }, /*#__PURE__*/React.createElement("button", {
      id: "modal-yes",
      type: "button",
      class: "btn btn-warning",
      onClick: this.clickHandler
    }, this.btnYesText), /*#__PURE__*/React.createElement("button", {
      id: "modal-no",
      type: "button",
      class: "btn btn-success",
      onClick: this.clickHandler
    }, this.btnNoText))));
  }

}

export default ConfirmModal;