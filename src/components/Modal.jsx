import React, { useEffect, useRef } from "react";
import { useContacts } from "../context/ContactContext";
import { FaRegTrashCan } from "react-icons/fa6";
const Modal = () => {
  const { state, dispatch } = useContacts();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        state.modalContent.onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.modalContent]);

  if (!state.isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/60 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-[13px]"
      >
        <h3 className="text-xl flex justify-between items-center mb-4">
          <span>{state.modalContent.title}</span>
          <span>
            {state.modalContent.icone === "remove" && (
              <FaRegTrashCan color="red" />
            )}
          </span>
        </h3>
        <p className="mb-6">{state.modalContent.message}</p>
        <div className="flex justify-between gap-2">
          <button
            onClick={state.modalContent.onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
          >
            انصراف
          </button>
          <button
            onClick={state.modalContent.onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
