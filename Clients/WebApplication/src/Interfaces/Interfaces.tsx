

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
    verficationState: "notVerified"|"pendingVerfication"|"verified",
    isBanned:boolean
}

export interface UserSignupInterface {
    email?:string|undefined,
    password?:string|undefined,
    username?:string|undefined,
    name?:string|undefined,
    birthDate?:Date|undefined,
    pfp?:string|undefined,
    verificationCode?:string|undefined
  }