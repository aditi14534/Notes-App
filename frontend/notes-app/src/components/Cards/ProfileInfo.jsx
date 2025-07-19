import React from "react";
import { getInitials } from "../../utils/helper";
import { FaSignOutAlt } from "react-icons/fa";
const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.username)}
      </div>
      <div>
        <p className="text-sm font-medium mt-2">{userInfo?.username}</p>
        <FaSignOutAlt
          className="text-xl text-gray-400 hover:text-blue-600 cursor-pointer ml-7 "
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
