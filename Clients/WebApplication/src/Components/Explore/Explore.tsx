import { LegacyRef, useEffect, useRef, useState } from "react"
import { useTopBarContext } from "../../contexts/TopBarContext"
import { useNavigate } from "react-router-dom"
import SearchBar from "../SearchResult/SearchBar"
import TopTrends from "../InfoBar/TopTrends"
import useGetTopTrends from "../InfoBar/useGetTopTrends"
import { Symbolize } from "../../functions/functions"


const Explore = () => {
  const {setHasBackward , setTitle} = useTopBarContext()
  const {data: topTrends , isLoading , error } = useGetTopTrends()

  useEffect(()=>{
      setHasBackward(false)
      setTitle("Explore")
  },[])
  return (
    <div>
      <SearchBar link="searchResult/"/>
      <div className="p-7 text-xl flex flex-col gap-6 justify-center  w-full ">
        <p className="text-2xl font-semibold mb-2">Top Trends</p>
        {topTrends?.map(hashtag => (
        <div className="grid grid-cols-2  gap-28 w-full border-b border-darkGray pb-2">
            <p><span className="text-primary font-bold mr-2">{hashtag?.Tag.tag[0]}</span>{hashtag?.Tag.tag.slice(1)}</p> 
            <p>{Symbolize(hashtag?.count)}</p>
        </div>
        ))} 
      </div>
      
    </div>
  )
}

export default Explore