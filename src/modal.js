class ConfirmModal {

  constructor (text, btnYes, btnNo) {
    this.modalText  = text;
    this.btnYesText = btnYes;
    this.btnNoText  = btnNo;
  }

  render () {
    return (
      <div id="modal-overlay" class="d-flex align-items-center justify-content-center modal-bg">
        <div id="modal-box" class="p-3 text-justify modal">
          <p id="modal-text" class="h2">{this.modalText}</p>
          <div class="btn-group">
            <button type="button" class="btn btn-warning">{this.btnYesText}</button>
            <button type="button" class="btn btn-success">{this.btnNoText}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
