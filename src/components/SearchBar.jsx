import React from "react";
import { useContacts } from "../context/ContactContext";
import { CiSearch } from "react-icons/ci";
const SearchBar = () => {
  const { state, dispatch } = useContacts();

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="جستجو بر اساس نام، نام خانوادگی یا ایمیل..."
        className=" w-full p-2 border border-gray-300 rounded-md text-sm bg-white "
        value={state.searchTerm}
        onChange={handleSearch}
      />
      <CiSearch size={20} className="absolute top-2 left-2" />
    </div>
  );
};

export default SearchBar;
