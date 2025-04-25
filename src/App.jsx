import { ContactProvider } from "./context/ContactContext.jsx";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <ContactProvider>
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <ContactForm />
          </div>
          <div className="md:w-2/3">
            <SearchBar />
            <ContactList />
          </div>
        </div>
        <Modal />
      </div>
    </ContactProvider>
  );
}

export default App;
