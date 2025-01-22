import { useRef, useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContexts";
import defaultUser from "../assets/images/defaultAvatar.jpg";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {toast } from 'react-toastify';
import { closeModal, closeModalWithId, GetMediaLink } from "../functions/functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APILink } from "../consts/consts";
import PostAComment from "./PostAComment";
import _ from "lodash";

const PostAPost = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading , setIsLoading] = useState(false)
  const [file,setFile] = useState<File|null>(null)
  let queryClient = useQueryClient();
  

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
    const tempFile = event.target.files?.[0];
    if (tempFile) {
      const objectUrl = URL.createObjectURL(tempFile); // Generate a preview URL
      setMediaPreview(objectUrl);
      console.log(objectUrl , 'obj')
      setFile(tempFile)
    }
  };

    interface PostNexusInterface{
        reqData : {content:string , quotedFrom?:number , repliesTo?:number }
        file: File|null
    }

    const postaNexus = useMutation({
        mutationFn: async ({ reqData, file }: PostNexusInterface) => {
            toast.info("Nexus is forming, please be patient")
            const formData = new FormData();
            formData.append("reqData", JSON.stringify(reqData));
            if (file) {
                formData.append("file", file);
            }
            const result = await fetch(APILink + "core/post/", {
                method: "POST",
                // credentials: "include",
                headers: {
                    // "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("x-auth-token") ?? ""
                },
                body: formData,
            });
            const jsonResult = await result.json();
            //   console.log(jsonResult)
            if (result.ok) {
                return jsonResult;
            } else {
                let errorMessage = "unexpected error";

                if (_.isString(jsonResult)) {
                    errorMessage = jsonResult;
                } else {
                    console.log("random error")
                }
                throw new Error(errorMessage);
            }
        },
        onSuccess: () => {
            console.log("success");
            // queryClient.invalidateQueries({ queryKey: ["bots"] });
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            toast.success("Nexus Posted")
            setIsLoading(false)
            closeModalWithId("test")

            //   navigate("/operations/addSubOperation/"+savedOperation.data.id);
        },
        onError: (error) => {
            console.log("error12");
            console.log(error);
            toast.error("Something went wrong")
            // console.log(error.message);
            // let errorText = 'error';
            // setError(error.message);
            // setSubmitLoading(false);
            
        },
    });

    const nexusSubmit = ({ reqData, file }: PostNexusInterface) => {
        // setSubmitLoading(true);
        console.log("111");
        // console.log(data.avatar["0"]);
        // data.avatar = data.avatar["0"];
        console.log('sthh', reqData, file);
        postaNexus.mutate({
            reqData, file
        });
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

          <PostAComment type="Post"/>
      </div>
    </dialog>
  );
};

export default PostAPost;
