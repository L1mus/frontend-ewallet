import { useState } from "react";
import Header from "../components/organism/Header";
import { Footer } from "../components/organism/Footer";
import Button from "../components/atoms/Button";
import { AboutCard } from "../components/organism/AboutCard";
import { ReviewCard } from "../components/organism/ReviewCard";
import logoHero from "../assets/images/online-payment-security-concept-3d-phone-bill.png";
import logoPlayStore from "../assets/icons/appstore.svg";
import logoGplay from "../assets/icons/gplay.svg";
import logoAirbnb from "../assets/icons/logo-airbnb.svg";
import logodell from "../assets/icons/logo-dell.svg";
import logoDropbox from "../assets/icons/logo-dropbox.svg";
import logoHnm from "../assets/icons/logo-hnm.svg";
import logoMicrosoft from "../assets/icons/logo-microsoft.svg";
import logoCanon from "../assets/icons/logo-canon.svg";
import logoHeadphone from "../assets/icons/Headphones.svg";
import logoShield from "../assets/icons/Shield Done.svg";
import logoDownload from "../assets/icons/Upload.svg";
import logoMoney from "../assets/icons/u_money-bill.svg";
import logoUserCheck from "../assets/icons/u_user-check.svg";
import logoMobile from "../assets/images/Mobile - Dashboard V2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModalConfirm from "../components/organism/ModalConfirm";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

