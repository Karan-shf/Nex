import { createBrowserRouter } from "react-router-dom"
import OuterLayout from "./Layouts/OuterLayout"
import LoginOrSigninPage from "./Components/SignUpAndLogin/LoginOrSigninPage"
import UserProfile from "./Components/UserProfile/UserProfile"
import AdminLogin from "./Components/AdminLoginSignup/AdminLogin"
import AdminProfile from "./Components/Admin/AdminUserManage"
import SectionLayout from "./Layouts/SectionLayout"
import Explore from "./Components/Explore/Explore"
import Saves from "./Components/Saves/Saves"
import Notifications from "./Components/Notification/Notifications"
import Home from "./Components/Home/Home"
import PostPage from "./PostPage/PostPage"
import SearchResult from "./Components/SearchResult/SearchResult"
import FollowStat from "./Components/FollowStat/FollowStat"
import AdminLayout from "./Layouts/AdminLayout"
import AdminUserManage from "./Components/Admin/AdminUserManage"
import AdminPostManage from "./Components/Admin/AdminPostManage"
import AdminUserReportManage from "./Components/Admin/AdminUserReportManage"
import AdminPostReportManage from "./Components/Admin/AdminPostReportManage"




const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path:'signupOrLogin',element: <LoginOrSigninPage/>},        
                {path:'admin/adminLogin',element: <AdminLogin/>},
                
                {path:"/admin",element: <AdminLayout/> ,  children:[                        
                        {path:'',element: <AdminUserManage/>},
                        {path:'posts',element: <AdminPostManage/>},
                        {path:'userReports',element: <AdminUserReportManage/>},
                        {path:'postReports',element: <AdminPostReportManage/>},



                ]},
                
                {path:"/",element: <SectionLayout/> ,  children:[                        
                        {path:'userProfile',element: <UserProfile/>},

                        {path:'explore',element: <Explore/>},
                        {path:'explore/searchResult',element: <SearchResult/>},
                        {path:'saves',element: <Saves/>},
                        {path:'notifications',element: <Notifications/>},

                        {path:"/" , element: <Home/>},

                        {path:"/:id" , element: <PostPage/>},
                        {path:"/userProfile/:userID" , element: <UserProfile/>},

                        {path:"/followStat/:userID" , element: <FollowStat/>}



        
                ]}

        ]}
          
])

export default router