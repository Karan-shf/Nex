import  { useEffect, useState } from 'react'
import { User } from '../Interfaces/Interfaces';
// import useUserCheckToken from '../hooks/useUserCheckToken';
import _ from 'lodash'
import UserContext from '../contexts/UserContexts';
import { Outlet } from 'react-router-dom';
import useUserCheckToken from '../hooks/useUserCheckToken';
const OuterLayout = () => {
  let [user, setUser] = useState<User|null | undefined>(null);
  let [loading, setLoading] = useState<any>(true);

  let {data: serverUser,error,isLoading} = useUserCheckToken();
 
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
},[serverUser,isLoading]);


  return (
    <UserContext.Provider value={{user : user , setUser : setUser , isLoading : loading}}>
            <Outlet />
    </UserContext.Provider>
  )
}

export default OuterLayout
