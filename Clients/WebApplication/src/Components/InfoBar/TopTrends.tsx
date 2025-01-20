import { useEffect, useState } from 'react'
import { GetTredingHashtags } from './api'
import { Symbolize } from '../../functions/functions'

const TopTrends = () => {
    const [topTrends , setToptrends] = useState<{count:number , name:string}[]>([])


    useEffect(()=>{
      setToptrends(GetTredingHashtags())
    },[])
  return (
    <>
    <p className="text-2xl font-semibold mb-2">Top Trends</p>
    {topTrends.map(hashtag => (
      <div className="grid grid-cols-2 place-items-center gap-28 ">
        <p><span className="text-primary font-bold">#</span>{hashtag?.name}</p> 
        <p>{Symbolize(hashtag?.count)}</p>
      </div>
    ))}
    </>
  )
}

export default TopTrends