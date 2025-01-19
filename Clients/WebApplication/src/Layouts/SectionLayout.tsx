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
const SectionLayout = () => {
  let [user, setUser] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | null>(null);
  
  useEffect(() => {
    setDialogElement(document.getElementById("test") as HTMLDialogElement | null);
  }, [dialogElement]);



  return (
      <div className='grid xl:grid-cols-10 grid-cols-9 w-full h-full place-items-stretch '>
            <PostAPost/>

        <div className='w-full xl:col-span-2 md:col-span-1 col-span-2 hidden sm:block '>
            <SideBar/>
        </div>
        
        {/* <div className="border-l h-full border-secondary"></div> */}

        <div className='md:col-span-5 sm:col-span-7 col-span-full w-full border-x h-full overflow-y-auto  border-darkGray'>
        {/* <PostAPost/> */}
          <button onClick={() => { dialogElement?.showModal(); console.log(dialogElement) }} className='bg-primary p-3 rounded-full absolute bottom-24 right-7 sm:hidden block'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 block xl:hidden ">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
          </button>
          <ToastContainer aria-label={"sth"} />
          <Outlet />
        </div>


        <div className='w-full col-span-3 hidden md:block'>
          <InfoBar/>
        </div>

        <div className='w-full col-span-3 block sm:hidden'>
          <BottomBar/>
        </div>

      </div>


  )
}

export default SectionLayout
