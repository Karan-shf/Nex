import { useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";

const ChooseProfilePicture = () => {
  const { setStage, userObj, setUserObj , setProfilePic } = useSignupContext();
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null); // Store selected image
  const [preview, setPreview] = useState<string | null>(null); // Store preview URL

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
      setError("");
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleNextStage = () => {
    if (profileImage) {
      setProfilePic(profileImage)
    }
    setStage("username");
  };

  return (
    <div className="px-10 h-96">
      <h2 className="text-3xl font-semibold">Pick a Profile Picture</h2>

      <form className="flex flex-col justify-between items-center h-full">
        <p className="text-xl text-error mb-6 mt-2">{error}</p>

        <label htmlFor="profilePictureInput" className="cursor-pointer">
          {/* Profile Picture Preview or Placeholder */}
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              className="h-52 w-52 rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-52 w-52 text-accent rounded-full"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </label>

        {/* Hidden File Input */}
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleNextStage}
          className="bg-white text-black rounded-md px-6 py-2 w-full mb-3 text-2xl"
          type="button"
        >
          {!profileImage? "Skip For Now" : <><span className="text-primary">Nex</span>t</>}
        </button>
      </form>
    </div>
  );
};

export default ChooseProfilePicture;
