import React, { useState } from "react";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router";
import Button from "../atoms/Button";
import Avatar from "../atoms/Avatar";
import DropdownMenuAvatarHeader from "../molecules/DropdownMenuAvatarHeader";
import cn from "../../utils/cn";
import { useSelector } from "react-redux";

const Header = ({ isDashboard = false, onOpenSidebar }) => {
  const stateAuth = useSelector((state) => state.authReducer);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const currentUser = stateAuth().loginUser || {
    name: "User",
    profilePicture: "/defaultAvatar.jpg",
  };

  return (
    <header
      className={cn(
        "relative w-full h-19 flex items-center justify-between px-5 md:px-8 z-30 transition-all duration-300",
        isDashboard
          ? "bg-primary md:bg-white md:border-b md:border-grey-light"
          : "bg-primary",
      )}
    >
      <div className="flex items-center gap-3">
        {isDashboard ? (
          <>
            <Link to={"/"}>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" />
                </div>
                <h1 className="text-primary font-semibold text-xl tracking-wide">
                  E-Wallet
                </h1>
              </div>
            </Link>

            <div className="flex md:hidden items-center gap-3 relative">
              <div
                onClick={toggleProfileDropdown}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Avatar
                  imageSrc={currentUser.profilePicture}
                  className="w-11 h-11 border-2 border-white/20"
                />
                <div className="flex flex-col text-white">
                  <span className="text-[10px] font-light leading-tight opacity-80">
                    Hello,
                  </span>
                  <span className="font-semibold text-sm tracking-wide">
                    {currentUser.username}
                  </span>
                </div>
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute top-15 left-0 z-50">
                  <DropdownMenuAvatarHeader />
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center"
              />
              <h1 className="text-white font-semibold text-xl tracking-wide">
                E-Wallet
              </h1>
            </div>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        {isDashboard || stateAuth().isLogin ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 relative">
              <span
                className={cn(
                  "font-medium transition-colors",
                  isDashboard ? "text-black-light" : "text-white",
                )}
              >
                {currentUser.username}
              </span>

              <div onClick={toggleProfileDropdown} className="cursor-pointer">
                <Avatar
                  imageSrc={currentUser.profilePicture}
                  className="w-10 h-10 shadow-sm"
                />
              </div>

              {isProfileDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileDropdownOpen(false)}
                />
              )}

              {isProfileDropdownOpen && (
                <div className="absolute top-15 right-0 z-50">
                  <DropdownMenuAvatarHeader />
                </div>
              )}
            </div>

            <button
              onClick={isDashboard ? onOpenSidebar : toggleMobileMenu}
              className="md:hidden text-white flex items-center justify-center p-1 cursor-pointer"
            >
              <Menu size={28} />
            </button>

            {!isDashboard && isMobileMenuOpen && (
              <div className="absolute top-17.5 right-5 z-50 border-2 shadow-lg shadow-black-light border-black w-56 p-3 rounded-xl bg-white flex flex-col gap-2 md:hidden">
                <Link to="/dashboard" onClick={toggleMobileMenu}>
                  <Button variant="rectangelBlue" isFullWidth={true}>
                    Ke Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/auth/login">
                <Button
                  variant="rectangelWhite"
                  className="bg-transparent text-white border border-white hover:bg-white hover:text-primary h-10 px-6"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="rectangelWhite"
                  className="h-10 text-primary px-6 shadow-md"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <div className="relative md:hidden">
              <button
                className="text-white flex items-center justify-center p-1 cursor-pointer"
                onClick={toggleMobileMenu}
              >
                <Menu size={28} />
              </button>

              {isMobileMenuOpen && (
                <div className="absolute top-12.5 right-0 border-2 shadow-lg shadow-black-light border-black w-56 p-3 rounded-xl bg-white z-50 flex flex-col gap-1">
                  <Link to="/auth/login" onClick={toggleMobileMenu}>
                    <Button
                      isHaveIcon={true}
                      Icon={LogIn}
                      className="text-black hover:text-white font-medium text-sm hover:outline-primary hover:bg-primary hover:scale-100 transition-none justify-start"
                      isFullWidth={true}
                      variant="rectangelWhite"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={toggleMobileMenu}>
                    <Button
                      isHaveIcon={true}
                      Icon={UserPlus}
                      isFullWidth={true}
                      variant="rectangelWhite"
                    >
                      Sign Ups
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
