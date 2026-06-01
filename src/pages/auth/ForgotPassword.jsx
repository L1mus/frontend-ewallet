import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import iconMoneyWallet from "../../assets/icons/Money-Wallet.svg";
import iconMail from "../../assets/icons/mail.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerActions } from "../../redux/slice/registerSlice";

const schemaEmailForForgotPassword = z.object({
  email: z
    .string()
    .min(1, { message: "Email required" })
    .email({ message: "Invalid Email" })
    .trim(),
});

const ForgotPassword = () => {
  const stateRegister = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  const action = registerActions;
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaEmailForForgotPassword) });

  const onHandleSubmit = async (data) => {
    try {
      await dispatch(action.forgotPasswordUser(data)).unwrap();
      setIsSent(true);
      toast.success(`Email link reset password sent successfully!`);
    } catch (err) {
      toast.error(err || "Failed to request password reset. Email might not be registered.");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-primary-light font-sans overflow-hidden flex items-center justify-center px-4 sm:px-8 py-10">
      <div
        className="absolute w-full h-full sm:w-200 sm:h-200 z-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7096FF 0%, #3868FD 87%)",
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 w-full max-w-125 bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-8 py-12 sm:px-12 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <img src={iconMoneyWallet} alt="Logo" className="w-8 h-8" />
          <h1 className="text-primary font-medium text-xl">E-Wallet</h1>
        </div>

        <h1 className="text-[30px] font-medium text-black mb-2 leading-snug">
          Fill Out Form Correctly 👋
        </h1>
        <p className="text-base font-normal text-grey leading-relaxed mb-8">
          We will send new password to your email
        </p>

        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          className="flex flex-col gap-6"
          noValidate
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            icon={iconMail}
            {...register("email")}
            error={errors.email?.message}
            disabled={stateRegister?.isLoading}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}

          <Button
            type="submit"
            isFullWidth={true}
            className="mt-2"
            isLoading={stateRegister?.isLoading}
          >
            {isSent ? "Resend Link" : "Submit"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/auth/login"
            className="text-base text-grey font-medium hover:text-primary transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
