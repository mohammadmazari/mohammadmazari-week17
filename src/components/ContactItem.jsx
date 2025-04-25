import React from "react";
import { useContacts } from "../context/ContactContext";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";

const ContactItem = ({ contact, setCloseForm }) => {
  const { state, dispatch } = useContacts();

  const isSelected = state.selectedContacts?.includes(contact.id) || false;

  const handleEdit = () => {
    dispatch({
      type: "SET_CURRENT_CONTACT",
      payload: contact,
    });
    setCloseForm(false);
  };

  const handleDelete = () => {
    if (!contact?.id) return;

    dispatch({
      type: "OPEN_MODAL",
      payload: {
        title: "حذف مخاطب",
        message: `آیا از حذف ${contact.firstName || ""} ${
          contact.lastName || ""
        } مطمئن هستید؟`,
        onConfirm: () => {
          dispatch({ type: "DELETE_CONTACT", payload: contact.id });
          dispatch({ type: "CLOSE_MODAL" });
        },
        onCancel: () => dispatch({ type: "CLOSE_MODAL" }),
        icone: "remove",
      },
    });
  };

  const handleSelect = () => {
    if (!contact?.id) return;
    dispatch({ type: "TOGGLE_SELECT", payload: contact.id });
  };

  if (!contact) return null;

  return (
    <li className="group p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
      <div className="flex items-center gap-4 w-full">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="h-5 w-5 text-blue-600 rounded cursor-pointer border-gray-300 focus:ring-blue-500"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium flex items-center gap-2">
              <FaUser size={16} className="text-blue-500" />
              <span className="text-gray-700">
                {contact.firstName || "بدون نام"} {contact.lastName || ""}
              </span>
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                aria-label="ویرایش مخاطب"
              >
                <CiEdit size={20} />
              </button>

              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                aria-label="حذف مخاطب"
              >
                <BsTrash size={18} />
              </button>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 flex gap-2 items-center">
              <AiOutlineMail className="text-gray-400" />
              {contact.email || "بدون ایمیل"}
            </p>

            <p className="text-sm text-gray-600 flex gap-2 items-center">
              <FaPhoneAlt className="text-gray-400" />
              {contact.phone || "بدون تلفن"}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
