import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signoutSuccess,
  signoutFailure,
  signoutStart,
} from "../../redux/users/userSlice";
import axiosInstance from "../../utils/axiosInstance";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltered, setIsFiltered] = useState(false); // NEW

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery); // filtering notes
      setSearchQuery(""); // clear search bar
      setIsFiltered(true); // show ❌ and hide 🔍
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch(); // reset all notes
    setIsFiltered(false); // hide ❌, show 🔍
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axiosInstance.get("/api/auth/signout"); // ✅ Modified

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          <span className="text-slate-500">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        isFiltered={isFiltered} // 👈 NEW
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
