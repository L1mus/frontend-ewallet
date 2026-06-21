import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slice/authSlice";
import { Pencil, Trash2 } from "lucide-react";
import User from "../../assets/icons/2 User.svg?react";

import Avatar from "../../components/atoms/Avatar";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser, isLoading } = useSelector((state) => state.authReducer);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: loginUser?.full_name || "",
    phone: loginUser?.phone || "",
    email: loginUser?.email || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const updatedData = await dispatch(
          authActions.updateProfileUser({ picture: file }),
      ).unwrap();
      dispatch(authActions.syncActiveSession(updatedData?.data || updatedData));
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error(err || "Failed to update profile picture");
    } finally {
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name) return toast.error("Name is required");

    try {
      const updatedData = await dispatch(
          authActions.updateProfileUser({
            email: formData.email,
            full_name: formData.full_name,
            phone: formData.phone,
          }),
      ).unwrap();
      dispatch(authActions.syncActiveSession(updatedData?.data || updatedData));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };

  return (
      <div className="w-full pb-10">
        <div className="flex items-center gap-2 mb-6 text-primary px-4 md:px-0">
          <User className={"text-2xl font-bold"} />
          <h1 className="text-xl font-bold text-black">Profile</h1>
        </div>

        <div className="w-full bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm p-4 md:p-8">
          <div className="mb-8">
            <h3 className="font-semibold text-black text-base mb-4">
              Account Information
            </h3>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="bg-gray-50 rounded-xl p-3 w-24 h-24 flex items-center justify-center shrink-0 border border-gray-100">
                <Avatar
                    imageSrc={loginUser?.profile_picture_url}
                    className="w-full h-full border-2 border-primary-light"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                />
                <Button
                    type="button"
                    className="text-sm"
                    isLoading={isLoading}
                    onClick={() => fileInputRef.current?.click()}
                >
                  <Pencil size={24} />
                  Change Profile
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="py-2.5 border border-danger text-danger hover:bg-danger/10 text-sm"
                    onClick={() => toast.info("Delete profile picture belum tersedia di backend.")}
                >
                  <Trash2 size={24} />
                  Delete Profile
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              The profile picture must be 512 x 512 pixels or less
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter Full Name"
                disabled={isLoading}
            />

            <Input
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Your Number Phone"
                disabled={isLoading}
            />

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                disabled={true}
                placeholder="Enter Your Email"
                className="bg-gray-50 cursor-not-allowed opacity-80"
            />

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <button
                  type="button"
                  className="text-primary text-sm font-medium hover:underline cursor-pointer"
                  onClick={() => navigate("/profile/change-password")}
              >
                Change Password
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Pin</label>
              <button
                  type="button"
                  className="text-primary text-sm font-medium hover:underline cursor-pointer"
                  onClick={() => navigate("/profile/change-pin")}
              >
                Change Pin
              </button>
            </div>

            <div className="mt-4">
              <Button
                  type="submit"
                  isLoading={isLoading}
                  isFullWidth={true}
                  className="py-3.5 font-bold shadow-md mt-4"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Profile;