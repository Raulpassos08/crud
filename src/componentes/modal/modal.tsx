import React from "react";
import "./modal.css"; // Criaremos este arquivo CSS em seguida.

interface ModalProps {
  children: React.ReactNode; // O conteúdo a ser exibido no modal
  onClose: () => void; // Função para fechar o modal
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
