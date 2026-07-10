import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import iconMail from "../../assets/icons/mail.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slice/authSlice";
import Logo from "../../components/atoms/Logo";

const schemaEmailForForgotPassword = z.object({
  email: z
    .string()
    .min(1, { message: "Email required" })
    .email({ message: "Invalid Email" })
    .trim(),
});

const ForgotPassword = () => {
  const stateAuth = useSelector((state) => state.authReducer);
  const action = authActions;
  const dispatch = useDispatch();
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
      toast.error(
        err ||
          "Failed to request password reset. Email might not be registered.",
      );
    }
  };

  return (
    <div className="bg-primary relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10 font-sans sm:px-8">
      <div
        className="pointer-events-none absolute z-0 h-full w-full rounded-full sm:h-200 sm:w-200"
        style={{
          background: "radial-gradient(circle, hsl(201 100% 55%), hsl(201, 100%, 50%))",
        }}
      />

      <div className="relative z-10 flex w-full max-w-125 flex-col rounded-[30px] bg-white px-8 py-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:px-12">
        <Logo/>
        <h1 className="mb-2 text-[30px] leading-snug font-medium text-black">
          Fill Out Form Correctly 👋
        </h1>
        <p className="text-grey mb-8 text-base leading-relaxed font-normal">
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
            disabled={stateAuth?.isLoading}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}

          <Button
            type="submit"
            isFullWidth={true}
            className="mt-2"
            isLoading={stateAuth?.isLoading}
          >
            {isSent ? "Resend Link" : "Submit"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/auth/login"
            className="text-grey hover:text-primary text-base font-medium transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
