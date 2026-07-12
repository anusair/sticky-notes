"use client";

function Menu() {

    function addNewNote() {
        // create the note then add it to the board
        
    }

  return (
    <div className="bg-surface w-20 px-5 py-3 absolute top-1/2 -translate-y-1/2
    left-5">
      {/* add button */}
      <button
        className="bg-primary hover:bg-hover duration-300 cursor-pointer 
        w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
        type="button"
        onClick={addNewNote}
      >
        <span className="text-white font-bold text-xl">+</span>
      </button>
      {/* Change color button */}


    </div>
  );
}

export default Menu;
