import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/LogoNex.png"
import NameEmailBirth from "./SignupSections/NameEmailBirth";
import VerifyEmail from "./SignupSections/VerifyEmail";
import ChoosePassword from "./SignupSections/ChoosePassword";
import ChooseProfilePicture from "./SignupSections/ChooseProfilePicture";
import ChooseUsername from "./SignupSections/ChooseUsername";
import { UserSignupInterface } from "../../Interfaces/Interfaces";
import { SignupContext } from "../../contexts/SignupContext";



const Signup = () => {
  const [error , setError] = useState("")
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [stage , setStage] = useState<"name email birth" |"verf code" |"password" |"pfp" |"username">("name email birth")
  const [userObj , setUserObj] = useState<UserSignupInterface | undefined>(
    {
      email: "",
      password: "",
      username: "",
      name: "",
      birthDate: new Date(), 
      // pfp: "",
    }
  )

  useEffect(()=>{
    setStage("name email birth")
  },[])

  return (
    <dialog id="signup" className="modal" ref={dialogRef} >
      <div className="modal-backdrop bg-backdropp"></div>
        <div className="modal-box md:w-5/12 sm:w-8/12 w-full max-w-5xl " style={{height:'600px'}}>
          <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={()=>{setStage("name email birth");setUserObj({email: "",password: "",username: "",name: "",birthDate: new Date(), 
    })}} className="btn btn-3xl text-2xl btn-circle btn-ghost absolute right-2 top-2">
              ✕
              </button>
          </form>

          <div className="w-full flex justify-center">
                    <img src={logo} className="mb-4 w-14"/>
                </div>

                {/* <div className="px-10">
                    <h2 className="text-3xl font-semibold mb-10">Login to Your Account</h2>
                    <p className="text-xl">{error}</p>
                </div> */}
                <SignupContext.Provider value={{ userObj, setUserObj, stage, setStage }}>
                  {stage=="name email birth" && <NameEmailBirth/>}
                  {stage=="verf code" && <VerifyEmail />}
                  {stage=="password" && <ChoosePassword />}
                  {stage=="pfp" && <ChooseProfilePicture />}
                  {stage=="username" && <ChooseUsername />}
                </SignupContext.Provider>

                
                
        </div>
    </dialog>
  )
}

export default Signup