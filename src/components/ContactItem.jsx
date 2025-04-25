import React from "react";
import { useContacts } from "../context/ContactContext";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";

const ContactItem = ({ contact }) => {
  const { state, dispatch } = useContacts();


  const isSelected = state.selectedContacts?.includes(contact.id) || false;

  const handleEdit = () => {
    dispatch({
      type: "SET_CURRENT_CONTACT",
      payload: contact,
    });
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
      },
    });
  };

  const handleSelect = () => {
    if (!contact?.id) return;
    dispatch({ type: "TOGGLE_SELECT", payload: contact.id });
  };

  if (!contact) return null;

  return (
    <li className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-center text-xs md:text-sm gap-4 w-full">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="h-4 w-4 text-blue-600 rounded cursor-pointer"
        />

        <div className="flex flex-col md:flex-row md:items-center md:gap-10 w-full">
          <h3 className="text-base font-medium flex items-center gap-2">
            <FaUser size={15} className="text-gray-500" />
            <span>
              {contact.firstName || "بدون نام"} {contact.lastName || ""}
            </span>
          </h3>

          <p className="text-gray-600 flex gap-2 items-center mt-1 md:mt-0">
            <AiOutlineMail className="text-gray-500" />
            {contact.email || "بدون ایمیل"}
          </p>

          <p className="text-gray-500 flex gap-2 items-center mt-1 md:mt-0">
            <FaPhoneAlt className="text-gray-500" />
            {contact.phone || "بدون تلفن"}
          </p>
        </div>
      </div>

      <div className="flex justify-start gap-4 ">
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
          aria-label="ویرایش مخاطب"
        >
          <CiEdit size={20} />
        </button>

        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
          aria-label="حذف مخاطب"
        >
          <BsTrash size={18} />
        </button>
      </div>
    </li>
  );
};

export default ContactItem;
