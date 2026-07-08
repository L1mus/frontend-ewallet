import React from "react";
import cn from "../../utils/cn";

const Avatar = ({ isClickable = false, imageSrc, className, ...props }) => {
  return (
    <>
      {isClickable ? (
        <button
          className={cn(
            "h-12 w-12 cursor-pointer overflow-hidden rounded-full border-none shadow-lg shadow-black",
            className,
          )}
          {...props}
        >
          <img
            className="h-auto w-full object-contain"
            src={imageSrc}
            alt="icon Avatar"
          />
        </button>
      ) : (
        <div
          className={cn(
            "h-12 w-12 cursor-pointer overflow-hidden rounded-full border-none shadow-lg shadow-black",
            className,
          )}
          {...props}
        >
          <img
            className="h-auto w-full object-contain"
            src={imageSrc}
            alt="icon Avatar"
          />
        </div>
      )}
    </>
  );
};

export default Avatar;
