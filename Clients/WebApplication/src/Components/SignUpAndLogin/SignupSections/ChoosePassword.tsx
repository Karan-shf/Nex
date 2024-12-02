import { useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";

const ChoosePassword = () => {
  const {setStage , userObj ,setUserObj } = useSignupContext();
  const [error , setError] = useState('')
  const [repeat , setRepeat] = useState('')
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,16}$/;

  async function HandleNextStage(){
    if (repeat == userObj?.password){
      if(regex.test(userObj?.password)){
        setStage("pfp")
      }else{
        setError("You should use atleast 1 lowercase letter and one uppercase letter and 1 symbol and between 8 to 16 letters")
      }
      
    }else{
      setError("Repeated password doesnt match")
    }
  }
  return (
      <div className="px-10 h-96">
        <h2 className="text-3xl font-semibold ">Pick a Password</h2>

        <form className="flex flex-col justify-around h-96">
          <p className="text-xl text-error mb-6 mt-2">{error}</p>
          <div>
            <input
            placeholder="Password"
            className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
            type="password"
            onChange={(e)=>setUserObj({...userObj , password:e.target.value})}
            />

            <input
            placeholder="Repeat Password"
            className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
            type="password"
            onChange={(e)=>setRepeat(e.target.value)}
            />
          </div>

          <button onClick={()=>HandleNextStage()} className="bg-white text-black rounded-md px-6 py-2 w-full text-2xl mb-3" type="button" >
              <span className="text-primary">Nex</span>t
          </button>
        </form> 
      </div> 
   
  )
}

export default ChoosePassword