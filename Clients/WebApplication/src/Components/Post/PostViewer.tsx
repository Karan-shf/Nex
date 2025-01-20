import PostBottomBar from "./PostBottomBar"
import defaultUser from '../../assets/images/defaultAvatar.jpg'
import { Post } from "../../Interfaces/Interfaces"
import { Link } from "react-router-dom"
import { formatPostDateTime, formatPostsDate, GetMediaLink } from "../../functions/functions"
 

interface PostViewerProps{
  post:Post|undefined,
  main?:boolean
}

const PostViewer = ({ post , main=false }: PostViewerProps) => {
  return (
    <div className="pt-3 pb-2 px-4 border w-full border-darkGray ">
          {/* <img className="max-w-10 max-h-10 rounded-full" src={post.author?.profilePic ?? defaultUser}></img> */}
          <div className="pl-4 w-full">
              <div className="mb-1 flex gap-2">
                  <img className="max-w-12 max-h-12 rounded-full" src={post?.author?.profilePic ? GetMediaLink(post.author.profilePic) : defaultUser}></img>
                  <div className="w-full overflow-hidden">
                    <Link to={`/userProfile/${post?.author.userID}`}>
                      <h3 className={`${!main && "inline"} mx-1`}>{post?.author.name}</h3>
                      <h3 className={`text-secondary ${!main && "inline"} mx-1`}>@{post?.author.username}</h3>
                      <h3 className={`text-secondary ${main ? "hidden" : "inline"} mx-1`}>●</h3>
                      <h3 className={`text-secondary  ${main ? "hidden" : "inline"} mx-1`}>{formatPostsDate(post?.postDate ?? '')}</h3>
                    </Link>
                    <Link to={`/${post?.id}`} className="w-full ">
                      {post?.mediaFileName && post?.mediaType == "image" && <img className="rounded-lg my-4" src={GetMediaLink(post.mediaFileName)} />}
                      {post?.mediaFileName && post?.mediaType=="video" && <video controls className="rounded-lg my-4" src={GetMediaLink(post.mediaFileName)} />}
                      <p className={`${main ? "hidden" : ""} mx-1 my-2 w-full text-ellipsis overflow-hidden`}>{post?.content}</p>
                    </Link>
                    <div className={`${main && "hidden"} w-full`}>
                      <PostBottomBar post={post} />
                    </div>
                  </div>
              </div>
              <Link to={`/${post?.id}`} className="w-full ">
                <p className={`${!main ? "hidden" : ""} mx-1 my-2 text-ellipsis overflow-hidden`}>{post?.content}</p>
              </Link>
              {/* <p className={`text-secondary  ${!main && "hidden"} mx-1 mb-2 mt-3`}>{formatPostDateTime(post.postDate)}</p> */}
              <div className={`${!main && "hidden"} w-full`}>
                <h1 className="border text-darkGray mb-2"></h1>
                <PostBottomBar post={post} />
              </div>
          </div>
    </div>
  )
}

export default PostViewer