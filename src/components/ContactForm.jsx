import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
const ContactForm = ({ closeForm, setCloseForm }) => {
  const { state, dispatch } = useContacts();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state.currentContact) {
      setFormData(state.currentContact);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  }, [state.currentContact]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "نام الزامی است";
    if (!formData.lastName.trim())
      newErrors.lastName = "نام خانوادگی الزامی است";
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (state.currentContact) {
      dispatch({ type: "UPDATE_CONTACT", payload: formData });
    } else {
      const newContact = { ...formData, id: Date.now().toString() };
      dispatch({ type: "ADD_CONTACT", payload: newContact });
    }

    setFormData({
      firstName: "",
    lastName: "",
    email: "",
    phone: "",
    });
    dispatch({ type: "SET_CURRENT_CONTACT", payload: null });
    setErrors({});
  };

  const handleCancel = () => {
    dispatch({ type: "SET_CURRENT_CONTACT", payload: null });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setErrors({});
  };

  return (
    <div className="rounded-lg shadow-lg bg-gradient-to-br from-white to-blue-50 px-6 pt-6 pb-4 border border-blue-100">
      <button
        onClick={() => setCloseForm((s) => !s)}
        className="text-center w-full mb-4 text-sm flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <span className="flex gap-2 items-center text-blue-700">
          {state.currentContact ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}
          <CiEdit size={15} className="text-blue-500" />
        </span>
        <span className="text-blue-500">
          {closeForm ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </button>
      <form
        onSubmit={handleSubmit}
        className={`mt-3 transition-all duration-500 ease-in-out bg-white/50 rounded-xl overflow-hidden ${
          closeForm ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"
        }`}
      >
        <div className={`p-4 transition-opacity duration-500 ${
          closeForm ? "opacity-0" : "opacity-100"
        }`}>
          <div className="mb-4">
            <label
              className="block text-sm md:text-md text-gray-700 mb-2 font-medium"
              htmlFor="firstName"
            >
              نام:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full text-sm md:text-md p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1.5">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm md:text-md text-gray-700 mb-2 font-medium"
              htmlFor="lastName"
            >
              نام خانوادگی:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full text-sm md:text-md p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1.5">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm md:text-md text-gray-700 mb-2 font-medium"
              htmlFor="email"
            >
              ایمیل:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full text-sm md:text-md p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm md:text-md text-gray-700 mb-2 font-medium"
              htmlFor="phone"
            >
              تلفن:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-sm md:text-md p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex justify-between px-3 gap-2">
            {state.currentContact && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 mb-4 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 py-2.5"
              >
                انصراف
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2.5 mb-4 text-sm md:text-md bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {state.currentContact ? "ذخیره تغییرات" : "افزودن مخاطب"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
