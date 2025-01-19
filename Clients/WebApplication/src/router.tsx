import { createBrowserRouter } from "react-router-dom"
import OuterLayout from "./Layouts/OuterLayout"
import LoginOrSigninPage from "./Components/SignUpAndLogin/LoginOrSigninPage"
import UserProfile from "./Components/UserProfile/UserProfile"
import AdminLogin from "./Components/AdminLoginSignup/AdminLogin"
import AdminProfile from "./AdminProfile/AdminProfile"
import SectionLayout from "./Layouts/SectionLayout"
import Explore from "./Components/Explore/Explore"
import Saves from "./Components/Saves/Saves"
import Notifications from "./Components/Notification/Notifications"
import Home from "./Components/Home/Home"




const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path:'signupOrLogin',element: <LoginOrSigninPage/>},        
                {path:'admin/adminLogin',element: <AdminLogin/>},
                
                {path:"/",element: <SectionLayout/> ,  children:[                        
                        {path:'userProfile',element: <UserProfile/>},
                        {path:'adminProfile',element: <AdminProfile/>},

                        {path:'explore',element: <Explore/>},
                        {path:'saves',element: <Saves/>},
                        {path:'notifications',element: <Notifications/>},

                        {path:"/" , element: <Home/>}
        
                ]}

        ]}
          
])

export default router