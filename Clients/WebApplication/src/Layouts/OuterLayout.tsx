import  { useEffect, useState } from 'react'
import { User } from '../Interfaces/Interfaces';
// import useUserCheckToken from '../hooks/useUserCheckToken';
import _ from 'lodash'
import UserContext from '../contexts/UserContexts';
import AdminContext from '../contexts/AdminContexts';

import { Outlet } from 'react-router-dom';
import useUserCheckToken from '../hooks/useUserCheckToken';
import useAdminCheckToken from '../hooks/useAdminCheckToken';
const OuterLayout = () => {
  let [user, setUser] = useState<User|null | undefined>(null);
  let [admin, setAdmin] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);

  let {data: serverUser,error,isLoading} = useUserCheckToken();
  let {data: serverAdmin,error:err,isLoading:isl} = useAdminCheckToken();

 
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);

    }
    // console.log(serverUser.u)
    setLoading(isLoading);
    if(error){
        setUser(null);
        console.log("err")
    }else if (serverUser?.email && !_.isEqual(serverUser,user)){
        setUser(serverUser);
        console.log("nrr")

    }

    if(err){
      setAdmin(null);
      console.log("err")
  }else if (serverAdmin?.email && !_.isEqual(serverAdmin,admin)){
      setAdmin(serverAdmin);
      console.log("nrr")

  }
},[serverUser,isLoading , isl , serverAdmin]);


  return (
    <AdminContext.Provider value={{admin : admin , setAdmin : setAdmin , isLoading : loading}}>
    <UserContext.Provider value={{user : user , setUser : setUser , isLoading : loading}}>
      <Outlet/>
    </UserContext.Provider>
    </AdminContext.Provider>

  )
}

export default OuterLayout
