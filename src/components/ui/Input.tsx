import React, { InputHTMLAttributes, MouseEventHandler, useState } from "react";
import Image from "next/image";
import Button from "./Button";

type TypeInput = "text" | "email" | "password";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  inputName?: string;
  typeInput?: TypeInput;
  icon: string;
  isHaveButton?: boolean;
  handler?: MouseEventHandler<HTMLButtonElement>;
};

export default function Input({
  label,
  inputName,
  typeInput = "text",
  isHaveButton = false,
  icon = "",
  handler,
}: InputProps) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  function handleClickReavealPwd(): void {
    setisOpen(!isOpen);
  }

  return (
    <div className="flex flex-col gap-2 justify-center">
      <label htmlFor={label} className="font-medium">
        {inputName}
      </label>
      <div className="box-border border rounded-2xl w-full">
        <div className="flex justify-center content-center mx-2">
          <Image
            src={icon}
            alt="icon"
            width={16}
            height={16}
            className="mx-1"
          />
          <input
            id={label}
            type={typeInput}
            placeholder="Enter Your email"
            className="w-full outline-none mx-1 placeholder:text-sm font-medium"
          />
          {isHaveButton && (
            <Button
              shape="circle"
              newStyle="w-4 h-4 bg-transparent hover:bg-transparent"
              isHaveIcon={true}
              icon={
                typeInput === "password"
                  ? isOpen
                    ? "/icons/openeye.svg"
                    : "/icons/closedeye.svg"
                  : icon
              }
              onClick={
                typeInput === "password" ? handleClickReavealPwd : handler
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
