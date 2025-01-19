
interface IconInfo{
    before:string,
    after:string,
    id:number,
    color:string
    Toggle:(id:number)=>void,
    isInteracted:boolean,
}

const IconViewer = ({isInteracted , before , after , Toggle , id , color}:IconInfo) => {
  return (
    <div>
        <button onClick={()=>{Toggle(id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isInteracted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth= {2} stroke="currentColor" className={`size-5 ${isInteracted && "text-"+color} hover:text-${color}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isInteracted ? after : before} />
            </svg>
        </button>
    </div>
  )
}

export default IconViewer