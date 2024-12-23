import React, { useState, useEffect } from "react";
import "./SearchDropdown.css";
import { Input } from "@mui/material";
import { BsSearch } from "react-icons/bs";

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
    <div className="w-3/4">
      {/* <input
        type="text"
        className="hidden md:flex w-full h-[42px] rounded-lg px-2 border-2"
        placeholder="Search for over 5000+ products"
        value={query}
        onChange={handleInputChange}
      /> */}
       <Input
        className='block text-black w-full px-5 py-1 bg-white border rounded-md'
        value={query}
        placeholder="Search for over 5000+ products"
        onChange={handleInputChange}
        endAdornment={<BsSearch className='sm:flex text-[#0A1408] text-[20px]' />}
        sx={{
          'input': {
            color: 'black' // Set the text color
          },
          '&:before': {
            borderBottom: '2px solid transparent' // Bottom border color
          },
          '&:after': {
            borderBottom: '2px solid transparent' // Focused bottom border color
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: '2px solid transparent' // Hover bottom border
          }
        }}
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
