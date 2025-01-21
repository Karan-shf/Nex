import ModalButton from "../ModalButton/ModalButton"
import ReportForm from "../UserProfile/ReportForm"


interface Props{
    postID:number
}

const ReportPost = ({postID}:Props) => {
  return (
    <div className="dropdown dropdown-end absolute top-3 right-6 ">
        <button tabIndex={0} role="" className=" m-1  ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-secondary">
                    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                </svg>
        </button>
        <div tabIndex={0} className="border-2 border-darkGray dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {/* <button onClick={()=>SendReport(userID)}>Report User</button> */}
            <ModalButton title="Report Post" id="reportUser" />
        </div>
            <ReportForm isUser={false} reportedID={postID.toString()} />
    </div>
  )
}

export default ReportPost