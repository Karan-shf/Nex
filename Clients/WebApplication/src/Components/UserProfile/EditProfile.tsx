import { useRef, useState } from "react";
import { useUserContext } from "../../contexts/UserContexts";
import { closeModalWithId, GetMediaLink } from "../../functions/functions";
import defaultBackPic from '../../assets/images/Frame 5(1).png';
import defaultUser from '../../assets/images/defaultAvatar.jpg';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APILink } from "../../consts/consts";
import { toast } from "react-toastify";
import _ from "lodash";

const EditProfile = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { user , setUser } = useUserContext();

    // States to manage file inputs
    const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    let queryClient = useQueryClient();


    // Refs to store text input values
    const nameRef = useRef<HTMLInputElement>(null);
    const aboutRef = useRef<HTMLTextAreaElement>(null);

    interface EditInterface {
        reqData: {name:string |undefined , aboutUser?:string |undefined} | undefined,
        profilePic?: File | null
        backGroundPic?: File | null
    }

    const editUser = useMutation({
        mutationFn: async ({ reqData, profilePic ,backGroundPic  }: EditInterface) => {
            const formData = new FormData();
            
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }
            if (backGroundPic) {
                formData.append("backGroundPic", backGroundPic);
            }
            if (!reqData?.aboutUser) {
                reqData = {name : reqData?.name}
            }
            
            formData.append("reqData", JSON.stringify(reqData));
            
            const result = await fetch(APILink + "iam/user/editProfile", {
                method: "PUT",
                // credentials: "include",
                headers: {
                    // "Content-Type": "application/json"
                    "x-auth-token":localStorage.getItem('x-auth-token') ?? ''
                },
                body: formData,
            });
            const jsonResult = await result.json();
            //   console.log(jsonResult)
            if (result.ok) {
                setUser({...user ,profilePic:jsonResult?.profilePic })
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
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            toast.success("Your Information Got Updated")
            closeModalWithId("editProfile")
    
            //   navigate("/operations/addSubOperation/"+savedOperation.data.id);
        },
        onError: (error) => {
            console.log("error12");
            console.log(error);
            toast.error("sth went wrong")
            // console.log(error.message);
            // let errorText = 'error';
            // setError(error.message);
            // setSubmitLoading(false);
            
        },
    });

    const handleSave = () => {
        const updatedName = nameRef.current?.value;
        const updatedAbout = aboutRef.current?.value;
        const reqData = {"name":updatedName , "aboutUser":updatedAbout}
        const backGroundPic= backgroundFile
        const profilePic = profileFile

        console.log({
            name: updatedName,
            about: updatedAbout,
            backgroundFile,
            profileFile,
        });

        editUser.mutate({
            reqData,profilePic, backGroundPic
        });

        // Perform the save logic here (e.g., send to backend)
    };

    return (
        <dialog ref={dialogRef} id="editProfile" className="modal">
            <div className="modal-backdrop bg-backdropp"></div>
            <div className="modal-box xl:w-5/12 lg:w-5/12 md:w-6/12 h-full sm:w-7/12 w-full max-w-2xl absolute top-10 overflow-visible">
                <div className="mb-10 font-semibold text-xl flex justify-between items-center">
                    <form
                        method="dialog"
                        onSubmit={() => {
                            console.log("closed!!");
                        }}
                    >
                        <div className="flex gap-3">
                            <button type="button" onClick={()=>{closeModalWithId("editProfile")}} className="btn-ghost">✕</button>
                            Edit Profile
                        </div>
                    </form>

                    <button
                        className="text-base bg-white text-black px-5 py-1 rounded-full"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>

                {/* Background Image */}
                <label className="relative block">
                    <img
                        className="h-40 w-full object-cover"
                        src={
                            backgroundFile
                                ? URL.createObjectURL(backgroundFile)
                                : user?.backGroundPic
                                ? GetMediaLink(user.backGroundPic)
                                : defaultBackPic
                        }
                        alt="Background"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) =>
                            setBackgroundFile(e.target.files?.[0] || null)
                        }
                    />
                </label>

                <div className="absolute w-full top-44">
                    <div className="flex justify-between items-center">
                        <div className="w-11/12">
                            {/* Profile Image */}
                            <label className="relative block w-fit">
                                <img
                                    className="w-28 h-28 border-base-100 border-2 rounded-full object-cover"
                                    src={
                                        profileFile
                                            ? URL.createObjectURL(profileFile)
                                            : user?.profilePic
                                            ? GetMediaLink(user.profilePic)
                                            : defaultUser
                                    }
                                    alt="Profile"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                        setProfileFile(e.target.files?.[0] || null)
                                    }
                                />
                            </label>

                            {/* Name Input */}
                            <input
                                ref={nameRef}
                                placeholder="What should we call you?"
                                className="text-xl bg-base-100 font-semibold mt-4 w-full border-2 px-4 py-3 rounded-xl border-darkGray"
                                defaultValue={user?.name}
                            />

                            {/* About Input */}
                            <textarea
                                ref={aboutRef}
                                maxLength={160}
                                placeholder="Say something about yourself"
                                className="text-xl resize-none bg-base-100 font-semibold mt-6 w-full h-32 border-2 px-4 py-3 rounded-xl border-darkGray"
                                defaultValue={user?.aboutUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default EditProfile;
