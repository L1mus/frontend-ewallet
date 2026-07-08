import Spinner from "../atoms/Spinner";

/**
 * Full-screen overlay loader for page transitions (used as a Suspense fallback).
 * * @param {Object} props - Component properties.
 * @param {string} [props.text="Loading, please wait..."] - The loading message to display.
 * @returns {JSX.Element|null} A full-screen overlay with a spinner and text.
 */

const PageLoader = ({ isOpen, text = "Loading, please wait..." }) => {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[3px] transition-opacity duration-300">
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <Spinner size={40} className="text-primary" />
        <span className="animate-pulse text-sm font-medium text-gray-600">
          {text}
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
