import  { useEffect, useState } from 'react'
import { User } from '../Interfaces/Interfaces';
// import useUserCheckToken from '../hooks/useUserCheckToken';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';
import InfoBar from '../Components/InfoBar/InfoBar';
import BottomBar from '../Components/BottomBar/BottomBar';
import PostAPost from '../PostAPost/PostAPost';
import TopBar from '../Components/TopBar/TopBar';
import { TopBarContext } from '../contexts/TopBarContext';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
const AdminLayout = () => {
  let [admin, setAdmin] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | null>(null);
//   const [title , setTitle] = useState<string>("Home Feed")
//   const [hasBackward , setHasBackward] = useState<boolean>(false)
  
  useEffect(() => {
    setDialogElement(document.getElementById("admin") as HTMLDialogElement | null);
  }, [dialogElement]);





  return (
      <div className='grid grid-cols-5 w-full h-full place-items-stretch '>

        <div className='w-full block '>
            <AdminSideBar/>
        </div>

        <div className='col-span-4 overflow-hidden relative w-full border-l h-full   border-darkGray'>
            <ToastContainer aria-label={"sth2"} />
            <Outlet />

        </div>

      </div>


  )
}

export default AdminLayout
