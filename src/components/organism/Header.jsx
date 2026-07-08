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

  const currentUser = stateAuth.loginUser || {
    name: "User",
    profilePicture: "/defaultAvatar.jpg",
  };

  return (
    <header
      className={cn(
        "relative z-30 flex h-19 w-full items-center justify-between px-5 transition-all duration-300 md:px-8",
        isDashboard
          ? "bg-primary md:border-grey-light md:border-b md:bg-white"
          : "bg-primary",
      )}
    >
      <div className="flex items-center gap-3">
        {isDashboard ? (
          <>
            <Link to={"/"}>
              <div className="hidden items-center gap-3 md:flex">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md">
                  <img src="/logo.png" alt="Logo" />
                </div>
                <h1 className="text-primary text-xl font-semibold tracking-wide">
                  E-Wallet
                </h1>
              </div>
            </Link>

            <div className="relative flex items-center gap-3 md:hidden">
              <div
                onClick={toggleProfileDropdown}
                className="flex cursor-pointer items-center gap-3"
              >
                <Avatar
                  imageSrc={currentUser.profilePicture}
                  className="h-11 w-11 border-2 border-white/20"
                />
                <div className="flex flex-col text-white">
                  <span className="text-[10px] leading-tight font-light opacity-80">
                    Hello,
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
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
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20"
              />
              <h1 className="text-xl font-semibold tracking-wide text-white">
                E-Wallet
              </h1>
            </div>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        {isDashboard || stateAuth.isLogin ? (
          <div className="flex items-center gap-4">
            <div className="relative hidden items-center gap-4 md:flex">
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
                  className="h-10 w-10 shadow-sm"
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
              className="flex cursor-pointer items-center justify-center p-1 text-white md:hidden"
            >
              <Menu size={28} />
            </button>

            {!isDashboard && isMobileMenuOpen && (
              <div className="shadow-black-light absolute top-17.5 right-5 z-50 flex w-56 flex-col gap-2 rounded-xl border-2 border-black bg-white p-3 shadow-lg md:hidden">
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
            <div className="hidden items-center gap-4 md:flex">
              <Link to="/auth/login">
                <Button
                  variant="rectangelWhite"
                  className="hover:text-primary h-10 border border-white bg-transparent px-6 text-white hover:bg-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="rectangelWhite"
                  className="text-primary h-10 px-6 shadow-md"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <div className="relative md:hidden">
              <button
                className="flex cursor-pointer items-center justify-center p-1 text-white"
                onClick={toggleMobileMenu}
              >
                <Menu size={28} />
              </button>

              {isMobileMenuOpen && (
                <div className="shadow-black-light absolute top-12.5 right-0 z-50 flex w-56 flex-col gap-1 rounded-xl border-2 border-black bg-white p-3 shadow-lg">
                  <Link to="/auth/login" onClick={toggleMobileMenu}>
                    <Button
                      isHaveIcon={true}
                      Icon={LogIn}
                      className="hover:outline-primary hover:bg-primary justify-start text-sm font-medium text-black transition-none hover:scale-100 hover:text-white"
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
