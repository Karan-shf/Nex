import { useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";
import { APILink } from "../../../consts/consts";


const ChooseUsername = () => {
  const { userObj, setUserObj, setStage } = useSignupContext();
  const [error , setError] = useState('')

  async function CheckUsername(username:string){
        setUserObj({...userObj , username:username})
        try {
            const res = await fetch(APILink+"IAM/check/username", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify({username:username}), 
            });
      
            const result = await res.json(); 
            
            if(result.success){
              setError('')

            }else{
            setError("Username already exists")

            }
            if (res.ok) {
              // Handle success
              // setError('')
              console.log("Request successful:", result);
            } else {
              // Handle failure
              console.log("Request failed:", result);
            }
          } catch (error) {
            setError("Username already exists")
            console.error("Error occurred:", error);
          }     
}

async function HandleNextStage(){
  if(error==""){
    setStage("verf code")
  }
}

  return (
    <div className="px-10 h-96">
    <h2 className="text-3xl font-semibold ">What Should We Call You</h2>

    <form className="flex flex-col justify-between h-full ">
      <p className="text-xl text-error mb-6 mt-2">{error}</p>

        <input
        placeholder="username"
        className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
        type="text"
        onChange={(e)=>CheckUsername(e.target.value)}
        />

        <button onClick={()=>HandleNextStage()} className="bg-white text-black rounded-md px-6 py-2 w-full mb-3 text-2xl " type="button" >
            <span className="text-primary">Nex</span>t
        </button>
    </form> 
  </div> 
  )
}

export default ChooseUsername