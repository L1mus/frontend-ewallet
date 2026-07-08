import iconMoneyWallet from "../../assets/icons/Money-Wallet.svg";

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
    <div className="bg-primary-light relative flex min-h-screen">
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center bg-white px-8 py-31.5 shadow-[10px_0_30px_rgba(0,0,0,0.15)] md:w-1/2 md:rounded-r-[40px] md:py-41 lg:px-12">
        <div className="w-full">
          <div className="mb-5 md:mt-0">
            <div className="mb-4 flex items-center gap-2 lg:mb-5">
              <img
                src={iconMoneyWallet}
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <h1 className="text-primary text-xl font-medium tracking-wide">
                E-Wallet
              </h1>
            </div>

            <h1 className="text-grey mb-1 text-2xl leading-tight font-medium lg:text-3xl">
              {title}
            </h1>
            <p className="text-grey text-sm leading-snug font-normal lg:text-base">
              {subtitle}
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>

      <div className="bg-primary pointer-events-none absolute top-0 right-0 hidden h-full w-1/2 items-center justify-center overflow-hidden md:flex">
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          <div
            className="absolute z-0 h-full w-225 rounded"
            style={{
              background: "radial-gradient(circle, #7096FF 0%, #3868FD 87%)",
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
