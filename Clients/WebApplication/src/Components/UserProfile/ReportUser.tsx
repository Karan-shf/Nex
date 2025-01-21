import ModalButton from "../ModalButton/ModalButton"
import ReportForm from "./ReportForm"


interface Props{
    userID:string
}


const ReportUser = ({userID}:Props) => {


    return (

        <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn m-1">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-10`}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                </svg>
            </div>
            <div tabIndex={0} className="border-2 border-darkGray dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {/* <button onClick={()=>SendReport(userID)}>Report User</button> */}
                <ModalButton title="Report User" id="reportUser" />
            </div>
            <ReportForm reportedID={userID} />
        </div>
 
  )
}

export default ReportUser