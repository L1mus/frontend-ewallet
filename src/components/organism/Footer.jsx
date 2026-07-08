// import { Phone, Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";
import iconMoneyWallet from "../../assets/icons/Money-Wallet.svg";
import iconPhone from "../../assets/icons/Phone.svg";
import iconMail from "../../assets/icons/mail.svg";
import iconGithub from "../../assets/icons/u_github.svg";
import iconInstagram from "../../assets/icons/u_instagram.svg";
import iconTwitter from "../../assets/icons/u_twitter-alt.svg";
import iconFacebook from "../../assets/icons/facebook.svg";

export const Footer = () => {
  return (
    <footer className="bg-primary w-full px-6 pt-16 pb-8 font-sans lg:px-33">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img
              src={iconMoneyWallet}
              alt="Logo E-Wallet"
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-2xl font-medium tracking-wide text-white">
              E-Wallet
            </h1>
          </div>
          <p className="max-w-70 text-base leading-relaxed text-white/80">
            Clarity gives you the blocks and components you need to create a
            truly professional website.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-base font-semibold tracking-widest text-white uppercase">
            Get In Touch
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex cursor-pointer items-center gap-3 text-white transition-opacity hover:opacity-80">
              <img
                src={iconPhone}
                alt="icon Phone"
                className="h-5 w-5 object-contain"
              />
              <span className="text-base font-medium">+62 5637 8882 9901</span>
            </div>
            <div className="flex cursor-pointer items-center gap-3 text-white transition-opacity hover:opacity-80">
              <img src={iconMail} alt="" className="h-5 w-5 object-contain" />
              <span className="text-base font-medium">contact@zwallet.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-base font-semibold tracking-widest text-white uppercase">
            Social Media
          </h3>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:bg-gray-100"
            >
              <img
                src={iconTwitter}
                alt="Twitter"
                className="h-5 w-5 object-contain"
              />
            </a>
            <a
              href="#"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:bg-gray-100"
            >
              <img
                src={iconFacebook}
                alt="Facebook"
                className="h-5 w-5 object-contain"
              />
            </a>
            <a
              href="#"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:bg-gray-100"
            >
              <img
                src={iconInstagram}
                alt="Instagram"
                className="h-5 w-5 object-contain"
              />
            </a>
            <a
              href="#"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-105 hover:bg-gray-100"
            >
              <img
                src={iconGithub}
                alt="GitHub"
                className="h-5 w-5 object-contain"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-base font-semibold tracking-widest text-white uppercase">
            Newsletter
          </h3>
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <img
                  src={iconMail}
                  alt=""
                  className="h-5 w-5 object-contain opacity-50"
                />
              </div>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="h-11 w-full rounded-[5px] bg-white pr-4 pl-12 text-sm text-black transition-all outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button className="text-primary h-11 w-full cursor-pointer rounded-[5px] bg-white text-sm font-semibold shadow-sm transition-colors hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="mt-16 mb-8 border-white/20" />
      <div className="text-center text-[14px] text-white/80">
        © Copyright 2026, All Rights Reserved by ClarityUI
      </div>
    </footer>
  );
};
