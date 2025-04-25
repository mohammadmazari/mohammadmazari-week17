import React from 'react';
import { useContacts } from '../context/ContactContext';

const Modal = () => {
  const { state, dispatch } = useContacts();

  if (!state.isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">{state.modalContent.title}</h3>
        <p className="mb-6">{state.modalContent.message}</p>
        <div className="flex justify-end gap-2">
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
