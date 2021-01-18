const ConfirmModal = ({
  text,
  btnYes,
  btnNo,
  clickHandler
}) => {
  return /*#__PURE__*/React.createElement("div", {
    id: "modal-overlay",
    class: "d-flex align-items-center justify-content-center modal-bg"
  }, /*#__PURE__*/React.createElement("div", {
    id: "modal-box",
    class: "p-3 text-justify modal-box"
  }, /*#__PURE__*/React.createElement("p", {
    id: "modal-text",
    class: "h2"
  }, text), /*#__PURE__*/React.createElement("div", {
    class: "btn-group"
  }, /*#__PURE__*/React.createElement("button", {
    id: "modal-yes",
    type: "button",
    class: "btn btn-warning",
    onClick: clickHandler
  }, btnYes), btnNo ? /*#__PURE__*/React.createElement("button", {
    id: "modal-no",
    type: "button",
    class: "btn btn-success",
    onClick: clickHandler
  }, btnNo) : null)));
};

export default ConfirmModal;