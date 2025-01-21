import logo from "../../assets/images/LogoNex.png"
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APILink } from "../../consts/consts";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error , setError] = useState("")
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate()

    let queryClient = useQueryClient();
    const signIn = useMutation({
        mutationFn: async (user : { email : string , password : string}) => {
            
            console.log("tesssst")
            const result = await fetch(APILink + "iam/user/login", {
                method: "POST",
                // credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(user),
          });
          const jsonResult = await result.json();
        //   console.log(jsonResult)
          if(result.ok){
            setError('')
            console.log(jsonResult)
            console.log("ll",result.headers)
            
            const token = result.headers.get("x-auth-token")
            localStorage.setItem("x-auth-token",token??'')
            
            navigate("/userProfile")

            return jsonResult
          }else{
            setError("Please fill the form correctly")
          }
        },
        onSuccess: (savedUser, user) =>{
            // closeModal(dialogRef.current)
            console.log(savedUser);
            console.log(user);
            // localStorage.setItem("auth-token-nex",result.token);
            // localStorage.setItem("auth-refresh",savedUser.refresh);
            queryClient.invalidateQueries({queryKey:["user"]});
            // setUser({id : savedUser.id, username : user.email})
            // navigate("/operations");
        },
        onError: (error) =>{
            console.log("error12");
            // console.log(error);
            // console.log(error.message);
            // let errorText = 'error';
            setError("Please fill the form correctly")
        }
    });

    return (
        <dialog id="login" className="modal" ref={dialogRef} >
            <div className="modal-backdrop bg-backdropp"></div>
            <div className="modal-box md:w-5/12 sm:w-8/12 w-full max-w-5xl " style={{height:"600px"}}>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-3xl text-2xl btn-circle btn-ghost absolute right-2 top-2">
                ✕
                </button>
            </form>
                <div className="w-full flex justify-center">
                    <img src={logo} className="mb-4 w-14"/>
                </div>

                <div className="px-10 h-96">
                    <form className=" flex flex-col justify-between h-full ">
                        <h2 className="text-3xl font-semibold">Login to Your Account</h2>
                        <p className="text-xl text-error mb-6 mt-2">{error}</p>
                        <div>
                            <input
                            placeholder="Email"
                            className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
                            type="text"
                            ref={emailRef}
                            />

                            <input
                            type="password"
                            placeholder="Password"
                            className="bg-base-100 border-2 rounded-lg border-accent p-3 placeholder-accent w-full"
                            ref={passwordRef}
                            />
                        </div>

                        <button onClick={()=>signIn.mutate({email: emailRef?.current?.value.trim()??'',password :passwordRef?.current?.value.trim()??''})} className="bg-white text-black rounded-md px-6 py-2 w-full text-2xl " type="button" >
                            <span className="text-primary">Nex</span>t
                        </button>
                    </form>                 
                </div>
            </div>
        </dialog>
  )
}

export default Login