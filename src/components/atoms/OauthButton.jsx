import cn from "../../utils/cn";

/**
 * OauthButton
 * @typedef {object} OauthButton
 * @param {String} props.avatar
 * @param {String} props.name
 * @param {Number} props.rating
 * @param {String} props.text
 * @returns {JSX.element}
 */

const OauthButton = ({ icon, text, isLoad = false, className, ...props }) => {
  return (
    <button
      type="button"
      disabled={isLoad || props.disabled}
      className={cn(
        "flex h-13 w-full items-center justify-center gap-3 rounded-full border border-[#E8E8E8] bg-white transition-colors duration-200",
        "cursor-pointer outline-none hover:bg-gray-50 active:bg-gray-100",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <img src={icon} alt={text} className="h-6 w-6 object-contain" />
      <span className="text-sm font-medium text-[#4F5665]">{text}</span>
    </button>
  );
};

export default OauthButton;
