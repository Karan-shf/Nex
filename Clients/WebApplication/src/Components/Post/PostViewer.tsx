import PostBottomBar from "./PostBottomBar"
import defaultUser from '../../assets/images/defaultAvatar.jpg'
import { Post } from "../../Interfaces/Interfaces"
 

interface PostViewerProps{
  post:Post
}

const PostViewer = ({ post }: PostViewerProps) => {
  return (
    <div className="w-full flex">
        {/* <img className="max-w-10 max-h-10 rounded-full" src={post.author?.profilePic ?? defaultUser}></img> */}
        <img className="max-w-12 max-h-12 rounded-full" src={defaultUser}></img>
        <div className="pl-4 w-full">
            <div className="flex gap-2 mb-1">
                <h3>{post.author.name}</h3>
                <h3 className="text-secondary">@{post.author.username}</h3>
            </div>
            <p className="mb-5">{post.content}</p>
            <PostBottomBar post={post} />
        </div>
    </div>
  )
}

export default PostViewer