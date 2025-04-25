import React from "react";
import { useContacts } from "../context/ContactContext";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const { state, dispatch } = useContacts();
  const filteredContacts = (state.contacts || []).filter((contact) => {
    if (!contact) return false;
    const searchTerm = (state.searchTerm || "").toLowerCase();
    return (
      (contact.firstName || "").toLowerCase().includes(searchTerm) ||
      (contact.lastName || "").toLowerCase().includes(searchTerm) ||
      (contact.email || "").toLowerCase().includes(searchTerm)
    );
  });

  const handleDeleteSelected = () => {
    if (!state.selectedContacts || state.selectedContacts.length === 0) return;

    dispatch({
      type: "OPEN_MODAL",
      payload: {
        title: "حذف مخاطبین انتخاب شده",
        message: `آیا از حذف ${state.selectedContacts.length} مخاطب انتخاب شده مطمئن هستید؟`,
        onConfirm: () => {
          dispatch({ type: "DELETE_SELECTED" });
          dispatch({ type: "CLOSE_MODAL" });
        },
        onCancel: () => dispatch({ type: "CLOSE_MODAL" }),
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">لیست مخاطبین</h2>
        {state.selectedContacts?.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            aria-label="حذف مخاطبین انتخاب شده"
          >
            حذف انتخاب شده‌ها ({state.selectedContacts.length})
          </button>
        )}
      </div>

      {filteredContacts.length === 0 ? (
        <p className="text-gray-500">
          {state.contacts?.length === 0
            ? "مخاطبی یافت نشد."
            : "نتیجه‌ای برای جستجو یافت نشد."}
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              dispatch={dispatch}
              isSelected={state.selectedContacts?.includes(contact.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
