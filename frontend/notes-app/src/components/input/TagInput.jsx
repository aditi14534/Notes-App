import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  //   console.log(inputValue)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-lg"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500 transition"
              >
                <MdClose className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={inputValue}
          className="flex-1 text-sm bg-white border border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          placeholder="Add tag"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
