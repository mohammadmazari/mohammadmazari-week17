import React, { createContext, useReducer, useContext, useEffect } from "react";

const ContactContext = createContext();

const getInitialState = () => {
  try {
    const contacts = localStorage.getItem("contacts");
    return {
      contacts: contacts ? JSON.parse(contacts) : [],
      selectedContacts: [],
      isModalOpen: false,
      modalContent: null,
      currentContact: null,
      searchTerm: "",
    };
  } catch (error) {
    console.error("Error parsing contacts from localStorage:", error);
    return {
      contacts: [],
      selectedContacts: [],
      isModalOpen: false,
      modalContent: null,
      currentContact: null,
      searchTerm: "",
    };
  }
};

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "SET_CONTACTS":
      newState = {
        ...state,
        contacts: Array.isArray(action.payload) ? action.payload : [],
      };
      break;

    case "ADD_CONTACT":
      const newContact = {
        id: action.payload.id || Date.now().toString(),
        firstName: action.payload.firstName || "",
        lastName: action.payload.lastName || "",
        email: action.payload.email || "",
        phone: action.payload.phone || "",
      };
      newState = {
        ...state,
        contacts: [...state.contacts, newContact],
      };
      break;

    case "UPDATE_CONTACT":
      newState = {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        currentContact: null,
      };
      break;

    case "DELETE_CONTACT":
      newState = {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
      break;

    case "DELETE_SELECTED":
      newState = {
        ...state,
        contacts: state.contacts.filter(
          (contact) => !state.selectedContacts.includes(contact.id)
        ),
        selectedContacts: [],
      };
      break;

    case "TOGGLE_SELECT":
      newState = {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter((id) => id !== action.payload)
          : [...state.selectedContacts, action.payload],
      };
      break;

    case "SET_CURRENT_CONTACT":
      newState = {
        ...state,
        currentContact: action.payload,
      };
      break;

    case "OPEN_MODAL":
      newState = {
        ...state,
        isModalOpen: true,
        modalContent: action.payload,
      };
      break;

    case "CLOSE_MODAL":
      newState = {
        ...state,
        isModalOpen: false,
        modalContent: null,
      };
      break;

    case "SET_SEARCH_TERM":
      newState = {
        ...state,
        searchTerm: action.payload,
      };
      break;

    default:
      return state;
  }

  try {
    localStorage.setItem("contacts", JSON.stringify(newState.contacts));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }

  return newState;
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem("contacts");
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts)) {
          dispatch({ type: "SET_CONTACTS", payload: parsedContacts });
        }
      }
    } catch (error) {
      console.error("Failed to load contacts from localStorage:", error);
    }
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
