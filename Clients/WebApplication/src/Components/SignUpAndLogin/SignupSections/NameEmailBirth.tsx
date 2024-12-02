import { useState } from "react";
import { useSignupContext } from "../../../contexts/SignupContext";
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import { APILink } from "../../../consts/consts";

const NameEmailBirth = () => {
    const { userObj, setUserObj, setStage } = useSignupContext();
    const [error , setError] = useState('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function HandleNextStage(){
        if (userObj?.name && userObj?.email && userObj?.birthDate){
            try {
                const res = await fetch(APILink+"IAM/user/check/email", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", 
                  },
                  body: JSON.stringify({email:userObj?.email}), 
                });
          
                const result = await res.json(); 

                if(result.success){
                    setError('')
      
                  }else if(emailRegex.test(userObj?.email)){
                    setError("Email already exists")
                  }else{
                    setError("Enter a valid email")
                  }
          
                if (res.ok) {
                  // Handle success
                //   setError('')
                  setStage("password")
                  console.log("Request successful:", result);
                } else {
                  // Handle failure
                  console.log("Request failed:", result);
                }
              } catch (error) {
                setError("Email already exists")
                console.error("Error occurred:", error);
              }
            
        }else{
            setError("fill all the fields")
        }
    }

    const handleDateChange = (date: Date | null) => {
        setUserObj({
          ...userObj,
          birthDate: date || undefined,
        });
    };

    return (
        
            <div className="px-10 h-96">
                <h2 className="text-3xl font-semibold ">Create an Account</h2>

                <form className="flex flex-col justify-between h-full">
                    <p className="text-xl text-error mb-6 mt-2">{error}</p>
                    <div>
                    <input
                    placeholder="Email"
                    className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
                    type="email"
                    onChange={(e)=>setUserObj({...userObj , email:e.target.value})}
                    />

                    <input
                    placeholder="Name"
                    className="bg-base-100 border-2 rounded-lg border-accent p-3 mb-6 placeholder-accent w-full"
                    type="text"
                    onChange={(e)=>setUserObj({...userObj , name:e.target.value})}
                    />

                    <div className="mb-8">
                        <label className="block text-xl font-semibold mb-2">Date of birth</label>
                        <div className="relative  border-2 rounded-lg border-accent">
                        <DatePicker
                            selected={userObj?.birthDate || null}
                            onChange={handleDateChange}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Select your birthdate"
                            className="rounded-lg bg-base-100 p-3 w-full placeholder-accent"
                            showMonthDropdown
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                        <AiOutlineCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent" />
                        </div>
                    </div>
                    </div>



                    <button onClick={()=>HandleNextStage()} className="bg-white text-black rounded-md px-6 py-2 w-full text-2xl mb-3" type="button" >
                        <span className="text-primary">Nex</span>t
                    </button>
                </form> 
            </div> 
        
    )
}

export default NameEmailBirth