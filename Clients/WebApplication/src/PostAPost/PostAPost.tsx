import { useRef, useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContexts";
import defaultUser from "../assets/images/defaultAvatar.jpg";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {toast } from 'react-toastify';

const PostAPost = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading , setIsLoading] = useState(false)
  

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    if (input.length <= 280) {
      setContent(input);
      adjustTextareaHeight();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to calculate the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent((prevContent) => prevContent + emojiData.emoji);
    adjustTextareaHeight();
  };

  const handleMediaPicker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file); // Generate a preview URL
      setMediaPreview(objectUrl);
      console.log(objectUrl , 'obj')
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height when the component mounts
  }, [content]);

  return (
    <dialog ref={dialogRef} id="test" className="modal">
      <div className="modal-backdrop bg-backdropp"></div>
      <div className="modal-box xl:w-5/12 lg:w-5/12 md:w-6/12 sm:w-7/12 w-full  max-w-2xl absolute top-10 overflow-visible">
        <form
          className="mb-10"
          method="dialog"
          onSubmit={() => {
            console.log("closed!!");
            setMediaPreview(null)
            setContent("")

          }}
        >
          Form a Nexus
          <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <div className=" overflow-auto max-h-80">
            <div className="flex">
            <img className="max-w-12 max-h-12 rounded-full" src={defaultUser} alt="User" />
            <div className="pl-5 w-full h-fit">
                <textarea
                ref={textareaRef}
                cols={10}
                maxLength={280}
                rows={1} // Default row count for minimal height
                value={content}
                onChange={handleInputChange}
                className="resize-none w-full h-fit bg-base-100 focus:outline-none focus:border-none overflow-hidden"
                style={{ overflow: "hidden" }} // Hide the scrollbar
                ></textarea>
                <div
                className={`text-right text-base mb-1 ${
                    content.length > 250 ? "text-primary" : "text-secondary"
                }`}
                >
                {content.length}/280
                </div>
            </div>
            </div>
            {mediaPreview && (
            <div className="mt-3">
                {/* <p className="text-sm text-secondary mb-1">Selected Media:</p> */}
                {mediaPreview.match(/image/) ? (
                <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-w-full max-h-96 rounded-md border"
                />
                ) : (
                    <div className="relative w-fit rounded-lg">
                        <button onClick={()=>setMediaPreview(null)} className="px-2 py-1 text-lg border-none backdrop-blur-md absolute right-2 top-2 bg-backdropDark  rounded-full hover:bg-white hover:text-black transition-colors">✕</button>
                        <img
                        src={mediaPreview}
                        alt="Preview"
                        className="max-w-full"
                        style={{maxHeight:'800px'}}
                        />

                    </div>
                // <video
                //     src={mediaPreview}
                //     controls
                //     className="max-w-full max-h-96 rounded-md border"
                // ></video>
                )}
            </div>
            )}

        </div>

        <hr className="w-full text-secondary"></hr>
        <div className="flex justify-between mt-3">
          <div className="flex gap-2">
            <label htmlFor="mediaPicker">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-primary cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <input
                id="mediaPicker"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaPicker}
              />
            </label>

            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </button>
          </div>
          <button onClick={()=>{toast.info("Nexus is forming, please be patient");setIsLoading(true)}} className="px-6 py-1 rounded-full text-base font-semibold text-primary border-2 border-r-primary">
            {!isLoading ? "Form" : <span className="loading loading-dots loading-md"></span> }
          </button>
        </div>

        {showEmojiPicker && (
          <div
            style={{
              transform: "scale(0.7)",
              transformOrigin: "top right",
              width: "auto",
            }}
            className="absolute top-72 left-20 z-50"
          >
            <EmojiPicker theme="dark" onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </dialog>
  );
};

export default PostAPost;
