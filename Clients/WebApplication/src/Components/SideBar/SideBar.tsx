import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/images/LogoNex.png"
import { useUserContext } from "../../contexts/UserContexts"

const SideBar = () => {
  const {user } = useUserContext()
  const manage = useNavigate()
  const location = useLocation();

  function LogOut(){
    localStorage.removeItem("x-auth-token")
    manage("signupOrLogin")
  }
  return (
    <div>
        <img className="w-14 mb-10" src={Logo}></img>
        
        <div className="flex-col gap-7 flex lg:text-2xl md:text-xl">
            <Link className={`${location.pathname == "/" ? 'font-bold': '' } flex items-center gap-4`} to="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 lg:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home
            </Link>

            <Link  className={`${location.pathname == "/explore" ? 'font-bold': '' } flex items-center gap-4`} to="explore">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 lg:size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Explore
            </Link>

            <Link  className={`${location.pathname == "/notifications" ? 'font-bold': '' } flex items-center gap-4`} to="notifications">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 lg:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              Notifications
            </Link>

            <Link  className={`${location.pathname == "/userProfile" ? 'font-bold': '' } flex items-center gap-4`} to="userProfile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 lg:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Profile
            </Link>

            <Link  className={`${location.pathname == "/saves" ? 'font-bold': '' } flex items-center gap-4`} to="saves">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 lg:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              Saves
            </Link>

            <Link  className="flex items-center justify-center  gap-4 bg-primary rounded-3xl p-2 w-3/4" to="">
              Post
            </Link>

            <div  className="flex items-center text-lg font-semibold  w-3/4">
              {user?.profilePic
                  ? <img src={user?.profilePic}/> 
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20 text-accent rounded-full">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>}
              <div className="ml-2 w-full">
                <p>{user?.name}</p>
                <p className="text-secondary text-base">@{user?.username}</p>
              </div>

              {/* <details className="dropdown">
                <summary className="btn m-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </details> */}
              
              <button className="dropdown dropdown-top">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-darkGray">
                  <li onClick={LogOut}>Log out</li>
                </ul>
              </button>

            </div>

        </div>
    </div>
  )
}

export default SideBar