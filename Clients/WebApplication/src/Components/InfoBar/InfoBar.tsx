import { useEffect, useState } from "react"
import { GetTredingHashtags } from "./api"
import { Symbolize } from "../../functions/functions"


const InfoBar = () => {
  const [topTrends , setToptrends] = useState<{count:number , name:string}[]>([])


  useEffect(()=>{
    setToptrends(GetTredingHashtags())
  },[])
  return (
    <div className="flex justify-center">
      <div className="text-lg flex flex-col gap-1 border border-darkGray p-4 rounded-2xl mt-10">
        <p className="text-2xl font-semibold mb-2">Top Trends</p>
        {topTrends.map(hashtag => (
          <div className="grid grid-cols-2 place-items-center gap-28 ">
            <p><span className="text-primary font-bold">#</span>{hashtag?.name}</p> 
            <p>{Symbolize(hashtag?.count)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoBar