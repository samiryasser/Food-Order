import React, { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../../Store/UserProgressContext";
const Modal = ({children,open,className=" ",onClose}) => {
  const userProgressCtx = useContext(UserProgressContext);
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    return () => {
      dialog.current.close();
    }
  });
  return (
    <>
      {createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
          {children}
        </dialog>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
