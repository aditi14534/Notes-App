import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

import { toast } from "react-toastify";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    console.log(noteId);

    try {
      const res = await axiosInstance.post(`/api/note/edit/${noteId}`, {
        title,
        content,
        tags,
      });

      console.log(res.data);

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  // Add Note
  const addNewNote = async () => {
    try {
      const res = await axiosInstance.post("/api/note/add", {
        title,
        content,
        tags,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
      <button
        className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-slate-500 hover:text-slate-700 transition" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 tracking-wide">
          TITLE
        </label>
        <input
          type="text"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="text-lg text-slate-700 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3 py-2 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 tracking-wide">
          CONTENT
        </label>
        <textarea
          placeholder="Content"
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
          className="text-sm text-slate-700 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-3 py-2 transition bg-slate-50 resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-500 tracking-wide">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        onClick={handleAddNote}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-4 shadow transition"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
