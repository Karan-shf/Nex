import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/images/LogoNex.png"
import { useUserContext } from "../../contexts/UserContexts"
import { useEffect, useState } from "react"
import PostAPost from "../../PostAPost/PostAPost"
import { APILink, MediaAddress } from "../../consts/consts"

const SideBar = () => {
  const {user } = useUserContext()
  const manage = useNavigate()
  const location = useLocation();

  function LogOut(){
    localStorage.removeItem("x-auth-token")
    manage("signupOrLogin")
  }

  async function FindUnseenNotifCount(){
          try {
              const res = await fetch(APILink+"core/notif/count", {
                // method: "POST",
                headers: {
                  // "Content-Type": "application/json", 
                  "x-auth-token":localStorage.getItem("x-auth-token") ?? ""
                },
                // body: JSON.stringify({"postID":post?.id}), 
              });
        
              const result = await res.json(); 
              
              if(result.success){
                  // console.log("sthhhhrrr" , result.data)
              }else{
  
              }
              if (res.ok) {
                console.log("Request successful:", result);
                setUnseenNotifCount(result)
              } else {
                console.log("Request failed:", result);
              }
            } catch (error) {
              console.error("Error occurred:", error);
            }
}

  

  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | null>(null);
  const [unseenNotifCount , setUnseenNotifCount] = useState<number>(0)

  useEffect(() => {
    setDialogElement(document.getElementById("test") as HTMLDialogElement | null);
    FindUnseenNotifCount()
  }, [dialogElement]);

  useEffect(()=>{

  },[])
  return (
    <div className="mt-2 ml-9 flex-col flex xl:items-start items-end pr-6">
        <img className=" mb-10 w-12 h-12 min-w-12 min-h-12 " src={Logo}></img>
        
        <div className="flex-col gap-7 flex xl:text-2xl md:text-xl xl:items-start items-end ">
            <Link className={`${location.pathname == "/" ? 'font-bold': '' } flex items-center gap-4`} to="">
            {location.pathname == "/" 
              ? 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 xl:size-8">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              :  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10 xl:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            }

              <p className="hidden xl:block">Home</p>
            </Link>

            <Link  className={`${location.pathname == "/explore" ? 'font-bold': '' } flex items-center gap-4`} to="explore">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={`${location.pathname == "/explore" ? 3 : 2 } `} stroke="currentColor" className="size-9 xl:size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p className="hidden xl:block">Explore</p>
            </Link>

            <Link  className={`${location.pathname == "/notifications" ? 'font-bold': '' } flex items-center gap-4`} to="notifications">
            {location.pathname == "/notifications" 
              ?  
              <div className="indicator">
                {unseenNotifCount != 0 && <span className="indicator-item badge badge-sm  bg-primary">{unseenNotifCount}</span>}  
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 xl:size-8">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
              </svg>
              </div>
              : 
              <div className="indicator">
                {unseenNotifCount != 0 && <span className="indicator-item badge badge-sm  bg-primary">{unseenNotifCount}</span>}   
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10 xl:size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </div>
            }

              <p className="hidden xl:block">Notifications</p>
            </Link>

            <Link  className={`${location.pathname == "/userProfile" ? 'font-bold': '' } flex items-center gap-4`} to="userProfile">
              {location.pathname == "/userProfile" 
                ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 xl:size-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10 xl:size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              }

              <p className="hidden xl:block">Profile</p>
            </Link>

            <Link  className={`${location.pathname == "/saves" ? 'font-bold': '' } flex items-center gap-4`} to="saves">
              {location.pathname == "/saves" 
                ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 xl:size-8">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth= {2} stroke="currentColor" className="size-10 xl:size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              }
              <p className="hidden xl:block">Saves</p>
            </Link>

            <button type='button' onClick={() => { dialogElement?.showModal(); console.log(dialogElement) }} className="flex items-center justify-center  gap-4 bg-primary xl:rounded-3xl p-2 xl:w-3/4 rounded-full w-fit">
              <p className="hidden xl:block">Post</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 block xl:hidden ">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>


            <button  className="flex items-center text-lg font-semibold  w-3/4 dropdown dropdown-top">
              {user?.profilePic
                  ? <img className="w-12 h-12 border-primary border-2 rounded-full " src={APILink + MediaAddress + user?.profilePic}/> 
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="xl:size-28 size-16 text-accent rounded-full">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>}
              <div className="ml-2 w-full xl:block hidden">
                <p className="text-start">{user?.name}</p>
                <p className="text-start text-secondary text-base">@{user?.username}</p>
              </div>
              
              <button className="hidden xl:block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-darkGray">
                  <li onClick={LogOut}>Log out</li>
                </ul>
              </button>

            </button>

        </div>
    </div>
  )
}

export default SideBar