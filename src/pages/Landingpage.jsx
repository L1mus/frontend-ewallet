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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header variant="landing" />

      <section className="w-full bg-white px-6 lg:px-33 lg:min-h-165.5 flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-0">
        <div className="w-full lg:w-[55%] flex flex-col items-start">
          <h1 className="text-4xl lg:text-6xl font-bold text-black leading-[1.1] mb-6 max-w-200">
            Smart Way to Your Financial Business
          </h1>

          <p className="text-grey text-base lg:text-lg leading-relaxed max-w-115 mb-10">
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>

          <Button
            variant="rectangelWhite"
            className="mb-12 px-10 h-14.5 text-base border border-primary"
          >
            Get Started
          </Button>

          <div className="flex flex-col gap-4">
            <p className="text-grey text-sm">Available on</p>
            <div className="flex items-center gap-5">
              <img
                src={logoGplay}
                alt="Play Store"
                className="h-7.5 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img
                src={logoPlayStore}
                alt="App Store"
                className="h-7.5 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[45%] flex justify-end">
          <img
            src={logoHero}
            alt="Hero App Illustration"
            className="w-full max-w-137.5 object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="w-full bg-white px-6 lg:px-30 h-auto lg:h-43 py-10 lg:py-0 flex flex-wrap justify-center lg:justify-between items-center gap-10">
        <img
          src={logoMicrosoft}
          alt="Microsoft"
          className=" object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
        <img
          src={logoDropbox}
          alt="Dropbox"
          className=" object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
        <img
          src={logoHnm}
          alt="H&M"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
        <img
          src={logoAirbnb}
          alt="Airbnb"
          className=" object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
        <img
          src={logoCanon}
          alt="Canon"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
        <img
          src={logodell}
          alt="Dell"
          className=" object-contain opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </section>

      <section className="my-42 px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          <div>
            <h2 className="text-4xl lg:text-44xl font-medium text-black mb-5 leading-[1.2] w-full">
              About The Aplication
            </h2>

            <p className="text-grey text-lg">
              We have some great features from the application and it's totally
              free to use by all users around the world.
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row flex-nowrap gap-5 justify-center">
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

      <section className=" bg-primary py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
            <div className="relative w-70 lg:w-87.5">
              <img
                src={logoMobile}
                alt="Zwallet Dashboard"
                className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          <div className="w-full lg:w-full lg:max-w-200 flex flex-col items-start text-white">
            <h2 className="text-[32px] lg:text-[48px] font-bold leading-tight mb-6 lg:whitespace-nowrap">
              All the Great Zwallet Features.
            </h2>

            <p className="text-white/80 text-base lg:text-lg leading-relaxed lg:max-w-200">
              We have some great features from the application and it's totally
              free to use by all users around the world.
            </p>

            <div className="flex flex-col gap-7.5 w-full mb-12">
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
                  <div className="w-13 h-13 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="flex flex-col pt-1">
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-white text-base leading-relaxed max-w-100">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="rectangelWhite"
              className={"font-semibold w-46 hover:opacity-85"}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-10 lg:py-22 bg-white overflow-hidden flex flex-col items-center">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-[32px] lg:text-[48px] font-medium text-black mb-4">
            Here From Our Customer
          </h2>
          <p className="text-grey text-base lg:text-lg max-w-200 mx-auto">
            We always do our best for our customers to stay comfortable using
            the applications we provide
          </p>
        </div>

        <div className="relative w-full max-w-360 mx-auto px-6 lg:px-30">
          <Button
            onClick={prevReview}
            typeButton="cicle"
            variant="cicleBlue"
            className={
              "lg:flex items-center justify-center absolute left-4 xl:left-10 top-1/2 -translate-y-1/2"
            }
            isHaveIcon={true}
            Icon={ChevronLeft}
            iconClassName={"disable:text-grey-light"}
            isDisabled={true}
          ></Button>

          <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 lg:gap-11 w-full overflow-x-auto lg:overflow-x-visible no-scrollbar pb-4">
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
              "lg:flex items-center justify-center absolute right-4 xl:right-10 top-1/2 -translate-y-1/2"
            }
            variant="cicleBlue"
            isHaveIcon={true}
            Icon={ChevronRight}
          ></Button>
        </div>

        <div className="flex items-center gap-3 mt-12 lg:mt-16">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-10 h-3 bg-primary"
                  : "w-3 h-3 bg-[#E5E7EB]"
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
