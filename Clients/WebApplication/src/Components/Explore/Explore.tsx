import { LegacyRef, useEffect, useRef, useState } from "react"
import { useTopBarContext } from "../../contexts/TopBarContext"
import { useNavigate } from "react-router-dom"
import SearchBar from "../SearchResult/SearchBar"


const Explore = () => {
  const {setHasBackward , setTitle} = useTopBarContext()
  useEffect(()=>{
      setHasBackward(false)
      setTitle("Explore")
  },[])
  return (
    <div>
      <SearchBar link="searchResult/"/>
    </div>
  )
}

export default Explore