

// user

export interface User{
    id:number
    name:string,
    email:string,
    password:string,
    birthDate:Date,
    profilePic:string,
    username:string,
    signDate:Date,
    aboutUser:string,
    verificationState: "notVerified"|"pendingVerfication"|"verified",
    isBanned:boolean
    backGroundPic?:string
    isFollowed?:boolean
    followerCount?:number
    followingCount?:number

}


export interface FollowStat{
    id : number
    name :string
    profilePic : string
    username : string
    aboutUser : string
    verificationState : "notVerified"|"pendingVerfication"|"verified",
}




export interface UserSignupInterface {
    email?:string|undefined,
    password?:string|undefined,
    username?:string|undefined,
    name?:string|undefined,
    birthDate?:Date|undefined,
    verificationCode?:string|undefined
  }


export interface Post{
    id: number,
    mediaFileName?: string,
    mediaType?: "video"|"image",
    postType: "Post"|"Comment"|"Quote",
    postDate: Date
    content: string
    quotedFrom ?: number
    repliesTo?: number
    likes:number
    comments:number
    views: number
    bookmarks:number
    isLiked:boolean,
    isBookmarked:boolean
    author:{
        name:string
        username:string
        userID:number 
        profilePic:string
        verificationState: "notVerified"|"pendingVerfication"|"verified",
    }
}

export interface HashTag{
    Tag:{tag:string}
    count:number
}

export interface Notifs{
    id:number;
    userID:number,
    content:string,
    isSeen:boolean,
    createdAt:Date,
}

export interface Report{
    id:number, 
    reportedID:number
    userID:number
    reportType: "Hate Speech" | "Harassment" | "Violent Speech" | "Child Safty" | "Privacy" | "Spam"
    furtherExplanations?:string
    reportState: "Pending"|"Accepted"|"Ignored"
    createdAt:Date
}

