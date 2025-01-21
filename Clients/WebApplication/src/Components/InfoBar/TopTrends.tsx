import { useEffect, useState } from 'react'
import { GetTredingHashtags } from './api'
import { Symbolize } from '../../functions/functions'
import useGetTopTrends from './useGetTopTrends'

const TopTrends = () => {

    const {data: topTrends , isLoading , error } = useGetTopTrends()
    return (
        <>
        <p className="text-2xl font-semibold mb-2">Top Trends</p>
        {topTrends?.map(hashtag => (
        <div className="grid grid-cols-2 place-items-stretch gap-28 ">
            <p><span className="text-primary font-bold mr-2">{hashtag?.Tag.tag[0]}</span>{hashtag?.Tag.tag.slice(1)}</p> 
            <p>{Symbolize(hashtag?.count)}</p>
        </div>
        ))} 
        </>
  )
}

export default TopTrends