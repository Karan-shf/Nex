import { useEffect, useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";
import { APILink } from "../../../consts/consts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {toast } from 'react-toastify';
import { useMutation } from "@tanstack/react-query";
import { UserSignupInterface } from "../../../Interfaces/Interfaces";
import _ from "lodash";

interface RegisterInterface {
    reqData: UserSignupInterface | undefined,
    file: File | undefined
}


const VerifyEmail = () => {
  const { userObj, setUserObj, setStage , profilePic } = useSignupContext();
  const [error , setError] = useState('')
  const navigate = useNavigate()
  let queryClient = useQueryClient();

  async function SendEmail() {
    try {
      const res = await fetch(APILink+"IAM/user/otp/sendEmail", {
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

      } else {
        // Handle failure
        console.log("Request failed:", result);
      }
    } catch (error) {
      setError("Something went wrong")
      console.error("Error occurred:", error);
    }
    
  }

  const registerUser = useMutation({
    mutationFn: async ({ reqData, file }: RegisterInterface) => {
        const formData = new FormData();
        formData.append("reqData", JSON.stringify(reqData));
        if (file) {
            formData.append("file", file);
        }
        const result = await fetch(APILink + "iam/user/register", {
            method: "POST",
            // credentials: "include",
            headers: {
                // "Content-Type": "application/json"
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
        toast.success("Welcome!")
        navigate("/")

        //   navigate("/operations/addSubOperation/"+savedOperation.data.id);
    },
    onError: (error) => {
        console.log("error12");
        console.log(error);
        toast.error("Couldnt Login")
        // console.log(error.message);
        // let errorText = 'error';
        // setError(error.message);
        // setSubmitLoading(false);
        
    },
});
 const userSubmit = ({ reqData, file }: RegisterInterface) => {
    // setSubmitLoading(true);
    console.log("111");
    // console.log(data.avatar["0"]);
    // data.avatar = data.avatar["0"];
    console.log('sthh', reqData, file);
    registerUser.mutate({
        reqData, file
    });
};

  useEffect(()=>{
    SendEmail()
  },[])

  
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

            <button onClick={()=>userSubmit({reqData:userObj , file:profilePic})} className="bg-white text-black rounded-md px-6 py-2 w-full mb-3 text-2xl " type="button" >
                <span className="text-primary">Nex</span>t
            </button>
        </form> 
      </div> 
    
  
  )
}

export default VerifyEmail