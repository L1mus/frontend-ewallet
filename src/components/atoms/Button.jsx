import Spinner from "./Spinner";
import cn from "../../utils/cn.js";

/**
 * Custom Button component supporting various variants, loading states, and icons.
 * * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.children=""] - Text or element content inside the button.
 * @param {boolean} [props.isDisabled=false] - Whether the button is manually disabled.
 * @param {boolean} [props.isLoading=false] - Asynchronous processing status (shows a Spinner when true).
 * @param {"rectangel"|"circle"} [props.typeButton="rectangel"] - The physical shape of the button.
 * @param {boolean} [props.isHaveIcon=false] - Whether the button includes an icon.
 * @param {boolean} [props.isFullWidth=false] - Whether the button should take up the full width of its container.
 * @param {React.ElementType} [props.Icon] - The icon component to be rendered.
 * @param {string} [props.iconClassName] - Additional CSS classes for the icon.
 * @param {"rectangelBlue"|"rectangelWhite"|"cicleBlue"|"cicleWhite"} [props.variant="rectangelBlue"] - The visual style variant.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @returns {JSX.Element} The formatted button element.
 */

const Button = ({
  children = "",
  isDisabled = false,
  isLoading = false,
  typeButton = "rectangel",
  isHaveIcon = false,
  isFullWidth = false,

  Icon,
  iconClassName,
  variant = "rectangelBlue",
  className,
  ...props
}) => {
  return (
    <>
      <button
        disabled={isLoading || isDisabled}
        className={
          typeButton === "rectangel"
            ? cn(
                "flex h-12 cursor-pointer items-center justify-center rounded-md px-5 py-3 transition delay-150 duration-300 ease-in-out",
                "disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50 disabled:transition-none disabled:hover:translate-z-0 disabled:hover:scale-100",

                {
                  "bg-primary text-white hover:opacity-80":
                    variant === "rectangelBlue",
                  "text-primary hover:outline-primary bg-white hover:outline-2":
                    variant === "rectangelWhite",
                },
                isFullWidth ? "w-full" : "w-max",
                className,
              )
            : cn(
                "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-4 transition delay-150 duration-300 ease-in-out hover:-translate-z-1 hover:scale-110",
                "disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50 disabled:transition-none",
                {
                  "bg-primary text-white": variant === "cicleBlue",
                  "text-primary bg-white": variant === "cicleWhite",
                },
                className,
              )
        }
        {...props}
      >
        <div className="flex items-center justify-center gap-3.5">
          {isLoading && <Spinner size={18} className="text-current" />}
          {isHaveIcon && Icon && <Icon className={iconClassName} />}
          {children && (
            <span className="flex items-center justify-center gap-3">
              {children}
            </span>
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
