import { Link } from "react-router-dom"
import { FollowStat } from "../../Interfaces/Interfaces"
import { GetMediaLink } from "../../functions/functions"
import defaultUser from '../../assets/images/defaultAvatar.jpg'
import badge from '../../assets/images/Frame 5(1).png'

interface Props{
    stat : FollowStat
}

const FollowStatViewer = ({stat}:Props) => {
  return (
    <div className="px-4 py-4 border border-darkGray flex gap-2 ">
        <img className="max-w-12 min-w-12 min-h-12 max-h-12 rounded-full" src={stat?.profilePic ? GetMediaLink(stat.profilePic) : defaultUser}></img>
        <div className="w-full overflow-hidden">
            <Link to={`/userProfile/${stat.id}`}>
                <h3 className={`text-lg font-semibold mx-1`}>{stat.name} <img className={`${(stat.verificationState=="verified") ? "inline" : "hidden"} w-4`} src={badge}/></h3>
                <h3 className={`text-secondary mx-1`}>@{stat.username}</h3>
                <h3 className={`font-semibold mx-1 mt-1`}>{stat.aboutUser}</h3>
            </Link>
        </div>
    </div>
  )
}

export default FollowStatViewer