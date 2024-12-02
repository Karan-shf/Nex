import { useEffect, useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";
import { APILink } from "../../../consts/consts";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { userObj, setUserObj, setStage } = useSignupContext();
  const [error , setError] = useState('')
  const navigate = useNavigate()

  async function SendEmail() {
    try {
      const res = await fetch(APILink+"IAM/otp/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({email:userObj?.email}), 
      });

      const result = await res.json(); 

      if(result.success){
          setError('')

        }else{
        // setError("Something went wrong")

        }

      if (res.ok) {
        // Handle success
      //   setError('')
        console.log("Request successful:", result);
        const token = res.headers.get("x-auth-token")
        localStorage.setItem("x-auth-token" , token ?? '')
      } else {
        // Handle failure
        console.log("Request failed:", result);
      }
    } catch (error) {
      setError("Something went wrong")
      console.error("Error occurred:", error);
    }
    
  }

  useEffect(()=>{
    SendEmail()
  },[])

  async function HandleNextStage(){
    try {
      const res = await fetch(APILink+"IAM/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(userObj), 
      });

      const result = await res.json(); 
      
      // if(result.success){
      //   setError('')
      //   console.log('yayyy',result)
      // }else{
      // setError("something went wrong")

      // }
      if (res.ok) {
        // Handle success
        // setError('')
        console.log("Request successful:", result);
        navigate("/userProfile")

      } else {
        // Handle failure
        console.log("Request failed:", result);
      }
    } catch (error) {
      setError("something went wrong")
      console.error("Error occurred:", error);
    }
  }
  return (
      <div className="px-10 h-96">
        <h2 className="text-3xl font-semibold ">We Sent You a Code</h2>

        <form className="flex flex-col justify-between h-full ">

            <p className="text-xl text-error mb-6 mt-2">{error}</p>
            <input
            placeholder="Verfication code"
            className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
            type="text"
            onChange={(e)=>setUserObj({...userObj , verificationCode:e.target.value})}
            />

            <button onClick={()=>HandleNextStage()} className="bg-white text-black rounded-md px-6 py-2 w-full mb-3 text-2xl " type="button" >
                <span className="text-primary">Nex</span>t
            </button>
        </form> 
      </div> 
    
  
  )
}

export default VerifyEmail