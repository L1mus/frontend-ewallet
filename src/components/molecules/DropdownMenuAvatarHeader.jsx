import React from "react";
import Button from "../atoms/Button";
import iconPerson from "../../assets/icons/person.svg?react";
import iconLogout from "../../assets/icons/Log Out.svg?react";
import { useDispatch } from "react-redux";
import {authActions} from "../../redux/slice/authSlice.js";

const DropdownMenuAvatarHeader = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="border-2 shadow-lg shadow-black-light border-black w-62 p-3 rounded-xl">
        <div className="text-black hover:text-white">
          <Button
            isHaveIcon={true}
            Icon={iconPerson}
            className={
              "text-black hover:text-white font-medium text-sm hover:outline-primary hover:bg-primary hover:scale-100 transition-none justify-start"
            }
            children="Profile"
            isFullWidth={true}
            variant="rectangelWhite"
          />
          <Button
            isHaveIcon={true}
            Icon={iconLogout}
            className="text-red-500 hover:text-danger hover:text-lg bg-white font-medium text-sm  hover:scale-105 hover:bg-primary transition-none justify-start"
            children="Logout"
            isFullWidth={true}
            onClick={() => {
                dispatch(authActions.logoutUser());
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DropdownMenuAvatarHeader;
