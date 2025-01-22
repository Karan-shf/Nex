import InfiniteScroll from "react-infinite-scroll-component";
import useGetReports from "./useGetReports";
import React from "react";
import { formatPostsDate } from "../../functions/functions";
import { APILink } from "../../consts/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props{
    time: "history"|"pending"
    type: "user"|"post"

}
const AdminReportViewer = ({time , type}:Props) => {

    let queryClient = useQueryClient();
    const ProcessReport = useMutation({
        mutationFn: async (user : { status : string , reportID : number}) => {
            
            console.log("tesssst")
            const result = await fetch(APILink + `core/admin/processReport/${type}Report`, {
                method: "POST",
                // credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token":localStorage.getItem("x-auth-token") ?? ''
                },

                body: JSON.stringify(user),
          });
          const jsonResult = await result.json();
          if(result.ok){

            return jsonResult
          }else{
           
          }
        },
        onSuccess: (savedUser, user) =>{
            // closeModal(dialogRef.current)
            console.log(savedUser);
            console.log(user);
            // localStorage.setItem("auth-token-nex",result.token);
            // localStorage.setItem("auth-refresh",savedUser.refresh);
            queryClient.invalidateQueries({queryKey:["Reports"]});
            // setUser({id : savedUser.id, username : user.email})
            // navigate("/operations");
        },
        onError: (error) =>{
            console.log("error12");
            // console.log(error);
            // console.log(error.message);
            // let errorText = 'error';
            // setError("Please fill the form correctly")
        }
    });

    const {data, fetchNextPage } = useGetReports({limit:20 , time:time , type:type});
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.reports?.length, 0) ||
    0;
  return (
    <InfiniteScroll
    className="overflow-hidden"
    height={600}
    dataLength={totalFetchedPosts} // This is the length of the posts array
    next={fetchNextPage} // Function to fetch more data
    hasMore={data?.pages[data?.pages.length-1].hasMore??false} // Boolean to determine if there are more posts
    loader={<span className="loading loading-dots loading-lg"></span>} // Loading indicator
    endMessage={
      <p style={{ textAlign: "center" }}>
        <b>You have seen all the posts!</b>
      </p>
    }
  >
    <div>
      {data?.pages.map((page , index)=>(
          <React.Fragment key={index}>
            {page?.reports?.map(report=>(
              <div key={report.id} className="flex flex-col items-center">
                <div className="w-11/12 relative rounded-xl p-5 min-h-52 mb-5 mx-5 border-2 border-darkGray">
                    <div className="grid grid-cols-4">
                        <p className="text-secondary">Reporter User: <span className="text-white">{report?.userID?.username }</span></p>
                        <p className="text-secondary">Reported {type=="post" ? "Post" : "User"} : <span className="text-white">{report?.reportedID?.username ? report?.reportedID?.username : report?.reportedID  }</span></p>
                        <p className="text-secondary">Date: <span className="text-white">{formatPostsDate(report.createdAt)}</span></p>
                        <p className="text-secondary">Type: <span className="text-white">{report.reportType}</span></p>
                    </div>
                    <div className="">
                        <p className="text-secondary">Content:</p>
                        <p className="w-full">{report?.furtherExplanations}</p>
                    </div>
                    <div className={`flex gap-4 absolute bottom-5 ${time=="history" && "hidden"}`}>
                        <button onClick={()=>{ProcessReport.mutate({status:'Accepted' , reportID:report.id})}}>Ban</button>
                        <button onClick={()=>{ProcessReport.mutate({status:'Ignored',reportID:report.id})}}>Ignore</button>

                    </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
    </div>
  </InfiniteScroll>
  )
}

export default AdminReportViewer