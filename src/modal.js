class ConfirmModal {

  constructor (text, btnYes, btnNo, clickHandler) {
    this.modalText    = text;
    this.btnYesText   = btnYes;
    this.btnNoText    = btnNo;
    this.clickHandler = clickHandler;
  }

  outputJSX () {
    return (
      <div id="modal-overlay" class="d-flex align-items-center justify-content-center modal-bg">
        <div id="modal-box" class="p-3 text-justify modal">
          <p id="modal-text" class="h2">{this.modalText}</p>
          <div class="btn-group">
            <button id="modal-yes" type="button" class="btn btn-warning" onClick={this.clickHandler}>{this.btnYesText}</button>
            <button id="modal-no" type="button" class="btn btn-success" onClick={this.clickHandler}>{this.btnNoText}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmModal;
