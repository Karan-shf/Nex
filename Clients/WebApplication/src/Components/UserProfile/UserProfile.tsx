import { useNavigate, useParams } from "react-router-dom"
import userContext, { useUserContext } from "../../contexts/UserContexts"
import useOtherUser from "./useOtherUser";
import React, { useEffect, useState } from "react";
import { User } from "../../Interfaces/Interfaces";
import { useTopBarContext } from "../../contexts/TopBarContext";
import defaultBackPic from '../../assets/images/Frame 5(1).png'
import defaultUser from '../../assets/images/defaultAvatar.jpg'
import { GetMediaLink, Symbolize } from "../../functions/functions";
import useUserPosts from "./useUserPosts";
import PostViewer from "../Post/PostViewer";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowButton from "./FollowButton";
import ReportUser from "./ReportUser";
import ModalButton from "../ModalButton/ModalButton";



const UserProfile = () => {

    const {userID} = useParams()
    const {user:temp} = useUserContext()
    const navigate = useNavigate()
    const { data:user , isLoading } =  useOtherUser(userID?? temp?.id.toString() ?? '')
    const [followerAdjuster , setFollowerAdjuster] = useState(0)
    const {setHasBackward , setTitle} = useTopBarContext()  
    const {data , fetchNextPage} = useUserPosts({limit:20 , userID:userID?? temp?.id.toString() ?? ''}) 
    const totalFetchedPosts =
    data?.pages.reduce((total, page) => total + page?.posts?.length, 0) ||
    0;

    useEffect(()=>{
        if(String(temp?.id??'') == userID){
            navigate("/userProfile" , { replace: true })
        }

        if(userID){
            setHasBackward(true)
            setTitle(user?.name + "'s Profile")
        }else{
            setHasBackward(false)
            setTitle("Your" + " Profile")  
        }
    },[])

    
    return (
        <div>
        {!isLoading  ?
            <div >
                <InfiniteScroll
                    className="overflow-hidden"
                    height={600}
                    dataLength={totalFetchedPosts} // This is the length of the posts array
                    next={fetchNextPage} // Function to fetch more data
                    hasMore={data?.pages[data?.pages.length-1].hasMore??false} // Boolean to determine if there are more posts
                    loader={<span className="loading loading-dots loading-lg"></span>} // Loading indicator
                    endMessage={
                    <p style={{ textAlign: "center" }}>
                        {/* <b>You have seen all the posts!</b> */}
                    </p>
                    }
                >
                {/* { JSON.stringify(data?.id + "hiiiiiiiii")} */}
                <img className=" h-52 w-full" src={user?.backgroundPic ? GetMediaLink(user?.backgroundPic) : defaultBackPic }></img>
                <div className="absolute w-full top-44 ">
                    <div className="ml-8 flex justify-between items-center">
                        <div className="">
                            <img className="w-36 h-36 border-base-100 border-2 rounded-full" src={user?.profilePic ? GetMediaLink(user?.profilePic)  : defaultUser }></img>
                            <div>
                                <p className="text-2xl font-semibold mt-2">{user?.name}</p>
                                <p className="text-lg text-secondary">@{user?.username}</p>
                                <p className="text-lg mt-3">{user?.aboutUser}</p>
                                <div className="flex items-center gap-5 text-md mt-2">
                                    <p className="text-secondary"><span className="text-white font-semibold">{Symbolize(user?.followingCount??0)}</span> Following</p>
                                    <p className="text-secondary"><span className="text-white font-semibold">{Symbolize((user?.followerCount ?? 0) + followerAdjuster )}</span> Follower</p>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 right-10 absolute">
                            {userID ? <>
                                    <ReportUser userID={userID??''} />
                                    <FollowButton setFollowerAdjuster={setFollowerAdjuster}  isFollowed={user?.isFollowed ?? false} followingID={userID ?? ''} />
                                    </>
                                    :
                                    <>
                                    <ModalButton title="Edit Profile" id="editProfile" additionalCss="rounded-full px-5 py-1 border border-grayDark text-white" />
 
                                    </>}
                        </div>

                    </div>
                    <hr className="text-darkGray border mt-5"></hr>
                    <div className="">
                        <div>
                        {data?.pages.map((page , index)=>(
                            <React.Fragment key={index}>
                                {page?.posts?.map(post=>(
                                <div key={post.id} className="">
                                    <PostViewer post={post}/>
                                </div>
                                ))}
                            </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                    </InfiniteScroll>
                {/* <p className="mt-40">{user?.id}</p> 
                <p>{user?.email}</p>
                <p>{user?.birthDate?.toString()}</p> */}

            </div>
        : <span className="loading loading-dots loading-lg"></span>}

        </div>

    )
}

export default UserProfile