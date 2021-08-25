import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import ModalContent from "../ModalContent/ModalContent";

const AppModal = ({ children, id }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalContent id={id} />
      </Modal>
    </div>
  );
};

export default AppModal;
