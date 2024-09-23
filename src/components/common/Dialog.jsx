import { useState } from 'react';

export default function Dialog(props) {
  return (
    <>
      <button
        className="button font-medium"
        onClick={() => props.setShowModal(true)} 
      >
        {props.buttonName}
      </button>
      {props.showModal && <DialogContent {...props} />}
    </>
  );
}

function DialogContent(props) {
  return (
    <div className="dialog-container">
      <div className="dialog-box">
        <h2>{props.header}</h2>
        <div className="dialog-body">
          {props.body}
        </div>
      </div>
    </div>
  );
}