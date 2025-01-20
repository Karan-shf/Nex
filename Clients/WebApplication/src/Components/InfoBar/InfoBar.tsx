import { useLocation } from "react-router-dom";
import TopTrends from "./TopTrends"
import SearchController from "./SearchController";



const InfoBar = () => {

  const location = useLocation();
  return (
    <div className="flex justify-center">
          <div className="text-lg flex flex-col gap-1 border border-darkGray p-4 rounded-2xl mt-10 ">

      {location.pathname.includes("explore") 
        ? <SearchController/>
        : <TopTrends/>
      }
    </div>
    </div>
  )
}

export default InfoBar