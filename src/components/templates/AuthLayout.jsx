
import Logo from "../atoms/Logo";

/**
 * Layout template for authentication-related pages.
 * Features a split-screen design with an illustration on the right and a form on the left.
 * * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Main form content or page elements.
 * @param {string} props.title - Main heading displayed above the form.
 * @param {string} props.subtitle - Brief description displayed below the title.
 * @param {string} props.imagePath - Path to the illustration image on the right panel.
 * @returns {JSX.Element} A responsive layout spanning the full viewport height.
 */

export const AuthLayout = ({ children, title, subtitle, imagePath }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex w-full flex-col items-center justify-center bg-white p-7 lg:px-12">
        <div className="w-full flex flex-col gap-2 lg:gap-3">
          <Logo/>
            <h1 className="text-grey text-2xl leading-tight font-medium lg:text-3xl">
              {title}
            </h1>
            <p className="text-grey text-sm leading-snug font-normal lg:text-base">
              {subtitle}
            </p>

          <div className="w-full">{children}</div>
        </div>
      </div>

      <div className="hidden md:grid">
        <div className="relative z-20 flex items-center justify-center">
          <div
            className="absolute z-0 h-full w-full"
            style={{
              background: "radial-gradient(circle, hsl(201 100% 65%), hsl(201, 100%, 50%))",
              opacity: 0.8,
            }}
          />
          <div className="pointer-events-none absolute z-1 h-100 w-100 translate-y-20 rounded-full bg-white/10 blur-3xl" />
          <img
            src={imagePath}
            alt="Illustration"
            className="relative z-10 w-4/5 max-w-125 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};
