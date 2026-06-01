import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import User from "../../assets/icons/2 User.svg?react";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { registerActions } from "../../redux/slice/registerSlice";
import { loginActions } from "../../redux/slice/loginSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginUser } = useSelector((state) => state.loginReducer);
  const { isLoading } = useSelector((state) => state.registerReducer);
  const actionLogin = loginActions;
  const actionRegister = registerActions;

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.existingPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill in all password fields");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New password confirmation does not match.");
    }

    if (formData.existingPassword !== loginUser.password) {
      return toast.error("The old password you entered is incorrect.");
    }

    try {
      const result = await dispatch(
          actionRegister.changePasswordUser({
            current_password: formData.current_password,
            new_password: formData.new_password,
          }),
      ).unwrap();

      dispatch(actionLogin.syncActiveSession(result));
      toast.success("Password successfully updated!");
      navigate("/profile");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="flex items-center gap-2 mb-6 text-primary px-4 md:px-0">
        <User className={"text-2xl font-bold"} />
        <h1 className="text-xl font-bold text-black">Profile</h1>
      </div>

      <div className="w-full bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm p-4 md:p-8">
        <h2 className="font-bold text-black text-lg mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Current Password"
            name="current_password"
            type="password"
            value={formData.current_password}
            onChange={handleInputChange}
            placeholder="Enter Your Current Password"
            disabled={isLoading}
          />

          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter Your New Password"
            disabled={isLoading}
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Re-Type Your New Password"
            disabled={isLoading}
          />

          <div className="mt-4">
            <Button
              type="submit"
              isLoading={isLoading}
              isFullWidth={true}
              className="py-3.5 font-bold shadow-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
