import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {AuthLayout} from "../../components/templates/AuthLayout";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import OauthButton from "../../components/atoms/OauthButton";
import imgWallet from "../../assets/images/wallet.png";
import iconPassword from "../../assets/icons/Password.svg";
import iconMail from "../../assets/icons/mail.svg";
import iconUser from "../../assets/icons/2 User.svg";
import iconFacebook from "../../assets/icons/bx_bxl-facebook-circle.svg";
import iconGoogle from "../../assets/icons/flat-color-icons_google.svg";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {authActions} from "../../redux/slice/authSlice.js";

/**
 * New User Registration page.
 * Utilizes Zod for schema validation and Redux for storing new user data.
 * * @component
 * @returns {JSX.Element} The registration form with real-time validation.
 */

const schemaValidasiRegister = z
    .object({
        full_name: z.string().trim().min(1, {message: "Fullname is required"}),
        email: z
            .string({message: "Email must be String"})
            .min(1, {message: "Email is required"})
            .regex(/\S+@\S+\.\S+/, {message: "Invalid Email"})
            .email(),
        password: z
            .string()
            .min(1, {message: "Password is required"})
            .min(8, {message: "Password minimum 8 characters"}),
        confirm_password: z
            .string()
            .min(1, {message: "Confirm Password is required"}),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password do not match",
        path: ["confirm_password"],
    });

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateAuth = useSelector((state) => state.authReducer);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schemaValidasiRegister),
    });

    const onSubmit = async (data) => {
        try {
            setErrorMessage("");
            await dispatch(authActions.registerUser(data)).unwrap();
            const loginResult = await dispatch(
                authActions.loginUser({
                    email: data.email,
                    password: data.password,
                }),
            ).unwrap();

            toast.success("Registration successful! Please set your PIN.", {
                autoClose: 1500,
            });

            if (!loginResult.has_pin) {
                navigate("/auth/create-pin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message || "Registration failed";
            setErrorMessage(message);
            toast.error(message, {autoClose: 3000});
        }
    };

    return (
        <>
            <AuthLayout
                title="Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users"
                subtitle="Transfering money is easier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!"
                imagePath={imgWallet}
            >
                <div className="flex flex-col gap-3 mb-4">
                    <OauthButton icon={iconGoogle} text="Sign In With Google"/>
                    <OauthButton icon={iconFacebook} text="Sign In With Facebook"/>
                </div>

                <div className="flex items-center mb-4">
                    <div className="flex-1 h-px bg-[#E8E8E8]"/>
                    <span className="px-4 text-[#A9A9A9] text-sm font-normal">Or</span>
                    <div className="flex-1 h-px bg-[#E8E8E8]"/>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                    noValidate
                >
                    <Input
                        {...register("full_name", {required: true})}
                        label="Full Name"
                        placeholder="Enter Your Name"
                        icon={iconUser}
                        error={errors.full_name?.message}
                        disabled={stateAuth.isLoading}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter Your Email"
                        icon={iconMail}
                        {...register("email", {required: true})}
                        error={errors.email?.message || errorMessage}
                        disabled={stateAuth.isLoading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create Strong Password"
                        icon={iconPassword}
                        onChange={() => setErrorMessage("")}
                        {...register("password", {required: true})}
                        error={errors.password?.message}
                        disabled={stateAuth.isLoading}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        icon={iconPassword}
                        {...register("confirm_password", {required: true})}
                        error={errors.confirm_password?.message}
                        disabled={stateAuth.isLoading}
                    />

                    <Button
                        type="submit"
                        isFullWidth={true}
                        isLoading={stateAuth.isLoading}
                        className="mt-1"
                    >
                        {stateAuth.isLoading ? "Registering..." : "Register"}
                    </Button>
                </form>

                <div className="mt-4 text-center text-base">
                    <span className="text-grey font-normal">Have An Account? </span>
                    <Link to="/auth/login" className="text-primary font-medium hover:underline">
                        Login
                    </Link>
                </div>
            </AuthLayout>
        </>
    );
};

export default Register;
