import { useState, useRef } from "react";
import cn from "../../utils/cn";

/**
 * PinInput Components
 * @param {number} props.length
 * @param {String} props.name
 * @param {Number} props.rating
 * @param {String} props.text
 * @returns {JSX.element}
 */
const PinInput = ({ length = 6, onChange, error, className }) => {
  const [pin, setPin] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (!/^[0-9]*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (onChange) onChange(newPin.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^[0-9]+$/.test(pastedData)) return;

    const slicedData = pastedData.slice(0, length).split("");
    const newPin = [...pin];
    slicedData.forEach((char, i) => {
      newPin[i] = char;
    });

    setPin(newPin);
    if (onChange) onChange(newPin.join(""));

    const nextFocusIndex =
      slicedData.length < length ? slicedData.length : length - 1;
    inputRefs.current[nextFocusIndex].focus();
  };

  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)}>
      <div
        className="flex w-full justify-between gap-3 sm:justify-center sm:gap-6"
        onPaste={handlePaste}
      >
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={(element) => (inputRefs.current[index] = element)}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "h-12.5 w-11 bg-transparent text-center text-3xl font-medium text-black transition-colors duration-200 outline-none sm:w-15",
              "rounded-none border-b-2 border-transparent",
              error
                ? "border-b-danger text-danger"
                : "focus:border-b-primary border-b-[#E8E8E8]",
              digit && !error ? "border-b-primary" : "",
            )}
          />
        ))}
      </div>

      {error && (
        <span className="text-danger mt-2 text-center text-sm font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default PinInput;
