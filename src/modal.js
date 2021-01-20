const ConfirmModal = ({ text, btnYes, btnNo, clickHandler }) => {
  return (
    <div id="modal-overlay" class="d-flex align-items-center justify-content-center modal-bg">
      <div id="modal-box" class="p-3 text-justify modal-box">
        <p id="modal-text" class="h2">{text}</p>
        <div class="btn-group">
          <button id="modal-yes" type="button" class="btn btn-warning" onClick={clickHandler}>{btnYes}</button>
          {btnNo?<button id="modal-no" type="button" class="btn btn-success" onClick={clickHandler}>{btnNo}</button>:null}
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;
