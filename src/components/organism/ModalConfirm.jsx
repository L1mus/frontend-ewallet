import React from "react";
import Modal from "./Modal";
import { AlertCircle } from "lucide-react";
import cn from "../../utils/cn";

const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  variant = "danger",
}) => {
  const variantStyles = {
    danger: "bg-danger text-white hover:bg-danger/90",
    primary: "bg-primary text-white hover:bg-primary/90",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="bg-danger/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <AlertCircle className="text-danger h-8 w-8" />
        </div>
        <h3 className="mb-3 text-xl font-extrabold text-black">{title}</h3>
        <p className="text-grey mb-8 text-sm leading-relaxed">{message}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className={cn(
              "w-full cursor-pointer rounded-xl py-3 text-sm font-bold transition-all",
              variantStyles[variant],
            )}
          >
            {confirmText}
          </button>

          <button
            onClick={onClose}
            className="text-grey w-full cursor-pointer rounded-xl py-3 text-sm font-bold transition-all hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
