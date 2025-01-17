import { createBrowserRouter } from "react-router-dom"
import OuterLayout from "./Layouts/OuterLayout"
import LoginOrSigninPage from "./Components/SignUpAndLogin/LoginOrSigninPage"
import Signup from "./Components/SignUpAndLogin/Signup"
import Login from "./Components/SignUpAndLogin/Login"
import UserProfile from "./Components/UserProfile/UserProfile"
import AdminLogin from "./Components/AdminLoginSignup/AdminLogin"
import AdminProfile from "./AdminProfile/AdminProfile"




const router = createBrowserRouter([
        {path:"/",element: <OuterLayout /> ,  children:[
                {path:'signupOrLogin',element: <LoginOrSigninPage/>},
                {path:'userProfile',element: <UserProfile/>},
                {path:'adminProfile',element: <AdminProfile/>},
                {path:'admin/adminLogin',element: <AdminLogin/>},


                // {path:'signup',element: <Signup/>},
                // {path:'login',element: <Login/>},
                
                // {path:'' , element: <HomeLayout/> , children:[
                //         {path: '', element: <App/>},

                //         {path: 'botMembers', element: <BotMembers/>},
                //         {path: 'botMembers/:id', element: <BotMemberPage/>},
                //         // {path: 'botMembers/addBot', element: <AddBot/>},



                //         {path: 'repositories', element: <Repositorys/>},
                //         {path: 'repositories/:id', element: <RepositoryPage/>},
                //         {path: 'repositories/:repositoryID/:messageID', element: <MessagePage/>},


                //         {path: 'operations/:id', element: <OperationPage/>},
                //         // {path: 'editBot/:id', element: <EditBot/>},

                //         {path: 'operations', element: <Operations/>},
                //         {path: 'operations/addOperation', element: <AddOperation/>}


                // ]}
        ]}
          
])

export default router