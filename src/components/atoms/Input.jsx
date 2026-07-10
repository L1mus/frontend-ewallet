import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cn from "../../utils/cn";

/**
 * Input Component
 * @param {String} props.label
 * @param {String} props.type
 * @param {Number} props.placeholder
 * @param {String} props.icon
 * @param {String} props.error
 * @param {String} props.className
 * @param {object} props.props
 * @returns {JSX.element}
 */
export const Input = ({
  label,
  type = "text",
  placeholder,
  icon,
  error,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={label} className="text-base font-normal text-black">
          {label}
        </label>
      )}

      <div className="relative flex w-full items-center">
        {icon && (
          <div className="pointer-events-none absolute left-4 flex items-center justify-center">
            <img src={icon} alt="" className="h-5 w-5 opacity-50" />
          </div>
        )}

        <input
          type={currentType}
          id={label}
          placeholder={placeholder}
          className={cn(
            "placeholder:text-grey h-11 w-full rounded-lg border bg-white text-sm text-black transition-all duration-200",
            "outline-none disabled:cursor-not-allowed",
            icon ? "pl-12" : "pl-4",
            isPassword ? "pr-12" : "pr-4",
            error
              ? "border-danger focus:border-danger focus:ring-danger focus:ring-1"
              : "focus:border-primary focus:ring-primary border-gray-200 focus:ring-1",
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-primary absolute right-3 flex cursor-pointer items-center justify-center rounded-md p-1 text-gray-400 transition-colors outline-none hover:scale-105"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 md:h-7 md:w-7" />
            ) : (
              <Eye className="h-5 w-5 md:h-7 md:w-7" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-danger text-xs font-medium">{error}</span>
      )}
    </div>
  );
};

export default Input;
