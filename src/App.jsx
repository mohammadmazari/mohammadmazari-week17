import { ContactProvider } from "./context/ContactContext.jsx";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [closeForm, setCloseForm] = useState(false);
  return (
    <ContactProvider>
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <ContactForm closeForm={closeForm} setCloseForm={setCloseForm} />
          </div>
          <div className="md:w-2/3">
            <SearchBar setCloseForm={setCloseForm} />
            <ContactList setCloseForm={setCloseForm} />
          </div>
        </div>
        <Modal />
      </div>
    </ContactProvider>
  );
}

export default App;
