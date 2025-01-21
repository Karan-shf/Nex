import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APILink } from "../../consts/consts";
import { closeModal, closeModalWithId } from "../../functions/functions";

interface Props {
  reportedID: string;
  isUser?: boolean
}

const ReportForm = ({ reportedID , isUser }: Props) => {
  const [reportType, setReportType] = useState<string>("");
  const [furtherExplanation, setFurtherExplanation] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const endpoint = isUser ? "core/report/user" : "core/report/post";
  let queryClient = useQueryClient();
  const navigate = useNavigate();


    const sendReport = useMutation({
        mutationFn: async (report : {
            reportedID: string;
            reportType: string;
            furtherExplanations: string;
        }) => {

            console.log("tesssst")
            console.log(report)
            const result = await fetch(APILink + endpoint, {
                method: "POST",
                credentials: 'include',
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("x-auth-token") ?? ''
                },

                body: JSON.stringify(report),
        });
        const jsonResult = await result.json();
        //   console.log(jsonResult)
        if(result.ok){
            return jsonResult
        }else{
            let errorMessage = "unexpected error";
            throw new Error(errorMessage);
        }
        },
        onSuccess: (savedOperation, operation) =>{

            console.log(savedOperation);
            console.log(operation);
            queryClient.invalidateQueries({queryKey:["Reports"]});
            // setSubmitLoading(false);

            
            closeModalWithId("userReport")

        },
        onError: (error) =>{
            console.log("error12");
            console.log(error);
            // console.log(error.message);
            // let errorText = 'error';
            // setError(error.message);
            // setSubmitLoading(false);
        }
    }); 
        const formSubmit = (e :any) => {
    e.preventDefault();
    // setSubmitLoading(true);
    sendReport.mutate({"reportType":reportType , "furtherExplanations":furtherExplanation ,"reportedID":reportedID});
    }  



    
    
    // Close the dialog (optional)
    // if (dialogRef.current) {
    //   dialogRef.current.close();
    // }


  return (
    <dialog ref={dialogRef} id="reportUser" className="modal">
      <div className="modal-backdrop bg-backdropp"></div>
      <div className="modal-box xl:w-5/12 lg:w-5/12 md:w-6/12 sm:w-7/12 w-full max-w-2xl absolute top-10 overflow-visible rounded-3xl">
        <form
          className="mb-10 text-xl font-semibold"
          method="dialog"
        >
          {isUser ? "Report a User" : "Report a Post"}
          <button
            type="button"
            className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => dialogRef.current?.close()}
          >
            ✕
          </button>
        </form>

        <textarea
          cols={10}
          rows={8}
          placeholder="Information..."
          maxLength={300}
          className="focus:outline-none p-3 resize-none w-full text-lg rounded-xl border-2 border-darkGray bg-base-100"
          value={furtherExplanation}
          onChange={(e) => setFurtherExplanation(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-7 md:text-lg text-sm">
          <button onClick={(e)=>{formSubmit(e)}} className="px-10 py-1 bg-white text-black rounded-full">
            Done
          </button>
          <select
            className="px-10 py-2 bg-base-100 text-white border-2 border-darkGray rounded-full"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option selected >
              Reason
            </option>
            <option >Hate Speech</option>
            <option>Harassment</option>
            <option>Violent Speech</option>
            <option>Child Safety</option>
            <option>Privacy</option>
            <option>Spam</option>
          </select>
        </div>
      </div>
    </dialog>
  );
};

export default ReportForm;
