import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext";

const ContactForm = () => {
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
    <div className="rounded-lg shadow bg-white p-4 ">
      <h2 className="text-lg text-center font-[400] mb-4">
        {state.currentContact ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-3 bg-white pt-2 rounded-2xl ">
        <div className="mb-4">
          <label
            className="block text-sm md:text-lg text-gray-700 mb-2"
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
            className={`w-full text-sm md:text-lg p-2 border rounded ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm md:text-lg text-gray-700 mb-2"
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
            className={`w-full text-sm md:text-lg p-2 border rounded ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm md:text-lg text-gray-700 mb-2"
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
            className={`w-full text-sm md:text-lg p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm md:text-lg text-gray-700 mb-2"
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
            className="w-full text-sm md:text-lg p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between px-3  gap-2">
          {state.currentContact && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm md:text-lg text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
            >
              انصراف
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm md:text-lg bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {state.currentContact ? "ذخیره تغییرات" : "افزودن مخاطب"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
