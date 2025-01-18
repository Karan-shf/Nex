import { useEffect, useState } from "react"
import { GetTredingHashtags } from "./api"


const InfoBar = () => {
  const [topTrends , setToptrends] = useState<{count:number , name:string}[]>([])
  let final =''
  function Symbolize(count:number){
    if(count > 999999999){
      final = (count/1000000000).toFixed(1)
      return final +"B"
    }else
    if(count > 999999){
      count = count/1000000
      final =(count.toFixed(1))
      return final+"M"
    } else
    if(count > 999){
      count = count/1000
      final =(count.toFixed(1))
      return final+"K"
    }else{
      return count.toString()
    }
    
  }

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