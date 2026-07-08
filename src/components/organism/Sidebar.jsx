import { X } from "lucide-react";
import cn from "../../utils/cn";
import SidebarContent from "../molecules/SidebarContent";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
        />
      )}

      <aside
        className={cn(
          "border-grey-light flex flex-col border-l bg-white md:border-r md:border-l-0",
          "md:sticky md:top-0 md:flex md:h-screen md:w-1/6 md:min-w-48 md:translate-x-0",
          "fixed top-0 right-0 z-50 h-full w-3/4 max-w-xs",
          "transition-transform duration-300 ease-in-out",
          isOpen
            ? "translate-x-0 shadow-2xl"
            : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 md:hidden">
          <span className="text-primary text-lg font-bold">Menu</span>
          <button
            onClick={onClose}
            className="hover:bg-grey-light text-black-light flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;
