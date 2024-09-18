import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={classes.modal_overlay} onClick={onClose}>
      <div
        className={classes.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal_header}>
          <h2>{title || 'Modal Title'}</h2>
          <button className={classes.close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={classes.modal_body}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
