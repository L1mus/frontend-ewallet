import { Loader2 } from "lucide-react";
import cn from "../../utils/cn";

/**
 * Atomic Spinner component for loading indicators.
 * * @param {Object} props - Component properties.
 * @param {number} [props.size=24] - Size of the spinner icon in pixels.
 * @param {string} [props.className] - Additional CSS classes for custom color or positioning.
 * @returns {JSX.Element} A rotating loader icon.
 */

const Spinner = ({ size = 24, className }) => {
  return (
    <Loader2
      size={size}
      className={cn("text-primary animate-spin", className)}
    />
  );
};

export default Spinner;
