import { FaSearch } from "react-icons/fa";

function SearchBar() {

  return (

    <div className="bg-white rounded-2xl shadow-md p-4">

      <div className="flex items-center">

        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search members, payments, keke..."
          className="
          flex-1
          ml-4
          outline-none
          text-gray-700"
        />

      </div>

    </div>

  );

}

export default SearchBar;