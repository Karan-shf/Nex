import { useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";

const ChooseProfilePicture = () => {
  const {setStage , userObj ,setUserObj } = useSignupContext();
  const [error , setError] = useState('')
  const [repeat , setRepeat] = useState('')


  async function HandleNextStage(){
      setStage("username")
  }
  return (
    <div className="px-10 h-96">
    <h2 className="text-3xl font-semibold ">Pick a Profile Picture</h2>

    <form className="flex flex-col justify-between items-center h-full ">
      <p className="text-xl text-error mb-6 mt-2">{error}</p>

        {/* <input
        placeholder="Verfication code"
        className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
        type="text"
        // onChange={(e)=>setUserObj({...userObj , email:e.target.value})}
        /> */}

        <div className=""></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 h-52 w-52 text-accent rounded-full">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>


        <button onClick={()=>HandleNextStage()} className="bg-white text-black rounded-md px-6 py-2 w-full mb-3 text-2xl " type="button" >
            {/* <span className="text-primary">Nex</span>t */}
            Skip For Now
        </button>
    </form> 
  </div> 
  )
}

export default ChooseProfilePicture