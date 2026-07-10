import React from "react";
import Button from "../atoms/Button";
import iconPerson from "../../assets/icons/person.svg?react";
import iconLogout from "../../assets/icons/Log Out.svg?react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slice/authSlice.js";
import { NavLink } from "react-router";

const DropdownMenuAvatarHeader = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="shadow-black-light w-62 rounded-b-lg border border-black shadow-lg">
        <div className="text-black hover:text-white">
          <NavLink to={"/profile"}>
            <Button
              isHaveIcon={true}
              Icon={iconPerson}
              className={
                "hover:bg-primary justify-start rounded-none bg-white text-sm font-medium text-black transition-none hover:scale-100 hover:text-white"
              }
              children="Profile"
              isFullWidth={true}
            />
          </NavLink>
          <Button
            isHaveIcon={true}
            Icon={iconLogout}
            className="hover:text-danger hover:bg-primary justify-start rounded-none bg-white text-sm font-medium text-red-500 transition-none hover:scale-100 hover:text-lg"
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