/**
 * Main Landing Page of the application.
 * Utilizes derived state evaluation to passively prompt active users to create a transaction PIN.
 * This approach avoids React 'cascading renders' and cleanly handles component unmounting.
 * * @component
 * @returns {JSX.Element} The promotional landing page with conditional security prompts.
 */

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginUser, isLogin } = useSelector((state) => state.authReducer);
  const reviews = [
    {
      id: 1,
      name: "Sherina Claw",
      avatar: "/assets/images/sherina.png",
      rating: 5,
      text: "I use this app since 2 years ago and this is the best app that I've ever use in my entire life",
    },
    {
      id: 2,
      name: "James Bond",
      avatar: "/assets/images/james.png",
      rating: 5,
      text: "I use Zwallet to manage all financial needs. It's super easy to use and it's 100% free app",
    },
    {
      id: 3,
      name: "Ujang Kayu",
      avatar: "/assets/images/ujang.png",
      rating: 5,
      text: "Since I'm using this app, I'm not going to move to another similar app. Thank you Zwallet!",
    },
  ];
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);

  const showPinModal = Boolean(
    isLogin && loginUser && !loginUser.pin && !isPromptDismissed,
  );

  const handleConfirmCreatePin = () => {
    navigate("/auth/create-pin", { userData: loginUser });
  };

  const handleCloseModal = () => {
    setIsPromptDismissed(true);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header variant="landing" />

      <section className="flex w-full flex-col items-center justify-between gap-12 bg-white px-6 py-16 lg:min-h-165.5 lg:flex-row lg:px-33 lg:py-0">
        <div className="flex w-full flex-col items-start lg:w-[55%]">
          <h1 className="mb-6 max-w-200 text-4xl leading-[1.1] font-bold text-black lg:text-6xl">
            Smart Way to Your Financial Business
          </h1>

          <p className="text-grey mb-10 max-w-115 text-base leading-relaxed lg:text-lg">
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>

          <Button
            variant="rectangelWhite"
            className="border-primary mb-12 h-14.5 border px-10 text-base"
          >
            Get Started
          </Button>

          <div className="flex flex-col gap-4">
            <p className="text-grey text-sm">Available on</p>
            <div className="flex items-center gap-5">
              <img
                src={logoGplay}
                alt="Play Store"
                className="h-7.5 cursor-pointer object-contain transition-opacity hover:opacity-80"
              />
              <img
                src={logoPlayStore}
                alt="App Store"
                className="h-7.5 cursor-pointer object-contain transition-opacity hover:opacity-80"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 block bg-blue-500 p-4 text-white"></div>

        <div className="flex w-full justify-end lg:w-[45%]">
          <img
            src={logoHero}
            alt="Hero App Illustration"
            className="w-full max-w-137.5 object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="flex h-auto w-full flex-wrap items-center justify-center gap-10 bg-white px-6 py-10 lg:h-43 lg:justify-between lg:px-30 lg:py-0">
        <img
          src={logoMicrosoft}
          alt="Microsoft"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
        <img
          src={logoDropbox}
          alt="Dropbox"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
        <img
          src={logoHnm}
          alt="H&M"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
        <img
          src={logoAirbnb}
          alt="Airbnb"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
        <img
          src={logoCanon}
          alt="Canon"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
        <img
          src={logodell}
          alt="Dell"
          className="cursor-pointer object-contain opacity-60 transition-opacity hover:opacity-100"
        />
      </section>

      <section className="my-42 px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">
          <div>
            <h2 className="lg:text-44xl mb-5 w-full text-4xl leading-[1.2] font-medium text-black">
              About The Aplication
            </h2>

            <p className="text-grey text-lg">
              We have some great features from the application and it's totally
              free to use by all users around the world.
            </p>
          </div>

          <div className="flex w-full flex-col flex-nowrap justify-center gap-5 md:flex-row">
            <AboutCard
              icon={logoHeadphone}
              title="24/7 Support"
              description="We have 24/7 contact support so you can contact us whenever you want and we will respond it."
            />
            <AboutCard
              icon={logoShield}
              title="Data Privacy"
              description="We make sure your data is safe in our database and we will encrypt any data you submitted to us."
            />
            <AboutCard
              icon={logoDownload}
              title="Easy Download"
              description="Zwallet is 100% totally free to use. It's now available on Google Play Store and App Store."
            />
          </div>
        </div>
      </section>

      <section className="bg-primary py-32 lg:py-40">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="flex w-full justify-center lg:w-[40%] lg:justify-start">
            <div className="relative w-70 lg:w-87.5">
              <img
                src={logoMobile}
                alt="Zwallet Dashboard"
                className="h-full w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start text-white lg:w-full lg:max-w-200">
            <h2 className="mb-6 text-[32px] leading-tight font-bold lg:text-[48px] lg:whitespace-nowrap">
              All the Great Zwallet Features.
            </h2>

            <p className="text-base leading-relaxed text-white/80 lg:max-w-200 lg:text-lg">
              We have some great features from the application and it's totally
              free to use by all users around the world.
            </p>

            <div className="mb-12 flex w-full flex-col gap-7.5">
              {[
                {
                  title: "Small Fee",
                  desc: "We only charge 5% of every success transaction done in Zwallet app.",
                  icon: `${logoMoney}`,
                },
                {
                  title: "Data Secured",
                  desc: "All your data is secured properly in our system and it's encrypted.",
                  icon: `${logoShield}`,
                },
                {
                  title: "User Friendly",
                  desc: "Zwallet come up with modern and sleek design and not complicated.",
                  icon: `${logoUserCheck}`,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white shadow-lg">
                    <img
                      src={item.icon}
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="flex flex-col pt-1">
                    <h4 className="mb-1 text-xl font-bold">{item.title}</h4>
                    <p className="max-w-100 text-base leading-relaxed text-white">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="rectangelWhite"
              className={"w-46 font-semibold hover:opacity-85"}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center overflow-hidden bg-white py-10 lg:py-22">
        <div className="container mx-auto mb-16 px-6 text-center">
          <h2 className="mb-4 text-[32px] font-medium text-black lg:text-[48px]">
            Here From Our Customer
          </h2>
          <p className="text-grey mx-auto max-w-200 text-base lg:text-lg">
            We always do our best for our customers to stay comfortable using
            the applications we provide
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-360 px-6 lg:px-30">
          <Button
            onClick={prevReview}
            typeButton="cicle"
            variant="cicleBlue"
            className={
              "absolute top-1/2 left-4 -translate-y-1/2 items-center justify-center lg:flex xl:left-10"
            }
            isHaveIcon={true}
            Icon={ChevronLeft}
            iconClassName={"disable:text-grey-light"}
            isDisabled={true}
          ></Button>

          <div className="no-scrollbar flex w-full flex-row gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:gap-11 lg:overflow-x-visible">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                avatar={review.avatar}
                name={review.name}
                rating={review.rating}
                text={review.text}
              />
            ))}
          </div>

          <Button
            onClick={nextReview}
            typeButton="cicle"
            className={
              "absolute top-1/2 right-4 -translate-y-1/2 items-center justify-center lg:flex xl:right-10"
            }
            variant="cicleBlue"
            isHaveIcon={true}
            Icon={ChevronRight}
          ></Button>
        </div>

        <div className="mt-12 flex items-center gap-3 lg:mt-16">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary h-3 w-10"
                  : "h-3 w-3 bg-[#E5E7EB]"
              }`}
            />
          ))}
        </div>
      </section>

      <Footer />
      <ModalConfirm
        isOpen={showPinModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCreatePin}
        title="Create Pin?"
        message="Hello! Increase your account security. Create a transaction PIN now for safer and faster transactions."
        confirmText="Yes, let's make it"
        variant="primary"
      />
    </div>
  );
};

export default LandingPage;
