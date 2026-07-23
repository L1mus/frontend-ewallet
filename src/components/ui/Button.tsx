import Image from "next/image";
import React from "react";
import type { ButtonHTMLAttributes } from "react";

type Shape = "circle" | "rectangel";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  isFullWidht?: boolean;
  isHaveIcon?: boolean;
  shape?: Shape;
  icon?: string;
  text?: string;
  newStyle?: string;
};

export default function Button({
  isLoading = false,
  isFullWidht = false,
  isHaveIcon = false,
  shape = "rectangel",
  icon = "",
  text = "",
  newStyle = "",
  ...props
}: ButtonProps) {
  const shapeStyle = {
    circle: "w-8 h-8 md:w-12 md:h-12 rounded-full",
    rectangel: `${isFullWidht ? "w-full" : "w-24 md:w-28"} h-10 rounded-xl`,
  };

  const style = `bg-primary/80 cursor-pointer hover:bg-primary active:scale-98 flex justify-center items-center ${shapeStyle[shape]} ${newStyle}`;
  return (
    <>
      {isLoading ? (
        <button
          disabled
          className={`${style} hover:bg-primary/10 hover:cursor-not-allowed active:scale-none`}
        >
          <p className="hidden md:block">Loading...</p>
          <span className="mx-0.5 animate-spin ease-in-out rounded-full">
            <Image src="/icons/Gear.svg" alt="loading" width="25" height="25" />
          </span>
        </button>
      ) : (
        <button className={style} {...props}>
          {isHaveIcon ? (
            <span className="flex items-center gap-2">
              <Image
                src={icon}
                alt={text}
                width={`${text ? 15 : 18}`}
                height={`${text ? 15 : 18}`}
              />
              {text && <span>{text}</span>}
            </span>
          ) : (
            text
          )}
        </button>
      )}
    </>
  );
}
