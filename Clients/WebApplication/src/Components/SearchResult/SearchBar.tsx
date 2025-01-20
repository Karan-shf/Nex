
import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface Props{
    link:string
}
const SearchBar = ({link}:Props) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams(); 
    const search = useRef<HTMLInputElement | null>(null)
    const content = searchParams.get('content') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    function DoSearch(){
        navigate(`${link}?content=${search.current?.value}&endDate=${endDate}&startDate=${startDate}`)
    }
    return (
        <div className="bg-backdropDark backdrop-blur-md flex justify-center w-full border border-darkGray">
            <label className="input  flex items-center gap-2  rounded-full lg:w-3/4 my-4  bg-grayPrime">
                <input ref={search} defaultValue={content} type="text" className="grow" placeholder="Search" />
                <button onClick={()=>{console.log("go fish"); DoSearch()}}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-7 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
                </button>
            </label>
        </div>
  )
}

export default SearchBar