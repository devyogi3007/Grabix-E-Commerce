import React, { useState, useEffect } from "react";
import "./SearchDropdown.css";

const SearchDropdown = ({ data }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (query === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      );
    }
  }, [query, data]);

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setQuery("");
      setIsDropdownOpen(false);
    } else {
      setQuery(e.target.value);
      setIsDropdownOpen(true);
    }
  };

  const handleItemClick = (item) => {
    setQuery(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="">
      <input
        type="text"
        className="hidden md:flex md:w-[200px] lg:w-[650px] h-[42px] rounded-lg px-2 border-2"
        placeholder="Search for over 5000+ products"
        value={query}
        onChange={handleInputChange}
      />
      {isDropdownOpen && (
        <div className="dropdown">
          <ul className="dropdown-menu">
            {filteredData.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
