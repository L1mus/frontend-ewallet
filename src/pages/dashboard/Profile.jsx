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
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("File type not allowed. Use JPG, PNG, or WEBP,.");
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 2MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Profile picture removed from selection.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      return toast.error("Full name is required.");
    }

    const payload = {
      full_name: formData.full_name,
      phone: formData.phone,
    };
    if (selectedFile) {
      payload.picture = selectedFile;
    }

    try {
      const updatedData = await dispatch(
        authActions.updateProfileUser(payload),
      ).unwrap();

      dispatch(authActions.syncActiveSession(updatedData?.data || updatedData));

      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err || "Failed to update profile.");
    }
  };

  const displayAvatar =
    previewUrl || loginUser?.profile_picture_url || "/defaultAvatar.jpg";

  return (
    <div className="w-full pb-10">
      <div className="text-primary mb-6 flex items-center gap-2 px-4 md:px-0">
        <User className="text-2xl font-bold" />
        <h1 className="text-xl font-bold text-black">Profile</h1>
      </div>

      <div className="w-full bg-white p-4 md:rounded-xl md:border md:border-gray-200 md:p-8 md:shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="mb-4">
            <h3 className="mb-4 text-base font-semibold text-black">
              Account Information
            </h3>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-3">
                <Avatar
                  imageSrc={displayAvatar}
                  className="border-primary-light h-full w-full border-2"
                />
                {previewUrl && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] leading-none font-bold text-amber-900">
                    NEW
                  </span>
                )}
              </div>

              <div className="flex w-full flex-col gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <Button
                  type="button"
                  className="text-sm"
                  isLoading={false}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Pencil size={18} />
                  {selectedFile ? "Change Photo" : "Select Photo"}
                </Button>

                {(previewUrl || loginUser?.profile_picture_url) && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-danger text-danger hover:bg-danger/10 border py-2.5 text-sm"
                    onClick={handleRemovePhoto}
                  >
                    <Trash2 size={18} />
                    {previewUrl ? "Cancel Selection" : "Delete Photo"}
                  </Button>
                )}

                {selectedFile && (
                  <p className="text-grey max-w-xs truncate text-xs">
                    Selected:{" "}
                    <span className="font-medium text-black">
                      {selectedFile.name}
                    </span>{" "}
                    ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </p>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Profile picture must be JPG, PNG, WEBP, or GIF — max 2MB. Changes
              are saved when you click <strong>Save Changes</strong>.
            </p>
          </div>

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
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter Your Phone Number"
            disabled={isLoading}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={loginUser?.email || ""}
            disabled={true}
            placeholder="Enter Your Email"
            className="cursor-not-allowed bg-gray-50 opacity-80"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Password
            </label>
            <button
              type="button"
              className="text-primary cursor-pointer text-sm font-medium hover:underline"
              onClick={() => navigate("/profile/change-password")}
            >
              Change Password
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              PIN
            </label>
            <button
              type="button"
              className="text-primary cursor-pointer text-sm font-medium hover:underline"
              onClick={() => navigate("/profile/change-pin")}
            >
              Change PIN
            </button>
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              isLoading={isLoading}
              isFullWidth={true}
              className="mt-4 py-3.5 font-bold shadow-md"
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
