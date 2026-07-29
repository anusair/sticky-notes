import React from "react";

function SearchModule({setSearchTerm, searchTerm , className} : {
    setSearchTerm: (e: string) => void;
    searchTerm: string;
    className: string
}) {
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 flex items-center justify-center ${className} z-9999`}>

      <input
        type="text"
        placeholder="Search..."
        className="relative z-10 w-96 rounded-lg bg-white p-3 outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm ?? ""}
      />
    </div>
  );
}

export default SearchModule;
