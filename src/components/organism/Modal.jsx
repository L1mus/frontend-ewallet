import cn from "../../utils/cn";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          "animate-in fade-in zoom-in relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] duration-200",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
