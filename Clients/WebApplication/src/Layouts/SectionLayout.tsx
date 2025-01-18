import  { useEffect, useState } from 'react'
import { User } from '../Interfaces/Interfaces';
// import useUserCheckToken from '../hooks/useUserCheckToken';
import _ from 'lodash'
import UserContext from '../contexts/UserContexts';
import AdminContext from '../contexts/AdminContexts';

import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';
import InfoBar from '../Components/InfoBar/InfoBar';
import BottomBar from '../Components/BottomBar/BottomBar';
const SectionLayout = () => {
  let [user, setUser] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);



  return (
      <div className='grid grid-cols-10 w-full h-full place-items-stretch '>
        <div className='w-full col-span-2 hidden md:block mt-2 mx-9'>
            <SideBar/>
        </div>
        
        {/* <div className="border-l h-full border-secondary"></div> */}

        <div className='md:col-span-5 col-span-full w-full border-x h-full border-darkGray'>
        <Outlet />
        </div>


        <div className='w-full col-span-3 hidden md:block'>
          <InfoBar/>
        </div>

        <div className='w-full col-span-3 block md:hidden'>
          <BottomBar/>
        </div>

      </div>


  )
}

export default SectionLayout
