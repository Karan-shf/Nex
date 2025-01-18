import  { useEffect, useState } from 'react'
import { User } from '../Interfaces/Interfaces';
// import useUserCheckToken from '../hooks/useUserCheckToken';
import _ from 'lodash'

import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';
import InfoBar from '../Components/InfoBar/InfoBar';
import BottomBar from '../Components/BottomBar/BottomBar';
const SectionLayout = () => {
  let [user, setUser] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);



  return (
      <div className='grid xl:grid-cols-10 grid-cols-9 w-full h-full place-items-stretch '>
        <div className='w-full xl:col-span-2 md:col-span-1 col-span-2 hidden sm:block '>
            <SideBar/>
        </div>
        
        {/* <div className="border-l h-full border-secondary"></div> */}

        <div className='md:col-span-5 sm:col-span-7 col-span-full w-full border-x h-full border-darkGray'>
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
